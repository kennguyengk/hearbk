<?php
class FavoriteartistsController extends AppController {

	public $uses = array('Userdetail','Favoriteartist');

	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('add_fav_artist');
    }

    public function add_fav_artist(){
    	if($this->request->is('POST')){
    		$arr_data = json_decode(file_get_contents("php://input"),true);
    		$user_id = $arr_data['user_id'];
			$artists = $arr_data['artist'];
			$artist_list = array();
    		if(!empty($artists)){
	    		$this->Favoriteartist->deleteAll(array('Favoriteartist.userdetail_id' => $user_id));
	    		foreach ($artists as $artist) {
					$artist['artist_name'] = $artist['item_text'];
					array_push($artist_list,$artist['artist_name']);
	    			$artist['artist_id'] = $artist['item_id'];
	    			$artist['userdetail_id'] = $user_id;
	    			unset($artist['item_text'],$artist['item_id']);
	    			if($this->Favoriteartist->saveAll($artist)){
	    				$response = array('status'=>'true');
	    			}
	    			else{
	    				$response = array('status'=>'false');
	    			}
				}
				$artist_list_text = implode(",",$artist_list);
                $this->Userdetail->id = $user_id;
                $this->Userdetail->saveField('Favourtieartist', $artist_list_text);
	    	}
	    	else{
	    		$response = array('status'=>'true','msg'=>'all fav are removed');
	    	}
    	}
    	echo json_encode($response);
    	exit;
    }
}
?>