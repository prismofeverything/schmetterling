goog.provide('domina');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('goog.style');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_5068 = cljs.core.PersistentVector.fromArray([1,"<select multiple='multiple'>","</select>"], true);var table_section_wrapper_5069 = cljs.core.PersistentVector.fromArray([1,"<table>","</table>"], true);var cell_wrapper_5070 = cljs.core.PersistentVector.fromArray([3,"<table><tbody><tr>","</tr></tbody></table>"], true);domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["col",new cljs.core.Keyword(null,"default","default",2558708147),"tfoot","caption","optgroup","legend","area","td","thead","th","option","tbody","tr","colgroup"],[cljs.core.PersistentVector.fromArray([2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], true),cljs.core.PersistentVector.fromArray([0,"",""], true),table_section_wrapper_5069,table_section_wrapper_5069,opt_wrapper_5068,cljs.core.PersistentVector.fromArray([1,"<fieldset>","</fieldset>"], true),cljs.core.PersistentVector.fromArray([1,"<map>","</map>"], true),cell_wrapper_5070,table_section_wrapper_5069,cell_wrapper_5070,opt_wrapper_5068,table_section_wrapper_5069,cljs.core.PersistentVector.fromArray([2,"<table><tbody>","</tbody></table>"], true),table_section_wrapper_5069]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));var tbody = (((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,tag_name,"table");if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?(function (){var and__3941__auto__ = div.firstChild;if(cljs.core.truth_(and__3941__auto__))
{return div.firstChild.childNodes;
} else
{return and__3941__auto__;
}
})():(((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,start_wrap,"<table>");if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?divchildNodes:cljs.core.PersistentVector.EMPTY));var seq__5075 = cljs.core.seq.call(null,tbody);var chunk__5076 = null;var count__5077 = 0;var i__5078 = 0;while(true){
if((i__5078 < count__5077))
{var child = cljs.core._nth.call(null,chunk__5076,i__5078);if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__5079 = seq__5075;
var G__5080 = chunk__5076;
var G__5081 = count__5077;
var G__5082 = (i__5078 + 1);
seq__5075 = G__5079;
chunk__5076 = G__5080;
count__5077 = G__5081;
i__5078 = G__5082;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5075);if(temp__4092__auto__)
{var seq__5075__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5075__$1))
{var c__3600__auto__ = cljs.core.chunk_first.call(null,seq__5075__$1);{
var G__5083 = cljs.core.chunk_rest.call(null,seq__5075__$1);
var G__5084 = c__3600__auto__;
var G__5085 = cljs.core.count.call(null,c__3600__auto__);
var G__5086 = 0;
seq__5075 = G__5083;
chunk__5076 = G__5084;
count__5077 = G__5085;
i__5078 = G__5086;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__5075__$1);if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__5087 = cljs.core.next.call(null,seq__5075__$1);
var G__5088 = null;
var G__5089 = 0;
var G__5090 = 0;
seq__5075 = G__5087;
chunk__5076 = G__5088;
count__5077 = G__5089;
i__5078 = G__5090;
continue;
}
}
} else
{return null;
}
}
break;
}
});
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();var vec__5092 = cljs.core.get.call(null,domina.wrap_map,tag_name,new cljs.core.Keyword(null,"default","default",2558708147).call(null,domina.wrap_map));var depth = cljs.core.nth.call(null,vec__5092,0,null);var start_wrap = cljs.core.nth.call(null,vec__5092,1,null);var end_wrap = cljs.core.nth.call(null,vec__5092,2,null);var div = (function (){var wrapper = (function (){var div = document.createElement("div");div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();var level = depth;while(true){
if((level > 0))
{{
var G__5093 = wrapper.lastChild;
var G__5094 = (level - 1);
wrapper = G__5093;
level = G__5094;
continue;
}
} else
{return wrapper;
}
break;
}
})();if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3941__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);if(and__3941__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3941__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = {};
domina.nodes = (function nodes(content){if((function (){var and__3941__auto__ = content;if(and__3941__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3941__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__3469__auto__ = (((content == null))?null:content);return (function (){var or__3943__auto__ = (domina.nodes[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.nodes["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){if((function (){var and__3941__auto__ = nodeseq;if(and__3941__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3941__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__3469__auto__ = (((nodeseq == null))?null:nodeseq);return (function (){var or__3943__auto__ = (domina.single_node[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.single_node["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){if(cljs.core.truth_((function (){var and__3941__auto__ = domina._STAR_debug_STAR_;if(cljs.core.truth_(and__3941__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3941__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return log_debug__delegate.call(this,mesg);};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__5095){
var mesg = cljs.core.seq(arglist__5095);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return log__delegate.call(this,mesg);};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__5096){
var mesg = cljs.core.seq(arglist__5096);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,class_name)));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return common_ancestor__delegate.call(this,contents);};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__5097){
var contents = cljs.core.seq(arglist__5097);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){return cljs.core.map.call(null,(function (p1__5098_SHARP_){return p1__5098_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){domina.apply_with_cloning.call(null,(function (p1__5099_SHARP_,p2__5100_SHARP_){return goog.dom.insertChildAt(p1__5099_SHARP_,p2__5100_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){domina.insert_BANG_.call(null,parent_content,child_content,0);
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__5102_SHARP_,p2__5101_SHARP_){return goog.dom.insertSiblingBefore(p2__5101_SHARP_,p1__5102_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__5104_SHARP_,p2__5103_SHARP_){return goog.dom.insertSiblingAfter(p2__5103_SHARP_,p1__5104_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){domina.apply_with_cloning.call(null,(function (p1__5106_SHARP_,p2__5105_SHARP_){return goog.dom.replaceNode(p2__5105_SHARP_,p1__5106_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){var seq__5111_5115 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5112_5116 = null;var count__5113_5117 = 0;var i__5114_5118 = 0;while(true){
if((i__5114_5118 < count__5113_5117))
{var n_5119 = cljs.core._nth.call(null,chunk__5112_5116,i__5114_5118);goog.style.setStyle(n_5119,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5120 = seq__5111_5115;
var G__5121 = chunk__5112_5116;
var G__5122 = count__5113_5117;
var G__5123 = (i__5114_5118 + 1);
seq__5111_5115 = G__5120;
chunk__5112_5116 = G__5121;
count__5113_5117 = G__5122;
i__5114_5118 = G__5123;
continue;
}
} else
{var temp__4092__auto___5124 = cljs.core.seq.call(null,seq__5111_5115);if(temp__4092__auto___5124)
{var seq__5111_5125__$1 = temp__4092__auto___5124;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5111_5125__$1))
{var c__3600__auto___5126 = cljs.core.chunk_first.call(null,seq__5111_5125__$1);{
var G__5127 = cljs.core.chunk_rest.call(null,seq__5111_5125__$1);
var G__5128 = c__3600__auto___5126;
var G__5129 = cljs.core.count.call(null,c__3600__auto___5126);
var G__5130 = 0;
seq__5111_5115 = G__5127;
chunk__5112_5116 = G__5128;
count__5113_5117 = G__5129;
i__5114_5118 = G__5130;
continue;
}
} else
{var n_5131 = cljs.core.first.call(null,seq__5111_5125__$1);goog.style.setStyle(n_5131,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5132 = cljs.core.next.call(null,seq__5111_5125__$1);
var G__5133 = null;
var G__5134 = 0;
var G__5135 = 0;
seq__5111_5115 = G__5132;
chunk__5112_5116 = G__5133;
count__5113_5117 = G__5134;
i__5114_5118 = G__5135;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return set_style_BANG___delegate.call(this,content,name,value);};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__5136){
var content = cljs.core.first(arglist__5136);
arglist__5136 = cljs.core.next(arglist__5136);
var name = cljs.core.first(arglist__5136);
var value = cljs.core.rest(arglist__5136);
return set_style_BANG___delegate(content,name,value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){var seq__5141_5145 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5142_5146 = null;var count__5143_5147 = 0;var i__5144_5148 = 0;while(true){
if((i__5144_5148 < count__5143_5147))
{var n_5149 = cljs.core._nth.call(null,chunk__5142_5146,i__5144_5148);n_5149.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5150 = seq__5141_5145;
var G__5151 = chunk__5142_5146;
var G__5152 = count__5143_5147;
var G__5153 = (i__5144_5148 + 1);
seq__5141_5145 = G__5150;
chunk__5142_5146 = G__5151;
count__5143_5147 = G__5152;
i__5144_5148 = G__5153;
continue;
}
} else
{var temp__4092__auto___5154 = cljs.core.seq.call(null,seq__5141_5145);if(temp__4092__auto___5154)
{var seq__5141_5155__$1 = temp__4092__auto___5154;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5141_5155__$1))
{var c__3600__auto___5156 = cljs.core.chunk_first.call(null,seq__5141_5155__$1);{
var G__5157 = cljs.core.chunk_rest.call(null,seq__5141_5155__$1);
var G__5158 = c__3600__auto___5156;
var G__5159 = cljs.core.count.call(null,c__3600__auto___5156);
var G__5160 = 0;
seq__5141_5145 = G__5157;
chunk__5142_5146 = G__5158;
count__5143_5147 = G__5159;
i__5144_5148 = G__5160;
continue;
}
} else
{var n_5161 = cljs.core.first.call(null,seq__5141_5155__$1);n_5161.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5162 = cljs.core.next.call(null,seq__5141_5155__$1);
var G__5163 = null;
var G__5164 = 0;
var G__5165 = 0;
seq__5141_5145 = G__5162;
chunk__5142_5146 = G__5163;
count__5143_5147 = G__5164;
i__5144_5148 = G__5165;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return set_attr_BANG___delegate.call(this,content,name,value);};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__5166){
var content = cljs.core.first(arglist__5166);
arglist__5166 = cljs.core.next(arglist__5166);
var name = cljs.core.first(arglist__5166);
var value = cljs.core.rest(arglist__5166);
return set_attr_BANG___delegate(content,name,value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){var seq__5171_5175 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5172_5176 = null;var count__5173_5177 = 0;var i__5174_5178 = 0;while(true){
if((i__5174_5178 < count__5173_5177))
{var n_5179 = cljs.core._nth.call(null,chunk__5172_5176,i__5174_5178);n_5179.removeAttribute(cljs.core.name.call(null,name));
{
var G__5180 = seq__5171_5175;
var G__5181 = chunk__5172_5176;
var G__5182 = count__5173_5177;
var G__5183 = (i__5174_5178 + 1);
seq__5171_5175 = G__5180;
chunk__5172_5176 = G__5181;
count__5173_5177 = G__5182;
i__5174_5178 = G__5183;
continue;
}
} else
{var temp__4092__auto___5184 = cljs.core.seq.call(null,seq__5171_5175);if(temp__4092__auto___5184)
{var seq__5171_5185__$1 = temp__4092__auto___5184;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5171_5185__$1))
{var c__3600__auto___5186 = cljs.core.chunk_first.call(null,seq__5171_5185__$1);{
var G__5187 = cljs.core.chunk_rest.call(null,seq__5171_5185__$1);
var G__5188 = c__3600__auto___5186;
var G__5189 = cljs.core.count.call(null,c__3600__auto___5186);
var G__5190 = 0;
seq__5171_5175 = G__5187;
chunk__5172_5176 = G__5188;
count__5173_5177 = G__5189;
i__5174_5178 = G__5190;
continue;
}
} else
{var n_5191 = cljs.core.first.call(null,seq__5171_5185__$1);n_5191.removeAttribute(cljs.core.name.call(null,name));
{
var G__5192 = cljs.core.next.call(null,seq__5171_5185__$1);
var G__5193 = null;
var G__5194 = 0;
var G__5195 = 0;
seq__5171_5175 = G__5192;
chunk__5172_5176 = G__5193;
count__5173_5177 = G__5194;
i__5174_5178 = G__5195;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){return cljs.core.reduce.call(null,(function (acc,pair){var vec__5197 = pair.split(/\s*:\s*/);var k = cljs.core.nth.call(null,vec__5197,0,null);var v = cljs.core.nth.call(null,vec__5197,1,null);if(cljs.core.truth_((function (){var and__3941__auto__ = k;if(cljs.core.truth_(and__3941__auto__))
{return v;
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){var style = domina.attr.call(null,content,"style");if(typeof style === 'string')
{return domina.parse_style_attributes.call(null,style);
} else
{if((style == null))
{return cljs.core.PersistentArrayMap.EMPTY;
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.PersistentArrayMap.EMPTY;
} else
{return null;
}
}
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){var node = domina.single_node.call(null,content);var attrs__$1 = node.attributes;return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__5198_SHARP_){var attr = attrs__$1.item(p1__5198_SHARP_);var value = attr.nodeValue;if((function (){var and__3941__auto__ = cljs.core.not_EQ_.call(null,null,value);if(and__3941__auto__)
{return cljs.core.not_EQ_.call(null,"",value);
} else
{return and__3941__auto__;
}
})())
{return cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){var seq__5205_5211 = cljs.core.seq.call(null,styles);var chunk__5206_5212 = null;var count__5207_5213 = 0;var i__5208_5214 = 0;while(true){
if((i__5208_5214 < count__5207_5213))
{var vec__5209_5215 = cljs.core._nth.call(null,chunk__5206_5212,i__5208_5214);var name_5216 = cljs.core.nth.call(null,vec__5209_5215,0,null);var value_5217 = cljs.core.nth.call(null,vec__5209_5215,1,null);domina.set_style_BANG_.call(null,content,name_5216,value_5217);
{
var G__5218 = seq__5205_5211;
var G__5219 = chunk__5206_5212;
var G__5220 = count__5207_5213;
var G__5221 = (i__5208_5214 + 1);
seq__5205_5211 = G__5218;
chunk__5206_5212 = G__5219;
count__5207_5213 = G__5220;
i__5208_5214 = G__5221;
continue;
}
} else
{var temp__4092__auto___5222 = cljs.core.seq.call(null,seq__5205_5211);if(temp__4092__auto___5222)
{var seq__5205_5223__$1 = temp__4092__auto___5222;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5205_5223__$1))
{var c__3600__auto___5224 = cljs.core.chunk_first.call(null,seq__5205_5223__$1);{
var G__5225 = cljs.core.chunk_rest.call(null,seq__5205_5223__$1);
var G__5226 = c__3600__auto___5224;
var G__5227 = cljs.core.count.call(null,c__3600__auto___5224);
var G__5228 = 0;
seq__5205_5211 = G__5225;
chunk__5206_5212 = G__5226;
count__5207_5213 = G__5227;
i__5208_5214 = G__5228;
continue;
}
} else
{var vec__5210_5229 = cljs.core.first.call(null,seq__5205_5223__$1);var name_5230 = cljs.core.nth.call(null,vec__5210_5229,0,null);var value_5231 = cljs.core.nth.call(null,vec__5210_5229,1,null);domina.set_style_BANG_.call(null,content,name_5230,value_5231);
{
var G__5232 = cljs.core.next.call(null,seq__5205_5223__$1);
var G__5233 = null;
var G__5234 = 0;
var G__5235 = 0;
seq__5205_5211 = G__5232;
chunk__5206_5212 = G__5233;
count__5207_5213 = G__5234;
i__5208_5214 = G__5235;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified attributes for each node in the content, given a map of names and values. Names may be a string or keyword. Values will be cast to a string, multiple values wil be concatenated.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){var seq__5242_5248 = cljs.core.seq.call(null,attrs);var chunk__5243_5249 = null;var count__5244_5250 = 0;var i__5245_5251 = 0;while(true){
if((i__5245_5251 < count__5244_5250))
{var vec__5246_5252 = cljs.core._nth.call(null,chunk__5243_5249,i__5245_5251);var name_5253 = cljs.core.nth.call(null,vec__5246_5252,0,null);var value_5254 = cljs.core.nth.call(null,vec__5246_5252,1,null);domina.set_attr_BANG_.call(null,content,name_5253,value_5254);
{
var G__5255 = seq__5242_5248;
var G__5256 = chunk__5243_5249;
var G__5257 = count__5244_5250;
var G__5258 = (i__5245_5251 + 1);
seq__5242_5248 = G__5255;
chunk__5243_5249 = G__5256;
count__5244_5250 = G__5257;
i__5245_5251 = G__5258;
continue;
}
} else
{var temp__4092__auto___5259 = cljs.core.seq.call(null,seq__5242_5248);if(temp__4092__auto___5259)
{var seq__5242_5260__$1 = temp__4092__auto___5259;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5242_5260__$1))
{var c__3600__auto___5261 = cljs.core.chunk_first.call(null,seq__5242_5260__$1);{
var G__5262 = cljs.core.chunk_rest.call(null,seq__5242_5260__$1);
var G__5263 = c__3600__auto___5261;
var G__5264 = cljs.core.count.call(null,c__3600__auto___5261);
var G__5265 = 0;
seq__5242_5248 = G__5262;
chunk__5243_5249 = G__5263;
count__5244_5250 = G__5264;
i__5245_5251 = G__5265;
continue;
}
} else
{var vec__5247_5266 = cljs.core.first.call(null,seq__5242_5260__$1);var name_5267 = cljs.core.nth.call(null,vec__5247_5266,0,null);var value_5268 = cljs.core.nth.call(null,vec__5247_5266,1,null);domina.set_attr_BANG_.call(null,content,name_5267,value_5268);
{
var G__5269 = cljs.core.next.call(null,seq__5242_5260__$1);
var G__5270 = null;
var G__5271 = 0;
var G__5272 = 0;
seq__5242_5248 = G__5269;
chunk__5243_5249 = G__5270;
count__5244_5250 = G__5271;
i__5245_5251 = G__5272;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){var seq__5277_5281 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5278_5282 = null;var count__5279_5283 = 0;var i__5280_5284 = 0;while(true){
if((i__5280_5284 < count__5279_5283))
{var node_5285 = cljs.core._nth.call(null,chunk__5278_5282,i__5280_5284);goog.dom.classes.add(node_5285,class$);
{
var G__5286 = seq__5277_5281;
var G__5287 = chunk__5278_5282;
var G__5288 = count__5279_5283;
var G__5289 = (i__5280_5284 + 1);
seq__5277_5281 = G__5286;
chunk__5278_5282 = G__5287;
count__5279_5283 = G__5288;
i__5280_5284 = G__5289;
continue;
}
} else
{var temp__4092__auto___5290 = cljs.core.seq.call(null,seq__5277_5281);if(temp__4092__auto___5290)
{var seq__5277_5291__$1 = temp__4092__auto___5290;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5277_5291__$1))
{var c__3600__auto___5292 = cljs.core.chunk_first.call(null,seq__5277_5291__$1);{
var G__5293 = cljs.core.chunk_rest.call(null,seq__5277_5291__$1);
var G__5294 = c__3600__auto___5292;
var G__5295 = cljs.core.count.call(null,c__3600__auto___5292);
var G__5296 = 0;
seq__5277_5281 = G__5293;
chunk__5278_5282 = G__5294;
count__5279_5283 = G__5295;
i__5280_5284 = G__5296;
continue;
}
} else
{var node_5297 = cljs.core.first.call(null,seq__5277_5291__$1);goog.dom.classes.add(node_5297,class$);
{
var G__5298 = cljs.core.next.call(null,seq__5277_5291__$1);
var G__5299 = null;
var G__5300 = 0;
var G__5301 = 0;
seq__5277_5281 = G__5298;
chunk__5278_5282 = G__5299;
count__5279_5283 = G__5300;
i__5280_5284 = G__5301;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){var seq__5306_5310 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5307_5311 = null;var count__5308_5312 = 0;var i__5309_5313 = 0;while(true){
if((i__5309_5313 < count__5308_5312))
{var node_5314 = cljs.core._nth.call(null,chunk__5307_5311,i__5309_5313);goog.dom.classes.remove(node_5314,class$);
{
var G__5315 = seq__5306_5310;
var G__5316 = chunk__5307_5311;
var G__5317 = count__5308_5312;
var G__5318 = (i__5309_5313 + 1);
seq__5306_5310 = G__5315;
chunk__5307_5311 = G__5316;
count__5308_5312 = G__5317;
i__5309_5313 = G__5318;
continue;
}
} else
{var temp__4092__auto___5319 = cljs.core.seq.call(null,seq__5306_5310);if(temp__4092__auto___5319)
{var seq__5306_5320__$1 = temp__4092__auto___5319;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5306_5320__$1))
{var c__3600__auto___5321 = cljs.core.chunk_first.call(null,seq__5306_5320__$1);{
var G__5322 = cljs.core.chunk_rest.call(null,seq__5306_5320__$1);
var G__5323 = c__3600__auto___5321;
var G__5324 = cljs.core.count.call(null,c__3600__auto___5321);
var G__5325 = 0;
seq__5306_5310 = G__5322;
chunk__5307_5311 = G__5323;
count__5308_5312 = G__5324;
i__5309_5313 = G__5325;
continue;
}
} else
{var node_5326 = cljs.core.first.call(null,seq__5306_5320__$1);goog.dom.classes.remove(node_5326,class$);
{
var G__5327 = cljs.core.next.call(null,seq__5306_5320__$1);
var G__5328 = null;
var G__5329 = 0;
var G__5330 = 0;
seq__5306_5310 = G__5327;
chunk__5307_5311 = G__5328;
count__5308_5312 = G__5329;
i__5309_5313 = G__5330;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Toggles the specified CSS class from each node in the content.
*/
domina.toggle_class_BANG_ = (function toggle_class_BANG_(content,class$){var seq__5335_5339 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5336_5340 = null;var count__5337_5341 = 0;var i__5338_5342 = 0;while(true){
if((i__5338_5342 < count__5337_5341))
{var node_5343 = cljs.core._nth.call(null,chunk__5336_5340,i__5338_5342);goog.dom.classes.toggle(node_5343,class$);
{
var G__5344 = seq__5335_5339;
var G__5345 = chunk__5336_5340;
var G__5346 = count__5337_5341;
var G__5347 = (i__5338_5342 + 1);
seq__5335_5339 = G__5344;
chunk__5336_5340 = G__5345;
count__5337_5341 = G__5346;
i__5338_5342 = G__5347;
continue;
}
} else
{var temp__4092__auto___5348 = cljs.core.seq.call(null,seq__5335_5339);if(temp__4092__auto___5348)
{var seq__5335_5349__$1 = temp__4092__auto___5348;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5335_5349__$1))
{var c__3600__auto___5350 = cljs.core.chunk_first.call(null,seq__5335_5349__$1);{
var G__5351 = cljs.core.chunk_rest.call(null,seq__5335_5349__$1);
var G__5352 = c__3600__auto___5350;
var G__5353 = cljs.core.count.call(null,c__3600__auto___5350);
var G__5354 = 0;
seq__5335_5339 = G__5351;
chunk__5336_5340 = G__5352;
count__5337_5341 = G__5353;
i__5338_5342 = G__5354;
continue;
}
} else
{var node_5355 = cljs.core.first.call(null,seq__5335_5349__$1);goog.dom.classes.toggle(node_5355,class$);
{
var G__5356 = cljs.core.next.call(null,seq__5335_5349__$1);
var G__5357 = null;
var G__5358 = 0;
var G__5359 = 0;
seq__5335_5339 = G__5356;
chunk__5336_5340 = G__5357;
count__5337_5341 = G__5358;
i__5338_5342 = G__5359;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){var classes_5368__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);var seq__5364_5369 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5365_5370 = null;var count__5366_5371 = 0;var i__5367_5372 = 0;while(true){
if((i__5367_5372 < count__5366_5371))
{var node_5373 = cljs.core._nth.call(null,chunk__5365_5370,i__5367_5372);goog.dom.classes.set(node_5373,classes_5368__$1);
{
var G__5374 = seq__5364_5369;
var G__5375 = chunk__5365_5370;
var G__5376 = count__5366_5371;
var G__5377 = (i__5367_5372 + 1);
seq__5364_5369 = G__5374;
chunk__5365_5370 = G__5375;
count__5366_5371 = G__5376;
i__5367_5372 = G__5377;
continue;
}
} else
{var temp__4092__auto___5378 = cljs.core.seq.call(null,seq__5364_5369);if(temp__4092__auto___5378)
{var seq__5364_5379__$1 = temp__4092__auto___5378;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5364_5379__$1))
{var c__3600__auto___5380 = cljs.core.chunk_first.call(null,seq__5364_5379__$1);{
var G__5381 = cljs.core.chunk_rest.call(null,seq__5364_5379__$1);
var G__5382 = c__3600__auto___5380;
var G__5383 = cljs.core.count.call(null,c__3600__auto___5380);
var G__5384 = 0;
seq__5364_5369 = G__5381;
chunk__5365_5370 = G__5382;
count__5366_5371 = G__5383;
i__5367_5372 = G__5384;
continue;
}
} else
{var node_5385 = cljs.core.first.call(null,seq__5364_5379__$1);goog.dom.classes.set(node_5385,classes_5368__$1);
{
var G__5386 = cljs.core.next.call(null,seq__5364_5379__$1);
var G__5387 = null;
var G__5388 = 0;
var G__5389 = 0;
seq__5364_5369 = G__5386;
chunk__5365_5370 = G__5387;
count__5366_5371 = G__5388;
i__5367_5372 = G__5389;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){var seq__5394_5398 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5395_5399 = null;var count__5396_5400 = 0;var i__5397_5401 = 0;while(true){
if((i__5397_5401 < count__5396_5400))
{var node_5402 = cljs.core._nth.call(null,chunk__5395_5399,i__5397_5401);goog.dom.setTextContent(node_5402,value);
{
var G__5403 = seq__5394_5398;
var G__5404 = chunk__5395_5399;
var G__5405 = count__5396_5400;
var G__5406 = (i__5397_5401 + 1);
seq__5394_5398 = G__5403;
chunk__5395_5399 = G__5404;
count__5396_5400 = G__5405;
i__5397_5401 = G__5406;
continue;
}
} else
{var temp__4092__auto___5407 = cljs.core.seq.call(null,seq__5394_5398);if(temp__4092__auto___5407)
{var seq__5394_5408__$1 = temp__4092__auto___5407;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5394_5408__$1))
{var c__3600__auto___5409 = cljs.core.chunk_first.call(null,seq__5394_5408__$1);{
var G__5410 = cljs.core.chunk_rest.call(null,seq__5394_5408__$1);
var G__5411 = c__3600__auto___5409;
var G__5412 = cljs.core.count.call(null,c__3600__auto___5409);
var G__5413 = 0;
seq__5394_5398 = G__5410;
chunk__5395_5399 = G__5411;
count__5396_5400 = G__5412;
i__5397_5401 = G__5413;
continue;
}
} else
{var node_5414 = cljs.core.first.call(null,seq__5394_5408__$1);goog.dom.setTextContent(node_5414,value);
{
var G__5415 = cljs.core.next.call(null,seq__5394_5408__$1);
var G__5416 = null;
var G__5417 = 0;
var G__5418 = 0;
seq__5394_5398 = G__5415;
chunk__5395_5399 = G__5416;
count__5396_5400 = G__5417;
i__5397_5401 = G__5418;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){var seq__5423_5427 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5424_5428 = null;var count__5425_5429 = 0;var i__5426_5430 = 0;while(true){
if((i__5426_5430 < count__5425_5429))
{var node_5431 = cljs.core._nth.call(null,chunk__5424_5428,i__5426_5430);goog.dom.forms.setValue(node_5431,value);
{
var G__5432 = seq__5423_5427;
var G__5433 = chunk__5424_5428;
var G__5434 = count__5425_5429;
var G__5435 = (i__5426_5430 + 1);
seq__5423_5427 = G__5432;
chunk__5424_5428 = G__5433;
count__5425_5429 = G__5434;
i__5426_5430 = G__5435;
continue;
}
} else
{var temp__4092__auto___5436 = cljs.core.seq.call(null,seq__5423_5427);if(temp__4092__auto___5436)
{var seq__5423_5437__$1 = temp__4092__auto___5436;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5423_5437__$1))
{var c__3600__auto___5438 = cljs.core.chunk_first.call(null,seq__5423_5437__$1);{
var G__5439 = cljs.core.chunk_rest.call(null,seq__5423_5437__$1);
var G__5440 = c__3600__auto___5438;
var G__5441 = cljs.core.count.call(null,c__3600__auto___5438);
var G__5442 = 0;
seq__5423_5427 = G__5439;
chunk__5424_5428 = G__5440;
count__5425_5429 = G__5441;
i__5426_5430 = G__5442;
continue;
}
} else
{var node_5443 = cljs.core.first.call(null,seq__5423_5437__$1);goog.dom.forms.setValue(node_5443,value);
{
var G__5444 = cljs.core.next.call(null,seq__5423_5437__$1);
var G__5445 = null;
var G__5446 = 0;
var G__5447 = 0;
seq__5423_5427 = G__5444;
chunk__5424_5428 = G__5445;
count__5425_5429 = G__5446;
i__5426_5430 = G__5447;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);if(cljs.core.truth_((function (){var and__3941__auto__ = allows_inner_html_QMARK_;if(and__3941__auto__)
{var and__3941__auto____$1 = (function (){var or__3943__auto__ = domina.support.leading_whitespace_QMARK_;if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();if(cljs.core.truth_(and__3941__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{var value_5458 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");try{var seq__5454_5459 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5455_5460 = null;var count__5456_5461 = 0;var i__5457_5462 = 0;while(true){
if((i__5457_5462 < count__5456_5461))
{var node_5463 = cljs.core._nth.call(null,chunk__5455_5460,i__5457_5462);node_5463.innerHTML = value_5458;
{
var G__5464 = seq__5454_5459;
var G__5465 = chunk__5455_5460;
var G__5466 = count__5456_5461;
var G__5467 = (i__5457_5462 + 1);
seq__5454_5459 = G__5464;
chunk__5455_5460 = G__5465;
count__5456_5461 = G__5466;
i__5457_5462 = G__5467;
continue;
}
} else
{var temp__4092__auto___5468 = cljs.core.seq.call(null,seq__5454_5459);if(temp__4092__auto___5468)
{var seq__5454_5469__$1 = temp__4092__auto___5468;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5454_5469__$1))
{var c__3600__auto___5470 = cljs.core.chunk_first.call(null,seq__5454_5469__$1);{
var G__5471 = cljs.core.chunk_rest.call(null,seq__5454_5469__$1);
var G__5472 = c__3600__auto___5470;
var G__5473 = cljs.core.count.call(null,c__3600__auto___5470);
var G__5474 = 0;
seq__5454_5459 = G__5471;
chunk__5455_5460 = G__5472;
count__5456_5461 = G__5473;
i__5457_5462 = G__5474;
continue;
}
} else
{var node_5475 = cljs.core.first.call(null,seq__5454_5469__$1);node_5475.innerHTML = value_5458;
{
var G__5476 = cljs.core.next.call(null,seq__5454_5469__$1);
var G__5477 = null;
var G__5478 = 0;
var G__5479 = 0;
seq__5454_5459 = G__5476;
chunk__5455_5460 = G__5477;
count__5456_5461 = G__5478;
i__5457_5462 = G__5479;
continue;
}
}
} else
{}
}
break;
}
}catch (e5453){if((e5453 instanceof Error))
{var e_5480 = e5453;domina.replace_children_BANG_.call(null,content,value_5458);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e5453;
} else
{}
}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){if(typeof inner_content === 'string')
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){var m = domina.single_node.call(null,node).__domina_data;var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);if(cljs.core.truth_((function (){var and__3941__auto__ = bubble;if(cljs.core.truth_(and__3941__auto__))
{return (value == null);
} else
{return and__3941__auto__;
}
})()))
{var temp__4092__auto__ = domina.single_node.call(null,node).parentNode;if(cljs.core.truth_(temp__4092__auto__))
{var parent = temp__4092__auto__;return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){var m = (function (){var or__3943__auto__ = domina.single_node.call(null,node).__domina_data;if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})();return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){var parents = domina.nodes.call(null,parent_content);var children = domina.nodes.call(null,child_content);var first_child = (function (){var frag = document.createDocumentFragment();var seq__5487_5491 = cljs.core.seq.call(null,children);var chunk__5488_5492 = null;var count__5489_5493 = 0;var i__5490_5494 = 0;while(true){
if((i__5490_5494 < count__5489_5493))
{var child_5495 = cljs.core._nth.call(null,chunk__5488_5492,i__5490_5494);frag.appendChild(child_5495);
{
var G__5496 = seq__5487_5491;
var G__5497 = chunk__5488_5492;
var G__5498 = count__5489_5493;
var G__5499 = (i__5490_5494 + 1);
seq__5487_5491 = G__5496;
chunk__5488_5492 = G__5497;
count__5489_5493 = G__5498;
i__5490_5494 = G__5499;
continue;
}
} else
{var temp__4092__auto___5500 = cljs.core.seq.call(null,seq__5487_5491);if(temp__4092__auto___5500)
{var seq__5487_5501__$1 = temp__4092__auto___5500;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5487_5501__$1))
{var c__3600__auto___5502 = cljs.core.chunk_first.call(null,seq__5487_5501__$1);{
var G__5503 = cljs.core.chunk_rest.call(null,seq__5487_5501__$1);
var G__5504 = c__3600__auto___5502;
var G__5505 = cljs.core.count.call(null,c__3600__auto___5502);
var G__5506 = 0;
seq__5487_5491 = G__5503;
chunk__5488_5492 = G__5504;
count__5489_5493 = G__5505;
i__5490_5494 = G__5506;
continue;
}
} else
{var child_5507 = cljs.core.first.call(null,seq__5487_5501__$1);frag.appendChild(child_5507);
{
var G__5508 = cljs.core.next.call(null,seq__5487_5501__$1);
var G__5509 = null;
var G__5510 = 0;
var G__5511 = 0;
seq__5487_5491 = G__5508;
chunk__5488_5492 = G__5509;
count__5489_5493 = G__5510;
i__5490_5494 = G__5511;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - 1),((function (parents,children,first_child){
return (function (){return first_child.cloneNode(true);
});})(parents,children,first_child))
));if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__5481_SHARP_,p2__5482_SHARP_){return f.call(null,p1__5481_SHARP_,p2__5482_SHARP_);
}),cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){return lazy_nl_via_item.call(null,nl,0);
});
var lazy_nl_via_item__2 = (function (nl,n){if((n < nl.length))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + 1)));
}),null,null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){return lazy_nl_via_array_ref.call(null,nl,0);
});
var lazy_nl_via_array_ref__2 = (function (nl,n){if((n < nl.length))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + 1)));
}),null,null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){var and__3941__auto__ = obj;if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = cljs.core.not.call(null,obj.nodeName);if(and__3941__auto____$1)
{return obj.length;
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5513 = list_thing;if(G__5513)
{if((function (){var or__3943__auto__ = (G__5513.cljs$lang$protocol_mask$partition0$ & 8388608);if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5513.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5513.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5513);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5513);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{if(new cljs.core.Keyword(null,"default","default",2558708147))
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([list_thing], true));
} else
{return null;
}
}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5514 = content;if(G__5514)
{if((function (){var or__3943__auto__ = (G__5514.cljs$lang$protocol_mask$partition0$ & 8388608);if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5514.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5514.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5514);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5514);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{if(new cljs.core.Keyword(null,"default","default",2558708147))
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([content], true));
} else
{return null;
}
}
}
}
}));
(domina.single_node["_"] = (function (content){if((content == null))
{return null;
} else
{if((function (){var G__5515 = content;if(G__5515)
{if((function (){var or__3943__auto__ = (G__5515.cljs$lang$protocol_mask$partition0$ & 8388608);if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5515.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5515.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5515);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5515);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item(0);
} else
{if(new cljs.core.Keyword(null,"default","default",2558708147))
{return content;
} else
{return null;
}
}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){return domina.lazy_nodelist.call(null,nodelist);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){return nodelist.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){return domina.lazy_nodelist.call(null,nodelist);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){return nodelist.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){return domina.lazy_nodelist.call(null,coll);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){return coll.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){if((coll.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){return coll.length;
});
} else
{}
