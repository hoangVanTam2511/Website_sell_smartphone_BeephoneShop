package beephone_shop_projects.core.admin.order_management.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.nio.channels.MulticastChannel;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductItemConfigurationRequest {

  private String id;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private ColorRequest color;

  private RamRequest ram;

  private RomRequest rom;

  private List<ProductItemImeiRequest> imeis;


}
