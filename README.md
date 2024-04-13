# Hackaton Backend


## Levantar BBDD
Iniciar una nueva bbdd con docker:
docker run --name db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=app -e MYSQL_USER=app -e MYSQL_PASSWORD=app -p 3306:3306 -p 33060:33060 -d mysql:8.0

Ajustar .env

Luego ejecutar pnpx prisma db pull