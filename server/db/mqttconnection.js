const mqtt = require('mqtt');
// var options = {
//     host: process.env.mqqtHost,
//     port: process.env.mqqtport,
//     protocol: process.env.mqqtprotocol,
//     username: process.env.mqqtusername,
//     password: process.env.mqqtpassword
// }

// var client = mqtt.connect(options);
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://broker.emqx.io:8083/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}
var client = mqtt.connect(host,options);
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});
client.on('error', (error) => {
    console.error('MQTT Connection Error:');
});
module.exports=client;