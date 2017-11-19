<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your module. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::group(['prefix' => 'admin'], function () {
    Route::get('/site', 'SiteController@index');
    //申请列表
    Route::post('/applyList', 'InfoController@applyList');

    //修改审核状态
    Route::post('/editApply', 'InfoController@editApply');

    //删除申请记录
    Route::post('/delNote', 'InfoController@delNote');
});

