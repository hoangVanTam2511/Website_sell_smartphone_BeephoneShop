package beephone_shop_projects.core.admin.account_management.repository;

import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.request.SearchAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import beephone_shop_projects.repository.IAccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends IAccountRepository, CustomKhachHangRepository {
    @Query(value = """
                      SELECT  ac FROM Account ac
                      WHERE :#{#req.hoVaTen} IS NULL 
                      OR :#{#req.ma} IS NULL
                              OR ac.hoVaTen LIKE CONCAT('%', :#{#req.hoVaTen}, '%')
                              OR ac.ma LIKE CONCAT('%', :#{#req.ma}, '%')
            AND ac.idRole.ma='role1'
                  """)
    Page<Account> findAllHaha(Pageable pageable, @Param("req") SearchAccountRequest request);
    @Query(value = """
                SELECT  kh FROM Account kh where kh.idRole.ma='role1' or  kh.idRole.ma  ='role3'
            """)
    Page<Account> getAllNV(Pageable pageable);

    @Query(value = """
                SELECT kh FROM Account kh where kh.idRole.ma='role1' or kh.idRole.ma ='role3'
            """)
    List<Account> getAllNVienNoPage();

    @Query(value = """
                SELECT  a.ma ,a.id,a.email,a.ho_va_ten, a.trang_thai,a.mat_khau , a.so_dien_thoai , a.ngay_sinh ,a.id_role, a.anh_dai_dien, a.created_at
                        FROM account a join role b on a.id_role=b.id where b.ma="role2" 
                        AND ((:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.ma LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.ho_va_ten LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.email LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.so_dien_thoai LIKE :#{'%' + #request.keyword + '%'}))
             ORDER BY a.created_at DESC 
            """, nativeQuery = true)
    Page<AccountResponse> getAllKH(Pageable pageable, @Param("request") FindAccountRequest request);

    @Query(value = """
                SELECT  a.ma ,a.id,a.email,a.ho_va_ten, a.trang_thai,a.mat_khau , a.so_dien_thoai , a.ngay_sinh ,a.id_role, a.anh_dai_dien, a.created_at
                        FROM account a join role b on a.id_role=b.id where b.ma="role2" 
             ORDER BY a.created_at DESC 
            """, nativeQuery = true)
    ArrayList<AccountResponse> getAllKHNoPageable();

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE Account e
            SET e.trangThai = CASE
                WHEN e.trangThai = 0 THEN 1
                WHEN e.trangThai = 1 THEN 0
                ELSE e.trangThai
            END
            WHERE e.id = :idBanGhi
            
            """)
    void doiTrangThai(@Param("idBanGhi") String id);

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE Account e
            SET e.trangThai = CASE
                WHEN e.trangThai = 2 THEN 3
                WHEN e.trangThai = 3 THEN 2
                ELSE e.trangThai
            END
            WHERE e.id = :idBanGhi

            """)
    void doiTrangThaiNV(@Param("idBanGhi") String id);

    @Query(value = """
                SELECT  ac FROM Account ac
                WHERE (:tenKH IS NULL
                        OR ac.hoVaTen LIKE CONCAT('%', :tenKH, '%')
                        OR ac.ma LIKE CONCAT('%', :tenKH, '%')
                        OR ac.email LIKE CONCAT('%', :tenKH, '%')
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
            "AND r.ma='role2';\n",
            nativeQuery = true)
    Page<AccountResponse> searchAllKH(@Param("tenKH") Optional<String> tenKH, Pageable pageable);

    @Query("SELECT a FROM Account a WHERE  a.trangThai= :trangThai AND a.idRole.ma='role1' ")
    Page<Account> filterTrangThai(@RequestParam("trangThai") StatusAccountCus trangThai, Pageable pageable);


    @Query("SELECT a FROM Account a WHERE a.idRole.ma='role2'")
    List<Account> sendMailAccount();

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM Account a WHERE a.soDienThoai = :phone AND a.idRole.ma = 'role2'")
    Boolean existsBySoDienThoaiNhanVien(String phone);
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM Account a WHERE a.soDienThoai = :phone AND a.idRole.ma = 'role1'")
    Boolean existsBySoDienThoaiKhachHang(String phone);

    Boolean existsByCanCuocCongDan( String canCuoc);
    @Query(value = """
            SELECT * FROM account acc WHERE acc.email = :email
            """, nativeQuery = true)
    Account findByEmail(@Param("email") String email);

}
