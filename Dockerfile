FROM node:14.15-alpine3.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
CMD npm run dev


