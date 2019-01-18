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
                        <?php echo $this->Html->link('<i class="zmdi zmdi-accounts"></i> User list',array('controller' => 'users', 'action' => 'index'),array('escape'=>false)); ?>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
    	<div class="header">
    		<h2><strong>User</strong> profile </h2>
    	</div>
	    <div class="body table-responsive">
			<table class="table table-light">
				<tr>
					<th>First name</th>
					<td><?php echo $user['Userinfo']['Userdetail']['first_name'] ?></td>
				</tr>
				<tr>
					<th>Last name</th>
					<td><?php echo $user['Userinfo']['Userdetail']['last_name'] ?></td>
				</tr>
				<tr>
					<th>Professional name</th>
					<td><?php echo $user['Userinfo']['Userdetail']['professional_name'] ?></td>
				</tr>	
				<tr>
					<th>Email</th>
					<td><?php echo $user['User']['email'] ?></td>
				</tr>
				<tr>
					<th>User verification</th>
					<td>
						<?php 
							if($user['User']['user_status'] == 0){
								echo "<span style='color:red;'><b>Pending</b></span>";
							}
							else{
								echo "<span style='color:green;'><b>Done</b></span>";	
							}
						?>

					</td>
				</tr>
				<tr>
					<th>Country</th>
					<td><?php echo $user['Userinfo']['Userdetail']['country'] ?></td>
				</tr>
				<tr>
					<th>State</th>
					<td><?php echo $user['Userinfo']['Userdetail']['state'] ?></td>
				</tr>
				<tr>
					<th>City</th>
					<td><?php echo $user['Userinfo']['Userdetail']['city'] ?></td>
				</tr>
				<tr>
					<th>Title</th>
					<td><?php echo $user['Userinfo']['Userdetail']['title'] ?></td>
				</tr>
				<tr>
					<th>Company</th>
					<td><?php echo $user['Userinfo']['Userdetail']['company'] ?></td>
				</tr>
				<tr>
					<th>Bio</th>
					<td><?php echo $user['Userinfo']['Userdetail']['bio'] ?></td>
				</tr>
				<tr>
					<th>Website</th>
					<td><?php echo $user['Userinfo']['Userdetail']['website'] ?></td>
				</tr>
				<tr>
					<th>Gender</th>
					<td><?php echo $user['Userinfo']['Userdetail']['gender'] ?></td>
				</tr>
				<tr>
					<th>Favourite Artists</th>
					<td>
						<?php 
							$artists = array();
							if(!empty($user['Userinfo']['Favoriteartist'])){
							    foreach($user['Userinfo']['Favoriteartist'] as $artist){
    								array_push($artists,$artist['artist_name']);
    							}
    							echo implode(", ", $artists);   
							}
							else{
							    $artist = '';
							}
						?>
					</td>
				</tr>
				<tr>
					<th>Favourite Genres</th>
					<td>
						<?php 
							$genres = array();
							if(!empty($user['Userinfo']['Favoritegenre'])){
    							foreach($user['Userinfo']['Favoritegenre'] as $genre){
    								array_push($genres,$genre['genre_name']);
    							}
    							echo implode(", ", $genres);
							}
							else{
							    $genres = '';
							}
						?>
					</td>
				</tr>
				<tr>
					<th>Account Linked</th>
					<td>
						<?php 
							$link_accounts = array();
							if(!empty($user['Linkedaccount'])){
							    
    							foreach($user['Linkedaccount'] as $accounts){
    								array_push($link_accounts, $accounts['link_type']);
    							}
    							echo implode(", ", $link_accounts);	
							}
							else{
							    $link_accounts = '';
							}
						?>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<?php 
			$img = $user['Userinfo']['Userdetail']['image_path'];
            if(!empty($img)){
                echo $this->Html->image("../$img",array('class'=>'profile_pic')); 
            }
            else{
                echo $this->Html->image('no_image.jpg',array('class'=>'profile_pic'));
            }	
    ?>
</div>
