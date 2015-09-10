/*
 * RiotDelegates.js
 *
 * Copyright 2015 Ionzero <jayk@ionzero.com>
 * Published under the terms of the MIT License (See LICENSE file for details)
 *
 * Riot Delegates - A mixin that provides simple delegate functionality to
 *                  Riot.js tags.  Allows a tag to be 'loosely bound' to
 *                  a function or other object that can help the tag decide
 *                  on correct behavior. See the below wikipedia link for more info.
 *                  https://en.wikipedia.org/wiki/Delegation_%28programming%29#Design_pattern
 *
 */
function set_delegate(name, delegate_function) {
    if (typeof delegate_function == 'function') {
        this.delegates[name] = delegate_function;
    } else {
        console.warn("Can't set_delegate for " + name + " to non-function");
    }
}

// register the mixin with riot.
riot.mixin('RiotDelegates', {
    "init":
            function() {
                if (typeof this.delegates == 'undefined') {
                    if (typeof this.opts.delegates == 'object') {
                        this.delegates = this.opts.delegates;
                    } else {
                        this.delegates = {};
                    }
                }
                this.on('set_delegates', function(delegates) {
                    Object.keys(delegates).forEach(function(delegate_name) {
                        set_delegate.call(this, delegate_name, delegates[delegate_name]);
                    }.bind(this));
                }.bind(this));
            },

    // call_delegate should be of the form this.call_delegate('delegate_name', args...);
    // note that delegates are actually called as delegate(tag, args...);
    call_delegate:
            function() {
                var args = Array.prototype.slice.call(arguments);
                var delegate_name = args.shift();
                args.unshift(this);
                if (typeof this.delegates[delegate_name] == 'function') {
                    return this.delegates[delegate_name].apply(undefined, args);
                } else {
                    return undefined;
                }
            }
});
