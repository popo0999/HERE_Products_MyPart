// eslint-disable-next-line
import React, { useEffect, useState, useHistory } from 'react'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'
import ProductsCard from './ProductsCard'
import { API_HOST } from './../../config'
import { Link } from 'react-router-dom'

const Products = () => {
  const [featured, setFeatured] = useState([])
  const [displayProducts, setDisplayProducts] = useState([])
  // const [searchWord, setSearchWord] = useState('')
  const [liData, setLiData] = useState({})
  const [sortBy, setSortBy] = useState('')
  const [female, setFemale] = useState(false)
  const [male, setMale] = useState(false)
  const [genderClick, setGenderClick] = useState(false)
  const [typeClick, setTypeClick] = useState(false)
  const [run, setRun] = useState(false)
  const [ball, setBall] = useState(false)
  const [casual, setCasual] = useState(false)
  const [climbing, setClimbing] = useState(false)
  const [training, setTraining] = useState(false)
  const [brandsClick, setBrandsClick] = useState(false)
  const [nike, setNike] = useState(false)
  const [puma, setPuma] = useState(false)
  const [NB, setNB] = useState(false)
  const [arc, setArc] = useState(false)
  const [salomon, setSalomon] = useState(false)
  const [adidas, setAdidas] = useState(false)
  const [priceClick, setPriceClick] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/featured`)
      setFeatured(r.data)
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      let r = await axios.post(`${API_HOST}/products/test`, {
        female: female ? 2 : 0,
        male: male ? 1 : 0,
        run: run ? 1 : 0,
        ball: ball ? 2 : 0,
        casual: casual ? 3 : 0,
        climbing: climbing ? 4 : 0,
        training: training ? 6 : 0,
        nike: nike ? 1 : 0,
        puma: puma ? 2 : 0,
        NB: NB ? 3 : 0,
        arc: arc ? 4 : 0,
        salomon: salomon ? 5 : 0,
        adidas: adidas ? 6 : 0,
        page: page,
        sortBy: sortBy,
      })
      setLiData(r.data)
      setDisplayProducts(r.data.rows)
    })()
  }, [
    female,
    male,
    page,
    run,
    ball,
    casual,
    climbing,
    training,
    nike,
    puma,
    NB,
    arc,
    salomon,
    adidas,
    sortBy,
  ])
  useEffect(() => {
    setPage(1)
  }, [
    female,
    male,
    run,
    ball,
    casual,
    climbing,
    training,
    nike,
    puma,
    NB,
    arc,
    salomon,
    adidas,
  ])

  return (
    <>
      <div className="container-fluid li_maxWidth mt-5">
        <div className="row">
          <div className="li_p_tl col-lg-8 d-none d-lg-block">
            <div className="d-flex li_sticky">
              <div className="col-lg-4 li_spec d-flex align-items-center">
                {' '}
                <span>精選推薦</span>{' '}
              </div>
              <img
                src={'http://localhost:3000/products_img/sid001.jpg'}
                className="col-lg-8 li_specImg  li_changeImg w-100"
                alt=""
              />
            </div>
          </div>
          <div className="li_p_tl col-12 d-lg-none ">
            <div className="li_spec">精選推薦</div>
          </div>
          <div className="li_p_tc col-8 d-lg-none ">
            <img
              src={'http://localhost:3000/products_img/sid001.jpg'}
              className="li_specImg li_sticky li_changeImg w-100"
              alt=""
            />
          </div>
          <div className="li_p_tr col-4 col-lg-4 ">
            {featured.map((v, i) => {
              return (
                <div
                  key={i}
                  className="p-3"
                  onMouseEnter={() => {
                    const changeImg = document.querySelector('.li_changeImg')
                    changeImg.src = `http://localhost:3000/products_img/${v.imgName}`
                  }}
                >
                  <Link
                    to={'/products/productsDetail/' + v.sid + '/' + v.default}
                    className="li_topName li_textDecoration"
                  >
                    <span className="li_topBrand ">{v.brandsName}</span>
                    <span className="li_topName">
                      <br />
                      {v.name}
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="product_list container-fluid li_maxWidth">
        <h3 className="pt-5 li_fwb">精選推薦</h3>
        <div className="d-flex flex-wrap pt-5">
          <div className="li_filter">
            <p
              className="mb-0"
              onClick={() => {
                setGenderClick(!genderClick)
              }}
            >
              {' '}
              GENDER
            </p>
            {genderClick ? (
              <div className="li_genderClick">
                <label>
                  <input
                    type="checkbox"
                    checked={female}
                    onChange={(e) => {
                      setFemale(e.target.checked)
                    }}
                  />{' '}
                  Female
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={male}
                    onChange={(e) => {
                      setMale(e.target.checked)
                    }}
                  />{' '}
                  Male
                </label>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="li_filter">
            <p
              className="mb-0"
              onClick={() => {
                setTypeClick(!typeClick)
              }}
            >
              {' '}
              SPORTS TYPE
            </p>
            {typeClick ? (
              <div className="li_genderClick">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={run}
                      onChange={(e) => {
                        setRun(e.target.checked)
                      }}
                    />{' '}
                    running
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={ball}
                      onChange={(e) => {
                        setBall(e.target.checked)
                      }}
                    />{' '}
                    Ball
                  </label>
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={casual}
                    onChange={(e) => {
                      setCasual(e.target.checked)
                    }}
                  />{' '}
                  Casual
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={climbing}
                    onChange={(e) => {
                      setClimbing(e.target.checked)
                    }}
                  />{' '}
                  Climbing
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={training}
                    onChange={(e) => {
                      setTraining(e.target.checked)
                    }}
                  />{' '}
                  Training
                </label>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="li_filter">
            <p
              className="mb-0"
              onClick={() => {
                setBrandsClick(!brandsClick)
              }}
            >
              BRANDS
            </p>
            {brandsClick ? (
              <div className="li_genderClick">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={nike}
                      onChange={(e) => {
                        setNike(e.target.checked)
                      }}
                    />{' '}
                    Nike
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={puma}
                      onChange={(e) => {
                        setPuma(e.target.checked)
                      }}
                    />{' '}
                    Puma
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={NB}
                      onChange={(e) => {
                        setNB(e.target.checked)
                      }}
                    />{' '}
                    New Balance
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={arc}
                      onChange={(e) => {
                        setArc(e.target.checked)
                      }}
                    />{' '}
                    Arc'teryx
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={salomon}
                      onChange={(e) => {
                        setSalomon(e.target.checked)
                      }}
                    />{' '}
                    SALOMON
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={adidas}
                      onChange={(e) => {
                        setAdidas(e.target.checked)
                      }}
                    />{' '}
                    Adidas
                  </label>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="li_filter">
            <p
              className="mb-0"
              onClick={() => {
                setPriceClick(!priceClick)
              }}
            >
              {' '}
              Price
            </p>
            {priceClick ? (
              <div className="li_genderClick">
                <label>
                  <input type="range" />{' '}
                </label>
              </div>
            ) : (
              ''
            )}
          </div>
          <select
            className="li_sort li_filter"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Sort by</option>
            <option value="TopSeller">TopSeller</option>
            <option value="newest">Newest</option>
            <option value="l2h">Price Low to High</option>
            <option value="h2l">Price High to Low</option>
          </select>
        </div>
        <p className="li_font24 pt-5 mb-0">{liData.totalRows} PRODUCTS</p>
        <div className="row">
          {displayProducts.map((v, i) => {
            return (
              <>
                <ProductsCard
                  key={v.sid}
                  sid={v.sid}
                  imgName={v.imgName}
                  brandsName={v.brandsName}
                  price={v.price}
                  name={v.name}
                  defaultURL={v.default}
                />
              </>
            )
          })}
        </div>
        {liData.totalRows > page * 16 ? (
          <button
            className="team-btn"
            onClick={() => {
              setPage(page + 1)
            }}
          >
            next
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Products
