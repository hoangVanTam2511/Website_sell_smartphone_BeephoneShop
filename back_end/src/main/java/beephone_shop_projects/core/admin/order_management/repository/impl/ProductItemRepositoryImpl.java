package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterProductItemDto;
import beephone_shop_projects.core.admin.order_management.model.request.SearchProductDto;
import beephone_shop_projects.core.admin.order_management.repository.ProductItemRepository;
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
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
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
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProductItemRepositoryImpl extends AbstractRepositoryImpl<SanPhamChiTiet, String> implements ProductItemRepository {
  private static final Logger logger = LoggerFactory.getLogger(ProductItemRepositoryImpl.class);

  @Override
  public Page<SanPhamChiTiet> findProductItemByMultipleWithPagination(Pageable pageable, SearchFilterProductItemDto searchFilter) {
    List<SanPhamChiTiet> products = null;
    Long totalElements = 0L;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<SanPhamChiTiet> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

      Root<SanPhamChiTiet> root = criteriaQuery.from(this.getPersistenceClass());
      Root<SanPhamChiTiet> countRoot = countQuery.from(this.getPersistenceClass());

      Fetch<SanPhamChiTiet, Ram> joinRam = root.fetch("ram", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Rom> joinRom = root.fetch("rom", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinColor = root.fetch("mauSac", JoinType.LEFT);
      Fetch<SanPhamChiTiet, Image> joinImage = root.fetch("image", JoinType.LEFT);
//      Fetch<SanPhamChiTiet, KhuyenMaiChiTiet> joinPromotions = root.fetch("promotions", JoinType.LEFT);
      Fetch<SanPhamChiTiet, MauSac> joinImeis = root.fetch("imeis", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = root.fetch("sanPham", JoinType.LEFT);

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

      JpaPersistence<SanPhamChiTiet> configuration = new JpaPersistence<SanPhamChiTiet>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);

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

  private Map<String, List<Predicate>> buildPredicates(Class<SearchProductDto> searchEntity, SearchFilterProductItemDto searchFilter, JpaPersistence<SanPhamChiTiet> configuration) {
    Map<String, List<Predicate>> mapPredicates = new HashMap<String, List<Predicate>>();
    List<Predicate> predicates = new ArrayList<Predicate>();
    List<Predicate> countPredicates = new ArrayList<Predicate>();

    CriteriaBuilder criteriaBuilder = configuration.getCriteriaBuilder();
    CriteriaQuery<SanPhamChiTiet> criteriaQuery = configuration.getCriteriaQuery();
    Root<SanPhamChiTiet> root = configuration.getRoot();
    Root<SanPhamChiTiet> countRoot = configuration.getCountRoot();

    String keyword = searchFilter.getKeyword().trim();

    List<String> danhMucs = searchFilter.getDanhMucs();
    List<String> hangs = searchFilter.getHangs();
    List<OperatingType> heDieuHanhs = searchFilter.getHeDieuHanhs();
    List<String> chips = searchFilter.getChips();
    List<String> rams = searchFilter.getRams();
    List<String> roms = searchFilter.getRoms();
    List<String> pins = searchFilter.getPins();
    List<String> manHinhs = searchFilter.getManHinhs();

    BigDecimal fromPrice = searchFilter.getFromPrice();
    BigDecimal toPrice = searchFilter.getToPrice();

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
//    if (type != null) {
//      predicates.add(criteriaBuilder.equal(root.get(fieldType), type));
//      countPredicates.add(criteriaBuilder.equal(countRoot.get(fieldType), type));
//    }
//
    if (danhMucs != null && !danhMucs.isEmpty()) {
      Join<SanPhamChiTiet, SanPham> sanPhamJoin = root.join("sanPham");
      Join<SanPham, DanhMucDienThoai> danhMucJoin = sanPhamJoin.join("danhMucs");
      predicates.add(danhMucJoin.get("danhMuc").get("id").in(danhMucs));

      Join<SanPhamChiTiet, SanPham> sanPhamJoinCount = countRoot.join("sanPham");
      Join<SanPham, DanhMucDienThoai> danhMucJoinCount = sanPhamJoinCount.join("danhMucs");
      countPredicates.add(danhMucJoinCount.get("danhMuc").get("id").in(danhMucs));
    }

    if (hangs != null && !hangs.isEmpty()) {
      Join<SanPhamChiTiet, SanPham> sanPhamJoin = root.join("sanPham");
      Join<SanPham, Hang> hangJoin = sanPhamJoin.join("hang");
      predicates.add(hangJoin.get("id").in(hangs));

      Join<SanPhamChiTiet, SanPham> sanPhamJoinCount = countRoot.join("sanPham");
      Join<SanPham, Hang> hangJoinCount = sanPhamJoinCount.join("hang");
      countPredicates.add(hangJoinCount.get("id").in(hangs));
    }

    if (heDieuHanhs != null && !heDieuHanhs.isEmpty()) {
      Join<SanPhamChiTiet, SanPham> sanPhamJoin = root.join("sanPham");
      predicates.add(sanPhamJoin.get("operatingType").in(heDieuHanhs));

      Join<SanPhamChiTiet, SanPham> sanPhamJoinCount = countRoot.join("sanPham");
      countPredicates.add(sanPhamJoinCount.get("operatingType").in(heDieuHanhs));

    }
    if (chips != null && !chips.isEmpty()) {
      Join<SanPhamChiTiet, SanPham> sanPhamJoin = root.join("sanPham");
      Join<SanPham, Chip> chipJoin = sanPhamJoin.join("chip");
      predicates.add(chipJoin.get("id").in(chips));

      Join<SanPhamChiTiet, SanPham> sanPhamJoinCount = countRoot.join("sanPham");
      Join<SanPham, Chip> chipJoinCount = sanPhamJoinCount.join("chip");
      countPredicates.add(chipJoinCount.get("id").in(chips));

    }
    if (manHinhs != null && !manHinhs.isEmpty()) {
      Join<SanPhamChiTiet, SanPham> sanPhamJoin = root.join("sanPham");
      Join<SanPham, ManHinh> manHinhJoin = sanPhamJoin.join("manHinh");
      predicates.add(manHinhJoin.get("id").in(manHinhs));

      Join<SanPhamChiTiet, SanPham> sanPhamJoinCount = countRoot.join("sanPham");
      Join<SanPham, ManHinh> manHinhJoinCount = sanPhamJoinCount.join("manHinh");
      countPredicates.add(manHinhJoinCount.get("id").in(manHinhs));
    }
    if (pins != null && !pins.isEmpty()) {
      Join<SanPhamChiTiet, SanPham> sanPhamJoin = root.join("sanPham");
      Join<SanPham, Pin> pinJoin = sanPhamJoin.join("pin");
      predicates.add(pinJoin.get("id").in(pins));

      Join<SanPhamChiTiet, SanPham> sanPhamJoinCount = countRoot.join("sanPham");
      Join<SanPham, Pin> pinJoinCount = sanPhamJoinCount.join("pin");
      countPredicates.add(pinJoinCount.get("id").in(pins));
    }

    if (rams != null && !rams.isEmpty()) {
      Join<SanPhamChiTiet, Ram> ramJoin = root.join("ram");
      predicates.add(ramJoin.get("id").in(rams));

      Join<SanPhamChiTiet, Ram> ramJoinCount = countRoot.join("ram");
      countPredicates.add(ramJoinCount.get("id").in(rams));
    }

    if (roms != null && !roms.isEmpty()) {
      Join<SanPhamChiTiet, Rom> romJoin = root.join("rom");
      predicates.add(romJoin.get("id").in(roms));

      Join<SanPhamChiTiet, Rom> romJoinCount = countRoot.join("rom");
      countPredicates.add(romJoinCount.get("id").in(roms));
    }


    if (fromPrice != null && toPrice != null) {
      predicates.add(criteriaBuilder.between(root.get("donGia"), fromPrice, toPrice));
      countPredicates.add(criteriaBuilder.between(countRoot.get("donGia"), fromPrice, toPrice));
    }

//    if (sortType != null) {
//      // Do something
//    }

    mapPredicates.put("predicates", predicates);
    mapPredicates.put("countPredicates", countPredicates);

    return mapPredicates;
  }

  protected Predicate getPredicateContainsObject(Root<SanPhamChiTiet> root, Class<SearchProductDto> entityDTO, String keyword, JpaPersistence<SanPhamChiTiet> configuration) {
    Field[] fields = entityDTO.getDeclaredFields();
    List<Predicate> predicates = new ArrayList<>();
    for (Field field : fields) {
      if (field.getName().equals("tenSanPham")) {
        predicates.add(configuration.getCriteriaBuilder().like(configuration.getCriteriaBuilder().lower(root.get("sanPham").get("tenSanPham").as(String.class)), "%" + keyword.toLowerCase() + "%"));
      } else if (field.getName().equals("soLuongTonKho")) {
        if (StringUtils.isNumeric(keyword)) {
          Integer quantity = Integer.parseInt(keyword);
          predicates.add(configuration.getCriteriaBuilder().equal(root.get("soLuongTonKho"), quantity));
        }
      } else {
        predicates.add(configuration.getCriteriaBuilder().like(configuration.getCriteriaBuilder().lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
      }
    }
    return configuration.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
  }

}
