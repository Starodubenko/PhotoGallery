// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./src/server/config.js'); // get our config file
var User = require('./src/server/model/user.js'); // get our mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.set('accessedURLs', config.accessedURLs); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup-admin', function (req, res) {

  // create a sample user
  var nick = new User({
    name: 'Rody',
    password: '1',
    firstname: 'Rodion',
    lastname: 'Starodubenko',
    admin: true
  });

  // save the sample user
  nick.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({success: true});
  });
});

app.get('/setup-user', function (req, res) {

  // create a sample user
  var nick = new User({
    name: 'John',
    password: '1',
    firstname: 'John',
    lastname: 'Doe',
    admin: false
  });

  // save the sample user
  nick.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({success: true});
  });
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.use(function (req, res, next) {

  var isAllowedURL = app.get('accessedURLs').indexOf(req._parsedUrl.pathname) >= 0;

  if (!isAllowedURL) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'];//x-access-token
    if (token) {
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token.'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  } else {
    next();
  }
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
  res.json({message: 'Welcome to the coolest API on earth!'});
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

apiRoutes.get('/check-access', function (req, res) {
  var token = req.body.token || req.query.token || req.headers['authorization'];
  var state = req.query.state;
  jwt.verify(token, app.get('superSecret'), function (err, decoded) {
    if (err) {
      return res.json({access: false, message: 'Failed to authenticate token.'});
    } else {
      var id = decoded._doc._id;
      User.findById(id, function (err, user) {
        res.json({access: checkPermissions(user,state)});
      });
    }
  });

});

var checkPermissions = function (user, state) {
  var result = false;
  if (user.admin && state == 'admin') {
    result = true
  } else
  if (state == 'photoView') {
    result = true
  }
  return result;
};

var firstPage = function (isAdmin) {
  return isAdmin ? 'admin' : 'photoView';
};

apiRoutes.post('/authenticate', function (req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({success: false, message: 'Authentication failed. User not found.'});
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({success: false, message: 'Authentication failed. Wrong password.'});
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          firstPage: firstPage(user.admin),
          token: token
        });
      }

    }

  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
