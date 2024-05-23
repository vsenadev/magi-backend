import mqtt from 'mqtt';

interface MqttOptions {
  host: string;
  port: number;
  protocol: string;
  username: string;
  password: string;
}

// initialize the MQTT client
const options: MqttOptions = {
  host: '4a3f3729b0b34ceaad057b667cfbdee4.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'hivemq.webclient.1716387274653',
  password: '2B01YCS6TZarcgb;<d>.',
};

const client = mqtt.connect({ options });

// setup the callbacks
client.on('connect', () => {
  console.log('Connected');
});

client.on('error', (error: Error) => {
  console.log(error);
});

client.on('message', (topic: string, message: Buffer) => {
  // called each time a message is received
  console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');
