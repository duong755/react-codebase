all:

docker-dev:
	@docker-compose -f ./docker/dev/docker-compose.yml up --build --detach

docker-dev-stop:
	@docker-compose -f ./docker/dev/docker-compose.yml down

docker-dev-restart:
	@docker-compose -f ./docker/dev/docker-compose.yml restart

docker-prod:
	@docker-compose -f ./docker/prod/docker-compose.yml up --build --detach

docker-prod-stop:
	@docker-compose -f ./docker/prod/docker-compose.yml down

docker-prod-restart:
	@docker-compose -f ./docker/prod/docker-compose.yml restart
