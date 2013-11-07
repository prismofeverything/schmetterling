goog.provide('domina.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.object');
goog.require('domina');
domina.events.Event = {};
domina.events.prevent_default = (function prevent_default(evt){if((function (){var and__3941__auto__ = evt;if(and__3941__auto__)
{return evt.domina$events$Event$prevent_default$arity$1;
} else
{return and__3941__auto__;
}
})())
{return evt.domina$events$Event$prevent_default$arity$1(evt);
} else
{var x__3469__auto__ = (((evt == null))?null:evt);return (function (){var or__3943__auto__ = (domina.events.prevent_default[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.events.prevent_default["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.prevent-default",evt);
}
}
})().call(null,evt);
}
});
domina.events.stop_propagation = (function stop_propagation(evt){if((function (){var and__3941__auto__ = evt;if(and__3941__auto__)
{return evt.domina$events$Event$stop_propagation$arity$1;
} else
{return and__3941__auto__;
}
})())
{return evt.domina$events$Event$stop_propagation$arity$1(evt);
} else
{var x__3469__auto__ = (((evt == null))?null:evt);return (function (){var or__3943__auto__ = (domina.events.stop_propagation[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.events.stop_propagation["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.stop-propagation",evt);
}
}
})().call(null,evt);
}
});
domina.events.target = (function target(evt){if((function (){var and__3941__auto__ = evt;if(and__3941__auto__)
{return evt.domina$events$Event$target$arity$1;
} else
{return and__3941__auto__;
}
})())
{return evt.domina$events$Event$target$arity$1(evt);
} else
{var x__3469__auto__ = (((evt == null))?null:evt);return (function (){var or__3943__auto__ = (domina.events.target[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.events.target["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.target",evt);
}
}
})().call(null,evt);
}
});
domina.events.current_target = (function current_target(evt){if((function (){var and__3941__auto__ = evt;if(and__3941__auto__)
{return evt.domina$events$Event$current_target$arity$1;
} else
{return and__3941__auto__;
}
})())
{return evt.domina$events$Event$current_target$arity$1(evt);
} else
{var x__3469__auto__ = (((evt == null))?null:evt);return (function (){var or__3943__auto__ = (domina.events.current_target[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.events.current_target["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.current-target",evt);
}
}
})().call(null,evt);
}
});
domina.events.event_type = (function event_type(evt){if((function (){var and__3941__auto__ = evt;if(and__3941__auto__)
{return evt.domina$events$Event$event_type$arity$1;
} else
{return and__3941__auto__;
}
})())
{return evt.domina$events$Event$event_type$arity$1(evt);
} else
{var x__3469__auto__ = (((evt == null))?null:evt);return (function (){var or__3943__auto__ = (domina.events.event_type[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.events.event_type["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.event-type",evt);
}
}
})().call(null,evt);
}
});
domina.events.raw_event = (function raw_event(evt){if((function (){var and__3941__auto__ = evt;if(and__3941__auto__)
{return evt.domina$events$Event$raw_event$arity$1;
} else
{return and__3941__auto__;
}
})())
{return evt.domina$events$Event$raw_event$arity$1(evt);
} else
{var x__3469__auto__ = (((evt == null))?null:evt);return (function (){var or__3943__auto__ = (domina.events.raw_event[goog.typeOf(x__3469__auto__)]);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.events.raw_event["_"]);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.raw-event",evt);
}
}
})().call(null,evt);
}
});
domina.events.root_element = window.document.documentElement;
domina.events.create_listener_function = (function create_listener_function(f){return (function (evt){f.call(null,(function (){if(typeof domina.events.t5735 !== 'undefined')
{} else
{goog.provide('domina.events.t5735');

/**
* @constructor
*/
domina.events.t5735 = (function (evt,f,create_listener_function,meta5736){
this.evt = evt;
this.f = f;
this.create_listener_function = create_listener_function;
this.meta5736 = meta5736;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393472;
})
domina.events.t5735.cljs$lang$type = true;
domina.events.t5735.cljs$lang$ctorStr = "domina.events/t5735";
domina.events.t5735.cljs$lang$ctorPrWriter = (function (this__3410__auto__,writer__3411__auto__,opt__3412__auto__){return cljs.core._write.call(null,writer__3411__auto__,"domina.events/t5735");
});
domina.events.t5735.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (o,k){var self__ = this;
var temp__4090__auto__ = (self__.evt[k]);if(cljs.core.truth_(temp__4090__auto__))
{var val = temp__4090__auto__;return val;
} else
{return (self__.evt[cljs.core.name.call(null,k)]);
}
});
domina.events.t5735.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (o,k,not_found){var self__ = this;
var or__3943__auto__ = o.cljs$core$ILookup$_lookup$arity$2(o,k);if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return not_found;
}
});
domina.events.t5735.prototype.domina$events$Event$ = true;
domina.events.t5735.prototype.domina$events$Event$prevent_default$arity$1 = (function (_){var self__ = this;
return self__.evt.preventDefault();
});
domina.events.t5735.prototype.domina$events$Event$stop_propagation$arity$1 = (function (_){var self__ = this;
return self__.evt.stopPropagation();
});
domina.events.t5735.prototype.domina$events$Event$target$arity$1 = (function (_){var self__ = this;
return self__.evt.target;
});
domina.events.t5735.prototype.domina$events$Event$current_target$arity$1 = (function (_){var self__ = this;
return self__.evt.currentTarget;
});
domina.events.t5735.prototype.domina$events$Event$event_type$arity$1 = (function (_){var self__ = this;
return self__.evt.type;
});
domina.events.t5735.prototype.domina$events$Event$raw_event$arity$1 = (function (_){var self__ = this;
return self__.evt;
});
domina.events.t5735.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_5737){var self__ = this;
return self__.meta5736;
});
domina.events.t5735.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_5737,meta5736__$1){var self__ = this;
return (new domina.events.t5735(self__.evt,self__.f,self__.create_listener_function,meta5736__$1));
});
domina.events.__GT_t5735 = (function __GT_t5735(evt__$1,f__$1,create_listener_function__$1,meta5736){return (new domina.events.t5735(evt__$1,f__$1,create_listener_function__$1,meta5736));
});
}
return (new domina.events.t5735(evt,f,create_listener_function,null));
})());
return true;
});
});
domina.events.listen_internal_BANG_ = (function listen_internal_BANG_(content,type,listener,capture,once){var f = domina.events.create_listener_function.call(null,listener);var t = cljs.core.name.call(null,type);return cljs.core.doall.call(null,(function (){var iter__3569__auto__ = (function iter__5742(s__5743){return (new cljs.core.LazySeq(null,(function (){var s__5743__$1 = s__5743;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__5743__$1);if(temp__4092__auto__)
{var s__5743__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__5743__$2))
{var c__3567__auto__ = cljs.core.chunk_first.call(null,s__5743__$2);var size__3568__auto__ = cljs.core.count.call(null,c__3567__auto__);var b__5745 = cljs.core.chunk_buffer.call(null,size__3568__auto__);if((function (){var i__5744 = 0;while(true){
if((i__5744 < size__3568__auto__))
{var node = cljs.core._nth.call(null,c__3567__auto__,i__5744);cljs.core.chunk_append.call(null,b__5745,(cljs.core.truth_(once)?goog.events.listenOnce(node,t,f,capture):goog.events.listen(node,t,f,capture)));
{
var G__5746 = (i__5744 + 1);
i__5744 = G__5746;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__5745),iter__5742.call(null,cljs.core.chunk_rest.call(null,s__5743__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__5745),null);
}
} else
{var node = cljs.core.first.call(null,s__5743__$2);return cljs.core.cons.call(null,(cljs.core.truth_(once)?goog.events.listenOnce(node,t,f,capture):goog.events.listen(node,t,f,capture)),iter__5742.call(null,cljs.core.rest.call(null,s__5743__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__3569__auto__.call(null,domina.nodes.call(null,content));
})());
});
/**
* Add an event listener to each node in a DomContent. Listens for events during the bubble phase. Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.listen_BANG_ = (function() {
var listen_BANG_ = null;
var listen_BANG___2 = (function (type,listener){return listen_BANG_.call(null,domina.events.root_element,type,listener);
});
var listen_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,false,false);
});
listen_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return listen_BANG___2.call(this,content,type);
case 3:
return listen_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
listen_BANG_.cljs$core$IFn$_invoke$arity$2 = listen_BANG___2;
listen_BANG_.cljs$core$IFn$_invoke$arity$3 = listen_BANG___3;
return listen_BANG_;
})()
;
/**
* Add an event listener to each node in a DomContent. Listens for events during the capture phase.  Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.capture_BANG_ = (function() {
var capture_BANG_ = null;
var capture_BANG___2 = (function (type,listener){return capture_BANG_.call(null,domina.events.root_element,type,listener);
});
var capture_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,true,false);
});
capture_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return capture_BANG___2.call(this,content,type);
case 3:
return capture_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
capture_BANG_.cljs$core$IFn$_invoke$arity$2 = capture_BANG___2;
capture_BANG_.cljs$core$IFn$_invoke$arity$3 = capture_BANG___3;
return capture_BANG_;
})()
;
/**
* Add an event listener to each node in a DomContent. Listens for events during the bubble phase. De-registers the listener after the first time it is invoked.  Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.listen_once_BANG_ = (function() {
var listen_once_BANG_ = null;
var listen_once_BANG___2 = (function (type,listener){return listen_once_BANG_.call(null,domina.events.root_element,type,listener);
});
var listen_once_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,false,true);
});
listen_once_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return listen_once_BANG___2.call(this,content,type);
case 3:
return listen_once_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
listen_once_BANG_.cljs$core$IFn$_invoke$arity$2 = listen_once_BANG___2;
listen_once_BANG_.cljs$core$IFn$_invoke$arity$3 = listen_once_BANG___3;
return listen_once_BANG_;
})()
;
/**
* Add an event listener to each node in a DomContent. Listens for events during the capture phase. De-registers the listener after the first time it is invoked.  Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.capture_once_BANG_ = (function() {
var capture_once_BANG_ = null;
var capture_once_BANG___2 = (function (type,listener){return capture_once_BANG_.call(null,domina.events.root_element,type,listener);
});
var capture_once_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,true,true);
});
capture_once_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return capture_once_BANG___2.call(this,content,type);
case 3:
return capture_once_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
capture_once_BANG_.cljs$core$IFn$_invoke$arity$2 = capture_once_BANG___2;
capture_once_BANG_.cljs$core$IFn$_invoke$arity$3 = capture_once_BANG___3;
return capture_once_BANG_;
})()
;
/**
* Removes event listeners from each node in the content. If a listener type is supplied, removes only listeners of that type. If content is omitted, it will remove listeners from the document's root element.
*/
domina.events.unlisten_BANG_ = (function() {
var unlisten_BANG_ = null;
var unlisten_BANG___0 = (function (){return unlisten_BANG_.call(null,domina.events.root_element);
});
var unlisten_BANG___1 = (function (content){var seq__5755 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5756 = null;var count__5757 = 0;var i__5758 = 0;while(true){
if((i__5758 < count__5757))
{var node = cljs.core._nth.call(null,chunk__5756,i__5758);goog.events.removeAll(node);
{
var G__5763 = seq__5755;
var G__5764 = chunk__5756;
var G__5765 = count__5757;
var G__5766 = (i__5758 + 1);
seq__5755 = G__5763;
chunk__5756 = G__5764;
count__5757 = G__5765;
i__5758 = G__5766;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5755);if(temp__4092__auto__)
{var seq__5755__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5755__$1))
{var c__3600__auto__ = cljs.core.chunk_first.call(null,seq__5755__$1);{
var G__5767 = cljs.core.chunk_rest.call(null,seq__5755__$1);
var G__5768 = c__3600__auto__;
var G__5769 = cljs.core.count.call(null,c__3600__auto__);
var G__5770 = 0;
seq__5755 = G__5767;
chunk__5756 = G__5768;
count__5757 = G__5769;
i__5758 = G__5770;
continue;
}
} else
{var node = cljs.core.first.call(null,seq__5755__$1);goog.events.removeAll(node);
{
var G__5771 = cljs.core.next.call(null,seq__5755__$1);
var G__5772 = null;
var G__5773 = 0;
var G__5774 = 0;
seq__5755 = G__5771;
chunk__5756 = G__5772;
count__5757 = G__5773;
i__5758 = G__5774;
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
var unlisten_BANG___2 = (function (content,type){var type__$1 = cljs.core.name.call(null,type);var seq__5759 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5760 = null;var count__5761 = 0;var i__5762 = 0;while(true){
if((i__5762 < count__5761))
{var node = cljs.core._nth.call(null,chunk__5760,i__5762);goog.events.removeAll(node,type__$1);
{
var G__5775 = seq__5759;
var G__5776 = chunk__5760;
var G__5777 = count__5761;
var G__5778 = (i__5762 + 1);
seq__5759 = G__5775;
chunk__5760 = G__5776;
count__5761 = G__5777;
i__5762 = G__5778;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5759);if(temp__4092__auto__)
{var seq__5759__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5759__$1))
{var c__3600__auto__ = cljs.core.chunk_first.call(null,seq__5759__$1);{
var G__5779 = cljs.core.chunk_rest.call(null,seq__5759__$1);
var G__5780 = c__3600__auto__;
var G__5781 = cljs.core.count.call(null,c__3600__auto__);
var G__5782 = 0;
seq__5759 = G__5779;
chunk__5760 = G__5780;
count__5761 = G__5781;
i__5762 = G__5782;
continue;
}
} else
{var node = cljs.core.first.call(null,seq__5759__$1);goog.events.removeAll(node,type__$1);
{
var G__5783 = cljs.core.next.call(null,seq__5759__$1);
var G__5784 = null;
var G__5785 = 0;
var G__5786 = 0;
seq__5759 = G__5783;
chunk__5760 = G__5784;
count__5761 = G__5785;
i__5762 = G__5786;
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
unlisten_BANG_ = function(content,type){
switch(arguments.length){
case 0:
return unlisten_BANG___0.call(this);
case 1:
return unlisten_BANG___1.call(this,content);
case 2:
return unlisten_BANG___2.call(this,content,type);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unlisten_BANG_.cljs$core$IFn$_invoke$arity$0 = unlisten_BANG___0;
unlisten_BANG_.cljs$core$IFn$_invoke$arity$1 = unlisten_BANG___1;
unlisten_BANG_.cljs$core$IFn$_invoke$arity$2 = unlisten_BANG___2;
return unlisten_BANG_;
})()
;
/**
* Returns a seq of a node and its ancestors, starting with the document root.
*/
domina.events.ancestor_nodes = (function() {
var ancestor_nodes = null;
var ancestor_nodes__1 = (function (n){return ancestor_nodes.call(null,n,cljs.core.PersistentVector.fromArray([n], true));
});
var ancestor_nodes__2 = (function (n,so_far){while(true){
var temp__4090__auto__ = n.parentNode;if(cljs.core.truth_(temp__4090__auto__))
{var parent = temp__4090__auto__;{
var G__5787 = parent;
var G__5788 = cljs.core.cons.call(null,parent,so_far);
n = G__5787;
so_far = G__5788;
continue;
}
} else
{return so_far;
}
break;
}
});
ancestor_nodes = function(n,so_far){
switch(arguments.length){
case 1:
return ancestor_nodes__1.call(this,n);
case 2:
return ancestor_nodes__2.call(this,n,so_far);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
ancestor_nodes.cljs$core$IFn$_invoke$arity$1 = ancestor_nodes__1;
ancestor_nodes.cljs$core$IFn$_invoke$arity$2 = ancestor_nodes__2;
return ancestor_nodes;
})()
;
/**
* Intended for internal/testing use only. Clients should prefer dispatch!. Dispatches an event as a simulated browser event from the given source node. Emulates capture/bubble behavior. Returns false if any handlers called prevent-default, otherwise true.
*/
domina.events.dispatch_browser_BANG_ = (function dispatch_browser_BANG_(source,evt){var ancestors = domina.events.ancestor_nodes.call(null,domina.single_node.call(null,source));var seq__5797_5805 = cljs.core.seq.call(null,ancestors);var chunk__5798_5806 = null;var count__5799_5807 = 0;var i__5800_5808 = 0;while(true){
if((i__5800_5808 < count__5799_5807))
{var n_5809 = cljs.core._nth.call(null,chunk__5798_5806,i__5800_5808);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_5809;
goog.events.fireListeners(n_5809,evt.type,true,evt);
}
{
var G__5810 = seq__5797_5805;
var G__5811 = chunk__5798_5806;
var G__5812 = count__5799_5807;
var G__5813 = (i__5800_5808 + 1);
seq__5797_5805 = G__5810;
chunk__5798_5806 = G__5811;
count__5799_5807 = G__5812;
i__5800_5808 = G__5813;
continue;
}
} else
{var temp__4092__auto___5814 = cljs.core.seq.call(null,seq__5797_5805);if(temp__4092__auto___5814)
{var seq__5797_5815__$1 = temp__4092__auto___5814;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5797_5815__$1))
{var c__3600__auto___5816 = cljs.core.chunk_first.call(null,seq__5797_5815__$1);{
var G__5817 = cljs.core.chunk_rest.call(null,seq__5797_5815__$1);
var G__5818 = c__3600__auto___5816;
var G__5819 = cljs.core.count.call(null,c__3600__auto___5816);
var G__5820 = 0;
seq__5797_5805 = G__5817;
chunk__5798_5806 = G__5818;
count__5799_5807 = G__5819;
i__5800_5808 = G__5820;
continue;
}
} else
{var n_5821 = cljs.core.first.call(null,seq__5797_5815__$1);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_5821;
goog.events.fireListeners(n_5821,evt.type,true,evt);
}
{
var G__5822 = cljs.core.next.call(null,seq__5797_5815__$1);
var G__5823 = null;
var G__5824 = 0;
var G__5825 = 0;
seq__5797_5805 = G__5822;
chunk__5798_5806 = G__5823;
count__5799_5807 = G__5824;
i__5800_5808 = G__5825;
continue;
}
}
} else
{}
}
break;
}
var seq__5801_5826 = cljs.core.seq.call(null,cljs.core.reverse.call(null,ancestors));var chunk__5802_5827 = null;var count__5803_5828 = 0;var i__5804_5829 = 0;while(true){
if((i__5804_5829 < count__5803_5828))
{var n_5830 = cljs.core._nth.call(null,chunk__5802_5827,i__5804_5829);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_5830;
goog.events.fireListeners(n_5830,evt.type,false,evt);
}
{
var G__5831 = seq__5801_5826;
var G__5832 = chunk__5802_5827;
var G__5833 = count__5803_5828;
var G__5834 = (i__5804_5829 + 1);
seq__5801_5826 = G__5831;
chunk__5802_5827 = G__5832;
count__5803_5828 = G__5833;
i__5804_5829 = G__5834;
continue;
}
} else
{var temp__4092__auto___5835 = cljs.core.seq.call(null,seq__5801_5826);if(temp__4092__auto___5835)
{var seq__5801_5836__$1 = temp__4092__auto___5835;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5801_5836__$1))
{var c__3600__auto___5837 = cljs.core.chunk_first.call(null,seq__5801_5836__$1);{
var G__5838 = cljs.core.chunk_rest.call(null,seq__5801_5836__$1);
var G__5839 = c__3600__auto___5837;
var G__5840 = cljs.core.count.call(null,c__3600__auto___5837);
var G__5841 = 0;
seq__5801_5826 = G__5838;
chunk__5802_5827 = G__5839;
count__5803_5828 = G__5840;
i__5804_5829 = G__5841;
continue;
}
} else
{var n_5842 = cljs.core.first.call(null,seq__5801_5836__$1);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_5842;
goog.events.fireListeners(n_5842,evt.type,false,evt);
}
{
var G__5843 = cljs.core.next.call(null,seq__5801_5836__$1);
var G__5844 = null;
var G__5845 = 0;
var G__5846 = 0;
seq__5801_5826 = G__5843;
chunk__5802_5827 = G__5844;
count__5803_5828 = G__5845;
i__5804_5829 = G__5846;
continue;
}
}
} else
{}
}
break;
}
return evt.returnValue_;
});
/**
* Intended for internal/testing use only. Clients should prefer dispatch!. Dispatches an event using GClosure's event handling. The event source must extend goog.event.EventTarget
*/
domina.events.dispatch_event_target_BANG_ = (function dispatch_event_target_BANG_(source,evt){return goog.events.dispatchEvent(source,evt);
});
/**
* Tests whether the object is a goog.event.EventTarget
*/
domina.events.is_event_target_QMARK_ = (function is_event_target_QMARK_(o){var and__3941__auto__ = o.getParentEventTarget;if(cljs.core.truth_(and__3941__auto__))
{return o.dispatchEvent;
} else
{return and__3941__auto__;
}
});
/**
* Dispatches an event of the given type, adding the values in event map to the event object. Optionally takes an event source. If none is provided, dispatches on the document's root element. Returns false if any handlers called prevent-default, otherwise true.
*/
domina.events.dispatch_BANG_ = (function() {
var dispatch_BANG_ = null;
var dispatch_BANG___2 = (function (type,evt_map){return dispatch_BANG_.call(null,domina.events.root_element,type,evt_map);
});
var dispatch_BANG___3 = (function (source,type,evt_map){var evt = (new goog.events.Event(cljs.core.name.call(null,type)));var seq__5853_5859 = cljs.core.seq.call(null,evt_map);var chunk__5854_5860 = null;var count__5855_5861 = 0;var i__5856_5862 = 0;while(true){
if((i__5856_5862 < count__5855_5861))
{var vec__5857_5863 = cljs.core._nth.call(null,chunk__5854_5860,i__5856_5862);var k_5864 = cljs.core.nth.call(null,vec__5857_5863,0,null);var v_5865 = cljs.core.nth.call(null,vec__5857_5863,1,null);(evt[k_5864] = v_5865);
{
var G__5866 = seq__5853_5859;
var G__5867 = chunk__5854_5860;
var G__5868 = count__5855_5861;
var G__5869 = (i__5856_5862 + 1);
seq__5853_5859 = G__5866;
chunk__5854_5860 = G__5867;
count__5855_5861 = G__5868;
i__5856_5862 = G__5869;
continue;
}
} else
{var temp__4092__auto___5870 = cljs.core.seq.call(null,seq__5853_5859);if(temp__4092__auto___5870)
{var seq__5853_5871__$1 = temp__4092__auto___5870;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5853_5871__$1))
{var c__3600__auto___5872 = cljs.core.chunk_first.call(null,seq__5853_5871__$1);{
var G__5873 = cljs.core.chunk_rest.call(null,seq__5853_5871__$1);
var G__5874 = c__3600__auto___5872;
var G__5875 = cljs.core.count.call(null,c__3600__auto___5872);
var G__5876 = 0;
seq__5853_5859 = G__5873;
chunk__5854_5860 = G__5874;
count__5855_5861 = G__5875;
i__5856_5862 = G__5876;
continue;
}
} else
{var vec__5858_5877 = cljs.core.first.call(null,seq__5853_5871__$1);var k_5878 = cljs.core.nth.call(null,vec__5858_5877,0,null);var v_5879 = cljs.core.nth.call(null,vec__5858_5877,1,null);(evt[k_5878] = v_5879);
{
var G__5880 = cljs.core.next.call(null,seq__5853_5871__$1);
var G__5881 = null;
var G__5882 = 0;
var G__5883 = 0;
seq__5853_5859 = G__5880;
chunk__5854_5860 = G__5881;
count__5855_5861 = G__5882;
i__5856_5862 = G__5883;
continue;
}
}
} else
{}
}
break;
}
if(cljs.core.truth_(domina.events.is_event_target_QMARK_.call(null,source)))
{return domina.events.dispatch_event_target_BANG_.call(null,source,evt);
} else
{return domina.events.dispatch_browser_BANG_.call(null,source,evt);
}
});
dispatch_BANG_ = function(source,type,evt_map){
switch(arguments.length){
case 2:
return dispatch_BANG___2.call(this,source,type);
case 3:
return dispatch_BANG___3.call(this,source,type,evt_map);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dispatch_BANG_.cljs$core$IFn$_invoke$arity$2 = dispatch_BANG___2;
dispatch_BANG_.cljs$core$IFn$_invoke$arity$3 = dispatch_BANG___3;
return dispatch_BANG_;
})()
;
/**
* Given a listener key, removes the listener.
*/
domina.events.unlisten_by_key_BANG_ = (function unlisten_by_key_BANG_(key){return goog.events.unlistenByKey(key);
});
/**
* Returns a sequence of event listeners for all the nodes in the
* content of a given type.
*/
domina.events.get_listeners = (function get_listeners(content,type){var type__$1 = cljs.core.name.call(null,type);return cljs.core.mapcat.call(null,(function (p1__5884_SHARP_){return goog.events.getListeners(p1__5884_SHARP_,type__$1,false);
}),domina.nodes.call(null,content));
});
