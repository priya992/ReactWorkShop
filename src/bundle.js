import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store'
import App from './containers/products.container'

// Create a fresh store
const store = configureStore()

render(
  <Provider store={store} >
     <App />
  </Provider>,
  document.querySelector('#app')
)
