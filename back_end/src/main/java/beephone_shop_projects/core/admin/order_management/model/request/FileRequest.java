package beephone_shop_projects.core.admin.order_management.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FileRequest {

  private MultipartFile file;

}
