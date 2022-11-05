FROM node:latest

WORKDIR /frontend

COPY package-lock.json /frontend/
COPY package.json /frontend/

RUN npm install

COPY . /frontend/

CMD ["npm", "run", "dev"]