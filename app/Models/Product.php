<?php

namespace App\Models;

use App\Models\Sales\Order;
use App\Models\Sales\OrderProduct;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'ProductName',
        'ProductCode',
        'Rate',
    ];
    protected $casts = [
    ];

    public function orders(){
        return $this->belongsToMany(Order::class, 'order_products', 'order_id', 'product_id');
    }
    public function orderproducts(){
        return $this->hasMany(OrderProduct::class, 'product_id')
                    ->with('order');
    }
}
