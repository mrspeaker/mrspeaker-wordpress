<?php get_header() ?>
	<div id="container" class="leftcolumn">

		<div id="content" class="hfeed">

<?php
	$count = 0;
	while ( have_posts() ) : the_post();

			if( $count++ % 2 == 1) continue;

				ms_script_includes( true );
?>

			<div id="post-<?php the_ID() ?>" class="<?php veryplaintxt_post_class(); ?>">
				<h2 class="entry-title"><a href="<?php the_permalink() ?>" title="<?php printf(__('Permalink to %s', 'veryplaintxt'), wp_specialchars(get_the_title(), 1)) ?>" rel="bookmark"><?php the_title() ?></a></h2>
				<div class="entry-date"><abbr class="published" title="<?php the_time('Y-m-d\TH:i:sO'); ?>"><?php unset($previousday); printf(__('%1$s', 'veryplaintxt'), the_date('l, F j, Y', false)) ?></abbr></div>
				<div class="entry-content">
<?php the_content('<span class="more-link">'.__('Read on for more &raquo;', 'veryplaintxt').'</span>'); ?>

<?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), "</div>\n", 'number'); ?>
				</div>
				<div class="entry-meta">
					<?php
						//<span class="entry-category"><?php printf(__('Box: %s', 'veryplaintxt'), get_the_category_list(', ') ) ? ></span>
					?>
					<span class="entry-tags"><?php the_tags(__('| Tag: ', 'veryplaintxt'), ", ", "") ?></span>
					<?php //<span class="meta-sep">|</span> ?>
<?php edit_post_link(__('Edit', 'veryplaintxt'), "\t\t\t\t\t<span class='entry-edit'>", "</span>\n\t\t\t\t\t<span class='meta-sep'>|</span>\n"); ?>
					<span class="entry-comments"><?php comments_popup_link(__('Comments (0)', 'veryplaintxt'), __('Comments (1)', 'veryplaintxt'), __('Comments (%)', 'veryplaintxt')) ?></span>
				</div>
			</div><!-- .post -->
			<?php
				ms_script_includes( false );
			?>
<?php endwhile ?>

			<div id="nav-below" class="navigation">
				<div class="nav-previous"><?php next_posts_link(__('&lsaquo; Older posts', 'veryplaintxt')) ?></div>
				<div class="nav-next"><?php previous_posts_link(__('Newer posts &rsaquo;', 'veryplaintxt')) ?></div>
			</div>

		</div><!-- #content .hfeed -->
	</div><!-- #container -->

<!-- DO content B -->
<div id="primary" class="sidebar rightcolumn">

	<div id="post-0" class="<?php veryplaintxt_post_class(); ?>">

		<form id="searchform" method="get" action="<?php bloginfo('home') ?>">
			<p class="intro">You find yourself at the entrance to the Hompage of <?php veryplaintxt_admin_hCard(); ?>.
				In a darkened corner sits a trunk containing <a href="/games" style="font-size:24pt" title="HTML5 games">HTML5 games</a> and some
				<a href="/javascript" title="JavaScript experiments">JavaScript tidbits</a>. In a dark corner you spy a
				<a href="http://twitter.com/mrspeaker" style="font-size:24pt;color:hsl(196, 100%, 47%);" title="Mr Speaker on Twitter">Twitter</a> account.
				Exits are North, East,
			and <input id="searchsubmit" name="searchsubmit" type="submit" value="<?php _e('Search', 'veryplaintxt') ?>" /><input id="s" name="s" type="text" value="<?php echo wp_specialchars(stripslashes($_GET['s']), true) ?>" size="10" />
			.
			</p>
			<span class="lolblink">?&gt;<blink>_</blink></span>
		</form>

	</div>

	<div id="postList">
	<?php
	    // Spit out the "TOC"
	    $count = 0;
	    while ( have_posts() ) : the_post();
	        if($count++ >0){
	?>
	        <h2 class="entry-title">
	            <a href="<?php the_permalink() ?>" title="<?php printf(__('Permalink to %s', 'veryplaintxt'), wp_specialchars(get_the_title(), 1)) ?>" rel="bookmark"><?php the_title() ?></a>
	            <span class="cats"><?php the_category(' '); ?></span>
	        </h2>
	<?php
            }
	    endwhile
	?>
	</div>

	<!--<div id="wave-container" class="<?php veryplaintxt_post_class(); ?>" style="">

		<h3 style="margin-top:0;padding-top:0">Google Wave, with Mr Speaker</h3>
		<div id="wavey" style="max-height:450px;overflow:auto;"></div>

	</div>-->

<?php
	$count = 0;
	while ( have_posts() ) : the_post();

			if( $count++ % 2 == 0) continue;

			ms_script_includes( true );
?>
			<div id="post-<?php the_ID() ?>" class="<?php veryplaintxt_post_class(); ?>">
				<h2 class="entry-title"><a href="<?php the_permalink() ?>" title="<?php printf(__('Permalink to %s', 'veryplaintxt'), wp_specialchars(get_the_title(), 1)) ?>" rel="bookmark"><?php the_title() ?></a></h2>
				<div class="entry-date"><abbr class="published" title="<?php the_time('Y-m-d\TH:i:sO'); ?>"><?php unset($previousday); printf(__('%1$s', 'veryplaintxt'), the_date('l, F j, Y', false)) ?></abbr></div>
				<div class="entry-content">
<?php the_content('<span class="more-link">'.__('Read on for more &raquo;', 'veryplaintxt').'</span>'); ?>

<?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), "</div>\n", 'number'); ?>
				</div>
				<div class="entry-meta">
					<?php //<span class="entry-category"><?php printf(__('Box: %s', 'veryplaintxt'), get_the_category_list(', ') ) ? ></span> ?>
					<span class="entry-tags"><?php the_tags(__('| Tag: ', 'veryplaintxt'), ", ", "") ?></span>
					<?php //<span class="meta-sep">|</span> ?>
<?php edit_post_link(__('Edit', 'veryplaintxt'), "\t\t\t\t\t<span class='entry-edit'>", "</span>\n\t\t\t\t\t<span class='meta-sep'>|</span>\n"); ?>
					<span class="entry-comments"><?php comments_popup_link(__('Comments (0)', 'veryplaintxt'), __('Comments (1)', 'veryplaintxt'), __('Comments (%)', 'veryplaintxt')) ?></span>
				</div>
				<?php
					ms_script_includes( false );
				?>
			</div><!-- .post -->

<?php endwhile ?>
		<div id="nav-below" class="navigation">
			<div class="nav-previous"><?php next_posts_link(__('&lsaquo; Older posts', 'veryplaintxt')) ?></div>
			<div class="nav-next"><?php previous_posts_link(__('Newer posts &rsaquo;', 'veryplaintxt')) ?></div>
		</div>
</div>
<?php //get_sidebar()
?>
	<div style="clear:both"></div>
	</div><!--close wrapper-->
<?php get_footer() ?>