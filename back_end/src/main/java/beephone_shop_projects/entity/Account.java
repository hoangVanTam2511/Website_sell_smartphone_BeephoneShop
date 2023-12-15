package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account")
public class Account extends PrimaryEntity implements IsIdentified {

    private String ma;

    private String hoVaTen;

//    @Column(unique = true)
    private String email;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    private String matKhau;

    private String soDienThoai;

    private Boolean gioiTinh;

    private String anhDaiDien;

    @Column(unique = true)
    private String canCuocCongDan;

    @Enumerated(EnumType.ORDINAL)
    private StatusAccountCus trangThai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_role")
    @JsonIgnore
    private Role idRole;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
    private Set<DiaChi> diaChiList;

}
