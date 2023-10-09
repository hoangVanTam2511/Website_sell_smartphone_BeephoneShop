import React, { useState, useEffect } from 'react'
import { Button, Modal, Col, Row, Carousel } from 'antd'
import { faList, faFilter, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../../assets/scss/config-detail.scss'
import axios from 'axios'
import {
  apiURLAnh
} from '../../../../service/api'

const ConfigDetail = props => {

  const [modal1Open, setModal1Open] = useState(false)
  const [productDetail, setProductDetail] = useState([])
  const [listImage, setListImage] = useState([])
  const contentStyle = {
    height: '159px',
    color: '#fff',
    width: `248px`,
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }
  

  const openModal = () => {
    const item = props.productDetail;

    setProductDetail(item)
    loadImages(item.id)
    console.log(item)
    setModal1Open(true)
  }

  const loadImages = async(id) => {
    axios.get(apiURLAnh + `/${id}`).then(response => {
      setListImage(response.data)
    })
  }

  return (
    <>
      <Button type='primary' onClick={openModal}>
        <FontAwesomeIcon
          icon={faEye}
          style={{
            cursor: 'pointer'
          }}
        />
      </Button>
      <Modal
        title='Thông tin chi tiết điện thoại'
        style={{
          top: 20
        }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <Row>

          <Col span={8}>
            <Carousel style={{ width: `250px` }} autoplay>
                { listImage === undefined  ? "":
                listImage.map((item) => {
                  return(
                  <div>
                    <img  style={contentStyle} src={item.duongDan}/>
                  </div>
                  )
                })}
              </Carousel>
          </Col>

          <Col span={16}>
                <div>
                  <Row>
                    <Col span={8}>
                      <h6 style={{ color: 'black' }}>Ram :  {productDetail.kichThuocRam} </h6>
                    </Col>
                    <Col span={8}>
                      <h6 style={{ color: 'black' }}>Rom : {productDetail.kichThuocRom} </h6>
                    </Col>
                    <Col span={8}>
                      <h6 style={{ color: 'black' }}>Màu sắc :  <Button style={{ fontSize: 14, fontWeight: 600, backgroundColor: productDetail.mauSac }} > </Button> </h6>
                    </Col>
                  </Row>

                  <br/>

                  <Row>
                    <Col span={12}>
                      <h6 style={{ color: 'black' }}>Số lượng : {productDetail.soLuong} </h6>
                    </Col>
                    <Col span={12}>
                      <h6 style={{ color: 'black' }}>Đơn giá : {productDetail.donGia} </h6>
                    </Col>
                  </Row>
                </div>
          </Col>

        </Row>
      </Modal>
      <br />
    </>
  )
}
export default ConfigDetail
