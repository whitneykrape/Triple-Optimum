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

export default function SaveContent( { attributes } ) {
    const blockProps = useBlockProps.save();
    return <div { ...blockProps }>
		{ attributes.message }

		<div className="block-popup-overlay"></div>
			
		<div role="dialog" aria-modal="false" aria-labelledby="" aria-describedby="" className="block-popup-wrap">
			<div className='modalBody'>
				{<InnerBlocks.Content/>}
			</div>
		</div>
	</div>;
}

