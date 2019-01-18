<?php
App::uses('Security', 'Utility');
class PostsController extends AppController {
    public $helpers = array('Html', 'Form');

   

     public function index() {
        $this->set('posts', $this->Post->find('all'));
    }

    public function test(){

    	print_r(apache_get_modules());

    }
}