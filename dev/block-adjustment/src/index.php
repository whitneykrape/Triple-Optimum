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


  wp_register_style(
    'gutenberg-examples-02-editor',
    plugins_url( 'editor.css', __FILE__ ),
    array( 'wp-edit-blocks' ),
    filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
  );

  wp_register_style(
    'gutenberg-examples-02',
    plugins_url( 'block.css', __FILE__ ),
    array( ),
    filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
  );

  // Allow inlining small stylesheets on the frontend if possible.
  wp_style_add_data( 'gutenberg-examples-02', 'path', dirname( __FILE__ ) . '/style.css' );

  register_block_type( 'wooden-blocks/article-block-es6', array(
      'api_version' => 2,
      'editor_script' => 'article-block-es6-script',
  ) );
}
   
add_action('enqueue_block_editor_assets', 'loadArticleBlock');
