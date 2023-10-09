import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
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
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Badge from '@mui/material/Badge';
import Zoom from '@mui/material/Zoom';

import { toast } from "react-toastify";
import { IoPersonCircle } from "react-icons/io5";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from 'antd'
import { FormControl, Input, OutlinedInput, Checkbox, FormControlLabel, InputAdornment, IconButton } from '@mui/material'
import TextField from '@mui/material/TextField';
import style from './style.css'
import { ConfirmPaymentDialog, CustomersDialog, OrderPendingConfirmCloseDialog, ProductsDialog, ShipFeeInput, VouchersDialog } from './AlertDialogSlide';
import axios from 'axios';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { isNaN, map, parseInt, debounce } from 'lodash';
import { AutoComplete, InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import TabItem from './tab-item';
import LoadingIndicator from '../../../utilities/loading';
import { OrderStatusString, OrderTypeString, Notistack } from './enum';
import useCustomSnackbar from '../../../utilities/notistack';

const PointOfSales = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingInside, setLoadingInside] = useState(false);
  const [delivery, setDelivery] = React.useState(false);
  const [paymentWhenReceive, setPaymentWhenReceive] = useState(false);
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountValidate, setDiscountValidate] = useState("");
  const [discountFormat, setDiscountFormat] = useState('');
  const [shipFee, setShipFee] = useState(0);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isFirstGet, setIsFirstGet] = useState(true);

  const [payment, setPayment] = useState(1);
  const [customerPayment, setCustomerPayment] = useState(0);
  const [customerPaymentFormat, setCustomerPaymentFormat] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [customerNeedPay, setCustomerNeedPay] = useState(null);
  const [customerNeedPayFormat, setCustomerNeedPayFormat] = useState(0);

  const [idVoucher, setIdVoucher] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [order, setOrder] = useState({});
  const [cartId, setCartId] = useState("");
  const [orders, setOrders] = useState([]);
  const [changedCartItems, setChangedCartItems] = useState(0);
  const [alert, setAlert] = useState({});
  const [dieuKien, setDieuKien] = useState(0);

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [openDialogConfirmPayment, setOpenDialogConfirmPayment] = useState(false);

  const handleOpenDialogConfirmPayment = () => {
    if (cartItems && cartItems.length == 0) {
      handleOpenAlertVariant("Giỏ hàng chưa có sản phẩm!", Notistack.ERROR);
    }
    else {
      setOpenDialogConfirmPayment(true);
    }
  }
  const handleCloseDialogConfirmPayment = () => {
    setOpenDialogConfirmPayment(false);
  }

  const getShipFee = (fee) => {
    setShipFee(fee);
  }
  const getDieuKien = (dieuKien) => {
    setDieuKien(dieuKien);
  }

  useEffect(() => {
    if (cartItems.length === 0 && discountValue != 0) {
      handleCheckVoucher(discount);
    }
    else if (cartItems.length !== 0) {
      if (discount != "" && discountValue == 0) {
        if (discount.trim().length === 10) {
          handleCheckVoucher(discount);
        }
        // if (discountValidate !== "Mã giảm giá không tồn tại.") {
        // }
      }
      else if (discount != "" && discountValue != 0) {
        if (handleCountTotalMoney() < dieuKien) {
          handleCheckVoucher(discount);
        }
      }
    }

  }, [changedCartItems])

  const paymentOrder = async (data) => {
    setIsLoading(true);
    const orderRequest = {
      tongTien: handleCountTotalMoney(),
      tienThua: handleCountTotalSurplus(),
      tongTienSauKhiGiam: handleCountTotalMoneyCustomerNeedPay(),
      tienKhachTra: customerPayment || 0,
      trangThai: data.trangThai,
      loaiHoaDon: data.loaiHoaDon,
      // ghiChu: description,
      // soDienThoaiNguoiNhan: "",
      // tenNguoiNhan: "",
      // diaChiNguoiNhan: "",
      orderHistory: data.orderHistory,
      cart: order.cart,
      isPayment: true,
      // paymentMethod: paymentMethod,
    };
    try {
      await axios.put(`http://localhost:8080/api/orders/${order.id}`, orderRequest, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          isUpdateStatusOrderDelivery: false,
        }
      }).then(response => {
        setIsLoading(false);
        handleOpenAlertVariant(`${data.loaiHoaDon == OrderTypeString.DELIVERY ? "Đặt hàng thành công!" : "Thanh toán thành công!"}`, Notistack.SUCCESS);
        navigate(`/dashboard/order-detail/${order.ma}`);
      });
    } catch (error) { }
  };
  const updateOrder = async (idVoucher) => {
    const message = `${idVoucher != null || idVoucher != "" ? "Áp dụng thành công mã giảm giá!" : "Mã giảm giá đã được gỡ bỏ thành công!"}`;
    setIsLoading(true);
    const orderRequest = {
      // ghiChu: description,
      // soDienThoaiNguoiNhan: "",
      // tenNguoiNhan: "",
      // diaChiNguoiNhan: "",
      voucher: {
        id: idVoucher,
      },
      isPayment: false,
      // paymentMethod: paymentMethod,
    };
    try {
      await axios.put(`http://localhost:8080/api/orders/${order.id}`, orderRequest, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          isUpdateStatusOrderDelivery: false,
        }
      }).then(response => {
        setOrder(response.data.data);
        setDiscount(response.data.data.voucher.ma);
        setDiscountValue(response.data.data.voucher.giaTriVoucher);
        getAllOrdersPending();
        setIsLoading(false);
        handleOpenAlertVariant(message, Notistack.SUCCESS);
        // setOpenAlertMui(true);
        // setAlert({
        //   message: "Áp dụng thành công mã giảm giá!",
        //   color: "success",
        // })
      });
    } catch (error) { }
  };
  const handleAddOrRemoveVoucher = (idVoucher, loading, keep) => {
    const message = `${idVoucher === null ? "Mã giảm giá đã được gỡ bỏ thành công!" : "Áp dụng thành công mã giảm giá!"}`;
    const orderRequest = {
      voucher: {
        id: idVoucher,
      },
      isPayment: false,
    };
    if (idVoucher === null && loading) {
      setLoadingInside(true);
      setTimeout(() => {
        try {
          axios.put(`http://localhost:8080/api/orders/${order.id}`, orderRequest, {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              isUpdateStatusOrderDelivery: false,
            }
          }).then(response => {
            setOrder(response.data.data);
            setDiscount("");
            setIdVoucher("");
            setDiscountValue(0);
            setDiscountValidate("");
            getAllOrdersPending();
            handleOpenAlertVariant(message, Notistack.SUCCESS);
            setLoadingInside(false);
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000)
    }
    else if (idVoucher === null && !loading) {
      try {
        axios.put(`http://localhost:8080/api/orders/${order.id}`, orderRequest, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            isUpdateStatusOrderDelivery: false,
          }
        }).then(response => {
          setOrder(response.data.data);
          setIdVoucher("");
          if (!keep) {
            setDiscountValue(0);
            setDiscount("");
            setDiscountValidate("");
          }
          getAllOrdersPending();
        });
      } catch (error) {
        console.log(error);
      }
    }
    else if (idVoucher != null && loading) {
      setLoadingInside(true);
      setTimeout(() => {
        try {
          axios.put(`http://localhost:8080/api/orders/${order.id}`, orderRequest, {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              isUpdateStatusOrderDelivery: false,
            }
          }).then(response => {
            setOrder(response.data.data);
            setDiscount(response.data.data.voucher.ma);
            setIdVoucher(response.data.data.voucher.id);
            setDiscountValue(response.data.data.voucher.giaTriVoucher);
            setDiscountValidate("");
            getAllOrdersPending();
            handleOpenAlertVariant(message, Notistack.SUCCESS);
            setLoadingInside(false);
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    }
    else {
      try {
        axios.put(`http://localhost:8080/api/orders/${order.id}`, orderRequest, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            isUpdateStatusOrderDelivery: false,
          }
        }).then(response => {
          setOrder(response.data.data);
          setIdVoucher(response.data.data.voucher.id);
          setDiscount(response.data.data.voucher.ma);
          setDiscountValue(response.data.data.voucher.giaTriVoucher);
          setDiscountValidate("");
          getAllOrdersPending();
          handleOpenAlertVariant(message, Notistack.SUCCESS);
          setLoadingInside(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const processingPaymentOrder = () => {
    if (cartItems && cartItems.length > 0) {
      const statusOrder = delivery ? OrderStatusString.PENDING_CONFIRM : OrderStatusString.HAD_PAID;
      const typeOrder = delivery ? OrderTypeString.DELIVERY : OrderTypeString.AT_COUNTER;
      const orderHistory = {
        thaoTac: "Đã Thanh Toán",
        loaiThaoTac: 6,
        moTa: "Khách hàng đã thanh toán đơn hàng",
        createdAt: new Date(),
        createdBy: "Admin",
        hoaDon: {
          id: order.id
        },
      }
      const data = {
        trangThai: statusOrder,
        loaiHoaDon: typeOrder,
        orderHistory: delivery ? null : orderHistory,
      }
      // const paymentMethod = {
      //   loaiThanhToan: 0,
      //   hinhThucThanhToan: payment,
      //   soTienThanhToan: totalMoney,
      //   trangThai: 1,
      //   nguoiXacNhan: "Admin",
      //   createdAt: new Date(),
      // }
      paymentOrder(data);
    }
  }

  const handleUpdateDescriptionOrder = (event) => {
    const value = event.target.value;
    setDescription(value);
    paymentOrder(null, null, null);
  }

  const getAllOrdersPending = () => {
    axios
      .get(`http://localhost:8080/api/orders/pending`, {
      })
      .then((response) => {
        setOrders(response.data.data);

        if (isFirstGet) {
          setOrder(response && response.data.data[0])
          setCartId(response && response.data.data[0].cart.id);
          setCartItems(response && response.data.data[0].cart.cartItems);
          // setShipFee(response ? response.data.data[0].tienShip : 0);
          setDiscount(response && response.data.data[0].voucher.ma);
          setIdVoucher(response && response.data.data[0].voucher.id);
          setDiscountValue(response && response.data.data[0].voucher.giaTriVoucher);
          setIsFirstGet(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }
  const getVouchersIsActive = () => {
    axios
      .get(`http://localhost:8080/voucher/voucherActive`)
      .then((response) => {
        setVouchers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getOrderPendingAfterAddOrDeleteCartItems = () => {
    axios
      .get(`http://localhost:8080/api/orders/pending/${order.id}`)
      .then((response) => {
        setCartItems(response.data.data.cart.cartItems);
        setChangedCartItems(changedCartItems + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getOrderPendingLastRemove = () => {
    axios
      .get(`http://localhost:8080/api/orders/pending`, {
      })
      .then((response) => {
        const orders = response.data.data;
        setOrders(orders);
        const lastOrder = orders[orders.length - 1];
        setOrder(lastOrder);
        setCartId(lastOrder.cart.id);
        setCartItems(lastOrder.cart.cartItems);
        if (lastOrder.voucher != null) {
          setDiscount(lastOrder.voucher.ma);
          setDiscount(lastOrder.voucher.id);
          setDiscountValue(lastOrder.voucher.giaTriVoucher);
        }
        setValueTabs(orders.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleAddOrderPending = () => {
    axios
      .post(`http://localhost:8080/api/orders?isPending=true`)
      .then(response => {
        getAllOrdersPending();
        setValueTabs(orders.length + 1);
        setOrder(response.data.data);
        setCartId(response.data.data.cart.id);
        setCartItems([]);
        setDiscount("");
        setIdVoucher("");
        setDiscountValue(0);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleDeleteCartItemById = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/carts/${id}`);
      getOrderPendingAfterAddOrDeleteCartItems();
      getAllOrdersPending();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrderPendingById = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
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
      handleOpenDialogOrderClose();
    }
  }

  const getOrderPendingByTabIndex = (index) => {
    const order = orders[index - 1];
    setOrder(order);
    setCartId(order.cart.id);
    setCartItems(order.cart.cartItems);
    if (order && order.voucher) {
      setIdVoucher(order && order.voucher && order.voucher.id);
      setDiscount(order && order.voucher && order.voucher.ma);
      setDiscountValue(order && order.voucher && order.voucher.giaTriVoucher);
    }
    else {
      setIdVoucher("");
      setDiscount("");
      setDiscountValue(0);
    }

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

  const handleCheckVoucher = (value) => {
    setLoadingInside(true);
    setTimeout(() => {
      axios.get(`http://localhost:8080/voucher/findVoucher`, {
        params: {
          input: value,
          tongTien: handleCountTotalMoney(),
        }
      })
        .then(response => {
          setDiscountValidate("");
          if (response.data.status === true) {
            handleAddOrRemoveVoucher(response.data.voucher.id, false);
            setDiscountValidate("");
          }
          if (response.data.status === null) {
            setDiscountValidate(response.data.message);
            if (discountValue != 0) {
              setDiscountValue(0);
              handleAddOrRemoveVoucher(null, false, true);
            }
          }
          setLoadingInside(false);
        }).catch(error => {
          console.error("Error");
        })
    }, 1000);
  }

  const handleCountTotalSurplus = () => {
    let total = 0;
    cartItems && cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    })
    const result = (customerPayment - (total + shipFee - discountValue || 0));
    return result;

  }
  const handleCountTotalSurplusFormat = () => {
    let total = 0;
    cartItems && cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    })
    const surplus = (customerPayment - (total + shipFee - discountValue || 0));
    const result = surplus
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    return result;

  }
  const handleCountTotalMoney = () => {
    let total = 0;
    cartItems && cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    })
    return total;

  }
  const handleCountTotalMoneyFormat = () => {
    let total = 0;
    cartItems && cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    })
    const result = total
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    return result;
  }
  const handleCountTotalMoneyCustomerNeedPay = () => {
    let total = 0;
    cartItems && cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    })
    const result = total + shipFee - (discountValue || 0);
    return result;
  }
  const handleCountTotalMoneyCustomerNeedPayFormat = () => {
    let result = "";
    let total = 0;
    cartItems && cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    })
    let totalFinal = total + shipFee - (discountValue || 0);
    result = totalFinal
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    return result;
  }


  const handleChangeDiscount = (event) => {
    setDiscountValidate("");
    const value = event.target.value;
    setDiscount(value)
    if (value === null || value === "" || value.trim().length === 0) {
      setDiscount("")
      setDiscountValidate("");
    }
    else if (value.trim().length === 10) {
      handleCheckVoucher(value);
    }

  }

  useEffect(() => {
    getAllOrdersPending();
    getAllCustomers();
    // getAllProducts();
  }, []);

  // const [idProduct, setIdProduct] = useState();
  // const [priceProduct, setPriceProduct] = useState();
  const [openProducts, setOpenProducts] = useState(false);
  const [openProductDetails, setOpenProductDetails] = useState(false);

  const handleOpenDialogProductDetails = () => {
    setOpenProductDetails(true);
  }

  const handleCloseNoActionDialogProductDetails = () => {
    setOpenProductDetails(false);
  }

  const handleCloseDialogProductDetails = () => {
    setCount(1);
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
  const [count, setCount] = useState(1);
  const handleChangeCount = (value) => {
    let newValue = parseInt(value);
    newValue = newValue > 4 ? 4 : newValue;
    newValue = newValue < 1 ? 1 : newValue;
    setCount(newValue);
  };

  const handleClickCount1 = () => {
    if (count == 1) {
      handleOpenAlertVariant("Tối thiểu 1 sản phẩm!", Notistack.ERROR);
    }
    else {
      setCount(count - 1);
    }
  }
  const handleClickCount = () => {
    if (count == 4) {
      handleOpenAlertVariant("Tối đa 4 sản phẩm!", Notistack.ERROR);
    }
    else {
      setCount(count + 1);
    }
  }

  const addCartItemsToCart = async (cartItems) => {
    setIsLoading(true);
    const data = {
      amount: cartItems.amount,
      price: cartItems.price,
      cartId: cartItems.cartId,
      productId: cartItems.productId,
      // orderId: cartItems.orderId,
    };
    try {
      await axios.post(`http://localhost:8080/api/carts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
        getAllOrdersPending();
        getOrderPendingAfterAddOrDeleteCartItems();
        setIsLoading(false);
        handleCloseDialogProductDetails();
        handleCloseDialogProducts();
        handleOpenAlertVariant("Thêm vào giỏ hàng thành công ", Notistack.SUCCESS);
      });
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      setIsLoading(false);
    }
  };
  const handleAddProductToCart = (priceProduct, idProduct, amount) => {
    const cartItems = {
      amount: amount,
      price: priceProduct,
      cartId: cartId,
      productId: idProduct,
      // orderId: order.id,
    }
    if (isNaN(amount) || amount === 0 || amount === null || amount === "") {
      handleOpenAlertVariant("Vui lòng nhập số lượng!", Notistack.ERROR);
    }
    else {
      addCartItemsToCart(cartItems);
    }
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

  const handleCustomerPayment = (event) => {

    const value = event.target.value;
    const parseNumberPayment = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCustomerPaymentFormat(valueFinal);
    setCustomerPayment(parseNumberPayment);

    if (value == null || value == "") {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    }
    else if (parseNumberPayment > 100000000000) {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
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
  const [openAlertMui, setOpenAlertMui] = React.useState(false);


  const handleClick = () => {
    setOpenAlertMui(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertMui(false);
  };


  const [openCustomers, setOpenCustomers] = useState();
  const [openVouchers, setOpenVouchers] = useState();
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

  const handleOpenDialogVouchers = () => {
    getVouchersIsActive();
    setOpenVouchers(true);
  }
  const handleCloseNoActionDialogVouchers = () => {
    setOpenVouchers(false);
  }

  const handleCloseDialogVouchers = () => {
    setOpenVouchers(false);
  }
  const handleOpenDialogCustomers = () => {
    setOpenCustomers(true);
  }

  const handleCloseDialogCustomers = () => {
    setOpenCustomers(false);
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
    getOrderPendingByTabIndex(newValue)
  };

  const [openAlert, setOpenAlert] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose1 = () => {
    setAlert(false);
  };
  const handleOpenAlert = () => {
    setAlert(true);

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
                          style={{ borderRadius: "8px 8px 0 0", color: "black" }} label={
                            <div className='d-flex' style={{}}>
                              <span className='active' style={{ fontWeight: "", fontSize: "15px", textTransform: "capitalize" }}>Đơn hàng {item.ma.substring(8)}</span>
                              <StyledBadge showZero={true} className='ms-2' badgeContent={item && item.cart && item.cart.cartItems && item.cart.cartItems.length} color="primary">
                                <img style={{ width: "15px", height: "19px" }} src="https://www.svgrepo.com/show/224235/shopping-cart.svg" />
                              </StyledBadge>
                              <div className='ms-1'></div>
                              {orders && orders.length > 1 ?
                                <>
                                  <div onClick={(event) => { event.stopPropagation() }} onMouseDown={() => { handleConfirmBeforeDeleteOrderPendingHasProduct(item && item.cart && item.cart.cartItems && item.cart.cartItems.length, item.id); setItemMa(item.ma); setItemId(item.id) }} className='ms-2 ps-1 iconButton' style={{ position: "relative" }}>
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
                    getShipFee={getShipFee}
                    openProducts={openProducts}
                    openDialogProducts={handleOpenDialogProducts}
                    closeDialogProducts={handleCloseDialogProducts}
                    closeNoActionDialogProducts={handleCloseNoActionDialogProducts}
                    openProductDetails={openProductDetails}
                    openDialogProductDetails={handleOpenDialogProductDetails}
                    closeDialogProductDetails={handleCloseDialogProductDetails}
                    closeNoActionDialogProductDetails={handleCloseNoActionDialogProductDetails}
                    add={handleAddProductToCart}
                    remove={handleDeleteCartItemById}
                    delivery={delivery}
                    cartItems={cartItems}
                    count={count}
                    changeCount={handleChangeCount}
                    clickCount={handleClickCount}
                    clickCount1={handleClickCount1}
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
                <>
                  <div className='d-flex mt-3' style={{ position: "relative" }}>
                    <TextField size='small'
                      onChange={handleChangeDiscount}
                      value={discount}
                      InputLabelProps={{
                        sx: {
                          fontSize: "14.5px"
                        }
                      }}
                      InputProps={{
                        readOnly: discountValue && true,
                        endAdornment: loadingInside === true ? <CircularProgress
                          size={25}
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
                        />
                          : discountValue != 0 ? <Tooltip
                            title="Bỏ chọn" className='' TransitionComponent={Zoom}>
                            <IconButton size='small' sx={{ marginLeft: "5px" }}
                              onClick={() => handleAddOrRemoveVoucher(null, true)}
                            >
                              <CloseOutlined style={{ fontSize: "18px" }} />
                            </IconButton>
                          </Tooltip> : ""
                      }}
                      inputProps={{
                        maxLength: 10,
                        style: {
                          height: "22.5px",
                        },
                      }}
                      label="Mã Giảm Giá"
                      sx={{ fontSize: "13px" }} className='me-2' style={{ width: "170px" }} />
                    <div style={{ position: "absolute", left: "2px", top: "36px" }}>
                      <FormHelperText><span style={{ color: "#dc1111" }}>
                        {(discount === "" || discount.length === 0) ? "" : discountValidate}
                      </span></FormHelperText>
                    </div>
                    <Button
                      onClick={() => handleOpenDialogVouchers()}
                      className="rounded-2 button-mui"
                      type="warning"
                      style={{ height: "38.8px", width: "auto", fontSize: "15px" }}
                    >
                      <span
                        className="text-dark"
                        style={{ marginBottom: "3px", fontSize: "13.5px", fontWeight: "500" }}
                      >
                        Chọn Mã Giảm Giá
                      </span>
                    </Button>
                  </div>
                </>
                <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                  <span className='' style={{ fontSize: "15px", marginTop: "1px" }}>Tổng tiền hàng</span>
                  <span className='text-dark me-2' style={{ fontSize: "17.5px" }}>
                    {
                      handleCountTotalMoneyFormat()
                    }
                  </span>
                </div>
                <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                  <span className='' style={{ fontSize: "15px", marginTop: "1px" }}>Giảm giá</span>
                  <span className='text-dark me-2' style={{ fontSize: "17.5px" }}>
                    {
                      discountValue.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    }
                  </span>
                </div>

                {delivery == false ?
                  <>
                    <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                      <span className='fw-bold' style={{ fontSize: "15px", marginTop: "1px" }}>Khách cần trả
                      </span>
                      <span className='me-2 fw-bold' style={{ fontSize: "17.5px", color: "#dc1111" }}>
                        {
                          handleCountTotalMoneyCustomerNeedPayFormat()}
                      </span>
                    </div>
                    {cartItems.length > 0 ?
                      <div className='d-flex justify-content-between mt-3' style={{ marginLeft: "1px" }}>
                        <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán
                        </span>
                        <TextField className='me-2'
                          onChange={handleCustomerPayment}
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
                          shipFee.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        }
                      </span>
                    </div>
                    <div className='d-flex justify-content-between mt-4' style={{ marginLeft: "1px" }}>
                      <span className='fw-bold' style={{ fontSize: "15px", marginTop: "1px" }}>Tổng cộng</span>
                      <span className='me-2 fw-bold' style={{ fontSize: "17.5px", color: "#dc1111" }}>
                        {
                          handleCountTotalMoneyCustomerNeedPayFormat()
                        }
                      </span>
                    </div>
                    {
                      paymentWhenReceive == false && cartItems.length > 0 ?
                        <div className='d-flex justify-content-between mt-3 pt-1' style={{ marginLeft: "1px" }}>
                          <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán</span>
                          <TextField className='me-2'
                            onChange={handleCustomerPayment}
                            value={customerPaymentFormat}
                            variant="standard"
                            style={{ width: "120px", fontSize: "17px" }} />
                        </div>
                        : ""
                    }
                  </>
                }
              </div>

              {(customerPayment != (handleCountTotalMoneyCustomerNeedPay())) && (delivery == true || delivery == false) && paymentWhenReceive == false && cartItems.length > 0 ?
                <div className={`d-flex justify-content-between ${`${paymentWhenReceive == false && delivery == true ? "pt-4 mt-1" : "pt-3 mt-2"}`} ms-2`} style={{ marginLeft: "1px" }} >
                  <span className='ms-1' style={{ fontSize: "15px", marginTop: "2px" }}>Tiền thừa trả khách</span>
                  <span className='me-2' style={{ fontSize: "17.5px" }}>{
                    handleCountTotalSurplusFormat()
                  }</span>
                </div> : ""
              }
              {delivery == true ?
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

              {(delivery == true && paymentWhenReceive == true) || cartItems.length == 0 ? "" :
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
                        minWidth: "28%",
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
                        minWidth: "35%",
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
                        minWidth: "27%",
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

            <div className="mt-3">
              <div className=''>
                <div className='text-center'>
                  <Button type="primary" onClick={handleOpenDialogConfirmPayment}
                    className="__add-cart0 add-to-cart trigger ms-1">
                    <span class="" style={{ fontSize: "17.5px", fontWeight: "450" }}>
                      {delivery == true ? "ĐẶT HÀNG" : "THANH TOÁN"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </Col>
      </Row >
      <CustomersDialog
        open={openCustomers}
        onCloseNoAction={handleCloseDialogCustomers}
        data={customers} />
      <VouchersDialog
        open={openVouchers}
        onCloseNoAction={handleCloseNoActionDialogVouchers}
        onClose={handleCloseDialogVouchers}
        data={vouchers}
        add={handleAddOrRemoveVoucher}
        discount={idVoucher}
        total={handleCountTotalMoney}
        checkDieuKien={getDieuKien}
      />
      <ConfirmPaymentDialog
        open={openDialogConfirmPayment}
        onCloseNoAction={handleCloseDialogConfirmPayment}
        confirmPayment={processingPaymentOrder}

      />
      <OrderPendingConfirmCloseDialog open={openOrderClose} onClose={handleCloseNoActionDialogOrderClose} ma={itemMa && itemMa.substring(8)} deleteOrder={() => handleCloseDialogOrderClose(itemId)} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} open={openAlertMui} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert && alert.color} sx={{ width: '100%', height: "50px", fontSize: "15.5px" }}>
          {alert && alert.message}
        </Alert>
      </Snackbar>
      {isLoading && <LoadingIndicator />}
    </>
  )
}

export default PointOfSales;
