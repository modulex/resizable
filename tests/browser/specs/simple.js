/**
 * Resizable tc.
 * @author yiminghe@gmail.com
 */
var UA = require('ua');
var util = require('util');
var Resizable = require('resizable');
/*jshint quotmark:false*/
// ie9 mousemove does not fire
var ie = UA.ieMode;
if (ie === 9 || ie === 11) {
    return;
}

var $ = require('node');

describe('resizable works', function () {
    var cssText = 'position: absolute;' +
        'width: 100px;height: 100px;' +
        'left: 100px;top:100px;';

    var dom = $('<div></div>').appendTo('body');
    dom.attr('style', cssText);

    beforeEach(function () {
        dom.attr('style', cssText);
    });

    var resizable = new Resizable({
        node: dom,
        handlers: ["b", "t", "r", "l", "tr", 'tl', "br", 'bl']
    });

    var lNode = dom.one('.ks-resizable-handler-l');

    var rNode = dom.one('.ks-resizable-handler-r');

    var bNode = dom.one('.ks-resizable-handler-b');

    var tNode = dom.one('.ks-resizable-handler-t');

    var blNode = dom.one('.ks-resizable-handler-bl');

    var brNode = dom.one('.ks-resizable-handler-br');

    var tlNode = dom.one('.ks-resizable-handler-tl');

    var trNode = dom.one('.ks-resizable-handler-tr');

    var start, end;

    resizable.on('resizeStart', function (e) {
        start = e.handler;
    });
    resizable.on('resizeEnd', function (e) {
        end = e.handler;
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
                expect(dom.offset().left - 80).to.within(-5, 5);
                expect(dom.height() - 100).to.within(-5, 5);
                expect(dom.offset().top - 100).to.within(-5, 5);
            }),
            runs(function () {
                expect(start).to.be('l');
                expect(end).to.be('l');
            })], done);
    });

    it('r resize works', function (done) {
        window.simulateEvent(rNode[0], 'mousedown', {
            clientX: 198,
            clientY: 110
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 208,
                    clientY: 110
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 218,
                    clientY: 110
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 218,
                    clientY: 110
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.width() - 120).to.within(-5, 5);
                expect(dom.offset().left - 100).to.within(-5, 5);
            }),
            runs(function () {
                expect(start).to.be('r');
                expect(end).to.be('r');
            })], done);
    });

    it('t resize works', function (done) {
        window.simulateEvent(tNode[0], 'mousedown', {
            clientX: 102,
            clientY: 102
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 102,
                    clientY: 92
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 102,
                    clientY: 82
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 102,
                    clientY: 82
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.height() - 120).to.within(-5, 5);
                expect(dom.offset().top - 80).to.within(-5, 5);
            })], done);
    });

    it('b resize works', function (done) {
        window.simulateEvent(bNode[0], 'mousedown', {
            clientX: 102,
            clientY: 202
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 102,
                    clientY: 212
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 102,
                    clientY: 222
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 102,
                    clientY: 222
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.height() - 120).to.within(-5, 5);
                expect(dom.offset().top - 100).to.within(-5, 5);
            })], done);
    });

    it('bl resize works', function (done) {
        window.simulateEvent(blNode[0], 'mousedown', {
            clientX: 102,
            clientY: 198
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 92,
                    clientY: 208
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 82,
                    clientY: 218
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 82,
                    clientY: 218
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.height() - 120).to.within(-5, 5);
                expect(dom.width() - 120).to.within(-5, 5);
                expect(dom.offset().top - 100).to.within(-5, 5);
                expect(dom.offset().left - 80).to.within(-5, 5);
            }),
            runs(function () {
                expect(start).to.be('bl');
                expect(end).to.be('bl');
            })], done);
    });

    it('tl resize works', function (done) {
        window.simulateEvent(tlNode[0], 'mousedown', {
            clientX: 102,
            clientY: 102
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 112,
                    clientY: 112
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 122,
                    clientY: 122
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 122,
                    clientY: 122
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.height() - 80).to.within(-5, 5);
                expect(dom.width() - 80).to.within(-5, 5);
                expect(dom.offset().top - 120).to.within(-5, 5);
                expect(dom.offset().left - 120).to.within(-5, 5);
            })], done);
    });

    it('tr resize works', function (done) {
        window.simulateEvent(trNode[0], 'mousedown', {
            clientX: 198,
            clientY: 102
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 208,
                    clientY: 92
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 218,
                    clientY: 82
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 218,
                    clientY: 82
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.height() - 120).to.within(-5, 5);
                expect(dom.width() - 120).to.within(-5, 5);
                expect(dom.offset().top - 80).to.within(-5, 5);
                expect(dom.offset().left - 100).to.within(-5, 5);
            })], done);
    });

    it('br resize works', function (done) {
        window.simulateEvent(brNode[0], 'mousedown', {
            clientX: 198,
            clientY: 198
        });
        async.series([
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 208,
                    clientY: 208
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mousemove', {
                    clientX: 218,
                    clientY: 218
                });
            }),
            waits(200),
            runs(function () {
                window.simulateEvent(document, 'mouseup', {
                    clientX: 218,
                    clientY: 218
                });
            }),
            waits(200),
            runs(function () {
                expect(dom.height() - 120).to.within(-5, 5);
                expect(dom.width() - 120).to.within(-5, 5);
                expect(dom.offset().top - 100).to.within(-5, 5);
                expect(dom.offset().left - 100).to.within(-5, 5);
            })], done);
    });

    it('disabled works for true', function (done) {
        resizable.set('disabled', true);
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
                expect(dom.width() - 100).to.within(-5, 5);
                expect(dom.offset().left - 100).to.within(-5, 5);
            })], done);
    });

    it('disabled works for false', function (done) {
        resizable.set('disabled', false);
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
                expect(dom.offset().left - 80).to.within(-5, 5);
            })], done);
    });

    it('destroy works',function(){
        resizable.destroy();
        util.each(['t', 'l', 'b', 'r', 'tl', 'tr', 'bl', 'br'], function (s) {
            expect(dom.one('.ks-resizable-handler-' + s)).to.be(null);
        });
        dom.remove();
    });
});