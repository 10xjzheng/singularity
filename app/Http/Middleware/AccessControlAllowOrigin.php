<?php

namespace App\Http\Middleware;

use Closure;

class AccessControlAllowOrigin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods:POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers:x-requested-with,content-type');
        return $next($request);
    }
}
