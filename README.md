# ourspace-organizer

OurSpace Organizer Web-app

1. Server Setup

    1. Install Apache2 and PHP<br />
       `sudo apt-get install apache2 libapache2-mod-php7.2 php7.2 php7.2-xml php7.2-gd php7.2-opcache php7.2-mbstring`<br />

    2. Give `www-data` user group write permission<br />
       `sudo chgrp -R www-data /var/www/html/your-project`<br />
       `sudo chmod -R 775 /var/www/html/your-project/storage`<br />

    3. Configure apache2 config<br />
       `cd /etc/apache2/sites-available`<br />

        Add the following to `ourspace-organizer.conf`<br />
        ```
        <VirtualHost *:80>
           ServerName <DOMAIN>

           ServerAdmin ubuntu@localhost
           DocumentRoot /var/www/ourspace-organizer/public

           <Directory /var/www/ourspace-organizer>
              AllowOverride All
           </Directory>

           ErrorLog ${APACHE_LOG_DIR}/error.log
           CustomLog ${APACHE_LOG_DIR}/access.log combined
        </VirtualHost>
        ```

     4. Activate config file<br />
      `sudo a2dissite 000-default.conf`<br />
      `sudo a2ensite laravel.conf`<br />
      `sudo a2enmod rewrite`<br />
      `sudo service apache2 restart`<br />

     Reference : https://www.howtoforge.com/tutorial/install-laravel-on-ubuntu-for-apache/<br />

2. Project Setup

    1. Clone project<br />
       `git clone https://github.com/rnjssh96/ourspace-organizer.git`<br />

    2. Install Composer Dependencies<br />
       `composer install`<br />

    3. Install NPM Dependencies<br />
       `npm install`<br />

    4. Setup `.env` file<br />
       `cp .env.example .env`<br />

    5. Generate an app encryption key<br />
       `php artisan key:generate`<br />
