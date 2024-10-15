to start Client Side

1. Cd to client
2. npm run build

1. Cd to Server
2. node index.js

1. Cd to Server
2. python3 sam.py

// Make sure you go to the github "https://github.com/facebookresearch/segment-anything"
// and Doneload "[ViT-H SAM model](https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth)."
// paste it to server.

You will see something like this 

<!-- Model Checkpoints
Three model versions of the model are available with different backbone sizes. These models can be instantiated by running

from segment_anything import sam_model_registry
sam = sam_model_registry["<model_type>"](checkpoint="<path/to/checkpoint>")
Click the links below to download the checkpoint for the corresponding model type.

default or vit_h: ViT-H SAM model.
vit_l: ViT-L SAM model.
vit_b: ViT-B SAM model. -->