import React, { Fragment, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Select, Table as TableAntd } from 'antd'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Dialog, Select as SelectMui, IconButton, Slide, Button as MuiButton, TextField, FormControl, InputLabel, MenuItem, FormHelperText, CardActionArea, CardMedia, CardContent, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Card from '../../../components/Card'
import styleCss from './style.css'
import { format } from 'date-fns'
import { styled } from '@mui/system';
import { CloseCircleFilled } from '@ant-design/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function OrderPendingConfirmCloseDialog(props) {

  const { open, onClose, ma, deleteOrder } = props;

  return (
    <div className='rounded-pill'>
      <Dialog
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        sx={{
          height: "300px",
          marginTop: "100px",
          "& .MuiPaper-root": {
            borderRadius: "15px", // Giá trị border radius tùy chỉnh
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
              Thông tin của <span className='fw-bold'> Đơn hàng {ma}</span> sẽ không được lưu lại. Bạn có chắc chắn muốn đóng
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteOrder} danger className="rounded-2 me-2 bg-primary" type="primary" style={{ height: "40px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Xác nhận</span>
            </Button>
            <Button onClick={onClose} danger className="rounded-2 me-3" type="primary" style={{ height: "40px", width: "auto", fontSize: "16px", marginBottom: "20px", backgroundColor: "#dc3333" }}>
              <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
                Hủy bỏ</span>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
export function ShipFeeInput(props) {

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
    <>
      <div>
        <TextField label="Tên người nhận"
          inputProps={{
            style: {
              width: "720px",
            },
          }}
          size='medium' className='mt-1' />
      </div>
      <div>
        <TextField label="Số điện thoại"
          inputProps={{
            style: {
              width: "720px",
            },
          }}
          size='medium' className='mt-3' />
      </div>
      <div className='d-flex mt-3'>
        <FormControl sx={{ width: 245 }}>
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
        <FormControl sx={{ width: 245 }} className='ms-3'>
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
        <FormControl sx={{ width: 235 }} className='ms-3'>
          <InputLabel id="demo-multiple-name-label">Phường / Xã</InputLabel>
          <SelectMui
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            onChange={handleChange}
            input={<OutlinedInput label="Phường / Xã" />}
            MenuProps={MenuProps}
            sx={{ width: "230px" }}
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
              width: "720px",
            },
          }}
          size='medium' className='mt-3' />
      </div>
      <TextField label={<span>Ghi chú cho shipper </span>}
        // value={description}
        // onChange={handleGetValueFromInputTextField}
        inputProps={{
          style: {
            width: "720px",
            paddingBottom: "25px"
          },
        }}
        size='medium' className='mt-3' />
      <div className='mt-5 pt-5'></div>
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

  const { open, onClose, onCloseNoAction, data, add } = props;
  const [indexProduct, setIndexProduct] = useState();
  const StyledTableContainer = styled(TableContainer)({
    boxShadow: 'none',
  });

  const addProductToCart = (productId, productPrice) => {
    add(productId, productPrice);
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
                  <TableCell style={{ fontWeight: "550" }} align="center">Ảnh</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Mã Sản Phẩm</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Tên Sản Phẩm</TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">Giá</TableCell>
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
                      <img src={item.url} alt="" style={{ width: "150px", height: "150px" }} />
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "16px" }}>Prd_000000{index + 1}</TableCell>
                    <TableCell align="center" style={{ width: "470px", fontSize: "16px", whiteSpace: "pre-line" }}>{item.ten}</TableCell>
                    <TableCell align="center" style={{ width: "150px", fontSize: "16px" }}>
                      <span style={{ color: "#dc1111" }}>
                        {item && item.donGia ? item.donGia.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }) : ""}
                      </span>

                    </TableCell>
                    <TableCell align="center" style={{ width: "150px" }}>
                      <Button
                        onClick={() => addProductToCart(item.id, item.donGia)}
                        className="rounded-3 bg-primary"
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
              <span className='text-dark' style={{ fontSize: "22px" }}>Tìm Kiếm Sản Phẩm</span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          <div className='mt-1 d-flex'>
            <TextField
              label="Tìm sản phẩm"
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
          <div className='mt-5'>
            <TableProduct />
          </div>



        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
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
                        className="rounded-3 bg-primary"
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
            <Table
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

  const { open, status, confirmOrderInfo, confirmDelivery, confirmFinish, confirmCancel, onCloseNoAction } = props;
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
    if (status === 0) {
      confirmOrderInfo(description);
    } else if (status === 1) {
      confirmDelivery(description);
    } else if (status === 2) {
      confirmFinish(description);
    } else if (status === 4) {
      confirmCancel(description);
    }
    setDescription("");
  };
  const returnConfirmHeader = () => {
    if (status === 0) {
      return "Xác Nhận Đơn Hàng"
    } else if (status === 1) {
      return "Xác Nhận Giao Hàng"
    } else if (status === 2) {
      return "Xác Nhận Hoàn Thành"
    } else if (status === 4) {
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
          <Button onClick={handleConfirm} danger className="rounded-2 me-3 bg-primary" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px" }}>
            <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
              Xác nhận</span>
          </Button>
          <Button onClick={handleCloseDialog} danger className="rounded-2 me-3" type="primary" style={{ height: "50px", width: "auto", fontSize: "16px", marginBottom: "20px", backgroundColor: "#dc3333" }}>
            <span className='text-white' style={{ fontWeight: "550", marginBottom: "2px" }}>
              Hủy bỏ</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
