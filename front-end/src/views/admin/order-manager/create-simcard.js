import React, { useEffect, useState } from "react";
// import {
//   useNavigate,

// } from "react-router-dom";
import { Button } from "antd";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
// import LoadingIndicator from "../../../utilities/loading";
import { apiURLSimCard } from "../../../service/api";
import { SimStatusNumber } from "./enum";

const CreateSimCard = ({ close }) => {
  // const navigate = useNavigate();

  const [sims, setSims] = useState([]);
  const [uniqueLoaiTheSim, setUniqueLoaiTheSim] = useState("");
  const [loaiTheSim, setLoaiTheSim] = useState("");
  let [simMultiple, setSimMultiple] = useState("");
  useEffect(() => {
    // Load data when the component mounts
    axios
      .get(apiURLSimCard + "/all")
      .then((response) => {
        setSims(response.data.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);
  useEffect(() => {
    // Load data when the component mounts
    // Tạo danh sách uniqueLoaiTheSim sau khi dữ liệu đã được tải
    const allLoaiTheSim = sims.map((option) => option.loaiTheSim);
    const uniqueLoaiTheSim = allLoaiTheSim.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    setUniqueLoaiTheSim(uniqueLoaiTheSim);
  }, [sims]);

  // const [isLoading, setIsLoading] = React.useState(false);

  const [checkedDualSim, setCheckedDualSim] = React.useState(false);
  const [checkedSingleSim, setCheckedSingleSim] = React.useState(true);

  const handleChangeCheckedSingleSim = (event) => {
    setCheckedSingleSim(event.target.checked);
  };
  const handleChangeCheckedDualSim = (event) => {
    setCheckedDualSim(event.target.checked);
  };

  let [status, setStatus] = useState(0);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };

  const addTheSim = () => {
    // setFormSubmitDPG(true);
    const isLoaiTheSimExist = uniqueLoaiTheSim.some(
      (item) => item === loaiTheSim
    );

    if (!isLoaiTheSimExist) {
      // Nếu loaiTheSim chưa tồn tại trong danh sách uniqueLoaiTheSim, thêm nó vào danh sách
      const updatedUniqueLoaiTheSim = [...uniqueLoaiTheSim, loaiTheSim];
      setUniqueLoaiTheSim(updatedUniqueLoaiTheSim);
    }
    // let obj = {
    //   loaiTheSim: loaiTheSim,
    //   trangThai: status,
    // };
    // if (!chieuDai || !chieuRong) {
    //   // message.error("Vui lòng điền đủ thông tin");
    //   setOpen(true);
    //   return;
    // }

    const simObjects = [];

    if (checkedSingleSim && checkedDualSim) {
      // Nếu cả hai loại SIM được chọn, tạo hai đối tượng và thêm vào danh sách
      const simObject1 = {
        loaiTheSim: "Haha",
        trangThai: 1,
      };

      const simObject2 = {
        loaiTheSim: "loaiTheSim",
        trangThai: 0,
      };

      simObjects.push(simObject1, simObject2);
    } else {
      // Nếu chỉ một trong hai loại SIM được chọn hoặc không có SIM nào được chọn, tạo một đối tượng và thêm vào danh sách
      const simObject = {
        loaiTheSim: loaiTheSim,
        trangThai: status,
      };

      simObjects.push(simObject);
    }

    axios
      .post(apiURLSimCard + "/add", simObjects)
      .then((response) => {
        setSims([...sims, ...simObjects]);
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };
  return (
    <>
      <div className="mt-4" style={{ width: "700px" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              THÊM THẺ SIM
            </span>
          </div>
          <div className="mx-auto mt-3 pt-2">
            <div>
              <Autocomplete
                fullWidth
                className="custom"
                id="free-solo-demo"
                freeSolo
                options={uniqueLoaiTheSim}
                // onChange={(event, newValue) => setLoaiTheSim(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Loại Thẻ SIM" />
                )}
              />
            </div>
            <div className="mt-3" style={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Trạng Thái
                </InputLabel>
                <Select
                  className="custom"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Trạng Thái"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={0}>Hoạt Động</MenuItem>
                  <MenuItem value={1}>Ngừng Hoạt Động</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mt-3 d-flex">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeCheckedSingleSim}
                      checked={checkedSingleSim}
                    />
                  }
                  label="1 SIM"
                />
              </div>
              <div className="ms-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeCheckedDualSim}
                      checked={checkedDualSim}
                    />
                  }
                  label="2 SIM"
                />
              </div>
            </div>
            <div className="mt-4 pt-1 d-flex justify-content-end">
              <Button
                onClick={() => {
                  addTheSim();
                  close();
                }}
                className="rounded-2 button-mui"
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
            </div>
          </div>
        </div>
      </div>
      {/* {isLoading && <LoadingIndicator />} */}
    </>
  );
};
export default CreateSimCard;
