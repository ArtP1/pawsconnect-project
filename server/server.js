const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(express.json());

// current available route /api/users
app.use('/api', routes);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});

