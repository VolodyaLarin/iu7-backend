(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"08d6":function(t,e,a){"use strict";var r=a("6b1d"),c=a.n(r);c.a},"6b1d":function(t,e,a){},"73f8":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[t.subjects.length?a("q-tabs",{model:{value:t.activeSubject,callback:function(e){t.activeSubject=e},expression:"activeSubject"}},t._l(t.subjects,(function(t){return a("q-tab",{key:t,attrs:{"no-caps":"",name:t,label:t}})})),1):a("q-skeleton",{attrs:{type:"QToolbar"}}),a("div",{staticClass:"q-px-md flex justify-around flex-wrap"},[t.activeSubject?t._e():a("div",{staticClass:"flex-center flex"},[a("q-card",{staticStyle:{"max-width":"400px"}},[a("img",{attrs:{src:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fw-dog.ru%2Fwallpapers%2F1%2F42%2F371281208699757%2Fkamera-zenit-kot.jpg&f=1&nofb=1"}}),a("q-list",[a("q-item",[a("q-item-section",[a("q-item-label",[t._v("Записи лекций")]),a("q-item-label",{attrs:{caption:""}},[t._v("Выберите выше нужный предмет")])],1)],1)],1)],1)],1),t.subjects.length&&!t.loaded?a("q-spinner",{attrs:{color:"primary",size:"3em"}}):t._l(t.records,(function(t){return a("Record",{key:t.id,staticClass:"q-my-lg",staticStyle:{"max-width":"400px"},attrs:{record:t}})}))],2)],1)},c=[],s=a("967e"),n=a.n(s),o=(a("96cf"),a("fa84")),i=a.n(o),l=a("bd4c"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{attrs:{bordered:""}},[a("q-card-section",{staticClass:"flex flex-column justify-between full-height"},[t.record.theme?a("div",{staticClass:"text-h6 q-mb-md"},[t._v(t._s(t.record.theme))]):a("div",{staticClass:"text-h6 q-mb-md"},[t._v("\n            "+t._s(t.record.type)+" от "+t._s(t.date.formatDate(t.record.date,"DD.MM.YYYY"))+"\n        ")]),a("q-list",[t.record.speaker?a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"person"}})],1),a("q-item-section",[a("q-item-label",[t._v(" "+t._s(t.record.speaker))]),a("q-item-label",{attrs:{caption:""}},[t._v("Спикер")])],1)],1):t._e(),t.record.type?a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"pets"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.record.type))]),a("q-item-label",{attrs:{caption:""}},[t._v("Тип записи")])],1)],1):t._e(),a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"schedule"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.date.formatDate(t.record.date,"DD.MM.YYYY")))]),a("q-item-label",{attrs:{caption:""}},[t._v("Дата лекции")])],1)],1),a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"group"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.record.group.split(";").join(" ")))]),a("q-item-label",{attrs:{caption:""}},[t._v("Группы")])],1)],1)],1),a("q-btn",{staticClass:"full-width",attrs:{color:"accent"},on:{click:function(e){t.showContent=!0}}},[t._v("Открыть видео")])],1),a("q-dialog",{attrs:{persistent:"","full-height":"","full-width":""},model:{value:t.showContent,callback:function(e){t.showContent=e},expression:"showContent"}},[a("q-card",{staticClass:"full-height"},[a("q-bar",[a("div",[t._v(t._s(t.date.formatDate(t.record.date,"DD.MM.YYYY"))+" "+t._s(t.record.type)+" - "+t._s(t.record.subject)+" -\n                    "+t._s(t.record.theme)+"\n                ")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[a("q-tooltip",[t._v("Close")])],1)],1),a("div",{staticClass:"full-height full-height_polifill"},[a("iframe",{staticClass:"full-width full-height",attrs:{src:t.record.body,frameborder:"0",allowfullscreen:"",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}})])],1)],1)],1)},u=[],p={name:"Record",data:function(){return{showContent:!1}},props:["record"],computed:{date:function(){return l["b"]}}},m=p,b=(a("08d6"),a("2877")),f=a("f09f"),q=a("a370"),v=a("1c1c"),h=a("66e5"),_=a("4074"),w=a("0016"),x=a("0170"),j=a("9c40"),g=a("24e8"),Q=a("d847"),y=a("2c91"),C=a("05c0"),k=a("7f67"),S=a("eebe"),Y=a.n(S),D=Object(b["a"])(m,d,u,!1,null,null,null),I=D.exports;Y()(D,"components",{QCard:f["a"],QCardSection:q["a"],QList:v["a"],QItem:h["a"],QItemSection:_["a"],QIcon:w["a"],QItemLabel:x["a"],QBtn:j["a"],QDialog:g["a"],QBar:Q["a"],QSpace:y["a"],QTooltip:C["a"]}),Y()(D,"directives",{ClosePopup:k["a"]});var F={name:"Index",components:{Record:I},data:function(){return{activeSubject:null,subjects:[],records:[],loaded:!1}},methods:{updateSubjects:function(){var t=this;return i()(n.a.mark((function e(){var a;return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$axios("group/records/subjects");case 2:a=e.sent,t.subjects=a.data,t.loaded=!0;case 5:case"end":return e.stop()}}),e)})))()},updateRecords:function(){var t=this;return i()(n.a.mark((function e(){var a;return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.activeSubject){e.next=2;break}return e.abrupt("return",t.records=[]);case 2:return e.next=4,t.$axios("group/records/subject/".concat(t.activeSubject));case 4:a=e.sent,t.records=a.data.data,t.loaded=!0;case 7:case"end":return e.stop()}}),e)})))()}},computed:{isLeader:function(){return this.$store.getters["user/isLeader"]},date:function(){return l["b"]}},created:function(){this.updateSubjects()},watch:{activeSubject:function(){this.loaded=!1,this.updateRecords()}}},L=F,M=a("9989"),R=a("429b"),$=a("7460"),T=a("293e"),z=a("0d59"),B=Object(b["a"])(L,r,c,!1,null,"1a2a9320",null);e["default"]=B.exports;Y()(B,"components",{QPage:M["a"],QTabs:R["a"],QTab:$["a"],QSkeleton:T["a"],QCard:f["a"],QList:v["a"],QItem:h["a"],QItemSection:_["a"],QItemLabel:x["a"],QSpinner:z["a"]})}}]);