# Deploy static website to AWS Lightsail

## Introduction

Lightsail is a service that allow developers to launch projects (for examples, a website, a web server). It includes things that are needed for a project: *virtual machine*, *networking*, *database*, *container services*, *content delivery network*, *SSD*, *DNS*, *backup*.

An alternative Amazon service to Lightsail is EC2.

In this note, I write about using Lightsail instance, and how to deploy a static website to it.

## Guide

### Create a Lightsail instance

- Go to [Lightsail instances tab](https://lightsail.aws.amazon.com/ls/webapp/home/instances) and click **Create instance**.
- Now you are at the "Create an instance" page
  - Select a region and an availability zone.
  - Select operating system (Linux or Windows)
  - Select a blueprint. Blueprint is like a machine with operating system and application already installed (for example, Linux + Wordpress, Linux + Nodejs...). You can choose "Apps + OS" (if you want to have applications installed on your instance), or "OS Only" (if you want to install things later yourself).
  - Optionally, you can add a launch script (this is shell/bash script that will run on first launch)
  - To connect to the instance, you are gonna need an SSH key pair (you must use RSA for this key pair, the others are not accepted). You can use an existing key pair, or create a new one, or upload one from your local machine.
  - Choose your instance plan. This option refers to your budget and needs (memory, number of vCPU, disk size...)
  - Choose a unique name for your instance. I recommend to use a meaningful, project-related name.
  - Click "Create instance"

My options:
- Linux
- OS only
- Debian 11
- Memory: 512MB, 1vCPU, Storage: 20 GB SSD

After clicking "Create instance", you have to wait for AWS Lightsail to finish preparing the instance for you. In my case, it takes less than one minute.

You can connect to the instance via SSH
- on the browser, by clicking the shell icon
- or, by your own, via the command 
```shell
ssh -i ~/.ssh/path/to/private-key-file admin@<PUBLIC_IP_OF_THE_INSTANCE>
```

If you go for the second option, you will get a prompt
```text
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type "yes" (just pressing Enter is not enough). You can bypass this prompt by using `ssh-keyscan` command (we will use this for automation)


### Deploy static website (manually)

On local machine, this is what we do: install dependencies, build the app, pass it to a web server (for example, Nginx).

But deploying to a virtual machine is different. It is highly recommended NOT to run the install or build command on the virtual machine. That is what I did during my first experience with AWS.

Why is it not recommmended? Because the deployment machine is meant to host the app, not to build it, and the install as well as the build command require a hugh amount of resources (memory and disk). So the approach would be: install the dependencies and build the app on another machine (let's call it the build machine), and then copy the build output to the deployment machine.

- Connect to the instance via SSH
- Install Nginx, rsync
```shell
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y nginx rsync
```
- Configure Nginx. Put this content to file `/etc/nginx/conf.d/default.conf`
```nginx
server {
  listen       80;
  listen  [::]:80;
  server_name  localhost;
  server_tokens off;

  #access_log  /var/log/nginx/host.access.log  main;

  root   /usr/share/nginx/html/react-app;
  index  index.html index.htm;

  location / {
    try_files $uri /index.html; # react routes are different from server routes, so you're gonna need this line
  }

  #error_page  404              /404.html;

  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   /usr/share/nginx/html;
  }
}
```
- Create `/usr/share/nginx/html/react-app` and change owner of `/usr/share/nginx/html`
```shell
sudo mkdir -p /usr/share/nginx/html/react-app
sudo chown -R admin:admin /usr/share/nginx/html
```
(All of the above must be done before deployment by any approach, manually or Github Action...)
- Back to the local machine to install the dependencies and build the app
```shell
yarn install
yarn build:prod
```
- Copy the build output to the instance via `rsync` command (you can use `scp`, but `rsync` is more recommended and handy. For example, `rsync` can eliminate files/directories that are absent from the target, while `scp` just copies files/directories).
```shell
rsync -avzP build/ admin@<PUBLIC_IP_OF_THE_INSTANCE>:/usr/share/nginx/html/react-app --delete
```
- (Note) On some Linux distributions, a deprecated practice might be still in used - `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled`. I had to comment out `include /etc/nginx/sites-enabled/*` in `/etc/nginx/nginx.conf` to make `/etc/nginx/conf.d/default.conf` works.

### Deploy static website (with Github Action)

To deploy via Github Action, we have to provide the following:

- SSH private key.
- Username and public IP address of the instance.

In this repository, see `.github/workflows/deploy-to-aws.yml`, job `deploy-to-aws-lightsail`.
