FROM node:16

COPY package*.json ./
COPY . .
COPY index.html index.html

RUN npm i 

CMD ["npm", "run", "dev"]
