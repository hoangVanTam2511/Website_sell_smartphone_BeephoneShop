import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import CurrencyInput from "react-currency-input-field";
import { FormLabel } from "react-bootstrap";
import {
  faPlus,
  faTrashAlt,
  faCheck,
  faThumbtack,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {
  apiURLCamera,
  apiURLCauHinh,
  apiURLChip,
  apiURLDongSanPham,
  apiURLManHinh,
  apiURLMauSac,
  apiURLHang,
  apiURLPin,
  apiURLram,
  apiURLrom,
} from "../../../../service/api";
import {
  Col,
  Row,
  Input,
  Card,
  Tag,
  Pagination,
  Tabs,
  Space,
  Divider,
  Table,
  Modal,
  Avatar,
  Segmented,
  notification,
} from "antd";
import { useTheme } from "@mui/material/styles";
import {
  CloseOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../assets/scss/addProduct.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from '../../../../store/helpers/axios_helper'

const { TextArea } = Input;
let index = 0;
const Context = React.createContext({
  name: "Default",
});
const ThemSanPham = () => {
  // list properties of phone
  const [listMauSac, setlistMauSac] = useState([]);
  const [listChip, setlistChip] = useState([]);
  const [listRam, setListRam] = useState([]);
  const [listManHinh, setlistManHinh] = useState([]);
  const [listRom, setlistRom] = useState([]);
  const [listPin, setListPin] = useState([]);
  const [listNhaSanXuat, setlistNhaSanXuat] = useState([]);
  const [listIdCauHinh, setListIdCauHinh] = useState([]);
  const [listDongSanPham, setListDongSanPham] = useState([]);
  const [listCamera, setListCamera] = useState([]);
  //config
  const [listCauHinh, setListCauHinh] = useState([]);
  const [hiddenConfig, sethiddenConfig] = useState(false);
  const [listCauHinhSelected, setListCauHinhSelected] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nameStorage, setNameStorage] = useState("images/");
  const imageListRef = ref(storage, nameStorage);
  // modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  //hidden in cofig
  const [sizeOfListSelected, setSizeOfListSelected] = useState(0);
  // image
  const [urlImage, seturlImage] = useState(new Map());
  const [pinImage, setpinImage] = useState(new Map());
  // step in selected
  const [step, setStep] = useState(0);
  let navigate = useNavigate();
  // notification
  const [api, contextHolder] = notification.useNotification();

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChangeSelectMultipleFront = (e) => {
    setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value });
  };

  const handleChangeSelectMultipleAfter = (e) => {
    setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // toast notification
  const showNotification = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // modal nhà sản xuất

  const [nhaSanXuatForm, setNhaSanXuatForm] = useState({
    idBrand: "",
    nameBrand: "",
  });
  const [nameBrandError, setnameBrandError] = useState("");
  const { idBrand, nameBrand } = nhaSanXuatForm; // tạo contructor

  const onInputChangeFormNhaSanXuat = (e) => {
    setNhaSanXuatForm({ ...nhaSanXuatForm, [e.target.name]: e.target.value });
  };

  const showModal = async () => {
    setOpen(true);
  };

  const handleOk = async () => {
    var flag = false;
    if (!nhaSanXuatForm.nameBrand) {
        setFormSubmitted(true);
        setnameBrandError("Tên hãng không được bỏ trống");
        flag = true;
      }
    
    if (flag == true) {
        showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
        return;
    }

    request('POST',"/hang/save", nhaSanXuatForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
    setOpenFormChip(false);
    setOpenFormDongSanPham(false);
    setOpenFormmanHinh(false);
    setOpenFormmauSac(false);
    setOpenFormpin(false);
    setOpenFormram(false);
  };

  // chip

  const [openFormChip, setOpenFormChip] = useState(false);

  const [chipForm, setChipForm] = useState({
    maChip: "",
    tenChip: "",
  });

  const { maChip, tenChip } = chipForm; // tạo contructor

  const onInputChangeFormChip = (e) => {
    setChipForm({ ...chipForm, tenChip: e.target.value });
  };

  const showModalFormChip = async () => {
    setOpenFormChip(true);
    request('GET',"/chip/new-code")
      .then((res) => {
        setChipForm({ ...chipForm, maChip: res.data });
      })
      .catch((res) => console.log(res));
  };

  const handleOkFormChip = async () => {
    request('POST',"/chip/save", chipForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormChip(false);
      setConfirmLoading(false);
    }, 500);
  };

  // pin

  const [openFormpin, setOpenFormpin] = useState(false);

  const [pinForm, setpinForm] = useState({
    mapin: "",
    tenpin: "",
  });

  const { mapin, tenpin } = pinForm; // tạo contructor

  const onInputChangeFormpin = (e) => {
    setpinForm({ ...pinForm, [e.target.name]: e.target.value });
  };

  const showModalFormpin = async () => {
    setOpenFormpin(true);

    request('GET',"/pin/new-code")
      .then((res) => {
        setpinForm({ ...pinForm, mapin: res.data });
      })
      .catch((res) => console.log(res));
  };

  const handleOkFormpin = async () => {
    request('POST',"/pin/save-second", pinForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormpin(false);
      setConfirmLoading(false);
    }, 500);
  };

  //ram

  const [openFormram, setOpenFormram] = useState(false);

  const [ramForm, setramForm] = useState({
    maram: "",
    tenram: "",
  });

  const { maram, tenram } = ramForm; // tạo contructor

  const onInputChangeFormram = (e) => {
    setramForm({ ...ramForm, [e.target.name]: e.target.value });
  };

  const showModalFormram = async () => {
    setOpenFormram(true);

    request('GET',"/ram/new-code")
      .then((res) => {
        setramForm({ ...ramForm, maram: res.data });
      })
      .catch((res) => console.log(res));
  };
  const handleOkFormram = async () => {
    request('POST',"/ram/save-second", ramForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormram(false);
      setConfirmLoading(false);
    }, 500);
  };

  //rom

  const [openFormrom, setOpenFormrom] = useState(false);
  const [capacityRomError, setcapacityRomError] = useState("");

  const [romForm, setromForm] = useState({
    idRom: "",
    capacityRom: "",
  });

  const { idRom, capacityRom } = romForm; // tạo contructor

  const onInputChangeFormrom = (e) => {
    setromForm({ ...romForm, [e.target.name]: e.target.value });
  };

  const showModalFormrom = async () => {
    setOpenFormrom(true);
  };

  const handleOkFormrom = async () => {
    request('POST',"/rom/save-second", romForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormrom(false);
      setConfirmLoading(false);
    }, 500);
  };

  // mau-sac
  const [openFormmauSac, setOpenFormmauSac] = useState(false);

  const [mauSacForm, setmauSacForm] = useState({
    mamauSac: "",
    tenmauSac: "",
  });

  const { mamauSac, tenmauSac } = mauSacForm; // tạo contructor

  const onInputChangeFormmauSac = (e) => {
    setmauSacForm({ ...mauSacForm, [e.target.name]: e.target.value });
  };

  const showModalFormmauSac = async () => {
    setOpenFormmauSac(true);

    request('GET',"/mau-sac/new-code")
      .then((res) => {
        setmauSacForm({ ...mauSacForm, mamauSac: res.data });
      })
      .catch((res) => console.log(res));
  };

  const handleOkFormmauSac = async () => {
    request('POST',"/mau-sac/save-second", mauSacForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormmauSac(false);
      setConfirmLoading(false);
    }, 500);
  };

  // màn hình
  const [openFormmanHinh, setOpenFormmanHinh] = useState(false);

  const [manHinhForm, setmanHinhForm] = useState({
    mamanHinh: "",
    tenmanHinh: "",
  });

  const { mamanHinh, tenmanHinh } = manHinhForm; // tạo contructor

  const [cameraForm, setCameraForm] = useState({
    resolutionCamera: "",
  });
  const [openFormCamera, setOpenFormCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resolutionCameraError, setResoluTionCameraError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmittedConfig, setFormSubmittedConfig] = useState(false);

  const showModalFormCamera = () => {
    setOpenFormCamera(true);
  };
  const handleOkFormCamera = () => {
    if (!cameraForm.resolutionCamera) {
      setFormSubmitted(true);
      setResoluTionCameraError("Độ phân giải không được bỏ trống");
      return;
    }
    setLoading(true);
    request('POST',"/camera/save", cameraForm);
    setTimeout(() => {
      setLoading(false);
      setOpenFormCamera(false);
      loadDataComboBox();
    }, 300);
  };
  const handleCancelFormCamera = () => {
    setOpenFormCamera(false);
  };
  const onInputChangeFormmanHinh = (e) => {
    setmanHinhForm({ ...manHinhForm, [e.target.name]: e.target.value });
  };

  const showModalFormmanHinh = async () => {
    setOpenFormmanHinh(true);

    request('GET',"/man-hinh/new-code")
      .then((res) => {
        setmanHinhForm({ ...manHinhForm, mamanHinh: res.data });
      })
      .catch((res) => console.log(res));
  };
  const handleOkFormmanHinh = async () => {
    request('POST',"/man-hinh/save-second", manHinhForm);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormmanHinh(false);
      setConfirmLoading(false);
    }, 500);
  };

  // dòng sản phẩm

  const [openFormDongSanPham, setOpenFormDongSanPham] = useState(false);

  const [DongSanPhamForm, setDongSanPhamForm] = useState({
    maDongSanPham: "",
    tenDongSanPham: "",
  });

  const { maDongSanPham, tenDongSanPham } = DongSanPhamForm; // tạo contructor

  const onInputChangeFormDongSanPham = (e) => {
    setDongSanPhamForm({ ...DongSanPhamForm, [e.target.name]: e.target.value });
  };

  const showModalFormDongSanPham = async () => {
    setOpenFormDongSanPham(true);

    request('GET',"/dong-san-pham/new-code")
      .then((res) => {
        setDongSanPhamForm({ ...DongSanPhamForm, maDongSanPham: res.data });
      })
      .catch((res) => console.log(res));
  };
  const handleOkFormDongSanPham = async () => {
    request('POST',"/dong-san-pham/save",
      DongSanPhamForm
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenFormDongSanPham(false);
      setConfirmLoading(false);
    }, 500);
  };

  // cấu hình
  const [openFormCauHinh, setOpenFormCauHinh] = useState(false);

  const showModalFormCauHinh = () => {
    setOpenFormCauHinh(true);
  };
  // notification
  const openNotificationError = (placement, title, content) => {
    api.error({
      message: `${title} `,
      description: `${content}`,
      placement,
    });
  };

  const openNotificationSuccess = (placement, title, content) => {
    api.success({
      message: `${title} `,
      description: `${content}`,
      placement,
    });
  };

  const addNewConfig = async () => {
    if (hiddenConfig == true) {
      if (cauHinh.ram === "" || cauHinh.rom === "") {
        openNotificationError(
          "error",
          "Không thể thêm cấu hình !!!",
          "Bạn phải nhập dữ liệu đầy đủ"
        );
        return;
      }
      request('POST',"/cau-hinh/save", cauHinh)
        .then((res) => {
          openNotificationSuccess(
            "success",
            "Thêm cấu hình thành công !!!",
            ""
          );
          loadDataListCauHinh(currentPage);
        })
        .catch((res) => console.log(res));
      sethiddenConfig(false);
    } else {
      sethiddenConfig(true);
    }
  };

  const cancelAddConfig = () => {
    sethiddenConfig(false);
  };

  const handleOkFormCauHinh = async () => {
    // get id and call all configSelected

    listIdCauHinh.forEach((id) => {
      listCauHinh.forEach((item) => {
        if (item.id == id) {
          listCauHinhSelected.push(item);
        }
      });
    });
    setListCauHinhSelected(listCauHinhSelected);
    setSizeOfListSelected(listCauHinhSelected.length);
    openNotificationSuccess(
      "success",
      `Bạn đã chọn ${listCauHinhSelected.length} cấu hình`,
      ""
    );
    setTimeout(() => {
      setOpenFormCauHinh(false);
      setConfirmLoading(false);
    }, 100);
  };

  const handleInputChangeFormresolutionCamera = (e) => {
    const resolutionCameraValue = e.target.value.trim();
    if (isNaN(resolutionCameraValue)) {
      setResoluTionCameraError("Độ phân giải camera phải là số ");
    } else {
      setCameraForm({ ...cameraForm, [e.target.name]: e.target.value });
    }
  };

  const loadDataListCauHinh = async (currentPage) => {
    axios
      .get(apiURLCauHinh + "/view-all?page=1")
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          key: item.id,
        }));
        setListCauHinh(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((res) => console.log(res));
  };
  const handleCancelFromCauHinh = () => {
    setOpenFormCauHinh(false);
  };

  const deleteCauHinh = async (record) => {
    const index = listMauSac.findIndex((item) => record.id === item.id);
    /* Read more about isConfirmed, isDenied below */
    deleteColor(record.id);
  };

  // delete
  const deleteColor = async (id) => {
    request('DELETE',`${apiURLCauHinh}/delete/${id}`)
      .then((response) => {
        loadDataListCauHinh(currentPage);
      })
      .catch((res) => console.log(res));
  };

  // tìm kiếm

  const columns = [
    {
      title: "Dung luợng ram(GB)",
      dataIndex: "kichThuocRam",
      width: "5%",
    },
    {
      title: "Dung lượng rom(GB)",
      dataIndex: "kichThuocRom",
      width: "5%",
    },
    {
      title: "Màu sắc",
      dataIndex: "",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <Button
              style={{
                fontSize: 14,
                fontWeight: 600,
                backgroundColor: record.mauSac,
                height: 60,
              }}
            >
              {" "}
            </Button>
          </>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => deleteCauHinh(record)}
              style={{
                cursor: "pointer",
                // opacity: editingKey === record.id ? 0.5 : 1,
                color: "#F55E4C",
                marginLeft: 20,
              }}
            />
          </>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, obj) => {
      setListIdCauHinh(selectedRowKeys);
    },
  };

  const [chiTietSanPham, setchiTietSanPham] = useState({
    tenSanPham: "",
    dongSanPham: "",
    nhaSanXuat: "",
    heDieuHanh: "ios",
    cameraTruoc: [],
    cameraSau: [],
    chip: "",
    sim: "1",
    pin: "",
    manHinh: "",
    congSac: "lightning",
    moTa: "",
  });

  // error
  const [tenSanPhamError, setTenSanPhamError] = useState();
  const [dongSanPhamError, setDongSanPhamError] = useState();
  const [nhaSanXuatError, setNhaSanXuatError] = useState();
  const [heDieuHanhError, setHeDieuHanhError] = useState();
  const [cameraTruocError, setCameraTruocError] = useState();
  const [cameraSauError, setCameraSauError] = useState();
  const [moTaError, setMoTaError] = useState();
  const [chipError, setChipError] = useState();
  const [manHinhError, setManHinhError] = useState();
  const [pinError, setPinError] = useState();

  const [cauHinh, setCauHinh] = useState({
    ram: "",
    rom: "",
    mauSac: "",
  });

  const [ramError, setRamError] = useState();
  const [romError, setRomError] = useState();
  const [mauSacError, setMauSacError] = useState();

  const { donGia, moTa } = chiTietSanPham; // tạo contructor

  const onSubmit = async () => {
    request('POST',"/san-pham/save", chiTietSanPham)
      .then((res) => {
        request('POST',`/chi-tiet-san-pham/save?id=${res.data.id}`,
            listIdCauHinh
          )
          .then((res) => {})
          .catch((res) => console.log(res));
      });
  };
  const onInputChange = (e) => {
    setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value });
  };

  const handleTextArea = (e) => {
    console.log(chiTietSanPham);
    setchiTietSanPham({ ...chiTietSanPham, [e.target.name]: e.target.value });
  };

  const handleChange = (value) => {
    const target_value = value.target.value;
    setchiTietSanPham({
      ...chiTietSanPham,
      [String(target_value).slice(0, String(target_value).indexOf(":"))]:
        String(target_value).slice(String(target_value).indexOf(":") + 1),
    });
  };

  // handle chang segemented
  const handleChangeSegemented = (value) => {
    setchiTietSanPham({
      ...chiTietSanPham,
      [String(value).slice(0, String(value).indexOf(":"))]: String(value).slice(
        String(value).indexOf(":") + 1
      ),
    });
  };

  // handdleChange tab cấu hình - become
  const handleChangeFormCauHinh = (value) => {
    const target_value = value.target.value;
    setCauHinh({
      ...cauHinh,
      [String(target_value).slice(0, String(target_value).indexOf(":"))]:
        String(target_value).slice(String(target_value).indexOf(":") + 1),
    });
  };

  useEffect(() => {
    loadDataComboBox();
    loadDataListCauHinh(currentPage);
    setListCauHinhSelected(listCauHinhSelected);
    setStep(step);
  }, [confirmLoading, currentPage, sizeOfListSelected, step]);

  //ảnh

  const getIndexOfLocationImage = (location_image) => {
    return Number(location_image.slice(6));
  };

  const handleFileChangeImage = (event, location_image) => {
    const file = event.target.files[0];
    if (file == null) return;
    const imageRef = ref(
      storage,
      `${chiTietSanPham.tenSanPham}/${location_image}/${file.name}`
    );
    uploadBytes(imageRef, file).then((res) => {
      listAll(ref(storage, chiTietSanPham.tenSanPham + "/" + location_image))
        .then((responce) => {
          responce.items.forEach((item) => {
            getDownloadURL(item)
              .then((url) => {
                var count = 0;
                for (let [key, value] of urlImage) {
                  if (
                    getIndexOfLocationImage(key) ==
                    getIndexOfLocationImage(location_image)
                  ) {
                    if (urlImage.get(key) != null) {
                      count++;
                    }
                  }
                }
                if (count == 0) {
                  setpinImage((map) => new Map(map.set(location_image, true)));
                  seturlImage((map) => new Map(map.set(location_image, url)));
                } else {
                  setpinImage((map) => new Map(map.set(location_image, false)));
                  seturlImage((map) => new Map(map.set(location_image, url)));
                }
              })
              .catch((res) => console.log(res));
          });
        })
        .catch((res) => console.log(res));
    });
  };

  const confirmDelete = (event, location_image) => {
    event.preventDefault();
    seturlImage((map) => new Map(map.set(location_image, null)));
    setpinImage((map) => new Map(map.set(location_image, false)));
    for (let [key, value] of pinImage) {
      if (
        getIndexOfLocationImage(key) == getIndexOfLocationImage(location_image)
      ) {
        if (value == false) {
          if (urlImage.get(key) != null) {
            setpinImage((map) => new Map(map.set(key, true)));
            break;
          }
        }
      }
    }
  };

  const clickPinImage = (event, location_image) => {
    // pin image
    event.preventDefault();
    setpinImage((map) => new Map(map.set(location_image, true)));
    for (let [key, value] of pinImage) {
      if (
        key != location_image &&
        getIndexOfLocationImage(key) == getIndexOfLocationImage(location_image)
      )
        setpinImage((map) => new Map(map.set(key, false)));
    }
  };

  const handleClickExitForm = (id) => {
    listCauHinhSelected.forEach((item, index) => {
      if (item.id == id) {
        listCauHinhSelected.splice(index, 1);
        setSizeOfListSelected(listCauHinhSelected.length);
      }
    });
  };

  const loadDataComboBox = async () => {
    // load các combobox tương ứng
    axios
      .get(apiURLDongSanPham + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.tenDongSanPham,
          value: "dongSanPham:" + item.tenDongSanPham,
        }));
        console.log(apiURLDongSanPham);
        setListDongSanPham(modifiedData);
      })
      .catch((res) => console.log(res));
    axios
      .get(apiURLHang + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.tenHang,
          value: "nhaSanXuat:" + item.tenHang,
        }));
        setlistNhaSanXuat(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLPin + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.dungLuong + " mah",
          value: "pin:" + item.dungLuong,
        }));
        setListPin(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLram + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.kichThuoc + " GB",
          value: "ram:" + item.kichThuoc,
        }));
        setListRam(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLrom + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.kichThuoc + " GB",
          value: "rom:" + item.kichThuoc,
        }));
        setlistRom(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLChip + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.tenChip,
          value: "chip:" + item.tenChip,
        }));
        setlistChip(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLMauSac + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.tenMauSac,
          value: "mauSac:" + item.tenMauSac,
        }));
        setlistMauSac(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLManHinh + "/get-list")
      .then((response) => {
        const modifiedData = response.data.map((item, index) => ({
          label: item.kichThuoc + " inch",
          value: "manHinh:" + item.kichThuoc,
        }));
        setlistManHinh(modifiedData);
      })
      .catch((res) => console.log(res));

    axios
      .get(apiURLCamera + "/view-all")
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          label: item.doPhanGiai + " MP",
          value: "camera:" + item.doPhanGiai,
        }));
        setListCamera(modifiedData);
      })
      .catch((res) => console.log(res));
  };

  // step
  const handleClickStepTwo = () => {
    setFormSubmitted(true);
    if (
      chiTietSanPham.cameraSau.length === 0 ||
      chiTietSanPham.cameraTruoc.length === 0 ||
      chiTietSanPham.manHinh === "" ||
      chiTietSanPham.mauSac === "" ||
      chiTietSanPham.pin === "" ||
      chiTietSanPham.chip === "" ||
      chiTietSanPham.dongSanPham === "" ||
      chiTietSanPham.nhaSanXuat === ""
    ) {
      return;
    } else {
      setStep(1);
    }
  };

  const handleClickStepOne = () => {
    setStep(0);
  };

  const handleClickStepThree = async () => {
    request('POST',"/san-pham/save", chiTietSanPham)
      .then((res) => {
        {
            console.log(res.data.id)
          listCauHinhSelected.forEach((item) => {
            item.idSanPham = res.data.id;
          });
        }
      })
      .catch((res) => console.log(res));

    listCauHinhSelected.forEach(async (item, index) => {
      request('POST',"/chi-tiet-san-pham/save", item)
        .then((res) => {
          for (let [key, value] of urlImage) {
            if (getIndexOfLocationImage(key) == index) {
              if (value != null) {
                request('POST',"/anh/save", {
                    tenAnh: key,
                    duongDan: value,
                    trangThai: pinImage.get(key),
                    idChiTietSanPham: res.data.id,
                  })
                  .then((res) => {});
              }
            }
          }
        })
        .catch((res) => console.log(res));
    });
    openNotificationSuccess("success", "Bạn đã tạo sản phẩm thành công ", "");
    setTimeout(() => {
      navigate("/san-pham");
    }, 200);
  };

  return (
    <div className="card-body" style={{ marginLeft: 40, marginTop: 50 }}>
      {contextHolder}

      <Form onSubmit={(e) => onSubmit(e)}>
        <>
          {" "}
          {step == 0 ? (
            <div className="card " style={{ paddingLeft: `3%` }}>
              <br />
              <h1 className="text-center">Thêm sản phẩm</h1>
              <br />
              <br />
              <Row>
                <Col span={24} style={{ marginLeft: 41 }}>
                  <Form.Group className="form-group">
                    <Form.Label
                      htmlFor="pwd"
                      style={{ width: 127, color: "black" }}
                    >
                      Tên sản phẩm
                    </Form.Label>
                    <TextField
                      required
                      id="outlined-required"
                      value={chiTietSanPham.tenSanPham}
                      error={
                        (formSubmitted && !chiTietSanPham.tenSanPham) ||
                        !!tenSanPhamError
                      }
                      helperText={
                        tenSanPhamError ||
                        (formSubmitted &&
                          !chiTietSanPham.tenSanPham &&
                          "Tên sản phẩm không được trống")
                      }
                      style={{ width: 689 }}
                      name="tenSanPham"
                      onChange={onInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col span={24} style={{ marginLeft: 41 }}>
                  <Form.Group className="form-group">
                    <Form.Label
                      htmlFor="pwd"
                      style={{ width: 127, color: "black" }}
                    >
                      {" "}
                      Mô tả{" "}
                    </Form.Label>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      error={
                        (formSubmitted && !chiTietSanPham.moTa) || !!moTaError
                      }
                      helperText={
                        moTaError ||
                        (formSubmitted &&
                          !chiTietSanPham.moTa &&
                          "Mô tả của sản phẩm không được trống")
                      }
                      value={chiTietSanPham.moTa}
                      name="moTa"
                      style={{ width: 689 }}
                      onChange={handleTextArea}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={8} style={{ transform: `translate(36px, 0px)` }}>
                  <Form.Group className="form-group">
                    <Form.Label
                      htmlFor="pwd"
                      style={{
                        width: `29%`,
                        color: "black",
                        display: `block`,
                        marginBottom: `12px`,
                      }}
                    >
                      Hệ điều hành
                    </Form.Label>
                    <Space direction="vertical">
                      <Segmented
                        onChange={(even) => handleChangeSegemented(even)}
                        options={[
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAYFBMVEX///8AAAD09PT4+Pjx8fHr6+u7u7v8/PxeXl7h4eFsbGzS0tJZWVl4eHimpqbo6OjY2NjHx8c3NzeMjIwcHByurq6WlpY/Pz9EREQUFBQwMDB+fn4kJCQrKytmZmZLS0vYgHEDAAADvklEQVRoge1b2ZaqMBAkLGEVWQRBEP//Ly8eZ0aBSCqQDi+3njldhE56qTSW9R8UcOwDyeP69Aicg8jzjj1RHPIB/KpnL9wO4Pd5wX5xwPrDgL3xMO7/in1iME0fTehZaZbdSab0rDLLP6dn52PpL0bpyzk9q03S5wt6Fhqk9+4L+sQgvXVaLj83SJ8t6Y0Gn8eS3+ThEyw/NUgv8L7Rzecvl28081YLepNHX/D5TR49y7KvM3pulN4KD139WGpP2Fuzvh/BP+kj1zS9lb7Ze8Oun/K3tfnFW3/HP6noy23HFaww68oyjf3Jc2Gcc55nnjbmc5xGzbW4367NiWdrKz3n5aO4vBxyvyZ1vD8TutXQf25y9uhi8Suc06CdR8N+qHbti0xQ3IxWy2z+oJMuauBfdJujQvbV5pjkP6zafOXBEcHidRG43apRVtTZM9WGPLisPziiVD8f+U1qlTVDlCx8Ln5ZVSekcptqUAqPfiQ3qAqFstARFLX7ATdlfkNBjzflBB//Bewc1lT0rEWCIZfb2YgGOYSCdlYTME2IzPlYABCICXoA5gAg6m5BC5YjRJvvAoZ/msCH9yWx3NQWwGrkQEIfoPQhlsxVAZeAy25eB3Axcr2M2wp4+Y68kNuADl4+TezDi1/tNd8TjS8n/gFJ6sE/v9XLralDQZKhoFcQY10K+gLvPwVS7n4keOdFcvwimJ4m959wfpLor8BPEn6O5lfwPwl/gIdfEv83+HUETe2Lx7+j0y9J/FOQPWwSfoXrMBL+Ht8ANNU3LnwFcmMbcIX5iYQXuAIian7hD0DUfcI7gKb/GI8AWoMR6Y5wEiZT/sAWlGoDoFHYI1KfGLoHaRpw/AVoBIgXkD3gEfKzQH4MfZoU8IOL3AckNegbkUyHJOlBVd6ATP7+hUQIprt9eKGR7QCaIugPUimW7vbnCfkNEJEG+wMgE5LuQKAboWlDXoCUcMIPAJWi86EqfUiwZlw4dKEDYCVOlQXhVnA50KwFMcpvk8QAhbFciizQqgwjHTt/YVln7R4Azx6ZB1QHcDR7QPmHDL+QG8UBX4G+obMZu22ZgtPYjGyby9WWB7ZOxM+nmzdCQYOfwtYyC1NspR9rIQ2KDKy+iLBfk0ZHP75g7yns986Eh99uZW9RyTPPcbyMl8M3PylcP36DK5qJuZbZxLIXRyLtJtIyF71oiaJckMxcPpfvgH4fw/kzEq0Me4f1R8RoU7WMuwo7PTX9vRlK0conD/LyFDyCrt4087sGx3UdbEU++Nx//AMDMzf1rOz9qQAAAABJRU5ErkJggg==" />
                                <div>IOS</div>
                              </div>
                            ),
                            value: "heDieuHanh:ios",
                          },
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/png;base64,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" />
                                <div>Android</div>
                              </div>
                            ),
                            value: "heDieuHanh:android",
                          },
                        ]}
                      />
                    </Space>
                  </Form.Group>
                </Col>

                <Col span={5}>
                  <Form.Group className="form-group">
                    <Form.Label
                      htmlFor="pwd"
                      style={{
                        width: `20%`,
                        color: "black",
                        display: `block`,
                        marginBottom: `5%`,
                        marginBottom: `12px`,
                      }}
                    >
                      Sim
                    </Form.Label>
                    <Space direction="vertical">
                      <Segmented
                        onChange={(even) => handleChangeSegemented(even)}
                        options={[
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/png;base64,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" />
                                <div>1 sim</div>
                              </div>
                            ),
                            value: "sim:1",
                          },
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/png;base64,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" />
                                <div>2 sim</div>
                              </div>
                            ),
                            value: "sim:2",
                          },
                        ]}
                      />
                    </Space>
                  </Form.Group>
                </Col>

                <Col span={11}>
                  <Form.Group className="form-group">
                    <Form.Label
                      htmlFor="pwd"
                      style={{
                        width: `20%`,
                        color: "black",
                        display: `block`,
                        marginBottom: `12px`,
                      }}
                    >
                      Cổng sạc
                    </Form.Label>
                    <Space direction="vertical">
                      <Segmented
                        onChange={(even) => handleChangeSegemented(even)}
                        options={[
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/jpeg;base64,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" />
                                <div>Cổng lightning</div>
                              </div>
                            ),
                            value: "congSac:lightning",
                          },
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/jpeg;base64,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" />
                                <div>Cổng type c</div>
                              </div>
                            ),
                            value: "congSac:type c",
                          },
                          {
                            label: (
                              <div
                                style={{
                                  padding: 4,
                                }}
                              >
                                <Avatar src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBAPEhAQEBAPDw8PEA8PDw8QDw8QFREWFhURExUYHSggGBolHRUVITEhJSkrLi4uFx8zODMvNygtLisBCgoKDQ0NFRAPFS0ZFxktKy0tKys3NystKy0rLSsrLTc3KystLS0tKy0rNysrKy0tListKysrNysrKzcrLS0tN//AABEIAKUBMQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwUBAgQGB//EADoQAAIBAwIEAggEBQQDAQAAAAABAgMEEQUhEjFBUWFxBhMiMlKBkaEjQrHRBxQzwfBicnOCY6LSJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A+4gAAAAMZGTBhgbZMkLmPWATAjVQ3UgMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYZkAaM1dQkaNJwyBrxJmkqfZkVWk1yOd3Eo8wJ5ZRmNY0p3yez+5I4RlyePLkBJCt44JY1P8AEcM6Ml4rwNFVaILOMkzYr43HcmhX8fqB1AjjVN0yjIAAAAAAAANeNdzKkn1AyAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1aIp0UycAVlawT5HLKlOHJl5g1lACop37XvI643EJ88P8AU3rWcZdDgrac1vEDrlap+6/qQyoyj027rdHH66pT5rJ1UNUXXYDMK7RPC5NlKnPt5rZmk7L4ZfJ/uSDohX8fqbuqV0qU4808d+aHrgLFVX13JIzTOCnWJ8gTzmkQynk1AAAAbxqNeJJGqvIgAHWDlUsEka3comBrGaZsAAAAAAAAAAAAAAAAAAAAAAAAAAAA1cTYAQVKCfNHFX01PkWhjAHnp2c4bxZtTvpx2ki9lA561qpdAIKN/GSxnmc1Snjy79DFxpvVbHFKpUp9QLm2ikvEm4SthVez7pP7HTSvO5B0AzCrGRs4Ac9zbxqRcJLMXzSbX3RX3lKVGMOCclSi3xpviUI42fFhyxnzLZmAKS11Fr8SpWXqXtH2E03/AMi3fzSLmEk0mnlNZTXJozgAZBgN4AGJ3PB1+RUatrkKMW+JJLnJ/ou7KewnXuZetc3Qoc4ZinOr4tP3V4Eqx7mlPiin3WTcp7fUZ04pVKTlFL+pQ9tNd3T95fLJY2t5TqrMJxljmk94+ElzXzLUTgAoAAAAAAAAAAAAAAMZMZA2BjJkAAAAAAAAAYaMgCOUThu7NSLFmskBSzjjC7JL6GmSfUMReeSf6nK5AbqeDopXjRxuRjJILindRlz2JOHPIo1ImpXLQFo0Dnp36fMivdQjTi5eGd+SXdgdFxcRgst/LueT1j0gcpeppRdSq+VOHRfFN9EclW5uL6WKWadL81eaxt/44v8AUu9L0ylbxxBe037dST9uTb3y2ZrUU9HTqdFqvf3FGM5SUacas4wpRk3hRgm/alv9y/nHHVOPg014eGDju9DozrwuXD8enB041FJqSg+cefidkaa4cLaMV0WEsbZ8iDEpqCb4+HhTk3JpJJc5POyXmeF1T+LOmwuFSlCrWjH2ZXduuHheedNtqUo9cp+WT2OpaVSuaUqVaMatOWMwl1w8/bZniZ/wlsZVY1HOv6pNcVDiWJf9nHiS+b8y5B730f1+F1SVa0uIXVLPDirmFSLx7rlwpp+DXzLiGqR5VFKi+9RYpvyqL2fuVFhZQoU40qcFThTWIwikkl2x/nM7aVRrm8p887/UVIuFLO/TujOTzOoarb2kJVJT9QorMuFpRXi4v2f78if0L9IVqNr/ADUYuMXWq045jwuUYSwpYy8f5suRrNR6AGplFGQAAAAAAwwBqw2Y40BrxBVDLSZDOm+m/kBOqhupIr3UaMq4AsAcsK/j9TLqZ6gdIII1X13JYzTA2BHOrjluaeufgBOYaI41u+xImBzXNBTWCjudPlHeDa8On0PStEc6aYHkJ3UobTi14rdElO5Ut00/Jl3d6epdDz19orT4o5i+6eAOpTNuMo3XrUtpR413W0v2Z02+ownsnh/DLZgWimVHpdVaoPHWVNPxTlujujVKj0zl/wDmfg4P5KW5NXHfpupvggtnFRX4dVOpFbfll78P/byO3+YhJZz6rHxv1tBP/lW8P+6R4bTtRWEk0XFvfPKaeGuTTw/qjDS11ytdUreU7anSq1XH8P1k82/nxLZ47NrPgfEKlLWa19xtX0btvatGU6UIQ8Jr2I0/BbeB9ot75xlxRbg3zlTag334o4cJ+cot+J3Ru4ye8E2+tHho1c8t4Tfq5eakn4dCoi9G6FzC3gruvG4rYfFUjTjBb/lzH3mu/Ut4vvt1wcVODbahNVZLLdPDpVku7pyw2vEVNShDab4XnDi01Pyw/IDvi8YeVg8t6Xem1GxjjLnVkmo04YcpPH6ef67FB6UenMpuVG23bfC54yl3x8T+36FNovo1UuJ+sq5k28vif3k/7EHBcwras81PWJZzTim+CD78P5n/AIsH1/8AhhpcrTT4UJ4441qzljk8yyn9Giu0ixpwl6qkouoscUntGmvH9lue1saCpwUE2+bcnzk3zZrMTddJlGDKNIyAAAAAAADVoiqQJzVoDgnJxMQvO52zp5OOvaZAmVSM+eH+pFUtM+6/k/3K6rTnDkZpai1tIDoacNnsxGsZqVlUSw1ld+pzyjh45Mg76dTJIQW00lg6kkwNBk2cTUAZTwYAEsa3f7EsZJnKAOpoiqUUzEazXj+pLGon+zKK6401S6FPe6BGXQ9Xg1cAPB1NOq0vdk2u0tzg1mrOVPh4PaxjnlH0WrbJ9CsvNGjLoFfDrjTasJOSk0287cvoT2etVKe1SPEu62f0PpGo+jOc4PM3/ozJZ9kzFppusU6nKW/wvZ/QuadXxPE3GiSi84ax1Rva3tejtlzj2nl/ckV7xVMpJ4ai8xU0pKL7xz7r8VhnkfT27uqtahbQlJ03SlKfFKU5e1LHDxv2uHEeTbznqd1jr8H76cH4+79SydegpOvNp8MIcK55zl7LqQVHo96LxglUqYWFnL2+nZFnW1JS/CoexTWzqLnL/Z/9FXqOqTuXwpcNPpDv4y/bkWmkae3hs1mItdItuWFhc/n3fiewsk0kVunWmEi5pRwaRMjY1RsEAAAAAAAAAABjBq0bgCCpSTOC5sEy1aNHEDzFe1nB5Ry1NQmtmeouKGUUOoaY92grqi8pPuk/sTU7ho56PuR7qKT80sGckRZUrtPmTrDKbJJCu0BaOJqQ0rzudEZJgag2lEiqVFFZewGxBXuUtubK+81HOy2X3Kha5S4+DibecOUU3FPs2iLHr9NruSeemMeTOwrtFknFyTTTxhp5TLE0gYaMgCOVNM5a1lGXQ7jGAKC60SMun2KG/wDRlPOF9j3jiaTpJgfJ7rQXB8vscKsN8cOPkfWLnToy6FZU0WOeRIteS0zSeWx6zT7JLGxPQ05RLClSwUb0KeDpijSESVBGUZMIyAAAAAAAAAAAAAADDRkAaNENWmdDRpJAef1XiguKOz+zKqjrkc4qLgfxLeD/ALo9ReUOJYPMalpPZBVlCopLKaafJp5TNsnkPU1aDzTlKPdc4vzRY2npAto1Y8D+NZcH59V9wRfJksKzRy06sZJSi1JPk000b5CO/wDncLJRatqignOcsLp4vsl1O6q/Z+Z5LWKaq11CU+BKK4HJS4XJ7vddeRnVxilTuL6TjGLhRez8V/qf9l9z1Wk6DStsLhzJLaTxw7dkVmleklS2/BuaDdNYULmmliS8Wtm/oz1dleUbiLdKpGa6xz7UfCUXujKuZ2y4nOEnCfWVNrf/AHLk/mSw1KdP+rHiXx0k8+bhv9U/kRa3dUral66tWjQp0/zScYpvpBPDeX2X0PjnpB/Ea61KsrHTKVX29nKmn6+azhttf0o8t8+bXI1lR94tLqFWPHTkpRy1ldGuaa5p+DJjx/8ADT0Vqadb1FWnGVa4qRqzjBtxp4ilw8X5nzy/2yewNIAAAAANWiOUCY1Ag9WbKBLgYAwkZBlIDIAAAAAAAAAAAAAAAAAAGpsAIpxOatbpnYYcQKG501PoUt5o+eh7SVMgqW6YHz3+UqUXmnJx7pbp+a5M77TWulWPC/jim4/Nc0eluNPT6FVdaUu32CpXWUoZi00+qeTyWu3kcuMVxy5Y/KvMtqllKOcJrPPGVk4alj/p+xBS2F9Xp8p5T5wmlKDXbD6FlbqjOSnFzs63SVNv1WfLp8voHa+H2No25Irxl9Y3ut3CnXrVIWlKU4QnJLM4KTjmlDbd4zxPuueD6v6F6fZ6fS9Tb0lDO86kvaq1Zd5y6+XJdikoUGXWn2T2NI9dTrJ8iTJwWlLCO2IRvkyamUBkAAAABjAwZAAAAAAAAAAAAAAAAAAAAAAAAAAxgADBhoADWUCGdJMADnnaxZFKxh2AAgqabB9DkqaXAwAJ7awii1oUEjIA6YxNwACNgAAAAAAAAAAAAAAAAAP/2Q==" />
                                <div>Cổng micro usb</div>
                              </div>
                            ),
                            value: "congSac:micro usb",
                          },
                        ]}
                      />
                    </Space>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ transform: `translate(36px, 0px)` }}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      style={{
                        transform: `translate(92px, 27px)`,
                        border: `1px solid`,
                        borderRadius: `50%`,
                        height: 8,
                        width: 8,
                      }}
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModalFormCamera}
                    />
                    <Form.Label
                      htmlFor="pwd"
                      style={{
                        width: `25%`,
                        color: "black",
                        display: `block`,
                        marginBottom: `5%`,
                      }}
                    >
                      Camera trước
                    </Form.Label>
                    <Select
                      error={
                        (formSubmitted &&
                          chiTietSanPham.cameraTruoc.length === 0) ||
                        !!cameraTruocError
                      }
                      style={{ width: 340 }}
                      id="demo-multiple-chip"
                      multiple
                      name="cameraTruoc"
                      value={chiTietSanPham.cameraTruoc}
                      onChange={handleChangeSelectMultipleFront}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {listCamera.map((name) => (
                        <MenuItem
                          key={name.label}
                          value={name.label}
                          style={getStyles(name, personName, theme)}
                        >
                          {name.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: `red` }}>
                      {cameraTruocError ||
                        (formSubmitted &&
                          chiTietSanPham.cameraTruoc.length === 0 &&
                          `
                                                     Camera trước không được để trống
                                                  `)}
                    </FormHelperText>
                  </Form.Group>
                </Col>

                <Col span={12} style={{ transform: `translate(36px, 0px)` }}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      style={{
                        transform: `translate(92px, 27px)`,
                        border: `1px solid`,
                        borderRadius: `50%`,
                        height: 8,
                        width: 8,
                      }}
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModalFormCamera}
                    />
                    <Form.Label
                      htmlFor="pwd"
                      style={{
                        width: `25%`,
                        color: "black",
                        display: `block`,
                        marginBottom: `5%`,
                      }}
                    >
                      Camera sau
                    </Form.Label>
                    <Select
                      error={
                        (formSubmitted &&
                          chiTietSanPham.cameraSau.length === 0) ||
                        !!cameraSauError
                      }
                      style={{ width: 340 }}
                      id="demo-multiple-chip"
                      multiple
                      name="cameraSau"
                      value={chiTietSanPham.cameraSau}
                      onChange={handleChangeSelectMultipleAfter}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {listCamera.map((name) => (
                        <MenuItem
                          key={name.label}
                          value={name.label}
                          style={getStyles(name, personName, theme)}
                        >
                          {name.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: `red` }}>
                      {cameraSauError ||
                        (formSubmitted &&
                          chiTietSanPham.cameraSau.length === 0 &&
                          `
                                                Camera sau của sản phẩm không được để trống
                                                  `)}
                    </FormHelperText>
                  </Form.Group>
                </Col>

                {/* modal */}
                <Modal
                  open={openFormCamera}
                  title="Thêm camera"
                  onOk={handleOkFormCamera}
                  onCancel={handleCancelFormCamera}
                  footer={[
                    <Button
                      key="back"
                      type="danger"
                      onClick={handleCancelFormCamera}
                    >
                      Huỷ
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      style={{ height: 40, marginRight: `36%` }}
                      onClick={handleOkFormCamera}
                    >
                      Thêm mới
                    </Button>,
                  ]}
                >
                  <TextField
                    label="Độ phân giải camera"
                    id="fullWidth"
                    name="resolutionCamera"
                    value={cameraForm.resolutionCamera}
                    onChange={(e) => handleInputChangeFormresolutionCamera(e)}
                    error={
                      (formSubmitted && !cameraForm.resolutionCamera) ||
                      !!resolutionCameraError
                    }
                    helperText={
                      resolutionCameraError ||
                      (formSubmitted &&
                        !cameraForm.resolutionCamera &&
                        "Độ phân giải camera không được trống")
                    }
                    style={{ width: "100%" }}
                  />

                  {/* </Form.Group> */}
                </Modal>
              </Row>

              <br />
              <Row style={{ justifyContent: `start` }}>
                <Col span={8}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModal}
                    />
                    <Modal
                      title="Thêm hãng"
                      open={open}
                      confirmLoading={confirmLoading}
                      footer={[
                        <Button
                          type="danger"
                          style={{ height: 40, marginRight: `3%` }}
                          onClick={handleCancel}
                        >
                          Huỷ
                        </Button>,
                        <Button
                          type="primary"
                          loading={loading}
                          style={{ height: 40, marginRight: `36%` }}
                          onClick={handleOk}
                        >
                          + Thêm mới
                        </Button>,
                      ]}
                    >
                      <p>
                        <h2
                          style={{
                            marginBottom: `2%`,
                            textAlign: `center`,
                            fontSize: `27px`,
                          }}
                        >
                          Thêm hãng
                        </h2>

                        <FormLabel
                          style={{ marginLeft: `9px`, fontSize: `14px` }}
                        >
                          {" "}
                          Tên hãng{" "}
                        </FormLabel>
                        <TextField
                          label=""
                          id="fullWidth"
                          name="nameBrand"
                          value={nhaSanXuatForm.nameBrand}
                          onChange={(e) => onInputChangeFormNhaSanXuat(e)}
                          error={
                            (formSubmitted && !nhaSanXuatForm.nameBrand) ||
                            !!nameBrandError
                          }
                          helperText={
                            nameBrandError ||
                            (formSubmitted &&
                              !nhaSanXuatForm.nameBrand &&
                              "Tên hãng không được trống")
                          }
                          style={{ width: "100%" }}
                        />
                      </p>
                    </Modal>

                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        className="inputlabel_of_selection"
                      >
                        Hãng
                      </InputLabel>
                      <Select
                        error={
                          (formSubmitted && !chiTietSanPham.nhaSanXuat) ||
                          !!nhaSanXuatError
                        }
                        className="selection_custom"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-filled"
                        // value={tenram}
                        onChange={handleChange}
                      >
                        {listNhaSanXuat.map((item, index) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: `red` }}>
                        {nhaSanXuatError ||
                          (formSubmitted &&
                            !chiTietSanPham.nhaSanXuat &&
                            `
                                                  hãng không được để trống
                                                  `)}
                      </FormHelperText>
                    </FormControl>
                  </Form.Group>
                </Col>

                <Col span={8}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModalFormChip}
                    />
                    <Modal
                      title="Thêm chip"
                      open={openFormChip}
                      onOk={handleOkFormChip}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      <p>
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Mã</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập mã sản phẩm"
                              name="maNhaSanXuat"
                              value={maChip}
                              id="maNhaSanXuat"
                            />
                          </Form.Group>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">Tên chip</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập chip"
                              name="tenChip"
                              value={tenChip}
                              onChange={(e) => onInputChangeFormChip(e)}
                              id="tenChip`"
                            />
                          </Form.Group>
                        </Form>
                      </p>
                    </Modal>

                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label-chip"
                        className="inputlabel_of_selection"
                      >
                        Chip
                      </InputLabel>
                      <Select
                        error={
                          (formSubmitted && !chiTietSanPham.chip) || !!chipError
                        }
                        className="selection_custom"
                        labelId="demo-simple-select-standard-label-chip"
                        id="demo-simple-select-filled"
                        // value={tenram}
                        onChange={handleChange}
                      >
                        {listChip.map((item, index) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: `red` }}>
                        {chipError ||
                          (formSubmitted &&
                            !chiTietSanPham.chip &&
                            `
                                                  Chip không được để trống
                                                  `)}
                      </FormHelperText>
                    </FormControl>
                  </Form.Group>
                </Col>

                <Col span={8}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModalFormDongSanPham}
                    />
                    <Modal
                      title="Thêm dòng sản phẩm"
                      open={openFormDongSanPham}
                      onOk={handleOkFormDongSanPham}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      <p>
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Mã</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập mã dòng sản phẩm"
                              name="maDongSanPham"
                              value={maDongSanPham}
                              onChange={(e) => onInputChangeFormDongSanPham(e)}
                              id="maDongSanPham"
                            />
                          </Form.Group>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">
                              Tên dòng sản phẩm
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập tên nhà sản xuất)"
                              name="tenDongSanPham"
                              value={tenDongSanPham}
                              onChange={(e) => onInputChangeFormDongSanPham(e)}
                              id="ten`"
                            />
                          </Form.Group>
                        </Form>
                      </p>
                    </Modal>

                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label-chip"
                        className="inputlabel_of_selection"
                      >
                        Dòng sản phẩm
                      </InputLabel>
                      <Select
                        error={
                          (formSubmitted && !chiTietSanPham.dongSanPham) ||
                          !!dongSanPhamError
                        }
                        className="selection_custom"
                        labelId="demo-simple-select-standard-label-chip"
                        id="demo-simple-select-filled"
                        // value={tenram}
                        onChange={handleChange}
                      >
                        {listDongSanPham.map((item, index) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: `red` }}>
                        {dongSanPhamError ||
                          (formSubmitted &&
                            !chiTietSanPham.dongSanPham &&
                            `
                                                    Dòng sản phẩm không được để trống
                                                  `)}
                      </FormHelperText>
                    </FormControl>
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row style={{ color: "black" }}>
                <Col span={8}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModalFormmanHinh}
                    />
                    <Modal
                      title="Thêm màn hình"
                      open={openFormmanHinh}
                      onOk={handleOkFormmanHinh}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      <p>
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Mã</Form.Label>
                            <Form.Control
                              type="text"
                              name="mamanHinh"
                              value={mamanHinh}
                              id="mamanHinh"
                            />
                          </Form.Group>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">
                              Kích thước màn hình:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập kích cỡ màn hình"
                              name="tenmanHinh"
                              value={tenmanHinh}
                              onChange={(e) => onInputChangeFormmanHinh(e)}
                              id="ten`"
                            />
                          </Form.Group>
                        </Form>
                      </p>
                    </Modal>

                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label-chip"
                        className="inputlabel_of_selection"
                      >
                        Màn hình
                      </InputLabel>
                      <Select
                        error={
                          (formSubmitted && !chiTietSanPham.manHinh) ||
                          !!manHinhError
                        }
                        helperText={
                          manHinhError ||
                          (formSubmitted &&
                            !chiTietSanPham.manHinh &&
                            "Màn hình không được để trống")
                        }
                        className="selection_custom"
                        labelId="demo-simple-select-standard-label-chip"
                        id="demo-simple-select-filled"
                        // value={tenram}
                        onChange={handleChange}
                      >
                        {listManHinh.map((item, index) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: `red` }}>
                        {manHinhError ||
                          (formSubmitted &&
                            !chiTietSanPham.manHinh &&
                            `
                                                  Màn hình không được để trống
                                                  `)}
                      </FormHelperText>
                    </FormControl>
                  </Form.Group>
                </Col>
                <Col span={8}>
                  <Form.Group className="form-group">
                    <FontAwesomeIcon
                      className="font_awesome_icon_selection_custom"
                      icon={faPlus}
                      onClick={showModalFormpin}
                    />
                    <Modal
                      title="Thêm dung lượng pin"
                      open={openFormpin}
                      onOk={handleOkFormpin}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      <p>
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Mã pin</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập pin"
                              name="mapin"
                              value={mapin}
                              id="mapin"
                            />
                          </Form.Group>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="pwd">
                              Dung luợng pin
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập dung lượng pin)"
                              name="tenpin"
                              value={tenpin}
                              onChange={(e) => onInputChangeFormpin(e)}
                              id="ten`"
                            />
                          </Form.Group>
                        </Form>
                      </p>
                    </Modal>

                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label-pin"
                        className="inputlabel_of_selection"
                      >
                        Pin
                      </InputLabel>
                      <Select
                        error={
                          (formSubmitted && !chiTietSanPham.pin) || !!pinError
                        }
                        className="selection_custom"
                        labelId="demo-simple-select-standard-label-pin"
                        id="demo-simple-select-filled"
                        // value={tenram}
                        onChange={handleChange}
                      >
                        {listPin.map((item, index) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: `red` }}>
                        {pinError ||
                          (formSubmitted &&
                            !chiTietSanPham.pin &&
                            `
                                                     Pin không được để trống
                                                  `)}
                      </FormHelperText>
                    </FormControl>
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Button
                variant="contained"
                endIcon={<ArrowRightOutlined />}
                style={{
                  width: `15%`,
                  fontSize: `89%`,
                  transform: `translateX(280%)`,
                  marginBottom: `2%`,
                }}
                onClick={() => handleClickStepTwo()}
              >
                Tiếp theo
              </Button>

              <br />
            </div>
          ) : (
            <div className="card " style={{ padding: 20 }}>
              <Row>
                <Col span={24}>
                  <Tabs
                    defaultActiveKey="1"
                    centered
                    items={new Array(1).fill(null).map((_, i) => {
                      const id = String(i + 1);
                      return {
                        label: id == 1 ? `Thêm thông tin cấu hình` : "",
                        key: id,
                        children:
                          id == 1 ? (
                            <div>
                              {sizeOfListSelected === 0 ? (
                                <>
                                  <br />
                                  <h3 className="text-center">
                                    Hiện tại bạn chưa có cấu hình nào.
                                  </h3>
                                  <br />
                                  <Button
                                    variant="contained"
                                    startIcon={<ArrowLeftOutlined />}
                                    style={{
                                      transform: `translate(291%, -1%)`,
                                      fontSize: `15px`,
                                    }}
                                    onClick={() => handleClickStepOne()}
                                  >
                                    Trở lại
                                  </Button>

                                  <Button
                                    variant="outlined"
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 600,
                                      marginLeft: `39%`,
                                    }}
                                    onClick={showModalFormCauHinh}
                                  >
                                    <FontAwesomeIcon
                                      style={{ marginRight: 10 }}
                                      icon={faPlus}
                                    />{" "}
                                    Thêm cấu hình mới
                                  </Button>
                                </>
                              ) : (
                                <>
                                  {listCauHinhSelected.map((item, index) => {
                                    const title_custom = `Cấu hình thứ ${
                                      Number(index) + 1
                                    } : Ram: ${item.kichThuocRam}G + Rom: ${
                                      item.kichThuocRom
                                    }G `;
                                    const id1 = `image1${index}`,
                                      id2 = `image2${index}`,
                                      id3 = `image3${index}`,
                                      id4 = `image4${index}`,
                                      id5 = `image5${index}`;
                                    // số lượng sản phẩm
                                    const openFormQuantityProduct = false;

                                    // const handleBlurSoLuongSanPham = (value, id) => {
                                    //     item.soLuong = value.target.value
                                    //     const listImei = []
                                    //     for (var i = 0; i < value.target.value; i++) {
                                    //         listImei[i] = i
                                    //     }
                                    //     item.imei = listImei
                                    //     if( item.id == id  ){
                                    //         openFormQuantityProduct = false;
                                    //     }
                                    // }

                                    return (
                                      <Card
                                        title={title_custom}
                                        bordered={false}
                                        style={{
                                          width: "100%",
                                          marginBottom: `3%`,
                                          border: `1px solid ${item.mauSac}`,
                                        }}
                                      >
                                        <p>
                                          <CloseOutlined
                                            className="button_exit_form_config"
                                            onClick={(event) =>
                                              handleClickExitForm(item.id)
                                            }
                                          />

                                          {/* price of products */}
                                          <Row>
                                            <Col span={4}>
                                              <Form.Label
                                                htmlFor="pwd"
                                                style={{
                                                  width: 150,
                                                  color: "black",
                                                }}
                                              >
                                                Đơn giá
                                              </Form.Label>
                                            </Col>
                                            <Col span={20}>
                                              <CurrencyInput
                                                id="input-example"
                                                name="input-name"
                                                suffix=" VND"
                                                className=" form-control d-inline-block"
                                                style={{ width: `100%` }}
                                                placeholder="Vui lòng nhập số tiền "
                                                defaultValue={1000}
                                                decimalsLimit={2}
                                                onValueChange={(
                                                  value,
                                                  name
                                                ) => {
                                                  item.donGia = value;
                                                }}
                                              />
                                            </Col>
                                          </Row>

                                          {/* quantity of products */}
                                          <Row style={{ marginTop: 20 }}>
                                            <Col span={4}>
                                              <Form.Label
                                                htmlFor="pwd"
                                                style={{
                                                  width: 150,
                                                  color: "black",
                                                }}
                                              >
                                                {" "}
                                                Số lượng{" "}
                                              </Form.Label>
                                            </Col>
                                            <Col span={20}>
                                              <Form.Control
                                                type="number"
                                                className=" form-control d-inline-block"
                                                style={{ width: `50%` }}
                                                placeholder="Nhập số lượng sản phẩm"
                                                name=""
                                                onBlur={(value) => {
                                                  item.soLuong =
                                                    value.target.value;
                                                }}
                                                id="quantity`"
                                              />
                                              <Button
                                                className="btn-them-tu-file"
                                                variant="contained"
                                                style={{
                                                  height: "39px",
                                                  width: "auto",
                                                  fontSize: "15px",
                                                  marginLeft: 20,
                                                  transform: `translateY(-3px)`,
                                                }}
                                              >
                                                {/* <ExcelExportHelper data={listMauSac} /> */}{" "}
                                                + Thêm imei
                                              </Button>
                                            </Col>
                                          </Row>

                                          <Form.Label
                                            htmlFor="pwd"
                                            style={{
                                              width: 150,
                                              color: "black",
                                              transform: `translate(0px, 24px)`,
                                            }}
                                          >
                                            Thêm ảnh
                                          </Form.Label>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              height: 100,
                                            }}
                                          >
                                            <div class="image-upload">
                                              {urlImage.get(
                                                `image1${index}`
                                              ) ? (
                                                <FontAwesomeIcon
                                                  style={{
                                                    color: `${
                                                      pinImage.get(
                                                        `image1${index}`
                                                      ) == true
                                                        ? "rgb(5 128 215)"
                                                        : "#1b1b1b6b"
                                                    }`,
                                                  }}
                                                  className="icon_pin_image"
                                                  icon={faThumbtack}
                                                  onClick={(event) =>
                                                    clickPinImage(
                                                      event,
                                                      `image1${index}`
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <FontAwesomeIcon
                                                  className="icon_pin_image"
                                                  style={{
                                                    border: 0,
                                                    color: "white",
                                                  }}
                                                  icon={faThumbtack}
                                                />
                                              )}
                                              <label for={id1}>
                                                <div
                                                  class="upload-icon"
                                                  style={{
                                                    backgroundImage: `url(${urlImage.get(
                                                      `image1${index}`
                                                    )}`,
                                                    backgroundSize: "cover",
                                                  }}
                                                >
                                                  {urlImage.get(
                                                    `image1${index}`
                                                  ) ? (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-minus"
                                                      icon={faMinus}
                                                      onClick={(event) =>
                                                        confirmDelete(
                                                          event,
                                                          `image1${index}`
                                                        )
                                                      }
                                                    />
                                                  ) : (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-img"
                                                      icon={faPlus}
                                                    />
                                                  )}
                                                </div>
                                              </label>
                                              <input
                                                id={id1}
                                                type="file"
                                                onChange={(event) =>
                                                  handleFileChangeImage(
                                                    event,
                                                    `image1${index}`
                                                  )
                                                }
                                              />
                                            </div>

                                            <div class="image-upload">
                                              {urlImage.get(
                                                `image2${index}`
                                              ) ? (
                                                <FontAwesomeIcon
                                                  style={{
                                                    color: `${
                                                      pinImage.get(
                                                        `image2${index}`
                                                      ) == true
                                                        ? "rgb(5 128 215)"
                                                        : "#1b1b1b6b"
                                                    }`,
                                                  }}
                                                  className="icon_pin_image"
                                                  icon={faThumbtack}
                                                  onClick={(event) =>
                                                    clickPinImage(
                                                      event,
                                                      `image2${index}`
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <FontAwesomeIcon
                                                  className="icon_pin_image"
                                                  style={{
                                                    border: 0,
                                                    color: "white",
                                                  }}
                                                  icon={faThumbtack}
                                                />
                                              )}
                                              <label for={id2}>
                                                <div
                                                  class="upload-icon"
                                                  style={{
                                                    backgroundImage: `url(${urlImage.get(
                                                      `image2${index}`
                                                    )})`,
                                                    backgroundSize: "cover",
                                                  }}
                                                >
                                                  {urlImage.get(
                                                    `image2${index}`
                                                  ) ? (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-minus"
                                                      icon={faMinus}
                                                      onClick={(event) =>
                                                        confirmDelete(
                                                          event,
                                                          `image2${index}`
                                                        )
                                                      }
                                                    />
                                                  ) : (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-img"
                                                      icon={faPlus}
                                                    />
                                                  )}
                                                </div>
                                              </label>
                                              <input
                                                id={id2}
                                                type="file"
                                                onChange={(event) =>
                                                  handleFileChangeImage(
                                                    event,
                                                    `image2${index}`
                                                  )
                                                }
                                              />
                                            </div>
                                            <div class="image-upload">
                                              <form>
                                                {urlImage.get(
                                                  `image3${index}`
                                                ) ? (
                                                  <FontAwesomeIcon
                                                    style={{
                                                      color: `${
                                                        pinImage.get(
                                                          `image3${index}`
                                                        ) == true
                                                          ? "rgb(5 128 215)"
                                                          : "#1b1b1b6b"
                                                      }`,
                                                    }}
                                                    className="icon_pin_image"
                                                    icon={faThumbtack}
                                                    onClick={(event) =>
                                                      clickPinImage(
                                                        event,
                                                        `image3${index}`
                                                      )
                                                    }
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    className="icon_pin_image"
                                                    style={{
                                                      border: 0,
                                                      color: "white",
                                                    }}
                                                    icon={faThumbtack}
                                                  />
                                                )}
                                                <label for={id3}>
                                                  <div
                                                    class="upload-icon"
                                                    style={{
                                                      backgroundImage: `url(${urlImage.get(
                                                        `image3${index}`
                                                      )})`,
                                                      backgroundSize: "cover",
                                                    }}
                                                  >
                                                    {urlImage.get(
                                                      `image3${index}`
                                                    ) ? (
                                                      <FontAwesomeIcon
                                                        className="upload-icon-minus"
                                                        icon={faMinus}
                                                        onClick={(event) =>
                                                          confirmDelete(
                                                            event,
                                                            `image3${index}`
                                                          )
                                                        }
                                                      />
                                                    ) : (
                                                      <FontAwesomeIcon
                                                        className="upload-icon-img"
                                                        icon={faPlus}
                                                      />
                                                    )}
                                                  </div>
                                                </label>
                                                <input
                                                  id={id3}
                                                  style={{ display: "none" }}
                                                  type="file"
                                                  onChange={(event) =>
                                                    handleFileChangeImage(
                                                      event,
                                                      `image3${index}`
                                                    )
                                                  }
                                                />
                                              </form>
                                            </div>
                                            <div class="image-upload">
                                              {urlImage.get(
                                                `image4${index}`
                                              ) ? (
                                                <FontAwesomeIcon
                                                  style={{
                                                    color: `${
                                                      pinImage.get(
                                                        `image4${index}`
                                                      ) == true
                                                        ? "rgb(5 128 215)"
                                                        : "#1b1b1b6b"
                                                    }`,
                                                  }}
                                                  className="icon_pin_image"
                                                  icon={faThumbtack}
                                                  onClick={(event) =>
                                                    clickPinImage(
                                                      event,
                                                      `image4${index}`
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <FontAwesomeIcon
                                                  className="icon_pin_image"
                                                  style={{
                                                    border: 0,
                                                    color: "white",
                                                  }}
                                                  icon={faThumbtack}
                                                />
                                              )}
                                              <label for={id4}>
                                                <div
                                                  class="upload-icon"
                                                  style={{
                                                    backgroundImage: `url(${urlImage.get(
                                                      `image4${index}`
                                                    )})`,
                                                    backgroundSize: "cover",
                                                  }}
                                                >
                                                  {urlImage.get(
                                                    `image4${index}`
                                                  ) ? (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-minus"
                                                      icon={faMinus}
                                                      onClick={(event) =>
                                                        confirmDelete(
                                                          event,
                                                          `image4${index}`
                                                        )
                                                      }
                                                    />
                                                  ) : (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-img"
                                                      icon={faPlus}
                                                    />
                                                  )}
                                                </div>
                                              </label>
                                              <input
                                                id={id4}
                                                type="file"
                                                onChange={(event) =>
                                                  handleFileChangeImage(
                                                    event,
                                                    `image4${index}`
                                                  )
                                                }
                                              />
                                            </div>
                                            <div class="image-upload">
                                              {urlImage.get(
                                                `image5${index}`
                                              ) ? (
                                                <FontAwesomeIcon
                                                  style={{
                                                    color: `${
                                                      pinImage.get(
                                                        `image5${index}`
                                                      ) == true
                                                        ? "rgb(5 128 215)"
                                                        : "#1b1b1b6b"
                                                    }`,
                                                  }}
                                                  className="icon_pin_image"
                                                  icon={faThumbtack}
                                                  onClick={(event) =>
                                                    clickPinImage(
                                                      event,
                                                      `image5${index}`
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <FontAwesomeIcon
                                                  className="icon_pin_image"
                                                  style={{
                                                    border: 0,
                                                    color: "white",
                                                  }}
                                                  icon={faThumbtack}
                                                />
                                              )}
                                              <label for={id5}>
                                                <div
                                                  class="upload-icon"
                                                  style={{
                                                    backgroundImage: `url(${urlImage.get(
                                                      `image5${index}`
                                                    )})`,
                                                    backgroundSize: "cover",
                                                  }}
                                                >
                                                  {urlImage.get(
                                                    `image5${index}`
                                                  ) ? (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-minus"
                                                      icon={faMinus}
                                                      onClick={(event) =>
                                                        confirmDelete(
                                                          event,
                                                          `image5${index}`
                                                        )
                                                      }
                                                    />
                                                  ) : (
                                                    <FontAwesomeIcon
                                                      className="upload-icon-img"
                                                      icon={faPlus}
                                                    />
                                                  )}
                                                </div>
                                              </label>
                                              <input
                                                id={id5}
                                                type="file"
                                                onChange={(event) =>
                                                  handleFileChangeImage(
                                                    event,
                                                    `image5${index}`
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </p>
                                        {/* nhập số lượng và giá của từng sp */}

                                        <Row>
                                          {/* modal quantity */}

                                          <Modal
                                            title="Thêm imei"
                                            open={openFormQuantityProduct}
                                            onOk={handleOk}
                                            confirmLoading={confirmLoading}
                                            onCancel={handleCancel}
                                          >
                                            <p>
                                              <Form>
                                                <Form.Group className="form-group">
                                                  {item.imei &&
                                                    item.imei.map(
                                                      (value, index) => {
                                                        return (
                                                            <></>
                                                        //   <Row>
                                                        //     <Col span="8">
                                                        //       <Form.Label htmlFor="stt">
                                                        //         Imei số {index}
                                                        //       </Form.Label>
                                                        //     </Col>
                                                        //     <Col span="16">
                                                        //       <Form.Control
                                                        //         type="text"
                                                        //         placeholder="Nhập imei "
                                                        //         name="maNhaSanXuat"
                                                        //         value={
                                                        //           maNhaSanXuat
                                                        //         }
                                                        //         id="maNhaSanXuat"
                                                        //       />
                                                        //     </Col>
                                                        //   </Row>
                                                        );
                                                      }
                                                    )}
                                                </Form.Group>
                                              </Form>
                                            </p>
                                          </Modal>

                                          <Col span={12}>
                                            <Form.Group className="form-group"></Form.Group>
                                          </Col>
                                        </Row>
                                        <br />
                                        {/* table */}
                                      </Card>
                                    );
                                  })}
                                  <Button
                                    variant="outlined"
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 600,
                                      marginLeft: `40%`,
                                      marginBottom: `1%`,
                                    }}
                                    onClick={showModalFormCauHinh}
                                  >
                                    <FontAwesomeIcon
                                      style={{ marginRight: 10 }}
                                      icon={faPlus}
                                    />{" "}
                                    Thêm cấu hình
                                  </Button>

                                  <Divider style={{ marginTop: `2%` }} />

                                  <Button
                                    variant="contained"
                                    startIcon={<ArrowLeftOutlined />}
                                    style={{
                                      transform: `translate(18%, -1%)`,
                                      fontSize: `16px`,
                                      marginBottom: `2%`,
                                    }}
                                    onClick={() => handleClickStepOne()}
                                  >
                                    Trở lại
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="success"
                                    endIcon={<CheckOutlined />}
                                    style={{
                                      transform: `translate(358%, -1%)`,
                                      fontSize: `16px`,
                                      marginBottom: `2%`,
                                    }}
                                    onClick={() => handleClickStepThree()}
                                  >
                                    Hoàn thành
                                  </Button>
                                </>
                              )}
                              {/* modal */}
                              <Modal
                                title="Chọn cấu hình"
                                style={{ width: "700" }}
                                open={openFormCauHinh}
                                onOk={handleOkFormCauHinh}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancelFromCauHinh}
                              >
                                <div>
                                  <div style={{ marginBottom: `3%` }}>
                                    {hiddenConfig ? (
                                      <>
                                        <Row style={{ marginTop: "30" }}>
                                          <Col span={8}>
                                            <Form.Group className="form-group">
                                              <FontAwesomeIcon
                                                className="font_awesome_icon_selection_custom"
                                                icon={faPlus}
                                                onClick={showModalFormrom}
                                              />
                                              <Modal
                                                title="Thêm rom"
                                                open={openFormrom}
                                                confirmLoading={confirmLoading}
                                                footer={[
                                                  <Button
                                                    type="danger"
                                                    style={{
                                                      height: 40,
                                                      marginRight: `3%`,
                                                    }}
                                                    onClick={handleCancel}
                                                  >
                                                    Huỷ
                                                  </Button>,
                                                  <Button
                                                    type="primary"
                                                    loading={loading}
                                                    style={{
                                                      height: 40,
                                                      marginRight: `36%`,
                                                    }}
                                                    onClick={handleOkFormrom}
                                                  >
                                                    + Thêm mới
                                                  </Button>,
                                                ]}
                                              >
                                                <p>
                                                  <h2
                                                    style={{
                                                      marginBottom: `2%`,
                                                      textAlign: `center`,
                                                      fontSize: `27px`,
                                                    }}
                                                  >
                                                    Thêm rom
                                                  </h2>

                                                  <FormLabel
                                                    style={{
                                                      marginLeft: `9px`,
                                                      fontSize: `14px`,
                                                    }}
                                                  >
                                                    {" "}
                                                    Kích thuớc rom{" "}
                                                  </FormLabel>
                                                  <TextField
                                                    label=""
                                                    id="fullWidth"
                                                    name="capacityRom"
                                                    value={romForm.capacityRom}
                                                    onChange={(e) =>
                                                      onInputChangeFormrom
                                                    }
                                                    error={
                                                      (formSubmitted &&
                                                        !romForm.capacityRom) ||
                                                      !!capacityRomError
                                                    }
                                                    helperText={
                                                      capacityRomError ||
                                                      (formSubmitted &&
                                                        !romForm.capacityRom &&
                                                        "Kích thước rom không được trống")
                                                    }
                                                    style={{ width: "100%" }}
                                                  />
                                                </p>
                                              </Modal>

                                              <FormControl
                                                variant="standard"
                                                sx={{ m: 1, minWidth: 120 }}
                                              >
                                                <InputLabel
                                                  id="demo-simple-select-standard-label-rom"
                                                  className="inputlabel_of_selection"
                                                >
                                                  ROM
                                                </InputLabel>
                                                <Select
                                                  error={
                                                    (formSubmitted &&
                                                      !cauHinh.rom) ||
                                                    !!romError
                                                  }
                                                  className="selection_custom"
                                                  labelId="demo-simple-select-standard-label-rom"
                                                  id="demo-simple-select-filled"
                                                  // value={cauHinh.rom}
                                                  onChange={
                                                    handleChangeFormCauHinh
                                                  }
                                                >
                                                  {listRom.map(
                                                    (item, index) => {
                                                      return (
                                                        <MenuItem
                                                          value={item.value}
                                                        >
                                                          {item.label}
                                                        </MenuItem>
                                                      );
                                                    }
                                                  )}
                                                </Select>
                                                <FormHelperText
                                                  style={{ color: `red` }}
                                                >
                                                  {romError ||
                                                    (formSubmitted &&
                                                      !cauHinh.rom &&
                                                      `
                                                                                                              Bạn phải chọn một rom
                                                                                                               `)}
                                                </FormHelperText>
                                              </FormControl>
                                            </Form.Group>
                                          </Col>

                                          <Col span={8}>
                                            <Form.Group className="form-group">
                                              <FontAwesomeIcon
                                                className="font_awesome_icon_selection_custom"
                                                icon={faPlus}
                                                onClick={showModalFormram}
                                              />
                                              <Modal
                                                title="Thêm dung lượng ram"
                                                open={openFormram}
                                                onOk={handleOkFormram}
                                                confirmLoading={confirmLoading}
                                                onCancel={handleCancel}
                                              >
                                                <p>
                                                  <Form>
                                                    <Form.Group className="form-group">
                                                      <Form.Label htmlFor="email">
                                                        Mã
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        name="maram"
                                                        value={maram}
                                                        id="maram"
                                                      />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                      <Form.Label htmlFor="pwd">
                                                        Dung lượng ram
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        placeholder="Nhập dung lượng ram"
                                                        name="tenram"
                                                        value={tenram}
                                                        onChange={(e) =>
                                                          onInputChangeFormram(
                                                            e
                                                          )
                                                        }
                                                        id="ten`"
                                                      />
                                                    </Form.Group>
                                                  </Form>
                                                </p>
                                              </Modal>

                                              <FormControl
                                                variant="standard"
                                                sx={{ m: 1, minWidth: 120 }}
                                              >
                                                <InputLabel
                                                  id="demo-simple-select-standard-label-ram"
                                                  className="inputlabel_of_selection"
                                                >
                                                  RAM
                                                </InputLabel>
                                                <Select
                                                  error={
                                                    (formSubmitted &&
                                                      !cauHinh.ram) ||
                                                    !!romError
                                                  }
                                                  className="selection_custom"
                                                  labelId="demo-simple-select-standard-label-ram"
                                                  id="demo-simple-select-filled"
                                                  // value={cauHinh.ram}
                                                  onChange={
                                                    handleChangeFormCauHinh
                                                  }
                                                >
                                                  {listRam.map(
                                                    (item, index) => {
                                                      return (
                                                        <MenuItem
                                                          value={item.value}
                                                        >
                                                          {item.label}
                                                        </MenuItem>
                                                      );
                                                    }
                                                  )}
                                                </Select>
                                                <FormHelperText
                                                  style={{ color: `red` }}
                                                >
                                                  {ramError ||
                                                    (formSubmitted &&
                                                      !cauHinh.ram &&
                                                      `
                                                                                                              Bạn phải chọn một ram
                                                                                                              `)}
                                                </FormHelperText>
                                              </FormControl>
                                            </Form.Group>
                                          </Col>

                                          <Col span={8}>
                                            <Form.Group className="form-group">
                                              <FontAwesomeIcon
                                                className="font_awesome_icon_selection_custom"
                                                icon={faPlus}
                                                onClick={showModalFormmauSac}
                                              />
                                              <Modal
                                                title="Thêm màu sắc"
                                                open={openFormmauSac}
                                                onOk={handleOkFormmauSac}
                                                confirmLoading={confirmLoading}
                                                onCancel={handleCancel}
                                              >
                                                <p>
                                                  <Form>
                                                    <Form.Group className="form-group">
                                                      <Form.Label htmlFor="email">
                                                        Mã
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        name="mamauSac"
                                                        value={mamauSac}
                                                        id="mamauSac"
                                                      />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                      <Form.Label htmlFor="pwd">
                                                        Tên màu sắc{" "}
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        placeholder="Nhập tên màu sắc"
                                                        name="tenmauSac"
                                                        value={tenmauSac}
                                                        onChange={(e) =>
                                                          onInputChangeFormmauSac(
                                                            e
                                                          )
                                                        }
                                                        id="ten`"
                                                      />
                                                    </Form.Group>
                                                  </Form>
                                                </p>
                                              </Modal>

                                              <FormControl
                                                variant="standard"
                                                sx={{ m: 1, minWidth: 120 }}
                                              >
                                                <InputLabel
                                                  id="demo-simple-select-standard-label-color"
                                                  className="inputlabel_of_selection"
                                                >
                                                  Màu sắc
                                                </InputLabel>
                                                <Select
                                                  error={
                                                    (formSubmitted &&
                                                      !cauHinh.mauSac) ||
                                                    !!mauSacError
                                                  }
                                                  className="selection_custom"
                                                  labelId="demo-simple-select-standard-label-color"
                                                  id="demo-simple-select-filled"
                                                  // value={cauHinh.mauSac}
                                                  onChange={
                                                    handleChangeFormCauHinh
                                                  }
                                                >
                                                  {listMauSac.map(
                                                    (item, index) => {
                                                      return (
                                                        <MenuItem
                                                          value={item.value}
                                                        >
                                                          {item.label}
                                                        </MenuItem>
                                                      );
                                                    }
                                                  )}
                                                </Select>
                                                <FormHelperText
                                                  style={{ color: `red` }}
                                                >
                                                  {mauSacError ||
                                                    (formSubmitted &&
                                                      !cauHinh.mauSac &&
                                                      `
                                                                                                              Bạn phải chọn màu sắc
                                                                                                              `)}
                                                </FormHelperText>
                                              </FormControl>
                                            </Form.Group>
                                          </Col>
                                        </Row>

                                        <Button
                                          id="addConfig"
                                          variant="outlined"
                                          color="error"
                                          style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            marginLeft: 230,
                                            marginRight: 20,
                                          }}
                                          onClick={cancelAddConfig}
                                        >
                                          <FontAwesomeIcon
                                            style={{ marginRight: 10 }}
                                            icon={faCheck}
                                          />{" "}
                                          Huỷ
                                        </Button>
                                        <Button
                                          id="addConfig"
                                          variant="outlined"
                                          color="success"
                                          style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                          }}
                                          onClick={addNewConfig}
                                        >
                                          <FontAwesomeIcon
                                            style={{ marginRight: 10 }}
                                            icon={faCheck}
                                          />{" "}
                                          Hoàn thành
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          id="addConfig"
                                          variant="contained"
                                          style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            marginLeft: `77%`,
                                            marginBottom: 30,
                                          }}
                                          onClick={addNewConfig}
                                        >
                                          <FontAwesomeIcon
                                            style={{ marginRight: 10 }}
                                            icon={faPlus}
                                          />{" "}
                                          Thêm mới
                                        </Button>

                                        <Table
                                          rowSelection={{
                                            type: `checkbox`,
                                            ...rowSelection,
                                          }}
                                          columns={columns}
                                          pagination={false}
                                          dataSource={listCauHinh}
                                        />
                                        <Pagination
                                          style={{
                                            marginLeft: `40%`,
                                            marginTop: `3%`,
                                          }}
                                          simplecurrent={currentPage + 1}
                                          onChange={(value) => {
                                            setCurrentPage(value - 1);
                                          }}
                                          total={totalPages * 10}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Modal>
                              <br />
                            </div>
                          ) : (
                            <div></div>
                          ),
                      };
                    })}
                  />
                </Col>
              </Row>
            </div>
          )}
        </>
        <br />
      </Form>
    </div>
  );
};

export default ThemSanPham;
