import React, { useEffect, useState } from 'react'
import { TextField, FormControl, InputLabel, Select as SelectMui, OutlinedInput, MenuItem, IconButton, Tooltip, Zoom } from '@mui/material'
import style from './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button } from 'antd'
import { ProductDetailsDialog, ProductsDialog } from './AlertDialogSlide';
import data from "./data.js"
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoadingIndicator from '../../../utilities/loading.js'
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PointOfSales from './point-of-sales';

const TabItem = (props) => {
  const { delivery, productsInCarts, add, remove, openProductDetails, openDialogProductDetails, closeDialogProductDetails, closeNoActionDialogProductDetails,
    openProducts, openDialogProducts, closeDialogProducts, closeNoActionDialogProducts, getShipFee
  } = props;
  const [products, setProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [receiveDate, setReceiveDate] = useState();

  const opendDialogProductDetailsAndGetProduct = (id, price) => {
    openDialogProductDetails(id, price);
  }
  const removeProductInCart = (id) => {
    remove(id);
  }

  const addProductToCart = () => {
    add();
  }
  // const openProductsDialog = () => {
  //   openDialogProducts();
  // }

  const getAllProducts = () => {
    axios.get(`http://localhost:8080/api/products`)
      .then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("Error");
      })
  }
  const tokenGhn = "62124d79-4ffa-11ee-b1d4-92b443b7a897";

  const getShipFeeGhn = () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
      params: {
        from_district_id: shopDistrictId,
        from_ward_code: shopWardCode,
        service_id: serviceID,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
        weight: 240,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        getShipFee(response.data.data.total);
      }
    )
  }

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
  const shopDistrictId = 1482;
  const shopWardCode = 11007;

  const getReceiveDate = () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`, {
      params: {
        ShopID: shopID,
        service_id: serviceID,
        from_district_id: shopDistrictId,
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
        getDate = convertTimeToDate(getDate);
        setReceiveDate(getDate);
      }
    )
  }

  const convertTimeToDate = (receiveDate) => {
    const date = new Date(receiveDate * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  useEffect(() => {
    if (selectedProvince != "" && selectedDistrict != "" && selectedWard != "") {
      getReceiveDate();
      getShipFeeGhn();
    }
    else {
      getShipFee(0);
    }
  }, [selectedWard, selectedDistrict, selectedProvince])

  useEffect(() => {
    if (delivery == true) {
      getAllProvinceGhn();
    }
  }, [delivery]);

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

  useEffect(() => {
    if (openProducts == true) {
      getAllProducts();
    }
  }, [openProducts])


  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#2f80ed"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#2f80ed"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#d8d8d8"
      },
      "&:hover fieldset": {
        borderColor: "#d8d8d8" // use the same color as original border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2f80ed"
      }
    }
  });

  const IconTrash = () => {
    return (
      <>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="currentColor" />
        </svg>
      </>
    )
  }

  const CartEmpty = () => {
    return (
      <>
        <div className='text-center' style={{ height: "490px" }}>
          <img src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
            style={{ width: "240px" }} />
          <p className='text-dark' style={{ fontSize: "16px", fontWeight: "550" }}>Chưa có sản phẩm nào trong giỏ hàng!</p>
        </div>
      </>
    )
  }


  const ProductCart = () => {
    const StyledTableContainer = styled(TableContainer)({
      boxShadow: 'none',
    });

    const StyledTableHead = styled(TableHead)`
  & tr:hover th{
    background-color: white !important;
  }
`;

    const StyledTableBody = styled(TableBody)`
  & tr:hover td{
    background-color: white !important;
  }
`;


    const useStyles = () => ({
    });

    const classes = useStyles();

    return (
      <>
        <div className='' style={{ height: "auto" }}>
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650, boxShadow: "none" }} aria-label="simple table" className={classes.tableContainer}>
              <StyledTableHead>
                <TableRow>
                  <TableCell align="center">Sản Phẩm</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Thành tiền</TableCell>
                  <TableCell align="center">Thao Tác</TableCell>
                </TableRow>
              </StyledTableHead>
              <StyledTableBody>
                {productsInCarts.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="" style={{ width: "100px", paddingRight: "40px" }}>
                      <div className='d-flex'>
                        <Tooltip TransitionComponent={Zoom} title="Chi tiết sản phẩm" style={{ cursor: "pointer" }} placement="top">
                          <div className="product-img">
                            <img src={`https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m-iphone-14-pro_2.png`} class='' alt="" style={{ width: "115px", height: "115px" }} />
                          </div>
                        </Tooltip>
                        <div className='product ms-3'>
                          <div className='product-name'>
                            <span className='' style={{ whiteSpace: "pre-line", fontSize: "14px", fontWeight: "500" }}>{item.sanPhamChiTiet.ten}</span>
                          </div>
                          <div className='mt-2'>
                            <span className='product-price' style={{ color: "#dc3333", fontSize: "14px", fontWeight: "500" }}>
                              {item && item.sanPhamChiTiet.donGia ? item.sanPhamChiTiet.donGia.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }) : ""}
                            </span>
                          </div>
                          <div className='mt-2 pt-1 d-flex'>
                            <RadioGroup orientation='horizontal'
                              aria-labelledby="storage-label"
                              defaultValue="256GB"

                              size="lg"
                              sx={{ gap: 1.7 }}
                            >
                              {['12/256GB', 'Rose Pine'].map((value) => (
                                <Sheet
                                  key={value}
                                  sx={{
                                    borderRadius: 'md',
                                    boxShadow: 'sm',
                                  }}
                                >
                                  <Radio disabled
                                    label={
                                      <>
                                        <div>
                                          <span className="p-2" style={{ fontSize: "14px", fontWeight: "500" }}>{value}</span>
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
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='' align="center" style={{ width: "100px" }}>
                      <div class="number-input1 ">
                        <button
                          class="minus">
                          <div className='wrap-minus'>
                            <span>
                              <RemoveOutlinedIcon style={{ fontSize: "18px" }} />
                            </span>
                          </div>
                        </button>
                        <input value={1} min="1" max="100"
                          name="quantity" class="quantity"
                          type="number" />
                        <button class="">
                          <div className='wrap-plus'>
                            <span >
                              <AddOutlinedIcon style={{ fontSize: "18px" }} />
                            </span>
                          </div>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ color: "#dc3333", fontSize: "15px", width: "170px" }}>
                      <span style={{ color: "#dc3333", fontSize: "15px", fontWeight: "500" }}>
                        {item && item.sanPhamChiTiet.donGia ? item.sanPhamChiTiet.donGia.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }) : ""}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip TransitionComponent={Zoom} title="Cập nhật">
                        <Button className=''
                          icon={
                            <EditIcon />
                          }
                          // onClick={() => openDialogProductDetails()}
                          type="primary"
                          style={{ fontSize: "13px", height: "32.5px" }}
                        >
                        </Button>

                      </Tooltip>
                      <Tooltip TransitionComponent={Zoom} title="Xóa khỏi giỏ hàng">
                        <Button className='ms-2'
                          onClick={() => removeProductInCart(item.id)}
                          icon={
                            <IconTrash />
                          }
                          type="warning"
                          style={{ fontSize: "13px", height: "32.5px" }}
                        >
                        </Button>


                      </Tooltip>

                    </TableCell>
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ width: "", height: "auto" }} className='mt-2'>
        <div className={"p-2"} style={{ boxShadow: "0 0.1rem 0.3rem #00000050", marginTop: "", height: "auto" }}>
          <div className="d-flex justify-content-between mt-1">
            <div className="ms-2" style={{ marginTop: "5px" }}>
              <span className='' style={{ fontSize: "20px", fontWeight: "500" }}>Giỏ hàng</span>
            </div>
            <div className="">
              <Button
                onClick={() => openDialogProducts()}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "35px", width: "140px", fontSize: "15px" }}
              >
                <span
                  className="text-white"
                  style={{ marginBottom: "3px", fontSize: "15px", fontWeight: "500" }}
                >
                  Thêm sản phẩm
                </span>
              </Button>
            </div>
          </div>
          <div className='ms-2 ps-1 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "98.5%", borderWidth: "2px" }}></div>
          <div >
            {productsInCarts.length == 0 ? <CartEmpty /> : <ProductCart />}
            {productsInCarts.length == 1 ?
              <div className='' style={{ height: "180px" }}>
              </div>
              :
              productsInCarts.length > 1 ?
                <div className='' style={{ height: "35px" }}>
                </div>
                :
                <div className='' style={{ height: "35px" }}>
                </div>
            }
            {productsInCarts.length > 0 ?
              <div className='' style={{ height: "auto" }}>
                <div className='mt-5 pt-3 p-1'>
                  <CssTextField multiline maxRows={2.5}
                    label="Ghi chú đơn hàng"
                    sx={{ width: "755px" }}
                  />
                </div>
                <div className='mt-3'></div>
              </div> : ""
            }
          </div>
        </div>
        {delivery == true ?
          <>
            <div className='p-2' style={{ boxShadow: "0 0.1rem 0.3rem #00000050", marginTop: "24.5px" }}>
              <div className="d-flex justify-content-between mt-1">
                <div className="ms-2" style={{ marginTop: "5px" }}>
                  <span className='' style={{ fontSize: "20px", fontWeight: "500" }}>Địa Chỉ Giao Hàng</span>
                </div>
                <div className="">
                  <Button
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "35px", width: "130px", fontSize: "15px" }}
                  >
                    <span
                      className="text-white"
                      style={{ marginBottom: "3px", fontSize: "15px", fontWeight: "500" }}
                    >
                      Chọn Địa Chỉ
                    </span>
                  </Button>
                </div>
              </div>
              <div className='ms-2 ps-1 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "98.5%", borderWidth: "2px" }}></div>
              <div className='mt-3 ms-2'>
                <div className='mt-4'>
                  {delivery ?
                    <div style={{ width: "99.5%" }} className="">
                      <div>
                        <TextField label="Tên người nhận"
                          // value={receiveName}
                          // onChange={handleChangeReceiveName}
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
                            label="Quận / Huyện"
                            input={<OutlinedInput label="Quận / Huyện" />}
                            value={selectedDistrict}
                            onChange={handleChangeDistrict}
                          >
                            {districts && districts
                              .map((district) => (
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
                            {wards && wards.map((ward) => (
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
                      <TextField
                        multiline
                        rows={1.5}
                        rowsMax={5}
                        label={<span>Ghi chú cho shipper </span>}
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
                      <div className='mt-4 pt-2 ms-2 ps-1 d-flex' style={{ height: "45px" }}>
                        {selectedProvince != "" && selectedDistrict != "" && selectedWard != "" ?
                          <>
                            <img src="https://www.svgrepo.com/show/259747/delivery-truck-deliver.svg" style={{ width: "50px", height: "40px" }} />
                            <div className='mt-1 pt-1'>
                              <span className='ms-2' style={{ fontSize: "19px", fontWeight: "500", color: "" }}>
                                Thời gian giao hàng dự kiến: {receiveDate}</span>
                              <span className='ms-2' style={{ fontSize: "19px", fontWeight: "500", color: "#38b000" }}>(Giao Hàng Nhanh)</span>
                            </div>
                          </> : ""
                        }
                      </div>
                      <div className='mt-4 pt-1'>
                      </div>
                    </div>

                    :
                    <div className='mt-1 mx-auto'>
                      <span style={{ fontSize: "18px" }}>Không có dữ liệu!</span>
                    </div>
                  }
                  <div className='mt-3'></div>
                </div>
              </div>
              <div className='mt-3'></div>
            </div>
            <div style={{ marginTop: "24.5px" }}></div>
          </> : ""
        }
        <div className='mt-3'></div>
      </div>
      <ProductsDialog
        open={openProducts}
        onClose={closeDialogProducts}
        onCloseNoAction={closeNoActionDialogProducts}
        data={products}
        add={addProductToCart}
        openProductDetails={openProductDetails}
        openDialogProductDetails={opendDialogProductDetailsAndGetProduct}
        closeDialogProductDetails={closeDialogProductDetails}
        closeNoActionDialogProductDetails={closeNoActionDialogProductDetails}

      />
      <ProductDetailsDialog
      // open={openProductDetails}
      // onCloseNoAction={closeNoActionDialogProductDetails}
      // onClose={closeDialogProductDetails}
      // addProduct={addProductToCart}
      />

    </>
  )
}
export default TabItem;
