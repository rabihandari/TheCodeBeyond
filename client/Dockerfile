FROM node

WORKDIR /home/app

RUN npm config set strict-ssl false

COPY package*.json /home/app
RUN npm install

COPY . /home/app

CMD ["npm", "start"]

