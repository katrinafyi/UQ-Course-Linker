// ==UserScript==
// @name        UQ Course Linker
// @author      Kenton Lam
// @description Makes course codes links.
// @match       https://my.uq.edu.au/programs-courses/course.html?course_code=*
// @version     0.1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/uq_course_linker.user.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/uq_course_linker.user.tsx":
/*!***************************************!*\
  !*** ./src/uq_course_linker.user.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// ==UserScript==\r\n// @name        UQ Course Linker\r\n// @author      Kenton Lam\r\n// @description Makes course codes links.\r\n// @match       https://my.uq.edu.au/programs-courses/course.html?course_code=*\r\n// @version     0.1.0\r\n// @grant       GM_getValue\r\n// @grant       GM_setValue\r\n// @grant       GM_deleteValue\r\n// ==/UserScript==\r\nfunction createCourseLink(courseCode) {\r\n    var a = document.createElement('a');\r\n    a.href = \"/programs-courses/course.html?course_code=\" + courseCode;\r\n    a.textContent = courseCode;\r\n    return a;\r\n}\r\nvar courseCodeRegex = /[A-Z]{4}[0-9]{4}[A-Z]?/g;\r\nfunction replaceCourseCodes(element) {\r\n    var newElements = [];\r\n    var prevIndex = 0;\r\n    var text = element.textContent;\r\n    var match = courseCodeRegex.exec(text);\r\n    while (match != null) {\r\n        newElements.push(document.createTextNode(text.substr(prevIndex, match.index - prevIndex)));\r\n        newElements.push(createCourseLink(match[0]));\r\n        prevIndex = match.index + match[0].length;\r\n        match = courseCodeRegex.exec(text);\r\n    }\r\n    if (prevIndex < text.length) {\r\n        newElements.push(document.createTextNode(text.substr(prevIndex, text.length - prevIndex)));\r\n    }\r\n    while (element.hasChildNodes()) {\r\n        element.removeChild(element.lastChild);\r\n    }\r\n    for (var _i = 0, newElements_1 = newElements; _i < newElements_1.length; _i++) {\r\n        var newChild = newElements_1[_i];\r\n        element.appendChild(newChild);\r\n    }\r\n    return element;\r\n}\r\nfunction main() {\r\n    var elementIds = [\r\n        'course-prerequisite',\r\n        'course-companion',\r\n        'course-incompatible'\r\n    ];\r\n    for (var _i = 0, elementIds_1 = elementIds; _i < elementIds_1.length; _i++) {\r\n        var id = elementIds_1[_i];\r\n        var elem = document.getElementById(id);\r\n        if (elem != null) {\r\n            replaceCourseCodes(elem);\r\n        }\r\n    }\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack:///./src/uq_course_linker.user.tsx?");

/***/ })

/******/ });