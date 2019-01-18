<style type="text/css">
	label{
		padding-left: 20px;
	}
</style>
<div class="container">
	<div class="block-header">
	    <div class="row">
	        <div class="col-lg-5 col-md-6 col-sm-12">
	            <ul class="breadcrumb float-md-left">
	                <li class="breadcrumb-item">
	                    <?php echo $this->Html->link('<i class="zmdi zmdi-home"></i> Dashboard',array('controller' => 'users', 'action' => 'dashboard'),array('escape'=>false)); ?>
	                </li>
	                 <li class="breadcrumb-item">
	                    <?php echo $this->Html->link('<i class="zmdi zmdi-accounts"></i> User list',array('controller' => 'users', 'action' => 'index'),array('escape'=>false)); ?>
	                </li>
	            </ul>
	        </div>
	    </div>
	</div>
	<div class="row justify-content-md-center">
	    <div class="card">
    	<div class="header">
    		<h2><strong>User</strong> profile </h2>
    	</div>
	    <div class="body table-responsive">
			<?php
				echo $this->Form->create('Userdetail',array('class'=>'','inputDefaults'=>array('div'=>'form-group','class'=>'form-control')));
				echo $this->Form->input('first_name');
				echo $this->Form->input('last_name');
				echo $this->Form->input('gender');
				echo $this->Form->input('country');
				echo $this->Form->input('state');
				echo $this->Form->input('city');
				echo $this->Form->input('professional_name');
				echo $this->Form->input('title');
				echo $this->Form->input('company');
				echo $this->Form->input('website');
				echo $this->Form->input('bio');
				echo $this->Form->input('user_id', array('type' => 'hidden'));
				echo $this->Form->submit('Update',array('class'=>'btn btn-primary'));
			?>
		</div>
	</div>
	</div>
</div>