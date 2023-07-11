package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.AuditEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.naming.Name;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gio_hang_chi_tiet")
public class GioHangChiTiet extends AuditEntity implements Serializable {

    @EmbeddedId
    private GioHangChiTietId gioHangChiTietId;


    private Integer soLuong;

    private BigDecimal donGia;

    private BigDecimal donGiaSauKhuyenMai;
}
