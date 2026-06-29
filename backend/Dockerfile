FROM python:3.12.5

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

# copy all the files which contain my code
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
