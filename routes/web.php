<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
/**----------------Home---------------**/
//轮播图
Route::get('home/banners', 'HomeController@banners');
//资讯列表
Route::get('home/newsList', 'HomeController@newsList');
//资讯详情
Route::get('home/newsDetail', 'HomeController@newsDetail');

/**----------------Info---------------**/
//个人信息
Route::get('info/getInfo', 'InfoController@getInfo');
//申请统计
Route::get('info/applyStat', 'InfoController@applyStat');
//申请列表
Route::get('info/applyList', 'InfoController@applyList');
//申请详情
Route::get('info/applyDetail', 'InfoController@applyDetail');
//提交申请
Route::get('info/submitApply', 'InfoController@submitApply');

/**-----------------文件上传----------------*/
Route::get('uploadImg', 'UploadController@uploadImg');
/*-------------------处理微信请求----------------*/
Route::any('/wechat', 'WechatController@serve');