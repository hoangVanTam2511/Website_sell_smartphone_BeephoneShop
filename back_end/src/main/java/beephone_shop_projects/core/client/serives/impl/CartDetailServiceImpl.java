package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.repositories.CartClientRepository;
import beephone_shop_projects.core.client.repositories.CartDetailClientRepository;
import beephone_shop_projects.core.client.repositories.ProductDetailClientRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartDetailServiceImpl {

    @Autowired
    private CartDetailClientRepository cartDetailClientRepository;

    @Autowired
    private CartClientRepository cartClientRepository;

    @Autowired
    private ProductDetailClientRepository productDetailClientRepository;

    public GioHangChiTiet setCartWithIdProductDetailAndIdCustomer(String idCustomer, String idProductDetail) {
        GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(idCustomer);
        SanPhamChiTiet sanPhamChiTiet = productDetailClientRepository.findById(idProductDetail).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        if (gioHang == null) {
            throw new RuntimeException("Không tìm thấy giỏ hàng");
        }

        GioHangChiTiet gioHangChiTiet = cartDetailClientRepository.getGioHangByIDKhachHangAndIdGioHang(idProductDetail, gioHang.getId());

        if (gioHangChiTiet != null) {
            gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong() + 1);
            return cartDetailClientRepository.save(gioHangChiTiet);
        } else {
            GioHangChiTiet cartDetail = new GioHangChiTiet();
            cartDetail.setSoLuong(1);
            cartDetail.setDonGia(sanPhamChiTiet.getDonGia());
            cartDetail.setSanPhamChiTiet(sanPhamChiTiet);
            cartDetail.setGioHang(gioHang);
            return cartDetailClientRepository.save(cartDetail);
        }
    }

    public Integer getCountOfCartDetail(String idCustomer){
        // get count of number
        GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(idCustomer);
        if (gioHang == null) {
            throw new RuntimeException("Không tìm thấy giỏ hàng");
        }
        return cartDetailClientRepository.getGioHangChiTietByIDGioHang(gioHang.getId());
    }
}
