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
import './css/block-modal-back-end.scss';

/**
 * Internal dependencies
 */
import EditContent from './js/edit-content';
import SaveContent from './js/save-content';
import EditOpener from './js/edit-opener';
import SaveOpener from './js/save-opener';
import metadata from './block.json';


import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./js/edit.js
	 */
	edit: EditContent,

	/**
	 * @see ./js/save.js
	 */
	save: SaveContent,
});

const blockAttributes = {
	openModalBody: {
		type: "string",
		default: "Select an Option"
	}
}

// Move this out when more developed
registerBlockType("stitchedblocks/block-modal-opener", {
	title: __( 'Modal Opener', 'stitch-tab' ), // Block title.
	attributes: blockAttributes,
	/**
	 * @see ./js/edit.js
	 */
	edit: EditOpener,

	/**
	 * @see ./js/save.js
	 */
	save: SaveOpener,
});