<?php

namespace App\Http\Controllers;


use App\Components\ArrayHelper;
use App\Models\CBanner;
use App\Models\CMaterial;

class HomeController extends Controller
{

    /**
     * @api ��ȡ�ֲ�ͼ
     */
    public function banners(CBanner $banner, CMaterial $material)
    {
        return ArrayHelper::format($banner->getList($this->wechatId, $material));
    }

    /**
     * @api ��ȡ��Ѷ�б�
     */
    public function newsList()
    {
        return [];
    }

    /**
     * @api ��ȡ��Ѷ����
     */
    public function newsDetail()
    {
        return [];
    }

}
