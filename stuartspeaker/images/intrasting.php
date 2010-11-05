<?php /*
	Template Name: Intra Sting
*/?>
<?php get_header() ?>

	<div id="container">
		<div id="content" style="width:100%">
		    
            <?php

             $querystr = "
                 SELECT wposts.* 
                 FROM $wpdb->posts wposts
                 	LEFT JOIN $wpdb->term_relationships ON (wposts.ID = $wpdb->term_relationships.object_id)
                 	LEFT JOIN $wpdb->term_taxonomy ON ($wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id)
                 WHERE $wpdb->term_taxonomy.taxonomy = 'category'
                 	AND $wpdb->term_taxonomy.term_id = 1
                 ORDER BY wpostmeta.meta_value ASC
                 LIMIT 4
             ";

             $pageposts = $wpdb->get_results($querystr, OBJECT);

            ?>
            
            <?php if ($pageposts): ?>
             <?php global $post; ?>
             <?php foreach ($pageposts as $post): ?>
               <?php setup_postdata($post); ?>
              <?php the_title(); ?>
            <?php endforeach; ?>
             <?php endif; ?>
		    
<?php the_post() ?>
			<div id="post-<?php the_ID(); ?>" class="<?php veryplaintxt_post_class() ?>">
				<h2 class="entry-title"><?php the_title(); ?></h2>
				<div class="entry-content">
<?php the_content() ?>

<?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), '</div>', 'number'); ?>

<?php edit_post_link(__('Edit this entry.', 'veryplaintxt'),'<p class="entry-edit">','</p>') ?>

				</div>
			</div><!-- .post -->

<?php comments_template() // Add a key/value of "comments" to load comments on a page ?>

		</div><!-- #content .hfeed -->
	</div><!-- #container -->