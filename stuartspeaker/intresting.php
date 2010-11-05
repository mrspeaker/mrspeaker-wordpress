<?php /*
    Template Name: Intersting
*/?>
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
        #content p{
            padding:0;
            margin:0;
        }
        .title{
            text-transform: capitalize;
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
</head>
<body>
    <div id="header">
        <h1><a href="http://www.mrspeaker.net/intresting">Intresting.</a></h1>
	</div><!-- #header -->
	<div id="wrapper">
        <div id="container">
            <div id="content">
<?php
    $querystr = "
        SELECT wposts.* 
        FROM $wpdb->posts wposts
        LEFT JOIN $wpdb->term_relationships ON (wposts.ID = $wpdb->term_relationships.object_id)
        LEFT JOIN $wpdb->term_taxonomy ON ($wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id)
        WHERE $wpdb->term_taxonomy.taxonomy = 'category'
        AND $wpdb->term_taxonomy.term_id = 15
        ORDER BY wposts.post_date DESC
        LIMIT 20
    ";
    $pageposts = $wpdb->get_results($querystr, OBJECT);
?>
<?php if ($pageposts): global $post; ?>
    <?php 
        $indx = -1;
        foreach ($pageposts as $post): $indx++;?>
        <?php setup_postdata($post); ?>
        <p>
        <span class="title"><?php the_title() ?></span>
        <a class="button col<?php echo $indx % 4?>" href="<?php the_permalink() ?>" title="<?php printf(__('Permalink to %s', 'veryplaintxt'), wp_specialchars(get_the_title(), 1)) ?>" rel="bookmark"><?php echo get_comments_number();  ?></a>
        </p>
    <?php endforeach; ?>
<?php endif; ?>

            </div>
        </div>
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