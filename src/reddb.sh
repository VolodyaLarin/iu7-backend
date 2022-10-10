sudo docker run -p 3050:3050 \
 --name myrdb -e SYSDBA_PASSWORD=somepassword\
  --cpus=12 -m 8g \
  -v /tmp/reddb/data:/db \
  -d red-database:3