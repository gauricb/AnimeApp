FROM node:alpine

RUN npm install -g pm2

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

# Make sure to delete node_modules folder before building the image
COPY ./ ./
# for svelte
RUN npm run build 

CMD ["npm", "run", "docker-start"]