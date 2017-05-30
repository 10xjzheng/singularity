<?php

namespace App\Http\Controllers;


use App\Components\ArrayHelper;
use App\Models\CMaterial;
use Illuminate\Http\Request;

class UploadController extends Controller
{

    /**
     * @api ÉÏ´«Í¼Æ¬
     */
    public function uploadImg(Request $request, CMaterial $material)
    {
        return ArrayHelper::format($material->uploadImg($request));
    }
}
