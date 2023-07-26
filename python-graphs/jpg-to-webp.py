from PIL import Image


imgName = "clock"
folder = "./graphs/"
format = ".jpg"

im = Image.open(folder + imgName + format).convert("RGB")
im.save(folder + imgName + ".webp", "webp")
