import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { IconButton, Tooltip, Zoom } from '@mui/material';
import { IoPersonCircle } from 'react-icons/io5';
import { AutoComplete, InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


const InputSearchCustomer = ({ getCustomer, handleOpenDialogCustomers }) => {


  const [customers, setCustomers] = useState([]);
  const [dataCus, setDataCus] = useState("");
  const [customerInput, setCustomerInput] = useState("");
  const [loadingChild, setLoadingChild] = useState(false);

  const handleSearchCustomers = async () => {
    setLoadingChild(true);
    await axios.get(`http://localhost:8080/khach-hang/search-all`, {
      params: {
        tenKH: dataCus,
        page: 1,
      }
    })
      .then(response => {
        const data = response.data.data;
        const format = data && data.map((customer) =>
          customer.hoVaTen + " - " +
          customer.ma + " - " +
          customer.soDienThoai + " - " +
          customer.email + " - " +
          customer.id
        );
        setCustomers(format);
        setLoadingChild(false);
      }).catch(error => {
        console.error("Error");
      })
  }

  useEffect(() => {
    handleSearchCustomers();
  }, [dataCus])

  const handleGetDataCustomer = value => {
    const newValue = value.split(" - ")[0];
    setDataCus(newValue);
  }
  const handleGetSelectDataCustomer = value => {
    const newValue = String(value.split(" - ")[2]) || String(value.split(" - ")[3]);
    setCustomerInput(newValue);
    getCustomer(String(value.split(" - ")[4]));
  }


  const data = customers.filter((customer) => {
    const phone = customer.split(" - ")[2] || "";
    const email = customer.split(" - ")[3] || "";

    return phone === customerInput || email === customerInput;
  });
  // const handleKeyDown = (event) => {
  //   if (customerInput != "") {
  //     event.preventDefault();
  //   }
  // }

  const removeCustomerInput = () => {
    setDataCus("");
    setCustomerInput("");
    getCustomer("");
  }

  return (
    <>
      <InputGroup
        className={`${customerInput == "" ? "" : "active"}`}
        inside style={{
          width: "auto", height: 38, position: ""
        }}>
        <InputGroup.Button tabIndex={-1} className="disable-hover" onClick={() => alert("he")}>
          {customerInput != "" ?
            <Tooltip title="Xem khách hàng">
              <IoPersonCircle style={{ fontSize: "23px" }} />
            </Tooltip> :
            <svg style={{ color: "darkgray", marginBottom: "1px" }} fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
        </InputGroup.Button>
        <AutoComplete className={``}
          // onKeyDown={handleKeyDown}
          // readOnly={customerInput != "" ? true : false}
          value={dataCus}
          onChange={handleGetDataCustomer}
          onSelect={handleGetSelectDataCustomer}
          renderMenuItem={item => {
            const [hoVaTen, ma, soDienThoai] = item.split(" - ");
            return (
              <>
                {/*
                <div className='text-center'>
                  <CircularProgress
                    size={25}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  />
                </div>
*/}
                {customerInput != "" ?
                  <div className="text-dark" style={{ fontSize: "14.5px" }}>
                    <div className="d-flex justify-content-between">
                      <div className='info-left'>
                        <span>{hoVaTen + " - " + ma}</span>
                        <div className='info-lett-bottom'>
                          <span>SĐT: {soDienThoai}</span>
                        </div>
                      </div>
                      <div className='info-right mt-2 me-2'>
                        <Tooltip TransitionComponent={Zoom} title="Cập nhật">
                          <BorderColorOutlinedIcon color='primary' />
                        </Tooltip>
                      </div>
                    </div>
                  </div> :
                  <div className="text-dark" style={{ fontSize: "14.5px" }}>
                    <div className="d-flex justify-content-between">
                      <div className='info-left'>
                        <span>{hoVaTen + " - " + ma}</span>
                        <div className='info-lett-bottom'>
                          <span>SĐT: {soDienThoai}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </>
            )
          }
          }
          data={customerInput != "" ? data : customers} placeholder="Tìm kiếm khách hàng" >
        </AutoComplete>
        <InputGroup.Addon
          className="disable-hover1" style={{ position: "absolute", bottom: "0px" }}>
          {customerInput != "" ?
            <Tooltip
              onClick={(e) => { removeCustomerInput(e.stopPropagation()); }} style={{}} title="Bỏ chọn" className='ms-2 open-click' TransitionComponent={Zoom}>
              <IconButton size='small'>
                <CloseOutlined style={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip> :
            <Tooltip onClick={() => {
              handleOpenDialogCustomers();
            }} style={{}} title="Thêm mới khách hàng" className='ms-2 open-click' TransitionComponent={Zoom}>
              <IconButton size='small'>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          }
        </InputGroup.Addon>
      </InputGroup>
    </>
  )
}

export default InputSearchCustomer;
