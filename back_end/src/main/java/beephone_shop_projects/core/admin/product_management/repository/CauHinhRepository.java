package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.CauHinhResponce;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.repository.ICauHinhRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CauHinhRepository extends ICauHinhRepository {

    Page<CauHinh> findAll(Pageable pageable);

    @Query(value = """
    SELECT a.id,
     b.kich_thuoc as 'kich_thuoc_man_hinh',
     c.ten_mau_sac as'mau_sac',
     d.dung_luong as 'dung_luong_pin',
     e.kich_thuoc as 'kich_thuoc_ram',
     f.kich_thuoc as 'kich_thuoc_rom'
     FROM cau_hinh a
    JOIN man_hinh b on b.id = a.id_man_hinh
    JOIN mau_sac c on c.id = a.id_mau_sac
    JOIN pin d on d.id = a.id_pin
    JOIN ram e on e.id = a.id_ram
    JOIN rom f on f.id = a.id_rom
    WHERE a.delected = :delected
    """,nativeQuery = true)
    Page<CauHinhResponce> getAllCauHinh(Pageable pageable, @Param("delected")Boolean delected);
}
