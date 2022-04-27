<?php

/**
 * Plugin Name: Article Block
 * Plugin URI: 
 * Description: 
 * Version: 0.0.1
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

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }
  register_block_type( __DIR__ );

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
