if [ $1 -eq 1 ]; then
    brew services start mosquitto
elif [ $1 -eq 2 ]; then
    /usr/local/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
else
    echo "MQTT Broker not started..."
    exit
fi