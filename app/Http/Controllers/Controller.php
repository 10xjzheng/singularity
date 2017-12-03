<?php

namespace App\Http\Controllers;

use App\Models\CUser;
use EasyWeChat\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    //session key
    const USER_INFO = 'user_info';

    /**
     * 公众号ID
     * @var int
     */
    protected  $wechatId = 1;

    /**
     * 用户ID
     * @var int
     */
    protected  $userId = 0;


    /**
     * 登录处理
     */
    public function __construct(Request $request)
    {
        return $this->getUserInfo($request);
    }


    /**
     * 获取用户信息
     */
    private function getUserInfo(Request $request)
    {
        if(!$request->session()->has(self::USER_INFO)) {
            $config = config('wechat');
            $application = new Application($config);
            return $application->oauth->redirect()->send();
        }
        $userInfo = $request->session()->get(self::USER_INFO);
        $this->userId = CUser::getIdByOpenId($userInfo['open_id']);
        return true;
    }
}
