import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

import App from './components/App'
import products from './data/products.json'
import { isIOSDevice, getActiveProduct } from './helpers'

if (typeof document !== 'undefined') {
  document.body.classList.remove('no-js')
  document.body.classList.add('js')

  if (isIOSDevice()) {
    window.location.replace(products[ getActiveProduct(products) ].url)
  }

  ReactDOM.render(
    <App products={ products } />,
    document.getElementById('root')
  )
}

module.exports = App
module.exports.Helmet = Helmet
