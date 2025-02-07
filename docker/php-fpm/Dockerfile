FROM phpdockerio/php:8.2-fpm
WORKDIR "/application"

# Remove any existing nodejs installation
RUN apt-get purge -y nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Add Node.js 18.x repository and install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update \
    && apt-get -y --no-install-recommends install \
        git \
        php8.2-fpm \
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
    && npm install -g npm@latest \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Create symlink for php-fpm
RUN ln -s /usr/sbin/php-fpm8.2 /usr/local/bin/php-fpm

# Verify Node.js and npm versions
RUN node --version && npm --version
