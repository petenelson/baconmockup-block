import attributes from './attributes';
import predefinedSizes from './predefined-sizes';
import tags from './tags';

/**
* Internal block libraries
*/
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

const { Fragment } = wp.element;

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	RichText,
} = wp.editor;

const {
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
} = wp.components;

/**
 * Generates an img src url.
 *
 * @param  {object} attributes
 * @return {string}
 */
const generateSrcUrl = ( { width, height, tag } ) => {

	const endingTag = tag ? `/${tag}` : '';

	return `https://baconmockup.com/${width}/${height}${endingTag}`;
};

/**
 * Renders the image block.
 *
 */
const renderBlock = props => {

	const {
		attributes,
		isSelected,
		setAttributes,
		attributes: {
			alignment,
			caption,
		}
	} = props;

	const figureAlignment = alignment ? `align${alignment}` : '';

	return (
		<div class="wp-block-image">
			<figure className={figureAlignment}>
				<img src={ generateSrcUrl( attributes ) } />
				{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
					<RichText
						tagName="figcaption"
						placeholder={ __( 'Write caption...', 'baconmockup-block' ) }
						onChange={ caption => setAttributes( { caption } ) }
						value={ caption }
					/>
				) }
			</figure>
		</div>
	);
};

/**
* Register block
*/
export default registerBlockType(
	'petenelson/baconmockup',
	{
		title: __( 'Bacon Mockup', 'baconmockup-block' ),
		description: __( 'Meaty placeholder images', 'baconmockup-block' ),
		category: 'common',
		icon: 'format-image',
		keywords: [
			__( 'Image', 'baconmockup-block' ),
			__( 'Placeholder', 'baconmockup-block' ),
		],
		attributes,

		edit: props => {

			const {
				attributes: {
					width,
					height,
					tag,
					alignment,
				},
				isSelected,
				setAttributes
			} = props;

			const tagsList = tags.map( ( { value } ) => {
				return {
					value,
					label: value,
				};
			} );

			return (
				<Fragment>
					{ isSelected ? (
						<Fragment>
							<BlockControls>
								<BlockAlignmentToolbar
									value={ alignment }
									onChange={ alignment => setAttributes( { alignment } ) }
								/>
							</BlockControls>

							<InspectorControls>


								<PanelBody
									title={ __( 'Image Settings', 'baconmockup-block' ) }
									initialOpen={true}
									className="baconmockup-block-editor-panel"
								>

									<PanelRow className="predefined-sizes">
										{ predefinedSizes.map( ( { width, height, label } ) => (
											<a
												key={ label }
												href="#set-predefined-size"
												onClick={ e => {
													e.preventDefault();
													setAttributes( { width, height } );
												} }>
												{ label }
											</a>
										) )}
									</PanelRow>

									<RangeControl
										beforeIcon="arrow-left-alt2"
										afterIcon="arrow-right-alt2"
										label={ __( 'Width', 'baconmockup-block' ) }
										value={ width }
										onChange={ width => setAttributes( { width } ) }
										min={ 1 }
										max={ 2048 }
									/>

									<RangeControl
										beforeIcon="arrow-left-alt2"
										afterIcon="arrow-right-alt2"
										label={ __( 'Height', 'baconmockup-block' ) }
										value={ height }
										onChange={ height => setAttributes( { height } ) }
										min={ 1 }
										max={ 2048 }
									/>

									<SelectControl
										label={ __( 'Use Specific Image', 'baconmockup-block' ) }
										value={ tag }
										options={ tagsList }
										onChange={ tag => setAttributes( { tag } ) }
									/>

								</PanelBody>

							</InspectorControls>
						</Fragment>
					) : false  }

					{ renderBlock( props ) }

				</Fragment>
			);

		},

		save: () => {
			return null; // TODO add server-side template.
		},
	}
);
