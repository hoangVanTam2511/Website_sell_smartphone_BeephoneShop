package beephone_shop_projects.infrastructure.listener;
import beephone_shop_projects.entity.base.AuditEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;

public class AuditEntityListener {

    @PrePersist
    private void onCreate(AuditEntity entity) {
      entity.setCreatedAt(new Date());
      entity.setUpdatedAt(new Date());
      entity.setDelected(true);
//      entity.setCreatedBy(null);
      entity.setUpdatedBy(null);
    }

    @PreUpdate
    private void onUpdate(AuditEntity entity) {
        entity.setUpdatedAt(new Date());
        entity.setUpdatedBy(null);
    }
}
