<?php /*
	Template Name: Empty Page
*/?>
<?php get_header() ?>

	<main>

<?php the_post() ?>
			<div id="post-<?php the_ID(); ?>" class="<?php veryplaintxt_post_class() ?>">
				<h2 class="entry-title"><?php the_title(); ?></h2>
				<div class="entry-content">
<?php the_content() ?>

<?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), '</div>', 'number'); ?>

<?php edit_post_link(__('Edit this entry.', 'veryplaintxt'),'<p class="entry-edit">','</p>') ?>

				</div>
			</div><!-- .post -->

<?php if ( get_post_custom_values('comments') ) comments_template() // Add a key/value of "comments" to load comments on a page ?>

	</main>

<?php get_footer() ?>
