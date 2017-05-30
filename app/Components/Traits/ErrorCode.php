<?php
namespace App\Components\Traits;

trait ErrorCode
{
    protected $_error_code = '10000';

    protected $_error_info = '';

    /**
     * ��ȡ������
     * @return string
     */
    public function getErrorCode()
    {
        return $this->_error_code;
    }

    /**
     * ���ô�����
     * @param $code
     */
    public function setErrorCode($code)
    {
        $this->_error_code = $code;
    }

    /**
     * ���ô�����Ϣ
     * @param array $data
     */
    public function setErrorData($data = [])
    {
        $this->_error_code = $data['errorCode'];
        $this->_error_info = $data['errorInfo'];
    }

    /**
     * ��ȡ������Ϣ
     * @return array
     */
    public function getErrorData()
    {
        return ['errorCode' => $this->_error_code, 'errorInfo' => $this->_error_info];
    }
}
