package beephone_shop_projects.core.admin.account_management.model.request;

import beephone_shop_projects.entity.Account;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter

public class DiaChiKhachHangRequest {

    private String hoTenKH;

    private String soDienThoai;

    private String diaChi;

    private String tinhThanhPho;

    private String quanHuyen;

    private String xaPhuong;

    private String account;

    private Integer trangThai;

}
