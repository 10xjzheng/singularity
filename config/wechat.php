<?php

return [
    /*
     * Debug 模式，bool 值：true/false
     *
     * 当值为 false 时，所有的日志都不会记录
     */
    'debug'  => true,

    /*
     * 使用 Laravel 的缓存系统
     */
    'use_laravel_cache' => true,

    /*
     * 账号基本信息，请从微信公众平台/开放平台获取
     */
    'app_id'  => env('WECHAT_APPID', 'zzzzzzz'),         // AppID
    'secret'  => env('WECHAT_SECRET', 'xxxxxx'),     // AppSecret
    'token'   => env('WECHAT_TOKEN', 'yyyyyy'),          // Token
    'aes_key' => env('WECHAT_AES_KEY', 'wwwwwwwww'),                    // EncodingAESKey

];
