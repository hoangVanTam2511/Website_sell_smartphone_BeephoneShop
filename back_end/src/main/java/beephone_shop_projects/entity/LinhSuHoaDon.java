package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "linh_su_hoa_don")
public class LinhSuHoaDon extends PrimaryEntity implements IsIdentified {

    private Integer trangThaiHoaDon;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hoa_don_id")
    private HoaDon  hoa_don_id;

}
