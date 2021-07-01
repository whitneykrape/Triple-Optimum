import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	el,
	RichText,
	MediaUpload,
	InspectorControls,
} from '@wordpress/editor';
import { TextControl } from '@wordpress/components';

registerBlockType( 'block-article/article-block', {
	title: __( 'Triple Optimum: Article', 'block-article' ),
	icon: 'index-card',
	category: 'layout',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.article-title',
		},
		date: {
			type: 'array',
			source: 'children',
			selector: '.image-marker',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.article-description',
		},
		link: {
			type: 'array',
			source: 'children',
			selector: '.article-link',
		},
		imagelink: {
			type: 'string',
		},
	},

	example: {
		attributes: {
			title: __( 'Article Title', 'block-article' ),
			date: __( 'Article Date', 'block-article' ),
			mediaURL: '',
			description: __( 'Article Description', 'block-article' ),
			link: __( 'Article Link', 'block-article' ),
			imagelink: __( 'Article Image Link', 'block-article' ),
		},
	},

	edit: ( props ) => {
		const attributes = props.attributes;

		const onSelectImage = ( media ) => {
			return props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		const onChangeTitle = ( newTitle ) => {
			props.setAttributes( { content: newTitle } );
		};

		const onChangeDate = ( newDate ) => {
			props.setAttributes( { content: newDate } );
		};

		const onChangeTextField = ( newValue ) => {
			props.setAttributes( { imagelink: newValue } );
		};

		return (
			<div>
				<InspectorControls>
					<TextControl
						label="Image Link"
						help="Link to Add to the Image Thumbnail"
						value={ attributes.imagelink }
						onChange={ onChangeTextField }
					/>
				</InspectorControls>
				<div className={ props.className }>
					<RichText
						tagName="h3"
						inline="true"
						placeholder={ __( 'Article Title', 'block-article' ) }
						value={ attributes.title }
						onChange={ onChangeTitle }
						className="article-title"
					/>
					<RichText
						tagName="span"
						inline="false"
						placeholder={ __( 'Article Date', 'block-article' ) }
						value={ attributes.date }
						onChange={ onChangeDate }
						className="image-marker image-marker-date"
					/>
					<div className="article-image">
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes="image"
							value={ attributes.mediaID }
							render={ ( { open } ) => (
								<Button
									className={
										mediaID
											? 'image-button'
											: 'button button-large'
									}
									onClick={ open }
								>
									{ ! mediaID ? (
										__(
											'Upload Image',
											'gutenberg-examples'
										)
									) : (
										<img
											src={ mediaURL }
											alt={ __(
												'Upload Recipe Image',
												'gutenberg-examples'
											) }
										/>
									) }
								</Button>
							) }
						/>
					</div>
					<RichText
						className="article-description"
						tagName="p"
						placeholder={ __(
							'Article Description',
							'block-article'
						) }
						value={ attributes.description }
						onChange={ props.setAttributes( {
							description: value,
						} ) }
					/>
					<RichText
						className="article-link"
						tagName="span"
						inline="false"
						placeholder={ __( 'Article Link', 'block-article' ) }
						value={ attributes.link }
						onChange={ props.setAttributes( { link: value } ) }
					/>
				</div>
			</div>
		);
	},
	save: ( props ) => {
		const { attributes } = props;

		return el(
			'article',
			{ className: props.className + ' article article-sm' },
			attributes.mediaURL &&
				el(
					'a',
					{
						className: 'wp-block-image article-image imagelink',
						href: attributes.imagelink,
						target: '_blank',
						rel: 'noopener noreferrer',
					},
					el( RichText.Content, {
						tagName: 'span',
						className: 'image-marker image-marker-date',
						value: attributes.date,
					} ),
					el( 'img', { src: attributes.mediaURL } )
				),
			el( RichText.Content, {
				tagName: 'h3',
				className: 'article-title',
				value: attributes.title,
			} ),
			el( RichText.Content, {
				tagName: 'p',
				className: 'article-description',
				value: attributes.description,
			} ),
			el(
				'p',
				{
					className: 'article-read-more',
				},
				el( RichText.Content, {
					tagName: 'span',
					className: 'btn-sm article-link',
					value: attributes.link,
				} )
			)
		);
	},
} );
