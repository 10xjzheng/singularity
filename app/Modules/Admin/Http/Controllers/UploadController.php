<?php

namespace App\Modules\Admin\Http\Controllers;


use App\Components\ArrayHelper;
use App\Models\CMaterial;
use Illuminate\Http\Request;

class UploadController extends Controller
{

    /**
     * @api 图片上传
     */
    public function uploadImg(Request $request, CMaterial $material)
    {
        $result = $material->uploadImg($request);
        return ArrayHelper::format($result ? 0 : $material->getErrorCode(), ['data' => $result ?: []]);
    }
}
