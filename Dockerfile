# Use the official Node.js base image
FROM node:14

ARG USERNAME="palash"

# avoid stuck build due to user prompt
ARG DEBIAN_FRONTEND=noninteractive
ARG NGROK_AUTH_TOKEN
RUN echo "Auth token: $NGROK_AUTH_TOKEN"

RUN apt-get update && apt-get install --no-install-recommends -y \
    git \
    ssh \
    sudo \
    wget \
    curl \
    vim \
    net-tools \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /home/${USERNAME}/app

# Add `/app/node_modules/.bin` to the PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . ./

# Build the React app
RUN npm run build

# Install ngrok
RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" |   sudo tee /etc/apt/sources.list.d/ngrok.list &&   sudo apt update && sudo apt install ngrok
RUN useradd -u 1234 -m -d /home/${USERNAME} ${USERNAME}
RUN chown -R ${USERNAME}:${USERNAME} /home/${USERNAME}
RUN usermod -aG sudo ${USERNAME}

USER ${USERNAME}
RUN ngrok config add-authtoken ${NGROK_AUTH_TOKEN}
ENTRYPOINT ["./runner.sh"]
