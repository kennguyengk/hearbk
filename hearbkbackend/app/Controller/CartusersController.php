<?php
class CartusersController extends AppController {

	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow();
    }

    public function index(){
        $this->paginate = array('limit' => 10);
        $this->set('tasks',$this->paginate());
    }

}
?>