package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RomRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.RomResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.RomServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_ROM_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class RomController {

    @Autowired
    private RomServiceImpl romService;

    @GetMapping("/search")
    public ResponsePage getRomPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<RomResponse> rom = romService.findAllRom(request);
        return new ResponsePage(rom);
    }

    @GetMapping("/{id}")
    public ResponseObject<RomResponse> getRomById(@PathVariable("id") String id) {
        RomResponse rom = romService.findOneById(id);
        return new ResponseObject<>(rom);
    }

    @GetMapping
    public ResponseObject<List<RomResponse>> getRom() {
        List<RomResponse> Rom = romService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(RomResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(Rom);
    }

    @PostMapping
    public ResponseObject<RomResponse> createRom(@RequestBody RomRequest RomRequest) throws Exception {
        RomResponse createdRom = romService.save(RomRequest);
        return new ResponseObject<>(createdRom);
    }

    @PutMapping
    public ResponseObject<RomResponse> updateRom(@RequestBody RomRequest romRequest) throws Exception {
        RomResponse romResponse = romService.update(romRequest);
        return new ResponseObject<>(romResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<Rom> doiTrangThai(@PathVariable String id) throws Exception {
        Rom doiTrangThai = romService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
