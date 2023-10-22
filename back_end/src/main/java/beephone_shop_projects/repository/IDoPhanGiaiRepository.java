package beephone_shop_projects.repository;

import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDoPhanGiaiRepository extends JpaRepository<DoPhanGiaiManHinh,String> {
    DoPhanGiaiManHinh findByMa(String ma);
}
