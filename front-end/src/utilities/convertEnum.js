import {
  StatusDiscount,
  StatusDiscountNumber,
} from "../views/admin/order-manager/enum";

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
