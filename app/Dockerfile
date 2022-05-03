FROM node:18

WORKDIR /usr/src/app
COPY . .
RUN if [ -d "node_modules" ]; then rm -Rf node_modules; fi
RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]