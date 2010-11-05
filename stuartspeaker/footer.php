	<div id="footer">
		<?php //veryplaintxt_admin_hCard(); ?>
		
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
<?php wp_footer() // Do not remove; helps plugins work ?>

</div><!-- #wrapper -->
<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
	try {
	var pageTracker = _gat._getTracker("UA-8233321-1");
	pageTracker._trackPageview();
	} catch(err) {}
</script>
</body><!-- end trasmission -->
</html>