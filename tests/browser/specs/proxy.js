/**
 * Resizable tc.
 * @author yiminghe@gmail.com
 */
var UA = require('ua');
var util = require('util');
var Resizable = require('resizable');
var ResizableProxyPlugin = require('resizable/plugin/proxy');
/*jshint quotmark:false*/
// ie9 mousemove does not fire
var ie = UA.ieMode;
if (ie === 9 || ie === 11) {
    return;
}

var $ = require('node');

describe('proxy works', function () {
    function equalRect(expect, actual) {
        for (var i in actual) {
            if (actual[i] - expect[i] < 5) {
            } else {
                return false;
            }
        }
        return true;
    }

    var cssText = 'position: absolute;' +
        'width: 100px;height: 100px;' +
        'left: 100px;top:100px;';

    var dom;
    var resizable;
    var lNode;

    beforeEach(function () {
        dom = $('<div></div>').appendTo('body');
        dom.attr('style', cssText);
        resizable = new Resizable({
            node: dom,
            plugins: [ResizableProxyPlugin],
            preserveRatio: true,
            handlers: ["b", "t", "r", "l"]
        });
        lNode = dom.one('.ks-resizable-handler-l');
    });

    afterEach(function(){
        resizable.destroy();
        dom.remove();
    });

    function getRegion(dom) {
        return {
            width: dom.width(),
            height: dom.height(),
            left: dom.offset().left,
            top: dom.offset().top
        };
    }

    it('l resize works', function (done) {
        var originRegion = getRegion(dom);
        window.simulateEvent(lNode[0], 'mousedown', {
            clientX: 102,
            clientY: 110
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 92,
                    clientY: 110
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 82,
                    clientY: 110
                });
            }),
            runs(function () {
                expect(equalRect(originRegion, getRegion(dom))).to.be(true);
                expect(equalRect(originRegion, getRegion(resizable
                    .getPlugin('resizable/plugin/proxy')
                    .get('proxyNode')))).to.be(false);
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 82,
                    clientY: 110
                });
            }),
            waits(200),
            runs(function () {
                var actual = getRegion(dom);
                expect(equalRect(actual, {
                    width: 120,
                    height: 120,
                    left: 80,
                    top: 100
                })).to.be(true);
            })], done);
    });
});