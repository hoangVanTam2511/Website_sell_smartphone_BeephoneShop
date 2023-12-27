import React, { useEffect, useState, memo } from 'react'
import { TextField, FormControl, InputLabel, Select as SelectMui, OutlinedInput, MenuItem, IconButton, Tooltip, Zoom, FormHelperText } from '@mui/material'
import style from './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Table as TableAntd } from 'antd'
import { ModalUpdateImeiByProductItem, ProductDetailsDialog, ProductsDialog } from './AlertDialogSlide';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import EditIcon from '@mui/icons-material/Edit';
import { parseInt } from 'lodash';
import { Notistack } from './enum';
import useCustomSnackbar from '../../../utilities/notistack';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingIndicator from '../../../utilities/loading';
import InputNumberAmountCart from './input-number-amount-cart';
import { TextFieldAddress, TextFieldName, TextFieldNote, TextFieldPhone } from './text-field-info-ship';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const DeliveryShipInfo = ({
  customerAddressShip, customerNameShip, customerPhoneShip, confirm,
  customerWardShip, customerDistrictShip, customerProvinceShip, getNameShip, getAddressShip, getPhoneShip,
  getDistrictShip, getWardShip, getProvinceShip, getNoteShip, customerNoteShip, loading
  , delivery, getShipFee, isShow, getIsShow, update, updateName, updatePhone, updateNote, updateAddress
}) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [receiveDate, setReceiveDate] = useState();
  const [customerName, setCustomerName] = useState(customerNameShip);
  const [customerPhone, setCustomerPhone] = useState(customerPhoneShip);
  const [customerAddress, setCustomerAddress] = useState(customerAddressShip);
  const [customerNote, setCustomerNote] = useState(customerNoteShip);
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerDistrict, setCustomerDistrict] = useState("");
  const [customerWard, setCustomerWard] = useState("");

  useEffect(() => {
    fetchDataFirst();
  }, [customerDistrictShip,
    customerProvinceShip, customerWardShip])

  useEffect(() => {
    if (!isShow) {
      setCustomerName(customerNameShip);
      setCustomerPhone(customerPhoneShip);
      setCustomerAddress(customerAddressShip);
      setCustomerNote(customerNoteShip);
    }
  }, [customerPhoneShip, customerNameShip, customerAddressShip, customerNoteShip])

  const fetchDataFirst = async () => {
    if (customerWardShip && customerProvinceShip && customerDistrictShip) {
      const province = provinces.find((item) => item.ProvinceName === customerProvinceShip);
      if (province) {
        await Promise.all([
          getAllDistrictGhnByIdProvinceByCustomer(province.ProvinceID, customerDistrictShip, customerWardShip),
        ]);
      }
    }
    else if (!customerWardShip && customerProvinceShip && customerDistrictShip) {
      const province = provinces.find((item) => item.ProvinceName === customerProvinceShip);
      if (province) {
        await Promise.all([
          getAllDistrictGhnByIdProvinceByCustomer(province.ProvinceID, customerDistrictShip, ""),
        ]);
      }
    }
    else if (!customerWardShip && customerProvinceShip && !customerDistrictShip) {
      const province = provinces.find((item) => item.ProvinceName === customerProvinceShip);
      if (province) {
        await Promise.all([
          getAllDistrictGhnByIdProvinceByCustomer(province.ProvinceID, "", ""),
        ]);

      }
    }
    else if (!customerWardShip && !customerProvinceShip && !customerDistrictShip) {
      getAllProvinceGhn();
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedWard("");
      setDistricts([]);
      setWards([]);
    }
    setCustomerName(customerNameShip);
    setCustomerPhone(customerPhoneShip);
    setCustomerAddress(customerAddressShip);
    setCustomerNote(customerNoteShip);
    getIsShow(false);
  };

  const tokenGhn = "62124d79-4ffa-11ee-b1d4-92b443b7a897";

  const getShipFeeGhn = () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
      params: {
        from_district_id: shopDistrictId,
        from_ward_code: shopWardCode,
        service_id: serviceID,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
        weight: 240,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        getShipFee(response.data.data.total);
      }
    )
  }

  const getAllWardGhnByIdDistrictByCustomer = async (provinceId, districtId, wardName) => {
    await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
      params: {
        district_id: districtId,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        const data = response.data.data;
        setWards(data);
        const ward = data.find((item) => item.WardName === wardName);

        setSelectedProvince(provinceId);
        setSelectedDistrict(districtId);

        if (wardName === "") {
          setSelectedWard("");
        }
        else {
          setSelectedWard(ward.WardCode);
        }
      }
    )
  }

  const getAllWardGhnByIdDistrict = async (districtId) => {
    await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
      params: {
        district_id: districtId,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        setWards(response.data.data);
      }
    )
  }

  const getAllDistrictGhnByIdProvinceByCustomer = async (provinceId, districtName, wardName) => {
    try {
      const response = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
        params: {
          province_id: provinceId,
        },
        headers: {
          token: tokenGhn,
          Accept: 'application/json',
        }
      });

      const data = response.data.data;
      setDistricts(data);

      if (districtName === "") {
        setSelectedProvince(provinceId);
        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
      }
      else {
        const district = data.find((item) => item.DistrictName === districtName);
        await getAllWardGhnByIdDistrictByCustomer(provinceId, district.DistrictID, wardName);
      }

    } catch (error) {
    }
  }

  const getAllDistrictGhnByIdProvince = async (provinceId) => {
    await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
      params: {
        province_id: provinceId,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        setDistricts(response.data.data);
      }
    )
  }

  const getAllProvinceGhn = async () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        setProvinces(response.data.data);
      }
    )
  }

  const shopID = 189389;
  const serviceID = 53320;
  const shopDistrictId = 1482;
  const shopWardCode = 11007;

  const getReceiveDate = () => {
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`, {
      params: {
        ShopID: shopID,
        service_id: serviceID,
        from_district_id: shopDistrictId,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
      },
      headers: {
        token: tokenGhn,
        Accept: 'application/json',
      }
    }).then(
      (response) => {
        let getDate = response.data.data.leadtime;
        getDate = convertTimeToDate(getDate);
        setReceiveDate(getDate);
      }
    )
  }

  const convertTimeToDate = (receiveDate) => {
    const date = new Date(receiveDate * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  useEffect(() => {
    if (selectedProvince != "" && selectedDistrict != "" && selectedWard != "" && delivery === true) {
      getReceiveDate();
      getShipFeeGhn();
    }
    else {
      getShipFee(0);
    }
  }, [selectedWard, selectedDistrict, selectedProvince, delivery])

  useEffect(() => {
    getAllProvinceGhn();
  }, []);

  const handleChangeProvince = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    getProvinceShip(value);
    getAllDistrictGhnByIdProvince(value);
    getAllWardGhnByIdDistrict(3450);
    setSelectedDistrict("");
    setSelectedWard("");

    const province = provinces.find((item) => item.ProvinceID === value);
    update("", "", "", province.ProvinceName, "", "", "");
  };

  const handleChangeWard = (event) => {
    const value = event.target.value;
    getWardShip(value);
    setSelectedWard(value);

    const ward = wards.find((item) => item.WardCode === value);
    update("", "", "", "", "", ward.WardName, "");
  };

  const handleChangeDistrict = (event) => {
    const value = event.target.value;
    getDistrictShip(value);
    setSelectedDistrict(value);
    getAllWardGhnByIdDistrict(value);
    setSelectedWard("");

    const district = districts.find((item) => item.DistrictID === value);
    update("", "", "", "", district.DistrictName, "", "");
  };

  return (
    <>
      {!loading && delivery == true ?
        <>
          <div className='' style={{ marginTop: "31px" }}>
            <div className='mt-3 ms-2'>
              <div className='mt-4'>
                {delivery ?
                  <div style={{ width: "98.5%" }} className="">
                    <div>
                      <TextFieldName nameDefault={customerName} getName={getNameShip} update={updateName} confirm={confirm} />
                    </div>
                    <div>
                      <TextFieldPhone phoneDefault={customerPhone} getPhone={getPhoneShip} update={updatePhone} confirm={confirm} />
                    </div>
                    <div className='d-flex mt-3'>
                      <FormControl error={confirm && selectedProvince === ""} style={{ width: "100%" }}>
                        <InputLabel >Tỉnh / Thành Phố</InputLabel>
                        <SelectMui
                          className='custom'
                          onChange={handleChangeProvince}
                          input={<OutlinedInput label="Tỉnh / Thành Phố" />}
                          value={selectedProvince}
                        >
                          {provinces && provinces.map((province) => (
                            <MenuItem
                              key={province.ProvinceID}
                              value={province.ProvinceID}
                            >
                              {province.ProvinceName}
                            </MenuItem>
                          ))}
                        </SelectMui>
                        {confirm && selectedProvince === "" &&
                          <FormHelperText>Bạn chưa chọn Tỉnh / Thành Phố!</FormHelperText>
                        }
                      </FormControl>
                      <FormControl error={confirm && selectedDistrict === ""} style={{ width: "100%" }} className='ms-3'>
                        <InputLabel >Quận / Huyện</InputLabel>
                        <SelectMui
                          className='custom'
                          label="Quận / Huyện"
                          input={<OutlinedInput label="Quận / Huyện" />}
                          value={selectedDistrict}
                          onChange={handleChangeDistrict}
                        >
                          {districts && districts
                            .map((district) => (
                              <MenuItem
                                key={districts.DistrictID}
                                value={district.DistrictID}
                              >
                                {district.DistrictName}
                              </MenuItem>
                            ))}
                        </SelectMui>
                        {confirm && selectedDistrict === "" &&
                          <FormHelperText>Bạn chưa chọn Quận / Huyện!</FormHelperText>
                        }
                      </FormControl>
                      <FormControl error={confirm && selectedWard === ""} style={{ width: "100%" }} className='ms-3'>
                        <InputLabel>Phường / Xã</InputLabel>
                        <SelectMui
                          className='custom'
                          onChange={handleChangeWard}
                          input={<OutlinedInput label="Phường / Xã" />}
                          value={selectedWard}
                        >
                          {wards && wards.map((ward) => (
                            <MenuItem
                              key={ward.WardCode}
                              value={ward.WardCode}
                            >
                              {ward.WardName}
                            </MenuItem>
                          ))}
                        </SelectMui>
                        {confirm && selectedWard === "" &&
                          <FormHelperText>Bạn chưa chọn Phường / Xã!</FormHelperText>
                        }
                      </FormControl>
                    </div>
                    <div>
                      <TextFieldAddress addressDefault={customerAddress} getAddress={getAddressShip} update={updateAddress} confirm={confirm} />
                    </div>
                    <TextFieldNote noteDefault={customerNote} getNote={getNoteShip} update={updateNote} />
                    <div className='mt-4 pt-2 ms-2 ps-1' style={{ height: "45px" }}>
                      {selectedProvince != "" && selectedDistrict != "" && selectedWard != "" ?
                        <>
                          <div className="d-flex">
                            <img src="https://www.svgrepo.com/show/236705/delivery-truck-truck.svg" style={{ width: "50px", height: "40px" }} />
                            <div className='mt-2 pt-1'>
                              <span className='ms-2' style={{ fontSize: "19px", fontWeight: "500", color: "" }}>
                                Thời gian giao hàng dự kiến: {receiveDate}</span>
                            </div>
                            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png" style={{ width: "180px", height: "55px" }} className="ms-3" />
                          </div>
                        </> : ""
                      }
                    </div>
                    <div className='mt-4 pt-1'>
                    </div>
                  </div>

                  :
                  <div className='mt-1 mx-auto'>
                    <span style={{ fontSize: "18px" }}>Không có dữ liệu!</span>
                  </div>
                }
                <div className='mt-3'></div>
              </div>
            </div>
            <div className='mt-3'></div>
          </div>
          <div style={{ marginTop: "24.5px" }}></div>
        </> : null
      }
      <div className='mt-3'></div>
    </>
  )
};
export default DeliveryShipInfo;
