<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Controller', 'Controller');
App::import('Vendor', 'global');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {
	public $helpers = array('Html', 'Form');

    # UPLOAD BASE64 IMAGE WITH DYNAMIC PATH 
    public function img_upload_with_base64($img = null ,$file = null, $upload_path = null){
        $uploadPath = $upload_path;
        $file = $uploadPath.$file;
        if(!file_exists($uploadPath)) {
            mkdir($uploadPath, 0755, true);
            $uploadFile = $uploadPath.$file;
        }
        $image_base64 = base64_decode($img);
        $signup_data['image_path'] = $file;

        if(file_put_contents($file, $image_base64)){
            return 'true';
        }
         
    }
    
    # UPLOAD SIMPLE FILE OR IMAGE TO DYNAMIC DIR
    public function upload_image($file=null,$uploadPath = null){
        if(!file_exists($uploadPath)) {
            mkdir($uploadPath, 0755, true);  
        }
        if(move_uploaded_file($file['tmp_name'], WWW_ROOT . $uploadPath . DS . $file['name'])){   
            return 'true';
        }
        else{
            return 'false';
        }
    }
    
    # GENRATE RANDOM NUMBER
    Public function random_value(){
        $digits_needed=8;
        $random_number = '';
        $count=0;
        while ( $count < $digits_needed ) {
            $random_digit = mt_rand(0, 9);
            $random_number .= $random_digit;
            $count++;
        }
        return $random_number;
    }

    public function beforeFilter() {
        parent::beforeFilter();
        //  $this->response->header('Access-Control-Allow-Origin','*');
        $this->response->header('Access-Control-Allow-Methods','*');
        $this->response->header('Access-Control-Allow-Headers','*');
        $this->response->header('Access-Control-Allow-Headers','*');
        // $this->Auth->allow('index');
        // $this->RequestHandler->addInputType('json', array('json_decode', true));
    }
    
    public function beforeRender() {
        $this->response->disableCache();
    }
    
	public $components = array(
        'Session',
        'RequestHandler',
        'Auth' => array(
        /*    'loginRedirect' => array(
                'controller' => 'sps',
                'action' => 'index'
            ),
            'logoutRedirect' => array(
                'controller' => 'users',
                'action' => 'login'
            ),*/
            'authenticate' => array(
                'Form' => array(
                    'passwordHasher' => 'Blowfish'
                )
            )
        )
        
    );
    
}
