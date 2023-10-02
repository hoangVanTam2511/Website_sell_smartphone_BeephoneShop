import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Table as TableAntd } from 'antd'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Drawer, Dialog, Select as SelectMui, IconButton, Slide, TextField, FormControl, InputLabel, MenuItem, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material'
import styleCss from './style.css'
import { format } from 'date-fns'
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoadingIndicator from '../../../utilities/loading.js'
import { OrderStatusString } from './enum';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function OrderPendingConfirmCloseDialog(props) {
  const { open, onClose, ma, deleteOrder } = props;

  return (
    <div className='rounded-pill'>
      <Dialog
        TransitionComponent={Transition1}
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        sx={{
          height: "300px",
          "& .MuiPaper-root": {
            borderRadius: "15px", // Giá trị border radius tùy chỉnh
            marginTop: "150px",
          },
        }}
      >
        <div className='p-2' style={{
        }}
        >
          <DialogTitle sx={{ color: "#dc3333", fontWeight: "bold", fontSize: "18px" }} id="alert-dialog-title">
            {"Đóng đơn hàng " + ma}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "black" }} id="alert-dialog-description">
              Thông tin của <span className='' style={{ fontWeight: "500" }}> Đơn hàng {ma}</span> sẽ không được lưu lại. Bạn có chắc chắn muốn đóng
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteOrder} className="rounded-2 me-2 button-mui" type="primary" style={{ height: "40px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
              <span className='text-white' style={{ fontWeight: "500", marginBottom: "2px" }}>
                Xác nhận</span>
            </Button>
            <Button onClick={onClose} className="rounded-2 me-3 ant-btn-danger" type="primary" style={{ height: "40px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
              <span className='text-white' style={{ fontWeight: "500", marginBottom: "2px" }}>
                Hủy bỏ</span>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
export function ShipFeeInput({ receiveName, onChangeReceiveName }) {
  // const { receiveName, onChangeReceiveName } = props;
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [receiveDateDefault, setReceiveDateDefault] = useState();

  const tokenGhn = "62124d79-4ffa-11ee-b1d4-92b443b7a897";

  const getAllWardGhnByIdDistrict = (districtId) => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
      params: {
        district_id: districtId,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        setWards(response.data.data);
      }
    )
  }


  const getAllDistrictGhnByIdProvince = (provinceId) => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
      params: {
        province_id: provinceId,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        setDistricts(response.data.data);
      }
    )
  }

  const getAllProvinceGhn = async () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        setProvinces(response.data.data);
      }
    )
  }

  const shopID = 189389;
  const serviceID = 53320;
  const shopAddressId = 1482;

  const getReceiveDate = () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`, {
      params: {
        ShopID: shopID,
        service_id: serviceID,
        from_district_id: shopAddressId,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        let getDate = response.data.data.leadtime;
        const date = new Date(getDate * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        getDate = `${day}/${month}/${year}`;
        setReceiveDateDefault(getDate);
        // console.log(response.data.data.leadtime);
      }
    )
  }


  const [deliveryDate, setDeliveryDate] = useState('');


  const convertTimeToDate = () => {
    const date = new Date(receiveDateDefault * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return receiveDateDefault;
  }


  useEffect(() => {
    if (selectedProvince != "" && selectedDistrict != "" && selectedWard != "") {
      getReceiveDate();
    }
  }, [selectedWard, selectedDistrict, selectedProvince])

  useEffect(() => {
    getAllProvinceGhn();
  }, []);

  const handleChangeProvince = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    getAllDistrictGhnByIdProvince(value);
    getAllWardGhnByIdDistrict(3450);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleChangeWard = (event) => {
    const value = event.target.value;
    setSelectedWard(value);
  };

  const handleChangeDistrict = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    getAllWardGhnByIdDistrict(value);
    setSelectedWard("");
  };

  const districtsName = districts.filter((district) => isNaN(district.DistrictName));
  const wardsName = wards && wards.filter((ward) => isNaN(ward.WardName));



  return (
    <>
      <div style={{ width: "99.5%" }} className="">
        <div>
          <TextField label="Tên người nhận"
            // value={receiveName}
            // onChange={onChangeReceiveName}
            style={{ width: "100%" }}
            size='medium' className='mt-1' />
        </div>
        <div>
          <TextField label="Số điện thoại"
            style={{ width: "100%" }}
            inputProps={{
              style: {
              },
            }}
            size='medium' className='mt-3' />
        </div>
        <div className='d-flex mt-3'>
          <FormControl style={{ width: "100%" }}>
            <InputLabel >Tỉnh / Thành Phố</InputLabel>
            <SelectMui
              onChange={handleChangeProvince}
              input={<OutlinedInput label="Tỉnh / Thành Phố" />}
              value={selectedProvince}
            >
              {provinces.map((province) => (
                <MenuItem
                  key={province.ProvinceID}
                  value={province.ProvinceID}
                >
                  {province.ProvinceName}
                </MenuItem>
              ))}
            </SelectMui>
          </FormControl>
          <FormControl style={{ width: "100%" }} className='ms-3'>
            <InputLabel >Quận / Huyện</InputLabel>
            <SelectMui
              input={<OutlinedInput label="Quận / Huyện" />}
              value={selectedDistrict}
              onChange={handleChangeDistrict}
            >
              {districtsName.map((district) => (
                <MenuItem
                  key={districts.DistrictID}
                  value={district.DistrictID}
                >
                  {district.DistrictName}
                </MenuItem>
              ))}
            </SelectMui>
          </FormControl>
          <FormControl style={{ width: "100%" }} className='ms-3'>
            <InputLabel>Phường / Xã</InputLabel>
            <SelectMui
              onChange={handleChangeWard}
              input={<OutlinedInput label="Phường / Xã" />}
              value={selectedWard}
            >
              {wards && wardsName.map((ward) => (
                <MenuItem
                  key={ward.WardCode}
                  value={ward.WardCode}
                >
                  {ward.WardName}
                </MenuItem>
              ))}
            </SelectMui>
          </FormControl>
        </div>
        <div>
          <TextField label="Địa chỉ"
            style={{ width: "100%" }}
            inputProps={{
              style: {
              },
            }}
            size='medium' className='mt-3' />
        </div>
        <TextField label={<span>Ghi chú cho shipper </span>}
          // value={description}
          // onChange={handleGetValueFromInputTextField}
          style={{ width: "100%" }}
          inputProps={{
            style: {
              width: "720px",
              paddingBottom: "25px"
            },
          }}
          size='medium' className='mt-3' />
        <div className='mt-4 pt-3 ms-2 ps-1 d-flex' style={{ height: "45px" }}>
          {selectedProvince != "" && selectedDistrict != "" && selectedWard != "" ?
            <>
              <img src="https://www.svgrepo.com/show/259747/delivery-truck-deliver.svg" style={{ width: "50px", height: "40px" }} />
              <div className='mt-1 pt-1'>
                <span className='ms-2' style={{ fontSize: "19px", fontWeight: "500", color: "" }}>
                  Thời gian giao hàng dự kiến: {receiveDateDefault}</span>
                <span className='ms-2' style={{ fontSize: "19px", fontWeight: "500", color: "#38b000" }}>(Giao Hàng Nhanh)</span>
              </div>
            </> : ""
          }
        </div>
        <div className='mt-4 pt-2'>
        </div>
      </div>
    </>
  );
}
export function UpdateRecipientOrderDialog(props) {

  const ITEM_HEIGHT = 98;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const { open, onClose, onCloseNoAction } = props;

  return (
    <div className='rounded-pill'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {<span className='fs-4 text-dark text-uppercase'>Cập Nhật Thông Tin</span>}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField label="Họ và tên"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size='medium' className='mt-1' />
          </div>
          <div>
            <TextField label="Số điện thoại"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size='medium' className='mt-3' />
          </div>
          <div className='d-flex mt-3'>
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="demo-multiple-name-label">Tỉnh / Thành Phố</InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                input={<OutlinedInput label="Tỉnh / Thành Phố" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </SelectMui>
            </FormControl>
            <FormControl sx={{ width: 250 }} className='ms-3'>
              <InputLabel id="demo-multiple-name-label">Quận / Huyện</InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                input={<OutlinedInput label="Quận / Huyện" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </SelectMui>
            </FormControl>
            <FormControl sx={{ width: 250 }} className='ms-3'>
              <InputLabel id="demo-multiple-name-label">Phường / Xã</InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                input={<OutlinedInput label="Phường / Xã" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </SelectMui>
            </FormControl>
          </div>
          <div>
            <TextField label="Địa chỉ"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size='medium' className='mt-3' />
          </div>
          <div>
            <TextField label="Mô tả"
              inputProps={{
                style: {
                  width: "755px",
                  paddingBottom: "60px"
                },
              }}
              size='medium' className='mt-3' />
          </div>
        </DialogContent>
        <DialogActions>
          <Link to={''}>
            <Button onClick={onClose} danger className="rounded-2 me-3 bg-primary" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Xác nhận</span>
            </Button>
            <Button onClick={onCloseNoAction} danger className="rounded-2 me-3" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px", backgroundColor: "#dc3333" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Hủy bỏ</span>
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function PaymentDialog(props) {

  const { open, onClose, onCloseNoAction } = props;

  return (
    <div className='rounded-pill'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {<span className='fs-4 text-dark text-uppercase'>Tiến Hành Thanh Toán</span>}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField label="Số tiền"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size='medium' className='mt-2' />
          </div>
          <div>
            <TextField label="Ghi chú"
              inputProps={{
                style: {
                  width: "755px",
                  paddingBottom: "60px"
                },
              }}
              size='medium' className='mt-3' />
          </div>
        </DialogContent>
        <DialogActions>
          <Link to={''}>
            <Button onClick={onClose} danger className="rounded-2 me-3 bg-primary" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Tiền mặt</span>
            </Button>
            <Button onClick={onClose} danger className="rounded-2 me-3 bg-success" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Chuyển khoản</span>
            </Button>
            <Button onClick={onCloseNoAction} danger className="rounded-2 me-3" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px", backgroundColor: "#dc3333" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Hủy bỏ</span>
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export function ProductsDialog(props) {

  const { open, onClose, onCloseNoAction, data, add, openProductDetails, openDialogProductDetails,
    closeDialogProductDetails, closeNoActionDialogProductDetails } = props;
  const [indexProduct, setIndexProduct] = useState();
  const StyledTableContainer = styled(TableContainer)({
    boxShadow: 'none',
  });

  const [openSelect, setOpenSelect] = useState(false);

  const addProductToCart = () => {
    add();
  }

  const StyledTableHead = styled(TableHead)`
  & tr:hover th{
    background-color: white !important;
  }
`;

  const useStyles = () => ({
  });

  const classes = useStyles();

  const TableProduct = () => {
    return (
      <>
        <div className=''>
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650, boxShadow: "none" }} aria-label="simple table" className={classes.tableContainer}>
              <StyledTableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "500" }} align="center">Ảnh</TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">Mã Sản Phẩm</TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">Tên Sản Phẩm</TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">Giá</TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">Số Lượng Tồn Kho</TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">Thao Tác</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {data && data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align='center' style={{ width: "200px" }}>
                      <img src={item.url} alt="" style={{ width: "110px", height: "110px" }} />
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "16px", width: "200px" }}>Prd_000000{index + 1}</TableCell>
                    <TableCell align="center" style={{ width: "430px", fontSize: "16px", whiteSpace: "pre-line" }}>{item.ten}</TableCell>
                    <TableCell align="center" style={{ width: "150px", fontSize: "16px" }}>
                      <span style={{ color: "#dc1111" }}>
                        {item && item.donGia ? item.donGia.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }) : ""}
                      </span>

                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "16px", width: "190px" }}>100</TableCell>
                    <TableCell align="center" style={{ width: "230px" }}>
                      <Button
                        onClick={() =>
                          handleOpenDialogProductDetails(item.id, item.donGia)
                        }
                        className="rounded-2 button-mui"
                        type="primary"
                        style={{ width: "82px", fontSize: "14px" }}
                      >
                        <span
                          className=""
                          style={{ fontWeight: "500", marginBottom: "3px" }}
                        >
                          Chọn
                        </span>
                      </Button>
                      <Button
                        className="rounded-2 ms-2 ant-btn-warning"
                        onClick={toggleDrawer("left", true)}
                        type="primary"
                        style={{ width: "82px", fontSize: "14px" }}
                      >
                        <span
                          className=""
                          style={{ fontWeight: "500", marginBottom: "3px" }}
                        >
                          Chi tiết
                        </span>
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    )
  }

  const [openSelect1, setOpenSelect1] = React.useState(false);

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleOpenDialogProductDetails = (id, price) => {
    openDialogProductDetails(id, price);
  }


  // const [idProduct, setIdProduct] = useState();
  // const [priceProduct, setPriceProduct] = useState();
  // const [openProductDetails, setOpenProductDetails] = useState();
  //
  // const handleCloseNoActionDialogProductDetails = () => {
  //   setOpenProductDetails(false);
  // }
  //
  // const handleCloseDialogProductDetails = () => {
  //   setOpenProductDetails(false);
  // }

  const [open1, setOpen1] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const [categorys, setCategorys] = useState("Tất cả");
  const handleChangeCategory = (event) => {
    const value = event.target.value;
    setCategorys(value);
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 800 }}
      role="dialog"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    </Box>
  );

  return (
    <div className='rounded-pill'>
      <Dialog className=''
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="xl"
        maxHeight="xl"
        fullWidth="xl"
        sx={{
          zIndex: 1250,
        }}
      >
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          sx={{
            zIndex: 1250,
          }}
        >
          {list("left")}
        </Drawer>
        <DialogTitle id="alert-dialog-title">
          <div className='d-flex justify-content-between mt-1'>
            <div>
              <span className='text-dark' style={{ fontSize: "22px", fontWeight: "500" }}>Tìm Kiếm Sản Phẩm</span>
            </div>
            <div>
              <Tooltip title="Đóng" TransitionComponent={Zoom}>
                <IconButton size='small' onClick={onCloseNoAction}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          <div className='mt-1 pt-1 d-flex'>
            <TextField
              label="Tìm sản phẩm"
              // onChange={handleGetValueFromInputTextField}
              // value={keyword}
              InputLabelProps={{
                sx: {
                  textTransform: "capitalize",
                },
              }}
              style={{ height: "23px" }}
              inputProps={{
                style: {
                  // height: "23px",
                  width: "250px",
                },
              }}
              size="small"
              className=""
            />
            <Button
              // onClick={handleRefreshData}
              className="rounded-2 ms-3"
              type="warning"
              style={{ height: "40px", width: "100px", fontSize: "15px", backgroundColor: "#FFB61E" }}
            >
              <span
                className="text-dark"
                style={{ fontWeight: "550", marginBottom: "2px" }}
              >
                Làm Mới
              </span>
            </Button>
            <div className='ms-4 d-flex' style={{ height: "40px", cursor: "pointer" }}>
              <div onClick={handleOpenSelect} className="mt-2">
                <span className='ms-2 ps-1' style={{ fontSize: "15px", fontWeight: "450" }}>Danh Mục: </span>
              </div>
              <FormControl sx={{
                minWidth: 50,
              }} size="small">
                <SelectMui
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: '7px'
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                    '& .MuiSelect-select': {
                      color: '#288ad6',
                      fontWeight: "500"
                    },
                  }}
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  defaultValue={14}
                // value={10}
                >
                  <MenuItem className='' sx={{ width: "200px" }} value={14}>Tất cả</MenuItem>
                  <MenuItem value={15}>Điện thoại giá rẻ</MenuItem>
                  <MenuItem value={20}>Chơi game, pin trâu</MenuItem>
                  <MenuItem value={30}>Camera nét, siêu xịn</MenuItem>
                </SelectMui>
              </FormControl>
            </div>


          </div>
          <div className='d-flex mt-3'>



          </div>
          <div className='mt-2'>
            <TableProduct />
          </div>

        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
      <ProductDetailsDialog
        open={openProductDetails}
        onCloseNoAction={closeDialogProductDetails}
        onClose={closeNoActionDialogProductDetails}
        addProduct={addProductToCart}
      />
    </div>
  );
}


export function CustomerDialog(props) {

  const { open, onClose, onCloseNoAction, data, add } = props;
  const [customerId, setCustomerId] = useState();
  const StyledTableContainer = styled(TableContainer)({
    boxShadow: 'none',
  });

  const handleSelectCustomer = (id) => {
    add(id);
  }

  const StyledTableHead = styled(TableHead)`
  & tr:hover th{
    background-color: white !important;
  }
`;

  const useStyles = () => ({
  });

  const classes = useStyles();

  const TableCusomter = () => {
    return (
      <>
        <div className=''>
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650, boxShadow: "none" }} aria-label="simple table" className={classes.tableContainer}>
              <StyledTableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "550" }} align="center">Avatar</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Mã</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Tên Khách Hàng</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Email</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Số Điện Thoại</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Thao Tác</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align='center'>
                      <div className='' style={{ marginLeft: "33px" }}>
                        <Avatar src="https://ecdn.game4v.com/g4v-content/uploads/2021/02/ava-1.png" />
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "15px" }}>{item.ma}</TableCell>
                    <TableCell align="center" style={{ width: "px", fontSize: "15px", whiteSpace: "pre-line" }}>{item.hoVaTen}</TableCell>
                    <TableCell align="center" style={{ width: "px", fontSize: "15px" }}>
                      {item.email}
                    </TableCell>
                    <TableCell align="center" style={{ width: "px", fontSize: "15px" }}>
                      {item.soDienThoai}
                    </TableCell>
                    <TableCell align="center" style={{ width: "" }}>
                      <Button
                        onClick={() => handleSelectCustomer(item.id)}
                        className="rounded-2"
                        type="primary"
                        style={{ height: "40px", width: "82px", fontSize: "14px" }}
                      >
                        <span
                          className="text-white"
                          style={{ fontWeight: "550", marginBottom: "3px" }}
                        >
                          Chọn
                        </span>
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    )
  }
  return (
    <div className='rounded-pill'>
      <Dialog className=''
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        fullWidth="lg"
        sx={{
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <div className='d-flex justify-content-between mt-1'>
            <div>
              <span className='text-dark' style={{ fontSize: "22px" }}>Tìm Kiếm Khách Hàng</span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          <div className='mt-1 d-flex'>
            <TextField
              label="Tìm khách hàng"
              // onChange={handleGetValueFromInputTextField}
              // value={keyword}
              InputLabelProps={{
                sx: {
                  marginTop: "2.5px",
                  textTransform: "capitalize",
                },
              }}
              inputProps={{
                style: {
                  height: "28px",
                  width: "500px",
                },
              }}
              size="small"
              className=""
            />
            <Button
              // onClick={handleRefreshData}
              className="rounded-2 ms-3 bg-primary"
              type="primary"
              style={{ height: "45px", width: "100px", fontSize: "15px", backgroundColor: "#FAAD14" }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "550", marginBottom: "3px" }}
              >
                Làm Mới
              </span>
            </Button>
          </div>
          <div className='mt-3'>
            <TableCusomter />
          </div>

        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function OrderHistoryDialog(props) {

  const { columns, open, onClose, dataSource } = props;

  return (
    <div className='rounded-pill'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogContent>
          <div style={{ width: "1100px", maxHeight: "400px" }}>
            <TableAntd
              className=""
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ConfirmDialog(props) {

  const { open, status, confirmPreparing, confirmOrderInfo, confirmDelivery, confirmFinish, confirmCancel, onCloseNoAction } = props;
  const [description, setDescription] = useState("");

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setDescription(value);
  }

  const handleCloseDialog = () => {
    setDescription("");
    onCloseNoAction();
  }

  const handleConfirm = () => {
    if (status === OrderStatusString.PENDING_CONFIRM) {
      confirmOrderInfo(description);
    }
    else if (status === OrderStatusString.CONFIRMED) {
      confirmPreparing(description);
    }
    else if (status === OrderStatusString.PREPARING) {
      confirmDelivery(description);
    } else if (status === OrderStatusString.DELIVERING) {
      confirmFinish(description);
    } else if (status === OrderStatusString.CANCELLED) {
      confirmCancel(description);
    }
    setDescription("");
  };
  const returnConfirmHeader = () => {
    if (status === OrderStatusString.PENDING_CONFIRM) {
      return "Xác Nhận Đơn Hàng"
    } else if (status === OrderStatusString.CONFIRMED) {
      return "Xác Nhận Đang Chuẩn Bị Hàng"
    } else if (status === OrderStatusString.PREPARING) {
      return "Xác Nhận Giao Hàng"
    } else if (status === OrderStatusString.DELIVERING) {
      return "Xác Nhận Đã Giao"
    } else if (status === OrderStatusString.CANCELLED) {
      return "Xác Nhận Hủy Đơn"
    }
  };

  return (
    <div className='rounded-pill'>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {<span className='fs-4 text-dark'>{returnConfirmHeader()}</span>}
        </DialogTitle>
        <DialogContent>
          <TextField label="Ghi chú"
            value={description}
            onChange={handleGetValueFromInputTextField}
            inputProps={{
              style: {
                width: "755px",
                paddingBottom: "90px"
              },
            }}
            size='medium' className='mt-2' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} className="rounded-2 me-2" type="primary" style={{ height: "40px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
            <span className='text-white' style={{ fontWeight: "500", marginBottom: "2px" }}>
              Xác nhận</span>
          </Button>
          <Button onClick={handleCloseDialog} className="rounded-2 me-3" type="danger" style={{ height: "40px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
            <span className='text-white' style={{ fontWeight: "500", marginBottom: "2px" }}>
              Hủy bỏ</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export const ProductDetailsDialog = (props) => {
  const { open, onClose, onCloseNoAction, addProduct } = props;

  const [productDetailsId, setProductDetailsId] = useState();
  const [productDetailsPrice, setProductDetailsPrice] = useState();
  const addProductDetailToCart = () => {
    addProduct();
  }

  return (
    <div className='rounded-pill'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        sx={{
        }}
      >
        <DialogContent >
          <div className='' style={{ width: "auto", height: "500px" }}>
            <div className='wrapper-header d-flex justify-content-between'>
              <span style={{ fontWeight: "500", fontSize: "25px" }}>
                iPhone 15 Pro Max Chính hãng VN/A
                <span className='ms-2' style={{ fontSize: "13.5px", color: "gray" }}>(PRD00000011)</span>
              </span>
              <Tooltip title="Đóng" TransitionComponent={Zoom}>
                <IconButton size='small' onClick={onCloseNoAction}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className='mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "100%", borderWidth: "1px" }}></div>
            <div className='wrapper-product d-flex'>
              <div className='product-img' style={{ width: "350px" }}>
                <img className='mt-4 pt-4' style={{ width: "370px", height: "380px" }} src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m-iphone-14-pro_2.png" alt="" />
              </div>
              <div className='product-details mt-5 ms-3 ps-1'>
                <div className="box-choose">
                  <span style={{ fontWeight: "550", fontSize: "14px" }}>
                    LỰA CHỌN CẤU HÌNH VÀ MÀU SẮC
                  </span>
                </div>
                <div className='choose1 mt-3 d-flex'>
                  <RadioGroup orientation='horizontal'
                    aria-labelledby="storage-label"
                    defaultValue="256GB"
                    size="lg"
                    sx={{ gap: 1.7 }}
                  >
                    {['256GB', '512GB', '1TB'].map((value) => (
                      <Sheet
                        key={value}
                        sx={{
                          borderRadius: 'md',
                          boxShadow: 'sm',
                        }}
                      >
                        <Radio
                          label={
                            <>
                              <div className='p-1'>
                                <div>
                                  <span className="p-2" style={{ fontSize: "14px", fontWeight: "450" }}>iPhone 15 Like New {value}</span>
                                </div>
                                <div className='text-center'>
                                  <span style={{ fontSize: "14px" }}>21.490.000 ₫</span>
                                </div>
                              </div>
                            </>
                          }
                          overlay
                          disableIcon
                          value={value}
                          slotProps={{
                            label: ({ checked }) => ({
                              sx: {
                                fontWeight: 'lg',
                                fontSize: 'md',
                                color: checked ? 'text.primary' : 'text.secondary',
                              },
                            }),
                            action: ({ checked }) => ({
                              sx: (theme) => ({
                                ...(checked && {
                                  '--variant-borderWidth': '2px',
                                  '&&': {
                                    // && to increase the specificity to win the base :hover styles
                                    borderColor: "#2f80ed",
                                  },
                                }),
                              }),
                            }),
                          }}
                        />
                      </Sheet>
                    ))}
                  </RadioGroup>
                </div>
                <div className='choose2 mt-3'>
                  <RadioGroup orientation='horizontal'
                    aria-labelledby="storage-label"
                    defaultValue="VÀNG"
                    size="lg"
                    sx={{ gap: 1.7 }}
                  >
                    {['VÀNG', 'ĐEN', 'XANH LÁ', 'HỒNG'].map((value) => (
                      <Sheet
                        key={value}
                        sx={{
                          borderRadius: 'md',
                          boxShadow: 'sm',
                        }}
                      >
                        <Radio
                          label={
                            <>
                              <div className='p-1 d-flex' style={{ width: "130px" }}>
                                <div>
                                  <img className='' style={{ width: "45px", height: "45px" }} src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m-iphone-14-pro_2.png" alt="" />
                                </div>
                                <div className='' style={{ marginTop: "10px" }}>
                                  <span className='p-2' style={{ fontSize: "14px" }}>{value}</span>
                                </div>
                              </div>
                            </>
                          }
                          overlay
                          // disabled
                          disableIcon
                          value={value}
                          slotProps={{
                            label: ({ checked }) => ({
                              sx: {
                                fontWeight: 'lg',
                                fontSize: 'md',
                                color: checked ? 'text.primary' : 'text.secondary',
                              },
                            }),
                            action: ({ checked }) => ({
                              sx: (theme) => ({
                                ...(checked && {
                                  '--variant-borderWidth': '2px',
                                  '&&': {
                                    // && to increase the specificity to win the base :hover styles
                                    borderColor: "#2f80ed",
                                  },
                                }),
                              }),
                            }),
                          }}
                        />
                      </Sheet>
                    ))}
                  </RadioGroup>
                </div>
                <div className='product-price mt-4'>
                  <span style={{ color: "#dc3333", fontSize: "23px", fontWeight: "550" }}>21.490.000 ₫</span>
                  <span className='ms-2 ps-1' style={{ textDecoration: "line-through", color: "grey", fontSize: "14.5px", fontWeight: "400" }}>29.990.000₫</span>
                </div>
                <div className='d-flex mt-3'>
                  <div class="number-input2">
                    <button
                      class="minus">
                      <div className='wrap-minus'>
                        <span>
                          <RemoveOutlinedIcon style={{ fontSize: "20px" }} />
                        </span>
                      </div>
                    </button>
                    <input value={1} min="1" max="100"
                      name="quantity" class="quantity"
                      type="number" />
                    <button class="">
                      <div className='wrap-plus'>
                        <span >
                          <AddOutlinedIcon style={{ fontSize: "20px" }} />
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className='ms-2 ps-1' style={{ marginTop: "7px" }}>
                    <span className='' style={{ fontSize: "13.5px", color: "gray" }}>1000 sản phẩm có sẵn</span>
                  </div>
                </div>
                <div className='mt-3'>
                  <button onClick={() => {
                    addProductDetailToCart();
                  }}
                    type="button" class="__add-cart1 add-to-cart trigger mt-1">
                    <span class="" style={{ fontSize: "16px" }}>
                      THÊM VÀO GIỎ HÀNG
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

