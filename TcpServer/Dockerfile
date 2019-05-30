FROM node:8
WORKDIR /usr/src/app

RUN npm install
COPY . .
EXPOSE 8085
CMD [ "node", "server.js" ]