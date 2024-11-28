# Use Node.js as the base image
FROM node:20-slim

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libpango1.0-0 \
    libasound2 \
    fonts-liberation \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the app's code to the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Ensure Puppeteer uses the bundled Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Start the Puppeteer app
CMD ["node", "index.js"]