<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes() ?>>
<head profile="http://gmpg.org/xfn/11">
    <title><?php if ( is_404() ) : ?><?php _e('Page not found', 'veryplaintxt') ?><?php elseif ( is_home() ) : ?><?php bloginfo('description') ?><?php elseif ( is_category() ) : ?><?php echo single_cat_title(); ?><?php elseif ( is_date() ) : ?><?php _e('Mr Speaker Memoirs', 'veryplaintxt') ?><?php elseif ( is_search() ) : ?><?php _e('These are the posts you were looking for', 'veryplaintxt') ?><?php else : ?><?php the_title() ?><?php endif ?> - <?php bloginfo('name') ?></title>
    <meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
    <meta name="verify-v1" content="Su0WP34ksvUTeQiv+x7000nj1PuFSwt4BEMt3aZIny4=" />
    <link rel="stylesheet" type="text/css" media="screen,projection" href="<?php bloginfo('stylesheet_url'); ?>" title="veryplaintxt" />
    <link rel="stylesheet" type="text/css" media="print" href="<?php bloginfo('template_directory'); ?>/print.css" />
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url') ?>" title="<?php bloginfo('name') ?> RSS feed" />
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('comments_rss2_url') ?>" title="<?php bloginfo('name') ?> comments RSS feed" />
    <link rel="pingback" href="<?php bloginfo('pingback_url') ?>" />
    
    <link  href="http://fonts.googleapis.com/css?family=IM+Fell+DW+Pica" rel="stylesheet" type="text/css" />

    <script type="text/javascript" charset="utf-8">
        var baseUrl = "<?php bloginfo('template_directory'); ?>",
            template_directory_path = "<?php bloginfo('template_directory'); ?>";
    </script>
    <?php wp_head() ?>
</head>
<body class="<?php veryplaintxt_body_class() ?>">
    <div id="lol">
        <a href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>"><div id="ninman"></div></a>
        Keep your eye out for <a href="http://www.twitter.com/mrspeaker">Mr Speaker</a> and <a href="http://www.twitter.com/twalve">@twalve</a>'s frightfully good book, <a href="http://www.sitepoint.com/books/jquery1/">jQuery: Novice to Ninja</a> - in stores NOW!
    </div>

<div id="outerWrapper">
    <div id="header">
        <a href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>">
            <h1 id="blog-title">Mr Speaker</h1>
        </a>
    </div>
    <div id="wrapper">

<?php //veryplaintxt_globalnav() // Adds list of pages just below header ?>
    <?php /*<a href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>"><div id="postHead"></div></a>*/ ?>