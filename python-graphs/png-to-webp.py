from PIL import Image


imgName = "SchrodingerEquation"
folder = "./graphs/"
format = ".png"

im = Image.open(folder + imgName + format).convert("RGB")
im.save(folder + imgName + ".webp", "webp")
