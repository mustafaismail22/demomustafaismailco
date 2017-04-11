export function isIOSDevice () {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

export function getActiveProduct (products, location = window.location) {
  let product = location.search && location.search.toLowerCase().replace('?theme=', '')

  if (!products.hasOwnProperty(product)) {
    const pathname = location.pathname || location.href || ''
    Object.keys(products).forEach(p => {
      if (pathname.toLowerCase().includes(p)) {
        product = p
      }
    })

    if (!products.hasOwnProperty(product)) {
      product = Object.keys(products).shift()
    }
  }

  return product
}
