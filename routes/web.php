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
//�ֲ�ͼ
Route::post('home/banners', 'HomeController@banners');
//�����б�
Route::post('home/newsList', 'HomeController@newsList');
//��������
Route::post('home/newsDetail', 'HomeController@newsDetail');

/**----------------Info---------------**/
//������Ϣ
Route::post('info/getInfo', 'InfoController@getInfo');
//����ͳ��
Route::post('info/applyStat', 'InfoController@applyStat');
//�����б�
Route::post('info/applyList', 'InfoController@applyList');
//��������
Route::post('info/applyDetail', 'InfoController@applyDetail');
//�ύ����
Route::post('info/submitApply', 'InfoController@submitApply');

/**-----------------ͼƬ�ϴ�----------------*/
Route::post('uploadImg', 'UploadController@uploadImg');
