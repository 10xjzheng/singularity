<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/3 0003
 * Time: 上午 10:21
 */

namespace App\Components;

/**
 * 参数检查
 * Class ParamsCheck
 * @package App\Components
 */
class ParamsCheck
{
    /**
     * 验证手机号码
     * @param string $mobile
     */
    public static function isMobile($mobile)
    {
        if (!is_numeric($mobile)) {
            return false;
        }
        return preg_match('#^1[\d]{10}$#', $mobile) ? true : false;
    }

    /**
     * 统计字符长度[支持中英文]
     * @param null $string
     * @return int
     */
    public static function utf8Strlen($string = null)
    {
        // 将字符串分解为单元
        preg_match_all("/./us", $string, $match);
        // 返回单元个数
        return count($match[0]);
    }
}