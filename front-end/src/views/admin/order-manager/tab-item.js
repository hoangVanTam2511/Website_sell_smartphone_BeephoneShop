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
import { BiBarcodeReader } from "react-icons/bi";
import {
  ModalUpdateImeiByProductItem,
  ProductDetailsDialog,
  ProductsDialog,
  ScannerBarcode,
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
import Scanner from "./scanner";
import { FaBarcode } from "react-icons/fa6";
import { request } from '../../../store/helpers/axios_helper'


const TabItem = ({
  scanner,
  openScanner,
  closeScanner,
  openUpdateImei,
  onCloseUpdateImei,
  onOpenScanner,
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
  const [scannerRef, setScannerRef] = useState([]);

  const handleOpenImei = () => {
    onOpenImei();
  };


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
    // getAllProducts();
    openDialogProducts();
  };

  const getAllProducts = async () => {
    request('GET',`/api/products/product-items`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error");
      });
  };
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
        <div className="text-center mt-4" style={{ height: "324px" }}>
          <img
            src="https://res.cloudinary.com/dqwfbbd9g/image/upload/v1701448962/yy04ozpcgnsz3lv4r2h2.png"
            style={{ width: "290px" }}
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
      if (item.sanPhamChiTiet.donGiaSauKhuyenMai !== null && item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0) {
        total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
      }
      else {
        total += item.donGia * item.soLuong;
      }
    });
    return total;
  };

  const countPrice = (price, afterDiscount) => {
    return price - afterDiscount;

  }

  const columns = [
    {
      title: "Sản phẩm",
      width: "40%",
      align: "center",
      render: (text, item) => (
        <div className="d-flex">
          <div className="product-img" style={{ position: "relative" }}>
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
            {item &&
              item.sanPhamChiTiet.donGiaSauKhuyenMai !== null && item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0 &&
              <div
                className="category"
                style={{
                  userSelect: "none",
                  backgroundColor: "#ffcc00",
                  position: "absolute",
                  top: "0px",
                  borderTopLeftRadius: `8px`,
                  fontSize: "11px",
                  borderTopRightRadius: `20px`,
                  borderBottomRightRadius: `20px`,
                  fontWeight: "600",
                  padding: "4px 8px", // Add padding for better visibility
                  // width: "auto",
                  // height: "30px"
                  marginLeft: "10px",
                  // marginTop: "25px",
                }}
              >
                Giảm{' '}
                {countPrice(item.sanPhamChiTiet.donGia, item.sanPhamChiTiet.donGiaSauKhuyenMai).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
                }
              </div>
            }
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
              <span className="txt-price"
                style={{ fontSize: "17.5px", fontWeight: "" }}
              >
                {item && item.sanPhamChiTiet.donGiaSauKhuyenMai
                  ? item.sanPhamChiTiet.donGiaSauKhuyenMai.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  : ""}
              </span>
              <span
                className={item.sanPhamChiTiet.donGiaSauKhuyenMai !== null && item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0 ? "txt-price-discount ms-2" : "txt-price"}
                style={{ fontSize: "17px", fontWeight: "" }}
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
          {(item &&
            total(item.soLuong, item.sanPhamChiTiet.donGiaSauKhuyenMai !== null && item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0 ? item.sanPhamChiTiet.donGiaSauKhuyenMai : item.sanPhamChiTiet.donGia).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })) ||
            0}
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


  const [result, setResult] = useState("");

  const getResult = (data) => {
    setResult(data);
  }

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
            <div className="d-flex">
              <Button
                onClick={() => { onOpenScanner(); setScannerRef([]) }}
                className="rounded-2 me-2"
                type="warning"
                style={{ height: "38px", width: "120px", fontSize: "15px" }}
              >
                <span className='' style={{ fontSize: "15px", fontWeight: "500", marginBottom: "2px" }}>
                  Quét Barcode
                </span>
              </Button>
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

      <ScannerBarcode open={openScanner} close={closeScanner} getResult={scanner} refresh={scannerRef} />

      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default memo(TabItem);
