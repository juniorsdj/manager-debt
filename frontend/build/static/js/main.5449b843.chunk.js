(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{144:function(e,t,a){},224:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(57),c=a.n(r),s=a(5);var i=a(13),l=a(12),o=a(242),d=a(84),u=a(235),j=a(246),b=a(243),O=a(239),h=a(237),f=a(238),x=a(236),p=a(87),v=a.n(p),m=a(10),g=a.n(m),y=a(20),C=a(150),k=a.n(C),w=function(){var e=Object(y.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.data);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(y.a)(g.a.mark((function e(t){var a,n,r,c,i;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.response){e.next=13;break}a=t.response,n=a.status,r=a.data,e.t0=n,e.next=400===e.t0?5:401===e.t0?9:403===e.t0?10:11;break;case 5:return c=r.errors,i=Object(s.jsxs)("div",{children:[Object(s.jsx)("strong",{children:"[ERR400]:"}),Object(s.jsx)("div",{children:c.map((function(e){return e.messages.join(" - ")})).map((function(e,t){return Object(s.jsx)("div",{children:e},t)}))})]}),console.log(i),e.abrupt("break",11);case 9:case 10:return e.abrupt("break",11);case 11:e.next=14;break;case 13:t.message;case 14:return e.abrupt("return",Promise.reject(t));case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=k.a;S.defaults.baseURL="https://backend-manager-debt.herokuapp.com",S.interceptors.response.use(w,D);var _=S,N=a(151),E=a.n(N),q=function(e){var t=e.page,a=e.sort;return _.get("/debts?".concat(function(e){var t=Object.keys(e).filter((function(t){return""!=e[t]})),a={};return t.forEach((function(t){return a[t]=e[t]})),E.a.stringify(a)}({page:t,sort:a})))},M=function(e){return _.delete("/debts/".concat(e))},H=function(e){var t=e.userId,a=e.reason,n=e.value,r=e.debtDate;return _.post("/debts",{userId:String(t),reason:a,value:Number(n),debtDate:r})},V=function(e,t){var a=t.reason,n=t.value,r=t.debtDate;return _.put("/debts/".concat(e),{reason:a,value:Number(n),debtDate:r})},F=function(){return _.get("/users")},A=a(152),I=a(241),P=a(245),R=a(155),G=function(e){var t=e.required,a=e.value,r=Object(n.useState)(a||""),c=Object(l.a)(r,2),i=c[0],o=c[1];return Object(n.useEffect)((function(){e.setValue(e.name,i)})),Object(n.useEffect)((function(){e.register({name:e.name},{required:t})}),[e.register]),Object(s.jsxs)(O.a.Field,{width:e.width,error:!!e.errors,children:[Object(s.jsx)("label",{children:e.label}),Object(s.jsx)(h.a,{selection:!0,search:e.search,placeholder:e.placeholder,options:e.options,value:i,loading:e.loading,onChange:function(t,a){o(a.value),e.setValue(e.name,a.value),e.errors&&e.clearError&&e.clearError(e.name)}}),Object(s.jsx)("span",{className:"fieldWithError",children:e.errors&&"required"===e.errors.type&&"Obrigat\xf3rio"})]})},J=(a(144),function(e){var t=e.debt,a=e.isOpened,r=e.onClose,c=Object(n.useState)(!1),i=Object(l.a)(c,2),o=i[0],d=i[1],u=Object(n.useState)([]),j=Object(l.a)(u,2),h=j[0],f=j[1],p=Object(n.useState)("Cadastrar"),m=Object(l.a)(p,2),C=m[0],k=m[1],w=Object(R.a)(),D=w.handleSubmit,S=w.register,_=w.setValue,N=function(){var e=Object(y.a)(g.a.mark((function e(a){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,e.t0=C,e.next="Cadastrar"===e.t0?4:"Editar"===e.t0?7:11;break;case 4:return e.next=6,E(a);case 6:return e.abrupt("return",e.sent);case 7:if(!t){e.next=10;break}return e.next=10,q(t._id,a);case 10:return e.abrupt("return");case 11:console.log(a),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(0),console.log(e.t1);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(y.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d(!0),H(t).then((function(e){d(!1),e.r?(console.log("sucesso"),r(!0)):console.log(e.errors)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(y.a)(g.a.mark((function e(t,a){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d(!0),V(t,a).then((function(e){d(!1),e.r?(console.log("sucesso"),r(!0)):console.log(e.errors)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){d(!0),F().then((function(e){d(!1),e.r?f(e.data.map((function(e){return{value:e.id,text:e.name}}))):console.log(e.errors)})).catch((function(e){d(!1),console.log(e)}))}),[]),Object(n.useEffect)((function(){if(!Object(A.isEmpty)(t))return function(e){k("Editar"),_("userId",Number(e.userId)),e.debtDate&&_("debtDate",Object(x.a)(new Date(e.debtDate),"yyyy-MM-dd",{locale:v.a})),_("value",e.value),_("reason",e.reason)}(t);k("Cadastrar")}),[t]),Object(s.jsxs)(I.a,{onClose:r,open:a,children:[Object(s.jsx)(P.a,{icon:"money bill alternate outline",content:"D\xedvida"}),Object(s.jsx)(I.a.Content,{children:Object(s.jsxs)(O.a,{id:"id-form",onSubmit:D(N),children:[Object(s.jsxs)(O.a.Group,{inline:!0,widths:"equal",children:["Cadastrar"===C&&Object(s.jsx)(O.a.Field,{children:Object(s.jsx)(G,{name:"userId",label:"Nome",register:S,options:h,setValue:_,disabled:o,required:!0,placeholder:"Jos\xe9 de Abreu da Silva"})}),Object(s.jsxs)(O.a.Field,{className:"required",children:[Object(s.jsx)("label",{children:"Motivo"}),Object(s.jsx)("div",{className:"ui fluid input",children:Object(s.jsx)("input",{ref:S,name:"reason",placeholder:"Cart\xe3o de cr\xe9dito",required:!0,type:"text"})})]}),Object(s.jsxs)(O.a.Field,{className:"required",children:[Object(s.jsx)("label",{children:"Valor"}),Object(s.jsxs)("div",{className:"ui fluid input",children:[Object(s.jsx)("label",{children:"R$"}),Object(s.jsx)("input",{ref:S,name:"value",step:"0.01",placeholder:"40,00",required:!0,type:"number"})]})]})]}),Object(s.jsx)(O.a.Group,{inline:!0,widths:"4",children:Object(s.jsxs)(O.a.Field,{className:"required",children:[Object(s.jsx)("label",{children:"Data da  d\xedvida"}),Object(s.jsx)("div",{className:"ui fluid input",children:Object(s.jsx)("input",{ref:S,name:"debtDate",placeholder:"01/01/2021",required:!0,type:"date"})})]})})]})}),Object(s.jsxs)(I.a.Actions,{children:[Object(s.jsx)(b.a,{color:"black",onClick:r,children:"Cancelar"}),Object(s.jsx)(b.a,{form:"id-form",color:"green",loading:o,disabled:o,children:C})]})]})}),B=void 0,L=[{key:"value_asc",value:"value_asc",text:"Valor da d\xedvida crescente"},{key:"value_desc",value:"value_desc",text:"Valor da d\xedvida decrescente"},{key:"debt_date_asc",value:"debt_date_asc",text:"Data da d\xedvida crescente"},{key:"debt_date_desc",value:"debt_date_desc",text:"Data da d\xedvida decrescente"}],U=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),i=Object(l.a)(c,2),p=i[0],m=i[1],g=Object(n.useState)([]),y=Object(l.a)(g,2),C=y[0],k=y[1],w=Object(n.useState)(0),D=Object(l.a)(w,2),S=D[0],_=D[1],N=Object(n.useState)(0),E=Object(l.a)(N,2),H=E[0],V=E[1],F=Object(n.useState)(1),A=Object(l.a)(F,2),I=A[0],P=A[1],R=Object(n.useState)("debt_date_desc"),G=Object(l.a)(R,2),U=G[0],W=G[1],$=Object(n.useState)(!1),z=Object(l.a)($,2),K=z[0],Q=z[1],T=Object(n.useState)({}),X=Object(l.a)(T,2),Y=X[0],Z=X[1];function ee(e){return Object(s.jsxs)(o.a.Row,{textAlign:"center",onClick:function(){Z(e),Q(!0)},children:[Object(s.jsx)(o.a.Cell,{children:e.userName}),Object(s.jsxs)(o.a.Cell,{children:[" ",e.createdAt?Object(x.a)(new Date(e.createdAt),"dd/MM/yyyy HH:mm",{locale:v.a}):null]}),Object(s.jsx)(o.a.Cell,{children:e.reason}),Object(s.jsx)(o.a.Cell,{children:e.debtDate?Object(x.a)(new Date(e.debtDate),"dd/MM/yyyy",{locale:v.a}):null}),Object(s.jsx)(o.a.Cell,{children:e.value}),Object(s.jsx)(o.a.Cell,{children:Object(s.jsx)("div",{style:{padding:20},onClick:function(t){t.stopPropagation(),function(e){if(!window.confirm("Voc\xea deseja realmente excluir essa d\xedvida?"))return null;r(!0),M(e).then((function(t){t.r&&(r(!1),k(C.filter((function(t){return t._id!==e}))),_(S-1),V(Math.ceil(S/30)))})).catch((function(e){r(!1),console.log(e)}))}(e._id)},children:Object(s.jsx)(d.a,{name:"trash alternate"})})})]},e._id)}return Object(n.useEffect)((function(){r(!0),q({page:I,sort:U}).then((function(e){e.r&&(r(!1),k(e.data),_(e.totalCount),V(Math.ceil(e.totalCount/30)))})).catch((function(e){r(!1),console.log(e)}))}),[I,U,p]),Object(s.jsxs)(u.a,{children:[Object(s.jsxs)(j.a,{children:[Object(s.jsx)(j.a.Section,{href:"#/",children:"In\xedcio"}),Object(s.jsx)(j.a.Divider,{icon:"right angle"}),Object(s.jsx)(j.a.Section,{active:!0,children:"D\xedvidas"})]}),Object(s.jsx)("div",{className:"small-margin-top text-right",children:Object(s.jsx)(b.a,{onClick:function(){return Q(!0)},children:"Nova d\xedvida"})}),Object(s.jsx)("div",{children:Object(s.jsx)(O.a,{onSubmit:function(){return B.setState({page:1},(function(){return B.getPlaces()}))},children:Object(s.jsx)(O.a.Group,{children:Object(s.jsx)(O.a.Field,{id:"form-input-control-last-name",control:h.a,width:6,label:"Ordena\xe7\xe3o",selection:!0,search:!0,disabled:a,options:L,value:U,onChange:function(e,t){var a=t.value;return W(a)}})})})}),!a&&Object(s.jsx)("div",{className:"text-right",children:Object(s.jsxs)("small",{children:[S," resultados."]})}),Object(s.jsxs)(o.a,{padded:"very",children:[Object(s.jsx)(o.a.Header,{children:Object(s.jsxs)(o.a.Row,{children:[Object(s.jsx)(o.a.HeaderCell,{children:"Nome"}),Object(s.jsx)(o.a.HeaderCell,{children:"Data de cria\xe7\xe3o"}),Object(s.jsx)(o.a.HeaderCell,{children:"Motivo"}),Object(s.jsx)(o.a.HeaderCell,{children:"Data da d\xedvida"}),Object(s.jsx)(o.a.HeaderCell,{children:"Valor"}),Object(s.jsx)(o.a.HeaderCell,{children:"A\xe7\xf5es"})]})}),Object(s.jsx)(o.a.Body,{children:C.map((function(e){return ee(e)}))})]}),Object(s.jsx)(f.a,{defaultActivePage:I,disabled:a,onPageChange:function(e,t){var a=t.activePage;P(a)},totalPages:H}),Object(s.jsx)(J,{debt:Y,isOpened:K,onClose:function(){m(!p),Z({}),Q(!1)}})]})},W=function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(i.c,{children:Object(s.jsx)(i.a,{path:"/dividas",component:U,exact:!0})})})};var $=function(){return Object(s.jsx)(i.c,{children:Object(s.jsx)(i.a,{path:"/",render:function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"general-container",children:Object(s.jsx)(i.a,{path:"/dividas",exact:!0,component:W})})})}})})},z=a(91);a(223);c.a.render(Object(s.jsx)(z.a,{children:Object(s.jsx)($,{})}),document.getElementById("root"))}},[[224,1,2]]]);
//# sourceMappingURL=main.5449b843.chunk.js.map