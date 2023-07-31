"""
Make graph in python
"""

import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

imgName = "harmonic-oscillator-potential"
folder = "./graphs/"
format = ".jpg"
 
# specifying the plot size
plt.figure(figsize = (10, 5))

# # Remove top and right borders
# for pos in ['right', 'top']:
#     plt.gca().spines[pos].set_visible(False)

    
# # Reposition y axis
# plt.gca().spines['left'].set_position(('data', 0))

# # Remove ticks
# plt.tick_params(left = False, right = False , labelleft = False ,
#                 labelbottom = False, bottom = False)

# Limits
# plt.xlim(-3, 8)
 
# only one line may be specified; full height
# plt.axvline(x = 5, color = 'black', label = 'well end')
 
# Create function
x = np.linspace(-10,10,100)
y = x*x

plt.plot(x,y, label="V")

plt.legend()

# rendering plot
plt.savefig(folder + imgName + format)
im = Image.open(folder + imgName + format).convert("RGB")
im.save(folder + imgName + ".webp", "webp")
