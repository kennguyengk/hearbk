<div class="container">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-12">
                <ul class="breadcrumb float-md-left">
                    <li class="breadcrumb-item">
                        <?php echo $this->Html->link('<i class="zmdi zmdi-home"></i> Dashboard',array('controller' => 'users', 'action' => 'dashboard'),array('escape'=>false)); ?>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="card col-md-6">
        <div class="header">
            <h2><strong>Update </strong> password </h2>
        </div>
        <div class="body table-responsive">
            <?php 
                echo $this->Form->create('User',
                                        array(
                                            'class'=>'form',
                                            'inputDefaults'=>array(
                                                'div'=>'input-group input-lg',
                                                'class'=>'form-control',
                                            )
                                        )
                                    ); ?>
            <div class="content">
            <?php
                echo $this->Form->input('old_pwd',array('label'=>'','placeholder'=>'Enter your old password','required'=>'required','type'=>'password'));
                echo $this->Form->input('password',array('label'=>'','placeholder'=>'Enter new password','required'=>'required','type'=>'password'));
                echo $this->Form->input('password_confirm',array('label'=>'','placeholder'=>'Confirm new password','required'=>'required','type'=>'password'));
            ?>
            </div>
            <div class="footer text-center">
                <?php
                    echo $this->Form->submit('Update Password',array('class'=>'btn btn-primary btn-round btn-lg btn-block'));
                ?>
            </div>
        </div>
    </div>
    </div>
</div>