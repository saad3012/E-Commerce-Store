# Quick Start Scripts

## Install all dependencies
install-all:
	cd backend && npm install
	npm install

## Run development servers
dev:
	@echo "Starting backend and frontend..."
	@echo "Backend: http://localhost:3001"
	@echo "Frontend: http://localhost:5173"
	cd backend && npm run start:dev &
	npm run dev

## Build all
build:
	cd backend && npm run build
	npm run build

## Docker commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up

docker-down:
	docker-compose down

docker-restart:
	docker-compose restart

## Database seed
seed:
	curl -X POST http://localhost:3001/products/seed

## Clean
clean:
	rm -rf backend/node_modules backend/dist
	rm -rf node_modules dist
