FROM node:19-slim

COPY ./.docker/nodejs/wait-for-it /wait-for-it
RUN sed -i 's/\r$//g' /wait-for-it
RUN chmod +x /wait-for-it

COPY ./.docker/nodejs/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

WORKDIR /usr/src/app
COPY package*.json ./

ENTRYPOINT ["/entrypoint"]

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
