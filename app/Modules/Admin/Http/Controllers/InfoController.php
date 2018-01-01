<?php

namespace App\Modules\Admin\Http\Controllers;

use App\Components\ArrayHelper;
use App\Models\CApplyNote;
use App\Models\CCompany;
use App\Models\CMaterial;
use App\Models\CNews;
use App\Models\CUser;
use Illuminate\Support\Facades\Input;

class InfoController extends Controller
{
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
        return ArrayHelper::format(0, $applyNote->getList(0, $type, $searchName, $currentPage, $pageSize));
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

    /**
     * @api 获取资讯列表
     */
    public function newsList(CNews $news, CMaterial $material)
    {
        $currentPage = Input::get('currentPage', 1);
        $pageSize = Input::get('pageSize', 10);
        $searchName = Input::get('searchName', '');
        return ArrayHelper::format(0, $news->getList($this->wechatId, $material, $currentPage, $pageSize, $searchName));
    }

    /**
     * @api 删除新闻
     * @return mixed
     */
    public function delNews(CNews $news)
    {
        $id = (int)Input::get('id', '');
        return ArrayHelper::format($news::destroy($id) ? 0 : $news->getErrorCode());
    }

    /**
     * @api 编辑新闻
     * @param CNews $news
     */
    public function editNews(CNews $news)
    {
        $data = [
            'id' => (int)Input::get('id', 0),
            'title' => Input::get('title', ''),
            'content' => Input::get('content', ''),
            'main_pic_id' => (int)Input::get('main_pic_id', 0),
        ];
        $result = $news->edit($this->wechatId, $data);
        return ArrayHelper::format($result ? 0 : $news->getErrorCode());
    }

    /**
     * @api 公司信息
     * @return mixed
     */
    public function companyInfo(CCompany $company, CMaterial $material)
    {
        return ArrayHelper::format(0, $company->getDetail(Input::get('id', 1), $material));
    }

    /**
     * @api 编辑公司信息
     * @param CNews $news
     */
    public function saveCompanyInfo(CCompany $company)
    {
        $data = [
            'id' => (int)Input::get('id', 0),
            'name' => Input::get('name', ''),
            'intro' => Input::get('intro', ''),
            'tel' => Input::get('tel', ''),
            'logo_id' => (int)Input::get('logo_id', 0),
        ];
        $result = $company->edit($data);
        return ArrayHelper::format($result ? 0 : $company->getErrorCode());
    }

}
