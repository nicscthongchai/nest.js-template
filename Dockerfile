FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn --silent
RUN yarn build

FROM node:12-alpine AS modules
WORKDIR /app
COPY ./package.json ./package.json
RUN yarn --silent --production

FROM mhart/alpine-node:slim-12 AS runtime
WORKDIR /app
# RUN apk --no-cache add curl
# RUN curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
# RUN chmod +x ./kubectl
# RUN mv ./kubectl /usr/local/bin/kubectl
# COPY ./kubeconfig.yaml /app/kubeconfig.yaml
COPY --from=builder /app/dist ./dist
COPY --from=modules /app/node_modules ./node_modules

CMD [ "node", "dist/main" ]