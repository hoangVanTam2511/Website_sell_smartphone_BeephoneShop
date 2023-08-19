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
import java.util.UUID;

@Repository
public interface AccountRepository extends IAccountRepository {
    @Query(value = """
                SELECT  kh FROM Account kh where kh.idRole.ma='role1'
            """)
    Page<Account> getAllNV(Pageable pageable);

    @Query(value = """
        SELECT  a.ma AS ma,a.id,a.email,a.ho_va_ten, a.trang_thai,a.mat_khau , a.so_dien_thoai , a.ngay_sinh ,a.id_role
        FROM account a
    """,nativeQuery = true)
    Page<AccountResponse> getAllKH(Pageable pageable);
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
                        OR ac.xaPhuong LIKE CONCAT('%', :tenKH, '%')
                        OR ac.tinhThanhPho LIKE CONCAT('%', :tenKH, '%')
                        OR ac.quanHuyen LIKE CONCAT('%', :tenKH, '%')
                        OR ac.soDienThoai LIKE CONCAT('%', :tenKH, '%')
                        OR CAST(ac.ngaySinh AS string) LIKE CONCAT('%', :tenKH, '%')
                        ) AND ac.idRole.ma='role1'
            """)
    Page<Account> searchAllNV(@RequestParam("tenKH") Optional<String> tenKH, Pageable pageable);
    @Query(value = "SELECT a.ma AS ma, a.id, a.email, a.ho_va_ten, a.trang_thai, a.mat_khau, a.so_dien_thoai, a.ngay_sinh, a.id_role\n" +
            "FROM account a INNER JOIN role r ON r.id = a.id_role \n" +
            "WHERE (:tenKH IS NULL OR a.ho_va_ten LIKE CONCAT('%', :tenKH, '%')\n" +
            "OR a.ma LIKE CONCAT('%', :tenKH, '%')\n" +
            "OR a.email LIKE CONCAT('%', :tenKH, '%')\n" +
            "OR a.so_dien_thoai LIKE CONCAT('%', :tenKH, '%')\n" +
            "OR CAST(a.ngay_sinh AS CHAR) LIKE CONCAT('%', :tenKH, '%'))\n" +
            "AND a.id_role = 'b68f6376-48c4-4fb0-83df-6743c5a818e8';\n",
            nativeQuery = true)

    Page<AccountResponse> searchAllKH(@Param("tenKH")Optional<String> tenKH, Pageable pageable);
//    @Query(value = """
//        SELECT a.ma AS ma, a.ho_va_ten, a.dia_chi , a.so_dien_thoai , a.ngay_sinh
//        FROM account a
//        INNER JOIN role r ON r.id = a.id_role
//    """,nativeQuery = true)
//    Page<AccountResponse> searchAllKHang(Pageable pageable);
//    @Query(value = "SELECT kh FROM Account kh WHERE kh.idRole.ma = 'role2' AND kh.id = :id")
//    Account findKHById(@Param("id") UUID id);
//    @Query(value = "SELECT nv FROM Account nv WHERE nv.idRole.ma = 'role1' AND nv.id = :id")
    Account findByMa(String ma);

}
