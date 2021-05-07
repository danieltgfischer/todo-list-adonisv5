FROM alpine:latest

WORKDIR /usr/src/app

RUN apk update

RUN apk add yarn

COPY package*.json ./

COPY . .

RUN yarn

CMD [ "yarn", "dev" ]
