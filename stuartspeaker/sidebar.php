		
		<div id="primary" class="sidebar">
			
			<ul>
<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : // Begin Widgets; displays widgets or default contents below ?>

				<li id="search" class="hentry">
					<form id="searchform" method="get" action="<?php bloginfo('home') ?>">
							<p class="intro">You find yourself in the bowels of the <a href="http://www.mrspeaker.net/" title="Mr Speaker's Hompage">Hompage</a> of <?php veryplaintxt_admin_hCard(); ?>.
							In a darkened corner sits a trunk containing <a href="/javascript" title="JavaScript experiments">JavaScript tidbits</a>. 
							Exits are <a href="<?php bloginfo('home') ?>" title="<?php echo wp_specialchars(get_bloginfo('name'), 1) ?>"><?php _e('Home', 'veryplaintxt') ?></a>
							and <input id="searchsubmit" name="searchsubmit" type="submit" value="<?php _e('Search', 'veryplaintxt') ?>" /><input id="s" name="s" type="text" value="<?php echo wp_specialchars(stripslashes($_GET['s']), true) ?>" size="10" /><br/>
							To the west lies an <a href="<?php bloginfo('rss2_url') ?>" title="<?php echo wp_specialchars(get_bloginfo('name'), 1) ?> RSS 2.0 Feed" rel="alternate" type="application/rss+xml"><?php _e('RSS Feed', 'veryplaintxt') ?></a>.
							</p>
							<span class="lolblink">?&gt;<blink>_</blink></span>
					</form>
					
						<div id="nav-below" class="navigation">
      				<div class="nav-previous"><?php previous_post_link(__('&lsaquo; %link', 'veryplaintxt'), '%title', false, '15') ?></div>
      				<div class="nav-next"><?php next_post_link(__('%link &rsaquo;', 'veryplaintxt'), '%title',false, '15') ?></div>
      				<br class="cleaner" />
      			</div>
  				</li>

  				<li class="hentry" id="twitterList">
  					<h3 style="margin-top:-20px"><a href="http://www.twitter.com/mrspeaker" title="Mr Speaker on twitter"><img style="vertical-align:middle;" src="<?php bloginfo('template_directory'); ?>/images/icon-twitter.png" alt="twitter"/></a> 'lil messages by <a href="http://www.twitter.com/mrspeaker" title="Mr Speaker on twitter">Mr Speaker</a></h3>
  					<?php twitter_messages('mrspeaker', 3, true, false, '&raquo;', true, true, true); ?>
  				</li>

				<li>
					<h3 style="margin-top:0px">A book by Mr Speaker (and Mr Sharkie)</h3>
  					<a href="http://www.sitepoint.com/books/jquery1/">
  						<img src="/images/jQuery-ninja.jpg" alt="jQuery: Novice to Ninja" />
  					</a>
  				</li>

<?php endif; // End Widgets ?>

			</ul>

			
		</div><!-- #primary .sidebar -->