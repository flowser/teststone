<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WEB\WebController;



Route::get('/superadmin', [WebController::class, 'superadmin']);
Route::get('/superadmin/{any?}', [WebController::class, 'superadmin'])->where('any', '^(?!api\/)[\/\w\.-]*');

Route::get('/', [WebController::class, 'guest']);
Route::get('/{any?}', [WebController::class, 'guest'])->where('any', '^(?!api\/)[\/\w\.-]*');
