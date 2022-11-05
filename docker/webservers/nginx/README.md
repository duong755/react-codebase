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

About configuring Nginx, we often work with `/etc/nginx/nginx.conf` file and `*.conf` files locating in `/etc/nginx/conf.d/`.

Syntactically, Nginx allow us to write configuration in terms of *blocks* and *directives*.

An Nginx directive starts with its name, followed by a list of arguments (separated by spaces), and ends with a semicolon.

```nginx
directive name arg1 arg2 arg3;
```

An Nginx block is indicated by its name, followed by a list of arguments (similar to directives, or not), a pair of curly braces which might be empty or contains other blocks and directives.

```nginx
block_name {
  # block content
}
# or
block_name arg1 arg2 {
  # block content
}
```

Most common blocks and directives in Nginx are:
- Blocks: `http`, `server`, `location`, `upstream`, `stream`, `events`...
- Directives: `root`, `index`, `add_header`, `proxy_pass`, `proxy_set_header`, `try_files`, `access_log`, `error_log`, `include`... There are hundreds of Nginx directives.

where the `include` directive permits splitting configuration. In the real world, an Nginx web server often has one `http` block placed in `/etc/nginx/nginx.conf`, other websites' configuration placed in `/etc/nginx/conf.d/*.conf` (these are loaded to `/etc/nginx/nginx.conf` via the `include` directive).

### Serve a React application

I would keep the default `/etc/nginx/nginx.conf`, but I have to make sure that this file has already included `*.conf` files within `/etc/nginx/conf.d/` directory.

To serve the React application, I prove the following content to `/etc/nginx/conf.d/default.conf`, which is minimal (at least I think so), and copy the `build` directory to `/usr/share/nginx/html/react-app/`

```nginx
server {
  listen       80;
  listen  [::]:80;
  server_name  localhost;

  root   /usr/share/nginx/html/react-app;
  index  index.html index.htm;

  location / {
    try_files $uri /index.html; # react routes are different from server routes, so you're gonna need this line
  }
}
```

After those changes and reloading Nginx, it would work - You would be able to access the React application by going to `http://localhost` in your web browser.

## Using Docker

Make sure to have Docker installed on your machine.

I provided the `default.conf`, `docker-compose.yml`, and `Dockerfile` in the same directory which contains this README. To use them, go to the root of the project (it contains a `Makefile`), and the following command:
```shell
make nginx
```

I recommend readers to learn by doing and reading Nginx documentation. Go ahead and make changes to the files.
