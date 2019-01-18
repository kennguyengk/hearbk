<?php

/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = __d('cake_dev', 'CakePHP: the rapid development php framework');
$cakeVersion = __d('cake_dev', 'CakePHP %s', Configure::version());

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="description" content="Responsive Bootstrap 4 and web Application ui kit.">
	<?php echo $this->Html->charset(); ?>
	<title>	HEAR-BK </title>
	<style type="text/css">
		.index_image{
			height: 75px;
			width: 75px;
		}
		.text-color{
			color: white;
		}
	</style>
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
	<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
	<?php
		echo $this->Html->css('../light/assets/plugins/bootstrap/css/bootstrap.min');
		echo $this->Html->css('../light/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min');
		echo $this->Html->css('../light/assets/plugins/morrisjs/morris.min');
		echo $this->Html->css('../light/assets/css/main');
		echo $this->Html->css('../light/assets/css/color_skins');
		echo $this->Html->css('../light/assets/css/authentication');
		echo $this->Html->css('../light/assets/plugins/sweetalert/sweetalert');
		echo $this->Html->css('../light/assets/css/custom');
	?>
</head>
<style>
    .dropbtn{
        height:40px;   
    }
    .dropdown-content{
        font-size:12px;
    }
</style>
<body class="theme-purple">
	<?php 
	echo $this->Session->flash();
	if($this->Session->read('Auth.User')) { ?>
	<!-- Page Loader -->
	<div class="page-loader-wrapper">
	    <div class="loader">
	        <div class="m-t-30"><img class="zmdi-hc-spin" src="assets/images/logo.svg" width="48" height="48" alt="Hear-bk"></div>
	        <p>Please wait...</p>        
	    </div>
	</div>

	<!-- Overlay For Sidebars -->
	<div class="overlay"></div>
	
	<!-- Top Bar -->
	<nav class="navbar p-l-5 p-r-5">
	    <ul class="nav navbar-nav navbar-left" style="width: 100%">
	        <li>
	            <div class="navbar-header">
	                <a href="javascript:void(0);" class="bars"></a>
	                <a class="navbar-brand" href=""><span class="m-l-10">Hear-BK</span></a>
	            </div>
	        </li>
	        <li class="float-right" style="padding-top: 7px;">
	        	<div class="dropdown">
		        	<?php
		        		$user = $this->session->read('Auth.User');
		        		$user_id = $user['uid'];
		        		$image = $user['Userdetail']['image_path'];
		        		echo $this->Html->image('../'.$image,array('url'=>array('controller'=>'users','action'=>'update_picture'),'class'=>'rounded-circle dropbtn','width'=>'40'));
		        	?>
		        	<div class="dropdown-content">
		        		<?php 			            	
			            	echo $this->Html->link('Edit profile',array('controller' => 'users', 'action' => 'edit',$user_id),array('escape'=>false));
			            	echo $this->Html->link('Change password',array('controller' => 'users', 'action' => 'change_password'),array('escape'=>false));
			            	echo $this->Html->link('Logout',array('controller' => 'users', 'action' => 'logout', 'lout'),array('escape'=>false));
			            	
			            ?>
					    <!-- <a href="#">Link 1</a>
					    <a href="#">Link 2</a>
					    <a href="#">Link 3</a> -->
			  		</div>
		        </div>
	        </li>
	        <li>
	        	<a href="javascript:void(0);" class="ls-toggle-btn" data-close="true"><i class="zmdi zmdi-swap"></i></a>
	        </li>

	        <li class="float-right">
	            <a href="javascript:void(0);" class="fullscreen hidden-sm-down" data-provide="fullscreen" data-close="true"><i class="zmdi zmdi-fullscreen"></i>
	            </a>
	            <?php 
	            	//echo $this->Html->link('<i class="zmdi zmdi-power"></i>',array('controller' => 'users', 'action' => 'logout', 'lout'),array('escape'=>false));
	            ?>
	        </li>	        
	    </ul>
	</nav>

	<!-- Left Sidebar -->
	<aside id="leftsidebar" class="sidebar">
	    <div class="tab-content">
	        <div class="tab-pane stretchRight active" id="dashboard">
	            <div class="menu">
	                <ul class="list">
	                    <li>
	                        <div class="user-info">
	                            <div class="detail">
	                            	<h2></h2>
	                                <?php echo $this->Html->image('logo.png'); ?>                      
	                            </div>	                                                  
	                        </div>
	                    </li>
	                    <!-- <li class="header">MAIN</li> -->
	                    <li class="active open"> <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-home"></i><span>Dashboard</span></a>
	                        <ul class="ml-menu">
	                            <li>
	                            	<?php
	                            		echo $this->Html->link('Users',array('controller' => 'users', 'action' => 'index'),array('escape'=>false));
	                            	?>
	                            </li>
	                            <li> 
	                            	<?php
	                            		echo $this->Html->link('Visitors',array('controller' => 'visitoremails', 'action' => 'index'),array('escape'=>false));
	                            	?>
	                            </li>
	                            <li> 
	                            	<?php
	                            		//echo $this->Html->link('Tasks',array('controller' => 'tasks', 'action' => 'index'),array('escape'=>false));
	                            	?>
	                            </li>
	                            <li> 
	                            	<?php
	                            		// echo $this->Html->link('Default Values',array('controller' => 'defaultvalues', 'action' => 'index'),array('escape'=>false));
	                            	?>
	                            </li>
	                        </ul>
	                    </li>
	                </ul>
	            </div>
	        </div>
	    </div>    
	</aside>

	<!-- Main Content -->
	<section class="content home">
		<?php echo $this->fetch('content'); ?>
	</section>
	<?php } 
		else {
	?>
	<div class="theme-purple authentication sidebar-collapse">
		<?php echo $this->fetch('content'); ?>
	</div>	
	<?php } 

		echo $this->Html->script('../light/assets/bundles/libscripts.bundle');
		echo $this->Html->script('../light/assets/bundles/vendorscripts.bundle');
		echo $this->Html->script('../light/assets/bundles/morrisscripts.bundle');
		echo $this->Html->script('../light/assets/bundles/jvectormap.bundle');
		echo $this->Html->script('../light/assets/bundles/knob.bundle');
		echo $this->Html->script('../light/assets/bundles/mainscripts.bundle');
		echo $this->Html->script('../light/assets/js/pages/index');
		echo $this->Html->script('../light/assets/plugins/sweetalert/sweetalert.min');
		echo $this->Html->script('../light/assets/js/pages/ui/dialogs');
// 		echo $this->Html->script('../light/assets/plugins/bootstrap-notify/bootstrap-notify');
		echo $this->Html->script('../light/assets/js/custom');
// 		echo $this->Html->script('../light/assets/js/bootstrap-notify');

	?>
</body>


</html>
