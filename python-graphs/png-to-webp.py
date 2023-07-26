from PIL import Image


imgName = "Particle-in-a-box-wave-functions"
folder = "./graphs/"
format = ".png"

im = Image.open(folder + imgName + format).convert("RGB")
im.save(folder + imgName + ".webp", "webp")
