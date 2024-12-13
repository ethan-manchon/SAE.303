<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Orders.php");

/**
 *  Class OrderRepository
 * 
 *  All operations on Orders should be done through this class
 *  which keeps the database in sync accordingly.
 * 
 *  The class inherits from EntityRepository which requires defining methods (find, findAll ... )
 *  But it is possible to add additional methods if useful!
 *  
 */
class OrderRepository extends EntityRepository {

    public function __construct(){
        // call the parent class constructor (will open the connection to the database)
        parent::__construct();
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("SELECT * FROM Orders");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $o = new Order($obj->id);
            $o->setOrderDate($obj->order_date)
              ->setOrderStatus($obj->order_status)
              ->setShippingCost($obj->shipping_cost);
            array_push($res, $o);
        }
       
        return $res;
    }

    public function findTopProduct(): array {
        $requete = $this->cnx->prepare("
            SELECT p.product_name, SUM(oi.quantity) AS total_sales
            FROM OrderItems oi
            JOIN Orders o ON oi.order_id = o.id
            JOIN Products p ON oi.product_id = p.id 
            WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH)
            GROUP BY p.product_name
            ORDER BY total_sales DESC
            limit 3
        ");
    $requete->execute();
    $answers = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answers as $answer) {
            $res[] = [
          'product_name' => $answer->product_name,
          'total_sales' => is_numeric($answer->total_sales) ? (float)$answer->total_sales : $answer->total_sales
            ];
        }
        return $res;
    }

    public function findSalesMonth(): array {
        $requete = $this->cnx->prepare("
              SELECT 
                DATE_FORMAT(o.order_date, '%Y-%m') AS month,
                SUM(oi.quantity * p.price) AS total_sales
              FROM 
                Orders o
              JOIN 
                OrderItems oi ON o.id = oi.order_id
              JOIN 
                Products p ON oi.product_id = p.id
              WHERE 
                o.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
              GROUP BY 
                month
              ORDER BY 
                month;
        ");
        $requete->execute();
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answers as $answer) {
            $res[] = [
          'month' => $answer->month,
          'total_sales' => is_numeric($answer->total_sales) ? (float)$answer->total_sales : $answer->total_sales
            ];
        }
        return $res;
    }


    public function findByCountries(): array {
        $requete = $this->cnx->prepare("
              SELECT 
                DATE_FORMAT(o.order_date, '%Y-%m') AS month,
                c.country,
                SUM(oi.quantity) AS total_quantity
              FROM 
                Orders o
              JOIN 
                OrderItems oi ON o.id = oi.order_id
              JOIN 
                Customers c ON o.customer_id = c.id
              GROUP BY 
                month, c.country
              ORDER BY 
                month, c.country;

        ");
        $requete->execute();
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answers as $answer) {
            $res[] = [
          'country' => $answer->country,
          'month' => $answer->month,
          'total_quantity' => is_numeric($answer->total_quantity) ? (float)$answer->total_quantity : $answer->total_quantity
            ];
        }
        return $res;
    }

    public function findSalesByCateg(): array {
        $requete = $this->cnx->prepare("
        SELECT 
          p.category,
          DATE_FORMAT(o.order_date, '%Y-%m') AS month,
          SUM(oi.quantity * p.price) AS total_sales
        FROM 
          Orders o
        JOIN 
          OrderItems oi ON o.id = oi.order_id
        JOIN 
          Products p ON oi.product_id = p.id
        WHERE 
          o.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY 
          p.category, month
        ORDER BY 
          month, total_sales DESC;
        ");
        $requete->execute();
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answers as $answer) {
            $res[] = [
          'category' => $answer->category,
          'month' => $answer->month,
          'total_sales' => is_numeric($answer->total_sales) ? (float)$answer->total_sales : $answer->total_sales
            ];
        }
        return $res;
    }
}

