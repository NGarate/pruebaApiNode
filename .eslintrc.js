module.exports = {
	"env": {
		"browser": false,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:prettier/recommended",	
		"prettier",
		"plugin:node/recommended"
	],
	"plugins": [
		"prettier",
		"promise",
		"html",
		"jsdoc"
	],
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"globals": {
		"version": false
	},
	"rules": {
		"accessor-pairs": [ "error", { "setWithoutGet": true, "getWithoutSet": true }],
		"array-callback-return": [ "error" ],
		"camelcase": [ "warn" ],
		"complexity": ["error", { "max": 5 }],
		"curly": ["warn", "all"],
		"dot-notation": [ "error" ],	
		"eqeqeq": [ "warn" ],
		"func-names": [ "warn", "never" ],
		"global-require": [ "error" ],
		"guard-for-in": [ "error" ],
		"id-length": [ "error", { "min": 3, "exceptions": ["a", "b", "DB", "db", "el", "fs", "i", "id", "IP", "ip", "j", "k", "ko", "OK", "ok", "OS", "os", "pi", "sn", "to"] } ],
		"jsdoc/check-examples": [ "warn" ],
        "jsdoc/check-param-names": [ "warn" ],
        "jsdoc/check-tag-names": [ "warn" ],
        "jsdoc/check-types": [ "warn" ],
        "jsdoc/newline-after-description": [ "warn" ],
        "jsdoc/no-undefined-types": [ "warn" ],
        "jsdoc/require-description": [ "warn" ],
        "jsdoc/require-description-complete-sentence": [ "warn" ],
        "jsdoc/require-example": [ "off" ],
        "jsdoc/require-hyphen-before-param-description": [ "warn" ],
        "jsdoc/require-param": [ "warn" ],
        "jsdoc/require-param-description": [ "warn" ],
        "jsdoc/require-param-name": [ "warn" ],
        "jsdoc/require-param-type": [ "warn" ],
        "jsdoc/require-returns": [ "warn" ],
        "jsdoc/require-returns-check": [ "warn" ],
        "jsdoc/require-returns-description": [ "off" ],
        "jsdoc/require-returns-type": [ "warn" ],
        "jsdoc/valid-types": [ "warn" ],
		"linebreak-style": [ "warn", "windows" ],
		"max-statements-per-line": [ "error", { "max": 1 } ],
		"node/no-unpublished-require": [ "off" ],
		"no-await-in-loop": [ "warn" ],
		"no-buffer-constructor": [ "error" ],
		"no-else-return": [ "error" ],
		"no-extend-native": [ "error" ],
		"no-implicit-coercion": [ "error" ],
		"no-implied-eval": [ "error" ],
		"no-invalid-this": [ "error" ],
		"no-iterator": [ "error" ],
		"no-empty-function": [ "error" ],
		"no-eval": [ "error" ],
		"no-global-assign": [ "error" ],
		"no-label-var": [ "error" ],
		"no-lone-blocks": [ "error" ],
		"no-loop-func": [ "warn" ],
		"no-new": [ "error" ],
		"no-new-func": [ "error" ],
		"no-new-require": [ "error" ],
		"no-new-wrappers": [ "error" ],
		"no-magic-numbers": [ "error" ],
		"no-mixed-requires": [ "error" ],
		"no-multi-spaces": [ "error" ],
		"no-multi-str": [ "error" ],
		"no-obj-calls": [ "error" ],
		"no-param-reassign": [ "error" ],
		"no-path-concat": [ "error" ],
		"no-process-env": [ "error" ],
		"no-process-exit": [ "error" ],
		"no-return-await": [ "error" ],
		"no-shadow": [ "error" ],
		"no-shadow-restricted-names": [ "error" ],
		"no-sequences": [ "error" ],
		"no-self-compare": [ "error" ],
		"no-template-curly-in-string": [ "error" ],
		"no-throw-literal": [ "error" ],
		"no-undef-init": [ "error" ],
		"no-unmodified-loop-condition": [ "warn" ],
		"no-unused-expressions": [ "error" ],
		"no-use-before-define": [ "error", "nofunc" ],
		"no-useless-call": [ "error" ],
		"no-useless-concat": [ "error" ],
		"no-useless-rename": [ "error" ],
		"no-useless-return": [ "error" ],
		"no-var": [ "error" ],
		"no-void": [ "error" ],
		"no-warning-comments": [ "error" ],
		"no-with": [ "error" ],
		"one-var": [ "error", "never" ],
		"operator-assignment": [ "error", "always" ],
		"padding-line-between-statements": [
			"warn",
			{ "blankLine": "always", "prev": "*", "next": "block-like" },
			{ "blankLine": "always", "prev": "*", "next": "class" },
			{ "blankLine": "always", "prev": "*", "next": "do" },
			{ "blankLine": "always", "prev": "*", "next": "for" },
			{ "blankLine": "always", "prev": "*", "next": "function" },
			{ "blankLine": "always", "prev": "*", "next": "if" },
			{ "blankLine": "always", "prev": "*", "next": "switch" },
			{ "blankLine": "always", "prev": "*", "next": "try" },
			{ "blankLine": "always", "prev": "*", "next": "while" } 
		],
		"prefer-const": ["error"],
		"prefer-object-spread": ["warn"],
		"prettier/prettier": ["warn"],
		"promise/catch-or-return": ["error"],
		"promise/no-return-wrap": ["error"],
		"promise/param-names": ["error"],
		"promise/no-nesting": ["error"],
		"promise/no-promise-in-callback": ["error"],
		"promise/no-callback-in-promise": ["error"],
		"promise/no-new-statics": ["error"],
		"promise/no-return-in-finally": ["error"],
		"promise/valid-params": ["error"],
		"promise/prefer-await-to-then": ["warn"],
		"promise/prefer-await-to-callbacks": ["warn"],
		"radix": [ "error", "as-needed" ],
		"require-atomic-updates": [ "error" ],
		"require-await": [ "error" ],
		"valid-jsdoc": [ "warn", { "requireReturn": true } ],
		"yoda": [ "error", "never", { "exceptRange": true } ]
	}  
};