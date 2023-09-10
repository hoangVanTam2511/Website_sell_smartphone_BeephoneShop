package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.GioHangRepository;
import beephone_shop_projects.entity.GioHang;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class GioHangRepositoryImpl extends AbstractRepositoryImpl<GioHang, String> implements GioHangRepository {
  private static final Logger logger = LoggerFactory.getLogger(GioHangRepository.class);

  @Override
  @Transactional
  public GioHang getCartByOrderId(String id) {
    GioHang cart;
    String query = "SELECT C FROM GioHang C WHERE C.hoaDon.id = ?1";

    try (EntityManager entityManager = this.getEntityManager()) {
      TypedQuery<GioHang> typedQuery = entityManager.createQuery(query, this.getPersistenceClass())
              .setParameter(1, id);
      cart = typedQuery.getSingleResult();
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }

    return cart;
  }

}