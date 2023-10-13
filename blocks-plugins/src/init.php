<?php

function create_block_stitchedblocks_modal() {
	// Yes! Need the style registered here. But not building yet.
	wp_register_style(
		'block-modal-front-end', // Handle.
		plugins_url( './build/block-modal/style-index.css', dirname( __FILE__ ) ), // Block style CSS.
		array(  ) // Dependency to include the CSS after it.
	);

	// Backend styles
	wp_register_style(
		'block-modal-back-end', // Handle.
		plugins_url( './build/block-modal/index.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-edit-blocks' , 'wp-editor' ) // Dependency to include the CSS after it.
	);

	register_block_type( 
		plugin_dir_path( __DIR__ ) . '/build/block-modal/', array(
			// Enqueue css on both frontend & backend?
			'style'         => 'block-modal-front-end',
			// Enqueue blocks.editor.build.css in the editor only?
			'editor_style'  => 'block-modal-back-end',
		)
	);
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

