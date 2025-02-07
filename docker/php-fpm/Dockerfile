FROM phpdockerio/php:8.2-fpm
WORKDIR "/application"

# Ensure php-fpm is installed
RUN apt-get update \
    && apt-get -y --no-install-recommends install \
        php8.2-fpm \
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

# Ensure proper permissions
RUN chmod 755 /usr/local/sbin/php-fpm