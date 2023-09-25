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
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks, PlainText } from '@wordpress/block-editor';
import { SelectControl, PanelBody, Placeholder, TextControl } from '@wordpress/components';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});

const blockAttributes = {
	showOn: {
		type: "string",
		default: "Select an Option"
	}
}

// Move this out when more developed
registerBlockType("my-plugin/custom-inner-block", {
	title: __( 'Modal Opener', 'bod-modal' ), // Block title.
	attributes: blockAttributes,
    edit: function( {attributes, className, setAttributes, isSelected, clientId} ) {
		const listModalBodies = () => {
			let $arrayOfModelBodies = document.querySelectorAll('.modalbody');
			$arrayOfModelBodies = Array.from($arrayOfModelBodies);
			$arrayOfModelBodies = $arrayOfModelBodies.map(
				(elementObject, index) => {
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
					<div data-openModalBody={ attributes.showOn }>
						<InnerBlocks/>
					</div>

					<InspectorControls>
							<PanelBody
								title={__('Trigger','bod-modal')}
								initialOpen={false}
								className="bod-form"
							>
								{ listModalBodies().length > 1 ?
									<SelectControl
										label={__('Show On','bod-modal')}
										value={ attributes.showOn }
										// Map of Modal Bodies
										options= {
											listModalBodies().map(
												(bodyName) => {
													return { label: __(bodyName,'bod-modal'), value: bodyName }
												}
											)
										}
										
										onChange={ content => setAttributes({ showOn: content }) }
										/>
								:
									<span>No Model Bodies to Link to!</span>
								}

							</PanelBody>

					</InspectorControls>
				</Placeholder>
            </div>
        );
    },

    save: function( {attributes} ) {
		console.log('save attributes')
		console.log(attributes)

        return (
            <div {...useBlockProps.save()}>
				<div className='modalOpener' data-openModalBody={ attributes.showOn }>
                	<InnerBlocks.Content />
				</div>
            </div>
        );
    },

    // ...
});