import { Autocomplete, IconButton, InputAdornment, TextField, Tooltip, Zoom } from "@mui/material"
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const TextFieldSearchColors = ({ getColor, defaultValue }) => {
  const [color, setColor] = useState(defaultValue);

  const handleChangeColor = (event) => {
    const { value } = event.target;
    setColor(value);
  }

  useEffect(() => {
    setColor(defaultValue);
  }, [defaultValue])

  return (
    <>
      <TextField
        label="Tìm Màu Sắc"
        autoFocus
        onChange={handleChangeColor}
        onBlur={(e) => getColor(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Escape") {
            // Prevents autoselecting item while typing (default Select behaviour)
            e.stopPropagation();
          }
        }}
        value={color}
        InputLabelProps={{
          sx: {
            marginTop: "",
            textTransform: "capitalize",
          },
        }}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <Tooltip title="Thêm màu sắc" TransitionComponent={Zoom}>
                <IconButton /* onClick={() => setOpen(true)} */ size="small">
                  <AiOutlinePlus className='text-dark' />
                </IconButton>
              </Tooltip>
            </InputAdornment>
        }}
        inputProps={{
          style: {
            height: "23px",
            width: "300px",
          },
        }}
        size="small"
        className=""
      />
    </>
  )
}
export default TextFieldSearchColors;
