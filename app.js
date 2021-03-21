import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './server'
import data from './src/api/CONTENTLISTINGPAGE-PAGE1.json'

const app = express()

// Serving static files
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000);

let initialState = {
  isFetching: false,
  apps: data,
  page: 1,
  totalContentItems: undefined,
  pageTitle: 'Romantic Comedy',
  isSearch: false,
  searchFinal: null
}

// server rendered home page
app.get('/', (req, res) => {
  const { preloadedState, content}  = ssr(initialState)
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'build, max-age=604800')
  res.send(response);
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'build, max-age=604800')
  res.send(response)
});
