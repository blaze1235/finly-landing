#!/bin/bash
set -e

PORT="${PORT:-8080}"

sed "s/PORT_PLACEHOLDER/${PORT}/g" /etc/nginx/nginx.conf.template \
  > /etc/nginx/conf.d/default.conf

rm -f /etc/nginx/conf.d/default.conf.bak 2>/dev/null || true

exec nginx -g "daemon off;"
