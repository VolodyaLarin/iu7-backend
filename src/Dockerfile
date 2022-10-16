FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --force
RUN npm run build
COPY ./dist .
COPY ./swagger ./swagger

EXPOSE 8055
CMD [ "node", "app_v2.js" ]