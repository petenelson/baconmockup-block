<?php
/**
 * Core plugin functionality.
 *
 * @package Bacon Mockup Block
 */

namespace BaconMockupBlock\Core;

/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'register_scripts_styles' ) );
	add_action( 'enqueue_block_editor_assets', $n( 'enqueue_block_editor_assets' ) );
}

/**
 * Registers scripts and styles.
 *
 * @return void
 */
function register_scripts_styles() {

	wp_register_style(
		'baconmockup-block-admin',
		BACON_MOCKUP_BLOCK_URL . '/dist/css/admin-style.css',
		[],
		BACON_MOCKUP_BLOCK_VERSION
	);

	wp_register_script(
		'baconmockup-block-editor',
		BACON_MOCKUP_BLOCK_URL . '/dist/js/blocks-editor.js',
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		BACON_MOCKUP_BLOCK_VERSION,
		true
	);
}

/**
 * Enqueues assets for the block editor.
 *
 * @return void
 */
function enqueue_block_editor_assets() {
	wp_enqueue_style( 'baconmockup-block-admin' );
	wp_enqueue_script( 'baconmockup-block-editor' );
}
