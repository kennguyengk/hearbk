<?php
App::uses('BlowfishPasswordHasher', 'Controller/Component/Auth');
class User extends AppModel
{
	var $primaryKey = 'uid';
	public $hasOne = 'Userdetail';
    public $hasMany = array('Favoriteartist','Favoritegenre');
    
    public $validate = array(
        'username' => array(
            'required' => true
        ),
        'password' => array(
             'required' => true,
             'allowEmpty' => false,
        ),
        'email' => array(
             'required' => true
        )
    );
    
	public function beforeSave($options = array()) {
        if (isset($this->data[$this->alias]['password'])) {
            $passwordHasher = new BlowfishPasswordHasher();
            $this->data[$this->alias]['password'] = $passwordHasher->hash(
                $this->data[$this->alias]['password']
            );
        }
        return true;
    }
}
?>