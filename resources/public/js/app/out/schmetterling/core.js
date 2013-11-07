goog.provide('schmetterling.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('schmetterling.connect');
goog.require('domina.events');
goog.require('domina.css');
goog.require('domina');
goog.require('cljs.reader');
goog.require('cljs.core.async');
schmetterling.core.send = cljs.core.async.chan.call(null);
schmetterling.core.receive = cljs.core.async.chan.call(null);
schmetterling.core.ws_url = "ws://localhost:16461/async";
schmetterling.core.ws = (new WebSocket(schmetterling.core.ws_url));
schmetterling.core.log = (function log(e){return console.log(e);
});
schmetterling.core.event_chan = (function event_chan(c,id,el,type){var writer = (function (p1__7691_SHARP_){return cljs.core.async.put_BANG_.call(null,c,cljs.core.PersistentVector.fromArray([id,p1__7691_SHARP_], true));
});domina.events.listen_BANG_.call(null,el,type,writer);
return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"chan","chan",1016956612),c,new cljs.core.Keyword(null,"unsubscribe","unsubscribe",1597185603),(function (){return el.removeEventListener(type,writer);
})], true);
});
schmetterling.core.key_code = (function key_code(event){return domina.events.raw_event.call(null,event).keyCode;
});
schmetterling.core.key_press_QMARK_ = (function key_press_QMARK_(event){return cljs.core._EQ_.call(null,domina.events.event_type.call(null,event),"keypress");
});
schmetterling.core.input_value = (function input_value(input){return domina.value.call(null,domina.single_node.call(null,domina.css.sel.call(null,input)));
});
schmetterling.core.dispatch_message = (function dispatch_message(){var c__5694__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5695__auto__ = (function (){var switch__5614__auto__ = (function (state_7734){var state_val_7735 = (state_7734[1]);if((state_val_7735 === 7))
{var inst_7722 = (state_7734[2]);var inst_7723 = inst_7722.data;var inst_7724 = cljs.reader.read_string.call(null,inst_7723);var inst_7725 = [cljs.core.str(inst_7724)].join('');var inst_7726 = schmetterling.core.log.call(null,inst_7725);var state_7734__$1 = (function (){var statearr_7736 = state_7734;(statearr_7736[5] = inst_7726);
return statearr_7736;
})();var statearr_7737_7746 = state_7734__$1;(statearr_7737_7746[2] = null);
(statearr_7737_7746[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7735 === 6))
{var inst_7730 = (state_7734[2]);var state_7734__$1 = state_7734;var statearr_7738_7747 = state_7734__$1;(statearr_7738_7747[2] = inst_7730);
(statearr_7738_7747[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7735 === 5))
{var state_7734__$1 = state_7734;var statearr_7739_7748 = state_7734__$1;(statearr_7739_7748[2] = null);
(statearr_7739_7748[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7735 === 4))
{var state_7734__$1 = state_7734;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_7734__$1,7,schmetterling.core.receive);
} else
{if((state_val_7735 === 3))
{var inst_7732 = (state_7734[2]);var state_7734__$1 = state_7734;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_7734__$1,inst_7732);
} else
{if((state_val_7735 === 2))
{var state_7734__$1 = state_7734;if(true)
{var statearr_7740_7749 = state_7734__$1;(statearr_7740_7749[1] = 4);
} else
{var statearr_7741_7750 = state_7734__$1;(statearr_7741_7750[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7735 === 1))
{var state_7734__$1 = state_7734;var statearr_7742_7751 = state_7734__$1;(statearr_7742_7751[2] = null);
(statearr_7742_7751[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});return ((function (switch__5614__auto__){
return (function() {
var state_machine__5615__auto__ = null;
var state_machine__5615__auto____0 = (function (){var statearr_7744 = (new Array(6));(statearr_7744[0] = state_machine__5615__auto__);
(statearr_7744[1] = 1);
return statearr_7744;
});
var state_machine__5615__auto____1 = (function (state_7734){while(true){
var result__5616__auto__ = switch__5614__auto__.call(null,state_7734);if(cljs.core.keyword_identical_QMARK_.call(null,result__5616__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5616__auto__;
}
break;
}
});
state_machine__5615__auto__ = function(state_7734){
switch(arguments.length){
case 0:
return state_machine__5615__auto____0.call(this);
case 1:
return state_machine__5615__auto____1.call(this,state_7734);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5615__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5615__auto____0;
state_machine__5615__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5615__auto____1;
return state_machine__5615__auto__;
})()
;})(switch__5614__auto__))
})();var state__5696__auto__ = (function (){var statearr_7745 = f__5695__auto__.call(null);(statearr_7745[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5694__auto__);
return statearr_7745;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5696__auto__);
}));
return c__5694__auto__;
});
schmetterling.core.make_sender = (function make_sender(){schmetterling.core.log.call(null,"HELLO");
schmetterling.core.event_chan.call(null,schmetterling.core.send,new cljs.core.Keyword(null,"connect","connect",1965255772),domina.css.sel.call(null,"input#connection"),new cljs.core.Keyword(null,"keypress","keypress",1530666166));
var c__5694__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5695__auto__ = (function (){var switch__5614__auto__ = (function (state_7831){var state_val_7832 = (state_7831[1]);if((state_val_7832 === 1))
{var state_7831__$1 = state_7831;var statearr_7833_7852 = state_7831__$1;(statearr_7833_7852[2] = null);
(statearr_7833_7852[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 2))
{var state_7831__$1 = state_7831;if(true)
{var statearr_7834_7853 = state_7831__$1;(statearr_7834_7853[1] = 4);
} else
{var statearr_7835_7854 = state_7831__$1;(statearr_7835_7854[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 3))
{var inst_7829 = (state_7831[2]);var state_7831__$1 = state_7831;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_7831__$1,inst_7829);
} else
{if((state_val_7832 === 4))
{var state_7831__$1 = state_7831;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_7831__$1,7,schmetterling.core.send);
} else
{if((state_val_7832 === 5))
{var state_7831__$1 = state_7831;var statearr_7836_7855 = state_7831__$1;(statearr_7836_7855[2] = null);
(statearr_7836_7855[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 6))
{var inst_7827 = (state_7831[2]);var state_7831__$1 = state_7831;var statearr_7837_7856 = state_7831__$1;(statearr_7837_7856[2] = inst_7827);
(statearr_7837_7856[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 7))
{var inst_7810 = (state_7831[5]);var inst_7808 = (state_7831[6]);var inst_7806 = (state_7831[2]);var inst_7807 = cljs.core.nth.call(null,inst_7806,0,null);var inst_7808__$1 = cljs.core.nth.call(null,inst_7806,1,null);var inst_7809 = schmetterling.core.log.call(null,inst_7808__$1);var inst_7810__$1 = cljs.core._EQ_.call(null,inst_7807,new cljs.core.Keyword(null,"connect","connect",1965255772));var state_7831__$1 = (function (){var statearr_7838 = state_7831;(statearr_7838[5] = inst_7810__$1);
(statearr_7838[7] = inst_7809);
(statearr_7838[6] = inst_7808__$1);
return statearr_7838;
})();if(inst_7810__$1)
{var statearr_7839_7857 = state_7831__$1;(statearr_7839_7857[1] = 8);
} else
{var statearr_7840_7858 = state_7831__$1;(statearr_7840_7858[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 8))
{var inst_7808 = (state_7831[6]);var inst_7812 = schmetterling.core.key_code.call(null,inst_7808);var inst_7813 = cljs.core._EQ_.call(null,13,inst_7812);var state_7831__$1 = state_7831;var statearr_7841_7859 = state_7831__$1;(statearr_7841_7859[2] = inst_7813);
(statearr_7841_7859[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 9))
{var inst_7810 = (state_7831[5]);var state_7831__$1 = state_7831;var statearr_7842_7860 = state_7831__$1;(statearr_7842_7860[2] = inst_7810);
(statearr_7842_7860[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 10))
{var inst_7816 = (state_7831[2]);var state_7831__$1 = state_7831;if(cljs.core.truth_(inst_7816))
{var statearr_7843_7861 = state_7831__$1;(statearr_7843_7861[1] = 11);
} else
{var statearr_7844_7862 = state_7831__$1;(statearr_7844_7862[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 11))
{var inst_7818 = schmetterling.core.input_value.call(null,"input#connection");var inst_7819 = cljs.core.hash_map.call(null,new cljs.core.Keyword(null,"op","op",1013907795),new cljs.core.Keyword(null,"connect","connect",1965255772),new cljs.core.Keyword(null,"port","port",1017351155),inst_7818);var inst_7820 = schmetterling.core.ws.send(inst_7819);var state_7831__$1 = state_7831;var statearr_7845_7863 = state_7831__$1;(statearr_7845_7863[2] = inst_7820);
(statearr_7845_7863[1] = 13);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 12))
{var state_7831__$1 = state_7831;var statearr_7846_7864 = state_7831__$1;(statearr_7846_7864[2] = null);
(statearr_7846_7864[1] = 13);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_7832 === 13))
{var inst_7823 = (state_7831[2]);var state_7831__$1 = (function (){var statearr_7847 = state_7831;(statearr_7847[8] = inst_7823);
return statearr_7847;
})();var statearr_7848_7865 = state_7831__$1;(statearr_7848_7865[2] = null);
(statearr_7848_7865[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__5614__auto__){
return (function() {
var state_machine__5615__auto__ = null;
var state_machine__5615__auto____0 = (function (){var statearr_7850 = (new Array(9));(statearr_7850[0] = state_machine__5615__auto__);
(statearr_7850[1] = 1);
return statearr_7850;
});
var state_machine__5615__auto____1 = (function (state_7831){while(true){
var result__5616__auto__ = switch__5614__auto__.call(null,state_7831);if(cljs.core.keyword_identical_QMARK_.call(null,result__5616__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5616__auto__;
}
break;
}
});
state_machine__5615__auto__ = function(state_7831){
switch(arguments.length){
case 0:
return state_machine__5615__auto____0.call(this);
case 1:
return state_machine__5615__auto____1.call(this,state_7831);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5615__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5615__auto____0;
state_machine__5615__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5615__auto____1;
return state_machine__5615__auto__;
})()
;})(switch__5614__auto__))
})();var state__5696__auto__ = (function (){var statearr_7851 = f__5695__auto__.call(null);(statearr_7851[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5694__auto__);
return statearr_7851;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5696__auto__);
}));
return c__5694__auto__;
});
schmetterling.core.make_receiver = (function make_receiver(){schmetterling.core.ws.onmessage = (function (msg){return cljs.core.async.put_BANG_.call(null,schmetterling.core.receive,msg);
});
return schmetterling.core.dispatch_message.call(null);
});
schmetterling.core.init_BANG_ = (function init_BANG_(){schmetterling.core.make_sender.call(null);
return schmetterling.core.make_receiver.call(null);
});
schmetterling.core.on_load = window.onload = schmetterling.core.init_BANG_;
schmetterling.connect.connect.call(null);
