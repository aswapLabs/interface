(this["webpackJsonp@aswaporg/aswap"]=this["webpackJsonp@aswaporg/aswap"]||[]).push([[7],{594:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n(11),o=(n(120),n(68),n(590));function r(e){var t=Object(o.e)(null===e||void 0===e?void 0:e.token0.address,null===e||void 0===e?void 0:e.token1.address).data;return e&&t?i.a.fromRawAmount(e.liquidityToken,t[0]):void 0}},603:function(e,t,n){"use strict";n.d(t,"a",(function(){return O}));var i=n(8),o=n(6),r=n(0),c=n(44),a=n(192),d=n(191),l=n(248),s=n(34),u=n(190),b=n(1),j=Object(o.default)(s.j.small).withConfig({componentId:"sc-nf70qf-0"})(["opacity:0.6;:hover{opacity:1;}margin-top:1rem !important;"]);function O(){var e=Object(d.b)(),t=Object(r.useMemo)((function(){return Object(d.a)()}),[]),n=Object(c.g)(),o=Object(l.a)();if(t&&(t!==a.a||e!==a.a)){var s;s=e===t?a.a:t,s="en-US";Object(i.a)(Object(i.a)({},n),{},{search:Object(u.stringify)(Object(i.a)(Object(i.a)({},o),{},{lng:s}))});return Object(b.jsx)(j,{})}return null}},604:function(e,t,n){"use strict";n.d(t,"b",(function(){return m})),n.d(t,"a",(function(){return C}));var i=n(6),o=n(22),r=n(31),c=n(86),a=n(44),d=n(558),l=n(51),s=n(623),u=n(27),b=n(157),j=n(116),O=n(34),p=n(243),h=n(1),v=i.default.div.withConfig({componentId:"sc-b8gv1b-0"})([""," align-items:center;border-radius:3rem;justify-content:space-evenly;"],(function(e){return e.theme.flexRowNoWrap})),f="ACTIVE",x=Object(i.default)(c.c).attrs({activeClassName:f}).withConfig({componentId:"sc-b8gv1b-1"})([""," align-items:center;justify-content:center;height:3rem;border-radius:3rem;outline:none;cursor:pointer;text-decoration:none;color:",";font-size:20px;&.","{border-radius:12px;font-weight:500;color:",";}:hover,:focus{color:",";}"],(function(e){return e.theme.flexRowNoWrap}),(function(e){return e.theme.text3}),f,(function(e){return e.theme.text1}),(function(e){var t=e.theme;return Object(r.a)(.1,t.text1)})),g=(i.default.div.withConfig({componentId:"sc-b8gv1b-2"})(["font-weight:500;font-size:20px;"]),Object(i.default)(d.a).withConfig({componentId:"sc-b8gv1b-3"})(["color:",";"],(function(e){return e.theme.text1})));function m(e){var t=e.active;return Object(h.jsxs)(v,{style:{marginBottom:"20px",display:"none",padding:"1rem 1rem 0 1rem"},children:[Object(h.jsx)(x,{id:"swap-nav-link",to:"/swap",isActive:function(){return"swap"===t},children:Object(h.jsx)(o.b,{id:"Swap"})}),Object(h.jsx)(x,{id:"pool-nav-link",to:"/pool/v1",isActive:function(){return"pool"===t},children:Object(h.jsx)(o.b,{id:"Pool"})})]})}function C(e){var t=e.adding,n=e.creating,i=e.defaultSlippage,r=(e.positionID,Object(p.a)()),d=Object(u.a)();Object(a.g)();return Object(h.jsx)(v,{children:Object(h.jsxs)(l.b,{style:{padding:"1rem 1rem 0 1rem"},children:[Object(h.jsx)(c.b,{to:"/pool",onClick:function(){t&&(d(Object(b.b)()),d(Object(j.b)()))},children:Object(h.jsx)(g,{stroke:r.text2})}),Object(h.jsx)(O.j.mediumHeader,{fontWeight:500,fontSize:20,children:n?Object(h.jsx)(o.b,{id:"Create a pair"}):t?Object(h.jsx)(o.b,{id:"Add Liquidity"}):Object(h.jsx)(o.b,{id:"Remove Liquidity"})}),Object(h.jsx)(s.a,{placeholderSlippage:i})]})})}},605:function(e,t,n){"use strict";n.d(t,"a",(function(){return I})),n.d(t,"b",(function(){return W}));var i=n(36),o=n(6),r=n(22),c=n(3),a=n.n(c),d=n(11),l=n(31),s=n(0),u=n.n(s),b=n(14),j=n.n(b);function O(){return O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},O.apply(this,arguments)}function p(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var h=Object(s.forwardRef)((function(e,t){var n=e.color,i=void 0===n?"currentColor":n,o=e.size,r=void 0===o?24:o,c=p(e,["color","size"]);return u.a.createElement("svg",O({ref:t,xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},c),u.a.createElement("polyline",{points:"18 15 12 9 6 15"}))}));h.propTypes={color:j.a.string,size:j.a.oneOfType([j.a.string,j.a.number])},h.displayName="ChevronUp";var v=h,f=n(242),x=n(86),g=n(154),m=n(594),C=n(26),R=n(245),y=n(34),N=n(595),E=n(626),w=n(119),U=n(612),_=n(155),k=n(118),Y=n(583),A=n(601),S=n(51),q=n(588),B=n(80),T=n(1),P=Object(o.default)(S.b).withConfig({componentId:"sc-15h37u5-0"})(["height:24px;"]),z=(Object(o.default)(_.g).withConfig({componentId:"sc-15h37u5-1"})(["border:1px solid transparent;:hover{border:1px solid ",";}"],(function(e){var t=e.theme;return Object(l.a)(.06,t.bg2)})),Object(o.default)(_.c).withConfig({componentId:"sc-15h37u5-2"})(["border:none;background:",";position:relative;overflow:hidden;"],(function(e){var t=e.theme,n=e.bgColor;return"radial-gradient(91.85% 100% at 1.84% 0%, ".concat(Object(l.d)(.8,n)," 0%, ").concat(t.bg3," 100%) ")})));function I(e){var t=e.pair,n=e.showUnwrapped,o=void 0!==n&&n,c=e.border,l=Object(C.a)().account,u=o?t.token0:Object(E.a)(t.token0),b=o?t.token1:Object(E.a)(t.token1),j=Object(s.useState)(!1),O=Object(i.a)(j,2),p=O[0],h=O[1],v=Object(R.e)(null!==l&&void 0!==l?l:void 0,t.liquidityToken),f=Object(m.a)(t),x=v&&f&&a.a.greaterThanOrEqual(f.quotient,v.quotient)?new d.d(v.quotient,f.quotient):void 0,N=t&&f&&v&&a.a.greaterThanOrEqual(f.quotient,v.quotient)?[t.getLiquidityValue(t.token0,f,v,!1),t.getLiquidityValue(t.token1,f,v,!1)]:[void 0,void 0],w=Object(i.a)(N,2),U=w[0],Y=w[1];return Object(T.jsx)(T.Fragment,{children:v&&a.a.greaterThan(v.quotient,a.a.BigInt(0))?Object(T.jsx)(_.b,{border:c,children:Object(T.jsxs)(k.a,{gap:"12px",children:[Object(T.jsx)(P,{children:Object(T.jsx)(S.c,{children:Object(T.jsx)(g.b,{fontWeight:500,fontSize:16,children:Object(T.jsx)(r.b,{id:"Your position"})})})}),Object(T.jsxs)(P,{onClick:function(){return h(!p)},children:[Object(T.jsxs)(S.c,{children:[Object(T.jsx)(A.a,{currency0:u,currency1:b,margin:!0,size:20}),Object(T.jsxs)(g.b,{fontWeight:500,fontSize:20,children:[u.symbol,"/",b.symbol]})]}),Object(T.jsx)(S.c,{children:Object(T.jsx)(g.b,{fontWeight:500,fontSize:20,children:v?v.toSignificant(4):"-"})})]}),Object(T.jsxs)(k.a,{gap:"4px",children:[Object(T.jsxs)(P,{children:[Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:Object(T.jsx)(r.b,{id:"Your pool share:"})}),Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:x?x.toFixed(6)+"%":"-"})]}),Object(T.jsxs)(P,{children:[Object(T.jsxs)(g.b,{fontSize:16,fontWeight:500,children:[u.symbol,":"]}),U?Object(T.jsx)(S.c,{children:Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,marginLeft:"6px",children:null===U||void 0===U?void 0:U.toSignificant(6)})}):"-"]}),Object(T.jsxs)(P,{children:[Object(T.jsxs)(g.b,{fontSize:16,fontWeight:500,children:[b.symbol,":"]}),Y?Object(T.jsx)(S.c,{children:Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,marginLeft:"6px",children:null===Y||void 0===Y?void 0:Y.toSignificant(6)})}):"-"]})]})]})}):Object(T.jsx)(_.c,{children:Object(T.jsxs)(y.j.subHeader,{style:{textAlign:"center"},children:[Object(T.jsx)("span",{role:"img","aria-label":"wizard-icon",children:"\u2b50\ufe0f"})," ",Object(T.jsx)(r.b,{id:"By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity."})," "]})})})}function W(e){var t=e.pair,n=e.border,o=e.stakedBalance,c=Object(C.a)().account,l=Object(E.a)(t.token0),u=Object(E.a)(t.token1),b=Object(s.useState)(!1),j=Object(i.a)(b,2),O=j[0],p=j[1],h=Object(R.e)(null!==c&&void 0!==c?c:void 0,t.liquidityToken),y=Object(m.a)(t),_=o?null===h||void 0===h?void 0:h.add(o):h,I=_&&y&&a.a.greaterThanOrEqual(y.quotient,_.quotient)?new d.d(_.quotient,y.quotient):void 0,W=t&&y&&_&&a.a.greaterThanOrEqual(y.quotient,_.quotient)?[t.getLiquidityValue(t.token0,y,_,!1),t.getLiquidityValue(t.token1,y,_,!1)]:[void 0,void 0],D=Object(i.a)(W,2),L=D[0],V=D[1],M=Object(U.a)(null===t||void 0===t?void 0:t.token0);return Object(T.jsx)(z,{border:n,bgColor:M,children:Object(T.jsxs)(k.a,{gap:"12px",children:[Object(T.jsxs)(P,{children:[Object(T.jsxs)(S.a,{gap:"8px",style:{marginLeft:"8px"},children:[Object(T.jsx)(A.a,{currency0:l,currency1:u,size:20}),Object(T.jsx)(g.b,{fontWeight:500,fontSize:20,children:l&&u?"".concat(l.symbol,"/").concat(u.symbol):Object(T.jsx)(q.c,{children:Object(T.jsx)(r.b,{id:"Loading"})})})]}),Object(T.jsx)(S.c,{gap:"8px",style:{marginRight:"4px"},children:Object(T.jsx)(w.b,{padding:"6px 8px",borderRadius:"12px",width:"100%",onClick:function(){return p(!O)},children:O?Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(r.b,{id:"Manage"}),Object(T.jsx)(v,{size:"20",style:{marginLeft:"8px",height:"20px",minWidth:"20px"}})]}):Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(r.b,{id:"Manage"}),Object(T.jsx)(f.a,{size:"20",style:{marginLeft:"8px",height:"20px",minWidth:"20px"}})]})})})]}),O&&Object(T.jsxs)(k.a,{gap:"8px",children:[Object(T.jsxs)(P,{children:[Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:Object(T.jsx)(r.b,{id:"Your total pool tokens:"})}),Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:_?_.toSignificant(4):"-"})]}),o&&Object(T.jsxs)(P,{children:[Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:Object(T.jsx)(r.b,{id:"Pool tokens in rewards pool:"})}),Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:o.toSignificant(4)})]}),Object(T.jsxs)(P,{children:[Object(T.jsx)(S.c,{children:Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:Object(T.jsx)(r.b,{id:"Pooled {0}:",values:{0:l.symbol}})})}),L?Object(T.jsxs)(S.c,{children:[Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,marginLeft:"6px",children:null===L||void 0===L?void 0:L.toSignificant(6)}),Object(T.jsx)(Y.a,{size:"20px",style:{marginLeft:"8px"},currency:l})]}):"-"]}),Object(T.jsxs)(P,{children:[Object(T.jsx)(S.c,{children:Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:Object(T.jsx)(r.b,{id:"Pooled {0}:",values:{0:u.symbol}})})}),V?Object(T.jsxs)(S.c,{children:[Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,marginLeft:"6px",children:null===V||void 0===V?void 0:V.toSignificant(6)}),Object(T.jsx)(Y.a,{size:"20px",style:{marginLeft:"8px"},currency:u})]}):"-"]}),Object(T.jsxs)(P,{children:[Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:Object(T.jsx)(r.b,{id:"Your pool share:"})}),Object(T.jsx)(g.b,{fontSize:16,fontWeight:500,children:I?Object(T.jsx)(r.b,{id:"{0} %",values:{0:"0.00"===I.toFixed(2)?"<0.01":I.toFixed(2)}}):"-"})]}),h&&a.a.greaterThan(h.quotient,B.e)&&Object(T.jsxs)(S.b,{marginTop:"10px",children:[Object(T.jsx)(w.f,{padding:"8px",borderRadius:"8px",as:x.b,to:"/add/".concat(Object(N.a)(l),"/").concat(Object(N.a)(u)),width:"49%",children:Object(T.jsx)(r.b,{id:"Add"})}),Object(T.jsx)(w.f,{padding:"8px",borderRadius:"8px",as:x.b,width:"49%",to:"/remove/".concat(Object(N.a)(l),"/").concat(Object(N.a)(u)),children:Object(T.jsx)(r.b,{id:"Remove"})})]}),o&&a.a.greaterThan(o.quotient,B.e)&&Object(T.jsx)(w.f,{padding:"8px",borderRadius:"8px",as:x.b,to:"/uni/".concat(Object(N.a)(l),"/").concat(Object(N.a)(u)),width:"100%",children:Object(T.jsx)(r.b,{id:"Manage Liquidity in Rewards Pool"})})]})]})})}},628:function(e,t,n){"use strict";n.d(t,"a",(function(){return C}));var i,o=n(36),r=n(10),c=n(6),a=n(22),d=n(0),l=n(34),s=n(119),u=n(250),b=n(155),j=n(51),O=n(118),p=n(583),h=n(26),v=n(244),f=n(81),x=n(1),g=c.default.div.withConfig({componentId:"sc-iep06c-0"})(["padding-top:calc(16px + 2rem);padding-bottom:20px;margin-top:-2rem;width:100%;max-width:400px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;color:",";background-color:",";z-index:-1;transform:",";transition:transform 300ms ease-in-out;text-align:center;"],(function(e){return e.theme.text2}),(function(e){return e.theme.advancedBG}),(function(e){return e.show?"translateY(0%)":"translateY(-100%)"})),m=Object(c.default)(l.j.blue).withConfig({componentId:"sc-iep06c-1"})(["font-size:12px;",""],(function(e){return e.theme.mediaWidth.upToSmall(i||(i=Object(r.a)(["\n    font-size: 10px;\n"])))}));function C(e){var t=e.show,n=e.currencies,i=Object(h.a)().chainId,r=Object(d.useState)(!1),c=Object(o.a)(r,2),C=c[0],R=c[1],y=i&&n?n.map((function(e){return null===e||void 0===e?void 0:e.wrapped})):[],N=Object(v.h)();return Object(x.jsxs)(g,{show:t,children:[Object(x.jsx)(u.a,{isOpen:C,onDismiss:function(){return R(!1)},children:Object(x.jsx)(b.g,{padding:"2rem",children:Object(x.jsxs)(O.a,{gap:"lg",children:[Object(x.jsxs)(j.b,{children:[Object(x.jsx)(l.j.mediumHeader,{children:Object(x.jsx)(a.b,{id:"Unsupported Assets"})}),Object(x.jsx)(l.b,{onClick:function(){return R(!1)}})]}),y.map((function(e){var t;return e&&N&&Object.keys(N).includes(e.address)&&Object(x.jsx)(b.e,{children:Object(x.jsxs)(O.a,{gap:"10px",children:[Object(x.jsxs)(j.a,{gap:"5px",align:"center",children:[Object(x.jsx)(p.a,{currency:e,size:"24px"}),Object(x.jsx)(l.j.body,{fontWeight:500,children:e.symbol})]}),i&&Object(x.jsx)(l.c,{href:Object(f.b)(i,e.address,f.a.ADDRESS),children:Object(x.jsx)(m,{children:e.address})})]})},null===(t=e.address)||void 0===t?void 0:t.concat("not-supported"))})),Object(x.jsx)(O.a,{gap:"lg",children:Object(x.jsx)(l.j.body,{fontWeight:500,children:Object(x.jsx)(a.b,{id:"Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons."})})})]})})}),Object(x.jsx)(s.b,{padding:"0",onClick:function(){return R(!0)},children:Object(x.jsx)(l.j.blue,{children:Object(x.jsx)(a.b,{id:"Read more about unsupported assets"})})})]})}},653:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n(0),o=n(244);function r(e,t){var n=Object(o.h)();return Object(i.useMemo)((function(){return Boolean(n&&((null===e||void 0===e?void 0:e.isToken)&&n[e.address]||(null===t||void 0===t?void 0:t.isToken)&&n[t.address]))}),[e,t,n])}},655:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n(11),o=n(3),r=n.n(o),c=r.a.exponentiate(r.a.BigInt(10),r.a.BigInt(16));function a(e){if(e)return e.currency.isNative?r.a.greaterThan(e.quotient,c)?i.a.fromRawAmount(e.currency,r.a.subtract(e.quotient,c)):i.a.fromRawAmount(e.currency,r.a.BigInt(0)):e}},657:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=new(n(11).b)(1,1);function o(e,t){if(t.lessThan(0)||t.greaterThan(i))throw new Error("Unexpected slippage");return[e.multiply(i.subtract(t)).quotient,e.multiply(i.add(t)).quotient]}},658:function(e,t,n){"use strict";n.d(t,"d",(function(){return j})),n.d(t,"a",(function(){return O})),n.d(t,"c",(function(){return p})),n.d(t,"b",(function(){return h}));var i,o,r,c,a,d,l,s=n(10),u=n(154),b=n(6),j=b.default.div(i||(i=Object(s.a)(["\n  position: relative;\n  padding: 20px;\n"]))),O=Object(b.default)(u.b)(o||(o=Object(s.a)(["\n  :hover {\n    cursor: pointer;\n  }\n  color: ",";\n"])),(function(e){return e.theme.primary1})),p=b.default.button(r||(r=Object(s.a)(["\n  padding: 0.5rem 1rem;\n  background-color: ",";\n  border: 1px solid ",";\n  border-radius: 0.5rem;\n  font-size: 1rem;\n  ",";\n  font-weight: 500;\n  cursor: pointer;\n  margin: 0.25rem;\n  overflow: hidden;\n  color: ",";\n  :hover {\n    border: 1px solid ",";\n  }\n  :focus {\n    border: 1px solid ",";\n    outline: none;\n  }\n"])),(function(e){return e.theme.primary5}),(function(e){return e.theme.primary5}),(function(e){return e.theme.mediaWidth.upToSmall(c||(c=Object(s.a)(["\n    padding: 0.25rem 0.5rem;\n  "])))}),(function(e){return e.theme.primary1}),(function(e){return e.theme.primary1}),(function(e){return e.theme.primary1})),h=b.default.span(a||(a=Object(s.a)(["\n  &::after {\n    display: inline-block;\n    animation: ellipsis 1.25s infinite;\n    content: '.';\n    width: 1em;\n    text-align: left;\n  }\n  @keyframes ellipsis {\n    0% {\n      content: '.';\n    }\n    33% {\n      content: '..';\n    }\n    66% {\n      content: '...';\n    }\n  }\n"]))),v=Object(b.keyframes)(d||(d=Object(s.a)(["\n  0% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n"])));b.default.div(l||(l=Object(s.a)(["\n  display: grid;\n  min-width: 75%;\n  max-width: 960px;\n  grid-column-gap: 0.5em;\n  grid-row-gap: 0.8em;\n  grid-template-columns: repeat(3, 1fr);\n  & > div {\n    animation: "," 1.5s infinite;\n    animation-fill-mode: both;\n    background: linear-gradient(\n      to left,\n      "," 25%,\n      "," 50%,\n      "," 75%\n    );\n    background-size: 400%;\n    border-radius: 12px;\n    height: 2.4em;\n    will-change: background-position;\n  }\n  & > div:nth-child(4n + 1) {\n    grid-column: 1 / 3;\n  }\n  & > div:nth-child(4n) {\n    grid-column: 3 / 4;\n    margin-bottom: 2em;\n  }\n"])),v,(function(e){return e.theme.bg1}),(function(e){return e.theme.bg2}),(function(e){return e.theme.bg1}))},662:function(e,t,n){"use strict";n.d(t,"a",(function(){return j})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return x}));var i=n(7),o=n.n(i),r=n(72),c=n(568),a=n(586),d=n(246),l=n(0),s=n(84),u=n(93),b=n(33);var j,O=n(120),p=n(26),h=n(11),v=n(68);function f(e,t){var n,i=Object(p.a)().account,a=(null===e||void 0===e||null===(n=e.currency)||void 0===n?void 0:n.isToken)?e.currency:void 0,d=function(e,t,n){var i=Object(O.f)(null===e||void 0===e?void 0:e.address,!1),o=Object(l.useMemo)((function(){return[t,n]}),[t,n]),r=Object(v.c)(i,"allowance",o).result;return Object(l.useMemo)((function(){return e&&r?h.a.fromRawAmount(e,r.toString()):void 0}),[e,r])}(a,null!==i&&void 0!==i?i:void 0,t),s=Object(u.c)(null===a||void 0===a?void 0:a.address,t),f=Object(l.useMemo)((function(){return e&&t?e.currency.isNative?j.APPROVED:d?d.lessThan(e)?s?j.PENDING:j.NOT_APPROVED:j.APPROVED:j.UNKNOWN:j.UNKNOWN}),[e,d,s,t]),x=Object(O.f)(null===a||void 0===a?void 0:a.address),g=Object(u.d)(),m=Object(l.useCallback)(Object(r.a)(o.a.mark((function n(){var i,r;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(f===j.NOT_APPROVED){n.next=3;break}return console.error("approve was called unnecessarily"),n.abrupt("return");case 3:if(a){n.next=6;break}return console.error("no token"),n.abrupt("return");case 6:if(x){n.next=9;break}return console.error("tokenContract is null"),n.abrupt("return");case 9:if(e){n.next=12;break}return console.error("missing amount to approve"),n.abrupt("return");case 12:if(t){n.next=15;break}return console.error("no spender"),n.abrupt("return");case 15:return i=!1,n.next=18,x.estimateGas.approve(t,c.a).catch((function(){return i=!0,x.estimateGas.approve(t,e.quotient.toString())}));case 18:return r=n.sent,n.abrupt("return",x.approve(t,i?e.quotient.toString():c.a,{gasLimit:(o=r,o.mul(b.a.from(12e3)).div(b.a.from(1e4)))}).then((function(n){g(n,{summary:"Approve "+e.currency.symbol,approval:{tokenAddress:a.address,spender:t}})})).catch((function(e){throw console.debug("Failed to approve token",e),e})));case 20:case"end":return n.stop()}var o}),n)}))),[f,a,x,e,t,g]);return[f,m]}function x(e,t){var n=Object(p.a)().chainId,i=n?s.f[n]:void 0;return f(Object(l.useMemo)((function(){return e&&e.inputAmount.currency.isToken?e.maximumAmountIn(t):void 0}),[e,t]),n?e instanceof a.Trade?s.i[n]:e instanceof d.e?i:void 0:void 0)}!function(e){e.UNKNOWN="UNKNOWN",e.NOT_APPROVED="NOT_APPROVED",e.PENDING="PENDING",e.APPROVED="APPROVED"}(j||(j={}))},919:function(e,t,n){"use strict";var i=n(0),o=n.n(i),r=n(14),c=n.n(r);function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},a.apply(this,arguments)}function d(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=Object(i.forwardRef)((function(e,t){var n=e.color,i=void 0===n?"currentColor":n,r=e.size,c=void 0===r?24:r,l=d(e,["color","size"]);return o.a.createElement("svg",a({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),o.a.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),o.a.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))}));l.propTypes={color:c.a.string,size:c.a.oneOfType([c.a.string,c.a.number])},l.displayName="Plus",t.a=l},933:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return re}));var i=n(7),o=n.n(i),r=n(72),c=n(8),a=n(18),d=n(36),l=n(6),s=n(22),u=n(108),b=n(32),j=n(0),O=n(919),p=n(154),h=n(119),v=n(155),f=n(118),x=n(661),g=n(659),m=n(601),C=n(604),R=n(605),y=n(51),N=n(80),E=n(120),w=n(602),U=n(26),_=n(244),k=n(662),Y=n(653),A=n(663),S=n(42),q=n(157),B=n(3),T=n.n(B),P=n(594),z=n(625),I=n(245),W=n(27),D=T.a.BigInt(0);function L(){return Object(W.b)((function(e){return e.mint}))}var V=n(73),M=n(34),F=n(657),G=n(655),H=n(656),K=n(658),J=n(583),X=n(1);function Q(e){var t,n,i,o,r,c,a,d,l=e.noLiquidity,u=e.price,b=e.currencies,j=e.parsedAmounts,O=e.poolTokenPercentage,v=e.onAdd;return Object(X.jsxs)(X.Fragment,{children:[Object(X.jsxs)(y.b,{children:[Object(X.jsx)(M.j.body,{children:Object(X.jsx)(s.b,{id:"{0} Deposited",values:{0:null===(t=b[q.a.CURRENCY_A])||void 0===t?void 0:t.symbol}})}),Object(X.jsxs)(y.c,{children:[Object(X.jsx)(J.a,{currency:b[q.a.CURRENCY_A],style:{marginRight:"8px"}}),Object(X.jsx)(M.j.body,{children:null===(n=j[q.a.CURRENCY_A])||void 0===n?void 0:n.toSignificant(6)})]})]}),Object(X.jsxs)(y.b,{children:[Object(X.jsx)(M.j.body,{children:Object(X.jsx)(s.b,{id:"{0} Deposited",values:{0:null===(i=b[q.a.CURRENCY_B])||void 0===i?void 0:i.symbol}})}),Object(X.jsxs)(y.c,{children:[Object(X.jsx)(J.a,{currency:b[q.a.CURRENCY_B],style:{marginRight:"8px"}}),Object(X.jsx)(M.j.body,{children:null===(o=j[q.a.CURRENCY_B])||void 0===o?void 0:o.toSignificant(6)})]})]}),Object(X.jsxs)(y.b,{children:[Object(X.jsx)(M.j.body,{children:Object(X.jsx)(s.b,{id:"Rates"})}),Object(X.jsx)(M.j.body,{children:"1 ".concat(null===(r=b[q.a.CURRENCY_A])||void 0===r?void 0:r.symbol," = ").concat(null===u||void 0===u?void 0:u.toSignificant(4)," ").concat(null===(c=b[q.a.CURRENCY_B])||void 0===c?void 0:c.symbol)})]}),Object(X.jsx)(y.b,{style:{justifyContent:"flex-end"},children:Object(X.jsx)(M.j.body,{children:"1 ".concat(null===(a=b[q.a.CURRENCY_B])||void 0===a?void 0:a.symbol," = ").concat(null===u||void 0===u?void 0:u.invert().toSignificant(4)," ").concat(null===(d=b[q.a.CURRENCY_A])||void 0===d?void 0:d.symbol)})}),Object(X.jsxs)(y.b,{children:[Object(X.jsx)(M.j.body,{children:Object(X.jsx)(s.b,{id:"Share of Pool:"})}),Object(X.jsx)(M.j.body,{children:Object(X.jsx)(s.b,{id:"{0}%",values:{0:l?"100":null===O||void 0===O?void 0:O.toSignificant(4)}})})]}),Object(X.jsx)(h.f,{style:{margin:"20px 0 0 0"},onClick:v,children:Object(X.jsx)(p.b,{fontWeight:500,fontSize:20,children:l?Object(X.jsx)(s.b,{id:"Create Pool & Supply"}):Object(X.jsx)(s.b,{id:"Confirm Supply"})})})]})}var Z=n(595);function $(e){var t,n,i,o,r,c,a,d,u=e.currencies,b=e.noLiquidity,O=e.poolTokenPercentage,h=e.price,v=Object(j.useContext)(l.ThemeContext);return Object(X.jsx)(f.a,{gap:"md",children:Object(X.jsxs)(y.a,{justify:"space-around",gap:"4px",children:[Object(X.jsxs)(f.a,{justify:"center",children:[Object(X.jsx)(M.j.black,{children:null!==(t=null===h||void 0===h?void 0:h.toSignificant(6))&&void 0!==t?t:"-"}),Object(X.jsx)(p.b,{fontWeight:500,fontSize:14,color:v.text2,pt:1,children:Object(X.jsx)(s.b,{id:"{0} per {1}",values:{0:null===(n=u[q.a.CURRENCY_B])||void 0===n?void 0:n.symbol,1:null===(i=u[q.a.CURRENCY_A])||void 0===i?void 0:i.symbol}})})]}),Object(X.jsxs)(f.a,{justify:"center",children:[Object(X.jsx)(M.j.black,{children:null!==(o=null===h||void 0===h||null===(r=h.invert())||void 0===r?void 0:r.toSignificant(6))&&void 0!==o?o:"-"}),Object(X.jsx)(p.b,{fontWeight:500,fontSize:14,color:v.text2,pt:1,children:Object(X.jsx)(s.b,{id:"{0} per {1}",values:{0:null===(c=u[q.a.CURRENCY_A])||void 0===c?void 0:c.symbol,1:null===(a=u[q.a.CURRENCY_B])||void 0===a?void 0:a.symbol}})})]}),Object(X.jsxs)(f.a,{justify:"center",children:[Object(X.jsxs)(M.j.black,{children:[b&&h?"100":null!==(d=(null===O||void 0===O?void 0:O.lessThan(N.i))?"<0.01":null===O||void 0===O?void 0:O.toFixed(2))&&void 0!==d?d:"0","%"]}),Object(X.jsx)(p.b,{fontWeight:500,fontSize:14,color:v.text2,pt:1,children:Object(X.jsx)(s.b,{id:"Share of Pool"})})]})]})})}var ee=n(628),te=n(603),ne=n(654),ie=n(590),oe=new b.Percent(50,1e4);function re(e){var t,n,i,B,J,re,ce,ae,de,le,se,ue=e.match.params,be=ue.currencyIdA,je=ue.currencyIdB,Oe=e.history,pe=Object(U.a)(),he=pe.account,ve=pe.chainId,fe=pe.library,xe=Object(j.useContext)(l.ThemeContext),ge=Object(_.c)(be),me=Object(_.c)(je),Ce=Object(j.useState)(ge),Re=Object(d.a)(Ce,2),ye=Re[0],Ne=Re[1],Ee=Object(j.useState)(me),we=Object(d.a)(Ee,2),Ue=we[0],_e=we[1];Object(ie.d)(be).then((function(e){void 0===ge&&Ne(e)})),Object(ie.d)(je).then((function(e){void 0===me&&_e(e)})),void 0!==je&&void 0!==Ue&&console.log("addd");var ke=Object(S.i)(),Ye=Object(V.f)(),Ae=L(),Se=Ae.independentField,qe=Ae.typedValue,Be=Ae.otherTypedValue,Te=function(e,t){var n,i,o,r,c,l,s=Object(U.a)().account,O=L(),p=O.independentField,h=O.typedValue,v=O.otherTypedValue,f=p===q.a.CURRENCY_A?q.a.CURRENCY_B:q.a.CURRENCY_A,x=Object(j.useMemo)((function(){var n;return n={},Object(a.a)(n,q.a.CURRENCY_A,null!==e&&void 0!==e?e:void 0),Object(a.a)(n,q.a.CURRENCY_B,null!==t&&void 0!==t?t:void 0),n}),[e,t]),g=Object(w.b)(x[q.a.CURRENCY_A],x[q.a.CURRENCY_B]),m=Object(d.a)(g,2),C=m[0],R=m[1],y=Object(P.a)(null!==R&&void 0!==R?R:void 0),N=C===w.a.NOT_EXISTS||Boolean(y&&T.a.equal(y.quotient,D))||Boolean(C===w.a.EXISTS&&R&&T.a.equal(R.reserve0.quotient,D)&&T.a.equal(R.reserve1.quotient,D)),E=Object(I.c)(null!==s&&void 0!==s?s:void 0,[x[q.a.CURRENCY_A],x[q.a.CURRENCY_B]]),_=(n={},Object(a.a)(n,q.a.CURRENCY_A,E[0]),Object(a.a)(n,q.a.CURRENCY_B,E[1]),n),k=Object(z.a)(h,x[p]),Y=Object(j.useMemo)((function(){if(N)return v&&x[f]?Object(z.a)(v,x[f]):void 0;if(k){var n=null===k||void 0===k?void 0:k.wrapped,i=null===e||void 0===e?void 0:e.wrapped,o=null===t||void 0===t?void 0:t.wrapped;if(i&&o&&n&&R){var r=f===q.a.CURRENCY_B?t:e,c=f===q.a.CURRENCY_B?R.priceOf(i).quote(n):R.priceOf(o).quote(n);return(null===r||void 0===r?void 0:r.isNative)?b.CurrencyAmount.fromRawAmount(r,c.quotient):c}}}),[N,v,x,f,k,e,t,R]),A=Object(j.useMemo)((function(){var e;return e={},Object(a.a)(e,q.a.CURRENCY_A,p===q.a.CURRENCY_A?k:Y),Object(a.a)(e,q.a.CURRENCY_B,p===q.a.CURRENCY_A?Y:k),e}),[Y,k,p]),S=Object(j.useMemo)((function(){if(!N){var t=null===e||void 0===e?void 0:e.wrapped;return R&&t?R.priceOf(t):void 0}var n=A[q.a.CURRENCY_A],i=A[q.a.CURRENCY_B];if((null===n||void 0===n?void 0:n.greaterThan(0))&&(null===i||void 0===i?void 0:i.greaterThan(0))){var o=i.divide(n);return new b.Price(n.currency,i.currency,o.denominator,o.numerator)}}),[e,N,R,A]),B=Object(j.useMemo)((function(){var e=A[q.a.CURRENCY_A],t=A[q.a.CURRENCY_B],n=null===e||void 0===e?void 0:e.wrapped,i=null===t||void 0===t?void 0:t.wrapped;if(R&&y&&n&&i)try{return R.getLiquidityMinted(y,n,i)}catch(r){return void console.error(r)}}),[A,R,y]),W=Object(j.useMemo)((function(){return B&&y?new b.Percent(B.quotient,y.add(B).quotient):void 0}),[B,y]);s||(r=u.a._("Connect Wallet")),C===w.a.INVALID&&(r=null!==(c=r)&&void 0!==c?c:u.a._("Invalid pair")),A[q.a.CURRENCY_A]&&A[q.a.CURRENCY_B]||(r=null!==(l=r)&&void 0!==l?l:u.a._("Enter an amount"));var V,M,F=A[q.a.CURRENCY_A],G=A[q.a.CURRENCY_B];return F&&(null===_||void 0===_||null===(i=_[q.a.CURRENCY_A])||void 0===i?void 0:i.lessThan(F))&&(r=u.a._("Insufficient {0} balance",{0:null===(V=x[q.a.CURRENCY_A])||void 0===V?void 0:V.symbol})),G&&(null===_||void 0===_||null===(o=_[q.a.CURRENCY_B])||void 0===o?void 0:o.lessThan(G))&&(r=u.a._("Insufficient {0} balance",{0:null===(M=x[q.a.CURRENCY_B])||void 0===M?void 0:M.symbol})),{dependentField:f,currencies:x,pair:R,pairState:C,currencyBalances:_,parsedAmounts:A,price:S,noLiquidity:N,liquidityMinted:B,poolTokenPercentage:W,error:r}}(null!==ye&&void 0!==ye?ye:void 0,null!==Ue&&void 0!==Ue?Ue:void 0),Pe=Te.dependentField,ze=Te.currencies,Ie=Te.pair,We=Te.pairState,De=Te.currencyBalances,Le=Te.parsedAmounts,Ve=Te.price,Me=Te.noLiquidity,Fe=Te.liquidityMinted,Ge=Te.poolTokenPercentage,He=Te.error,Ke=function(e){var t=Object(W.a)();return{onFieldAInput:Object(j.useCallback)((function(n){t(Object(q.c)({field:q.a.CURRENCY_A,typedValue:n,noLiquidity:!0===e}))}),[t,e]),onFieldBInput:Object(j.useCallback)((function(n){t(Object(q.c)({field:q.a.CURRENCY_B,typedValue:n,noLiquidity:!0===e}))}),[t,e])}}(Me),Je=Ke.onFieldAInput,Xe=Ke.onFieldBInput,Qe=!He,Ze=Object(j.useState)(!1),$e=Object(d.a)(Ze,2),et=$e[0],tt=$e[1],nt=Object(j.useState)(!1),it=Object(d.a)(nt,2),ot=it[0],rt=it[1],ct=(Object(A.a)(),Object(V.o)(oe)),at=Object(j.useState)(""),dt=Object(d.a)(at,2),lt=dt[0],st=dt[1],ut=(i={},Object(a.a)(i,Se,qe),Object(a.a)(i,Pe,Me?Be:null!==(t=null===(n=Le[Pe])||void 0===n?void 0:n.toSignificant(6))&&void 0!==t?t:""),i),bt=[q.a.CURRENCY_A,q.a.CURRENCY_B].reduce((function(e,t){return Object(c.a)(Object(c.a)({},e),{},Object(a.a)({},t,Object(G.a)(De[t])))}),{}),jt=[q.a.CURRENCY_A,q.a.CURRENCY_B].reduce((function(e,t){var n,i;return Object(c.a)(Object(c.a)({},e),{},Object(a.a)({},t,null===(n=bt[t])||void 0===n?void 0:n.equalTo(null!==(i=Le[t])&&void 0!==i?i:"0")))}),{}),Ot=Object(E.g)(),pt=Object(k.b)(Le[q.a.CURRENCY_A],null===Ot||void 0===Ot?void 0:Ot.address),ht=Object(d.a)(pt,2),vt=ht[0],ft=ht[1],xt=Object(k.b)(Le[q.a.CURRENCY_B],null===Ot||void 0===Ot?void 0:Ot.address),gt=Object(d.a)(xt,2),mt=gt[0],Ct=gt[1],Rt=Object(ne.a)(null!==he&&void 0!==he?he:void 0);function yt(e){return Nt.apply(this,arguments)}function Nt(){return Nt=Object(r.a)(o.a.mark((function e(t){var n,i,r,c,d,l,s,u,b,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==t){e.next=2;break}return e.abrupt("return");case 2:if(ve&&fe&&he){e.next=4;break}return e.abrupt("return");case 4:if(i=Le[q.a.CURRENCY_A],r=Le[q.a.CURRENCY_B],i&&r&&ye&&Ue){e.next=7;break}return e.abrupt("return");case 7:n={},Object(a.a)(n,q.a.CURRENCY_A,Object(F.a)(i,Me?N.l:ct)[0]),Object(a.a)(n,q.a.CURRENCY_B,Object(F.a)(r,Me?N.l:ct)[0]),c=n,rt(!0),t?Object(_.a)(ve,null===ye||void 0===ye||null===(d=ye.wrapped)||void 0===d?void 0:d.address,null===Ue||void 0===Ue||null===(l=Ue.wrapped)||void 0===l?void 0:l.address).then((function(e){var t,n,o,a;e?Rt(null!==(t=null===ye||void 0===ye||null===(n=ye.wrapped)||void 0===n?void 0:n.address)&&void 0!==t?t:"",null!==(o=null===Ue||void 0===Ue||null===(a=Ue.wrapped)||void 0===a?void 0:a.address)&&void 0!==o?o:"",i.quotient.toString(),r.quotient.toString(),c[q.a.CURRENCY_A].toString(),c[q.a.CURRENCY_B].toString()).then((function(e){rt(!1),st(e)})).catch((function(e){rt(!1),4001!==(null===e||void 0===e?void 0:e.code)&&console.error(e)})):rt(!1)})):Rt(null!==(s=null===ye||void 0===ye||null===(u=ye.wrapped)||void 0===u?void 0:u.address)&&void 0!==s?s:"",null!==(b=null===Ue||void 0===Ue||null===(j=Ue.wrapped)||void 0===j?void 0:j.address)&&void 0!==b?b:"",i.quotient.toString(),r.quotient.toString(),c[q.a.CURRENCY_A].toString(),c[q.a.CURRENCY_B].toString()).then((function(e){rt(!1),st(e)})).catch((function(e){rt(!1),4001!==(null===e||void 0===e?void 0:e.code)&&console.error(e)}));case 10:case"end":return e.stop()}}),e)}))),Nt.apply(this,arguments)}var Et=function(){var e,t,n,i;return Me?Object(X.jsx)(f.a,{gap:"20px",children:Object(X.jsx)(v.c,{mt:"20px",borderRadius:"20px",children:Object(X.jsxs)(y.d,{children:[Object(X.jsx)(p.b,{fontSize:"48px",fontWeight:500,lineHeight:"42px",marginRight:10,children:(null===(e=ze[q.a.CURRENCY_A])||void 0===e?void 0:e.symbol)+"/"+(null===(t=ze[q.a.CURRENCY_B])||void 0===t?void 0:t.symbol)}),Object(X.jsx)(m.a,{currency0:ze[q.a.CURRENCY_A],currency1:ze[q.a.CURRENCY_B],size:30})]})})}):Object(X.jsxs)(f.a,{gap:"20px",children:[Object(X.jsxs)(y.d,{style:{marginTop:"20px"},children:[Object(X.jsx)(p.b,{fontSize:"48px",fontWeight:500,lineHeight:"42px",marginRight:10,children:null===Fe||void 0===Fe?void 0:Fe.toSignificant(6)}),Object(X.jsx)(m.a,{currency0:ze[q.a.CURRENCY_A],currency1:ze[q.a.CURRENCY_B],size:30})]}),Object(X.jsx)(y.e,{children:Object(X.jsx)(p.b,{fontSize:"24px",children:(null===(n=ze[q.a.CURRENCY_A])||void 0===n?void 0:n.symbol)+"/"+(null===(i=ze[q.a.CURRENCY_B])||void 0===i?void 0:i.symbol)+" Pool Tokens"})}),Object(X.jsx)(M.j.italic,{fontSize:12,textAlign:"left",padding:"8px 0 0 0 ",children:Object(X.jsx)(s.b,{id:"Output is estimated. If the price changes by more than {0}% your transaction will revert.",values:{0:ct.toSignificant(4)}})})]})},wt=function(){return Object(X.jsx)(Q,{price:Ve,currencies:ze,parsedAmounts:Le,noLiquidity:Me,onAdd:function(){return yt(Me)},poolTokenPercentage:Ge})},Ut=u.a._("Supplying {0} {1} and {2} {3}",{0:null===(B=Le[q.a.CURRENCY_A])||void 0===B?void 0:B.toSignificant(6),1:null===(J=ze[q.a.CURRENCY_A])||void 0===J?void 0:J.symbol,2:null===(re=Le[q.a.CURRENCY_B])||void 0===re?void 0:re.toSignificant(6),3:null===(ce=ze[q.a.CURRENCY_B])||void 0===ce?void 0:ce.symbol}),_t=Object(j.useCallback)((function(e){var t=Object(Z.a)(e);t===je?Oe.push("/add/".concat(je,"/").concat(be)):(Ne(e),Oe.push("/add/".concat(t,"/").concat(je)))}),[je,Oe,be]),kt=Object(j.useCallback)((function(e){var t=Object(Z.a)(e);be===t?je?Oe.push("/add/".concat(je,"/").concat(t)):Oe.push("/add/".concat(t)):(_e(e),Oe.push("/add/".concat(be||"ETH","/").concat(t)))}),[be,Oe,je]),Yt=Object(j.useCallback)((function(){tt(!1),lt&&Je(""),st("")}),[Je,lt]),At=Oe.location.pathname.includes("/create"),St=Object(Y.a)(null===ze||void 0===ze?void 0:ze.CURRENCY_A,null===ze||void 0===ze?void 0:ze.CURRENCY_B);return Object(X.jsxs)(X.Fragment,{children:[Object(X.jsxs)(H.a,{children:[Object(X.jsx)(C.a,{creating:At,adding:!0,defaultSlippage:oe}),Object(X.jsxs)(K.d,{children:[Object(X.jsx)(x.c,{isOpen:et,onDismiss:Yt,attemptingTxn:ot,hash:lt,content:function(){return Object(X.jsx)(x.a,{title:Me?Object(X.jsx)(s.b,{id:"You are creating a pool"}):Object(X.jsx)(s.b,{id:"You will receive"}),onDismiss:Yt,topContent:Et,bottomContent:wt})},pendingText:Ut,currencyToAdd:null===Ie||void 0===Ie?void 0:Ie.liquidityToken}),Object(X.jsxs)(f.a,{gap:"20px",children:[Me||(At?Object(X.jsx)(f.b,{children:Object(X.jsx)(v.a,{children:Object(X.jsxs)(f.a,{gap:"10px",children:[Object(X.jsx)(M.j.link,{fontWeight:600,color:"primaryText1",children:Object(X.jsx)(s.b,{id:"You are the first liquidity provider."})}),Object(X.jsx)(M.j.link,{fontWeight:400,color:"primaryText1",children:Object(X.jsx)(s.b,{id:"The ratio of tokens you add will set the price of this pool."})}),Object(X.jsx)(M.j.link,{fontWeight:400,color:"primaryText1",children:Object(X.jsx)(s.b,{id:"Once you are happy with the rate click supply to review."})})]})})}):Object(X.jsx)(f.b,{children:Object(X.jsx)(v.a,{children:Object(X.jsx)(f.a,{gap:"10px",children:Object(X.jsx)(M.j.link,{fontWeight:400,color:"primaryText1",children:Object(X.jsx)(s.b,{id:"<0>Tip:</0> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.",components:{0:Object(X.jsx)("b",{})}})})})})})),Object(X.jsx)(g.a,{value:ut[q.a.CURRENCY_A],onUserInput:Je,onMax:function(){var e,t;Je(null!==(e=null===(t=bt[q.a.CURRENCY_A])||void 0===t?void 0:t.toExact())&&void 0!==e?e:"")},onCurrencySelect:_t,showMaxButton:!jt[q.a.CURRENCY_A],currency:ze[q.a.CURRENCY_A],id:"add-liquidity-input-tokena",showCommonBases:!0}),Object(X.jsx)(f.b,{children:Object(X.jsx)(O.a,{size:"16",color:xe.text2})}),Object(X.jsx)(g.a,{value:ut[q.a.CURRENCY_B],onUserInput:Xe,onCurrencySelect:kt,onMax:function(){var e,t;Xe(null!==(e=null===(t=bt[q.a.CURRENCY_B])||void 0===t?void 0:t.toExact())&&void 0!==e?e:"")},showMaxButton:!jt[q.a.CURRENCY_B],currency:ze[q.a.CURRENCY_B],id:"add-liquidity-input-tokenb",showCommonBases:!0}),ze[q.a.CURRENCY_A]&&ze[q.a.CURRENCY_B]&&We!==w.a.INVALID&&Object(X.jsx)(X.Fragment,{children:Object(X.jsxs)(v.c,{padding:"0px",borderRadius:"20px",children:[Object(X.jsx)(y.b,{padding:"1rem",children:Object(X.jsx)(M.j.subHeader,{fontWeight:500,fontSize:14,children:Me?Object(X.jsx)(s.b,{id:"Initial prices and pool share"}):Object(X.jsx)(s.b,{id:"Prices and pool share"})})})," ",Object(X.jsx)(v.c,{padding:"1rem",borderRadius:"20px",children:Object(X.jsx)($,{currencies:ze,poolTokenPercentage:Ge,noLiquidity:Me,price:Ve})})]})}),St?Object(X.jsx)(h.f,{disabled:!0,children:Object(X.jsx)(M.j.main,{mb:"4px",children:Object(X.jsx)(s.b,{id:"Unsupported Asset"})})}):he?Object(X.jsxs)(f.a,{gap:"md",children:[(vt===k.a.NOT_APPROVED||vt===k.a.PENDING||mt===k.a.NOT_APPROVED||mt===k.a.PENDING)&&Qe&&Object(X.jsxs)(y.b,{children:[vt!==k.a.APPROVED&&Object(X.jsx)(h.f,{onClick:ft,disabled:vt===k.a.PENDING,width:mt!==k.a.APPROVED?"48%":"100%",children:vt===k.a.PENDING?Object(X.jsx)(K.b,{children:Object(X.jsx)(s.b,{id:"Approving {0}",values:{0:null===(ae=ze[q.a.CURRENCY_A])||void 0===ae?void 0:ae.symbol}})}):Object(X.jsx)(s.b,{id:"Approve {0}",values:{0:null===(de=ze[q.a.CURRENCY_A])||void 0===de?void 0:de.symbol}})}),mt!==k.a.APPROVED&&Object(X.jsx)(h.f,{onClick:Ct,disabled:mt===k.a.PENDING,width:vt!==k.a.APPROVED?"48%":"100%",children:mt===k.a.PENDING?Object(X.jsx)(K.b,{children:Object(X.jsx)(s.b,{id:"Approving {0}",values:{0:null===(le=ze[q.a.CURRENCY_B])||void 0===le?void 0:le.symbol}})}):Object(X.jsx)(s.b,{id:"Approve {0}",values:{0:null===(se=ze[q.a.CURRENCY_B])||void 0===se?void 0:se.symbol}})})]}),Object(X.jsx)(h.c,{onClick:function(){Ye?yt(void 0):tt(!0)},disabled:!Qe,error:!Qe&&!!Le[q.a.CURRENCY_A]&&!!Le[q.a.CURRENCY_B],children:Object(X.jsx)(p.b,{fontSize:20,fontWeight:500,children:null!==He&&void 0!==He?He:Object(X.jsx)(s.b,{id:"Supply"})})})]}):Object(X.jsx)(h.e,{onClick:ke,children:Object(X.jsx)(s.b,{id:"Connect Wallet"})})]})]})]}),Object(X.jsx)(te.a,{}),St?Object(X.jsx)(ee.a,{show:St,currencies:[ze.CURRENCY_A,ze.CURRENCY_B]}):Ie&&!Me&&We!==w.a.INVALID?Object(X.jsx)(f.a,{style:{minWidth:"20rem",width:"100%",maxWidth:"400px",marginTop:"1rem"},children:Object(X.jsx)(R.a,{showUnwrapped:!1,pair:Ie})}):null]})}}}]);
//# sourceMappingURL=7.59fed6dc.chunk.js.map