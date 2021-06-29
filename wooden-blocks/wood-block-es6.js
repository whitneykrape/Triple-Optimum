import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
 
registerBlockType( 'wooden-blocks/article-block-es6', {
    title: __( 'Wooden Blocks: Article ES6', 'wooden-blocks' ),
    icon: 'smiley',
    category: 'design',
    edit: () => <div>Hola, mundo!</div>,
    save: () => <div>Hola, mundo!</div>,
} );