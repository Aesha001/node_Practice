FROM node:14

WORKDIR /app

COPY pakage*.json ./

RUN npm install

COPY . .

Expose 1234

CMD ["npm", "start"]
