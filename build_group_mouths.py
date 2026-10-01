import numpy as np
from PIL import Image, ImageFilter

def build_group_frames():
    base = Image.open('assets/scene_group_wave.jpg').convert('RGB')
    b_arr = np.array(base, dtype=np.float32)
    
    # In scene_group_wave, Kong-i nose bottom is at Y=418, center X=672
    # Mouth box: Y in [422, 458] (H=36), X in [644, 700] (W=56)
    Y1, Y2 = 422, 458
    X1, X2 = 644, 700
    H, W = Y2 - Y1, X2 - X1

    # Base inpaint of smiling mouth line
    base_inpaint = b_arr.copy()
    above_skin = b_arr[Y1 - 2, :]
    below_skin = b_arr[Y2 + 2, :]
    for y in range(Y1, Y2):
        t = (y - Y1) / float(H)
        interp = (1.0 - t) * above_skin + t * below_skin
        for x in range(X1, X2):
            if b_arr[y, x, 0] < 220 or b_arr[y, x, 1] < 195:
                base_inpaint[y, x] = interp[x]

    # Save closed frame
    base.save('assets/scene_group_closed.png')
    base.save('assets/scene_group_closed.jpg', quality=95)

    for k in ['a', 'eo', 'o', 'u', 'i']:
        # Load the seamless mouth sprite we perfected earlier
        mouth_spr = Image.open(f'assets/mouth_{k}.png').convert('RGBA')
        # Resize to fit the group scene Kong-i mouth dimensions
        spr_resized = mouth_spr.resize((W, H), Image.Resampling.LANCZOS)
        spr_arr = np.array(spr_resized, dtype=np.float32)
        
        alpha = spr_arr[:, :, 3] / 255.0
        # Feather alpha smoothly
        alpha_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
        alpha_smooth = np.array(alpha_img, dtype=np.float32) / 255.0
        alpha_smooth = np.clip(alpha_smooth * 1.3, 0.0, 1.0)[:, :, np.newaxis]
        
        bg_crop = base_inpaint[Y1:Y2, X1:X2]
        fg_crop = spr_arr[:, :, :3]
        
        comp_crop = bg_crop * (1.0 - alpha_smooth) + fg_crop * alpha_smooth
        
        dist_mask = np.array(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.0)), dtype=np.float32) / 255.0
        dist_mask = np.clip(dist_mask * 1.5, 0.0, 1.0)[:, :, np.newaxis]
        dist_mask[:1, :, :] = 0.0
        dist_mask[-1:, :, :] = 0.0
        dist_mask[:, :1, :] = 0.0
        dist_mask[:, -1:, :] = 0.0
        
        orig_crop = b_arr[Y1:Y2, X1:X2]
        final_box = orig_crop * (1.0 - dist_mask) + comp_crop * dist_mask
        
        scene_k = b_arr.copy()
        scene_k[Y1:Y2, X1:X2] = final_box
        
        out_img = Image.fromarray(np.clip(scene_k, 0, 255).astype(np.uint8))
        out_img.save(f'assets/scene_group_{k}.png')
        out_img.save(f'assets/scene_group_{k}.jpg', quality=95)
        print(f"Generated 4-character group frame for '{k}'")

    print("SUCCESS: All 6 group scene frames created!")

if __name__ == '__main__':
    build_group_frames()
