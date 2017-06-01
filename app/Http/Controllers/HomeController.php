<?php

namespace App\Http\Controllers;


use App\Components\ArrayHelper;
use App\Models\CBanner;
use App\Models\CMaterial;
use App\Models\CNews;
use Illuminate\Support\Facades\Input;

class HomeController extends Controller
{

    /**
     * @api 获取轮播图
     */
    public function banners(CBanner $banner, CMaterial $material)
    {
        return ArrayHelper::format(0, ['data' => $banner->getList($this->wechatId, $material)]);
    }

    /**
     * @api 获取资讯列表
     */
    public function newsList(CNews $news, CMaterial $material)
    {
        $currentPage = Input::get('currentPage', 1);
        $pageSize = Input::get('pageSize', 10);
        return ArrayHelper::format(0, $news->getList($this->wechatId, $material, $currentPage, $pageSize));
    }

    /**
     * @api 获取资讯详情
     */
    public function newsDetail(CNews $news, CMaterial $material)
    {
        return ArrayHelper::format(0, $news->getDetail(Input::get('newsId', 0), $material));
    }

}
