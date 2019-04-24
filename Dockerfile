# get Docker node
FROM node:latest
#make this folder
RUN mkdir -p /usr/src/app
#user this folder
WORKDIR /usr/src/app
#put package.json in folder
COPY package.json /usr/src/app/
#install my packages
RUN npm install
COPY . /usr/src/app
#bind this port
EXPOSE 3000
CMD ["npm", "start"]