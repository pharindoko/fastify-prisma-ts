FROM node:14

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npm run prisma:generate
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]