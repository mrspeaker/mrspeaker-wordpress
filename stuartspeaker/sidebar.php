
		<div id="primary" class="sidebar">

			<ul>
<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : // Begin Widgets; displays widgets or default contents below ?>

				<li id="search" class="hentry">
					<form id="searchform" method="get" action="<?php bloginfo('home') ?>">
							<p class="intro"><a href="http://twitter.com/mrspeaker"><img src="/images/mrspeaker_400x400.png" style="width:130px" class="frame-right" /></a>You find yourself in the bowels of the <a href="http://www.mrspeaker.net/" title="Mr Speaker's Hompage">Hompage</a> of <?php veryplaintxt_admin_hCard(); ?>.
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
            <div style="margin:-20px auto 20px 0">
              <div style="padding-bottom:10px">
                <a href="http://twitter.com/mrspeaker" style="font-size:22pt;color:hsl(196, 100%, 47%);" title="Mr Speaker on Twitter">
                  Say hello on Twitter</a>
              </div>
            </div>
  				</li>

        <li class="hentry" >
          <h3 style="margin-top:0px">Radical games by Mr Speaker</h3>
          <div style="margin-left: 30px">
            <strong>iPad &amp; iPhone</strong>
            <div style="clear:both">
              <a href="https://itunes.apple.com/us/app/wafty-man/id824792309">
                <img src="/images/wafty-side.png" style="width:40%" alt="Wafty Man for iPhone &amp; iPad" />
              </a>
              <a href="https://itunes.apple.com/us/app/mister-moonboots/id806971888">
                <img src="/images/mrmoon-side.png" style="width:40%" alt="Mister Moonboots for iPad" />
              </a>
            </div>
            <strong>HTML5 games</strong>
            <div style="clear:both;margin-left:-10px;">
              <a href="http://www.mrspeaker.net/dev/ld27">
                <img src="/images/tfsCarl.png" width="80" height="80" alt="Time Flies Straight" class="frame-left">
              </a>
              <a href="http://www.mrspeaker.net/dev/game/digibots">
                <img src="/images/digibots-level.jpg" width="80" height="80" alt="DIGIBOTS &amp CO." class="frame-left">
              </a>
              <a href="http://www.mrspeaker.net/dev/games/flappy">
                <img src="/images/fbtt.png" width="80" height="80" alt="Flappy Bird Typing Tutor" class="frame-left">
              </a>
              <a href="http://mrspeaker.net/dev/game/glowbougs">
                <img src="/images/glowbougs.jpg" width="80" height="80" alt="Glowbougs" class="frame-left">
              </a>
            </div>
            <div style="clear:both;">A <a href="http://www.mrspeaker.net/games/">a bunch more web games</a> 'n' stuff.</div>
          </div>

        </li>

				<li class="hentry" >
					<h3 style="margin-top:0px">Serious books by Mr Speaker (and friends)</h3>
  					<a href="http://www.sitepoint.com/books/jquery1/">
  						<img src="/images/jQuery-ninja.jpg" alt="jQuery: Novice to Ninja" />
  					</a>
  					<br/>
  					<a href="http://shop.oreilly.com/product/9780987247827.do">
  						<img src="/images/coffeescript-book.png" alt="Jump Start CoffeeScript" />
  					</a>
  					<!--<br/>
  					<a href="http://www.sitepoint.com/books/mobile1/">
  						<img src="/images/mobile-book.png" alt="Build Mobile Websites and Apps for Smart Devices" />
  					</a>-->
  				</li>

        <li>
          <a href="http://www.mrspeaker.net/tips">
            <img src="/images/btc.png" width="80" alt="Spare some bitcoin?" /> &lt- BTC | DOGE -&gt;
            <img src="/images/doge.png" width="80" />
          </a>
        </li>

<?php endif; // End Widgets ?>

			</ul>


		</div><!-- #primary .sidebar -->