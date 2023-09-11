package beephone_shop_projects.core.admin.account_management.service;

import java.io.IOException;

public interface ExportService {
    byte[] exportExcelData(Integer pageNo) throws IOException;
    byte[] exportExcelDataNV() throws IOException;
}
