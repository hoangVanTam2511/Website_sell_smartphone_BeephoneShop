package beephone_shop_projects.core.client.models.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BillClientResponce {

    String id;

    String ma;

    String tenSanPham;

    String trangThai;

    String duongDan;

    Integer ram;

    Integer rom;

    String tenMauSac;

    Integer soLuongSanPham;

    BigDecimal tongTienSauKhiGiam;

}
