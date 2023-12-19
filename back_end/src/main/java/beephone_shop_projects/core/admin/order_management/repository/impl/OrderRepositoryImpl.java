package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.request.SearchOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderPaginationCustomResponse;
import beephone_shop_projects.core.admin.order_management.repository.OrderRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.entity.CameraSauDienThoai;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.entity.CameraTruocDienThoai;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.entity.DanhMucDienThoai;
import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.HoaDonChiTiet;
import beephone_shop_projects.entity.Image;
import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.entity.ImeiDaBan;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Role;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.TheNho;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.entity.TheSimDienThoai;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
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
      Fetch<HoaDon, HoaDonChiTiet> joinOrderItems = root.fetch("orderItems", JoinType.LEFT);
      Fetch<HoaDon, GioHang> joinCart = root.fetch("cart", JoinType.LEFT);
      Fetch<GioHang, GioHangChiTiet> joinCartItems = joinCart.fetch("cartItems", JoinType.LEFT);
      Fetch<GioHangChiTiet, ImeiChuaBan> joinImeisNotSold = joinCartItems.fetch("imeisChuaBan", JoinType.LEFT);
      Fetch<GioHangChiTiet, SanPhamChiTiet> joinProductDetails = joinCartItems.fetch("sanPhamChiTiet", JoinType.LEFT);

      Fetch<SanPhamChiTiet, Ram> joinRam = joinProductDetails.fetch("ram", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Rom> joinRom = joinProductDetails.fetch("rom", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinColor = joinProductDetails.fetch("mauSac", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Image> joinImage = joinProductDetails.fetch("image", JoinType.LEFT);
//      Fetch<SanPhamChiTiet, KhuyenMaiChiTiet> joinPromotions = joinProductDetails.fetch("promotions", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinImeis = joinProductDetails.fetch("imeis", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.fetch("sanPham", JoinType.LEFT);

      Fetch<SanPham, Chip> joinChip = joinProduct.fetch("chip", JoinType.LEFT);
      Fetch<SanPham, Pin> joinPin = joinProduct.fetch("pin", JoinType.LEFT);
      Fetch<SanPham, ManHinh> joinScreen = joinProduct.fetch("manHinh", JoinType.LEFT);
      Fetch<ManHinh, DoPhanGiaiManHinh> joinScreenRelution = joinScreen.fetch("doPhanGiaiManHinh", JoinType.LEFT);
      Fetch<SanPham, Hang> joinBrand = joinProduct.fetch("hang", JoinType.LEFT);
      Fetch<SanPham, CongSac> joinChargingPort = joinProduct.fetch("congSac", JoinType.LEFT);
      Fetch<SanPham, TheNho> joinMemoryCard = joinProduct.fetch("theNho", JoinType.LEFT);

      Fetch<SanPham, TheSimDienThoai> joinSimCardPhone = joinProduct.fetch("theSims", JoinType.LEFT);
      Fetch<TheSimDienThoai, TheSim> joinSimCard = joinSimCardPhone.fetch("theSim", JoinType.LEFT);
      Fetch<SanPham, DanhMucDienThoai> joinCategoryPhone = joinProduct.fetch("danhMucs", JoinType.LEFT);
      Fetch<DanhMucDienThoai, DanhMuc> joinCategory = joinCategoryPhone.fetch("danhMuc", JoinType.LEFT);
      Fetch<SanPham, CameraTruocDienThoai> joinCameraFrontPhone = joinProduct.fetch("cameraTruocs", JoinType.LEFT);
      Fetch<CameraTruocDienThoai, CameraTruoc> joinCameraFront = joinCameraFrontPhone.fetch("cameraTruoc", JoinType.LEFT);
      Fetch<SanPham, CameraSauDienThoai> joinCameraRearPhone = joinProduct.fetch("cameraSaus", JoinType.LEFT);
      Fetch<CameraSauDienThoai, CameraSau> joinCameraRear = joinCameraRearPhone.fetch("cameraSau", JoinType.LEFT);

      Fetch<HoaDon, Account> joinAccount = root.fetch("account", JoinType.LEFT);
      Fetch<HoaDon, Account> joinAccountEmployee = root.fetch("accountEmployee", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccount = joinAccount.fetch("idRole", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccountEmployee = joinAccountEmployee.fetch("idRole", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddress = joinAccount.fetch("diaChiList", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddressEmployee = joinAccountEmployee.fetch("diaChiList", JoinType.LEFT);

      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.LEFT);
      root.fetch("voucher", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("id"), id);
      criteriaQuery.select(root).where(condition);

      entity = entityManager.createQuery(criteriaQuery).getSingleResult();

    } catch (PersistenceException e) {
      logger.error(e.getMessage());
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

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Fetch<HoaDon, HoaDonChiTiet> joinOrderItems = root.fetch("orderItems", JoinType.LEFT);
      Fetch<HoaDonChiTiet, ImeiDaBan> joinImeisSold = joinOrderItems.fetch("imeisDaBan", JoinType.LEFT);
      Fetch<HoaDonChiTiet, SanPhamChiTiet> joinProductDetails = joinOrderItems.fetch("sanPhamChiTiet", JoinType.LEFT);

      Fetch<SanPhamChiTiet, Ram> joinRam = joinProductDetails.fetch("ram", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Rom> joinRom = joinProductDetails.fetch("rom", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinColor = joinProductDetails.fetch("mauSac", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Image> joinImage = joinProductDetails.fetch("image", JoinType.LEFT);
//      Fetch<SanPhamChiTiet, KhuyenMaiChiTiet> joinPromotions = joinProductDetails.fetch("promotions", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinImeis = joinProductDetails.fetch("imeis", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.fetch("sanPham", JoinType.LEFT);

      Fetch<SanPham, Chip> joinChip = joinProduct.fetch("chip", JoinType.LEFT);
      Fetch<SanPham, Pin> joinPin = joinProduct.fetch("pin", JoinType.LEFT);
      Fetch<SanPham, ManHinh> joinScreen = joinProduct.fetch("manHinh", JoinType.LEFT);
      Fetch<ManHinh, DoPhanGiaiManHinh> joinScreenRelution = joinScreen.fetch("doPhanGiaiManHinh", JoinType.LEFT);
      Fetch<SanPham, Hang> joinBrand = joinProduct.fetch("hang", JoinType.LEFT);
      Fetch<SanPham, CongSac> joinChargingPort = joinProduct.fetch("congSac", JoinType.LEFT);
      Fetch<SanPham, TheNho> joinMemoryCard = joinProduct.fetch("theNho", JoinType.LEFT);

      Fetch<SanPham, TheSimDienThoai> joinSimCardPhone = joinProduct.fetch("theSims", JoinType.LEFT);
      Fetch<TheSimDienThoai, TheSim> joinSimCard = joinSimCardPhone.fetch("theSim", JoinType.LEFT);
      Fetch<SanPham, DanhMucDienThoai> joinCategoryPhone = joinProduct.fetch("danhMucs", JoinType.LEFT);
      Fetch<DanhMucDienThoai, DanhMuc> joinCategory = joinCategoryPhone.fetch("danhMuc", JoinType.LEFT);
      Fetch<SanPham, CameraTruocDienThoai> joinCameraFrontPhone = joinProduct.fetch("cameraTruocs", JoinType.LEFT);
      Fetch<CameraTruocDienThoai, CameraTruoc> joinCameraFront = joinCameraFrontPhone.fetch("cameraTruoc", JoinType.LEFT);
      Fetch<SanPham, CameraSauDienThoai> joinCameraRearPhone = joinProduct.fetch("cameraSaus", JoinType.LEFT);
      Fetch<CameraSauDienThoai, CameraSau> joinCameraRear = joinCameraRearPhone.fetch("cameraSau", JoinType.LEFT);

      Fetch<HoaDon, Account> joinAccount = root.fetch("account", JoinType.LEFT);
      Fetch<HoaDon, Account> joinAccountEmployee = root.fetch("accountEmployee", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccount = joinAccount.fetch("idRole", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccountEmployee = joinAccountEmployee.fetch("idRole", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddress = joinAccount.fetch("diaChiList", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddressEmployee = joinAccountEmployee.fetch("diaChiList", JoinType.LEFT);

      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.LEFT);
      root.fetch("voucher", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("ma"), id);
      criteriaQuery.select(root).where(condition);

      entity = entityManager.createQuery(criteriaQuery).getSingleResult();

    } catch (PersistenceException e) {
      logger.error(e.getMessage());
    }
    return entity;
  }

  @Override
  @Transactional
  public Page<OrderPaginationCustomResponse> findOrdersByMultipleCriteriaWithPagination(Pageable pageable, SearchFilterOrderDto searchFilter) {
    List<HoaDon> orders = new ArrayList<>();
    List<OrderPaginationCustomResponse> pagedOrders = new ArrayList<>();
    Long totalElements = 0L;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Root<HoaDon> countRoot = countQuery.from(this.getPersistenceClass());

      Fetch<HoaDon, Account> joinAccount = root.fetch("account", JoinType.LEFT);
      Fetch<HoaDon, Account> joinAccountEmployee = root.fetch("accountEmployee", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccount = joinAccount.fetch("idRole", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccountEmployee = joinAccountEmployee.fetch("idRole", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddress = joinAccount.fetch("diaChiList", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddressEmployee = joinAccountEmployee.fetch("diaChiList", JoinType.LEFT);
      JpaPersistence<HoaDon> configuration = new JpaPersistence<HoaDon>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

      this.buildSelectAllAndCountEntity(configuration);
//      this.buildSortByPageable(configuration, pageable.getSort());
      this.buildWhereConditionByPredicates(configuration, buildPredicates(SearchOrderDto.class, searchFilter, configuration));

      TypedQuery<HoaDon> query = entityManager.createQuery(criteriaQuery)
              .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
              .setMaxResults(pageable.getPageSize());
      orders = query.getResultList();

      int stt = (int) pageable.getOffset() + 1;

      for (int i = 0; i < orders.size(); i++) {
        HoaDon hoaDon = orders.get(i);
        OrderPaginationCustomResponse dto = new OrderPaginationCustomResponse();
        dto.setStt((long) (stt + i));
        dto.setId(hoaDon.getId());
        dto.setMa(hoaDon.getMa());
        dto.setHoVaTen(hoaDon.getHoVaTen());
        dto.setSoDienThoai(hoaDon.getSoDienThoai());
        dto.setTenNguoiNhan(hoaDon.getTenNguoiNhan());
        dto.setSoDienThoaiNguoiNhan(hoaDon.getSoDienThoaiNguoiNhan());
        dto.setCreatedBy(hoaDon.getCreatedBy());
        dto.setCreatedAt(hoaDon.getCreatedAt());
        dto.setTongTien(hoaDon.getTongTien());
        dto.setKhachCanTra(hoaDon.getKhachCanTra());
        dto.setLoaiHoaDon(hoaDon.getLoaiHoaDon());
        dto.setTrangThai(hoaDon.getTrangThai());
        dto.setAccount(hoaDon.getAccount());
        dto.setAccountEmployee(hoaDon.getAccountEmployee());
        pagedOrders.add(dto);
      }


//      orders = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
      totalElements = entityManager.createQuery(countQuery).getSingleResult();

    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return new PageImpl<>(pagedOrders, pageable, totalElements);
  }

  @Override
  @Transactional
  public List<HoaDon> getOrdersPending() {
    List<HoaDon> entityList = null;
    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      CriteriaQuery<HoaDon> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());

      Root<HoaDon> root = criteriaQuery.from(this.getPersistenceClass());
      Fetch<HoaDon, GioHang> joinCart = root.fetch("cart", JoinType.LEFT);
      Fetch<HoaDon, HoaDonChiTiet> joinOrderItems = root.fetch("orderItems", JoinType.LEFT);
      Fetch<GioHang, GioHangChiTiet> joinCartItems = joinCart.fetch("cartItems", JoinType.LEFT);
      Fetch<GioHangChiTiet, ImeiChuaBan> joinImeisNotSold = joinCartItems.fetch("imeisChuaBan", JoinType.LEFT);
      Fetch<GioHangChiTiet, SanPhamChiTiet> joinProductDetails = joinCartItems.fetch("sanPhamChiTiet", JoinType.LEFT);

      Fetch<SanPhamChiTiet, Ram> joinRam = joinProductDetails.fetch("ram", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Rom> joinRom = joinProductDetails.fetch("rom", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinColor = joinProductDetails.fetch("mauSac", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Image> joinImage = joinProductDetails.fetch("image", JoinType.LEFT);
//      Fetch<SanPhamChiTiet, KhuyenMaiChiTiet> joinPromotions = joinProductDetails.fetch("promotions", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinImeis = joinProductDetails.fetch("imeis", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.fetch("sanPham", JoinType.LEFT);

      Fetch<SanPham, Chip> joinChip = joinProduct.fetch("chip", JoinType.LEFT);
      Fetch<SanPham, Pin> joinPin = joinProduct.fetch("pin", JoinType.LEFT);
      Fetch<SanPham, ManHinh> joinScreen = joinProduct.fetch("manHinh", JoinType.LEFT);
      Fetch<ManHinh, DoPhanGiaiManHinh> joinScreenRelution = joinScreen.fetch("doPhanGiaiManHinh", JoinType.LEFT);
      Fetch<SanPham, Hang> joinBrand = joinProduct.fetch("hang", JoinType.LEFT);
      Fetch<SanPham, CongSac> joinChargingPort = joinProduct.fetch("congSac", JoinType.LEFT);
      Fetch<SanPham, TheNho> joinMemoryCard = joinProduct.fetch("theNho", JoinType.LEFT);

      Fetch<SanPham, TheSimDienThoai> joinSimCardPhone = joinProduct.fetch("theSims", JoinType.LEFT);
      Fetch<TheSimDienThoai, TheSim> joinSimCard = joinSimCardPhone.fetch("theSim", JoinType.LEFT);
      Fetch<SanPham, DanhMucDienThoai> joinCategoryPhone = joinProduct.fetch("danhMucs", JoinType.LEFT);
      Fetch<DanhMucDienThoai, DanhMuc> joinCategory = joinCategoryPhone.fetch("danhMuc", JoinType.LEFT);
      Fetch<SanPham, CameraTruocDienThoai> joinCameraFrontPhone = joinProduct.fetch("cameraTruocs", JoinType.LEFT);
      Fetch<CameraTruocDienThoai, CameraTruoc> joinCameraFront = joinCameraFrontPhone.fetch("cameraTruoc", JoinType.LEFT);
      Fetch<SanPham, CameraSauDienThoai> joinCameraRearPhone = joinProduct.fetch("cameraSaus", JoinType.LEFT);
      Fetch<CameraSauDienThoai, CameraSau> joinCameraRear = joinCameraRearPhone.fetch("cameraSau", JoinType.LEFT);

      Fetch<HoaDon, Account> joinAccount = root.fetch("account", JoinType.LEFT);
      Fetch<HoaDon, Account> joinAccountEmployee = root.fetch("accountEmployee", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccount = joinAccount.fetch("idRole", JoinType.LEFT);
      Fetch<Account, Role> joinRoleAccountEmployee = joinAccountEmployee.fetch("idRole", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddress = joinAccount.fetch("diaChiList", JoinType.LEFT);
      Fetch<Account, DiaChi> joinAddressEmployee = joinAccountEmployee.fetch("diaChiList", JoinType.LEFT);

      root.fetch("paymentMethods", JoinType.LEFT);
      root.fetch("orderHistories", JoinType.LEFT);
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
      if (state == 10) {
        Integer[] states = {0, 1, 2, 3, 4, 5, 7, 8, 9};
        predicates.add(root.get(fieldState).in(states));
        countPredicates.add(countRoot.get(fieldState).in(states));
      } else if (state == 4) {
        Integer[] states = {4, 7};
        predicates.add(root.get(fieldState).in(states));
        countPredicates.add(countRoot.get(fieldState).in(states));
      } else {
        predicates.add(criteriaBuilder.equal(root.get(fieldState), state));
        countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldState), state));
      }
    }

    if (type != null) {
      if (type == 10) {
        Integer[] types = {0, 1};
        predicates.add(root.get(fieldType).in(types));
        countPredicates.add(countRoot.get(fieldType).in(types));
      } else {
        predicates.add(criteriaBuilder.equal(root.get(fieldType), type));
        countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldType), type));
      }
    }

    if (sortType != null) {
      if (sortType.equals("default")) {
        criteriaQuery.orderBy(criteriaBuilder.desc(root.get(fieldDate)));
      } else if (sortType.equals("desc")) {
        criteriaQuery.orderBy(criteriaBuilder.asc(root.get(fieldDate)));
      } else if (sortType.equals("asc")) {
        criteriaQuery.orderBy(criteriaBuilder.desc(root.get(fieldDate)));
      }
    }

    mapPredicates.put("predicates", predicates);
    mapPredicates.put("countPredicates", countPredicates);

    return mapPredicates;
  }

}
