GH_REPO = https://github.com/JKUATSES/2021-project-hack.git
C_DIR = chronograf/
I_DIR = influxdb/
K_DIR = kapacitor/

clean: stop remove-files

all: clean pull build start

pull:
	docker-compose pull

build:
	docker-compose build

start:
	chmod 755 rabbitmq/cluster-entrypoint.sh
	docker-compose up -d

stop:
	docker-compose down

remove-files:
	docker system prune -a
	docker volume prune
	[ -d $(C_DIR) ] && echo exists && rm -rf $(C_DIR) $(I_DIR) $(K_DIR) || echo not exists

logs:
	watch docker-compose logs

clear_db:
	sudo rm -rf chronograph/data grafana/data grafana/provisioning influxdb/data kapacitor/data elasticsearch/data logstash/data kibana/data
	mkdir kapacitor/data chronograph/data influxdb/data elasticsearch/data logstash/data kibana/data