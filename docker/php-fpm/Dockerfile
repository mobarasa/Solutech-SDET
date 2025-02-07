FROM phpdockerio/php:8.2-fpm
WORKDIR "/application"

RUN apt-get update \
    && apt-get -y --no-install-recommends install \
        git \
        php8.2-bcmath \
        php8.2-bz2 \
        php8.2-enchant \
        php8.2-gd \
        php8.2-gmagick \
        php8.2-intl \
        php8.2-mysql \
        php8.2-odbc \
        php8.2-redis \
        nodejs \
        npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Find php-fpm location and create symlink
RUN which php-fpm && \
    ln -s $(which php-fpm) /usr/local/bin/php-fpm
