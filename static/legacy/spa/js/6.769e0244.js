(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"5ccb":function(t,e,n){"use strict";var a=n("7e27"),i=n.n(a);i.a},"6a1b":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",[n("q-table",{staticClass:"my-sticky-header-table",attrs:{title:"Группа",dense:"",data:t.data,columns:t.columns,"row-key":"id",flat:"",bordered:"",separator:"cell",pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"top",fn:function(){return[n("div",{staticClass:"col-12 flex"},[n("q-btn",{attrs:{push:"",color:"primary",label:"Показать фильтры"},on:{click:function(e){t.showFilters=!0}}}),n("q-dialog",{attrs:{"full-height":"",breakpoint:600},model:{value:t.showFilters,callback:function(e){t.showFilters=e},expression:"showFilters"}},[n("div",{staticClass:"q-pa-lg bg-white"},[n("p",{staticClass:"text-h5 text-center"},[t._v("Фильтры")]),n("div",{staticClass:"row q-col-gutter-lg justify-around"},[n("div",{staticClass:"col-auto",staticStyle:{width:"350px"}},[n("q-input",{attrs:{filled:"",mask:"##.##.####",label:"От","fill-mask":""},scopedSlots:t._u([{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[n("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[n("q-date",{attrs:{mask:"DD.MM.YYYY"},model:{value:t.filters.date.$gt,callback:function(e){t.$set(t.filters.date,"$gt",e)},expression:"filters.date.$gt"}})],1)],1)]},proxy:!0}]),model:{value:t.filters.date.$gt,callback:function(e){t.$set(t.filters.date,"$gt",e)},expression:"filters.date.$gt"}}),n("q-input",{attrs:{filled:"",mask:"##.##.####",label:"До","fill-mask":""},scopedSlots:t._u([{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[n("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[n("q-date",{attrs:{mask:"DD.MM.YYYY"},model:{value:t.filters.date.$lt,callback:function(e){t.$set(t.filters.date,"$lt",e)},expression:"filters.date.$lt"}})],1)],1)]},proxy:!0}]),model:{value:t.filters.date.$lt,callback:function(e){t.$set(t.filters.date,"$lt",e)},expression:"filters.date.$lt"}})],1),n("div",{staticClass:"col-auto",staticStyle:{width:"350px"}},[n("p",[n("searchable-select",{attrs:{"use-chips":"",multiple:"",filled:"",label:"Предмет",options:t.options.name},model:{value:t.filters.subject,callback:function(e){t.$set(t.filters,"subject",e)},expression:"filters.subject"}}),n("searchable-select",{attrs:{"use-chips":"",multiple:"",filled:"",label:"Тип занятия",options:t.options.type},model:{value:t.filters.type,callback:function(e){t.$set(t.filters,"type",e)},expression:"filters.type"}})],1)])])])]),n("q-space"),n("q-space"),n("q-btn",{attrs:{flat:"",icon:"sync"},on:{click:t.update}}),n("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"CSV","no-caps":""},on:{click:t.exportTable}})],1),n("div",[n("q-chip",{attrs:{removable:"",value:null!=t.filters.status,color:"primary","text-color":"white"},on:{remove:function(e){return t.removeFilter("status")}}},[t._v("\n                    "+t._s(t.filters.status)+"\n                ")])],1)]},proxy:!0},{key:"body-cell",fn:function(e){return[n("q-td",{attrs:{props:e}},[e.col.is_visit?e.value?n("q-icon",{attrs:{name:"add"}}):n("q-icon",{attrs:{name:"remove"}}):n("span",["date"==e.col.name?n("q-btn",{attrs:{icon:"more_vert",color:"primary",dense:"",round:""},on:{click:function(n){t.activeEvent=e.row.event}}}):t._e(),t._v("\n                    "+t._s(e.value)+"\n\n                ")],1)],1)]}},{key:"bottom-row",fn:function(e){return[n("q-tr",t._l(t.sum_row,(function(e){return n("q-td",[t._v("\n                    "+t._s(e)+"\n                ")])})),1)]}}])}),n("q-table",{attrs:{title:"Пропуски",data:t.dataVisitsTypes,columns:t.columnsVisitsTypes}})],1)},i=[],s=n("4db1"),r=n.n(s),l=(n("7514"),n("7f7f"),n("967e")),o=n.n(l),u=(n("96cf"),n("fa84")),c=n.n(u),d=(n("28a5"),n("bd4c")),f=n("3c89"),p=n("aaa5"),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-select",{attrs:{rules:t.rules,"use-input":!t.val&&0!=t.val,"map-options":"",dense:t.dense,multiple:t.multiple,"use-chips":t.useChips,"emit-value":"",filled:t.filled,outlined:t.outlined,label:t.label,options:t.filterOptions},on:{input:t.update,filter:t.filterFn},scopedSlots:t._u([!t.val&&0!=t.val||""==t.multiple?null:{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"fa fa-times"},on:{click:function(e){return e.stopPropagation(),t.clear(e)}}})]},proxy:!0}],null,!0),model:{value:t.val,callback:function(e){t.val=e},expression:"val"}})},m=[],h=(n("20d6"),{name:"searchableSelect",props:["value","label","options","dense","clearable","filled","outlined","multiple","useChips","canAdd","rules"],data:function(){return{val:this.value,filterOptions:this.options}},methods:{filterFn:function(t,e){var n=this;e((function(){if(""===t)n.filterOptions=n.options.filter((function(t){return"add_new_value_id_mark"!=t.value})),n.canAdd&&n.filterOptions.push({value:"add_new_value_id_mark",label:"Добавить"});else{var e=t.toLowerCase();n.options[0];n.filterOptions=n.options.filter((function(t){return(t.value+t.label).toLowerCase().indexOf(e)>-1}))}}))},clear:function(){this.val=null,this.update()},update:function(){if(this.multiple||""===this.multiple){var t=this.val.findIndex((function(t){return"add_new_value_id_mark"===t}));-1!=t&&(this.val.splice(t,1),this.$emit("add"))}else"add_new_value_id_mark"===this.val&&(this.val="",this.$emit("add"));if(this.multiple||""===this.multiple){var e=this.val.findIndex((function(t){return"add_new_value_id_mark"===t}));-1!==e&&(this.val.splice(e,1),this.$emit("add"))}this.$emit("input",this.val)}},mounted:function(){}}),b=h,g=n("2877"),y=n("ddd8"),_=n("0016"),w=n("eebe"),k=n.n(w),x=Object(g["a"])(b,v,m,!1,null,null,null),$=x.exports;k()(x,"components",{QSelect:y["a"],QIcon:_["a"]});var q=n("b275"),E=(n("758b"),n("a357"));function j(t){var e,n,a={},i=[];for(e=0;n=t[e];e++)a[n]=1;for(n in a)i.push(n);return i}function C(t){return t&&10===t.length?new Date(t.split(".").reverse().join("-")):null}function D(t,e){var n=void 0!==e?e(t):t;return n=void 0===n||null===n?"":String(n),n=n.split('"').join('""'),'"'.concat(n,'"')}var S={name:"Table",components:{Event:q["a"],AddEvent:f["a"],EditEvent:p["a"],SearchableSelect:$},data:function(){return{activeEvent:null,events:{data:[]},students:[],showFilters:!1,filters:{date:{$lt:d["b"].formatDate(new Date,"DD.MM.YYYY")},subject:[],type:[]},pagination:{sortBy:"desc",descending:!1,page:1,rowsPerPage:10}}},methods:{update:function(){var t=this;return c()(o.a.mark((function e(){var n;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/group/events/visits");case 2:n=e.sent,n.data&&(t.events.data=n.data);case 4:case"end":return e.stop()}}),e)})))()},updateStudents:function(){var t=this;return c()(o.a.mark((function e(){var n;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/group/students").catch();case 2:n=e.sent,n.data&&(t.students=n.data);case 4:case"end":return e.stop()}}),e)})))()},exportTable:function(){var t=this,e=[this.columns.map((function(t){return D(t.label)})).join(";")].concat(this.data.map((function(e){return t.columns.map((function(t){return D("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format)})).join(";")}))).join("\r\n"),n=Object(E["a"])("table-export.csv",e,"text/csv;charset=windows-1251");!0!==n&&this.$q.notify({message:"Браузер отклонил загрузку файла...",color:"negative",icon:"warning"})}},computed:{filteredEvents:function(){var t=this;return this.events.data.filter((function(e){var n=!0;return["subject","type"].forEach((function(a){t.filters[a].length&&!t.filters[a].find((function(t){return t==e[a]}))&&(n=!1)})),n=n&&(!C(t.filters.date.$gt)||new Date(e.date)>C(t.filters.date.$gt))&&(!C(t.filters.date.$lt)||new Date(e.date)<C(t.filters.date.$lt)),n}))},isLeader:function(){return this.$store.getters["user/isLeader"]},date:function(){return d["b"]},columns:function(){return[{name:"date",align:"left",label:"Дата",field:"date",sortable:!0,format:function(t){return d["b"].formatDate(t,"DD.MM HH:mm")}},{name:"name",align:"left",label:"Предмет",field:"subject",sortable:!1,format:function(t){return null===t||void 0===t?void 0:t.substr(0,20)}},{name:"type",align:"left",label:"Тип",field:"type",sortable:!1,format:function(t){return t.substr(0,3)}}].concat(r()(this.students.sort((function(t,e){return t.contingent.surname<e.contingent.surname?-1:1})).map((function(t){return{name:"user_"+t.id,align:"center",label:t.contingent.surname,field:"user_"+t.id,sortable:!1,is_visit:!0}}))))},data:function(){return this.filteredEvents.map((function(t){var e={date:t.date,subject:t.subject,type:t.type,event:t};return console.log(t.visits),t.visits.forEach((function(t){e["user_".concat(t.userId)]=1})),e}))},sum_row:function(){var t=this;return["Всего","".concat(this.data.length," занятий"),""].concat(r()(this.students.map((function(e){var n=0;t.data.forEach((function(t){t["user_".concat(e.id)]&&n++}));var a=0;return t.data.length&&(a=parseInt(n/t.data.length*100)),"".concat(n," (").concat(a,"%)")}))))},options:function(){return{name:j(this.filteredEvents.map((function(t){return t.subject}))),type:j(this.filteredEvents.map((function(t){return t.type})))}},dataVisitsTypes:function(){var t=this,e=this.options.type,n=e.map((function(e){return t.filteredEvents.filter((function(t){return t.type==e})).length}));return this.students.map((function(a){var i={id:a.id,name:a.contingent.surname+" "+a.contingent.name};return e.forEach((function(e,s){var r=0;t.filteredEvents.filter((function(t){return t.type==e})).forEach((function(t){t.visits.find((function(t){return t.userId==a.id}))&&r++})),i[e]={missing:n[s]-r,count:r,all:n[s]}})),i}))},columnsVisitsTypes:function(){return[{name:"name",align:"left",label:"ФИО",field:"name",sortable:!0}].concat(r()(this.options.type.map((function(t){return{name:t,align:"right",label:t,field:t,format:function(t){return t.missing}}}))))}},created:function(){this.update(),this.updateStudents()},destroyed:function(){clearInterval(this.timer)}},Q=S,Y=(n("5ccb"),n("9989")),T=n("eaac"),I=n("9c40"),O=n("24e8"),F=n("27f9"),M=n("7cbe"),P=n("52ee"),V=n("2c91"),L=n("b047"),A=n("db86"),B=n("bd08"),H=Object(g["a"])(Q,a,i,!1,null,null,null);e["default"]=H.exports;k()(H,"components",{QPage:Y["a"],QTable:T["a"],QBtn:I["a"],QDialog:O["a"],QInput:F["a"],QIcon:_["a"],QPopupProxy:M["a"],QDate:P["a"],QSpace:V["a"],QChip:L["a"],QTd:A["a"],QTr:B["a"]})},"7e27":function(t,e,n){}}]);