require('dotenv').config();
const PORT = process.env.PORT || 5000;

(async function main() {
  const app = require('./app')(await require('./db'));

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})().catch(console.log);