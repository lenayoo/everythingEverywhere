FROM python:3.10
EXPOSE 5000
WORKDIR /app

ENV FLASK_APP=app
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV PYTHONUNBUFFERED=1 

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run", "--host", "0.0.0.0", "--reload", "--debug"]
