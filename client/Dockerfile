FROM nginx:1.15.2-alpine

COPY ./build /var/www
RUN rm /etc/nginx/conf.d/*

COPY ./proxy/nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir /certs
