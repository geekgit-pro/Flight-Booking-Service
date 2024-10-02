const express = require('express');
const { PORT } = require('./config');
const { ServerConfig, Logger } = require('./config')
const app = express();
const apiRoutes = require('./routes');
const  CRON = require('./utils/common/cron-jobs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const router = express.Router();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    Logger.info('Server is live', {});
    CRON();
})