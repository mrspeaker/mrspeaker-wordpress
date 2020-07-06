<?php
/*
Template Name: Sitemap Page
*/
?>
<?php get_header() ?>

	<main>

<?php the_post() ?>

      <div id="post-<?php the_ID(); ?>" class="<?php simplr_post_class() ?>">
        <h2 class="entry-title"><?php the_title() ?></h2>
        <div class="entry-content">
<?php the_content() ?>

          <ul id="sitemap-page" class="xoxo">
            <li id="all-pages">
                <h3><?php _e( 'All Pages', 'simplr' ) ?></h3>
                <ul>
<?php wp_list_pages('title_li='); ?>

                </ul>
            </li>
            <li id="all-posts">
                <h3><?php _e( 'All Posts', 'simplr' ) ?></h3>
                <ul>
<?php $post_archives = new wp_query('showposts=1000');
while ( $post_archives->have_posts() ) : $post_archives->the_post(); ?>
                    <li class="hentry">
                        <span class="entry-title"><a href="<?php the_permalink() ?>" title="<?php printf(__( 'Permalink to %s', 'plaintxtblog' ), wp_specialchars( get_the_title(), 1 ) ) ?>" rel="bookmark"><?php the_title(); ?></a></span>
                    </li>
<?php endwhile; ?>
                </ul>
            </li>
            <li id="monthly-archives">
                <h3><?php _e( 'All Monthly Archives', 'simplr' ) ?></h3>
                <ul>
<?php wp_get_archives('type=monthly&show_post_count=1') ?>

                </ul>
            </li>
            <li id="category-archives">
                <h3><?php _e( 'All Category Archives', 'simplr' ) ?></h3>
                <ul>
<?php wp_list_categories('optioncount=1&title_li=&show_count=1') ?>

                </ul>
            </li>
            <li>
                <h3><?php _e('Archives by Tag', 'simplr') ?></h3>
                <p><?php wp_tag_cloud() ?></p>
            </li>
          </ul>

<?php edit_post_link(__('Edit this entry.', 'simplr'),'<p class="entry-edit">','</p>') ?>

        </div>
      </div>

	</main>

<?php get_sidebar() ?>
<?php if ( get_post_custom_values('comments') ) : comments_template(); else : // To show comments on this page, see the readme.html ?>
<?php endif; ?>
<?php get_footer() ?>
