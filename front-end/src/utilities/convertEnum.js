import {
  StatusCommonProducts,
  StatusCommonProductsNumber,
  StatusDiscount,
  StatusDiscountNumber,
  TypeCamera,
  TypeCameraNumber,
  TypeDiscountNumber,
  TypeDiscountString,
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
    case StatusDiscountNumber.TAM_DUNG:
      statusNumber = StatusDiscount.TAM_DUNG;
      break;
    default:
      statusNumber = ""; // Nếu giá trị không khớp với bất kỳ trạng thái nào.
  }

  return statusNumber;
};

export const ConvertTypeVoucherNumberToString = (EnumNumber) => {
  let statusNumber;

  switch (EnumNumber) {
    case TypeDiscountNumber.VND:
      statusNumber = TypeDiscountString.VND;
      break;
    case TypeDiscountNumber.PERCENT:
      statusNumber = TypeDiscountString.PERCENT;
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

export const ConvertCameraTypeToString = (EnumNumber) => {
  let statusNumber;

  switch (EnumNumber) {
    case TypeCameraNumber.STANDARD_CAMERA:
      statusNumber = TypeCamera.STANDARD_CAMERA;
      break;
    case TypeCameraNumber.WIDE_CAMERA:
      statusNumber = TypeCamera.WIDE_CAMERA;
      break;
    case TypeCameraNumber.ULTRA_WIDE_CAMERA:
      statusNumber = TypeCamera.ULTRA_WIDE_CAMERA;
      break;
    case TypeCameraNumber.TELEPHOTO_CAMERA:
      statusNumber = TypeCamera.TELEPHOTO_CAMERA;
      break;
    case TypeCameraNumber.PERISCOPE_TELEPHOTO_CAMERA:
      statusNumber = TypeCamera.PERISCOPE_TELEPHOTO_CAMERA;
      break;
    case TypeCameraNumber.MARCO_CAMERA:
      statusNumber = TypeCamera.MARCO_CAMERA;
      break;
    case TypeCameraNumber.DEPTH_CAMERA:
      statusNumber = TypeCamera.DEPTH_CAMERA;
      break;
    default:
      statusNumber = ""; // Nếu giá trị không khớp với bất kỳ trạng thái nào.
  }

  return statusNumber;
};
