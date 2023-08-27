import React, { useState, useReducer, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import CurrencyInput from 'react-currency-input-field';
import {
    Select,
    Col,
    Row,
    Input,
    Upload,
    Tabs,
    Divider, Table,
    Button, Modal
} from "antd";
import {
    Typography,
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
    useForm,
    FormProvider,
    useFormContext,
} from "react-hook-form";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { storage } from "./firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { apiURLCauHinh, apiURLChip, apiURLDongSanPham, apiURLManHinh, apiURLMauSac, apiURLNhaSanXuat, apiURLPin, apiURLram, apiURLrom } from '../../../../service/api';
import { FileUploader } from "react-drag-drop-files";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const { forwardRef, useRef, useImperativeHandle } = React;
const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
}));

function getSteps() {
    return [
        "Chọn thuộc tính điện thoại",
        "Chọn ảnh",
        "Nhập imei",
        "Hoàn thành",
    ];
}


// rowSelection object indicates the need for row selection


const { TextArea } = Input;

const ChiTietSanPhamForm = forwardRef((props, ref) => {

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
    const { control } = useFormContext();
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

    const { maNhaSanXuat, tenNhaSanXuat } = nhaSanXuatForm // tạo contructor

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

    const showModalFormChip = async () => {
        setOpenFormChip(true);

        await axios.get("http://localhost:8080/chip/new-code")
            .then((res) => {
                setChipForm({ ...chipForm, 'maChip': res.data })
            })
    };
    const handleOkFormChip = async () => {
        await axios.post("http://localhost:8080/chip/save", chipForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormChip(false);
            setConfirmLoading(false);
        }, 500);
    };

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

    const showModalFormpin = async () => {
        setOpenFormpin(true);

        await axios.get("http://localhost:8080/pin/new-code")
            .then((res) => {
                setpinForm({ ...pinForm, 'mapin': res.data })
            })

    };
    const handleOkFormpin = async () => {
        await axios.post("http://localhost:8080/pin/save-second", pinForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormpin(false);
            setConfirmLoading(false);
        }, 500);
    };

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

    const showModalFormram = async () => {
        setOpenFormram(true);

        await axios.get("http://localhost:8080/ram/new-code")
            .then((res) => {
                setramForm({ ...ramForm, 'maram': res.data })
            })
    };
    const handleOkFormram = async () => {
        await axios.post("http://localhost:8080/ram/save-second", ramForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormram(false);
            setConfirmLoading(false);
        }, 500);
    };

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

    const showModalFormrom = async () => {
        setOpenFormrom(true);

        await axios.get("http://localhost:8080/rom/new-code")
            .then((res) => {
                setromForm({ ...romForm, 'marom': res.data })
            })
    };
    const handleOkFormrom = async () => {
        await axios.post("http://localhost:8080/rom/save-second", romForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormrom(false);
            setConfirmLoading(false);
        }, 500);
    };

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

    const showModalFormmauSac = async () => {
        setOpenFormmauSac(true);

        await axios.get("http://localhost:8080/mau-sac/new-code")
            .then((res) => {
                setmauSacForm({ ...mauSacForm, 'mamauSac': res.data })
            })
    };
    const handleOkFormmauSac = async () => {
        await axios.post("http://localhost:8080/mau-sac/save-second", mauSacForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormmauSac(false);
            setConfirmLoading(false);
        }, 500);
    };

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

    const showModalFormmanHinh = async () => {
        setOpenFormmanHinh(true);

        await axios.get("http://localhost:8080/man-hinh/new-code")
            .then((res) => {
                setmanHinhForm({ ...manHinhForm, 'mamanHinh': res.data })
            })
    };
    const handleOkFormmanHinh = async () => {
        await axios.post("http://localhost:8080/man-hinh/save-second", manHinhForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormmanHinh(false);
            setConfirmLoading(false);
        }, 500);
    };

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

    const showModalFormDongSanPham = async () => {
        setOpenFormDongSanPham(true);

        await axios.get("http://localhost:8080/dong-san-pham/new-code")
            .then((res) => {
                setDongSanPhamForm({ ...DongSanPhamForm, 'maDongSanPham': res.data })
            })
    };
    const handleOkFormDongSanPham = async () => {
        await axios.post("http://localhost:8080/dong-san-pham/save", DongSanPhamForm)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenFormDongSanPham(false);
            setConfirmLoading(false);
        }, 500);
    };


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


    useImperativeHandle(ref, () => ({

        getAlert() {
            onSubmit()
        }

    }));





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
                props.getIdSanPham(res.data.id)
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

    return (
        <div className="card-body" style={{ marginLeft: 40 }}>
            <Form onSubmit={(e) => onSubmit(e)}>


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

                <Row>
                    <Col span={8}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Nhà sản xuất
                                <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModal}>
                                    <FontAwesomeIcon
                                        style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                        icon={faPlus} />
                                </Button>
                                <Modal
                                    title="Thêm nhà sản xuất"
                                    open={open}
                                    onOk={handleOk}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                >
                                    <p>
                                        <Form >
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="email">Mã</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder='Nhập mã '
                                                    name='maNhaSanXuat'
                                                    value={maNhaSanXuat}
                                                    disabled='true'
                                                    id="maNhaSanXuat" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="pwd">Tên nhà sản xuất</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder='Nhập tên nhà sản xuất)'
                                                    name='tenNhaSanXuat'
                                                    value={tenNhaSanXuat}
                                                    onChange={(e) => onInputChangeFormNhaSanXuat(e)}
                                                    id="ten`" />
                                            </Form.Group>
                                        </Form>
                                    </p>
                                </Modal>
                            </Form.Label>
                            <Select
                                defaultValue="Chọn nhà sản xuất"
                                style={{ width: 200 }}
                                onChange={handleChange}
                                options={[
                                    {
                                        label: 'Chọn một nhà sản xuất',
                                        options: listNhaSanXuat
                                    },
                                ]}
                            />
                        </Form.Group>
                    </Col>

                    <Col span={8}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Chip
                                <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormChip}>
                                    <FontAwesomeIcon
                                        style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                        icon={faPlus} />
                                </Button>
                                <Modal
                                    title="Thêm chip"
                                    open={openFormChip}
                                    onOk={handleOkFormChip}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                >
                                    <p>
                                        <Form >
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="email">Mã</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder='Nhập mã sản phẩm'
                                                    name='maNhaSanXuat'
                                                    value={maChip}
                                                    disabled='true'
                                                    id="maNhaSanXuat" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="pwd">Tên chip</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder='Nhập chip'
                                                    name='tenChip'
                                                    value={tenChip}
                                                    onChange={(e) => onInputChangeFormChip(e)}
                                                    id="tenChip`" />
                                            </Form.Group>
                                        </Form>
                                    </p>
                                </Modal></Form.Label>
                            <Select
                                defaultValue="Chọn chip"
                                style={{ width: 200 }}
                                onChange={handleChange}
                                options={[
                                    {
                                        label: 'Chọn một chip',
                                        options: listChip
                                    },
                                ]}
                            />
                        </Form.Group>
                    </Col>

                    <Col span={8}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}>  Dòng sản phẩm
                                <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormDongSanPham}>
                                    <FontAwesomeIcon
                                        style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                        icon={faPlus} />
                                </Button>
                                <Modal
                                    title="Thêm dòng sản phẩm mới"
                                    open={openFormDongSanPham}
                                    onOk={handleOkFormDongSanPham}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                >
                                    <p>
                                        <Form >
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="email">Mã</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder='Nhập mã dòng sản phẩm'
                                                    name='maDongSanPham'
                                                    value={maDongSanPham}
                                                    onChange={(e) => onInputChangeFormDongSanPham(e)}
                                                    id="maDongSanPham" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="pwd">Tên nhà sản xuất</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder='Nhập tên nhà sản xuất)'
                                                    name='tenDongSanPham'
                                                    value={tenDongSanPham}
                                                    onChange={(e) => onInputChangeFormDongSanPham(e)}
                                                    id="ten`" />
                                            </Form.Group>
                                        </Form>
                                    </p>
                                </Modal>
                            </Form.Label>
                            <Select
                                defaultValue="Chọn dòng sản phẩm"
                                style={{ width: 200 }}
                                onChange={handleChange}
                                options={[
                                    {
                                        label: 'Chọn một dòng sản phẩm',
                                        options: listDongSanPham
                                    },
                                ]}
                            />
                        </Form.Group>
                    </Col>

                </Row>




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

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150 }} >Pin
                                                                        <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormpin}>
                                                                            <FontAwesomeIcon
                                                                                style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                                                                icon={faPlus} />
                                                                        </Button>
                                                                        <Modal
                                                                            title="Thêm dung lượng pin"
                                                                            open={openFormpin}
                                                                            onOk={handleOkFormpin}
                                                                            confirmLoading={confirmLoading}
                                                                            onCancel={handleCancel}
                                                                        >
                                                                            <p>
                                                                                <Form >
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="email">Mã pin</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            placeholder='Nhập pin'
                                                                                            name='mapin'
                                                                                            value={mapin}
                                                                                            disabled='true'
                                                                                            id="mapin" />
                                                                                    </Form.Group>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="pwd">Dung luợng pin</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            placeholder='Nhập dung lượng pin)'
                                                                                            name='tenpin'
                                                                                            value={tenpin}
                                                                                            onChange={(e) => onInputChangeFormpin(e)}
                                                                                            id="ten`" />
                                                                                    </Form.Group>
                                                                                </Form>
                                                                            </p>
                                                                        </Modal>
                                                                    </Form.Label>
                                                                    <Select
                                                                        defaultValue="Chọn dung lượng pin"
                                                                        style={{ width: 200 }}
                                                                        onChange={handleChangeFormCauHinh}
                                                                        options={[
                                                                            {
                                                                                label: 'Chọn một dung lượng pin',
                                                                                options: listPin
                                                                            },
                                                                        ]}
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150 }}> Ram
                                                                        <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormram}>
                                                                            <FontAwesomeIcon
                                                                                style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                                                                icon={faPlus} />
                                                                        </Button>
                                                                        <Modal
                                                                            title="Thêm dung lượng ram"
                                                                            open={openFormram}
                                                                            onOk={handleOkFormram}
                                                                            confirmLoading={confirmLoading}
                                                                            onCancel={handleCancel}
                                                                        >
                                                                            <p>
                                                                                <Form >
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="email">Mã</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            name='maram'
                                                                                            value={maram}
                                                                                            disabled='true'
                                                                                            id="maram" />
                                                                                    </Form.Group>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="pwd">Dung lượng ram</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            placeholder='Nhập dung lượng ram'
                                                                                            name='tenram'
                                                                                            value={tenram}
                                                                                            onChange={(e) => onInputChangeFormram(e)}
                                                                                            id="ten`" />
                                                                                    </Form.Group>
                                                                                </Form>
                                                                            </p>
                                                                        </Modal>
                                                                    </Form.Label>

                                                                    <Select
                                                                        defaultValue="Chọn dung lượng ram"
                                                                        style={{ width: 200 }}
                                                                        onChange={handleChangeFormCauHinh}
                                                                        options={[
                                                                            {
                                                                                label: 'Chọn một dung lượng ram',
                                                                                options: listRam
                                                                            },
                                                                        ]}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150 }} >Rom
                                                                        <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormrom}>
                                                                            <FontAwesomeIcon
                                                                                style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                                                                icon={faPlus} />
                                                                        </Button>
                                                                        <Modal
                                                                            title="Thêm rom"
                                                                            open={openFormrom}
                                                                            onOk={handleOkFormrom}
                                                                            confirmLoading={confirmLoading}
                                                                            onCancel={handleCancel}
                                                                        >
                                                                            <p>
                                                                                <Form >
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="email">Mã</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            name='marom'
                                                                                            value={marom}
                                                                                            disabled='true'
                                                                                            id="marom" />
                                                                                    </Form.Group>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="pwd">Dung lượng ROM</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            placeholder='Nhập dung lượng rom'
                                                                                            name='tenrom'
                                                                                            value={tenrom}
                                                                                            onChange={(e) => onInputChangeFormrom(e)}
                                                                                            id="ten`" />
                                                                                    </Form.Group>
                                                                                </Form>
                                                                            </p>
                                                                        </Modal>
                                                                    </Form.Label>
                                                                    <Select
                                                                        defaultValue="Chọn dung lượng rom"
                                                                        style={{ width: 200 }}
                                                                        onChange={handleChangeFormCauHinh}
                                                                        options={[
                                                                            {
                                                                                label: 'Chọn một dung lượng rom',
                                                                                options: listRom
                                                                            },
                                                                        ]}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150 }} >Màn hình
                                                                        <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormmanHinh}>
                                                                            <FontAwesomeIcon
                                                                                style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                                                                icon={faPlus} />
                                                                        </Button>
                                                                        <Modal
                                                                            title="Thêm màn hình"
                                                                            open={openFormmanHinh}
                                                                            onOk={handleOkFormmanHinh}
                                                                            confirmLoading={confirmLoading}
                                                                            onCancel={handleCancel}
                                                                        >
                                                                            <p>
                                                                                <Form >
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="email">Mã</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            disabled='true'
                                                                                            name='mamanHinh'
                                                                                            value={mamanHinh}
                                                                                            id="mamanHinh" />
                                                                                    </Form.Group>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="pwd">Kích thước màn hình:</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            placeholder='Nhập kích cỡ màn hình'
                                                                                            name='tenmanHinh'
                                                                                            value={tenmanHinh}
                                                                                            onChange={(e) => onInputChangeFormmanHinh(e)}
                                                                                            id="ten`" />
                                                                                    </Form.Group>
                                                                                </Form>
                                                                            </p>
                                                                        </Modal>
                                                                    </Form.Label>
                                                                    <Select
                                                                        defaultValue="Chọn kích cỡ màn hình"
                                                                        style={{ width: 200 }}
                                                                        onChange={handleChangeFormCauHinh}
                                                                        options={[
                                                                            {
                                                                                label: 'Chọn một kích cõ màn hình',
                                                                                options: listManHinh
                                                                            },
                                                                        ]}
                                                                    />
                                                                </Form.Group>
                                                            </Col>


                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Group className="form-group">

                                                                    <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}> Màu sắc
                                                                        <Button style={{ width: 15, height: 22, marginLeft: 10, transform: `translateX(${-4}px) translateY(${10}px)` }} type="primary" onClick={showModalFormmauSac}>
                                                                            <FontAwesomeIcon
                                                                                style={{ width: 15, height: 23, transform: `translateX(${-8}px) translateY(${-5}px)` }}
                                                                                icon={faPlus} />
                                                                        </Button>
                                                                        <Modal
                                                                            title="Thêm màu sắc"
                                                                            open={openFormmauSac}
                                                                            onOk={handleOkFormmauSac}
                                                                            confirmLoading={confirmLoading}
                                                                            onCancel={handleCancel}
                                                                        >
                                                                            <p>
                                                                                <Form >
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="email">Mã</Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            disabled='true'
                                                                                            name='mamauSac'
                                                                                            value={mamauSac}
                                                                                            id="mamauSac" />
                                                                                    </Form.Group>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label htmlFor="pwd">Tên màu sắc </Form.Label>
                                                                                        <Form.Control type="text"
                                                                                            placeholder='Nhập tên màu sắc'
                                                                                            name='tenmauSac'
                                                                                            value={tenmauSac}
                                                                                            onChange={(e) => onInputChangeFormmauSac(e)}
                                                                                            id="ten`" />
                                                                                    </Form.Group>
                                                                                </Form>
                                                                            </p>
                                                                        </Modal>
                                                                    </Form.Label>
                                                                    <Select
                                                                        defaultValue="Chọn màu sắc"
                                                                        style={{ width: 200 }}
                                                                        onChange={handleChangeFormCauHinh}
                                                                        options={[
                                                                            {
                                                                                label: 'Chọn một màu sắc',
                                                                                options: listMauSac
                                                                            }
                                                                        ]}
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
});
const AnhForm = (props) => {

    const [fileList, setFileList] = useState([
    ]);

    const [imageList, setImageList] = useState([]);

    const [nameStorage, setNameStorage] = useState("images/")

    const imageListRef = ref(storage, nameStorage);



    const uploadFile = async (file) => {
        if (fileList == null) return;
        console.log(file)
        const imageRef = ref(storage, `${props.idSanPhams.tenSanPham}/${file.name}`);
        uploadBytes(imageRef, file).then(() => {
        })

    }

    const handleChange = (file) => {
        setFileList(file);
        uploadFile(file[0]);


        listAll(ref(storage, props.idSanPhams.tenSanPham)).then(
            (responce) => {
                responce.items.forEach((item) => {

                    getDownloadURL(item).then(
                        (url) => {
                            setImageList((prev) => [...prev, url])
                        }
                    )
                })
            }
        )
    };

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    useEffect(() => {

    }, [fileList])



    return (
        <div className="card-body" style={{ marginLeft: 138 }} >
            <ImageList
                sx={{
                    width: 500,
                    display: 'flex',
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                }}
                rowHeight={200}
                gap={1}
            >

                {imageList.map((image) => (
                    <ImageListItem>
                        <img
                            src={image}
                        />

                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'yellow' }}
                                >
                                    <StarBorderIcon sx={{ color: 'yellow' }} />
                                </IconButton>
                            }
                            actionPosition="left"
                        />
                    </ImageListItem>
                ))}

            </ImageList>
            <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={["JPEG", "PNG", "GIF", "JPG"]}
            />
            <br />
        </div>
    )

};
const ImeiForm = (props) => {

    // xử lý imei trong form này 
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [data, setData] = useState([
        [{ value: "" }]

    ]);
    const handleClick = () => {
        console.log(data.length)
        data[data.length] = [{ value: "", value: "", value: "" }]
        setData(data)
        console.log(data)
        forceUpdate();
    }

    return (
        <div className="card-body" >


            <Tabs
                defaultActiveKey="1"
                centered
                items={new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `Cấu hình ${id}`,
                        key: id,
                        children: id == 1 ?

                            <Row>

                                <Col span={12}>
                                    <Form.Group className="form-group">

                                        <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Số lượng</Form.Label>
                                        <Form.Control type="number"
                                            className=" form-control d-inline-block"
                                            style={{ width: 400 }}
                                            placeholder='Nhập số sản phẩm'
                                            name=''
                                            // value={tenSanPham}
                                            id="ten`" />
                                    </Form.Group>
                                </Col>
                                <Col span={12}>
                                    <Form.Group className="form-group">

                                        <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Đơn giá </Form.Label>

                                        <CurrencyInput
                                            id="input-example"
                                            name="input-name"
                                            suffix=" VND"
                                            className=" form-control d-inline-block"
                                            style={{ width: 400 }}
                                            placeholder="Vui lòng nhập số tiền "
                                            defaultValue={1000}
                                            decimalsLimit={2}
                                        // onValueChange={
                                        //     (value, name) => setchiTietSanPham({ ...chiTietSanPham, donGia: value })
                                        // }
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            :
                            <Row>
                                <Col span={24}>
                                    <Form.Group className="form-group">

                                        <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Số lượng </Form.Label>

                                        <CurrencyInput
                                            id="input-example"
                                            name="input-name"

                                            className=" form-control d-inline-block"
                                            style={{ width: 600 }}
                                            placeholder="Vui lòng nhập số tiền "
                                            defaultValue={1000}
                                            decimalsLimit={2}
                                        // onValueChange={
                                        //     (value, name) => setchiTietSanPham({ ...chiTietSanPham, donGia: value })
                                        // }
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                        ,
                    };
                })}
            />

            <Tabs
                defaultActiveKey="1"
                centered
                items={new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `Nhập imei `,
                        key: id,
                        children: id == 1 ?

                            <Row>

                                <Col span={12}>
                                    <Form.Group className="form-group">

                                        <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Số lượng</Form.Label>
                                        <Form.Control type="number"
                                            className=" form-control d-inline-block"
                                            style={{ width: 400 }}
                                            placeholder='Nhập số sản phẩm'
                                            name=''
                                            // value={tenSanPham}
                                            id="ten`" />
                                    </Form.Group>
                                </Col>
                                <Col span={12}>
                                    <Form.Group className="form-group">

                                        <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Đơn giá </Form.Label>

                                        <CurrencyInput
                                            id="input-example"
                                            name="input-name"
                                            suffix=" VND"
                                            className=" form-control d-inline-block"
                                            style={{ width: 400 }}
                                            placeholder="Vui lòng nhập số tiền "
                                            defaultValue={1000}
                                            decimalsLimit={2}
                                        // onValueChange={
                                        //     (value, name) => setchiTietSanPham({ ...chiTietSanPham, donGia: value })
                                        // }
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            :
                            <Row>
                                <Col span={24}>
                                    <Form.Group className="form-group">

                                        <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Số lượng </Form.Label>

                                        <CurrencyInput
                                            id="input-example"
                                            name="input-name"

                                            className=" form-control d-inline-block"
                                            style={{ width: 600 }}
                                            placeholder="Vui lòng nhập số tiền "
                                            defaultValue={1000}
                                            decimalsLimit={2}
                                        // onValueChange={
                                        //     (value, name) => setchiTietSanPham({ ...chiTietSanPham, donGia: value })
                                        // }
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                        ,
                    };
                })}
            />
        </div>
    )
};


const ThemMauSac = () => {

    // sử dụng childRef gọi function
    const childRef = useRef()
    const [idSanPham, setIdSanPham] = useState();


    const handleNext = (data) => {
        if (activeStep == 0) {
            childRef.current.getAlert()
        }
        if (activeStep == steps.length - 1) {
            fetch("https://jsonplaceholder.typicode.com/comments")
                .then((data) => data.json())
                .then((res) => {
                    console.log(res);
                    setActiveStep(activeStep + 1);
                });
        } else {
            setActiveStep(activeStep + 1);
            setSkippedSteps(
                skippedSteps.filter((skipItem) => skipItem !== activeStep)
            );
        }
    };



    function getStepContent(step) {
        const getData = (e) => {
            axios.get(`http://localhost:8080/san-pham/get-one/${e}`)
                .then((res) => {
                    console.log(res.data)
                    setIdSanPham(res.data)
                })
        }

        switch (step) {
            case 0:
                return <ChiTietSanPhamForm ref={childRef} getIdSanPham={getData} />;
            case 1:
                return <AnhForm idSanPhams={idSanPham} />;
            case 2:
                return <ImeiForm idSanPhams={idSanPham} />;
            default:
                return "unknown step";
        }
    }


    const [mauSac, setMauSac] = useState({
        donGia: "",
        moTa: ""
    })

    const { donGia, moTa } = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({ ...mauSac, [e.target.name]: e.target.value })
    }




    const classes = useStyles();
    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            nickName: "",
            emailAddress: "",
            phoneNumber: "",
            alternatePhone: "",
            address1: "",
            address2: "",
            country: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
        },
    });
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1 || step === 2;
    };

    const isStepSkipped = (step) => {
        return skippedSteps.includes(step);
    };



    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSkip = () => {
        if (!isStepSkipped(activeStep)) {
            setSkippedSteps([...skippedSteps, activeStep]);
        }
        setActiveStep(activeStep + 1);
    };


    return (
        <div className='container' style={{ width: 900 }}>
            <div className="card " style={{ borderRadius: '40px!important' }}  >

                <div style={{ marginTop: 20 }}>
                    <Stepper alternativeLabel activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const labelProps = {};
                            const stepProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step {...stepProps} key={index}>
                                    <StepLabel {...labelProps}>{step}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <br />
                    {activeStep === steps.length - 1 ? (
                        <Typography variant="h3" align="center">
                            Thành công
                        </Typography>
                    ) : (
                        <>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}

                                    <Button
                                        className={classes.button}
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        style={{ transform: `translateX(${65}px) translateY(${-20}px)` }}
                                    >
                                        Trở lại
                                    </Button>

                                    <Button
                                        style={{ transform: `translateX(${600}px) translateY(${-20}px)`, backgroundColor: 'blue' }}
                                        className="btn btn-success"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        type="submit"

                                    >
                                        <span style={{ transform: `translateY(${-4}px)` }}>
                                            {activeStep === steps.length - 2 ? "Hoàn thành" : `Tiếp tục `}
                                        </span>
                                    </Button>
                                </form>
                            </FormProvider>
                        </>
                    )}
                </div>


            </div>

        </div>
    )
}

export default ThemMauSac