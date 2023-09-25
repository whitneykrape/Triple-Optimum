<?php

/**
 * Plugin Name: Blocks Beyond Single Elements
 * Plugin URI: No page yet
 * Description: Additional Gutenberg block.
 * Author: Fom Function IO
 * Version: .001
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package blocksbeyond
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';