<?php

namespace App\Models;

use App\Components\Traits\ErrorCode;
use Illuminate\Database\Eloquent\Model;

class CNews extends Model
{
    use ErrorCode;
    //
    protected $table = 'sg_news';

    /**
     * 获取资讯列表
     * @param int $wechatId
     */
    public function getList($wechatId, CMaterial $material, $currentPage = 1, $pageSize = 10)
    {
        $offset = ($currentPage - 1) * $pageSize;
        $list = self::where('wechat_id', $wechatId)->orderBy('id', 'desc')->offset($offset)->limit($pageSize)->get();
        $count = self::where('wechat_id', $wechatId)->count();
        foreach ($list as &$row) {
            $row['main_pic'] = $material->getUrlById($row['main_pic_id']);
            $row['url'] = '/newsDetail/' . $row['id'];
        }
        return ['data' => $list, 'count' => $count];
    }

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
            return false;
        }
        $detail['main_pic'] = $material->getUrlById($detail['main_pic_id']);
        return ['data' => $detail];
    }
}
