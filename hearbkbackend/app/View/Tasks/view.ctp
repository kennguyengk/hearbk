<style>
    th{
        width:25% !important;
    }
</style>
<div class="container-fluid">
	<div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-12">
                <ul class="breadcrumb float-md-left">
                    <li class="breadcrumb-item">
                        <?php echo $this->Html->link('<i class="zmdi zmdi-home"></i> Dashboard',array('controller' => 'users', 'action' => 'dashboard'),array('escape'=>false)); ?>
                    </li>
                     <li class="breadcrumb-item">
                        <?php echo $this->Html->link('<i class="zmdi zmdi-accounts"></i> Task list',array('controller' => 'tasks', 'action' => 'index'),array('escape'=>false)); ?>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
    	<div class="header">
    		<h2><strong>Task</strong> detail </h2>
    	</div>
	    <div class="body table-responsive">
			<table class="table .table-striped members_profiles" id="table">
				<h3><?php echo $task['Task']['taskintro']; ?></h3>
				<h6><?php echo $task['Task']['taskdetail']; ?></h6>
				<p>Created by : <?php echo $task['Task']['professional_name']; ?></p>
				<tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Task type</th>                    
                </tr>
                <?php foreach($task['Cartuser'] as $user): ?>
                    <tr>
                        <td><?php echo $user['name']; ?></td>
                        <td><?php echo $user['customer_price']; ?></td>
                        <td><?php echo $task['Task']['tasktype']; ?></td>
                    </tr>
                <?php endforeach; ?>
                <?php unset($user); ?>
			</table>
		</div>
	</div>
</div>
<?php
// pr($task);

?>