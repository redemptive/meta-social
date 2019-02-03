FROM node:10

COPY package*.json ./app/

WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "export", "DB_HOST=localhost:27017" ]

CMD [ "nodejs", "server.js" ]