/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks, PlainText } from '@wordpress/block-editor';
import { SelectControl, PanelBody, Placeholder, TextControl } from '@wordpress/components';

export default function EditContent( { attributes, setAttributes, isSelected, clientId } ) {

	// function checkInnerblockSelected () {
	// 	const select = wp.data.select('core/block-editor')
	// 	const isParentOfSelectedBlock = select.hasSelectedInnerBlock( clientId, true )
	// 	return (isParentOfSelectedBlock ? true : false)
	// }
	// 
	// const dispTitleInnerBlock = (blockSelected) => {
	// 	if (blockSelected || checkInnerblockSelected()) {
	// 		return (
	// 			<div>			
	// 				<label>{__('Modal Content:','modalcontent')}</label>
	// 				<div className="">
	// 					<InnerBlocks
	// 						allowedBlocks={allowedBlocks}
	// 					/>
	// 				</div>
	// 			</div>
	// 		)
	// 	} else {
	// 		return null
	// 	}
	// }
	//
	// const allowedBlocks = ["stitchedblocks/block-modal-content"]
	
    return (
        <div { ...useBlockProps() }>
            <Placeholder
                label={ __( 'Modal Body', 'modalcontent' ) }
                instructions={ __( 'Add modal contents here.', 'modalcontent' ) }
				className={ __( 'modalbody', 'modalcontent' ) }
            >

				<InnerBlocks/>

            </Placeholder>
        </div>
    )
}

