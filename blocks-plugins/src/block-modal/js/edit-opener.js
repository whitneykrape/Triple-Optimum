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
import '../css/block-modal-back-end.scss';

export default function EditOpener( { attributes, setAttributes, isSelected, clientId } ) {
	const listModalBodies = () => {
		let $arrayOfModelBodies = document.querySelectorAll('.modalbody');
		$arrayOfModelBodies = Array.from($arrayOfModelBodies);
		$arrayOfModelBodies = $arrayOfModelBodies.map(
			(elementObject, index) => {
				console.log('elementObject')
				console.log(elementObject)

				return index.toString()
			}
		)
		$arrayOfModelBodies.unshift('Select an Option');

		console.log('$arrayOfModelBodies')
		console.log($arrayOfModelBodies)

		// $arrayOfModelBodies = ["modalbody01"];

		return $arrayOfModelBodies
	}

	// console.log(listModalBodies())

	return (
		<div {...useBlockProps()}>
			<Placeholder
				label={ __( 'Modal Opener', 'gutenpride' ) }
				instructions={ __( 'First element triggers modal body.', 'gutenpride' ) }
				className={ __( 'modalopener', 'gutenpride' ) }
			>
				<div data-openModalBody={ attributes.openModalBody }>
					<InnerBlocks/>
				</div>

				<InspectorControls>
						<PanelBody
							title={__('Properties','bod-modal')}
							initialOpen={false}
							className="bod-form"
						>
							{ listModalBodies().length > 1 ?
								<SelectControl
									label={__('Open Modal','bod-modal')}
									value={ attributes.openModalBody }
									// Map of Modal Bodies
									options= {
										listModalBodies().map(
											(bodyName) => {
												return { label: __(bodyName,'bod-modal'), value: bodyName }
											}
										)
									}
									
									onChange={ content => setAttributes({ openModalBody: content }) }
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