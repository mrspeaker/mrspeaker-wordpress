<?php get_header() ?>

    <main>

      <form method="get" action="/">
        <div class="intro">
          <p>
            <img src="/images/mrspeaker_400x400.png" style="width:130px;border:0;border-radius:11px;" alt="mrspeaker's head in a monitor" class="frame-right" />
            <span>
              You find yourself at the entrance to the Hompage of
              <?php veryplaintxt_admin_hCard(); ?>.
            </span>
            <span>
              In a darkened corner sits a trunk containing
              <a href="/games" style="font-size:24pt" title="HTML5 games">HTML5 games</a>
              and some <a href="/javascript" title="JavaScript experiments">JavaScript tidbits</a>.
            </span>
            <span>
              Next to it you spy a
              <span style="font-size:24pt;color:hsl(196, 100%, 47%);" title="[redacted]">■■■■■■■</span>
              account.
            </span>
            <span>
              Exits are North, East, and
              <input id="searchsubmit" name="searchsubmit" type="submit" value="<?php _e('Search', 'veryplaintxt') ?>" />
              <input id="s" name="s" type="text" value="<?php echo wp_specialchars(stripslashes($_GET['s']), true) ?>" size="10" />.
            </span>
          </p>
          <nav class="categories">
<?php wp_list_categories(array(
    'title_li' => NULL,
    'style' => '',
    'separator' => '&nbsp;.',
    'show_count'=> 1)
) ?>
          </nav>
      </div>
    </form>

<?php
  while ( have_posts() ) : the_post();
    ms_script_includes( true );
?>
      <!-- Amazing Mr Speaker article coming up -->
      <article id="post-<?php the_ID() ?>" class="<?php veryplaintxt_post_class();?> wonky-<?php the_ID() ?>">
        <h2 class="entry-title">
          <a href="<?php echo wp_make_link_relative(get_permalink()) ?>" rel="bookmark"><?php the_title() ?></a>
        </h2>
        <div class="entry-content">

          <?php the_content('<span class="more-link">'.__('Read on for more &raquo;', 'veryplaintxt').'</span>'); ?>

          <?php link_pages('<div class="page-link">'.__('Pages: ', 'veryplaintxt'), "</div>\n", 'number'); ?>

        </div>

        <div class="entry-meta">
          <span class="entry-tags"><?php the_tags(__('| Tag: ', 'veryplaintxt'), ", ", "") ?></span>
          <?php edit_post_link(__('Edit', 'veryplaintxt'), "<span class='entry-edit'>", "</span><span class='meta-sep'>|</span>\n");
?><span class="entry-comments"><?php comments_popup_link(__('Comments (0)', 'veryplaintxt'), __('Comments (1)', 'veryplaintxt'), __('Comments (%)', 'veryplaintxt')) ?></span>
        </div>

<?php
ms_script_includes( false );
?>
      </article>

<?php
  endwhile
?>
      <nav>

        <?php if( get_next_posts_link() ) : ?><div class="nav-previous"><?php next_posts_link(__('&lsaquo; The past', 'veryplaintxt')) ?></div><?php endif ?>
        <?php if( get_previous_posts_link() ) : ?><div class="nav-next"><?php previous_posts_link(__('The future &rsaquo;', 'veryplaintxt')) ?></div><?php endif ?>

      </nav>

    </main>

<?php get_footer() ?>
