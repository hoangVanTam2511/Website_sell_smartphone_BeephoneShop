import { TextField } from "@mui/material"
import { useEffect, useState } from "react";

export const TextFieldPhone = ({ phoneDefault, getPhone, update }) => {
  const [customerPhone, setCustomerPhone] = useState(phoneDefault);
  const [initial, setInitial] = useState();
  const setInitialValue = (value) => {
    setCustomerPhone(value);
    setInitial(value);
  }

  useEffect(() => {
    setCustomerPhone(phoneDefault);
  }, [phoneDefault])

  return (
    <>
      <TextField label="Số điện thoại"
        value={customerPhone}
        onChange={(e) => { setCustomerPhone(e.target.value) }}
        onBlur={() => {
          if (customerPhone !== initial) {
            getPhone(customerPhone); update(customerPhone)
          }
        }
        }
        onFocus={() => setInitialValue(customerPhone)}
        style={{ width: "100%" }}
        inputProps={{
          style: {
          },
        }}
        size='medium' className='mt-3 custom' />
    </>
  )
}
export const TextFieldName = ({ nameDefault, getName, update }) => {
  const [customerName, setCustomerName] = useState(nameDefault);
  const [initial, setInitial] = useState('');
  const setInitialValue = (value) => {
    setCustomerName(value);
    setInitial(value);
  }
  useEffect(() => {
    setCustomerName(nameDefault);
  }, [nameDefault])

  return (
    <>
      <TextField label="Tên người nhận"
        value={customerName}
        onChange={(e) => { setCustomerName(e.target.value); }}
        onBlur={(e) => {
          if (customerName !== initial) {
            getName(customerName); update(customerName)
          }
        }}
        onFocus={() => setInitialValue(customerName)}
        style={{ width: "100%" }}
        size='medium' className='mt-1 custom' />
    </>
  )
}
export const TextFieldAddress = ({ addressDefault, getAddress, update }) => {
  const [customerAddress, setCustomerAddress] = useState(addressDefault);
  const [initial, setInitial] = useState('');
  const setInitialValue = (value) => {
    setCustomerAddress(value);
    setInitial(value);
  }

  useEffect(() => {
    setCustomerAddress(addressDefault);
  }, [addressDefault])
  return (
    <>
      <TextField label="Địa chỉ"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
        onBlur={() => {
          if (customerAddress !== initial) {
            getAddress(customerAddress); update(customerAddress)
          }
        }}
        onFocus={() => setInitialValue(customerAddress)}
        style={{ width: "100%" }}
        size='medium' className='mt-3 custom' />
    </>
  )
}
export const TextFieldNote = ({ noteDefault, getNote, update }) => {
  const [customerNote, setCustomerNote] = useState(noteDefault);
  const [initial, setInitial] = useState('');
  const setInitialValue = (value) => {
    setCustomerNote(value);
    setInitial(value);
  }
  useEffect(() => {
    setCustomerNote(noteDefault);
  }, [noteDefault])

  return (
    <>
      <TextField
        multiline
        rows={1.5}
        rowsMax={5}
        label={<span>Ghi chú</span>}
        value={customerNote}
        onChange={(e) => setCustomerNote(e.target.value)}
        onBlur={() => {
          if (customerNote !== initial) {
            getNote(customerNote); update(customerNote)
          }
        }}
        onFocus={() => setInitialValue(customerNote)}
        style={{ width: "100%" }}
        inputProps={{
          style: {
            width: "720px",
            paddingBottom: "25px"
          },
        }}
        size='medium' className='mt-3 custom' />
    </>
  )
}
