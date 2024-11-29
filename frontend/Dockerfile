FROM node:lts-buster AS development
WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY app ./app
COPY components ./components
COPY hooks ./hooks
COPY routes ./routes
COPY services ./services
COPY next.config.ts .
COPY tsconfig.json .

EXPOSE 3000

CMD npm run dev
