package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindRamRequest;
import beephone_shop_projects.core.admin.product_managements.repository.RamRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Ram;
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
public class RamRepositoryImpl extends AbstractRepositoryImpl<Ram, String> implements RamRepository {

    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Ram> findAllRam(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest) {
        Class<FindRamRequest> findRamRequest = FindRamRequest.class;
        List<Ram> Rams = null;
        Long totalElements = 0L;
        try (EntityManager entityManager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

            CriteriaQuery<Ram> criteriaQuery = criteriaBuilder.createQuery(Ram.class);
            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);

            Root<Ram> root = criteriaQuery.from(Ram.class);
            Root<Ram> countRoot = countQuery.from(Ram.class);

            JpaPersistence<Ram> configuration = new JpaPersistence<Ram>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

            this.buildSelectAllAndCountEntity(configuration);
            this.buildSortByPageable(configuration, pageable.getSort());
            List<Predicate> predicates = new ArrayList<>();
            List<Predicate> countPredicates = new ArrayList<>();

            Predicate searchPredicate = this.getPredicateContains(root, findRamRequest, findFilterProductsRequest.getKeyword(), configuration);
            Predicate countSearchPredicate = this.getPredicateContains(countRoot, findRamRequest, findFilterProductsRequest.getKeyword(), configuration);

            predicates.add(searchPredicate);
            countPredicates.add(countSearchPredicate);

            if (findFilterProductsRequest.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), findFilterProductsRequest.getStatus().ordinal()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("status"), findFilterProductsRequest.getStatus().ordinal()));
            }
            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            countQuery.where(countPredicates.toArray(new Predicate[0]));

            Rams = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
            totalElements = entityManager.createQuery(countQuery).getSingleResult();
        } catch (PersistenceException e) {
            logger.error(e.getMessage(), e);
        }
        return new PageImpl<>(Rams, pageable, totalElements);
    }
}
