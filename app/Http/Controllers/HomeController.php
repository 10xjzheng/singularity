<?php

namespace App\Http\Controllers;


use App\Components\ArrayHelper;
use App\Models\CBanner;
use App\Models\CMaterial;

class HomeController extends Controller
{

    /**
     * @api 获取轮播图
     */
    public function banners(CBanner $banner, CMaterial $material)
    {
        return ArrayHelper::format($banner->getList($this->wechatId, $material));
    }

    /**
     * @api 获取资讯列表
     */
    public function newsList()
    {
        return [];
    }

    /**
     * @api 获取资讯详情
     */
    public function newsDetail()
    {
        return [];
    }

}
