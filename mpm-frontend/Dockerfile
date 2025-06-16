FROM node:19-slim

WORKDIR /client

COPY . /client/

EXPOSE 4173

RUN npm install && npm run build

CMD ["npm", "run", "preview", "--", "--host"]

