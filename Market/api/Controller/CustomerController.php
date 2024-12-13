<?php
require_once "Controller.php";
require_once "Repository/CustomerRepository.php";
require_once "Class/HttpRequest.php"; // Adjust the path to the correct location

// This class inherits the jsonResponse method and the $cnx property from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class CustomerController extends Controller {

    private CustomerRepository $customerRepository;

    public function __construct() {
        $this->customerRepository = new CustomerRepository();
    }

    protected function processGetRequest(HttpRequest $request) {

        $customerId = $request->getParam('id');    
 
        if ($customerId) {
            $customers = $this->customerRepository->findCustomerById($customerId);
        } else {
            $customers = $this->customerRepository->findAll();
        }
        return $customers;
    }
}
?>
