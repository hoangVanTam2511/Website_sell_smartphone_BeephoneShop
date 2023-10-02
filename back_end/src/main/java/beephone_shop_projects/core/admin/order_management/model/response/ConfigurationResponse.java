package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.core.admin.order_management.dto.ColorDto;
import beephone_shop_projects.core.admin.order_management.dto.RamDto;
import beephone_shop_projects.core.admin.order_management.dto.RomDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfigurationResponse {

  private String id;

  private RamDto ram;

  private RomDto rom;

  private ColorDto mauSac;

}
