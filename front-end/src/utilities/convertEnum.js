import {
  StatusCommonProducts,
  StatusCommonProductsNumber,
  StatusDiscount,
  StatusDiscountNumber,
} from "../views/admin/order-manager/enum";
import {
  StatusAccountCus,
  StatusCusNumber,
} from "../views/admin/account-manager/khachhang/enum";

export const ConvertStatusVoucherNumberToString = (EnumNumber) => {
  let statusNumber;

  switch (EnumNumber) {
    case StatusDiscountNumber.CHUA_DIEN_RA:
      statusNumber = StatusDiscount.CHUA_DIEN_RA;
      break;
    case StatusDiscountNumber.HOAT_DONG:
      statusNumber = StatusDiscount.HOAT_DONG;
      break;
    case StatusDiscountNumber.NGUNG_HOAT_DONG:
      statusNumber = StatusDiscount.NGUNG_HOAT_DONG;
      break;
    case StatusDiscountNumber.DA_HUY:
      statusNumber = StatusDiscount.DA_HUY;
      break;
    default:
      statusNumber = ""; // Nếu giá trị không khớp với bất kỳ trạng thái nào.
  }

  return statusNumber;
};

export const ConvertStatusProductsNumberToString = (EnumNumber) => {
  let statusNumber;

  switch (EnumNumber) {
    case StatusCommonProductsNumber.ACTIVE:
      statusNumber = StatusCommonProducts.ACTIVE;
      break;
    case StatusCommonProductsNumber.IN_ACTIVE:
      statusNumber = StatusCommonProducts.IN_ACTIVE;
      break;
    default:
      statusNumber = ""; // Nếu giá trị không khớp với bất kỳ trạng thái nào.
  }

  return statusNumber;
};

export const ConvertStatusToString = (EnumNumber) => {
  let statusNumber;

  switch (EnumNumber) {
    case StatusAccountCus.HOAT_DONG:
      statusNumber = StatusCusNumber.HOAT_DONG;
      break;
    case StatusDiscountNumber.NGUNG_HOAT_DONG:
      statusNumber = StatusCusNumber.NGUNG_HOAT_DONG;
      break;
    case StatusDiscountNumber.LAM_VIEC:
      statusNumber = StatusCusNumber.LAM_VIEC;
      break;
    case StatusDiscountNumber.DA_NGHI:
      statusNumber = StatusCusNumber.DA_NGHI;
      break;
    default:
      statusNumber = ""; // Nếu giá trị không khớp với bất kỳ trạng thái nào.
  }

  return statusNumber;
};
