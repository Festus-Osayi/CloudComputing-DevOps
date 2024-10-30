FROM ubuntu

WORKDIR /app

COPY requirements.txt /app
COPY devops /app

# Install dependencies and create a virtual environment
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    python3 -m venv /app/venv && \
    /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# Set the virtual environment as default for the ENTRYPOINT and CMD commands
ENV PATH="/app/venv/bin:$PATH"

ENTRYPOINT ["python3"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]

