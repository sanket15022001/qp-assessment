FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "./index.ts"]
