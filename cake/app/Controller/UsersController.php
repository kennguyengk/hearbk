<?php


class UsersController extends AppController{




	public function login(){

			$passwordHasher = new BlowfishPasswordHasher();
                    $hashpassword = $passwordHasher->hash('123456');

                    print_r($hashpassword);
	}
}