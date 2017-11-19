<?php

namespace App\Modules\Admin\Http\Controllers;


class SiteController extends Controller
{

    /**
     * @api 获取用户信息
     * @return mixed
     */
    public function index()
    {
        return view('admin::index');
    }
}
