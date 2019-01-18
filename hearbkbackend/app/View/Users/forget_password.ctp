<?php $login_image = '../light/assets/images/login.png'; ?>
<div class="page-header">
    <div class="page-header-image" style='background-image: url(<?php echo $login_image; ?>);'>  </div>
    <div class="container">
        <div class="col-md-12 content-center">
            <div class="card-plain">
                <div class="header">
                    <div class="logo-container">
                        <?php echo $this->Html->image('logo.png'); ?>
                    </div>
                    <h5>Forgot Password?</h5>
                    <span>Enter your e-mail address below to reset your password.</span>
                </div>
                <?php 
                    echo $this->Form->create('User',
                                            array(
                                                'class'=>'form',
                                                'inputDefaults'=>array('div'=>'input-group input-lg',
                                                'class'=>'form-control'
                                                )
                                            )
                                        ); ?>
                <div class="content">
                <?php
                    echo $this->Form->input('email',array('label'=>'','placeholder'=>'Enter Email','type'=>'email'));
                ?>
                </div>
                <div class="footer text-center">
                    <?php
                        echo $this->Form->submit('SUBMIT',array('class'=>'btn btn-primary btn-round btn-lg btn-block'));
                    ?>
                </div>
                <!-- <form class="form" method="" action="">
                    <div class="content">
                        <div class="input-group input-lg">
                            <input type="text" class="form-control" placeholder="Enter Email">
                            <span class="input-group-addon">
                                <i class="zmdi zmdi-email"></i>
                            </span>
                        </div>
                    </div>
                    <div class="footer text-center">
                        <a href="index.html" class="btn btn-primary btn-round btn-lg btn-block waves-effect waves-light">SUBMIT</a>
                        <h5><a href="javascript:void(0);" class="link">Need Help?</a></h5>
                    </div>
                </form> -->
            </div>
        </div>
    </div>
</div>