<?php

namespace App\Http\Controllers;

use App\Models\CUser;
use EasyWeChat\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class WechatController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    /**
     * @var Application $application
     */
    protected  $application;

    public function __construct(Request $request)
    {
        $config = config('wechat');
        $this->application = new Application($config);
    }

    /**
     * 处理微信的请求消息
     *
     * @return string
     */
    public function serve()
    {

        $server = $this->application->server;
        $server->setMessageHandler(function ($message) {
            // $message->FromUserName // 用户的 openid
            // $message->MsgType // 消息类型：event, text....
            return "您好！欢迎关注广东奇点金服!";
        });
        return $server->serve();
    }

    /**
     * 授权回调
     */
    public function authCallback(Request $request)
    {
        // 获取 OAuth 授权结果用户信息
        $data = $this->application->oauth->user()->toArray();
        $model = new CUser();
        $userInfo = $data['original'];
        $model->saveInfo($userInfo['openid'], $userInfo);
        $request->session()->put(Controller::USER_INFO, CUser::getInfoByOpenId($userInfo['openid']));
        return redirect('/');
    }
}
