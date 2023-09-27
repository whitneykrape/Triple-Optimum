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
import '../css/block-tabbed-back-end.scss';

export default function EditContent( { attributes, setAttributes, isSelected, clientId } ) {

	const listTabbedNavigation = () => {
		let $arrayOfTabbedNaviation = document.querySelectorAll('.tabNavProperties');
		$arrayOfTabbedNaviation = Array.from($arrayOfTabbedNaviation);
		$arrayOfTabbedNaviation = $arrayOfTabbedNaviation.map(
			(elementObject, index) => {
				console.log('elementObject')
				console.log(elementObject)

				return elementObject.dataset.tabnavigationidentifier
			}
		)
		$arrayOfTabbedNaviation.unshift('Select an Option');

		console.log('$arrayOfTabbedNaviation')
		console.log($arrayOfTabbedNaviation)

		// $arrayOfTabbedNaviation = ["modalbody01"];

		return $arrayOfTabbedNaviation
	}
	
	
    return (
        <div { ...useBlockProps() }>
            <Placeholder
                label={ __( 'Tab Content', 'gutenpride' ) }
                instructions={ __( 'First element opens a modal of the second element.', 'gutenpride' ) }
				className={ __( 'tabbedcontent' ) }
            >

				<InnerBlocks/>

				<InspectorControls>
							<PanelBody
								title={__('Connection','bod-modal')}
								initialOpen={false}
								className="bod-form"
							>
								{ listTabbedNavigation().length > 1 ?
									<SelectControl
										label={__('Show On','bod-modal')}
										value={ attributes.controlledBy }
										// Map of Modal Bodies
										options= {
											listTabbedNavigation().map(
												(bodyName) => {
													return { label: __(bodyName,'bod-modal'), value: bodyName }
												}
											)
										}
										
										onChange={ content => setAttributes({ controlledBy: content }) }
										/>
								:
									<span>No Tabbed Navigation for Control!</span>
								}

							</PanelBody>

					</InspectorControls>

            </Placeholder>
        </div>
    );
}

