package beephone_shop_projects.core.admin.rank_management.repository;

import beephone_shop_projects.core.admin.rank_management.model.request.FindRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.response.RankResponse;
import beephone_shop_projects.repository.IRankRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RankRepository extends IRankRepository {

    @Query(value = """
            SELECT r.id AS id, r.ma AS ma, r.ten AS ten,
            r.status AS status, r.dieu_kien_toi_thieu AS dieuKienToiThieu, r.dieu_kien_toi_da AS dieuKienToiDa, r.uu_dai AS uuDai
            FROM xep_hang r WHERE (:#{#request.ma} IS NULL OR :#{#request.ma} = '' OR r.ma LIKE :#{'%' + #request.ma + '%'} )
            AND (:#{#request.ten} IS NULL OR :#{#request.ten} = '' OR r.ten LIKE :#{'%' + #request.ten + '%'} )
            AND (:#{#request.dieuKienToiThieu} IS NULL OR :#{#request.dieuKienToiThieu} = '' OR r.dieu_kien_toi_thieu = :#{#request.dieuKienToiThieu} )
            AND (:#{#request.dieuKienToiDa} IS NULL OR :#{#request.dieuKienToiDa} = '' OR r.dieu_kien_toi_da = :#{#request.dieuKienToiDa} )
            AND (:#{#request.uuDai} IS NULL OR :#{#request.uuDai} = '' OR r.uu_dai = :#{ #request.uuDai} )
            AND (:#{#request.status} IS NULL OR :#{#request.status} = 6 OR r.status = :#{#request.status} )
            ORDER BY r.created_at DESC 
                     """,nativeQuery = true)
    Page<RankResponse> getAll(Pageable pageable, @Param("request") FindRankRequest request);

    @Query(value = """
             SELECT v.id, v.ma, v.ten,
                  v.dieu_kien_toi_thieu as dieuKienToiThieu,
                  v.dieu_kien_toi_da as dieuKienToiDa,
                  v.uu_dai as uuDai,
                  v.status as status 
                  FROM xep_hang v WHERE v.id = ?1
            """, nativeQuery = true)
    RankResponse getOneRank(String ma);


}
