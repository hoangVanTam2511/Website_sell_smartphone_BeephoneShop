import { Autocomplete, IconButton, InputAdornment, TextField, Tooltip, Zoom } from "@mui/material"
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const TextFieldPrice = React.memo(({ update, ma, value, confirm }) => {
  const [priceFormat, setPriceFormat] = useState(String(value)
    .replace(/[^0-9]+/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );

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

  const updateData = (value) => {
    const parseNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    update(parseNumber, ma);
  }

  return (
    <>
      <TextField
        label="Đơn giá"
        id="outlined-size-small"
        size="small"
        value={priceFormat}
        onBlur={(e) => {
          updateData(e.target.value, ma)
        }}
        onChange={handleChangePrice}
        // helperText={confirm && priceFormat.trim() === "" ? "Bạn chưa nhập đơn giá" : ""}
        // error={confirm && priceFormat.trim() === ""}
      />
    </>
  )
})
export default TextFieldPrice;
