<?php
/**
 * Plugin Name: Wooden Custom Blocks
 * Author: Form Function IO
 * Version: .0.0.1
 *
 */
  
function loadArticleBlock() {
  wp_enqueue_script(
    'article-block',
    plugin_dir_url(__FILE__) . 'article-block.js',
    array('wp-blocks','wp-editor'),
    true
  );
}
   
add_action('enqueue_block_editor_assets', 'loadArticleBlock');
