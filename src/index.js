const express = require('express');
const { PORT } = require('./config');
const { ServerConfig, Logger, Queue } = require('./config')
const app = express();
const amqplib = require('amqplib');
const apiRoutes = require('./routes');
const  CRON = require('./utils/common/cron-jobs');

async function connectQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue('noti-queue');
        channel.sendToQueue('noti-queue', Buffer.from("One more msg 2"));
        // setInterval(()=> {
        //     channel.sendToQueue('noti-queue', Buffer.from("This is a message for to do"));
        // }, 100000);
    } catch (error) {
        console.log(error);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const router = express.Router();

app.use('/api', apiRoutes);
app.use('/bookingsService/api', apiRoutes);
app.listen(ServerConfig.PORT, async ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    Logger.info('Server is live', {});
    CRON();
    await Queue.connectQueue();
    console.log("Queue connected");
})