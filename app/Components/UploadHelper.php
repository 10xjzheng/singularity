<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/30 0030
 * Time: 下午 7:39
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

         // 文件是否上传成功
         if ($file->isValid()) {

             // 获取文件相关信息
             //$originalName = $file->getClientOriginalName(); // 文件原名
             $ext = $file->getClientOriginalExtension();     // 扩展名
             $realPath = $file->getRealPath();   //临时文件的绝对路径
             //$type = $file->getClientMimeType();     // image/jpeg

             // 上传文件
             $filename = date('Ymd') . '/' . date('YmdHis') . '-' . uniqid() . '.' . $ext;
             // 使用我们新建的uploads本地存储空间（目录）
             if(!Storage::disk('upload')->put($filename, file_get_contents($realPath))) {
                 return false;
             }
             return $filename;
         }
         return false;
     }

}