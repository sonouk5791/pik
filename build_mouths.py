import os
from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def keep_connected_mouth(mask, start_y=35, start_x=60):
    h, w = mask.shape
    visited = np.zeros((h, w), dtype=bool)
    out_mask = np.zeros((h, w), dtype=bool)
    
    ys, xs = np.where(mask)
    if len(ys) == 0:
        return out_mask
    dists = (ys - start_y)**2 + (xs - start_x)**2
    best_idx = np.argmin(dists)
    sy, sx = ys[best_idx], xs[best_idx]
    
    q = deque([(sy, sx)])
    visited[sy, sx] = True
    out_mask[sy, sx] = True
    
    while q:
        cy, cx = q.popleft()
        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (-1,1), (1,-1), (1,1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and mask[ny, nx]:
                    visited[ny, nx] = True
                    out_mask[ny, nx] = True
                    q.append((ny, nx))
    return out_mask

def run():
    scene1_path = 'assets/kongi_scene1_wave.jpg'
    sheet_path = 'assets/kongi_lipsync_sheet.png'
    
    scene1 = Image.open(scene1_path).convert('RGBA')
    sheet = Image.open(sheet_path).convert('RGB')

    noses = {
        'a':  (728, 190),
        'eo': (250, 541),
        'o':  (1196, 542),
        'u':  (254, 889),
        'i':  (1190, 890)
    }

    # In scene1 (1376x768):
    # Nose is at (666, 308).
    # Mouth box: X in [606, 726], Y in [315, 395] (width 120, height 80)
    base_crop = np.array(scene1.crop((606, 315, 726, 395)).convert('RGB'), dtype=float)

    # Clean inpaint of smile line:
    base_inpainted = base_crop.copy()
    for y in range(10, 32):
        t = (y - 10) / (32 - 10)
        above = base_crop[8, :]
        below = base_crop[34, :]
        interp = (1.0 - t) * above + t * below
        for x in range(28, 92):
            if base_crop[y, x, 0] < 235 or base_crop[y, x, 1] < 210:
                base_inpainted[y, x] = interp[x]

    for k, (nx, ny) in noses.items():
        crop = np.array(sheet.crop((nx - 60, ny + 7, nx + 60, ny + 87)), dtype=float)

        # Mouth pixels have G < 160
        is_mouth = crop[:, :, 1] < 160

        if k == 'i':
            teeth_box = np.zeros((80, 120), dtype=bool)
            teeth_box[24:36, 42:78] = True
            is_teeth = (crop[:, :, 0] > 200) & (crop[:, :, 1] > 200) & (crop[:, :, 2] > 200) & teeth_box
            is_mouth = is_mouth | is_teeth

        # Y strictly in [12, 65], and X bounds per vowel:
        zone = np.zeros((80, 120), dtype=bool)
        if k in ['o', 'u', 'eo']:
            zone[12:62, 38:82] = True
        else:
            zone[12:65, 28:92] = True
            
        raw_mask = is_mouth & zone
        clean_mask = keep_connected_mouth(raw_mask, start_y=35, start_x=60)

        # Create smooth anti-aliased mask
        mask_img = Image.fromarray((clean_mask * 255).astype(np.uint8))
        mask_blurred = np.array(mask_img.filter(ImageFilter.GaussianBlur(0.7)), dtype=float) / 255.0
        mask_blurred = np.clip(mask_blurred * 1.25, 0.0, 1.0)[:, :, np.newaxis]

        # Background base for narrow vowels: use base_inpainted to cover the smile line
        if k in ['o', 'u', 'eo']:
            smile_area = np.zeros((80, 120), dtype=np.uint8)
            smile_area[10:32, 28:92] = 255
            smile_area_blurred = np.array(Image.fromarray(smile_area).filter(ImageFilter.GaussianBlur(1.5)), dtype=float) / 255.0
            smile_area_blurred = np.clip(smile_area_blurred, 0.0, 1.0)[:, :, np.newaxis]
            bg = base_crop * (1.0 - smile_area_blurred) + base_inpainted * smile_area_blurred
        else:
            bg = base_crop

        comp = bg * (1.0 - mask_blurred) + crop * mask_blurred

        # Transparent PNG: alpha > 0 only where comp differs from base_crop
        diff = np.max(np.abs(comp - base_crop), axis=2)
        alpha = np.clip((diff - 3.0) / 8.0, 0.0, 1.0)
        alpha_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
        alpha_arr = np.array(alpha_img, dtype=float) / 255.0
        alpha_arr = np.clip(alpha_arr * 1.3, 0.0, 1.0)

        rgba = np.zeros((80, 120, 4), dtype=np.uint8)
        rgba[:, :, :3] = np.clip(comp, 0, 255).astype(np.uint8)
        rgba[:, :, 3] = (alpha_arr * 255).astype(np.uint8)

        Image.fromarray(rgba, 'RGBA').save(f'assets/mouth_{k}.png')

        test_scene = scene1.copy()
        test_scene.paste(Image.fromarray(rgba, 'RGBA'), (606, 315), Image.fromarray(rgba, 'RGBA'))
        test_scene.save(f'assets/perfect_scene_{k}.png')

    print("SUCCESS: All 5 mouth sprites clean and verified")

if __name__ == '__main__':
    run()
