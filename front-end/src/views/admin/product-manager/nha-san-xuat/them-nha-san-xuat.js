import React, { useState,useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const ThemMauSac = () => {

    let navigate = useNavigate();

    const [mauSac, setMauSac] = useState({
        ma: "",
        tenNhaSanXuat: ""
    })

    const { ma, tenNhaSanXuat } = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        generateCode()
       }, []);
 
       const generateCode = async () =>{
         await axios.get("http://localhost:8080/nha-san-xuat/new-code")
         .then((res)=>{
             console.log(res.data)
             setMauSac({ ...mauSac, 'ma': res.data })
         })
       }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/nha-san-xuat/save", mauSac)
        navigate("/nha-san-xuat")
    }

    return (
        <div className='container' style={{ width: 600 }}>
            <div className="card "  >

                <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h2 style={{ marginLeft:150 }} className='justify-content-center'>Thêm nhà sản xuất</h2>
                    </div>
                </div>
                <div className="card-body">
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
                                placeholder='Nhập tên nhà sản xuất)'
                                name='tenNhaSanXuat'
                                value={tenNhaSanXuat}
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