import style from './Iframe.scss'
import React, { Component } from 'react'
import classnames from 'classnames'

class Iframe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const { currentProduct } = this.props
    let { loading } = this.state

    if ((currentProduct && nextProps.currentProduct) && (currentProduct.url !== nextProps.currentProduct.url)) {
      loading = true
    }

    this.setState({
      loading
    })
  }

  handleOnLoad = (e) => {
    this.setState({
      loading: false
    })
  }

  render () {
    const { loading } = this.state
    const { viewport, currentProduct } = this.props

    const className = classnames(style.holder, style[viewport], {
      [style.loading]: loading
    })

    return (
      <div className={className}>
        <iframe
          className={style.iframe}
          src={currentProduct.url}
          onLoad={this.handleOnLoad}
          onError={this.handleOnLoad} >
        </iframe>
      </div>
    )
  }
}

export default Iframe
