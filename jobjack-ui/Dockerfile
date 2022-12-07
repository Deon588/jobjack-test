# 1. Deploy our Angular app to NGINX
FROM nginx:alpine

## Replace the default nginx index page with our Angular app

RUN apk add --no-cache bash
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/jobjack-ui/* /usr/share/nginx/html/
COPY ./.nginx/nginx-default.conf.template /etc/nginx/default.conf.template
COPY docker-entrypoint.sh /
COPY ./ssl /etc/ssl

run chmod -R 777 /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]