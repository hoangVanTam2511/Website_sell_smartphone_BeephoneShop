package beephone_shop_projects.core.admin.rank_management.controller;

import beephone_shop_projects.core.admin.rank_management.model.request.CreateRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.request.FindRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.request.UpdateRankRequest;
import beephone_shop_projects.core.admin.rank_management.service.RankService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rank")
@CrossOrigin("*")
public class RankRestController {
    @Autowired
    private RankService rankService;

    @GetMapping("/get-by-id/{id}")
    public ResponseObject getOneRank(@PathVariable("id") String id) {
        return new ResponseObject(rankService.getOne(id));
    }

    @PostMapping("/addRank")
    public ResponseObject addRank(@RequestBody CreateRankRequest request) {
        return new ResponseObject(rankService.addRank(request));
    }

    @PutMapping("/updateRank/{id}")
    public ResponseObject updateRank(@PathVariable("id") String id, @RequestBody UpdateRankRequest request) {
        return new ResponseObject(rankService.updateRank(request, id));
    }

    @PutMapping("/deleteTrangThaiRank/{id}")
    public ResponseObject deleteTrangThaiRank(@PathVariable("id") String id) {
        return new ResponseObject(rankService.doiTrangThai(id));
    }

    @GetMapping("/ranks")
    public ResponseObject hienThiRank() {
        return new ResponseObject(rankService.findAll());
    }

    @GetMapping("/ranksPage")
    public ResponsePage hienThiRankPage(@RequestParam(name = "page", defaultValue = "1") Integer pageNo,
                                    final FindRankRequest request) {
        return new ResponsePage(rankService.getAll(pageNo, request));
    }


}
