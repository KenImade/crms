FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install && \
    rm -rf /tmp/* /var/tmp/*

RUN chown -R node:node /app/*

COPY ./server .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]