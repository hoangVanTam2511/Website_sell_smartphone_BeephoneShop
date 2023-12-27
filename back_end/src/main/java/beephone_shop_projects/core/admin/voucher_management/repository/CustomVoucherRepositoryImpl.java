package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.entity.Voucher;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomVoucherRepositoryImpl implements CustomVoucherRepository {
    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Voucher> findAll(Pageable pageable, FindVoucherRequest request) {
        List<Voucher> vouchers = null;
        Long totalElements = 0L;
        try (EntityManager entityManager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery<Voucher> criteriaQuery = criteriaBuilder.createQuery(Voucher.class);

            Root<Voucher> root = criteriaQuery.from(Voucher.class);
            criteriaQuery.select(root);

            Path<Object> sortByField = root.get("createdAt");
            Order orderByAscending = criteriaBuilder.desc(sortByField);
            criteriaQuery.orderBy(orderByAscending);

            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);
            Root<Voucher> countRoot = countQuery.from(Voucher.class);

            countQuery.select(criteriaBuilder.count(countRoot));
            List<Predicate> predicates = new ArrayList<>();

            List<Predicate> countPredicates = new ArrayList<>();
            Predicate predicate = getPredicate(root, Voucher.class, criteriaBuilder, request.getKeyword());
            Predicate countPredicate = getPredicate(countRoot, Voucher.class, criteriaBuilder, request.getKeyword());

            predicates.add(predicate);
            countPredicates.add(countPredicate);

            if (request.getTrangThai() != null) {
                predicates.add(criteriaBuilder.equal(root.get("trangThai"), request.getTrangThai()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("trangThai"), request.getTrangThai()));
            }

            if (request.getSoLuong() != null) {
                predicates.add(criteriaBuilder.equal(root.get("soLuong"), request.getSoLuong()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("soLuong"), request.getSoLuong()));
            }

            if (request.getLoaiVoucher() != null) {
                predicates.add(criteriaBuilder.equal(root.get("loaiVoucher"), request.getLoaiVoucher()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("loaiVoucher"), request.getLoaiVoucher()));
            }

            if (request.getSortType() != null) {
                if (request.getSortType().equals("a-z")) {
                    criteriaQuery.orderBy(criteriaBuilder.asc(root.get("giaTriVoucher")));
                } else if (request.getSortType().equals("z-a")) {
                    criteriaQuery.orderBy(criteriaBuilder.desc(root.get("giaTriVoucher")));
                }
            }

            Expression<Date> expression2 = criteriaBuilder.function("DATE", Date.class, countRoot.get("ngayBatDau"));
            Expression<Date> expression3 = criteriaBuilder.function("DATE", Date.class, countRoot.get("ngayKetThuc"));
            Expression<Date> expression = criteriaBuilder.function("DATE", Date.class, root.get("ngayBatDau"));
            Expression<Date> expression1 = criteriaBuilder.function("DATE", Date.class, root.get("ngayKetThuc"));
            if (request.getNgayBatDau() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getNgayBatDau()));
                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getNgayBatDau()));
            } else if (request.getNgayKetThuc() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getNgayKetThuc()));
                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getNgayKetThuc()));
            } else if (request.getNgayBatDau() != null && request.getNgayKetThuc() != null) {
                predicates.add(criteriaBuilder.between(expression, request.getNgayBatDau(), request.getNgayKetThuc()));
                predicates.add(criteriaBuilder.between(expression1, request.getNgayBatDau(), request.getNgayKetThuc()));
                countPredicates.add(criteriaBuilder.between(expression2, request.getNgayBatDau(), request.getNgayKetThuc()));
                countPredicates.add(criteriaBuilder.between(expression3, request.getNgayBatDau(), request.getNgayKetThuc()));
            }
            if (request.getNgayBatDau() != null && request.getNgayKetThuc() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getNgayBatDau()));
                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getNgayKetThuc()));
                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getNgayBatDau()));
                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getNgayKetThuc()));
            }

            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            countQuery.where(countPredicates.toArray(new Predicate[0]));

            TypedQuery<Voucher> typedQuery =
                    entityManager.createQuery(criteriaQuery).setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).setMaxResults(pageable.getPageSize());
            vouchers = typedQuery.getResultList();
            totalElements = entityManager.createQuery(countQuery).getSingleResult();

        } catch (Exception e) {
            throw e;
        }
        return new PageImpl<>(vouchers, pageable, totalElements);
    }

    protected Predicate getPredicate(Root<Voucher> root, Class<?> entity, CriteriaBuilder criteriaBuilder, String keyword) {
        Field[] fields = entity.getDeclaredFields();
        List<Predicate> predicates = new ArrayList<>();
        for (Field field : fields) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
        }
        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }

}
