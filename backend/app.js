const express = require('express');
const routesV1 = require('./routes/v1');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const { sendSuccess } = require('./utils/apiResponse');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => sendSuccess(res, { status: 'ok' }));
app.use('/api/v1', routesV1);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
