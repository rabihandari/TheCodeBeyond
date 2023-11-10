FROM node
    
WORKDIR /home/app

RUN npm config set strict-ssl false
COPY package.json /home/app/

RUN npm install
RUN mkdir -p /home/app

COPY . /home/app

CMD ["npm", "run", "production"]