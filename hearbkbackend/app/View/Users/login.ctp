<?php $login_image = '../light/assets/images/login.png'; 
// echo $this->Session->flash();
?>
<div class="page-header">
    <div class="page-header-image" style='background-image: url(<?php echo $login_image; ?>);'>  </div>
    <div class="container">
        <div class="col-md-12 content-center">
            <div class="card-plain">
                <div class="header">
                    <div class="logo-container">
                        <!-- <img src="assets/images/logo.svg" alt=""> -->
                        <?php echo $this->Html->image('logo.png'); ?>
                    </div>
                    <h5>Log in</h5>
                </div>
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
                    echo $this->Form->input('username',array('label'=>'','placeholder'=>'Enter User Name'));
                    echo $this->Form->input('password',array('label'=>'','placeholder'=>'Password'));
                ?>
                </div>
                <div class="footer text-center">
                    <?php
                        echo $this->Form->submit('SIGN IN',array('class'=>'btn btn-primary btn-round btn-lg btn-block'));
                        echo $this->Html->link('Forgot Password?',array('controller'=>'users','action'=>'forget_password'),array('class'=>'link'));
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>