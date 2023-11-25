import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Pagination,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import moment from "moment";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Zoom from "@mui/material/Zoom";
import * as dayjs from "dayjs";
import {
  Notistack,
  OrderStatusString,
  OrderTypeString,
  StatusCommonProducts,
} from "./enum";
import LoadingIndicator from "../../../utilities/loading";
import { PaymentDialog } from "./AlertDialogSlide";
import useCustomSnackbar from "../../../utilities/notistack";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderCode, setOrderCode] = useState(searchParams.get("vnp_TxnRef"));
  const [orderInfo, setOrderInfo] = useState(searchParams.get("vnp_OrderInfo"));
  const [orderTotal, setOrderTotal] = useState(searchParams.get("vnp_Amount"));
  const [orderTransaction, setOrderTransaciton] = useState(
    searchParams.get("vnp_TransactionNo")
  );
  const [datePayment, setDatePayment] = useState(
    searchParams.get("vnp_PayDate")
  );
  const [status, setStatus] = useState(
    searchParams.get("vnp_TransactionStatus")
  );

  const [code, setCode] = useState("");
  const [info, setInfo] = useState("");
  const [total, setTotal] = useState("");
  const [transaction, setTransaction] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("");

  const momentDate = moment(date, "YYYYMMDDHHmmss");

  const outputDate = momentDate.format("HH:mm:ss - DD/MM/YYYY");

  const handleRedirectPayment = (url) => {
    navigate(url);
  };

  const handleGetUrlRedirectPayment = async () => {
    setIsLoading(true);
    const vnpayReq = {
      total: parseInt(orderTotal / 100),
      info: orderInfo,
      code: orderCode,
    };
    try {
      await axios
        .post(`http://localhost:8080/api/vnpay/payment`, vnpayReq, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setIsLoading(false);
          handleRedirectPayment(response.data.data);
        });
    } catch (error) {
      const message = error.response.data.message;
      setIsLoading(false);
      handleOpenAlertVariant(message, Notistack.ERROR);
      console.log(error.response.data);
    }
  };

  const updatePaymentOrder = async () => {
    setIsLoading(true);
    const vnpayReq = {
      total: parseInt(orderTotal),
      code: orderCode,
      info: orderInfo,
      paymentTime: datePayment,
      transactionId: orderTransaction,
      transactionStatus: status,
      personConfirm: null,
    };
    try {
      await axios
        .put(`http://localhost:8080/api/vnpay/update-order`, vnpayReq, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data.data;
          setIsLoading(false);
          setCode(data.orderCode);
          setTotal(data.totalPrice);
          setDate(data.paymentTime);
          setTransaction(data.transactionId);
          setState(data.status);
          setInfo(data.orderInfo);
          console.log(data);
        });
    } catch (error) {
      const message = error.response.data.message;
      setIsLoading(false);
      handleOpenAlertVariant(message, Notistack.ERROR);
      console.log(error.response.data);
    }
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      updatePaymentOrder();
    }
  }, []);

  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
          height: "670px",
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <div className="img-success">
            {!isLoading && state === "00" ? (
              <img
                style={{ width: "90px", height: "90px" }}
                src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png"
              />
            ) : !isLoading && state === "01" ? (
              <img
                style={{ width: "90px", height: "90px" }}
                src="https://www.freeiconspng.com/uploads/round-error-icon-16.jpg"
              />
            ) : null}
          </div>
          <div className="header-sucess mt-3">
            <span style={{ fontSize: "25px", fontWeight: "500" }}>
              {!isLoading && state === "00"
                ? "Thanh toán thành công"
                : !isLoading && state === "01"
                ? "Thanh toán thất bại"
                : null}
            </span>
          </div>
          <div className="content-order-code mt-3">
            Mã đơn hàng:{" "}
            <span className="" style={{ fontWeight: "500" }}>
              {"#"}
              {!isLoading && info}
            </span>
          </div>

          {!isLoading && state === "00" && (
            <div className="content-order-total mt-3">
              Số tiền thanh toán:{" "}
              <span style={{ fontWeight: "500", color: "#dc1111" }}>
                {total &&
                  total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </div>
          )}

          {!isLoading && state === "00" && (
            <div className="content-order-transaction mt-3">
              Mã giao dịch:
              <span className="" style={{ fontWeight: "500" }}>
                {" " + transaction}
              </span>
            </div>
          )}
          <div className="content-order-date-payment mt-3">
            Thời gian:
            <span
              className=""
              style={{ fontWeight: "500" }}
            >{` ${outputDate}`}</span>
          </div>
          {!isLoading && state === "00" ? (
            <Button
              onClick={() => {
                navigate(`/dashboard/point-of-sales/${info}`);
              }}
              className="button-mui mt-4"
              type="primary"
              style={{ height: "47px", width: "250px", fontSize: "15px" }}
            >
              <span
                className=""
                style={{
                  marginBottom: "2px",
                  fontWeight: "400",
                  fontSize: "17px",
                }}
              >
                TIẾP TỤC
              </span>
            </Button>
          ) : (
            <div className="mt-4">
              <Button
                onClick={() => {
                  navigate(`/dashboard/point-of-sales/${info}`);
                }}
                className="ant-btn-light me-2"
                style={{ height: "47px", width: "200px", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{
                    marginBottom: "2px",
                    fontWeight: "400",
                    fontSize: "17px",
                  }}
                >
                  QUAY VỀ BÁN HÀNG
                </span>
              </Button>
              <Button
                onClick={() => {
                  handleGetUrlRedirectPayment();
                }}
                className="button-mui"
                type="primary"
                style={{ height: "47px", width: "200px", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{
                    marginBottom: "2px",
                    fontWeight: "400",
                    fontSize: "17px",
                  }}
                >
                  THANH TOÁN LẠI
                </span>
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4"></div>
      </div>
      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default PaymentSuccess;
