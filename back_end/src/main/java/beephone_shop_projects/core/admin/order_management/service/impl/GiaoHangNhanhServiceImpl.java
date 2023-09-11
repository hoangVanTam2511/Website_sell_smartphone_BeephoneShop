package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.constant.Constants;
import beephone_shop_projects.core.admin.order_management.dto.ProvinceApi;
import beephone_shop_projects.core.admin.order_management.service.GiaoHangNhanhService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GiaoHangNhanhServiceImpl implements GiaoHangNhanhService {

  private final String ROOT_TOKEN = Constants.GhnApi.GHN_ROOT_TOKEN;
  private final String ROOT_PROVINCE_URL = Constants.GhnApi.GHN_ROOT_URL_PROVINCE;

  private RestTemplate restTemplate;

  public GiaoHangNhanhServiceImpl() {
    this.restTemplate = new RestTemplate();
  }

  @Override
  public ProvinceApi getListProvince() {
    ProvinceApi api = new ProvinceApi();
    String apiProvince = ROOT_PROVINCE_URL;

    HttpHeaders headers = new HttpHeaders();
    headers.add("token", this.ROOT_TOKEN);

    HttpEntity<?> httpEntity = new HttpEntity<>(headers);

    ResponseEntity<ProvinceApi> response = restTemplate.exchange(apiProvince, HttpMethod.GET, httpEntity, ProvinceApi.class);

    if (response.getStatusCode().is2xxSuccessful()) {
      return response.getBody();

    } else {
    }
    return null;
  }
}
