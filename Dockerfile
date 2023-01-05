#stage 1
FROM node:14-alpine as node
WORKDIR /app
COPY / ./
RUN npm install
RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/wootoo-front /usr/share/nginx/html
COPY --from=node /app/nginx.conf /etc/nginx/conf.d/nginx.conf.template
ENV API_URL=http://10.42.1.131:8081
#stage 3
CMD ["/bin/sh", "-c", "\
envsubst '${API_URL}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf &&\
nginx -g 'daemon off;'"]
