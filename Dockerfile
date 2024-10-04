FROM node:12.13.0-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
CMD npm run dev
