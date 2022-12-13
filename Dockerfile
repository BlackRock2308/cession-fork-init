#stage 1
FROM node:14-alpine as node
WORKDIR /app
COPY / ./
RUN npm install
RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/wootoo-front /usr/share/nginx/html
#stage 
CMD ["/bin/sh", "-c", "\
sed -i s#API_URL#$API_URL#g /usr/share/nginx/html/main.*.js &&\
nginx -g 'daemon off;'"]
