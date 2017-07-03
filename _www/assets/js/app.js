/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function () {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
        }
      }

      this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.NEXT);
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.PREVIOUS);
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREVIOUS;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREVIOUS ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this9 = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this9.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this9._element)) {
            _this9._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this9._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this10 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this10._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this11 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this11._config.focus) {
          _this11._element.focus();
        }
        _this11._isTransitioning = false;
        $(_this11._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this12 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
          _this12._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this13 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this13.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this14 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this14._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this15 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this15._resetAdjustments();
        _this15._resetScrollbar();
        $(_this15._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this16 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this16._ignoreBackdropClick) {
            _this16._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this16._config.backdrop === 'static') {
            _this16._element.focus();
          } else {
            _this16.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this16._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this17 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this17).is(':visible')) {
          _this17.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this18 = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this18._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this19 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this19._offsets.push(item[0]);
        _this19._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this20 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.LIST)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this20._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this20._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this21 = this;

      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = function complete() {
        return _this21._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this22 = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this22._hoverState;
          _this22._hoverState = null;
          _this22._isTransitioning = false;

          $(_this22.element).trigger(_this22.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this22._leave(null, _this22);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this23 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this23._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this23.element.removeAttribute('aria-describedby');
        $(_this23.element).trigger(_this23.constructor.Event.HIDDEN);
        _this23._isTransitioning = false;
        _this23.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this24 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this24.element).on(_this24.constructor.Event.CLICK, _this24.config.selector, function (event) {
            return _this24.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSEENTER : _this24.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSELEAVE : _this24.constructor.Event.FOCUSOUT;

          $(_this24.element).on(eventIn, _this24.config.selector, function (event) {
            return _this24._enter(event);
          }).on(eventOut, _this24.config.selector, function (event) {
            return _this24._leave(event);
          });
        }

        $(_this24.element).closest('.modal').on('hide.bs.modal', function () {
          return _this24.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);

}();

(function(){'use strict';
var d,aa="object"===typeof __ScalaJSEnv&&__ScalaJSEnv?__ScalaJSEnv:{},l="object"===typeof aa.global&&aa.global?aa.global:"object"===typeof global&&global&&global.Object===Object?global:this;aa.global=l;var ba="object"===typeof aa.exportsNamespace&&aa.exportsNamespace?aa.exportsNamespace:l;aa.exportsNamespace=ba;l.Object.freeze(aa);var ca={envInfo:aa,semantics:{asInstanceOfs:2,arrayIndexOutOfBounds:2,moduleInit:2,strictFloats:!1,productionMode:!0},assumingES6:!1,linkerVersion:"0.6.18",globalThis:this};
l.Object.freeze(ca);l.Object.freeze(ca.semantics);var q=l.Math.imul||function(a,b){var c=a&65535,e=b&65535;return c*e+((a>>>16&65535)*e+c*(b>>>16&65535)<<16>>>0)|0},da=l.Math.fround||function(a){return+a},fa=l.Math.clz32||function(a){if(0===a)return 32;var b=1;0===(a&4294901760)&&(a<<=16,b+=16);0===(a&4278190080)&&(a<<=8,b+=8);0===(a&4026531840)&&(a<<=4,b+=4);0===(a&3221225472)&&(a<<=2,b+=2);return b+(a>>31)},ga=0,ha=l.WeakMap?new l.WeakMap:null;
function ia(a){return function(b,c){return!(!b||!b.$classData||b.$classData.re!==c||b.$classData.qe!==a)}}function ja(a){for(var b in a)return b}function la(a,b){return new a.Bg(b)}function r(a,b){return ma(a,b,0)}function ma(a,b,c){var e=new a.Bg(b[c]);if(c<b.length-1){a=a.Ue;c+=1;for(var f=e.a,g=0;g<f.length;g++)f[g]=ma(a,b,c)}return e}function na(a){return void 0===a?"undefined":a.toString()}
function pa(a){switch(typeof a){case "string":return t(qa);case "number":var b=a|0;return b===a?ra(b)?t(sa):va(b)?t(wa):t(xa):ya(a)?t(za):t(Aa);case "boolean":return t(Ba);case "undefined":return t(Ca);default:return null===a?a.Jp():Da(a)?t(Ea):a&&a.$classData?t(a.$classData):null}}function Fa(a,b){return a&&a.$classData||null===a?a.t(b):"number"===typeof a?"number"===typeof b&&(a===b?0!==a||1/a===1/b:a!==a&&b!==b):a===b}
function Ga(a){switch(typeof a){case "string":return Ha(Ia(),a);case "number":return Ja(Ka(),a);case "boolean":return a?1231:1237;case "undefined":return 0;default:return a&&a.$classData||null===a?a.x():null===ha?42:La(a)}}function Ma(a,b,c){return"string"===typeof a?a.substring(b,c):a.fg(b,c)}function Na(a){return 2147483647<a?2147483647:-2147483648>a?-2147483648:a|0}
function Oa(a,b){var c=l.Object.getPrototypeOf,e=l.Object.getOwnPropertyDescriptor;for(a=c(a);null!==a;){var f=e(a,b);if(void 0!==f)return f;a=c(a)}}function Pa(a,b,c){a=Oa(a,c);if(void 0!==a)return c=a.get,void 0!==c?c.call(b):a.value}function Ra(a,b,c,e){a=Oa(a,c);if(void 0!==a&&(a=a.set,void 0!==a)){a.call(b,e);return}throw new l.TypeError("super has no setter '"+c+"'.");}
function Sa(a,b,c,e,f){a=a.a;c=c.a;if(a!==c||e<b||(b+f|0)<e)for(var g=0;g<f;g=g+1|0)c[e+g|0]=a[b+g|0];else for(g=f-1|0;0<=g;g=g-1|0)c[e+g|0]=a[b+g|0]}
var La=null!==ha?function(a){switch(typeof a){case "string":case "number":case "boolean":case "undefined":return Ga(a);default:if(null===a)return 0;var b=ha.get(a);void 0===b&&(ga=b=ga+1|0,ha.set(a,b));return b}}:function(a){if(a&&a.$classData){var b=a.$idHashCode$0;if(void 0!==b)return b;if(l.Object.isSealed(a))return 42;ga=b=ga+1|0;return a.$idHashCode$0=b}return null===a?0:Ga(a)};function ra(a){return"number"===typeof a&&a<<24>>24===a&&1/a!==1/-0}
function va(a){return"number"===typeof a&&a<<16>>16===a&&1/a!==1/-0}function Ta(a){return"number"===typeof a&&(a|0)===a&&1/a!==1/-0}function ya(a){return"number"===typeof a}function Ua(a){return null===a?u().$b:a}function Va(){this.Zf=this.Bg=void 0;this.qe=this.Ue=this.o=null;this.re=0;this.Bh=null;this.Ff="";this.tc=this.Bf=this.Cf=void 0;this.name="";this.isRawJSType=this.isArrayClass=this.isInterface=this.isPrimitive=!1;this.isInstance=void 0}
function Wa(a,b,c){var e=new Va;e.o={};e.Ue=null;e.Bh=a;e.Ff=b;e.tc=function(){return!1};e.name=c;e.isPrimitive=!0;e.isInstance=function(){return!1};return e}function v(a,b,c,e,f,g,h,k){var n=new Va,m=ja(a);h=h||function(a){return!!(a&&a.$classData&&a.$classData.o[m])};k=k||function(a,b){return!!(a&&a.$classData&&a.$classData.re===b&&a.$classData.qe.o[m])};n.Zf=g;n.o=e;n.Ff="L"+c+";";n.tc=k;n.name=c;n.isInterface=b;n.isRawJSType=!!f;n.isInstance=h;return n}
function Xa(a){function b(a){if("number"===typeof a){this.a=Array(a);for(var b=0;b<a;b++)this.a[b]=f}else this.a=a}var c=new Va,e=a.Bh,f="longZero"==e?u().$b:e;b.prototype=new y;b.prototype.constructor=b;b.prototype.$classData=c;var e="["+a.Ff,g=a.qe||a,h=a.re+1;c.Bg=b;c.Zf=z;c.o={c:1,Ib:1,f:1};c.Ue=a;c.qe=g;c.re=h;c.Bh=null;c.Ff=e;c.Cf=void 0;c.Bf=void 0;c.tc=void 0;c.name=e;c.isPrimitive=!1;c.isInterface=!1;c.isArrayClass=!0;c.isInstance=function(a){return g.tc(a,h)};return c}
function t(a){if(!a.Cf){var b=new Ya;b.rc=a;a.Cf=b}return a.Cf}function A(a){a.Bf||(a.Bf=Xa(a));return a.Bf}Va.prototype.getFakeInstance=function(){return this===qa?"some string":this===Ba?!1:this===sa||this===wa||this===xa||this===za||this===Aa?0:this===Ea?u().$b:this===Ca?void 0:{$classData:this}};Va.prototype.getSuperclass=function(){return this.Zf?t(this.Zf):null};Va.prototype.getComponentType=function(){return this.Ue?t(this.Ue):null};
Va.prototype.newArrayOfThisClass=function(a){for(var b=this,c=0;c<a.length;c++)b=A(b);return r(b,a)};var Za=Wa(void 0,"V","void"),$a=Wa(!1,"Z","boolean"),ab=Wa(0,"C","char"),bb=Wa(0,"B","byte"),cb=Wa(0,"S","short"),B=Wa(0,"I","int"),db=Wa("longZero","J","long"),eb=Wa(0,"F","float"),fb=Wa(0,"D","double"),hb=ia($a);$a.tc=hb;var ib=ia(ab);ab.tc=ib;var jb=ia(bb);bb.tc=jb;var kb=ia(cb);cb.tc=kb;var lb=ia(B);B.tc=lb;var mb=ia(db);db.tc=mb;var nb=ia(eb);eb.tc=nb;var ob=ia(fb);fb.tc=ob;function pb(){}function y(){}y.prototype=pb.prototype;pb.prototype.b=function(){return this};pb.prototype.t=function(a){return this===a};pb.prototype.q=function(){var a=qb(pa(this)),b=(+(this.x()>>>0)).toString(16);return a+"@"+b};pb.prototype.x=function(){return La(this)};pb.prototype.toString=function(){return this.q()};function rb(a,b){if(a=a&&a.$classData){var c=a.re||0;return!(c<b)&&(c>b||!a.qe.isPrimitive)}return!1}
var z=v({c:0},!1,"java.lang.Object",{c:1},void 0,void 0,function(a){return null!==a},rb);pb.prototype.$classData=z;function sb(a,b){if(tb(b))return b=null===b?0:b.fa,a.Ui()&&a.ec()===b;if(ra(b))return b|=0,a.Ti()&&a.Ag()===b;if(va(b))return b|=0,a.Vi()&&a.zh()===b;if(Ta(b))return b|=0,a.Sg()&&a.ec()===b;if(Da(b)){var c=Ua(b);b=c.d;c=c.j;a=a.Bb();var e=a.j;return a.d===b&&e===c}return ya(b)?(b=+b,a.te()===b):"number"===typeof b?(b=+b,a.sc()===b):!1}
function ub(a){var b=r(A(z),[a.a.length]);Sa(a,0,b,0,a.a.length);return b}
function vb(a,b,c){if(32>c)return a.Xa().a[31&b];if(1024>c)return a.R().a[31&(b>>>5|0)].a[31&b];if(32768>c)return a.da().a[31&(b>>>10|0)].a[31&(b>>>5|0)].a[31&b];if(1048576>c)return a.ra().a[31&(b>>>15|0)].a[31&(b>>>10|0)].a[31&(b>>>5|0)].a[31&b];if(33554432>c)return a.ib().a[31&(b>>>20|0)].a[31&(b>>>15|0)].a[31&(b>>>10|0)].a[31&(b>>>5|0)].a[31&b];if(1073741824>c)return a.Sc().a[31&(b>>>25|0)].a[31&(b>>>20|0)].a[31&(b>>>15|0)].a[31&(b>>>10|0)].a[31&(b>>>5|0)].a[31&b];throw(new wb).b();}
function xb(a,b,c){if(32<=c)if(1024>c)a.Ja(a.R().a[31&(b>>>5|0)]);else if(32768>c)a.xa(a.da().a[31&(b>>>10|0)]),a.Ja(a.R().a[31&(b>>>5|0)]);else if(1048576>c)a.Ya(a.ra().a[31&(b>>>15|0)]),a.xa(a.da().a[31&(b>>>10|0)]),a.Ja(a.R().a[31&(b>>>5|0)]);else if(33554432>c)a.Fb(a.ib().a[31&(b>>>20|0)]),a.Ya(a.ra().a[31&(b>>>15|0)]),a.xa(a.da().a[31&(b>>>10|0)]),a.Ja(a.R().a[31&(b>>>5|0)]);else if(1073741824>c)a.Rc(a.Sc().a[31&(b>>>25|0)]),a.Fb(a.ib().a[31&(b>>>20|0)]),a.Ya(a.ra().a[31&(b>>>15|0)]),a.xa(a.da().a[31&
(b>>>10|0)]),a.Ja(a.R().a[31&(b>>>5|0)]);else throw(new wb).b();}function yb(a,b,c){a.xd(c);c=-1+c|0;switch(c){case -1:break;case 0:a.Ja(b.Xa());break;case 1:a.xa(b.R());a.Ja(b.Xa());break;case 2:a.Ya(b.da());a.xa(b.R());a.Ja(b.Xa());break;case 3:a.Fb(b.ra());a.Ya(b.da());a.xa(b.R());a.Ja(b.Xa());break;case 4:a.Rc(b.ib());a.Fb(b.ra());a.Ya(b.da());a.xa(b.R());a.Ja(b.Xa());break;case 5:a.Ze(b.Sc());a.Rc(b.ib());a.Fb(b.ra());a.Ya(b.da());a.xa(b.R());a.Ja(b.Xa());break;default:throw(new C).V(c);}}
var zb=v({hk:0},!0,"scala.collection.mutable.HashEntry",{hk:1});function Ab(){this.de=this.Xc=null}Ab.prototype=new y;Ab.prototype.constructor=Ab;function Bb(a,b,c){a.Xc=b;a.de=c;return a}Ab.prototype.$classData=v({Bk:0},!1,"java.math.BigInteger$QuotAndRem",{Bk:1,c:1});function Cb(){}Cb.prototype=new y;Cb.prototype.constructor=Cb;Cb.prototype.b=function(){return this};
function Db(a,b,c,e){a=0;var f=-1+e|0;if(!(0>=e))for(var g=0;;){var h=g,k=c.a[h];b.a[h]=k<<1|a;a=k>>>31|0;if(g===f)break;g=1+g|0}0!==a&&(b.a[e]=a)}function Eb(a,b,c){a=c>>5;c&=31;var e=(b.G+a|0)+(0===c?0:1)|0,f=r(A(B),[e]);Fb(0,f,b.w,a,c);b=Gb(new D,b.z,e,f);Hb(b);return b}
function Ib(a,b,c){a=c>>5;var e=31&c;if(a>=b.G)return 0>b.z?F().Af:F().qc;c=b.G-a|0;var f=r(A(B),[1+c|0]);Kb(0,f,c,b.w,a,e);if(0>b.z){for(var g=0;g<a&&0===b.w.a[g];)g=1+g|0;var h=0!==b.w.a[g]<<(32-e|0);if(g<a||0<e&&h){for(g=0;g<c&&-1===f.a[g];)f.a[g]=0,g=1+g|0;g===c&&(c=1+c|0);a=g;f.a[a]=1+f.a[a]|0}}b=Gb(new D,b.z,c,f);Hb(b);return b}function Lb(a,b){if(0===b.z)return 0;a=b.G<<5;var c=b.w.a[-1+b.G|0];0>b.z&&Mb(b)===(-1+b.G|0)&&(c=-1+c|0);return a=a-fa(c)|0}
function Kb(a,b,c,e,f,g){for(a=0;a<f;)a=1+a|0;if(0===g)Sa(e,f,b,0,c);else{var h=32-g|0;for(a=0;a<(-1+c|0);)b.a[a]=e.a[a+f|0]>>>g|0|e.a[1+(a+f|0)|0]<<h,a=1+a|0;b.a[a]=e.a[a+f|0]>>>g|0}}function Fb(a,b,c,e,f){if(0===f)Sa(c,0,b,e,b.a.length-e|0);else{a=32-f|0;b.a[-1+b.a.length|0]=0;for(var g=-1+b.a.length|0;g>e;){var h=g;b.a[h]=b.a[h]|c.a[-1+(g-e|0)|0]>>>a|0;b.a[-1+g|0]=c.a[-1+(g-e|0)|0]<<f;g=-1+g|0}}c=-1+e|0;if(!(0>=e))for(e=0;;){b.a[e]=0;if(e===c)break;e=1+e|0}}
Cb.prototype.$classData=v({Ck:0},!1,"java.math.BitLevel$",{Ck:1,c:1});var Nb=void 0;function Ob(){Nb||(Nb=(new Cb).b());return Nb}function Pb(){this.Jh=this.Lh=null}Pb.prototype=new y;Pb.prototype.constructor=Pb;
Pb.prototype.b=function(){Qb=this;var a=(new G).p([-1,-1,31,19,15,13,11,11,10,9,9,8,8,8,8,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5]),b=a.i.length|0,b=r(A(B),[b]),c;c=0;for(a=I(new J,a,a.i.length|0);a.E();){var e=a.F();b.a[c]=e|0;c=1+c|0}this.Lh=b;a=(new G).p([-2147483648,1162261467,1073741824,1220703125,362797056,1977326743,1073741824,387420489,1E9,214358881,429981696,815730721,1475789056,170859375,268435456,410338673,612220032,893871739,128E7,1801088541,113379904,148035889,191102976,244140625,
308915776,387420489,481890304,594823321,729E6,887503681,1073741824,1291467969,1544804416,1838265625,60466176]);b=a.i.length|0;b=r(A(B),[b]);c=0;for(a=I(new J,a,a.i.length|0);a.E();)e=a.F(),b.a[c]=e|0,c=1+c|0;this.Jh=b;return this};
function Rb(a,b,c){if(0===b.d&&0===b.j)switch(c){case 0:return"0";case 1:return"0.0";case 2:return"0.00";case 3:return"0.000";case 4:return"0.0000";case 5:return"0.00000";case 6:return"0.000000";default:return(0>c?"0E+":"0E")+(-2147483648===c?"2147483648":""+(-c|0))}else{a=0>b.j;var e;e="";var f=18;if(a){var g=b.d;b=b.j;b=(new K).k(-g|0,0!==g?~b:-b|0)}for(var g=b.d,h=b.j;;){b=g;var k=h,h=u(),g=Sb(h,g,k,10,0),h=h.S,f=-1+f|0,k=h,n=g,m=n>>>16|0,n=q(10,65535&n),m=q(10,m),m=n+(m<<16)|0;q(10,k);e=""+(new L).H(65535&
(48+(b-m|0)|0))+e;b=h;if(0===g&&0===b)break}b=-1+((18-f|0)-c|0)|0;if(0<c&&-6<=b)if(c=1+b|0,0<c)e=e.substring(0,c)+"."+e.substring(c);else{f=-c|0;c=-1+f|0;if(!(0>=f))for(f=0;;){e=""+(new L).H(48)+e;if(f===c)break;f=1+f|0}e="0."+e}else 0!==c&&(c=""+b,0<b&&(c=""+(new L).H(43)+c),c=""+(new L).H(69)+c,1<(18-f|0)?(f=65535&(e.charCodeAt(0)|0),e=(new L).H(f)+"."+e.substring(1)+c):e=""+e+c);return a?""+(new L).H(45)+e:e}}
function Tb(a,b){a=b.z;var c=b.G,e=b.w;if(0===a)return"0";if(1===c)return b=(+(e.a[0]>>>0)).toString(10),0>a?"-"+b:b;b="";var f=r(A(B),[c]);Sa(e,0,f,0,c);do{for(var g=0,e=-1+c|0;0<=e;){var h=g,g=f.a[e],k=Ub(u(),g,h,1E9,0);f.a[e]=k;var h=k>>31,n=65535&k,k=k>>>16|0,m=q(51712,n),n=q(15258,n),p=q(51712,k),m=m+((n+p|0)<<16)|0;q(1E9,h);q(15258,k);g=g-m|0;e=-1+e|0}e=""+g;for(b="000000000".substring(e.length|0)+e+b;0!==c&&0===f.a[-1+c|0];)c=-1+c|0}while(0!==c);f=0;for(c=b.length|0;;)if(f<c&&48===(65535&(b.charCodeAt(f)|
0)))f=1+f|0;else break;b=b.substring(f);return 0>a?""+(new L).H(45)+b:b}Pb.prototype.$classData=v({Dk:0},!1,"java.math.Conversion$",{Dk:1,c:1});var Qb=void 0;function Vb(){Qb||(Qb=(new Pb).b());return Qb}function Wb(){}Wb.prototype=new y;Wb.prototype.constructor=Wb;Wb.prototype.b=function(){return this};
function Yb(a,b,c,e,f,g,h){a=r(A(B),[1+f|0]);var k=r(A(B),[1+h|0]),n=fa(g.a[-1+h|0]);0!==n?(Fb(Ob(),k,g,0,n),Fb(Ob(),a,e,0,n)):(Sa(e,0,a,0,f),Sa(g,0,k,0,h));e=k.a[-1+h|0];for(c=-1+c|0;0<=c;){if(a.a[f]===e)g=-1;else{var m=a.a[f],p=a.a[-1+f|0];g=u();var x=Ub(g,p,m,e,0),m=g.S;g=x;var w=65535&x,x=x>>>16|0,E=65535&e,H=e>>>16|0,Q=q(w,E),E=q(x,E),w=q(w,H),w=Q+((E+w|0)<<16)|0;q(m,e);q(x,H);p=p-w|0;if(0!==g)a:for(g=1+g|0;;){x=g=-1+g|0;H=k.a[-2+h|0];m=65535&x;x=x>>>16|0;Q=65535&H;H=H>>>16|0;w=q(m,Q);Q=q(x,
Q);E=q(m,H);m=w+((Q+E|0)<<16)|0;w=(w>>>16|0)+E|0;w=(q(x,H)+(w>>>16|0)|0)+(((65535&w)+Q|0)>>>16|0)|0;H=p;x=a.a[-2+f|0];Q=p+e|0;if(0===((-2147483648^Q)<(-2147483648^p)?1:0)&&(p=Q,w^=-2147483648,H^=-2147483648,w===H?(-2147483648^m)>(-2147483648^x):w>H))continue a;break}}if(p=0!==g){Zb();var p=a,m=f-h|0,H=k,x=h,w=g,ka;ka=0;var oa;oa=0;Q=-1+x|0;if(!(0>=x))for(E=0;;){var gb=E;$b();var ea=H.a[gb],ta=65535&ea,ea=ea>>>16|0,Jb=65535&w,Qa=w>>>16|0,Xb=q(ta,Jb),Jb=q(ea,Jb),Ri=q(ta,Qa),ta=Xb+((Jb+Ri|0)<<16)|0,
Xb=(Xb>>>16|0)+Ri|0,Qa=(q(ea,Qa)+(Xb>>>16|0)|0)+(((65535&Xb)+Jb|0)>>>16|0)|0,ea=ta+ka|0;ka=(-2147483648^ea)<(-2147483648^ta)?1+Qa|0:Qa;Qa=p.a[m+gb|0];ea=Qa-ea|0;Qa=(-2147483648^ea)>(-2147483648^Qa)?-1:0;ta=oa;oa=ta>>31;ta=ea+ta|0;oa=(-2147483648^ta)<(-2147483648^ea)?1+(Qa+oa|0)|0:Qa+oa|0;p.a[m+gb|0]=ta;if(E===Q)break;E=1+E|0}w=p.a[m+x|0];H=w-ka|0;w=(-2147483648^H)>(-2147483648^w)?-1:0;E=oa;Q=E>>31;E=H+E|0;p.a[m+x|0]=E;p=0!==((-2147483648^E)<(-2147483648^H)?1+(w+Q|0)|0:w+Q|0)}if(p&&(g=-1+g|0,E=Q=0,
p=-1+h|0,!(0>=h)))for(m=0;;){x=m;w=a.a[(f-h|0)+x|0];H=w+k.a[x]|0;w=(-2147483648^H)<(-2147483648^w)?1:0;H=Q+H|0;w=(-2147483648^H)<(-2147483648^Q)?1+(E+w|0)|0:E+w|0;Q=H;E=w;a.a[(f-h|0)+x|0]=Q;Q=E;E=0;if(m===p)break;m=1+m|0}null!==b&&(b.a[c]=g);f=-1+f|0;c=-1+c|0}return 0!==n?(Kb(Ob(),k,h,a,0,n),k):(Sa(a,0,k,0,h),a)}
function ac(a,b,c,e,f){a=0;for(e=-1+e|0;0<=e;){var g=a;a=c.a[e];var h=u(),g=Ub(h,a,g,f,0),h=h.S,k=65535&g,n=g>>>16|0,m=65535&f,p=f>>>16|0,x=q(k,m),m=q(n,m),k=q(k,p),x=x+((m+k|0)<<16)|0;q(h,f);q(n,p);a=a-x|0;b.a[e]=g;e=-1+e|0}return a}Wb.prototype.$classData=v({Ek:0},!1,"java.math.Division$",{Ek:1,c:1});var bc=void 0;function Zb(){bc||(bc=(new Wb).b());return bc}function cc(){}cc.prototype=new y;cc.prototype.constructor=cc;cc.prototype.b=function(){return this};
function dc(a,b,c,e){for(var f=r(A(B),[b]),g=0,h=0;g<e;){var k=a.a[g],n=k-c.a[g]|0,k=(-2147483648^n)>(-2147483648^k)?-1:0,m=h,h=m>>31,m=n+m|0,n=(-2147483648^m)<(-2147483648^n)?1+(k+h|0)|0:k+h|0;f.a[g]=m;h=n;g=1+g|0}for(;g<b;)c=a.a[g],n=h,e=n>>31,n=c+n|0,c=(-2147483648^n)<(-2147483648^c)?1+e|0:e,f.a[g]=n,h=c,g=1+g|0;return f}function ec(a,b,c,e){for(a=-1+e|0;0<=a&&b.a[a]===c.a[a];)a=-1+a|0;return 0>a?0:(-2147483648^b.a[a])<(-2147483648^c.a[a])?-1:1}
function fc(a,b,c,e){var f=r(A(B),[1+b|0]),g=1,h=a.a[0],k=h+c.a[0]|0;f.a[0]=k;h=(-2147483648^k)<(-2147483648^h)?1:0;if(b>=e){for(;g<e;){var n=a.a[g],k=n+c.a[g]|0,n=(-2147483648^k)<(-2147483648^n)?1:0,h=k+h|0,k=(-2147483648^h)<(-2147483648^k)?1+n|0:n;f.a[g]=h;h=k;g=1+g|0}for(;g<b;)c=a.a[g],e=c+h|0,c=(-2147483648^e)<(-2147483648^c)?1:0,f.a[g]=e,h=c,g=1+g|0}else{for(;g<b;)n=a.a[g],k=n+c.a[g]|0,n=(-2147483648^k)<(-2147483648^n)?1:0,h=k+h|0,k=(-2147483648^h)<(-2147483648^k)?1+n|0:n,f.a[g]=h,h=k,g=1+g|
0;for(;g<e;)a=c.a[g],b=a+h|0,a=(-2147483648^b)<(-2147483648^a)?1:0,f.a[g]=b,h=a,g=1+g|0}0!==h&&(f.a[g]=h);return f}
function gc(a,b,c){a=b.z;var e=c.z,f=b.G,g=c.G;if(0===a)return c;if(0===e)return b;if(2===(f+g|0)){b=b.w.a[0];c=c.w.a[0];if(a===e)return e=b+c|0,c=(-2147483648^e)<(-2147483648^b)?1:0,0===c?(new D).k(a,e):Gb(new D,a,2,hc(M(),e,(new G).p([c])));e=F();0>a?(a=b=c-b|0,c=(-2147483648^b)>(-2147483648^c)?-1:0):(a=c=b-c|0,c=(-2147483648^c)>(-2147483648^b)?-1:0);return ic(e,(new K).k(a,c))}if(a===e)e=f>=g?fc(b.w,f,c.w,g):fc(c.w,g,b.w,f);else{var h=f!==g?f>g?1:-1:ec(0,b.w,c.w,f);if(0===h)return F().qc;1===h?
e=dc(b.w,f,c.w,g):(c=dc(c.w,g,b.w,f),a=e,e=c)}a=Gb(new D,a|0,e.a.length,e);Hb(a);return a}
function lc(a,b,c){var e=b.z;a=c.z;var f=b.G,g=c.G;if(0===a)return b;if(0===e)return mc(c);if(2===(f+g|0))return b=b.w.a[0],f=0,c=c.w.a[0],g=0,0>e&&(e=b,b=-e|0,f=0!==e?~f:-f|0),0>a&&(a=c,e=g,c=-a|0,g=0!==a?~e:-e|0),a=F(),e=b,b=f,f=g,c=e-c|0,ic(a,(new K).k(c,(-2147483648^c)>(-2147483648^e)?-1+(b-f|0)|0:b-f|0));var h=f!==g?f>g?1:-1:ec(nc(),b.w,c.w,f);if(e===a&&0===h)return F().qc;-1===h?(c=e===a?dc(c.w,g,b.w,f):fc(c.w,g,b.w,f),a=-a|0):(c=e===a?dc(b.w,f,c.w,g):fc(b.w,f,c.w,g),a=e);a=Gb(new D,a|0,c.a.length,
c);Hb(a);return a}cc.prototype.$classData=v({Fk:0},!1,"java.math.Elementary$",{Fk:1,c:1});var oc=void 0;function nc(){oc||(oc=(new cc).b());return oc}function pc(){this.Ed=0;this.ee=null}pc.prototype=new y;pc.prototype.constructor=pc;pc.prototype.t=function(a){return a&&a.$classData&&a.$classData.o.Qh?this.Ed===a.Ed?this.ee===a.ee:!1:!1};pc.prototype.q=function(){return"precision\x3d"+this.Ed+" roundingMode\x3d"+this.ee};pc.prototype.x=function(){return this.Ed<<3|this.ee.Oc};
pc.prototype.$classData=v({Qh:0},!1,"java.math.MathContext",{Qh:1,c:1});function qc(){this.Kh=null}qc.prototype=new y;qc.prototype.constructor=qc;qc.prototype.b=function(){rc=this;sc();var a=tc().oe,b=new pc;b.Ed=34;b.ee=a;this.Kh=b;sc();tc();sc();tc();sc();tc();return this};qc.prototype.$classData=v({Gk:0},!1,"java.math.MathContext$",{Gk:1,c:1});var rc=void 0;function sc(){rc||(rc=(new qc).b());return rc}function uc(){this.td=this.ud=this.sg=null}uc.prototype=new y;uc.prototype.constructor=uc;
uc.prototype.b=function(){vc=this;this.sg=wc(10,10);wc(14,5);this.ud=r(A(xc),[32]);this.td=r(A(xc),[32]);var a,b;a=1;for(var c=b=0;;){var e=c;if(18>=e){this.td.a[e]=ic(F(),(new K).k(a,b));var f=this.ud,g=F(),h=a,k=b;f.a[e]=ic(g,(new K).k(0===(32&e)?h<<e:0,0===(32&e)?(h>>>1|0)>>>(31-e|0)|0|k<<e:h<<e));e=a;a=e>>>16|0;e=q(5,65535&e);f=q(5,a);a=e+(f<<16)|0;e=(e>>>16|0)+f|0;b=q(5,b)+(e>>>16|0)|0}else this.td.a[e]=yc(this.td.a[-1+e|0],this.td.a[1]),this.ud.a[e]=yc(this.ud.a[-1+e|0],F().Od);if(31===c)break;
c=1+c|0}return this};
function zc(a,b,c){var e,f=-1+b|0;if(!(0>=b))for(var g=0;;){var h=g;e=0;var k=1+h|0,n=-1+b|0;if(!(k>=b))for(;;){var m=k,p=a.a[h],x=a.a[m],w=c.a[h+m|0],E=65535&p,p=p>>>16|0,H=65535&x,x=x>>>16|0,Q=q(E,H),H=q(p,H),ka=q(E,x),E=Q+((H+ka|0)<<16)|0,Q=(Q>>>16|0)+ka|0,p=(q(p,x)+(Q>>>16|0)|0)+(((65535&Q)+H|0)>>>16|0)|0,w=E+w|0,p=(-2147483648^w)<(-2147483648^E)?1+p|0:p;e=w+e|0;w=(-2147483648^e)<(-2147483648^w)?1+p|0:p;c.a[h+m|0]=e;e=w;if(k===n)break;k=1+k|0}c.a[h+b|0]=e;if(g===f)break;g=1+g|0}Db(Ob(),c,c,b<<
1);for(g=f=e=0;f<b;)k=a.a[f],m=a.a[f],n=c.a[g],h=e,e=65535&k,k=k>>>16|0,p=65535&m,m=m>>>16|0,w=q(e,p),p=q(k,p),x=q(e,m),e=w+((p+x|0)<<16)|0,w=(w>>>16|0)+x|0,k=(q(k,m)+(w>>>16|0)|0)+(((65535&w)+p|0)>>>16|0)|0,n=e+n|0,k=(-2147483648^n)<(-2147483648^e)?1+k|0:k,h=n+h|0,n=(-2147483648^h)<(-2147483648^n)?1+k|0:k,c.a[g]=h,g=1+g|0,h=n+c.a[g]|0,n=(-2147483648^h)<(-2147483648^n)?1:0,c.a[g]=h,e=n,f=1+f|0,g=1+g|0;return c}
function Ac(a,b,c){var e=a.sg.a.length,f=e>>31,g=c.j;if(g===f?(-2147483648^c.d)<(-2147483648^e):g<f)if(c=a.sg.a[c.d],a=b.z,e=b.G,b=b.w,0===a)a=F().qc;else if(1===e){b=b.a[0];e=65535&b;b=b>>>16|0;g=65535&c;c=c>>>16|0;var f=q(e,g),g=q(b,g),h=q(e,c),e=f+((g+h|0)<<16)|0,f=(f>>>16|0)+h|0;c=(q(b,c)+(f>>>16|0)|0)+(((65535&f)+g|0)>>>16|0)|0;a=0===c?(new D).k(a,e):Gb(new D,a,2,hc(M(),e,(new G).p([c])))}else f=1+e|0,g=r(A(B),[f]),g.a[e]=Bc(0,g,b,e,c),a=Gb(new D,a,f,g),Hb(a);else a=yc(b,Cc(a,c));return a}
function wc(a,b){var c=r(A(B),[-1+a|0]);a=[];var e,f=e=1;a.push(null===f?0:f);f=0;for(c=c.a.length;f<c;){var g=e=q(e|0,b);a.push(null===g?0:g);f=1+f|0}return la(A(B),a)}
function Dc(a,b,c){if(c.G>b.G)var e=c;else e=b,b=c;c=e;var f=b;if(63>f.G){var g=c.G,e=f.G;b=g+e|0;a=c.z!==f.z?-1:1;if(2===b){e=c.w.a[0];b=f.w.a[0];c=65535&e;var e=e>>>16|0,h=65535&b;b=b>>>16|0;var f=q(c,h),h=q(e,h),k=q(c,b);c=f+((h+k|0)<<16)|0;f=(f>>>16|0)+k|0;e=(q(e,b)+(f>>>16|0)|0)+(((65535&f)+h|0)>>>16|0)|0;a=0===e?(new D).k(a,c):Gb(new D,a,2,hc(M(),c,(new G).p([e])))}else{c=c.w;f=f.w;h=r(A(B),[b]);if(0!==g&&0!==e)if(1===g)h.a[e]=Bc(0,h,f,e,c.a[0]);else if(1===e)h.a[g]=Bc(0,h,c,g,f.a[0]);else if(c===
f&&g===e)zc(c,g,h);else if(k=-1+g|0,!(0>=g))for(g=0;;){var n=g,m;m=0;var p=c.a[n],x=-1+e|0;if(!(0>=e))for(var w=0;;){var E=w,H=f.a[E],Q=h.a[n+E|0],ka=65535&p,oa=p>>>16|0,gb=65535&H,H=H>>>16|0,ea=q(ka,gb),gb=q(oa,gb),ta=q(ka,H),ka=ea+((gb+ta|0)<<16)|0,ea=(ea>>>16|0)+ta|0,oa=(q(oa,H)+(ea>>>16|0)|0)+(((65535&ea)+gb|0)>>>16|0)|0,Q=ka+Q|0,oa=(-2147483648^Q)<(-2147483648^ka)?1+oa|0:oa;m=Q+m|0;Q=(-2147483648^m)<(-2147483648^Q)?1+oa|0:oa;h.a[n+E|0]=m;m=Q;if(w===x)break;w=1+w|0}h.a[n+e|0]=m;if(g===k)break;
g=1+g|0}a=Gb(new D,a,b,h);Hb(a)}return a}e=(-2&c.G)<<4;h=Ec(c,e);k=Ec(f,e);b=Fc(h,e);g=lc(nc(),c,b);b=Fc(k,e);f=lc(nc(),f,b);c=Dc(a,h,k);b=Dc(a,g,f);a=Dc(a,lc(nc(),h,g),lc(nc(),f,k));f=c;a=gc(nc(),a,f);a=gc(nc(),a,b);a=Fc(a,e);e=c=Fc(c,e<<1);a=gc(nc(),e,a);return gc(nc(),a,b)}
function Bc(a,b,c,e,f){var g;g=0;a=-1+e|0;if(!(0>=e))for(e=0;;){var h=e,k=c.a[h],n=65535&k,k=k>>>16|0,m=65535&f,p=f>>>16|0,x=q(n,m),m=q(k,m),w=q(n,p),n=x+((m+w|0)<<16)|0,x=(x>>>16|0)+w|0,k=(q(k,p)+(x>>>16|0)|0)+(((65535&x)+m|0)>>>16|0)|0;g=n+g|0;k=(-2147483648^g)<(-2147483648^n)?1+k|0:k;b.a[h]=g;g=k;if(e===a)break;e=1+e|0}return g}
function Cc(a,b){var c=a.ud.a.length,e=c>>31,f=b.j;if(f===e?(-2147483648^b.d)<(-2147483648^c):f<e)return a.ud.a[b.d];c=b.j;if(0===c?-2147483598>=(-2147483648^b.d):0>c)return Gc(F().Od,b.d);c=b.j;if(0===c?-1>=(-2147483648^b.d):0>c)return Fc(Gc(a.td.a[1],b.d),b.d);for(var g=Gc(a.td.a[1],2147483647),c=g,f=b.j,h=-2147483647+b.d|0,e=h,h=1>(-2147483648^h)?f:-1+f|0,f=Hc(u(),b.d,b.j,2147483647,0);;){var k=e,n=h;if(0===n?-1<(-2147483648^k):0<n)c=yc(c,g),e=-2147483647+e|0,h=1>(-2147483648^e)?h:-1+h|0;else break}c=
yc(c,Gc(a.td.a[1],f));c=Fc(c,2147483647);a=b.j;e=b=-2147483647+b.d|0;for(h=1>(-2147483648^b)?a:-1+a|0;;)if(b=e,a=h,0===a?-1<(-2147483648^b):0<a)c=Fc(c,2147483647),b=h,a=-2147483647+e|0,b=1>(-2147483648^a)?b:-1+b|0,e=a,h=b;else break;return Fc(c,f)}uc.prototype.$classData=v({Hk:0},!1,"java.math.Multiplication$",{Hk:1,c:1});var vc=void 0;function $b(){vc||(vc=(new uc).b());return vc}function Ic(){this.Bi=this.wk=null;this.v=0}Ic.prototype=new y;Ic.prototype.constructor=Ic;Ic.prototype.b=function(){return this};
function Jc(){var a;Kc||(Kc=(new Ic).b());a=Kc;0===(268435456&a.v)&&0===(268435456&a.v)&&(0===(134217728&a.v)&&0===(134217728&a.v)&&(a.wk=l,a.v|=134217728),a.Bi=a.wk.document,a.v|=268435456);return a.Bi}Ic.prototype.$classData=v({Kk:0},!1,"org.scalajs.dom.package$",{Kk:1,c:1});var Kc=void 0;function Lc(){this.Ae=this.pf=this.jg=this.Hf=this.ci=this.bf=null}Lc.prototype=new y;Lc.prototype.constructor=Lc;
Lc.prototype.b=function(){Mc=this;this.bf=Nc(16,8);var a=N(Oc(O()),(new G).p([Pc(Qc(),"beispiel")])),b=N(Rc(),(new G).p([(O(),(new P).h("Beispiel "))])),c=Sc();O();var e=(new P).h("Wenn ich durchschnittlich "+this.bf.Jd+" Termine pro Monat habe und "+this.bf.Ld+" Wochen Ferien plane, ");O();var f=(new P).h("dann bezahle ich ohne Kalenderfunktionen ");O();var g=Tc(Uc(this.bf).ng()),g=(new P).h(g);O();var h=(new P).h("pro Monat oder etwa ");O();var k=Tc(Uc(this.bf).lg());this.ci=N(a,(new G).p([b,N(c,
(new G).p([e,f,g,h,(new P).h(k),(O(),(new P).h("pro Jahr. "))]))]));this.Hf=Vc(N(Wc(),(new G).p([Pc(Xc(),"text"),Pc(Yc(),"Termine"),Pc(Zc(),"0"),Pc($c(),"4")])));this.jg=Vc(N(Wc(),(new G).p([Pc(Xc(),"text"),Pc(Yc(),"Ferien"),Pc(Zc(),"4"),Pc($c(),"4")])));this.pf=Vc(N(Wc(),(new G).p([Pc(Xc(),"checkbox")])));a=N(Oc(O()),(new G).p([Pc(ad(),"empty")]));b=bd();c=cd();O();e=Tc(0);c=N(c,(new G).p([(new P).h(e),(O(),(new P).h("pro Monat "))]));e=cd();O();f=(new P).h("etwa ");O();g=Tc(0);this.Ae=Vc(N(a,(new G).p([N(b,
(new G).p([c,N(e,(new G).p([f,(new P).h(g),(O(),(new P).h("pro Jahr "))]))]))])));this.Hf.onkeyup=function(){var a=dd(),b=ed,c=fd(a.Hf.value);b.Jd=(c.r()?0:c.Td())|0;b=Uc(ed);gd(a,b)};this.jg.onkeyup=function(){var a=dd(),b=ed,c=fd(a.jg.value);b.Ld=((c.r()?0:c.Td())|0)%52|0;b=Uc(ed);gd(a,b)};this.pf.onchange=function(){var a=dd(),b=!!a.pf.checked,c="option: "+b;hd(id().Yf.wa,c+"\n");ed.me=b;b=Uc(ed);gd(a,b)};ed=Nc(0,0);return this};
function fd(a){try{var b=(new jd).h(a);kd();return(new ld).V(md(0,b.e,10))}catch(c){if((a=nd(od(),c))&&a.$classData&&a.$classData.o.nb)return pd();throw c;}}
function gd(a,b){var c=ed;hd(id().Yf.wa,c+"\n");var c=N(Oc(O()),(new G).p([Pc(ad(),"resultId")])),e=bd(),f=cd();O();var g=Tc(b.ng()),f=N(f,(new G).p([(new P).h(g),(O(),(new P).h("pro Monat "))])),g=cd();O();var h=(new P).h("etwa ");O();b=Tc(b.lg());b=Vc(N(c,(new G).p([N(e,(new G).p([f,N(g,(new G).p([h,(new P).h(b),(O(),(new P).h("pro Jahr "))]))]))])));a.Ae.hasChildNodes()||(c=a.Ae,e=O(),c.appendChild(Vc(N(Oc(e),(new G).p([Pc(ad(),"resultId")])))));a.Ae.replaceChild(b,a.Ae.firstChild)}
function qd(a){var b=rd();0===(1&b.v)&&0===(1&b.v)&&(b.Hh=sd(),b.v=(1|b.v)<<24>>24);a=td(a,b.Hh.We);ud||(ud=(new vd).b());b=ud.Mh;return(2===a.Y.A?a:wd(new xd,yd(a.Y,b.Bc),a.ij)).Y.sc()}function Uc(a){var b=a.Jd*(!0===a.me?1.85:1),c=new zd;a=qd(b*(12-a.Ld/52*12));b=qd(b);c.kg=a;c.mg=b;Ad.prototype.Vc.call(c,null,null);return c}
function Tc(a){var b=(new jd).h("CHF %10.2f "),c=[a];Ia();b=b.e;Bd||(Bd=(new Cd).b());Dd();a=[];for(var e=0,f=c.length|0;e<f;){var g=c[e];a.push(Ed(g)?g.vk():g);e=1+e|0}Fd();for(var c=a.length|0,c=r(A(z),[c]),g=c.a.length,f=e=0,h=a.length|0,g=h<g?h:g,h=c.a.length,g=g<h?g:h;e<g;)c.a[f]=a[e],e=1+e|0,f=1+f|0;a=(new Gd).b();b=Hd(Id(a,b,c)).q();a.Kf();return b}Lc.prototype.price=function(a){return Uc(a)};
Lc.prototype.main=function(a){var b=Oc(O()),c=O();if(0===(512&c.v.d)&&0===(512&c.v.d)){var e=Jd().dc;c.Li=Kd("h3",!1,e);e=c.v;c.v=(new K).k(512|e.d,e.j)}var c=N(c.Li,(new G).p([(O(),(new P).h(" \n          Wie viele Termine habe ich pro Monat?\n          "))])),e=N(Sc(),(new G).p([(O(),(new P).h("Die Berechnung der Kosten erfolgt auf Basis der Anzahl Termine (Behandlungen, Sitzungen oder Konsultationen) pro Monat."))])),f=N(Sc(),(new G).p([(O(),(new P).h("Bitte ausf\u00fcllen:"))])),g=Ld(O()),h=N(Oc(O()),
(new G).p([Pc(Qc(),"row")])),k=N(Oc(O()),(new G).p([Pc(Qc(),"col-sm-6 col-md5")])),n=N(Rc(),(new G).p([(O(),(new P).h("Ich habe in der Regel"))])),m=N(Oc(O()),(new G).p([Pc(Qc(),"input")])),p=Md(),x=O(),m=N(m,(new G).p([N(p,(new G).p([Nd(x,this.Hf),(O(),(new P).h(" Termine pro Monat"))]))])),p=N(Oc(O()),(new G).p([Pc(Qc(),"input")])),x=Md(),w=O(),p=N(p,(new G).p([N(x,(new G).p([Nd(w,this.jg),(O(),(new P).h(" Wochen Ferien im Jahr"))]))])),x=O(),k=N(k,(new G).p([n,m,p,Ld(x)])),n=N(Oc(O()),(new G).p([Pc(Qc(),
"col-sm-6 col-md5")])),m=N(Rc(),(new G).p([(O(),(new P).h("Kosten"))])),p=N(Oc(O()),(new G).p([Pc(Qc(),"input")])),x=Md(),w=O(),p=N(p,(new G).p([N(x,(new G).p([Nd(w,this.pf),(O(),(new P).h(" mit Kalenderfunktionen"))]))])),x=Oc(O()),w=O(),E=O(),E=Nd(E,this.Ae).$e,w=Nd(w,E),E=O(),h=N(h,(new G).p([k,N(n,(new G).p([m,p,N(x,(new G).p([w,Ld(E)]))]))])),k=O(),n=Vc(this.ci);a.appendChild(Vc(N(b,(new G).p([c,e,f,g,h,Nd(k,n)]))))};Lc.prototype.sayHello=function(){hd(id().Yf.wa,"Hello world!\n")};
Lc.prototype.$classData=v({Lk:0},!1,"praxkit.HelloWorld$",{Lk:1,c:1});var Mc=void 0;function dd(){Mc||(Mc=(new Lc).b());return Mc}function Od(){}Od.prototype=new y;Od.prototype.constructor=Od;Od.prototype.b=function(){return this};
Od.prototype.start=function(a){var b=Oc(O()),c=O();if(0===(128&c.v.d)&&0===(128&c.v.d)){var e=Jd().dc;c.Ki=Kd("h1",!1,e);e=c.v;c.v=(new K).k(128|e.d,e.j)}c=N(c.Ki,(new G).p([(O(),(new P).h("Hello World!"))]));e=Sc();O();var f=(new P).h("The quick brown "),g=O();if(0===(64&g.v.j)&&0===(64&g.v.j)){var h=Jd().dc;g.bi=Kd("b",!1,h);h=g.v;g.v=(new K).k(h.d,64|h.j)}g=N(g.bi,(new G).p([(O(),(new P).h("fox"))]));O();var h=(new P).h(" jumps over the lazy "),k=O();return a.appendChild(Vc(N(b,(new G).p([c,N(e,
(new G).p([f,g,h,N(Pd(k),(new G).p([(O(),(new P).h("dog"))])),(O(),(new P).h("."))]))]))))};Od.prototype.$classData=v({Mk:0},!1,"praxkit.HelloWorld1$",{Mk:1,c:1});var Qd=void 0;function Rd(){this.rk=null}Rd.prototype=new y;Rd.prototype.constructor=Rd;Rd.prototype.b=function(){Sd=this;var a=(new jd).h("^[a-z][\\w0-9-]*$");Td();var a=a.e,b=new Ud,c=Vd();Ud.prototype.kl.call(b,Wd(c,a));this.rk=b;return this};
function Xd(a,b){a=b.length|0;if(0===a)return!1;var c=65535&(b.charCodeAt(0)|0);if(!(97<=c&&122>=c||65<=c&&90>=c||58===c))return!1;for(c=1;c<a;){var e=65535&(b.charCodeAt(c)|0);if(!(97<=e&&122>=e||65<=e&&90>=e||48<=e&&57>=e||45===e||58===e||46===e||95===e))return!1;c=1+c|0}return!0}Rd.prototype.$classData=v({Nk:0},!1,"scalatags.Escaping$",{Nk:1,c:1});var Sd=void 0;function Yd(){Sd||(Sd=(new Rd).b());return Sd}function Zd(){this.dc=null}Zd.prototype=new y;Zd.prototype.constructor=Zd;
Zd.prototype.b=function(){$d=this;this.dc=(new ae).b();(new be).b();(new ce).b();return this};Zd.prototype.$classData=v({Xk:0},!1,"scalatags.generic.Namespace$",{Xk:1,c:1});var $d=void 0;function Jd(){$d||($d=(new Zd).b());return $d}function de(a){var b=new ee,c=fe(ge(),null);b.id=a;b.Jb=c;b.Be=!1;if(!Xd(Yd(),a))throw(new wb).h(he(ie((new G).p(["Illegal attribute name: "," is not a valid XML attribute name"])),(new G).p([a])));return b}function Ya(){this.rc=null}Ya.prototype=new y;
Ya.prototype.constructor=Ya;function qb(a){return a.rc.name}function je(a){return a.rc.getComponentType()}Ya.prototype.q=function(){return(this.rc.isInterface?"interface ":this.rc.isPrimitive?"":"class ")+qb(this)};Ya.prototype.$classData=v({tl:0},!1,"java.lang.Class",{tl:1,c:1});function ke(){this.fi=0;this.pj=u().$b;this.lj=u().$b}ke.prototype=new y;ke.prototype.constructor=ke;ke.prototype.$classData=v({El:0},!1,"java.lang.Long$StringRadixInfo",{El:1,c:1});function le(){this.Gi=this.kj=null}
le.prototype=new y;le.prototype.constructor=le;le.prototype.b=function(){me=this;this.kj=ne(!1);this.Gi=ne(!0);return this};le.prototype.$classData=v({Kl:0},!1,"java.lang.System$",{Kl:1,c:1});var me=void 0;function oe(){me||(me=(new le).b());return me}function pe(){}pe.prototype=new y;pe.prototype.constructor=pe;pe.prototype.b=function(){return this};pe.prototype.$classData=v({Ml:0},!1,"java.lang.reflect.Array$",{Ml:1,c:1});var qe=void 0;function re(){}re.prototype=new y;
re.prototype.constructor=re;re.prototype.b=function(){return this};re.prototype.$classData=v({Nl:0},!1,"java.util.Arrays$",{Nl:1,c:1});var se=void 0;function te(){se||(se=(new re).b())}function ue(){this.$i=this.Zi=this.Yi=this.aj=null}ue.prototype=new y;ue.prototype.constructor=ue;
ue.prototype.b=function(){ve=this;this.aj=we(new xe,new l.RegExp("^[^\\x25]+"));this.Yi=we(new xe,new l.RegExp("^\\x25{2}"));this.Zi=we(new xe,new l.RegExp("^\\x25n"));this.$i=we(new xe,new l.RegExp("^\\x25(?:([1-9]\\d*)\\$)?([-#+ 0,\\(\x3c]*)(\\d*)(?:\\.(\\d+))?([A-Za-z])"));return this};ue.prototype.$classData=v({Ql:0},!1,"java.util.Formatter$",{Ql:1,c:1});var ve=void 0;function ye(){ve||(ve=(new ue).b());return ve}function xe(){this.ce=null}xe.prototype=new y;xe.prototype.constructor=xe;
function ze(a,b){return fe(ge(),a.ce.exec(b))}function we(a,b){a.ce=b;return a}xe.prototype.$classData=v({Rl:0},!1,"java.util.Formatter$RegExpExtractor",{Rl:1,c:1});function Ae(){}Ae.prototype=new y;Ae.prototype.constructor=Ae;function Be(){}Be.prototype=Ae.prototype;function Ce(){}Ce.prototype=new y;Ce.prototype.constructor=Ce;function De(){}De.prototype=Ce.prototype;function Ee(){}Ee.prototype=new y;Ee.prototype.constructor=Ee;function Fe(){}Fe.prototype=Ee.prototype;function Ge(){}
Ge.prototype=new y;Ge.prototype.constructor=Ge;Ge.prototype.b=function(){return this};Ge.prototype.$classData=v({mm:0},!1,"scala.Predef$any2stringadd$",{mm:1,c:1});var He=void 0;function Ie(){}Ie.prototype=new y;Ie.prototype.constructor=Ie;Ie.prototype.b=function(){return this};Ie.prototype.$classData=v({ym:0},!1,"scala.math.Ordered$",{ym:1,c:1});var Je=void 0;function Ke(){this.Hh=null;this.v=0}Ke.prototype=new y;Ke.prototype.constructor=Ke;
Ke.prototype.b=function(){Le=this;(new Me).b();Ne||(Ne=(new Oe).b());Pe||(Pe=(new Qe).b());Bd||(Bd=(new Cd).b());Re();Se();Te();Td();Ue||(Ue=(new Ve).b());We||(We=(new Xe).b());Ye||(Ye=(new Ze).b());$e();af||(af=(new bf).b());cf();df||(df=(new ef).b());ff();gf||(gf=(new hf).b());jf||(jf=(new kf).b());lf||(lf=(new mf).b());nf||(nf=(new of).b());Je||(Je=(new Ie).b());pf||(pf=(new qf).b());rf||(rf=(new sf).b());tf||(tf=(new uf).b());vf||(vf=(new wf).b());return this};
Ke.prototype.$classData=v({Cm:0},!1,"scala.package$",{Cm:1,c:1});var Le=void 0;function rd(){Le||(Le=(new Ke).b());return Le}function xf(){}xf.prototype=new y;xf.prototype.constructor=xf;xf.prototype.b=function(){yf=this;zf();Af();Bf();Cf();Df();Ef();Ff();Gf();Hf();If||(If=(new Jf).b());Fd();Kf||(Kf=(new Lf).b());Mf();Nf();return this};xf.prototype.$classData=v({Em:0},!1,"scala.reflect.ClassManifestFactory$",{Em:1,c:1});var yf=void 0;function Of(){}Of.prototype=new y;Of.prototype.constructor=Of;
Of.prototype.b=function(){return this};Of.prototype.$classData=v({Hm:0},!1,"scala.reflect.ManifestFactory$",{Hm:1,c:1});var Pf=void 0;function Qf(){}Qf.prototype=new y;Qf.prototype.constructor=Qf;Qf.prototype.b=function(){Rf=this;yf||(yf=(new xf).b());Pf||(Pf=(new Of).b());return this};Qf.prototype.$classData=v({Xm:0},!1,"scala.reflect.package$",{Xm:1,c:1});var Rf=void 0;function Sf(){this.wa=null}Sf.prototype=new y;Sf.prototype.constructor=Sf;
Sf.prototype.q=function(){return"DynamicVariable("+this.wa+")"};Sf.prototype.V=function(a){this.wa=a;return this};Sf.prototype.$classData=v({Ym:0},!1,"scala.util.DynamicVariable",{Ym:1,c:1});function Tf(){}Tf.prototype=new y;Tf.prototype.constructor=Tf;Tf.prototype.b=function(){(new Uf).b();return this};Tf.prototype.$classData=v({cn:0},!1,"scala.util.control.Breaks",{cn:1,c:1});function Vf(){}Vf.prototype=new y;Vf.prototype.constructor=Vf;function Wf(){}Wf.prototype=Vf.prototype;
Vf.prototype.ze=function(a,b){b=q(-862048943,b);b=q(461845907,b<<15|b>>>17|0);return a^b};Vf.prototype.ua=function(a,b){a=this.ze(a,b);return-430675100+q(5,a<<13|a>>>19|0)|0};function Xf(a){var b=Yf(),c=a.Rb();if(0===c)return a=a.Tb(),Ha(Ia(),a);for(var e=-889275714,f=0;f<c;)e=b.ua(e,Zf(R(),a.Sb(f))),f=1+f|0;return b.lb(e,c)}
function $f(a,b,c){var e=(new ag).ub(0),f=(new ag).ub(0),g=(new ag).ub(0),h=(new ag).ub(1);b.X(bg(function(a,b,c,e,f){return function(a){a=Zf(R(),a);b.U=b.U+a|0;c.U^=a;0!==a&&(f.U=q(f.U,a));e.U=1+e.U|0}}(a,e,f,g,h)));b=a.ua(c,e.U);b=a.ua(b,f.U);b=a.ze(b,h.U);return a.lb(b,g.U)}Vf.prototype.lb=function(a,b){a^=b;a=q(-2048144789,a^(a>>>16|0));a=q(-1028477387,a^(a>>>13|0));return a^(a>>>16|0)};
function cg(a,b,c){var e=(new ag).ub(0);c=(new ag).ub(c);b.X(bg(function(a,b,c){return function(e){c.U=a.ua(c.U,Zf(R(),e));b.U=1+b.U|0}}(a,e,c)));return a.lb(c.U,e.U)}function dg(){}dg.prototype=new y;dg.prototype.constructor=dg;dg.prototype.b=function(){return this};dg.prototype.$classData=v({fn:0},!1,"scala.util.hashing.package$",{fn:1,c:1});var eg=void 0;function Ze(){}Ze.prototype=new y;Ze.prototype.constructor=Ze;Ze.prototype.b=function(){return this};
Ze.prototype.$classData=v({hn:0},!1,"scala.collection.$colon$plus$",{hn:1,c:1});var Ye=void 0;function Xe(){}Xe.prototype=new y;Xe.prototype.constructor=Xe;Xe.prototype.b=function(){return this};Xe.prototype.$classData=v({jn:0},!1,"scala.collection.$plus$colon$",{jn:1,c:1});var We=void 0;function fg(){this.Uc=null}fg.prototype=new y;fg.prototype.constructor=fg;fg.prototype.b=function(){gg=this;this.Uc=(new hg).b();return this};
fg.prototype.$classData=v({pn:0},!1,"scala.collection.Iterator$",{pn:1,c:1});var gg=void 0;function Se(){gg||(gg=(new fg).b());return gg}function ig(a,b,c,e){return a.Ab((new jg).b(),b,c,e).zb.Qa}function kg(a){var b=(new ag).ub(0);a.X(bg(function(a,b){return function(){b.U=1+b.U|0}}(a,b)));return b.U}function lg(a,b,c,e,f){var g=mg();ng(b,c);a.X(bg(function(a,b,c,e){return function(a){if(e.U)og(b,a),e.U=!1;else return ng(b,c),og(b,a)}}(a,b,e,g)));ng(b,f);return b}function pg(){}pg.prototype=new y;
pg.prototype.constructor=pg;function qg(){}qg.prototype=pg.prototype;function rg(){}rg.prototype=new y;rg.prototype.constructor=rg;function sg(){}sg.prototype=rg.prototype;function tg(a,b){a:for(;;){if(!b.r()){a.Aa(b.B());b=b.ka();continue a}break}}function ug(a,b){b&&b.$classData&&b.$classData.o.rf?tg(a,b):b.X(bg(function(a){return function(b){return a.Aa(b)}}(a)));return a}function bf(){}bf.prototype=new y;bf.prototype.constructor=bf;bf.prototype.b=function(){return this};
bf.prototype.$classData=v({Zn:0},!1,"scala.collection.immutable.Stream$$hash$colon$colon$",{Zn:1,c:1});var af=void 0;function vg(){this.Ah=this.wa=null;this.v=!1;this.zc=null}vg.prototype=new y;vg.prototype.constructor=vg;function wg(a,b,c){a.Ah=c;if(null===b)throw xg(od(),null);a.zc=b;return a}function yg(a){a.v||(a.v||(a.wa=zg(a.Ah),a.v=!0),a.Ah=null);return a.wa}vg.prototype.$classData=v({co:0},!1,"scala.collection.immutable.StreamIterator$LazyCell",{co:1,c:1});function Ag(){}Ag.prototype=new y;
Ag.prototype.constructor=Ag;Ag.prototype.b=function(){return this};Ag.prototype.$classData=v({eo:0},!1,"scala.collection.immutable.StringOps$",{eo:1,c:1});var Dg=void 0;function Eg(){}Eg.prototype=new y;Eg.prototype.constructor=Eg;Eg.prototype.b=function(){return this};Eg.prototype.W=function(){var a=(new jg).b();return Fg(new Gg,a,bg(function(){return function(a){return(new Hg).h(a)}}(this)))};Eg.prototype.$classData=v({lo:0},!1,"scala.collection.immutable.WrappedString$",{lo:1,c:1});var Ig=void 0;
function Jg(){}Jg.prototype=new y;Jg.prototype.constructor=Jg;Jg.prototype.b=function(){return this};Jg.prototype.$classData=v({oo:0},!1,"scala.collection.mutable.ArrayOps$ofBoolean$",{oo:1,c:1});var Kg=void 0;function Lg(){}Lg.prototype=new y;Lg.prototype.constructor=Lg;Lg.prototype.b=function(){return this};Lg.prototype.$classData=v({po:0},!1,"scala.collection.mutable.ArrayOps$ofByte$",{po:1,c:1});var Mg=void 0;function Ng(){}Ng.prototype=new y;Ng.prototype.constructor=Ng;Ng.prototype.b=function(){return this};
Ng.prototype.$classData=v({qo:0},!1,"scala.collection.mutable.ArrayOps$ofChar$",{qo:1,c:1});var Og=void 0;function Pg(){}Pg.prototype=new y;Pg.prototype.constructor=Pg;Pg.prototype.b=function(){return this};Pg.prototype.$classData=v({ro:0},!1,"scala.collection.mutable.ArrayOps$ofDouble$",{ro:1,c:1});var Qg=void 0;function Rg(){}Rg.prototype=new y;Rg.prototype.constructor=Rg;Rg.prototype.b=function(){return this};
Rg.prototype.$classData=v({so:0},!1,"scala.collection.mutable.ArrayOps$ofFloat$",{so:1,c:1});var Sg=void 0;function Tg(){}Tg.prototype=new y;Tg.prototype.constructor=Tg;Tg.prototype.b=function(){return this};Tg.prototype.$classData=v({to:0},!1,"scala.collection.mutable.ArrayOps$ofInt$",{to:1,c:1});var Ug=void 0;function Vg(){}Vg.prototype=new y;Vg.prototype.constructor=Vg;Vg.prototype.b=function(){return this};Vg.prototype.$classData=v({uo:0},!1,"scala.collection.mutable.ArrayOps$ofLong$",{uo:1,c:1});
var Wg=void 0;function Xg(){}Xg.prototype=new y;Xg.prototype.constructor=Xg;Xg.prototype.b=function(){return this};Xg.prototype.$classData=v({vo:0},!1,"scala.collection.mutable.ArrayOps$ofRef$",{vo:1,c:1});var Yg=void 0;function Zg(){}Zg.prototype=new y;Zg.prototype.constructor=Zg;Zg.prototype.b=function(){return this};Zg.prototype.$classData=v({wo:0},!1,"scala.collection.mutable.ArrayOps$ofShort$",{wo:1,c:1});var $g=void 0;function ah(){}ah.prototype=new y;ah.prototype.constructor=ah;
ah.prototype.b=function(){return this};ah.prototype.$classData=v({xo:0},!1,"scala.collection.mutable.ArrayOps$ofUnit$",{xo:1,c:1});var bh=void 0;function ch(a,b,c){for(a=a.yb.a[c];;)if(null!==a?(c=a.xe,c=!S(T(),c,b)):c=!1,c)a=a.Dd;else break;return a}function dh(a,b){var c=-1+a.yb.a.length|0,e=fa(c);a=a.yh;eg||(eg=(new dg).b());b=q(-1640532531,b);kd();b=q(-1640532531,b<<24|16711680&b<<8|65280&(b>>>8|0)|b>>>24|0);return((b>>>a|0|b<<(-a|0))>>>e|0)&c}
function eh(a){for(var b=-1+a.yb.a.length|0;null===a.yb.a[b]&&0<b;)b=-1+b|0;return b}function fh(a,b){var c=Zf(R(),b),c=dh(a,c);return ch(a,b,c)}
function gh(a,b,c){var e=Zf(R(),b),e=dh(a,e),f=ch(a,b,e);if(null!==f)return f;b=(new hh).Vc(b,c);b.Dd=a.yb.a[e];a.yb.a[e]=b;a.od=1+a.od|0;ih(a,e);if(a.od>a.gg){b=a.yb.a.length<<1;c=a.yb;a.yb=r(A(zb),[b]);if(null!==a.Kd)if(e=1+(a.yb.a.length>>5)|0,a.Kd.a.length!==e)a.Kd=r(A(B),[e]);else{te();for(var e=a.Kd,f=e.a.length,g=0;g!==f;)e.a[g]=0,g=1+g|0}for(e=-1+c.a.length|0;0<=e;){for(f=c.a[e];null!==f;){var g=f.xe,g=Zf(R(),g),g=dh(a,g),h=f.Dd;f.Dd=a.yb.a[g];a.yb.a[g]=f;f=h;ih(a,g)}e=-1+e|0}a.gg=jh(kh(),
a.yf,b)}return null}function ih(a,b){null!==a.Kd&&(a=a.Kd,b>>=5,a.a[b]=1+a.a[b]|0)}function lh(){}lh.prototype=new y;lh.prototype.constructor=lh;lh.prototype.b=function(){return this};function jh(a,b,c){a=c>>31;var e=b>>31,f=65535&c,g=c>>>16|0,h=65535&b,k=b>>>16|0,n=q(f,h),h=q(g,h),m=q(f,k),f=n+((h+m|0)<<16)|0,n=(n>>>16|0)+m|0;b=(((q(c,e)+q(a,b)|0)+q(g,k)|0)+(n>>>16|0)|0)+(((65535&n)+h|0)>>>16|0)|0;return Sb(u(),f,b,1E3,0)}
lh.prototype.$classData=v({Co:0},!1,"scala.collection.mutable.HashTable$",{Co:1,c:1});var mh=void 0;function kh(){mh||(mh=(new lh).b());return mh}function nh(){this.Hd=!1;this.Ng=this.we=this.Pe=null;this.xg=!1;this.Xg=this.Pg=0}nh.prototype=new y;nh.prototype.constructor=nh;
nh.prototype.b=function(){oh=this;this.Pe=(this.Hd=!!(l.ArrayBuffer&&l.Int32Array&&l.Float32Array&&l.Float64Array))?new l.ArrayBuffer(8):null;this.we=this.Hd?new l.Int32Array(this.Pe,0,2):null;this.Hd&&new l.Float32Array(this.Pe,0,2);this.Ng=this.Hd?new l.Float64Array(this.Pe,0,1):null;if(this.Hd)this.we[0]=16909060,a=1===((new l.Int8Array(this.Pe,0,8))[0]|0);else var a=!0;this.Pg=(this.xg=a)?0:1;this.Xg=this.xg?1:0;return this};
function Ja(a,b){var c=b|0;if(c===b&&-Infinity!==1/b)return c;if(a.Hd)a.Ng[0]=b,a=(new K).k(a.we[a.Xg]|0,a.we[a.Pg]|0);else{if(b!==b)a=!1,b=2047,c=+l.Math.pow(2,51);else if(Infinity===b||-Infinity===b)a=0>b,b=2047,c=0;else if(0===b)a=-Infinity===1/b,c=b=0;else{var e=(a=0>b)?-b:b;if(e>=+l.Math.pow(2,-1022)){b=+l.Math.pow(2,52);var c=+l.Math.log(e)/.6931471805599453,c=+l.Math.floor(c)|0,c=1023>c?c:1023,f=+l.Math.pow(2,c);f>e&&(c=-1+c|0,f/=2);f=e/f*b;e=+l.Math.floor(f);f-=e;e=.5>f?e:.5<f?1+e:0!==e%2?
1+e:e;2<=e/b&&(c=1+c|0,e=1);1023<c?(c=2047,e=0):(c=1023+c|0,e-=b);b=c;c=e}else b=e/+l.Math.pow(2,-1074),c=+l.Math.floor(b),e=b-c,b=0,c=.5>e?c:.5<e?1+c:0!==c%2?1+c:c}c=+c;a=(new K).k(c|0,(a?-2147483648:0)|(b|0)<<20|c/4294967296|0)}return a.d^a.j}
function ph(a){var b=a.j,c=0>b,e=2047&b>>20;a=4294967296*(1048575&b)+ +(a.d>>>0);return 2047===e?0!==a?NaN:c?-Infinity:Infinity:0<e?(e=+l.Math.pow(2,-1023+e|0)*(1+a/+l.Math.pow(2,52)),c?-e:e):0!==a?(e=+l.Math.pow(2,-1022)*(a/+l.Math.pow(2,52)),c?-e:e):c?-0:0}nh.prototype.$classData=v({Qo:0},!1,"scala.scalajs.runtime.Bits$",{Qo:1,c:1});var oh=void 0;function Ka(){oh||(oh=(new nh).b());return oh}function qh(){this.v=!1}qh.prototype=new y;qh.prototype.constructor=qh;qh.prototype.b=function(){return this};
function rh(a,b){a=b.length|0;for(var c=r(A(ab),[a]),e=0;e<a;)c.a[e]=65535&(b.charCodeAt(e)|0),e=1+e|0;return c}function sh(a,b){return null===b?"null":na(b)}function th(a,b,c,e){a=c+e|0;if(0>c||a<c||a>b.a.length)throw(new uh).b();for(e="";c!==a;)e=""+e+l.String.fromCharCode(b.a[c]),c=1+c|0;return e}function vh(){return l.String.fromCharCode(92)}function Ha(a,b){a=0;for(var c=1,e=-1+(b.length|0)|0;0<=e;)a=a+q(65535&(b.charCodeAt(e)|0),c)|0,c=q(31,c),e=-1+e|0;return a}
qh.prototype.$classData=v({So:0},!1,"scala.scalajs.runtime.RuntimeString$",{So:1,c:1});var wh=void 0;function Ia(){wh||(wh=(new qh).b());return wh}function xh(){}xh.prototype=new y;xh.prototype.constructor=xh;xh.prototype.b=function(){return this};function xg(a,b){return yh(b)?b.yd:b}function nd(a,b){return b&&b.$classData&&b.$classData.o.Ra?b:(new zh).V(b)}xh.prototype.$classData=v({To:0},!1,"scala.scalajs.runtime.package$",{To:1,c:1});var Ah=void 0;
function od(){Ah||(Ah=(new xh).b());return Ah}function Bh(){}Bh.prototype=new y;Bh.prototype.constructor=Bh;Bh.prototype.b=function(){return this};function Ch(a,b){if(tb(b))return a.fa===b.fa;if(Dh(b)){if("number"===typeof b)return+b===a.fa;if(Da(b)){b=Ua(b);var c=b.j;a=a.fa;return b.d===a&&c===a>>31}return null===b?null===a:Fa(b,a)}return null===a&&null===b}
function S(a,b,c){if(b===c)c=!0;else if(Dh(b))a:if(Dh(c))c=Eh(0,b,c);else{if(tb(c)){if("number"===typeof b){c=+b===c.fa;break a}if(Da(b)){a=Ua(b);b=a.j;c=c.fa;c=a.d===c&&b===c>>31;break a}}c=null===b?null===c:Fa(b,c)}else c=tb(b)?Ch(b,c):null===b?null===c:Fa(b,c);return c}
function Eh(a,b,c){if("number"===typeof b)return a=+b,"number"===typeof c?a===+c:Da(c)?(b=Ua(c),c=b.d,b=b.j,a===Fh(u(),c,b)):Ed(c)?c.t(a):!1;if(Da(b)){b=Ua(b);a=b.d;b=b.j;if(Da(c)){c=Ua(c);var e=c.j;return a===c.d&&b===e}return"number"===typeof c?(c=+c,Fh(u(),a,b)===c):Ed(c)?c.t((new K).k(a,b)):!1}return null===b?null===c:Fa(b,c)}Bh.prototype.$classData=v({Wo:0},!1,"scala.runtime.BoxesRunTime$",{Wo:1,c:1});var Gh=void 0;function T(){Gh||(Gh=(new Bh).b());return Gh}
var Hh=v({Zo:0},!1,"scala.runtime.Null$",{Zo:1,c:1});function Ih(){}Ih.prototype=new y;Ih.prototype.constructor=Ih;Ih.prototype.b=function(){return this};function Jh(a,b){if(rb(b,1)||lb(b,1)||ob(b,1)||mb(b,1)||nb(b,1)||ib(b,1)||jb(b,1)||kb(b,1)||hb(b,1)||Kh(b))return b.a.length;if(null===b)throw(new U).b();throw(new C).V(b);}
function Lh(a,b,c,e){if(rb(b,1))b.a[c]=e;else if(lb(b,1))b.a[c]=e|0;else if(ob(b,1))b.a[c]=+e;else if(mb(b,1))b.a[c]=Ua(e);else if(nb(b,1))b.a[c]=+e;else if(ib(b,1))b.a[c]=null===e?0:e.fa;else if(jb(b,1))b.a[c]=e|0;else if(kb(b,1))b.a[c]=e|0;else if(hb(b,1))b.a[c]=!!e;else if(Kh(b))b.a[c]=void 0;else{if(null===b)throw(new U).b();throw(new C).V(b);}}function Mh(a){Nh();var b=a.gc();return ig(b,a.Tb()+"(",",",")")}
function Oh(a,b,c){if(rb(b,1)||lb(b,1)||ob(b,1)||mb(b,1)||nb(b,1))return b.a[c];if(ib(b,1))return(new L).H(b.a[c]);if(jb(b,1)||kb(b,1)||hb(b,1)||Kh(b))return b.a[c];if(null===b)throw(new U).b();throw(new C).V(b);}Ih.prototype.$classData=v({ap:0},!1,"scala.runtime.ScalaRunTime$",{ap:1,c:1});var Ph=void 0;function Nh(){Ph||(Ph=(new Ih).b());return Ph}function Qh(){}Qh.prototype=new y;Qh.prototype.constructor=Qh;d=Qh.prototype;d.b=function(){return this};
d.ze=function(a,b){b=q(-862048943,b);b=q(461845907,b<<15|b>>>17|0);return a^b};function Rh(a,b){a=Na(b);if(a===b)return a;var c=u();a=Xh(c,b);c=c.S;return Fh(u(),a,c)===b?a^c:Ja(Ka(),b)}function Zf(a,b){return null===b?0:"number"===typeof b?Rh(0,+b):Da(b)?(a=Ua(b),Yh(0,(new K).k(a.d,a.j))):Ga(b)}d.ua=function(a,b){a=this.ze(a,b);return-430675100+q(5,a<<13|a>>>19|0)|0};function Yh(a,b){a=b.d;b=b.j;return b===a>>31?a:a^b}
d.lb=function(a,b){a^=b;a=q(-2048144789,a^(a>>>16|0));a=q(-1028477387,a^(a>>>13|0));return a^(a>>>16|0)};d.$classData=v({cp:0},!1,"scala.runtime.Statics$",{cp:1,c:1});var Zh=void 0;function R(){Zh||(Zh=(new Qh).b());return Zh}function $h(){}$h.prototype=new y;$h.prototype.constructor=$h;$h.prototype.b=function(){return this};$h.prototype.$classData=v({Ok:0},!1,"scalatags.JsDom$GenericAttr",{Ok:1,c:1,mp:1});v({Pk:0},!1,"scalatags.JsDom$GenericPixelStyle",{Pk:1,c:1,al:1});
v({Qk:0},!1,"scalatags.JsDom$GenericPixelStylePx",{Qk:1,c:1,al:1});function ai(){}ai.prototype=new y;ai.prototype.constructor=ai;ai.prototype.b=function(){return this};ai.prototype.$classData=v({Rk:0},!1,"scalatags.JsDom$GenericStyle",{Rk:1,c:1,zp:1});function be(){}be.prototype=new y;be.prototype.constructor=be;be.prototype.b=function(){return this};be.prototype.ig=function(){return"http://www.w3.org/2000/svg"};be.prototype.$classData=v({Yk:0},!1,"scalatags.generic.Namespace$$anon$1",{Yk:1,c:1,Yh:1});
function ae(){}ae.prototype=new y;ae.prototype.constructor=ae;ae.prototype.b=function(){return this};ae.prototype.ig=function(){return"http://www.w3.org/1999/xhtml"};ae.prototype.$classData=v({Zk:0},!1,"scalatags.generic.Namespace$$anon$2",{Zk:1,c:1,Yh:1});function ce(){}ce.prototype=new y;ce.prototype.constructor=ce;ce.prototype.b=function(){return this};ce.prototype.ig=function(){return"http://www.w3.org/1999/xlink"};
ce.prototype.$classData=v({$k:0},!1,"scalatags.generic.Namespace$$anon$3",{$k:1,c:1,Yh:1});function Kd(a,b,c){var e=Yd();if(bi(e.rk,a).r())throw(new wb).h(he(ie((new G).p(["Illegal tag name: "," is not a valid XML tag name"])),(new G).p([a])));var e=new ci,f=Td();e.xc=a;e.hd=f;e.le=b;e.Jb=c;return e}function di(){}di.prototype=new y;di.prototype.constructor=di;function ei(){}ei.prototype=di.prototype;function Dh(a){return!!(a&&a.$classData&&a.$classData.o.Cc||"number"===typeof a)}
function V(){this.$e=this.$g=null}V.prototype=new y;V.prototype.constructor=V;function fi(){}fi.prototype=V.prototype;V.prototype.Pf=function(){if(void 0===l.Error.captureStackTrace){try{var a={}.undef()}catch(b){if(a=nd(od(),b),null!==a)if(yh(a))a=a.yd;else throw xg(od(),a);else throw b;}this.stackdata=a}else l.Error.captureStackTrace(this),this.stackdata=this;return this};V.prototype.Sd=function(){return this.$g};V.prototype.q=function(){var a=qb(pa(this)),b=this.Sd();return null===b?a:a+": "+b};
V.prototype.Ka=function(a,b){this.$g=a;this.$e=b;this.Pf();return this};function gi(){this.Ri=this.nj=null;this.qj=this.rj=0;this.Wc=this.Rg=this.ce=null;this.Jf=!1}gi.prototype=new y;gi.prototype.constructor=gi;function hi(a){if(a.Jf){a.Wc=a.ce.exec(a.Rg);if(null!==a.Wc){var b=a.Wc[0];if(void 0===b)throw(new W).h("undefined.get");if(null===b)throw(new U).b();""===b&&(b=a.ce,b.lastIndex=1+(b.lastIndex|0)|0)}else a.Jf=!1;return null!==a.Wc}return!1}
function ii(a){if(null===a.Wc)throw(new ji).h("No match available");return a.Wc}function ki(a){li(a);hi(a);null===a.Wc||0===(ii(a).index|0)&&mi(a)===(a.Rg.length|0)||li(a);return null!==a.Wc}function mi(a){var b=ii(a).index|0;a=ii(a)[0];if(void 0===a)throw(new W).h("undefined.get");return b+(a.length|0)|0}
function ni(a,b,c,e){a.nj=b;a.Ri=c;a.rj=0;a.qj=e;b=a.nj;c=new l.RegExp(b.Zd);b=c!==b.Zd?c:new l.RegExp(b.Zd.source,(b.Zd.global?"g":"")+(b.Zd.ignoreCase?"i":"")+(b.Zd.multiline?"m":""));a.ce=b;a.Rg=na(Ma(a.Ri,a.rj,a.qj));a.Wc=null;a.Jf=!0;return a}function li(a){a.ce.lastIndex=0;a.Wc=null;a.Jf=!0}gi.prototype.$classData=v({Xl:0},!1,"java.util.regex.Matcher",{Xl:1,c:1,Np:1});function oi(){}oi.prototype=new y;oi.prototype.constructor=oi;oi.prototype.b=function(){return this};oi.prototype.Ef=function(){return(new jg).b()};
oi.prototype.Df=function(){return(new jg).b()};oi.prototype.$classData=v({km:0},!1,"scala.Predef$$anon$3",{km:1,c:1,kh:1});function pi(){this.ne=null}pi.prototype=new y;pi.prototype.constructor=pi;d=pi.prototype;d.fg=function(a,b){return(new qi).Ud(this.ne,a,b)};d.q=function(){var a=this.ne,b=(new jg).b(),c;c=!0;ng(b,"");for(var e=0,f=a.a.length;e<f;){var g=(new L).H(a.a[e]);c?(og(b,g),c=!1):(ng(b,""),og(b,g));e=1+e|0}ng(b,"");return b.zb.Qa};d.Ad=function(a){this.ne=a;return this};d.n=function(){return this.ne.a.length};
d.$classData=v({lm:0},!1,"scala.Predef$ArrayCharSequence",{lm:1,c:1,Vf:1});function Me(){}Me.prototype=new y;Me.prototype.constructor=Me;Me.prototype.b=function(){return this};Me.prototype.q=function(){return"object AnyRef"};Me.prototype.$classData=v({Dm:0},!1,"scala.package$$anon$1",{Dm:1,c:1,Yp:1});function ri(){this.kk=this.hj=this.nc=0}ri.prototype=new Wf;ri.prototype.constructor=ri;ri.prototype.b=function(){si=this;this.nc=Ha(Ia(),"Seq");this.hj=Ha(Ia(),"Map");this.kk=Ha(Ia(),"Set");return this};
function ti(a,b){if(b&&b.$classData&&b.$classData.o.Fj){for(var c=0,e=a.nc,f=b;!f.r();)b=f.B(),f=f.pc(),e=a.ua(e,Zf(R(),b)),c=1+c|0;a=a.lb(e,c)}else a=cg(a,b,a.nc);return a}ri.prototype.$classData=v({en:0},!1,"scala.util.hashing.MurmurHash3$",{en:1,dq:1,c:1});var si=void 0;function Yf(){si||(si=(new ri).b());return si}function ui(a,b){for(var c=!0;c&&a.E();)c=!!b.y(a.F());return c}function vi(a,b){for(;a.E();)b.y(a.F())}
function wi(a){if(a.E()){var b=a.F();return xi(new yi,b,zi(function(a){return function(){return a.za()}}(a)))}$e();return Ai()}function Bi(){}Bi.prototype=new sg;Bi.prototype.constructor=Bi;function Ci(){}Ci.prototype=Bi.prototype;function Di(){this.Ca=null}Di.prototype=new sg;Di.prototype.constructor=Di;function Ei(){}Ei.prototype=Di.prototype;Di.prototype.b=function(){this.Ca=(new Fi).nf(this);return this};function Gi(){this.zc=null}Gi.prototype=new y;Gi.prototype.constructor=Gi;
function Hi(){}Hi.prototype=Gi.prototype;Gi.prototype.Ef=function(){return this.zc.W()};Gi.prototype.Df=function(a){return a.gb().W()};Gi.prototype.nf=function(a){if(null===a)throw xg(od(),null);this.zc=a;return this};function Ii(){}Ii.prototype=new qg;Ii.prototype.constructor=Ii;function Ji(){}Ji.prototype=Ii.prototype;function Ki(){}Ki.prototype=new y;Ki.prototype.constructor=Ki;Ki.prototype.b=function(){return this};Ki.prototype.y=function(){return this};Ki.prototype.q=function(){return"\x3cfunction1\x3e"};
Ki.prototype.$classData=v({Hn:0},!1,"scala.collection.immutable.List$$anon$1",{Hn:1,c:1,T:1});function Li(a,b){b=b.fb();switch(b){case -1:break;default:a.Na(b)}}function Mi(a,b,c){c=c.fb();switch(c){case -1:break;default:a.Na(b<c?b:c)}}function Ni(){}Ni.prototype=new y;Ni.prototype.constructor=Ni;function Oi(){}Oi.prototype=Ni.prototype;Ni.prototype.q=function(){return"\x3cfunction0\x3e"};function Pi(){}Pi.prototype=new y;Pi.prototype.constructor=Pi;function Qi(){}Qi.prototype=Pi.prototype;
Pi.prototype.q=function(){return"\x3cfunction1\x3e"};function qi(){this.wf=null;this.Fi=this.eg=0}qi.prototype=new y;qi.prototype.constructor=qi;d=qi.prototype;d.fg=function(a,b){if(0>a)throw(new Si).ub(a);if(b>this.n())throw(new Si).ub(b);if(b<=a)return(new qi).Ud(this.wf,0,0);var c=this.eg+a|0;return(new qi).Ud(this.wf,c,c+(b-a|0)|0)};d.q=function(){var a=this.eg,a=0<a?a:0,b=this.wf.a.length,c=a+this.n()|0,b=b<c?b:c;return a>=b?"":th(Ia(),this.wf,a,b-a|0)};
d.n=function(){var a=this.Fi-this.eg|0;return 0>a?0:a};d.Ud=function(a,b,c){this.wf=a;this.eg=b;this.Fi=c;return this};d.$classData=v({Uo:0},!1,"scala.runtime.ArrayCharSequence",{Uo:1,c:1,Vf:1});function Ti(){this.U=!1}Ti.prototype=new y;Ti.prototype.constructor=Ti;Ti.prototype.q=function(){return""+this.U};function mg(){var a=new Ti;a.U=!0;return a}Ti.prototype.$classData=v({Vo:0},!1,"scala.runtime.BooleanRef",{Vo:1,c:1,f:1});
function Kh(a){return!!(a&&a.$classData&&1===a.$classData.re&&a.$classData.qe.o.ok)}var Ca=v({ok:0},!1,"scala.runtime.BoxedUnit",{ok:1,c:1,f:1},void 0,void 0,function(a){return void 0===a});function ag(){this.U=0}ag.prototype=new y;ag.prototype.constructor=ag;ag.prototype.q=function(){return""+this.U};ag.prototype.ub=function(a){this.U=a;return this};ag.prototype.$classData=v({Xo:0},!1,"scala.runtime.IntRef",{Xo:1,c:1,f:1});function Ui(){this.U=null}Ui.prototype=new y;Ui.prototype.constructor=Ui;
Ui.prototype.q=function(){return sh(Ia(),this.U)};Ui.prototype.V=function(a){this.U=a;return this};Ui.prototype.$classData=v({$o:0},!1,"scala.runtime.ObjectRef",{$o:1,c:1,f:1});function Vi(){}Vi.prototype=new y;Vi.prototype.constructor=Vi;function Wi(){}Wi.prototype=Vi.prototype;Vi.prototype.Kf=function(){};function Xi(){this.Wi=this.tg=this.Ih=this.Xi=this.cd=this.Ug=this.Od=this.vd=this.qc=null}Xi.prototype=new y;Xi.prototype.constructor=Xi;
function Yi(a,b,c){0===c?(0<=b.j?(c=b.j,c=0===c?-2147483637>(-2147483648^b.d):0>c):c=!1,a=c?a.Ih.a[b.d]:Zi(new X,b,0)):a=0===b.d&&0===b.j&&0<=c&&c<a.tg.a.length?a.tg.a[c]:Zi(new X,b,c);return a}
Xi.prototype.b=function(){$i=this;this.qc=(new X).k(0,0);this.vd=(new X).k(1,0);this.Od=(new X).k(10,0);this.Ug=aj(28,5);var a=this.Ug.a.length,b;b=[];for(var c=0;c<a;){var e=bj(0,this.Ug.a[c]);b.push(e);c=1+c|0}la(A(B),b);this.cd=aj(19,10);a=this.cd.a.length;b=[];for(c=0;c<a;)e=bj(0,this.cd.a[c]),b.push(e),c=1+c|0;this.Xi=la(A(B),b);a=[];for(b=0;11>b;)c=b,c=(new X).k(c,0),a.push(c),b=1+b|0;this.Ih=la(A(cj),a);a=[];for(b=0;11>b;)c=b,c=(new X).k(0,c),a.push(c),b=1+b|0;this.tg=la(A(cj),a);a=[];for(b=
0;100>b;)a.push(48),b=1+b|0;this.Wi=la(A(ab),a);return this};function dj(a,b){var c=a.j,e=b.j;if(c===e?(-2147483648^a.d)>(-2147483648^b.d):c>e)return 1;c=a.j;e=b.j;return(c===e?(-2147483648^a.d)<(-2147483648^b.d):c<e)?-1:0}
function ej(a,b,c,e){a=0>c?-c|0:c;var f=0===c?0:0>c?-1:1;if(tc().Me===e)return f;if(tc().He===e)return 0;if(tc().Ge===e)return 0<f?f:0;if(tc().Ie===e)return 0>f?f:0;if(tc().Ke===e)return 5<=a?f:0;if(tc().Je===e)return 5<a?f:0;if(tc().oe===e)return 5<(a+b|0)?f:0;if(tc().Le===e){if(0===c)return 0;throw(new fj).h("Rounding necessary");}throw(new C).V(e);}
function gj(a,b){a=b.j;(-1===a?0>(-2147483648^b.d):-1>a)?a=!0:(a=b.j,a=0===a?-1<(-2147483648^b.d):0<a);if(a)throw(new fj).h("Out of int range: "+b);return b.d}function bj(a,b){b=0>b.j?(new K).k(~b.d,~b.j):b;a=b.d;b=b.j;return 64-(0!==b?fa(b):32+fa(a)|0)|0}
function aj(a,b){a=r(A(db),[-1+a|0]);var c;c=[];var e,f=e=(new K).k(1,0);c.push(null===f?null:f);for(var f=0,g=a.a.length;f<g;){var h=a.a[f],k=h.d,n=h.j,h=Ua(e);e=h.d;h=h.j;Ua((new K).k(k,n));var k=b>>31,m=65535&e,n=e>>>16|0,p=65535&b,x=b>>>16|0,w=q(m,p),p=q(n,p),E=q(m,x),m=w+((p+E|0)<<16)|0,w=(w>>>16|0)+E|0;e=(((q(e,k)+q(h,b)|0)+q(n,x)|0)+(w>>>16|0)|0)+(((65535&w)+p|0)>>>16|0)|0;h=e=(new K).k(m,e);c.push(null===h?null:h);f=1+f|0}return la(A(db),c)}
Xi.prototype.$classData=v({zk:0},!1,"java.math.BigDecimal$",{zk:1,c:1,l:1,f:1});var $i=void 0;function Y(){$i||($i=(new Xi).b());return $i}function hj(){this.rg=this.$h=this.Af=this.qc=this.Od=this.vd=null}hj.prototype=new y;hj.prototype.constructor=hj;
hj.prototype.b=function(){ij=this;this.vd=(new D).k(1,1);this.Od=(new D).k(1,10);this.qc=(new D).k(0,0);this.Af=(new D).k(-1,1);var a=(new G).p([this.qc,this.vd,(new D).k(1,2),(new D).k(1,3),(new D).k(1,4),(new D).k(1,5),(new D).k(1,6),(new D).k(1,7),(new D).k(1,8),(new D).k(1,9),this.Od]),b=a.i.length|0,b=r(A(xc),[b]),c;c=0;for(a=I(new J,a,a.i.length|0);a.E();){var e=a.F();b.a[c]=e;c=1+c|0}this.$h=b;b=[];for(c=0;32>c;)a=c,a=ic(F(),(new K).k(0===(32&a)?1<<a:0,0===(32&a)?0:1<<a)),b.push(null===a?null:
a),c=1+c|0;this.rg=la(A(xc),b);return this};function ic(a,b){if(0>b.j)return-1!==b.d||-1!==b.j?(a=b.d,b=b.j,jj(new D,-1,(new K).k(-a|0,0!==a?~b:-b|0))):a.Af;var c=b.j;return(0===c?-2147483638>=(-2147483648^b.d):0>c)?a.$h.a[b.d]:jj(new D,1,b)}hj.prototype.$classData=v({Ak:0},!1,"java.math.BigInteger$",{Ak:1,c:1,l:1,f:1});var ij=void 0;function F(){ij||(ij=(new hj).b());return ij}function kj(){this.Le=this.oe=this.Je=this.Ke=this.Ie=this.Ge=this.He=this.Me=null}kj.prototype=new y;
kj.prototype.constructor=kj;
kj.prototype.b=function(){lj=this;this.Me=(new mj).Hb("UP",0);this.He=(new mj).Hb("DOWN",1);this.Ge=(new mj).Hb("CEILING",2);this.Ie=(new mj).Hb("FLOOR",3);this.Ke=(new mj).Hb("HALF_UP",4);this.Je=(new mj).Hb("HALF_DOWN",5);this.oe=(new mj).Hb("HALF_EVEN",6);this.Le=(new mj).Hb("UNNECESSARY",7);var a=(new G).p([this.Me,this.He,this.Ge,this.Ie,this.Ke,this.Je,this.oe,this.Le]),b=a.i.length|0,b=r(A(nj),[b]),c;c=0;for(a=I(new J,a,a.i.length|0);a.E();){var e=a.F();b.a[c]=e;c=1+c|0}return this};
function oj(a,b){switch(b){case 2:return a.Ge;case 1:return a.He;case 3:return a.Ie;case 5:return a.Je;case 6:return a.oe;case 4:return a.Ke;case 7:return a.Le;case 0:return a.Me;default:throw(new wb).h("Invalid rounding mode");}}kj.prototype.$classData=v({Jk:0},!1,"java.math.RoundingMode$",{Jk:1,c:1,l:1,f:1});var lj=void 0;function tc(){lj||(lj=(new kj).b());return lj}function pj(){}pj.prototype=new y;pj.prototype.constructor=pj;pj.prototype.b=function(){return this};pj.prototype.q=function(){return"TypedTag"};
pj.prototype.$classData=v({Uk:0},!1,"scalatags.JsDom$TypedTag$",{Uk:1,c:1,l:1,f:1});var qj=void 0;function rj(){qj||(qj=(new pj).b())}function sj(){this.zc=this.$e=null}sj.prototype=new y;sj.prototype.constructor=sj;sj.prototype.wg=function(a){a.appendChild(this.$e)};sj.prototype.Oe=function(a){this.wg(a)};function Nd(a,b){var c=new sj;c.$e=b;if(null===a)throw xg(od(),null);c.zc=a;return c}sj.prototype.$classData=v({Wk:0},!1,"scalatags.LowPriorityImplicits$bindNode",{Wk:1,c:1,Xh:1,zf:1});
var Ba=v({ql:0},!1,"java.lang.Boolean",{ql:1,c:1,f:1,mb:1},void 0,void 0,function(a){return"boolean"===typeof a});function L(){this.fa=0}L.prototype=new y;L.prototype.constructor=L;d=L.prototype;d.t=function(a){return tb(a)?this.fa===a.fa:!1};d.q=function(){return l.String.fromCharCode(this.fa)};d.H=function(a){this.fa=a;return this};d.x=function(){return this.fa};function tb(a){return!!(a&&a.$classData&&a.$classData.o.ej)}d.$classData=v({ej:0},!1,"java.lang.Character",{ej:1,c:1,f:1,mb:1});
function tj(){this.v=0}tj.prototype=new y;tj.prototype.constructor=tj;tj.prototype.b=function(){return this};function uj(a,b,c){return 36<c||2>c?-1:48<=b&&57>=b&&(-48+b|0)<c?-48+b|0:65<=b&&90>=b&&(-65+b|0)<(-10+c|0)?-55+b|0:97<=b&&122>=b&&(-97+b|0)<(-10+c|0)?-87+b|0:65313<=b&&65338>=b&&(-65313+b|0)<(-10+c|0)?-65303+b|0:65345<=b&&65370>=b&&(-65345+b|0)<(-10+c|0)?-65303+b|0:-1}tj.prototype.$classData=v({sl:0},!1,"java.lang.Character$",{sl:1,c:1,l:1,f:1});var vj=void 0;
function wj(){vj||(vj=(new tj).b());return vj}function xj(){this.Fg=null;this.v=!1}xj.prototype=new y;xj.prototype.constructor=xj;xj.prototype.b=function(){return this};function yj(a){a.v||(a.Fg=new l.RegExp("^[\\x00-\\x20]*[+-]?(NaN|Infinity|(\\d+\\.?\\d*|\\.\\d+)([eE][+-]?\\d+)?)[fFdD]?[\\x00-\\x20]*$"),a.v=!0);return a.Fg}function zj(a,b){if((a.v?a.Fg:yj(a)).test(b))return+l.parseFloat(b);throw(new Aj).h(he(ie((new G).p(['For input string: "','"'])),(new G).p([b])));}
xj.prototype.$classData=v({wl:0},!1,"java.lang.Double$",{wl:1,c:1,l:1,f:1});var Bj=void 0;function Cj(){Bj||(Bj=(new xj).b());return Bj}function Dj(){this.Fh=null;this.Oc=0}Dj.prototype=new y;Dj.prototype.constructor=Dj;function Ej(){}Ej.prototype=Dj.prototype;Dj.prototype.t=function(a){return this===a};Dj.prototype.q=function(){return this.Fh};Dj.prototype.Hb=function(a,b){this.Fh=a;this.Oc=b;return this};Dj.prototype.x=function(){return La(this)};function Fj(){V.call(this)}Fj.prototype=new fi;
Fj.prototype.constructor=Fj;function Gj(){}Gj.prototype=Fj.prototype;function Hj(){V.call(this)}Hj.prototype=new fi;Hj.prototype.constructor=Hj;function Ij(){}Ij.prototype=Hj.prototype;function Jj(){}Jj.prototype=new y;Jj.prototype.constructor=Jj;Jj.prototype.b=function(){return this};function Kj(a){throw(new Aj).h(he(ie((new G).p(['For input string: "','"'])),(new G).p([a])));}
function md(a,b,c){if(null===b||0===((new jd).h(b).e.length|0)||2>c||36<c)Kj(b);else if(a=45===(65535&(b.charCodeAt(0)|0))||43===(65535&(b.charCodeAt(0)|0))?1:0,((new jd).h(b).e.length|0)<=a)Kj(b);else{for(;;){var e=a,f=(new jd).h(b).e;if(e<(f.length|0))0>uj(wj(),65535&(b.charCodeAt(a)|0),c)&&Kj(b),a=1+a|0;else break}c=+l.parseInt(b,c);return c!==c||2147483647<c||-2147483648>c?Kj(b):Na(c)}}
function Lj(a,b){a=b-(1431655765&b>>1)|0;a=(858993459&a)+(858993459&a>>2)|0;return q(16843009,252645135&(a+(a>>4)|0))>>24}Jj.prototype.$classData=v({zl:0},!1,"java.lang.Integer$",{zl:1,c:1,l:1,f:1});var Mj=void 0;function kd(){Mj||(Mj=(new Jj).b());return Mj}function Nj(){this.ai=null;this.v=!1}Nj.prototype=new y;Nj.prototype.constructor=Nj;Nj.prototype.b=function(){return this};function Oj(a){throw(new Aj).h(he(ie((new G).p(['For input string: "','"'])),(new G).p([a])));}
Nj.prototype.$classData=v({Dl:0},!1,"java.lang.Long$",{Dl:1,c:1,l:1,f:1});var Pj=void 0;function Qj(){Pj||(Pj=(new Nj).b());return Pj}function Gd(){this.Pd=null;this.Te=!1}Gd.prototype=new y;Gd.prototype.constructor=Gd;d=Gd.prototype;d.b=function(){Gd.prototype.il.call(this,(new Rj).b());return this};
function Sj(a,b,c,e,f,g,h){var k=(b.length|0)+(c.length|0)|0;if(g<=k)b=""+c+b;else{var n=Tj("-",f);e=Tj("0",f)&&!e;var m="";for(g=g-k|0;0<g;)m=""+m+(e?"0":" "),g=-1+g|0;g=m;if(e&&n)throw(new Uj).h(f);b=n?""+c+b+g:e?""+c+g+b:""+g+c+b}h=90>=h?b.toUpperCase():b;a.Pd.vg(h)}d.q=function(){return Hd(this).q()};d.il=function(a){this.Pd=a;this.Te=!1;return this};function Vj(a,b,c,e,f,g){var h=65535&(b.charCodeAt(0)|0);43===h||45===h?Sj(a,b.substring(1),""+(new L).H(h)+c,!1,e,f,g):Sj(a,b,c,!1,e,f,g)}
function Tj(a,b){return 0<=(b.indexOf(a)|0)}function Hd(a){if(a.Te)throw(new Wj).b();return a.Pd}
function Id(a,b,c){if(a.Te)throw(new Wj).b();for(var e=b,f=0,g=0;;){var h=e;if(null===h)throw(new U).b();if(""!==h){h=e;var k=ze(ye().aj,h);if(k.r())if(ze(ye().Yi,h).r())if(ze(ye().Zi,h).r()){k=ze(ye().$i,h);if(k.r())throw(new C).V(h);var n=k.Td(),h=n[0];if(void 0===h)throw(new W).h("undefined.get");e=e.substring(h.length|0);h=n[2];if(void 0===h)throw(new W).h("undefined.get");k=n[1];k=void 0===k?"":k;if(null===k)throw(new U).b();k=""!==k?md(kd(),k,10):Tj("\x3c",h)?g:f=1+f|0;g=k;if(0>=k||k>c.a.length){a=
n[5];if(void 0===a)throw(new W).h("undefined.get");throw(new Xj).h(a);}var m=c.a[-1+k|0],k=n[3],k=void 0===k?"":k;if(null===k)throw(new U).b();var p=""!==k;if(p)k=md(kd(),k,10);else{if(Tj("-",h))throw(new Yj).h(b);k=0}var x=n[4],w=void 0===x?"":x;if(null===w)throw(new U).b();w=(x=""!==w)?md(kd(),w,10):0;n=n[5];if(void 0===n)throw(new W).h("undefined.get");n=65535&(n.charCodeAt(0)|0);switch(n){case 98:case 66:m=null===m?"false":"boolean"===typeof m?sh(Ia(),m):"true";Sj(a,m,"",!1,h,k,n);break;case 104:case 72:m=
null===m?"null":(+(Ga(m)>>>0)).toString(16);Sj(a,m,"",!1,h,k,n);break;case 115:case 83:if(m&&m.$classData&&m.$classData.o.Mp)h=(Tj("-",h)?1:0)|(Tj("#",h)?4:0)|(90>=n?2:0),m.Ip(a,h,p?k:-1,x?w:-1);else{if(Tj("#",h))throw a=new Zj,Zj.prototype.H.call(a,115),a.Lg="#",a;Sj(a,sh(Ia(),m),"",!1,h,k,n)}break;case 99:case 67:if(Ta(m))m|=0;else if(tb(m))m=null===m?0:m.fa;else throw(new C).V(m);Sj(a,l.String.fromCharCode(65535&m),"",!1,h,k,n);break;case 100:m=ak(m);bk(a,""+m,!1,h,k,n);break;case 111:if(Ta(m))m=
(+((m|0)>>>0)).toString(8);else{if(!Da(m))throw(new C).V(m);p=Ua(m);m=p.d;p=p.j;Qj();m=(new K).k(m,p);p=m.d;w=m.j;m=1073741823&p;x=1073741823&((p>>>30|0)+(w<<2)|0);p=w>>>28|0;0!==p?(p=(+(p>>>0)).toString(8),x=(+(x>>>0)).toString(8),w="0000000000".substring(x.length|0),m=(+(m>>>0)).toString(8),m=p+(""+w+x)+(""+"0000000000".substring(m.length|0)+m)):0!==x?(p=(+(x>>>0)).toString(8),m=(+(m>>>0)).toString(8),m=p+(""+"0000000000".substring(m.length|0)+m)):m=(+(m>>>0)).toString(8)}Vj(a,m,Tj("#",h)?"0":"",
h,k,n);break;case 120:case 88:if(Ta(m))m=(+((m|0)>>>0)).toString(16);else{if(!Da(m))throw(new C).V(m);p=Ua(m);m=p.d;p=p.j;Qj();p=(new K).k(m,p);m=p.d;p=p.j;0!==p?(p=(+(p>>>0)).toString(16),m=(+(m>>>0)).toString(16),m=p+(""+"00000000".substring(m.length|0)+m)):m=(+(m>>>0)).toString(16)}Vj(a,m,Tj("#",h)?"0x":"",h,k,n);break;case 101:case 69:ck(a,x?w:6,h,m,k,n);break;case 103:case 71:p=ak(m);p=+l.Math.abs(p);x=x?0===w?1:w:6;1E-4<=p&&p<+l.Math.pow(10,x)?(w=void 0!==l.Math.log10?+l.Math.log10(p):+l.Math.log(p)/
2.302585092994046,w=Na(+l.Math.ceil(w)),p=+l.Math.pow(10,w)<=p?1+w|0:w,m=ak(m),p=x-p|0,m=m.toFixed(0<p?p:0),bk(a,m,!1,h,k,n)):ck(a,-1+x|0,h,m,k,n);break;case 102:p=ak(m).toFixed(x?w:6);x=ak(m);x!==x?m=!0:(m=ak(m),m=Infinity===m||-Infinity===m);bk(a,p,m,h,k,n);break;default:throw(new C).V((new L).H(n));}}else e=e.substring(2),a.Pd.ug(10);else e=e.substring(2),a.Pd.ug(37);else{h=k.Td();k=h[0];if(void 0===k)throw(new W).h("undefined.get");e=e.substring(k.length|0);k=a.Pd;h=h[0];if(void 0===h)throw(new W).h("undefined.get");
k.vg(h)}}else break}return a}function ck(a,b,c,e,f,g){var h=ak(e).toExponential(b);101===(65535&(h.charCodeAt(-3+(h.length|0)|0)|0))?(b=h.substring(0,-1+(h.length|0)|0),h=65535&(h.charCodeAt(-1+(h.length|0)|0)|0),b=b+"0"+(new L).H(h)):b=h;h=ak(e);h!==h?e=!0:(e=ak(e),e=Infinity===e||-Infinity===e);bk(a,b,e,c,f,g)}d.Kf=function(){if(!this.Te){var a=this.Pd;a&&a.$classData&&a.$classData.o.pg&&a.Kf()}this.Te=!0};
function bk(a,b,c,e,f,g){45!==(65535&(b.charCodeAt(0)|0))?Tj("+",e)?Sj(a,b,"+",c,e,f,g):Tj(" ",e)?Sj(a,b," ",c,e,f,g):Sj(a,b,"",c,e,f,g):Tj("(",e)?Sj(a,b.substring(1)+")","(",c,e,f,g):Sj(a,b.substring(1),"-",c,e,f,g)}function ak(a){if(Dh(a))return"number"===typeof a?a:a.sc();if(tb(a))return null===a?0:a.fa;throw(new C).V(a);}d.$classData=v({Pl:0},!1,"java.util.Formatter",{Pl:1,c:1,pg:1,Nh:1});function nk(){this.og=this.Zd=null}nk.prototype=new y;nk.prototype.constructor=nk;nk.prototype.q=function(){return this.og};
nk.prototype.$classData=v({Yl:0},!1,"java.util.regex.Pattern",{Yl:1,c:1,l:1,f:1});function ok(){this.bj=this.cj=null}ok.prototype=new y;ok.prototype.constructor=ok;ok.prototype.b=function(){pk=this;this.cj=new l.RegExp("^\\\\Q(.|\\n|\\r)\\\\E$");this.bj=new l.RegExp("^\\(\\?([idmsuxU]*)(?:-([idmsuxU]*))?\\)");return this};
function Wd(a,b){var c=a.cj.exec(b);if(null!==c){c=c[1];if(void 0===c)throw(new W).h("undefined.get");c=(new ld).V((new Ad).Vc(qk(c),0))}else c=pd();if(c.r())if(c=a.bj.exec(b),null!==c){a=c[0];if(void 0===a)throw(new W).h("undefined.get");a=b.substring(a.length|0);var e=c[1];if(void 0===e)var f=0;else{var e=(new jd).h(e),g=e.e.length|0,h=0,k=0;a:for(;;){if(h!==g){f=1+h|0;h=e.Q(h);k=k|0|rk(null===h?0:h.fa);h=f;continue a}break}f=k|0}c=c[2];if(void 0===c)c=f;else{c=(new jd).h(c);e=c.e.length|0;g=0;
h=f;a:for(;;){if(g!==e){f=1+g|0;g=c.Q(g);h=(h|0)&~rk(null===g?0:g.fa);g=f;continue a}break}c=h|0}a=(new ld).V((new Ad).Vc(a,c))}else a=pd();else a=c;a=a.r()?(new Ad).Vc(b,0):a.Td();if(null===a)throw(new C).V(a);c=a.Ac()|0;a=new l.RegExp(a.Nc(),"g"+(0!==(2&c)?"i":"")+(0!==(8&c)?"m":""));c=new nk;c.Zd=a;c.og=b;return c}
function qk(a){for(var b="",c=0;c<(a.length|0);){var e=65535&(a.charCodeAt(c)|0);switch(e){case 92:case 46:case 40:case 41:case 91:case 93:case 123:case 125:case 124:case 63:case 42:case 43:case 94:case 36:e="\\"+(new L).H(e);break;default:e=(new L).H(e)}b=""+b+e;c=1+c|0}return b}function rk(a){switch(a){case 105:return 2;case 100:return 1;case 109:return 8;case 115:return 32;case 117:return 64;case 120:return 4;case 85:return 256;default:throw(new wb).h("bad in-pattern flag");}}
ok.prototype.$classData=v({Zl:0},!1,"java.util.regex.Pattern$",{Zl:1,c:1,l:1,f:1});var pk=void 0;function Vd(){pk||(pk=(new ok).b());return pk}function sk(){this.Yf=null}sk.prototype=new Be;sk.prototype.constructor=sk;sk.prototype.b=function(){tk=this;this.Yf=(new Sf).V(oe().kj);(new Sf).V(oe().Gi);(new Sf).V(null);return this};sk.prototype.$classData=v({am:0},!1,"scala.Console$",{am:1,Pp:1,c:1,Zp:1});var tk=void 0;function id(){tk||(tk=(new sk).b());return tk}
function uk(){this.hh=null;this.wj=!1;this.Wf=0;this.Fa=null;this.eh=this.gh=0}uk.prototype=new y;uk.prototype.constructor=uk;function vk(){}vk.prototype=uk.prototype;uk.prototype.q=function(){var a=qb(pa(this));a=(new jd).h(a);Ia();var b=a.q();"$"===b.substring((b.length|0)-1|0)?(b=a.q(),a=(a.q().length|0)-1|0,a=b.substring(0,a)):a=a.q();a=(new jd).h(a);a=wk(a,46);a=xk((new yk).Vd(a));a=(new jd).h(a);a=wk(a,36);return xk((new yk).Vd(a))};
uk.prototype.ub=function(a){this.hh=(new zk).b();this.wj=!1;(new zk).b();this.gh=this.Wf=a;this.eh=0>a?a:0;return this};function Ak(){}Ak.prototype=new y;Ak.prototype.constructor=Ak;Ak.prototype.b=function(){return this};function fe(a,b){return null===b?pd():(new ld).V(b)}Ak.prototype.$classData=v({gm:0},!1,"scala.Option$",{gm:1,c:1,l:1,f:1});var Bk=void 0;function ge(){Bk||(Bk=(new Ak).b());return Bk}function Ck(){}Ck.prototype=new Fe;Ck.prototype.constructor=Ck;
Ck.prototype.b=function(){Dk=this;rd();Te();Ek||(Ek=(new Fk).b());Gk();Rf||(Rf=(new Qf).b());Rf||(Rf=(new Qf).b());Hk||(Hk=(new Ik).b());(new oi).b();(new Jk).b();(new Kk).b();return this};function Lk(a,b){if(!b)throw(new Mk).V("assertion failed");}
function Nk(a,b){if(rb(b,1))return(new yk).Vd(b);if(hb(b,1))return(new Ok).lf(b);if(jb(b,1))return(new Pk).ef(b);if(ib(b,1))return(new Qk).Ad(b);if(ob(b,1))return(new Rk).ff(b);if(nb(b,1))return(new Sk).gf(b);if(lb(b,1))return(new Tk).hf(b);if(mb(b,1))return(new Uk).jf(b);if(kb(b,1))return(new Vk).kf(b);if(Kh(b))return(new Wk).mf(b);if(null===b)return null;throw(new C).V(b);}Ck.prototype.$classData=v({hm:0},!1,"scala.Predef$",{hm:1,Tp:1,c:1,Qp:1});var Dk=void 0;
function Xk(){Dk||(Dk=(new Ck).b());return Dk}function Yk(){}Yk.prototype=new y;Yk.prototype.constructor=Yk;Yk.prototype.b=function(){return this};Yk.prototype.$classData=v({om:0},!1,"scala.StringContext$",{om:1,c:1,l:1,f:1});var Zk=void 0;function $k(){this.If=null;this.ye=this.be=0;this.We=null;this.v=!1}$k.prototype=new y;$k.prototype.constructor=$k;$k.prototype.b=function(){al=this;this.be=-512;this.ye=512;this.We=sc().Kh;return this};
function td(a,b){var c=new xd,e=new X;a=""+a;X.prototype.Ud.call(e,rh(Ia(),a),0,a.length|0);a=b.Ed;var f=bl(e)-a|0;if(!(cl(e)<a||0===a||0>=f))if(64>e.Ea){a=Y().cd.a[f];var g=a.d,h=a.j,k=e.A,n=k>>31,m=f>>31;a=k-f|0;var k=(-2147483648^a)>(-2147483648^k)?-1+(n-m|0)|0:n-m|0,f=e.ta,m=f.d,p=f.j,n=u(),f=Sb(n,m,p,g,h),n=n.S,x=u(),m=Hc(x,m,p,g,h),p=x.S;if(0!==m||0!==p){Y();if(0>p)var x=-m|0,w=0!==m?~p:-p|0;else x=m,w=p;g=dj((new K).k(x<<1,x>>>31|0|w<<1),(new K).k(g,h));g=q(0>p?-1:0===p&&0===m?0:1,5+g|0);g=
ej(Y(),1&f,g,b.ee);h=g>>31;g=f+g|0;f=(-2147483648^g)<(-2147483648^f)?1+(n+h|0)|0:n+h|0;0>f?(h=-g|0,n=0!==g?~f:-f|0):(h=g,n=f);h=Fh(u(),h,n);(void 0!==l.Math.log10?+l.Math.log10(h):+l.Math.log(h)/2.302585092994046)>=b.Ed&&(a=-1+a|0,k=-1!==a?k:-1+k|0,h=u(),g=Sb(h,g,f,10,0),f=h.S);a=(new K).k(a,k);g=(new K).k(g,f)}else a=(new K).k(a,k),g=(new K).k(f,n);k=a;a=k.d;k=k.j;f=g;g=f.d;f=f.j;e.A=gj(Y(),(new K).k(a,k));e.sd=b.Ed;e.ta=(new K).k(g,f);e.Ea=bj(Y(),(new K).k(g,f));e.rd=null}else h=Cc($b(),(new K).k(f,
f>>31)),k=dl(el(e),h),n=e.A,m=n>>31,p=f>>31,g=n-f|0,f=(-2147483648^g)>(-2147483648^n)?-1+(m-p|0)|0:m-p|0,0!==k.a[1].z&&(n=fl(gl(hl(k.a[1])),h),h=il(k.a[0],0)?1:0,n=q(k.a[1].z,5+n|0),h=ej(Y(),h,n,b.ee),0!==h&&(h=ic(F(),(new K).k(h,h>>31)),n=k.a[0],k.a[0]=gc(nc(),n,h)),bl((new X).Wd(k.a[0]))>a&&(k.a[0]=jl(k.a[0],F().Od),g=h=-1+g|0,f=-1!==h?f:-1+f|0)),e.A=gj(Y(),(new K).k(g,f)),e.sd=a,kl(e,k.a[0]);return wd(c,e,b)}$k.prototype.$classData=v({rm:0},!1,"scala.math.BigDecimal$",{rm:1,c:1,l:1,f:1});
var al=void 0;function sd(){al||(al=(new $k).b());return al}function ll(){this.ye=this.be=0;this.xj=this.If=null}ll.prototype=new y;ll.prototype.constructor=ll;ll.prototype.b=function(){ml=this;this.be=-1024;this.ye=1024;this.If=r(A(nl),[1+(this.ye-this.be|0)|0]);this.xj=ic(F(),(new K).k(-1,-1));return this};
function ol(a,b){if(a.be<=b&&b<=a.ye){var c=b-a.be|0,e=a.If.a[c];null===e&&(e=F(),e=(new pl).Wd(ic(e,(new K).k(b,b>>31))),a.If.a[c]=e);return e}a=F();return(new pl).Wd(ic(a,(new K).k(b,b>>31)))}function ql(a,b){var c=a.be,e=c>>31,f=b.j;(e===f?(-2147483648^c)<=(-2147483648^b.d):e<f)?(c=a.ye,e=c>>31,f=b.j,c=f===e?(-2147483648^b.d)<=(-2147483648^c):f<e):c=!1;return c?ol(a,b.d):(new pl).Wd(ic(F(),b))}ll.prototype.$classData=v({tm:0},!1,"scala.math.BigInt$",{tm:1,c:1,l:1,f:1});var ml=void 0;
function rl(){ml||(ml=(new ll).b());return ml}function kf(){}kf.prototype=new y;kf.prototype.constructor=kf;kf.prototype.b=function(){return this};kf.prototype.$classData=v({vm:0},!1,"scala.math.Fractional$",{vm:1,c:1,l:1,f:1});var jf=void 0;function mf(){}mf.prototype=new y;mf.prototype.constructor=mf;mf.prototype.b=function(){return this};mf.prototype.$classData=v({wm:0},!1,"scala.math.Integral$",{wm:1,c:1,l:1,f:1});var lf=void 0;function of(){}of.prototype=new y;of.prototype.constructor=of;
of.prototype.b=function(){return this};of.prototype.$classData=v({xm:0},!1,"scala.math.Numeric$",{xm:1,c:1,l:1,f:1});var nf=void 0;function sl(){}sl.prototype=new ei;sl.prototype.constructor=sl;function tl(){}tl.prototype=sl.prototype;function Ed(a){return!!(a&&a.$classData&&a.$classData.o.uj)}function ul(){}ul.prototype=new y;ul.prototype.constructor=ul;ul.prototype.b=function(){return this};
function vl(a,b){b===t(bb)?b=zf():b===t(cb)?b=Af():b===t(ab)?b=Bf():b===t(B)?b=Cf():b===t(db)?b=Df():b===t(eb)?b=Ef():b===t(fb)?b=Ff():b===t($a)?b=Gf():b===t(Za)?b=Hf():b===t(z)?b=Fd():b===t(wl)?b=Mf():b===t(Hh)?b=Nf():(a=new xl,a.ag=b,b=a);return b}ul.prototype.$classData=v({Fm:0},!1,"scala.reflect.ClassTag$",{Fm:1,c:1,l:1,f:1});var yl=void 0;function zl(){yl||(yl=(new ul).b());return yl}function sf(){}sf.prototype=new y;sf.prototype.constructor=sf;sf.prototype.b=function(){return this};
sf.prototype.$classData=v({Zm:0},!1,"scala.util.Either$",{Zm:1,c:1,l:1,f:1});var rf=void 0;function uf(){}uf.prototype=new y;uf.prototype.constructor=uf;uf.prototype.b=function(){return this};uf.prototype.q=function(){return"Left"};uf.prototype.$classData=v({$m:0},!1,"scala.util.Left$",{$m:1,c:1,l:1,f:1});var tf=void 0;function wf(){}wf.prototype=new y;wf.prototype.constructor=wf;wf.prototype.b=function(){return this};wf.prototype.q=function(){return"Right"};
wf.prototype.$classData=v({an:0},!1,"scala.util.Right$",{an:1,c:1,l:1,f:1});var vf=void 0;function Al(){this.Gh=!1}Al.prototype=new y;Al.prototype.constructor=Al;Al.prototype.b=function(){this.Gh=!1;return this};Al.prototype.$classData=v({dn:0},!1,"scala.util.control.NoStackTrace$",{dn:1,c:1,l:1,f:1});var Bl=void 0;function Ud(){this.$f=null}Ud.prototype=new y;Ud.prototype.constructor=Ud;Ud.prototype.kl=function(a){this.$f=a;return this};Ud.prototype.q=function(){return this.$f.og};
function bi(a,b){if(null===b)return pd();var c=ni(new gi,a.$f,b,"string"===typeof b?b.length|0:b.n());if(ki(c)){b=-1+(ii(c).length|0)|0;b=(new Cl).dd(1,b,1);var e=Te().Ca;b=Dl(b,e);a=function(a,b){return function(a){a|=0;a=ii(b)[a];return void 0===a?null:a}}(a,c);c=Te().Ca;if(c===Te().Ca)if(b===Td())a=Td();else{c=b.B();e=c=El(new Fl,a(c),Td());for(b=b.pc();b!==Td();){var f=b.B(),f=El(new Fl,a(f),Td()),e=e.je=f;b=b.pc()}a=c}else{for(c=Gl(b,c);!b.r();)e=b.B(),c.Ba(a(e)),b=b.pc();a=c.ya()}return(new ld).V(a)}return pd()}
Ud.prototype.$classData=v({gn:0},!1,"scala.util.matching.Regex",{gn:1,c:1,l:1,f:1});function Hl(){this.zc=null}Hl.prototype=new Hi;Hl.prototype.constructor=Hl;Hl.prototype.b=function(){Gi.prototype.nf.call(this,Re());return this};Hl.prototype.Ef=function(){Re();Il();cf();return(new Jl).b()};Hl.prototype.$classData=v({mn:0},!1,"scala.collection.IndexedSeq$$anon$1",{mn:1,zj:1,c:1,kh:1});function Kl(){this.Ca=null}Kl.prototype=new Ei;Kl.prototype.constructor=Kl;function Ll(){}Ll.prototype=Kl.prototype;
function Fi(){this.bd=this.zc=null}Fi.prototype=new Hi;Fi.prototype.constructor=Fi;Fi.prototype.Ef=function(){return this.bd.W()};Fi.prototype.nf=function(a){if(null===a)throw xg(od(),null);this.bd=a;Gi.prototype.nf.call(this,a);return this};Fi.prototype.$classData=v({vn:0},!1,"scala.collection.generic.GenTraversableFactory$$anon$1",{vn:1,zj:1,c:1,kh:1});function Ml(){}Ml.prototype=new Ji;Ml.prototype.constructor=Ml;function Nl(){}Nl.prototype=Ml.prototype;function Ve(){}Ve.prototype=new y;
Ve.prototype.constructor=Ve;Ve.prototype.b=function(){return this};Ve.prototype.q=function(){return"::"};Ve.prototype.$classData=v({xn:0},!1,"scala.collection.immutable.$colon$colon$",{xn:1,c:1,l:1,f:1});var Ue=void 0;function Ol(){}Ol.prototype=new y;Ol.prototype.constructor=Ol;Ol.prototype.b=function(){return this};function Pl(a,b,c,e,f){throw(new wb).h(b+(f?" to ":" until ")+c+" by "+e+": seqs cannot contain more than Int.MaxValue elements.");}
Ol.prototype.$classData=v({On:0},!1,"scala.collection.immutable.Range$",{On:1,c:1,l:1,f:1});var Ql=void 0;function ff(){Ql||(Ql=(new Ol).b());return Ql}function Rl(){this.zc=null}Rl.prototype=new Hi;Rl.prototype.constructor=Rl;Rl.prototype.b=function(){Gi.prototype.nf.call(this,$e());return this};Rl.prototype.$classData=v({ao:0},!1,"scala.collection.immutable.Stream$StreamCanBuildFrom",{ao:1,zj:1,c:1,kh:1});function ef(){}ef.prototype=new y;ef.prototype.constructor=ef;ef.prototype.b=function(){return this};
ef.prototype.$classData=v({Ko:0},!1,"scala.collection.mutable.StringBuilder$",{Ko:1,c:1,l:1,f:1});var df=void 0;function Sl(){this.cf=null}Sl.prototype=new Oi;Sl.prototype.constructor=Sl;function zg(a){return(0,a.cf)()}function zi(a){var b=new Sl;b.cf=a;return b}Sl.prototype.$classData=v({Oo:0},!1,"scala.scalajs.runtime.AnonFunction0",{Oo:1,Aq:1,c:1,dp:1});function Tl(){this.cf=null}Tl.prototype=new Qi;Tl.prototype.constructor=Tl;Tl.prototype.y=function(a){return(0,this.cf)(a)};
function bg(a){var b=new Tl;b.cf=a;return b}Tl.prototype.$classData=v({Po:0},!1,"scala.scalajs.runtime.AnonFunction1",{Po:1,Bq:1,c:1,T:1});function Ul(){this.S=0;this.$b=null}Ul.prototype=new y;Ul.prototype.constructor=Ul;Ul.prototype.b=function(){Vl=this;this.$b=(new K).k(0,0);return this};function Wl(a,b,c){return 0===(-2097152&c)?""+(4294967296*c+ +(b>>>0)):Xl(a,b,c,1E9,0,2)}
function Sb(a,b,c,e,f){if(0===(e|f))throw(new fj).h("/ by zero");if(c===b>>31){if(f===e>>31){if(-2147483648===b&&-1===e)return a.S=0,-2147483648;var g=b/e|0;a.S=g>>31;return g}return-2147483648===b&&-2147483648===e&&0===f?a.S=-1:a.S=0}if(g=0>c){var h=-b|0;c=0!==b?~c:-c|0}else h=b;if(b=0>f){var k=-e|0;e=0!==e?~f:-f|0}else k=e,e=f;h=Yl(a,h,c,k,e);if(g===b)return h;g=a.S;a.S=0!==h?~g:-g|0;return-h|0}
function Fh(a,b,c){return 0>c?-(4294967296*+((0!==b?~c:-c|0)>>>0)+ +((-b|0)>>>0)):4294967296*c+ +(b>>>0)}function Xh(a,b){if(-9223372036854775808>b)return a.S=-2147483648,0;if(0x7fffffffffffffff<=b)return a.S=2147483647,-1;var c=b|0,e=b/4294967296|0;a.S=0>b&&0!==c?-1+e|0:e;return c}
function Yl(a,b,c,e,f){return 0===(-2097152&c)?0===(-2097152&f)?(c=(4294967296*c+ +(b>>>0))/(4294967296*f+ +(e>>>0)),a.S=c/4294967296|0,c|0):a.S=0:0===f&&0===(e&(-1+e|0))?(e=31-fa(e)|0,a.S=c>>>e|0,b>>>e|0|c<<1<<(31-e|0)):0===e&&0===(f&(-1+f|0))?(b=31-fa(f)|0,a.S=0,c>>>b|0):Xl(a,b,c,e,f,0)|0}function Ub(a,b,c,e,f){if(0===(e|f))throw(new fj).h("/ by zero");return 0===c?0===f?(a.S=0,+(b>>>0)/+(e>>>0)|0):a.S=0:Yl(a,b,c,e,f)}
function Zl(a,b,c){return c===b>>31?""+b:0>c?"-"+Wl(a,-b|0,0!==b?~c:-c|0):Wl(a,b,c)}
function Xl(a,b,c,e,f,g){var h=(0!==f?fa(f):32+fa(e)|0)-(0!==c?fa(c):32+fa(b)|0)|0,k=h,n=0===(32&k)?e<<k:0,m=0===(32&k)?(e>>>1|0)>>>(31-k|0)|0|f<<k:e<<k,k=b,p=c;for(b=c=0;0<=h&&0!==(-2097152&p);){var x=k,w=p,E=n,H=m;if(w===H?(-2147483648^x)>=(-2147483648^E):(-2147483648^w)>=(-2147483648^H))x=p,w=m,p=k-n|0,x=(-2147483648^p)>(-2147483648^k)?-1+(x-w|0)|0:x-w|0,k=p,p=x,32>h?c|=1<<h:b|=1<<h;h=-1+h|0;x=m>>>1|0;n=n>>>1|0|m<<31;m=x}h=p;if(h===f?(-2147483648^k)>=(-2147483648^e):(-2147483648^h)>=(-2147483648^
f))h=4294967296*p+ +(k>>>0),e=4294967296*f+ +(e>>>0),1!==g&&(m=h/e,f=m/4294967296|0,n=c,c=m=n+(m|0)|0,b=(-2147483648^m)<(-2147483648^n)?1+(b+f|0)|0:b+f|0),0!==g&&(e=h%e,k=e|0,p=e/4294967296|0);if(0===g)return a.S=b,c;if(1===g)return a.S=p,k;a=""+k;return""+(4294967296*b+ +(c>>>0))+"000000000".substring(a.length|0)+a}
function Hc(a,b,c,e,f){if(0===(e|f))throw(new fj).h("/ by zero");if(c===b>>31){if(f===e>>31){if(-1!==e){var g=b%e|0;a.S=g>>31;return g}return a.S=0}if(-2147483648===b&&-2147483648===e&&0===f)return a.S=0;a.S=c;return b}if(g=0>c){var h=-b|0;c=0!==b?~c:-c|0}else h=b;0>f?(b=-e|0,e=0!==e?~f:-f|0):(b=e,e=f);f=c;0===(-2097152&f)?0===(-2097152&e)?(h=(4294967296*f+ +(h>>>0))%(4294967296*e+ +(b>>>0)),a.S=h/4294967296|0,h|=0):a.S=f:0===e&&0===(b&(-1+b|0))?(a.S=0,h&=-1+b|0):0===b&&0===(e&(-1+e|0))?a.S=f&(-1+
e|0):h=Xl(a,h,f,b,e,1)|0;return g?(g=a.S,a.S=0!==h?~g:-g|0,-h|0):h}Ul.prototype.$classData=v({Ro:0},!1,"scala.scalajs.runtime.RuntimeLong$",{Ro:1,c:1,l:1,f:1});var Vl=void 0;function u(){Vl||(Vl=(new Ul).b());return Vl}var wl=v({Yo:0},!1,"scala.runtime.Nothing$",{Yo:1,Ra:1,c:1,f:1});function $l(){}$l.prototype=new Wi;$l.prototype.constructor=$l;function am(){}am.prototype=$l.prototype;$l.prototype.gl=function(){return this};
function X(){this.Nd=null;this.rb=0;this.rd=null;this.Ea=0;this.ta=u().$b;this.sd=this.A=0}X.prototype=new ei;X.prototype.constructor=X;d=X.prototype;d.Bb=function(){return-64>=this.A||this.A>cl(this)?u().$b:bm(this).Bb()};d.b=function(){this.Nd=null;this.Ea=this.rb=0;this.ta=u().$b;this.sd=this.A=0;return this};
function cm(a,b){var c=a.A,e=c>>31,f=-c|0,c=0!==c?~e:-e|0,g=cl(a),e=g>>31,g=f+g|0,f=(-2147483648^g)<(-2147483648^f)?1+(c+e|0)|0:c+e|0;if(0===f?-2147483629<(-2147483648^g):0<f)throw(new fj).h("Rounding necessary");a=dm(a);if(Lb(Ob(),a)<b)return a.Bb();throw(new fj).h("Rounding necessary");}d.t=function(a){if(a&&a.$classData&&a.$classData.o.Oh&&a.A===this.A){if(64>this.Ea){a=a.ta;var b=a.j,c=this.ta;return a.d===c.d&&b===c.j}return Eh(T(),this.rd,a.rd)}return!1};
function em(a){if(0===a.Ea){a=a.ta;var b=a.j;return!(-1===a.d&&-1===b)}return!1}
function fm(a){if(em(a))return a;var b=-1+$b().ud.a.length|0,c=1,e=el(a),f=a=a.A;a>>=31;a:for(;;){if(!il(e,0)){var g=gm(e,$b().ud.a[c]);if(0===g.de.z){var e=g.Xc,h=c,g=h>>31,k=a;a=f-h|0;f=(-2147483648^a)>(-2147483648^f)?-1+(k-g|0)|0:k-g|0;c=c<b?1+c|0:c;g=f;f=a;a=g;continue a}if(1!==c){c=1;continue a}}c=f;b=e;c=(new K).k(c,a);break}c=Ua(c);e=Ua((new K).k(c.d,c.j));c=e.d;e=e.j;return(new X).Xd(b,gj(Y(),(new K).k(c,e)))}
d.Xd=function(a,b){X.prototype.b.call(this);if(null===a)throw(new U).h("unscaledVal \x3d\x3d null");this.A=b;kl(this,a);return this};
d.q=function(){if(null!==this.Nd)return this.Nd;if(32>this.Ea)return this.Nd=Rb(Vb(),this.ta,this.A);var a=el(this),b=Tb(Vb(),a);if(0===this.A)return b;var c=0>el(this).z?2:1,e=b.length|0,f=this.A,g=f>>31,a=-f|0,g=0!==f?~g:-g|0,h=e>>31,f=a+e|0,g=(-2147483648^f)<(-2147483648^a)?1+(g+h|0)|0:g+h|0,h=c>>31,a=f-c|0,f=(-2147483648^a)>(-2147483648^f)?-1+(g-h|0)|0:g-h|0;if(0<this.A&&(-1===f?2147483642<=(-2147483648^a):-1<f))if(0<=f)Y(),a=e-this.A|0,Y(),a=b.substring(0,a)+"."+b.substring(a);else{Y();Y();e=
-1+c|0;Y();b=b.substring(0,e)+"0."+b.substring(e);c=1+c|0;e=Y().Wi;f=(new jg).b();g=!0;ng(f,"");for(var h=0,k=e.a.length;h<k;){var n=(new L).H(e.a[h]);g?(og(f,n),g=!1):(ng(f,""),og(f,n));h=1+h|0}ng(f,"");e=f.zb.Qa;a=-1-a|0;Y();a=e.substring(0,a);a=""+b.substring(0,c)+a+b.substring(c)}else b=(1<=(e-c|0)?(Y(),Y(),b.substring(0,c)+"."+b.substring(c)):b)+"E",a=((0===f?0!==a:0<f)?b+"+":b)+Zl(u(),a,f);return this.Nd=a};
function hm(a){if(64>a.Ea){if(0>a.ta.j)return-1;var b=a.ta;a=b.d;b=b.j;return(0===b?0!==a:0<b)?1:0}return el(a).z}d.k=function(a,b){X.prototype.b.call(this);this.ta=(new K).k(a,a>>31);this.A=b;Y();this.Ea=32-fa(0>a?~a:a)|0;return this};function yd(a,b){return im(a,oj(tc(),b))}function bm(a){if(0===a.A||em(a))return el(a);if(0>a.A){var b=el(a),c=$b();a=a.A;var e=a>>31;return yc(b,Cc(c,(new K).k(-a|0,0!==a?~e:-e|0)))}b=el(a);c=$b();a=a.A;return jl(b,Cc(c,(new K).k(a,a>>31)))}
function jm(a,b){var c=a.A,e=c>>31,f=b>>31;b=c-b|0;c=(-2147483648^b)>(-2147483648^c)?-1+(e-f|0)|0:e-f|0;return 64>a.Ea?(e=a.ta,f=e.j,0===e.d&&0===f?(a=Y(),b=(new K).k(b,c),c=b.d,a=b.d===c&&b.j===c>>31?Yi(a,u().$b,b.d):0<=b.j?(new X).k(0,2147483647):(new X).k(0,-2147483648)):a=Yi(Y(),a.ta,gj(Y(),(new K).k(b,c))),a):(new X).Xd(el(a),gj(Y(),(new K).k(b,c)))}
function bl(a){if(0===a.sd){if(0===a.Ea)var b=1;else if(64>a.Ea){var c=a.ta;if(0===c.d&&-2147483648===c.j)b=19;else{te();b=Y().cd;if(0>c.j)var e=c.d,c=c.j,e=(new K).k(-e|0,0!==e?~c:-c|0);else e=c;b:{var c=0,f=b.a.length;for(;;){if(c===f){b=-1-c|0;break b}var g=(c+f|0)>>>1|0,h=b.a[g],k=Ua(h),n=k.d,k=k.j,m=e.j;if(m===k?(-2147483648^e.d)<(-2147483648^n):m<k)f=g;else{if(S(T(),e,h)){b=g;break b}c=1+g|0}}}b=0>b?-1-b|0:1+b|0}}else b=1+Na(.3010299956639812*(-1+a.Ea|0))|0,e=el(a),c=$b(),b=0!==jl(e,Cc(c,(new K).k(b,
b>>31))).z?1+b|0:b;a.sd=b}return a.sd}function dm(a){if(0===a.A||em(a))return el(a);if(0>a.A){var b=el(a),c=$b();a=a.A;var e=a>>31;return yc(b,Cc(c,(new K).k(-a|0,0!==a?~e:-e|0)))}if(a.A>cl(a)||a.A>km(el(a)))throw(new fj).h("Rounding necessary");b=el(a);c=$b();a=a.A;a=dl(b,Cc(c,(new K).k(a,a>>31)));if(0!==a.a[1].z)throw(new fj).h("Rounding necessary");return a.a[0]}function kl(a,b){a.rd=b;a.Ea=Lb(Ob(),b);64>a.Ea&&(a.ta=b.Bb())}
function cl(a){return 0<a.sd?a.sd:1+Na(.3010299956639812*(-1+a.Ea|0))|0}
d.sc=function(){var a=hm(this),b=this.Ea,c=b>>31,e=u(),f=Xh(e,this.A/.3010299956639812),e=e.S,f=b-f|0,b=(-2147483648^f)>(-2147483648^b)?-1+(c-e|0)|0:c-e|0;if((-1===b?2147482574>(-2147483648^f):-1>b)||0===a)return 0*a;if(0===b?-2147482623<(-2147483648^f):0<b)return Infinity*a;c=hl(el(this));b=1076;if(0>=this.A)f=$b(),e=-this.A|0,e=yc(c,Cc(f,(new K).k(e,e>>31)));else{var e=$b(),g=this.A,e=Cc(e,(new K).k(g,g>>31)),f=100-f|0;0<f?(b=b-f|0,f=Fc(c,f)):f=c;f=gm(f,e);c=fl(gl(f.de),e);b=-2+b|0;f=Fc(f.Xc,2);
e=F();c=1+(q(c,3+c|0)/2|0)|0;c=ic(e,(new K).k(c,c>>31));e=gc(nc(),f,c)}var f=km(e),c=-54+Lb(Ob(),e)|0,h,k;if(0<c){if(e=Ec(e,c).Bb(),g=e.j,e=e.d,h=g,g=e,k=h,1===(1&e)&&f<c||3===(3&e)){var n=2+e|0,e=n;h=-2147483646>(-2147483648^n)?1+h|0:h}}else e=e.Bb(),g=e.d,k=e.j,h=-c|0,e=0===(32&h)?g<<h:0,h=0===(32&h)?(g>>>1|0)>>>(31-h|0)|0|k<<h:g<<h,g=e,k=h,3===(3&e)&&(e=n=2+e|0,h=-2147483646>(-2147483648^n)?1+h|0:h);0===(4194304&h)?(e=e>>>1|0|h<<31,h>>=1,b=b+c|0):(e=e>>>2|0|h<<30,h>>=2,b=b+(1+c|0)|0);if(2046<b)return Infinity*
a;if(-53>b)return 0*a;if(0>=b){e=g>>>1|0|k<<31;h=k>>1;k=63+b|0;g=e&(0===(32&k)?-1>>>k|0|-2<<(31-k|0):-1>>>k|0);k=h&(0===(32&k)?-1>>>k|0:0);b=-b|0;e=0===(32&b)?e>>>b|0|h<<1<<(31-b|0):h>>b;h=0===(32&b)?h>>b:h>>31;if(3===(3&e)||(1!==(1&e)||0===g&&0===k?0:f<c))b=h,e=f=1+e|0,h=0===f?1+b|0:b;b=0;f=h;e=e>>>1|0|f<<31;h=f>>1}f=e;b=-2147483648&a>>31|b<<20|1048575&h;a=Ka();b=(new K).k(f,b);a.Hd?(a.we[a.Pg]=b.j,a.we[a.Xg]=b.d,a=+a.Ng[0]):a=ph(b);return a};
function Zi(a,b,c){X.prototype.b.call(a);a.ta=b;a.A=c;a.Ea=bj(Y(),b);return a}d.x=function(){if(0===this.rb)if(64>this.Ea){this.rb=this.ta.d;var a=this.ta.j;this.rb=q(33,this.rb)+a|0;this.rb=q(17,this.rb)+this.A|0}else this.rb=q(17,this.rd.x())+this.A|0;return this.rb};
function im(a,b){if(null===b)throw(new U).h("roundingMode \x3d\x3d null");var c=a.A,e=c>>31,c=2-c|0,e=-2147483646<(-2147483648^c)?-1+(0-e|0)|0:0-e|0;if(0===c&&0===e)return a;if(0===e?0!==c:0<e){b=Y().cd.a.length;var f=b>>31;if(b=e===f?(-2147483648^c)<(-2147483648^b):e<f)b=(new K).k(c,e),b=64>(a.Ea+Y().Xi.a[b.d]|0);if(b){b=Y();e=a.ta;a=e.d;var e=e.j,c=Y().cd.a[c],f=c.d,g=65535&a,h=a>>>16|0,k=65535&f,n=f>>>16|0,m=q(g,k),k=q(h,k),p=q(g,n),g=m+((k+p|0)<<16)|0,m=(m>>>16|0)+p|0,c=(((q(a,c.j)+q(e,f)|0)+
q(h,n)|0)+(m>>>16|0)|0)+(((65535&m)+k|0)>>>16|0)|0;return Yi(b,(new K).k(g,c),2)}b=$b();a=el(a);e=c>>31;return(new X).Xd(Ac(b,a,(new K).k(c,e)),2)}64>a.Ea?(f=-c|0,h=0!==c?~e:-e|0,n=Y().cd.a.length,m=n>>31,f=h===m?(-2147483648^f)<(-2147483648^n):h<m):f=!1;if(f)return c=Y().cd.a[-c|0],e=c.d,f=c.j,c=Y(),a=a.ta,f=(new K).k(e,f),e=u(),n=Hc(e,a.d,a.j,f.d,f.j),m=e.S,e=a.j,h=f.j,h=q(0>e?-1:0===e&&0===a.d?0:1,0>h?-1:0===h&&0===f.d?0:1),e=u(),a=Sb(e,a.d,a.j,f.d,f.j),e=e.S,0!==n||0!==m?(0>m?(k=-n|0,n=0!==n?
~m:-m|0):(k=n,n=m),n=(new K).k(k<<1,k>>>31|0|n<<1),0>f.j&&(m=f.d,f=f.j,f=(new K).k(-m|0,0!==m?~f:-f|0)),f=ej(0,1&a,q(h,5+dj(n,f)|0),b),b=f>>31,f=h=a+f|0,b=(-2147483648^h)<(-2147483648^a)?1+(e+b|0)|0:e+b|0):(f=a,b=e),Yi(c,(new K).k(f,b),2);h=Cc($b(),(new K).k(-c|0,0!==c?~e:-e|0));c=Y();e=el(a);a=gm(e,h);0===a.de.z?b=(new X).Xd(a.Xc,2):(e=q(e.z,h.z),f=il(a.Xc,0)?1:0,63>Lb(Ob(),h)?(m=a.de.Bb(),n=m.d,k=m.j,m=h.Bb(),h=m.d,m=m.j,0>k?(g=-n|0,n=0!==n?~k:-k|0):(g=n,n=k),n=(new K).k(g<<1,g>>>31|0|n<<1),0>m?
(k=-h|0,h=0!==h?~m:-m|0):(k=h,h=m),h=dj(n,(new K).k(k,h))):h=fl(gl(hl(a.de)),hl(h)),b=ej(0,f,q(e,5+h|0),b),0!==b?(e=a.Xc,63>Lb(Ob(),e)?(e=a.Xc.Bb(),a=e.d,e=e.j,f=b>>31,b=a+b|0,b=Yi(c,(new K).k(b,(-2147483648^b)<(-2147483648^a)?1+(e+f|0)|0:e+f|0),2)):(c=a.Xc,b=ic(F(),(new K).k(b,b>>31)),b=gc(nc(),c,b),b=(new X).Xd(b,2))):b=(new X).Xd(a.Xc,2));return b}d.ec=function(){return-32>=this.A||this.A>cl(this)?0:bm(this).ec()};d.Wd=function(a){X.prototype.Xd.call(this,a,0);return this};
d.te=function(){var a=this.Ea,b=a>>31,c=u(),e=Xh(c,this.A/.3010299956639812),c=c.S,e=a-e|0,a=(-2147483648^e)>(-2147483648^a)?-1+(b-c|0)|0:b-c|0,b=da(hm(this));return(-1===a?2147483499>(-2147483648^e):-1>a)||0===b?da(0*b):(0===a?-2147483519<(-2147483648^e):0<a)?da(Infinity*b):da(this.sc())};
d.Ud=function(a,b,c){X.prototype.b.call(this);var e=-1+(b+c|0)|0;if(null===a)throw(new U).h("in \x3d\x3d null");if(e>=a.a.length||0>b||0>=c||0>e)throw(new Aj).h(he(ie((new G).p(["Bad offset/length: offset\x3d"," len\x3d"," in.length\x3d",""])),(new G).p([b,c,a.a.length])));var f=b;if(b<=e&&43===a.a[b]){f=1+f|0;if(f<e){Y();for(var g=a.a[f],h=[(new L).H(43),(new L).H(45)],k=(new L).H(g),n=0;;){if(n<(h.length|0))var m=h[n],p=!1===S(T(),m,k);else p=!1;if(p)n=1+n|0;else break}var x=n!==(h.length|0)}else x=
!1;if(x)throw(new Aj).h("For input string: "+a.q());}else{var w=f<=e&&45===a.a[f];if((1+f|0)<e){Y();for(var E=a.a[1+f|0],H=[(new L).H(43),(new L).H(45)],Q=(new L).H(E),ka=0;;){if(ka<(H.length|0))var oa=H[ka],gb=!1===S(T(),oa,Q);else gb=!1;if(gb)ka=1+ka|0;else break}var ea=ka!==(H.length|0)}else ea=!1;if(w&&ea)throw(new Aj).h("For input string: "+a.q());}for(var ta=f,Jb=!1;;){if(f<=e){Y();for(var Qa=a.a[f],Xb=[(new L).H(46),(new L).H(101),(new L).H(69)],Ri=(new L).H(Qa),Sh=0;;){if(Sh<(Xb.length|0))var Ms=
Xb[Sh],kq=!1===S(T(),Ms,Ri);else kq=!1;if(kq)Sh=1+Sh|0;else break}var lq=Sh===(Xb.length|0)}else lq=!1;if(lq)Jb||48===a.a[f]||(Jb=!0),f=1+f|0;else break}var mq=(new qi).Ud((new pi).Ad(a).ne,ta,f).q(),nq=f-ta|0;if(f<=e&&46===a.a[f]){for(var vm=f=1+f|0;;){if(f<=e){Y();for(var Ns=a.a[f],wm=[(new L).H(101),(new L).H(69)],Os=(new L).H(Ns),Th=0;;){if(Th<(wm.length|0))var Ps=wm[Th],oq=!1===S(T(),Ps,Os);else oq=!1;if(oq)Th=1+Th|0;else break}var pq=Th===(wm.length|0)}else pq=!1;if(pq)Jb||48===a.a[f]||(Jb=
!0),f=1+f|0;else break}this.A=f-vm|0;var qq=""+mq+(new qi).Ud((new pi).Ad(a).ne,vm,vm+this.A|0).q(),rq=nq+this.A|0}else this.A=0,qq=mq,rq=nq;var ua=qq,Qs=rq|0;if(f<=e){Y();for(var Rs=a.a[f],xm=[(new L).H(101),(new L).H(69)],Ss=(new L).H(Rs),Uh=0;;){if(Uh<(xm.length|0))var Ts=xm[Uh],sq=!1===S(T(),Ts,Ss);else sq=!1;if(sq)Uh=1+Uh|0;else break}var tq=Uh!==(xm.length|0)}else tq=!1;if(tq){var f=1+f|0,Us=(1+f|0)<=e&&45!==a.a[1+f|0],uq=f<=e&&43===a.a[f]&&Us?1+f|0:f,Vs=th(Ia(),a,uq,(1+e|0)-uq|0),ym=this.A,
vq=ym>>31,wq=md(kd(),Vs,10),xq=wq>>31,zm=ym-wq|0,yq=this.A=zm;if(zm!==yq||((-2147483648^zm)>(-2147483648^ym)?-1+(vq-xq|0)|0:vq-xq|0)!==yq>>31)throw(new Aj).h("Scale out of range");}if(19>Qs){var Am;var Vh=Qj();""===ua&&Oj(ua);var Bm=0,zq=!1;switch(65535&(ua.charCodeAt(0)|0)){case 43:Bm=1;break;case 45:Bm=1,zq=!0}var Bg;var Aq=Bm,jc=ua.length|0;if(Aq>=jc)Oj(ua),Bg=void 0;else{if(!Vh.v&&!Vh.v){for(var Cm=[],Dm=0;;){Cm.push(null);if(1===Dm)break;Dm=1+Dm|0}for(var dk=2;;){for(var Em=dk,Ws=2147483647/
Em|0,ek=Em,Fm=1;ek<=Ws;)ek=q(ek,Em),Fm=1+Fm|0;var Gm=ek,Bq=Gm>>31,Cq=u(),Xs=Ub(Cq,-1,-1,Gm,Bq),Ys=Cq.S,fk=new ke,Zs=(new K).k(Gm,Bq),$s=(new K).k(Xs,Ys);fk.fi=Fm;fk.pj=Zs;fk.lj=$s;Cm.push(fk);if(36===dk)break;dk=1+dk|0}Vh.ai=Cm;Vh.v=!0}for(var Hm=Vh.ai[10],gk=Hm.fi,kc=Aq;;)if(kc<jc&&48===(65535&(ua.charCodeAt(kc)|0)))kc=1+kc|0;else break;(jc-kc|0)>q(3,gk)&&Oj(ua);for(var hk=kc;hk<jc;)0>uj(wj(),65535&(ua.charCodeAt(hk)|0),10)&&Oj(ua),hk=1+hk|0;var ik=kc+(1+((-1+(jc-kc|0)|0)%gk|0)|0)|0,at=ua.substring(kc,
ik),bt=+l.parseInt(at,10),jk=Na(bt);if(ik===jc)Bg=(new K).k(jk,0);else{var Dq=Hm.pj,Wh=Dq.d,Eq=Dq.j,kk=ik+gk|0,Fq=65535&jk,Gq=jk>>>16|0,Hq=65535&Wh,Iq=Wh>>>16|0,Jq=q(Fq,Hq),Kq=q(Gq,Hq),Lq=q(Fq,Iq),Mq=Jq+((Kq+Lq|0)<<16)|0,Nq=(Jq>>>16|0)+Lq|0,Oq=((q(jk,Eq)+q(Gq,Iq)|0)+(Nq>>>16|0)|0)+(((65535&Nq)+Kq|0)>>>16|0)|0,ct=ua.substring(ik,kk),dt=+l.parseInt(ct,10),Cg=Mq+Na(dt)|0,lk=(-2147483648^Cg)<(-2147483648^Mq)?1+Oq|0:Oq;if(kk===jc)Bg=(new K).k(Cg,lk);else{Lk(Xk(),(kk+gk|0)===jc);var Pq=Hm.lj,et=Pq.d,Qq=
Pq.j,ft=ua.substring(kk,jc),gt=+l.parseInt(ft,10),Rq=Na(gt);(lk===Qq?(-2147483648^Cg)>(-2147483648^et):lk>Qq)&&Oj(ua);var Sq=65535&Cg,Tq=Cg>>>16|0,Uq=65535&Wh,Vq=Wh>>>16|0,Wq=q(Sq,Uq),Xq=q(Tq,Uq),Yq=q(Sq,Vq),Zq=Wq+((Xq+Yq|0)<<16)|0,$q=(Wq>>>16|0)+Yq|0,ar=(((q(Cg,Eq)+q(lk,Wh)|0)+q(Tq,Vq)|0)+($q>>>16|0)|0)+(((65535&$q)+Xq|0)>>>16|0)|0,Im=Zq+Rq|0,br=(-2147483648^Im)<(-2147483648^Zq)?1+ar|0:ar;-2147483648===(-2147483648^br)&&(-2147483648^Im)<(-2147483648^Rq)&&Oj(ua);Bg=(new K).k(Im,br)}}}var Jm=Bg.d,
mk=Bg.j;if(zq){var cr=-Jm|0,Km=0!==Jm?~mk:-mk|0;(0===Km?0!==cr:0<Km)&&Oj(ua);Am=(new K).k(cr,Km)}else 0>mk&&Oj(ua),Am=(new K).k(Jm,mk);this.ta=Am;this.Ea=bj(Y(),this.ta)}else kl(this,(new D).h(ua));return this};function el(a){null===a.rd&&(a.rd=ic(F(),a.ta));return a.rd}
function lm(a,b){var c=hm(a),e=hm(b);if(c===e){if(a.A===b.A&&64>a.Ea&&64>b.Ea){var c=a.ta,e=c.d,c=c.j,f=b.ta,g=f.j;if(c===g?(-2147483648^e)<(-2147483648^f.d):c<g)return-1;e=a.ta;a=e.d;e=e.j;b=b.ta;c=b.j;return(e===c?(-2147483648^a)>(-2147483648^b.d):e>c)?1:0}var f=a.A,g=f>>31,e=b.A,h=e>>31,e=f-e|0,f=(-2147483648^e)>(-2147483648^f)?-1+(g-h|0)|0:g-h|0,g=cl(a)-cl(b)|0,h=g>>31,k=1+e|0,n=0===k?1+f|0:f;if(h===n?(-2147483648^g)>(-2147483648^k):h>n)return c;h=g>>31;k=-1+e|0;n=-1!==k?f:-1+f|0;if(h===n?(-2147483648^
g)<(-2147483648^k):h<n)return-c|0;a=el(a);b=el(b);if(0>f)c=$b(),a=yc(a,Cc(c,(new K).k(-e|0,0!==e?~f:-f|0)));else if(0===f?0!==e:0<f)b=yc(b,Cc($b(),(new K).k(e,f)));return fl(a,b)}return c<e?-1:1}var cj=v({Oh:0},!1,"java.math.BigDecimal",{Oh:1,Cc:1,c:1,f:1,mb:1});X.prototype.$classData=cj;function D(){this.w=null;this.rb=this.Uf=this.z=this.G=0}D.prototype=new ei;D.prototype.constructor=D;
function Gc(a,b){if(0>b)throw(new fj).h("Negative exponent");if(0===b)return F().vd;if(1===b||a.t(F().vd)||a.t(F().qc))return a;if(il(a,0)){a:{$b();var c=F().vd,e=a;for(;;)if(1<b)a=0!==(1&b)?yc(c,e):c,1===e.G?e=yc(e,e):(c=r(A(B),[e.G<<1]),c=zc(e.w,e.G,c),e=new D,D.prototype.b.call(e),0===c.a.length?(e.z=0,e.G=1,e.w=hc(M(),0,(new G).p([]))):(e.z=1,e.G=c.a.length,e.w=c,Hb(e))),b>>=1,c=a;else{a=yc(c,e);break a}}return a}for(c=1;!il(a,c);)c=1+c|0;var e=F(),f=q(c,b);if(f<e.rg.a.length)e=e.rg.a[f];else{var e=
f>>5,f=31&f,g=r(A(B),[1+e|0]);g.a[e]=1<<f;e=Gb(new D,1,1+e|0,g)}return yc(e,Gc(Ec(a,c),b))}d=D.prototype;d.Bb=function(){if(1<this.G)var a=this.w.a[0],b=this.w.a[1];else a=this.w.a[0],b=0;var c=this.z,e=c>>31,f=65535&c,g=c>>>16|0,h=65535&a,k=a>>>16|0,n=q(f,h),h=q(g,h),m=q(f,k),f=n+((h+m|0)<<16)|0,n=(n>>>16|0)+m|0,b=(((q(c,b)+q(e,a)|0)+q(g,k)|0)+(n>>>16|0)|0)+(((65535&n)+h|0)>>>16|0)|0;return(new K).k(f,b)};d.b=function(){this.Uf=-2;this.rb=0;return this};
function jl(a,b){if(0===b.z)throw(new fj).h("BigInteger divide by zero");var c=b.z;if(1===b.G&&1===b.w.a[0])return 0<b.z?a:mc(a);var e=a.z,f=a.G,g=b.G;if(2===(f+g|0))return a=a.w.a[0],b=b.w.a[0],f=u(),b=Sb(f,a,0,b,0),a=f.S,e!==c&&(c=b,e=a,b=-c|0,a=0!==c?~e:-e|0),ic(F(),(new K).k(b,a));var h=f!==g?f>g?1:-1:ec(nc(),a.w,b.w,f);if(0===h)return e===c?F().vd:F().Af;if(-1===h)return F().qc;var h=1+(f-g|0)|0,k=r(A(B),[h]),c=e===c?1:-1;1===g?ac(Zb(),k,a.w,f,b.w.a[0]):Yb(Zb(),k,h,a.w,f,b.w,g);c=Gb(new D,c,
h,k);Hb(c);return c}d.t=function(a){if(a&&a.$classData&&a.$classData.o.Ph){var b;if(b=this.z===a.z&&this.G===a.G){a=a.w;b=(new mm).dd(0,this.G,1);b=I(new J,b,b.n());for(var c=!0;c&&b.E();)c=b.F()|0,c=this.w.a[c]===a.a[c];b=c}a=b}else a=!1;return a};d.q=function(){return Tb(Vb(),this)};d.k=function(a,b){D.prototype.b.call(this);this.z=a;this.G=1;this.w=hc(M(),b,(new G).p([]));return this};function Mb(a){if(-2===a.Uf){if(0===a.z)var b=-1;else for(b=0;0===a.w.a[b];)b=1+b|0;a.Uf=b}return a.Uf}
function hl(a){return 0>a.z?Gb(new D,1,a.G,a.w):a}
function gm(a,b){var c=b.z;if(0===c)throw(new fj).h("BigInteger divide by zero");var e=b.G;b=b.w;if(1===e){Zb();b=b.a[0];var f=a.w,g=a.G,e=a.z;1===g?(f=f.a[0],a=+(f>>>0)/+(b>>>0)|0,g=0,b=+(f>>>0)%+(b>>>0)|0,f=0,e!==c&&(c=a,a=-c|0,g=0!==c?~g:-g|0),0>e&&(c=b,e=f,b=-c|0,f=0!==c?~e:-e|0),c=Bb(new Ab,ic(F(),(new K).k(a,g)),ic(F(),(new K).k(b,f)))):(c=e===c?1:-1,a=r(A(B),[g]),b=ac(0,a,f,g,b),b=hc(M(),b,(new G).p([])),c=Gb(new D,c,g,a),e=Gb(new D,e,1,b),Hb(c),Hb(e),c=Bb(new Ab,c,e));return c}g=a.w;f=a.G;
if(0>(f!==e?f>e?1:-1:ec(nc(),g,b,f)))return Bb(new Ab,F().qc,a);a=a.z;var h=1+(f-e|0)|0,c=a===c?1:-1,k=r(A(B),[h]);b=Yb(Zb(),k,h,g,f,b,e);c=Gb(new D,c,h,k);e=Gb(new D,a,e,b);Hb(c);Hb(e);return Bb(new Ab,c,e)}function Hb(a){a:for(;;){if(0<a.G&&(a.G=-1+a.G|0,0===a.w.a[a.G]))continue a;break}0===a.w.a[a.G]&&(a.z=0);a.G=1+a.G|0}
function il(a,b){var c=b>>5;if(0===b)return 0!==(1&a.w.a[0]);if(0>b)throw(new fj).h("Negative bit address");if(c>=a.G)return 0>a.z;if(0>a.z&&c<Mb(a))return!1;var e=a.w.a[c];0>a.z&&(e=Mb(a)===c?-e|0:~e);return 0!==(e&1<<(31&b))}function km(a){if(0===a.z)return-1;var b=Mb(a);a=a.w.a[b];return(b<<5)+(0===a?32:31-fa(a&(-a|0))|0)|0}function mc(a){return 0===a.z?a:Gb(new D,-a.z|0,a.G,a.w)}function Gb(a,b,c,e){D.prototype.b.call(a);a.z=b;a.G=c;a.w=e;return a}
function gl(a){if(0!==a.z){Ob();var b=a.G,c=1+b|0,e=r(A(B),[c]);Db(0,e,a.w,b);a=Gb(new D,a.z,c,e);Hb(a)}return a}d.sc=function(){return zj(Cj(),Tb(Vb(),this))};
d.Hb=function(a,b){D.prototype.b.call(this);F();if(null===a)throw(new U).b();if(2>b||36<b)throw(new Aj).h("Radix out of range");if(null===a)throw(new U).b();if(""===a)throw(new Aj).h("Zero length BigInteger");if(""===a||"+"===a||"-"===a)throw(new Aj).h("Zero length BigInteger");var c=a.length|0;if(45===(65535&(a.charCodeAt(0)|0)))var e=-1,f=1,g=-1+c|0;else 43===(65535&(a.charCodeAt(0)|0))?(f=e=1,g=-1+c|0):(e=1,f=0,g=c);var e=e|0,h=f|0,f=g|0,g=-1+c|0;if(!(h>=c))for(var k=h;;){var n=65535&(a.charCodeAt(k)|
0);if(43===n||45===n)throw(new Aj).h("Illegal embedded sign character");if(k===g)break;k=1+k|0}var g=Vb().Lh.a[b],k=f/g|0,m=f%g|0;0!==m&&(k=1+k|0);f=r(A(B),[k]);k=Vb().Jh.a[-2+b|0];n=0;for(m=h+(0===m?g:m)|0;h<c;){var p=md(kd(),a.substring(h,m),b),h=Bc($b(),f,f,n,k);nc();for(var x=f,w=n,E=p,p=0;0!==E&&p<w;){var H=E,E=H+x.a[p]|0,H=(-2147483648^E)<(-2147483648^H)?1:0;x.a[p]=E;E=H;p=1+p|0}h=h+E|0;f.a[n]=h;n=1+n|0;h=m;m=h+g|0}this.z=e;this.G=n;this.w=f;Hb(this);return this};
d.x=function(){if(0===this.rb){var a=this.G,b=-1+a|0;if(!(0>=a))for(a=0;;){var c=a;this.rb=q(33,this.rb)+this.w.a[c]|0;if(a===b)break;a=1+a|0}this.rb=q(this.rb,this.z)}return this.rb};function dl(a,b){a=gm(a,b);var c=(new G).p([a.Xc,a.de]);a=c.i.length|0;a=r(A(xc),[a]);b=0;for(c=I(new J,c,c.i.length|0);c.E();){var e=c.F();a.a[b]=e;b=1+b|0}return a}d.h=function(a){D.prototype.Hb.call(this,a,10);return this};function Fc(a,b){return 0===b||0===a.z?a:0<b?Eb(Ob(),a,b):Ib(Ob(),a,-b|0)}
d.ec=function(){return q(this.z,this.w.a[0])};function yc(a,b){return 0===b.z||0===a.z?F().qc:Dc($b(),a,b)}function jj(a,b,c){D.prototype.b.call(a);a.z=b;b=c.j;0===b?(a.G=1,a.w=hc(M(),c.d,(new G).p([]))):(a.G=2,a.w=hc(M(),c.d,(new G).p([b])));return a}function Ec(a,b){return 0===b||0===a.z?a:0<b?Ib(Ob(),a,b):Eb(Ob(),a,-b|0)}function fl(a,b){return a.z>b.z?1:a.z<b.z?-1:a.G>b.G?a.z:a.G<b.G?-b.z|0:q(a.z,ec(nc(),a.w,b.w,a.G))}var xc=v({Ph:0},!1,"java.math.BigInteger",{Ph:1,Cc:1,c:1,f:1,mb:1});
D.prototype.$classData=xc;function mj(){Dj.call(this)}mj.prototype=new Ej;mj.prototype.constructor=mj;mj.prototype.Hb=function(a,b){Dj.prototype.Hb.call(this,a,b);return this};var nj=v({Ik:0},!1,"java.math.RoundingMode",{Ik:1,Kp:1,c:1,mb:1,f:1});mj.prototype.$classData=nj;var qa=v({dl:0},!1,"java.lang.String",{dl:1,c:1,f:1,Vf:1,mb:1},void 0,void 0,function(a){return"string"===typeof a});function Mk(){V.call(this)}Mk.prototype=new Gj;Mk.prototype.constructor=Mk;
Mk.prototype.V=function(a){V.prototype.Ka.call(this,na(a),null);return this};Mk.prototype.$classData=v({pl:0},!1,"java.lang.AssertionError",{pl:1,Lp:1,Ra:1,c:1,f:1});
var sa=v({rl:0},!1,"java.lang.Byte",{rl:1,Cc:1,c:1,f:1,mb:1},void 0,void 0,function(a){return ra(a)}),Aa=v({vl:0},!1,"java.lang.Double",{vl:1,Cc:1,c:1,f:1,mb:1},void 0,void 0,function(a){return"number"===typeof a}),za=v({xl:0},!1,"java.lang.Float",{xl:1,Cc:1,c:1,f:1,mb:1},void 0,void 0,function(a){return ya(a)}),xa=v({yl:0},!1,"java.lang.Integer",{yl:1,Cc:1,c:1,f:1,mb:1},void 0,void 0,function(a){return Ta(a)});function nm(){}nm.prototype=new Wi;nm.prototype.constructor=nm;nm.prototype.b=function(){return this};
nm.prototype.$classData=v({Bl:0},!1,"java.lang.JSConsoleBasedPrintStream$DummyOutputStream",{Bl:1,yk:1,c:1,pg:1,Nh:1});var Ea=v({Cl:0},!1,"java.lang.Long",{Cl:1,Cc:1,c:1,f:1,mb:1},void 0,void 0,function(a){return Da(a)});function om(){V.call(this)}om.prototype=new Ij;om.prototype.constructor=om;function pm(){}pm.prototype=om.prototype;var wa=v({Hl:0},!1,"java.lang.Short",{Hl:1,Cc:1,c:1,f:1,mb:1},void 0,void 0,function(a){return va(a)});function Rj(){this.Qa=null}Rj.prototype=new y;
Rj.prototype.constructor=Rj;d=Rj.prototype;d.b=function(){Rj.prototype.h.call(this,"");return this};function qm(a,b){a.Qa=""+a.Qa+(null===b?"null":b);return a}d.fg=function(a,b){return this.Qa.substring(a,b)};d.q=function(){return this.Qa};d.vg=function(a){return rm(this,a)};function rm(a,b){return null===b?qm(a,null):qm(a,na(b))}d.ub=function(){Rj.prototype.h.call(this,"");return this};function sm(a,b,c,e){return null===b?sm(a,"null",c,e):qm(a,na(Ma(b,c,e)))}
d.n=function(){return this.Qa.length|0};function tm(a,b){return qm(a,l.String.fromCharCode(b))}d.h=function(a){this.Qa=a;return this};d.ug=function(a){return tm(this,a)};d.$classData=v({Il:0},!1,"java.lang.StringBuilder",{Il:1,c:1,Vf:1,nl:1,f:1});function um(){}um.prototype=new De;um.prototype.constructor=um;um.prototype.b=function(){return this};function hc(a,b,c){a=r(A(B),[1+c.n()|0]);a.a[0]=b;b=1;for(c=c.I();c.E();){var e=c.F()|0;a.a[b]=e;b=1+b|0}return a}
function Z(a,b,c,e,f,g){a=pa(b);var h;if(h=!!a.rc.isArrayClass)h=pa(e),h.rc.isPrimitive||a.rc.isPrimitive?a=h===a||(h===t(cb)?a===t(bb):h===t(B)?a===t(bb)||a===t(cb):h===t(eb)?a===t(bb)||a===t(cb)||a===t(B):h===t(fb)&&(a===t(bb)||a===t(cb)||a===t(B)||a===t(eb))):(a=a.rc.getFakeInstance(),a=!!h.rc.isInstance(a)),h=a;if(h)Sa(b,c,e,f,g);else for(a=c,c=c+g|0;a<c;)Lh(Nh(),e,f,Oh(Nh(),b,a)),a=1+a|0,f=1+f|0}um.prototype.$classData=v({$l:0},!1,"scala.Array$",{$l:1,Sp:1,c:1,l:1,f:1});var Lm=void 0;
function M(){Lm||(Lm=(new um).b());return Lm}function Mm(){}Mm.prototype=new y;Mm.prototype.constructor=Mm;function Nm(){}Nm.prototype=Mm.prototype;Mm.prototype.q=function(){return"\x3cfunction1\x3e"};function Om(){}Om.prototype=new y;Om.prototype.constructor=Om;function Pm(){}Pm.prototype=Om.prototype;Om.prototype.q=function(){return"\x3cfunction1\x3e"};function vd(){uk.call(this);this.Mh=null}vd.prototype=new vk;vd.prototype.constructor=vd;
vd.prototype.b=function(){uk.prototype.ub.call(this,0);ud=this;var a=tc().Me.Oc,b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"UP";Qm(this,a,b);a=tc().He.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"DOWN";Qm(this,a,b);a=tc().Ge.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"CEILING";Qm(this,a,b);a=tc().Ie.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"FLOOR";Qm(this,a,b);a=tc().Ke.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"HALF_UP";this.Mh=Qm(this,a,b);a=tc().Je.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():
"HALF_DOWN";Qm(this,a,b);a=tc().oe.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"HALF_EVEN";Qm(this,a,b);a=tc().Le.Oc;b=null!==this.Fa&&this.Fa.E()?this.Fa.F():"UNNECESSARY";Qm(this,a,b);return this};vd.prototype.$classData=v({sm:0},!1,"scala.math.BigDecimal$RoundingMode$",{sm:1,Rp:1,c:1,l:1,f:1});var ud=void 0;function hf(){}hf.prototype=new y;hf.prototype.constructor=hf;hf.prototype.b=function(){return this};hf.prototype.$classData=v({um:0},!1,"scala.math.Equiv$",{um:1,c:1,$p:1,l:1,f:1});
var gf=void 0;function qf(){}qf.prototype=new y;qf.prototype.constructor=qf;qf.prototype.b=function(){return this};qf.prototype.$classData=v({zm:0},!1,"scala.math.Ordering$",{zm:1,c:1,aq:1,l:1,f:1});var pf=void 0;function Ik(){}Ik.prototype=new y;Ik.prototype.constructor=Ik;Ik.prototype.b=function(){return this};Ik.prototype.q=function(){return"\x3c?\x3e"};Ik.prototype.$classData=v({Wm:0},!1,"scala.reflect.NoManifest$",{Wm:1,c:1,Lb:1,l:1,f:1});var Hk=void 0;function Rm(){}Rm.prototype=new y;
Rm.prototype.constructor=Rm;function Sm(){}d=Sm.prototype=Rm.prototype;d.ma=function(){return this};d.r=function(){return!this.E()};d.q=function(){return(this.E()?"non-empty":"empty")+" iterator"};d.X=function(a){vi(this,a)};d.ea=function(){return kg(this)};d.za=function(){return wi(this)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};function Tm(){}Tm.prototype=new Ci;Tm.prototype.constructor=Tm;function Um(){}Um.prototype=Tm.prototype;function Fk(){}Fk.prototype=new Nl;
Fk.prototype.constructor=Fk;Fk.prototype.b=function(){return this};Fk.prototype.$classData=v({Mn:0},!1,"scala.collection.immutable.Map$",{Mn:1,kq:1,mq:1,jq:1,c:1});var Ek=void 0;function hh(){this.Dd=this.fa=this.xe=null}hh.prototype=new y;hh.prototype.constructor=hh;function Vm(a){return"(kv: "+a.xe+", "+a.fa+")"+(null!==a.Dd?" -\x3e "+Vm(a.Dd):"")}hh.prototype.Vc=function(a,b){this.xe=a;this.fa=b;return this};hh.prototype.q=function(){return Vm(this)};
hh.prototype.$classData=v({zo:0},!1,"scala.collection.mutable.DefaultEntry",{zo:1,c:1,hk:1,l:1,f:1});function Wm(){this.Gb=this.Uc=null}Wm.prototype=new y;Wm.prototype.constructor=Wm;function Xm(a,b){a.Uc=b;a.Gb=b;return a}d=Wm.prototype;d.Aa=function(a){this.Gb.Aa(a);return this};d.ya=function(){return this.Gb};d.oc=function(a,b){Mi(this,a,b)};d.Ba=function(a){this.Gb.Aa(a);return this};d.Na=function(){};d.Ia=function(a){return ug(this,a)};
d.$classData=v({Ao:0},!1,"scala.collection.mutable.GrowingBuilder",{Ao:1,c:1,eb:1,bb:1,ab:1});function K(){this.j=this.d=0}K.prototype=new ei;K.prototype.constructor=K;d=K.prototype;d.Bb=function(){return Ua(this)};d.Ag=function(){return this.d<<24>>24};d.t=function(a){return Da(a)?this.d===a.d&&this.j===a.j:!1};d.dd=function(a,b,c){K.prototype.k.call(this,a|b<<22,b>>10|c<<12);return this};d.q=function(){return Zl(u(),this.d,this.j)};d.k=function(a,b){this.d=a;this.j=b;return this};
d.ub=function(a){K.prototype.k.call(this,a,a>>31);return this};d.zh=function(){return this.d<<16>>16};d.sc=function(){return Fh(u(),this.d,this.j)};d.x=function(){return this.d^this.j};d.ec=function(){return this.d};d.te=function(){return da(Fh(u(),this.d,this.j))};function Da(a){return!!(a&&a.$classData&&a.$classData.o.mk)}d.$classData=v({mk:0},!1,"scala.scalajs.runtime.RuntimeLong",{mk:1,Cc:1,c:1,f:1,mb:1});function Ym(){this.Ld=this.Jd=0;this.me=!1}Ym.prototype=new y;Ym.prototype.constructor=Ym;
d=Ym.prototype;d.Tb=function(){return"Price"};d.Rb=function(){return 3};d.t=function(a){return this===a?!0:a&&a.$classData&&a.$classData.o.Rh?this.Jd===a.Jd&&this.Ld===a.Ld&&this.me===a.me:!1};d.Sb=function(a){switch(a){case 0:return this.Jd;case 1:return this.Ld;case 2:return this.me;default:throw(new Zm).h(""+a);}};d.q=function(){return Mh(this)};function Nc(a,b){var c=new Ym;c.Jd=a;c.Ld=b;c.me=!1;return c}
d.x=function(){var a=-889275714,a=R().ua(a,this.Jd),a=R().ua(a,this.Ld),a=R().ua(a,this.me?1231:1237);return R().lb(a,3)};d.gc=function(){return $m(this)};d.$classData=v({Rh:0},!1,"praxkit.HelloWorld$Price",{Rh:1,c:1,hc:1,u:1,l:1,f:1});function an(){}an.prototype=new y;an.prototype.constructor=an;an.prototype.b=function(){return this};an.prototype.y=function(a){return(new bn).h(a)};an.prototype.q=function(){return"\x3cfunction1\x3e"};
an.prototype.$classData=v({Sk:0},!1,"scalatags.JsDom$RawFrag$",{Sk:1,c:1,cl:1,T:1,l:1,f:1});var cn=void 0;function dn(){}dn.prototype=new y;dn.prototype.constructor=dn;dn.prototype.b=function(){return this};dn.prototype.y=function(a){return(new P).h(a)};dn.prototype.q=function(){return"\x3cfunction1\x3e"};dn.prototype.$classData=v({Tk:0},!1,"scalatags.JsDom$StringFrag$",{Tk:1,c:1,cl:1,T:1,l:1,f:1});var en=void 0;function ee(){this.Jb=this.id=null;this.Be=!1}ee.prototype=new y;
ee.prototype.constructor=ee;d=ee.prototype;d.Tb=function(){return"Attr"};d.Rb=function(){return 3};d.t=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.o.Vh){if(this.id===a.id)var b=this.Jb,c=a.Jb,b=null===b?null===c:b.t(c);else b=!1;return b?this.Be===a.Be:!1}return!1};d.Sb=function(a){switch(a){case 0:return this.id;case 1:return this.Jb;case 2:return this.Be;default:throw(new Zm).h(""+a);}};d.q=function(){return Mh(this)};
function Pc(a,b){var c=O().pk;if(null===b)throw(new U).b();var e=new fn;e.pe=a;e.wa=b;e.Nf=c;return e}d.x=function(){var a=-889275714,a=R().ua(a,Zf(R(),this.id)),a=R().ua(a,Zf(R(),this.Jb)),a=R().ua(a,this.Be?1231:1237);return R().lb(a,3)};d.gc=function(){return $m(this)};d.$classData=v({Vh:0},!1,"scalatags.generic.Attr",{Vh:1,c:1,hc:1,u:1,l:1,f:1});function fj(){V.call(this)}fj.prototype=new pm;fj.prototype.constructor=fj;fj.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};
function gn(a){return!!(a&&a.$classData&&a.$classData.o.dj)}fj.prototype.$classData=v({dj:0},!1,"java.lang.ArithmeticException",{dj:1,vb:1,nb:1,Ra:1,c:1,f:1});function wb(){V.call(this)}wb.prototype=new pm;wb.prototype.constructor=wb;function hn(){}hn.prototype=wb.prototype;wb.prototype.b=function(){V.prototype.Ka.call(this,null,null);return this};wb.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};
wb.prototype.$classData=v({Yd:0},!1,"java.lang.IllegalArgumentException",{Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function ji(){V.call(this)}ji.prototype=new pm;ji.prototype.constructor=ji;function jn(){}jn.prototype=ji.prototype;ji.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};ji.prototype.$classData=v({fj:0},!1,"java.lang.IllegalStateException",{fj:1,vb:1,nb:1,Ra:1,c:1,f:1});function Zm(){V.call(this)}Zm.prototype=new pm;Zm.prototype.constructor=Zm;function kn(){}kn.prototype=Zm.prototype;
Zm.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};Zm.prototype.$classData=v({Vg:0},!1,"java.lang.IndexOutOfBoundsException",{Vg:1,vb:1,nb:1,Ra:1,c:1,f:1});function U(){V.call(this)}U.prototype=new pm;U.prototype.constructor=U;U.prototype.b=function(){V.prototype.Ka.call(this,null,null);return this};U.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};U.prototype.$classData=v({Fl:0},!1,"java.lang.NullPointerException",{Fl:1,vb:1,nb:1,Ra:1,c:1,f:1});
function ln(){V.call(this)}ln.prototype=new pm;ln.prototype.constructor=ln;ln.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};ln.prototype.$classData=v({Ll:0},!1,"java.lang.UnsupportedOperationException",{Ll:1,vb:1,nb:1,Ra:1,c:1,f:1});function W(){V.call(this)}W.prototype=new pm;W.prototype.constructor=W;W.prototype.b=function(){V.prototype.Ka.call(this,null,null);return this};W.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};
W.prototype.$classData=v({Wl:0},!1,"java.util.NoSuchElementException",{Wl:1,vb:1,nb:1,Ra:1,c:1,f:1});function mn(){this.zc=this.fh=null}mn.prototype=new y;mn.prototype.constructor=mn;function nn(){}nn.prototype=mn.prototype;mn.prototype.t=function(a){return a&&a.$classData&&a.$classData.o.cm?this.fh===a.fh&&this.Bc===a.Bc:!1};mn.prototype.Eb=function(a){return this.Bc<a.Bc?-1:this.Bc===a.Bc?0:1};mn.prototype.ll=function(a){if(null===a)throw xg(od(),null);this.fh=this.zc=a;return this};
mn.prototype.x=function(){return this.Bc};function C(){V.call(this);this.of=this.jj=null;this.yg=!1}C.prototype=new pm;C.prototype.constructor=C;C.prototype.Sd=function(){if(!this.yg&&!this.yg){var a;if(null===this.of)a="null";else try{a=na(this.of)+" ("+("of class "+qb(pa(this.of)))+")"}catch(b){if(null!==nd(od(),b))a="an instance of class "+qb(pa(this.of));else throw b;}this.jj=a;this.yg=!0}return this.jj};C.prototype.V=function(a){this.of=a;V.prototype.Ka.call(this,null,null);return this};
C.prototype.$classData=v({dm:0},!1,"scala.MatchError",{dm:1,vb:1,nb:1,Ra:1,c:1,f:1});function on(){}on.prototype=new y;on.prototype.constructor=on;function pn(){}pn.prototype=on.prototype;function Jk(){}Jk.prototype=new Pm;Jk.prototype.constructor=Jk;Jk.prototype.b=function(){return this};Jk.prototype.y=function(a){return a};Jk.prototype.$classData=v({im:0},!1,"scala.Predef$$anon$1",{im:1,Vp:1,c:1,T:1,l:1,f:1});function Kk(){}Kk.prototype=new Nm;Kk.prototype.constructor=Kk;Kk.prototype.b=function(){return this};
Kk.prototype.y=function(a){return a};Kk.prototype.$classData=v({jm:0},!1,"scala.Predef$$anon$2",{jm:1,Up:1,c:1,T:1,l:1,f:1});function qn(){this.fc=null}qn.prototype=new y;qn.prototype.constructor=qn;d=qn.prototype;d.Tb=function(){return"StringContext"};d.Rb=function(){return 1};d.t=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.o.tj){var b=this.fc;a=a.fc;return null===b?null===a:b.t(a)}return!1};d.Sb=function(a){switch(a){case 0:return this.fc;default:throw(new Zm).h(""+a);}};
d.q=function(){return Mh(this)};function rn(a,b){if(a.fc.n()!==(1+b.n()|0))throw(new wb).h("wrong number of arguments ("+b.n()+") for interpolated string with "+a.fc.n()+" parts");}
function he(a,b){var c=function(){return function(a){Zk||(Zk=(new Yk).b());a:{var b=a.length|0,c;Ia();var e=vh();c=a.indexOf(e)|0;switch(c){case -1:break a;default:e=(new Rj).b();b:{var f=c;c=0;for(;;)if(0<=f){f>c&&sm(e,a,c,f);c=1+f|0;if(c>=b)throw(new sn).Hb(a,f);var p=65535&(a.charCodeAt(c)|0);switch(p){case 98:f=8;break;case 116:f=9;break;case 110:f=10;break;case 102:f=12;break;case 114:f=13;break;case 34:f=34;break;case 39:f=39;break;case 92:f=92;break;default:if(48<=p&&55>=p)f=65535&(a.charCodeAt(c)|
0),p=-48+f|0,c=1+c|0,c<b&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))&&(p=-48+((p<<3)+(65535&(a.charCodeAt(c)|0))|0)|0,c=1+c|0,c<b&&51>=f&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))&&(p=-48+((p<<3)+(65535&(a.charCodeAt(c)|0))|0)|0,c=1+c|0)),c=-1+c|0,f=65535&p;else throw(new sn).Hb(a,f);}c=1+c|0;tm(e,f);f=c;Ia();var p=a,x=vh(),p=p.indexOf(x,c)|0;c=f;f=p}else{c<b&&sm(e,a,c,b);a=e.Qa;break b}}}}return a}}(a);rn(a,b);a=a.fc.I();b=b.I();for(var e=a.F(),e=(new Rj).h(c(e));b.E();){rm(e,
b.F());var f=a.F();qm(e,c(f))}return e.Qa}function ie(a){var b=new qn;b.fc=a;return b}d.x=function(){return Xf(this)};d.gc=function(){return $m(this)};d.$classData=v({tj:0},!1,"scala.StringContext",{tj:1,c:1,hc:1,u:1,l:1,f:1});var un=function tn(b,c){if(c.rc.isArrayClass){var e=ie((new G).p(["Array[","]"]));c=je(c);return he(e,(new G).p([tn(b,c)]))}return qb(c)};function Uf(){V.call(this)}Uf.prototype=new fi;Uf.prototype.constructor=Uf;
Uf.prototype.b=function(){V.prototype.Ka.call(this,null,null);return this};Uf.prototype.Pf=function(){Bl||(Bl=(new Al).b());return Bl.Gh?V.prototype.Pf.call(this):this};Uf.prototype.$classData=v({bn:0},!1,"scala.util.control.BreakControl",{bn:1,Ra:1,c:1,f:1,bq:1,cq:1});function vn(a,b){return b&&b.$classData&&b.$classData.o.Ga?a.Sa(b):!1}function Qe(){this.Ca=null}Qe.prototype=new Ei;Qe.prototype.constructor=Qe;Qe.prototype.b=function(){Di.prototype.b.call(this);return this};
Qe.prototype.W=function(){wn||(wn=(new xn).b());return(new yn).b()};Qe.prototype.$classData=v({on:0},!1,"scala.collection.Iterable$",{on:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Pe=void 0;function zn(){this.Ji=this.bd=null}zn.prototype=new Sm;zn.prototype.constructor=zn;zn.prototype.F=function(){return this.Ji.y(this.bd.F())};function An(a,b,c){if(null===b)throw xg(od(),null);a.bd=b;a.Ji=c;return a}zn.prototype.E=function(){return this.bd.E()};
zn.prototype.$classData=v({qn:0},!1,"scala.collection.Iterator$$anon$10",{qn:1,jd:1,c:1,kd:1,D:1,C:1});function hg(){}hg.prototype=new Sm;hg.prototype.constructor=hg;hg.prototype.b=function(){return this};hg.prototype.F=function(){throw(new W).h("next on empty iterator");};hg.prototype.E=function(){return!1};hg.prototype.$classData=v({rn:0},!1,"scala.collection.Iterator$$anon$2",{rn:1,jd:1,c:1,kd:1,D:1,C:1});function Bn(){this.yc=null}Bn.prototype=new Sm;Bn.prototype.constructor=Bn;
function Cn(a){var b=new Bn;b.yc=a;return b}Bn.prototype.F=function(){if(this.E()){var a=this.yc.B();this.yc=this.yc.ka();return a}return Se().Uc.F()};Bn.prototype.E=function(){return!this.yc.r()};Bn.prototype.$classData=v({sn:0},!1,"scala.collection.LinearSeqLike$$anon$1",{sn:1,jd:1,c:1,kd:1,D:1,C:1});function Oe(){this.Ca=null}Oe.prototype=new Ei;Oe.prototype.constructor=Oe;Oe.prototype.b=function(){Di.prototype.b.call(this);Ne=this;(new Tf).b();return this};
Oe.prototype.W=function(){Dn||(Dn=(new En).b());return(new yn).b()};Oe.prototype.$classData=v({un:0},!1,"scala.collection.Traversable$",{un:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Ne=void 0;function Fn(){}Fn.prototype=new Um;Fn.prototype.constructor=Fn;function Gn(){}Gn.prototype=Fn.prototype;Fn.prototype.W=function(){return Hn(new In,this.Hg())};function xn(){this.Ca=null}xn.prototype=new Ei;xn.prototype.constructor=xn;xn.prototype.b=function(){Di.prototype.b.call(this);return this};xn.prototype.W=function(){return(new yn).b()};
xn.prototype.$classData=v({Fn:0},!1,"scala.collection.immutable.Iterable$",{Fn:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var wn=void 0;function Jn(){this.yc=null}Jn.prototype=new Sm;Jn.prototype.constructor=Jn;Jn.prototype.F=function(){if(!this.E())return Se().Uc.F();var a=yg(this.yc),b=a.B();this.yc=wg(new vg,this,zi(function(a,b){return function(){return b.ka()}}(this,a)));return b};function Kn(a){var b=new Jn;b.yc=wg(new vg,b,zi(function(a,b){return function(){return b}}(b,a)));return b}Jn.prototype.E=function(){return!yg(this.yc).r()};
Jn.prototype.za=function(){var a=yg(this.yc);this.yc=wg(new vg,this,zi(function(){return function(){$e();return Ai()}}(this)));return a};Jn.prototype.$classData=v({bo:0},!1,"scala.collection.immutable.StreamIterator",{bo:1,jd:1,c:1,kd:1,D:1,C:1});function En(){this.Ca=null}En.prototype=new Ei;En.prototype.constructor=En;En.prototype.b=function(){Di.prototype.b.call(this);return this};En.prototype.W=function(){return(new yn).b()};
En.prototype.$classData=v({fo:0},!1,"scala.collection.immutable.Traversable$",{fo:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Dn=void 0;function Ln(){this.s=null;this.jc=0;this.Ce=this.jh=this.dg=null;this.Gd=0;this.ge=null}Ln.prototype=new Sm;Ln.prototype.constructor=Ln;function Mn(){}Mn.prototype=Ln.prototype;
Ln.prototype.F=function(){if(null!==this.ge){var a=this.ge.F();this.ge.E()||(this.ge=null);return a}a:{var a=this.Ce,b=this.Gd;for(;;){b===(-1+a.a.length|0)?(this.jc=-1+this.jc|0,0<=this.jc?(this.Ce=this.dg.a[this.jc],this.Gd=this.jh.a[this.jc],this.dg.a[this.jc]=null):(this.Ce=null,this.Gd=0)):this.Gd=1+this.Gd|0;if((a=a.a[b])&&a.$classData&&a.$classData.o.pq||a&&a.$classData&&a.$classData.o.Dj){a=a.Bd;break a}if(a&&a.$classData&&a.$classData.o.yn||Nn(a))0<=this.jc&&(this.dg.a[this.jc]=this.Ce,this.jh.a[this.jc]=
this.Gd),this.jc=1+this.jc|0,this.Ce=On(a),this.Gd=0,a=On(a),b=0;else{this.ge=a.I();a=this.F();break a}}}return a};Ln.prototype.E=function(){return null!==this.ge||0<=this.jc};function On(a){if(a&&a.$classData&&a.$classData.o.yn)return a.Hp();if(!Nn(a))throw(new C).V(a);return a.tb}Ln.prototype.el=function(a){this.s=a;this.jc=0;this.dg=r(A(A(Pn)),[6]);this.jh=r(A(B),[6]);this.Ce=this.s;this.Gd=0;this.ge=null;return this};function Gg(){this.Ii=this.Jc=null}Gg.prototype=new y;
Gg.prototype.constructor=Gg;function Fg(a,b,c){a.Ii=c;a.Jc=b;return a}d=Gg.prototype;d.t=function(a){return null!==a&&(a===this||a===this.Jc||Fa(a,this.Jc))};d.Aa=function(a){this.Jc.Ba(a);return this};d.q=function(){return""+this.Jc};d.ya=function(){return this.Ii.y(this.Jc.ya())};d.oc=function(a,b){this.Jc.oc(a,b)};d.Ba=function(a){this.Jc.Ba(a);return this};d.x=function(){return this.Jc.x()};d.Na=function(a){this.Jc.Na(a)};d.Ia=function(a){this.Jc.Ia(a);return this};
d.$classData=v({yo:0},!1,"scala.collection.mutable.Builder$$anon$1",{yo:1,c:1,eb:1,bb:1,ab:1,Xp:1});function Qn(){this.Tg=null;this.ue=0;this.Rd=null}Qn.prototype=new Sm;Qn.prototype.constructor=Qn;function Rn(a){var b=new Qn;b.Tg=a.yb;b.ue=eh(a);b.Rd=b.Tg.a[b.ue];return b}Qn.prototype.F=function(){var a=this.Rd;for(this.Rd=this.Rd.Dd;null===this.Rd&&0<this.ue;)this.ue=-1+this.ue|0,this.Rd=this.Tg.a[this.ue];return a};Qn.prototype.E=function(){return null!==this.Rd};
Qn.prototype.$classData=v({Do:0},!1,"scala.collection.mutable.HashTable$$anon$1",{Do:1,jd:1,c:1,kd:1,D:1,C:1});function Sn(){this.Ca=null}Sn.prototype=new Ei;Sn.prototype.constructor=Sn;Sn.prototype.b=function(){Di.prototype.b.call(this);return this};Sn.prototype.W=function(){return(new Tn).b()};Sn.prototype.$classData=v({Fo:0},!1,"scala.collection.mutable.Iterable$",{Fo:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Un=void 0;function Vn(){this.fc=null}Vn.prototype=new y;Vn.prototype.constructor=Vn;
function Wn(){}d=Wn.prototype=Vn.prototype;d.b=function(){this.fc=(new yn).b();return this};d.Aa=function(a){return Xn(this,a)};function Xn(a,b){var c=a.fc;Te();b=(new G).p([b]);var e=Te().Ca;Yn(c,Dl(b,e));return a}d.oc=function(a,b){Mi(this,a,b)};d.Ba=function(a){return Xn(this,a)};d.Na=function(){};d.Ia=function(a){Yn(this.fc,a);return this};function Zn(){this.Ve=null}Zn.prototype=new Sm;Zn.prototype.constructor=Zn;
Zn.prototype.F=function(){if(this.E()){var a=this.Ve.B();this.Ve=this.Ve.pc();return a}throw(new W).h("next on empty Iterator");};Zn.prototype.E=function(){return this.Ve!==Td()};Zn.prototype.$classData=v({Ho:0},!1,"scala.collection.mutable.ListBuffer$$anon$1",{Ho:1,jd:1,c:1,kd:1,D:1,C:1});function In(){this.Gb=this.Uc=null}In.prototype=new y;In.prototype.constructor=In;d=In.prototype;d.Aa=function(a){return $n(this,a)};d.ya=function(){return this.Gb};d.oc=function(a,b){Mi(this,a,b)};
function $n(a,b){a.Gb=a.Gb.qd(b);return a}function Hn(a,b){a.Uc=b;a.Gb=b;return a}d.Ba=function(a){return $n(this,a)};d.Na=function(){};d.Ia=function(a){return ug(this,a)};d.$classData=v({Io:0},!1,"scala.collection.mutable.SetBuilder",{Io:1,c:1,Pb:1,eb:1,bb:1,ab:1});function ao(){this.Gb=this.xc=null;this.wc=this.Qc=0}ao.prototype=new y;ao.prototype.constructor=ao;d=ao.prototype;d.Qg=function(a){this.xc=a;this.wc=this.Qc=0;return this};d.Aa=function(a){return bo(this,a)};
function bo(a,b){var c=1+a.wc|0;if(a.Qc<c){for(var e=0===a.Qc?16:a.Qc<<1;e<c;)e<<=1;c=e;a.Gb=co(a,c);a.Qc=c}a.Gb.ad(a.wc,b);a.wc=1+a.wc|0;return a}
function co(a,b){var c=a.xc.jb();b=c===t(bb)?(new eo).ef(r(A(bb),[b])):c===t(cb)?(new fo).kf(r(A(cb),[b])):c===t(ab)?(new go).Ad(r(A(ab),[b])):c===t(B)?(new ho).hf(r(A(B),[b])):c===t(db)?(new io).jf(r(A(db),[b])):c===t(eb)?(new jo).gf(r(A(eb),[b])):c===t(fb)?(new ko).ff(r(A(fb),[b])):c===t($a)?(new lo).lf(r(A($a),[b])):c===t(Za)?(new mo).mf(r(A(Ca),[b])):(new no).Vd(a.xc.Cb(b));0<a.wc&&Z(M(),a.Gb.i,0,b.i,0,a.wc);return b}
d.ya=function(){var a;0!==this.Qc&&this.Qc===this.wc?(this.Qc=0,a=this.Gb):a=co(this,this.wc);return a};d.oc=function(a,b){Mi(this,a,b)};d.Ba=function(a){return bo(this,a)};d.Na=function(a){this.Qc<a&&(this.Gb=co(this,a),this.Qc=a)};d.Ia=function(a){return ug(this,a)};d.$classData=v({Lo:0},!1,"scala.collection.mutable.WrappedArrayBuilder",{Lo:1,c:1,Pb:1,eb:1,bb:1,ab:1});function oo(){this.ii=this.Se=0;this.xk=null}oo.prototype=new Sm;oo.prototype.constructor=oo;
oo.prototype.F=function(){var a=this.xk.Sb(this.Se);this.Se=1+this.Se|0;return a};function $m(a){var b=new oo;b.xk=a;b.Se=0;b.ii=a.Rb();return b}oo.prototype.E=function(){return this.Se<this.ii};oo.prototype.$classData=v({bp:0},!1,"scala.runtime.ScalaRunTime$$anon$1",{bp:1,jd:1,c:1,kd:1,D:1,C:1});function po(){}po.prototype=new am;po.prototype.constructor=po;function qo(){}qo.prototype=po.prototype;po.prototype.vg=function(a){a=null===a?"null":na(a);hd(this,null===a?"null":a);return this};
po.prototype.hl=function(){$l.prototype.gl.call(this);return this};po.prototype.ug=function(a){Ia();a=l.String.fromCharCode(a);hd(this,a);return this};function bn(){this.wa=null}bn.prototype=new y;bn.prototype.constructor=bn;d=bn.prototype;d.Tb=function(){return"RawFrag"};d.Rb=function(){return 1};d.t=function(a){return this===a?!0:a&&a.$classData&&a.$classData.o.Sh?this.wa===a.wa:!1};d.Sb=function(a){switch(a){case 0:return this.wa;default:throw(new Zm).h(""+a);}};d.q=function(){return Mh(this)};
d.wg=function(a){a.insertAdjacentHTML("beforeend",this.wa)};d.Oe=function(a){this.wg(a)};d.h=function(a){this.wa=a;if(null===a)throw(new U).b();return this};d.x=function(){return Xf(this)};d.gc=function(){return $m(this)};d.$classData=v({Sh:0},!1,"scalatags.JsDom$RawFrag",{Sh:1,c:1,zf:1,hc:1,u:1,l:1,f:1});function fn(){this.Nf=this.wa=this.pe=null}fn.prototype=new y;fn.prototype.constructor=fn;d=fn.prototype;d.Tb=function(){return"AttrPair"};d.Rb=function(){return 3};
d.t=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.o.Wh){var b=this.pe,c=a.pe;return(null===b?null===c:b.t(c))&&S(T(),this.wa,a.wa)?this.Nf===a.Nf:!1}return!1};d.Sb=function(a){switch(a){case 0:return this.pe;case 1:return this.wa;case 2:return this.Nf;default:throw(new Zm).h(""+a);}};d.q=function(){return Mh(this)};
d.Oe=function(a){var b=this.pe,c=this.wa,e=b.Jb;if(pd()===e)b.Be?(e=Jc().createElement("p"),e.innerHTML=he(ie((new G).p(["\x3cp ",'\x3d"','"\x3e\x3cp\x3e'])),(new G).p([b.id,na(c)])),b=e.children[0].attributes[0].cloneNode(!0),a.setAttributeNode(b)):a.setAttribute(b.id,na(c));else if(ro(e))a.setAttributeNS(e.ke.ig(),b.id,na(c));else throw(new C).V(e);};d.x=function(){return Xf(this)};d.gc=function(){return $m(this)};
d.$classData=v({Wh:0},!1,"scalatags.generic.AttrPair",{Wh:1,c:1,zf:1,hc:1,u:1,l:1,f:1});function Ad(){this.Eh=this.Dh=null}Ad.prototype=new y;Ad.prototype.constructor=Ad;function so(){}d=so.prototype=Ad.prototype;d.Tb=function(){return"Tuple2"};d.Rb=function(){return 2};d.t=function(a){return this===a?!0:a&&a.$classData&&a.$classData.o.qg?S(T(),this.Nc(),a.Nc())&&S(T(),this.Ac(),a.Ac()):!1};
d.Sb=function(a){a:switch(a){case 0:a=this.Nc();break a;case 1:a=this.Ac();break a;default:throw(new Zm).h(""+a);}return a};d.lg=function(){return+this.Nc()};d.Vc=function(a,b){this.Dh=a;this.Eh=b;return this};d.q=function(){return"("+this.Nc()+","+this.Ac()+")"};d.ng=function(){return+this.Ac()};d.Ac=function(){return this.Eh};d.x=function(){return Xf(this)};d.Nc=function(){return this.Dh};d.gc=function(){return $m(this)};d.$classData=v({qg:0},!1,"scala.Tuple2",{qg:1,c:1,nm:1,hc:1,u:1,l:1,f:1});
function Si(){V.call(this)}Si.prototype=new kn;Si.prototype.constructor=Si;Si.prototype.ub=function(a){V.prototype.Ka.call(this,"Array index out of range: "+a,null);return this};Si.prototype.$classData=v({ol:0},!1,"java.lang.ArrayIndexOutOfBoundsException",{ol:1,Vg:1,vb:1,nb:1,Ra:1,c:1,f:1});function Aj(){V.call(this)}Aj.prototype=new hn;Aj.prototype.constructor=Aj;Aj.prototype.h=function(a){V.prototype.Ka.call(this,a,null);return this};
Aj.prototype.$classData=v({Gl:0},!1,"java.lang.NumberFormatException",{Gl:1,Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function uh(){V.call(this)}uh.prototype=new kn;uh.prototype.constructor=uh;uh.prototype.b=function(){V.prototype.Ka.call(this,null,null);return this};uh.prototype.$classData=v({Jl:0},!1,"java.lang.StringIndexOutOfBoundsException",{Jl:1,Vg:1,vb:1,nb:1,Ra:1,c:1,f:1});function Wj(){V.call(this)}Wj.prototype=new jn;Wj.prototype.constructor=Wj;
Wj.prototype.b=function(){V.prototype.Ka.call(this,null,null);return this};Wj.prototype.$classData=v({Sl:0},!1,"java.util.FormatterClosedException",{Sl:1,fj:1,vb:1,nb:1,Ra:1,c:1,f:1});function to(){V.call(this)}to.prototype=new hn;to.prototype.constructor=to;function uo(){}uo.prototype=to.prototype;function vo(){mn.call(this);this.Bc=0;this.Yg=null}vo.prototype=new nn;vo.prototype.constructor=vo;
vo.prototype.q=function(){return null!==this.Yg?this.Yg:he(ie((new G).p(["\x3cUnknown name for enum field #"," of class ","\x3e"])),(new G).p([this.Bc,pa(this)]))};function Qm(a,b,c){var e=new vo;e.Bc=b;e.Yg=c;mn.prototype.ll.call(e,a);if(a.hh.hb(b))throw(new Mk).V("assertion failed: Duplicate id: "+e.Bc);c=gh(a.hh,b,e);if(null===c)pd();else{var f=c.fa;c.fa=e;(new ld).V(f)}a.wj=!1;a.Wf=1+b|0;a.Wf>a.gh&&(a.gh=a.Wf);b<a.eh&&(a.eh=b);return e}
vo.prototype.$classData=v({bm:0},!1,"scala.Enumeration$Val",{bm:1,cm:1,c:1,qf:1,mb:1,l:1,f:1});function wo(){}wo.prototype=new pn;wo.prototype.constructor=wo;d=wo.prototype;d.b=function(){return this};d.Tb=function(){return"None"};d.Rb=function(){return 0};d.r=function(){return!0};d.Td=function(){throw(new W).h("None.get");};d.Sb=function(a){throw(new Zm).h(""+a);};d.q=function(){return"None"};d.x=function(){return 2433880};d.gc=function(){return $m(this)};
d.$classData=v({em:0},!1,"scala.None$",{em:1,fm:1,c:1,hc:1,u:1,l:1,f:1});var xo=void 0;function pd(){xo||(xo=(new wo).b());return xo}function ld(){this.ke=null}ld.prototype=new pn;ld.prototype.constructor=ld;d=ld.prototype;d.Tb=function(){return"Some"};d.Rb=function(){return 1};d.t=function(a){return this===a?!0:ro(a)?S(T(),this.ke,a.ke):!1};d.r=function(){return!1};d.Sb=function(a){switch(a){case 0:return this.ke;default:throw(new Zm).h(""+a);}};d.Td=function(){return this.ke};d.q=function(){return Mh(this)};
d.V=function(a){this.ke=a;return this};d.x=function(){return Xf(this)};d.gc=function(){return $m(this)};function ro(a){return!!(a&&a.$classData&&a.$classData.o.sj)}d.$classData=v({sj:0},!1,"scala.Some",{sj:1,fm:1,c:1,hc:1,u:1,l:1,f:1});function sn(){V.call(this)}sn.prototype=new hn;sn.prototype.constructor=sn;
sn.prototype.Hb=function(a,b){var c=ie((new G).p(["invalid escape "," index ",' in "','". Use \\\\\\\\ for literal \\\\.']));Xk();if(!(0<=b&&b<(a.length|0)))throw(new wb).h("requirement failed");if(b===(-1+(a.length|0)|0))var e="at terminal";else var e=ie((new G).p(["'\\\\","' not one of "," at"])),f=65535&(a.charCodeAt(1+b|0)|0),e=he(e,(new G).p([(new L).H(f),"[\\b, \\t, \\n, \\f, \\r, \\\\, \\\", \\']"]));a=he(c,(new G).p([e,b,a]));V.prototype.Ka.call(this,a,null);return this};
sn.prototype.$classData=v({pm:0},!1,"scala.StringContext$InvalidEscapeException",{pm:1,Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function yo(a,b,c){c=c.Df(a.Db());a.X(bg(function(a,b,c){return function(a){return c.Ia(b.y(a).ma())}}(a,b,c)));return c.ya()}function Dl(a,b){b=b.Ef();Li(b,a);b.Ia(a.oa());return b.ya()}function zo(a){return a.Qb(a.Wa()+"(",", ",")")}function Ao(a){var b=a.B(),b=(new Ui).V(b);a.X(bg(function(a,b){return function(a){b.U=a}}(a,b)));return b.U}
function Gl(a,b){b=b.Df(a.Db());Li(b,a);return b}
function Bo(a){a=qb(pa(a.Db()));for(var b=-1+(a.length|0)|0;;)if(-1!==b&&36===(65535&(a.charCodeAt(b)|0)))b=-1+b|0;else break;if(-1===b||46===(65535&(a.charCodeAt(b)|0)))return"";for(var c="";;){for(var e=1+b|0;;)if(-1!==b&&57>=(65535&(a.charCodeAt(b)|0))&&48<=(65535&(a.charCodeAt(b)|0)))b=-1+b|0;else break;for(var f=b;;)if(-1!==b&&36!==(65535&(a.charCodeAt(b)|0))&&46!==(65535&(a.charCodeAt(b)|0)))b=-1+b|0;else break;var g=1+b|0;if(b===f&&e!==(a.length|0))return c;for(;;)if(-1!==b&&36===(65535&(a.charCodeAt(b)|
0)))b=-1+b|0;else break;var f=-1===b?!0:46===(65535&(a.charCodeAt(b)|0)),h;(h=f)||(h=65535&(a.charCodeAt(g)|0),h=!(90<h&&127>h||65>h));if(h){e=a.substring(g,e);g=c;if(null===g)throw(new U).b();c=""===g?e:""+e+(new L).H(46)+c;if(f)return c}}}function Co(){this.Ca=null}Co.prototype=new Ll;Co.prototype.constructor=Co;function Do(){}Do.prototype=Co.prototype;function Eo(){Ln.call(this)}Eo.prototype=new Mn;Eo.prototype.constructor=Eo;
Eo.prototype.$classData=v({Cn:0},!1,"scala.collection.immutable.HashSet$HashTrieSet$$anon$1",{Cn:1,qq:1,jd:1,c:1,kd:1,D:1,C:1});function Fo(){}Fo.prototype=new Gn;Fo.prototype.constructor=Fo;Fo.prototype.b=function(){return this};Fo.prototype.Hg=function(){return Go()};Fo.prototype.$classData=v({Rn:0},!1,"scala.collection.immutable.Set$",{Rn:1,Aj:1,Cj:1,yj:1,ob:1,c:1,pb:1});var Ho=void 0;function Gk(){Ho||(Ho=(new Fo).b());return Ho}function Io(){this.fc=null}Io.prototype=new Wn;
Io.prototype.constructor=Io;Io.prototype.b=function(){Vn.prototype.b.call(this);return this};Io.prototype.ya=function(){return Jo(this)};function Jo(a){return Ko(a.fc.xb.za(),bg(function(){return function(a){return a.za()}}(a)))}function Lo(a){return!!(a&&a.$classData&&a.$classData.o.Hj)}Io.prototype.$classData=v({Hj:0},!1,"scala.collection.immutable.Stream$StreamBuilder",{Hj:1,uq:1,c:1,Pb:1,eb:1,bb:1,ab:1});
function Jl(){this.Xe=this.ae=this.Qe=0;this.xi=this.ui=this.ri=this.oi=this.li=this.Ye=null}Jl.prototype=new y;Jl.prototype.constructor=Jl;d=Jl.prototype;d.ra=function(){return this.ri};d.b=function(){this.Ye=r(A(z),[32]);this.Xe=1;this.ae=this.Qe=0;return this};d.ac=function(){return this.Xe};d.Aa=function(a){return Mo(this,a)};d.Ze=function(a){this.xi=a};d.Xa=function(){return this.Ye};d.Ya=function(a){this.oi=a};d.ib=function(){return this.ui};
function Mo(a,b){if(a.ae>=a.Ye.a.length){var c=32+a.Qe|0,e=a.Qe^c;if(1024>e)1===a.ac()&&(a.xa(r(A(z),[32])),a.R().a[0]=a.Xa(),a.xd(1+a.ac()|0)),a.Ja(r(A(z),[32])),a.R().a[31&(c>>>5|0)]=a.Xa();else if(32768>e)2===a.ac()&&(a.Ya(r(A(z),[32])),a.da().a[0]=a.R(),a.xd(1+a.ac()|0)),a.Ja(r(A(z),[32])),a.xa(r(A(z),[32])),a.R().a[31&(c>>>5|0)]=a.Xa(),a.da().a[31&(c>>>10|0)]=a.R();else if(1048576>e)3===a.ac()&&(a.Fb(r(A(z),[32])),a.ra().a[0]=a.da(),a.xd(1+a.ac()|0)),a.Ja(r(A(z),[32])),a.xa(r(A(z),[32])),a.Ya(r(A(z),
[32])),a.R().a[31&(c>>>5|0)]=a.Xa(),a.da().a[31&(c>>>10|0)]=a.R(),a.ra().a[31&(c>>>15|0)]=a.da();else if(33554432>e)4===a.ac()&&(a.Rc(r(A(z),[32])),a.ib().a[0]=a.ra(),a.xd(1+a.ac()|0)),a.Ja(r(A(z),[32])),a.xa(r(A(z),[32])),a.Ya(r(A(z),[32])),a.Fb(r(A(z),[32])),a.R().a[31&(c>>>5|0)]=a.Xa(),a.da().a[31&(c>>>10|0)]=a.R(),a.ra().a[31&(c>>>15|0)]=a.da(),a.ib().a[31&(c>>>20|0)]=a.ra();else if(1073741824>e)5===a.ac()&&(a.Ze(r(A(z),[32])),a.Sc().a[0]=a.ib(),a.xd(1+a.ac()|0)),a.Ja(r(A(z),[32])),a.xa(r(A(z),
[32])),a.Ya(r(A(z),[32])),a.Fb(r(A(z),[32])),a.Rc(r(A(z),[32])),a.R().a[31&(c>>>5|0)]=a.Xa(),a.da().a[31&(c>>>10|0)]=a.R(),a.ra().a[31&(c>>>15|0)]=a.da(),a.ib().a[31&(c>>>20|0)]=a.ra(),a.Sc().a[31&(c>>>25|0)]=a.ib();else throw(new wb).b();a.Qe=c;a.ae=0}a.Ye.a[a.ae]=b;a.ae=1+a.ae|0;return a}d.ya=function(){var a;a=this.Qe+this.ae|0;if(0===a)a=cf().Zh;else{var b=(new No).dd(0,a,0);yb(b,this,this.Xe);1<this.Xe&&xb(b,0,-1+a|0);a=b}return a};d.xa=function(a){this.li=a};d.oc=function(a,b){Mi(this,a,b)};
d.Rc=function(a){this.ui=a};d.R=function(){return this.li};d.Sc=function(){return this.xi};d.Ba=function(a){return Mo(this,a)};d.Na=function(){};d.xd=function(a){this.Xe=a};d.da=function(){return this.oi};d.Ja=function(a){this.Ye=a};d.Ia=function(a){return ug(this,a)};d.Fb=function(a){this.ri=a};d.$classData=v({io:0},!1,"scala.collection.immutable.VectorBuilder",{io:1,c:1,Pb:1,eb:1,bb:1,ab:1,Kj:1});
function Oo(){this.Kg=this.d=this.wd=this.Jg=0;this.xf=!1;this.Cg=0;this.yi=this.vi=this.si=this.pi=this.mi=this.Eg=null}Oo.prototype=new Sm;Oo.prototype.constructor=Oo;d=Oo.prototype;
d.F=function(){if(!this.xf)throw(new W).h("reached iterator end");var a=this.Eg.a[this.d];this.d=1+this.d|0;if(this.d===this.Kg)if((this.wd+this.d|0)<this.Jg){var b=32+this.wd|0,c=this.wd^b;if(1024>c)this.Ja(this.R().a[31&(b>>>5|0)]);else if(32768>c)this.xa(this.da().a[31&(b>>>10|0)]),this.Ja(this.R().a[0]);else if(1048576>c)this.Ya(this.ra().a[31&(b>>>15|0)]),this.xa(this.da().a[0]),this.Ja(this.R().a[0]);else if(33554432>c)this.Fb(this.ib().a[31&(b>>>20|0)]),this.Ya(this.ra().a[0]),this.xa(this.da().a[0]),
this.Ja(this.R().a[0]);else if(1073741824>c)this.Rc(this.Sc().a[31&(b>>>25|0)]),this.Fb(this.ib().a[0]),this.Ya(this.ra().a[0]),this.xa(this.da().a[0]),this.Ja(this.R().a[0]);else throw(new wb).b();this.wd=b;b=this.Jg-this.wd|0;this.Kg=32>b?b:32;this.d=0}else this.xf=!1;return a};d.ra=function(){return this.si};d.ac=function(){return this.Cg};d.Ze=function(a){this.yi=a};d.k=function(a,b){this.Jg=b;this.wd=-32&a;this.d=31&a;a=b-this.wd|0;this.Kg=32>a?a:32;this.xf=(this.wd+this.d|0)<b;return this};
d.Xa=function(){return this.Eg};d.Ya=function(a){this.pi=a};d.ib=function(){return this.vi};d.xa=function(a){this.mi=a};d.E=function(){return this.xf};d.Rc=function(a){this.vi=a};d.R=function(){return this.mi};d.Sc=function(){return this.yi};d.xd=function(a){this.Cg=a};d.da=function(){return this.pi};d.Ja=function(a){this.Eg=a};d.Fb=function(a){this.si=a};d.$classData=v({jo:0},!1,"scala.collection.immutable.VectorIterator",{jo:1,jd:1,c:1,kd:1,D:1,C:1,Kj:1});function Po(){this.Re=this.Si=null}
Po.prototype=new qo;Po.prototype.constructor=Po;function ne(a){var b=new Po;b.Si=a;(new nm).b();po.prototype.hl.call(b);b.Re="";return b}function hd(a,b){for(;""!==b;){var c=b.indexOf("\n")|0;if(0>c)a.Re=""+a.Re+b,b="";else{var e=""+a.Re+b.substring(0,c);l.console&&(a.Si&&l.console.error?l.console.error(e):l.console.log(e));a.Re="";b=b.substring(1+c|0)}}}Po.prototype.Kf=function(){};Po.prototype.$classData=v({Al:0},!1,"java.lang.JSConsoleBasedPrintStream",{Al:1,fp:1,ep:1,yk:1,c:1,pg:1,Nh:1,nl:1});
function Zj(){V.call(this);this.ei=0;this.Lg=null}Zj.prototype=new uo;Zj.prototype.constructor=Zj;Zj.prototype.Sd=function(){return"Conversion \x3d "+(new L).H(this.ei)+", Flags \x3d "+this.Lg};Zj.prototype.H=function(a){this.ei=a;V.prototype.Ka.call(this,null,null);this.Lg=null;return this};Zj.prototype.$classData=v({Ol:0},!1,"java.util.FormatFlagsConversionMismatchException",{Ol:1,Wg:1,Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function Uj(){V.call(this);this.Mg=null}Uj.prototype=new uo;
Uj.prototype.constructor=Uj;Uj.prototype.b=function(){V.prototype.Ka.call(this,null,null);this.Mg=null;return this};Uj.prototype.Sd=function(){return"Flags \x3d '"+this.Mg+"'"};Uj.prototype.h=function(a){Uj.prototype.b.call(this);if(null===a)throw(new U).b();this.Mg=a;return this};Uj.prototype.$classData=v({Tl:0},!1,"java.util.IllegalFormatFlagsException",{Tl:1,Wg:1,Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function Xj(){V.call(this);this.fe=null}Xj.prototype=new uo;Xj.prototype.constructor=Xj;
Xj.prototype.b=function(){V.prototype.Ka.call(this,null,null);this.fe=null;return this};Xj.prototype.Sd=function(){return"Format specifier '"+this.fe+"'"};Xj.prototype.h=function(a){Xj.prototype.b.call(this);if(null===a)throw(new U).b();this.fe=a;return this};Xj.prototype.$classData=v({Ul:0},!1,"java.util.MissingFormatArgumentException",{Ul:1,Wg:1,Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function Yj(){V.call(this);this.fe=null}Yj.prototype=new uo;Yj.prototype.constructor=Yj;
Yj.prototype.b=function(){V.prototype.Ka.call(this,null,null);this.fe=null;return this};Yj.prototype.Sd=function(){return this.fe};Yj.prototype.h=function(a){Yj.prototype.b.call(this);if(null===a)throw(new U).b();this.fe=a;return this};Yj.prototype.$classData=v({Vl:0},!1,"java.util.MissingFormatWidthException",{Vl:1,Wg:1,Yd:1,vb:1,nb:1,Ra:1,c:1,f:1});function xl(){this.ag=null}xl.prototype=new y;xl.prototype.constructor=xl;d=xl.prototype;
d.Cb=function(a){var b=this.jb();b===t(bb)?a=r(A(bb),[a]):b===t(cb)?a=r(A(cb),[a]):b===t(ab)?a=r(A(ab),[a]):b===t(B)?a=r(A(B),[a]):b===t(db)?a=r(A(db),[a]):b===t(eb)?a=r(A(eb),[a]):b===t(fb)?a=r(A(fb),[a]):b===t($a)?a=r(A($a),[a]):b===t(Za)?a=r(A(Ca),[a]):(qe||(qe=(new pe).b()),a=this.jb().rc.newArrayOfThisClass([a]));return a};d.t=function(a){var b;a&&a.$classData&&a.$classData.o.Kb?(b=this.jb(),a=a.jb(),b=b===a):b=!1;return b};d.q=function(){return un(this,this.ag)};d.jb=function(){return this.ag};
d.x=function(){return Zf(R(),this.ag)};d.$classData=v({Gm:0},!1,"scala.reflect.ClassTag$GenericClassTag",{Gm:1,c:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});function Cd(){this.Ca=null}Cd.prototype=new Do;Cd.prototype.constructor=Cd;Cd.prototype.b=function(){Di.prototype.b.call(this);return this};Cd.prototype.W=function(){Qo||(Qo=(new Ro).b());return(new yn).b()};Cd.prototype.$classData=v({tn:0},!1,"scala.collection.Seq$",{tn:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Bd=void 0;function So(){this.Ca=null}
So.prototype=new Do;So.prototype.constructor=So;function To(){}To.prototype=So.prototype;function Ro(){this.Ca=null}Ro.prototype=new Do;Ro.prototype.constructor=Ro;Ro.prototype.b=function(){Di.prototype.b.call(this);return this};Ro.prototype.W=function(){return(new yn).b()};Ro.prototype.$classData=v({Qn:0},!1,"scala.collection.immutable.Seq$",{Qn:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Qo=void 0;function Uo(){}Uo.prototype=new y;Uo.prototype.constructor=Uo;function Vo(){}Vo.prototype=Uo.prototype;
Uo.prototype.oc=function(a,b){Mi(this,a,b)};Uo.prototype.Na=function(){};function Wo(){this.Ca=null}Wo.prototype=new Do;Wo.prototype.constructor=Wo;Wo.prototype.b=function(){Di.prototype.b.call(this);return this};Wo.prototype.W=function(){return(new Tn).b()};Wo.prototype.$classData=v({Eo:0},!1,"scala.collection.mutable.IndexedSeq$",{Eo:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var Xo=void 0;function Yo(){Xo||(Xo=(new Wo).b());return Xo}function Zo(){this.Ca=null}Zo.prototype=new Do;
Zo.prototype.constructor=Zo;Zo.prototype.b=function(){Di.prototype.b.call(this);return this};Zo.prototype.W=function(){return(new G).b()};Zo.prototype.$classData=v({No:0},!1,"scala.scalajs.js.WrappedArray$",{No:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var $o=void 0;function Dd(){$o||($o=(new Zo).b());return $o}function P(){this.wa=null}P.prototype=new y;P.prototype.constructor=P;d=P.prototype;d.Tb=function(){return"StringFrag"};d.Rb=function(){return 1};
d.t=function(a){return this===a?!0:a&&a.$classData&&a.$classData.o.Th?this.wa===a.wa:!1};d.Sb=function(a){switch(a){case 0:return this.wa;default:throw(new Zm).h(""+a);}};d.q=function(){return Mh(this)};d.Oe=function(a){a.appendChild(this.Zg())};d.Zg=function(){return Jc().createTextNode(this.wa)};d.h=function(a){this.wa=a;if(null===a)throw(new U).b();return this};d.x=function(){return Xf(this)};d.gc=function(){return $m(this)};
d.$classData=v({Th:0},!1,"scalatags.JsDom$StringFrag",{Th:1,c:1,bl:1,Xh:1,zf:1,hc:1,u:1,l:1,f:1});function zd(){Ad.call(this);this.mg=this.kg=0}zd.prototype=new so;zd.prototype.constructor=zd;d=zd.prototype;d.lg=function(){return this.kg};d.Ac=function(){return this.mg};d.ng=function(){return this.mg};d.Nc=function(){return this.kg};d.$classData=v({qm:0},!1,"scala.Tuple2$mcDD$sp",{qm:1,qg:1,c:1,nm:1,hc:1,u:1,l:1,f:1,Wp:1});function ap(){this.kb=null}ap.prototype=new y;ap.prototype.constructor=ap;
function bp(){}bp.prototype=ap.prototype;ap.prototype.t=function(a){return this===a};ap.prototype.q=function(){return this.kb};ap.prototype.x=function(){return La(this)};function cp(){}cp.prototype=new y;cp.prototype.constructor=cp;function dp(){}dp.prototype=cp.prototype;function ep(){this.Ca=null}ep.prototype=new To;ep.prototype.constructor=ep;ep.prototype.b=function(){Di.prototype.b.call(this);fp=this;(new Hl).b();return this};ep.prototype.W=function(){Il();cf();return(new Jl).b()};
ep.prototype.$classData=v({ln:0},!1,"scala.collection.IndexedSeq$",{ln:1,Bj:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1});var fp=void 0;function Re(){fp||(fp=(new ep).b());return fp}function J(){this.ve=this.Ig=0;this.bd=null}J.prototype=new Sm;J.prototype.constructor=J;J.prototype.F=function(){this.ve>=this.Ig&&Se().Uc.F();var a=this.bd.Q(this.ve);this.ve=1+this.ve|0;return a};function I(a,b,c){a.Ig=c;if(null===b)throw xg(od(),null);a.bd=b;a.ve=0;return a}J.prototype.E=function(){return this.ve<this.Ig};
J.prototype.$classData=v({nn:0},!1,"scala.collection.IndexedSeqLike$Elements",{nn:1,jd:1,c:1,kd:1,D:1,C:1,fq:1,l:1,f:1});function gp(){}gp.prototype=new Gn;gp.prototype.constructor=gp;gp.prototype.b=function(){return this};function hp(a,b,c,e,f,g){var h=31&(b>>>g|0),k=31&(e>>>g|0);if(h!==k)return a=1<<h|1<<k,b=r(A(ip),[2]),h<k?(b.a[0]=c,b.a[1]=f):(b.a[0]=f,b.a[1]=c),jp(new kp,a,b,c.ea()+f.ea()|0);k=r(A(ip),[1]);h=1<<h;c=hp(a,b,c,e,f,5+g|0);k.a[0]=c;return jp(new kp,h,k,c.ie)}gp.prototype.Hg=function(){return lp()};
gp.prototype.$classData=v({zn:0},!1,"scala.collection.immutable.HashSet$",{zn:1,Aj:1,Cj:1,yj:1,ob:1,c:1,pb:1,l:1,f:1});var mp=void 0;function np(){mp||(mp=(new gp).b());return mp}function op(){this.Ca=null}op.prototype=new To;op.prototype.constructor=op;op.prototype.b=function(){Di.prototype.b.call(this);return this};op.prototype.W=function(){cf();return(new Jl).b()};op.prototype.$classData=v({En:0},!1,"scala.collection.immutable.IndexedSeq$",{En:1,Bj:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1});
var pp=void 0;function Il(){pp||(pp=(new op).b());return pp}function qp(){}qp.prototype=new Gn;qp.prototype.constructor=qp;qp.prototype.b=function(){return this};qp.prototype.Hg=function(){return rp()};qp.prototype.$classData=v({Jn:0},!1,"scala.collection.immutable.ListSet$",{Jn:1,Aj:1,Cj:1,yj:1,ob:1,c:1,pb:1,l:1,f:1});var sp=void 0;function tp(){this.s=null;this.g=this.m=0}tp.prototype=new Vo;tp.prototype.constructor=tp;d=tp.prototype;d.b=function(){this.g=this.m=0;return this};
function up(a,b){b=r(A($a),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.t=function(a){return a&&a.$classData&&a.$classData.o.Mj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return vp(this,!!a)};d.q=function(){return"ArrayBuilder.ofBoolean"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=up(this,this.g);return a};d.va=function(a){this.s=up(this,a);this.m=a};d.Ba=function(a){return vp(this,!!a)};d.Na=function(a){this.m<a&&this.va(a)};
d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};function vp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}d.Ia=function(a){a&&a.$classData&&a.$classData.o.ph?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};d.$classData=v({Mj:0},!1,"scala.collection.mutable.ArrayBuilder$ofBoolean",{Mj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function wp(){this.s=null;this.g=this.m=0}
wp.prototype=new Vo;wp.prototype.constructor=wp;d=wp.prototype;d.b=function(){this.g=this.m=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Nj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return xp(this,a|0)};function yp(a,b){b=r(A(bb),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.q=function(){return"ArrayBuilder.ofByte"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=yp(this,this.g);return a};d.va=function(a){this.s=yp(this,a);this.m=a};
d.Ba=function(a){return xp(this,a|0)};function xp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}d.Na=function(a){this.m<a&&this.va(a)};d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};d.Ia=function(a){a&&a.$classData&&a.$classData.o.qh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};
d.$classData=v({Nj:0},!1,"scala.collection.mutable.ArrayBuilder$ofByte",{Nj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function zp(){this.s=null;this.g=this.m=0}zp.prototype=new Vo;zp.prototype.constructor=zp;d=zp.prototype;d.b=function(){this.g=this.m=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Oj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return Ap(this,null===a?0:a.fa)};d.q=function(){return"ArrayBuilder.ofChar"};
d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Bp(this,this.g);return a};d.va=function(a){this.s=Bp(this,a);this.m=a};d.Ba=function(a){return Ap(this,null===a?0:a.fa)};d.Na=function(a){this.m<a&&this.va(a)};function Bp(a,b){b=r(A(ab),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};function Ap(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}
d.Ia=function(a){a&&a.$classData&&a.$classData.o.rh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};d.$classData=v({Oj:0},!1,"scala.collection.mutable.ArrayBuilder$ofChar",{Oj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Cp(){this.s=null;this.g=this.m=0}Cp.prototype=new Vo;Cp.prototype.constructor=Cp;d=Cp.prototype;d.b=function(){this.g=this.m=0;return this};
d.t=function(a){return a&&a.$classData&&a.$classData.o.Pj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return Dp(this,+a)};d.q=function(){return"ArrayBuilder.ofDouble"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Ep(this,this.g);return a};function Ep(a,b){b=r(A(fb),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.va=function(a){this.s=Ep(this,a);this.m=a};d.Ba=function(a){return Dp(this,+a)};d.Na=function(a){this.m<a&&this.va(a)};
function Dp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};d.Ia=function(a){a&&a.$classData&&a.$classData.o.sh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};d.$classData=v({Pj:0},!1,"scala.collection.mutable.ArrayBuilder$ofDouble",{Pj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Fp(){this.s=null;this.g=this.m=0}
Fp.prototype=new Vo;Fp.prototype.constructor=Fp;d=Fp.prototype;d.b=function(){this.g=this.m=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Qj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return Gp(this,+a)};d.q=function(){return"ArrayBuilder.ofFloat"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Hp(this,this.g);return a};d.va=function(a){this.s=Hp(this,a);this.m=a};function Gp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}
d.Ba=function(a){return Gp(this,+a)};d.Na=function(a){this.m<a&&this.va(a)};function Hp(a,b){b=r(A(eb),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};d.Ia=function(a){a&&a.$classData&&a.$classData.o.th?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};
d.$classData=v({Qj:0},!1,"scala.collection.mutable.ArrayBuilder$ofFloat",{Qj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Ip(){this.s=null;this.g=this.m=0}Ip.prototype=new Vo;Ip.prototype.constructor=Ip;d=Ip.prototype;d.b=function(){this.g=this.m=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Rj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return Jp(this,a|0)};d.q=function(){return"ArrayBuilder.ofInt"};
d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Kp(this,this.g);return a};d.va=function(a){this.s=Kp(this,a);this.m=a};function Jp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}d.Ba=function(a){return Jp(this,a|0)};function Kp(a,b){b=r(A(B),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.Na=function(a){this.m<a&&this.va(a)};d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};
d.Ia=function(a){a&&a.$classData&&a.$classData.o.uh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};d.$classData=v({Rj:0},!1,"scala.collection.mutable.ArrayBuilder$ofInt",{Rj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Lp(){this.s=null;this.g=this.m=0}Lp.prototype=new Vo;Lp.prototype.constructor=Lp;d=Lp.prototype;d.b=function(){this.g=this.m=0;return this};function Mp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}
d.t=function(a){return a&&a.$classData&&a.$classData.o.Sj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return Mp(this,Ua(a))};d.q=function(){return"ArrayBuilder.ofLong"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Np(this,this.g);return a};d.va=function(a){this.s=Np(this,a);this.m=a};function Np(a,b){b=r(A(db),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.Ba=function(a){return Mp(this,Ua(a))};d.Na=function(a){this.m<a&&this.va(a)};
d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};d.Ia=function(a){a&&a.$classData&&a.$classData.o.vh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};d.$classData=v({Sj:0},!1,"scala.collection.mutable.ArrayBuilder$ofLong",{Sj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Op(){this.s=this.Hi=null;this.g=this.m=0}Op.prototype=new Vo;Op.prototype.constructor=Op;d=Op.prototype;
d.Qg=function(a){this.Hi=a;this.g=this.m=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Tj?this.g===a.g&&this.s===a.s:!1};d.Aa=function(a){return Pp(this,a)};d.q=function(){return"ArrayBuilder.ofRef"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Qp(this,this.g);return a};d.va=function(a){this.s=Qp(this,a);this.m=a};function Pp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}d.Ba=function(a){return Pp(this,a)};d.Na=function(a){this.m<a&&this.va(a)};
d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};function Qp(a,b){b=a.Hi.Cb(b);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.Ia=function(a){a&&a.$classData&&a.$classData.o.wh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};d.$classData=v({Tj:0},!1,"scala.collection.mutable.ArrayBuilder$ofRef",{Tj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Rp(){this.s=null;this.g=this.m=0}
Rp.prototype=new Vo;Rp.prototype.constructor=Rp;d=Rp.prototype;d.b=function(){this.g=this.m=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Uj?this.g===a.g&&this.s===a.s:!1};function Sp(a,b){a.sa(1+a.g|0);a.s.a[a.g]=b;a.g=1+a.g|0;return a}d.Aa=function(a){return Sp(this,a|0)};d.q=function(){return"ArrayBuilder.ofShort"};d.ya=function(){var a;0!==this.m&&this.m===this.g?(this.m=0,a=this.s):a=Tp(this,this.g);return a};d.va=function(a){this.s=Tp(this,a);this.m=a};
function Tp(a,b){b=r(A(cb),[b]);0<a.g&&Z(M(),a.s,0,b,0,a.g);return b}d.Ba=function(a){return Sp(this,a|0)};d.Na=function(a){this.m<a&&this.va(a)};d.sa=function(a){if(this.m<a||0===this.m){for(var b=0===this.m?16:this.m<<1;b<a;)b<<=1;this.va(b)}};d.Ia=function(a){a&&a.$classData&&a.$classData.o.xh?(this.sa(this.g+a.n()|0),Z(M(),a.i,0,this.s,this.g,a.n()),this.g=this.g+a.n()|0,a=this):a=ug(this,a);return a};
d.$classData=v({Uj:0},!1,"scala.collection.mutable.ArrayBuilder$ofShort",{Uj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function Up(){this.g=0}Up.prototype=new Vo;Up.prototype.constructor=Up;d=Up.prototype;d.b=function(){this.g=0;return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.Vj?this.g===a.g:!1};d.Aa=function(){return Vp(this)};d.q=function(){return"ArrayBuilder.ofUnit"};function Vp(a){a.g=1+a.g|0;return a}
d.ya=function(){for(var a=r(A(Ca),[this.g]),b=0;b<this.g;)a.a[b]=void 0,b=1+b|0;return a};d.Ba=function(){return Vp(this)};d.Ia=function(a){this.g=this.g+a.ea()|0;return this};d.$classData=v({Vj:0},!1,"scala.collection.mutable.ArrayBuilder$ofUnit",{Vj:1,ld:1,c:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function zh(){V.call(this);this.yd=null}zh.prototype=new pm;zh.prototype.constructor=zh;d=zh.prototype;d.Tb=function(){return"JavaScriptException"};d.Rb=function(){return 1};
d.Pf=function(){this.stackdata=this.yd;return this};d.t=function(a){return this===a?!0:yh(a)?S(T(),this.yd,a.yd):!1};d.Sb=function(a){switch(a){case 0:return this.yd;default:throw(new Zm).h(""+a);}};d.Sd=function(){return na(this.yd)};d.V=function(a){this.yd=a;V.prototype.Ka.call(this,null,null);return this};d.x=function(){return Xf(this)};d.gc=function(){return $m(this)};function yh(a){return!!(a&&a.$classData&&a.$classData.o.lk)}
d.$classData=v({lk:0},!1,"scala.scalajs.js.JavaScriptException",{lk:1,vb:1,nb:1,Ra:1,c:1,f:1,hc:1,u:1,l:1});function ci(){this.hd=this.xc=null;this.le=!1;this.Jb=null}ci.prototype=new y;ci.prototype.constructor=ci;d=ci.prototype;d.Tb=function(){return"TypedTag"};d.Rb=function(){return 4};d.t=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.o.Uh){if(this.xc===a.xc)var b=this.hd,c=a.hd,b=null===b?null===c:b.t(c);else b=!1;return b&&this.le===a.le?this.Jb===a.Jb:!1}return!1};
d.Sb=function(a){switch(a){case 0:return this.xc;case 1:return this.hd;case 2:return this.le;case 3:return this.Jb;default:throw(new Zm).h(""+a);}};d.q=function(){return Vc(this).outerHTML};d.Oe=function(a){a.appendChild(this.Zg())};d.Zg=function(){return Vc(this)};function N(a,b){var c=new ci;b=El(new Fl,b,a.hd);var e=a.le,f=a.Jb;c.xc=a.xc;c.hd=b;c.le=e;c.Jb=f;return c}
d.x=function(){var a=-889275714,a=R().ua(a,Zf(R(),this.xc)),a=R().ua(a,Zf(R(),this.hd)),a=R().ua(a,this.le?1231:1237),a=R().ua(a,Zf(R(),this.Jb));return R().lb(a,4)};d.gc=function(){return $m(this)};function Vc(a){var b=Jc().createElementNS(a.Jb.ig(),a.xc),c=a.hd;a=a.hd;a=r(A(Wp),[Xp(a)]);for(var e=0;;){var f=c,g=Td();if(null!==f&&f.t(g))break;else a.a[e]=c.B(),c=c.pc(),e=1+e|0}for(c=a.a.length;0<c;)for(c=-1+c|0,e=a.a[c],f=0;f<e.n();)e.Q(f).Oe(b),f=1+f|0;return b}
d.$classData=v({Uh:0},!1,"scalatags.JsDom$TypedTag",{Uh:1,c:1,Cp:1,Xh:1,zf:1,bl:1,hc:1,u:1,l:1,f:1});function xd(){this.ij=this.Y=null;this.Lf=0}xd.prototype=new tl;xd.prototype.constructor=xd;d=xd.prototype;d.Sg=function(){try{return cm(this.Y,32),!0}catch(a){if(gn(a))return!1;throw a;}};d.Bb=function(){return this.Y.Bb()};
function wd(a,b,c){a.Y=b;a.ij=c;if(null===b)throw(new wb).h("null value for BigDecimal");if(null===c)throw(new wb).h("null MathContext for BigDecimal");a.Lf=1565550863;return a}d.Vi=function(){try{return cm(this.Y,16),!0}catch(a){if(gn(a))return!1;throw a;}};d.Ag=function(){return this.Y.ec()<<24>>24};
d.t=function(a){if(a&&a.$classData&&a.$classData.o.ah)return Yp(this,a);if(a&&a.$classData&&a.$classData.o.bh){var b=a.Da,b=Lb(Ob(),b),c=bl(this.Y);if(b>3.3219280948873626*(-2+(c-this.Y.A|0)|0)){var e;if(0>=this.Y.A||0>=fm(this.Y).A)try{e=(new ld).V((new pl).Wd(dm(this.Y)))}catch(f){if(gn(f))e=pd();else throw f;}else e=pd();if(e.r())return!1;e=e.Td();return 0===fl(a.Da,e.Da)}return!1}return"number"===typeof a?(e=+a,Infinity!==e&&-Infinity!==e&&(a=this.Y.sc(),Infinity!==a&&-Infinity!==a&&a===e)?(e=
sd(),Yp(this,td(a,e.We))):!1):ya(a)?(e=+a,Infinity!==e&&-Infinity!==e&&(a=this.Y.te(),Infinity!==a&&-Infinity!==a&&a===e)?(e=sd(),Yp(this,td(a,e.We))):!1):this.Tf()&&sb(this,a)};d.Ui=function(){return this.Sg()&&0<=cm(this.Y,32).d&&65535>=cm(this.Y,32).d};d.q=function(){return this.Y.q()};d.Ti=function(){try{return cm(this.Y,8),!0}catch(a){if(gn(a))return!1;throw a;}};d.Eb=function(a){return lm(this.Y,a.Y)};d.vk=function(){return this.Y};d.zh=function(){return this.Y.ec()<<16>>16};d.sc=function(){return this.Y.sc()};
d.x=function(){if(1565550863===this.Lf){if((0>=this.Y.A||0>=fm(this.Y).A)&&4934>(bl(this.Y)-this.Y.A|0))var a=(new pl).Wd(bm(this.Y)).x();else{a=this.Y.sc();if(Infinity!==a&&-Infinity!==a)var b=sd(),a=Yp(this,td(a,b.We));else a=!1;a?a=Rh(R(),this.Y.sc()):(a=fm(this.Y),a=Yf().ze(bm(jm(a,a.A)).x(),a.A))}this.Lf=a}return this.Lf};d.ec=function(){return this.Y.ec()};d.Tf=function(){try{return cm(this.Y,64),!0}catch(a){if(gn(a))return!1;throw a;}};d.te=function(){return this.Y.te()};
function Yp(a,b){return 0===lm(a.Y,b.Y)}d.$classData=v({ah:0},!1,"scala.math.BigDecimal",{ah:1,uj:1,Cc:1,c:1,f:1,Bm:1,Am:1,l:1,qf:1,mb:1});function pl(){this.Da=null}pl.prototype=new tl;pl.prototype.constructor=pl;d=pl.prototype;d.Sg=function(){var a=ol(rl(),-2147483648);return 0<=this.Eb(a)?(a=ol(rl(),2147483647),0>=this.Eb(a)):!1};d.Bb=function(){return this.Da.Bb()};d.Vi=function(){var a=ol(rl(),-32768);return 0<=this.Eb(a)?(a=ol(rl(),32767),0>=this.Eb(a)):!1};
d.Ag=function(){return this.Da.ec()<<24>>24};
d.t=function(a){if(a&&a.$classData&&a.$classData.o.bh)return 0===fl(this.Da,a.Da);if(a&&a.$classData&&a.$classData.o.ah)return a.t(this);if("number"===typeof a){a=+a;var b=this.Da,b=Lb(Ob(),b);if(53>=b)b=!0;else var c=km(this.Da),b=1024>=b&&c>=(-53+b|0)&&1024>c;return b&&!Zp(this)?(b=this.Da,zj(Cj(),Tb(Vb(),b))===a):!1}return ya(a)?(a=+a,b=this.Da,b=Lb(Ob(),b),24>=b?b=!0:(c=km(this.Da),b=128>=b&&c>=(-24+b|0)&&128>c),b&&!Zp(this)?(b=this.Da,b=Tb(Vb(),b),da(zj(Cj(),b))===a):!1):this.Tf()&&sb(this,a)};
function Zp(a){a=Ec(a.Da,2147483647);return 0!==a.z&&!a.t(rl().xj)}d.Ui=function(){var a=ol(rl(),0);return 0<=this.Eb(a)?(a=ol(rl(),65535),0>=this.Eb(a)):!1};d.q=function(){var a=this.Da;return Tb(Vb(),a)};d.Ti=function(){var a=ol(rl(),-128);return 0<=this.Eb(a)?(a=ol(rl(),127),0>=this.Eb(a)):!1};d.Eb=function(a){return fl(this.Da,a.Da)};d.vk=function(){return this.Da};d.zh=function(){return this.Da.ec()<<16>>16};d.sc=function(){var a=this.Da;return zj(Cj(),Tb(Vb(),a))};
d.x=function(){var a;if(this.Tf()){var b=this.Bb();a=b.d;b=b.j;a=(-1===b?0<=(-2147483648^a):-1<b)&&(0===b?-1>=(-2147483648^a):0>b)?a:Yh(R(),(new K).k(a,b))}else a=Zf(R(),this.Da);return a};d.ec=function(){return this.Da.ec()};d.Wd=function(a){this.Da=a;return this};d.Tf=function(){var a=ql(rl(),(new K).k(0,-2147483648));return 0<=this.Eb(a)?(a=ql(rl(),(new K).k(-1,2147483647)),0>=this.Eb(a)):!1};d.te=function(){var a=this.Da,a=Tb(Vb(),a);return da(zj(Cj(),a))};
var nl=v({bh:0},!1,"scala.math.BigInt",{bh:1,uj:1,Cc:1,c:1,f:1,Bm:1,Am:1,l:1,qf:1,mb:1});pl.prototype.$classData=nl;function $p(){this.kb=null}$p.prototype=new bp;$p.prototype.constructor=$p;$p.prototype.b=function(){this.kb="Boolean";return this};$p.prototype.Cb=function(a){return r(A($a),[a])};$p.prototype.jb=function(){return t($a)};$p.prototype.$classData=v({Km:0},!1,"scala.reflect.ManifestFactory$BooleanManifest$",{Km:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var aq=void 0;
function Gf(){aq||(aq=(new $p).b());return aq}function bq(){this.kb=null}bq.prototype=new bp;bq.prototype.constructor=bq;bq.prototype.b=function(){this.kb="Byte";return this};bq.prototype.Cb=function(a){return r(A(bb),[a])};bq.prototype.jb=function(){return t(bb)};bq.prototype.$classData=v({Lm:0},!1,"scala.reflect.ManifestFactory$ByteManifest$",{Lm:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var cq=void 0;function zf(){cq||(cq=(new bq).b());return cq}function dq(){this.kb=null}dq.prototype=new bp;
dq.prototype.constructor=dq;dq.prototype.b=function(){this.kb="Char";return this};dq.prototype.Cb=function(a){return r(A(ab),[a])};dq.prototype.jb=function(){return t(ab)};dq.prototype.$classData=v({Mm:0},!1,"scala.reflect.ManifestFactory$CharManifest$",{Mm:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var eq=void 0;function Bf(){eq||(eq=(new dq).b());return eq}function fq(){this.kb=null}fq.prototype=new bp;fq.prototype.constructor=fq;fq.prototype.b=function(){this.kb="Double";return this};
fq.prototype.Cb=function(a){return r(A(fb),[a])};fq.prototype.jb=function(){return t(fb)};fq.prototype.$classData=v({Nm:0},!1,"scala.reflect.ManifestFactory$DoubleManifest$",{Nm:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var gq=void 0;function Ff(){gq||(gq=(new fq).b());return gq}function hq(){this.kb=null}hq.prototype=new bp;hq.prototype.constructor=hq;hq.prototype.b=function(){this.kb="Float";return this};hq.prototype.Cb=function(a){return r(A(eb),[a])};hq.prototype.jb=function(){return t(eb)};
hq.prototype.$classData=v({Om:0},!1,"scala.reflect.ManifestFactory$FloatManifest$",{Om:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var iq=void 0;function Ef(){iq||(iq=(new hq).b());return iq}function jq(){this.kb=null}jq.prototype=new bp;jq.prototype.constructor=jq;jq.prototype.b=function(){this.kb="Int";return this};jq.prototype.Cb=function(a){return r(A(B),[a])};jq.prototype.jb=function(){return t(B)};
jq.prototype.$classData=v({Pm:0},!1,"scala.reflect.ManifestFactory$IntManifest$",{Pm:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var dr=void 0;function Cf(){dr||(dr=(new jq).b());return dr}function er(){this.kb=null}er.prototype=new bp;er.prototype.constructor=er;er.prototype.b=function(){this.kb="Long";return this};er.prototype.Cb=function(a){return r(A(db),[a])};er.prototype.jb=function(){return t(db)};
er.prototype.$classData=v({Qm:0},!1,"scala.reflect.ManifestFactory$LongManifest$",{Qm:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var fr=void 0;function Df(){fr||(fr=(new er).b());return fr}function gr(){this.Mc=null}gr.prototype=new dp;gr.prototype.constructor=gr;function hr(){}hr.prototype=gr.prototype;gr.prototype.t=function(a){return this===a};gr.prototype.q=function(){return this.Mc};gr.prototype.x=function(){return La(this)};function ir(){this.kb=null}ir.prototype=new bp;
ir.prototype.constructor=ir;ir.prototype.b=function(){this.kb="Short";return this};ir.prototype.Cb=function(a){return r(A(cb),[a])};ir.prototype.jb=function(){return t(cb)};ir.prototype.$classData=v({Um:0},!1,"scala.reflect.ManifestFactory$ShortManifest$",{Um:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var jr=void 0;function Af(){jr||(jr=(new ir).b());return jr}function kr(){this.kb=null}kr.prototype=new bp;kr.prototype.constructor=kr;kr.prototype.b=function(){this.kb="Unit";return this};
kr.prototype.Cb=function(a){return r(A(Ca),[a])};kr.prototype.jb=function(){return t(Za)};kr.prototype.$classData=v({Vm:0},!1,"scala.reflect.ManifestFactory$UnitManifest$",{Vm:1,Fd:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var lr=void 0;function Hf(){lr||(lr=(new kr).b());return lr}function mr(a,b){a=a.I();for(b=b.I();a.E()&&b.E();)if(!S(T(),a.F(),b.F()))return!1;return!a.E()&&!b.E()}function nr(){this.Ca=null}nr.prototype=new Do;nr.prototype.constructor=nr;
nr.prototype.b=function(){Di.prototype.b.call(this);or=this;(new Ki).b();return this};nr.prototype.W=function(){return(new yn).b()};nr.prototype.$classData=v({Gn:0},!1,"scala.collection.immutable.List$",{Gn:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1,l:1,f:1});var or=void 0;function Te(){or||(or=(new nr).b());return or}function pr(){this.Ca=null}pr.prototype=new Do;pr.prototype.constructor=pr;pr.prototype.b=function(){Di.prototype.b.call(this);return this};pr.prototype.W=function(){return(new Io).b()};
pr.prototype.$classData=v({Yn:0},!1,"scala.collection.immutable.Stream$",{Yn:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1,l:1,f:1});var qr=void 0;function $e(){qr||(qr=(new pr).b());return qr}function rr(){this.Ca=null}rr.prototype=new Do;rr.prototype.constructor=rr;rr.prototype.b=function(){Di.prototype.b.call(this);return this};rr.prototype.W=function(){return(new Tn).b()};rr.prototype.$classData=v({no:0},!1,"scala.collection.mutable.ArrayBuffer$",{no:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1,l:1,f:1});
var sr=void 0;function tr(){this.Ca=null}tr.prototype=new Do;tr.prototype.constructor=tr;tr.prototype.b=function(){Di.prototype.b.call(this);return this};tr.prototype.W=function(){return Xm(new Wm,(new yn).b())};tr.prototype.$classData=v({Go:0},!1,"scala.collection.mutable.ListBuffer$",{Go:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1,l:1,f:1});var ur=void 0;function Jf(){this.Mc=null}Jf.prototype=new hr;Jf.prototype.constructor=Jf;Jf.prototype.b=function(){this.Mc="Any";pd();Td();t(z);return this};
Jf.prototype.Cb=function(a){return r(A(z),[a])};Jf.prototype.jb=function(){return t(z)};Jf.prototype.$classData=v({Im:0},!1,"scala.reflect.ManifestFactory$AnyManifest$",{Im:1,cg:1,bg:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var If=void 0;function Lf(){this.Mc=null}Lf.prototype=new hr;Lf.prototype.constructor=Lf;Lf.prototype.b=function(){this.Mc="AnyVal";pd();Td();t(z);return this};Lf.prototype.Cb=function(a){return r(A(z),[a])};Lf.prototype.jb=function(){return t(z)};
Lf.prototype.$classData=v({Jm:0},!1,"scala.reflect.ManifestFactory$AnyValManifest$",{Jm:1,cg:1,bg:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var Kf=void 0;function vr(){this.Mc=null}vr.prototype=new hr;vr.prototype.constructor=vr;vr.prototype.b=function(){this.Mc="Nothing";pd();Td();t(wl);return this};vr.prototype.Cb=function(a){return r(A(z),[a])};vr.prototype.jb=function(){return t(wl)};
vr.prototype.$classData=v({Rm:0},!1,"scala.reflect.ManifestFactory$NothingManifest$",{Rm:1,cg:1,bg:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var wr=void 0;function Mf(){wr||(wr=(new vr).b());return wr}function xr(){this.Mc=null}xr.prototype=new hr;xr.prototype.constructor=xr;xr.prototype.b=function(){this.Mc="Null";pd();Td();t(Hh);return this};xr.prototype.Cb=function(a){return r(A(z),[a])};xr.prototype.jb=function(){return t(Hh)};
xr.prototype.$classData=v({Sm:0},!1,"scala.reflect.ManifestFactory$NullManifest$",{Sm:1,cg:1,bg:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var yr=void 0;function Nf(){yr||(yr=(new xr).b());return yr}function zr(){this.Mc=null}zr.prototype=new hr;zr.prototype.constructor=zr;zr.prototype.b=function(){this.Mc="Object";pd();Td();t(z);return this};zr.prototype.Cb=function(a){return r(A(z),[a])};zr.prototype.jb=function(){return t(z)};
zr.prototype.$classData=v({Tm:0},!1,"scala.reflect.ManifestFactory$ObjectManifest$",{Tm:1,cg:1,bg:1,c:1,ic:1,Kb:1,Wb:1,Lb:1,l:1,f:1,u:1});var Ar=void 0;function Fd(){Ar||(Ar=(new zr).b());return Ar}function Br(){this.Zh=this.Ca=null}Br.prototype=new To;Br.prototype.constructor=Br;Br.prototype.b=function(){Di.prototype.b.call(this);Cr=this;this.Zh=(new No).dd(0,0,0);return this};Br.prototype.W=function(){return(new Jl).b()};
Br.prototype.$classData=v({ho:0},!1,"scala.collection.immutable.Vector$",{ho:1,Bj:1,Zc:1,Yc:1,Mb:1,ob:1,c:1,Ob:1,pb:1,l:1,f:1});var Cr=void 0;function cf(){Cr||(Cr=(new Br).b());return Cr}function Dr(){}Dr.prototype=new y;Dr.prototype.constructor=Dr;function Er(){}d=Er.prototype=Dr.prototype;d.Qb=function(a,b,c){return ig(this,a,b,c)};d.fb=function(){return-1};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this};d.W=function(){return this.gb().W()};d.Wa=function(){return Bo(this)};
function Fr(a){a=a.n();return(new mm).dd(0,a,1)}function Gr(a){return Hr(a)?I(new J,a,a.n()).F():a.Q(0)}function Ir(a,b){return a.n()-b|0}function Jr(a,b){if(b&&b.$classData&&b.$classData.o.wb){var c=a.n();if(c===b.n()){for(var e=0;e<c&&S(T(),a.Q(e),b.Q(e));)e=1+e|0;return e===c}return!1}return mr(a,b)}function Hr(a){return 0===a.n()}function Kr(a,b){for(var c=0,e=a.n();c<e;)b.y(a.Q(c)),c=1+c|0}function xk(a){return 0<a.n()?a.Q(-1+a.n()|0):Ao(a)}
function Lr(a,b,c,e){var f=0,g=c,h=a.n();e=h<e?h:e;c=Jh(Nh(),b)-c|0;for(c=e<c?e:c;f<c;)Lh(Nh(),b,g,a.Q(f)),f=1+f|0,g=1+g|0}function Mr(a,b){if(b&&b.$classData&&b.$classData.o.rf){if(a===b)return!0;for(;!a.r()&&!b.r()&&S(T(),a.B(),b.B());)a=a.ka(),b=b.ka();return a.r()&&b.r()}return mr(a,b)}function Nr(a,b){a=a.Ci(b);if(0>b||a.r())throw(new Zm).h(""+b);return a.B()}function Xp(a){for(var b=0;!a.r();)b=1+b|0,a=a.ka();return b}
function Or(a,b){var c=0;for(;;){if(c===b)return a.r()?0:1;if(a.r())return-1;c=1+c|0;a=a.ka()}}function Pr(a,b,c,e,f){var g=a.I();a=An(new zn,g,bg(function(){return function(a){if(null!==a){var b=a.Nc();a=a.Ac();He||(He=(new Ge).b());return""+(""+sh(Ia(),b)+" -\x3e ")+a}throw(new C).V(a);}}(a)));return lg(a,b,c,e,f)}
function wk(a,b){a=a.q();b=97<=b&&122>=b||65<=b&&90>=b||48<=b&&57>=b?l.String.fromCharCode(b):"\\"+(new L).H(b);Ia();if(null===a)throw(new U).b();b=Wd(Vd(),b);a=na(a);if(""===a){var c=(new G).p([""]);a=c.i.length|0;a=r(A(qa),[a]);b=0;for(c=I(new J,c,c.i.length|0);c.E();){var e=c.F();a.a[b]=e;b=1+b|0}}else{c=ni(new gi,b,a,a.length|0);b=[];for(var f=0,e=0;2147483646>e&&hi(c);){if(0!==mi(c)){var g=ii(c).index|0,f=a.substring(f,g);b.push(null===f?null:f);e=1+e|0}f=mi(c)}a=a.substring(f);b.push(null===
a?null:a);a=la(A(qa),b);for(b=a.a.length;0!==b&&""===a.a[-1+b|0];)b=-1+b|0;b!==a.a.length&&(c=r(A(qa),[b]),Sa(a,0,c,0,b),a=c)}return a}function Qr(){}Qr.prototype=new Er;Qr.prototype.constructor=Qr;function Rr(){}d=Rr.prototype=Qr.prototype;d.B=function(){return this.I().F()};d.Sa=function(a){return mr(this,a)};d.df=function(a){var b=this.I();return ui(b,a)};d.X=function(a){var b=this.I();vi(b,a)};d.za=function(){return this.I().za()};
d.sb=function(a,b,c){var e=b;b=b+c|0;c=Jh(Nh(),a);b=b<c?b:c;for(c=this.I();e<b&&c.E();)Lh(Nh(),a,e,c.F()),e=1+e|0};var Pn=v({Ua:0},!0,"scala.collection.immutable.Iterable",{Ua:1,cb:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,$a:1,aa:1,Z:1,J:1,L:1,u:1});function jd(){this.e=null}jd.prototype=new y;jd.prototype.constructor=jd;d=jd.prototype;d.ma=function(){return(new Hg).h(this.e)};d.B=function(){return Gr(this)};d.Q=function(a){a=65535&(this.e.charCodeAt(a)|0);return(new L).H(a)};
d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new Hg).h(this.e)};d.t=function(a){Dg||(Dg=(new Ag).b());return a&&a.$classData&&a.$classData.o.Jj?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return this.e};d.X=function(a){Kr(this,a)};d.Eb=function(a){var b=this.e;return b===a?0:b<a?-1:1};d.ea=function(){return this.e.length|0};
d.I=function(){return I(new J,this,this.e.length|0)};d.n=function(){return this.e.length|0};d.fb=function(){return this.e.length|0};d.za=function(){var a=I(new J,this,this.e.length|0);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Lr(this,a,b,c)};d.x=function(){var a=this.e;return Ha(Ia(),a)};d.h=function(a){this.e=a;return this};d.W=function(){return(new jg).b()};d.Wa=function(){return Bo(this)};
d.$classData=v({Jj:0},!1,"scala.collection.immutable.StringOps",{Jj:1,c:1,Ij:1,Ha:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,qf:1,mb:1});function Sr(a,b,c,e){var f=Jh(Nh(),a.Db());e=e<f?e:f;f=Jh(Nh(),b)-c|0;e=e<f?e:f;0<e&&Z(M(),a.Db(),0,b,c,e)}var Wp=v({Ma:0},!0,"scala.collection.Seq",{Ma:1,La:1,T:1,aa:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,Z:1,J:1,L:1,u:1,Ga:1,ia:1,ja:1});function Ok(){this.e=null}Ok.prototype=new y;Ok.prototype.constructor=Ok;d=Ok.prototype;d.ma=function(){return(new lo).lf(this.e)};
d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new lo).lf(this.e)};d.t=function(a){Kg||(Kg=(new Jg).b());return a&&a.$classData&&a.$classData.o.Wj?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};
d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.lf=function(a){this.e=a;return this};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new tp).b()};d.Wa=function(){return Bo(this)};
d.$classData=v({Wj:0},!1,"scala.collection.mutable.ArrayOps$ofBoolean",{Wj:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Pk(){this.e=null}Pk.prototype=new y;Pk.prototype.constructor=Pk;d=Pk.prototype;d.ma=function(){return(new eo).ef(this.e)};d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new eo).ef(this.e)};
d.t=function(a){Mg||(Mg=(new Lg).b());return a&&a.$classData&&a.$classData.o.Xj?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};
d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.ef=function(a){this.e=a;return this};d.W=function(){return(new wp).b()};d.Wa=function(){return Bo(this)};d.$classData=v({Xj:0},!1,"scala.collection.mutable.ArrayOps$ofByte",{Xj:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Qk(){this.e=null}Qk.prototype=new y;Qk.prototype.constructor=Qk;d=Qk.prototype;d.ma=function(){return(new go).Ad(this.e)};
d.B=function(){return Gr(this)};d.Q=function(a){return(new L).H(this.e.a[a])};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new go).Ad(this.e)};d.t=function(a){Og||(Og=(new Ng).b());return a&&a.$classData&&a.$classData.o.Yj?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};
d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.Ad=function(a){this.e=a;return this};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new zp).b()};d.Wa=function(){return Bo(this)};
d.$classData=v({Yj:0},!1,"scala.collection.mutable.ArrayOps$ofChar",{Yj:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Rk(){this.e=null}Rk.prototype=new y;Rk.prototype.constructor=Rk;d=Rk.prototype;d.ma=function(){return(new ko).ff(this.e)};d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new ko).ff(this.e)};
d.t=function(a){Qg||(Qg=(new Pg).b());return a&&a.$classData&&a.$classData.o.Zj?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.ff=function(a){this.e=a;return this};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};
d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new Cp).b()};d.Wa=function(){return Bo(this)};d.$classData=v({Zj:0},!1,"scala.collection.mutable.ArrayOps$ofDouble",{Zj:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Sk(){this.e=null}Sk.prototype=new y;Sk.prototype.constructor=Sk;d=Sk.prototype;d.ma=function(){return(new jo).gf(this.e)};
d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new jo).gf(this.e)};d.t=function(a){Sg||(Sg=(new Rg).b());return a&&a.$classData&&a.$classData.o.$j?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};
d.I=function(){return I(new J,this,this.e.a.length)};d.gf=function(a){this.e=a;return this};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new Fp).b()};d.Wa=function(){return Bo(this)};
d.$classData=v({$j:0},!1,"scala.collection.mutable.ArrayOps$ofFloat",{$j:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Tk(){this.e=null}Tk.prototype=new y;Tk.prototype.constructor=Tk;d=Tk.prototype;d.ma=function(){return(new ho).hf(this.e)};d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new ho).hf(this.e)};
d.t=function(a){Ug||(Ug=(new Tg).b());return a&&a.$classData&&a.$classData.o.ak?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};d.I=function(){return I(new J,this,this.e.a.length)};d.hf=function(a){this.e=a;return this};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};
d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new Ip).b()};d.Wa=function(){return Bo(this)};d.$classData=v({ak:0},!1,"scala.collection.mutable.ArrayOps$ofInt",{ak:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Uk(){this.e=null}Uk.prototype=new y;Uk.prototype.constructor=Uk;d=Uk.prototype;d.ma=function(){return(new io).jf(this.e)};
d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.jf=function(a){this.e=a;return this};d.oa=function(){return(new io).jf(this.e)};d.t=function(a){Wg||(Wg=(new Vg).b());return a&&a.$classData&&a.$classData.o.bk?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};
d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new Lp).b()};d.Wa=function(){return Bo(this)};
d.$classData=v({bk:0},!1,"scala.collection.mutable.ArrayOps$ofLong",{bk:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function yk(){this.e=null}yk.prototype=new y;yk.prototype.constructor=yk;d=yk.prototype;d.ma=function(){return(new no).Vd(this.e)};d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new no).Vd(this.e)};
d.t=function(a){Yg||(Yg=(new Xg).b());return a&&a.$classData&&a.$classData.o.ck?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};d.Vd=function(a){this.e=a;return this};d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};
d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){var a=this.e;return(new Op).Qg(vl(zl(),je(pa(a))))};d.Wa=function(){return Bo(this)};d.$classData=v({ck:0},!1,"scala.collection.mutable.ArrayOps$ofRef",{ck:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Vk(){this.e=null}Vk.prototype=new y;Vk.prototype.constructor=Vk;d=Vk.prototype;
d.ma=function(){return(new fo).kf(this.e)};d.B=function(){return Gr(this)};d.Q=function(a){return this.e.a[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.kf=function(a){this.e=a;return this};d.oa=function(){return(new fo).kf(this.e)};d.t=function(a){$g||($g=(new Zg).b());return a&&a.$classData&&a.$classData.o.dk?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};
d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new Rp).b()};d.Wa=function(){return Bo(this)};
d.$classData=v({dk:0},!1,"scala.collection.mutable.ArrayOps$ofShort",{dk:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Wk(){this.e=null}Wk.prototype=new y;Wk.prototype.constructor=Wk;d=Wk.prototype;d.ma=function(){return(new mo).mf(this.e)};d.B=function(){return Gr(this)};d.Q=function(){};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return(new mo).mf(this.e)};
d.t=function(a){bh||(bh=(new ah).b());return a&&a.$classData&&a.$classData.o.ek?this.e===(null===a?null:a.e):!1};d.Qb=function(a,b,c){return ig(this,a,b,c)};d.q=function(){return zo(this)};d.X=function(a){Kr(this,a)};d.ea=function(){return this.e.a.length};d.I=function(){return I(new J,this,this.e.a.length)};d.n=function(){return this.e.a.length};d.fb=function(){return this.e.a.length};d.za=function(){var a=I(new J,this,this.e.a.length);return wi(a)};d.mf=function(a){this.e=a;return this};
d.Ab=function(a,b,c,e){return lg(this,a,b,c,e)};d.Db=function(){return this.e};d.sb=function(a,b,c){Sr(this,a,b,c)};d.x=function(){return this.e.x()};d.W=function(){return(new Up).b()};d.Wa=function(){return Bo(this)};d.$classData=v({ek:0},!1,"scala.collection.mutable.ArrayOps$ofUnit",{ek:1,c:1,md:1,db:1,Va:1,Pa:1,qa:1,ja:1,L:1,u:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,J:1,ia:1,Ha:1,na:1});function Tr(){}Tr.prototype=new Rr;Tr.prototype.constructor=Tr;function Ur(){}d=Ur.prototype=Tr.prototype;
d.Oa=function(a){a:if(0>a)a=1;else{for(var b=0,c=this.I();c.E();){if(b===a){a=c.E()?1:0;break a}c.F();b=1+b|0}a=b-a|0}return a};d.t=function(a){return vn(this,a)};d.r=function(){return 0===this.Oa(0)};d.q=function(){return zo(this)};d.ea=function(){return this.n()};d.x=function(){return ti(Yf(),this.$c())};
function Vr(){this.Oi=this.hi=this.gi=this.fa=this.tk=this.wc=this.oj=this.$f=this.id=this.Qa=this.pf=this.Qi=this.di=this.nk=this.bi=this.Ni=this.$g=this.pe=this.Ai=this.gj=this.uk=this.mj=this.Mi=this.Li=this.Ki=this.pk=null;this.v=u().$b;this.Gf=u().$b;u();u();this.pa=u().$b}Vr.prototype=new y;Vr.prototype.constructor=Vr;function Yc(){var a=O();if(0===(8192&a.pa.d)&&0===(8192&a.pa.d)){a.oj=de("placeholder");var b=a.pa;a.pa=(new K).k(8192|b.d,b.j)}return a.oj}
Vr.prototype.b=function(){Wr=this;de("ondrag");this.pk=(new $h).b();(new $h).b();(new $h).b();(new $h).b();(new $h).b();(new $h).b();(new $h).b();(new $h).b();(new ai).b();(new ai).b();(new ai).b();(new ai).b();(new ai).b();(new ai).b();(new ai).b();(new ai).b();cn||(cn=(new an).b());en||(en=(new dn).b());rj();rj();rj();return this};function Sc(){var a=O();if(0===(32768&a.v.d)&&0===(32768&a.v.d)){var b=Jd().dc;a.mj=Kd("p",!1,b);b=a.v;a.v=(new K).k(32768|b.d,b.j)}return a.mj}
function Ld(a){if(0===(512&a.v.j)&&0===(512&a.v.j)){var b=Jd().dc;a.di=Kd("br",!0,b);b=a.v;a.v=(new K).k(b.d,512|b.j)}return a.di}function Rc(){var a=O();if(0===(2048&a.v.d)&&0===(2048&a.v.d)){var b=Jd().dc;a.Mi=Kd("h5",!1,b);b=a.v;a.v=(new K).k(2048|b.d,b.j)}return a.Mi}function Oc(a){if(0===(134217728&a.v.d)&&0===(134217728&a.v.d)){var b=Jd().dc;a.Ai=Kd("div",!1,b);b=a.v;a.v=(new K).k(134217728|b.d,b.j)}return a.Ai}
function Qc(){var a=O();if(0===(33554432&a.pa.d)&&0===(33554432&a.pa.d)){if(0===(16777216&a.pa.d)&&0===(16777216&a.pa.d)){a.gi=de("class");var b=a.pa;a.pa=(new K).k(16777216|b.d,b.j)}a.hi=a.gi;b=a.pa;a.pa=(new K).k(33554432|b.d,b.j)}return a.hi}function Zc(){var a=O();if(0===(2097152&a.pa.d)&&0===(2097152&a.pa.d)){a.fa=de("value");var b=a.pa;a.pa=(new K).k(2097152|b.d,b.j)}return a.fa}
function bd(){var a=O();if(0===(1048576&a.v.d)&&0===(1048576&a.v.d)){var b=Jd().dc;a.uk=Kd("ul",!1,b);b=a.v;a.v=(new K).k(1048576|b.d,b.j)}return a.uk}function cd(){var a=O();if(0===(2097152&a.v.d)&&0===(2097152&a.v.d)){var b=Jd().dc;a.gj=Kd("li",!1,b);b=a.v;a.v=(new K).k(2097152|b.d,b.j)}return a.gj}function Md(){var a=O();if(0===(256&a.v.j)&&0===(256&a.v.j)){var b=Jd().dc;a.nk=Kd("span",!1,b);b=a.v;a.v=(new K).k(b.d,256|b.j)}return a.nk}
function $c(){var a=O();if(0===(65536&a.pa.d)&&0===(65536&a.pa.d)){a.wc=de("size");var b=a.pa;a.pa=(new K).k(65536|b.d,b.j)}return a.wc}function Pd(a){if(0===(32&a.v.j)&&0===(32&a.v.j)){var b=Jd().dc;a.Ni=Kd("i",!1,b);b=a.v;a.v=(new K).k(b.d,32|b.j)}return a.Ni}function Wc(){var a=O();if(0===(128&a.Gf.d)&&0===(128&a.Gf.d)){var b=Jd().dc;a.Qi=Kd("input",!0,b);b=a.Gf;a.Gf=(new K).k(128|b.d,b.j)}return a.Qi}
function ad(){var a=O();if(0===(1&a.pa.j)&&0===(1&a.pa.j)){a.Oi=de("id");var b=a.pa;a.pa=(new K).k(b.d,1|b.j)}return a.Oi}function Xc(){var a=O();if(0===(524288&a.pa.d)&&0===(524288&a.pa.d)){a.tk=de("type");var b=a.pa;a.pa=(new K).k(524288|b.d,b.j)}return a.tk}Vr.prototype.$classData=v({Vk:0},!1,"scalatags.JsDom$all$",{Vk:1,c:1,ip:1,Dp:1,tp:1,Fp:1,np:1,rp:1,qp:1,op:1,up:1,xp:1,vp:1,sp:1,wp:1,Ep:1,pp:1,Ap:1,yp:1,Gp:1,Bp:1,gp:1,hp:1,kp:1,lp:1,jp:1});var Wr=void 0;
function O(){Wr||(Wr=(new Vr).b());return Wr}function Xr(){}Xr.prototype=new Rr;Xr.prototype.constructor=Xr;function Yr(){}d=Yr.prototype=Xr.prototype;
d.t=function(a){if(a&&a.$classData&&a.$classData.o.kn){var b;if(!(b=this===a)&&(b=this.od===a.od))try{for(var c=this.I(),e=!0;e&&c.E();){var f=c.F();if(null===f)throw(new C).V(f);var g=f.Ac(),h,k=fh(a,f.Nc());h=null===k?pd():(new ld).V(k.fa);b:{if(ro(h)){var n=h.ke;if(S(T(),g,n)){e=!0;break b}}e=!1}}b=e}catch(m){if(m&&m.$classData&&m.$classData.o.ul)b=!1;else throw m;}a=b}else a=!1;return a};d.r=function(){return 0===this.od};d.q=function(){return zo(this)};
d.Ab=function(a,b,c,e){return Pr(this,a,b,c,e)};d.x=function(){var a=Yf();return $f(a,this,a.hj)};d.Wa=function(){return"Map"};function Zr(){}Zr.prototype=new Rr;Zr.prototype.constructor=Zr;function $r(){}d=$r.prototype=Zr.prototype;d.t=function(a){if(a&&a.$classData&&a.$classData.o.uc){var b;if(!(b=this===a)&&(b=this.ea()===a.ea()))try{b=this.qk(a)}catch(c){if(c&&c.$classData&&c.$classData.o.ul)b=!1;else throw c;}a=b}else a=!1;return a};d.r=function(){return 0===this.ea()};d.q=function(){return zo(this)};
d.qk=function(a){return this.df(a)};d.x=function(){var a=Yf();return $f(a,this,a.kk)};d.Wa=function(){return"Set"};d.W=function(){return Hn(new In,this.Qd())};function as(){}as.prototype=new $r;as.prototype.constructor=as;function bs(){}d=bs.prototype=as.prototype;d.ma=function(){return this};d.Xf=function(){throw(new W).h("next of empty set");};d.y=function(a){return this.hb(a)};d.r=function(){return!0};d.oa=function(){return this};d.gb=function(){sp||(sp=(new qp).b());return sp};
d.Fe=function(a){return cs(this,a)};d.ea=function(){return 0};d.I=function(){var a=ds(this);return Cn(a)};d.Qd=function(){return rp()};function ds(a){for(var b=Td();!a.r();){var c=a.Gg(),b=El(new Fl,c,b);a=a.Xf()}return b}d.hb=function(){return!1};d.Gg=function(){throw(new W).h("elem of empty set");};d.qd=function(a){return this.Fe(a)};d.Wa=function(){return"ListSet"};function es(){}es.prototype=new $r;es.prototype.constructor=es;d=es.prototype;d.ma=function(){return this};d.b=function(){return this};
d.y=function(){return!1};d.oa=function(){return this};d.gb=function(){return Gk()};d.X=function(){};d.ea=function(){return 0};d.I=function(){return Se().Uc};d.Qd=function(){return Go()};d.qd=function(a){return(new fs).V(a)};d.$classData=v({Sn:0},!1,"scala.collection.immutable.Set$EmptySet$",{Sn:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});var gs=void 0;
function Go(){gs||(gs=(new es).b());return gs}function fs(){this.la=null}fs.prototype=new $r;fs.prototype.constructor=fs;d=fs.prototype;d.ma=function(){return this};d.B=function(){return this.la};d.y=function(a){return this.hb(a)};d.oa=function(){return this};d.df=function(a){return!!a.y(this.la)};d.gb=function(){return Gk()};d.X=function(a){a.y(this.la)};d.ea=function(){return 1};d.I=function(){Se();var a=(new G).p([this.la]);return I(new J,a,a.i.length|0)};d.V=function(a){this.la=a;return this};
d.Qd=function(){return Go()};d.Md=function(a){return this.hb(a)?this:(new hs).Vc(this.la,a)};d.hb=function(a){return S(T(),a,this.la)};d.qd=function(a){return this.Md(a)};d.$classData=v({Tn:0},!1,"scala.collection.immutable.Set$Set1",{Tn:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});function hs(){this.Za=this.la=null}hs.prototype=new $r;hs.prototype.constructor=hs;d=hs.prototype;d.ma=function(){return this};
d.B=function(){return this.la};d.y=function(a){return this.hb(a)};d.oa=function(){return this};d.Vc=function(a,b){this.la=a;this.Za=b;return this};d.df=function(a){return!!a.y(this.la)&&!!a.y(this.Za)};d.gb=function(){return Gk()};d.X=function(a){a.y(this.la);a.y(this.Za)};d.ea=function(){return 2};d.I=function(){Se();var a=(new G).p([this.la,this.Za]);return I(new J,a,a.i.length|0)};d.Qd=function(){return Go()};
d.Md=function(a){if(this.hb(a))a=this;else{var b=this.Za,c=new is;c.la=this.la;c.Za=b;c.bc=a;a=c}return a};d.hb=function(a){return S(T(),a,this.la)||S(T(),a,this.Za)};d.qd=function(a){return this.Md(a)};d.$classData=v({Un:0},!1,"scala.collection.immutable.Set$Set2",{Un:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});function is(){this.bc=this.Za=this.la=null}is.prototype=new $r;
is.prototype.constructor=is;d=is.prototype;d.ma=function(){return this};d.B=function(){return this.la};d.y=function(a){return this.hb(a)};d.oa=function(){return this};d.df=function(a){return!!a.y(this.la)&&!!a.y(this.Za)&&!!a.y(this.bc)};d.gb=function(){return Gk()};d.X=function(a){a.y(this.la);a.y(this.Za);a.y(this.bc)};d.ea=function(){return 3};d.I=function(){Se();var a=(new G).p([this.la,this.Za,this.bc]);return I(new J,a,a.i.length|0)};d.Qd=function(){return Go()};
d.Md=function(a){if(this.hb(a))a=this;else{var b=this.Za,c=this.bc,e=new js;e.la=this.la;e.Za=b;e.bc=c;e.se=a;a=e}return a};d.hb=function(a){return S(T(),a,this.la)||S(T(),a,this.Za)||S(T(),a,this.bc)};d.qd=function(a){return this.Md(a)};d.$classData=v({Vn:0},!1,"scala.collection.immutable.Set$Set3",{Vn:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});
function js(){this.se=this.bc=this.Za=this.la=null}js.prototype=new $r;js.prototype.constructor=js;d=js.prototype;d.ma=function(){return this};d.B=function(){return this.la};d.y=function(a){return this.hb(a)};d.oa=function(){return this};d.df=function(a){return!!a.y(this.la)&&!!a.y(this.Za)&&!!a.y(this.bc)&&!!a.y(this.se)};d.gb=function(){return Gk()};d.X=function(a){a.y(this.la);a.y(this.Za);a.y(this.bc);a.y(this.se)};d.ea=function(){return 4};
d.I=function(){Se();var a=(new G).p([this.la,this.Za,this.bc,this.se]);return I(new J,a,a.i.length|0)};d.Qd=function(){return Go()};d.Md=function(a){return this.hb(a)?this:ks(ks(ks(ks(ks((new ls).b(),this.la),this.Za),this.bc),this.se),a)};d.hb=function(a){return S(T(),a,this.la)||S(T(),a,this.Za)||S(T(),a,this.bc)||S(T(),a,this.se)};d.qd=function(a){return this.Md(a)};
d.$classData=v({Wn:0},!1,"scala.collection.immutable.Set$Set4",{Wn:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});function ls(){}ls.prototype=new $r;ls.prototype.constructor=ls;function ms(){}d=ms.prototype=ls.prototype;d.vf=function(a,b){return ns(a,b)};function os(a){a=Zf(R(),a);a=a+~(a<<9)|0;a^=a>>>14|0;a=a+(a<<4)|0;return a^(a>>>10|0)}d.ma=function(){return this};d.b=function(){return this};
d.y=function(a){return this.hb(a)};function ks(a,b){return a.vf(b,os(b),0)}d.oa=function(){return this};d.gb=function(){return np()};d.X=function(){};d.qk=function(a){if(a&&a.$classData&&a.$classData.o.De)return this.uf(a,0);var b=this.I();return ui(b,a)};d.ea=function(){return 0};d.I=function(){return Se().Uc};d.Qd=function(){return lp()};d.hb=function(a){return this.zd(a,os(a),0)};d.zd=function(){return!1};d.qd=function(a){return ks(this,a)};d.uf=function(){return!0};
var ip=v({De:0},!1,"scala.collection.immutable.HashSet",{De:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,na:1,l:1,f:1});ls.prototype.$classData=ip;function ps(){}ps.prototype=new bs;ps.prototype.constructor=ps;ps.prototype.b=function(){return this};
ps.prototype.$classData=v({Kn:0},!1,"scala.collection.immutable.ListSet$EmptyListSet$",{Kn:1,In:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});var qs=void 0;function rp(){qs||(qs=(new ps).b());return qs}function rs(){this.Ch=this.Di=null}rs.prototype=new bs;rs.prototype.constructor=rs;d=rs.prototype;d.Xf=function(){return this.Ch};d.r=function(){return!1};
d.Fe=function(a){return ss(this,a)?this:cs(this,a)};d.ea=function(){a:{var a=this,b=0;for(;;){if(a.r())break a;a=a.Xf();b=1+b|0}}return b};function cs(a,b){var c=new rs;c.Di=b;if(null===a)throw xg(od(),null);c.Ch=a;return c}d.Gg=function(){return this.Di};d.hb=function(a){return ss(this,a)};function ss(a,b){for(;;){if(a.r())return!1;if(S(T(),a.Gg(),b))return!0;a=a.Xf()}}d.qd=function(a){return this.Fe(a)};
d.$classData=v({Ln:0},!1,"scala.collection.immutable.ListSet$Node",{Ln:1,In:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,l:1,f:1});function ts(){}ts.prototype=new Ur;ts.prototype.constructor=ts;function us(){}us.prototype=ts.prototype;ts.prototype.ma=function(){return this.tf()};ts.prototype.tf=function(){return this};function vs(){}vs.prototype=new ms;vs.prototype.constructor=vs;vs.prototype.b=function(){return this};
vs.prototype.B=function(){throw(new W).h("Empty Set");};vs.prototype.$classData=v({An:0},!1,"scala.collection.immutable.HashSet$EmptyHashSet$",{An:1,De:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,na:1,l:1,f:1});var ws=void 0;function lp(){ws||(ws=(new vs).b());return ws}function kp(){this.Pc=0;this.tb=null;this.ie=0}kp.prototype=new ms;kp.prototype.constructor=kp;d=kp.prototype;
d.vf=function(a,b,c){var e=1<<(31&(b>>>c|0)),f=Lj(kd(),this.Pc&(-1+e|0));if(0!==(this.Pc&e)){e=this.tb.a[f];a=e.vf(a,b,5+c|0);if(e===a)return this;b=r(A(ip),[this.tb.a.length]);Z(M(),this.tb,0,b,0,this.tb.a.length);b.a[f]=a;return jp(new kp,this.Pc,b,this.ie+(a.ea()-e.ea()|0)|0)}c=r(A(ip),[1+this.tb.a.length|0]);Z(M(),this.tb,0,c,0,f);c.a[f]=ns(a,b);Z(M(),this.tb,f,c,1+f|0,this.tb.a.length-f|0);return jp(new kp,this.Pc|e,c,1+this.ie|0)};
d.X=function(a){for(var b=0;b<this.tb.a.length;)this.tb.a[b].X(a),b=1+b|0};d.ea=function(){return this.ie};d.I=function(){var a=new Eo;Ln.prototype.el.call(a,this.tb);return a};function jp(a,b,c,e){a.Pc=b;a.tb=c;a.ie=e;Lk(Xk(),Lj(kd(),b)===c.a.length);return a}d.zd=function(a,b,c){var e=31&(b>>>c|0),f=1<<e;return-1===this.Pc?this.tb.a[31&e].zd(a,b,5+c|0):0!==(this.Pc&f)?(e=Lj(kd(),this.Pc&(-1+f|0)),this.tb.a[e].zd(a,b,5+c|0)):!1};
d.uf=function(a,b){if(a===this)return!0;if(Nn(a)&&this.ie<=a.ie){var c=this.Pc,e=this.tb,f=0,g=a.tb;a=a.Pc;var h=0;if((c&a)===c){for(;0!==c;){var k=c^c&(-1+c|0),n=a^a&(-1+a|0);if(k===n){if(!e.a[f].uf(g.a[h],5+b|0))return!1;c&=~k;f=1+f|0}a&=~n;h=1+h|0}return!0}}return!1};function Nn(a){return!!(a&&a.$classData&&a.$classData.o.Ej)}
d.$classData=v({Ej:0},!1,"scala.collection.immutable.HashSet$HashTrieSet",{Ej:1,De:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,na:1,l:1,f:1});function xs(){}xs.prototype=new ms;xs.prototype.constructor=xs;function ys(){}ys.prototype=xs.prototype;function zs(){this.Bd=null;this.cc=0}zs.prototype=new ys;zs.prototype.constructor=zs;d=zs.prototype;
d.vf=function(a,b,c){if(b===this.cc&&S(T(),a,this.Bd))return this;if(b!==this.cc)return hp(np(),this.cc,this,b,ns(a,b),c);var e=rp();c=new As;a=cs(e,this.Bd).Fe(a);c.cc=b;c.Cd=a;return c};function ns(a,b){var c=new zs;c.Bd=a;c.cc=b;return c}d.X=function(a){a.y(this.Bd)};d.I=function(){Se();var a=(new G).p([this.Bd]);return I(new J,a,a.i.length|0)};d.ea=function(){return 1};d.zd=function(a,b){return b===this.cc&&S(T(),a,this.Bd)};d.uf=function(a,b){return a.zd(this.Bd,this.cc,b)};
d.$classData=v({Dj:0},!1,"scala.collection.immutable.HashSet$HashSet1",{Dj:1,Dn:1,De:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,na:1,l:1,f:1});function As(){this.cc=0;this.Cd=null}As.prototype=new ys;As.prototype.constructor=As;d=As.prototype;d.vf=function(a,b,c){b===this.cc?(c=new As,a=this.Cd.Fe(a),c.cc=b,c.Cd=a,b=c):b=hp(np(),this.cc,this,b,ns(a,b),c);return b};
d.X=function(a){var b=ds(this.Cd);vi(Cn(b),a)};d.I=function(){var a=ds(this.Cd);return Cn(a)};d.ea=function(){return this.Cd.ea()};d.zd=function(a,b){return b===this.cc&&this.Cd.hb(a)};d.uf=function(a,b){for(var c=ds(this.Cd),c=Cn(c),e=!0;e&&c.E();)e=c.F(),e=a.zd(e,this.cc,b);return e};
d.$classData=v({Bn:0},!1,"scala.collection.immutable.HashSet$HashSetCollision1",{Bn:1,Dn:1,De:1,Dc:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Fc:1,T:1,uc:1,Ec:1,Hc:1,Gc:1,Nb:1,Ic:1,Ua:1,cb:1,$a:1,na:1,l:1,f:1});function mm(){this.Lc=this.af=this.Kc=0;this.ed=!1;this.ih=this.sf=0}mm.prototype=new Ur;mm.prototype.constructor=mm;function Bs(){}d=Bs.prototype=mm.prototype;d.ma=function(){return this};d.fd=function(){return!1};
d.B=function(){return this.ed?Td().Sf():this.Kc};d.Q=function(a){return this.Ne(a)};d.y=function(a){return this.Ne(a|0)};d.r=function(){return this.ed};d.oa=function(){return this};d.t=function(a){if(a&&a.$classData&&a.$classData.o.oh){if(this.ed)return a.ed;if(!a.r()&&this.Kc===a.Kc){var b=Cs(this);return b===Cs(a)&&(this.Kc===b||this.Lc===a.Lc)}return!1}return vn(this,a)};
d.Ne=function(a){0>this.sf&&Pl(ff(),this.Kc,this.af,this.Lc,this.fd());if(0>a||a>=this.sf)throw(new Zm).h(""+a);return this.Kc+q(this.Lc,a)|0};
d.dd=function(a,b,c){this.Kc=a;this.af=b;this.Lc=c;this.ed=a>b&&0<c||a<b&&0>c||a===b&&!this.fd();if(0===c)throw(new wb).h("step cannot be 0.");if(this.ed)a=0;else{var e;e=Ds(this);a=e.d;var f=e.j,g=this.Lc,h=g>>31;e=u();a=Sb(e,a,f,g,h);e=e.S;g=this.fd()||!Es(this)?1:0;f=g>>31;g=a+g|0;e=(new K).k(g,(-2147483648^g)<(-2147483648^a)?1+(e+f|0)|0:e+f|0);a=e.d;e=e.j;a=(0===e?-1<(-2147483648^a):0<e)?-1:a}this.sf=a;switch(c){case 1:b=this.fd()?b:-1+b|0;break;case -1:b=this.fd()?b:1+b|0;break;default:e=Ds(this),
a=e.d,e=e.j,f=c>>31,a=Hc(u(),a,e,c,f),b=0!==a?b-a|0:this.fd()?b:b-c|0}this.ih=b;return this};d.q=function(){var a=this.fd()?"to":"until",b=1===this.Lc?"":he(ie((new G).p([" by ",""])),(new G).p([this.Lc])),c=this.ed?"empty ":Es(this)?"":"inexact ";return he(ie((new G).p(";Range ; ; ;;".split(";"))),(new G).p([c,this.Kc,a,this.af,b]))};d.gb=function(){return Il()};d.X=function(a){if(!this.ed)for(var b=this.Kc;;){a.y(b);if(b===this.ih)break;b=b+this.Lc|0}};d.ea=function(){return this.n()};
d.I=function(){return I(new J,this,this.n())};d.$c=function(){return this};d.n=function(){return 0>this.sf?Pl(ff(),this.Kc,this.af,this.Lc,this.fd()):this.sf};d.fb=function(){return this.n()};function Es(a){var b=Ds(a),c=b.d,b=b.j,e=a.Lc,f=e>>31;a=u();c=Hc(a,c,b,e,f);b=a.S;return 0===c&&0===b}function Cs(a){if(a.ed){a=Td();if(a.r())throw(new W).b();for(var b=a.ka();!b.r();)a=b,b=b.ka();return a.B()|0}return a.ih}d.x=function(){return ti(Yf(),this)};
function Ds(a){var b=a.af,c=b>>31,e=a.Kc;a=e>>31;e=b-e|0;return(new K).k(e,(-2147483648^e)>(-2147483648^b)?-1+(c-a|0)|0:c-a|0)}d.$classData=v({oh:0},!1,"scala.collection.immutable.Range",{oh:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,mh:1,he:1,Ua:1,cb:1,$a:1,wb:1,qa:1,na:1,l:1,f:1});function Fs(){}Fs.prototype=new Ur;Fs.prototype.constructor=Fs;function Gs(){}d=Gs.prototype=Fs.prototype;d.ma=function(){return this};
d.Q=function(a){return Nr(this,a)};d.Oa=function(a){return 0>a?1:Or(this,a)};d.y=function(a){return Nr(this,a|0)};d.Sa=function(a){return Mr(this,a)};d.oa=function(){return this};d.t=function(a){return this===a||vn(this,a)};
function Ko(a,b){var c=($e(),(new Rl).b());if(Lo(c.Df(a))){if(a.r())a=Ai();else{for(var c=(new Ui).V(a),e=b.y(c.U.B()).za();!c.U.r()&&e.r();)c.U=c.U.ka(),c.U.r()||(e=b.y(c.U.B()).za());a=c.U.r()?($e(),Ai()):Hs(e,zi(function(a,b,c){return function(){return Ko(c.U.ka(),b)}}(a,b,c)))}return a}return yo(a,b,c)}d.Ci=function(a){a:{var b=this;for(;;){if(0>=a||b.r())break a;b=b.ka();a=-1+a|0}}return b};
d.Qb=function(a,b,c){var e=this,f=this;for(e.r()||(e=e.ka());f!==e&&!e.r();){e=e.ka();if(e.r())break;e=e.ka();if(e===f)break;f=f.ka()}return ig(this,a,b,c)};d.gb=function(){return $e()};d.q=function(){return ig(this,"Stream(",", ",")")};d.X=function(a){var b=this;a:for(;;){if(!b.r()){a.y(b.B());b=b.ka();continue a}break}};d.I=function(){return Kn(this)};d.$c=function(){return this};d.n=function(){for(var a=0,b=this;!b.r();)a=1+a|0,b=b.ka();return a};d.za=function(){return this};
d.Ab=function(a,b,c,e){ng(a,b);if(!this.r()){og(a,this.B());b=this;if(b.pd()){var f=this.ka();if(f.r())return ng(a,e),a;if(b!==f&&(b=f,f.pd()))for(f=f.ka();b!==f&&f.pd();)og(ng(a,c),b.B()),b=b.ka(),f=f.ka(),f.pd()&&(f=f.ka());if(f.pd()){for(var g=this,h=0;g!==f;)g=g.ka(),f=f.ka(),h=1+h|0;b===f&&0<h&&(og(ng(a,c),b.B()),b=b.ka());for(;b!==f;)og(ng(a,c),b.B()),b=b.ka()}else{for(;b!==f;)og(ng(a,c),b.B()),b=b.ka();!b.r()&&og(ng(a,c),b.B())}}b.r()||(b.pd()?ng(ng(a,c),"..."):ng(ng(a,c),"?"))}ng(a,e);return a};
d.x=function(){return ti(Yf(),this)};function Hs(a,b){if(a.r())return zg(b).za();var c=a.B();return xi(new yi,c,zi(function(a,b){return function(){return Hs(a.ka(),b)}}(a,b)))}d.Wa=function(){return"Stream"};function Is(a,b){if(b>=a.qb)throw(new Zm).h(""+b);return a.i.a[b]}
function Js(a,b){var c=a.i.a.length,e=c>>31,f=b>>31;if(f===e?(-2147483648^b)>(-2147483648^c):f>e){f=c<<1;for(c=c>>>31|0|e<<1;;){var e=b>>31,g=f,h=c;if(e===h?(-2147483648^b)>(-2147483648^g):e>h)c=f>>>31|0|c<<1,f<<=1;else break}b=c;if(0===b?-1<(-2147483648^f):0<b)f=2147483647;b=f;b=r(A(z),[b]);Sa(a.i,0,b,0,a.qb);a.i=b}}function Ks(){}Ks.prototype=new Ur;Ks.prototype.constructor=Ks;function Ls(){}d=Ls.prototype=Ks.prototype;d.ma=function(){return this};d.Q=function(a){return Nr(this,a)};
d.Oa=function(a){return 0>a?1:Or(this,a)};d.Sa=function(a){return Mr(this,a)};d.y=function(a){return Nr(this,a|0)};d.oa=function(){return this};d.Ci=function(a){for(var b=this;!b.r()&&0<a;)b=b.pc(),a=-1+a|0;return b};d.gb=function(){return Te()};d.X=function(a){for(var b=this;!b.r();)a.y(b.B()),b=b.pc()};d.I=function(){return Cn(this)};d.n=function(){return Xp(this)};d.$c=function(){return this};d.za=function(){return this.r()?Ai():xi(new yi,this.B(),zi(function(a){return function(){return a.pc().za()}}(this)))};
d.x=function(){return ti(Yf(),this)};d.Wa=function(){return"List"};function Cl(){mm.call(this)}Cl.prototype=new Bs;Cl.prototype.constructor=Cl;Cl.prototype.fd=function(){return!0};Cl.prototype.dd=function(a,b,c){mm.prototype.dd.call(this,a,b,c);return this};
Cl.prototype.$classData=v({Pn:0},!1,"scala.collection.immutable.Range$Inclusive",{Pn:1,oh:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,mh:1,he:1,Ua:1,cb:1,$a:1,wb:1,qa:1,na:1,l:1,f:1});function yi(){this.hg=this.sk=this.Rf=null}yi.prototype=new Gs;yi.prototype.constructor=yi;d=yi.prototype;d.B=function(){return this.Rf};function ht(a){a.pd()||a.pd()||(a.sk=zg(a.hg),a.hg=null);return a.sk}
d.Sa=function(a){return it(a)?jt(this,a):Mr(this,a)};d.r=function(){return!1};d.pd=function(){return null===this.hg};function jt(a,b){for(;;)if(S(T(),a.Rf,b.Rf))if(a=ht(a),it(a))if(b=ht(b),it(b)){if(a===b)return!0}else return!1;else return ht(b).r();else return!1}d.ka=function(){return ht(this)};function xi(a,b,c){a.Rf=b;a.hg=c;return a}function it(a){return!!(a&&a.$classData&&a.$classData.o.Gj)}
d.$classData=v({Gj:0},!1,"scala.collection.immutable.Stream$Cons",{Gj:1,Xn:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,nh:1,he:1,Ua:1,cb:1,$a:1,rf:1,ch:1,dh:1,l:1,f:1});function kt(){}kt.prototype=new Gs;kt.prototype.constructor=kt;d=kt.prototype;d.B=function(){this.Sf()};d.b=function(){return this};d.r=function(){return!0};d.pd=function(){return!1};d.Sf=function(){throw(new W).h("head of empty stream");};
d.ka=function(){throw(new ln).h("tail of empty stream");};d.$classData=v({$n:0},!1,"scala.collection.immutable.Stream$Empty$",{$n:1,Xn:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,nh:1,he:1,Ua:1,cb:1,$a:1,rf:1,ch:1,dh:1,l:1,f:1});var lt=void 0;function Ai(){lt||(lt=(new kt).b());return lt}function No(){this.Qf=this.Mf=this.Ee=0;this.ji=!1;this.Dg=0;this.zi=this.wi=this.ti=this.qi=this.ni=this.ki=null}No.prototype=new Ur;
No.prototype.constructor=No;d=No.prototype;d.ra=function(){return this.ti};d.ma=function(){return this};d.B=function(){if(0===this.Oa(0))throw(new ln).h("empty.head");return this.Q(0)};d.Q=function(a){var b=a+this.Ee|0;if(0<=a&&b<this.Mf)a=b;else throw(new Zm).h(""+a);return vb(this,a,a^this.Qf)};d.ac=function(){return this.Dg};d.Oa=function(a){return this.n()-a|0};d.y=function(a){return this.Q(a|0)};d.oa=function(){return this};d.dd=function(a,b,c){this.Ee=a;this.Mf=b;this.Qf=c;this.ji=!1;return this};
d.Ze=function(a){this.zi=a};d.gb=function(){return cf()};d.Xa=function(){return this.ki};d.ib=function(){return this.wi};d.Ya=function(a){this.qi=a};
d.I=function(){var a=(new Oo).k(this.Ee,this.Mf);yb(a,this,this.Dg);if(this.ji){var b=this.Qf,c=-1+a.ac()|0;switch(c){case 5:a.Ze(ub(a.Sc()));a.Rc(ub(a.ib()));a.Fb(ub(a.ra()));a.Ya(ub(a.da()));a.xa(ub(a.R()));a.Sc().a[31&(b>>>25|0)]=a.ib();a.ib().a[31&(b>>>20|0)]=a.ra();a.ra().a[31&(b>>>15|0)]=a.da();a.da().a[31&(b>>>10|0)]=a.R();a.R().a[31&(b>>>5|0)]=a.Xa();break;case 4:a.Rc(ub(a.ib()));a.Fb(ub(a.ra()));a.Ya(ub(a.da()));a.xa(ub(a.R()));a.ib().a[31&(b>>>20|0)]=a.ra();a.ra().a[31&(b>>>15|0)]=a.da();
a.da().a[31&(b>>>10|0)]=a.R();a.R().a[31&(b>>>5|0)]=a.Xa();break;case 3:a.Fb(ub(a.ra()));a.Ya(ub(a.da()));a.xa(ub(a.R()));a.ra().a[31&(b>>>15|0)]=a.da();a.da().a[31&(b>>>10|0)]=a.R();a.R().a[31&(b>>>5|0)]=a.Xa();break;case 2:a.Ya(ub(a.da()));a.xa(ub(a.R()));a.da().a[31&(b>>>10|0)]=a.R();a.R().a[31&(b>>>5|0)]=a.Xa();break;case 1:a.xa(ub(a.R()));a.R().a[31&(b>>>5|0)]=a.Xa();break;case 0:break;default:throw(new C).V(c);}}1<a.Cg&&xb(a,this.Ee,this.Ee^this.Qf);return a};d.xa=function(a){this.ni=a};
d.n=function(){return this.Mf-this.Ee|0};d.Rc=function(a){this.wi=a};d.$c=function(){return this};d.fb=function(){return this.n()};d.R=function(){return this.ni};d.Sc=function(){return this.zi};d.x=function(){return ti(Yf(),this)};d.xd=function(a){this.Dg=a};d.da=function(){return this.qi};d.Ja=function(a){this.ki=a};d.Fb=function(a){this.ti=a};
d.$classData=v({go:0},!1,"scala.collection.immutable.Vector",{go:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,mh:1,he:1,Ua:1,cb:1,$a:1,wb:1,qa:1,Kj:1,l:1,f:1,na:1});function Hg(){this.Id=null}Hg.prototype=new Ur;Hg.prototype.constructor=Hg;d=Hg.prototype;d.ma=function(){return this};d.B=function(){return Gr(this)};d.Q=function(a){a=65535&(this.Id.charCodeAt(a)|0);return(new L).H(a)};d.Oa=function(a){return Ir(this,a)};
d.y=function(a){a=65535&(this.Id.charCodeAt(a|0)|0);return(new L).H(a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return this};d.gb=function(){return Il()};d.q=function(){return this.Id};d.X=function(a){Kr(this,a)};d.Eb=function(a){var b=this.Id;return b===a?0:b<a?-1:1};d.I=function(){return I(new J,this,this.Id.length|0)};d.$c=function(){return this};d.n=function(){return this.Id.length|0};d.fb=function(){return this.Id.length|0};
d.sb=function(a,b,c){Lr(this,a,b,c)};d.x=function(){return ti(Yf(),this)};d.h=function(a){this.Id=a;return this};d.W=function(){Ig||(Ig=(new Eg).b());return Ig.W()};d.$classData=v({ko:0},!1,"scala.collection.immutable.WrappedString",{ko:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,mh:1,he:1,Ua:1,cb:1,$a:1,wb:1,qa:1,Ij:1,Ha:1,qf:1,mb:1});function Fl(){this.je=this.Og=null}Fl.prototype=new Ls;Fl.prototype.constructor=Fl;d=Fl.prototype;
d.B=function(){return this.Og};d.Tb=function(){return"::"};d.Rb=function(){return 2};d.pc=function(){return this.je};d.r=function(){return!1};d.Sb=function(a){switch(a){case 0:return this.Og;case 1:return this.je;default:throw(new Zm).h(""+a);}};d.ka=function(){return this.je};function El(a,b,c){a.Og=b;a.je=c;return a}d.gc=function(){return $m(this)};
d.$classData=v({wn:0},!1,"scala.collection.immutable.$colon$colon",{wn:1,Fj:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,nh:1,he:1,Ua:1,cb:1,$a:1,rf:1,ch:1,hc:1,dh:1,l:1,f:1});function mt(){}mt.prototype=new Ls;mt.prototype.constructor=mt;d=mt.prototype;d.Tb=function(){return"Nil"};d.B=function(){this.Sf()};d.b=function(){return this};d.Rb=function(){return 0};d.r=function(){return!0};
d.pc=function(){throw(new ln).h("tail of empty list");};d.t=function(a){return a&&a.$classData&&a.$classData.o.Ga?a.r():!1};d.Sb=function(a){throw(new Zm).h(""+a);};d.Sf=function(){throw(new W).h("head of empty list");};d.ka=function(){return this.pc()};d.gc=function(){return $m(this)};
d.$classData=v({Nn:0},!1,"scala.collection.immutable.Nil$",{Nn:1,Fj:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,nh:1,he:1,Ua:1,cb:1,$a:1,rf:1,ch:1,hc:1,dh:1,l:1,f:1});var nt=void 0;function Td(){nt||(nt=(new mt).b());return nt}function ot(){}ot.prototype=new Yr;ot.prototype.constructor=ot;function pt(){}d=pt.prototype=ot.prototype;d.gb=function(){Un||(Un=(new Sn).b());return Un};d.oc=function(a,b){Mi(this,a,b)};d.Na=function(){};
d.Ia=function(a){return ug(this,a)};d.W=function(){return(new zk).b()};function qt(){}qt.prototype=new us;qt.prototype.constructor=qt;function rt(){}rt.prototype=qt.prototype;qt.prototype.Ia=function(a){return ug(this,a)};function st(){}st.prototype=new us;st.prototype.constructor=st;function tt(){}d=tt.prototype=st.prototype;d.ma=function(){return this};d.B=function(){return Gr(this)};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.r=function(){return Hr(this)};d.oa=function(){return this};
d.gb=function(){return Yo()};d.X=function(a){Kr(this,a)};d.I=function(){return I(new J,this,this.n())};d.tf=function(){return this};d.$c=function(){return this};d.fb=function(){return this.n()};d.sb=function(a,b,c){Lr(this,a,b,c)};d.W=function(){return(new ao).Qg(this.Tc())};d.Wa=function(){return"WrappedArray"};function zk(){this.yf=0;this.yb=null;this.gg=this.od=0;this.Kd=null;this.yh=0}zk.prototype=new pt;zk.prototype.constructor=zk;d=zk.prototype;d.ma=function(){return this};
d.b=function(){zk.prototype.ml.call(this,null);return this};d.y=function(a){var b=fh(this,a);if(null===b)throw(new W).h("key not found: "+a);return b.fa};d.oa=function(){return this};function ut(a,b){var c=gh(a,b.Nc(),b.Ac());null!==c&&(c.fa=b.Ac());return a}d.Aa=function(a){return ut(this,a)};d.X=function(a){for(var b=this.yb,c=eh(this),e=b.a[c];null!==e;){var f=e.Dd;a.y((new Ad).Vc(e.xe,e.fa));for(e=f;null===e&&0<c;)c=-1+c|0,e=b.a[c]}};d.ea=function(){return this.od};d.ya=function(){return this};
d.I=function(){return An(new zn,Rn(this),bg(function(){return function(a){return(new Ad).Vc(a.xe,a.fa)}}(this)))};d.ml=function(a){this.yf=750;kh();this.yb=r(A(zb),[1<<(-fa(15)|0)]);this.od=0;var b=this.yf;kh();kh();this.gg=jh(0,b,1<<(-fa(15)|0));this.Kd=null;this.yh=Lj(kd(),-1+this.yb.a.length|0);null!==a&&(this.yf=a.Op(),this.yb=a.Dq(),this.od=a.Cq(),this.gg=a.Eq(),this.yh=a.yq(),this.Kd=a.zq());return this};d.hb=function(a){return null!==fh(this,a)};d.Ba=function(a){return ut(this,a)};
d.$classData=v({Bo:0},!1,"scala.collection.mutable.HashMap",{Bo:1,rq:1,eq:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,hq:1,kn:1,gq:1,iq:1,La:1,T:1,Nb:1,vq:1,Yb:1,Zb:1,Vb:1,wq:1,eb:1,bb:1,ab:1,lh:1,Xb:1,Ub:1,Ib:1,sq:1,tq:1,na:1,l:1,f:1});function lo(){this.i=null}lo.prototype=new tt;lo.prototype.constructor=lo;d=lo.prototype;d.Q=function(a){return this.i.a[a]};d.y=function(a){return this.i.a[a|0]};d.ad=function(a,b){this.i.a[a]=!!b};
d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.ph)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.n=function(){return this.i.a.length};d.Tc=function(){return Gf()};d.lf=function(a){this.i=a;return this};
d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,b.a[e]?1231:1237),e=1+e|0;return a.lb(c,b.a.length)};d.$classData=v({ph:0},!1,"scala.collection.mutable.WrappedArray$ofBoolean",{ph:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function eo(){this.i=null}eo.prototype=new tt;eo.prototype.constructor=eo;d=eo.prototype;
d.Q=function(a){return this.i.a[a]};d.y=function(a){return this.i.a[a|0]};d.ad=function(a,b){this.i.a[a]=b|0};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.qh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.n=function(){return this.i.a.length};d.Tc=function(){return zf()};
d.x=function(){for(var a=Yf(),b=this.i,c=b.a.length,e=a.nc,f=0;4<=c;)var g=255&b.a[f],g=g|(255&b.a[1+f|0])<<8,g=g|(255&b.a[2+f|0])<<16,g=g|(255&b.a[3+f|0])<<24,e=a.ua(e,g),f=4+f|0,c=-4+c|0;g=0;3===c&&(g^=(255&b.a[2+f|0])<<16);2<=c&&(g^=(255&b.a[1+f|0])<<8);1<=c&&(g^=255&b.a[f],e=a.ze(e,g));return a.lb(e,b.a.length)};d.ef=function(a){this.i=a;return this};
d.$classData=v({qh:0},!1,"scala.collection.mutable.WrappedArray$ofByte",{qh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function go(){this.i=null}go.prototype=new tt;go.prototype.constructor=go;d=go.prototype;d.Q=function(a){return(new L).H(this.i.a[a])};d.y=function(a){return(new L).H(this.i.a[a|0])};
d.ad=function(a,b){this.i.a[a]=null===b?0:b.fa};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.rh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),(new L).H(b.a[e]),(new L).H(a.a[e]));b=e}else b=!1;else b=vn(this,a);return b};d.n=function(){return this.i.a.length};d.Ad=function(a){this.i=a;return this};d.Tc=function(){return Bf()};
d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,b.a[e]),e=1+e|0;return a.lb(c,b.a.length)};d.$classData=v({rh:0},!1,"scala.collection.mutable.WrappedArray$ofChar",{rh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function ko(){this.i=null}ko.prototype=new tt;ko.prototype.constructor=ko;d=ko.prototype;d.Q=function(a){return this.i.a[a]};
d.y=function(a){return this.i.a[a|0]};d.ad=function(a,b){this.i.a[a]=+b};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.sh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.ff=function(a){this.i=a;return this};d.n=function(){return this.i.a.length};d.Tc=function(){return Ff()};
d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,Rh(R(),b.a[e])),e=1+e|0;return a.lb(c,b.a.length)};d.$classData=v({sh:0},!1,"scala.collection.mutable.WrappedArray$ofDouble",{sh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function jo(){this.i=null}jo.prototype=new tt;jo.prototype.constructor=jo;d=jo.prototype;
d.Q=function(a){return this.i.a[a]};d.y=function(a){return this.i.a[a|0]};d.ad=function(a,b){this.i.a[a]=+b};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.th)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.gf=function(a){this.i=a;return this};d.n=function(){return this.i.a.length};d.Tc=function(){return Ef()};
d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)R(),c=a.ua(c,Rh(0,b.a[e])),e=1+e|0;return a.lb(c,b.a.length)};d.$classData=v({th:0},!1,"scala.collection.mutable.WrappedArray$ofFloat",{th:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function ho(){this.i=null}ho.prototype=new tt;ho.prototype.constructor=ho;d=ho.prototype;
d.Q=function(a){return this.Ne(a)};d.y=function(a){return this.Ne(a|0)};d.ad=function(a,b){this.i.a[a]=b|0};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.uh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.Ne=function(a){return this.i.a[a]};d.hf=function(a){this.i=a;return this};d.n=function(){return this.i.a.length};
d.Tc=function(){return Cf()};d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,b.a[e]),e=1+e|0;return a.lb(c,b.a.length)};d.$classData=v({uh:0},!1,"scala.collection.mutable.WrappedArray$ofInt",{uh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function io(){this.i=null}io.prototype=new tt;
io.prototype.constructor=io;d=io.prototype;d.Q=function(a){return this.i.a[a]};d.y=function(a){return this.i.a[a|0]};d.jf=function(a){this.i=a;return this};d.ad=function(a,b){b=Ua(b);this.i.a[a]=b};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.vh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.n=function(){return this.i.a.length};
d.Tc=function(){return Df()};d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,Yh(R(),b.a[e])),e=1+e|0;return a.lb(c,b.a.length)};d.$classData=v({vh:0},!1,"scala.collection.mutable.WrappedArray$ofLong",{vh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function no(){this.i=this.Ei=null;this.zg=!1}no.prototype=new tt;
no.prototype.constructor=no;d=no.prototype;d.Q=function(a){return this.i.a[a]};d.y=function(a){return this.Q(a|0)};d.ad=function(a,b){this.i.a[a]=b};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.wh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.Vd=function(a){this.i=a;return this};d.n=function(){return this.i.a.length};
d.Tc=function(){this.zg||this.zg||(this.Ei=vl(zl(),je(pa(this.i))),this.zg=!0);return this.Ei};d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<Jh(Nh(),b);)c=a.ua(c,Zf(R(),Oh(Nh(),b,e))),e=1+e|0;return a.lb(c,Jh(Nh(),b))};
d.$classData=v({wh:0},!1,"scala.collection.mutable.WrappedArray$ofRef",{wh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function fo(){this.i=null}fo.prototype=new tt;fo.prototype.constructor=fo;d=fo.prototype;d.Q=function(a){return this.i.a[a]};d.y=function(a){return this.i.a[a|0]};d.ad=function(a,b){this.i.a[a]=b|0};
d.kf=function(a){this.i=a;return this};d.t=function(a){var b;if(a&&a.$classData&&a.$classData.o.xh)if(te(),b=this.i,a=a.i,b===a)b=!0;else if(null!==b&&null!==a&&b.a.length===a.a.length){for(var c=Nk(Xk(),b),c=Fr(c),c=I(new J,c,c.n()),e=!0;e&&c.E();)e=c.F()|0,e=S(T(),b.a[e],a.a[e]);b=e}else b=!1;else b=vn(this,a);return b};d.n=function(){return this.i.a.length};d.Tc=function(){return Af()};d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,b.a[e]),e=1+e|0;return a.lb(c,b.a.length)};
d.$classData=v({xh:0},!1,"scala.collection.mutable.WrappedArray$ofShort",{xh:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function mo(){this.i=null}mo.prototype=new tt;mo.prototype.constructor=mo;d=mo.prototype;d.Q=function(a){this.i.a[a]};d.y=function(a){this.i.a[a|0]};d.ad=function(a,b){this.i.a[a]=b};
d.t=function(a){return a&&a.$classData&&a.$classData.o.jk?this.i.a.length===a.i.a.length:vn(this,a)};d.n=function(){return this.i.a.length};d.Tc=function(){return Hf()};d.mf=function(a){this.i=a;return this};d.x=function(){for(var a=Yf(),b=this.i,c=a.nc,e=0;e<b.a.length;)c=a.ua(c,0),e=1+e|0;return a.lb(c,b.a.length)};
d.$classData=v({jk:0},!1,"scala.collection.mutable.WrappedArray$ofUnit",{jk:1,nd:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,na:1,l:1,f:1});function yn(){this.$d=this.xb=null;this.Of=!1;this.gd=0}yn.prototype=new rt;yn.prototype.constructor=yn;d=yn.prototype;d.b=function(){this.xb=Td();this.Of=!1;this.gd=0;return this};d.B=function(){return this.xb.B()};
d.Q=function(a){if(0>a||a>=this.gd)throw(new Zm).h(""+a);return Nr(this.xb,a)};d.Oa=function(a){return 0>a?1:Or(this.xb,a)};d.Sa=function(a){return Mr(this.xb,a)};d.y=function(a){return this.Q(a|0)};d.r=function(){return 0===this.gd};d.oa=function(){return this};d.t=function(a){return a&&a.$classData&&a.$classData.o.ik?this.xb.t(a.xb):vn(this,a)};d.Qb=function(a,b,c){return ig(this.xb,a,b,c)};d.Aa=function(a){return Yn(this,a)};d.gb=function(){ur||(ur=(new tr).b());return ur};
d.X=function(a){for(var b=this.xb;!b.r();)a.y(b.B()),b=b.pc()};d.ea=function(){return this.gd};d.ya=function(){this.Of=!this.r();return this.xb};d.I=function(){var a=new Zn;a.Ve=this.r()?Td():this.xb;return a};d.oc=function(a,b){Mi(this,a,b)};d.n=function(){return this.gd};d.$c=function(){return this};d.za=function(){return this.xb.za()};d.Ab=function(a,b,c,e){return lg(this.xb,a,b,c,e)};
function Yn(a,b){if(a.Of&&!a.r()){var c=a.xb,e=a.$d.je;a.xb=Td();a.$d=null;a.Of=!1;for(a.gd=0;c!==e;)Yn(a,c.B()),c=c.pc()}a.r()?(a.$d=El(new Fl,b,Td()),a.xb=a.$d):(c=a.$d,a.$d=El(new Fl,b,Td()),c.je=a.$d);a.gd=1+a.gd|0;return a}d.Ba=function(a){return Yn(this,a)};d.Na=function(){};d.Ia=function(a){a:b:for(;;){var b=a;if(null!==b&&b===this){a=this.gd;b=this.W();if(!(0>=a)){b.oc(a,this);for(var c=0,e=this.I();c<a&&e.E();)b.Ba(e.F()),c=1+c|0}a=b.ya();continue b}a=ug(this,a);break a}return a};d.Wa=function(){return"ListBuffer"};
d.$classData=v({ik:0},!1,"scala.collection.mutable.ListBuffer",{ik:1,Lj:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,fk:1,gk:1,bb:1,ab:1,lh:1,vj:1,Nb:1,Pb:1,eb:1,nq:1,lq:1,oq:1,l:1,f:1});function jg(){this.zb=null}jg.prototype=new us;jg.prototype.constructor=jg;d=jg.prototype;d.ma=function(){return this};d.b=function(){jg.prototype.fl.call(this,16,"");return this};d.B=function(){return Gr(this)};
d.Q=function(a){a=65535&(this.zb.Qa.charCodeAt(a)|0);return(new L).H(a)};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.y=function(a){a=65535&(this.zb.Qa.charCodeAt(a|0)|0);return(new L).H(a)};d.r=function(){return Hr(this)};d.oa=function(){return this};d.fg=function(a,b){return this.zb.Qa.substring(a,b)};d.Aa=function(a){tm(this.zb,null===a?0:a.fa);return this};d.gb=function(){return Yo()};d.q=function(){return this.zb.Qa};d.X=function(a){Kr(this,a)};
d.Eb=function(a){var b=this.zb.Qa;return b===a?0:b<a?-1:1};d.ya=function(){return this.zb.Qa};function ng(a,b){qm(a.zb,b);return a}d.I=function(){return I(new J,this,this.zb.Qa.length|0)};d.tf=function(){return this};d.oc=function(a,b){Mi(this,a,b)};d.fl=function(a,b){jg.prototype.jl.call(this,qm((new Rj).ub((b.length|0)+a|0),b));return this};d.n=function(){return this.zb.Qa.length|0};d.$c=function(){return this};d.fb=function(){return this.zb.Qa.length|0};d.jl=function(a){this.zb=a;return this};
function og(a,b){qm(a.zb,sh(Ia(),b));return a}d.Ba=function(a){tm(this.zb,null===a?0:a.fa);return this};d.sb=function(a,b,c){Lr(this,a,b,c)};d.Na=function(){};d.x=function(){return ti(Yf(),this)};d.W=function(){return Xm(new Wm,(new jg).b())};d.Ia=function(a){return ug(this,a)};
d.$classData=v({Jo:0},!1,"scala.collection.mutable.StringBuilder",{Jo:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,Vf:1,vc:1,wb:1,qa:1,Pa:1,Ij:1,Ha:1,qf:1,mb:1,Pb:1,eb:1,bb:1,ab:1,l:1,f:1});function G(){this.i=null}G.prototype=new rt;G.prototype.constructor=G;d=G.prototype;d.ma=function(){return this};d.B=function(){return Gr(this)};d.b=function(){G.prototype.p.call(this,[]);return this};
d.Q=function(a){return this.i[a]};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.y=function(a){return this.i[a|0]};d.r=function(){return Hr(this)};d.oa=function(){return this};d.Aa=function(a){this.i.push(a);return this};d.gb=function(){return Dd()};d.X=function(a){Kr(this,a)};d.ya=function(){return this};d.I=function(){return I(new J,this,this.i.length|0)};d.tf=function(){return this};d.oc=function(a,b){Mi(this,a,b)};d.n=function(){return this.i.length|0};d.$c=function(){return this};
d.fb=function(){return this.i.length|0};d.Ba=function(a){this.i.push(a);return this};d.Na=function(){};d.sb=function(a,b,c){Lr(this,a,b,c)};d.x=function(){return ti(Yf(),this)};d.p=function(a){this.i=a;return this};d.Wa=function(){return"WrappedArray"};
d.$classData=v({Mo:0},!1,"scala.scalajs.js.WrappedArray",{Mo:1,Lj:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,fk:1,gk:1,bb:1,ab:1,lh:1,vj:1,Nb:1,vc:1,wb:1,qa:1,Pa:1,db:1,Va:1,Ha:1,eb:1});function Tn(){this.Pi=0;this.i=null;this.qb=0}Tn.prototype=new rt;Tn.prototype.constructor=Tn;d=Tn.prototype;d.ma=function(){return this};
function vt(a,b){Js(a,1+a.qb|0);a.i.a[a.qb]=b;a.qb=1+a.qb|0;return a}d.B=function(){return Gr(this)};d.b=function(){Tn.prototype.ub.call(this,16);return this};d.Q=function(a){return Is(this,a)};d.Oa=function(a){return Ir(this,a)};d.Sa=function(a){return Jr(this,a)};d.y=function(a){return Is(this,a|0)};d.r=function(){return Hr(this)};d.oa=function(){return this};d.Aa=function(a){return vt(this,a)};d.gb=function(){sr||(sr=(new rr).b());return sr};
d.X=function(a){for(var b=0,c=this.qb;b<c;)a.y(this.i.a[b]),b=1+b|0};d.ya=function(){return this};d.I=function(){return I(new J,this,this.qb)};d.tf=function(){return this};d.oc=function(a,b){Mi(this,a,b)};d.ub=function(a){a=this.Pi=a;this.i=r(A(z),[1<a?a:1]);this.qb=0;return this};d.n=function(){return this.qb};d.$c=function(){return this};d.fb=function(){return this.qb};d.Ba=function(a){return vt(this,a)};
d.sb=function(a,b,c){var e=Jh(Nh(),a)-b|0;c=c<e?c:e;e=this.qb;c=c<e?c:e;0<c&&Z(M(),this.i,0,a,b,c)};d.Na=function(a){a>this.qb&&1<=a&&(a=r(A(z),[a]),Sa(this.i,0,a,0,this.qb),this.i=a)};d.x=function(){return ti(Yf(),this)};d.Ia=function(a){if(a&&a.$classData&&a.$classData.o.qa){var b=a.n();Js(this,this.qb+b|0);a.sb(this.i,this.qb,b);this.qb=this.qb+b|0;a=this}else a=ug(this,a);return a};d.Wa=function(){return"ArrayBuffer"};
d.$classData=v({mo:0},!1,"scala.collection.mutable.ArrayBuffer",{mo:1,Lj:1,kc:1,Ta:1,ga:1,ha:1,c:1,ba:1,N:1,P:1,O:1,D:1,C:1,K:1,M:1,$:1,ca:1,aa:1,Z:1,J:1,L:1,u:1,Ma:1,La:1,T:1,Ga:1,ia:1,ja:1,lc:1,Yb:1,Zb:1,Vb:1,mc:1,Xb:1,Ub:1,Ib:1,fk:1,gk:1,bb:1,ab:1,lh:1,vj:1,Nb:1,Va:1,Pa:1,qa:1,Ha:1,eb:1,xq:1,vc:1,wb:1,na:1,l:1,f:1});var ed=null;dd();ba.Calc=dd();Object.defineProperty(ba,"myPrice",{get:function(){return ed},configurable:!0});ba.praxkit=ba.praxkit||{};var wt=ba.praxkit;Qd||(Qd=(new Od).b());
wt.HelloWorld1=Qd;
}).call(this);
//# sourceMappingURL=calc-opt.js.map

$(document).ready(function() {

    //Newsletter deaktiviert temporär
    /*
    $('#nl-form').submit(function() {

        var buttonCopy = $('#nl-form button').html(),
            errorMessage = $('#nl-form button').data('error-message'),
            sendingMessage = $('#nl-form button').data('sending-message'),
            okMessage = $('#nl-form button').data('ok-message'),
            hasError = false;

        $('#nl-form .error-message').remove();

        $('.nl-requiredField').each(function() {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parent().append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parent().append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#nl-form button').html('<i class="fa fa-times"></i>' + errorMessage);
            setTimeout(function() {
                $('#nl-form button').html(buttonCopy);
            }, 2000);
        } else {
            $('#nl-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);

            var formInput = $(this).serialize();

            $.post($(this).attr('action'), formInput, function(data) {

                console.log(data);

                $('#nl-form button').html('<i class="fa fa-check"></i>' + okMessage);

                $('#nl-form')[0].reset();

                setTimeout(function() {
                    $('#nl-form button').html(buttonCopy);
                }, 2000);

            }, "json");
        }

        return false;
    });

    */






    // Contact
    $('#contact-form').submit(function() {

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form .error-message').remove();

        $('.contact-requiredField').each(function() {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parent().append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parent().append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form button').html('<i class="fa fa-times"></i>' + errorMessage);
            setTimeout(function() {
                $('#contact-form button').html(buttonCopy);
            }, 2000);
        } else {
            $('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);

            var formInput = $(this).serialize();

            $.post($(this).attr('action'), formInput, function(data) {

                console.log(data);

                $('#contact-form button').html('<i class="fa fa-check"></i>' + okMessage);

                $('#contact-form')[0].reset();

                setTimeout(function() {
                    $('#contact-form button').html(buttonCopy);
                }, 2000);

            }, "json");
        }

        return false;
    });
});