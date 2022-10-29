DOCKER_COMPOSE_NGINX=docker-compose -f ./docker/webservers/nginx/docker-compose.yml

all:

docker-nginx:
	@$(DOCKER_COMPOSE_NGINX) up --build --detach --remove-orphans

docker-nginx-stop:
	@$(DOCKER_COMPOSE_NGINX) down

docker-nginx-restart:
	@$(DOCKER_COMPOSE_NGINX) restart
