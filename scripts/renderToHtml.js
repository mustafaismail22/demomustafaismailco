import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import pug from 'pug'
// import Helmet from 'react-helmet'
import products from '../src/data/products.json'

const debug = process.env.NODE_ENV !== 'production'
const rootPath = path.join(__dirname, '..')
const buildPath = path.join(rootPath, 'build')

const assets = require(path.join(buildPath, 'asset-manifest.json'))
const App = require(path.join(buildPath, assets['main.js']))
const Helmet = require(path.join(buildPath, assets['main.js'])).Helmet
const template = pug.compileFile(
  path.join(rootPath, 'src', 'index.pug'),
  { pretty: debug, doctype: 'html' }
)

const productsKeys = Object.keys(products)
productsKeys.push('index')

console.log()
productsKeys.forEach(product => {
  const outputPath = path.join(buildPath, product + '.html')
  console.log(`Output: ${outputPath}`)

  const AppOutput = ReactDOM.renderToString(
    <App products={products} location={{ search: `?theme=${product}`, hash: '' }} />
  )

  const html = template({
    assets: {
      scripts: ['/' + assets['main.js']],
      styles: ['/' + assets['main.css']],
      favicon: '/' + assets['static/favicon.ico']
    },
    output: AppOutput,
    helmet: Helmet.renderStatic()
  })

  fs.writeFile(outputPath, html, 'utf-8')
  console.log('done.')
  console.log()
})
