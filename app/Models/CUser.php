<?php

namespace App\Models;

use App\Components\Traits\ErrorCode;
use Illuminate\Database\Eloquent\Model;

class CUser extends Model
{
    use ErrorCode;

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
        self::unguard();
        return self::updateOrCreate(['open_id' => $openId], $data);
    }

}
