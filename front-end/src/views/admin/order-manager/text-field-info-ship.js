import { TextField } from "@mui/material"
import { useEffect, useState } from "react";


export const TextFieldFullName = ({ confirm, fullNameDefault, getFullName, update }) => {
  const [fullName, setFullName] = useState(fullNameDefault);
  const [initial, setInitial] = useState();
  const setInitialValue = (value) => {
    setFullName(value);
    setInitial(value);
  }

  useEffect(() => {
    setFullName(fullNameDefault);
  }, [fullNameDefault])

  return (
    <>
      <TextField label="Nhập họ và tên"
        value={fullName}
        onChange={(e) => { setFullName(e.target.value) }}
        onBlur={() => {
          if (fullName !== initial) {
            getFullName(fullName); update(fullName)
          }
        }
        }
        onFocus={() => setInitialValue(fullName)}
        style={{ width: "100%" }}
        helperText={confirm === true && fullName.trim() === "" ? "Bạn chưa nhập họ và tên" : ""}
        error={confirm === true && fullName.trim() === ""}
        inputProps={{
          style: {
          },
        }}
        size='small' className='custom' />
    </>
  )
}
export const TextFieldSdt = ({ confirm, sdtDefault, getSdt, update }) => {
  const [sdt, setSdt] = useState(sdtDefault);
  const [initial, setInitial] = useState();
  const setInitialValue = (value) => {
    setSdt(value);
    setInitial(value);
  }

  useEffect(() => {
    setSdt(sdtDefault);
  }, [sdtDefault])

  return (
    <>
      <TextField label="Nhập số điện thoại"
        value={sdt}
        onChange={(e) => { setSdt(e.target.value) }}
        onBlur={() => {
          if (sdt !== initial) {
            getSdt(sdt); update(sdt)
          }
        }
        }
        onFocus={() => setInitialValue(sdt)}
        style={{ width: "100%" }}
        helperText={confirm === true && sdt.trim() === "" ? "Bạn chưa nhập số điện thoại" : ""}
        error={confirm === true && sdt.trim() === ""}
        inputProps={{
          style: {
          },
        }}
        size='small' className='custom' />
    </>
  )
}

export const TextFieldEmail = ({ emailDefault, getEmail, update }) => {
  const [customerEmail, setCustomerEmai] = useState(emailDefault);
  const [initial, setInitial] = useState();
  const setInitialValue = (value) => {
    setCustomerEmai(value);
    setInitial(value);
  }

  useEffect(() => {
    setCustomerEmai(emailDefault);
  }, [emailDefault])

  return (
    <>
      <TextField label="Nhập email"
        value={customerEmail}
        onChange={(e) => { setCustomerEmai(e.target.value) }}
        onBlur={() => {
          if (customerEmail !== initial) {
            getEmail(customerEmail); update(customerEmail)
          }
        }
        }
        onFocus={() => setInitialValue(customerEmail)}
        style={{ width: "100%" }}
        inputProps={{
          style: {
          },
        }}
        size='small' className='custom' />
    </>
  )
}

export const TextFieldPhone = ({ confirm, phoneDefault, getPhone, update }) => {
  const [customerPhone, setCustomerPhone] = useState(phoneDefault || "");
  const [initial, setInitial] = useState();
  const setInitialValue = (value) => {
    setCustomerPhone(value);
    setInitial(value);
  }

  useEffect(() => {
    setCustomerPhone(phoneDefault || "");
  }, [phoneDefault])

  return (
    <>
      <TextField label="Số điện thoại"
        value={customerPhone}
        helperText={confirm === true && customerPhone.trim() === "" ? "Bạn chưa nhập số điện thoại người nhận" : ""}
        error={confirm === true && customerPhone.trim() === ""}
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
export const TextFieldName = ({ confirm, nameDefault, getName, update }) => {
  const [customerName, setCustomerName] = useState(nameDefault || "");
  const [initial, setInitial] = useState('');
  const setInitialValue = (value) => {
    setCustomerName(value);
    setInitial(value);
  }
  useEffect(() => {
    setCustomerName(nameDefault || "");
  }, [nameDefault])

  return (
    <>
      <TextField label="Tên người nhận"
        value={customerName}
        onChange={(e) => { setCustomerName(e.target.value); }}
        helperText={confirm === true && customerName.trim() === "" ? "Bạn chưa nhập tên người nhận" : ""}
        error={confirm === true && customerName.trim() === ""}
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
export const TextFieldAddress = ({ confirm, addressDefault, getAddress, update }) => {
  const [customerAddress, setCustomerAddress] = useState(addressDefault || "");
  const [initial, setInitial] = useState('');
  const setInitialValue = (value) => {
    setCustomerAddress(value);
    setInitial(value);
  }

  useEffect(() => {
    setCustomerAddress(addressDefault || "");
  }, [addressDefault])
  return (
    <>
      <TextField label="Địa chỉ"
        value={customerAddress}
        helperText={confirm === true && customerAddress.trim() === "" ? "Bạn chưa nhập địa chỉ" : ""}
        error={confirm === true && customerAddress.trim() === ""}
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
