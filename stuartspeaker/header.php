<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <title><?php if ( is_404() ) : ?><?php _e('Page not found', 'veryplaintxt') ?><?php elseif ( is_home() ) : ?><?php bloginfo('description') ?><?php elseif ( is_category() ) : ?><?php echo single_cat_title(); ?><?php elseif ( is_date() ) : ?><?php _e('Mr Speaker Memoirs', 'veryplaintxt') ?><?php elseif ( is_search() ) : ?><?php _e('These are the posts you were looking for', 'veryplaintxt') ?><?php else : ?><?php the_title() ?><?php endif ?> - <?php bloginfo('name') ?></title>

  <link rel="stylesheet" type="text/css" media="screen" href="<?php mrspeaker_link('style.css'); ?>" />
  <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url') ?>" title="<?php bloginfo('name') ?> RSS feed" />

  <?php wp_head() ?>

  <style>
    @media (min-width: 900px) {
<?php
  while ( have_posts() ) : the_post();
    $margin = rand(-100, 100);
?>
       .wonky-<?php the_ID() ?> { margin-left: <?php echo $margin ?>px; margin-right: <?php echo -$margin ?>px; }
<?php endwhile ?>
    }
  </style>

</head>
<body>
  <div>

    <header>
      <a href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>">
        <h1>Mr Speaker</h1>
      </a>
    </header>
