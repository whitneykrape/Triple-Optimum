import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks, PlainText } from '@wordpress/block-editor';
import { SelectControl, PanelBody, Placeholder, TextControl } from '@wordpress/components';
import '../css/block-tabbed-back-end.scss';

export default function EditNavigation( { attributes, setAttributes, isSelected, clientId } ) {
	// This needs to set a name, then all content tabs have th option of which control they fall under. 
	// This counts up all the ones that are associated and creates the navigation framework around that



	// console.log(listModalBodies())

	return (
		<div {...useBlockProps()}>
			<Placeholder
				label={ __( 'Tab Controller', 'gutenpride' ) }
				instructions={ __( 'First element triggers modal body.', 'gutenpride' ) }
				className={ __( 'tabbednavigation', 'tabNavigationIdentifier', attributes.tabcontrolIdentifier ) }
			>
				<div className='tabNavProperties' data-tabNavigationIdentifier={ attributes.tabNavigationIdentifier }>
					<InnerBlocks/>
				</div>

				<InspectorControls>
						<PanelBody
							title={__('Properties','bod-modal')}
							initialOpen={false}
							className="bod-form"
						>
							<PlainText
								onChange={ content => setAttributes({ tabNavigationIdentifier: content }) }
								value={ attributes.tabNavigationIdentifier }
								placeholder={__('Name these Controls for Tabs to Link to','bod-modal')}
							/>

						</PanelBody>

				</InspectorControls>
			</Placeholder>
		</div>
	);
}