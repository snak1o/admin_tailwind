run:
	docker run -p "3000:3000" --env VUE_API_URL=http://localhost:5000 -d $(name)
build:
	docker build -t $(name) .
rm_all:
	docker rm -f $(shell docker ps -aq)
