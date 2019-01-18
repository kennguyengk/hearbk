<style type="text/css">
    .img_outr{
        width: 150px;        
        margin: auto;
    }
    .card{
        padding: 50px;
    }
    img{
        border-radius: 10px;
    }
</style>
<div class="col-md-12  container">
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
        <div class="card-avatar">
            <div class="img_outr">
                <a href="">
                    <?php 
                        if(empty($image)){
                            
                        }
                        else{
                            echo $this->Html->image("../".$image);
                        }
                    ?>
                </a>
            </div>
        </div>
        <div class="content">
            <div class="card-content">
            <?php echo $this->Form->create('User', array('enctype' => 'multipart/form-data'),
                    array('inputDefaults' => 
                        array('div' => 'form-group','label' => 
                            array('class' => 'col col-md-3'),
                                'input' => 'col-md-9',
                                'class' => 'form-control '
                            ),
                            'class' => 'form-horizontal form-material'
                        )
                    );?>
                <div class="row">
                    <div class="col-md-4" style="padding-top: 13px; padding-left: 35px;margin: auto">
                        <?php
                            echo $this->Form->input('file', array('type' => 'file','label' => ''));
                            echo $this->Form->submit('Save',array('class' => 'col-md-12 btn btn-primary pull-right')); 
                        ?>        
                    
                </div>
            </div>
        </div>
    </div>
</div>