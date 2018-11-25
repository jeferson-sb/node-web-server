const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = 3000 || process.env.PORT;

app.set('view engine', 'hbs');
// register middleware

app.use((req, res, next) => {
  let now = new Date().toLocaleString();
  let log = `${now}: ${req.method} ${req.url}`;

  fs.appendFileSync('server.log', log + '\n');
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(`${__dirname}/public`));

hbs.registerPartials(`${__dirname}/views/partials`);

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // sending data back
  // res.send('<h1>Hello Express!</h1>');
  // res.json({
  //   name: 'Jeferson',
  //   likes: [
  //     'Studying',
  //     'Games'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Conection failed'
  });
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));

app.use(function(req, res, next) {
  res.status(404).send('ERROR PAGE NOT FOUND!');
});
