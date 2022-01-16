( function( blocks, i18n, element, blockEditor ) {
	var el = element.createElement;
	var __ = i18n.__;

	var useBlockProps = blockEditor.useBlockProps;

	blocks.registerBlockType( 'block-article/article-block', {
		title: __( 'Triple Optimum: Article', 'block-article' ),
		icon: 'universal-access-alt',
		category: 'layout',
		example: {},
		edit: function( props ) {
			return el(
				'p',
				useBlockProps( { className: props.className } ),
				__( 'Hello World, step 2 (from the editor, in green).', 'block-article' )
			);
		},
		save: function() {
			return el(
				'p',
				useBlockProps.save(),
				__( 'Hello World, step 2 (from the frontend, in red).', 'block-article' )
			);
		},
	} );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );
