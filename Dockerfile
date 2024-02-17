# Dockerfile
FROM node:14

RUN apt update && apt install --no-install-recommends -y \
    git \
    sudo \
    wget \
    vim \
    net-tools \
    iputils-ping \
    less \
    && apt clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
RUN npm install

COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]
