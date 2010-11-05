<div class="comments">
<?php
	$req = get_settings('require_name_email'); // Checks if fields are required
	if ( 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']) )
		die ( 'Please do not load this page directly. Thanks!' );
	if ( ! empty($post->post_password) ) :
		if ( $_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password ) :
?>
	<div class="nopassword"><?php _e('Enter the password to view comments to this post.', 'veryplaintxt') ?></div>
</div>
<?php
			return;
		endif;
	endif;
?>
<?php if ( $comments ) : ?>
<?php
$ping_count = $comment_count = 0;
foreach ( $comments as $comment )
	get_comment_type() == "comment" ? ++$comment_count : ++$ping_count;
?>

<?php if ( $comment_count ) : ?>

	<p class="button pink" id="numcomments"><?php echo $comment_count ?></p>
	<ol id="comments" class="commentlist">
<?php wp_list_comments(); ?>

	</ol>

<?php endif; ?>

<?php endif ?>

<?php if ( 'open' == $post->comment_status ) : ?>

<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
	<div id="mustlogin"><?php printf(__('You must be <a href="%s" title="Log in">logged in</a> to post a comment.', 'veryplaintxt'),
			get_option('siteurl') . '/wp-login.php?redirect_to=' . get_permalink() ) ?></div>

<?php else : ?>

	<div class="formcontainer">	

		<form id="commentform" action="<?php echo get_option('siteurl'); ?>/wp-comments-post-nospam.php" method="post">

<?php if ( $user_ID ) : ?>

			<div id="loggedin"><?php printf(__('Logged in as <a href="%1$s" title="View your profile" class="fn">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>', 'veryplaintxt'),
					get_option('siteurl') . '/wp-admin/profile.php',
					wp_specialchars($user_identity, true),
					get_option('siteurl') . '/wp-login.php?action=logout&amp;redirect_to=' . get_permalink() ) ?></div>

<?php else : ?>
			<div class="form-label"><label for="author"><?php _e('Name', 'veryplaintxt') ?></label> <?php if ($req) _e('<span class="req-field">*</span>', 'veryplaintxt') ?></div>
			<div class="form-input"><input id="author" name="author" type="text" value="<?php echo $comment_author ?>" size="30" maxlength="20" tabindex="3" /></div>

			<div class="form-label"><label for="email"><?php _e('Email', 'veryplaintxt') ?></label> <?php if ($req) _e('<span class="req-field">*</span>', 'veryplaintxt') ?></div>
			<div class="form-input"><input id="email" name="email" type="text" value="<?php echo $comment_author_email ?>" size="30" maxlength="50" tabindex="4" /></div>

			<div class="form-label"><label for="url"><?php _e('Website', 'veryplaintxt') ?></label></div>
			<div class="form-input"><input id="url" name="url" type="text" value="<?php echo $comment_author_url ?>" size="30" maxlength="50" tabindex="5" /></div>
<?php endif ?>


			<div class="form-label"><label for="comment"><?php _e('Comment', 'veryplaintxt') ?></label></div>
			<div class="form-textarea"><textarea id="comment" name="comment" cols="45" rows="8" tabindex="7"></textarea></div>

        	<div class="form-label">Captcha! Please type "lol" <span class="req-field">*</span></div>
        	<div class="form-input>"><input type="text" tabindex="6" name="captchab" id="captchat" maxlength="20" size="30" /></div>
             <?php comment_id_fields(); ?> 
			<div class="form-submit"><input id="submit" name="submit" onclick="if(document.getElementById('captchat').value.length==0){alert('Please type \'lolz\' into the lame captcha box!');document.getElementById('captchat').focus();return false;}" type="submit" value="<?php _e('Submit comment', 'veryplaintxt') ?>" tabindex="8" /><input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" /></div>

<?php do_action('comment_form', $post->ID); ?>

		</form>
	</div>

<?php endif ?>
<?php endif ?>

</div>