import { TextField } from "@mui/material"
import { useEffect, useState } from "react";

export const TextFieldPhone = ({ phoneDefault, getPhone }) => {
  const [customerPhone, setCustomerPhone] = useState(phoneDefault);

  useEffect(() => {
    setCustomerPhone(phoneDefault);
  }, [phoneDefault])

  return (
    <>
      <TextField label="Số điện thoại"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        onBlur={() => getPhone(customerPhone)}
        style={{ width: "100%" }}
        inputProps={{
          style: {
          },
        }}
        size='medium' className='mt-3' />
    </>
  )
}
export const TextFieldName = ({ nameDefault, getName }) => {
  const [customerName, setCustomerName] = useState(nameDefault);

  useEffect(() => {
    setCustomerName(nameDefault);
  }, [nameDefault])

  return (
    <>
      <TextField label="Tên người nhận"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        onBlur={() => getName(customerName)}
        style={{ width: "100%" }}
        size='medium' className='mt-1' />
    </>
  )
}
export const TextFieldAddress = ({ addressDefault, getAddress }) => {
  const [customerAddress, setCustomerAddress] = useState(addressDefault);

  useEffect(() => {
    setCustomerAddress(addressDefault);
  }, [addressDefault])

  return (
    <>
      <TextField label="Địa chỉ"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
        onBlur={() => getAddress(customerAddress)}
        style={{ width: "100%" }}
        size='medium' className='mt-3' />
    </>
  )
}
