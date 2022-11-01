cd "$(dirname "$0")"
sudo mkdir ../data
sudo mkdir ../data/postgresql
docker stack deploy -c docker-compose.yml whm --with-registry-auth