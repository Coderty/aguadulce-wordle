FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install --production

EXPOSE 8080
CMD [ "node", "src/index.js" ]