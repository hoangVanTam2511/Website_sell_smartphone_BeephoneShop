package beephone_shop_projects.infrastructure.listener;

import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.PrePersist;
import java.util.UUID;
public class CreatePrimaryEntityListener {

    @PrePersist
    private void onCreate(PrimaryEntity entity){
        entity.setId(UUID.randomUUID().toString());
    }
}
