# build

FROM node:latest AS build
WORKDIR /app

COPY package.json vite.config.js ./
COPY src ./src

RUN npm install
RUN npm run build

# deploy
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
