FROM elasticsearch:5

ENV ES_JAVA_OPTS="-Des.path.conf=/etc/elasticsearch"

RUN bin/elasticsearch-plugin install x-pack

CMD ["-E", "discovery.zen.minimum_master_nodes=1"]
