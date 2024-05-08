FROM node:18 as base
WORKDIR app
COPY package.json .
RUN npm install

COPY . .
RUN apt-get update -y && apt-get install -y openssl

RUN npx prisma generate

FROM base as production

ENV NODE_PATH=./build

RUN npm run build