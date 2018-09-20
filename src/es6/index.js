/**
 * File to load wpadmin-remote files.
 *
 * @package wpadmin-remote
 */

/**
 * Class to handle wpadmin remote.
 */
class WP_Admin_Remote {

	constructor() {

		document.addEventListener( 'keyup', this.redirect.bind( this ) ) ;

	}

	redirect( event ) {

		// to handle ctrl + ` button press.
		if ( 192 === event.which && event.ctrlKey ) {

			this.showHideTerminal( event );
			return;

		}

		// If key not press in command prompt then return.
		if ( 'wpnb_command' !== event.target.id ) {
			return;
		}

		// Handle up and down arrow key press.
		if ( 38 === event.which || 40 === event.which ) {

			let arrowKey = ( 38 === event.which ) ? 'up' : 'down';

			this.getCommandHistory( arrowKey );
			return;

		}

		// If key is not Enter or value is empty then return.
		if (
			13 !== event.keyCode ||
			'' === event.target.value
		) {
			return;
		}

		let command = event.target.value;

		let url = this.getUrl( command );

		// if not url found then return.
		if ( typeof url === 'undefined' ) {

			alert( 'No page found' );
			return;

		}

		// Save command to maintain history.
		this.saveCommand( command );

		window.location.href = url;

	}

	/**
	 * Function show and hide terminal.
	 */
	showHideTerminal() {

		let is_remote_visible = document.getElementById( 'wpnbfooter' ).offsetWidth > 0;

		let css_display_value = 'block';

		if ( is_remote_visible ) {
			css_display_value = 'none';
		}

		document.getElementById( 'wpnbfooter' ).style.display = css_display_value;

		if ( ! is_remote_visible ) {
			document.getElementById( 'wpnb_command' ).focus();
		}

	}

	/**
	 * Function to save command history.
	 *
	 * @param command string The command entered by user.
	 */
	saveCommand( command ) {

		// get previous history of command.
		let commands = JSON.parse( localStorage.getItem( 'wpadminRemoteCommands' ) );

		// Set history of command if previously not found.
		if ( null === commands ) {

			commands = [ command ];

		} else {

			// Push command in previous history of command.
			commands.push( command );

		}

		localStorage.setItem( 'wpadminRemoteCommands', JSON.stringify( commands ) );

	}

	/**
	 * Function to get command history.
	 *
	 * @param arrowKey string value to check pressed button.
	 */
	getCommandHistory( arrowKey ) {

		let commandField = document.getElementById( 'wpnb_command' );

		// get pointer of current history command.
		let currentCommand = document.getElementById('wpnb_command_sign')['data-command-count'];

		// get command history.
		let commands = JSON.parse( localStorage.getItem( 'wpadminRemoteCommands' ) );

		// if no history found.
		if ( typeof currentCommand === 'undefined' || '' === currentCommand ) {

			currentCommand = commands.length - 1;

		} else {


			if ( 'down' === arrowKey ) {

				// to move at top of history.
				currentCommand++;

			} else {

				// to move at bottom of history.
				currentCommand--;

			}

		}

		// to set cursor command prompt as empty once all command history end.
		if ( commands.length <= currentCommand ) {

			document.getElementById('wpnb_command_sign')['data-command-count'] = commands.length;
			commandField.value = '';

		}

		let setCommand = commands[ currentCommand ];

		// set previous command in command prompt.
		if ( typeof setCommand !== 'undefined' ) {

			document.getElementById('wpnb_command_sign')['data-command-count'] = currentCommand;
			commandField.value = setCommand;

		}

	}

	/**
	 * Function to get URL from command.
	 *
	 * @param command string The command entered by user.
	 */
	getUrl( command ) {

		let url = '';

		if ( typeof wpadminremoteAdminJs.urls === 'undefined' ) {
			return;
		}

		// split command into array.
		let commands = command.split( " " );

		// If there is parameter pass in user command then get appropriate URL.
		if ( commands.length > 1 ) {

			url = this.getMatchUrl( commands );

		} else {

			let urls = wpadminremoteAdminJs.urls;
			url  = urls[command];

		}

		if ( typeof url === 'undefined' || '' === url ) {
			return;
		}

		return url;

	}

	/**
	 * Function to get URL if command have any params.
	 *
	 * @param commands array User command splits in array format.
	 */
	getMatchUrl( commands ) {

		// fetch first element from array which is main command.
		let commandName = commands.shift();

		let urls = wpadminremoteAdminJs.urls;

		let url = '';

		// If command with more than one param or string as param then search it.
		if ( commands.length > 1 || isNaN( parseInt( commands[0] ) ) === true ) {

			let command = this.getSearchUrl( commandName );

			if ( '' !== command ) {

				url = urls[command];

				let searchKeyWord = commands.join('+');

				url = url.replace( /%s%/g, searchKeyWord );
			}

		} else if ( isNaN( parseInt( commands[0] ) ) === false ) {

			/**
			 *	If command has only one param and it should be number.
			 */
			url = urls['poid'];

			url = url.replace( /%id%/g, commands[0] );

		}

		return url;

	}

	/**
	 * Get search command from the user search comm
	 */
	getSearchUrl( commandName ) {

		switch ( commandName ) {

			case 'po' :
				return 'pos';

			case 'pg' :
				return 'pgs';

			case 'wc' :
				return 'wcos';

			case 'wcp' :
				return 'wcps';

			default:
				return '';

		}

	}

}

new WP_Admin_Remote();
