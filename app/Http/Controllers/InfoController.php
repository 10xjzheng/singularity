<?php

namespace App\Http\Controllers;

use App\Components\ArrayHelper;
use App\Models\CUser;
use Illuminate\Support\Facades\Input;

class InfoController extends Controller
{
    /**
     * @api ��ȡ������Ϣ
     * @return mixed
     */
    public function getInfo()
    {
        $id = Input::get('id');
        return ArrayHelper::format(CUser::find($id));
    }

    /**
     * @api ��ȡ����ͳ��
     * @return mixed
     */
    public function applyStat()
    {
        return [];
    }

    /**
     * @api ��ȡ�����б�
     * @return mixed
     */
    public function applyList()
    {
        return [];
    }

    /**
     * @api ��ȡ��������
     * @return mixed
     */
    public function applyDetail()
    {
        return [];
    }

    /**
     * @api �ύ����
     * @return mixed
     */
    public function submitApply()
    {
        return [];
    }
}
