/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './css/block-modal-front-end.scss';

/**
 * Internal dependencies
 */
import EditContent from './js/edit-content';
import SaveContent from './js/save-content';
import EditOpener from './js/edit-opener';
import SaveOpener from './js/save-opener';
import metadataContent from './block.json';
import metadataOpener from './block-opener.json';


import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadataContent.name, {
	title: __( metadataContent.title, 'stitch-tab' ), // Block title.
	attributes: metadataContent.attributes,
	/**
	 * @see ./js/edit-content.js
	 */
	edit: EditContent,

	/**
	 * @see ./js/save-content.js
	 */
	save: SaveContent,
});

// Move this out when more developed
registerBlockType(metadataOpener.name, {
	title: __( metadataOpener.title, 'stitch-tab' ), // Block title.
	attributes: metadataOpener.attributes,
	icon: metadataOpener.icon,
	/**
	 * @see ./js/edit-opener.js
	 */
	edit: EditOpener,

	/**
	 * @see ./js/save-opener.js
	 */
	save: SaveOpener,
});