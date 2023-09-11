package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.LichSuHoaDonRepository;
import beephone_shop_projects.entity.LichSuHoaDon;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LichSuHoaDonRepositoryImpl extends AbstractRepositoryImpl<LichSuHoaDon, String> implements LichSuHoaDonRepository {
  private static final Logger logger = LoggerFactory.getLogger(LichSuHoaDonRepositoryImpl.class);

  @Override
  @Transactional
  public List<LichSuHoaDon> getOrderHistoriesByOrderId(String id) {
    List<LichSuHoaDon> orderHistories = null;
    String query = "SELECT O FROM LichSuHoaDon O WHERE O.hoaDon.ma = ?1 ORDER BY O.createdAt ASC";

    try (EntityManager entityManager = this.getEntityManager()) {
      TypedQuery<LichSuHoaDon> typedQuery = entityManager.createQuery(query, this.getPersistenceClass())
              .setParameter(1, id);
      orderHistories = typedQuery.getResultList();
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }

    return orderHistories;
  }

}
