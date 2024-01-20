import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import { TextField } from "@mui/material";
import axios from "axios";
import { Notistack, OrderStatusString, OrderTypeString } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import LoadingIndicator from "../../../utilities/loading";
import { ScannerBarcodeOrder } from "./AlertDialogSlide";

const RefundOrder = () => {
  const navigate = useNavigate();
  const [orderCode, setOrderCode] = useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const getOrderItemsByIdScanner = async (code) => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/orders/${code.trim()}`)
      .then((response) => {
        const data = response.data.data;
        if (
          (data.trangThai === OrderStatusString.HAD_PAID ||
            data.trangThai === OrderStatusString.SUCCESS_DELIVERY || data.trangThai === OrderStatusString.REFUND_FULL || data.trangThai === OrderStatusString.REFUND_A_PART
          )
        ) {
          setIsLoading(false);
          handleRedirectRefundOrderDetail();
        }
        else {
          setIsLoading(false);
          handleOpenAlertVariant("Đơn hàng không hợp lệ!", Notistack.ERROR);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleOpenAlertVariant("Không tìm thấy đơn hàng!", Notistack.ERROR);
        handleCloseOpenScanner();
      });
  };

  const getOrderItemsById = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/orders/${orderCode.trim()}`)
      .then((response) => {
        const data = response.data.data;
        if (
          (data.trangThai === OrderStatusString.HAD_PAID ||
            data.trangThai === OrderStatusString.SUCCESS_DELIVERY || data.trangThai === OrderStatusString.REFUND_FULL || data.trangThai === OrderStatusString.REFUND_A_PART
          )
        ) {
          setIsLoading(false);
          handleRedirectRefundOrderDetail();
        }

        else {
          setIsLoading(false);
          handleOpenAlertVariant("Đơn hàng không hợp lệ!", Notistack.ERROR);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleOpenAlertVariant("Không tìm thấy đơn hàng!", Notistack.ERROR);
      });
  };

  const handleRedirectRefundOrderDetail = () => {
    navigate(`/dashboard/refund-order/${orderCode}`);
  };

  const [openScanner, setOpenScanner] = useState(false);
  const [scannerRef, setScannerRef] = useState([]);

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseOpenScanner = () => {
    setOpenScanner(false);
  };

  // useEffect(() => {
  // }, []);

  return (
    <>
      <div
        className=""
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
          height: "675px",
        }}
      >
        <div className="text-center">
          <div className="mt-4 pt-3">
            <img
              className=""
              style={{ width: "500px", height: "300px" }}
              src="https://shippingchimp.com/blog/wp-content/uploads/2020/08/10_5_eCommerce-Brands-That-Have-Steal-Worthy-Return-Policies.png"
              alt=""
            />
            <div className="header-title mt-2">
              <TextField
                label="Tìm Kiếm Đơn Hàng"
                onChange={(e) => setOrderCode(e.target.value)}
                value={orderCode}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "500px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                onClick={() => getOrderItemsById()}
                className="rounded-2 ms-2 button-mui"
                style={{ height: "38px", width: "100px", fontSize: "15px" }}
              >
                <span
                  className="text-white"
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  Tìm Kiếm
                </span>
              </Button>
              <Button
                onClick={() => {
                  handleOpenScanner();
                  setScannerRef([]);
                }}
                className="rounded-2 me-2 ms-2"
                type="warning"
                style={{ height: "38px", width: "120px", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "2px",
                  }}
                >
                  Quét QrCode
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4"></div>
        <ScannerBarcodeOrder
          open={openScanner}
          close={handleCloseOpenScanner}
          getResult={getOrderItemsByIdScanner}
          refresh={scannerRef}
        />
        {isLoading && <LoadingIndicator />}
      </div>
    </>
  );
};
export default RefundOrder;
