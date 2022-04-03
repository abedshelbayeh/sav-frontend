# Builder builds production code
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy files required to install dependencies
COPY package*.json ./

# Install dependencies and copy source code
RUN npm install --production
COPY ./ ./

# Build Production code
RUN npm run build

# Release includes bare minimum required to run the app, copied from Builder
FROM nginx:alpine

# Copy nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Production code to nginx's html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose container port
EXPOSE 80