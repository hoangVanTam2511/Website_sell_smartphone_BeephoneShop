package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "voucher")
public class Voucher extends PrimaryEntity implements IsIdentified {

    private String ma;

    private String ten;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    private BigDecimal dieuKienApDung;

    private BigDecimal giaTriVoucher;

    private BigDecimal giaTriToiDa;

    @Enumerated(EnumType.ORDINAL)
    private TypeDiscount loaiVoucher;

    private Integer soLuong;

    @Enumerated(EnumType.ORDINAL)
    private StatusDiscount trangThai;

    private String lyDoHuy;

}
