import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	InspectorControls,
} from '@wordpress/block-editor';
import { TextControl, Flex, DateTimePicker } from '@wordpress/components';

registerBlockType( 'block-article/article-block', {
	apiVersion: 2,
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
			mediaID: '',
			mediaURL: '',
			description: __( 'Article Description', 'block-article' ),
			link: __( 'Article Link', 'block-article' ),
			imagelink: __( 'Article Image Link', 'block-article' ),
		},
	},
	edit: ( props ) => {
		let {
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
		} = props

		const onSelectImage = ( media ) => {
			return setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} )
		}

		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		}

		const onChangeDate = ( value ) => {
			setAttributes( { date: value } );
		}

		const onChangeDescription = ( value ) => {
			setAttributes( { description: value } );
		}

		const onChangeLink = ( value ) => {
			setAttributes( { link: value } );
		}

		const onChangeImageLink = ( value ) => {
			setAttributes( { imagelink: value } );
		}

		const blockProps = useBlockProps( {
		        className: className
		    } )

		return (
			<>
				<InspectorControls className="article-image imagelink">
					<TextControl
						label="Image Link"
						help="Link to Add to the Image Thumbnail"
						value={ imagelink }
						onChange={ onChangeImageLink }
					/>
					<DateTimePicker
						currentDate={ date }
						onChange={ onChangeDate }
						is12Hour={ true }
					/>
				</InspectorControls>
				<div { ...blockProps }>
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

					<div className="article-text-block">
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
							className="image-marker image-marker-date"
						/>

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
			</>
		);
	},

	save: ( props ) => {
		const {
			className,
			attributes: { title, date, mediaURL, description, link, imagelink },
		} = props;

		const blockProps = useBlockProps.save( {
		        className: className
		    } )

		return (
			<article { ...blockProps }>
				<a
					className="wp-block-image article-image imagelink"
					href={ imagelink }
					target="_blank"
					rel="noopener noreferrer"
				>
					{ mediaURL && <img src={ mediaURL } alt="" /> }
				</a>
				<div className="article-text-block">
					<RichText.Content
						tagName="h3"
						className="article-title"
						value={ title }
					/>
					<RichText.Content
						tagName="span"
						className="image-marker image-marker-date"
						value={ date }
					/>
					<RichText.Content
						tagName="p"
						className="article-description"
						value={ description }
					/>
					<RichText.Content tagName="p" className="article-read-more">
						<RichText.Content
							tagName="span"
							className="btn-sm article-link"
							value={ link }
						/>
					</RichText.Content>
				</div>
			</article>
		);
	},
} );
