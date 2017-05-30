<?php

namespace App\Models;

use App\Components\Traits\ErrorCode;
use Illuminate\Database\Eloquent\Model;

class CUser extends Model
{
    use ErrorCode;

    protected $dates = ['created_at', 'updated_at', 'last_active_time'];
    /**
     * ������ģ�͵����ݱ�
     *
     * @var string
     */
    protected $table = 'sg_user';
}
