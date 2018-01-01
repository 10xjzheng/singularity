<?php

namespace App\Models;

use App\Components\Traits\ErrorCode;
use Illuminate\Database\Eloquent\Model;

class CCompany extends Model
{
    use ErrorCode;
    //
    protected $table = 'sg_company';

    /**
     * 获取资讯详情
     * @param $id
     * @param CMaterial $material
     */
    public function getDetail($id, CMaterial $material)
    {
        $detail = self::find($id);
        if(empty($detail)) {
            $this->setErrorCode(3001);
            return ['data' => []];;
        }
        $detail['logo'] = $material->getUrlById($detail['logo_id']);
        return ['data' => $detail];
    }

    /**
     * 编辑信息
     * @param $wechatId
     * @param array $data
     */
    /**
     * 编辑信息
     * @param $wechatId
     * @param array $data
     */
    public function edit($data = [])
    {
        $one = self::find($data['id']);
        if(empty($one)) {
            $one = new self();
        }
        $one->name = $data['name'];;
        $one->intro = $data['intro'];
        $one->tel = $data['tel'];
        $one->logo_id = $data['logo_id'];
        return $one->save();
    }

}
