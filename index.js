const mqtt = require('mqtt')
const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`
var fs = require('fs');
const express = require('express');
const { json } = require('express')
const app = express();
var cors = require('cors');
app.use(cors());
const port_2 = '8080'
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
  Data = [];
  Data.push(data_device);
});

client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1)
});

// Sending the Json on the API
app.listen( port_2, function(){
  console.log("Server is running on port 8080");
});

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.json(Data);
});