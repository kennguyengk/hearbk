<style type="text/css">
    .paginator-active > a{
    border: 0;
    border-radius: 30px !important;
    transition: all .3s;
    display: block;
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.2);
    padding: 0px 11px;
    margin: 0 3px;
    min-width: 30px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: white !important;
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    background: transparent;
    background-color: #f96332;
    border-color: #f96332;

    }
    .pagination{
        align-items:center;
    }
    li > a{
        padding: 6px;
    }
</style>
<section>
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
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="header">
                        <h2><strong>Listener</strong> Emails </h2>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-12">
                        <ul class="breadcrumb float-md-left">
                            <li class="breadcrumb-item">
                                <?php echo $this->Html->link(' Contributor',array( 'action' => '/'),array('escape'=>false)); ?>
                            </li>
                        </ul>
                    </div>
                    <div class="body table-responsive">
                         <ul class="pagination pagination-success float-right">
                            <?php
                                if($this->Paginator->counter('{:pages}') > 1) {
                                echo $this->Paginator->numbers(array('separator' => '','tag'=>'li','class'=>'paginator','currentTag' => 'a','currentClass' => 'paginator-active','currentLink' => true));
                                }
                            ?>
                        </ul>
                        <table class="table .table-striped members_profiles">
                            <tr>
                                <th>Email</th>
                                <th>User Type</th>
                                <th>Created</th>
                            </tr>
                            <?php foreach($emails as $email): 
                                $date=date_create($email['Visitoremail']['created']);
                                $created = date_format($date,"d F");
                            ?>
                            <tr>
                                <td><?php echo $email['Visitoremail']['email']; ?></td>
                                <td><?php echo $email['Visitoremail']['usertype']; ?></td>
                                <td><?php echo $created; ?></td>
                            </tr>
                            <?php endforeach; ?>
                            <?php unset($email); ?>
                        </table>
                        <ul class="pagination pagination-success float-right">
                        <?php
                            if($this->Paginator->counter('{:pages}') > 1) {
                            echo $this->Paginator->numbers(array('separator' => '','tag'=>'li','class'=>'paginator','currentTag' => 'a','currentClass' => 'paginator-active','currentLink' => true));
                            }
                        ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>    