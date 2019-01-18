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
    img{
        height:40px;
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
                        <div class="row">
                            <div class="col-md-8">
                                <h2><strong>Login user</strong> List </h2>        
                            </div>
                            <div class="search_bar">
                                <div class="input-group">                
                                    <input type="text" class="form-control" id="customsearch" onkeyup="myFunction()" placeholder="Search email">
                                    <span class="input-group-addon">
                                        <i class="zmdi zmdi-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body table-responsive">
                        <ul class="pagination pagination-success float-right">
                            <?php
                                if($this->Paginator->counter('{:pages}') > 1) {
                                echo $this->Paginator->numbers(array('separator' => '','tag'=>'li','class'=>'paginator','currentTag' => 'a','currentClass' => 'paginator-active','currentLink' => true));
                                }
                            ?>
                        </ul>
                        <table class="table .table-striped members_profiles" id="table">
                            <tr>
                                <th>Email</th>                                
                                <th>Last_login</th>
                            </tr>
                            <?php foreach($users as $user): ?>
                            <tr>
                                
                                <td><?php echo $user['User']['email']; ?></td>
                                <td><?php echo $user['User']['last_login']; ?></td>
                            </tr>
                            <?php endforeach; ?>
                            <?php unset($user); ?>
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
</section>   <script>
    function myFunction() {
        var input, filter, table, tr, td, i;
        input = document.getElementById("customsearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        console.log(tr);
        for (i = 1; i < tr.length; i++) {
            td = tr[i];
            console.log(td);
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } 
                else {
                    tr[i].style.display = "none";
                }
            }       
        }
    }
</script> 