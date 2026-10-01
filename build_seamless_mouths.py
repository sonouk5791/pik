import os
import numpy as np
from PIL import Image, ImageFilter
from collections import deque

def build():
    scene1_path = 'assets/kongi_scene1_wave.jpg'
    sheet_path = 'assets/kongi_lipsync_sheet.png'
    
    scene1 = Image.open(scene1_path).convert('RGB')
    sheet = Image.open(sheet_path).convert('RGB')
    
    s1_arr = np.array(scene1, dtype=np.float32)
    sheet_arr = np.array(sheet, dtype=np.float32)
    
    # Kong-i nose coordinates in scene1 (1376 x 768)
    # Nose bottom: Y=324, Nose center: X=664, Y=312
    S_NX, S_NY = 664, 312
    
    # Create clean base skin inpaint of scene1 smile line
    # Smile line in scene1: Y in [331, 344], X in [634, 692]
    base_inpaint = s1_arr.copy()
    above_skin = s1_arr[328, :]
    below_skin = s1_arr[349, :]
    for y in range(330, 347):
        t = (y - 330.0) / (347.0 - 330.0)
        interp = (1.0 - t) * above_skin + t * below_skin
        for x in range(630, 698):
            if s1_arr[y, x, 0] < 225 or s1_arr[y, x, 1] < 205:
                base_inpaint[y, x] = interp[x]

    # Exact nose centers in sheet (1448 x 1086) for 6 phonemes
    noses = {
        'closed': (239, 185),
        'a':      (728, 190),
        'eo':     (250, 541),
        'o':      (732, 542),
        'u':      (254, 889),
        'i':      (1190, 890)
    }

    # Save closed as pure original master artwork in both PNG & JPG
    scene1.save('assets/kongi_scene_closed.png')
    scene1.save('assets/kongi_scene_closed.jpg', quality=95)
    
    # Empty transparent sprite for closed
    transparent_closed = np.zeros((42, 80, 4), dtype=np.uint8)
    Image.fromarray(transparent_closed, 'RGBA').save('assets/mouth_closed.png')

    # Dimensions for mouth box relative to nose
    # Mouth strictly below nose (Y_rel in [14, 56]), width X_rel in [-40, 40]
    # In scene1: Y in [312+14, 312+56] = [326, 368], X in [664-40, 664+40] = [624, 704]
    H, W = 42, 80
    BOX_Y1, BOX_Y2 = S_NY + 14, S_NY + 14 + H
    BOX_X1, BOX_X2 = S_NX - 40, S_NX - 40 + W

    for k in ['a', 'eo', 'o', 'u', 'i']:
        nx, ny = noses[k]
        crop_sheet = sheet_arr[ny+14:ny+14+H, nx-40:nx-40+W]
        
        # Color classification of mouth features:
        # 1. Lip contour / dark interior:
        is_lip = (crop_sheet[:, :, 0] < 140) & (crop_sheet[:, :, 1] < 95) & (crop_sheet[:, :, 2] < 80)
        # 2. Tongue (red/pink):
        is_tongue = (crop_sheet[:, :, 0] > 140) & (crop_sheet[:, :, 1] < 135) & (crop_sheet[:, :, 2] < 135)
        # 3. Teeth (bright white/ivory):
        is_teeth = (crop_sheet[:, :, 0] > 190) & (crop_sheet[:, :, 1] > 190) & (crop_sheet[:, :, 2] > 190) & (np.abs(crop_sheet[:, :, 0] - crop_sheet[:, :, 2]) < 25)
        
        raw_mouth = is_lip | is_tongue | is_teeth
        
        # Label all connected components
        visited = np.zeros((H, W), dtype=bool)
        comps = []
        for y in range(H):
            for x in range(W):
                if not visited[y, x] and raw_mouth[y, x]:
                    comp = []
                    q = deque([(y, x)])
                    visited[y, x] = True
                    while q:
                        cy, cx = q.popleft()
                        comp.append((cy, cx))
                        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (-1,1), (1,-1), (1,1)]:
                            ny_c, nx_c = cy + dy, cx + dx
                            if 0 <= ny_c < H and 0 <= nx_c < W:
                                if not visited[ny_c, nx_c] and raw_mouth[ny_c, nx_c]:
                                    visited[ny_c, nx_c] = True
                                    q.append((ny_c, nx_c))
                    comps.append(comp)

        # Merge components that are large or near center (mouth region)
        clean_mouth = np.zeros((H, W), dtype=bool)
        for comp in comps:
            cy = sum(p[0] for p in comp) / len(comp)
            cx = sum(p[1] for p in comp) / len(comp)
            # Central mouth area
            if 10 <= cx <= 70 and 1 <= cy <= 40:
                if len(comp) >= 20:
                    for (y, x) in comp:
                        clean_mouth[y, x] = True

        # Soft anti-aliasing on mouth mask
        mask_pil = Image.fromarray((clean_mouth * 255).astype(np.uint8))
        mask_blur = np.array(mask_pil.filter(ImageFilter.GaussianBlur(0.7)), dtype=np.float32) / 255.0
        mask_blur = np.clip(mask_blur * 1.35, 0.0, 1.0)[:, :, np.newaxis]

        # Scene base for compositing:
        bg_crop = base_inpaint[BOX_Y1:BOX_Y2, BOX_X1:BOX_X2]
        
        # Color match sheet mouth border to scene1 skin border
        comp_crop = bg_crop * (1.0 - mask_blur) + crop_sheet * mask_blur

        # Seamless outer transition to preserve 100% of scene1 original skin
        # Taper to exact 0.0 at borders
        dist_blur = np.array(mask_pil.filter(ImageFilter.GaussianBlur(2.0)), dtype=np.float32) / 255.0
        dist_blur = np.clip(dist_blur * 1.4, 0.0, 1.0)[:, :, np.newaxis]
        # Force outer 2 border pixels to 0 so there is literally 0 difference at box edge
        dist_blur[:2, :, :] = 0.0
        dist_blur[-2:, :, :] = 0.0
        dist_blur[:, :2, :] = 0.0
        dist_blur[:, -2:, :] = 0.0
        
        orig_crop = s1_arr[BOX_Y1:BOX_Y2, BOX_X1:BOX_X2]
        final_box = orig_crop * (1.0 - dist_blur) + comp_crop * dist_blur

        # Create master scene frame
        scene_k = s1_arr.copy()
        scene_k[BOX_Y1:BOX_Y2, BOX_X1:BOX_X2] = final_box
        
        # Save master full scene image as PNG (lossless) and JPG
        final_img = Image.fromarray(np.clip(scene_k, 0, 255).astype(np.uint8))
        final_img.save(f'assets/kongi_scene_{k}.png')
        final_img.save(f'assets/kongi_scene_{k}.jpg', quality=95)

        # Create isolated transparent mouth sprite (clean cutout with no sticker border)
        diff = np.max(np.abs(final_box - orig_crop), axis=2)
        alpha = np.clip((diff - 2.0) / 6.0, 0.0, 1.0)
        # Ensure sprite borders are fully transparent
        alpha[:2, :] = 0.0
        alpha[-2:, :] = 0.0
        alpha[:, :2] = 0.0
        alpha[:, -2:] = 0.0
        alpha_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5))
        alpha_arr = np.array(alpha_img, dtype=np.float32) / 255.0
        
        rgba = np.zeros((H, W, 4), dtype=np.uint8)
        rgba[:, :, :3] = np.clip(final_box, 0, 255).astype(np.uint8)
        rgba[:, :, 3] = np.clip(alpha_arr * 255, 0, 255).astype(np.uint8)
        Image.fromarray(rgba, 'RGBA').save(f'assets/mouth_{k}.png')

        print(f"Generated assets for '{k}': scene & mouth sprite (clean mask pts={np.count_nonzero(clean_mouth)})")

    print("SUCCESS: All 6 master frames and seamless mouth sprites generated!")

if __name__ == '__main__':
    build()
