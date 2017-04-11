import style from './SwitcherBar.scss'

import React from 'react'
import classnames from 'classnames'

import {
  Logo,
  ShoppingCartIcon,
  CloseIcon,
  PhoneIcon,
  TabletIcon,
  DesktopIcon
} from './Icons'

const SwitcherBar = function ({currentProduct, toggleViewport, toggleSwitcher, viewport}) {
  const switcherText = currentProduct ? (
    <div>
      {currentProduct.name}
      <span className={style.badge}>{currentProduct.tag}</span>
    </div>
  ) : 'Select a Product +'

  return (
    <header className={style.root}>

      {/* Logo */}
      <div className={`${style.logo} pull-left`}>
        <a href="http://mustafaismail.co/" title="Mustafa ismail">
          <Logo height="24" width="24" />
        </a>
      </div>

      {/* Product Switcher */}
      <div className={`${style.switcher} pull-left`}>
        <a href={currentProduct.url} onClick={ e => { e.preventDefault(); toggleSwitcher() } } title="Select a Product">
          { switcherText }
        </a>
      </div>

      {/* Bar Remove Button */}
      <div className={`${style.btn} pull-right`}>
        <a href={currentProduct.url} title="Close this bar" className="icon-remove">
          <CloseIcon height="24" width="24" />
        </a>
      </div>

      {/* Purchase Button */}
      <div className={`${style.btn} pull-right`}>
        <a href={currentProduct.purchase} title="Purchase" className="icon-shopping-cart">
          <ShoppingCartIcon height="24" width="24" />
        </a>
      </div>

      {/* Mobile Button */}
      <div className={ classnames(`${style.btn} pull-right hidden-xs`, { [style['btn--disabled']]: !currentProduct.responsive }) }>
        <a onClick={ e => { e.preventDefault(); toggleViewport('mobile') } } className={classnames('icon-mobile-phone', { [style.current]: viewport === 'mobile' })} href="#" title="Smartphone View">
          <PhoneIcon height="24" width="24" />
        </a>
      </div>

      {/* Tablet Button */}
      <div className={ classnames(`${style.btn} pull-right hidden-xs`, { [style['btn--disabled']]: !currentProduct.responsive }) }>
        <a onClick={ e => { e.preventDefault(); toggleViewport('tablet') } } className={classnames('icon-tablet', { [style.current]: viewport === 'tablet' })} href="#" title="Tablet View">
          <TabletIcon height="24" width="24" />
        </a>
      </div>

      {/* Desktop Button */}
      <div className={ classnames(`${style.btn} pull-right hidden-xs`, { [style['btn--disabled']]: !currentProduct.responsive }) }>
        <a onClick={ e => { e.preventDefault(); toggleViewport('desktop') } } className={classnames('icon-desktop', { [style.current]: viewport === 'desktop' })} href="#" title="Desktop View">
          <DesktopIcon height="24" width="24" />
        </a>
      </div>

    </header>
  )
}

export default SwitcherBar
