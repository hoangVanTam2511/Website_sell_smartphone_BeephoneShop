package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindPinRequest;
import beephone_shop_projects.core.admin.product_managements.repository.PinRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Pin;
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
public class PinRepositoryImpl extends AbstractRepositoryImpl<Pin, String> implements PinRepository {

    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Pin> findAllPin(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest) {
        Class<FindPinRequest> findPinRequest = FindPinRequest.class;
        List<Pin> Pins = null;
        Long totalElements = 0L;
        try (EntityManager entityManager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

            CriteriaQuery<Pin> criteriaQuery = criteriaBuilder.createQuery(Pin.class);
            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);

            Root<Pin> root = criteriaQuery.from(Pin.class);
            Root<Pin> countRoot = countQuery.from(Pin.class);

            JpaPersistence<Pin> configuration = new JpaPersistence<Pin>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

            this.buildSelectAllAndCountEntity(configuration);
            this.buildSortByPageable(configuration, pageable.getSort());
            List<Predicate> predicates = new ArrayList<>();
            List<Predicate> countPredicates = new ArrayList<>();

            Predicate searchPredicate = this.getPredicateContains(root, findPinRequest, findFilterProductsRequest.getKeyword(), configuration);
            Predicate countSearchPredicate = this.getPredicateContains(countRoot, findPinRequest, findFilterProductsRequest.getKeyword(), configuration);

            predicates.add(searchPredicate);
            countPredicates.add(countSearchPredicate);

            if (findFilterProductsRequest.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), findFilterProductsRequest.getStatus().ordinal()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("status"), findFilterProductsRequest.getStatus().ordinal()));
            }
            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            countQuery.where(countPredicates.toArray(new Predicate[0]));

            Pins = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
            totalElements = entityManager.createQuery(countQuery).getSingleResult();
        } catch (PersistenceException e) {
            logger.error(e.getMessage(), e);
        }
        return new PageImpl<>(Pins, pageable, totalElements);
    }
}
