<?php

App::uses('Security', 'Utility');
class UsersController extends AppController {

	public $uses = array('User','Tmppwd','Userdetail','Visitoremail','Linkedaccount');
    // public $actsAs = array('Containable');
    
	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('signup','social_signup','add_link','logout','clear','send_mail','activateuser','resend_mail','forgetPwd','get_profile','edit_profile','update_profile_pic','get_artist','get_all_users','search','advance_search','forget_password','social_links','getToken','auto_login','file_upload','last_login','sendQuery');
    }
    public function test(){



    }
    public function dashboard(){
    	$total_users = $this->User->find('count');    	
    	$total_visitors = $this->Visitoremail->find('count');  

    	

    	$this->set('total',$total_users);
    	$this->set('total_visitors',$total_visitors);
    }
    
    public function index() {
        // $this->set('users', $this->User->find('all'));
        $this->paginate = array('limit' => 10,'conditions'=>array('User.role !='=>'admin'));
        $this->set('users',$this->paginate());
    }
    
    public function edit($id = null) {
    // 	$id = $this->Auth->user('uid');
    	$role = $this->Auth->user('role');
    	if($role == 'admin'){
    		if (!$id) {
		        throw new NotFoundException(__('Invalid post'));
		    }

		    $user = $this->Userdetail->findByuserId($id);
		    if (!$user) {
		        throw new NotFoundException(__('Invalid post'));
		    }

		    if ($this->request->is(array('post', 'put'))) {
		        $this->Userdetail->user_id = $id;
		        if ($this->Userdetail->save($this->request->data)) {
		        	$this->Session->setFlash(__('&nbsp;get Profile Updated Successfully'), 'success');
		            return $this->redirect(array('action' => 'index'));
		        }
		    }

		    if (!$this->request->data) {
		        $this->request->data = $user;
		    }
    	}
    	else{
    		echo 'you are not valid user to see this';exit;
    	}
	}

	public function view($id = null) {
		$user_info = array();
        if (!$id) {
            throw new NotFoundException(__('Invalid post'));
        }

        $user = $this->User->findByUid($id);
        $user_detail = $this->Userdetail->findByUserId($id);
        if (!$user) {
            throw new NotFoundException(__('Invalid user'));
        }
        unset($user['Userdetail']);
       
        $user['Userinfo'] = $user_detail;
        
        $this->set('user', $user);
    }

    public function delete($id = null) {
        if ($this->request->is('get')) {
            throw new MethodNotAllowedException();
        }
        
        if ($this->User->delete($id)) {
            $this->Session->setFlash(__('&nbsp; User deleted Successfully'), 'success');
        } else {
            $this->Session->setFlash(__('&nbsp; Unable to delete user'), 'error');
        }
    
        return $this->redirect(array('action' => 'index'));
    }
	
    public function login(){
    	

    	$this->Auth->login('admin2');
        if($this->Auth->user()) {
            return $this->redirect(array('action'=>'dashboard'));
        }
		if ($this->request->is('post')) {
			$login_data = json_decode(file_get_contents("php://input"),true);
			if(empty($login_data)){
				if ($this->Auth->login()) {
						return $this->redirect(array('action'=>'dashboard'));						
					}
					else{
						$this->Session->setFlash('Please check username or password','error');
						return $this->redirect(array('action'=>'index'));
					}
			}
			else{
				$this->request->data=array('User'=>$login_data);
				$user = $this->User->find('first',array('conditions'=>array('username'=>$login_data['username'])));
				if(!empty($user)){
				    if($user['User']['user_status'] == '1'){
				        if ($this->Auth->login()){
    	    		        $uid = $this->Auth->user('uid');
    	    		        $this->User->id = $uid;
    	    		        $date = date('Y-m-d H:i:s');
                            $this->User->saveField('last_login',$date);
    	    		        $username = $this->Auth->user('username');
    	    		        $this->get_profile($uid);
    	    		    }
    	    		    else{
    	    		        $response = array('status'=>'false','msg'=>"Please check your username or password");
    	    		    }
				    }
    	    		else{
    	    			$response = array('status'=>'false','msg'=>'Currently you are not active user.Please verify link in you mail box');	
    	    		}
				}
				else{
				    $userforfb = $this->User->find('first',array('conditions'=>array('email'=>$login_data['username'],'social_type'=>'facebook')));
				    if(!empty($userforfb)){
				        $response = array('status'=>'false','msg'=>"This username exists with facebook signup! Please login with facebook with this email.");
				    }
				    else{
                        $response = array('status'=>'false','msg'=>"This username doesn't exist. Please create your account and join HEARBK"); 
				    }
				}
			}
			echo json_encode($response);  
				exit;
		}
			
	}
	
	public function update_picture(){
    	$uid = $this->Auth->user('uid');
    	$user = $this->User->findByUid($uid);
    	$this->set('image',$user['Userdetail']['image_path']);
    	if($this->request->is('POST')){
    		$image = $this->request->data['User']['file'];    		    		
    		$upload_path = 'user_profile_pics/';
    		if($this->upload_image($image,$upload_path) == 'true'){
    			$this->Userdetail->user_id = $uid;
    			$img = $upload_path.$image['name'];
    			$data = array('Userdetail'=>array('user_id'=>$uid,'image_path'=>$img));
		        if ($this->Userdetail->save($data)) {
		            return $this->redirect(array('action' => 'index'));
		        }
    		}
    		else{
    			$this->Session->setFlash(__('My message.'), 'error');
    		}
    	}
    }
	
	public function change_password(){
    	if($this->request->is('POST')) {
    		$uid = $this->Auth->user('uid');
    		$user_data = $this->User->findByUid($uid);
    		$current_password = $user_data['User']['password'];
    		$request = $this->request->data;
    		$old_pwd = $request['User']['old_pwd'];
    		$new_pwd = $request['User']['password'];
    		$confirm_pwd = $request['User']['password_confirm'];
    		if(password_verify($old_pwd,$current_password)){
				if($new_pwd == $confirm_pwd) {
					$passwordHasher = new BlowfishPasswordHasher();
                    $hashpassword = $passwordHasher->hash($new_pwd);
                    if($this->User->updateAll(array('password' => '"'. $hashpassword .'"'), array('User.uid'=>$uid))){
                        $this->Session->setFlash('Password changed successfully','success');
                    	return $this->redirect(array('action'=>'index'));
                    }
                    else{
                    	$this->Session->setFlash('unable to change passsword','error');
                    }
	    		}
	    		else{
	    			$this->Session->setFlash('Both password not match Plese check','error');
	    		}
    		}
    		else{
				$this->Session->setFlash('Please enter the correct password','error');
    		}    		
    	}
    }
    
	public function forget_password(){
	    if($this->Auth->user()) {
            return $this->redirect(array('action'=>'dashboard'));
        }
    	if($this->request->is('POST')){
    		$email = $this->request->data['User']['email'];
    		$user_exsist = $this->User->findByEmail($email);
    		if(!empty($user_exsist)){
    			$random_number = $this->random_value();
	            $passwordHasher = new BlowfishPasswordHasher();
	            $random_password = $passwordHasher->hash($random_number);
	           // pr($user_exsist);
                $uid=$user_exsist['User']['uid'];
                $subject = "Reset Password";
                $txt = "Your Password is : ".$random_number;
                $headers = "From: no-reply@hearbk.com";
                if(mail($email,$subject,$txt,$headers)){
                    $passwordHasher = new BlowfishPasswordHasher();
                    $random_number = $passwordHasher->hash($random_number);
                    if($this->User->updateAll(array('password'=>'"'.$random_number.'"'),array('uid'=>$uid))){
                        $this->Session->setFlash(__('Check your mail box you got the password'), 'success');
                        return $this->redirect(array('action' => 'login'));
                    }
                }
    		}
    		else{
    			$this->Session->setFlash(__('This email is not register with us.Please check'), 'error');
    			return $this->redirect(array('action' => 'forget_password'));
    		}
    	}
    }

	public function logout($lout = null) {
		if(!empty($lout)) {
        	return $this->redirect($this->Auth->logout());
        }
        else{
        	if($this->Auth->logout()){                     
	            $response = 'true';
	        } 
	        else{
	            $response = 'Error';
	        }
	        echo json_encode(array('status'=>$response));
	        exit;
        }
    }
    
    /* -------------------------------- MOBILE API -------------------------------------------------- */

	public function search(){
	    $arr_data = json_decode(file_get_contents("php://input"),true);
		$info = $arr_data['tags'];
		$search_result = array();
	    foreach($info as $key => $value){
            $conditions = array('OR'=>array(
									'Userdetail.first_name REGEXP'=>$value,
									'Userdetail.last_name REGEXP'=>$value,
									'Userdetail.country REGEXP'=>$value,
									'Userdetail.state REGEXP'=>$value,
									'Userdetail.city REGEXP'=>$value,
									'Userdetail.professional_name REGEXP'=>$value,
									'Userdetail.company REGEXP'=>$value,
									'Userdetail.bio REGEXP'=>$value,
									'Userdetail.website REGEXP'=>$value,
									'Userdetail.gender'=>$value
								),
								'AND'=>array('User.role !='=>'admin','User.user_status'=>'1')
						);	        
	        $data = $this->User->find('all',array('conditions'=>$conditions));
	        foreach($data as $d){
	            if(empty($d['Userdetail']['image_path'])){
	                $d['Userdetail']['image_path'] = 'https://admin.hearbk.com/user_profile_pics/no-image.png';
	            }
	            else{
	                $d['Userdetail']['image_path'] = 'https://admin.hearbk.com/'.$d['Userdetail']['image_path'];    
	            }
	            $d['User']=$d;
	            unset($d['Userdetail'],$d['Favoriteartist'],$d['Favoritegenre'],$d['User']['Favoriteartist'],$d['User']['Favoritegenre']);
	            array_push($search_result,$d);
	        }
	    }
	    $response = array('userlist'=>$search_result);
	    echo json_encode($response);
	    exit;
	}
	
	public function advance_search(){
		$arr_data = json_decode(file_get_contents("php://input"),true);
		if(isset($arr_data['tags'])){
		    $info = $arr_data['tags'];   
		}
		$list = $arr_data;
		unset($list['tags']);
		$arraycondition = array();
		foreach($list as $li => $vl){
			array_push($arraycondition,array('Userdetail.'.$li=>$vl));
		}
		if(!empty($info)){
			foreach($info as $key => $value){
			    $search_result = array();
				$conditions = array('OR'=>array(
										 'Userdetail.first_name REGEXP'=>$value,
										 'Userdetail.last_name REGEXP'=>$value,
										 'Userdetail.professional_name REGEXP'=>$value,
										 'Userdetail.company REGEXP'=>$value,
										 'Userdetail.bio REGEXP'=>$value,
										 'Userdetail.website REGEXP'=>$value,
										 'Userdetail.country REGEXP'=>$value,
										 'Userdetail.state REGEXP'=>$value,
										 'Userdetail.city REGEXP'=>$value,
									 ),
									 'AND'=>$arraycondition,
								    'AND'=>array('User.role !='=>'admin','User.user_status'=>'1')
							 );	        
				$data = $this->User->find('all',array('conditions'=>$conditions));
				foreach($data as $d){
					if(empty($d['Userdetail']['image_path'])){
					$d['Userdetail']['image_path'] = 'https://admin.hearbk.com/user_profile_pics/no-image.png';
					}
					else{
						$d['Userdetail']['image_path'] = 'https://admin.hearbk.com/'.$d['Userdetail']['image_path'];    
					}
					$d['User']=$d;
					unset($d['Userdetail'],$d['Favoriteartist'],$d['Favoritegenre'],$d['User']['Favoriteartist'],$d['User']['Favoritegenre']);
					array_push($search_result,$d);
				}
			}
		}
		else{
		    $search_result = array();
			$conditions = $arraycondition;
			$data = $this->Userdetail->find('all',array('conditions'=>array($conditions,'AND'=>array('Userdetail.user_id !='=>2))));

			foreach($data as $d){
			if(empty($d['Userdetail']['image_path'])){
			$d['Userdetail']['image_path'] = 'https://admin.hearbk.com/user_profile_pics/no-image.png';
			}
			else{
			$d['Userdetail']['image_path'] = 'https://admin.hearbk.com/'.$d['Userdetail']['image_path'];    
			}
			$d['User']=$d;

			unset($d['Userdetail'],$d['Favoriteartist'],$d['Favoritegenre'],$d['User']['Favoriteartist'],$d['User']['Favoritegenre']);
			$d['test'] = 'in else part';
			array_push($search_result,$d);
			}
		}
		
		 $response = array('userlist'=>$search_result);
		 echo json_encode($response);
		 exit;
	}
	
	public function getToken(){
        return substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 15);
    }
    
	public function signup(){
		if($this->request->is('POST')){
		    $tokken = $this->getToken();
			$signup_data = json_decode(file_get_contents("php://input"),true);
			$username = $signup_data['username'];
		# CHECK IF EMAIL ALREADY EXSIST IN OUR SYSTEM
			$user_email = $this->User->find('first',array('conditions'=>array('email'=>$username)));
			if(empty($user_email)){
			# WE USE EMAIL AS USERNAME
				$signup_data['email'] = $username;
				$signup_data['token'] = $tokken;
				// $signup_data['role'] = 'user';
				$img = $signup_data['image'];
			# UPLOAD IMAGE IF AVAILABLE
				if(!empty($img)){
					$upload_path = 'user_profile_pics/';
					$file = $signup_data['file'];
					$signup_data['image_path'] = $upload_path.$file;
					$this->img_upload_with_base64($img,$file,$upload_path);
				}
                
				if($this->User->save($signup_data)){
					$uid = $this->User->getLastInsertId();
					$signup_data['user_id'] = $uid;
					if($this->Userdetail->save($signup_data)) {
					   $data = array('username'=>$username,'email'=>$username,'password'=>$signup_data['password']);
					   $this->Tmppwd->save($data);
					   $response = array('status'=>'true','msg'=>'Thank you for register with us...');    
					   $this->send_mail($username);
					}
				}
				else{
					$response = array('status'=>'false','msg'=>'Unable to save user');	
				}
			}
			else{
				$response = array('status'=>'false','msg'=>'This email already exists. Please try with another email');
			}
		}
		else{
			$response = array('status'=>'false','msg'=>'Please send POST request');
		}
		echo json_encode($response);
		exit;
	}

	public function social_signup(){
		if($this->request->is('POST')){
			$signup_data = json_decode(file_get_contents("php://input"),true);
			$fb_user_id = $signup_data['id'];
			# IF WE DONT HAVE FACEBOOK USER EMAIL
			if(!isset($signup_data['email'])) {
				# FIND FACEBOOK USER BY ITS UNIQUE ID
				$fb_user = $this->User->find('first',array('conditions'=>array('username'=>$fb_user_id)));
				# REGISTER FACEBOOK USER IF NOT EXSIST
				if(empty($fb_user)) {
					$random_password = $this->random_value();
					$img_name = $signup_data['id'];
					$upload_path = 'user_profile_pics/'.$img_name.'.jpg';
					$signup_data['username'] = $signup_data['id'];
					$signup_data['password'] = $random_password;
					$signup_data['social_type'] = 'facebook';
					$signup_data['soical_token'] = $signup_data['token'];
					$signup_data['role'] = $signup_data['provider'];
					$signup_data['image_path'] = $upload_path;
					$signup_data['user_status'] = '1';
					$img = $signup_data['image'];
					# UNSET ID BECAUSE ITS CREATE PROBLEM DURING SAVING DATA
					unset($signup_data['id']);
					if($this->User->save($signup_data)){
						# SAVE RANDOM PASSWORD FOR FB USER
						if($this->Tmppwd->save($signup_data)){
							#IMAGE UPLOAD WHICH COME FROM FACEBOOK URL
							$upload = file_put_contents($upload_path,file_get_contents($img));

							$uid = $this->User->getLastInsertId();
							$signup_data['first_name'] = $signup_data['name'];
							$signup_data['user_id'] = $uid;
							$signup_data['user_status'] = '1';
							if($this->Userdetail->save($signup_data)){
									# AUTOLOGIN AFTER SUCCESSFULLY REGISTRATION
								$this->request->data=array('User'=>array('username'=>$signup_data['username'],'password'=>$signup_data['password']));	
								if ($this->Auth->login()){
								    $uid = $this->Auth->user('uid');
								    $this->get_profile($uid);
								// 	$response = array('status'=>'true','msg'=>'Welcome','uid'=>$uid);
								}
								else{
									$response = array('status'=>'false','msg'=>'please check username or password');
								}
							}
						}
						else{
							$response = array('status'=>'false','msg'=>'Unable to save temp password');		
						}
					}
					else{
						$response = array('status'=>'false','msg'=>'Unable to save user');		
					}
				}
				# LOGIN ALREADY REGISTER FACEBOOK USER
				else{
					$user_data = $this->Tmppwd->find('first',array('conditions'=>array('username'=>$fb_user_id)));
					unset($user_data['Tmppwd']['id'],$user_data['Tmppwd']['email'],$user_data['Tmppwd']['created']);
					$this->request->data=array('User'=>$user_data['Tmppwd']);
					if ($this->Auth->login()){
					    $uid = $this->Auth->user('uid');
					    $this->get_profile($uid);
				// 		$response = array('status'=>'true','msg'=>'Welcome again','uid'=>$uid);
					}
					else{
						$response = array('status'=>'false','msg'=>'please check username or password');	
					}
				}
			}
			else{				
				$user = $this->User->find('first',array('conditions'=>array('email'=>$signup_data['email'])));
				# CHECK IF FB USER EMAIL ALREADY EXSIST IN OUR SYSTEM
				if(!empty($user)){
					$fb_user = $this->User->find('first',array('conditions'=>array('social_type'=>'facebook')));
					if(empty($fb_user)){
						$response = array('status'=>'false','msg'=>'This email already register with Email signup');	
					}
					else{
						$user_data = $this->Tmppwd->find('first',array('conditions'=>array('email'=>$signup_data['email'])));
						# UNSET FIELD WHICH IS NOT REQUIRED
						unset($user_data['Tmppwd']['id'],$user_data['Tmppwd']['email'],$user_data['Tmppwd']['created']);
						$this->request->data=array('User'=>$user_data['Tmppwd']);
						if ($this->Auth->login()){
						    $uid = $this->Auth->user('uid');
						    $this->get_profile($uid);
				// 			$response = array('status'=>'true','msg'=>'Welcome again','uid'=>$uid);
						}
						else{
							$response = array('status'=>'false','msg'=>'please check username or password');	
						}	
					}
				}
				else{
					$random_password = $this->random_value();
					$img_name = $signup_data['id'];
					$upload_path = 'user_profile_pics/'.$img_name.'.jpg';
					$signup_data['username'] = $signup_data['id'];
					$signup_data['password'] = $random_password;
					$signup_data['role'] = $signup_data['provider'];
					$signup_data['social_type'] = 'facebook';
					$signup_data['soical_token'] = $signup_data['token'];
					$signup_data['image_path'] = $upload_path;
					$signup_data['user_status'] = '1';
					$img = $signup_data['image'];
					# UNSET ID BECAUSE ITS CREATE PROBLEM DURING SAVING DATA
					unset($signup_data['id']);
					if($this->User->save($signup_data)){
						# SAVE RANDOM PASSWORD FOR FB USER
						if($this->Tmppwd->save($signup_data)){
							#IMAGE UPLOAD WHICH COME FROM FACEBOOK URL
							$upload = file_put_contents($upload_path,file_get_contents($img));

							$uid = $this->User->getLastInsertId();
							$signup_data['first_name'] = $signup_data['name'];
							$signup_data['user_id'] = $uid;
							$signup_data['user_status'] = '1';
							if($this->Userdetail->save($signup_data)){
									# AUTOLOGIN AFTER SUCCESSFULLY REGISTRATION
								$this->request->data=array('User'=>array('username'=>$signup_data['username'],'password'=>$signup_data['password']));	
								if ($this->Auth->login()){
								    $uid = $this->Auth->user('uid');
								    $this->get_profile($uid);
								// 	$response = array('status'=>'true','msg'=>'Welcome','uid'=>$uid);
								}
								else{
									$response = array('status'=>'false','msg'=>'please check username or password');
								}
							}
						}
						else{
							$response = array('status'=>'false','msg'=>'Unable to save temp password');		
						}
					}
					else{
						$response = array('status'=>'false','msg'=>'Unable to save user');		
					}
				}
			}
		}
		echo json_encode($response);
		exit;
	}
	
	public function get_all_users(){
    	if($this->request->is('GET')){
    		$users = array();
    		$user_data = $this->User->find('all',array('conditions'=>array('User.role !='=>'admin','User.user_status '=>'1')));
    		foreach ($user_data as $data) {
    		    if(empty($data['Userdetail']['image_path'])){
	                $data['Userdetail']['image_path'] = base_url.'user_profile_pics/no-image.png';
	            }
	            else{
	                $data['Userdetail']['image_path'] = base_url.$data['Userdetail']['image_path'];    
	            }
                $fav_artists = array();
                $fav_genres = array();
                foreach($data['Favoriteartist'] as $favs){
                    array_push($fav_artists,$favs['artist_name']);
                }
                foreach($data['Favoritegenre'] as $favs){
                    array_push($fav_genres,$favs['genre_name']);
                }
                $fav_artists = implode(" ",$fav_artists);
                $fav_genres = implode(" ",$fav_genres);
                
                $data['Userdetail']['Favoriteartist'] = $fav_artists;
                $data['Userdetail']['Favoritegenre'] = $fav_genres;
                
                $age = date_diff(date_create(date("d-m-Y", strtotime($data['Userdetail']['dob']))), date_create('today'))->y;
    		    $data['Userdetail']['age'] = $age;
    			unset($data['Favoriteartist'],$data['Favoritegenre']);
    			$data = array('User'=>$data);
    			array_push($users, $data);
    		}    		
    		echo json_encode(array('userlist'=>$users));
    	}
    	exit;
    }
    
    public function forgetPwd(){
        if ($this->request->is('post')) {
            $random_number = $this->random_value();
            $arr_data = json_decode(file_get_contents("php://input"),true);
            $email = $arr_data['email'];
            $user_data=$this->User->find('first', array('conditions'=>array('User.email'=>$email,'User.social_type'=>null)));
            if(empty($user_data)){
                $response = array('status'=>'false','msg'=>'This email is not register with us');
            }
            else{
            	$uid = $user_data['User']['uid'];
                $to = $email;
                $subject = "Reset Password";
                $txt = "Your Password is : ".$random_number;
                $headers = "From: no-reply@hearbk.com";
                if(mail($to,$subject,$txt,$headers)){
                    $passwordHasher = new BlowfishPasswordHasher();
                    $random_password = $passwordHasher->hash($random_number);
                    if($this->User->updateAll(array('password'=>'"'.$random_password.'"'),array('uid'=>$uid))){
                        $response = array('status'=>'true','msg'=>'password reset successfully','pwd'=>$random_number);
                    }
                }
            }
            echo json_encode($response);
            exit;
        }
    }
    
    public function get_profile($id = null){
    // 	if($this->request->is('GET')){
    		$user = $this->User->findByuid($id); 
    		$linked_accounts = $this->Linkedaccount->find('all',array('conditions'=>array('user_id'=>$id)));
    		$accounts = array();
    		foreach($linked_accounts as $acs){
    		   	
    		   	array_push($accounts,array($acs['Linkedaccount']['link_type']=>$acs['Linkedaccount']['link']));
    		    unset($acs['Linkedaccount']['linked_id'],$acs['Linkedaccount']['user_id'],$acs['Linkedaccount']['created']);
    		}
    		if(empty($user['Userdetail']['image_path'])){
                $user['Userdetail']['image_path'] = 'https://admin.hearbk.com/user_profile_pics/no-image.png';
            }
            else{
                $user['Userdetail']['image_path'] = 'https://admin.hearbk.com/'.$user['Userdetail']['image_path'];    
            }
			$user['User']['Userdetail'] = $user['Userdetail'];
    		$fav_artists = array();
    		$fav_genres = array();
    		foreach($user['Favoriteartist'] as $artist) {
    			$artist['item_text'] = $artist['artist_name'];
    			$artist['item_id'] = $artist['artist_id'];
    			unset($artist['artist_name'],$artist['artist_id'],$artist['fav_id'],$artist['userdetail_id'],$artist['created']);
    			array_push($fav_artists, $artist);
    		}
    		foreach($user['Favoritegenre'] as $genre) {
    			$genre['item_text'] = $genre['genre_name'];
    			$genre['item_id'] = $genre['genre_id'];
    			unset($genre['genre_name'],$genre['genre_id'],$genre['fav_id'],$genre['userdetail_id'],$genre['created']);
    			array_push($fav_genres, $genre);
    		}

    		$user['Userdetail']['fav_artists'] = $fav_artists;
    		$user['Userdetail']['fav_genres'] = $fav_genres;
    		$user['Userdetail']['accounts'] = $accounts;
    		$response = array('status'=>'true','Userdetail'=>$user['Userdetail']);
    		
    	echo json_encode($response);
    	exit;
    }
    
    public function edit_profile(){
    	if($this->request->is('POST')){
			$arr_data = json_decode(file_get_contents("php://input"),true);
			
			$dob  = $arr_data['dob'];
			$age = date_diff(date_create($dob), date_create('today'))->y;
			if($age <= 20){
				$arr_data['age_grp'] = '0-20';
			}
			elseif($age >=21 && $age<=30){
				$arr_data['age_grp'] = '21-30';
			}
			elseif($age >=31 && $age<=40){
				$arr_data['age_grp'] = '31-40';
			}
			elseif($age >=41 && $age<=50){
				$arr_data['age_grp'] = '41-50';
			}
			elseif($age>50){
				$arr_data['age_grp'] = '51';
			}
    		$id = $arr_data['user_id'];
    		$this->Userdetail->user_id = $id;
    		$arr_data['user_id'] = $id;
    		$arr_data = array('Userdetail'=>$arr_data);
	        if ($this->Userdetail->save($arr_data)) {
	            $this->get_profile($id);
	           // $response = array('status'=>'true','msg'=>'Profile successfully updated');
	        }
	        else{
	        	$response = array('status'=>'flase','msg'=>'Unable to update profile');	
	        }
    	}
    	else{
    		$response = array('status'=>'false','msg'=>'Please send POST request');
    	}
    	echo json_encode($response);
    	exit;
    }
    
    public function update_profile_pic(){
		$arr_data = json_decode(file_get_contents("php://input"),true);
		$file = $arr_data['imagename'];
		$img = $arr_data['base64textString'];
		$id = $arr_data['user_id'];
		$upload_path = 'user_profile_pics/';
		$img_name = $upload_path.$file;

		if($this->img_upload_with_base64($img,$file,$upload_path) == 'true'){
			$this->Userdetail->user_id = $id;
			$data = array('image_path'=>$img_name,'user_id'=>$id);
			if($this->Userdetail->save($data)){
				$user = $this->Userdetail->findByuserId($id);
				$img = 'https://admin.hearbk.com/'.$user['Userdetail']['image_path'];
				$response = array('status'=>'true','image_path'=>$img);
			}
		}
		else{
			$response = array('status'=>'false','msg'=>'unable to upload profile picture');
		}
		echo json_encode($response);
	    exit;
    }
    
    public function send_mail($email = null){
        $link = 'https://admin.hearbk.com/users/activateuser/'.time().'/'.$email;
        $email = (string) $email;
        $to = $email;
        $subject = "Activation Link";
        $txt = "<p>Please click the link to activate your account : <a href=$link>Activate</a></p>";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: no-reply@hearbk.com". "\r\n";

        if(mail($to,$subject,$txt,$headers)){
            echo json_encode(array('status'=>'true'));
        }
        else{
            echo json_encode(array('status'=>'false'));
        }
        exit;
    }
    
    public function resend_mail($email = null){
        $link = 'https://admin.hearbk.com/users/activateuser/'.time();
        $email = (string) $email;
        $to = $email;
        $subject = "Activation Link";
        $txt = "<p>Please click the link to activate your account : <a href=$link>Activate</a></p>";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: no-reply@hearbk.com". "\r\n";

        if(mail($to,$subject,$txt,$headers)){
            echo json_encode(array('status'=>'true'));
        }
        else{
            echo json_encode(array('status'=>'false'));
        }
        exit;
    }
    
    public function sendQuery(){
        $arr_data = json_decode(file_get_contents("php://input"),true);
        $email = $arr_data['email'];
        $subject = "Website Inquiry";
        $txt = $arr_data['message'];
        $to = 'hello@hearbk.com';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From:".$email. "\r\n";

        if(mail($to,$subject,$txt,$headers)){
            echo json_encode(array('status'=>'true'));
        }
        else{
            echo json_encode(array('status'=>'false'));
        }
        exit;
    }
    
    public function activateuser($time = null,$email = null){
        $mail_time = $time;
        $current_time = time(); //fetching current time to check with GET variable's time
    
        if ($current_time - $mail_time < 86400 /* seconds */) {
            if($this->User->updateAll(array('user_status'=>'1'),array('User.email'=>$email))){
                $user_token = $this->User->find('first',array('conditions'=>array('email'=>$email),'fields'=>'token'));
                $token = $user_token['User']['token'];
                $url = 'https://hearbk.com/user/autologin/'.$token;
                return $this->redirect($url);
            }
        }
        else
        {
            $response = array('status'=>'false');
        }
        echo json_encode($response);
        exit;
    }
    public function auto_login(){
        $arr_data = json_decode(file_get_contents("php://input"),true);
        $token = $arr_data['token'];
        $user_data = $this->User->find('first',array('conditions'=>array('token'=>$token),'fields'=>'email'));
        if(!empty($user_data)){
            $email = $user_data['User']['email'];
            $user_credentials = $this->Tmppwd->find('first',array('conditions'=>array('email'=>$email),'fields'=>array('username','password')));
            $credentials = $user_credentials['Tmppwd'];
            $this->request->data = array('User'=>$credentials);
            if($this->Auth->login()){
                    $uid = $this->Auth->user('uid');
        		    $username = $this->Auth->user('username');
                    $this->get_profile($uid);
            }    
        }
        else{
            echo json_encode(array('status'=>'false','msg'=>'Invalid token'));
        }
    }
    // public function activateuser($time = null,$email = null){
    //     $mail_time = $time;
    //     $current_time = time(); //fetching current time to check with GET variable's time
    
    //     if ($current_time - $mail_time < 86400 /* seconds */) {
    //         if($this->User->updateAll(array('user_status'=>'1'),array('email'=>$email))){
    //             // $user_data = $this->Tmppwd->findByEmail($email);
    //             // $this->request->data = array('User'=>array('username'=>$user_data['Tmppwd']['username'],'password'=>$user_data['Tmppwd']['password']));
    //             return $this->redirect('https://hearbk.com/#/user/login');
    //             // if($this->Auth->login()){
    //                 // return $this->redirect('http://hearbk.com/#/user/login');   
    //             // }
    //         }
    //     }
    //     else
    //     {
    //         return $this->redirect('http://bkweb.smartwiztech.com/#/error');
    //     }
    //     // exit;
    // }
    
    public function get_artist(){
    	if($this->request->is('GET')){
    		$artist = array();
    		$users = $this->User->find('all');
    		foreach ($users as $user) {
    			$username = $user['Userdetail']['fullname'];
    			$userid = $user['Userdetail']['user_id'];
    			$user_info = array('item_text'=>$username,'item_id'=>$userid);
    			array_push($artist, $user_info);
    		}
    		$response = array('status'=>'true','artist'=>$artist);
    	}
    	echo json_encode($response);
    	exit;
    }
    
    public function add_link(){
        if($this->request->is('POST')){
    		$arr_data = json_decode(file_get_contents("php://input"),true);
    		if($this->Linkedaccount->save($arr_data)){
    		    $response = array('status'=>'true');
    		}
    		else{
    		    $response = array('status'=>'false');
    		}
        }
        echo json_encode($response);
        exit;
        // $this->Linkedaccount->save();
    }
    
    public function social_links($status = null,$url = null){
        $arr = array(
                array('icon'=>'assets/facebook.png','title'=>'FACEBOOK','key'=>'fb','status'=>$status,'url'=>$url),
                array('icon'=>'assets/instagram.png','title'=>'INSTAGRAG','key'=>'instagram','status'=>$status,'url'=>$url),
                array('icon'=>'assets/twitter.png','title'=>'TWITTER','key'=>'twitter','status'=>$status,'url'=>$url),
                array('icon'=>'assets/Soundcloud.png','title'=>'SOUNDCLOUD','key'=>'scloud','status'=>$status,'url'=>$url),
                array('icon'=>'assets/youtube.png','title'=>'YOUTUBE','key'=>'youtube','status'=>$status,'url'=>$url),
                array('icon'=>'assets/Spotify.png','title'=>'SPOTIFY','key'=>'spotify','status'=>$status,'url'=>$url),
            );
            pr($arr);
            // return $arr;
        // echo json_encode($arr);
        exit;
    }

    public function file_upload(){
        if(isset($this->request->params['form'])){
            $file = $this->request->params['form']['track'];
            $file_name = $file['name'];
            $location = 'mp3_files/';
             if(!file_exists($location)) {
                mkdir($location, 0755, true);
            }
            $location = $location.$file_name;
            if(move_uploaded_file($file['tmp_name'],$location)){
                $response = array('status'=>'true');
            }
            else{
                $response = array('status'=>'false');
            }   
            echo json_encode($response);
        }
        exit;
    }
    
    public function last_login(){
        $this->paginate = array('limit' => 10);
        $this->set('users',$this->paginate());
    }
    
    public function clear(){
    	$this->Tmppwd->query('TRUNCATE TABLE tmppwds;');
    	$this->User->query('TRUNCATE TABLE users;');
    	$this->User->query('TRUNCATE TABLE userdetails;');
    	echo 'clear';
    	exit;
    }
}
?>