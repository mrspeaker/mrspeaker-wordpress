<?php get_header(); ?>

	<div id="container">
		<main>
      
<?php the_post(); ?>
<?php ms_script_includes( true ); ?>
			<article id="post-<?php the_ID(); ?>" class="<?php veryplaintxt_post_class(); ?>">
				<h2 class="entry-title"><a href="<?php the_permalink() ?>" title="<?php printf(__('Permalink to %s', 'veryplaintxt'), wp_specialchars(get_the_title(), 1)) ?>" rel="bookmark"><?php the_title() ?></a></h2>
				<div class="entry-date">
					<abbr class="published" title="<?php the_time('Y-m-d\TH:i:sO'); ?>">
						<?php unset($previousday); printf(__('%1$s', 'veryplaintxt'), the_date('l, F j, Y', false)) ?>
						<?php edit_post_link(__('Edit this entry.', 'veryplaintxt'),'',''); ?>
					</abbr>
				</div>
				<div class="entry-content">
<?php the_content('<span class="more-link">'.__('Read on for more &raquo;', 'veryplaintxt').'</span>'); ?>

<?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), "</div>\n", 'number'); ?>
				</div>

				<div class="entry-meta">
					<?php printf(__('This was written by %1$s. Posted on <abbr class="published" title="%2$s">%3$s at %4$s</abbr>. Filed under %5$s. %6$sBookmark the <a href="%7$s" title="Permalink to %8$s" rel="bookmark">permalink</a>. Follow comments here with the <a href="%9$s" title="Comments RSS to %8$s" rel="alternate" type="application/rss+xml">RSS feed</a>.', 'sandbox'),
						'<span class="vcard"><span class="fn n">' . $authordata->display_name . '</span></span>',
						get_the_time('Y-m-d\TH:i:sO'),
						the_date('l, F j, Y,', '', '', false),
						get_the_time(),
						get_the_category_list(', '),
						get_the_tag_list('Tagged ', ', ', '. '),
						get_permalink(),
						wp_specialchars(get_the_title(), 'double'),
						comments_rss() ) ?>
<?php if (('open' == $post-> comment_status) && ('open' == $post->ping_status)) : ?>
					<?php printf(__('<a href="#respond" title="Post a comment">Post a comment</a> or leave a <a href="%s" rel="trackback" title="Trackback URL for your post">trackback</a>.', 'veryplaintxt'), get_trackback_url()) ?>
<?php elseif (!('open' == $post-> comment_status) && ('open' == $post->ping_status)) : ?>
					<?php printf(__('Comments are closed, but you can leave a <a href="%s" rel="trackback" title="Trackback URL for your post">trackback</a>.', 'veryplaintxt'), get_trackback_url()) ?>
<?php elseif (('open' == $post-> comment_status) && !('open' == $post->ping_status)) : ?>
					<?php printf(__('Trackbacks are closed, but you can <a href="#respond" title="Post a comment">post a comment</a>.', 'veryplaintxt')) ?>
<?php elseif (!('open' == $post-> comment_status) && !('open' == $post->ping_status)) :?>
					<?php _e('Both comments and trackbacks are currently closed.', 'veryplaintxt') ?>
<?php endif; ?>

<?php edit_post_link(__('Edit this entry.', 'veryplaintxt'),'',''); ?>
				</div>
<?php ms_script_includes( false ); ?>
			</article>

      <nav>
				<div class="nav-previous"><?php previous_post_link(__('&lsaquo; %link', 'veryplaintxt'), '%title', false, '15') ?></div>
				<div class="nav-next"><?php next_post_link(__('%link &rsaquo;', 'veryplaintxt'), '%title',false, '15') ?></div>
			</nav>

			<div id="footer-bits">
				<?php /* comments_template(); */ ?>
				<div id="footer-about">
					Thank you for stoping by the <a href="/">homepage of Mr Speaker</a>.
					For more exciting things, be sure to follow along with
					<a href="https://twitter.com/mrspeaker" style="color:hsl(196, 100%, 47%);">Mr Speaker's <strong>Twitter</strong> shenanigans</a>!
				</div>
			</div>

      </main>
	</div><!-- #container -->
  <?php get_footer() ?>
