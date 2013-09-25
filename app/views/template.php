<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <title>Laravel SPA</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="apple-touch-startup-image" href="lib/durandal/img/ios-startup-image-landscape.png" media="(orientation:landscape)" />
        <link rel="apple-touch-startup-image" href="lib/durandal/img/ios-startup-image-portrait.png" media="(orientation:portrait)" />
        <link rel="apple-touch-icon" href="lib/durandal/img/icon.png"/>

        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap-responsive.css" />
        <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" href="lib/durandal/css/durandal.css" />
        <link rel="stylesheet" href="lib/jquery-dataTables/css/datatables.css" />
        <link rel="stylesheet" href="lib/jasny-bootstrap/css/jasny-bootstrap.css" />
        <link rel="stylesheet" href="lib/tabletools/css/TableTools.css" />
        <link rel="stylesheet" href="css/main.css" />

        <script type="text/javascript">
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement("style");
                var mq = "@@-ms-viewport{width:auto!important}";
                msViewportStyle.appendChild(document.createTextNode(mq));
                document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
            }
        </script>
    </head>
    <body>
        <div id="applicationHost">
            <div class="splash">
              <img src="img/preloader.gif" />
            </div>
        </div>
        <script src="lib/jquery/jquery-1.10.2.min.js"></script>
        <script src="lib/knockout/knockout-2.3.0.debug.js"></script>
        <script src="lib/jasny-bootstrap/js/jasny-bootstrap.min.js"></script>
        <script src="lib/bootstrap/js/bootstrap.min.js"></script>
        <script src="lib/jqBootstrapValidation/jqBootstrapValidation.js"></script>
        <script src="lib/jquery-dataTables/js/jquery.dataTables.min.js"></script>
        <script src="lib/jquery-dataTables/js/paging.js"></script>
        <script src="lib/tabletools/js/TableTools.min.js"></script>
        <script src="lib/jquery-form/jquery.form.min.js"></script>
        <script src="lib/jquery_meio_mask/jquery.meio.mask.min.js"></script>
        <script src="lib/jquery_mask_money/jquery.maskMoney.js"></script>
        <script src="lib/require/require.js" data-main="js/main"></script>
    </body>
</html>
