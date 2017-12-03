<?php

namespace App\Http\Controllers;


class ViewController extends Controller
{
    /**
     * 首页
     */
    public function home()
    {
        return view('welcome');
    }
}