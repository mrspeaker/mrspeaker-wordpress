<?php
/*

Template Name: All posts
*/
?>
<?php get_header() ?>

	<main>

<?php the_post() ?>
      <div id="post-<?php the_ID(); ?>" class="<?php veryplaintxt_post_class() ?>">
        <h2 class="entry-title"><?php the_title(); ?></h2>
        <div class="entry-content">
  <?php the_content() ?>
          <?php edit_post_link(__('Edit this entry.', 'veryplaintxt'),'<p class="entry-edit">','</p>') ?>

          <ul style="list-style-type:none;line-height:10px">
 <?php
   $cur = -1;
   $myposts = get_posts('numberposts=-1&offset=$debut');
   foreach($myposts as $post) :
 ?>
            <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
 <?php
   endforeach;
 ?>
          </ul>

          <?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), '</div>', 'number'); ?>

        </div>
      </div>

<?php if ( get_post_custom_values('comments') ) comments_template() // Add a key/value of "comments" to load comments on a page ?>

	</main>

<?php get_sidebar() ?>
<?php get_footer() ?>
