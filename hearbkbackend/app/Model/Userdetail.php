<?php
App::uses('BlowfishPasswordHasher', 'Controller/Component/Auth');
class Userdetail extends AppModel
{
	var $primaryKey = 'user_id';
	public $belongsTo = 'User';
// 	public $hasMany = array('Favoriteartist','Favoritegenre');
}
?>