# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

USER root

# Копируем package.json и package-lock.json из корня проекта
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Стартуем приложение
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]

# Открываем порт для фронтенд-приложения
EXPOSE 3000
