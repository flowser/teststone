<?php

namespace App\Imports\ImportsExports;


use Carbon\Carbon;
use App\Models\Product;
use App\Models\Customer;
use Maatwebsite\Excel\Row;
use App\Models\Sales\Order;
use App\Models\Sales\OrderProduct;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrdersImport implements OnEachRow, WithHeadingRow
{
    public function onRow(Row $row)
    {

        $rowIndex = $row->getIndex();
        $row      = $row->toArray();


        $customer = Customer::firstOrCreate([
            'CustomerName'      =>$row['customername'],
            'CustomerContactNo' =>$row['customercontactno']
        ]);
        if($customer){
            $product = Product::firstOrCreate([
                'ProductName'       => $row['product_name'],
                'ProductCode'       => $row['productcode'],
                'Rate'              => $row['rate']
            ]);
            if($product){

                $orderdate = Carbon::parse($row['orderdate'])->isoFormat('l');
                $order = Order::firstOrCreate([
                    'OrderNo'           => $row['orderno'],
                    'OrderDate'         => $orderdate,
                    'Shipping'          => $row['shipping'],
                    'OrderTotal'        => $row['ordertotal'],
                    'user_id'           => '1',
                    'customer_id'       => $customer->id,
                ]);
                // dd( $order);
                if($order){
                   $orderproduct = OrderProduct::firstOrCreate([
                       'order_id'          =>$order->id,
                       'product_id'        =>$product->id,
                       'Qty'               =>$row['qty'],
                       'LineTotal'         =>$row['linetotal']
                   ]);
                   if($orderproduct){
                       return $order;
                   }
                }
            }
        }
    }
}
