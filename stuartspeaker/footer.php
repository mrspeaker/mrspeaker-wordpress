	<div id="footer">
		<ul id="footCol1" class="footCol">
			<li id="categories">
				<h3><?php _e('Categories', 'veryplaintxt'); ?></h3>
				<ul>
					<?php wp_list_categories('title_li=&orderby=name&use_desc_for_title=1&hierarchical=1') ?>
				</ul>
			</li>
		</ul>

		<ul id="footCol2" class="footCol">
			<?php wp_list_bookmarks('title_before=<h3>&title_after=</h3>') ?>
		</ul>

		<ul id="footCol3" class="footCol">
			<li>
				<h3><?php _e('Roundabout', 'veryplaintxt'); ?></h3>
				<ul>
					<li><?php veryplaintxt_admin_hCard(); ?></li>
					<li><a href="<?php echo get_settings('home') ?>/" title="<?php bloginfo('name') ?>">Hompage</a></li>
				</ul>
			</li>
		</ul>

		<ul id="footCol4" class="footCol">
			<li id="archives">
				<h3><?php _e('Archives', 'veryplaintxt') ?></h3>
				<ul>
					<?php wp_get_archives('type=yearly&show_post_count=1') ?>
				</ul>
			</li>
			<li class="fcCol4">
				---------------
			</li>
			<li class="fcCol4">
				<span id="arcYear">12039</span>&nbsp;(<span id="arcTot">lots</span>)
			</li>
		</ul>

	</div><!-- #footer -->
	<br style="clear:both" />
<?php wp_footer() ?>

</div><!-- #wrapper -->

<script type="text/javascript" src="/scripts/underscore.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/scripts/jquery.oneup.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/scripts/speaker.js"></script>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8233321-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
<script src="<?php bloginfo('template_directory'); ?>/scripts/Three-Detector.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/scripts/threen.js"></script>
</body><!-- end trasmission -->
</html>