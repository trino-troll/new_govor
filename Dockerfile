FROM node:latest

WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .

EXPOSE 3000

CMD npm run build && npm run start