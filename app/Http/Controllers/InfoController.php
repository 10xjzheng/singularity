<?php

namespace App\Http\Controllers;

use App\Components\ArrayHelper;
use App\Models\CUser;
use Illuminate\Support\Facades\Input;

class InfoController extends Controller
{
    /**
     * @api 获取个人信息
     * @return mixed
     */
    public function getInfo()
    {
        $id = Input::get('id');
        return ArrayHelper::format(CUser::find($id));
    }

    /**
     * @api 获取申请统计
     * @return mixed
     */
    public function applyStat()
    {
        return [];
    }

    /**
     * @api 获取申请列表
     * @return mixed
     */
    public function applyList()
    {
        return [];
    }

    /**
     * @api 获取申请详情
     * @return mixed
     */
    public function applyDetail()
    {
        return [];
    }

    /**
     * @api 提交申请
     * @return mixed
     */
    public function submitApply()
    {
        return [];
    }
}
