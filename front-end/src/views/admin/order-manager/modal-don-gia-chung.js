import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table, Input } from "antd";
import { Box, FormControl, Table as TableMui, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, TableContainer, Paper, TableRow, TableCell, TableBody, TableHead, } from "@mui/material";
import axios from "axios";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Zoom from '@mui/material/Zoom';
import { AiOutlineClear, AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from '../../../utilities/loading';
import useCustomSnackbar from '../../../utilities/notistack';
import { Notistack } from "./enum";
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Done from '@mui/icons-material/Done';
import { Select as SelectJoy } from '@mui/joy';
import { Option as OptionJoy } from '@mui/joy';
import TextFieldSearchColors from "./text-field-search-colors";
import DeleteIcon from '@mui/icons-material/Delete';
import { FaTrashAlt } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalChonDonGiaChung = ({ update, open, close, refresh }) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [priceFormat, setPriceFormat] = useState("");
  const handleChangePrice = (event) => {
    const value = event.target.value;
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPriceFormat(valueFinal);

    // if (value == null || value == "") {
    //   setCustomerPayment(0);
    //   setCustomerPaymentFormat("");
    // }
    // else if (parseNumberPayment > 100000000000) {
    //   setCustomerPayment(0);
    //   setCustomerPaymentFormat("");
    // }
  }

  const updateData = () => {
    const parseNumber = parseFloat(priceFormat.replace(/[^0-9.-]+/g, ""));
    update(parseNumber);
  }

  useEffect(() => {
    setPriceFormat("");
  }, [refresh])

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
        }}
        maxWidth="xl"
        maxHeight="xl"
        sx={{
          marginBottom: "170px",
        }}
      >
        <DialogContent className="">
          <div style={{ width: "600px", height: "auto" }}>
            <div className="text-center mt-1" style={{}}>
              <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>CHỌN ĐƠN GIÁ CHUNG</span>
            </div>
            <div className="mx-auto mt-3" style={{ width: "100%" }}>
              <TextField fullWidth
                className="custom"
                label="Đơn giá chung"
                id="outlined-size-small"
                value={priceFormat}
                // onBlur={(e) => {
                //   updateData(e.target.value)
                // }}
                onChange={handleChangePrice}
              />
            </div>
          </div>
          <div className="mt-4 text-end">
            <Button
              onClick={() => {
                if (priceFormat.trim() !== "") {
                  updateData();
                  close();
                  handleOpenAlertVariant("Cập nhật đơn giá thành công!", Notistack.SUCCESS);
                }
                else {
                  handleOpenAlertVariant("Bạn chưa nhập đơn giá!", "warning");
                }
              }}
              className="rounded-2 button-mui"
              type="primary"
              style={{ height: "40px", width: "auto", fontSize: "15px" }}
            >
              <span
                className=""
                style={{ marginBottom: "2px", fontWeight: "500" }}
              >
                Xác Nhận
              </span>
            </Button>
          </div>

        </DialogContent>
        <div className="mt-2"></div>
      </Dialog>
    </>
  )

}
export default ModalChonDonGiaChung;
