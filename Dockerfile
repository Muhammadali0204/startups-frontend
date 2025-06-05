# 1. Build step
FROM node:20 AS builder

WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

# 2. Serve step
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
