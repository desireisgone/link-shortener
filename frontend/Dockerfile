FROM node:lts-buster AS development
WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY app ./app
COPY next.config.ts .
COPY tsconfig.json .

EXPOSE 3000

CMD npm run dev
