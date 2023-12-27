package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.ChipServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_CHIP_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ChipController {

    @Autowired
    private ChipServiceImpl chipService;

    @GetMapping("/search")
    public ResponsePage getChipPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<ChipResponse> chip = chipService.findAllChip(request);
        return new ResponsePage(chip);
    }

    @GetMapping
    public ResponseObject<List<ChipResponse>> getChip() {
        List<ChipResponse> chip = chipService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(ChipResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(chip);
    }

    @GetMapping("/{id}")
    public ResponseObject<ChipResponse> getChipById(@PathVariable("id") String id) {
        ChipResponse chip = chipService.findOneById(id);
        return new ResponseObject<>(chip);
    }

    @PostMapping
    public ResponseObject<ChipResponse> createChip(@RequestBody ChipRequest chipRequest) throws Exception {
        ChipResponse createdChip = chipService.save(chipRequest);
        return new ResponseObject<>(createdChip);
    }

    @PutMapping
    public ResponseObject<ChipResponse> updateChip(@RequestBody ChipRequest chipRequest) throws Exception {
        ChipResponse chipResponse = chipService.update(chipRequest);
        return new ResponseObject<>(chipResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<Chip> doiTrangThai(@PathVariable String id) throws Exception {
        Chip doiTrangThai = chipService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
