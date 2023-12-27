package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class AccountResponse {

  private String id;

  private String ma;

  private String hoVaTen;

  private String email;

  private String diaChi;

  private String soDienThoai;

  private String xaPhuong;

  private String quanHuyen;

  private String tinhThanhPho;

  private String anhDaiDien;

  private Boolean gioiTinh;

  private StatusAccountCus trangThai;

  private List<DiaChi> diaChiList;

}
