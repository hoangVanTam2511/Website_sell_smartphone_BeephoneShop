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

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chi_tiet_san_pham")
public class ChiTietSanPham extends PrimaryEntity implements IsIdentified {


    private BigDecimal donGia;

    private String moTa;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_dong_san_pham")
    private DongSanPham idDongSanPham;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_mau_sac")
    private MauSac idMauSac;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "id_nha_san_xuat")
    private NhaSanXuat idNhaSanXuat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_san_pham")
    private SanPham idSanPham;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ram")
    private Ram idRam;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rom")
    private Rom idRom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_pin")
    private Pin idPin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chip")
    private Chip idChip;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_man_hinh")
    private ManHinh idManHinh;


}
