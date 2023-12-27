package beephone_shop_projects.core.admin.account_management.repository;


import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.repository.IDiaChiRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface DiaChiRepository extends IDiaChiRepository {
    @Modifying
    @Transactional
    @Query("UPDATE DiaChi d SET d.trangThai = CASE WHEN d.id = :newId THEN :newTrangThai ELSE 0 END WHERE d.account.id = :accountId")
    void updateTrangThaiAndAddDiaChi(@Param("newId") String newId, @Param("newTrangThai") int newTrangThai, @Param("accountId") String accountId);
    @Modifying
    @Transactional
    @Query("UPDATE DiaChi d \n" +
            "SET d.trangThai = CASE WHEN d.id = :id THEN 1 ELSE 0 END\n" +
            "WHERE d.account.id = :account ")
    void updateTrangThai(@Param("id") String id, @Param("account") String account);

    @Query(value = """
                SELECT  kh FROM DiaChi kh where kh.account.id=:id 
              ORDER BY kh.trangThai DESC, kh.createdAt ASC
            """)
    List<DiaChi> getAllDiaChi(String id);
//    @Query(value = """
//                SELECT  kh FROM DiaChi kh where kh.ma=:id
//            """)
    Optional<DiaChi> findById(String id);
    DiaChi findByAccount_Id(String id);
}
