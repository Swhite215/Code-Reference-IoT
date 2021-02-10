var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

// Connect to Broker
client.on('connect', function () {

    let brokerSystemDataTopics = [
      '$SYS/broker/bytes/received', // Total Bytes Received
      '$SYS/broker/bytes/sent', // Total Bytes Sent
      '$SYS/broker/clients/connected', //Number of Connected Clients
      '$SYS/broker/clients/expired', // Number of Persistent Disconnected and Removed Clients
      '$SYS/broker/clients/disconnected', // Number of Persistent Clients Currently Disconnected
      '$SYS/broker/clients/maximum', // Maximum Number of Concurrently Connected Clients
      '$SYS/broker/clients/total', // Total Number of Active and Inactive Clients
      '$SYS/broker/publish/messages/received', // Total Number of Messages of Any Type Receieved
      '$SYS/broker/publish/messages/sent', // Total Number of Messages of Any Type Sent
      '$SYS/broker/retained messages/count', // Total Number of Retained Messages
      '$SYS/broker/store/messages/count', // Total Number of Messages Held in Message Store
      '$SYS/broker/store/messages/bytes', // Total Number of Bytes Help By Message Payloads in Message Store
      '$SYS/broker/version', // Version of Broker
      '$SYS/broker/subscriptions/count', // Number of Subscriptions Active on Broker
    ];


    // Total Number of Bytes Received Since Broker Started
    client.subscribe(brokerSystemDataTopics, function (err) {
        if(err) {
          console.log("Error Subscribing to Broker Data");
        }
    });
});

// Read Messages from Subscribed Topics
client.on('message', function(topic, message) {
  console.log(`Topic: ${topic} - ${message.toString()}`);
  client.end();
});


   