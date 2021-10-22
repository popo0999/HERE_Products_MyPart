import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_HOST } from '../../config'

const FavoriteCard = (props) => {
  const { user } = props
  const [favoriteData, setFavoriteData] = useState([])
  const [isLiked, setIsLiked] = useState(true)

  useEffect(() => {
    ;(async () => {
      let r = await axios.post(`${API_HOST}/products/membersFavorite`, {
        id: user.member_sid,
      })
      setFavoriteData(r.data)
    })()
  }, [isLiked, user])
  // useEffect(() => {
  //   ;(async () => {
  //     let r = await axios.post(`${API_HOST}/products/membersFavorite`, {
  //       id: user.member_sid,
  //     })
  //     setFavoriteData(r.data)
  //   })()
  // }, [isLiked, user])

  const notLiked = async (products_sid) => {
    await axios.delete(`http://localhost:3000/products/likeDel`, {
      data: {
        id: user.member_sid,
        products_sid: products_sid,
      },
    })
  }
  // const likeIt = async (products_sid) => {
  //   await axios.post(`http://localhost:3000/products/likeAdd`, {
  //     id: user.member_sid,
  //     products_sid: products_sid,
  //   })
  //   // console.log(r)
  // }

  return (
    <div className="d-flex flex-wrap">
      {favoriteData.length > 0 &&
        favoriteData.map((v, i) => {
          return (
            <div
              key={v.id}
              className="li_productCard col-6 col-lg-3 py-5 li_h500"
            >
              {' '}
              <Link
                to={
                  '/products/productsDetail/' + v.products_sid + '/' + v.default
                }
              >
                <img
                  src={'http://localhost:3000/products_img/' + v.imgName}
                  alt=""
                  className="w-100"
                />
                <div className="li_brand">
                  {v.brandsName}
                  <div
                    className="li_cardHeart"
                    onClick={(e) => {
                      setIsLiked(!isLiked)
                      e.preventDefault()
                      notLiked(v.products_sid)
                    }}
                  >
                    <i className="li_iconHeart fas fa-heart"></i>
                    {/* ) : (
                      <i
                        className="li_iconHeart far fa-heart"
                        onClick={(e) => {
                          setIsLiked(!isLiked)
                          e.preventDefault()

                          likeIt(v.products_sid)
                        }}
                      ></i>
                    )} */}
                  </div>
                </div>

                <div className="li_productName">{v.name}</div>
                <div className="li_price">${v.price}</div>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default FavoriteCard
