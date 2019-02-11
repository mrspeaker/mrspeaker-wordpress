<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
    <title><?php if ( is_404() ) : ?><?php _e('Page not found', 'veryplaintxt') ?><?php elseif ( is_home() ) : ?><?php bloginfo('description') ?><?php elseif ( is_category() ) : ?><?php echo single_cat_title(); ?><?php elseif ( is_date() ) : ?><?php _e('Mr Speaker Memoirs', 'veryplaintxt') ?><?php elseif ( is_search() ) : ?><?php _e('These are the posts you were looking for', 'veryplaintxt') ?><?php else : ?><?php the_title() ?><?php endif ?> - <?php bloginfo('name') ?></title>

    <link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo('stylesheet_url'); ?>" title="veryplaintxt" />
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url') ?>" title="<?php bloginfo('name') ?> RSS feed" />

    <meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/scripts/jquery-3.3.1.min.js"></script>
    <?php wp_head() ?>
</head>
<body>
<div id="outerWrapper">
    <div id="header">
        <a id="placeToBe" href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>">
            <h1 id="blog-title" class="headShader">Mr Speaker</h1>
        </a>
    </div>
    <div id="wrapper">
