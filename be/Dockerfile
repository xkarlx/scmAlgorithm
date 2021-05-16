FROM node:15.0.1-alpine3.10

WORKDIR /server
ENV NODE_ENV development

COPY ./be/package.json /server/package.json

RUN npm install --production

COPY ./be /server

CMD ["npm","start"]

EXPOSE 5000
