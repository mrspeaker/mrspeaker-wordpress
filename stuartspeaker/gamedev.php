<?php /*
	Template Name: Game Dev
*/?>
<?php get_header() ?>

	<main id="post-<?php the_ID(); ?>" style="clear:both;width:90%">
<?php the_post() ?>
	  <h2 class="entry-title"><?php the_title(); ?></h2>
	  <div class="entry-content">
        <?php the_content() ?>

        <?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), '</div>', 'number'); ?>

        <?php edit_post_link(__('Edit this entry.', 'veryplaintxt'),'<p class="entry-edit">','</p>') ?>
	  </div>

<?php if ( get_post_custom_values('comments') ) comments_template() // Add a key/value of "comments" to load comments on a page ?>

	</main>

<?php get_footer() ?>
