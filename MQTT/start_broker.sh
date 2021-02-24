if [ $1 -eq 1 ]; then
    brew services start mosquitto
elif [ $1 -eq 2 ]; then
    /usr/local/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
elif [ $1 -eq 3 ]; then
    /usr/local/bin/hivemq-4.5.1/bin/run.sh
else
    echo "MQTT Broker not started..."
    exit
fi