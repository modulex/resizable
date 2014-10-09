/**
 * Resizable tc.
 * @author yiminghe@gmail.com
 */
/*jshint quotmark:false*/
var UA = require('ua');
var util = require('util');
var Resizable = require('resizable');
// ie9 mousemove does not fire
var ie = UA.ieMode;
if (ie === 9 || ie === 11) {
    return;
}

var $ = require('node');

describe('preserveRatio works', function () {
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
            preserveRatio: true,
            handlers: ["b", "t", "r", "l"]
        });
        lNode = dom.one('.ks-resizable-handler-l');
    });

    afterEach(function(){
        resizable.destroy();
        dom.remove();
    });

    it('l resize works', function (done) {
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
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 82,
                    clientY: 110
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.width() - 120).to.within(-5, 5);
                expect(dom.height() - 120).to.within(-5, 5);
                expect(dom.offset().left - 80).to.within(-5, 5);
                expect(dom.offset().top - 100).to.within(-5, 5);
            })], done);
    });
});