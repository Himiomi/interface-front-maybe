FROM node:16-alpine
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start-autohost"]
