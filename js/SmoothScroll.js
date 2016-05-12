"use strict";

/*
 * Created 05/03/2016
 *
 * Copyright © Axolsoft 2016
 *
 * SmoothScroll.js
 *
 * SmoothScrolling in Vanilla JS
 * 
 */

function SmoothScroll() {
    this.timeouts = [];
    this.velocity = 0.0;
}

SmoothScroll.prototype = {

    // gets the current y position
    _getCurrentYPos: function(pane) {

        var doc = window;

        // check to use a passed viewing pane
        if(pane) {
            return document.getElementById(pane).scrollTop;
        } else {
            return window.pageYOffset;
        }

        if (document.pageYOffset) {
            // Firefox, Chrome, Opera, Safari
            return doc.scrollTop;

        } else if (document.documentElement && document.documentElement.scrollTop) {
            // Internet Explorer 6 - standards mode
            return doc.scrollTop;

        } else if (document.body.scrollTop) {
            // Internet Explorer 6, 7 and 8
            return doc.scrollTop;

        }

        // default to scrollTop
        return doc.scrollTop;
    },


    // gets the element's y position
    _getElementYPos: function(eID) {
        var elm     = document.getElementById(eID);
        var y       = elm.offsetTop;
        var node    = elm;

        // dig into our branches until we reach the end
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y   += node.offsetTop;

        }
        return y;
    },


    // smooth scrolls to an element by id
    scrollToId: function(eID, scrollRate, scrollPane) {

        // frame rate of 16.67 milliseconds
        var frameRate   = 16.6666666667;

        if(!scrollRate) {
            // default scroll rate
            scrollRate = 0.7;
        }

        // get our current Y
        var currentY    = this._getCurrentYPos(scrollPane);

        // get our target element's Y pos
        var stopY       = this._getElementYPos(eID);

        // check to clear existing timeouts
        if(this.timeouts.length > 0) {
            // clear all existing timeouts
            const timeoutLen = this.timeouts.length;
            for(var x = 0; x < timeoutLen; x++) {
                clearTimeout(this.timeouts[x]);

            }
        }

        // set framecounter
        var x = 0;

        if(stopY > currentY) {
            // scroll down

            // set moveY
            currentY += Math.pow(stopY - currentY * 1.0, scrollRate);

            // loop until we reach our target
            while(currentY < stopY) {
                const _currentY = currentY;
                const _x = x;
                const _this = this;

                this.timeouts.push(setTimeout(function() {
                    // scroll to this point for this frame
                    if(scrollPane) {
                        document.getElementById(scrollPane).scrollTo(0, _currentY);
                    } else {
                        window.scrollTo(0, _currentY);
                    }

                    // splice out this timeout element
                    _this.timeouts.splice(_x, 1);


                }, x++*frameRate));

                // increment our currentY
                currentY += Math.pow(stopY - currentY * 1.0, scrollRate);
            }

        } else if(stopY < currentY) {
            // scroll up

            // set moveY
            currentY -= Math.pow(currentY - stopY * 1.0, scrollRate);

            // loop until we reach our target
            while(currentY > stopY) {
                const _currentY = currentY;
                const _x = x;
                const _this = this;

                this.timeouts.push(setTimeout(function() {
                    // scroll to this point for this frame
                    if(scrollPane) {
                        document.getElementById(scrollPane).scrollTo(0, _currentY);
                    } else {
                        window.scrollTo(0, _currentY);
                    }

                    // splice out this timeout element
                    _this.timeouts.splice(_x, 1);

                }, x++*frameRate));

                // decrement our currentY
                currentY -= Math.pow(currentY - stopY * 1.0, scrollRate);
            }
        }
    }
};

SmoothScroll = new SmoothScroll();
