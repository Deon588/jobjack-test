#!/usr/bin/env sh
set -eu

envsubst '${SERVER_PORT} ${SERVER_NAME} ${SSL_CERT} ${SSL_CERT_KEY} ${API_URL}' < /etc/nginx/default.conf.template > /etc/nginx/nginx.conf

exec "$@"