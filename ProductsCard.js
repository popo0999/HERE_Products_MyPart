import React from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const ProductsCard = (props) => {
  const { sid, price, name, imgName, brandsName, defaultURL } = props

  return (
    <div className="li_productCard col-6 col-lg-3 py-5 li_h500">
      <Link
        // className="li_productCard__link-overlay"
        to={'/products/productsDetail/' + sid + '/' + defaultURL}
        className="w-100 h-100 d-block"
      >
        <img
          src={'http://localhost:3000/products_img/' + imgName}
          alt=""
          className="w-100"
        />
        <div className="li_brand">{brandsName}</div>
        <div className="li_productName">{name}</div>
        <div className="li_price">${price}</div>{' '}
      </Link>
    </div>
  )
}

export default ProductsCard
