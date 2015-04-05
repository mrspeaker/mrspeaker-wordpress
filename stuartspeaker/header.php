<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
    <title><?php if ( is_404() ) : ?><?php _e('Page not found', 'veryplaintxt') ?><?php elseif ( is_home() ) : ?><?php bloginfo('description') ?><?php elseif ( is_category() ) : ?><?php echo single_cat_title(); ?><?php elseif ( is_date() ) : ?><?php _e('Mr Speaker Memoirs', 'veryplaintxt') ?><?php elseif ( is_search() ) : ?><?php _e('These are the posts you were looking for', 'veryplaintxt') ?><?php else : ?><?php the_title() ?><?php endif ?> - <?php bloginfo('name') ?></title>

    <link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo('stylesheet_url'); ?>" title="veryplaintxt" />

    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url') ?>" title="<?php bloginfo('name') ?> RSS feed" />
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('comments_rss2_url') ?>" title="<?php bloginfo('name') ?> comments RSS feed" />
    <link rel="pingback" href="<?php bloginfo('pingback_url') ?>" />
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,500,600,700,300' rel='stylesheet' type='text/css'>


    <meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
    <meta name="verify-v1" content="Su0WP34ksvUTeQiv+x7000nj1PuFSwt4BEMt3aZIny4=" />
    <?php wp_head() ?>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8">
        var baseUrl = "<?php bloginfo('template_directory'); ?>",
            template_directory_path = "<?php bloginfo('template_directory'); ?>";
    </script>
</head>
<body class="<?php veryplaintxt_body_class() ?>">
<div id="outerWrapper">
    <div id="header">
        <a href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>">
            <h1 id="blog-title" class="headShader">Mr Speaker</h1>
        </a>
    </div>
    <div id="wrapper">
