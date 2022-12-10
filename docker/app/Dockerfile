FROM node:19.2.0
ENV NODE_ENV production

WORKDIR /var/www
ADD . .

EXPOSE 3000

RUN npm run build
CMD ["node", ".output/server/index.mjs"]
