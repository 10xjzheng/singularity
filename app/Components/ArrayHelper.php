<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/30 0030
 * Time: 上午 12:22
 */

namespace App\Components;


/**
 *
 * Class ArrayHelper
 * @package App\Components
 */
class ArrayHelper
{
    /**
     * 返回参数格式化
     * @param int $code
     * @param array $arary
     */
    public static function format($code = '0', $data = [])
    {
        $data['errorCode'] = $code;
        if(empty($data['errorInfo'])) {
            $data['errorInfo'] = config('errorMap.'.$code);
        } else {
            $data['errorInfo'] = config('errorMap.'.$code);
        }
        return $data;
    }

}