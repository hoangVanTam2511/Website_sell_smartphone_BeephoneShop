package beephone_shop_projects.utils;

import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Dungnp
 */

@Component
public class CloudinaryUtils {

    @Autowired
    private Cloudinary cloudinary;

    /**
     *
     * @param file: file ảnh lấy từ controller
     * @param id: id của sự kiện
     * @return String - Đường dẫn ảnh được lưu trên cloud
     * 			null - lưu thất bại
     */
    public String uploadImage(MultipartFile file, String id) {
        try {
            String folder = "Images BeePhoneShop";
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("public_id", folder + id));
            return (String) uploadResult.get("url");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestApiException("UPLOAD IMAGE FAIL");
        }
    }

    /**
     * @param type: 0 - cần xóa backround, 1 - cần xóa banner, 2 - cần xóa standee
     * @param id: id của sự kiện có ảnh cần xóa
     * @return true: Xóa thành công
     *      	false: Xóa thất bại
     */
    public boolean deleteImage(int type, String id) {
        try {
            String publicId = "";
            if (type == 0) {
                publicId = "Background/" + id;
            } else if (type == 1) {
                publicId = "Banner/" + id;
            } else if (type == 2) {
                publicId = "Standee/" + id;
            } else if (type == 3) {
                publicId = "Evidence/" + id;
            }
            Map deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            if (deleteResult.containsKey("result") && deleteResult.get("result").equals("ok")) {
                return true;
            } else {
                throw new RestApiException("DELETE IMAGE FAIL");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestApiException("DELETE IMAGE FAIL");
        }
    }

    public String publicIdFromURL(String cloudinaryURL) {
        String regex = "/([^/]+)\\.[a-z]{3,4}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(cloudinaryURL);

        // Kiểm tra nếu có kết quả và lấy public_id
        if (matcher.find()) {
            String public_id = matcher.group(1);
            return public_id;
        } else {
            return "";
        }
    }

}