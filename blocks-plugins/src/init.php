<?php

function create_block_stitchedblocks_modal() {
	wp_register_style(
		'block-modal-front-end', // Handle.
		plugins_url( '../build/block-modal/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array(  ) // Dependency to include the CSS after it.
	);

	// Backend styles
	wp_register_style(
		'block-modal-back-end', // Handle.
		plugins_url( '../build/block-modal/blocks.editor.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-edit-blocks' , 'wp-editor' ) // Dependency to include the CSS after it.
	);

	register_block_type( plugin_dir_path( __DIR__ ) . '/build/block-modal/' );
}
add_action( 'init', 'create_block_stitchedblocks_modal' );

function create_block_stitchedblocks_tabbed() {
	# wp_register_script(
	# 	'bod-modal-block-js', // Handle.
	# 	plugins_url( '/dist/modal.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
	# 	array( 'jquery' ), // Dependencies, defined above.
	# 	filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
	# 	true // Enqueue the script in the footer.
	# );

	register_block_type( plugin_dir_path( __DIR__ ) . '/build/block-tabbed/' );
}
add_action( 'init', 'create_block_stitchedblocks_tabbed' );

