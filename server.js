const app = require('./lib/app');

const PORT =  process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
