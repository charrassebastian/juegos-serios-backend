FROM node:lts-hydrogen
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD index.js ./
CMD ["node", "index.js"]

