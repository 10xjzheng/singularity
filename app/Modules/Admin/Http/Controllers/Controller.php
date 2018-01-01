<?php

namespace App\Modules\Admin\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * 公众号ID
     * @var int
     */
    protected  $wechatId = 1;


    const ADMIN_KEY = 'admin';

    public static $adminList = ['admin' => 'qdjf9527'];

    /**
     * 登录处理
     */
    public function __construct(Request $request)
    {
        if(!$request->session()->has(self::ADMIN_KEY)) {
            return view('admin::login');
        }
        return true;
    }

}
