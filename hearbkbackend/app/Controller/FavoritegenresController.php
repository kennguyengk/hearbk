<?php
class FavoritegenresController extends AppController {

    public $uses = array('Userdetail','Favoritegenre');
	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('add_fav_genres');
    }

    public function add_fav_genres(){
    	if($this->request->is('POST')){
            $arr_data = json_decode(file_get_contents("php://input"),true);
    		$user_id = $arr_data['user_id'];
            $genres = $arr_data['genres'];
            $genre_list = array();
            if(!empty($genres)){
                $this->Favoritegenre->deleteAll(array('Favoritegenre.userdetail_id' => $user_id));
                foreach ($genres as $genre) {
                    $genre['genre_name'] = $genre['item_text'];
                    array_push($genre_list,$genre['genre_name']);
                    $genre['genre_id'] = $genre['item_id'];
                    $genre['userdetail_id'] = $user_id;
                    unset($genre['item_text'],$genre['item_id']);
                    if($this->Favoritegenre->saveAll($genre)){
                        $response = array('status'=>'true');
                    }
                    else{
                        $response = array('status'=>'false');
                    }
                }
                $genre_list_text = implode(",",$genre_list);
                $this->Userdetail->id = $user_id;
                $this->Userdetail->saveField('	Favourtiegenre', $genre_list_text);
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