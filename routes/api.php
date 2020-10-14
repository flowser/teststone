<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Sales\OrderController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Sales\OrderProductController;
use App\Http\Controllers\Auth\ForgotPasswordController;


Route::post('/login/password/resetlink', [AuthController::class, 'resetlink']);
Route::post('/login/password/reset', [AuthController::class, 'reset']);

Route::post('/login/password/resetlink', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::get('/password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');





Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/refreshtoken', [AuthController::class, 'refreshtoken']);

Route::get('/unauthorized', [AuthController::class,'unauthorized']);
Route::middleware('auth:api')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
});

//customer
Route::get('customer', [CustomerController::class, 'index']);
Route::post('customer', [CustomerController::class, 'store']);
Route::patch('customer/update/{customer}', [CustomerController::class, 'update']);
Route::get('customer/delete/{customer}', [CustomerController::class, 'destroy']);

//product
Route::get('product', [ProductController::class, 'index']);
Route::post('product', [ProductController::class, 'store']);
Route::patch('product/update/{product}', [ProductController::class, 'update']);
Route::get('product/delete/{product}', [ProductController::class, 'destroy']);

//order
Route::get('order', [OrderController::class, 'index']);
Route::post('order', [OrderController::class, 'store']);
Route::post('order/import', [OrderController::class, 'import']);
Route::patch('order/update/{order}', [OrderController::class, 'update']);
Route::get('order/delete/{order}', [OrderController::class, 'destroy']);

//orderproduct
Route::get('orderproduct', [OrderProductController::class, 'index']);
Route::post('orderproduct', [OrderProductController::class, 'store']);
Route::patch('orderproduct/update/{orderproduct}', [OrderProductController::class, 'update']);
Route::get('orderproduct/delete/{orderproduct}', [OrderProductController::class, 'destroy']);

