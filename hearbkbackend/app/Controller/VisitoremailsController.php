<?php
class VisitoremailsController extends AppController {
	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('save_email','listner');
    }

    public function index() {
        $this->paginate = array('limit' => 10,'conditions'=>array('usertype'=>'contributor'));
        $this->set('emails',$this->paginate());
    }
    
    
    public function listner(){
        $this->paginate = array('limit' => 10,'conditions'=>array('usertype'=>'listener'));
        $this->set('emails',$this->paginate());
    }
    
	public function save_email(){
		if($this->request->is('POST')){
			$data = json_decode(file_get_contents("php://input"),true);
            //$data = $this->request->input('json_decode');
			$email = $data['email'];    
			$user_emails = $this->Visitoremail->find('all',array('conditions'=>array('email'=>$email)));
			if(empty($user_emails)){
				if($this->Visitoremail->save($data)) {
					$response = array('status'=>'true','msg'=>'Email insert successfully');
				}
				else{
					$response = array('status'=>'false','msg'=>'Unable to save your Email');	
				}
			}
			else{
				$response = array('status'=>'false','msg'=>'Thank you for subscribing. Your email id is already registered with us. We will get back to you soon!');
			}
		}
		else{
		    $obj = $this->request;
		    $rsp = $this->response;
			$response = array('status'=>'false','msg'=>'Please send POST request','object'=>$obj,'response'=>$rsp);
		}	
		echo json_encode($response);
		exit;
	}
}
?>