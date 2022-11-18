/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn_type_submit",inputErrorClass:"popup__input_error",errorClass:"popup__error-message_visible"},e={popupClass:"popup",openedClass:"popup_opened",closedClass:"popup_closed",btnCloseClass:"popup__btn_type_close"},n=function(t){return{common:e,popupSelector:t,inputSelector:".popup__input",btsSubmitSeletor:".popup__btn_type_submit"}},r=document.forms.editProfile,o=document.forms.newAvatar,i=document.forms.addCard,a=document.querySelector(".profile__btn_type_edit"),s=document.querySelector(".profile__btn_type_add"),c=document.querySelector(".profile__avatar-edit");function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var e,n;return e=t,n=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: code ".concat(t.status))}},{key:"getUser",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._checkResponse)}},{key:"editUser",value:function(t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then(this._checkResponse)}},{key:"addCard",value:function(t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then(this._checkResponse)}},{key:"deleteCard",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"setLiked",value:function(t){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"removeLiked",value:function(t){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"setNewAvatar",value:function(t){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then(this._checkResponse)}}],n&&u(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var h=function(){function t(e){var n=e.nameSelector,r=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameElement=document.querySelector(n),this._aboutElement=document.querySelector(r),this._avatarElement=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}},{key:"setUserInfo",value:function(t){this._nameElement.textContent=t.name,this._nameElement.title=t.name,this._aboutElement.textContent=t.about,this._aboutElement.title=t.about}},{key:"setUserAvatar",value:function(t){this._avatarElement.src=t.avatar}},{key:"renderProfile",value:function(t){this.setUserInfo(t),this.setUserAvatar(t)}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d=function(){function t(e,n,r,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selector=e,this._link=n.link,this._name=n.name,this._likes=n.likes,this._cardID=n._id,this._ownerCardID=n.owner._id,this._userID=r,this._api=o,this._handleCardClick=i}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._selector).content.querySelector(".card").cloneNode(!0)}},{key:"createCard",value:function(){var t=this;return this._cardElement=this._getTemplate(),this._btnDeleteElement=this._cardElement.querySelector(".card__btn-delete"),this._btnLikeElement=this._cardElement.querySelector(".card__btn-like"),this._countLikesElement=this._cardElement.querySelector(".card__count-likes"),this._imageElement=this._cardElement.querySelector(".card__image"),this._titleElement=this._cardElement.querySelector(".card__title"),this._imageElement.src=this._link,this._imageElement.alt=this._name,this._titleElement.textContent=this._name,this._titleElement.title=this._name,this._userID===this._ownerCardID&&this._btnDeleteElement.classList.add("card__btn-delete_active"),this._likes.some((function(e){return e._id===t._userID}))?this._toggleLike():this._countLikesElement.textContent=this._likes.length,this._setEventListeners(),this._cardElement}},{key:"_toggleLike",value:function(){this._btnLikeElement.classList.toggle("card__btn-like_actived"),this._btnLikeElement.title=this._btnLikeElement.classList.contains("card__btn-like_actived")?"Убрать лайк":"Поставить лайк",this._countLikesElement.textContent=this._likes.length}},{key:"_setLiked",value:function(){var t=this;this._api.setLiked(this._cardID).then((function(e){t._likes=e.likes,t._toggleLike()})).catch((function(t){console.log(t)}))}},{key:"_removeLiked",value:function(){var t=this;this._api.removeLiked(this._cardID).then((function(e){t._likes=e.likes,t._toggleLike()})).catch((function(t){console.log(t)}))}},{key:"_handleBtnLike",value:function(){this._btnLikeElement.classList.contains("card__btn-like_actived")?this._removeLiked():this._setLiked()}},{key:"_deleteCard",value:function(){var t=this;this._api.deleteCard(this._cardID).then((function(){return t._cardElement.remove()})).catch((function(t){console.log(t)}))}},{key:"_setEventListeners",value:function(){var t=this;this._imageElement.addEventListener("click",(function(){return t._handleCardClick(t._link,t._name)})),this._btnDeleteElement.addEventListener("click",(function(){return t._deleteCard()})),this._btnLikeElement.addEventListener("click",(function(){return t._handleBtnLike()}))}}])&&p(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var _=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._containerElement=document.querySelector(n),this._renderer=r}var e,n;return e=t,(n=[{key:"addItem",value:function(t){var e=this._renderer(t);this._containerElement.prepend(e)}},{key:"renderItems",value:function(t){var e=this;t.reverse().forEach((function(t){return e.addItem(t)}))}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var v=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._settings=e,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector)}var e,n;return e=t,(n=[{key:"_showInputError",value:function(t){t.classList.add(this._settings.inputErrorClass),this._errorElement=this._formElement.querySelector(".".concat(t.id,"-error")),this._errorElement.textContent=t.validationMessage,this._errorElement.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(t){t.classList.remove(this._settings.inputErrorClass),this._errorElement=this._formElement.querySelector(".".concat(t.id,"-error")),this._errorElement.textContent="",this._errorElement.classList.remove(this._settings.errorClass)}},{key:"hideAllInputError",value:function(){var t=this;this._inputList.forEach((function(e){return t._hideInputError(e)}))}},{key:"_isValid",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._buttonElement.disabled=!0:this._buttonElement.disabled=!1}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._isValid(e),t._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var g=function(){function t(e,n){var r=e.popupClass,o=e.openedClass,i=e.closedClass,a=e.btnCloseClass;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(n),this._commonClass=r,this._openedClass=o,this._closedClass=i,this._btnCloseClass=a,this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.remove(this._closedClass),this._popup.classList.add(this._openedClass),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(this._openedClass),this._popup.classList.add(this._closedClass),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){(e.target.classList.contains(t._commonClass)||e.target.classList.contains(t._btnCloseClass))&&t.close()}))}}])&&b(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=L(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},k.apply(this,arguments)}function L(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function C(t,e){if(e&&("object"===E(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(r);if(o){var n=O(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return C(this,t)});function a(t){var e,n=t.common,r=t.popupSelector,o=t.imageSelector,s=t.captionSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,n,r))._fullImage=document.querySelector(o),e._captionFullImage=e._popup.querySelector(s),e}return e=a,(n=[{key:"open",value:function(t,e){this._fullImage.src=t,this._fullImage.alt=e,this._captionFullImage.textContent=e,k(O(a.prototype),"open",this).call(this)}}])&&w(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(g);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=T(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},I.apply(this,arguments)}function T(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=A(t)););return t}function R(t,e){return R=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},R(t,e)}function U(t,e){if(e&&("object"===x(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function A(t){return A=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},A(t)}var q=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&R(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=A(r);if(o){var n=A(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return U(this,t)});function a(t,e,n){var r,o=t.common,s=t.popupSelector,c=t.inputSelector,u=t.btsSubmitSeletor;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,o,s))._popupForm=e,r._inputsList=Array.from(r._popupForm.querySelectorAll(c)),r._btnSubmitElement=r._popupForm.querySelector(u),r._handleSubmitForm=n,r}return e=a,(n=[{key:"_getInputValues",value:function(){var t=this;return this._inputValues={},this._inputsList.forEach((function(e){t._inputValues[e.name]=e.value})),this._inputValues}},{key:"_setInputValues",value:function(t){this._inputsList.forEach((function(e){e.value=t[e.name]}))}},{key:"setEventListeners",value:function(){var t=this;I(A(a.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmitForm(t._getInputValues())}))}},{key:"open",value:function(t){t?(this._setInputValues(t),this._btnSubmitElement.disabled=!1):(this._popupForm.reset(),this._btnSubmitElement.disabled=!0),I(A(a.prototype),"open",this).call(this)}},{key:"setTextButton",value:function(t){this._btnSubmitElement.textContent=t}}])&&P(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(g);function D(t){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(t)}function B(){B=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function c(t,e,n,r){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new k(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var s=g(a,n);if(s){if(s===l)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=u(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(t,n,a),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var l={};function f(){}function h(){}function p(){}var d={};s(d,o,(function(){return this}));var y=Object.getPrototypeOf,_=y&&y(y(L([])));_&&_!==e&&n.call(_,o)&&(d=_);var m=p.prototype=f.prototype=Object.create(d);function v(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function r(o,i,a,s){var c=u(t[o],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==D(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function g(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,g(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:S}}function S(){return{value:void 0,done:!0}}return h.prototype=p,s(m,"constructor",p),s(p,"constructor",h),h.displayName=s(p,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,s(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},v(b.prototype),s(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new b(c(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},v(m),s(m,a,"Generator"),s(m,o,(function(){return this})),s(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=L,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),w(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;w(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:L(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}function F(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return N(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function V(t,e,n,r,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,o)}function G(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){V(i,r,o,a,s,"next",t)}function s(t){V(i,r,o,a,s,"throw",t)}a(void 0)}))}}var J,H,M,Y=new l({baseUrl:"https://nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"26e206db-fdaf-4832-831b-12af613bc48e","Content-Type":"application/json"}}),z=new h({nameSelector:".profile__name",aboutSelector:".profile__about",avatarSelector:".profile__avatar"}),$=new _({renderer:function(t,e){return nt(t)}},".cards__list"),K=new v(t,r),Q=new v(t,i),W=new v(t,o),X=new j({common:e,popupSelector:".popup_full-image",imageSelector:".popup__image",captionSelector:".popup__image-caption"}),Z=new q(n(".popup_edit-profile"),r,(function(t){var e=this;this.setTextButton("Сохранение..."),Y.editUser(t).then((function(t){z.setUserInfo(t),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.setTextButton("Сохранить")}))})),tt=new q(n(".popup_add-card"),i,(function(t){var e=this;this.setTextButton("Сохранение..."),Y.addCard(t).then((function(t){$.addItem(t),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.setTextButton("Создать")}))})),et=new q(n(".popup_new-avatar"),o,(function(t){var e=this;this.setTextButton("Сохранение..."),Y.setNewAvatar(t).then((function(t){z.setUserAvatar(t),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.setTextButton("Сохранить")}))}));function nt(t){return new d("#card-template",t,H,Y,rt).createCard()}function rt(t,e){X.open(t,e)}function ot(){a.addEventListener("click",(function(){K.hideAllInputError(),Z.open(z.getUserInfo())})),s.addEventListener("click",(function(){Q.hideAllInputError(),tt.open()})),c.addEventListener("click",(function(){W.hideAllInputError(),et.open()})),X.setEventListeners(),et.setEventListeners(),tt.setEventListeners(),Z.setEventListeners()}function it(){K.enableValidation(),Q.enableValidation(),W.enableValidation()}function at(){return(at=G(B().mark((function t(){return B().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([Y.getUser(),Y.getInitialCards()]).then((function(t){var e=F(t,2),n=e[0],r=e[1];H=(J=n)._id,M=r})).catch((function(t){console.log(t)}));case 2:z.renderProfile(J),$.renderItems(M,H),ot(),it();case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){at.apply(this,arguments)}()})();