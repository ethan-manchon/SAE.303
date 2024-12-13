<?php
require_once("Repository/EntityRepository.php");
require_once("Class/Product.php");

/**
 *  Class ProductRepository
 * 
 *  All operations on Products should be done through this class
 *  which keeps the database in sync accordingly.
 * 
 *  The class inherits from EntityRepository which requires defining methods (find, findAll ... )
 *  But it is possible to add additional methods if useful!
 *  
 */
class ProductRepository extends EntityRepository {

    public function __construct(){
        // call the parent class constructor (will open the connection to the database)
        parent::__construct();
    }

    public function findProductById($id): array {
        $requete = $this->cnx->prepare(" SELECT 
              p.id, 
              p.product_name, 
              DATE_FORMAT(o.order_date, '%Y-%m') AS month, 
              COUNT(oi.id) AS sales_count
            FROM 
              Products p
            JOIN 
              OrderItems oi ON p.id = oi.product_id
            JOIN 
              Orders o ON oi.order_id = o.id
            WHERE 
              p.id = :id
              AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
            GROUP BY 
              p.id, 
              p.product_name, 
              month
            ORDER BY 
              month;
        ");
        $requete->bindParam(':id', $id);
        $requete->execute();
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);

        return $answers;


    }

    public function findByStock(): array {
      $requete = $this->cnx->prepare("SELECT id, product_name, stock FROM Products ORDER BY stock ASC LIMIT 10");
      $requete->execute();
      $answers = $requete->fetchAll(PDO::FETCH_OBJ);
      $res = [];
      foreach ($answers as $answer) {
          $res[] = [
          'id' => $answer->id,
          'product_name' => $answer->product_name,
          'stock' => $answer->stock
          ];
      }
      return $res;
  }


  


    public function findAll(): array {
      $requete = $this->cnx->prepare("SELECT * FROM Products");
      $requete->execute();
      $answers = $requete->fetchAll(PDO::FETCH_OBJ);
      return $answers;
     
  }

}
