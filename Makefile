DOCKER_COMPOSE_NGINX=docker-compose -f ./docker/webservers/nginx/docker-compose.yml
DOCKER_COMPOSE_HTTPD=docker-compose -f ./docker/webservers/httpd/docker-compose.yml

all:

docker-nginx:
	@$(DOCKER_COMPOSE_NGINX) up --build --detach --remove-orphans

docker-nginx-stop:
	@$(DOCKER_COMPOSE_NGINX) down

docker-nginx-restart:
	@$(DOCKER_COMPOSE_NGINX) restart

docker-httpd:
	@$(DOCKER_COMPOSE_HTTPD) up --build --detach --remove-orphans

docker-httpd-stop:
	@$(DOCKER_COMPOSE_HTTPD) down

docker-httpd-restart:
	@$(DOCKER_COMPOSE_HTTPD) restart
