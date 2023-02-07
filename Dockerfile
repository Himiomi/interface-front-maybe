FROM node:16-alpine
COPY . /app
WORKDIR /app
RUN npm installS
EXPOSE 4201
CMD ["npm", "run", "start-ssl"]
