/*!
 *
 * ParseHtmlAsJson
 *
 * Description: An HTML tag string can be converted to json format function.
 *
 * Author: lesen
 *
 * Date: 2019-10-18
 *
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "ParseHtmlAsJson requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

})(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

/*

 * @param {String} html

 * @returns {String} json

 */

function parse( html ) {

	var htmlDoc = document.createElement('html');

	var json = {};

	/*

	 * @param {Object} element

	 * @param {Object} json

	 */

	function recursive( element, json ) {

		json.tag = element.tagName.toLowerCase();

		json.props = {};

		json.children = [];

		[].forEach.call(element.attributes, ( a, i ) => {

			json.props[a.name] = a.value;//TODO

		});

		[].forEach.call(element.children, ( c, i ) => {

			json.children[i] = {};

			recursive( c, json.children[i] );

		});

	}

	htmlDoc.innerHTML = html;

	recursive( htmlDoc, json );

	return json;

}

var strundefined = typeof undefined;

if ( typeof noGlobal === strundefined ) {

	window.parse = parse;

}

	return parse;

});
