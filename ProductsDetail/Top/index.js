// HENRY佔了 2 個部分
import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { API_HOST } from './../../../../config'
import axios from 'axios'
import Review from './Review'
import { Carousel } from 'react-bootstrap'

const Top = (props) => {
  const {
    detail,
    color,
    size,
    setSelectColor,
    detailImg,
    selectColor,
    sid,
    colorId,
    setColorId,
    setStock,
    stock,
    setStockID,
    stockID,
    setSelectedSize,
    selectedSize,
    user,
    isLiked,
    setIsLiked,
    // setUser,
    // showLogin,
    setShowLogin,
  } = props

  // henry START-----------------------------------------------------
  const addToCart = async (e) => {
    const member_id = JSON.parse(localStorage.getItem('member')).id

    const dataObj = {
      products_id: sid,
      category: detail.categories,
      product_name: detail.name,
      product_color: selectColor,
      quantity: 1,
      product_size: selectedSize,
      color_id: colorId,
      stock_id: stockID,
      member_id: member_id,
    }
    const r = await fetch(API_HOST + '/cart', {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(r)
  }
  // henry END---------------------------------------------------------

  const notLiked = async () => {
    await axios.delete(`http://localhost:3000/products/likeDel`, {
      data: {
        id: user.member_sid,
        products_sid: detail.sid,
      },
    })
    // console.log(r)
  }
  const likeIt = async () => {
    await axios.post(`http://localhost:3000/products/likeAdd`, {
      id: user.member_sid,
      products_sid: detail.sid,
    })
    // console.log(r)
  }

  return (
    <div className="container-fluid mt-5 li_top li_maxWidth">
      <div className="row">
        <div className="col-12 col-lg li_left">
          <div className="d-flex flex-wrap">
            <Carousel className="d-lg-none" wrap={false}>
              {detailImg.length > 0 &&
                detailImg.map((v, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img
                        src={
                          'http://localhost:3000/products_img/productsDetail/' +
                          v.detailImg
                        }
                        className="w-100"
                        alt=""
                      />
                    </Carousel.Item>
                  )
                })}
            </Carousel>
            {detailImg.length > 0 &&
              detailImg.map((v, i) => {
                return (
                  <div className="d-none d-lg-block col-lg-6 mb-4 " key={i}>
                    <img
                      src={
                        'http://localhost:3000/products_img/productsDetail/' +
                        v.detailImg
                      }
                      className="w-100"
                      alt=""
                    />{' '}
                  </div>
                )
              })}
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-3 li_right">
          <div className="li_gender">{`${detail.categories}  ${detail.brandsName}`}</div>
          <h2>{detail.name}</h2>
          <div className="d-flex justify-content-between">
            <p>${detail.price}</p>
            <div
              onClick={() => {
                if (user.login) {
                  setIsLiked(!isLiked)
                  console.log('user', user)
                } else {
                  setShowLogin(true)
                }
              }}
            >
              {isLiked ? (
                <i
                  className="li_iconHeart fas fa-heart"
                  onClick={() => {
                    console.log('del?')
                    if (user.login) {
                      notLiked()
                    }
                  }}
                ></i>
              ) : (
                <i
                  className="far fa-heart"
                  onClick={() => {
                    console.log('like it!')
                    if (user.login) {
                      likeIt()
                    }
                  }}
                ></i>
              )}
            </div>
          </div>
          <div className="li_moreColor d-flex">
            {color.length > 0 &&
              color.map((v, i) => {
                return (
                  <div className="li_chooseColor" key={i}>
                    <Link
                      to={
                        '/products/productsDetail/' +
                        v.products_sid +
                        '/' +
                        v.color
                      }
                      className="w-100"
                    >
                      <img
                        src={
                          'http://localhost:3000/products_img/colorSelect/' +
                          v.colorImg
                        }
                        className="w-100"
                        alt=""
                        onClick={() => {
                          setSelectColor(v.color)
                          setColorId(v.id)
                        }}
                      />
                    </Link>
                  </div>
                )
              })}
          </div>
          <div className="li_size mt-5">
            <div className="li_sizeText">
              <p>選取尺寸</p>
            </div>
            <div className="li_chooseSize">
              {size.length > 0 &&
                size.map((v, i) => {
                  return v.stock === 0 ? (
                    <button disabled className="li_noStock" key={i}>
                      {v.size}
                    </button>
                  ) : (
                    <button
                      key={i}
                      onClick={() => {
                        setStock(v.stock)
                        setSelectedSize(v.size)
                        setStockID(v.id)
                        setColorId(v.color_id)
                      }}
                      className="li_inStock"
                    >
                      {v.size}
                    </button>
                  )
                })}
            </div>
            {stock >= 10 ? (
              ''
            ) : stock > 1 ? (
              <p>庫存不到10件，要買要快！！</p>
            ) : stock === 1 ? (
              <p>你現在看到的就是最後１個，不買就來不及啦～</p>
            ) : (
              ''
            )}
          </div>
          <div className="li_button">
            <div className="li_addToCart">
              <button
                className="btn team-btn "
                onClick={() => {
                  if (selectedSize) {
                    // henry START------------------------------
                    addToCart()
                    // henry END -----------------------------------------
                    console.log('-------------我是分隔線----------------')
                    console.log('選取尺寸:', selectedSize)
                    console.log('剩餘庫存', stock)
                    console.log('商品名稱', detail.name)
                    console.log('商品品牌', detail.brandsName)
                    console.log('商品顏色', selectColor)
                    console.log('商品價格', detail.price)
                    console.log('products_sid', sid)
                    console.log('color_id', colorId)
                    console.log('stock_id', stockID)
                    console.log('-------------我是分隔線----------------')
                    console.log('user', user)
                  } else {
                    alert('請先選擇尺寸！！')
                  }
                }}
              >
                加入購物車
              </button>
            </div>
            <div
              onClick={() => {
                if (user.login) {
                  console.log('user', user)
                  setIsLiked(!isLiked)
                } else {
                  setShowLogin(true)
                }
              }}
            >
              {isLiked ? (
                <button
                  className="li_favorite "
                  onClick={() => {
                    console.log('del?')
                    if (user.login) {
                      notLiked()
                    }
                  }}
                >
                  已加入願望清單
                </button>
              ) : (
                <button
                  className="li_favorite "
                  onClick={() => {
                    console.log('like it!')
                    if (user.login) {
                      likeIt()
                    }
                  }}
                >
                  加入願望清單
                </button>
              )}
            </div>
          </div>
          <div className="li_intro my-5 ">
            <p>{detail.detail}</p>
          </div>
          <div className="li_review">
            <Review user={user} setShowLogin={setShowLogin} sid={detail.sid} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Top)
