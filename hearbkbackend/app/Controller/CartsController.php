<?php
class CartsController extends AppController {

	public $uses = array('Cart','Userdetail');
	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('clear','saveCart','getCart','emptyCart');
    }

/* -------------------------------- MOBILE API -------------------------------------------------- */
    
    public function saveCart(){
    	$array_data = json_decode(file_get_contents("php://input"),true);
    	$cart_users = implode(",", $array_data['cart']['users']);
    	$cart = $array_data['cart'];
    	$user_id = $array_data['user_id'];
    	$cart['user_id'] = $user_id;
    	unset($cart['users']);
    	if(empty($cart['imageAbove4'])){
    		$cart['imageAbove4'] = 'false';
    	}
    	else{
    		$cart['imageAbove4'] = 'true';	
    	}
    	if(empty($cart['addall'])){
    		$cart['addall'] = 'false';
    	}
    	else{
    		$cart['addall'] = 'true';	
    	}    	
    	$cart['users'] = $cart_users;
    	$user = $this->Cart->find('first',array('conditions'=>array('user_id'=>$user_id)));
    	if(!empty($user)){
    	    $this->Cart->id = $user['Cart']['id'];
    	    if($this->Cart->save($cart)){
    	      $response = array('status'=>'true');
            }
            else{
                $response = array('status'=>'false');
            }
    	}
    	else{
    	    if($this->Cart->save($cart)){
                $response = array('status'=>'true');
            }
            else{
                $response = array('status'=>'false');
            }
    	}
        echo json_encode($response);
    	exit;
    }

    public function getCart($user_id){        
        $options = array('conditions'=>array('user_id'=>$user_id),'fields'=>array('users','cartlength','cartprice','addall','imageAbove4'));
        $user_data = $this->Cart->find('first',$options);
        if(!empty($user_data)){
            $users = $user_data['Cart']['users'];
            $user_data['Cart']['users'] = explode(",", $users);
            
            $user_data['Cart']['cartlength'] = (int)$user_data['Cart']['cartlength'];
            $user_data['Cart']['cartprice'] = (int)$user_data['Cart']['cartprice'];
            if($user_data['Cart']['imageAbove4']=='true'){
                $user_data['Cart']['imageAbove4'] =true;
            }
            else{
                $user_data['Cart']['imageAbove4'] =false;
            }
            if($user_data['Cart']['addall']=='true'){
                $user_data['Cart']['addall'] =true;
            }
            else{
                $user_data['Cart']['addall'] =false;
            }
            $userListGroup = array();
            foreach ($user_data['Cart']['users'] as $user_id) {
                $user_detail = $this->Userdetail->find('first',array('conditions'=>array('user_id'=>$user_id)));
                $data['customer_id'] = $user_detail['Userdetail']['user_id'];
                if(!empty($user_detail['Userdetail']['image_path'])){
                    $data['image_path'] = base_url.$user_detail['Userdetail']['image_path'];
                }            
                $data['customer_price'] = $user_detail['Userdetail']['price'];
                array_push($userListGroup, $data);
            }
            $user_data['Cart']['userListGroup'] = $userListGroup;   
            // echo json_encode($user_data['Cart']);
            $response = array('status'=>'true','Cart'=>$user_data['Cart']);
        }
        else{
            $response = array('status'=>'false');
        }
        echo json_encode($response);
        exit;
    }
    
    public function emptyCart($user_id){
        $user = $this->Cart->find('first',array('conditions'=>array('user_id'=>$user_id)));
        
        $id = $user['Cart']['id'];
        if($this->Cart->delete($id)){
            $response = array('status'=>'true');
        }
        else{
            $response = array('status'=>'true');
        }
        echo json_encode($response);
        exit;
    }

    public function clear(){
    	$this->Cart->query('TRUNCATE TABLE carts;');
    	exit;
    }
}
?>