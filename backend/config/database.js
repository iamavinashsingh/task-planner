const mongoose = require('mongoose');

/**
 * Connects to MongoDB with production-safe defaults.
 *
 * @param {string} mongoUri - MongoDB connection string.
 * @returns {Promise<typeof mongoose>}
 */
async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is required.');
  }

  return mongoose.connect(mongoUri, {
    maxPoolSize: 20,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  });
}

module.exports = {
  connectDatabase
};
