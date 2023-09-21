# Nuxt Image
FROM node:18.15.0 as build
ENV NODE_ENV production

WORKDIR /var/www
ADD . .

RUN npm install
#RUN npm run generate

# Nginx Image
FROM nginx:latest as publish
COPY --from=build /var/www/.output/public/ /var/www/html
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/ssl/ /var/www/docker/ssl
EXPOSE 4005
ENTRYPOINT ["nginx", "-g", "daemon off;"]
