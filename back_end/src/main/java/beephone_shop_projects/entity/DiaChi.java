package beephone_shop_projects.entity;


import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dia_chi_khach_hang")
public class DiaChi extends PrimaryEntity implements IsIdentified {

    private String hoTenKH;
    private String soDienThoai;
    private String diaChi;
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuong;
    private Integer trangThai;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_account")
    private Account account;
}
