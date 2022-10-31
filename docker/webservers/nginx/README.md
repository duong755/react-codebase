# Deploy to Nginx web server

This note is about deploying a React web application to Nginx web server on Linux machine.

## Manually

### Introduction

Nginx is free-of-charge and open-source. Its website is [nginx dot org](https://nginx.org).

In 2019, **Nginx, Inc** is acquired by **F5, Inc**. From the open-source Nginx, they developed commercial version called Nginx Plus, and other products. See [nginx dot com](https://nginx.com).

This note only dues with the open-source version of Nginx.

### Getting started

Firstly, you have to install Nginx, either [from sources](https://nginx.org/en/docs/configure.html) or via some [package manager](https://nginx.org/en/docs/install.html).

Nginx comes with configuration files, but I will write about them in the next section.

After installing, you should have access to the executable `nginx`. The following command shows `nginx`'s help message.
```shell
nginx -h
```

To see whether `nginx` is running, stopped..., at least one of these commands would help:
> `$ service nginx status`

> `$ systemctl status nginx`

At some point, you might want to

- start Nginx
> `$ sudo service nginx start`

> `$ sudo systemctl start nginx`

- stop Nginx
> `$ sudo service nginx stop`

> `$ sudo systemctl stop nginx`

> `$ sudo nginx -t stop`

> `$ sudo nginx -t quit`

The last command will let Nginx finish serving current requests and then stop Nginx.

- restart Nginx
> `$ sudo service nginx restart`

> `$ sudo systemctl restart nginx`

In case you have edited Nginx configuration files and want to apply the changes, you can reload instead.

> `$ sudo service nginx reload`

> `$ sudo systemctl reload nginx`

> `$ sudo nginx -s reload`


### Nginx's files

The locations (on the Linux file system) of Nginx's files vary between different distro. Luckily, those information can be obtained via the command
> `$ nginx -V`

This command prints out the version of Nginx and its configure arguments. If you install Nginx from sources, these would be quite familiar.

You can see the entire list of arguments in [configuring Nginx](https://nginx.org/en/docs/configure.html). However, I write down here two of the most notable arguments:

- `--conf-path`: the absolute path to the "main" configuration file.
- `--modules-path`: where Nginx stores its modules.

By defaults, `--conf-path=/etc/nginx/nginx.conf`

### Syntax of Nginx configuration files

## Using Docker
