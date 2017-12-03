<?php

namespace App\Models;

use App\Components\Traits\ErrorCode;
use Illuminate\Database\Eloquent\Model;

class CUser extends Model
{
    public $timestamps = false;

    use ErrorCode;

    /**
     * 关注状态
     */
    const STATUS_SUBSCRIBED = 1;


    protected $dates = ['created_at', 'updated_at', 'last_active_time'];
    /**
     * 表名
     * @var string
     */
    protected $table = 'sg_user';

    /**
     * 保存个人信息
     * @param string $openId
     */
    public function saveInfo($openId, $data = [])
    {
        $info = [
            'open_id' => $data['openid'],
            'sex' => $data['sex'],
            'avatar' => $data['headimgurl'],
            'nickname' => $data['nickname'],
            'city' => $data['city'],
            'country' => $data['country'],
            'province' => $data['province'],
            'language' => $data['language'],
            'union_id' => isset($data['unionid']) ? $data['unionid'] : null, // 测试号无此项
            'group_id' => isset($data['groupid']) ? $data['groupid'] : null,
            'wechat_id' => 1,
            'status' => self::STATUS_SUBSCRIBED,
            'created_at' => time(),
        ];
        self::unguard();
        return self::updateOrCreate(['open_id' => $openId], $info);
    }

    /**
     * 获取个人信息
     * @param $id
     * @return array
     */
    public function getInfo($id)
    {
        return ['data' => self::find($id)];
    }

    /**
     * 根据openid获取用户ID
     * @param string $openId
     * @return int
     */
    public static function getIdByOpenId($openId = '')
    {
        $data = self::getInfoByOpenId($openId);
        return empty($data) ? 0 : $data['id'];
    }

    /**
     * 根据openid获取用户信息
     * @param string $openId
     * @return int
     */
    public static function getInfoByOpenId($openId = '')
    {
        return self::where('open_id', $openId)->get(['*'])->first()->toArray();
    }
}
