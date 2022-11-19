(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn_type_submit",inputErrorClass:"popup__input_error",errorClass:"popup__error-message_visible"},t={popupClass:"popup",openedClass:"popup_opened",closedClass:"popup_closed",btnCloseClass:"popup__btn_type_close"},n=function(e){return{common:t,popupSelector:e,inputSelector:".popup__input",btsSubmitSeletor:".popup__btn_type_submit"}},r=document.forms.editProfile,o=document.forms.newAvatar,i=document.forms.addCard,s=document.querySelector(".profile__btn_type_edit"),a=document.querySelector(".profile__btn_type_add"),l=document.querySelector(".profile__avatar-edit");function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=n,this._headers=r}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: code ".concat(e.status))}},{key:"getUser",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._checkResponse)}},{key:"editUser",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"addCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"setLiked",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"removeLiked",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"setNewAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){var n=t.nameSelector,r=t.aboutSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._aboutElement=document.querySelector(r),this._avatarElement=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._nameElement.title=e.name,this._aboutElement.textContent=e.about,this._aboutElement.title=e.about}},{key:"setUserAvatar",value:function(e){this._avatarElement.src=e.avatar}},{key:"renderProfile",value:function(e){this.setUserInfo(e),this.setUserAvatar(e)}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(t,n,r,o){var i=o.handleCardClick,s=o.handleLike,a=o.handleDelete;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selector=t,this._link=n.link,this._name=n.name,this._likes=n.likes,this._cardID=n._id,this._ownerCardID=n.owner._id,this._userID=r,this._handleCardClick=i,this._handleLike=s,this._handleDelete=a}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._selector).content.querySelector(".card").cloneNode(!0)}},{key:"createCard",value:function(){var e=this;return this._cardElement=this._getTemplate(),this._btnDeleteElement=this._cardElement.querySelector(".card__btn-delete"),this._btnLikeElement=this._cardElement.querySelector(".card__btn-like"),this._countLikesElement=this._cardElement.querySelector(".card__count-likes"),this._imageElement=this._cardElement.querySelector(".card__image"),this._titleElement=this._cardElement.querySelector(".card__title"),this._imageElement.src=this._link,this._imageElement.alt=this._name,this._titleElement.textContent=this._name,this._titleElement.title=this._name,this._userID===this._ownerCardID&&this._btnDeleteElement.classList.add("card__btn-delete_active"),this._likes.some((function(t){return t._id===e._userID}))?this._toggleLike():this._countLikesElement.textContent=this._likes.length,this._setEventListeners(),this._cardElement}},{key:"getCardID",value:function(){return this._cardID}},{key:"getImageData",value:function(){return{link:this._link,name:this._name}}},{key:"_toggleLike",value:function(){this._btnLikeElement.classList.toggle("card__btn-like_actived"),this._btnLikeElement.title=this._btnLikeElement.classList.contains("card__btn-like_actived")?"Убрать лайк":"Поставить лайк",this._countLikesElement.textContent=this._likes.length}},{key:"updateLikes",value:function(e){this._likes=e,this._toggleLike()}},{key:"isLiked",value:function(){return this._btnLikeElement.classList.contains("card__btn-like_actived")}},{key:"deleteCard",value:function(){this._cardElement.remove(),this._cardElement=null}},{key:"_setEventListeners",value:function(){var e=this;this._imageElement.addEventListener("click",(function(){return e._handleCardClick()})),this._btnDeleteElement.addEventListener("click",(function(){return e._handleDelete()})),this._btnLikeElement.addEventListener("click",(function(){return e._handleLike()}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._containerElement=document.querySelector(n),this._renderer=r}var t,n;return t=e,(n=[{key:"addItem",value:function(e){var t=this._renderer(e);this._containerElement.prepend(t)}},{key:"renderItems",value:function(e){var t=this;e.reverse().forEach((function(e){return t.addItem(e)}))}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e){e.classList.add(this._settings.inputErrorClass),this._errorElement=this._formElement.querySelector(".".concat(e.id,"-error")),this._errorElement.textContent=e.validationMessage,this._errorElement.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){e.classList.remove(this._settings.inputErrorClass),this._errorElement=this._formElement.querySelector(".".concat(e.id,"-error")),this._errorElement.textContent="",this._errorElement.classList.remove(this._settings.errorClass)}},{key:"hideAllInputError",value:function(){var e=this;this._inputList.forEach((function(t){return e._hideInputError(t)})),this._buttonElement.disabled=!0}},{key:"_isValid",value:function(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._buttonElement.disabled=!0:this._buttonElement.disabled=!1}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}},{key:"checkInitialInputValues",value:function(){var e=this;this._inputList.forEach((function(t){e._isValid(t),e._toggleButtonState()}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var E=function(){function e(t,n){var r=t.popupClass,o=t.openedClass,i=t.closedClass,s=t.btnCloseClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(n),this._commonClass=r,this._openedClass=o,this._closedClass=i,this._btnCloseClass=s,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.remove(this._closedClass),this._popup.classList.add(this._openedClass),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(this._openedClass),this._popup.classList.add(this._closedClass),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains(e._commonClass)||t.target.classList.contains(e._btnCloseClass))&&e.close()}))}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},C.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}function S(e,t){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},S(e,t)}function L(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&S(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function s(e){var t,n=e.common,r=e.popupSelector,o=e.imageSelector,a=e.captionSelector;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=i.call(this,n,r))._fullImage=document.querySelector(o),t._captionFullImage=t._popup.querySelector(a),t}return t=s,(n=[{key:"open",value:function(e,t){this._fullImage.src=e,this._fullImage.alt=t,this._captionFullImage.textContent=t,C(O(s.prototype),"open",this).call(this)}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(E);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(){return T="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=D(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},T.apply(this,arguments)}function D(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function R(e,t){return R=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},R(e,t)}function U(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&R(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function s(e,t,n,r){var o,a=e.common,l=e.popupSelector,c=e.inputSelector,u=e.btsSubmitSeletor;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(o=i.call(this,a,l))._popupForm=t,o._inputsList=Array.from(o._popupForm.querySelectorAll(c)),o._btnSubmitElement=o._popupForm.querySelector(u),o._handleSubmitForm=n,o._prepareForm=r,o}return t=s,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputsList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"_setInputValues",value:function(e){this._inputsList.forEach((function(t){t.value=e[t.name]}))}},{key:"setEventListeners",value:function(){var e=this;T(q(s.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitForm(e._getInputValues())}))}},{key:"open",value:function(){this._prepareForm(),T(q(s.prototype),"open",this).call(this)}},{key:"setTextButton",value:function(e){this._btnSubmitElement.textContent=e}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(E);function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var V,B=new u({baseUrl:"https://nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"26e206db-fdaf-4832-831b-12af613bc48e","Content-Type":"application/json"}}),F=new p({nameSelector:".profile__name",aboutSelector:".profile__about",avatarSelector:".profile__avatar"}),N=new y({renderer:function(e){return function(e){var t=new d("#card-template",e,V,{handleCardClick:function(){var e,n,r;n=(e=t.getImageData()).link,r=e.name,z.open(n,r)},handleLike:function(){t.isLiked()?B.removeLiked(t.getCardID()).then((function(e){t.updateLikes(e.likes)})).catch((function(e){console.log(e)})):B.setLiked(t.getCardID()).then((function(e){t.updateLikes(e.likes)})).catch((function(e){console.log(e)}))},handleDelete:function(){B.deleteCard(t.getCardID()).then((function(){t.deleteCard()})).catch((function(e){console.log(e)}))}});return t.createCard()}(e)}},".cards__list"),M=new v(e,r),J=new v(e,i),H=new v(e,o),z=new I({common:t,popupSelector:".popup_full-image",imageSelector:".popup__image",captionSelector:".popup__image-caption"}),$=new x(n(".popup_edit-profile"),r,(function(e){var t=this;this.setTextButton("Сохранение..."),B.editUser(e).then((function(e){F.setUserInfo(e),t.close()})).catch((function(e){console.log(e)})).finally((function(){t.setTextButton("Сохранить")}))}),(function(){this._setInputValues(F.getUserInfo()),M.checkInitialInputValues()})),G=new x(n(".popup_add-card"),i,(function(e){var t=this;this.setTextButton("Сохранение..."),B.addCard(e).then((function(e){N.addItem(e),t.close()})).catch((function(e){console.log(e)})).finally((function(){t.setTextButton("Создать")}))}),(function(){i.reset(),J.hideAllInputError()})),K=new x(n(".popup_new-avatar"),o,(function(e){var t=this;this.setTextButton("Сохранение..."),B.setNewAvatar(e).then((function(e){F.setUserAvatar(e),t.close()})).catch((function(e){console.log(e)})).finally((function(){t.setTextButton("Сохранить")}))}),(function(){o.reset(),H.hideAllInputError()}));Promise.all([B.getUser(),B.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],s=!0,a=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);s=!0);}catch(e){a=!0,o=e}finally{try{s||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];V=o._id,F.renderProfile(o),N.renderItems(i)})).catch((function(e){console.log(e)})),s.addEventListener("click",(function(){return $.open()})),a.addEventListener("click",(function(){return G.open()})),l.addEventListener("click",(function(){return K.open()})),z.setEventListeners(),K.setEventListeners(),G.setEventListeners(),$.setEventListeners(),M.enableValidation(),J.enableValidation(),H.enableValidation()})();