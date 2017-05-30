<?php
namespace App\Components\Traits;

trait ErrorCode
{
    protected $_error_code = '10000';

    protected $_error_info = '';

    /**
     * 获取错误码
     * @return string
     */
    public function getErrorCode()
    {
        return $this->_error_code;
    }

    /**
     * 设置错误码
     * @param $code
     */
    public function setErrorCode($code)
    {
        $this->_error_code = $code;
    }

    /**
     * 设置错误信息
     * @param array $data
     */
    public function setErrorData($data = [])
    {
        $this->_error_code = $data['errorCode'];
        $this->_error_info = $data['errorInfo'];
    }

    /**
     * 获取错误信息
     * @return array
     */
    public function getErrorData()
    {
        return ['errorCode' => $this->_error_code, 'errorInfo' => $this->_error_info];
    }
}
