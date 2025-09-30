FROM node:18

WORKDIR /app

# Copy package.json for caching
COPY ./server/package*.json ./

# Install dependencies as root
RUN npm install && rm -rf /tmp/* /var/tmp/*

# Copy application code
COPY ./server/src/ ./src/

# Create log directory owned by node
RUN mkdir -p ./logs && chown -R node:node ./logs

# Switch to non-root user for running the app
USER node

CMD [ "npm", "run", "start:dev" ]
