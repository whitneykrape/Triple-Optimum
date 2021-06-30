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
    plugin_dir_url(__FILE__) . 'wood-block.js',
    array('wp-blocks','wp-editor'),
    true
  );

  wp_enqueue_script(
    'article-block-es6',
    plugins_url( 'wood-block-es6.js', __FILE__ ),
    plugin_dir_url(__FILE__) . 'wood-block-es6.js',
    array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor' )
  );

  register_block_type( 'wooden-blocks/article-block-es6', array(
      'api_version' => 2,
      'editor_script' => 'article-block-es6-script',
  ) );
}
   
add_action('enqueue_block_editor_assets', 'loadArticleBlock');
