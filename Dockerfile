FROM node:14-stretch

USER node

RUN rm -rf /home/node/code
RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .
RUN rm -rf ./.env.
COPY --chown=node:node ./.env.local .env

CMD [ "npm", "run", "start.dev" ]
