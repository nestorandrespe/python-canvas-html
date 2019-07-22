from flask import Flask, render_template, request, json
import subprocess
import numpy as np
import cv2
import re
import base64


app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

# @app.route("/take_canvas", methods=["POST"])
# def disp_pic():
#     data = request.form['img']
#     encoded_data = data.split(",")[1]
#     # nparr = np.fromstring(encoded_data.decode('base64'), np.uint8)
#     nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#     cv2.imwrite("output_render/render_canvas.jpg", img)
#     # subprocess.call("python pix2pix-tensorflow/pix2pix.py --mode test --input_dir output_render --output_dir render --checkpoint terrain-model", shell=True)
#     subprocess.call("python pix2pix-tensorflow/pix2pix.py --mode", shell=True)
#     # cv2.imwrite("render_canvas.jpg", img)
#     # cv2.imshow('', img)
#     # cv2.waitKey(1)
#     # cv2.destroyAllWindows()
#     return json.dumps({'status': encoded_data})

if __name__ == "__main__":
    app.run()