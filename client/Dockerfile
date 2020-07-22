# build minified and uglified version of application
FROM node:13-alpine as base-client
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# copy production-ready files to an nginx server to answer requests
FROM nginx
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=base-client /app/build /usr/share/nginx/html