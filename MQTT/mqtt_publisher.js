const MQTT = require("async-mqtt");
const client = MQTT.connect('mqtt://localhost:1883');
const { v4: uuidv4 } = require('uuid');

const main = async() => {
    // Produce 10 Parts in Quick Secession
    for (i = 0; i < 10; i++) {
        let dataModel = {
            messageid: uuidv4(),
            messageHash: "",
            dateTime: new Date(),
            itemInstanceID: "PartNumber_" + i,
            assetID: "A1000",
            dataItemID: 'ItemWorkStart'
        }

        await client.publish('stampMachine/1/itemWorkStart', JSON.stringify(dataModel));
        await new Promise(resolve => setTimeout(resolve, 2000));

        dataModel.dateTime = new Date();
        dataModel.dataItemID = "ItemWorkComplete"

        await client.publish('stampMachine/1/itemWorkComplete', JSON.stringify(dataModel));
        await new Promise(resolve => setTimeout(resolve, 2000));

        dataModel.dateTime = new Date();
        dataModel.dataItemID = "ItemTransferOut"
        await client.publish('stampMachine/1/itemTransferOut', JSON.stringify(dataModel));
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    await client.publish('stampMachine/1/end', `Stamp Machine #1 Has Finished`);
    await client.end();
}

// Connect Publisher
client.on("connect", main);