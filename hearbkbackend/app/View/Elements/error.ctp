<div class="alert alert-danger" role="alert" id="error" style="top:0;position: fixed;z-index: 1000;width: 100%;text-align: center;background:red;">
    <strong><?php echo $message;?>!</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">
            <i class="zmdi zmdi-close"></i>
        </span>
    </button>
</div>
  
<?php 
// exit;
?>
<script type="text/javascript">
	setTimeout(function() {
	    $('#error').fadeOut('slow');
	}, 5000);
</script>