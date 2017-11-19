<?php

namespace App\Models;

use App\Components\ParamsCheck;
use App\Components\Traits\ErrorCode;
use Illuminate\Database\Eloquent\Model;

class CApplyNote extends Model
{
    use ErrorCode;

    const TYPE_POS = 1; //pos机申请
    const TYPE_CREDIT_CART = 2; //信用卡
    const TYPE_LOAN= 3;//贷款
    const TYPE_CAR = 4;//车险
    const TYPE_UNION = 5; //加盟


    protected $table = 'sg_apply_note';

    /**
     * 提交申请
     * @param int $userId
     * @param array $data
     */
    public function submitApply($wechatId, $userId, $data = [])
    {
        if($data['type'] < 1 || $data['type'] > 5) {
            $this->setErrorCode(1002);
            return false;
        }
        if(!ParamsCheck::isMobile($data['mobile'])) {
            $this->setErrorCode(1001);
            return false;
        }
        if(!$data['name']) {
            $this->setErrorCode(4001);
            return false;
        }
        if(ParamsCheck::utf8Strlen($data['name']) > 30) {
            $this->setErrorCode(4002);
            return false;
        }
        $record = new self();
        $record->user_id = $userId;
        $record->mobile = $data['mobile'];
        $record->name = $data['name'];
        $record->type = $data['type'];
        $record->apply_type = $data['apply_type'];
        $record->credit_card = $data['credit_card'];
        $record->quota = $data['quota'];
        $record->sum = $data['sum'];
        $record->asset = $data['asset'];
        $record->banks = $data['banks'];
        $record->wechat_id = $wechatId;
        return $record->save();
    }

    /**
     * 获取申请详情
     * @param int $id
     */
    public function getDetail($id)
    {
        return ['data' => self::find($id)];
    }

    /**
     * 获取申请列表
     * @param int $type
     */
    public function getList($userId, $type, $searchName, $currentPage = 1, $pageSize = 10)
    {
        $offset = ($currentPage - 1) * $pageSize;
        $where = ['user_id'=> $userId];
        if($type > 0) {
            $where['type'] = $type;
        }
        $query = self::where($where);
        $query->when($searchName, function($query) use ($searchName){
            $query->where('name', 'like', '%' . $searchName . '%')->orWhere('mobile', 'like', '%' . $searchName . '%');
        });
        $list = $query->orderBy('id', 'desc')->offset($offset)->limit($pageSize)->get();
        $count = $query->count();
        return ['data' => $list, 'count' => $count];
    }

    /**
     * 获取申请统计
     * @param int $userId
     */
    public function statistics($userId)
    {
        return [
            'data' => [
            'posNum' => self::where(['user_id' => $userId, 'type' => self::TYPE_POS])->count(),
            'creditCardNum' => self::where(['user_id' => $userId, 'type' => self::TYPE_CREDIT_CART])->count(),
            'carNum' => self::where(['user_id' => $userId, 'type' => self::TYPE_CAR])->count(),
            'loanNum' => self::where(['user_id' => $userId, 'type' => self::TYPE_LOAN])->count(),
            'unionNum' => self::where(['user_id' => $userId, 'type' => self::TYPE_UNION])->count()
            ]
        ];
    }

    /**
     * 更新状态
     * @param $id
     * @param $status
     */
    public function changeStatus($id, $status)
    {
        $model = self::find($id);
        $model->status = $status;
        return $model->save();
    }
}
