from flask import Flask, request, jsonify
import torch
from PIL import Image
import base64
import io

app = Flask(__name__)

# YOLOv5 모델 로드
model = torch.hub.load('ultralytics/yolov5', 'custom', path='./content/yolov5/runs/train/results2/weights/best.pt')

@app.route('/predict', methods=['POST'])
def predict():
    # 클라이언트로부터 전송된 이미지 데이터 받기
    image_data = request.json['image']

    # base64 형식의 이미지 데이터를 PIL Image 객체로 변환
    image = Image.open(io.BytesIO(base64.b64decode(image_data)))

    # 이미지 전처리 및 예측 수행
    results = model(image)

    # 결과 추출 및 필요한 정보 추출 (예: 클래스, 경계 상자 등)
    predictions = results.pandas().xyxy[0].to_dict(orient='records')

    return jsonify(predictions=predictions)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
