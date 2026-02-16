const app = require('./app');
const { connectDatabase } = require('./config/database');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Daily Task Manager API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
