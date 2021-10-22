import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_HOST } from './../../../../config'
import { Link, withRouter } from 'react-router-dom'

const Like = (props) => {
  const { detail, sid, setSid, setSelectColor, selectColor } = props
  let [like, setLike] = useState([])
  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/like`)
      setLike(r.data)
    })()
  }, [])
  let count = 0
  return (
    <div className="container-fluid mt-5 li_maxWidth">
      <h5>你可能也會喜歡</h5>
      <div className="row">
        <>
          <div className="d-flex">
            {like.length > 0 &&
              like.map((v, i) => {
                if (
                  v.categories === detail.categories &&
                  v.type === detail.type &&
                  v.sid !== detail.sid
                ) {
                  count++
                }
                if (count > 4) {
                  return ''
                }

                return v.categories === detail.categories &&
                  v.type === detail.type &&
                  v.sid !== detail.sid ? (
                  <div
                    key={i}
                    className="li_productCard col-6 col-lg-3 py-5 li_h500"
                  >
                    {' '}
                    <Link
                      to={{
                        pathname: `/products/productsDetail/${v.sid}/${v.default}`,
                      }}
                      onClick={() => {
                        setSid(v.sid)
                        setSelectColor(v.default)
                      }}
                    >
                      <img
                        src={'http://localhost:3000/products_img/' + v.imgName}
                        alt=""
                        className="w-100"
                      />
                      <div className="li_brand">{v.brandsName}</div>

                      <div className="li_productName">{v.name}</div>
                      <div className="li_price">${v.price}</div>
                    </Link>
                  </div>
                ) : (
                  ''
                )
              })}
          </div>
        </>
      </div>
    </div>
  )
}

export default withRouter(Like)
