FROM php:7.1-apache
MAINTAINER Rob Zeeman <rob.zeeman@di.huc.knaw.nl>
EXPOSE 80 443
COPY --chown=www-data:www-data  ./build/ /var/www/html/


RUN a2enmod rewrite