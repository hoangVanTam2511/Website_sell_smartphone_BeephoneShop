import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { PlusOutlined } from '@ant-design/icons';
import CurrencyInput from 'react-currency-input-field';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { storage } from "./firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { apiURLCauHinh, apiURLChip, apiURLDongSanPham, apiURLManHinh, apiURLMauSac, apiURLNhaSanXuat, apiURLPin, apiURLram, apiURLrom } from '../../../../service/api';
import {
    Select,
    Col,
    Row,
    Input,
    Upload, Tag,
    Tabs, Space,
    Divider, Table,
    Button, Modal
} from "antd";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
const { TextArea } = Input;
let index = 0;
const ThemSanPham = () => {

    const [listMauSac, setlistMauSac] = useState([])
    const [listChip, setlistChip] = useState([])
    const [listRam, setListRam] = useState([])
    const [listManHinh, setlistManHinh] = useState([])
    const [listRom, setlistRom] = useState([])
    const [listPin, setListPin] = useState([])
    const [listNhaSanXuat, setlistNhaSanXuat] = useState([])
    const [listIdCauHinh, setListIdCauHinh] = useState([])
    const [listDongSanPham, setListDongSanPham] = useState([])
    const [listCauHinh, setListCauHinh] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    // modal
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    // modal nhà sản xuất

    const [nhaSanXuatForm, setNhaSanXuatForm] = useState({
        maNhaSanXuat: "",
        tenNhaSanXuat: ""
    })

    const onInputChangeFormNhaSanXuat = (e) => {
        setNhaSanXuatForm({ ...nhaSanXuatForm, [e.target.name]: e.target.value })
    }

    const showModal = async () => {
        setOpen(true);
        await axios.get("http://localhost:8080/nha-san-xuat/new-code")
            .then((res) => {
                console.log(res.data)
                setNhaSanXuatForm({ ...nhaSanXuatForm, 'maNhaSanXuat': res.data })
            })
    };

    const handleOk = async () => {
        await axios.post("http://localhost:8080/nha-san-xuat/save", nhaSanXuatForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 500);
    };

    const handleCancel = () => {
        setOpen(false);
        setOpenFormChip(false)
        setOpenFormDongSanPham(false)
        setOpenFormmanHinh(false)
        setOpenFormmauSac(false)
        setOpenFormpin(false)
        setOpenFormram(false)
        setOpenFormrom(false)
    };

    // prop
    // chip

    const [openFormChip, setOpenFormChip] = useState(false);

    const [chipForm, setChipForm] = useState({
        maChip: "",
        tenChip: ""
    })

    const { maChip, tenChip } = chipForm // tạo contructor

    const onInputChangeFormChip = (e) => {
        setChipForm({ ...chipForm, 'tenChip': e.target.value })
    }

    // pin

    const [openFormpin, setOpenFormpin] = useState(false);

    const [pinForm, setpinForm] = useState({
        mapin: "",
        tenpin: ""
    })

    const { mapin, tenpin } = pinForm // tạo contructor

    const onInputChangeFormpin = (e) => {
        setpinForm({ ...pinForm, [e.target.name]: e.target.value })
    }

    //ram

    const [openFormram, setOpenFormram] = useState(false);

    const [ramForm, setramForm] = useState({
        maram: "",
        tenram: ""
    })

    const { maram, tenram } = ramForm // tạo contructor

    const onInputChangeFormram = (e) => {
        setramForm({ ...ramForm, [e.target.name]: e.target.value })
    }

    //rom

    const [openFormrom, setOpenFormrom] = useState(false);

    const [romForm, setromForm] = useState({
        marom: "",
        tenrom: ""
    })

    const { marom, tenrom } = romForm // tạo contructor

    const onInputChangeFormrom = (e) => {
        setromForm({ ...romForm, [e.target.name]: e.target.value })
    }

    // mau-sac
    const [openFormmauSac, setOpenFormmauSac] = useState(false);

    const [mauSacForm, setmauSacForm] = useState({
        mamauSac: "",
        tenmauSac: ""
    })

    const { mamauSac, tenmauSac } = mauSacForm // tạo contructor

    const onInputChangeFormmauSac = (e) => {
        setmauSacForm({ ...mauSacForm, [e.target.name]: e.target.value })
    }
    // màn hình
    const [openFormmanHinh, setOpenFormmanHinh] = useState(false);

    const [manHinhForm, setmanHinhForm] = useState({
        mamanHinh: "",
        tenmanHinh: ""
    })

    const { mamanHinh, tenmanHinh } = manHinhForm // tạo contructor

    const onInputChangeFormmanHinh = (e) => {
        setmanHinhForm({ ...manHinhForm, [e.target.name]: e.target.value })
    }
    // dòng sản phẩm

    const [openFormDongSanPham, setOpenFormDongSanPham] = useState(false);

    const [DongSanPhamForm, setDongSanPhamForm] = useState({
        maDongSanPham: "",
        tenDongSanPham: ""
    })

    const { maDongSanPham, tenDongSanPham } = DongSanPhamForm // tạo contructor

    const onInputChangeFormDongSanPham = (e) => {
        setDongSanPhamForm({ ...DongSanPhamForm, [e.target.name]: e.target.value })
    }


    // cấu hình
    const [openFormCauHinh, setOpenFormCauHinh] = useState(false);

    const showModalFormCauHinh = () => {
        setOpenFormCauHinh(true);
    };

    const handleOkFormCauHinh = async () => {
        await axios.post("http://localhost:8080/cau-hinh/save", cauHinh)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormCauHinh(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const loadDataListCauHinh = async (currentPage) => {
        axios.get(apiURLCauHinh + "/view-all?page=" + currentPage).then((response) => {
            const modifiedData = response.data.content.map((item, index) => ({
                ...item,
                'key': item.id,
            }));
            console.log(modifiedData)
            setListCauHinh(modifiedData);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);
        });
    };
    const handleCancelFromCauHinh = () => {
        setOpenFormCauHinh(false)
    };

    const deleteCauHinh = async (record) => {
        const index = listMauSac.findIndex((item) => record.id === item.id);
        /* Read more about isConfirmed, isDenied below */
        deleteColor(record.id)

    };

    // delete
    const deleteColor = async (id) => {
        await axios.delete(`${apiURLCauHinh}/delete/${id}`).then(
            (response) => {
                loadDataListCauHinh(currentPage)
            })

    }


    const columns = [
        {
            title: "Dung luợng ram(GB)",
            dataIndex: "kichThuocRam",
            width: "5%",
        },
        {
            title: "Dung lượng rom(GB)",
            dataIndex: "kichThuocRom",
            width: "5%",
        },
        {
            title: "Dung lượng pin(mah)",
            dataIndex: "dungLuongPin",
            width: "5%",
        },
        {
            title: "Màu sắc",
            dataIndex: "mauSac",
            width: "5%",
        },
        {
            title: "Màn hình",
            dataIndex: "kichThuocManHinh",
            width: "5%",
        },
        {
            title: "Thao tác",
            dataIndex: "",
            width: "5%",
            render: (_, record) => {

                return (
                    <>
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => deleteCauHinh(record)}
                            style={{
                                cursor: "pointer",
                                // opacity: editingKey === record.id ? 0.5 : 1,
                                color: "#F55E4C",
                                marginLeft: 20
                            }}

                        />

                    </>

                );
            },
        }


    ];

    const rowSelection = {
        onChange: (selectedRowKeys, obj) => {
            console.log(selectedRowKeys)
            setListIdCauHinh(selectedRowKeys)
        },
    };

    let navigate = useNavigate();

    const [chiTietSanPham, setchiTietSanPham] = useState({
        tenSanPham: "",
        dongSanPham: "",
        nhaSanXuat: "",
        donGia: "",
        moTa: ""
    })

    const [cauHinh, setCauHinh] = useState({
        pin: "",
        ram: "",
        rom: "",
        chip: "",
        manHinh: "",
        mauSac: ""
    })

    const { donGia, moTa } = chiTietSanPham // tạo contructor

    const onSubmit = async () => {

        await axios.post("http://localhost:8080/san-pham/save", chiTietSanPham).then(
            (res) => {
                console.log(res)
                axios.post(`http://localhost:8080/chi-tiet-san-pham/save?id=${res.data.id}`, listIdCauHinh).then(
                    (res) => {
                    }
                )
            }
        )

    }
    const onInputChange = (e) => {
        setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value })
        console.log(chiTietSanPham)
    }

    const handleTextArea = (e) => {
        setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value })
    }

    const handleChange = (value) => {
        setchiTietSanPham({ ...chiTietSanPham, [String(value).slice(0, String(value).indexOf(":"))]: String(value).slice(String(value).indexOf(":") + 1) })
        console.log(chiTietSanPham)
    };

    // handdleChange tab cấu hình
    const handleChangeFormCauHinh = (value) => {
        setCauHinh({ ...cauHinh, [String(value).slice(0, String(value).indexOf(":"))]: String(value).slice(String(value).indexOf(":") + 1) })
    };


    useEffect(() => {
        loadDataComboBox();
        loadDataListCauHinh(currentPage)
    }, [confirmLoading, currentPage]);


    const loadDataComboBox = async () => {
        // load các combobõx tươuơng ứg
        axios.get(apiURLDongSanPham + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.tenDongSanPham,
                value: "dongSanPham:" + item.tenDongSanPham,
            }));
            setListDongSanPham(modifiedData);
        });
        axios.get(apiURLNhaSanXuat + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.tenNhaSanXuat,
                value: "nhaSanXuat:" + item.tenNhaSanXuat,
            }));
            setlistNhaSanXuat(modifiedData);
        });

        axios.get(apiURLPin + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.dungLuong + " mah",
                value: "pin:" + item.dungLuong,
            }));
            setListPin(modifiedData);
        });

        axios.get(apiURLram + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.kichThuoc + " GB",
                value: "ram:" + item.kichThuoc,
            }));
            setListRam(modifiedData);
        });

        axios.get(apiURLrom + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.kichThuoc + " GB",
                value: "rom:" + item.kichThuoc,
            }));
            setlistRom(modifiedData);
        });

        axios.get(apiURLChip + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.tenChip,
                value: "chip:" + item.tenChip,
            }));
            setlistChip(modifiedData);
        });

        axios.get(apiURLMauSac + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.tenMauSac,
                value: "mauSac:" + item.tenMauSac,
            }));
            setlistMauSac(modifiedData);
        });

        axios.get(apiURLManHinh + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.kichThuoc + " inch",
                value: "manHinh:" + item.kichThuoc,
            }));
            setlistManHinh(modifiedData);
        });
    }

    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const options = [
        {
            value: 'gold',
        },
        {
            value: 'lime',
        },
        {
            value: 'green',
        },
        {
            value: 'cyan',
        },
    ];
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    return (
        <div className="card-body" style={{ marginLeft: 40 }}>
            <br />
            <h1 className='text-center'>Thêm sản phẩm</h1>
            <br />

            <Form onSubmit={(e) => onSubmit(e)}>
                <div className="card " style={{ padding: 20 }}  >
                    <br />
                    <Row >
                        <Col span={24}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Tên sản phẩm</Form.Label>
                                <Form.Control type="text"
                                    className=" form-control d-inline-block"
                                    style={{ width: 600 }}
                                    placeholder='Nhập tên sản phẩm'
                                    name='tenSanPham'
                                    // value={tenSanPham}
                                    onChange={(e) => onInputChange(e)}
                                    id="ten`" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>

                        <Col span={24}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}> Mô tả </Form.Label>
                                <TextArea rows={4}
                                    onChange={(e) => handleTextArea(e)}
                                    name='moTa'
                                    style={{ width: 600 }}
                                    value={moTa}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>

                        <Col span={11}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Camera truớc
                                </Form.Label>
                                <Select
                                    mode="multiple"
                                    tagRender={tagRender}
                                    defaultValue={['gold', 'cyan']}
                                    style={{
                                        width: '100%',
                                        height:36
                                    }}
                                    options={options}
                                />
                            </Form.Group>
                        </Col>

                        <Col span={11} style={{marginLeft:40}}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}>  Camera sau
                                </Form.Label>
                                <Select
                                    mode="multiple"
                                    tagRender={tagRender}
                                    defaultValue={['gold', 'cyan']}
                                    style={{
                                        width: '100%',
                                        height:36
                                    }}
                                    options={options}
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={8}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Nhà sản xuất
                                </Form.Label>
                                <Select
                                    style={{ width: 300 ,height:36}}
                                    placeholder="custom dropdown render"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Please enter item"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                />
                            </Form.Group>
                        </Col>

                        <Col span={8}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Chip
                                </Form.Label>
                                <Select
                                    style={{ width: 300, height:36}}
                                    placeholder="custom dropdown render"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Please enter item"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                />
                            </Form.Group>
                        </Col>

                        <Col span={8}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}>  Dòng sản phẩm
                                </Form.Label>
                                <Select
                                    style={{ width: 300, height:36 }}
                                    placeholder="custom dropdown render"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Please enter item"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <br />
                    <Row style={{color:'black'}}>
                        <Col span={8} style={{marginLeft:219}}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150 }} >Màn hình
                                </Form.Label>
                                <Select
                                    style={{ width: 300, height:36 }}
                                    placeholder="custom dropdown render"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Please enter item"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col span={8}>
                            <Form.Group className="form-group">

                                <Form.Label htmlFor="pwd" style={{ width: 150 }} >Pin
                                </Form.Label>
                                <Select
                                    style={{ width: 300, height:36 }}
                                    placeholder="custom dropdown render"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Please enter item"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />


                    <br />
                </div>

                <Row>
                    <Col span={24}>
                        <Tabs
                            defaultActiveKey="1"
                            centered
                            items={new Array(1).fill(null).map((_, i) => {
                                const id = String(i + 1);
                                return {
                                    label: id == 1 ? `Danh sách cấu hình` : "",
                                    key: id,
                                    children:
                                        id == 1 ?

                                            <div>
                                                <Button type="primary" style={{ fontSize: 14, fontWeight: 600 }} onClick={showModalFormCauHinh}>
                                                    <FontAwesomeIcon
                                                        style={{ marginRight: 10 }}
                                                        icon={faPlus} /> Thêm cấu hình mới
                                                </Button>
                                                <Modal
                                                    title="Thêm cấu hình"
                                                    open={openFormCauHinh}
                                                    onOk={handleOkFormCauHinh}
                                                    confirmLoading={confirmLoading}
                                                    onCancel={handleCancelFromCauHinh}
                                                >
                                                    <div>

                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150 }} >Rom
                                                                    </Form.Label>
                                                                    <Select
                                                                        style={{ width: 300, height:36 }}
                                                                        placeholder="custom dropdown render"
                                                                        dropdownRender={(menu) => (
                                                                            <>
                                                                                {menu}
                                                                                <Divider style={{ margin: '8px 0' }} />
                                                                                <Space style={{ padding: '0 8px 4px' }}>
                                                                                    <Input
                                                                                        placeholder="Please enter item"
                                                                                        ref={inputRef}
                                                                                        value={name}
                                                                                        onChange={onNameChange}
                                                                                    />
                                                                                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                                                        Add item
                                                                                    </Button>
                                                                                </Space>
                                                                            </>
                                                                        )}
                                                                        options={items.map((item) => ({ label: item, value: item }))}
                                                                    />
                                                                </Form.Group>
                                                            </Col>


                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150 }}> Ram
                                                                    </Form.Label>

                                                                    <Select
                                                                        style={{ width: 300, height:36 }}
                                                                        placeholder="custom dropdown render"
                                                                        dropdownRender={(menu) => (
                                                                            <>
                                                                                {menu}
                                                                                <Divider style={{ margin: '8px 0' }} />
                                                                                <Space style={{ padding: '0 8px 4px' }}>
                                                                                    <Input
                                                                                        placeholder="Please enter item"
                                                                                        ref={inputRef}
                                                                                        value={name}
                                                                                        onChange={onNameChange}
                                                                                    />
                                                                                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                                                        Add item
                                                                                    </Button>
                                                                                </Space>
                                                                            </>
                                                                        )}
                                                                        options={items.map((item) => ({ label: item, value: item }))}
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}> Màu sắc
                                                                    </Form.Label>
                                                                    <Select
                                                                        style={{ width: 300, height:36 }}
                                                                        placeholder="custom dropdown render"
                                                                        dropdownRender={(menu) => (
                                                                            <>
                                                                                {menu}
                                                                                <Divider style={{ margin: '8px 0' }} />
                                                                                <Space style={{ padding: '0 8px 4px' }}>
                                                                                    <Input
                                                                                        placeholder="Please enter item"
                                                                                        ref={inputRef}
                                                                                        value={name}
                                                                                        onChange={onNameChange}
                                                                                    />
                                                                                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                                                        Add item
                                                                                    </Button>
                                                                                </Space>
                                                                            </>
                                                                        )}
                                                                        options={items.map((item) => ({ label: item, value: item }))}
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                        </Row>


                                                    </div>
                                                </Modal>
                                                <Divider />

                                                <Table
                                                    rowSelection={{
                                                        type: `checkbox`,
                                                        ...rowSelection,
                                                    }}
                                                    columns={columns}
                                                    dataSource={listCauHinh}
                                                />
                                            </div>
                                            :
                                            <div></div>
                                    ,
                                };
                            })}
                        />
                    </Col>
                </Row>
                <br />


                {/* <Button type="submit" style={{ marginLeft: 190 }} onc variant="btn btn-outline-success">Thêm mới</Button> */}
            </Form>
        </div>
    );

}

export default ThemSanPham