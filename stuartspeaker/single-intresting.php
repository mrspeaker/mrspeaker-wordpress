<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes() ?>>
<head profile="http://gmpg.org/xfn/11">
	<title>Intresting</title>
	<meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
	<meta name="verify-v1" content="Su0WP34ksvUTeQiv+x7000nj1PuFSwt4BEMt3aZIny4=" />
    <style type="text/css" media="screen">
        body{
            padding:0;
            margin:0;
        }
        #header{
            height:40px;
            background-color:#000;
            color:#fff;
        }
        #header h1{
            font-size: 34pt;
            margin: -12px 0 0 -6px;
        }
        #header h1 a{
            color: #fff;
            text-decoration: none;
        }
        #content{
            padding: 10px;
        }
        #container h2{
            font-size: 16pt;
            margin: -4px 0px 0px 6px;
        }
        #content p{
            padding:0;
            margin:0;
        }
        .title{
            text-transform: capitalize;
        }
        #meta,.comment-meta{
            font-size:10pt;
        }
        .post{
            margin-top:20px;
        }
        .button, .button:visited {
            background: #222 url(/images/shiny-but-overlay.png) repeat-x;
            display: inline-block;
            padding: 5px 10px 6px;
            color: #fff;
            text-decoration: none;
            -moz-border-radius: 6px;
            -webkit-border-radius: 6px;
            -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.6);
            -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.6);
            text-shadow: 0 -1px 1px rgba(0,0,0,1);
            border-bottom: 1px solid rgba(0,0,0,0.25);
            position: relative;
            cursor: pointer;
            margin-bottom:3px;
            font-size: 13px;
            font-weight: bold;
            line-height: 1;
        }
        .button:hover                           { background-color: #111; color: #fff; }
        .button:active                          { top: 1px; }
        
        .col0.button, .col0.button:visited          { background-color: #e22092; }
        .col0.button:hover                          { background-color: #c81e82; }
        .col1.button, .col1.button:visited        { background-color: #91bd09; }
        .col1.button:hover                         { background-color: #749a02; }
        .col2.button, .col2.button:visited            { background-color: #e62727; }
        .col2.button:hover                           { background-color: #cf2525; }
        .col3.button, .col3.button:visited      { background-color: #ff5c00; }
        .col3.button:hover                        { background-color: #d45500; }
        .col4.button, .col4.button:visited          { background-color: #2981e4; }
        .col4.button:hover                          { background-color: #2575cf; }
        .col5.button, .col5.button:visited      { background-color: #ffb515; }
        .col5.button:hover                        { background-color: #fc9200; }
        .admin.button, .admin.button:visited      { background-color: #000; }
        .admin.button:hover                        { background-color: #555; }
    </style>

	<script type="text/javascript">
		var baseUrl = "<?php bloginfo('template_directory'); ?>";
		var template_directory_path = "<?php bloginfo('template_directory'); ?>";
	</script>
	
	<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>
</head>
<body>
    <div id="header">
        <h1><a href="http://www.mrspeaker.net/intresting">Intresting.</a></h1>
	</div><!-- #header -->
	<div id="wrapper">

	<div id="container">
        <?php the_post(); ?>
        <h2 class="title" id="entry-<?php the_ID(); ?>"><?php the_title(); ?></h2>
		<div id="content">
            <?php comments_template("/comments-intresting.php"); ?>
            <div id="meta">
                ID <?php the_ID(); ?>, posted <span class="entry-date"><abbr class="published" title="<?php the_time('Y-m-d\TH:i:sO'); ?>"><?php unset($previousday); printf(__('%1$s', 'veryplaintxt'), the_date('F j, Y', false)) ?></abbr></span>
            </div>
		</div><!-- #content .hfeed -->
	</div><!-- #container -->

    <div id="footer"></div>

</div><!-- #wrapper -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
	try {
	var pageTracker = _gat._getTracker("UA-8233321-1");
	pageTracker._trackPageview();
	} catch(err) {}
</script>
</body><!-- end trasmission -->
</html>