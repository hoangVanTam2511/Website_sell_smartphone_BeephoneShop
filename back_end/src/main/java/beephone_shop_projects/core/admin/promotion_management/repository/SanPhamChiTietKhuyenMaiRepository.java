package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.SanPhamResponce;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamChiTietKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamChiTietSauKhuyenMaiResponse;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamChiTietKhuyenMaiRepository extends ISanPhamChiTietRepository {
    @Query(value = """
            SELECT ctsp.id, f.duong_dan, a.ten_san_pham, c.ten_mau_sac, d.kich_thuoc as kich_thuoc_ram, e.kich_thuoc as kich_thuoc_rom, ctsp.don_gia, ctsp.delected
            FROM san_pham_chi_tiet ctsp
            JOIN san_pham a ON a.id = ctsp.id_san_pham
            JOIN cau_hinh b ON b.id = ctsp.id_cau_hinh
            JOIN mau_sac c ON c.id = b.id_mau_sac
            JOIN ram d ON d.id = b.id_ram
            JOIN rom e ON e.id = b.id_rom
            JOIN anh f ON f.id_chi_tiet_san_pham = ctsp.id
            WHERE ctsp.id_san_pham = ?1
            ORDER BY ctsp.created_at DESC 
             """, nativeQuery = true)
    List<SanPhamChiTietKhuyenMaiResponse> findAllChiTietSanPham(@Param("id") String id);

    @Query(value = """
            SELECT ctsp.id, f.duong_dan, a.ten_san_pham, c.ten_mau_sac, d.kich_thuoc as kich_thuoc_ram, e.kich_thuoc as kich_thuoc_rom,
            km.ten_khuyen_mai, km.gia_tri_khuyen_mai, km.loai_khuyen_mai, ctsp.don_gia, k.don_gia_sau_khuyen_mai, ctsp.delected
            FROM san_pham_chi_tiet ctsp
            JOIN san_pham a ON a.id = ctsp.id_san_pham
            JOIN cau_hinh b ON b.id = ctsp.id_cau_hinh
            JOIN mau_sac c ON c.id = b.id_mau_sac
            JOIN ram d ON d.id = b.id_ram
            JOIN rom e ON e.id = b.id_rom
            JOIN anh f ON f.id_chi_tiet_san_pham = ctsp.id
            JOIN khuyen_mai_chi_tiet k ON k.id_chi_tiet_san_pham = ctsp.id
            JOIN khuyen_mai km ON km.id = k.id_khuyen_mai
            WHERE k.id_chi_tiet_san_pham = ?1
            ORDER BY ctsp.created_at DESC 
             """, nativeQuery = true)
    List<SanPhamChiTietSauKhuyenMaiResponse> getOneChiTietSanPham(@Param("id") String id);
}
