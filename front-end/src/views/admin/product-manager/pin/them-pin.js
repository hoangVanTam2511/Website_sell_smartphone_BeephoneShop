import React, { useState,useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const ThemMauSac = () => {

    let navigate = useNavigate();

    const [mauSac, setMauSac] = useState({
        ma: "",
        dungLuong: ""
    })

    

    const { ma, dungLuong } = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
    }

    useEffect(() => {
       generateCode()
      }, []);

      const generateCode = async () =>{
        await axios.get("http://localhost:8080/pin/new-code")
        .then((res)=>{
            console.log(res.data)
            setMauSac({ ...mauSac, 'ma': res.data })
        })
      }
    

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/pin/save", mauSac)
        navigate("/pin")
    }

    return (
        <div className='container' style={{ width: 600 }}>
            <div className="card "  >

                <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h2 style={{ marginLeft:150 }} className='justify-content-center'>Thêm pin</h2>
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
                                disabled='true'
                                id="ma" />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">Dung luợng(mah)</Form.Label>
                            <Form.Control type="text"
                                placeholder='Nhập Dung luợng(mah)'
                                name='dungLuong'
                                value={dungLuong}
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