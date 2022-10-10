
sudo docker run -it --rm -P -p 127.0.0.1:3306:3306 \
 --name some-mysql \
 -e MYSQL_DATABASE=mydb -e MYSQL_ROOT_PASSWORD=1234\
 --cpus=4 -m 6g \
 -d mysql:latest