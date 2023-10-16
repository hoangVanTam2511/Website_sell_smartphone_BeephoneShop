import React, { useEffect, useState, memo } from 'react'
import { TextField, FormControl, InputLabel, Select as SelectMui, OutlinedInput, MenuItem, IconButton, Tooltip, Zoom } from '@mui/material'
import style from './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Table as TableAntd } from 'antd'
import { ProductDetailsDialog, ProductsDialog } from './AlertDialogSlide';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import EditIcon from '@mui/icons-material/Edit';
import { parseInt } from 'lodash';
import { Notistack } from './enum';
import useCustomSnackbar from '../../../utilities/notistack';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingIndicator from '../../../utilities/loading';
import InputNumberAmountCart from './input-number-amount-cart';
import { TextFieldAddress, TextFieldName, TextFieldPhone } from './text-field-info-ship';

const TabItem = ({
  getCustomer, idCustomer, update, getAmount, isOpen, delivery, cartItems, add, remove, openProductDetails, openDialogProductDetails, closeDialogProductDetails, closeNoActionDialogProductDetails,
  openProducts, openDialogProducts, closeDialogProducts, getShipFee
}) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [loadingChild, setLoadingChild] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [receiveDate, setReceiveDate] = useState();
  const [customer, setCustomer] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerDistrict, setCustomerDistrict] = useState("");
  const [customerWard, setCustomerWard] = useState("");

  useEffect(() => {
    if (idCustomer === "") {
      setCustomer(null);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");

      getAllProvinceGhn();
      setSelectedWard("");
      setSelectedProvince("");
      setSelectedDistrict("");
      setDistricts([]);
      setWards([]);
    }
    else {
      getCustomerById();
    }
  }, [idCustomer])

  useEffect(() => {
    const customer = {
      hoVaTen: customerName,
      soDienThoai: customerPhone,
      diaChi: customerAddress,
    }
    getCustomer(customer);

  }, [customerAddress, customerName, customerPhone])

  const getPhone = (phone) => {
    setCustomerPhone(phone);
  }
  const getName = (name) => {
    setCustomerName(name);
  }
  const getAddress = (address) => {
    setCustomerAddress(address);
  }

  const getCustomerById = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/khach-hang/hien-thi-theo/${idCustomer}`)
      .then(async (response) => {
        const data = response.data;
        setCustomer(data);
        setCustomerName(data.hoVaTen);
        setCustomerPhone(data.soDienThoai);
        setCustomerAddress(data.diaChi);
        setCustomerEmail(data.email);

        const listAddress = data && data.diaChiList;
        const address = listAddress.find((a) => a.trangThai === 1);

        const province = provinces.find((item) => item.ProvinceName === address.tinhThanhPho);
        setSelectedProvince(province.ProvinceID);

        const district = districts.find((item) => item.DistrictName === address.quanHuyen);
        setSelectedDistrict(district.DistrictID);

        await getAllWardGhnByIdDistrict(district.DistrictID, true, address.xaPhuong);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllDistrictGhnByIdProvince(selectedProvince);
  }, [selectedProvince])

  const openDialogProductItems = () => {
    openDialogProductDetails();
  }
  const removeProductInCart = (id) => {
    remove(id);
  }

  const addProductToCart = (priceProduct, idProduct, amount) => {
    add(priceProduct, idProduct, amount);
  }

  const updateAmount = (id, amount) => {
    update(id, amount);
    console.log(cartItems)
  }

  const closeProductsDialog = () => {
    closeDialogProducts();
    setProducts([]);
  }

  const openProductsDialog = () => {
    getAllProducts();
    openDialogProducts();
  }

  const getAllProducts = async () => {
    await axios.get(`http://localhost:8080/api/products`)
      .then(response => {
        setProducts(response.data.data);
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

  const getAllWardGhnByIdDistrict = async (districtId, selectWard, district) => {
    await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
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
        if (selectWard) {
          const ward = response.data.data.find((item) => item.WardName === district);
          setSelectedWard(ward.WardCode);
          console.log(ward);
        }
      }
    )
  }

  const getAllDistrictGhnByIdProvince = async (provinceId) => {
    await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
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

  const cartItemsSort = cartItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
    if (selectedProvince != "" && selectedDistrict != "" && selectedWard != "" && delivery === true) {
      getReceiveDate();
      getShipFeeGhn();
    }
    else {
      getShipFee(0);
    }
  }, [selectedWard, selectedDistrict, selectedProvince, delivery])

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
    alert(value);
  };

  const handleChangeDistrict = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    getAllWardGhnByIdDistrict(value);
    setSelectedWard("");
  };

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
        <div className='text-center' style={{ height: "524px" }}>
          <img src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
            style={{ width: "240px" }} />
          <p className='text-dark' style={{ fontSize: "16px", fontWeight: "550" }}>Chưa có sản phẩm nào trong giỏ hàng!</p>
        </div>
      </>
    )
  }

  const total = (donGia, soLuong) => {
    const result = donGia * soLuong;
    return result;

  }

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

  const columns = [
    {
      title: "Sản phẩm",
      width: "40%",
      align: "center",
      render: (text, item) => (

        <div className='d-flex'>
          <Tooltip TransitionComponent={Zoom} title="Chi tiết sản phẩm" style={{ cursor: "pointer" }} placement="top">
            <div className="product-img">
              <img src={item && item.sanPhamChiTiet && item.sanPhamChiTiet.images && item.sanPhamChiTiet.images[0].duongDan} class='' alt="" style={{ width: "115px", height: "115px" }} />
            </div>
          </Tooltip>
          <div className='product ms-3 text-start'>
            <div classNamountme='product-name'>
              <span className='' style={{ whiteSpace: "pre-line", fontSize: "15px", fontWeight: "500" }}>{item.sanPhamChiTiet.sanPham.tenSanPham + "\u00A0" + item.sanPhamChiTiet.cauHinh.ram.kichThuoc + "/" + item.sanPhamChiTiet.cauHinh.rom.kichThuoc + "GB" + " " + `(${item.sanPhamChiTiet.cauHinh.mauSac.tenMauSac})`}</span>
            </div>
            <div className=''>
              <span className='product-price txt-price' style={{ fontSize: "16px", fontWeight: "500" }}>
                {item && item.sanPhamChiTiet.donGia ? item.sanPhamChiTiet.donGia.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }) : ""}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      align: "center",
      dataIndex: "soLuong",
      width: "1%",
      render: (text, item) =>
        <InputNumberAmountCart id={item.id} amountCurrent={item.soLuong} update={updateAmount} />,
    },
    {
      title: "Thành tiền",
      align: "center",
      dataIndex: "donGia",
      width: "20%",
      render: (text, item) =>
        <span style={{ fontSize: "17.5px", fontWeight: "500" }} className="txt-price">
          {
            item && total(item.donGia, item.soLuong).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "actions",
      width: "10%",
      render: (text, item) =>
        <div>
          <Tooltip TransitionComponent={Zoom} title="Cập nhật">
            <Button className=''
              icon={
                <EditIcon />
              }
              onClick={() => openDialogProductDetails()}
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
              type="danger"
              style={{ fontSize: "13px", height: "32.5px" }}
            >
            </Button>
          </Tooltip>
        </div>
    },
  ];

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
                onClick={() => openProductsDialog()}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "38px", width: "140px", fontSize: "15px" }}
              >
                <span
                  className="text-white"
                  style={{ marginBottom: "2px", fontSize: "15px", fontWeight: "500" }}
                >
                  Thêm sản phẩm
                </span>
              </Button>
            </div>
          </div>
          <div className='ms-2 ps-1 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "98.5%", borderWidth: "2px" }}></div>
          <div >
            {cartItemsSort && cartItemsSort.length === 0 ? <CartEmpty /> :
              <TableAntd
                className='table-cart'
                columns={columns}
                dataSource={cartItemsSort}
                pagination={false}
                rowKey={"id"}
                key={"id"}
              />}
            {cartItems && cartItems.length == 1 ?
              <div className='' style={{ height: "320.5px" }}>
              </div>
              :
              cartItems && cartItems.length === 2 ?
                <div className='' style={{ height: "173px" }}>
                </div>
                : cartItems && cartItems.length > 2 ?
                  <div className='' style={{ height: "25px" }}>
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
                    onClick={() => alert(customer)}
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
                        <TextFieldName nameDefault={customerName} getName={getName} />
                      </div>
                      <div>
                        <TextFieldPhone phoneDefault={customerPhone} getPhone={getPhone} />
                      </div>
                      <div className='d-flex mt-3'>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel >Tỉnh / Thành Phố</InputLabel>
                          <SelectMui
                            onChange={handleChangeProvince}
                            input={<OutlinedInput label="Tỉnh / Thành Phố" />}
                            value={selectedProvince}
                          >
                            {provinces && provinces.map((province) => (
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
                        <TextFieldAddress addressDefault={customerAddress} getAddress={getAddress} />
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
                      <div className='mt-4 pt-2 ms-2 ps-1' style={{ height: "45px" }}>
                        {selectedProvince != "" && selectedDistrict != "" && selectedWard != "" ?
                          <>
                            <div className="d-flex">
                              <img src="https://www.svgrepo.com/show/236705/delivery-truck-truck.svg" style={{ width: "50px", height: "40px" }} />
                              <div className='mt-2 pt-1'>
                                <span className='ms-2' style={{ fontSize: "19px", fontWeight: "500", color: "" }}>
                                  Thời gian giao hàng dự kiến: {receiveDate}</span>
                              </div>
                              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png" style={{ width: "180px", height: "55px" }} className="ms-3" />
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
          </> : null
        }
        <div className='mt-3'></div>
      </div>
      <ProductsDialog
        getAmount={getAmount}
        isOpen={isOpen}
        open={openProducts}
        onClose={closeProductsDialog}
        data={products}
        add={addProductToCart}
        openProductDetails={openProductDetails}
        openDialogProductItems={openDialogProductItems}
        closeDialogProductDetails={closeDialogProductDetails}
        closeNoActionDialogProductDetails={closeNoActionDialogProductDetails}
      />
      <ProductDetailsDialog
      // open={openProductDetails}
      // onCloseNoAction={closeNoActionDialogProductDetails}
      // onClose={closeDialogProductDetails}
      // addProduct={addProductToCart}
      />

      {isLoading && <LoadingIndicator />}
    </>
  )
};
export default memo(TabItem);
