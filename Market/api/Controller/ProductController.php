<?php
require_once "Controller.php";
require_once "Repository/ProductRepository.php";
require_once "Class/HttpRequest.php"; // Adjust the path to the correct location

// This class inherits the jsonResponse method and the $cnx property from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductController extends Controller {

    private ProductRepository $productRepository;

    public function __construct() {
        $this->productRepository = new ProductRepository();
    }

    protected function processGetRequest(HttpRequest $request) {

        $productId = $request->getParam('id');    
        $para = $request->getParam('status');    
        if ($productId) {
            $products = $this->productRepository->findProductById($productId);
        } else if ($para == "stock") {
            $products = $this->productRepository->findByStock();
        } else {
            $products = $this->productRepository->findAll();
        }
        return $products;
    }
}
?>
