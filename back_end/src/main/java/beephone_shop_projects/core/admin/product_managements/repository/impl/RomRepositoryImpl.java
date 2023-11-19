package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindRomRequest;
import beephone_shop_projects.core.admin.product_managements.repository.RomRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.Rom;
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
public class RomRepositoryImpl extends AbstractRepositoryImpl<Rom, String> implements RomRepository {

    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Rom> findAllRom(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest) {
        Class<FindRomRequest> findRomRequest = FindRomRequest.class;
        List<Rom> Roms = null;
        Long totalElements = 0L;
        try (EntityManager entityManager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

            CriteriaQuery<Rom> criteriaQuery = criteriaBuilder.createQuery(Rom.class);
            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);

            Root<Rom> root = criteriaQuery.from(Rom.class);
            Root<Rom> countRoot = countQuery.from(Rom.class);

            JpaPersistence<Rom> configuration = new JpaPersistence<Rom>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

            this.buildSelectAllAndCountEntity(configuration);
            this.buildSortByPageable(configuration, pageable.getSort());
            List<Predicate> predicates = new ArrayList<>();
            List<Predicate> countPredicates = new ArrayList<>();

            Predicate searchPredicate = this.getPredicateContains(root, findRomRequest, findFilterProductsRequest.getKeyword(), configuration);
            Predicate countSearchPredicate = this.getPredicateContains(countRoot, findRomRequest, findFilterProductsRequest.getKeyword(), configuration);

            predicates.add(searchPredicate);
            countPredicates.add(countSearchPredicate);

            if (findFilterProductsRequest.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), findFilterProductsRequest.getStatus().ordinal()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("status"), findFilterProductsRequest.getStatus().ordinal()));
            }
            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            countQuery.where(countPredicates.toArray(new Predicate[0]));

            Roms = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
            totalElements = entityManager.createQuery(countQuery).getSingleResult();
        } catch (PersistenceException e) {
            logger.error(e.getMessage(), e);
        }
        return new PageImpl<>(Roms, pageable, totalElements);
    }
}
