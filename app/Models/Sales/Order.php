<?php

namespace App\Models\Sales;

use App\Models\Product;
use App\Models\Customer;
use App\Models\Users\User;
use App\Models\Sales\OrderProduct;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'OrderNo',
        'OrderDate',
        'Shipping',
        'OrderTotal',
        'user_id',
        'customer_id',
    ];
    protected $casts = [
    ];

    public function customer(){
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    public function admin(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function orderproducts(){
        return $this->hasMany(OrderProduct::class, 'order_id')
                    ->with('product');
    }
    public function products(){
        return $this->belongsToMany(Product::class, 'order_products', 'product_id', 'order_id');
    }
}
