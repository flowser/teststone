<?php

namespace App\Models;

use App\Models\Sales\Order;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'CustomerName',
        'CustomerContactNo',
    ];
    protected $casts = [
    ];

    public function orders(){
        return $this->hasMany(Order::class, 'customer_id');
    }
}
