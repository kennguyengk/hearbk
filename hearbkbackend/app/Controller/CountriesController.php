<?php
class CountriesController extends AppController {
	public $uses = array('Country','State','City');

	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('get_countries','get_states','get_cities');
    }

   	public function get_countries(){
   		$all_countries = $this->Country->find('all',array('fields'=>array('id','name')));
   		$countries = array();
   		foreach ($all_countries as $data) {
   			array_push($countries,$data['Country']);
   		}
   		$response = array('countries'=>$countries);
   		echo json_encode($response);
   		exit;
   }

   public function get_states($countryId = null){
   		$country_states = $this->State->find('all',array('conditions'=>array('country_id'=>$countryId)));
   		$states = array();
   		foreach($country_states as $data){
   			unset($data['State']['country_id']);
   			array_push($states,$data['State']);
   		}
   		$response = array('states'=>$states);
   		echo json_encode($response);
   		exit;
   }

   public function get_cities($stateId = null){
   		$country_cities = $this->City->find('all',array('conditions'=>array('state_id'=>$stateId)));
   		$cities = array();
   		foreach($country_cities as $data){
   			unset($data['City']['state_id']);
   			array_push($cities,$data['City']);
   		}
   		$response = array('cities'=>$cities);
   		echo json_encode($response);
   		exit;
   	exit;
   }
}
?>