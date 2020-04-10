<?php
/**
 * Plugin Name: Bacon Mockup Block
 * Description: Gutenberg block for Bacon Mockup placeholder images
 * Plugin URI: https://github.com/petenelson/baconmockup-block
 * Version: 0.1.0
 * Author: Pete Nelson (@CodeGeekATX)
 * Text Domain: baconmockup-block
 *
 * @package Bacon Mockup Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

// Useful global constants.
define( 'BACON_MOCKUP_BLOCK_VERSION', '0.1.0' );
define( 'BACON_MOCKUP_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'BACON_MOCKUP_BLOCK_PATH', plugin_dir_path( __FILE__ ) );
define( 'BACON_MOCKUP_BLOCK_INC', BACON_MOCKUP_BLOCK_PATH . 'includes/' );

// Include files.
require_once BACON_MOCKUP_BLOCK_INC . 'functions/core.php';

// Bootstrap.
\BaconMockupBlock\Core\setup();
