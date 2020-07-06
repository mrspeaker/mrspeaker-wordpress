<?php header("HTTP/1.1 404 Not Found"); ?>
<?php get_header() ?>

	<main>
       <div id="post-0" class="post">
         <h2 class="entry-title"><?php _e('Not Found', 'veryplaintxt') ?></h2>
         <div class="entry-content">
           <p><?php _e('That page is now gone (or you type-o\'d it!). You could try searching:', 'veryplaintxt') ?></p>
         </div>
       </div>
       <form id="error404-searchform" method="get" action="<?php bloginfo('home') ?>">
         <div>
           <input id="error404-s" name="s" type="text" value="<?php echo wp_specialchars(stripslashes($_GET['s']), true) ?>" size="40" />
           <input id="error404-searchsubmit" name="searchsubmit" type="submit" value="<?php _e('Search', 'veryplaintxt') ?>" />
         </div>
       </form>
	</main>

<?php get_sidebar() ?>
<?php get_footer() ?>
