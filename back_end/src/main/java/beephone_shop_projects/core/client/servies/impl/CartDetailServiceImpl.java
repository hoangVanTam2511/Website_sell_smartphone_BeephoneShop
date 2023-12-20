package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.models.response.CartDetailResponce;
import beephone_shop_projects.core.client.repositories.AccountClientRepository;
import beephone_shop_projects.core.client.repositories.CartClientRepository;
import beephone_shop_projects.core.client.repositories.CartDetailClientRepository;
import beephone_shop_projects.core.client.repositories.ProductDetailClientRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartDetailServiceImpl {

    @Autowired
    private CartDetailClientRepository cartDetailClientRepository;

    @Autowired
    private CartClientRepository cartClientRepository;

    @Autowired
    private ProductDetailClientRepository productDetailClientRepository;

    @Autowired
    private AccountClientRepository accountClientRepository;

    public CartDetailResponce setCartWithIdProductDetailAndIdCustomer(String idCustomer, String idProductDetail, String type) {
        GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(idCustomer);
        SanPhamChiTiet sanPhamChiTiet = productDetailClientRepository.findById(idProductDetail).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        if (gioHang == null) {
            gioHang = new GioHang();
            gioHang.setAccount(accountClientRepository.findById(idCustomer).orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản")));
            cartClientRepository.save(gioHang);
            gioHang = cartClientRepository.getGioHangByIDKhachHang(idCustomer);
        }

        GioHangChiTiet gioHangChiTiet = cartDetailClientRepository.getGioHangByIDKhachHangAndIdGioHang(idProductDetail, gioHang.getId());

        if (gioHangChiTiet != null) {
            if(type.equalsIgnoreCase("plus")){
                if(gioHangChiTiet.getSoLuong()  == 4){
                    throw new RuntimeException("Không thể bán vượt quá số lượng cho phép");
                }
                gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong() + 1);
                GioHangChiTiet temp = cartDetailClientRepository.save(gioHangChiTiet);
                return getCartDetailByID(temp.getId());
            }else{
                if(gioHangChiTiet.getSoLuong()  == 0){
                    cartDetailClientRepository.delete(gioHangChiTiet);
                    throw new RuntimeException("Số lượng sản phẩm đã hết");
                }
                gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong() - 1);
                GioHangChiTiet temp = cartDetailClientRepository.save(gioHangChiTiet);
                return getCartDetailByID(temp.getId());
            }
        } else {
            GioHangChiTiet cartDetail = new GioHangChiTiet();
            cartDetail.setSoLuong(1);
            cartDetail.setDonGia(sanPhamChiTiet.getDonGia());
            cartDetail.setSanPhamChiTiet(sanPhamChiTiet);
            cartDetail.setGioHang(gioHang);
            GioHangChiTiet temp = cartDetailClientRepository.save(cartDetail);
            return getCartDetailByID(temp.getId());
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

    public ArrayList<CartDetailResponce> getCartDetails(String idCustomer){
        return cartDetailClientRepository.getCartDetails(idCustomer);
    }

    public CartDetailResponce getCartDetailByID(String id){
        return cartDetailClientRepository.getCartDetailByID(id);
    }

    public String deleteCartDetail(String id){
        try{
            cartDetailClientRepository.deleteGioHangChiTietByIDGioHangChiTiet(id);
            return "Xoá thành công";
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Đã có lỗi khi chạy chương trình");
        }
    }

    public String deleteAllCartByIDCustomer(String idCustomer){
        GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(idCustomer);
        if (gioHang == null) {
            throw new RuntimeException("Không tìm thấy giỏ hàng");
        }

        cartDetailClientRepository.deleteGioHangChiTietByIdGioHang(gioHang.getId());
        return "You have deleted all cart detal. Congrulation";
    }
}
