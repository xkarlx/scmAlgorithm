# pull official base image
FROM node:14.15.4-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# install app dependencies
COPY ./fe/package.json ./
COPY ./fe/package-lock.json ./
RUN npm install react-scripts@4.0.3 -g 
RUN npm install --silent
RUN npm install --save node-sass

# add app
COPY ./fe ./

# start app
CMD ["npm", "start"]