FROM node:carbon

ADD . /app

WORKDIR /app

COPY package.json ./

CMD [ "npm", "start" ]
