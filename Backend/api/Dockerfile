FROM python:3.9-slim-buster

# so this is creating inital directory to holder application in container
RUN mkdir /app

# sets workign directory to directory you just created
WORKDIR /app

# LEFT SIDE is yoru computer , right side is container
COPY requirements.txt requirements.txt

# install
RUN pip3 install -r requirements.txt

# COPY all your code to WORKDIR
COPY . .

ENV FLASK_APP=api.py

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "api:app"]