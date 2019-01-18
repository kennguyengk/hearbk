<?php
class TasksController extends AppController {

	public $uses = array('Task','Cartuser','Userdetail');
	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('add','clear');
    }

    public function index(){
        $this->paginate = array('limit' => 10,'order'=>'Task.id DESC');
        $this->set('tasks',$this->paginate());
    }

    public function view($id = null) {
        $cartusers = array();
        if (!$id) {
            throw new NotFoundException(__('Invalid post'));
        }

        $task = $this->Task->findById($id);
        if (!$task) {
            throw new NotFoundException(__('Invalid post'));
        }
        $options = array('conditions'=>array('user_id'=>$task['Task']['user_id']),'fields'=>'professional_name'
                        );
        $user_data = $this->Userdetail->find('first',$options);

        $task['Task']['professional_name'] = $user_data['Userdetail']['professional_name'];
        
        foreach ($task['Cartuser'] as $user) {
            $user_data = $this->Userdetail->find('first',array('conditions'=>array('user_id'=>$user['customer_id'])));
            $user['name'] = $user_data['Userdetail']['first_name'];
            array_push($cartusers, $user);
        }
        $task['Cartuser'] = $cartusers;
        
        $this->set('task', $task);
    }
/* -------------------------------- MOBILE API -------------------------------------------------- */
    public function add(){
    	$array_data = json_decode(file_get_contents("php://input"),true);
    	$user_id = $array_data['user_id'];
    	$array_data['task']['user_id'] = $user_id;
    	$task = $array_data['task'];
    	$cart = $array_data['cart'];    	
    	if($this->Task->save($task)){
    		$task_id = $this->Task->id;
    		foreach ($cart['users'] as $user) {
	    		$user['user_id'] = $user_id;
	    		$user['task_id'] = $task_id;
	    		if($this->Cartuser->saveAll($user)){
	    			$response = array('status'=>'true');
	    		}
	    		else{
	    			$response = array('status'=>'false');
	    		}
	    	}
    	}
    	echo json_encode($response);
    	exit;
    }    

    public function clear(){
    	$this->Task->query('TRUNCATE TABLE tasks;');
    	$this->Task->query('TRUNCATE TABLE cartusers;');
    	echo 'done';
    	exit;
    }
}
?>