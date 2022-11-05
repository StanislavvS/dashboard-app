FROM node:latest

WORKDIR /backend

COPY package-lock.json /backend/
COPY package.json /backend/

RUN npm install

COPY . /backend/

RUN apt-get -y update
RUN apt-get install -y openssl


CMD ["npm", "run", "start:dev"]