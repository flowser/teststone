<?php

namespace App\Models\Sales;

use App\Models\Product;
use App\Models\Sales\Order;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'Qty',
        'LineTotal',
    ];
    protected $casts = [
    ];

    public function order(){
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
}
