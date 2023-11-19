package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.entity.KhuyenMai;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomKhuyenMaiRepositoryImpl implements CustomKhuyenMaiRepository{
    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Page<KhuyenMai> findAllKhuyenMai(Pageable pageable, FindKhuyenMaiRequest request) {
        List<KhuyenMai> khuyenMaiList = null;
        Long totalPage = 0L;
        try(EntityManager manager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
            CriteriaQuery<KhuyenMai> criteriaQuery = criteriaBuilder.createQuery(KhuyenMai.class);

            Root<KhuyenMai> root = criteriaQuery.from(KhuyenMai.class);
            criteriaQuery.select(root);

            Path<Object> sortByField = root.get("createdAt");
            Order orderByAscending = criteriaBuilder.desc(sortByField);
            criteriaQuery.orderBy(orderByAscending);

            CriteriaQuery<Long> coutQuery = criteriaBuilder.createQuery(Long.class);
            Root<KhuyenMai> countRoot = coutQuery.from(KhuyenMai.class);

            coutQuery.select(criteriaBuilder.count(countRoot));
            List<Predicate> predicates = new ArrayList<>();

            List<Predicate> countPredicates = new ArrayList<>();
            Predicate predicate = getPredicate(root, KhuyenMai.class, criteriaBuilder, request.getKeyword());
            Predicate countPredicate = getPredicate(countRoot, KhuyenMai.class, criteriaBuilder, request.getKeyword());

            predicates.add(predicate);
            countPredicates.add(countPredicate);

            if (request.getTrangThai() != null) {
                predicates.add(criteriaBuilder.equal(root.get("trangThai"), request.getTrangThai()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("trangThai"), request.getTrangThai()));
            }
            if (request.getSortType() != null) {
                if (request.getSortType().equals("a-z")) {
                    criteriaQuery.orderBy(criteriaBuilder.asc(root.get("giaTriKhuyenMai")));
                } else if (request.getSortType().equals("z-a")) {
                    criteriaQuery.orderBy(criteriaBuilder.desc(root.get("giaTriKhuyenMai")));
                }
            }

            Expression<Date> expression2 = criteriaBuilder.function("DATE", Date.class, countRoot.get("ngayBatDau"));
            Expression<Date> expression3 = criteriaBuilder.function("DATE", Date.class, countRoot.get("ngayKetThuc"));
            Expression<Date> expression = criteriaBuilder.function("DATE", Date.class, root.get("ngayBatDau"));
            Expression<Date> expression1 = criteriaBuilder.function("DATE", Date.class, root.get("ngayKetThuc"));
//            if (request.getNgayBatDau() != null && request.getNgayKetThuc() != null) {
//                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getNgayBatDau()));
//                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getNgayKetThuc()));
//                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getNgayBatDau()));
//                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getNgayKetThuc()));
//            } else if (request.getNgayBatDau() != null) {
//                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getNgayBatDau()));
//                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getNgayBatDau()));
//            } else if (request.getNgayKetThuc() != null) {
//                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getNgayKetThuc()));
//                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getNgayKetThuc()));
//            }
            if (request.getNgayBatDau() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getNgayBatDau()));
                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getNgayBatDau()));
            } else if (request.getNgayKetThuc() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getNgayKetThuc()));
                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getNgayKetThuc()));
            }else if (request.getNgayBatDau() != null && request.getNgayKetThuc() != null) {
                predicates.add(criteriaBuilder.between(expression, request.getNgayBatDau(), request.getNgayKetThuc()));
                countPredicates.add(criteriaBuilder.between(expression2, request.getNgayBatDau(), request.getNgayKetThuc()));
            }

            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            coutQuery.where(countPredicates.toArray(new Predicate[0]));
            TypedQuery<KhuyenMai> typedQuery = manager.createQuery(criteriaQuery).setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).setMaxResults(pageable.getPageSize());
            khuyenMaiList = typedQuery.getResultList();
            totalPage = manager.createQuery(coutQuery).getSingleResult();
        }catch (Exception e){
            throw e;
        }
        return new PageImpl<>(khuyenMaiList, pageable, totalPage);
    }

    protected Predicate getPredicate(Root<KhuyenMai> root, Class<?> entity, CriteriaBuilder criteriaBuilder, String keyword) {
        Field[] fields = entity.getDeclaredFields();
        List<Predicate> predicates = new ArrayList<>();
        for (Field field : fields) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
        }
        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }
}
