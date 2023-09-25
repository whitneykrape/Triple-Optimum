<?php

function create_block_gutenpride_block_init() {
	# wp_register_script(
	# 	'bod-modal-block-js', // Handle.
	# 	plugins_url( '/dist/modal.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
	# 	array( 'jquery' ), // Dependencies, defined above.
	# 	filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
	# 	true // Enqueue the script in the footer.
	# );

	register_block_type( plugin_dir_path( __DIR__ ) . '/build/block-modal/' );
}
add_action( 'init', 'create_block_gutenpride_block_init' );