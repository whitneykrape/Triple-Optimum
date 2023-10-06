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
		// Get all the options from potential Navigation Blocks
		let arrayOfTabbedNavigation = document.querySelectorAll('.sttb1__tabbedNavigator')
		// Make a nice array
		arrayOfTabbedNavigation = Array.from(arrayOfTabbedNavigation)
		// Set this out for a dropdown
		arrayOfTabbedNavigation = arrayOfTabbedNavigation.map(
			(element, elementIndex) => {
				// Important, this needs to have the same dataset property from it's associated plugin
				return element.dataset.sttb1__tabbednavid
			}
		)
		// Add a Default Option (so nothing auto sets)
		arrayOfTabbedNavigation.unshift('Select an Option');
		// Done!
		return arrayOfTabbedNavigation
	}
	
	
    return (
        <div { ...useBlockProps() }>
            <Placeholder
                label={ __( 'Tab Content', 'tabbedcontent' ) }
                instructions={ __( 'First element opens a modal of the second element.', 'tabbedcontent' ) }
				className={ __( 'tabbedcontent' ) }
            >

				<InnerBlocks/>

				<InspectorControls>
							<PanelBody
								title={__('Connection','tabbedcontent')}
								initialOpen={false}
								className="sttb1__form"
							>
								{ listTabbedNavigation().length > 1 ?
									<SelectControl
										label={__('Navigation to Use','tabbedcontent')}
										// This gets output to the frontend
										value={ attributes.sttb1__tabbedlink }
										// From the function above layout the potential options
										options= {
											listTabbedNavigation().map(
												(bodyName) => {
													return { label: __(bodyName,'tabbedcontent'), value: bodyName }
												}
											)
										}
										// When the option is changed set the datasrc 
										onChange={ content => setAttributes({ sttb1__tabbedlink: content }) }
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

