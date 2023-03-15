FROM node:19.8.1
ENV NODE_ENV production

WORKDIR /var/www
ADD . .

EXPOSE 3000

RUN npm run build
CMD ["node", ".output/server/index.mjs"]
