package beephone_shop_projects.entity;


import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private String soDienThoaiKhachHang;

    private String ma;

    private String diaChi;

    private String tinhThanhPho;

    private String quanHuyen;

    private String xaPhuong;

    private Integer trangThai;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_account")
    private Account account;
}
