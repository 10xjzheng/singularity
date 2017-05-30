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
      * ͼƬ�ϴ�
     * @param Request $request
     */
     public static function uploadImg(Request $request)
     {
         $file = $request->file('img');

         // �ļ��Ƿ��ϴ��ɹ�
         if ($file->isValid()) {

             // ��ȡ�ļ������Ϣ
             //$originalName = $file->getClientOriginalName(); // �ļ�ԭ��
             $ext = $file->getClientOriginalExtension();     // ��չ��
             $realPath = $file->getRealPath();   //��ʱ�ļ��ľ���·��
             //$type = $file->getClientMimeType();     // image/jpeg

             // �ϴ��ļ�
             $filename = date('Ymd') . '/' . date('YmdHis') . '-' . uniqid() . '.' . $ext;
             // ʹ�������½���uploads���ش洢�ռ䣨Ŀ¼��
             if(!Storage::disk('upload')->put($filename, file_get_contents($realPath))) {
                 return false;
             }
             return $filename;
         }
         return false;
     }

}