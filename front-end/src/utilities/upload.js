import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, ImageListItemBar, FormHelperText, } from "@mui/material";
import Zoom from '@mui/material/Zoom';
// import LoadingIndicator from '../../../utilities/loading';
// import useCustomSnackbar from '../../../utilities/notistack';
// import { Notistack } from "./enum";
import { Box as BoxJoy } from '@mui/joy';
import Alert from "@mui/joy/Alert";
import { Button as ButtonJoy } from '@mui/joy';
import { Card as CardJoy } from '@mui/joy';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Checkbox as CheckboxJoy } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import { FaUpload } from "react-icons/fa6";
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import { ButtonGroup as ButtonGroupJoy } from '@mui/joy';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Done from '@mui/icons-material/Done';
import { Select as SelectJoy } from '@mui/joy';
import { Option as OptionJoy } from '@mui/joy';
import { Col, Row } from "react-bootstrap";
import generateRandomCode from "./genCode";
import useCustomSnackbar from "./notistack";

function PreviewMultipleImages({ uniqueColors, getColorImage, confirm, getValidImage, deleteImg }) {
  const inputRef = useRef(null);
  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [colorImages, setColorImages] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);

  const handleMultipleImages = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const updatedImages = selectedFilesArray.map((file) => ({
      id: generateRandomCode(), file: file,
    }));

    setImages((prevImages) => [...prevImages, ...updatedImages]);

    const selectedURLs = selectedFilesArray.map((file) => ({
      id: generateRandomCode(), url: URL.createObjectURL(file),
      file: file,
    }));

    const updatedURLs = [...imageURLs, ...selectedURLs];
    setImageURLs(updatedURLs);
    event.target.value = null;

    getValidImage((updatedURLs.length !== colorImages.length || colorImages.some((item) => item === " " || !item) === true) ? false : true);
  };

  const handleColorImageChange = (index, value, url, file) => {
    const prevColor = colorImages[index];
    console.log(prevColor);
    const updatedColorImages = [...colorImages];
    updatedColorImages[index] = value;
    setColorImages(updatedColorImages);
    getColorImage(value, url, file, prevColor);

    getValidImage((imageURLs.length !== updatedColorImages.length || updatedColorImages.some((item) => item === " " || !item) === true) ? false : true);
  };

  const handleDeleteImage = (index, id) => {
    const removeImg = images.filter((item) => item.id !== id);
    setImages(removeImg);

    const removeImgURL = imageURLs.filter((item) => item.id !== id);
    setImageURLs(removeImgURL);

    const findColorImage = colorImages[index];
    deleteImg(findColorImage);

    setColorImages((prevColorImages) => {
      const updatedColorImages = prevColorImages.filter((colorImage, colorIndex) => {
        return colorIndex !== index; // Chỉ giữ lại các đối tượng color không trùng index với đối tượng imageURL bị xóa
      });
      return updatedColorImages;
    });


    const updatedColorImages = colorImages.filter((colorImage, colorIndex) => {
      return colorIndex !== index; // Chỉ giữ lại các đối tượng color không trùng index với đối tượng imageURL bị xóa
    });
    getValidImage((removeImgURL.length !== updatedColorImages.length || updatedColorImages.some((item) => item === " " || !item) === true) ? false : true);

  };

  useEffect(() => {
    if (uniqueColors.length === 0) {
      const updatedColorImages = colorImages.map((colorImage) => {
        return " ";
      });
      setColorImages(updatedColorImages);
    }
    else if (uniqueColors.length > 0) {
      const updatedColorImages = colorImages.map((colorImage) => {
        if (uniqueColors.find((item) => item.color.id === colorImage)) {
          return colorImage;
        } else {
          return " ";
        }
      });
      console.log(updatedColorImages);
      console.log(updatedColorImages.some((item) => item === " " || !item));
      setColorImages(updatedColorImages);
      getValidImage((imageURLs.length !== updatedColorImages.length || updatedColorImages.some((item) => item === " " || !item) === true) ? false : true);
      console.log((imageURLs.length !== updatedColorImages.length || updatedColorImages.some((item) => item === " " || !item) === true) ? false : true)
      // setSelectedKey((key) => [...key,]);
    }
  }, [uniqueColors]);

  // const keys = colorImages.map((c) => c + generateRandomId());
  // const generateRandomId = () => {
  //   const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   let id = '';
  //
  //   for (let i = 0; i < 10; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     id += characters[randomIndex];
  //   }
  //
  //   return id;
  // };
  //
  return (
    <>
      <div className="card-product-img">
        {imageURLs.length > 0 &&
          <CardJoy orientation={'vertical'}
            variant="outlined"
            color={confirm === true && (colorImages.some((item) => item === " " || !item) === true || colorImages.length === 0
              || imageURLs.length !== colorImages.length) === true ? "danger" : "neutral"}
            sx={{ width: '100%', maxWidth: '100%', marginTop: "20px" }}
          >
            {confirm === true && (colorImages.some((item) => item === " " || !item) === true || colorImages.length === 0
              || imageURLs.length !== colorImages.length) ?
              <>
                <BoxJoy>
                  <Alert color="danger" variant="soft">
                    Bạn chưa chọn màu sắc cho ảnh!
                  </Alert>
                </BoxJoy>
              </>
              : null
            }
            {confirm === true && (colorImages.some((item) => item === " " || !item) === true || colorImages.length === 0
              || imageURLs.length !== colorImages.length) ?
              <Divider sx={{ backgroundColor: 'gray', height: "1.5px" }} />
              : null
            }
            <BoxJoy sx={{ display: 'contents' }}>
              <div className="" style={{
              }}>
                <Row>
                  {imageURLs.map((item, index) => (
                    <>
                      <Col sm="3" className="mt-2">
                        <CardJoy color={confirm === true && (!colorImages[index] || colorImages[index] === " ") ? "danger" : "neutral"}
                          sx={{
                            width: 245,
                            boxShadow: 'lg',
                          }}
                        >
                          <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                            <div className="text-center" style={{ position: "relative" }}>
                              <img style={{ width: "189px", height: "189px" }}
                                src={item.url}
                                loading="lazy"
                              />
                              <div className="remove-product-img" style={{ position: "absolute", bottom: "173px", left: "180px" }}>
                                <Tooltip title="Xóa" TransitionComponent={Zoom}>
                                  <IconButton size="small"
                                    onClick={() => {
                                      handleDeleteImage(index, item.id);
                                    }}
                                    className="">
                                    <FaTrashAlt color="#e5383b" fontSize={"15px"} />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                          </CardContent>
                          <CardOverflow sx={{ bgcolor: 'background.level0' }}>
                            <CardActions buttonFlex="1">
                              <FormControl size="small" error={confirm === true && (!colorImages[index] || colorImages[index] === " ")}>
                                <InputLabel id="demo-select-small-label">Màu Sắc</InputLabel>
                                <Select className="custom"
                                  key={colorImages[index] + item.id}
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={colorImages[index]}
                                  label="Màu Sắc"
                                  onChange={(e) => handleColorImageChange(index, e.target.value, item.url, item.file)}
                                  defaultValue={" "}
                                >
                                  <MenuItem value={" "}>Chọn màu sắc</MenuItem>
                                  {uniqueColors.map((c) => {
                                    return (
                                      <MenuItem key={c.id} value={c.color.id}
                                        disabled={colorImages[index] !== c.color.id && colorImages.includes(c.color.id)}
                                      >
                                        {c.color.tenMauSac}
                                      </MenuItem>
                                    )
                                  })}
                                </Select>
                              </FormControl>
                            </CardActions>
                          </CardOverflow>
                        </CardJoy>
                      </Col>
                    </>
                  ))}
                </Row>
              </div>
            </BoxJoy>
          </CardJoy>
        }
      </div>
      <div className="mt-4 text-center">
        <Button
          onClick={() => handleUploadClick()}
          className="rounded-2 button-mui"
          type="primary"
          style={{ height: "40px", width: "auto", fontSize: "15px" }}
        >
          <span
            className=""
            style={{ marginBottom: "2px", fontWeight: "500" }}
          >
            UPLOAD ẢNH
            <input style={{ display: "none" }} ref={inputRef} type="file" accept="image/*" onChange={handleMultipleImages} multiple />
          </span>
        </Button>
      </div>  
    </>
  )
}
export default PreviewMultipleImages;
