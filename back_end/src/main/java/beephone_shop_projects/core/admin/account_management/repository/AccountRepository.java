package beephone_shop_projects.core.admin.account_management.repository;

import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.repository.IAccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Repository
public interface AccountRepository extends IAccountRepository {
    @Query(value = """
                SELECT  kh FROM Account kh where kh.idRole.ma='role1'
            """)
    Page<Account> getAllNV(Pageable pageable);

    @Query(value = """
                SELECT  kh FROM Account kh where kh.idRole.ma='role2'
            """)
    Page<Account> getAllKH(Pageable pageable);
    @Transactional
    @Modifying
    @Query(value = """
            UPDATE Account e
            SET e.trangThai = CASE
                WHEN e.trangThai = 1 THEN 2
                WHEN e.trangThai = 2 THEN 1
                ELSE e.trangThai
            END
            WHERE e.id = :idBanGhi

            """)
    void doiTrangThai(@Param("idBanGhi") String id);

    @Query(value = """
                SELECT  ac FROM Account ac
                WHERE (:tenKH IS NULL
                        OR ac.hoVaTen LIKE CONCAT('%', :tenKH, '%')
                        OR ac.ma LIKE CONCAT('%', :tenKH, '%')
                        OR ac.email LIKE CONCAT('%', :tenKH, '%')
                        OR ac.diaChi LIKE CONCAT('%', :tenKH, '%')
                        OR ac.soDienThoai LIKE CONCAT('%', :tenKH, '%')
                        OR CAST(ac.ngaySinh AS string) LIKE CONCAT('%', :tenKH, '%')
                        ) AND ac.idRole.ma='role1'
            """)
    Page<Account> searchAllNV(@RequestParam("tenKH") Optional<String> tenKH, Pageable pageable);
    @Query(value = """
                SELECT  ac FROM Account ac
                WHERE (:tenKH IS NULL
                        OR ac.hoVaTen LIKE CONCAT('%', :tenKH, '%')
                        OR ac.ma LIKE CONCAT('%', :tenKH, '%')
                        OR ac.email LIKE CONCAT('%', :tenKH, '%')
                        OR ac.diaChi LIKE CONCAT('%', :tenKH, '%')
                        OR ac.soDienThoai LIKE CONCAT('%', :tenKH, '%')
                        OR CAST(ac.ngaySinh AS string) LIKE CONCAT('%', :tenKH, '%')
                        )AND ac.idRole.ma='role2'
            """)
    Page<Account> searchAllKH(@Param("tenKH") Optional<String> tenKH, Pageable pageable);
    @Query(value = """
        SELECT a.ma AS ma, a.ho_va_ten, a.dia_chi , a.so_dien_thoai , a.ngay_sinh 
        FROM account a
        INNER JOIN role r ON r.id = a.id_role
    """,nativeQuery = true)
    Page<AccountResponse> searchAllKHang(Pageable pageable);
}
