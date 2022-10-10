const mqtt = require('mqtt')
const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'room-quality@ttn',
    password: 'NNSXS.DP477SCLVUUKUKV2ECB3KVNOVIBATHX75LMHRIA.7WTPT6JQPVGNCR2GOYAN5WVSCUHVXE44UHFY64S3QIZHVL3YOQLQ',
    reconnectPeriod: 1000
})

client.on('connect', () => {
  var topic = "v3/ecam-dht11@ttn/devices/eui-70b3d57ed0055dbb/up";console.log('Connected')
  client.subscribe(topic); //single topic
  console.log("connected +subscribed");
});

client.on("message", function (topic, message, packet) {
  var getDataFromTTN = JSON.parse(message);
  data = getDataFromTTN.uplink_message.decoded_payload;
  console.log("message is " + message);
  console.log("topic is " + topic);
});

client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1)
});