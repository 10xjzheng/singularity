<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/30 0030
 * Time: 下午 12:22
 */

namespace App\Components;


class ArrayHelper
{
    /**
     * 格式化返回数据
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