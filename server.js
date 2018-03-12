const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
// initital express
let app = express();

// '__dirname is store our project folder path'
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// express middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method}: ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append Server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// helper functions without argument
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

// helper function with argument
hbs.registerHelper('screenIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to home page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'projects'
  });
});

// /bad Create route send json with errormessage
app.get('/bad', (req, res) => {
  res.send({
    status: '404',
    message: 'Not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

/*
  video 044 Advanced templating importent video
*/
