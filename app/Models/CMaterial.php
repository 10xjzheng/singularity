<?php

namespace App\Models;

use App\Components\Traits\ErrorCode;
use App\Components\UploadHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CMaterial extends Model
{
    use ErrorCode;

    public $timestamps = false;

    protected $table = 'sg_material';

    /**
     * 上传图片
     * @param Request $request
     */
    public function uploadImg(Request $request)
    {
        $res = UploadHelper::uploadImg($request);
        if(!$res) {
            $this->setErrorCode(2001);
            return false;
        }
        return $this->addRecord($res);
     }

    /**
     * 添加记录
     * @param $path
     * @return array|bool
     */
    public function addRecord($path)
    {
        $fullPath = \Storage::disk('upload')->url($path);
        $record = new self();
        $record->type = 1;
        $record->path = $path;
        $record->size = \Storage::disk('upload')->size($path);
        $record->md5 = md5_file($fullPath);
        $record->upload_at = time();
        if(!$record->save()) {
            $this->setErrorCode(2002);
            return false;
        }
        return ['material_id' => $record->id, 'path' => $path, 'full_path' => $fullPath];
    }

    /**
     * 获取图片链接
     * @param int $id
     */
    public function getUrlById($id)
    {
        $record = self::find($id, ['path']);
        return empty($record) ? '' : \Storage::disk('upload')->url($record->path);
    }
}
