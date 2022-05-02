<?php
/**
 * NewWebsite-2022: Block Patterns
 *
 * @since NewWebsite 0.5
 */

/**
 * Registers block patterns and categories.
 *
 * @since NewWebsite_2022 0.5
 *
 * @return void
 */
function NewWebsite_2022_register_block_patterns() {
	$block_pattern_categories = array(
		'newwebsite'    => array( 'label' => __( 'NewWebsite', 'NewWebsite-2022' ) ),
		// 'featured' => array( 'label' => __( 'Featured', 'NewWebsite-2022' ) ),
		'footer'   => array( 'label' => __( 'Footers', 'NewWebsite-2022' ) ),
		'header'   => array( 'label' => __( 'Headers', 'NewWebsite-2022' ) ),
		'query'    => array( 'label' => __( 'Query', 'NewWebsite-2022' ) ),
		'pages'    => array( 'label' => __( 'Pages', 'NewWebsite-2022' ) ),
	);

	/**
	 * Filters the theme block pattern categories.
	 *
	 * @since NewWebsite_2022 0.5
	 *
	 * @param array[] $block_pattern_categories {
	 *     An associative array of block pattern categories, keyed by category name.
	 *
	 *     @type array[] $properties {
	 *         An array of block category properties.
	 *
	 *         @type string $label A human-readable label for the pattern category.
	 *     }
	 * }
	 */
	$block_pattern_categories = apply_filters( 'NewWebsite_2022_block_pattern_categories', $block_pattern_categories );

	foreach ( $block_pattern_categories as $name => $properties ) {
		if ( ! WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $name ) ) {
			register_block_pattern_category( $name, $properties );
		}
	}

	$block_patterns = array(
		// 'footer-default',
		// 'header-default',
		// 'hidden-404',
		// 'page-layout-two-columns',
		// 'query-default',
		'newwebsite-blockpattern',
	);

	/**
	 * Filters the theme block patterns.
	 *
	 * @since NewWebsite_2022 0.5
	 *
	 * @param array $block_patterns List of block patterns by name.
	 */
	$block_patterns = apply_filters( 'NewWebsite_2022_block_patterns', $block_patterns );

	foreach ( $block_patterns as $block_pattern ) {
		$pattern_file = get_theme_file_path( '/inc/patterns/' . $block_pattern . '.php' );

		register_block_pattern(
			'NewWebsite-2022-slimmed/' . $block_pattern,
			require $pattern_file
		);
	}
}
add_action( 'init', 'NewWebsite_2022_register_block_patterns', 9 );
