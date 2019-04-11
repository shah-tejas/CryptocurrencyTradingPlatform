  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;
  const mongoose = require('mongoose'); //created model loading here
  const bodyParser = require('body-parser');
  const morgan = require('morgan');


  mongoose.connect("mongodb+srv://root:Onepiece181195@cyril-spa-zudqm.mongodb.net/HuskyCoins?retryWrites=true", { useNewUrlParser: true }).then(() => console.log('connected to DB'))
  .catch(err => {
    console.log(err);
  });

  mongoose.Promise = global.Promise;

  //Adding body parser for handling request and response objects.
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(bodyParser.json());

  //Enabling CORS
  app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      next();
  });

  //Initialize app
  let initApp = require('./api/app');
  initApp(app);

  app.listen(port);
  console.log('HuskyCoin RESTful API server started on: ' + port);
