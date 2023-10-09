package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.request.SearchOrderDto;
import beephone_shop_projects.core.admin.order_management.repository.OrderRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
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
public class OrderRepositoryImpl extends AbstractRepositoryImpl<HoaDon, String> implements OrderRepository {
  private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

  @Override
  @Transactional
  public HoaDon getOrderPendingById(String id) {
    HoaDon entity = null;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Fetch<HoaDon, GioHang> joinCart = root.fetch("cart", JoinType.INNER);
      Fetch<GioHang, GioHangChiTiet> joinCartItems = joinCart.
              fetch("cartItems", JoinType.LEFT);
      Fetch<GioHangChiTiet, SanPhamChiTiet> joinProductDetails = joinCartItems.fetch("sanPhamChiTiet", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Anh> joinImages = joinProductDetails.fetch("images", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.fetch("sanPham", JoinType.LEFT);
      Fetch<SanPhamChiTiet, CauHinh> joinConfiguration = joinProductDetails.fetch("cauHinh", JoinType.LEFT);
      Fetch<CauHinh, Ram> joinRam = joinConfiguration.fetch("ram", JoinType.LEFT);
      Fetch<CauHinh, Rom> joinRom = joinConfiguration.fetch("rom", JoinType.LEFT);
      Fetch<CauHinh, MauSac> joinMauSac = joinConfiguration.fetch("mauSac", JoinType.LEFT);
      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.LEFT);
      root.fetch("account", JoinType.LEFT);
      root.fetch("voucher", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("id"), id);
      criteriaQuery.select(root).where(condition);

      entity = entityManager.createQuery(criteriaQuery).getSingleResult();

    } catch (PersistenceException e) {
      logger.error(e.getMessage(), e);
    }
    return entity;
  }

  @Override
  @Transactional
  public HoaDon getOrderDetailsById(String id) {
    HoaDon entity = null;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());

//      Fetch<HoaDon, HoaDonChiTiet> joinOrderItems = root.fetch("orderItems", JoinType.INNER);
      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());

      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.LEFT);
      root.fetch("account", JoinType.LEFT);
      root.fetch("voucher", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("ma"), id);
      criteriaQuery.select(root).where(condition);

      entity = entityManager.createQuery(criteriaQuery).getSingleResult();

    } catch (PersistenceException e) {
      logger.error(e.getMessage(), e);
    }
    return entity;
  }

  @Override
  @Transactional
  public Page<HoaDon> findOrdersByMultipleCriteriaWithPagination(Pageable pageable, SearchFilterOrderDto searchFilter) {
    List<HoaDon> orders = null;
    Long totalElements = 0L;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Root<HoaDon> countRoot = countQuery.from(this.getPersistenceClass());

//      Fetch<HoaDon, GioHang> joinCart = root.fetch("cart", JoinType.LEFT);
//      Fetch<GioHang, GioHangChiTiet> joinCartItems = joinCart.
//              fetch("cartItems", JoinType.LEFT);
//      Fetch<GioHangChiTiet, SanPhamChiTiet> joinProductDetails = joinCartItems.
//              fetch("sanPhamChiTiet", JoinType.LEFT);
//      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.
//              fetch("sanPham", JoinType.LEFT);
//      Fetch<SanPhamChiTiet, CauHinh> joinConfiguration = joinProductDetails.
//              fetch("cauHinh", JoinType.LEFT);
//      Fetch<CauHinh, Ram> joinRam = joinConfiguration.fetch("ram", JoinType.LEFT);
//      Fetch<CauHinh, Rom> joinRom = joinConfiguration.fetch("rom", JoinType.LEFT);
//      Fetch<CauHinh, MauSac> joinMauSac = joinConfiguration.fetch("mauSac", JoinType.LEFT);
      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.LEFT);
      root.fetch("account", JoinType.LEFT);
      root.fetch("voucher", JoinType.LEFT);

      JpaPersistence<HoaDon> configuration = new JpaPersistence<HoaDon>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

      this.buildSelectAllAndCountEntity(configuration);
      this.buildSortByPageable(configuration, pageable.getSort());
      this.buildWhereConditionByPredicates(configuration, buildPredicates(SearchOrderDto.class, searchFilter, configuration));

      orders = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
      totalElements = entityManager.createQuery(countQuery).getSingleResult();

    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return new PageImpl<>(orders, pageable, totalElements);
  }

  @Override
  @Transactional
  public List<HoaDon> getOrdersPending() {
    List<HoaDon> entityList = null;
    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Fetch<HoaDon, GioHang> joinCart = root.fetch("cart", JoinType.INNER);
      Fetch<GioHang, GioHangChiTiet> joinCartItems = joinCart.
              fetch("cartItems", JoinType.LEFT);
      Fetch<GioHangChiTiet, SanPhamChiTiet> joinProductDetails = joinCartItems.fetch("sanPhamChiTiet", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.fetch("sanPham", JoinType.LEFT);
      Fetch<SanPhamChiTiet, CauHinh> joinConfiguration = joinProductDetails.fetch("cauHinh", JoinType.LEFT);
      Fetch<CauHinh, Ram> joinRam = joinConfiguration.fetch("ram", JoinType.LEFT);
      Fetch<CauHinh, Rom> joinRom = joinConfiguration.fetch("rom", JoinType.LEFT);
      Fetch<CauHinh, MauSac> joinMauSac = joinConfiguration.fetch("mauSac", JoinType.LEFT);
      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.INNER);
      root.fetch("account", JoinType.LEFT);
      root.fetch("voucher", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("trangThai"), OrderStatus.PENDING_PAYMENT.ordinal());
      criteriaQuery.select(root).where(condition).orderBy(criteriaBuilder.asc(root.get("createdAt")));

      entityList = entityManager.createQuery(criteriaQuery).getResultList();
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return entityList;
  }

  private Map<String, List<Predicate>> buildPredicates(Class<SearchOrderDto> searchEntity, SearchFilterOrderDto searchFilter, JpaPersistence<HoaDon> configuration) {
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
      state = 6;
      predicates.add(criteriaBuilder.equal(root.get(fieldState), state));
      countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldState), state));
    }

    if (isPending != null && !isPending && state == null) {
      Integer[] states = {0, 1, 2, 3, 4, 5};
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
