<?php
require_once("Repository/EntityRepository.php");
require_once("Class/Customer.php");

/**
 *  Class Customer Repository
 * 
 *  All operations on Customers should be done through this class
 *  which keeps the database in sync accordingly.
 * 
 *  The class inherits from EntityRepository which requires defining methods (find, findAll ... )
 *  But it is possible to add additional methods if useful!
 *  
 */
class CustomerRepository extends EntityRepository {

    public function __construct(){
        // call the parent class constructor (will open the connection to the database)
        parent::__construct();
    }

    public function findCustomerById($id): array {
        $requete = $this->cnx->prepare(" SELECT 
                p.category,
                p.product_name,
                p.price,
                oi.quantity
              FROM 
                Orders o
              JOIN 
                OrderItems oi ON o.id = oi.order_id
              JOIN 
                Products p ON oi.product_id = p.id
              WHERE 
                o.customer_id = :id
              ORDER BY 
                p.category;
        ");
        $requete->bindParam(':id', $id);
        $requete->execute();
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);

        return $answers;


    }
  
    public function findAll(): array {
      $requete = $this->cnx->prepare("SELECT * FROM Customers");
      $requete->execute();
      $answers = $requete->fetchAll(PDO::FETCH_OBJ);
      return $answers;
     
  }

}
