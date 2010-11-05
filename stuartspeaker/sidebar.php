		
		<div id="primary" class="sidebar">
			
			<ul>
<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : // Begin Widgets; displays widgets or default contents below ?>

				<li id="search" class="hentry">
					<form id="searchform" method="get" action="<?php bloginfo('home') ?>">
							<p>You find yourself in the bowels of the <a href="http://www.mrspeaker.net/" title="Mr Speaker's Hompage">Hompage</a> of <?php veryplaintxt_admin_hCard(); ?>.
							In a darkened corner sits a trunk containing <a href="/javascript" title="JavaScript experiments">JavaScript tidbits</a>. 
							Exits are <a href="<?php bloginfo('home') ?>" title="<?php echo wp_specialchars(get_bloginfo('name'), 1) ?>"><?php _e('Home', 'veryplaintxt') ?></a>
							and <input id="searchsubmit" name="searchsubmit" type="submit" value="<?php _e('Search', 'veryplaintxt') ?>" /><input id="s" name="s" type="text" value="<?php echo wp_specialchars(stripslashes($_GET['s']), true) ?>" size="10" />
							.
							To the west lies an <a href="<?php bloginfo('rss2_url') ?>" title="<?php echo wp_specialchars(get_bloginfo('name'), 1) ?> RSS 2.0 Feed" rel="alternate" type="application/rss+xml"><?php _e('RSS Feed', 'veryplaintxt') ?></a>.
							</p>
							<span class="lolblink">?&gt;<blink>_</blink></span>
					</form>
				</li>
								
				<li class="hentry" id="twitterList">
					<h3 style="margin-top:-20px"><a href="http://www.twitter.com/mrspeaker" title="Mr Speaker on twitter"><img style="vertical-align:middle;" src="<?php bloginfo('template_directory'); ?>/images/icon-twitter.png" alt="twitter"/></a> 'lil messages by <a href="http://www.twitter.com/mrspeaker" title="Mr Speaker on twitter">Mr Speaker</a></h3>
					<?php twitter_messages('mrspeaker', 3, true, false, '&raquo;', true, true, true); ?>
				</li>
<?php 
//wp_list_pages('title_li=<h3>'.__('Contents').'</h3>&sort_column=post_title' ) 
?>
<!--
				<li id="categories">
					<h3><?php _e('Categories', 'veryplaintxt'); ?></h3>
					<ul>
<?php wp_list_categories('title_li=&orderby=name&use_desc_for_title=1&hierarchical=1') ?>

					</ul>
				</li>

				<li id="tag-cloud">
					<h3><?php _e('Tags', 'veryplaintxt'); ?></h3>
					<p><?php wp_tag_cloud() ?></p>
				</li>

				</li>

				<li id="meta">
					<h3><?php _e('Meta', 'veryplaintxt') ?></h3>
					<ul>
						<?php wp_register() ?>
						<li><?php wp_loginout() ?></li>
						<?php wp_meta() // Do not remove; helps plugins work ?>
					</ul>
				</li>
-->
<?php endif; // End Widgets ?>

			</ul>
			<ul>
				<li class="hentry">
				<h3><?php _e('Spiffy things from <em>Internet</em>'); ?></h3>
				<?php // Get RSS Feed(s)
				$rss = fetch_feed('http://feeds.delicious.com/v2/rss/mrspeaker/_blog?count=5');
				$maxitems = 3;
				$items = array_slice($rss->get_items(), 0, $maxitems);
				?>

				<ul id="cool_things">
				<?php if (empty($items)) echo '<li>No items</li>';
				else
				foreach ( $items as $item ) : 
					$summary = $item->get_description();//['summary'];
					list($desc, $image) = split("[\|]", $summary);
				?>
					<li>
						<?php
							if($image != '')
							{
								?><img src="<?php echo $image ?>" alt="<?php echo $item->get_title();//['title']; ?>" /><?
							}
						?>
						<a href='<?php echo $item->get_permalink(); ?>' title='<?php echo $item->get_title(); ?>'><?php echo $item->get_title(); ?></a><br/>
						<?php echo $desc; ?>
					</li>
				<?php endforeach; ?>
				</ul>
				<br class="cleaner" />
				</li>
			</ul>
			<ul>
				<li>
					<h3>Some awesome posts from around these parts</h3>
	<?php
	
	// Get the last 10 posts in the special_cat category.
	   query_posts('category_name=Featured&showposts=2'); ?>

	  <?php while (have_posts()) : the_post(); ?>

					<div id="post-<?php the_ID() ?>" class="<?php veryplaintxt_post_class(); ?>">
						<h2 class="entry-title"><a href="<?php the_permalink() ?>" title="<?php printf(__('Permalink to %s', 'veryplaintxt'), wp_specialchars(get_the_title(), 1)) ?>" rel="bookmark"><?php the_title() ?></a></h2>
						<div class="entry-date"><abbr class="published" title="<?php the_time('Y-m-d\TH:i:sO'); ?>"><?php unset($previousday); printf(__('%1$s', 'veryplaintxt'), the_date('l, F j, Y', false)) ?></abbr></div>
						<div class="entry-content">
	
							<?php
							global $more;
							$more = 0;
							?>
		
		<?php the_content('<span class="more-link">'.__('Read on for more &raquo;', 'veryplaintxt').'</span>'); ?>
		

		<?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), "</div>\n", 'number'); ?>
						</div>
					</div><!-- .post -->

		<?php endwhile ?>


			</ul>
			
		</div><!-- #primary .sidebar -->