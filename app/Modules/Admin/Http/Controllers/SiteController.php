<?php

namespace App\Modules\Admin\Http\Controllers;


use App\Components\ArrayHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class SiteController extends Controller
{



    /**
     * @api 获取用户信息
     * @return mixed
     */
    public function index(Request $request)
    {
        if(!$request->session()->has(Controller::ADMIN_KEY)) {
            return view('admin::login');
        }
        return view('admin::index');
    }

    /**
     * 登陆
     */
    public function login(Request $request)
    {
        $username = Input::get('username', '');
        $password = Input::get('password', '');
        if (!empty(Controller::$adminList[$username]) && Controller::$adminList[$username] == $password) {
            $request->session()->put(Controller::ADMIN_KEY, $username);
            return ArrayHelper::format(0);
        }
        return ArrayHelper::format(5001);
    }
}
