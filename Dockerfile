FROM node:carbon

ADD . /app

WORKDIR /app

COPY package.json ./

RUN cd /app && npm install

CMD [ "npm", "start" ]
