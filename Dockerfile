FROM node:10

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "export", "DB_HOST=localhost:27017" ]

CMD [ "nodejs", "server.js" ]