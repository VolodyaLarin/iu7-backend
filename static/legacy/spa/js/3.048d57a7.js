(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"16c0":function(t,e,a){},"17af":function(t,e,a){"use strict";var s=a("16c0"),r=a.n(s);r.a},"2fde":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.user.auth?a("q-page",{staticClass:"q-pa-lg"},[a("div",[a("q-card",[a("q-item",[a("q-item-section",[a("q-item-label",[t.post.loaded?a("h1",[t._v(t._s(t.post.data.title))]):a("q-skeleton",{attrs:{type:"text"}}),t.isModerator?a("q-btn",{attrs:{icon:"edit",color:"primary",label:"Редактировать",to:"/moderator/posts/"+t.post.data.id}}):t._e()],1)],1)],1),t.post.loaded?a("q-card-section",{staticClass:"post-data"},[a("VueMarkdown",{attrs:{source:t.post.data.body,toc:!0,watches:["source"]}})],1):a("q-skeleton",{attrs:{height:"200px",square:""}}),t.post.loaded?a("q-card-actions",[t.post.data.files.length?a("q-list",[a("q-item-label",{attrs:{header:""}},[t._v("Прикрепленные файлы:")]),t._l(t.post.data.files,(function(e){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:"",to:t.fileUrl(e)}},[a("q-item-section",{attrs:{avatar:"",top:""}},[a("q-avatar",{attrs:{icon:"assignment",color:"grey","text-color":"white"}})],1),a("q-item-section",[a("q-item-label",{attrs:{lines:"1"}},[t._v(t._s(e.name))]),a("q-item-label",{attrs:{caption:""}},[t._v("Тип файла: "+t._s(e.type)+", объём:\n                                "+t._s(Math.round(e.size/10.24)/100)+" КБ\n                            ")])],1)],1)}))],2):t._e(),t._e()],1):a("q-card-actions",{staticClass:"q-gutter-md",attrs:{align:"right"}},[a("q-skeleton",{attrs:{type:"QBtn"}}),a("q-skeleton",{attrs:{type:"QBtn"}})],1)],1),a("q-drawer",{attrs:{side:"right",bordered:"",width:200,breakpoint:500,"content-class":"bg-grey-3"},model:{value:t.drawerRight,callback:function(e){t.drawerRight=e},expression:"drawerRight"}},[a("q-scroll-area",{staticClass:"fit"},[t._m(0)])],1)],1)]):a("q-page",{staticClass:"flex flex-center"},[a("div",{staticClass:"column"},[a("div",{staticClass:"text-center"},[a("q-btn",{attrs:{icon:"security",color:"primary",size:"large",round:"",to:"/login"}})],1),a("span",{staticClass:"q-mt-md"},[t._v("Сначала авторизируйтесь")])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"boom"}})}],n=a("967e"),o=a.n(n),i=(a("96cf"),a("fa84")),c=a.n(i),l=a("bd4c"),d=(a("c197"),a("9ce6")),u=a.n(d),p=(a("f417"),{name:"Post",data:function(){return{post:{loaded:!1,data:{}},drawerRight:!0}},methods:{updatePost:function(){var t=this;return c()(o.a.mark((function e(){var a;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.post.loaded=!1,e.next=3,t.$axios("/posts/".concat(t.postId)).catch((function(){}));case 3:return a=e.sent,t.post.loaded=!0,t.post.data=a.data.data,e.next=8,t.$nextTick();case 8:return t.toc=!0,e.next=11,t.$nextTick();case 11:case"end":return e.stop()}}),e)})))()},fileUrl:function(t){return{name:"file",params:{file:t.id}}}},mounted:function(){this.updatePost()},computed:{postId:function(){return this.$route.params.post},date:function(){return l["b"]},user:function(){return this.$store.state.user},isModerator:function(){return this.$store.getters["user/isModerator"]}},watch:{postId:function(){this.updatePost()}},components:{VueMarkdown:u.a}}),f=p,m=(a("17af"),a("2877")),h=a("9989"),q=a("f09f"),b=a("66e5"),v=a("4074"),w=a("0170"),g=a("293e"),_=a("9c40"),k=a("a370"),x=a("4b7e"),Q=a("1c1c"),C=a("cb32"),y=a("9404"),$=a("4983"),I=a("714f"),M=a("eebe"),P=a.n(M),R=Object(m["a"])(f,s,r,!1,null,null,null);e["default"]=R.exports;P()(R,"components",{QPage:h["a"],QCard:q["a"],QItem:b["a"],QItemSection:v["a"],QItemLabel:w["a"],QSkeleton:g["a"],QBtn:_["a"],QCardSection:k["a"],QCardActions:x["a"],QList:Q["a"],QAvatar:C["a"],QDrawer:y["a"],QScrollArea:$["a"]}),P()(R,"directives",{Ripple:I["a"]})}}]);