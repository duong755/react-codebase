# Deploy to Apache HTTP server

In this note, I write about deploying a React web application to Apache (httpd) web server on Linux machine.

## Manually

### Introduction

Apache is completely free and open-source. Its website is [https://httpd.apache.org](https://httpd.apache.org)

### Getting started

To install Apache, you can install either from [download page](https://httpd.apache.org/download.cgi) or via package manager.

It is recommended to install Apache 2.4.

To verify the installation, you can try these commands:
```shell
httpd -h
httpd -v
httpd -V
```

These three commands are similar to Nginx's.

To start/stop/restart/check status of Apache, you can use `service` or `systemctl` command. For examples:

```shell
service apache2 status # or, service httpd status
systemctl status apache2 # or, systemctl status httpd
```

### Apache's files

To know where the Apache's files are, you can view the output of the command `httpd -V`.

By default, the main configuration file `httpd.conf` is placed at `/usr/local/apache2/conf/httpd.conf`. But in real world, people often place it at `/etc/apache2/conf` or `/etc/httpd/conf` instead.

### Syntax of Apache configuration files

Like Nginx, Apache configuration files also have *blocks* and *directives*. But directives in Apache configuration files don't require a semicolon at the end, blocks use XML-like syntax.

### Serve a React application

I want to do just like Nginx: write a separated configuration file for the new website and include it in `/usr/local/apache2/conf/httpd.conf`.

I placed the configuration in `/usr/local/apache2/conf/hosts/default.conf` with the following content:

```apache
<VirtualHost *:80>
  DocumentRoot "/usr/local/apache2/htdocs"
  <Directory "/usr/local/apache2/htdocs">
    Options -Indexes +FollowSymLinks -Multiviews
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

Also, I copy the `build` directory to `/usr/local/apache2/htdocs`.

On the other hand, the React application uses `react-router-dom`, so I need additional configuration to make the website works as expected. I achieved that by putting `.htaccess` file to `/usr/local/apache2/htdocs` (this can also be written to `/usr/local/apache2/conf/hosts/default.conf`)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine on

  RewriteBase /
  RewriteRule "^index(\.html?)?$" / [R,L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . / [L]
</IfModule>
```

## Using Docker

Make sure to have Docker installed on your machine.

I provided the `default.conf`, `.htaccess`, `docker-compose.yml`, and `Dockerfile` in the same directory which contains this README. To use them, go to the root of the project (it contains a `Makefile`), and the following command:
```shell
make httpd
```

I recommend readers to learn by doing and reading Apache documentation. Go ahead and make changes to the files.
