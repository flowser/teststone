<?php

namespace App\Http\Controllers\Sales;

use Carbon\Carbon;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Sales\Order;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Importer;
use App\Models\Sales\OrderProduct;
use App\Http\Controllers\Controller;
use App\Imports\ImportsExports\OrdersImport;

class OrderController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index()
    {
        if (auth('api')->user()) {
            $orders = Order::with('customer', 'admin', 'orderproducts')->paginate(5);

            return response()->json([
                'orders' => $orders,
            ], 200);
        }
    }
    public function autolatestorder()
    {
        if (auth('api')->user()) {
            $order = Order::latest()
                      ->first();
            return response()->json([
                'order' => $order,
            ], 200);
        }


    }
    public function import(Request $request)
    {
        $file = $request->file;
        $success = $this->importer->import(new OrdersImport, $file);
        $orders = $this->index();
        return response()->json([
            'orders' => $orders,
        ], 200);
    }

    public function store(Request $request)
    {
        if (auth('api')->user()) {
            $this->validate($request,[
                'CustomerName'      => 'required',
                'CustomerContactNo' => 'required',
                'OrderDate'         => 'required',
                'Shipping'          => 'required',
                'OrderTotal'        => 'required',
                'Qty'               => 'required',
                'LineTotal'         => 'required',
                'product_id'        => 'required',
            ]);

                $customer = new Customer();
                $customer->CustomerName         = $request->CustomerName;
                $customer->CustomerContactNo    = $request->CustomerContactNo;
                $customer->save();

            if($customer->save()){


                $latestorder = $this->autolatestorder();
            // dd($latestorder ===null);
            if($latestorder ===null){
                $oldprefix = 0;
            }else{
                $prefix = substr($latestorder->OrderNo, strrpos($latestorder->OrderNo, '/') + 1); //AAM/20-21/00001 =>0001
                $oldprefix = intval($prefix); //0001=> 1
            }
            $newprefix = $oldprefix + 1; //1 =>2
            $suffix = 'AAM/20-21/';//08/09/2020/0020
            $OrderNo = $suffix.'0'.'0'.'0'.'0'.$newprefix; //AAM/20-21/00002



                $order = new Order();
                $order->OrderNo           = $OrderNo;
                $order->OrderDate         = Carbon::parse($request->OrderDate)->format('d/m/Y');
                $order->Shipping          = $request->Shipping;
                $order->OrderTotal        = $request->OrderTotal;
                $order->save();

                if($order->save()){
                    $orderproduct = new OrderProduct();
                    $orderproduct->Qty               = $request->Qty;
                    $orderproduct->LineTotal         = $request->LineTotal;
                    $orderproduct->customer_id       = $customer->id;
                    $orderproduct->product_id        = $request->product_id;
                    $orderproduct->save();
                    return response()->json([
                        'order' => $order,
                    ], 200);
                }
            }
        }
    }

    public function update(Request $request, $id)
    {
        // dd(Carbon::parse($request->OrderDate)->format('m/d/Y'), Carbon::parse($request->OrderDate)->isoFormat('l'), $request->OrderDate);
        if (auth('api')->user()) {
            $this->validate($request,[
                'CustomerName'      => 'required',
                'CustomerContactNo' => 'required',
                'ProductName'       => 'required',
                'ProductCode'       => 'required',
                'Rate'              => 'required',
                'OrderNo'           => 'required',
                'OrderDate'         => 'required',
                'Shipping'          => 'required',
                'OrderTotal'        => 'required',
                'Qty'               => 'required',
                'LineTotal'         => 'required',
                'customer_id'       => 'required',
                'product_id'        => 'required',
            ]);

            $order = Order::find($id);
            if($order){
                $customer = Customer::find($request->customer_id);
                $customer->CustomerName         = $request->CustomerName;
                $customer->CustomerContactNo    = $request->CustomerContactNo;
                $customer->save();

                if($customer->save()){
                    $product = Product::find($request->product_id);
                    $product->ProductName         = $request->ProductName;
                    $product->ProductCode         = $request->ProductCode;
                    $product->Rate                = $request->Rate;
                    $product->save();

                    if($product->save()){
                        $product = Product::find($request->product_id);
                        $order->OrderNo           = $request->OrderNo;
                        $order->OrderDate         = Carbon::parse($request->OrderDate)->isoFormat('l');
                        $order->Shipping          = $request->Shipping;
                        $order->OrderTotal        = $request->OrderTotal;
                        $order->customer_id       = $customer->id;
                        $order->user_id           = auth('api')->user()->id;
                        $order->save();

                        if($order->save()){
                            $orderproduct = OrderProduct::find($request->orderproduct_id);
                            $orderproduct->Qty               = $request->Qty;
                            $orderproduct->LineTotal         = $request->LineTotal;
                            $orderproduct->product_id        = $product->id;
                            $orderproduct->save();

                            return response()->json([
                                'order' => $order,
                            ], 200);
                        }
                    }
                }
            }
        }
    }
}
