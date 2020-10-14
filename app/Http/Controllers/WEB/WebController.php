<?php

namespace App\Http\Controllers\WEB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebController extends Controller
{
    public function superadmin()
    {
             return view('layouts/backendmaster');
    }

    public function guest()
    {
             return view('layouts/frontendmaster');
    }
}
