# build production
FROM node:18-buster as build
WORKDIR /code
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --omit=dev
COPY . .
RUN npm run build


# NGIX Web Server
FROM nginx:1.21.6-alpine as production

COPY --from=build /code/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]
