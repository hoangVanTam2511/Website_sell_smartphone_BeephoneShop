package beephone_shop_projects.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class GioHangChiTietId implements Serializable {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_gio_hang")
    private GioHang idGioHang;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chi_tiet_san_pham")
    private SanPham idSanPham;
}
