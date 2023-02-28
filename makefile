test:
	docker compose -f server/docker-compose.yml -f server/docker-compose.test.yml -p mern-zustand-auth-test up -d 
dev:
	docker compose -f server/docker-compose.yml up -d 

test-down: 
	docker compose -p mern-zustand-auth-test down 
dev-down: 
	docker compose down 