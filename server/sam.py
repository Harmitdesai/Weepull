from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
from segment_anything import sam_model_registry, SamPredictor
import cv2
import numpy as np
import logging
import torch

app = Flask(__name__)
CORS(app)

app.logger.setLevel(logging.DEBUG)

@app.route('/setImage', methods=['POST'])
def setImage():
    model_type = "vit_h"
    sam = sam_model_registry[model_type](checkpoint="sam_vit_h_4b8939.pth")
    model = SamPredictor(sam)
    app.logger.info('Received request to /setImage')
    app.logger.debug(f'Request headers: {request.headers}')
    
    if 'imageFile' not in request.files:
        app.logger.error('No file part in the request')
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['imageFile']

    if file.filename == '':
        app.logger.error('No file selected')
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Read image file from memory
        file_stream = file.read()
        nparr = np.frombuffer(file_stream, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        model.set_image(img_np)        
        
        app.logger.info('Image processed successfully')
        # print(model.features)
        # print(type(model.original_size))
        # print(type(model.input_size))
        return jsonify({
            'embbeddings': model.features.tolist(),
            'original_size': model.original_size,
            'input_size': model.input_size,
            'coordinates': [],
                        }), 200
    except Exception as e:
        app.logger.error(f'Error processing image: {str(e)}')
        return jsonify({'error': 'Error processing image'}), 500

@app.route('/predictCoordinate', methods=['POST'])
def predictCoordinate():
    model_type = "vit_h"
    sam = sam_model_registry[model_type](checkpoint="sam_vit_h_4b8939.pth")
    model = SamPredictor(sam)

    # X = request.args.get('X', type=int)
    # Y = request.args.get('Y', type=int)

    coordinates = np.array(request.get_json()['coordinates'].get('coordinates'))
    
    model.features = torch.tensor(request.get_json()['embbeddings'])
    model.original_size = tuple(request.get_json()['original_size'])
    model.input_size = tuple(request.get_json()['input_size'])
    model.is_image_set = True

    [mask, iou_scores, logits] = model.predict(
        point_coords = coordinates,
        point_labels = np.ones(len(coordinates))
        )
    
    index = 0
    for i in range(len(iou_scores)):
        if iou_scores[i]>iou_scores[index]:
            index = i

    mask = mask*1

    mainMask = mask[index].astype(np.uint8)*255

    try:
        img_np = cv2.merge([mainMask, mainMask, mainMask])

        # Convert processed image to PNG and send as response
        _, img_encoded = cv2.imencode('.png', img_np)
        img_io = BytesIO(img_encoded.tobytes())

        return send_file(img_io, mimetype='image/png')

    except Exception as e:
        app.logger.error(f'Error processing image: {str(e)}')
        return jsonify({'error': 'Error processing image'}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)