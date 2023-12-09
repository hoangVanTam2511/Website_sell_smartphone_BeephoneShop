package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.HinhThucThanhToanRepository;
import beephone_shop_projects.entity.HinhThucThanhToan;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
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
    } catch (PersistenceException e) {
      logger.error(e.getMessage());
      throw e;
    }

    return paymentMethods;
  }

  @Override
  @Transactional
  public HinhThucThanhToan getPaymentMethodById(String id) {
    HinhThucThanhToan payment = null;
    String query = "SELECT P FROM HinhThucThanhToan P WHERE P.ma = ?1";

    try (EntityManager entityManager = this.getEntityManager()) {
      TypedQuery<HinhThucThanhToan> typedQuery = entityManager.createQuery(query, this.getPersistenceClass())
              .setParameter(1, id);
      payment = typedQuery.getSingleResult();
    } catch (PersistenceException e) {
      logger.error(e.getMessage());
      throw e;
    }

    return payment;
  }
}
