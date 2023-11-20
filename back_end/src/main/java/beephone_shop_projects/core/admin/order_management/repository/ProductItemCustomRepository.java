package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductItemCustomRepository extends ISanPhamChiTietRepository {

  @Query("""
                select P from SanPhamChiTiet P
                left join fetch P.sanPham S 
                left join fetch S.theNho
                left join fetch S.theSims
                left join fetch S.pin
                left join fetch S.manHinh
                left join fetch S.congSac
                left join fetch S.chip
                left join fetch S.hang
                left join fetch S.chip
          """)
  List<SanPhamChiTiet> getProducts();

  @Query("""
                select P from SanPhamChiTiet P
                left join fetch P.sanPham S 
                left join fetch S.theNho
                left join fetch S.theSims
                left join fetch S.pin
                left join fetch S.manHinh
                left join fetch S.congSac
                left join fetch S.chip
                left join fetch S.hang
                left join fetch S.chip
                where P.sanPham.ma = ?1
          """)
  List<SanPhamChiTiet> getProductsById(String id);

  @Query("""
                select P from SanPhamChiTiet P
                left join fetch P.sanPham S
                left join fetch S.theNho
                left join fetch S.theSims
                left join fetch S.pin
                left join fetch S.manHinh
                left join fetch S.congSac
                left join fetch S.chip
                left join fetch S.hang
                left join fetch S.chip
                where P.id = ?1
          """)
  Optional<SanPhamChiTiet> findProductById(String id);

}
