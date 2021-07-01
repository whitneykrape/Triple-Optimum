import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	MediaUpload,
	InspectorControls,
} from '@wordpress/blockEditor';
import { TextControl, Flex } from '@wordpress/components';

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
		const {
			className,
			attributes: {
				title,
				date,
				mediaID,
				mediaURL,
				description,
				link,
				imagelink,
			},
			setAttributes,
		} = props;

		const onSelectImage = ( media ) => {
			return props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		const onChangeTitle = ( newTitle ) => {
			setAttributes( { content: newTitle } );
		};

		const onChangeDate = ( newDate ) => {
			setAttributes( { content: newDate } );
		};

		const onChangeDescription = ( newDescription ) => {
			setAttributes( { content: newDescription } );
		};

		const onChangeLink = ( newLink ) => {
			setAttributes( { content: newLink } );
		};

		const onChangeTextField = ( newValue ) => {
			setAttributes( { imagelink: newValue } );
		};

		return (
			<div>
				<InspectorControls>
					<TextControl
						label="Image Link"
						help="Link to Add to the Image Thumbnail"
						value={ imagelink }
						onChange={ onChangeTextField }
					/>
				</InspectorControls>
				<div className={ className }>
					<RichText
						tagName="h3"
						inline="true"
						placeholder={ __( 'Article Title', 'block-article' ) }
						value={ title }
						onChange={ onChangeTitle }
						className="article-title"
					/>
					<RichText
						tagName="span"
						inline="false"
						placeholder={ __( 'Article Date', 'block-article' ) }
						value={ date }
						onChange={ onChangeDate }
						className="image-marker image-marker-date"
					/>
					<div className="article-image">
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes="image"
							value={ mediaID }
							render={ ( { open } ) => (
								<Flex
									className={
										mediaID
											? 'image-button'
											: 'button button-large'
									}
									onClick={ open }
								>
									{ ! mediaID ? (
										__( 'Upload Image', 'block-article' )
									) : (
										<img
											src={ mediaURL }
											alt={ __(
												'Upload Image',
												'block-article'
											) }
										/>
									) }
								</Flex>
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
						value={ description }
						onChange={ onChangeDescription }
					/>
					<RichText
						className="article-link"
						tagName="span"
						inline="false"
						placeholder={ __( 'Article Link', 'block-article' ) }
						value={ link }
						onChange={ onChangeLink }
					/>
				</div>
			</div>
		);
	},

	save: ( props ) => {
		const {
			className,
			attributes: { title, date, mediaURL, description, link, imagelink },
		} = props;

		return (
			<article className={ className + ' article article-sm' }>
				<a
					className="wp-block-image article-image imagelink"
					href={ imagelink }
					target="_blank"
					rel="noopener noreferrer"
				>
					<RichText
						tagName="span"
						className="image-marker image-marker-date"
						value={ date }
					/>
					<img src={ mediaURL } alt="" />
				</a>
				<RichText
					tagName="h3"
					className="article-title"
					value={ title }
				/>
				<RichText
					tagName="p"
					className="article-description"
					value={ description }
				/>
				<RichText tagName="p" className="article-read-more">
					<RichText
						tagName="span"
						className="btn-sm article-link"
						value={ link }
					/>
				</RichText>
			</article>
		);
	},
} );
