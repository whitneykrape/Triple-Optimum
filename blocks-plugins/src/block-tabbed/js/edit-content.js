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
	let tabbedNavigationBlocks = {} 



	// List out the potential elements, children of parents, that can be clickable.
	const listTabbedSubElements = () => {
		// Variables, defines scope and allows testing.
		let arrayOfElements, arrayOfSubElements, sttb1__tabbednavid

		// Get all the parental elements to start from. 
		arrayOfElements = document.querySelectorAll('.sttb01tb__tabbednavigator')

		// Arrange an array and iterate.
		arrayOfElements = Array.from(arrayOfElements)
		arrayOfElements.map(
			(element, elementIndex) => {
				// Get the parent id to use for assigning the Global object.
				sttb1__tabbednavid = element.dataset.sttb1__tabbednavid

				// For each of the parents, get images and list items. Can be expanded later.
				arrayOfSubElements = element.querySelectorAll('img,li')

				// Arrange an array and iterate.
				arrayOfSubElements = Array.from(arrayOfSubElements)
				arrayOfSubElements = arrayOfSubElements.map(
					(subElement, subElementIndex) => {
						// Get each element's index, split it, and send it out. 
						return subElement.tagName.toLowerCase() + '#' + subElementIndex
					}
				)

				// If there is a parent element to work with add they to the Global object to use later.
				if (tabbedNavigationBlocks.hasOwnProperty(sttb1__tabbednavid))
					tabbedNavigationBlocks[sttb1__tabbednavid]['arrayOfSubElements'] = arrayOfSubElements
			}
		)
	}

	const listTabbedNavigation = () => {
		// Set up variables, defines scope and testing.
		let arrayOfTabbedNavigation, sttb1__tabbednavid
		
		// Get all the options from potential Navigation Blocks.
		arrayOfTabbedNavigation = document.querySelectorAll('.sttb01tb__tabbednavigator')

		// Arrange an array and iterate.
		arrayOfTabbedNavigation = Array.from(arrayOfTabbedNavigation)
		arrayOfTabbedNavigation = arrayOfTabbedNavigation.map(
			(element, elementIndex) => {
				// Get the parent id to use for assigning the Global object.
				sttb1__tabbednavid = element.dataset.sttb1__tabbednavid

				// Add it to the Global list.
				tabbedNavigationBlocks[sttb1__tabbednavid] = {}
				
				// Pull together SubElements into the Global object.
				listTabbedSubElements()

				// Important, this needs to have the same dataset property from it's associated plugin.
				return sttb1__tabbednavid
			}
		)
		// Add a Default Option (so nothing auto sets.)
		arrayOfTabbedNavigation.unshift('Select an Option')

		// Done!
		return arrayOfTabbedNavigation
	}

	const listTabbedNavigationElements = (sttb1__tabbedlink) => {
		// Get all the options from potential Navigation Blocks.
		let arrayOfSubElements
		
		if (tabbedNavigationBlocks.hasOwnProperty(sttb1__tabbedlink))
			arrayOfSubElements = tabbedNavigationBlocks[sttb1__tabbedlink]['arrayOfSubElements']

		if (arrayOfSubElements) {
			return arrayOfSubElements
		} else {
			return ['empty']
		}
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
										value={ attributes.sttb1__tabbedlink }
										// Layout the options.
										options= {
											listTabbedNavigation().map(
												(bodyName) => {
													return { label: __(bodyName,'tabbedcontent'), value: bodyName }
												}
											)
										}
										// When the option is changed set the datasrc.
										onChange={ content => setAttributes({ sttb1__tabbedlink: content }) }
									/>
								:
									<span>No Navigation for Control!</span>
								}

								{ attributes.sttb1__tabbedlink ?
									<SelectControl
										label={__('Navigation Sub-Element to Use','tabbedcontent')}
										value={ attributes.sttb1__tabbedlinksubelement }
										// Layout the options.
										options= {
											listTabbedNavigationElements(attributes.sttb1__tabbedlink).map(
												(bodyName) => {
													return { label: __(bodyName,'tabbedcontent'), value: bodyName }
												}
											)
										}
										// When the option is changed set the datasrc.
										onChange={ content => setAttributes({ sttb1__tabbedlinksubelement: content }) }
									/>
								:
									<span>No Sub-Elements Navigation for Control!</span>
								}

							</PanelBody>
					</InspectorControls>
            </Placeholder>
        </div>
    );
}

