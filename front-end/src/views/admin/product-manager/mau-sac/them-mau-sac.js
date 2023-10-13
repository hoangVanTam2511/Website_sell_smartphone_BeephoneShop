import React, { useState,useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import TextField from '@mui/material/TextField';

const ThemMauSac = () => {
    const [mauSac, setMauSac] = useState({
        ma: "",
        tenMauSac: ""
    })
    const { ma, tenMauSac } = mauSac 
    const [ tenMauSacError,setTenMauSacError ] = useState()
    const [formSubmitted, setFormSubmitted] = useState(false);
   
    let navigate = useNavigate();

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
      
    }

    useEffect(() => {
        generateCode()
       }, []);
 
       const generateCode = async () =>{
         await axios.get("http://localhost:8080/mau-sac/new-code")
         .then((res)=>{
             console.log(res.data)
             setMauSac({ ...mauSac, 'ma': res.data })
         })
       }

    const onSubmit = async (e) => {
        e.preventDefault();

        if(!isNaN(mauSac.tenMauSac)){
            setTenMauSacError("Color is not number")
            setFormSubmitted(true)
            return;
        }

        setFormSubmitted(false)
        setTenMauSacError("")
        await axios.post("http://localhost:8080/mau-sac/save", mauSac)
        navigate("/mau-sac")
    }

    return (
        <div className='container' style={{ width: 600 }}>
            <div className="card" >

                <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h2 style={{ marignLeft:170 }} >Thêm màu sắc</h2>
                    </div>
                </div>
                <div className="card-body">
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Mã</Form.Label>
                            <br/>
                            <TextField type="text"
                                required
                                id="outlined-required"
                                placeholder='Enter code'
                                name='ma'
                                value={ma}
                                onChange={(e) => onInputChange(e)}
                                style = {{ width: `500px`}}
                                disabled = 'true'
                                />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">Tên màu sắc</Form.Label>
                            <br/>
                            <TextField type="text"
                                required
                                id="outlined-required"
                                placeholder='Enter color'
                                name='tenMauSac'
                                value={tenMauSac}
                                onChange={(e) => onInputChange(e)}
                                error={(formSubmitted && !tenMauSac) || !!tenMauSacError}
                                helperText={
                                    tenMauSacError ||
                                    (formSubmitted && !tenMauSac && "Color is not enough")
                                }
                                style = {{ width: `500px`}}
                                />
                        </Form.Group>

                        <Button type="submit" style={{ marginLeft:190 }} onc variant="btn btn-outline-success">Thêm mới</Button>{' '}
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default ThemMauSac