import Radio from '@mui/joy/Radio';
import { TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem, IconButton, Tooltip, Zoom, Input, InputAdornment, Slider } from '@mui/material'
import { Button } from 'antd'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState, memo } from 'react'
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const PrettoSlider = styled(Slider)({
  color: "#2f80ed",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 25,
    height: 25,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#2f80ed",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
const PriceSlider = ({ }) => {
  const [openSelect4, setOpenSelect4] = useState(false);
  const handleCloseSelect4 = () => {
    setOpenSelect4(false);
  };

  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [isRangePrice, setIsRangePrice] = useState(false);

  const handleOpenSelect4 = () => {
    setOpenSelect4(true);
  };
  const handleFormatValue = (value) => {
    let valueFinal;
    valueFinal = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return valueFinal;
  };
  const [valueSlider, setValueSlider] = React.useState([0, 51990000]);
  const [valueStart, setValueStart] = React.useState(
    valueSlider && handleFormatValue(valueSlider[0])
  );
  const [valueEnd, setValueEnd] = React.useState(
    valueSlider && handleFormatValue(valueSlider[1])
  );

  const handleChangeSlider = (event, newValue) => {
    setValueSlider(newValue);
    setValueStart(newValue && handleFormatValue(newValue[0]));
    setValueEnd(newValue && handleFormatValue(newValue[1]));
  };

  const handleChangeValueEnd = (event) => {
    const valueSliderFirst = valueSlider[0];
    const value = event.target.value;
    const parseValueToNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));

    let valueFinal;
    valueFinal = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueEnd(valueFinal);
    setValueSlider([valueSliderFirst, parseValueToNumber]);
    if (value === null || value === "") {
      setValueEnd("");
      setValueSlider([valueSliderFirst, 0]);
    } else if (parseValueToNumber > 51900000) {
      let valueOld = 51900000;
      valueFinal = String(valueOld)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValueEnd(valueFinal);
      setValueSlider([valueSliderFirst, valueOld]);
    }
  };
  const handleChangeValueStart = (event) => {
    const valueSliderEnd = valueSlider[1];
    const value = event.target.value;
    const parseValueToNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal;
    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueStart(valueFinal);
    setValueSlider([parseValueToNumber, valueSliderEnd]);

    if (value === null || value === "") {
      setValueStart("");
      setValueSlider([0, valueSliderEnd]);
    } else if (parseValueToNumber > 51900000) {
      let valueOld = 51900000;
      valueFinal = String(valueOld)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValueStart(valueFinal);
      setValueSlider([valueOld, valueSliderEnd]);
    }
  };
  return (
    <>
      <div
        className="d-flex"
        style={{ height: "40px", cursor: "pointer" }}
      >
        <div onClick={handleOpenSelect4} className="mt-2">
          <span
            className="ms-2 ps-1"
            style={{ fontSize: "15px", fontWeight: "450" }}
          >
            Giá:{" "}
          </span>
        </div>
        <FormControl
          sx={{
            minWidth: 50,
          }}
          size="small"
        >
          <Select
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: "7px",
                },
              },
            }}
            IconComponent={KeyboardArrowDownOutlinedIcon}
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none !important",
              },
              "& .MuiSelect-select": {
                color: "#288ad6",
                fontWeight: "500",
              },
            }}
            open={openSelect4}
            // onClose={handleCloseSelect4}
            onOpen={handleOpenSelect4}
            defaultValue={0}
            // onChange={(e) => setValue()}
            value={0}
          >
            {isRangePrice == false ? (
              <MenuItem
                className=""
                value={0}
                style={{ display: "none" }}
              >
                Chọn mức giá
              </MenuItem>
            ) : (
              <MenuItem
                className=""
                value={0}
                style={{ display: "none" }}
              >
                {fromPrice + "₫" + " - " + toPrice + "₫"}
              </MenuItem>
            )}
            <MenuItem
              className=""
              value={1}
              disableRipple
              style={{ backgroundColor: "transparent" }}
            >
              <div className="p-2" style={{ height: "140px" }}>
                <div className="d-flex justify-content-between">
                  <Input
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    onChange={handleChangeValueStart}
                    value={valueStart}
                    placeholder="Từ"
                    sx={{ width: "100px" }}
                  />
                  <Input
                    onChange={handleChangeValueEnd}
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    value={valueEnd}
                    placeholder="Đến"
                    sx={{ width: "100px" }}
                  />
                </div>
                <div>
                  <PrettoSlider
                    sx={{ width: "300px", marginTop: "15px" }}
                    value={valueSlider}
                    onChange={handleChangeSlider}
                    min={0}
                    max={51900000}
                  />
                </div>
                <div className="d-flex mt-2">
                  <Button
                    onClick={() => {
                      handleCloseSelect4();
                      setValueStart(fromPrice || valueStart);
                      setValueEnd(toPrice || valueEnd);
                    }}
                    className="rounded-2"
                    type="warning"
                    style={{
                      height: "38.8px",
                      width: "145px",
                      fontSize: "15px",
                    }}
                  >
                    <span
                      className="text-dark"
                      style={{
                        marginBottom: "3px",
                        fontSize: "13.5px",
                        fontWeight: "500",
                      }}
                    >
                      Đóng
                    </span>
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseSelect4();
                      setIsRangePrice(true);
                      setFromPrice(valueStart);
                      setToPrice(valueEnd);
                    }}
                    className="rounded-2 button-mui ms-2"
                    type="primary"
                    style={{
                      height: "38.8px",
                      width: "145px",
                      fontSize: "15px",
                    }}
                  >
                    <span
                      className="text-white"
                      style={{
                        marginBottom: "3px",
                        fontSize: "13.5px",
                        fontWeight: "500",
                      }}
                    >
                      Xem kết quả
                    </span>
                  </Button>
                </div>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  )

}
export default PriceSlider;
