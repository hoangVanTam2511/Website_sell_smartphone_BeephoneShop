package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.CartRepository;
import beephone_shop_projects.entity.GioHangChiTiet;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class CartItemRepositoryImpl extends AbstractRepositoryImpl<GioHangChiTiet, String> implements CartItemRepository {
  private static final Logger logger = LoggerFactory.getLogger(CartRepository.class);

  @Override
  @Transactional
  public Optional<GioHangChiTiet> findProductAlreadyExistInCart(CartItemRequest req) {
    Optional<GioHangChiTiet> cartItem = Optional.empty();
    String query = """
            SELECT C FROM GioHangChiTiet C WHERE C.sanPhamChiTiet.id = ?1 AND C.gioHang.id = ?2
            """;

    try (EntityManager entityManager = this.getEntityManager()) {
      TypedQuery<GioHangChiTiet> typedQuery = entityManager
              .createQuery(query, GioHangChiTiet.class).setParameter(1, req.getProductItem().getId())
              .setParameter(2, req.getCart().getId());
      cartItem = Optional.ofNullable(typedQuery.getSingleResult());

    } catch (PersistenceException e) {
      logger.error(e.getMessage());
    }

    return cartItem;
  }

}