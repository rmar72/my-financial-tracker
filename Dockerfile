FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM ngingx:alpine
COPY --from=build /app/build /usr/share/ngingx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]