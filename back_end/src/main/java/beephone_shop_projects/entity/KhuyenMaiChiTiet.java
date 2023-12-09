package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.AuditEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "khuyen_mai_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KhuyenMaiChiTiet extends AuditEntity implements Serializable {

    @EmbeddedId
    private KhuyenMaiChiTietId khuyenMaiChiTietId;

    private BigDecimal donGia;

    private BigDecimal donGiaSauKhuyenMai;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chi_tiet_san_pham", insertable = false, updatable = false)
    private SanPhamChiTiet idSanPham;

}