FROM nginx:1.27-alpine

RUN apk add --no-cache bash

COPY . /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
