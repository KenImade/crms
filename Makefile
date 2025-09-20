ENV ?= development
DOCKER_COMPOSE = docker compose -f docker-compose.local.yml
SERVER_SERVICE = server

config:
	$(DOCKER_COMPOSE) config

build:
	$(DOCKER_COMPOSE) up --build -d --remove-orphans

down:
	$(DOCKER_COMPOSE) down

down-v:
	$(DOCKER_COMPOSE) down -v

migrate:
	$(DOCKER_COMPOSE) exec -e ENV=$(ENV) $(SERVER_SERVICE) \
		npx prisma migrate dev --config .config/prisma.ts

migrate-deploy:
	$(DOCKER_COMPOSE) exec -e ENV=$(ENV) $(SERVER_SERVICE) \
		npx prisma migrate deploy --config .config/prisma.ts

