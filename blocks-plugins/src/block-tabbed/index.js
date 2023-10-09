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
import './css/block-tabbed-front-end.scss';
import './css/block-tabbed-back-end.scss';

/**
 * Internal dependencies
 */
import EditContent from './js/edit-content';
import SaveContent from './js/save-content';
import EditNavigation from './js/edit-navigation';
import SaveNavigation from './js/save-navigation';
import metadataContent from './block.json';
import metadataNavigation from './block-navigation.json';

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
registerBlockType(metadataNavigation.name, {
	title: __( metadataNavigation.title, 'stitch-tab' ), // Block title.
	attributes: metadataNavigation.attributes,
	icon: metadataNavigation.icon,
	/**
	 * @see ./js/edit-navigation.js
	 */
	edit: EditNavigation,

	/**
	 * @see ./js/save-navigation.js
	 */
	save: SaveNavigation,
});