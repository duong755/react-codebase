DOCKER_COMPOSE_NGINX=docker compose -f ./docs/docker/webservers/nginx/docker-compose.yml
DOCKER_COMPOSE_HTTPD=docker compose -f ./docs/docker/webservers/httpd/docker-compose.yml

all:

nginx:
	@$(DOCKER_COMPOSE_NGINX) up --build --detach --remove-orphans

nginx-stop:
	@$(DOCKER_COMPOSE_NGINX) down

nginx-restart:
	@$(DOCKER_COMPOSE_NGINX) restart

httpd:
	@$(DOCKER_COMPOSE_HTTPD) up --build --detach --remove-orphans

httpd-stop:
	@$(DOCKER_COMPOSE_HTTPD) down

httpd-restart:
	@$(DOCKER_COMPOSE_HTTPD) restart
