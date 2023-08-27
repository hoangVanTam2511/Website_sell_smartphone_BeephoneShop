import React, { Fragment, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Select, Table } from 'antd'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Dialog, Select as SelectMui, IconButton, Slide, Button as MuiButton, TextField, FormControl, InputLabel, MenuItem, FormHelperText, CardActionArea, CardMedia, CardContent, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Card from '../../../components/Card'
import styleCss from './style.css'
import { format } from 'date-fns'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
