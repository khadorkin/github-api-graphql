import express from 'express';
import graphqlHTTP from 'express-graphql';
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
import { Strategy as GitHubStrategy } from 'passport-github2';

import githubSchema from '../schema';
import { createLoaders } from "../fetch/loaders";

const partials = require('express-partials');

const app = express();

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });
//
// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
// }, (accessToken, refreshToken, profile, done) => {
//   process.nextTick(() => done(null, { profile, accessToken }));
// }
// ));

app.set('views', `${__dirname}/../../views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Auth
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/auth/github',
//   passport.authenticate('github', { scope: ['user'] }));
//
// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );
//
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.redirect('/login');
// }

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.all('/graphql', (req, res) => res.redirect('/'));

app.use('/', /*ensureAuthenticated,*/ graphqlHTTP(req => ({
  schema: githubSchema,
  graphiql: true,
  pretty: true,
  rootValue: {
    user: req.user,
    loaders: createLoaders(),
  },
})));


// Listen for incoming HTTP requests
const listener = app.listen(3000, () => {
  let host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  const port = listener.address().port;
  const portStr = port === 80 ? '' : `:${port}`;
  console.log(`Listening at http://${host}${portStr}`);
});
