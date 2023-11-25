package beephone_shop_projects.core.admin.account_management.repository;


import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.repository.IDiaChiRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface DiaChiRepository extends IDiaChiRepository {
    @Modifying
    @Query("UPDATE DiaChi d SET d.trangThai = CASE WHEN d.id = :newId THEN :newTrangThai ELSE 0 END WHERE d.account.id = :accountId")
    void updateTrangThaiAndAddDiaChi(@Param("newId") String newId, @Param("newTrangThai") int newTrangThai, @Param("accountId") String accountId);
    @Modifying
    @Query("UPDATE DiaChi d \n" +
            "SET d.trangThai = CASE WHEN d.id = :newId THEN 1 ELSE 0 END\n" +
            "WHERE d.account.id = :accountId\n")
    void updateTrangThai(@Param("newId") String newId, @Param("accountId") String accountId);

    @Query(value = """
                SELECT  kh FROM DiaChi kh where kh.account.id=:id
            """)
    List<DiaChi> getAllDiaChi(String id);
    @Query(value = """
                SELECT  kh FROM DiaChi kh where kh.account.id=:account and kh.id=:id
            """)
    DiaChi getOneDiaChi(String id,String account);
    DiaChi findByAccount_Id(String id);
}
