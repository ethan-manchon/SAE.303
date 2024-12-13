<?php
require_once "Controller.php";
require_once "Repository/OrdersRepository.php";
require_once "Class/HttpRequest.php"; 

// This class inherits the jsonResponse method and the $cnx property from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class OrdersController extends Controller {

    private OrderRepository $orders;

    public function __construct(){
        $this->orders = new OrderRepository();
    }

    protected function processGetRequest(HttpRequest $request) {

        $para = $request->getParam("status");
        if ($para == "monthly") {
            $orders = $this->orders->findSalesMonth();
        } else
        if ($para == "countries") {
            $orders = $this->orders->findByCountries();
        } else
        if ($para == "categ") {
            $orders = $this->orders->findSalesByCateg();
        } else
        if ($para == "topProduct") {
            $orders = $this->orders->findTopProduct();
        } else {
            $orders = $this->orders->findAll();
            $statusCount = [];

            foreach ($orders as $order) {
                $status = $order->getOrderStatus();
                if (!isset($statusCount[$status])) {
                $statusCount[$status] = 0;
                }
                $statusCount[$status]++;
            }
            $orders = $statusCount;
    
        }
            return $orders;

    }
}

?>
