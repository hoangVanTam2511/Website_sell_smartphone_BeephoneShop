import { Button, Card } from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLRole } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNV = () => {
  let [listRole, setListRole] = useState([]);
  let [ten, setTen] = useState("");
  let [ma, setMa] = useState("");
  const navigate = useNavigate();

  const redirectToHienThi = () => {
    navigate("/chuc-vu");
  };
  const addRole = () => {
    let obj = {
      ten: ten,
      ma: ma,
    };

    axios
      .post(apiURLRole + "/add", obj)
      .then((response) => {
        let newRoleResponse = {
          ten: ten,
          ma: ma,
        };

        setListRole([newRoleResponse, ...listRole]);
        toast.success("Add success!");
        redirectToHienThi();
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };
  return (
    <>
      <Card
        bordered={false}
        style={{
          width: "100%",
        }}
      >
        <h3
          style={{ color: "gray", textAlign: "center", marginBottom: "20px" }}
        >
          Tạo chức vụ
        </h3>
        <div className="text-f" style={{ textAlign: "center" }}>
          <TextField
            label="Mã"
            value={ma}
            // id="fullWidth"
            onChange={(e) => {
              setMa(e.target.value);
            }}
            style={{ width: "40em" }}
          />
        </div>

        <div
          className="text-f"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <TextField
            label="Tên"
            value={ten}
            // id="fullWidth"
            onChange={(e) => {
              setTen(e.target.value);
            }}
            style={{ width: "40em" }}
          />
        </div>
        <div style={{ textAlign: "center", paddingLeft: "32em" }}>
          <Button type="primary" onClick={addRole} htmlType="submit">
            Xác nhận{" "}
            <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddNV;
