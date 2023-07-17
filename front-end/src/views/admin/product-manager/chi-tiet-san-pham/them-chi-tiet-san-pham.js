import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {
    Select,
    Col,
    Row,
    Input,
    message, Upload
} from "antd";
import 
 { RcFile, UploadFile, UploadProps }
 from 'antd/es/upload/interface';
 import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const ThemMauSac = () => {
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const [mauSac, setMauSac] = useState({
        donGia: "",
        moTa: ""
    })

    const { donGia, moTa } = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
    }



    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/dong-san-pham/save", mauSac)
        navigate("/dong-san-pham")
    }
    // select
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // upload
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );


    return (
        <div className='container' style={{ width: 600 }}>
            <div className="card "  >

                <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h2 style={{ marginLeft: 120 }} className='justify-content-center'>Thêm chi tiết sản phẩm</h2>
                    </div>
                </div>
                <div className="card-body">
                    <Form onSubmit={(e) => onSubmit(e)}>

                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }} >Ảnh sản phẩm </Form.Label>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        // beforeUpload={beforeUpload}
                                        // onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </Form.Group>
                            </Col>

                        </Row>


                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }} >Sản phẩm</Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>

                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }}>  Dòng sản phẩm</Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }} >Nhà sản xuất</Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>

                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }}> Màu sắc </Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 50 }} >Pin</Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>

                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 60 }}> Ram </Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }} >Rom</Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>

                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }}> Camera </Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }} >Chip</Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>

                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }}> Hình thức sản phẩm </Form.Label>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 200 }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                label: 'Manager',
                                                options: [
                                                    { label: 'Jack', value: 'jack' },
                                                    { label: 'Lucy', value: 'lucy' },
                                                ],
                                            },
                                            {
                                                label: 'Engineer',
                                                options: [{ label: 'yiminghe', value: 'Yiminghe' }],
                                            },
                                        ]}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }} >Đơn giá </Form.Label>
                                    <Form.Control type="text"
                                        style={{ width: 200 }}
                                        placeholder='Nhập đơn giá'
                                        name='donGia'
                                        value={donGia}
                                        onChange={(e) => onInputChange(e)}
                                        id="ten`" />
                                </Form.Group>
                            </Col>

                            <Col span={12}>
                                <Form.Group className="form-group">

                                    <Form.Label htmlFor="pwd" style={{ marginRight: 40 }}> Mô tả </Form.Label>
                                    <TextArea rows={4}
                                        style={{ width: 200 }}
                                        name='moTa'
                                        value={moTa}
                                        maxLength={6} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" style={{ marginLeft: 190 }} onc variant="btn btn-outline-success">Thêm mới</Button>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default ThemMauSac