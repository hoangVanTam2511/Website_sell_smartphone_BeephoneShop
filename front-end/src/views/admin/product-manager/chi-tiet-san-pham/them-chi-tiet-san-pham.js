import React, { useState, useReducer, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
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
    Divider, Radio, Table
} from "antd";
import Spreadsheet from "react-spreadsheet";
import ImgCrop from 'antd-img-crop';
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
import { apiURLChiTietSanPham, apiURLCamera, apiURLChip, apiURLDongSanPham, apiURLHinhThucSanPham, apiURLManHinh, apiURLMauSac, apiURLNhaSanXuat, apiURLPin, apiURLSanPham, apiURLram, apiURLrom } from '../../../../service/api';
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
    const [listCamera, setlistCamera] = useState([])
    const [listChip, setlistChip] = useState([])
    const [listRam, setListRam] = useState([])
    const [listManHinh, setlistManHinh] = useState([])
    const [listRom, setlistRom] = useState([])
    const [listPin, setListPin] = useState([])
    const [listNhaSanXuat, setlistNhaSanXuat] = useState([])
    const [listSanPham, setListSanPham] = useState([])
    const [listHinhThucSanPham, setListHinhThucSanPham] = useState([])
    const [listDongSanPham, setListDongSanPham] = useState([])
    const [listChiTietSanPham, setlistChiTietSanPham] = useState([])
    const { control } = useFormContext();
    const [selectionType, setSelectionType] = useState('checkbox');

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
            title: "Hình thức sản phẩm(%)",
            dataIndex: "hinhThucSanPham",
            width: "5%",
        }


    ];

    const rowSelection = {
        onChange: (selectedRowKeys, obj) => {
            setchiTietSanPham({
                ...chiTietSanPham,
                hinhThucSanPham: obj[0].hinhThucSanPham,
                rom: obj[0].kichThuocRom, pin: obj[0].dungLuongPin, ram: obj[0].kichThuocRam
            })
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };


    useImperativeHandle(ref, () => ({

        getAlert() {
            onSubmit()
        }

    }));



    let navigate = useNavigate();
    const [chiTietSanPham, setchiTietSanPham] = useState({
        sanPham: "",
        dongSanPham: "",
        nhaSanXuat: "",
        mauSac: "",
        pin: "",
        ram: "",
        rom: "",
        camera: "",
        chip: "",
        hinhThucSanPham: "",
        manHinh: "",
        donGia: "",
        moTa: ""
    })
    const { donGia, moTa } = chiTietSanPham // tạo contructor

    const onSubmit = async () => {
        await axios.post("http://localhost:8080/chi-tiet-san-pham/save", chiTietSanPham)
    }
    const onInputChange = (e) => {
        setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value })
    }

    const handleTextArea = (e) => {
        setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value })
    }

    const handleChange = (value) => {
        setchiTietSanPham({ ...chiTietSanPham, [String(value).slice(0, String(value).indexOf(":"))]: String(value).slice(String(value).indexOf(":") + 1) })
        console.log(chiTietSanPham)
    };


    // hàm load data tự động khi mình vào component
    useEffect(() => {
        loadDataComboBox();
        loadDatalistMauSac()
    }, []);

    const loadDatalistMauSac = async () => {
        axios.get(apiURLChiTietSanPham + "/get-cau-hinh?page=0").then((response) => {
            const modifiedData = response.data.content.map((item, index) => ({
                ...item,
                stt: index + 1,
            }));
            setlistChiTietSanPham(modifiedData);
            console.log(modifiedData)
        });
    };


    const loadDataComboBox = async () => {
        // load các combobõx tươuơng ứg
        axios.get(apiURLCamera + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.doPhanGiai + "MP",
                value: "camera:" + item.doPhanGiai,
            }));
            setlistCamera(modifiedData);
        });

        axios.get(apiURLSanPham + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.ten,
                value: "sanPham:" + item.ten,
            }));
            setListSanPham(modifiedData);
        });

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

        axios.get(apiURLHinhThucSanPham + "/get-list").then((response) => {
            const modifiedData = response.data.map((item, index) => ({
                label: item.hinhThuc + " %",
                value: "hinhThucSanPham:" + item.hinhThuc,
            }));
            setListHinhThucSanPham(modifiedData);
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
                                name='sanPham'
                                // value={sanPham}
                                onChange={(e) => onInputChange(e)}
                                id="ten`" />
                        </Form.Group>
                    </Col>


                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Đơn giá </Form.Label>

                            <CurrencyInput
                                id="input-example"
                                name="input-name"
                                suffix=" VND"
                                className=" form-control d-inline-block"
                                style={{ width: 600 }}
                                placeholder="Vui lòng nhập số tiền "
                                defaultValue={1000}
                                decimalsLimit={2}
                                onValueChange={
                                    (value, name) => setchiTietSanPham({ ...chiTietSanPham, donGia: value })
                                }
                            />

                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Nhà sản xuất</Form.Label>
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

                    <Col span={12}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}> Màu sắc </Form.Label>
                            <Select
                                defaultValue="Chọn màu sắc"
                                style={{ width: 200 }}
                                onChange={handleChange}
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


                <Row>
                    <Col span={12}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }} >Chip</Form.Label>
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

                    <Col span={12}>
                        <Form.Group className="form-group">

                            <Form.Label htmlFor="pwd" style={{ width: 150, color: 'black' }}>  Dòng sản phẩm</Form.Label>
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
                    <Col span={24}>
                        <Tabs
                            defaultActiveKey="1"
                            centered
                            items={new Array(2).fill(null).map((_, i) => {
                                const id = String(i + 1);
                                return {
                                    label: id == 1 ? `Cấu hình đã tạo` : id == 2 ? "Tạo cấu hình mới" : "",
                                    key: id,
                                    children:
                                        id == 1 ?

                                            <div>

                                                <Divider />

                                                <Table
                                                    rowSelection={{
                                                        type: `checkbox`,
                                                        ...rowSelection,
                                                    }}
                                                    columns={columns}
                                                    dataSource={listChiTietSanPham}
                                                />
                                            </div>
                                            :
                                            <div>
                                                <Row>
                                                    <Col span={12}>
                                                        <Form.Group className="form-group">

                                                            <Form.Label htmlFor="pwd" style={{ width: 150 }} >Pin</Form.Label>
                                                            <Select
                                                                defaultValue="Chọn dung lượng pin"
                                                                style={{ width: 200 }}
                                                                onChange={handleChange}
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

                                                            <Form.Label htmlFor="pwd" style={{ width: 150 }}> Ram </Form.Label>
                                                            <Select
                                                                defaultValue="Chọn dung lượng ram"
                                                                style={{ width: 200 }}
                                                                onChange={handleChange}
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

                                                            <Form.Label htmlFor="pwd" style={{ width: 150 }} >Rom</Form.Label>
                                                            <Select
                                                                defaultValue="Chọn dung lượng rom"
                                                                style={{ width: 200 }}
                                                                onChange={handleChange}
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

                                                            <Form.Label htmlFor="pwd" style={{ width: 150 }}> Camera </Form.Label>
                                                            <Select
                                                                defaultValue="Chọn  camera"
                                                                style={{ width: 200 }}
                                                                onChange={handleChange}
                                                                options={[

                                                                    {
                                                                        label: 'Vui lòng chọn camera',
                                                                        options: listCamera
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <Form.Group className="form-group">

                                                            <Form.Label htmlFor="pwd" style={{ width: 150 }}> Hình thức sản phẩm </Form.Label>
                                                            <Select
                                                                defaultValue="Chọn hình thức sản phẩm"
                                                                style={{ width: 200 }}
                                                                onChange={handleChange}
                                                                options={[

                                                                    {
                                                                        label: 'Chọn hình thức sản phẩm',
                                                                        options: listHinhThucSanPham
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Group className="form-group">

                                                            <Form.Label htmlFor="pwd" style={{ width: 150 }} >Màn hình</Form.Label>
                                                            <Select
                                                                defaultValue="Chọn kích cỡ màn hình"
                                                                style={{ width: 200 }}
                                                                onChange={handleChange}
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


                                            </div>
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
const AnhForm = () => {
    const preset_key = "upload_image";
    const cloud_name = "ddu5tdvow";
    const FOLDER_NAME = "DATN";
    const api_secret = 'njqrFLQXNCauxbAmlR0ThiX3LUU'
    const api_key=  '588641245952967'
    

    const [fileList, setFileList] = useState([

    ]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        // console.log(newFileList)
        uploadFile();
    };


    const uploadFile = async () => {
       
        const data = new FormData();
        data.append("file", fileList[0]);
        data.append(
            "upload_preset",
            preset_key
        );
        data.append("cloud_name",cloud_name );
        data.append("folder", "DATN");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
        } catch (error) {
        }
    }

    const onPreview = async (file) => {
        let src = String(file.url);
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    return (
        <div className="card-body" style={{ marginLeft: 200 }}>
            <ImgCrop rotationSlider>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </ImgCrop>
            <br />
        </div>
    )

};
const ImeiForm = () => {

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
        <div className="card-body" style={{ marginLeft: 330 }}>

            <Spreadsheet
                columnLabels={[
                    "Imei"
                ]}

                onChange={(d) => {
                    // console.log("data",d)
                    if (d.length)
                        setData(d)
                }}

                data={data} />

            <br />

            <Button variant="contained"
                onClick={() => handleClick()}
            >Thêm</Button>
        </div>
    )
};




const ThemMauSac = () => {

    // sử dụng childRef gọi function
    const childRef = useRef()

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


        switch (step) {
            case 0:
                return <ChiTietSanPhamForm ref={childRef} />;

            case 1:
                return <AnhForm />;
            case 2:
                return <ImeiForm />;
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
                                        style={{ transform: `translateX(${600}px) translateY(${-20}px)` }}
                                        className="btn btn-success"
                                        variant="contained"
                                        color="primary"
                                        // onClick={handleNext}
                                        type="submit"

                                    >
                                        {activeStep === steps.length - 2 ? "Hoàn thành" : `Tiếp tục `}
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