<?php

namespace App\Modules\Admin\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
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

    /**
     * 用户ID
     * @var int
     */
    protected  $userId = 1;

    /**
     * 登录处理
     */
    public function __construct()
    {

    }

}
