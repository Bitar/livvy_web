FROM node:lts-alpine as builder

# by only copying package.json, before running npm install. We can leverage dockers caching strategy for steps. Otherwise docker needs to run npm install every time you change any of the code.
COPY package.json ./
RUN npm install
RUN mkdir /app-ui
RUN mv ./node_modules ./app-ui
WORKDIR /app-ui
COPY . .
RUN mv .env.production .env

RUN npm run build

FROM nginx:alpine

# copy the .conf template
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/aireal_demo_web.conf

## Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app-ui/dist /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'