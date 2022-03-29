FROM node:16.13.0-alpine3.14 AS build

USER node
WORKDIR /home/node

ADD --chown=node:node package.json .
ADD --chown=node:node package-lock.json .
ADD --chown=node:node secretKey.txt .

RUN npm install

ADD --chown=node:node . .

RUN rm secretKey.txt

# --------------------------------------------------

FROM node:16.13.0-alpine3.14

USER node
WORKDIR /home/node

COPY --from=build /home/node /home/node

CMD [ "node", "app.js" ]
