import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import PaymentIcon from '@mui/icons-material/Payment';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FormHelperText, Slide, Tooltip } from '@mui/material';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Badge from '@mui/material/Badge';
import Zoom from '@mui/material/Zoom';

import { IoPersonCircle } from "react-icons/io5";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from 'antd'
import { FormControl, Input, Backdrop, InputLabel, Select as SelectMui, OutlinedInput, MenuItem, Checkbox, FormControlLabel, InputAdornment, IconButton } from '@mui/material'
import TextField from '@mui/material/TextField';
import style from './style.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CustomerDialog, OrderPendingConfirmCloseDialog, ProductsDialog, ShipFeeInput } from './AlertDialogSlide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { isNaN, map, parseInt, debounce } from 'lodash';
import { AutoComplete, InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { Loading3QuartersOutlined } from "@ant-design/icons";
import TabItem from './tab-item';
import LoadingIndicator from '../../../utilities/loading';

const PointOfSales = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [selectDiscount, setSelectDiscount] = useState('VND');
  const [delivery, setDelivery] = React.useState(false);
  const [paymentWhenReceive, setPaymentWhenReceive] = useState(false);
  // const [discountNumber, setDiscountNumber] = useState(0);
  // const [discountInput, setDiscountInput] = useState("");
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountFormat, setDiscountFormat] = useState('');

  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  const [payment, setPayment] = useState(1);
  const [surplusMoney, setSurplusMoney] = useState();
  const [customerPayment, setCustomerPayment] = useState(0);
  const [customerPaymentFormat, setCustomerPaymentFormat] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [customerNeedPay, setCustomerNeedPay] = useState(null);
  const [customerNeedPayFormat, setCustomerNeedPayFormat] = useState(0);
  const [isNotPayment, setIsNotPayment] = useState(false);

  const [order, setOrder] = useState({});
  const [cartId, setCartId] = useState("");
  const [orders, setOrders] = useState([]);


  const updateOrder = async (status, totalMoney, orderHistory, hasPlaceOrder, paymentMethod) => {
    setIsLoading(false);
    const orderDto = {
      id: order.id,
      ma: order.ma,
      createdAt: order.createdAt,
      // tenNguoiNhan: "",
      // soDienThoaiNguoiNhan: "",
      // ghiChu: description == null ? order.ghiChu : description,
      trangThai: status == null ? order.trangThai : status,
      loaiHoaDon: delivery == true ? 1 : 0,
      tongTien: totalMoney,
      khachCanTra: totalMoney,
      gioHang: order.gioHang,
    }
    const updateData = {
      orderStatus: null,
      orderHistory: orderHistory,
      orderDto: orderDto,
      isDelivery: delivery,
      paymentMethod: paymentMethod,
    };
    try {
      await axios.put(`http://localhost:8080/api/orders/${order.ma}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          isPending: true,
          hasPlaceOrder: hasPlaceOrder,
        }
      }).then(response => {
        setOrder(response.data);
        setIsLoading(false);
        navigate(`/dashboard/order-detail/${order.ma}`);
      });
    } catch (error) { }
  };

  const [validate, setValidate] = useState("");
  const processingOrder = () => {
    if (productsInCart && productsInCart.length == 0 && open1 == false) {
      handleOpen1();
      setValidate("Giỏ hàng đang trống!")
      setIsValidate(false);
    }
    else if (productsInCart && productsInCart.length > 0) {
      const totalMoney = handleCountTotalMoney();
      const status = delivery == true ? 0 : 3;
      const hasPlaceOrder = true;
      const orderHistoryCounter = {
        thaoTac: "Đã Thanh Toán",
        loaiThaoTac: 3,
        moTa: "Khách hàng đã thanh toán",
        createdAt: new Date(),
      }
      const paymentMethod = {
        loaiThanhToan: 0,
        hinhThucThanhToan: payment,
        soTienThanhToan: totalMoney,
        trangThai: 1,
        nguoiXacNhan: "Admin",
        createdAt: new Date(),
      }
      updateOrder(status, totalMoney, delivery == true ? null : orderHistoryCounter, hasPlaceOrder, paymentMethod);
      // const message = delivery == false ? "Thanh toán thành công" : "Đặt hàng thành công";
      // setTimeout(() => {
      //   navigate(`/dashboard/order-detail/${order.ma}`, {
      //     state: {
      //       data: {
      //         message: message,
      //       }
      //     }
      //   });
      //   setOpen1(false);
      // }, 500);
    }
  }

  const handleUpdateDescriptionOrder = (event) => {
    const value = event.target.value;
    setDescription(value);
    updateOrder(null, null, null);
  }

  const getAllOrdersPending = () => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          isPending: true,
          pageSize: 20,
          sort: "New",
        }
      })
      .then((response) => {
        setOrders(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const getCartDetails = (cartId) => {
    axios
      .get(`http://localhost:8080/api/carts/${cartId}`)
      .then((response) => {
        setProductsInCart(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getOrderPendingLastRemove = () => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          isPending: true,
          pageSize: 20,
          sort: "New",
        }
      })
      .then((response) => {
        setOrders(response.data.content);
        const dataOrder = response.data.content;
        const lastItem = dataOrder[dataOrder.length - 1];
        setOrder(lastItem);
        setCartId(lastItem.gioHang.id);
        getCartDetails(lastItem.gioHang.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const getOrderPendingDefault = () => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          isPending: true,
          pageSize: 20,
          sort: "New",
        }
      })
      .then((response) => {
        setOrder(response.data.content[0]);
        setCartId(response.data.content[0].gioHang.id)
        getCartDetails(response.data.content[0].gioHang.id);
        let total = 0;
        response.data.content[0].gioHang && response.data.content[0].gioHang.cartDetails.map((item, index) => {
          total += item.donGia;
        })
        setSurplusMoney(customerPayment - total);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleAddOrderPending = () => {
    axios
      .post(`http://localhost:8080/api/orders?isPending=true`)
      .then(response => {
        setValueTabs(orders.length + 1);
        getAllOrdersPending();
        setOrder(response.data);
        setCartId(response.data.gioHang.id);
        setProductsInCart([]);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleDeleteCartDetailsById = async (id) => {
    setIsLoading(false);
    try {
      await axios.delete(`http://localhost:8080/api/carts/${id}`);
      getCartDetails(cartId);
      getAllOrdersPending();
      getOrderById(order.ma);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrderPendingById = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      setValueTabs(orders.length - 1);
      getOrderPendingLastRemove();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmBeforeDeleteOrderPendingHasProduct = (size, id) => {
    if (size == 0) {
      handleDeleteOrderPendingById(id);
    }
    else {
      handleOpenDialogOrderClose(true);
    }
  }

  const getOrderById = (id) => {
    // setIsLoading(false);
    axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
        setCartId(response.data.gioHang.id);
        getCartDetails(response.data.gioHang.id);
        let total = 0;
        response.data.gioHang && response.data.gioHang.cartDetails.map((item, index) => {
          total += item.donGia;
        })
        setSurplusMoney(customerPayment - total);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getCustomerById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/khach-hang/hien-thi-theo/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAllCustomers = () => {
    axios.get(`http://localhost:8080/khach-hang/hien-thi`)
      // axios.get(`http://localhost:8080/api/customers`)
      .then(response => {
        setCustomers(response.data.content);
      }).catch(error => {
        console.error("Error");
      })
  }

  const getAllProducts = () => {
    axios.get(`http://localhost:8080/api/products`)
      .then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("Error");
      })
  }
  const handleCountTotalSurplus = () => {
    let total = 0;
    productsInCart && productsInCart.map((item, index) => {
      total += item.donGia;
    })
    const surplus = customerPayment - total;
    const result = surplus
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    return result;

  }
  const handleCountTotalMoney = () => {
    let total = 0;
    productsInCart && productsInCart.map((item, index) => {
      total += item.donGia;
    })
    return total;

  }
  const handleCountTotalMoneyFormat = () => {
    let total = 0;
    productsInCart && productsInCart.map((item, index) => {
      total += item.donGia;
    })
    const result = total
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    return result;
  }
  const handleCountTotalMoneyCustomerNeedPay = () => {
    let result = "";
    let total = 0;
    productsInCart && productsInCart.map((item, index) => {
      total += item.donGia;
    })
    let totalFinal = 0;
    totalFinal = total;
    result = totalFinal
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    return result;
  }

  useEffect(() => {
    getAllOrdersPending();
    getOrderPendingDefault();
    // getAllCustomers();
    // setCustomerNeedPayFormat(handleCountTotalMoneyCustomerNeedPay());

  }, []);

  const [idProduct, setIdProduct] = useState();
  const [priceProduct, setPriceProduct] = useState();
  const [openProducts, setOpenProducts] = useState(false);
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const handleOpenDialogProductDetails = (id, price) => {
    setIdProduct(id)
    setPriceProduct(price);
    setOpenProductDetails(true);
  }

  const handleCloseNoActionDialogProductDetails = () => {
    setOpenProductDetails(false);
  }

  const handleCloseDialogProductDetails = () => {
    setOpenProductDetails(false);
  }

  const handleOpenDialogProducts = () => {
    setOpenProducts(true);
  }

  const handleCloseDialogProducts = () => {
    setOpenProducts(false);
  }
  const handleCloseNoActionDialogProducts = () => {
    setOpenProducts(false);
  }

  const addProductAndCartToCartDetails = async (cartDetails) => {
    setIsLoading(false);
    const addCartDetails = {
      amount: cartDetails.amount,
      price: cartDetails.price,
      cartId: cartDetails.cartId,
      productId: cartDetails.productId,
      orderId: cartDetails.orderId,
    };
    try {
      await axios.post(`http://localhost:8080/api/carts`, addCartDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
        getCartDetails(cartId);
        getAllOrdersPending();
        setIsLoading(true);
        handleCloseDialogProductDetails();
        handleCloseDialogProducts();
      });
    } catch (error) { }
  };
  const handleAddProductToCart = () => {
    const cartDetails = {
      amount: 1,
      price: priceProduct,
      cartId: cartId,
      productId: idProduct,
      orderId: order.id,
    }
    addProductAndCartToCartDetails(cartDetails);
  }

  const handleDeliveryChange = (event) => {
    setDelivery(event.target.checked);
    if (event.target.checked == true) {
      setPaymentWhenReceive(true);
    }
    else {
      setPaymentWhenReceive(false);
    }
  };

  const handlePaymentWhenReceiveChange = (event) => {
    setPaymentWhenReceive(event.target.checked);
  };

  const handleCustomerPaymentAndSurplusMoney = (event) => {

    const value = event.target.value;
    const parseNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCustomerPaymentFormat(valueFinal);
    setCustomerPayment(parseNumber);

    if (value == null || value == "") {
      const final = handleCountTotalMoney();
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
      setSurplusMoney(-final);
    }
    else if (parseNumber > 100000000000) {
      const final = handleCountTotalMoney();
      setSurplusMoney(-final);
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    }
    else {
      const customerNeedPayment = handleCountTotalMoney();
      const surplusMoneyOurCustomer = parseNumber - customerNeedPayment;
      setSurplusMoney(surplusMoneyOurCustomer);
    }
  }

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [isValidate, setIsValidate] = useState(false);
  const [open, setOpen] = React.useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const [openCustomer, setOpenCustomer] = useState();
  const [openOrderClose, setOpenOrderClose] = useState();

  const handleOpenDialogOrderClose = () => {
    setOpenOrderClose(true);
  }

  const handleCloseNoActionDialogOrderClose = () => {
    setOpenOrderClose(false);
  }
  const handleCloseDialogOrderClose = (id) => {
    handleDeleteOrderPendingById(id);
    setOpenOrderClose(false);
  }

  const handleOpenDialogCustomers = () => {
    setOpenCustomer(true);
  }

  const handleCloseDialogCustomers = () => {
    setOpenCustomer(false);
  }

  // const [receiveName, setReceiveName] = useState("");
  // const handleChangeReceiveName = (event) => {
  //   const value = event.target.value;
  //   setReceiveName(value);
  // };

  const removeCustomerInput = () => {
    setDataCus("");
    setCustomerInput("");
  }

  const [valueTabs, setValueTabs] = React.useState(1);
  const [itemMa, setItemMa] = React.useState("");
  const [itemId, setItemId] = React.useState("");

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
    setTimeout(() => {
      setOpen1(false);
      setOpen(true);
    }, 350);
    setOpen(false);

  };

  const [openAutocompleteCustomers, setOpenAutocompleteCustomers] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -4,
      top: 1,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#2f80ed"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#2f80ed"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7"
      },
      "&:hover fieldset": {
        borderColor: "#E0E3E7" // use the same color as original border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2f80ed"
      }
    }
  });

  const [dataCus, setDataCus] = useState("");
  const [openCus, setOpenCus] = useState(false);
  const [customerInput, setCustomerInput] = useState("");
  const handleGetDataCustomer = value => {
    const newValue = String(value.split(" - ")[0]);
    setDataCus(newValue);
  }
  const handleGetSelectDataCustomer = value => {
    setCustomerInput(value);
  }

  const data1 = customers.map((customer) =>
    customer.hoVaTen + " - " +
    customer.ma + " - " +
    customer.soDienThoai
  );

  const [showParentTooltip, setShowParentTooltip] = useState(false);

  const handleMouseEnterChild = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên đến tooltip cha
  };
  const [showPlaceholderTooltip, setShowPlaceholderTooltip] = useState(false);

  const handleKeyDown = (event) => {
    if (customerInput != "") {
      event.preventDefault();
    }
  }

  return (
    <>
      <Row className='mt-4 d-flex' style={{ height: "auto", margin: "auto" }}>
        <Col md="8" className='' style={{ backgroundColor: "#ffffff", width: "", borderRadius: "15px 15px 15px 15px", boxShadow: "0 0.1rem 0.3rem #00000030", height: "685px" }}>
          <TabContext value={valueTabs}>
            <div className='' style={{
              marginTop: "15px", width: "101.5%"
            }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className='d-flex' style={{ position: "sticky", top: 0, zIndex: 1, width: "99%" }}>
                  <TabList
                    style={{}}
                    variant="scrollable"
                    TabIndicatorProps={{
                      title: "indicator",
                      sx: { backgroundColor: "#0B6BCB", height: 3.4 } //width: "25% !important"
                    }}
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.35 },
                      },
                    }}
                    onChange={handleChange} aria-label="lab API tabs example"
                  >
                    {orders && orders.map((item, index) => {
                      return (
                        <Tab sx={{ height: "20px" }}
                          onClick={() => {
                            getOrderById(item.ma)
                          }}
                          style={{ borderRadius: "8px 8px 0 0", color: "black" }} label={
                            <div className='d-flex' style={{}}>
                              <span className='active' style={{ fontWeight: "", fontSize: "15px", textTransform: "capitalize" }}>Đơn hàng {item.ma.substring(8)}</span>
                              <StyledBadge showZero={true} className='ms-2' badgeContent={item && item.gioHang && item.gioHang.cartDetails && item.gioHang.cartDetails.length} color="primary">
                                <img style={{ width: "15px", height: "19px" }} src="https://www.svgrepo.com/show/224235/shopping-cart.svg" />
                              </StyledBadge>
                              <div className='ms-1'></div>
                              {orders && orders.length > 1 ?
                                <>
                                  <div onClick={(event) => { event.stopPropagation() }} onMouseDown={() => { handleConfirmBeforeDeleteOrderPendingHasProduct(item && item.gioHang && item.gioHang.cartDetails && item.gioHang.cartDetails.length, item.id); setItemMa(item.ma); setItemId(item.id) }} className='ms-2 ps-1 iconButton' style={{ position: "relative" }}>
                                    <div className='' style={{ position: "absolute", bottom: "-5px" }}>
                                      <Tooltip title="Đóng" TransitionComponent={Zoom}>
                                        <IconButton aria-label="delete" size="small" className=''>
                                          <CloseIcon className='text-dark' fontSize="inherit" />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </div>
                                  <div className='ms-3 ps-1'></div>
                                </>
                                : ""
                              }
                            </div>
                          } value={index + 1} />
                      )
                    })
                    }
                  </TabList>
                  <div style={{ cursor: "pointer" }} className='mt-1'>
                    <div onClick={() => handleAddOrderPending()} className='ms-2 ps-1'
                      style={{

                      }}
                    >
                      <Tooltip title="Thêm mới" TransitionComponent={Zoom}>
                        <IconButton aria-label="delete" size="medium">
                          <AddCircleOutlineIcon className='text-dark' fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>

                </div>
              </Box>
              <div className='scroll-container3' style={{ width: "100.6%" }}>
                <TabPanel className='' sx={{ margin: 0.1, padding: 0 }} value={valueTabs}>
                  <TabItem
                    openProducts={openProducts}
                    openDialogProducts={handleOpenDialogProducts}
                    closeDialogProducts={handleCloseDialogProducts}
                    closeNoActionDialogProducts={handleCloseNoActionDialogProducts}
                    openProductDetails={openProductDetails}
                    openDialogProductDetails={handleOpenDialogProductDetails}
                    closeDialogProductDetails={handleCloseDialogProductDetails}
                    closeNoActionDialogProductDetails={handleCloseNoActionDialogProductDetails}
                    add={handleAddProductToCart}
                    remove={handleDeleteCartDetailsById}
                    delivery={delivery}
                    productsInCarts={productsInCart}
                  />
                </TabPanel>
              </div>
            </div>
          </TabContext>
        </Col>
        <Col className='ms-3' md="4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000020", borderRadius: "15px 15px 15px 15px", width: "31.98%", height: "685px" }}>
          <div className='mt-2'>
            <div style={{ height: "583px" }}>
              <div className='mt-3 ms-2'>
                <InputGroup
                  className={`${customerInput == "" ? "" : "active"}`}
                  inside style={{
                    width: "auto", height: 38, position: ""
                  }}>
                  <InputGroup.Button tabIndex={-1} className="disable-hover">
                    {customerInput != "" ?
                      <Tooltip title="Xem khách hàng">
                        <IoPersonCircle style={{ fontSize: "23px" }} />
                      </Tooltip> :
                      <svg style={{ color: "darkgray", marginBottom: "1px" }} fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    }
                  </InputGroup.Button>
                  <AutoComplete className={``}
                    onKeyDown={handleKeyDown}
                    // readOnly={customerInput != "" ? true : false}
                    value={dataCus}
                    onChange={handleGetDataCustomer}
                    onSelect={handleGetSelectDataCustomer}
                    renderMenuItem={item => {
                      const [hoVaTen, ma, soDienThoai] = item.split(" - ");

                      return (
                        <>
                          {customerInput != "" ?

                            <div className="text-dark" style={{ fontSize: "14.5px" }}>
                              <div className="d-flex justify-content-between">
                                <div className='info-left'>
                                  <span>{hoVaTen + " - " + ma}</span>
                                  <div className='info-lett-bottom'>
                                    <span>SĐT: {soDienThoai == undefined ? ma : soDienThoai}</span>
                                  </div>
                                </div>
                                <div className='info-right mt-2 me-2'>
                                  <Tooltip TransitionComponent={Zoom} title="Cập nhật">
                                    <BorderColorOutlinedIcon color='primary' />
                                  </Tooltip>
                                </div>
                              </div>
                            </div> :
                            <div className="text-dark" style={{ fontSize: "14.5px" }}>
                              <div className="d-flex justify-content-between">
                                <div className='info-left'>
                                  <span>{hoVaTen + " - " + ma}</span>
                                  <div className='info-lett-bottom'>
                                    <span>SĐT: {soDienThoai == undefined ? ma : soDienThoai}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </>
                      )
                    }
                    }
                    data={data1} placeholder="Tìm kiếm khách hàng" >
                  </AutoComplete>
                  <InputGroup.Addon
                    className="disable-hover1" style={{ position: "absolute", bottom: "0px" }}>
                    {customerInput != "" ?
                      <Tooltip
                        onClick={(e) => { removeCustomerInput(e.stopPropagation()); }} style={{}} title="Bỏ chọn" className='ms-2 open-click' TransitionComponent={Zoom}>
                        <IconButton size='small'>
                          <CloseOutlined style={{ fontSize: "20px" }} />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip onClick={() => {
                        handleOpenDialogCustomers()
                      }} style={{}} title="Thêm mới khách hàng" className='ms-2 open-click' TransitionComponent={Zoom}>
                        <IconButton size='small'>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  </InputGroup.Addon>
                </InputGroup>
              </div>
              <div className='mt-3 pt-1 d-flex' style={{ marginLeft: "14px" }}>
                <FormControlLabel
                  checked={delivery}
                  onChange={handleDeliveryChange}
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  label={
                    <span className='ms-1' style={{ fontSize: "15px" }}>Giao Hàng
                    </span>
                  }
                />
              </div>


              <div className='ms-2 ps-1 mt-3'>
                {isNotPayment == false ?
                  <>
                    <div className='d-flex mt-3' style={{ position: "relative" }}>
                      <CssTextField size='small'
                        InputLabelProps={{
                          sx: {
                            fontSize: "14.5px"
                          }
                        }}
                        inputProps={{
                          style: {
                            height: "22.5px",
                          },
                        }}
                        label="Mã Giảm Giá"
                        sx={{ fontSize: "13px" }} className='me-2' style={{ width: "150px" }} />
                      <div style={{ position: "absolute", left: "2px", top: "36px", display: "none" }}>
                        <FormHelperText><span style={{ color: "#dc1111" }}>
                          Mã giảm giá không tồn tại
                        </span></FormHelperText>
                      </div>
                      <Button
                        className="rounded-2 button-mui"
                        type="primary"
                        style={{ height: "38.8px", width: "auto", fontSize: "15px" }}
                      >
                        <span
                          className="text-white"
                          style={{ marginBottom: "3px", fontSize: "13.5px", fontWeight: "500" }}
                        >
                          Chọn Mã Giảm Giá
                        </span>
                      </Button>
                    </div>
                  </>
                  : ""
                }
                <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                  <span className='' style={{ fontSize: "15px", marginTop: "1px" }}>Tổng tiền hàng</span>
                  <span className='text-dark me-2' style={{ fontSize: "17.5px" }}>
                    {
                      handleCountTotalMoneyFormat()
                    }
                  </span>
                </div>
                {/*
*/}
                {delivery == false ?
                  <>
                    <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                      <span className='fw-bold' style={{ fontSize: "15px", marginTop: "1px" }}>Khách cần trả
                      </span>
                      <span className='me-2 fw-bold' style={{ fontSize: "17.5px", color: "#dc1111" }}>
                        {
                          handleCountTotalMoneyCustomerNeedPay()}
                      </span>
                    </div>
                    {isNotPayment == false && productsInCart.length > 0 ?
                      <div className='d-flex justify-content-between mt-3' style={{ marginLeft: "1px" }}>
                        <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán
                        </span>
                        <TextField className='me-2'
                          onChange={handleCustomerPaymentAndSurplusMoney}
                          value={customerPaymentFormat}
                          InputProps={{
                            style: { fontSize: '16.5px' }
                          }}
                          variant="standard"
                          sx={{ width: "105px", fontSize: "17.5px" }} />
                      </div>
                      : ""
                    }
                  </>
                  :
                  <>
                    <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                      <span className='' style={{ fontSize: "15px", marginTop: "1px" }}>Phí vận chuyển</span>
                      <span className='me-2' style={{ fontSize: "17.5px" }}>
                        {
                          order && order.phiShip ? order.phiShip.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }) : "0 ₫"
                        }
                      </span>
                    </div>
                    <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                      <span className='fw-bold' style={{ fontSize: "15px", marginTop: "1px" }}>Tổng cộng</span>
                      <span className='me-2 fw-bold' style={{ fontSize: "17.5px", color: "#dc1111" }}>
                        {
                          handleCountTotalMoneyCustomerNeedPay()
                        }
                      </span>
                    </div>
                    {
                      paymentWhenReceive == false && isNotPayment == false && productsInCart.length > 0 ?
                        <div className='d-flex justify-content-between mt-3 pt-1' style={{ marginLeft: "1px" }}>
                          <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán</span>
                          <TextField className='me-2'
                            onChange={handleCustomerPaymentAndSurplusMoney}
                            value={customerPaymentFormat}
                            variant="standard"
                            style={{ width: "120px", fontSize: "17px" }} />
                        </div>
                        : ""
                    }
                  </>
                }
              </div>

              {(customerPayment != (handleCountTotalMoney()) && isNotPayment == false) && (delivery == true || delivery == false) && paymentWhenReceive == false && productsInCart.length > 0 ?
                <div className={`d-flex justify-content-between ${`${paymentWhenReceive == false && delivery == true ? "pt-4 mt-1" : "pt-3 mt-2"}`} ms-2`} style={{ marginLeft: "1px" }} >
                  <span className='ms-1' style={{ fontSize: "15px", marginTop: "2px" }}>Tiền thừa trả khách</span>
                  <span className='me-2' style={{ fontSize: "17.5px" }}>{
                    handleCountTotalSurplus()
                  }</span>
                </div> : ""
              }
              {isNotPayment == false && delivery == true ?
                <div className='mt-3 ms-3'>
                  <FormControlLabel
                    checked={paymentWhenReceive}
                    onChange={handlePaymentWhenReceiveChange}
                    control={<IOSSwitch sx={{ m: 1 }} />}
                    label={
                      <span className='ms-1' style={{ fontSize: "15px" }}>Thanh toán khi nhận hàng</span>
                    }
                  />
                </div>
                : ""
              }

              {(delivery == true && paymentWhenReceive == true) || isNotPayment == true || productsInCart.length == 0 ? "" :
                <div className={
                  delivery == false ?
                    'mt-4 ms-2 pt-1' : "ms-2 mt-3"}>

                  <RadioGroup className='' style={{ userSelect: "none" }}
                    onChange={(event) => {
                      // if (event.target.value === "Tiền mặt") {
                      //   setPayment(1);
                      // }
                      // else if (event.target.value === "Chuyển khoản") {
                      //   setPayment(0);
                      // }
                    }}
                    aria-label="platform"
                    defaultValue={"Tiền mặt"}
                    overlay
                    name="platform"
                    sx={{
                      flexDirection: 'row',
                      gap: 2,
                      [`& .${radioClasses.checked}`]: {
                        [`& .${radioClasses.action}`]: {
                          inset: -1,
                          border: '2px solid #212327',
                          borderColor: 'primary.500',
                        },
                      },
                      [`& .${radioClasses.radio}`]: {
                        display: 'contents',
                        '& > svg': {
                          zIndex: 2,
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          bgcolor: 'background.surface',
                          borderRadius: '50%',
                        },
                      },
                    }}
                  >
                    <Sheet
                      key={"Tiền mặt"}
                      variant="outlined"
                      sx={{
                        borderRadius: 'md',
                        boxShadow: 'sm',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 0.5,
                        minWidth: 95,
                      }}
                    >
                      <Radio value={"Tiền mặt"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                      <FormLabel htmlFor={"Tiền mặt"}>Tiền mặt</FormLabel>
                      <FaRegMoneyBillAlt style={{ fontSize: "24px" }} />
                    </Sheet>
                    <Sheet
                      key={"Chuyển khoản"}
                      variant="outlined"
                      sx={{
                        borderRadius: 'md',
                        boxShadow: 'sm',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 0.5,
                        minWidth: 125,
                      }}
                    >
                      <Radio value={"Chuyển khoản"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                      <FormLabel htmlFor={"Chuyển khoản"}>Chuyển khoản</FormLabel>
                      <PaymentIcon style={{ fontSize: "24px" }} className='' />
                    </Sheet>
                    <Sheet
                      key={"Cả 2"}
                      variant="outlined"
                      sx={{
                        borderRadius: 'md',
                        boxShadow: 'sm',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 0.5,
                        minWidth: 90,
                      }}
                    >
                      <Radio value={"Cả 2"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                      <FormLabel htmlFor={"Cả 2"}>Cả 2</FormLabel>
                      <CreditScoreOutlinedIcon style={{ fontSize: "24px" }} />

                    </Sheet>
                  </RadioGroup>
                </div>
              }
            </div>

            <div className="mt-1">
              <div className=''>
                <div className='text-center'>
                  <button onClick={processingOrder}
                    type="button" class="__add-cart0 add-to-cart trigger ms-1">
                    <span class="" style={{ fontSize: "17.5px" }}>
                      {delivery == true ? "ĐẶT HÀNG" : "THANH TOÁN"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </Col>
      </Row >
      <CustomerDialog open={openCustomer} onCloseNoAction={handleCloseDialogCustomers} data={customers} />
      <OrderPendingConfirmCloseDialog open={openOrderClose} onClose={handleCloseNoActionDialogOrderClose} ma={itemMa && itemMa.substring(8)} deleteOrder={() => handleCloseDialogOrderClose(itemId)} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {validate}
        </Alert>
      </Snackbar>
      {!isLoading && <LoadingIndicator />}
    </>
  )
}

export default PointOfSales;
