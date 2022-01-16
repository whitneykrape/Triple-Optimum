<?php

/**
 * Plugin Name: Article Block
 * Plugin URI: 
 * Description: 
 * Version: 0.0.5
 * Author: 
 *
 * @package block_template
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'block_template_load_textdomain' );

function block_template_load_textdomain() {
	load_plugin_textdomain( 'block-article', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function block_template_register_block() {

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

  /* 
  // Not working... Does it need both to be registered then enqueued?
  wp_register_script(
    'block-article',
    plugins_url( 'build/index.js', __FILE__ ),
    $asset_file['dependencies'],
    $asset_file['version']
  );

  // This is in the dedicated file so really don't think that is needed.
  register_block_type( 'block-article/article-block', array(
    'editor_script' => 'article-block',
  ) );
  */

  wp_enqueue_script(
    'block-article',
    plugins_url( 'build/index.js', __FILE__ ),
    $asset_file['dependencies'],
    $asset_file['version']
  );

  add_editor_style( 'src/style-editor.css' );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'article-block', 'block-article' );
  }

}
add_action( 'init', 'block_template_register_block' );
