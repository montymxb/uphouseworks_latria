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

function SmoothScroll() {}

SmoothScroll.prototype = {

    // gets the current y position
    _getCurrentYPos: function() {
        if (document.pageYOffset) {
            // Firefox, Chrome, Opera, Safari
            return document.getElementById('content-window').scrollTop;

        } else if (document.documentElement && document.documentElement.scrollTop) {
            // Internet Explorer 6 - standards mode
            return document.getElementById('content-window').scrollTop;

        } else if (document.body.scrollTop) {
            // Internet Explorer 6, 7 and 8
            return document.getElementById('content-window').scrollTop;

        }

        // default to scrollTop
        return document.getElementById('content-window').scrollTop;
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
    scrollToId: function(eID, scrollRate) {

        // frame rate of 16.67 milliseconds
        var frameRate   = 16.6666666667;

        if(!scrollRate) {
            // default scroll rate
            scrollRate = 0.75;
        }

        // get our current Y
        var currentY    = this._getCurrentYPos();

        // get our target element's Y pos
        var stopY       = this._getElementYPos(eID);

        var x = 0;

        if(stopY > currentY) {
            // scroll down

            // set moveY
            currentY += Math.pow(stopY - currentY * 1.0, scrollRate);

            // loop until we reach our target
            while(currentY < stopY) {
                setTimeout("document.getElementById('content-window').scrollTo(0, "+currentY+")", x++*frameRate);

                // increment our currentY
                currentY += Math.pow(stopY - currentY * 1.0, scrollRate);
            }

        } else if(stopY < currentY) {
            // scroll up

            // set moveY
            currentY -= Math.pow(currentY - stopY * 1.0, scrollRate);

            // loop until we reach our target
            while(currentY > stopY) {
                setTimeout("document.getElementById('content-window').scrollTo(0, "+currentY+")", x++*frameRate);

                // decrement our currentY
                currentY -= Math.pow(currentY - stopY * 1.0, scrollRate);
            }
        }
    }
};

SmoothScroll = new SmoothScroll();
