package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.config.PersistenceConfiguration;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchOrderDto;
import beephone_shop_projects.core.admin.order_management.repository.HoaDonRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HoaDon;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Fetch;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class HoaDonRepositoryImpl extends AbstractRepositoryImpl<HoaDon, String> implements HoaDonRepository {
  private static final Logger logger = LoggerFactory.getLogger(HoaDonRepositoryImpl.class);

  @Override
  @Transactional
  public HoaDon getOrderById(String id, Boolean isPending) {
    HoaDon order;
    String query = "SELECT O FROM HoaDon O " +
            " WHERE O.ma = ?1";
    if (isPending) {
      query = "SELECT O FROM HoaDon O JOIN FETCH O.gioHang C LEFT JOIN FETCH C.cartDetails" +
              " LEFT JOIN O.orderHistories WHERE O.id = ?1";
    }

    try (EntityManager entityManager = this.getEntityManager()) {
      TypedQuery<HoaDon> typedQuery = entityManager.createQuery(query, this.getPersistenceClass())
              .setParameter(1, id);
      order = typedQuery.getSingleResult();
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }

    return order;
  }


  @Override
  public Page<HoaDon> findOrdersByMultipleCriteriaWithPagination(Pageable pageable, SearchFilterOrderDto searchFilter) {
    List<HoaDon> orders = null;
    Long totalElements = 0L;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Root<HoaDon> countRoot = countQuery.from(this.getPersistenceClass());

      Fetch<HoaDon, GioHang> gioHangFetch = root.fetch("gioHang", JoinType.LEFT);
      Fetch<GioHang, GioHangChiTiet> gioHangChiTietFetch = gioHangFetch.fetch("cartDetails", JoinType.LEFT);

      PersistenceConfiguration<HoaDon> configuration = new PersistenceConfiguration<HoaDon>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);
      this.buildSelectAllAndCountEntity(configuration);

      this.buildSortByPageable(configuration, pageable.getSort());
      if (searchFilter.getSort() != null && searchFilter.getSort().equals("New")) {
        criteriaQuery.orderBy(criteriaBuilder.asc(root.get("createdAt")));
      }

      this.buildWhereConditionByPredicates(configuration, buildPredicates(SearchOrderDto.class, searchFilter, configuration));

      orders = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
      totalElements = entityManager.createQuery(countQuery).getSingleResult();

    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return new PageImpl<>(orders, pageable, totalElements);
  }

  private Map<String, List<Predicate>> buildPredicates(Class<SearchOrderDto> searchEntity, SearchFilterOrderDto searchFilter, PersistenceConfiguration<HoaDon> configuration) {
    Map<String, List<Predicate>> mapPredicates = new HashMap<String, List<Predicate>>();
    List<Predicate> predicates = new ArrayList<Predicate>();
    List<Predicate> countPredicates = new ArrayList<Predicate>();

    CriteriaBuilder criteriaBuilder = configuration.getCriteriaBuilder();
    CriteriaQuery<HoaDon> criteriaQuery = configuration.getCriteriaQuery();
    Root<HoaDon> root = configuration.getRoot();
    Root<HoaDon> countRoot = configuration.getCountRoot();

    String keyword = searchFilter.getKeyword().trim();
    String sortType = searchFilter.getSort();
    Date fromDate = searchFilter.getFromDate();
    Date toDate = searchFilter.getToDate();
    Integer state = searchFilter.getState();
    Integer type = searchFilter.getType();

    String fieldDate = "createdAt";
    String fieldState = "trangThai";
    String fieldType = "loaiHoaDon";
    String dateFunction = "DATE";

    Boolean isPending = searchFilter.getIsPending();

    if (!keyword.isBlank()) {
      Predicate searchPredicate = this.getPredicateContains(root, searchEntity, keyword, configuration);
      Predicate countSearchPredicate = this.getPredicateContains(countRoot, searchEntity, keyword, configuration);

      predicates.add(searchPredicate);
      countPredicates.add(countSearchPredicate);
    }

    Expression<Date> createdFunctionDate = criteriaBuilder.function(dateFunction, Date.class, root.get(fieldDate));
    Expression<Date> countCreatedFunctionDate = criteriaBuilder.function(dateFunction, Date.class, countRoot.get(fieldDate));

    if (fromDate != null && toDate != null) {
      predicates.add(criteriaBuilder.between(createdFunctionDate, fromDate, toDate));
      countPredicates.add(criteriaBuilder.between(countCreatedFunctionDate, fromDate, toDate));
      criteriaQuery.orderBy(criteriaBuilder.asc(root.get(fieldDate)));
    } else if (fromDate != null) {
      predicates.add(criteriaBuilder.greaterThanOrEqualTo(createdFunctionDate, fromDate));
      countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(countCreatedFunctionDate, fromDate));
      criteriaQuery.orderBy(criteriaBuilder.asc(root.get(fieldDate)));
    } else if (toDate != null) {
      predicates.add(criteriaBuilder.lessThanOrEqualTo(createdFunctionDate, toDate));
      countPredicates.add(criteriaBuilder.lessThanOrEqualTo(countCreatedFunctionDate, toDate));
      criteriaQuery.orderBy(criteriaBuilder.desc(root.get(fieldDate)));
    }

    if (state != null) {
      predicates.add(criteriaBuilder.equal(root.get(fieldState), state));
      countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldState), state));
    }

    if (type != null) {
      predicates.add(criteriaBuilder.equal(root.get(fieldType), type));
      countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldType), type));
    }

    if (isPending != null && isPending) {
      state = 5;
      predicates.add(criteriaBuilder.equal(root.get(fieldState), state));
      countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldState), state));
    }

    if (isPending != null && !isPending && state == null) {
      Integer[] states = {0, 1, 2, 3, 4, 6};
      predicates.add(root.get(fieldState).in(states));
      countPredicates.add(countRoot.get(fieldState).in(states));
    }

    if (sortType != null) {
      // Do something
    }

    mapPredicates.put("predicates", predicates);
    mapPredicates.put("countPredicates", countPredicates);

    return mapPredicates;
  }

}
