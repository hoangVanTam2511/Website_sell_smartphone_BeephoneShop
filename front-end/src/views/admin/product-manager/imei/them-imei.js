import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { request } from '../../../../store/helpers/axios_helper'

const ThemMauSac = () => {

    let navigate = useNavigate();
    const {idChiTietSanPham} = useParams()

    const [mauSac, setMauSac] = useState({
        soImei: ""
    })

    const { ma, soImei } = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        request('POST',`/imei/save/${idChiTietSanPham}`, mauSac)
        navigate(`/imei/${idChiTietSanPham}`)
    }

    return (
        <div className='container' style={{ width: 600 }}>
            <div className="card "  >

                <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h2 style={{ marginLeft:150 }} className='justify-content-center'>Thêm imei</h2>
                    </div>
                </div>
                <div className="card-body">
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">Số imei</Form.Label>
                            <Form.Control type="text"
                                placeholder='Nhập số imei'
                                name='soImei'
                                value={soImei}
                                onChange={(e) => onInputChange(e)}
                                id="ten`" />
                        </Form.Group>

                        <Button type="submit" style={{ marginLeft:190 }} onc variant="btn btn-outline-success">Thêm mới</Button>{' '}
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default ThemMauSac