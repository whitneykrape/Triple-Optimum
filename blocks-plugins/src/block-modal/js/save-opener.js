/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function SaveOpener( { attributes } ) {

	return (
		<div {...useBlockProps.save()} className="sttb01mb">
			<div className='sttb01mb__modalopener' data-sttb1__modalid={ attributes.sttb1__modalid }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};