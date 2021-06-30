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
		let attributes = props.attributes;

		let onSelectImage = ( media ) => {
			return props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		let onChangeTextField = ( newValue ) => {
			props.setAttributes( { imagelink: newValue } );
		};

		return [
			el(
				InspectorControls,
				null,
				el( TextControl, {
					label: 'Image Link',
					help: 'Link to Add to the Image Thumbnail',
					value: attributes.imagelink,
					onChange: onChangeTextField,
				} )
			),
			el(
				'div',
				{ className: props.className },
				el( RichText, {
					tagName: 'h3',
					inline: true,
					placeholder: i18n.__( 'Article Title', 'block-article' ),
					value: attributes.title,
					onChange: ( value ) => {
						props.setAttributes( { title: value } );
					},
					className: 'article-title',
				} ),
				el( RichText, {
					tagName: 'span',
					inline: false,
					placeholder: i18n.__( 'Article Date', 'block-article' ),
					value: attributes.date,
					onChange: ( value ) => {
						props.setAttributes( { date: value } );
					},
					className: 'image-marker image-marker-date',
				} ),
				el(
					'div',
					{ className: 'article-image' },
					el( MediaUpload, {
						onSelect: onSelectImage,
						allowedTypes: 'image',
						value: attributes.mediaID,
						render: ( obj ) => {
							return el(
								components.Flex,
								{
									className: attributes.mediaID
										? 'image-button'
										: 'button button-large',
									onClick: obj.open,
								},
								! attributes.mediaID
									? __( 'Upload Image', 'block-article' )
									: el( 'img', { src: attributes.mediaURL } )
							);
						},
					} )
				),
				el( RichText, {
					tagName: 'p',
					placeholder: i18n.__(
						'Article Description',
						'block-article'
					),
					value: attributes.description,
					onChange: ( value ) => {
						props.setAttributes( { description: value } );
					},
					className: 'article-description',
				} ),
				el( RichText, {
					tagName: 'span',
					inline: false,
					placeholder: i18n.__( 'Article Link', 'block-article' ),
					value: attributes.link,
					onChange: ( value ) => {
						props.setAttributes( { link: value } );
					},
					className: 'article-link',
				} )
			),
		];
	},
	save: ( props ) => {
		let attributes = props.attributes;

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
