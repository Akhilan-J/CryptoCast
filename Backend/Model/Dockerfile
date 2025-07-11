# Model/Dockerfile
FROM python:3.9-slim-buster

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r /app/requirements.txt

CMD ["python", "prediction_pipeline.py"]
