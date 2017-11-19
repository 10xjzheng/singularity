<?php

namespace App\Modules\Admin\Http\Controllers;

use App\Components\ArrayHelper;
use App\Models\CApplyNote;
use App\Models\CUser;
use Illuminate\Support\Facades\Input;

class InfoController extends Controller
{
    /**
     * @api 获取用户信息
     * @return mixed
     */
    public function getInfo(CUser $user)
    {
        return ArrayHelper::format(0, $user->getInfo($this->userId));
    }

    /**
     * @api 获取申请统计
     * @return mixed
     */
    public function applyStat(CApplyNote $applyNote)
    {
        return ArrayHelper::format(0, $applyNote->statistics($this->userId));
    }

    /**
     * @api 获取申请列表
     * @param int type 类型
     * @return mixed
     */
    public function applyList(CApplyNote $applyNote)
    {
        $currentPage = Input::get('currentPage', 1);
        $pageSize = Input::get('pageSize', 10);
        $type = (int)Input::get('type', 0);
        $searchName = Input::get('searchName', '');
        return ArrayHelper::format(0, $applyNote->getList($this->userId, $type, $searchName, $currentPage, $pageSize));
    }

    /**
     * @api 申请详情
     * @return mixed
     */
    public function applyDetail(CApplyNote $applyNote)
    {
        return ArrayHelper::format(0, $applyNote->getDetail(Input::get('id', 0)));
    }

    /**
     * @api 提交申请
     * @return mixed
     */
    public function submitApply(CApplyNote $applyNote)
    {
        $data = [
            'mobile' => Input::get('mobile', ''),
            'name' => Input::get('name', ''),
            'type' => Input::get('type', ''),
            'apply_type' => Input::get('apply_type', ''),
            'credit_card' => (int)Input::get('credit_card', 0),
            'quota' => Input::get('quota', 0),
            'sum' => (float)Input::get('sum', 0),
            'asset' => implode(',', Input::get('assets', [])),
            'banks' => implode(',', Input::get('banks', [])),
        ];
        $result = $applyNote->submitApply($this->wechatId, $this->userId, $data);
        return ArrayHelper::format($result ? 0 : $applyNote->getErrorCode());
    }

    /**
     * @api 修改申请状态
     * @return mixed
     */
    public function editApply(CApplyNote $applyNote)
    {
        $id = (int)Input::get('id', '');
        $status = (int)Input::get('status', '');
        $result = $applyNote->changeStatus($id, $status);
        return ArrayHelper::format($result ? 0 : $applyNote->getErrorCode());
    }

    /**
     * @api 删除记录
     * @return mixed
     */
    public function delNote(CApplyNote $applyNote)
    {
        $id = (int)Input::get('id', '');
        return ArrayHelper::format($applyNote::destroy($id) ? 0 : $applyNote->getErrorCode());
    }
}
