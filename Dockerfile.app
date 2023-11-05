FROM node:18-alpine
WORKDIR /app

COPY ./package.json ./yarn.* ./
# Install both dev and devDependencies
RUN yarn install --frozen-lockfile
COPY . /app

RUN yarn gen:keypair

RUN yarn build

ENV NODE_ENV="production"

CMD ["yarn", "deploy"]

