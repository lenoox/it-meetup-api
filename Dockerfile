#Build stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

#Production stage
FROM node:18 AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]