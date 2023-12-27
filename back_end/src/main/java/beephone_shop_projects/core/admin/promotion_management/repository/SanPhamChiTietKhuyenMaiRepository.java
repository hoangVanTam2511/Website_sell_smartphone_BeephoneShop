package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.DetailKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiChiTietResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamChiTietKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamChiTietSauKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindSanPhamKhuyenMaiRequest;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamChiTietKhuyenMaiRepository extends ISanPhamChiTietRepository {
    @Query(value = """
            SELECT ctsp.id, f.path, a.ten_san_pham, c.ten_mau_sac, d.dung_luong as kich_thuoc_ram, e.dung_luong as kich_thuoc_rom, ctsp.don_gia, ctsp.delected, ctsp.id_san_pham
            FROM san_pham_chi_tiet ctsp
            RIGHT JOIN san_pham a ON a.id = ctsp.id_san_pham
            RIGHT JOIN mau_sac c ON c.id = ctsp.id_mau_sac
            RIGHT JOIN ram d ON d.id = ctsp.id_ram
            RIGHT JOIN rom e ON e.id = ctsp.id_rom
            LEFT JOIN image f on ctsp.id_image = f.id
            WHERE (ctsp.id_san_pham = ?1 AND ctsp.trang_thai = 0)
            ORDER BY ctsp.created_at DESC 
             """, nativeQuery = true)
    List<SanPhamChiTietKhuyenMaiResponse> findAllChiTietSanPham(@Param("id") String id);

    //    @Query(value = """
//            SELECT ctsp.id, f.duong_dan, a.ten_san_pham, c.ten_mau_sac, d.kich_thuoc as kich_thuoc_ram, e.kich_thuoc as kich_thuoc_rom,
//            km.ten_khuyen_mai, km.gia_tri_khuyen_mai, km.loai_khuyen_mai, ctsp.don_gia, k.don_gia_sau_khuyen_mai, ctsp.delected
//            FROM san_pham_chi_tiet ctsp
//            JOIN san_pham a ON a.id = ctsp.id_san_pham
//            JOIN cau_hinh b ON b.id = ctsp.id_cau_hinh
//            JOIN mau_sac c ON c.id = b.id_mau_sac
//            JOIN ram d ON d.id = b.id_ram
//            JOIN rom e ON e.id = b.id_rom
//            JOIN anh f ON f.id_chi_tiet_san_pham = ctsp.id
//            JOIN khuyen_mai_chi_tiet k ON k.id_chi_tiet_san_pham = ctsp.id
//            JOIN khuyen_mai km ON km.id = k.id_khuyen_mai
//            WHERE k.id_chi_tiet_san_pham = ?1 AND f.trang_thai = 1
//            ORDER BY ctsp.created_at DESC
//             """, nativeQuery = true)
//    List<SanPhamChiTietSauKhuyenMaiResponse> getOneChiTietSanPham(@Param("id") String id);
    @Query(value = """
            SELECT ctsp.id as id_san_pham_chi_tiet, f.duong_dan, a.id as id_san_pham, a.ten_san_pham, c.ten_mau_sac, d.kich_thuoc as kich_thuoc_ram, e.kich_thuoc as kich_thuoc_rom, km.id as id_khuyen_mai, km.ma as ma_khuyen_mai,
            km.ten_khuyen_mai, km.gia_tri_khuyen_mai, km.loai_khuyen_mai, km.ngay_bat_dau, km.ngay_ket_thuc, ctsp.don_gia, k.don_gia_sau_khuyen_mai, ctsp.delected
            FROM san_pham_chi_tiet ctsp
            JOIN san_pham a ON a.id = ctsp.id_san_pham
            JOIN cau_hinh b ON b.id = ctsp.id_cau_hinh
            JOIN mau_sac c ON c.id = b.id_mau_sac
            JOIN ram d ON d.id = b.id_ram
            JOIN rom e ON e.id = b.id_rom
            JOIN anh f ON f.id_chi_tiet_san_pham = ctsp.id
            JOIN khuyen_mai_chi_tiet k ON k.id_chi_tiet_san_pham = ctsp.id
            JOIN khuyen_mai km ON km.id = k.id_khuyen_mai
            WHERE k.id_chi_tiet_san_pham = ?1 AND f.trang_thai = 1 
            AND ((:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.ten_san_pham LIKE :#{'%' + #request.keyword + '%'}) 
            OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR c.ten_mau_sac LIKE :#{'%' + #request.keyword + '%'})
            OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR d.kich_thuoc LIKE :#{'%' + #request.keyword + '%'}) 
            OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR e.kich_thuoc LIKE :#{'%' + #request.keyword + '%'})  
            ORDER BY ctsp.created_at DESC 
             """, nativeQuery = true)
    List<SanPhamChiTietSauKhuyenMaiResponse> getOneChiTietSanPham(@Param("id") String id);

    @Query(value = """
            SELECT k.don_gia, k.don_gia_sau_khuyen_mai, km.gia_tri_khuyen_mai, km.loai_khuyen_mai FROM khuyen_mai_chi_tiet k 
            JOIN san_pham_chi_tiet ctsp ON k.id_chi_tiet_san_pham = ctsp.id
            JOIN khuyen_mai km ON km.id = k.id_khuyen_mai
            WHERE ctsp.id = ?1 AND k.delected = 1
            """, nativeQuery = true)
    List<KhuyenMaiChiTietResponse> getListKhuyenMai(@Param("id") String id);

    @Query(value = """
            SELECT ctsp.id as id_san_pham_chi_tiet, ctsp.id_san_pham FROM san_pham_chi_tiet ctsp 
            JOIN khuyen_mai_chi_tiet k ON k.id_chi_tiet_san_pham = ctsp.id WHERE k.id_khuyen_mai = ?1 AND k.delected = 1
            """, nativeQuery = true)
    List<DetailKhuyenMaiResponse> getDetailKhuyenMai(@Param("id") String id);

    @Query(value = """
            SELECT k.don_gia, k.don_gia_sau_khuyen_mai, km.gia_tri_khuyen_mai, km.loai_khuyen_mai FROM khuyen_mai_chi_tiet k 
            JOIN san_pham_chi_tiet ctsp ON k.id_chi_tiet_san_pham = ctsp.id
            JOIN khuyen_mai km ON km.id = k.id_khuyen_mai
            WHERE ctsp.id = ?1 AND k.delected = 1 AND km.trang_thai != 1
            """, nativeQuery = true)
    List<KhuyenMaiChiTietResponse> getListKhuyenMaiKhacHoatDong(@Param("id") String id);
}
