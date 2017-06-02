<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CBanner extends Model
{
    protected $table = 'sg_banner';

    /**
     * ��ȡ�ֲ�ͼ�б�
     * @param CMaterial $material
     * @param $wechatId
     */
    public function getList($wechatId, CMaterial $material)
    {
        $list = self::where('wechat_id', $wechatId)->orderBy('sort', 'desc')->get();
        foreach ($list as &$row) {
            $row['material'] = $material->getUrlById($row['material_id']);
        }
        return $list;
    }
}
