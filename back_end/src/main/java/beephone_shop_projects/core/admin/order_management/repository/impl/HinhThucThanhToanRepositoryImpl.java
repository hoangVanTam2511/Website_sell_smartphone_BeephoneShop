package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.HinhThucThanhToanRepository;
import beephone_shop_projects.entity.HinhThucThanhToan;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HinhThucThanhToanRepositoryImpl extends AbstractRepositoryImpl<HinhThucThanhToan, String> implements HinhThucThanhToanRepository {
  private static final Logger logger = LoggerFactory.getLogger(HinhThucThanhToanRepositoryImpl.class);

  @Override
  @Transactional
  public List<HinhThucThanhToan> getPaymentMethodsByOrderId(String id) {
    List<HinhThucThanhToan> paymentMethods = null;
    String query = "SELECT P FROM HinhThucThanhToan P WHERE P.hoaDon.ma = ?1 ORDER BY P.createdAt DESC";

    try (EntityManager entityManager = this.getEntityManager()) {
      TypedQuery<HinhThucThanhToan> typedQuery = entityManager.createQuery(query, this.getPersistenceClass())
              .setParameter(1, id);
      paymentMethods = typedQuery.getResultList();
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }

    return paymentMethods;
  }
}
