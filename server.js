const app = require('./app');

const { PORT } = process.env;

async function init() {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(`An error occured: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

init();
