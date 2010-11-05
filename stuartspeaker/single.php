<?php
  $post = $wp_query->post;

  if ( ! in_category('15') ) {
      include(TEMPLATEPATH . '/single-main.php');
  } else {
      include(TEMPLATEPATH . '/single-intresting.php');
  }
?>