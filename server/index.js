require('dotenv').config();
const massive = require('massive');
const express = require('express'),
    controller = require('./products_controller.js'),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set('db', dbInstance); //the first argument is how we reference it, the second is the actual value which is the database
    console.log('db connected');
}).catch(err => res.status(500).send(console.log(err)))

app.post('/api/products', controller.create);
app.get('/api/products/:id', controller.getOne);
app.get('/api/products', controller.getAll);
app.put('/api/products/:id', controller.update);
app.delete('/api/products/:id', controller.delete);

app.listen(port, () => console.log(`Server running on port ${port}`));