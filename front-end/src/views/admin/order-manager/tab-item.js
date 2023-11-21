import React, { useEffect, useState, memo } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select as SelectMui,
  OutlinedInput,
  MenuItem,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import style from "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Button, Table as TableAntd } from "antd";
import {
  ModalUpdateImeiByProductItem,
  ProductDetailsDialog,
  ProductsDialog,
} from "./AlertDialogSlide";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import EditIcon from "@mui/icons-material/Edit";
import { parseInt } from "lodash";
import { Notistack } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingIndicator from "../../../utilities/loading";
import InputNumberAmountCart from "./input-number-amount-cart";
import {
  TextFieldAddress,
  TextFieldName,
  TextFieldPhone,
} from "./text-field-info-ship";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const TabItem = ({
  openUpdateImei,
  onCloseUpdateImei,
  onOpenUpdateImei,
  openImei,
  onCloseImei,
  onOpenImei,
  /* getCustomer, idCustomer, */ update,
  /* getAmount, */ isOpen,
  /* delivery, */ cartItems,
  add,
  remove /* , openProductDetails, openDialogProductDetails, closeDialogProductDetails, closeNoActionDialogProductDetails, */,
  openProducts,
  openDialogProducts,
  closeDialogProducts /* , getShipFee */,
}) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [loadingChild, setLoadingChild] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
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
  const [idCartItem, setIdCartItem] = useState("");
  const [customerWard, setCustomerWard] = useState("");
  const [imeis, setImeis] = useState([]);
  const [selectedImei, setSelectedImei] = useState([]);
  const [selectedImeiRefresh, setSelectedImeiRefresh] = useState([]);

  const handleOpenImei = () => {
    onOpenImei();
  };

  // useEffect(() => {
  //   if (idCustomer === "") {
  //     setCustomer(null);
  //     setCustomerName("");
  //     setCustomerPhone("");
  //     setCustomerAddress("");
  //
  //     getAllProvinceGhn();
  //     setSelectedWard("");
  //     setSelectedProvince("");
  //     setSelectedDistrict("");
  //     setDistricts([]);
  //     setWards([]);
  //   }
  //   else {
  //     getCustomerById();
  //   }
  // }, [idCustomer])

  // useEffect(() => {
  //   const customer = {
  //     hoVaTen: customerName,
  //     soDienThoai: customerPhone,
  //     diaChi: customerAddress,
  //   }
  //   getCustomer(customer);
  //
  // }, [customerAddress, customerName, customerPhone])

  // const getPhone = (phone) => {
  //   setCustomerPhone(phone);
  // }
  // const getName = (name) => {
  //   setCustomerName(name);
  // }
  // const getAddress = (address) => {
  //   setCustomerAddress(address);
  // }

  // const getCustomerById = async () => {
  //   setIsLoading(true);
  //   await axios
  //     .get(`http://localhost:8080/khach-hang/hien-thi-theo/${idCustomer}`)
  //     .then(async (response) => {
  //       const data = response.data;
  //       setCustomer(data);
  //       setCustomerName(data.hoVaTen);
  //       setCustomerPhone(data.soDienThoai);
  //       setCustomerAddress(data.diaChi);
  //       setCustomerEmail(data.email);
  //
  //       const listAddress = data && data.diaChiList;
  //       const address = listAddress.find((a) => a.trangThai === 1);
  //
  //       const province = provinces.find((item) => item.ProvinceName === address.tinhThanhPho);
  //       setSelectedProvince(province.ProvinceID);
  //
  //       const district = districts.find((item) => item.DistrictName === address.quanHuyen);
  //       setSelectedDistrict(district.DistrictID);
  //
  //       await getAllWardGhnByIdDistrict(district.DistrictID, true, address.xaPhuong);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getAllDistrictGhnByIdProvince(selectedProvince);
  // }, [selectedProvince])

  const openDialogProductItems = () => {
    // openDialogProductDetails();
  };
  const removeProductInCart = (id) => {
    remove(id);
  };

  const addProductToCart = (priceProduct, idProduct, amount) => {
    add(priceProduct, idProduct, amount);
  };

  const updateAmount = (imeis) => {
    update(idCartItem, imeis);
  };

  const closeProductsDialog = () => {
    closeDialogProducts();
    setProducts([]);
  };

  const openProductsDialog = () => {
    getAllProducts();
    openDialogProducts();
  };

  const getAllProducts = async () => {
    await axios
      .get(`http://localhost:8080/api/products/product-items`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error");
      });
  };
  // const tokenGhn = "62124d79-4ffa-11ee-b1d4-92b443b7a897";
  //
  // const getShipFeeGhn = () => {
  //   axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
  //     params: {
  //       from_district_id: shopDistrictId,
  //       from_ward_code: shopWardCode,
  //       service_id: serviceID,
  //       to_district_id: selectedDistrict,
  //       to_ward_code: selectedWard,
  //       weight: 240,
  //     },
  //     headers: {
  //       token: tokenGhn,
  //       Accept: 'application/json',
  //     }
  //   }).then(
  //     (response) => {
  //       getShipFee(response.data.data.total);
  //     }
  //   )
  // }
  //
  // const getAllWardGhnByIdDistrict = async (districtId, selectWard, district) => {
  //   await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
  //     params: {
  //       district_id: districtId,
  //     },
  //     headers: {
  //       token: tokenGhn,
  //       Accept: 'application/json',
  //     }
  //   }).then(
  //     (response) => {
  //       setWards(response.data.data);
  //       if (selectWard) {
  //         const ward = response.data.data.find((item) => item.WardName === district);
  //         setSelectedWard(ward.WardCode);
  //         console.log(ward);
  //       }
  //     }
  //   )
  // }
  //
  // const getAllDistrictGhnByIdProvince = async (provinceId) => {
  //   await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
  //     params: {
  //       province_id: provinceId,
  //     },
  //     headers: {
  //       token: tokenGhn,
  //       Accept: 'application/json',
  //     }
  //   }).then(
  //     (response) => {
  //       setDistricts(response.data.data);
  //     }
  //   )
  // }
  //
  // const getAllProvinceGhn = async () => {
  //   axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
  //     headers: {
  //       token: tokenGhn,
  //       Accept: 'application/json',
  //     }
  //   }).then(
  //     (response) => {
  //       setProvinces(response.data.data);
  //     }
  //   )
  // }
  //
  // const shopID = 189389;
  // const serviceID = 53320;
  // const shopDistrictId = 1482;
  // const shopWardCode = 11007;
  //
  const cartItemsSort = cartItems.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  //
  // const getReceiveDate = () => {
  //   axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`, {
  //     params: {
  //       ShopID: shopID,
  //       service_id: serviceID,
  //       from_district_id: shopDistrictId,
  //       to_district_id: selectedDistrict,
  //       to_ward_code: selectedWard,
  //     },
  //     headers: {
  //       token: tokenGhn,
  //       Accept: 'application/json',
  //     }
  //   }).then(
  //     (response) => {
  //       let getDate = response.data.data.leadtime;
  //       getDate = convertTimeToDate(getDate);
  //       setReceiveDate(getDate);
  //     }
  //   )
  // }
  //
  // const convertTimeToDate = (receiveDate) => {
  //   const date = new Date(receiveDate * 1000);
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const formattedDate = `${day}/${month}/${year}`;
  //
  //   return formattedDate;
  // }
  //
  //
  // useEffect(() => {
  //   if (selectedProvince != "" && selectedDistrict != "" && selectedWard != "" && delivery === true) {
  //     getReceiveDate();
  //     getShipFeeGhn();
  //   }
  //   else {
  //     getShipFee(0);
  //   }
  // }, [selectedWard, selectedDistrict, selectedProvince, delivery])
  //
  // useEffect(() => {
  //   getAllProvinceGhn();
  // }, []);
  //
  // const handleChangeProvince = (event) => {
  //   const value = event.target.value;
  //   setSelectedProvince(value);
  //   getAllDistrictGhnByIdProvince(value);
  //   getAllWardGhnByIdDistrict(3450);
  //   setSelectedDistrict("");
  //   setSelectedWard("");
  // };
  //
  // const handleChangeWard = (event) => {
  //   const value = event.target.value;
  //   setSelectedWard(value);
  // };
  //
  // const handleChangeDistrict = (event) => {
  //   const value = event.target.value;
  //   setSelectedDistrict(value);
  //   getAllWardGhnByIdDistrict(value);
  //   setSelectedWard("");
  // };
  //
  // const IconTrash = () => {
  //   return (
  //     <>
  //       <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  //         <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="currentColor" />
  //       </svg>
  //     </>
  //   )
  // }
  //
  const CartEmpty = () => {
    return (
      <>
        <div className="text-center" style={{ height: "324px" }}>
          <img
            src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
            style={{ width: "240px" }}
          />
          <p
            className="text-dark"
            style={{ fontSize: "16px", fontWeight: "550" }}
          >
            Chưa có sản phẩm nào trong giỏ hàng!
          </p>
        </div>
      </>
    );
  };

  const total = (donGia, soLuong) => {
    const result = donGia * soLuong;
    return result;
  };

  const cartTotalPrice = () => {
    let total = 0;
    cartItems.map((item) => {
      total += item.donGia * item.soLuong;
    });
    return total;
  };

  const columns = [
    {
      title: "Sản phẩm",
      width: "40%",
      align: "center",
      render: (text, item) => (
        <div className="d-flex">
          <div className="product-img">
            <img
              src={
                item &&
                item.sanPhamChiTiet &&
                item.sanPhamChiTiet.image &&
                item.sanPhamChiTiet.image.path
              }
              class=""
              alt=""
              style={{ width: "125px", height: "125px" }}
            />
          </div>
          <div className="product ms-3 text-start">
            <Tooltip
              TransitionComponent={Zoom}
              title="Xem sản phẩm"
              style={{ cursor: "pointer" }}
              placement="top-start"
            >
              <div classNamountme="product-name">
                <span
                  className="underline-custom"
                  style={{
                    whiteSpace: "pre-line",
                    fontSize: "17.5px",
                    fontWeight: "500",
                  }}
                >
                  {item.sanPhamChiTiet.sanPham.tenSanPham +
                    "\u00A0" +
                    item.sanPhamChiTiet.ram.dungLuong +
                    "/" +
                    item.sanPhamChiTiet.rom.dungLuong +
                    "GB" +
                    " " +
                    `(${item.sanPhamChiTiet.mauSac.tenMauSac})`}
                </span>
              </div>
            </Tooltip>
            <div className="mt-2">
              <span
                className="product-price txt-price"
                style={{ fontSize: "17.5px", fontWeight: "" }}
              >
                {item && item.sanPhamChiTiet.donGia
                  ? item.sanPhamChiTiet.donGia.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : ""}
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
      width: "10%",
      render: (text, item) => (
        <div>
          <span style={{ fontWeight: "", fontSize: "17px" }} className="">
            {"x" + item.soLuong}
          </span>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      align: "center",
      dataIndex: "donGia",
      width: "20%",
      render: (text, item) => (
        <span
          style={{ fontSize: "17.5px", fontWeight: "" }}
          className="txt-price"
        >
          {item &&
            total(item.donGia, item.soLuong).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "actions",
      width: "15%",
      render: (text, item) => (
        <div>
          <div className="button-container">
            <Button
              onClick={() => {
                onOpenUpdateImei();
                const imeisChuaBan = item.imeisChuaBan;
                const imeiAll = item.sanPhamChiTiet.imeis;
                const isSelected = (item) =>
                  imeisChuaBan.some(
                    (selectedItem) => selectedItem.soImei === item.soImei
                  );
                const sortedItems = [...imeiAll].sort((a, b) => {
                  const isSelectedA = isSelected(a);
                  const isSelectedB = isSelected(b);
                  if (isSelectedA && !isSelectedB) {
                    return -1;
                  } else if (!isSelectedA && isSelectedB) {
                    return 1;
                  }
                  return 0;
                });
                setImeis(sortedItems);
                setIdCartItem(item.id);
                setSelectedImei(item.imeisChuaBan);
                setSelectedImeiRefresh([]);
              }}
              className="rounded-2 button-mui me-2"
              type="primary"
              style={{ height: "38px", width: "100px", fontSize: "15px" }}
            >
              <span
                className="text-white"
                style={{
                  marginBottom: "2px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Cập Nhật
              </span>
            </Button>
            <Button
              onClick={() => removeProductInCart(item.id)}
              className="rounded-2 button-mui"
              type="danger"
              style={{ height: "38px", width: "80px", fontSize: "15px" }}
            >
              <span
                className="text-white"
                style={{
                  marginBottom: "2px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Xóa
              </span>
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "", height: "auto" }} className="mt-3">
        <div
          /* className={"p-2"} */ style={{
            /* boxShadow: "0 0.1rem 0.3rem #00000050", marginTop: "", */ height:
              "auto",
          }}
        >
          <div className="d-flex justify-content-between mt-1">
            <div className="ms-2" style={{ marginTop: "5px" }}>
              <span
                className=""
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Giỏ hàng
              </span>
            </div>
            <div className="">
              {/*
              <Button
                onClick={() => openProductsDialog()}
                className="rounded-2 me-2"
                type="warning"
                style={{ height: "38px", width: "150px", fontSize: "15px" }}
              >
                <QrCodeScannerOutlinedIcon sx={{ marginBottom: "2px" }} />
                <span className='' style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", marginTop: "1px" }}>
                  Quét barcode
                </span>
              </Button>
*/}
              <Button
                onClick={() => openProductsDialog()}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "38px", width: "140px", fontSize: "15px" }}
              >
                <span
                  className="text-white"
                  style={{
                    marginBottom: "2px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Thêm sản phẩm
                </span>
              </Button>
            </div>
          </div>
          <div
            className="mt-2"
            style={{
              borderBottom: "2px solid #C7C7C7",
              width: "100%",
              borderWidth: "2px",
            }}
          ></div>
          <div>
            {cartItemsSort && cartItemsSort.length === 0 ? (
              <CartEmpty />
            ) : (
              <TableAntd
                className="table-cart"
                columns={columns}
                dataSource={cartItemsSort}
                pagination={false}
                rowKey={"id"}
                key={"id"}
              />
            )}
          </div>
          <div className="mt-3"></div>
          {cartItems.length > 0 && (
            <div className="d-flex justify-content-end mt-3">
              <span
                className="text-dark"
                style={{
                  fontSize: "16px",
                  color: "",
                  fontWeight: "",
                  width: "130px",
                }}
              >
                Tổng cộng
              </span>
              <span className="" style={{ fontSize: "17px", color: "#dc1111" }}>
                {cartTotalPrice() &&
                  cartTotalPrice().toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </div>
          )}
        </div>
      </div>
      <ProductsDialog
        onOpenImei={handleOpenImei}
        onCloseImei={onCloseImei}
        openImei={openImei}
        isOpen={isOpen}
        open={openProducts}
        onClose={closeProductsDialog}
        data={products}
        add={addProductToCart}
      />

      <ModalUpdateImeiByProductItem
        open={openUpdateImei}
        close={onCloseUpdateImei}
        imeis={imeis}
        imeisChuaBan={selectedImei}
        refresh={selectedImeiRefresh}
        update={updateAmount}
      />

      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default memo(TabItem);
