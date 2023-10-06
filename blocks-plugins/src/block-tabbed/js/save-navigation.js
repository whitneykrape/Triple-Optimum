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

export default function SaveNavigation( { attributes } ) {
	return (
		// <div {...useBlockProps.save()}>
			<div className='sttb1__tabbedNavigator' data-sttb1__tabbednavid={ attributes.sttb1__tabbednavid }>
				<InnerBlocks.Content />
			</div>
		// </div>
	);
}