import './App.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

import SwitcherBar from './SwitcherBar'
import ProductsList from './ProductsList'
import Iframe from './Iframe'
import { getActiveProduct } from '../helpers'

class App extends Component {
  static propTypes = {
    products: PropTypes.object.isRequired,
    location: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.history = typeof document !== 'undefined' ? createHistory() : createMemoryHistory()
    this.state = {
      active: getActiveProduct(props.products, props.location),
      viewport: 'desktop',
      switcher: false
    }
  }

  toggleViewport = (type) => {
    this.setState({
      viewport: type
    })
  }

  toggleSwitcher = () => {
    this.setState({
      switcher: !this.state.switcher
    })
  }

  componentDidMount () {
    this.historyUnlisten = this.history.listen(location => this.setState({
      active: getActiveProduct(this.props.products, location)
    }))
  }

  componentWillUnmount () {
    this.historyUnlisten && this.historyUnlisten()
  }

  render () {
    const { products } = this.props
    const { active, viewport, switcher } = this.state
    const currentProduct = products[active] ? products[active] : {}

    return (
      <div className="app">
        <Helmet
          defaultTitle="Mustafa Ismail"
          titleTemplate="%s | Mustafa Ismail"
          title={currentProduct.title} />
        <SwitcherBar
          viewport={viewport}
          products={products}
          switcher={switcher}
          currentProduct={currentProduct}
          toggleViewport={this.toggleViewport}
          toggleSwitcher={this.toggleSwitcher} />
        <ProductsList
          history={this.history}
          products={products}
          switcher={switcher}
          currentProduct={currentProduct}
          toggleSwitcher={this.toggleSwitcher} />
        <Iframe
          viewport={viewport}
          currentProduct={currentProduct} />
      </div>
    )
  }
}

export default App
