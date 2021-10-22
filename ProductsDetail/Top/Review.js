import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { API_HOST } from './../../../../config'

const Review = (props) => {
  const { user, setShowLogin, sid } = props
  const [review, setReview] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [showDel, setShowDel] = useState(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [star, setStar] = useState(0)
  const [reviewId, setReviewId] = useState(0)
  const myDel = async (e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3000/products/review/del`, {
      data: {
        id: reviewId,
      },
    })
    setShowDel(false)
  }

  const mySubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_HOST}/products/review/add`, {
      sid: sid,
      members_id: user.member_sid,
      star: star,
      content: content,
      title: title,
    })
    setShow(false)
  }

  const myEdit = async (e) => {
    e.preventDefault()
    await axios.put(`${API_HOST}/products/review/edit`, {
      star: star,
      content: content,
      title: title,
      id: reviewId,
      images: '',
    })
    setShowEdit(false)
  }
  useEffect(() => {
    ;(async () => {
      let reviewData = await axios.get(
        `http://localhost:3000/products/review/${sid}`
      )
      setReview(reviewData.data)
    })()
  }, [sid, show, showEdit, showDel])
  return (
    <>
      <div className=" li_reviewTitle d-flex justify-content-between align-items-center">
        {' '}
        <h5>評價 ({review.length})</h5>
        <h5>
          <i className="fas fa-angle-down pr-3"></i>
        </h5>
      </div>{' '}
      {review.map((v, i) => {
        return (
          <div key={i} id="li_memberReview" className="li_memberReview">
            {v.star}
            <p>{v.title}</p>
            <p>{v.content}</p>
            <p>{v.nickname}</p>
            {user.nickname === v.nickname ? (
              <div className="d-flex">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShowEdit()
                    setTitle(v.title)
                    setContent(v.content)
                    setStar(v.star.toString())
                    setReviewId(v.id)
                  }}
                >
                  <i className="fas fa-edit"></i>
                </Button>

                <Modal
                  show={showEdit}
                  onHide={handleCloseEdit}
                  backdropClassName="li_bgc"
                >
                  <Modal.Body>修改你的評論</Modal.Body>
                  <form name="reviewAdd">
                    <div className="form-group">
                      <label htmlFor="">評論標題</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        評論內容
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value)
                        }}
                      ></textarea>
                    </div>

                    <div className="form-group form-check">
                      <label className="" htmlFor="">
                        你的評分是：
                      </label>
                      <input
                        type="radio"
                        className="mx-3"
                        id="exampleCheck1"
                        value="5"
                        checked={star === '5'}
                        onChange={(e) => {
                          setStar(e.target.value)
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        5
                      </label>
                      <input
                        type="radio"
                        className="mx-3"
                        id="exampleCheck1"
                        value="4"
                        checked={star === '4'}
                        onChange={(e) => {
                          setStar(e.target.value)
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        4
                      </label>
                      <input
                        type="radio"
                        className="mx-3"
                        id="exampleCheck1"
                        value="3"
                        checked={star === '3'}
                        onChange={(e) => {
                          setStar(e.target.value)
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        3
                      </label>
                      <input
                        type="radio"
                        className="mx-3"
                        id="exampleCheck1"
                        value="2"
                        checked={star === '2'}
                        onChange={(e) => {
                          setStar(e.target.value)
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        2
                      </label>
                      <input
                        type="radio"
                        className="mx-3"
                        id="exampleCheck1"
                        value="1"
                        checked={star === '1'}
                        onChange={(e) => {
                          setStar(e.target.value)
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        1
                      </label>
                    </div>
                  </form>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                      放棄修改
                    </Button>
                    <Button variant="primary" onClick={myEdit}>
                      修改完成
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Button variant="primary" onClick={handleShowDel}>
                  <i className="fas fa-trash"></i>
                </Button>

                <Modal
                  show={showDel}
                  onHide={handleCloseDel}
                  backdropClassName="li_bgc"
                >
                  <Modal.Body>確定要刪除這留言嗎？ </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDel}>
                      再想想
                    </Button>
                    <Button variant="primary" onClick={myDel}>
                      我確定
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : (
              ''
            )}
          </div>
        )
      })}
      <Button
        variant="primary"
        onClick={() => {
          if (user.login) {
            handleShow()
            setTitle('')
            setStar(0)
            setContent('')
          } else {
            setShowLogin(true)
          }
        }}
      >
        新增評論
      </Button>
      <Modal show={show} onHide={handleClose} backdropClassName="li_bgc">
        <Modal.Header closeButton>
          <Modal.Title>寫下你對這件商品的評論吧</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form name="reviewAdd" onSubmit={mySubmit}>
            <div className="form-group">
              <label htmlFor="">評論標題</label>
              <input
                type="text"
                className="form-control"
                id=""
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">評論內容</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              ></textarea>
            </div>

            <div className="form-group form-check">
              <label className="" htmlFor="">
                你的評分是：
              </label>
              <input
                type="radio"
                className="mx-3"
                id="exampleCheck1"
                value="5"
                checked={star === '5'}
                onChange={(e) => {
                  setStar(e.target.value)
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                5
              </label>
              <input
                type="radio"
                className="mx-3"
                id="exampleCheck1"
                value="4"
                checked={star === '4'}
                onChange={(e) => {
                  setStar(e.target.value)
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                4
              </label>
              <input
                type="radio"
                className="mx-3"
                id="exampleCheck1"
                value="3"
                checked={star === '3'}
                onChange={(e) => {
                  setStar(e.target.value)
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                3
              </label>
              <input
                type="radio"
                className="mx-3"
                id="exampleCheck1"
                value="2"
                checked={star === '2'}
                onChange={(e) => {
                  setStar(e.target.value)
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                2
              </label>
              <input
                type="radio"
                className="mx-3"
                id="exampleCheck1"
                value="1"
                checked={star === '1'}
                onChange={(e) => {
                  setStar(e.target.value)
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                1
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Review
