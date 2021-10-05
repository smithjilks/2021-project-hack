FROM logstash:5

# Add your logstash plugins setup here
RUN logstash-plugin install logstash-input-rabbitmq

COPY config/logstash.conf /etc/logstash/conf.d/
