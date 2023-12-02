package beephone_shop_projects.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class BarcodeGenerator {
  public String generateBarcodeImageBase64Url(String code, BarcodeFormat barcodeFormat) throws IOException, WriterException {
    try {
      int width = 500;
      int height = 500;

      if (barcodeFormat.equals(BarcodeFormat.CODE_128)) {
        width = 300;
        height = 100;
      }
      BitMatrix bitMatrix = new MultiFormatWriter().encode(code,
              barcodeFormat,
              width,
              height
      );
      BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
      ByteArrayOutputStream stream = new ByteArrayOutputStream();
      ImageIO.write(bufferedImage, "png", stream);
      byte[] imageBytes = stream.toByteArray();

      String base64Image = java.util.Base64.getEncoder().encodeToString(imageBytes);

      String dataUri = "data:image/png;base64," + base64Image;
      return dataUri;

    } catch (Exception e) {
      // Xử lý lỗi nếu có
      return null;
    }

  }


}
