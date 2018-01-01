<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/30 0030
 * Time: ���� 7:39
 */

namespace App\Components;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadHelper
{
     /**
      * 图片上传
     * @param Request $request
     */
     public static function uploadImg(Request $request)
     {
         $file = $request->file('img');

         // 图片上传
         if ($file->isValid()) {

             //$originalName = $file->getClientOriginalName(); //
             $ext = $file->getClientOriginalExtension();     // 扩展名
             $realPath = $file->getRealPath();   //路径
             //$type = $file->getClientMimeType();     // image/jpeg

             //重命名
             $filename = date('Ymd') . '/' . date('YmdHis') . '-' . uniqid() . '.' . $ext;
             // 保存图片
             if(!Storage::disk('upload')->put($filename, file_get_contents($realPath))) {
                 return false;
             }
             return $filename;
         }
         return false;
     }

}