<section class="container-fluid">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-5 col-sm-12">
                <h2>Dashboard</h2>
            </div>            
        </div>
    </div>
    <div class="row clearfix social-widget">                   
        <div class="col-lg-3 col-md-3">
            <a href="index">
            <div class="card info-box-2 hover-zoom-effect instagram-widget">
                <div class="icon"><i class="zmdi zmdi-accounts"></i></div>
                <div class="content">
                    <div class="text">Users</div>
                    <div class="number count-to m-t-0 m-b-5" data-from="0" data-to="<?php echo $total; ?>" data-speed="1000" data-fresh-interval="700">
                        <?php echo $total; ?>
                    </div>
                </div>
            </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-3">
            <a href="../visitoremails">
                <div class="card info-box-2 hover-zoom-effect linkedin-widget">
                    <div class="icon"><i class="zmdi zmdi-linkedin"></i></div>
                    <div class="content">
                        <div class="text">Visitors</div>
                        <div class="number count-to m-t-0 m-b-5" data-from="0" data-to="<?php echo $total_visitors; ?>" data-speed="1000" data-fresh-interval="700">
                                <?php echo $total_visitors; ?>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</section>