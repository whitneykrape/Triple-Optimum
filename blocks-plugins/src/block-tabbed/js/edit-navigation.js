import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks, PlainText } from '@wordpress/block-editor';
import { SelectControl, PanelBody, Placeholder, TextControl } from '@wordpress/components';

export default function EditNavigation( { attributes, setAttributes, isSelected, clientId } ) {
	return (
		<div {...useBlockProps()}>
			<Placeholder
				label={ __( 'Tabbed Navigator', 'tabbednavigator' ) }
				instructions={ __( 'First element triggers modal body.', 'tabbednavigator' ) }
				className={ __( 'tabbednavigation', 'sttb01tb__tabbednavid', attributes.sttb1__tabbednavid ) }
			>
				<div className='sttb01tb__tabbednavigator' data-sttb1__tabbednavid={ attributes.sttb1__tabbednavid }>
					<InnerBlocks/>
				</div>

				<InspectorControls>
						<PanelBody
							title={__('Properties','tabbednavigator')}
							initialOpen={false}
							className="sttb01tb__panelbody"
						>
							<PlainText
								label="Navigation Name"
								onChange={ content => setAttributes({ sttb1__tabbednavid: content }) }
								value={ attributes.sttb1__tabbednavid }
								placeholder={__('Name these Controls for Tabs to Link to','tabbednavigator')}
							/>

							<SelectControl
								label="Navigation Display"
								value={ attributes.markerdisplay }
								options={ [
									{ label: 'Native Elements', value: '100%' },
									{ label: 'Dots', 			value: '50%' },
								] }
								onChange={ content => setAttributes({ markerdisplay: content }) }
								__nextHasNoMarginBottom
							/>

						</PanelBody>

				</InspectorControls>
			</Placeholder>
		</div>
	);
}