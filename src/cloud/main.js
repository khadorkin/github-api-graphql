import express from 'express';
import graphqlHTTP from 'express-graphql';
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
import { Strategy as GitHubStrategy } from 'passport-github2';
import githubSchema from '../schema';
const partials = require('express-partials');

const app = express();

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      
    return done(null, { profile, accessToken } );
  });
}
));

app.set('views', __dirname + '/../../views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.all('/graphql', (req, res) => res.redirect('/'));

app.use('/', ensureAuthenticated, graphqlHTTP(req => ({
  schema: githubSchema,
  graphiql: true,
  pretty: true,
  rootValue: { user: req.user }
})));


// Listen for incoming HTTP requests
const listener = app.listen(3000, () => {
  var host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  var port = listener.address().port;
  console.log('Listening at http://%s%s', host, port === 80 ? '' : ':' + port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/login')
}
