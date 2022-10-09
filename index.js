const mqtt = require('mqtt')

/*
In this part of the code I'll use a free public MQTT Server provided by 
EMQX, which is created based on EMQ's MQTT cloud
Broker (host) : broker.emqx.io
TCP port : 1883
SSL/TLS port : 8883 
*/

const host = 'broker.emqx.io'
const port = '1883'
const clientId = 'mqtt_${Math.random().tostring(16).slice(3)}'
const connectUrl = 'mqtt://${host}:${port}'

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000
})

const topic = '/nodejs/mqtt'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})

client.on('connect', () => {
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
})