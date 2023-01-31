# build

FROM node:19-alpine AS build
WORKDIR /app

COPY package.json vite.config.js ./
COPY src ./src

RUN npm install
RUN npm run build

# deploy
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
