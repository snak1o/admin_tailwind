FROM node:lts-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod

RUN npm install -g serve

COPY ./entrypoint.sh /app/entr.sh
RUN chmod a+x /app/entr.sh

ENTRYPOINT ["/app/entr.sh"]
