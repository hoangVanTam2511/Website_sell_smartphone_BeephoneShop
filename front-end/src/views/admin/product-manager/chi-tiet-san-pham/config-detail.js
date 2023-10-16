import React, { useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../assets/scss/config-detail.css";
import { Col, Divider, Drawer, Row, Button, Image } from "antd";
import { apiURLChiTietSanPham, apiURLAnh } from "../../../../service/api";
import axios from "axios";
import "./config-detail.css";
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ConfigDetail = (product) => {
  const [open, setOpen] = useState(false);
  let [listChiTietSanPham, setlistChiTietSanPham] = useState([]);
  const [listImage, setListImage] = useState(new Map());

  const showDrawer = () => {
    setOpen(true);
    loadDatalistChiTietSanPham();
  };

  // useEffect(() => {
  //   loadDatalistChiTietSanPham();
  // })

  const onClose = () => {
    setOpen(false);
  };

  const loadDatalistChiTietSanPham = async () => {
    axios
      .get(apiURLChiTietSanPham + `/${product.product.id}`)
      .then((response) => {
        response.data.map((item) => {
          axios.get(apiURLAnh + `/${item.id}`).then((response) => {
            setListImage((map) => new Map(map.set(item.id, response.data)));
          });
        });
        console.log(response.data);
        setlistChiTietSanPham(response.data);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <FontAwesomeIcon
          icon={faEye}
          style={{
            cursor: "pointer",
          }}
        />
      </Button>

      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <h5
          className="site-description-item-profile-p"
          style={{
            marginBottom: `20px`,
          }}
        >
          Tên sản phẩm : {product.product.tenSanPham}
        </h5>
        <Row>
          <Col span={12}>
            <p className="site-description-item-profile-p">
              Mã : {product.product.ma}{" "}
            </p>
          </Col>

          <Col span={12}>
            <DescriptionItem
              title="Trạng thái"
              content={
                product.product.delected === "true" ? "Còn hàng" : "Hết hàng"
              }
            />
            {/* {
              product.product.delected == 1 ? 
                <Button color='green'>Còn hàng</Button>
               : 
                 <Button color='red'>Hết hàng</Button>
            } */}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Tên hãng sản xuất"
              content={product.product.tenHang}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Tên dòng sản phẩm"
              content={product.product.tenDongSanPham}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Tên chip"
              content={product.product.tenChip}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Hệ điều hành"
              content={product.product.heDieuHanh}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Pin"
              content={product.product.dungLuong + " mah"}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Màn hình"
              content={
                product.product.kichThuocManHinh +
                " inch - " +
                product.product.doPhanGiaiManHinh
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Số sim"
              content={product.product.sim + " sim"}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Cổng sạc"
              content={product.product.congSac}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Mô tả" content={product.product.mota} />
          </Col>
        </Row>
        <Divider />
        <h6
          className="site-description-item-profile-p"
          style={{ textAlign: "center" }}
        >
          Danh sách cấu hình
        </h6>
        <br />

        {listChiTietSanPham.map((ctsp) => {
          return (
            <>
              <div
                className="card "
                style={{ padding: ` 4% 4%`, border: `1px solid #999` }}
              >
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                  }}
                >
                </Image.PreviewGroup>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="Ram" content={ctsp.kichThuocRam + " GB"} />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem title="Rom" content={ctsp.kichThuocRom + " GB"} />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="Số lượng" content={ctsp.soLuong + " sản phẩm"} />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem title="Đơn giá" content={ctsp.donGia + " đ"} />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DescriptionItem
                      title="Màu sắc"
                      content={ctsp.mauSac}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DescriptionItem
                      title="Ảnh"
                    />
                     <div style={{ display:'flex', margin:`2% 0%`}}>
                      { listImage.get(ctsp.id) === undefined  ? "":
                        listImage.get(ctsp.id).map((item) => {
                          return(
                          <div style={{marginLeft: `2%`}}>
                            <Image width={100} src={item.duongDan} />
                          </div>
                          )
                        })}
                    </div>
                  </Col>
                </Row>
                <Row>
                <Button
                      key="back"
                      type="danger"
                      style={{ height: 40, marginLeft: `29%` }}
                      // onClick={handleCancelFormCamera}
                    >
                     Đổi trạng thái
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      // loading={loading}
                      style={{ height: 40, marginLeft: `2%` }}
                      // onClick={handleOkFormCamera}
                    >
                      Sửa chi tiết sản phẩm
                    </Button>

                </Row>
             </div>  ;
          </>
          )})}
      </Drawer>

      <br />
    </>
  );
};
export default ConfigDetail;
