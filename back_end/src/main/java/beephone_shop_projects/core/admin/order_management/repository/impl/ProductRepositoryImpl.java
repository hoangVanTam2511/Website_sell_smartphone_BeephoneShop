package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterProductDto;
import beephone_shop_projects.core.admin.order_management.model.request.SearchProductDto;
import beephone_shop_projects.core.admin.order_management.repository.ProductRepository;
import beephone_shop_projects.core.common.base.JpaPersistence;
import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.entity.CameraSauDienThoai;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.entity.CameraTruocDienThoai;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.entity.DanhMucDienThoai;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.Image;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.TheNho;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.entity.TheSimDienThoai;
import beephone_shop_projects.infrastructure.constant.OperatingType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Fetch;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProductRepositoryImpl extends AbstractRepositoryImpl<SanPham, String> implements ProductRepository {
  private static final Logger logger = LoggerFactory.getLogger(ProductRepositoryImpl.class);

  @Override
  public Page<SanPham> findProductByMultipleWithPagination(Pageable pageable, SearchFilterProductDto searchFilter) {
    List<SanPham> products = null;
    Long totalElements = 0L;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<SanPham> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

      Root<SanPham> root = criteriaQuery.from(this.getPersistenceClass());
      Root<SanPham> countRoot = countQuery.from(this.getPersistenceClass());

      Fetch<SanPham, Chip> joinChip = root.fetch("chip", JoinType.LEFT);
      Fetch<SanPham, Pin> joinPin = root.fetch("pin", JoinType.LEFT);
      Fetch<SanPham, ManHinh> joinScreen = root.fetch("manHinh", JoinType.LEFT);
      Fetch<ManHinh, DoPhanGiaiManHinh> joinScreenRelution = joinScreen.fetch("doPhanGiaiManHinh", JoinType.LEFT);
      Fetch<SanPham, Hang> joinBrand = root.fetch("hang", JoinType.LEFT);
      Fetch<SanPham, CongSac> joinChargingPort = root.fetch("congSac", JoinType.LEFT);
      Fetch<SanPham, TheNho> joinMemoryCard = root.fetch("theNho", JoinType.LEFT);
//
      Fetch<SanPham, TheSimDienThoai> joinSimCardPhone = root.fetch("theSims", JoinType.LEFT);
      Fetch<TheSimDienThoai, TheSim> joinSimCard = joinSimCardPhone.fetch("theSim", JoinType.LEFT);
      Fetch<SanPham, DanhMucDienThoai> joinCategoryPhone = root.fetch("danhMucs", JoinType.LEFT);
      Fetch<DanhMucDienThoai, DanhMuc> joinCategory = joinCategoryPhone.fetch("danhMuc", JoinType.LEFT);
      Fetch<SanPham, CameraTruocDienThoai> joinCameraFrontPhone = root.fetch("cameraTruocs", JoinType.LEFT);
      Fetch<CameraTruocDienThoai, CameraTruoc> joinCameraFront = joinCameraFrontPhone.fetch("cameraTruoc", JoinType.LEFT);
      Fetch<SanPham, CameraSauDienThoai> joinCameraRearPhone = root.fetch("cameraSaus", JoinType.LEFT);
      Fetch<CameraSauDienThoai, CameraSau> joinCameraRear = joinCameraRearPhone.fetch("cameraSau", JoinType.LEFT);

      JpaPersistence<SanPham> configuration = new JpaPersistence<SanPham>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

      this.buildSelectAllAndCountEntity(configuration);
      this.buildSortByPageable(configuration, pageable.getSort());
      this.buildWhereConditionByPredicates(configuration, buildPredicates(SearchProductDto.class, searchFilter, configuration));

      products = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
      totalElements = entityManager.createQuery(countQuery).getSingleResult();

    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return new PageImpl<>(products, pageable, totalElements);
  }

  private Map<String, List<Predicate>> buildPredicates(Class<SearchProductDto> searchEntity, SearchFilterProductDto searchFilter, JpaPersistence<SanPham> configuration) {
    Map<String, List<Predicate>> mapPredicates = new HashMap<String, List<Predicate>>();
    List<Predicate> predicates = new ArrayList<Predicate>();
    List<Predicate> countPredicates = new ArrayList<Predicate>();

    CriteriaBuilder criteriaBuilder = configuration.getCriteriaBuilder();
    CriteriaQuery<SanPham> criteriaQuery = configuration.getCriteriaQuery();
    Root<SanPham> root = configuration.getRoot();
    Root<SanPham> countRoot = configuration.getCountRoot();

    String keyword = searchFilter.getKeyword().trim();

    List<String> danhMucs = searchFilter.getDanhMucs();
    List<String> hangs = searchFilter.getHangs();
    List<OperatingType> heDieuHanhs = searchFilter.getHeDieuHanhs();
    List<String> chips = searchFilter.getChips();
//    List<String> rams = searchFilter.getRams();
//    List<String> roms = searchFilter.getRoms();
    List<String> pins = searchFilter.getPins();
    List<String> manHinhs = searchFilter.getManHinhs();

//    BigDecimal fromPrice = searchFilter.getFromPrice();
//    BigDecimal toPrice = searchFilter.getToPrice();

    if (!keyword.isBlank()) {
      Predicate searchPredicate = this.getPredicateContainsObject(root, searchEntity, keyword, configuration);
      Predicate countSearchPredicate = this.getPredicateContainsObject(countRoot, searchEntity, keyword, configuration);

      predicates.add(searchPredicate);
      countPredicates.add(countSearchPredicate);
    }

//    if (state != null) {
//      predicates.add(criteriaBuilder.equal(root.get(fieldState), state));
//      countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldState), state));
//    }
//
    if (danhMucs != null && !danhMucs.isEmpty()) {
      Join<SanPham, DanhMucDienThoai> danhMucJoin = root.join("danhMucs");
      predicates.add(danhMucJoin.get("danhMuc").get("id").in(danhMucs));

      Join<SanPham, DanhMucDienThoai> danhMucJoinCount = countRoot.join("danhMucs");
      countPredicates.add(danhMucJoinCount.get("danhMuc").get("id").in(danhMucs));
    }

    if (hangs != null && !hangs.isEmpty()) {
      Join<SanPham, Hang> hangJoin = root.join("hang");
      predicates.add(hangJoin.get("id").in(hangs));

      Join<SanPham, Hang> hangJoinCount = countRoot.join("hang");
      countPredicates.add(hangJoinCount.get("id").in(hangs));
    }

    if (heDieuHanhs != null && !heDieuHanhs.isEmpty()) {
      predicates.add(root.get("operatingType").in(heDieuHanhs));

      countPredicates.add(countRoot.get("operatingType").in(heDieuHanhs));

    }
    if (chips != null && !chips.isEmpty()) {
      Join<SanPham, Chip> chipJoin = root.join("chip");
      predicates.add(chipJoin.get("id").in(chips));

      Join<SanPham, Chip> chipJoinCount = countRoot.join("chip");
      countPredicates.add(chipJoinCount.get("id").in(chips));

    }
    if (manHinhs != null && !manHinhs.isEmpty()) {
      Join<SanPham, ManHinh> manHinhJoin = root.join("manHinh");
      predicates.add(manHinhJoin.get("id").in(manHinhs));

      Join<SanPham, ManHinh> manHinhJoinCount = countRoot.join("manHinh");
      countPredicates.add(manHinhJoinCount.get("id").in(manHinhs));
    }
    if (pins != null && !pins.isEmpty()) {
      Join<SanPham, Pin> pinJoin = root.join("pin");
      predicates.add(pinJoin.get("id").in(pins));

      Join<SanPham, Pin> pinJoinCount = countRoot.join("pin");
      countPredicates.add(pinJoinCount.get("id").in(pins));
    }

    criteriaQuery.orderBy(criteriaBuilder.desc(root.get("createdAt")));

//    if (sortType != null) {
//      // Do something
//    }

    mapPredicates.put("predicates", predicates);
    mapPredicates.put("countPredicates", countPredicates);

    return mapPredicates;
  }

  protected Predicate getPredicateContainsObject(Root<SanPham> root, Class<SearchProductDto> entityDTO, String keyword, JpaPersistence<SanPham> configuration) {
    Field[] fields = entityDTO.getDeclaredFields();
    List<Predicate> predicates = new ArrayList<>();
    for (Field field : fields) {
      predicates.add(configuration.getCriteriaBuilder().like(configuration.getCriteriaBuilder().lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
    }
    return configuration.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
  }
}
