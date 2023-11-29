package beephone_shop_projects.core.client.models.response;


import beephone_shop_projects.entity.Image;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "image", types = {Image.class, MauSac.class})
public interface ImageResponce {

    @Value("#{target.url}")
    String getUrl();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();
}
