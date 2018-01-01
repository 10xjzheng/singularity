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
    public function getList($wechatId, CMaterial $material, $currentPage = 1, $pageSize = 10, $searchName = '')
    {
        $offset = ($currentPage - 1) * $pageSize;
        $query = self::where('wechat_id', $wechatId);
        if(!empty($searchName)) {
            $query->where('title', 'like', '%' . $searchName . '%');
        }
        $count = $query->count();
        $list = $query->orderBy('id', 'desc')->offset($offset)->limit($pageSize)->get();
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

    /**
     * 编辑信息
     * @param $wechatId
     * @param array $data
     */
    public function edit($wechatId, $data = [])
    {
        $one = self::find($data['id']);
        if(empty($one)) {
            $one = new self();
        }
        $one->wechat_id = $wechatId;
        $one->title = $data['title'];
        $one->main_pic_id = $data['main_pic_id'];
        $one->content = $data['content'];
        return $one->save();
    }

}
