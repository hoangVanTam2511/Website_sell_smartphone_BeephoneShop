import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table, Checkbox as CheckboxAntd } from "antd";
import Link from '@mui/material/Link';
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, ImageListItemBar, selectClasses, } from "@mui/material";
import Alert from "@mui/joy/Alert";
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import * as dayjs from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from '../../../utilities/loading';
import useCustomSnackbar from '../../../utilities/notistack';
import { Notistack } from "./enum";
import { Box as BoxJoy } from '@mui/joy';
import { Card as CardJoy } from '@mui/joy';
import { Checkbox as CheckboxJoy, checkboxClasses } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import { FaUpload } from "react-icons/fa6";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import TextFieldSearchColors from "./text-field-search-colors";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Done from '@mui/icons-material/Done';
import ModalUpdateCauHinh from "./modal-update-cau-hinh";
import generateRandomCode from "../../../utilities/genCode";
import TextFieldPrice from "./text-field-input-price-product";
import { Col, Row } from "react-bootstrap";
import ImageUpload from "../../../utilities/upload";
import ImportAndExportExcelImei from "../../../utilities/excelUtils";
import { ImportExcelImei } from "./import-imei-by";
import CreateRom from "./create-rom";
import CreateRam from "./create-ram";
import Sheet from "@mui/joy/Sheet";
import { ConfirmAddProduct, ConfirmChangeTypePhienBan } from "./AlertDialogSlide";
import ModalChonDonGiaChung from "./modal-don-gia-chung";
import CreateMauSac from "./create-mau-sac";
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { request } from '../../../store/helpers/axios_helper'

const ITEM_HEIGHT = 130;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateCauHinh = ({ productName, getProduct, getOverplay, confirm, valid, isConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);


  const [validImage, setValidImage] = useState(true);
  const [refreshPrice, setRefreshPrice] = useState([]);

  const getValidImage = (valid) => {
    setValidImage(valid);
  }

  const [openModalType, setOpenModalType] = useState(false);
  const handleCloseOpenModalType = () => {
    setOpenModalType(false);
  }
  const [type, setType] = useState(true);
  const handleChangeType = (e) => {
    const value = e.target.checked;
    if (cauHinhs && cauHinhs.length > 0) {
      setOpenModalType(true);
    }
    else {
      setType(value);
      setCauHinhs([]);
      setCauHinhsFinal([]);
      setSelectedRam([]);
      setSelectedRom([]);
    }
  }
  const navigate = useNavigate();
  const redirectProductPage = () => {
    navigate(`/dashboard/products`);
  }
  const [listColor, setListColor] = useState([]);
  const getListColor = async () => {
    request('GET',`/api/colors`)
      .then((response) => {
        setListColor(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [listRam, setListRam] = useState([]);
  const [listRom, setListRom] = useState([]);
  const getListRom = () => {
    request('GET',`/api/roms`)
      .then((response) => {
        setListRom(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getListRam = () => {
    request('GET',`/api/rams`)
      .then((response) => {
        setListRam(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listImeiCurrent, setListImeiCurrent] = useState([]);

  const getAllImei = () => {
    request('GET',`/api/imeis/all`, {
      })
      .then((response) => {
        setListImeiCurrent(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllImei();
    getListColor();
    getListRam();
    getListRom();

  }, [])


  const [imeis, setImeis] = useState([]);
  const [isLoadingInside, setIsLoadingInside] = useState(false);
  const handleDownloadSample = () => {
    setIsLoading(true);
    request('POST','/api/create-excel-template-by', {}, { responseType: 'blob' }) // Sử dụng phương thức POST
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Mẫu Import IMEI.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      }
      );
  }

  const [openModalImel, setOpenModalImei] = useState(false);

  const handleOpenModalImei = () => {
    setOpenModalImei(true);
  }

  const handleCloseModalImei = () => {
    setOpenModalImei(false);
  }

  const handleUpdateImageProduct = (url) => {
  };
  const [defaultRam, setDefaultRam] = useState(null);
  const [defaultRom, setDefaultRom] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalUpdatePrice, setOpenModalUpdatePrice] = useState(false);
  const [openModalConfirmAddProduct, setOpenModalConfirmAddProduct] = useState(false);
  const handleCloseOpenModalConfirmAddProduct = () => {
    setOpenModalConfirmAddProduct(false);
  }
  const handleOpenModalUpdatePrice = () => {
    setOpenModalUpdatePrice(true);
  }
  const handleCloseOpenModalUpdatePrice = () => {
    setOpenModalUpdatePrice(false);
  }
  const handleOpenModalUpdate = () => {
    setOpenModalUpdate(true);
  }

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  }

  const [itemId, setItemId] = useState("");
  const [selectedCauHinhs, setSelectedCauHinhs] = useState([]);
  const [selectedCauHinhsFinal, setSelectedCauHinhsFinal] = useState([]);

  const handleChangeSelectedCauHinhs = (e, item) => {
    if (e.target.checked) {
      setSelectedCauHinhs([...selectedCauHinhs, item]);
    } else {
      setSelectedCauHinhs(selectedCauHinhs.filter((cauHinh) => cauHinh.id !== item.id));
    }
  };

  const [dataChanged, setDataChanged] = useState(0);
  const updatePriceCommon = (donGia) => {
    const updatedCauHinhsFinal = cauHinhsFinal.map((item) => {
      if (selectedRowKeys.some((selected) => item.ma === selected)) {
        return { ...item, donGia: donGia };
      }
      return item;
    })
    console.log(updatedCauHinhsFinal);
    setCauHinhsFinal(updatedCauHinhsFinal);
    setDataChanged((count) => count + 1);
  }

  const [openMauSac, setOpenMauSac] = React.useState(false);
  const handleCloseOpenMauSac = () => {
    setOpenMauSac(false);
  }

  const [openRom, setOpenRom] = React.useState(false);
  const handleCloseOpenRom = () => {
    setOpenRom(false);
  }
  const handleCloseOpenRam = () => {
    setOpenRam(false);
  }
  const [openRam, setOpenRam] = React.useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [open, setOpen] = React.useState(false);
  const [cauHinhsFinal, setCauHinhsFinal] = useState([]);
  const [cauHinhs, setCauHinhs] = useState([
  ]);

  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedRom, setSelectedRom] = useState([]);

  const handleChangeSelectedRam = (event) => {
    const list = event.target.value;
    setSelectedRam(list);

    if (!type) {
      const updatedCauHinhs = cauHinhs && cauHinhs.filter((cauHinh) => list.includes(cauHinh.ram.id));
      setCauHinhsFinal((prev) => prev.filter((cauHinhFinal) => list.includes(cauHinhFinal.ram.id)));

      setSelectedRom((selectedRom) => selectedRom.filter((_, index) => list.includes(cauHinhs[index].ram.id)));

      list.forEach((selectedRam) => {
        const isExisting = updatedCauHinhs.some((cauHinh) => cauHinh.ram.id === selectedRam);

        if (!isExisting) {
          const getRam = listRam.find((ram) => ram.id === selectedRam);
          const cauHinhMoi = {
            id: generateRandomId(),
            ram: getRam,
            rom: null,
            colors: valueColorFinal,
          };

          updatedCauHinhs.push(cauHinhMoi);

          const objectsTachRa = cauHinhMoi.colors.flatMap((color) => {
            return {
              ...cauHinhMoi,
              color: color,
              soLuongTonKho: 0,
              donGia: null,
              url: '',
              ma: generateRandomId(),
            };
          });

          const updatedObjectsTachRa = objectsTachRa.map((object) => {
            const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === object.color.id);
            if (matchingCauHinhFinal) {
              return {
                ...object,
                image: matchingCauHinhFinal.image,
                file: matchingCauHinhFinal.file,
              };
            }
            return object;
          });

          console.log(updatedObjectsTachRa);

          setCauHinhsFinal((prev) => [...prev, ...updatedObjectsTachRa]);
        }
      });

      setCauHinhs(updatedCauHinhs);
    }
    else {
      if (list.length === 0) {
        setSelectedRom([]);
      }

      if (selectedRom.length === 0) {
        const updatedCauHinhs = cauHinhs && cauHinhs.filter((cauHinh) => list.includes(cauHinh.ram.id));
        setCauHinhsFinal((prev) => prev.filter((cauHinhFinal) => list.includes(cauHinhFinal.ram.id)));

        list.forEach((selectedRam) => {
          const isExisting = updatedCauHinhs.some((cauHinh) => cauHinh.ram.id === selectedRam);

          if (!isExisting) {
            const getRam = listRam.find((ram) => ram.id === selectedRam);
            const cauHinhMoi = {
              id: generateRandomId(),
              ram: getRam,
              rom: null,
              colors: valueColorFinal,
            };

            updatedCauHinhs.push(cauHinhMoi);
            const objectsTachRa = cauHinhMoi.colors.flatMap((color) => {
              return {
                ...cauHinhMoi,
                color: color,
                soLuongTonKho: 0,
                donGia: null,
                url: '',
                ma: generateRandomId(),
              };
            });
            const updatedObjectsTachRa = objectsTachRa.map((object) => {
              const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === object.color.id);
              if (matchingCauHinhFinal) {
                return {
                  ...object,
                  image: matchingCauHinhFinal.image,
                  file: matchingCauHinhFinal.file,
                };
              }
              return object;
            });
            console.log(updatedObjectsTachRa);
            setCauHinhsFinal((prev) => [...prev, ...updatedObjectsTachRa]);
          }
        });

        setCauHinhs(updatedCauHinhs);
      }

      else {
        const updatedCauHinhs = list.flatMap((item) =>
          selectedRom.map((s) => {
            const existingCauHinh = cauHinhs && cauHinhs.find(
              (cauHinh) => cauHinh.ram.id === item && cauHinh.rom.id === s
            );

            if (existingCauHinh) {
              return {
                ...existingCauHinh,
              };
            } else {
              return {
                id: generateRandomId(),
                ram: listRam.find((ram) => ram.id === item),
                rom: listRom.find((rom) => rom.id === s),
                colors: valueColorFinal,
              };
            }
          })
        );

        setCauHinhs(updatedCauHinhs);

        const updatedCauHinhsFinal = updatedCauHinhs.flatMap((cauHinh) =>
          cauHinh.colors.map((color) => {
            const existingCauHinhFinal = cauHinhsFinal.find(
              (cauHinhFinal) => cauHinhFinal.ram.id === cauHinh.ram.id && cauHinhFinal.rom.id === cauHinh.rom.id && cauHinhFinal.color === color
            );

            if (existingCauHinhFinal) {
              return {
                ...existingCauHinhFinal,
              };
            } else {
              return {
                ...cauHinh,
                color: color,
                soLuongTonKho: 0,
                donGia: null,
                url: '',
                ma: generateRandomId(),
              };
            }
          })
        );

        const updatedObjectsTachRa = updatedCauHinhsFinal.map((object) => {
          const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === object.color.id);
          if (matchingCauHinhFinal) {
            return {
              ...object,
              image: matchingCauHinhFinal.image,
              file: matchingCauHinhFinal.file,
            };
          }
          return object;
        });
        console.log(updatedObjectsTachRa);
        setCauHinhsFinal(updatedObjectsTachRa);
      }

    }
  };

  const handleChangeSelectedRom = (event) => {
    const list = event.target.value;
    if (selectedRam.length === 0) {
      handleOpenAlertVariant("Bạn cần chọn RAM trước!", "warning");
    }
    else if (list.length > selectedRam.length && !type) {
      handleOpenAlertVariant("Số lượng ROM chỉ cho phép bằng với số lượng RAM!", "warning");
    }
    else {
      if (!type) {
        setSelectedRom(list);
        const updatedCauHinhs = cauHinhs && cauHinhs.map((cauHinh, index) => {
          const romId = list[index];

          return {
            ...cauHinh,
            rom: romId ? listRom.find((rom) => rom.id === romId) : null,
          };
        });

        setCauHinhs(updatedCauHinhs);

        const updatedCauHinhsFinal = cauHinhsFinal.map((cauHinhFinal) => {
          const correspondingCauHinh = updatedCauHinhs.find(
            (cauHinh) => cauHinh.ram.id === cauHinhFinal.ram.id
          );

          return {
            ...cauHinhFinal,
            rom: correspondingCauHinh ? correspondingCauHinh.rom : null,
          };
        });

        setCauHinhsFinal(updatedCauHinhsFinal);

      }
      else {
        if (list.length === 0) {
          setSelectedRom(list);
          const updatedCauHinhs = selectedRam.map((s) => {
            const getRam = listRam.find((ram) => ram.id === s);
            const cauHinhMoi = {
              id: generateRandomId(),
              ram: getRam,
              rom: null,
              colors: valueColorFinal,
            };

            return cauHinhMoi;
          });

          setCauHinhsFinal([]);
          setCauHinhs(updatedCauHinhs);
        }
        else {
          setSelectedRom(list);
          const updatedCauHinhs = selectedRam.flatMap((item) =>
            list.map((s) => {
              const existingCauHinh = cauHinhs && cauHinhs.find(
                (cauHinh) => cauHinh && cauHinh.ram && cauHinh.ram.id === item && cauHinh && cauHinh.rom && cauHinh.rom.id === s
              );

              if (existingCauHinh) {
                return {
                  ...existingCauHinh,
                };
              } else {
                return {
                  id: generateRandomId(),
                  ram: listRam.find((ram) => ram.id === item),
                  rom: listRom.find((rom) => rom.id === s),
                  colors: valueColorFinal,
                };
              }
            })
          );

          setCauHinhs(updatedCauHinhs);

          const updatedCauHinhsFinal = updatedCauHinhs.flatMap((cauHinh) =>
            cauHinh.colors.map((color) => {
              const existingCauHinhFinal = cauHinhsFinal.find(
                (cauHinhFinal) => cauHinhFinal && cauHinhFinal.ram && cauHinhFinal.ram.id === cauHinh.ram.id &&
                  cauHinhFinal && cauHinhFinal.rom && cauHinhFinal.rom.id === cauHinh.rom.id &&
                  cauHinhFinal && cauHinhFinal.color && cauHinhFinal.color === color
              );

              if (existingCauHinhFinal) {
                return {
                  ...existingCauHinhFinal,
                };
              } else {
                return {
                  ...cauHinh,
                  color: color,
                  soLuongTonKho: 0,
                  donGia: null,
                  url: '',
                  ma: generateRandomId(),
                };
              }
            })
          );
          const updatedObjectsTachRa = updatedCauHinhsFinal.map((object) => {
            const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === object.color.id);
            if (matchingCauHinhFinal) {
              return {
                ...object,
                image: matchingCauHinhFinal.image,
                file: matchingCauHinhFinal.file,
              };
            }
            return object;
          });
          console.log(updatedObjectsTachRa);
          setCauHinhsFinal(updatedObjectsTachRa);
        }
      }
    }
  };

  const [listColorCurrent, setListColorCurrent] = useState([]);
  const joinedStringArr = (arr) => {
    const joinedString = arr.reduce((acc, curr, index) => {
      if (index === 0) {
        return curr;
      } else {
        return `${acc}, ${curr}`;
      }
    }, "");
    return joinedString;
  }
  const [valueColor, setValueColor] = useState([]);
  const [openSelectColor, setOpenSelectColor] = useState(false);
  const [openListColorCurrent, setOpenListColorCurrent] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [valueColorFinal, setValueColorFinal] = useState([]);
  const joinedColors = joinedStringArr(valueColorFinal.map((color) => color.tenMauSac));
  const filterColors = listColor.filter((color) =>
    color.tenMauSac.toLowerCase().includes(keyword.toLowerCase())
  );
  const uniqueConfigurations = cauHinhs && cauHinhs.filter((item, index) => {
    if (cauHinhsFinal.length > 0) {
      const currentColors = item.colors.map((color) => color.tenMauSac);
      for (let i = 0; i < index; i++) {
        const prevColors = cauHinhs[i].colors.map((color) => color.tenMauSac);
        if (JSON.stringify(currentColors) === JSON.stringify(prevColors)) {
          return false; // Loại bỏ cấu hình trùng lặp
        }
      }
      return true; // Giữ lại cấu hình không trùng lặp
    }
  });
  const uniqueCauHinhsFinal = cauHinhsFinal.filter((object, index, self) =>
    index === self.findIndex((obj) => obj.color.id === object.color.id)
  );

  const handleOpenListColorCurrent = () => {
    setOpenListColorCurrent(true);
  }
  const handleCloseListColorCurrent = () => {
    setOpenListColorCurrent(false);
  }

  const handleCloseSelectColor = () => {
    setOpenSelectColor(false);
  };
  const handleOpenSelectColor = () => {
    setOpenSelectColor(true);
  };
  const getKeyword = (value) => {
    setKeyword(value);
  }

  const updateData = (id, ram, rom, colors) => {
    const updateDatas = cauHinhs.map((item) => {
      if (item.id === id) {
        return { ...item, ram: ram, rom: rom, colors: colors };
      }
      return item;
    })
    // updateDatas.sort((a, b) => {
    //   if (a.ram.dungLuong !== b.ram.dungLuong) {
    //     return a.ram.dungLuong - b.ram.dungLuong;
    //   } else {
    //     return a.rom.dungLuong - b.rom.dungLuong;
    //   }
    // });
    setCauHinhs(updateDatas);

    const updatedCauHinhsFinal = [...cauHinhsFinal];

    cauHinhs.forEach((cauHinh) => {
      if (cauHinh.id === id) {
        const listFinal = cauHinhsFinal.filter((item) => item.id === cauHinh.id);
        if (colors.length === 0) {
          const remove = updatedCauHinhsFinal.filter((item) => item.id !== id);
          setCauHinhsFinal(remove);
        }

        // Lọc ra các object có color nằm trong list colors truyền vào
        const filteredList = listFinal.filter((item) => colors.some((color) => color.id === item.color.id));

        // Xóa các object có color không nằm trong list colors
        const remove = listFinal.filter((item) => !filteredList.includes(item));
        remove.forEach((item) => {
          const index = updatedCauHinhsFinal.findIndex((obj) => obj === item);
          updatedCauHinhsFinal.splice(index, 1);
        });

        colors.forEach((color) => {
          const matchedObj = listFinal.find((c) => c.color.id === color.id);
          if (matchedObj) {
            const updatedObj = {
              ...matchedObj,
              ram: ram,
              rom: rom,
            };
            const index = updatedCauHinhsFinal.findIndex((obj) => obj === matchedObj);
            updatedCauHinhsFinal[index] = updatedObj;
          }
          else {
            const newObj = {
              ...cauHinh,
              color: color,
              stt: 0,
              soLuongTonKho: 0,
              donGia: null,
              url: '',
              ma: generateRandomId(),
            };
            updatedCauHinhsFinal.push(newObj);
          }

          const updatedObjectsTachRa = updatedCauHinhsFinal.map((object) => {
            const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === object.color.id);
            if (matchingCauHinhFinal) {
              return {
                ...object,
                image: matchingCauHinhFinal.image,
                file: matchingCauHinhFinal.file,
              };
            }
            return object;
          });
          setCauHinhsFinal(updatedObjectsTachRa);

        });
      }
    });
  }

  const objectsTachRaByIdSelected = (id) => {
    return cauHinhsFinal && cauHinhsFinal.filter((item) => {
      return item.id === id;
    });
  };

  const updatePrice = (price, ma) => {
    if (cauHinhsFinal && cauHinhsFinal.length > 0) {
      const newData = [...cauHinhsFinal];
      const index = newData.findIndex((item) => item.ma === ma);
      if (index > -1) {
        newData[index].donGia = price;
        localStorage.setItem("cauHinhsFinal", JSON.stringify(newData));
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cauHinhsFinal", JSON.stringify(cauHinhsFinal));
  }, [cauHinhsFinal])

  const getImeisFromImport = (imeis, ma) => {
    const updatedCauHinhsFinal = cauHinhsFinal.map(item => {
      if (item.ma === ma) {
        let updatedImeis = imeis;
        if (Array.isArray(item.imeis)) {
          updatedImeis = [...item.imeis, ...imeis];
        }
        return {
          ...item,
          soLuongTonKho: item.soLuongTonKho + imeis.length,
          imeis: updatedImeis
        };
      }
      return item;
    });

    setCauHinhsFinal(updatedCauHinhsFinal);
  }

  const cauHinhsFinalById = (id) => {
    return cauHinhsFinal.filter((item) => item.id === id);
  };


  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const [selectedRowKeysList, setSelectedRowKeysList] = useState([]);
  // const onSelectChange1 = (id, newSelectedRowKeys) => {
  //   const updatedSelectedRowKeysList = { id, selectedRowKeys: newSelectedRowKeys };
  //   setSelectedRowKeysList(prevList => [...prevList, updatedSelectedRowKeysList]);
  //   console.log(selectedRowKeysList);
  // };
  //
  // const getRowSelection = (id) => {
  //   const index = cauHinhs.findIndex((table) => table.id === id);
  //   return {
  //     selectedRowKeys: selectedRowKeysList[index],
  //     onChange: (newSelectedRowKeys) => onSelectChange1(id, newSelectedRowKeys),
  //   };
  // };


  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>{objectsTachRaByIdSelected(record.id).indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      width: "30%",
      render: (text, record) => {
        return (
          <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>
            {productName} {record.ram ? record.ram.dungLuong : ""}/{record.rom ? record.rom.dungLuong : ""}GB
          </span>
        )
      }
    },
    {
      title: "Màu Sắc",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>{record.color.tenMauSac}</span>
      ),
    },
    {
      title: "Số Lượng Tồn Kho",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <>
          <Tooltip title="Danh sách IMEI" TransitionComponent={Zoom}>
            <div onClick={() => { setOpenModalImei(true); setImeis(record.imeis && record.imeis) }} style={{ cursor: "pointer" }}>
              <span style={{ fontWeight: "400" }} className="underline-blue">
                {record.soLuongTonKho}
              </span>
            </div>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Đơn Giá",
      align: "center",
      width: "15%",
      render: (text, record, index) => {
        return (
          <TextFieldPrice confirm={isConfirm} update={updatePrice} ma={record.ma} value={cauHinhsFinal.find(item => item.ma === record.ma)?.donGia} />
        );
      },
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <div className="button-container">
            <ImportExcelImei ma={record.ma} get={getImeisFromImport} listImeiCurrent={listImeiCurrent} listImeiCurrentSheet={cauHinhsFinal && imeiObjects} />
            <Tooltip title="Xóa" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  const newCauHinhsFinal = cauHinhsFinal.filter((cauHinh) => cauHinh.ma !== record.ma);
                  setCauHinhsFinal(newCauHinhsFinal);
                  const color = record.color;
                  const id = record.id;
                  const updatedCauHinhs = cauHinhs.map((cauHinh) => {
                    if (cauHinh.id === id) {
                      const updatedColors = cauHinh.colors.filter((c) => c !== color);
                      return { ...cauHinh, colors: updatedColors };
                    }
                    return cauHinh;
                  });

                  setCauHinhs(updatedCauHinhs);
                }}
                className="">
                <FaTrashAlt color="#e5383b" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  function findObjectsById(id) {
    const objectsTachRaById = cauHinhsFinal && cauHinhsFinal.filter((item) => {
      return item.id === id;
    });
    return objectsTachRaById;
  }

  const listCauHinhsFinal = (cauHinhsFinal, id) => {
    const updatedObjectsTachRaById = cauHinhsFinal.filter((item) => item.id === id);
    return updatedObjectsTachRaById;
  };


  const CauHinhTable = ({ id }) => {
    const objectsTachRaById = cauHinhsFinal && cauHinhsFinal.filter((item) => {
      return item.id === id;
    })

    return (
      <>
        <Table
          className="table-container mt-2"
          columns={columns}
          rowKey="ma"
          key={"id"}
          rowSelection={rowSelection}
          dataSource={objectsTachRaById}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };

  const generateRandomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  };
  const [selectKey, setSelectKey] = useState(0);

  const handleAddProduct = async () => {
    handleCloseOpenModalConfirmAddProduct();
    setIsLoadingInside(true);
    getOverplay(true);
    const storeItem = localStorage.getItem('cauHinhsFinal');
    const products = {
      product: getProduct,
      productItems: JSON.parse(storeItem),
    }
    // check product  
    console.log(products)
    try {
      request('POST',`/api/products`, products, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      const isMissingImage = cauHinhsFinal.some((cauHinh) => !cauHinh.image);
      if (!isMissingImage) {
        await addFiles(products.product.ma);
      }
      handleOpenAlertVariant("Thêm sản phẩm thành công!", Notistack.SUCCESS);
      setIsLoadingInside(false);
      getOverplay(false);
      setTimeout(() => {
        redirectProductPage();
      }, 1000);
    }
    catch (error) {
      setIsLoadingInside(false);
      getOverplay(false);
      console.error(error);
    }
  }
  const listFiles = [...cauHinhsFinal]
  const listDtoFiles = listFiles.map(config => {
    return {
      id: config.ma,
      file: config.file
    };
  });

  const formData = new FormData(); // Tạo một FormData mới ở mỗi lần gửi
  listDtoFiles.forEach((item, index) => {
    const newFileName = item.id;
    const blobWithCustomFileName = new Blob([item.file], { type: 'application/octet-stream' });
    formData.append('files', blobWithCustomFileName, newFileName);
  });

  const addFiles = async (ma) => {
    try {
      request('POST','/api/products/upload-multiple', formData, {
        params: {
          ma: ma,
        }
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    catch (error) {
      setIsLoading(false);
      console.error("Error");
    }
  }

  const handleDeleteImage = (colorId) => {
    const updateDatas = cauHinhsFinal.map((item) => {
      if (item.color.id === colorId) {
        return { ...item, image: null, file: null };
      }
      return item;
    })
    setCauHinhsFinal(updateDatas);
    console.log(updateDatas);
  }

  const addImageToProductItem = (colorId, url, file, prevColor) => {
    if (colorId !== " ") {
      const updateDatas = cauHinhsFinal.map((item) => {
        if (item.color.id === colorId) {
          return { ...item, image: url, file: file };
        }
        if (item.color.id === prevColor) {
          return { ...item, image: null, file: null };
        }
        return item;
      })
      setCauHinhsFinal(updateDatas);
      console.log(updateDatas);
    }
    else {
      const updateDatas = cauHinhsFinal.map((item) => {
        if (item.color.id === prevColor) {
          return { ...item, image: null, file: null };
        }
        return item;
      })
      setCauHinhsFinal(updateDatas);
      console.log(updateDatas);
    }
  }

  const [barcodeImages, setBarcodeImages] = useState([]);
  const [imeiTest, setImeiTest] = useState(["012930129310293", "736457346573467", "989898989898"]);

  let imeiObjects = []; // Khởi tạo biến imeiObjects1 ở bên ngoài

  if (cauHinhsFinal) {
    imeiObjects = cauHinhsFinal.reduce((acc, item) => {
      if (item && item.imeis && item.imeis.length > 0) {
        const imeis = item.imeis.map((imei) => {
          return {
            imei: imei.imei,
          };
        });
        return acc.concat(imeis);
      } else {
        return acc;
      }
    }, []);
  }

  // const convertBarcodeToImage = () => {
  //   if (cauHinhsFinal && imeiObjects) {
  //     imeiObjects.forEach((item) => {
  //       const barcodeElement = document.getElementById(item.imei);
  //       html2canvas(barcodeElement).then(canvas => {
  //         const image = canvas.toDataURL('image/png');
  //         setBarcodeImages(images => [...images, { imei: item.imei, image: image }]);
  //       });
  //     });
  //   }
  // };



  const BarcodeScanner = () => {
    return (
      <div >
        <div id="barcode" style={{
        }}>
          {imeiObjects && imeiObjects.map((item) => {
            return (
              <div id={item.imei}>
                <Barcode
                  value={item.imei}
                  background="#ffffff"
                  lineColor="#000000"
                />
              </div>
            )
          })}
        </div>
        {/* <button onClick={convertBarcodeToImage}>Chuyển đổi thành ảnh</button> */}
        {barcodeImages.map((item, index) => (
          <img key={index} src={item.image} alt={`Barcode ${index}`} />
        ))}
      </div>
    );
  }


  return (
    <>
      <div className={isLoadingInside ? "overlay" : undefined}>
        <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: "auto" }}>
          <div className="container" style={{}}>
            <div className="mx-auto" style={{ maxWidth: "95%" }}>
              <div className="d-flex justify-content-center pt-4" style={{}}>
                <div className="" style={{}}>
                  <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM PHIÊN BẢN</span>
                </div>
              </div>
              <div className="d-flex mt-4">
                <div className="mx-auto" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 355 }}>
                    <InputLabel id="demo-simple-select-label">Chọn Bộ Nhớ RAM</InputLabel>
                    <Select className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedRam}
                      onChange={handleChangeSelectedRam}
                      multiple
                      input={<OutlinedInput label="Chọn Bộ Nhớ RAM" />}
                      renderValue={(selected) =>
                        selected.map((id) => {
                          const r = listRam.find((r) => r.id === id);
                          return r ? r.dungLuong + "GB" : "";
                        })
                          .join(", ")
                      }
                      endAdornment={
                        <>
                          <InputAdornment style={{ marginRight: "15px" }} position="end">
                            <Tooltip title="Thêm bộ nhớ RAM" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenRam(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      {listRam
                        .sort((r1, r2) => r1.dungLuong - r2.dungLuong)
                        .map((r) => (
                          <MenuItem key={r.id} value={r.id}>
                            <Checkbox checked={selectedRam.indexOf(r.id) > -1} />
                            <ListItemText primary={r.dungLuong + "GB"} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 355 }}>
                    <InputLabel id="demo-simple-select-label">Chọn Bộ Nhớ ROM</InputLabel>
                    <Select className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedRom}
                      multiple
                      input={<OutlinedInput label="Chọn Bộ Nhớ ROM" />}
                      onChange={handleChangeSelectedRom}
                      renderValue={(selected) =>
                        selected.length < 0 ? "Chọn Bộ Nhớ RAM" :
                          selected
                            .map((id) => {
                              const r = listRom.find((r) => r.id === id);
                              return r ? r.dungLuong === 1024 ? 1 + "TB" : r.dungLuong + "GB" : "";
                            })
                            .join(", ")
                      }
                      endAdornment={
                        <>
                          <InputAdornment style={{ marginRight: "15px" }} position="end">
                            <Tooltip title="Thêm bộ nhớ ROM" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenRom(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      {listRom
                        .sort((rom1, rom2) => rom1.dungLuong - rom2.dungLuong)
                        .map((r) => (
                          <MenuItem key={r.id} value={r.id}>
                            <Checkbox checked={selectedRom.indexOf(r.id) > -1} />
                            <ListItemText primary={r.dungLuong === 1024 ? 1 + "TB" : r.dungLuong + "GB"} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="mx-auto ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 355 }}>
                    <InputLabel id="demo-simple-select-label">Chọn Màu Sắc Chung</InputLabel>
                    <Select className="custom"
                      MenuProps={{ autoFocus: false, disablePortal: true }}
                      onOpen={handleOpenSelectColor}
                      open={openSelectColor}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={0}
                      label="Chọn Màu Sắc Chung"
                    >
                      <MenuItem style={{ display: "none" }} value={0}>{selectColor ? joinedColors : "Chọn Màu Sắc Chung"}</MenuItem>
                      <MenuItem value={1}
                        disableRipple
                        style={{ backgroundColor: "transparent", display: "block", cursor: "auto", width: "1098px" }}
                      >
                        <div style={{ height: cauHinhs.length > 0 ? "583px" : "455px" }}>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex" style={{}}>
                              <TextFieldSearchColors onOpen={() => setOpenMauSac(true)} getColor={getKeyword} defaultValue={keyword} />
                              <Button
                                className="rounded-2 button-mui ms-2"
                                type="primary"
                                style={{ height: "40px", width: "auto", fontSize: "15px" }}
                              >
                                <span
                                  className="text-white"
                                  style={{ marginBottom: "2px", fontWeight: "500" }}
                                >
                                  Tìm Kiếm
                                </span>
                              </Button>
                              <Button
                                onClick={() => setValueColor([])}
                                className="rounded-2 button-mui ms-2"
                                type="warning"
                                style={{ height: "40px", width: "auto", fontSize: "15px" }}
                              >
                                <span
                                  className="text-dark"
                                  style={{ marginBottom: "2px", fontWeight: "500" }}
                                >
                                  Làm Mới
                                </span>
                              </Button>
                            </div>
                            <div className="d-flex">
                              <Button
                                onClick={() => {
                                  if (valueColor.length === 0) {
                                    setValueColorFinal([]);
                                    setCauHinhsFinal([]);
                                    setSelectColor(false);
                                    handleCloseSelectColor();
                                  }
                                  else {
                                    const convertColorIds = valueColor.map((item) => {
                                      const foundColor = listColor.find((color) => color.id === item);
                                      return foundColor ? foundColor : null;
                                    });
                                    const updatedCauHinhsFinal = cauHinhs && cauHinhs.map((cauHinh) => {
                                      const objectsTachRa = convertColorIds.flatMap((color) => {
                                        const newObject = {
                                          ...cauHinh,
                                          color: color,
                                          soLuongTonKho: 0,
                                          donGia: null,
                                          url: '',
                                          ma: generateRandomId(),
                                          trangThai: 0,
                                        };

                                        const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === color.id && cauHinhFinal.id === cauHinh.id);
                                        if (matchingCauHinhFinal) {
                                          return matchingCauHinhFinal;
                                        } else {
                                          return newObject;
                                        }
                                      });

                                      return objectsTachRa;
                                    });
                                    // const updatedCauHinhsFinal = cauHinhs && cauHinhs.map((cauHinh) => {
                                    //   const objectsTachRa = convertColorIds.flatMap((color) => ({
                                    //     ...cauHinh,
                                    //     color: color,
                                    //     soLuongTonKho: 0,
                                    //     donGia: null,
                                    //     url: '',
                                    //     ma: generateRandomId(),
                                    //   }));
                                    //
                                    //   return objectsTachRa;
                                    // });

                                    console.log(updatedCauHinhsFinal);
                                    const objectsTachRaMerged = updatedCauHinhsFinal.flat();
                                    const updatedObjectsTachRa = objectsTachRaMerged.map((object) => {
                                      const matchingCauHinhFinal = cauHinhsFinal.find((cauHinhFinal) => cauHinhFinal.color.id === object.color.id);
                                      if (matchingCauHinhFinal) {
                                        return {
                                          ...object,
                                          image: matchingCauHinhFinal.image,
                                          file: matchingCauHinhFinal.file,
                                        };
                                      }
                                      return object;
                                    });
                                    setCauHinhsFinal(updatedObjectsTachRa);

                                    const updatedCauHinhs = cauHinhs && cauHinhs.map((cauHinh) => ({
                                      ...cauHinh,
                                      colors: convertColorIds,
                                    }));

                                    setCauHinhs(updatedCauHinhs);

                                    setSelectColor(true);
                                    setValueColorFinal(convertColorIds);
                                    handleOpenAlertVariant("Chọn màu sắc thành công!", Notistack.SUCCESS);
                                    handleCloseSelectColor();
                                  }
                                }}
                                className="rounded-2 button-mui  me-2"
                                type="primary"
                                style={{ height: "40px", width: "auto", fontSize: "15px" }}
                              >
                                <span
                                  className=""
                                  style={{ marginBottom: "2px", fontWeight: "500" }}
                                >
                                  Xác Nhận
                                </span>
                              </Button>
                              <Button
                                onClick={() => {
                                  handleCloseSelectColor();
                                  const convertColorIds = valueColorFinal.map((item) => {
                                    return item.id;
                                  });
                                  setValueColor(convertColorIds);
                                }}
                                className="rounded-2"
                                type="danger"
                                style={{ height: "40px", width: "auto", fontSize: "15px" }}
                              >
                                <span
                                  className=""
                                  style={{ marginBottom: "2px", fontWeight: "500" }}
                                >
                                  Hủy Bỏ
                                </span>
                              </Button>
                            </div>
                          </div>
                          <div className="ms-1 scroll-color mt-4" style={{}}>
                            <h5>Tất Cả Màu Sắc</h5>
                            <div className="mt-3">
                              <List
                                orientation="horizontal"
                                wrap
                                sx={{
                                  "maxHeight": "50px",
                                  '--List-gap': '15px',
                                  '--ListItem-radius': '5px',
                                  '--ListItem-gap': '4px',
                                }}
                              >
                                {filterColors
                                  .map((item, index) => (
                                    <ListItem key={item.id}>
                                      <CheckboxJoy key={item}
                                        slotProps={{
                                          action: ({ checked }) => ({
                                            sx: checked
                                              ? {
                                                border: '1px solid',
                                                borderColor: '#2f80ed',
                                              }
                                              : {},
                                          }),
                                        }}
                                        overlay
                                        disableIcon
                                        checked={valueColor.some((color) => color === item.id)}
                                        variant={valueColor.some((color) => color === item.id) ? 'soft' : 'outlined'}
                                        onChange={(event) => {
                                          if (event.target.checked) {
                                            setValueColor((val) => [...val, item.id]);
                                          } else {
                                            setValueColor((val) => val.filter((text) => text !== item.id));
                                          }
                                        }}
                                        label={item.tenMauSac}
                                      />
                                    </ListItem>
                                  ))}
                              </List>
                            </div>
                          </div>
                          <div
                            className="mt-4 ms-1"
                            style={{
                              borderBottom: "2px solid #C7C7C7",
                              width: "99%",
                              borderWidth: "1px",
                            }}
                          ></div>
                          <h5 className="ms-1 mt-3">Màu Sắc Đã Chọn</h5>
                          <div className="colors-had-select ms-1 mt-3 d-flex">
                            <div style={{ /* maxWidth: "200px" */ }}>
                              <List
                                orientation="horizontal"
                                wrap
                                sx={{
                                  "maxHeight": "50px",
                                  '--List-gap': '15px',
                                  '--ListItem-radius': '5px',
                                  '--ListItem-gap': '4px',
                                }}
                              >
                                {valueColor
                                  .map((item, index) => (
                                    <ListItem key={index}>
                                      <Done
                                        fontSize="md"
                                        color="primary"
                                        sx={{ ml: -0.5, zIndex: 2, pointerEvents: 'none' }}
                                      />
                                      <CheckboxJoy key={index}
                                        slotProps={{
                                          action: ({ checked }) => ({
                                            sx: checked
                                              ? {
                                                border: '1px solid',
                                                borderColor: '#2f80ed',
                                              }
                                              : {},
                                          }),
                                        }}
                                        overlay
                                        disableIcon
                                        checked={valueColor.some((color) => color === item)}
                                        variant={valueColor.some((color) => color === item) ? 'soft' : 'outlined'}
                                        onChange={(event) => {
                                          if (event.target.checked) {
                                            setValueColor((val) => [...val, item]);
                                          } else {
                                            setValueColor((val) => val.filter((text) => text !== item));
                                          }
                                        }}
                                        label={listColor.find((color) => color.id === item)?.tenMauSac || null}
                                      />
                                    </ListItem>
                                  ))}
                              </List>
                            </div>
                          </div>
                          {cauHinhs && cauHinhs.length > 0 ?
                            <>
                              <div style={{ height: "10px" }}></div>
                              <div className="mt-5 pt-4">
                                <div
                                  className="ms-1"
                                  style={{
                                    borderBottom: "2px solid #C7C7C7",
                                    width: "99%",
                                    borderWidth: "1px",
                                  }}
                                ></div>
                              </div>
                              <div className="ms-1">
                                <h5 className="mt-3">Màu Sắc Của Các Phiên Bản Hiện Tại</h5>
                              </div>
                              <div className="mt-3 ms-1">
                                <div className="" style={{ width: "99.5%" }}>
                                  <FormControl fullWidth size="small">
                                    <Select className="custom"
                                      onOpen={handleOpenListColorCurrent}
                                      open={openListColorCurrent}
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={0}
                                    >
                                      <MenuItem style={{ display: "none" }} value={0}>{"Chọn Màu Sắc"}</MenuItem>
                                      <MenuItem value={1}
                                        disableRipple
                                        style={{ backgroundColor: "transparent", display: "block", cursor: "auto", width: "1095px" }}
                                      >
                                        <div >
                                          <div className="colors-had-select ms-1 d-flex scroll-color" style={{ height: "215px" }}>
                                            <div style={{}} className="">
                                              <List
                                                orientation="horizontal"
                                                wrap
                                                sx={{
                                                  "maxHeight": "50px",
                                                  '--List-gap': '15px',
                                                  '--ListItem-radius': '5px',
                                                  '--ListItem-gap': '4px',
                                                  'marginTop': '1px',
                                                  'paddingTop': '5px',
                                                }}
                                              >
                                                {uniqueConfigurations
                                                  .map((item, index) => (
                                                    <ListItem key={item.id}>
                                                      {listColorCurrent === item && (
                                                        <Done
                                                          fontSize="md"
                                                          color="primary"
                                                          sx={{ ml: -0.5, zIndex: 2, pointerEvents: 'none' }}
                                                        />
                                                      )}
                                                      <CheckboxJoy
                                                        slotProps={{
                                                          action: ({ checked }) => ({
                                                            sx: checked
                                                              ? {
                                                                border: '1px solid',
                                                                borderColor: '#2f80ed',
                                                              }
                                                              : {},
                                                          }),
                                                        }}
                                                        overlay
                                                        disableIcon
                                                        variant={listColorCurrent === item ? 'soft' : 'outlined'}
                                                        checked={listColorCurrent === item}
                                                        onChange={() => {
                                                          if (listColorCurrent === item) {
                                                            setListColorCurrent(null);
                                                          } else {
                                                            setListColorCurrent(item);
                                                          }
                                                        }}
                                                        label={item.colors.map((color) => color.tenMauSac).join(', ')}
                                                      />
                                                    </ListItem>
                                                  ))}
                                              </List>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-4 ms-1 d-flex justify-content-between">
                                          <div className="d-flex">
                                            <Button
                                              onClick={() => {
                                                if (listColorCurrent === null) {
                                                  handleOpenAlertVariant("Bạn chưa chọn màu sắc!", "warning");
                                                }
                                                else {
                                                  const convertColorIds = listColorCurrent.colors.map((item) => {
                                                    return item.id;
                                                  });
                                                  setValueColor(convertColorIds && convertColorIds);
                                                  setListColorCurrent(null);
                                                  handleOpenAlertVariant("Chọn màu sắc thành công!", Notistack.SUCCESS);
                                                  handleCloseListColorCurrent();
                                                }
                                              }}
                                              className="rounded-2 button-mui  me-2"
                                              type="primary"
                                              style={{ height: "40px", width: "auto", fontSize: "15px" }}
                                            >
                                              <span
                                                className=""
                                                style={{ marginBottom: "2px", fontWeight: "500" }}
                                              >
                                                Xác Nhận
                                              </span>
                                            </Button>
                                            <Button
                                              onClick={() => {
                                                setListColorCurrent(null);
                                                handleCloseListColorCurrent();
                                              }}
                                              className="rounded-2"
                                              type="danger"
                                              style={{ height: "40px", width: "auto", fontSize: "15px" }}
                                            >
                                              <span
                                                className=""
                                                style={{ marginBottom: "2px", fontWeight: "500" }}
                                              >
                                                Hủy Bỏ
                                              </span>
                                            </Button>
                                          </div>
                                        </div>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </>
                            : ""}
                        </div>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="text-center">
                {/*
                <Button
                  onClick={() => {
                    // getOverplay(true);
                    // if (!ram) {
                    //   handleOpenAlertVariant("Bạn chưa chọn RAM!", "warning");
                    // }
                    // else if (!rom) {
                    //   handleOpenAlertVariant("Bạn chưa chọn ROM!", "warning");
                    // }
                    // else if (valueColorFinal.length === 0) {
                    //   handleOpenAlertVariant("Bạn chưa chọn màu sắc!", "warning");
                    // }
                    // else if (
                    //   cauHinhs.some((d) => d.ram.dungLuong === ram.dungLuong && d.rom.dungLuong === rom.dungLuong)
                    // ) {
                    //   handleOpenAlertVariant(`Cấu hình đã tồn tại!`, "warning");
                    // }
                    // else {
                    // selectedRam.map((selectedRam) => {
                    //   const getRam = listRam.find((ram) => ram.id === selectedRam);
                    //   const cauHinhMoi = {
                    //     id: generateRandomId(),
                    //     ram: ram,
                    //     rom: rom,
                    //     colors: valueColorFinal,
                    //   }
                    //   setCauHinhs((cauHinhs) => [...cauHinhs, cauHinhMoi].sort((a, b) => {
                    //     if (a.ram.dungLuong !== b.ram.dungLuong) {
                    //       return a.ram.dungLuong - b.ram.dungLuong;
                    //     } else {
                    //       return a.rom.dungLuong - b.rom.dungLuong;
                    //     }
                    //   }));
                    //   const objectsTachRa = cauHinhMoi.colors.flatMap((color) => {
                    //     return {
                    //       ...cauHinhMoi,
                    //       color: color,
                    //       soLuongTonKho: 0,
                    //       donGia: null,
                    //       url: '',
                    //       ma: generateRandomId(),
                    //     };
                    //   });
                    //   setCauHinhsFinal((prev) => [...prev, ...objectsTachRa]);
                    //   console.log(getRam);
                    // })

                    // const cauHinhMoi = {
                    //   id: generateRandomId(),
                    //   ram: ram,
                    //   rom: rom,
                    //   colors: valueColorFinal,
                    // }
                    // setCauHinhs((cauHinhs) => [...cauHinhs, cauHinhMoi].sort((a, b) => {
                    //   if (a.ram.dungLuong !== b.ram.dungLuong) {
                    //     return a.ram.dungLuong - b.ram.dungLuong;
                    //   } else {
                    //     return a.rom.dungLuong - b.rom.dungLuong;
                    //   }
                    // }));
                    // const objectsTachRa = cauHinhMoi.colors.flatMap((color) => {
                    //   return {
                    //     ...cauHinhMoi,
                    //     color: color,
                    //     soLuongTonKho: 0,
                    //     donGia: null,
                    //     url: '',
                    //     ma: generateRandomId(),
                    //   };
                    // });
                    // setCauHinhsFinal((prev) => [...prev, ...objectsTachRa]);
                    // handleOpenAlertVariant("Thêm cấu hình thành công!", Notistack.SUCCESS);
                    // }
                  }}
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "auto", fontSize: "15px" }}
                >
                  <span
                    className=""
                    style={{ marginBottom: "2px", fontWeight: "500" }}
                  >
                    Thêm Phiên Bản
                  </span>
                </Button>
*/}
              </div>
              {cauHinhs && cauHinhs.length > 0 &&
                <div className="mt-3 d-flex justify-content-between">
                  <div className="">
                    {selectedCauHinhs.length > 0 &&
                      <Button
                        onClick={() => {
                          const newCauHinhs = cauHinhs.filter((cauHinh) => {
                            return !selectedCauHinhs.some((selectedCauHinh) => selectedCauHinh.id === cauHinh.id);
                          });
                          setCauHinhs(newCauHinhs);

                          const newCauHinhsFinal = cauHinhsFinal.filter((cauHinh) => {
                            return !selectedCauHinhs.some((selectedCauHinh) => selectedCauHinh.id === cauHinh.id);
                          });
                          setCauHinhsFinal(newCauHinhsFinal);

                          if (newCauHinhs && newCauHinhs.length === 0) {
                            setSelectedRam([]);
                            setSelectedRom([]);
                          }
                          const newRams = selectedRam.filter((ram) => {
                            return newCauHinhs.some((cauHinh) => cauHinh.ram.id === ram);
                          });
                          setSelectedRam(newRams);

                          const newRoms = selectedRom.filter((rom) => {
                            return newCauHinhs.some((cauHinh) => cauHinh.rom.id === rom);
                          });
                          setSelectedRom(newRoms);


                          setSelectedCauHinhs([]);
                          handleOpenAlertVariant("Xóa phiên bản thành công!", Notistack.SUCCESS);
                        }}
                        className="rounded-2"
                        type="danger"
                        style={{ height: "40px", width: "auto", fontSize: "15px" }}
                      >
                        <span
                          className=""
                          style={{ marginBottom: "2px", fontWeight: "500" }}
                        >
                          Xóa Phiên Bản
                        </span>
                      </Button>
                    }
                    <Button
                      onClick={handleDownloadSample}
                      className={selectedCauHinhs.length > 0 ? "ms-2 rounded-2 button-mui" : "rounded-2 button-mui"}
                      type="primary"
                      style={{ height: "40px", width: "auto", fontSize: "15px" }}
                    >
                      <FaDownload
                        className="ms-1"
                        style={{
                          position: "absolute",
                          bottom: "13.5px",
                          left: "10px",
                        }}
                      />
                      <span
                        className="ms-3 ps-1"
                        style={{ marginBottom: "2px", fontWeight: "500" }}
                      >
                        Tải Mẫu Import IMEI
                      </span>
                    </Button>
                  </div>
                  <div style={{ width: "42%" }} className="no-version me-1">
                    {isConfirm === true && (cauHinhs.some((cauHinh) => {
                      const foundFinalConfig = cauHinhsFinal.find((finalItem) => finalItem.id === cauHinh.id);
                      return !foundFinalConfig;
                    }) === true || cauHinhsFinal.some((cauHinh) => !cauHinh.ram || !cauHinh.rom) === true) ?
                      <BoxJoy >
                        <Alert color="danger" variant="soft">
                          Vui lòng chọn đầy đủ các thành phần cho các phiên bản khác nhau!
                        </Alert>
                      </BoxJoy>
                      : null
                    }
                  </div>
                </div>
              }
            </div>
            {cauHinhs && cauHinhs.length > 0 && cauHinhs.map((item) => {
              return (
                <>
                  <div className={"mt-3 mx-auto"} style={{ width: "95%" }} onClick={() => {
                  }}>
                    <CardJoy color={
                      isConfirm === true && (cauHinhsFinal.some((finalItem) => finalItem.id === item.id) === false
                        || item.rom === null) ?
                        "danger"
                        : "neutral"
                    }
                      orientation={'vertical'}
                      variant="outlined"
                      sx={{ width: '100%', maxWidth: '100%', gap: 1.5 }}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <span className="" style={{ marginTop: "2px" }}>
                            <CheckboxAntd size="lg"
                              checked={selectedCauHinhs.some((cauHinh) => cauHinh.id === item.id)}
                              onChange={(e) => handleChangeSelectedCauHinhs(e, item)}
                            >
                              <span className="text-dark ms-1" style={{ fontWeight: "550", fontSize: "25.5px" }}>
                                PHIÊN BẢN {' ' + (item.ram ? item.ram.dungLuong : "") + "/" + (item.rom ? item.rom.dungLuong : "") + "GB"}
                              </span>
                            </CheckboxAntd>
                          </span>
                          <span className="ms-3">
                            {isConfirm === true &&
                              item.rom === null && cauHinhsFinal.some((finalItem) => finalItem.id === item.id) === false ?
                              <BoxJoy sx={{ width: "100%" }}>
                                <Alert color="danger" variant="soft">
                                  Phiên bản này chưa có ROM và Màu sắc!
                                </Alert>
                              </BoxJoy>
                              :
                              isConfirm === true && item.rom === null ?
                                <BoxJoy sx={{ width: "100%" }}>
                                  <Alert color="danger" variant="soft">
                                    Phiên bản này chưa có ROM!
                                  </Alert>
                                </BoxJoy>
                                :
                                isConfirm === true && cauHinhsFinal.some((finalItem) => finalItem.id === item.id) === false ?
                                  <BoxJoy sx={{ width: "100%" }}>
                                    <Alert color="danger" variant="soft">
                                      Phiên bản này chưa có Màu sắc!
                                    </Alert>
                                  </BoxJoy>
                                  :
                                  null
                            }
                          </span>
                        </div>
                        <div className="d-flex">
                          <Button
                            onClick={() => {
                              handleOpenModalUpdate();
                              setDefaultRam(item.ram);
                              setDefaultRom(item.rom);
                              setSelectedColors(item.colors);
                              setSelectedId(item.id)
                            }}
                            className="rounded-2 button-mui me-2"
                            type="primary"
                            style={{ height: "40px", width: "auto", fontSize: "15px" }}
                          >
                            <span
                              className=""
                              style={{ marginBottom: "2px", fontWeight: "500" }}
                            >
                              Chọn Màu Sắc
                            </span>
                          </Button>
                          {cauHinhsFinalById(item.id).some((finalItem) => selectedRowKeys.some((selectedItem) => selectedItem === finalItem.ma)) === true &&
                            <Button
                              onClick={() => {
                                handleOpenModalUpdatePrice();
                                setItemId(item.id);
                                setRefreshPrice([]);
                              }}
                              className="rounded-2 button-mui me-2"
                              type="primary"
                              style={{ height: "40px", width: "auto", fontSize: "15px" }}
                            >
                              <span
                                className=""
                                style={{ marginBottom: "2px", fontWeight: "500" }}
                              >
                                Chọn Đơn Giá Chung
                              </span>
                            </Button>
                          }
                          {cauHinhsFinalById(item.id).some((finalItem) => selectedRowKeys.some((selectedItem) => selectedItem === finalItem.ma)) === true &&
                            <Button
                              onClick={() => {
                                const newCauHinhsFinal = cauHinhsFinal.filter((cauHinh) => {
                                  return !selectedRowKeys.some((selected) => selected === cauHinh.ma);
                                });
                                setCauHinhsFinal(newCauHinhsFinal);
                                handleOpenAlertVariant("Xóa thành công!", Notistack.SUCCESS)
                              }}
                              className="rounded-2 button-mui me-2"
                              type="danger"
                              style={{ height: "40px", width: "auto", fontSize: "15px" }}
                            >
                              <span
                                className=""
                                style={{ marginBottom: "2px", fontWeight: "500" }}
                              >
                                Xóa Màu Sắc
                              </span>
                            </Button>
                          }
                          <Button
                            onClick={() => {
                              const newCauHinhs = cauHinhs && cauHinhs.filter((cauHinh) => cauHinh.id !== item.id);
                              setCauHinhs(newCauHinhs);
                              const newCauHinhsFinal = cauHinhsFinal.filter((cauHinh) => cauHinh.id !== item.id);
                              setCauHinhsFinal(newCauHinhsFinal);

                              if (!type) {
                                const newRams = selectedRam.filter((ram) => ram !== item.ram.id);
                                setSelectedRam(newRams);
                                const newRoms = selectedRom.filter((rom) => rom !== item.rom.id);
                                setSelectedRom(newRoms);
                              }
                              else {
                                if (newCauHinhs && newCauHinhs.length === 0) {
                                  setSelectedRam([]);
                                  setSelectedRom([]);
                                }
                                let removeRam = true;
                                newCauHinhs && newCauHinhs.forEach((cauHinh) => {
                                  if (cauHinh.ram.id === item.ram.id) {
                                    removeRam = false;
                                  }
                                })

                                if (removeRam) {
                                  const newRams = selectedRam.filter((ram) => ram !== item.ram.id);
                                  setSelectedRam(newRams);
                                }

                                let removeRom = true;
                                newCauHinhs && newCauHinhs.forEach((cauHinh) => {
                                  if (cauHinh.rom.id === item.rom.id) {
                                    removeRom = false;
                                  }
                                })
                                if (removeRom) {
                                  const newRoms = selectedRom.filter((rom) => rom !== item.rom.id);
                                  setSelectedRom(newRoms);
                                }
                              }

                              selectedCauHinhs.forEach((s) => {
                                if (item.id === s.id) {
                                  const newSelectedCauHinhs = selectedCauHinhs.filter((cauHinh) => cauHinh.id !== item.id);
                                  setSelectedCauHinhs(newSelectedCauHinhs);
                                }
                              })


                              handleOpenAlertVariant("Xóa phiên bản thành công!", Notistack.SUCCESS)
                            }}
                            className="rounded-2"
                            type="danger"
                            style={{ height: "40px", width: "auto", fontSize: "15px" }}
                          >
                            <span
                              className=""
                              style={{ marginBottom: "2px", fontWeight: "500" }}
                            >
                              Xóa Phiên Bản
                            </span>
                          </Button>
                        </div>
                      </div>
                      <Divider sx={{ backgroundColor: 'gray', height: "1.5px" }} />
                      <BoxJoy sx={{ display: 'contents' }}>
                        <Table
                          className="table-container mt-2"
                          columns={columns}
                          rowKey="ma"
                          key={dataChanged}
                          rowSelection={rowSelection}
                          dataSource={[...cauHinhsFinal].filter((c) => c.id === item.id)}
                          pagination={false}
                          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
                        />
                      </BoxJoy>
                    </CardJoy>
                  </div>
                </>
              )
            })}
          </div>
          <div className="" style={{ width: "97%" }}>
            <div className="d-flex justify-content-end mt-4">
              <Button
                onClick={() => {
                  if (!valid) {
                    confirm(true);
                    window.scrollTo(0, 0);
                  }
                  else if (cauHinhs && cauHinhs.length > 0) {
                    confirm(true);
                    const hasInvalidConfiguration = cauHinhs.some((cauHinh) => {
                      const foundFinalConfig = cauHinhsFinal.find((finalItem) => finalItem.id === cauHinh.id);
                      return !foundFinalConfig;
                    });
                    const isMissingConfig = cauHinhsFinal.some((cauHinh) => !cauHinh.ram || !cauHinh.rom);
                    const isMissingPrice = cauHinhsFinal.some((cauHinh) => !cauHinh.donGia);
                    if (hasInvalidConfiguration || isMissingConfig) {
                      window.scrollTo(0, 800);
                    }
                    else if (isMissingPrice) {
                      handleOpenAlertVariant("Vui lòng nhập đơn giá cho sản phẩm!", "warning")
                    }
                    else if (!validImage) {
                      window.scrollTo(0, document.body.scrollHeight);
                    }
                    else {
                      setOpenModalConfirmAddProduct(true);
                    }
                  }
                  else {
                    setOpenModalConfirmAddProduct(true);
                  }
                }}
                className={isLoadingInside ? "loading" : undefined + " button-mui rounded-2 me-1"}
                type="primary"
                style={{ height: "40px", width: "120px", fontSize: "15px" }}
              >
                <div className="spinner" />
                <span
                  className="text-loading"
                  style={{ marginBottom: "2px", fontWeight: "500" }}
                >
                  Hoàn Tất
                </span>
              </Button>
            </div>
          </div>
          {cauHinhs && cauHinhs.length === 0 &&
            <div style={{ height: "25px" }}></div>
          }
          <div style={{ height: "25px" }}></div>
        </div>
        <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: "auto" }}>
          <div className="container" style={{}}>
            <div className="mx-auto" style={{ width: "95%" }}>
              <div className="text-center pt-4" style={{}}>
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>ẢNH</span>
              </div>
              <ImageUpload uniqueColors={uniqueCauHinhsFinal}
                getColorImage={addImageToProductItem}
                confirm={isConfirm}
                deleteImg={handleDeleteImage}
                getValidImage={getValidImage}
              />
            </div>
            <div style={{ height: "25px" }}></div>
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
      <ModalUpdateCauHinh open={openModalUpdate} close={handleCloseModalUpdate} id={selectedId}
        defaultRam={defaultRam} defaultRom={defaultRom} colorsHadSelect={selectedColors} list={cauHinhs}
        rams={listRam} roms={listRom} updateData={updateData} listColor={listColor} listFinal={cauHinhsFinal}
      />
      <ImportAndExportExcelImei open={openModalImel} close={handleCloseModalImei} imeis={imeis} productName={productName} view={true} />

      <CreateRam
        open={openRam}
        close={handleCloseOpenRam}
        getAll={getListRam}
        rams={listRam}
      />
      <CreateRom
        open={openRom}
        close={handleCloseOpenRom}
        getAll={getListRom}
        roms={listRom}
      />

      <CreateMauSac
        open={openMauSac}
        close={handleCloseOpenMauSac}
        getAll={getListColor}
        colors={listColor}
      />

      <ModalChonDonGiaChung
        open={openModalUpdatePrice}
        close={handleCloseOpenModalUpdatePrice}
        update={updatePriceCommon}
        refresh={refreshPrice}
      />

      <ConfirmAddProduct
        open={openModalConfirmAddProduct}
        confirm={handleAddProduct}
        onClose={handleCloseOpenModalConfirmAddProduct}
        name={getProduct.tenSanPham}
      />

      <ConfirmChangeTypePhienBan open={openModalType} onClose={handleCloseOpenModalType}
        confirm={() => {
          setType((type) => !type); handleCloseOpenModalType();
          setCauHinhs([]);
          setCauHinhsFinal([]);
          setSelectedRam([]);
          setSelectedRom([]);
        }}


      />
      {isLoading && <LoadingIndicator />}
    </>
  )
}
export default CreateCauHinh;
