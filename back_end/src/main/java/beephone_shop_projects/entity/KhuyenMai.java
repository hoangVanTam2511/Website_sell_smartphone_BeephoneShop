package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "khuyen_mai")
public class KhuyenMai extends PrimaryEntity implements IsIdentified {

    private String ma;

    private String tenKhuyenMai;

    private BigDecimal giaTriKhuyenMai;

    private Integer loaiKhuyenMai;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    private Integer trangThai;
}
