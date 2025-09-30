ENV ?= development
DOCKER_COMPOSE = docker compose -f docker-compose.local.yml
SERVER_SERVICE = crms-api

config:
	$(DOCKER_COMPOSE) config

build:
	$(DOCKER_COMPOSE) up --build -d --remove-orphans

down:
	$(DOCKER_COMPOSE) down

down-v:
	$(DOCKER_COMPOSE) down -v

migrate:
	docker compose -f docker-compose.local.yml exec -e ENV=development crms-api \
		npx prisma migrate dev --skip-generate --config .config/prisma.ts

generate:
	docker compose -f docker-compose.local.yml exec -e ENV=development crms-api \
		npx prisma generate --config .config/prisma.ts

migrate-deploy:
	docker compose -f docker-compose.local.yml exec crms-api \
		npx prisma migrate deploy --config .config/prisma.ts

