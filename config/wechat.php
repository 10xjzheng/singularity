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
    'app_id'  => env('WECHAT_APPID', 'zzzzzzzwx2692cbf44150aa46'),         // AppID
    'secret'  => env('WECHAT_SECRET', 'xxxxxxf4cf30bc4054e39708afeffc723b386c'),     // AppSecret
    'token'   => env('WECHAT_TOKEN', 'yyyyyysglpay'),          // Token
    'aes_key' => env('WECHAT_AES_KEY', 'wwwwwwwwwyWzpfbDfOtGkxhlWQzG0cOc3w6zZrOtAy6Ux6k9YtxG'),                    // EncodingAESKey

];
