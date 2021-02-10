var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');

// Connect Subscriber
client.on('connect', function () {
    client.subscribe('stampMachine/1/itemWorkStart', function (err) {
      if (err) {
          console.log(`Error Subscribing to Start of Work: ${err}`);
      }
    });

    client.subscribe('stampMachine/1/itemWorkComplete', function (err) {
        if (err) {
            console.log(`Error Subscribing to Completion of Work: ${err}`);
        }
    });

    client.subscribe('stampMachine/1/itemTransferOut', function (err) {
        if (err) {
            console.log(`Error Subscribing to Transfer of Item Out: ${err}`);
        }
    });

    client.subscribe('stampMachine/1/end', function (err) {
        if (err) {
            console.log(`Error Subscribing to End of Machine Production: ${err}`);
        }
    });
});

let totalParts = 0;
let partList = [];

// Handle Events
client.on("message", function(topic, message) {

    if (topic == 'stampMachine/1/end') {
        // Log End Printing
        console.log(message.toString());

        // Log Total Parts
        console.log(`Total Parts Printed: ${totalParts}`);

        // Log Part ID List
        console.log(`Part ID List:`)
        for (i = 0; i < totalParts; i++) {
            console.log(`   ${i}). ${partList[i].itemInstanceID}`);
        }

        // Close the Client
        client.end();

    } else {

        // Grab the Data
        let data = JSON.parse(message.toString());

        // Log the Information of the Event
        console.log(`EVENT: ${data.dataItemID}`);
        console.log(`DATA: ${JSON.stringify(data)}`)

        // Increment and Collect All Events
        if (topic == 'stampMachine/1/itemTransferOut') {
            totalParts++;
            partList.push(data);
        }

    }

});