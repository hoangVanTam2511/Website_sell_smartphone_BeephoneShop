package beephone_shop_projects.core.admin.order_management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ImeisRequest {
  private List<ImeiRequest> imeis;
}
