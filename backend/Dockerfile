FROM python:3.13-slim

WORKDIR /server

COPY ./requirements.txt /server/

RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt

COPY ./app.py /server/app.py

CMD ["python", "./app.py"]
