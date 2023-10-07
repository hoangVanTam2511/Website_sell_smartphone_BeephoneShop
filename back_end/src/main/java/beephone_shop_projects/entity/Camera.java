package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "camera")
public class Camera extends PrimaryEntity {

    private String ma;

    private String doPhanGiai;

}
