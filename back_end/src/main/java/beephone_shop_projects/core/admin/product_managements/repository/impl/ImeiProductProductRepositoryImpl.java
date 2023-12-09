package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterImeisRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindImeiProductRequest;
import beephone_shop_projects.core.admin.product_managements.repository.ImeiProductRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.Imei;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ImeiProductProductRepositoryImpl extends AbstractRepositoryImpl<Imei, String> implements ImeiProductRepository {

    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Imei> findAllImei(Pageable pageable, FindFilterImeisRequest findFilterImeisRequest) {
        Class<FindImeiProductRequest> findImeiRequest = FindImeiProductRequest.class;
        List<Imei> imeis = null;
        Long totalElements = 0L;
        try (EntityManager entityManager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

            CriteriaQuery<Imei> criteriaQuery = criteriaBuilder.createQuery(Imei.class);
            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);

            Root<Imei> root = criteriaQuery.from(Imei.class);
            Root<Imei> countRoot = countQuery.from(Imei.class);

            JpaPersistence<Imei> configuration = new JpaPersistence<Imei>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

            this.buildSelectAllAndCountEntity(configuration);
            this.buildSortByPageable(configuration, pageable.getSort());
            List<Predicate> predicates = new ArrayList<>();
            List<Predicate> countPredicates = new ArrayList<>();

            Predicate searchPredicate = this.getPredicateContains(root, findImeiRequest, findFilterImeisRequest.getKeyword(), configuration);
            Predicate countSearchPredicate = this.getPredicateContains(countRoot, findImeiRequest, findFilterImeisRequest.getKeyword(), configuration);

            predicates.add(searchPredicate);
            countPredicates.add(countSearchPredicate);

            if (findFilterImeisRequest.getTrangThai() != null) {
                predicates.add(criteriaBuilder.equal(root.get("trangThai"), findFilterImeisRequest.getTrangThai().ordinal()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("trangThai"), findFilterImeisRequest.getTrangThai().ordinal()));
            }
            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            countQuery.where(countPredicates.toArray(new Predicate[0]));

            imeis = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
            totalElements = entityManager.createQuery(countQuery).getSingleResult();
        } catch (PersistenceException e) {
            logger.error(e.getMessage(), e);
        }
        return new PageImpl<>(imeis, pageable, totalElements);
    }
}
