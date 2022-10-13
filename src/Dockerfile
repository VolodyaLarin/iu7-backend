FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --force
COPY ./dist .
COPY ./swagger ./swagger

EXPOSE 8055
CMD [ "node", "app.js" ]