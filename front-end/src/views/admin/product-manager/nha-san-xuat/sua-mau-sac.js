import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import Swal from 'sweetalert2'

const SuaMauSac = () => {

    let navigate = useNavigate();
    let i = 0

    const { id } = useParams()

    const [mauSac, setMauSac] = useState({
        ma: "",
        tenNhaSanXuat: ""
    })

    const { ma, tenNhaSanXuat } = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (mauSac.ma == "") {
            loadUser()
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Bạn có muốn thay đổi nhà sản xuất này',
            showDenyButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                changeColor(id)
                Swal.fire('Thay đổi thành công', '', 'success')
            } else if (result.isDenied) {
            }
        })
    }

    const changeColor = async () => {
        await axios.put(`http://localhost:8080/nha-san-xuat/update/${id}`, mauSac)
        navigate("/nha-san-xuat")
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/nha-san-xuat/get-one/${id}`)
        setMauSac(result.data)
    }
    return (
        <div className='container' style={{ width: 600 }}>
            <h2 className='text-center'>Thay đổi nhà sản xuất</h2>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="email">Mã</Form.Label>
                    <Form.Control type="text"
                        placeholder='Enter code'
                        name='ma'
                        value={ma}
                        onChange={(e) => onInputChange(e)}
                        id="ma" />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="pwd">Tên nhà sản xuất</Form.Label>
                    <Form.Control type="text"
                        placeholder='Enter color'
                        name='tenMauSac'
                        value={tenNhaSanXuat}
                        onChange={(e) => onInputChange(e)}
                        id="ten`" />
                </Form.Group>

                <Button type="submit" onc variant="btn btn-primary">Thay đổi</Button>{' '}
            </Form>


        </div>
    )
}

export default SuaMauSac