package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.MauSacRepository;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Voucher;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MauSacRepositoryImpl extends AbstractRepositoryImpl<MauSac, String> implements MauSacRepository {
    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

    @Override
    public Page<MauSac> findAllMauSac() {
//        List<MauSac> mauSacs = null;
//        Long totalElements = 0L;
//        try (EntityManager entityManager = this.entityManager) {
//            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//            CriteriaQuery<Voucher> criteriaQuery = criteriaBuilder.createQuery(Voucher.class);
//
//            Root<Voucher> root = criteriaQuery.from(Voucher.class);
//            criteriaQuery.select(root);
//
//            Path<Object> sortByField = root.get("createdAt");
//            Order orderByAscending = criteriaBuilder.desc(sortByField);
//            criteriaQuery.orderBy(orderByAscending);
//
//            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);
//            Root<Voucher> countRoot = countQuery.from(Voucher.class);
//
//            countQuery.select(criteriaBuilder.count(countRoot));
//            List<Predicate> predicates = new ArrayList<>();
//
//            List<Predicate> countPredicates = new ArrayList<>();
//            Predicate predicate = getPredicate(root, Voucher.class, criteriaBuilder, request.getKeyword());
//            Predicate countPredicate = getPredicate(countRoot, Voucher.class, criteriaBuilder, request.getKeyword());
//
//            predicates.add(predicate);
//            countPredicates.add(countPredicate);
//
//
//            criteriaQuery.where(predicates.toArray(new Predicate[0]));
//            countQuery.where(countPredicates.toArray(new Predicate[0]));
//
//            TypedQuery<Voucher> typedQuery =
//                    entityManager.createQuery(criteriaQuery).setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).setMaxResults(pageable.getPageSize());
//            vouchers = typedQuery.getResultList();
//            totalElements = entityManager.createQuery(countQuery).getSingleResult();
//
//        } catch (Exception e) {
//            throw e;
//        }
//        return new PageImpl<>(vouchers, pageable, totalElements);
        return null;
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