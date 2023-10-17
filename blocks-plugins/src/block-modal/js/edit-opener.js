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

export default function EditOpener( { attributes, setAttributes, isSelected, clientId } ) {
	let modalControlBlocks = {} 

	
	// List out the potential Content elements.
	const listModalBodies = () => {
		// Variables, defines scope and allows testing.
		let arrayOfModelBodies

		// Get all the Content elements to start from. 
		// Roadmap, don't use classes for getting.
		arrayOfModelBodies = document.querySelectorAll('.modalbody')

		// Arrange an array and iterate.
		arrayOfModelBodies = Array.from(arrayOfModelBodies)
		arrayOfModelBodies = arrayOfModelBodies.map(
			(element, elementIndex) => {
				// Get each element's index, split it, and send it out. 
				return elementIndex.toString()
			}
		)
		// Add a Default Option (so nothing auto sets.)
		arrayOfModelBodies.unshift('Select an Option');
		
		// Done, list of indices to use. 
		return arrayOfModelBodies
	}


	return (
		<div {...useBlockProps()}>
			<Placeholder
				label={ __( 'Modal Opener', 'modalopener' ) }
				instructions={ __( 'First element triggers modal body.', 'modalopener' ) }
				className={ __( 'modalopener', 'modalopener' ) }
			>
				<div data-sttb1__modalid={ attributes.sttb1__modalid }>
					<InnerBlocks/>
				</div>

				<InspectorControls>
						<PanelBody
							title={__('Properties','modalopener')}
							initialOpen={false}
							className="sttb1__panelbody"
						>
							{ listModalBodies().length > 1 ?
								<SelectControl
									label={__('Open Modal','modalopener')}
									value={ attributes.sttb1__modalid }
									options= {
										listModalBodies().map(
											(bodyName) => {
												return { label: __(bodyName,'modalopener'), value: bodyName }
											}
										)
									}
									
									onChange={ content => setAttributes({ sttb1__modalid: content }) }
									/>
							:
								<span>No Model Bodies to Link to!</span>
							}

						</PanelBody>

				</InspectorControls>
			</Placeholder>
		</div>
	);
}