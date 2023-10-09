package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Fetch;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.PersistenceException;

@Repository
public class CartItemRepositoryImpl extends AbstractRepositoryImpl<GioHangChiTiet, String> implements CartItemRepository {
  private static final Logger logger = LoggerFactory.getLogger(CartItemRepository.class);

  @Override
  public GioHangChiTiet getCartItemById(String id) {
    GioHangChiTiet entity = null;
    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      CriteriaQuery<GioHangChiTiet> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());

      Root<GioHangChiTiet> root = criteriaQuery.from(this.getPersistenceClass());
      Fetch<GioHangChiTiet, SanPhamChiTiet> joinProductDetails = root.fetch("sanPhamChiTiet", JoinType.LEFT);
      Fetch<SanPhamChiTiet, SanPham> joinProduct = joinProductDetails.fetch("sanPham", JoinType.LEFT);
      Fetch<SanPhamChiTiet, CauHinh> joinConfiguration = joinProductDetails.fetch("cauHinh", JoinType.LEFT);
      Fetch<CauHinh, Ram> joinRam = joinConfiguration.fetch("ram", JoinType.LEFT);
      Fetch<CauHinh, Rom> joinRom = joinConfiguration.fetch("rom", JoinType.LEFT);
      Fetch<CauHinh, MauSac> joinMauSac = joinConfiguration.fetch("mauSac", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("id"), id);
      criteriaQuery.select(root).where(condition);

      entity = entityManager.createQuery(criteriaQuery).getSingleResult();
    } catch (PersistenceException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return entity;
  }
}