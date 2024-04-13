
# Aszendix-backend

Backend of Aszendix app.



## Deployment

To deploy this project start creating new db

```bash
docker run --name db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=app -e MYSQL_USER=app -e MYSQL_PASSWORD=app -p 3306:3306 -p 33060:33060 -d mysql:8.0
```

Then config the .env file using the example. 
For server use this command for get ip:
```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db
```

Then you can now run all the app.

NOTE: Temporaly use root user

If you want you can run pnpm prisma:studio for GUI app for DB management

