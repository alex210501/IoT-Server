const mqtt = require('mqtt')
const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`
var fs = require('fs');
let Data = [];

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'room-quality@ttn',
    password: 'NNSXS.DP477SCLVUUKUKV2ECB3KVNOVIBATHX75LMHRIA.7WTPT6JQPVGNCR2GOYAN5WVSCUHVXE44UHFY64S3QIZHVL3YOQLQ',
    reconnectPeriod: 1000
})

client.on('connect', () => {
  var topic = "v3/room-quality@ttn/devices/device-1/up";
  console.log('Connected')
  client.subscribe(topic); //single topic
  console.log("connected +subscribed");
});

// Getting the data from a device with MQTT protocol
client.on("message", function (topic, message, packet) {
  var getDataFromTTN = JSON.parse(message);
  device_id = getDataFromTTN.end_device_ids.device_id;
  data = getDataFromTTN.uplink_message.decoded_payload;
  let data_device = {"device_id": device_id, "data" : data}
  Data.push(data_device);
  var Data_file = JSON.stringify(Data, null, 2);
  fs.writeFile("Data_By_Device.json", Data_file, function(err, result) {
    if(err) console.log('error', err);
  });
});



client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1)
});

