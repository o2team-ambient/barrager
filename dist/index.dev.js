(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ATAmbient = factory());
}(this, (function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "@charset \"UTF-8\";\n/* 自定义样式 */\n.o2team_ambient_main {\n  position: fixed;\n  z-index: 999;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n";
  styleInject(css);

  var id = 'barrager';
  var ID = id.toUpperCase();
  var O2_AMBIENT_MAIN = "O2_AMBIENT_".concat(ID, "_MAIN");
  var O2_AMBIENT_INIT = "O2_AMBIENT_".concat(ID, "_INIT");
  var O2_AMBIENT_CONFIG = "O2_AMBIENT_".concat(ID, "_CONFIG");

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license
  (function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window["".concat(vendors[x], "RequestAnimationFrame")];
      window.cancelAnimationFrame = window["".concat(vendors[x], "CancelAnimationFrame")] || window["".concat(vendors[x], "CancelRequestAnimationFrame")];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  // t: current time（当前时间）
  // b: beginning value（初始值）
  // c: change in value（变化量）
  // d: duration（持续时间）
  var Tween = {
    Linear: function Linear(t, b, c, d) {
      return c * t / d + b;
    },
    Quad: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
      }
    },
    Cubic: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    },
    Quart: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    Quint: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    Sine: {
      easeIn: function easeIn(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      }
    },
    Expo: {
      easeIn: function easeIn(t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    Circ: {
      easeIn: function easeIn(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    Elastic: {
      easeIn: function easeIn(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;

        if (!a || a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);

        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOut: function easeOut(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;

        if (!a || a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);

        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOut: function easeInOut(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);

        if (!a || a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);

        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      }
    },
    Back: {
      easeIn: function easeIn(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOut: function easeOut(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      }
    },
    Bounce: {
      easeIn: function easeIn(t, b, c, d) {
        return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    },
    //----------
    Pow8: {
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t * t * t * t * t + 1) + b;
      }
    }
  };

  var BarragerCanvas =
  /*#__PURE__*/
  function () {
    function BarragerCanvas(canvas, _opts) {
      var _this = this;

      classCallCheck(this, BarragerCanvas);

      defineProperty(this, "toggleBarrager", function () {
        if (_this.visibleState === 'visible') {
          _this.visibleState = 'invisible';

          _this.stopBarrager();
        } else {
          _this.visibleState = 'visible';

          _this.playBarrager();
        }
      });

      defineProperty(this, "reset", function (opts) {
        _this.opts = opts || _this.opts;

        _this.endBarrager();

        _this.init();
      });

      this.opts = _opts;
      this.itemData = [];
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.visibleState = 'visible';
      this.moveFn = {
        linear: Tween.Linear,
        easeIn: Tween.Quad.easeIn,
        easeInOut: Tween.Quad.easeInOut,
        easeOut: Tween.Quad.easeOut // 总弹幕数

      };
      this.itemNum = 0; // 当前显示的弹幕数

      this.hasNum = 0;
      this.randomKey = 0;
      this.bindEvent();
    }

    createClass(BarragerCanvas, [{
      key: "bindEvent",
      value: function bindEvent() {
        window.addEventListener('resize', this.reset);
        document.addEventListener('visibilitychange', this.toggleBarrager);
      }
    }, {
      key: "init",
      value: function init() {
        var _this2 = this;

        var _this$opts = this.opts,
            showNum = _this$opts.showNum,
            direction = _this$opts.direction,
            width = _this$opts.width,
            height = _this$opts.height;
        var realWidth = document.documentElement.clientWidth;
        var realHeight = document.documentElement.clientHeight;
        var canvasWidth = width;
        var canvasHeight = height;

        if (realWidth < width) {
          canvasWidth = realWidth;
        }

        if (realHeight < height) {
          canvasHeight = realHeight;
        }

        this.canvas.style.width = "".concat(canvasWidth, "px");
        this.canvas.style.height = "".concat(canvasHeight, "px");
        this.width = this.canvas.width = canvasWidth;
        this.height = this.canvas.height = canvasHeight;
        this.allDistance = direction === 'horizontal' ? this.width : this.height; // 定时随机生成弹幕

        var timeFn = function timeFn(timeGap) {
          _this2.timer = setTimeout(function () {
            _this2.updateBarrager();

            showNum > _this2.hasNum && timeFn(Math.floor(Math.random() * 1000) + 500);
          }, timeGap);
        };

        this.updateBarrager();
        timeFn(Math.floor(Math.random() * 500));
        requestAnimationFrame(this.draw.bind(this));
      }
    }, {
      key: "updateBarrager",
      value: function updateBarrager(removeItem) {
        var _this$opts2 = this.opts,
            allNum = _this$opts2.allNum,
            showNum = _this$opts2.showNum;
        var newItemData; // 是否有要移除的Item

        if (removeItem) {
          newItemData = this.itemData.filter(function (nItem) {
            return nItem.key !== removeItem.key;
          });
          this.hasNum--;
        } else {
          newItemData = this.itemData;
        } // 表示所有弹幕显示完毕或者 当前显示的弹幕数超过了限制值


        if (allNum > this.itemNum && showNum > this.hasNum) {
          newItemData.push(this.generateItem());
        }

        if (allNum <= this.itemNum) {
          this.destroyBarrger();
        }

        this.itemData = newItemData;
      }
    }, {
      key: "generateItem",
      value: function generateItem() {
        var _this$opts3 = this.opts,
            opacity = _this$opts3.opacity,
            speed = _this$opts3.speed,
            direction = _this$opts3.direction,
            easeType = _this$opts3.easeType,
            contents = _this$opts3.contents;
        var key = this.getRandomKey();
        var baseLong = 8;
        var randomIdx = Math.floor(Math.random() * contents.length);
        var content = contents[randomIdx];
        var realSpeed = Math.sqrt(content.length) / Math.sqrt(baseLong) * speed;
        if (this.width < 720) realSpeed = realSpeed / 2;
        var offset = content.length / baseLong * 150;
        var randomX = Math.floor(Math.random() * this.width);
        var randomY = Math.floor(Math.random() * this.height * 0.9);
        randomX = randomX - randomX % 16;
        randomY = randomY - randomY % 16;
        var props = {
          startTime: null,
          x: direction === 'vertical' ? randomX : 0,
          y: direction === 'horizontal' ? randomY : 0,
          key: key,
          opacity: opacity,
          speed: realSpeed,
          direction: direction,
          easeType: easeType,
          allDistance: this.allDistance + offset * 2,
          allTime: this.allDistance / realSpeed * 1000,
          content: content,
          offset: offset,
          destroy: this.updateBarrager.bind(this)
        };
        this.itemNum++;
        this.hasNum++;
        return props;
      }
    }, {
      key: "getRandomKey",
      value: function getRandomKey() {
        return "o2h5-randow-".concat(Date.now(), "-").concat(this.randomKey++);
      }
    }, {
      key: "drawItem",
      value: function drawItem(item, timestamp) {
        var easeType = item.easeType,
            allDistance = item.allDistance,
            allTime = item.allTime,
            direction = item.direction,
            opacity = item.opacity,
            offset = item.offset;
        if (!item.startTime) item.startTime = timestamp;
        if (!item.lastTime) item.lastTime = timestamp; // 记录间隔是否过长，是则认为是进入了后台，暂停等，需要更新开始时间

        var lastGap = timestamp - item.lastTime;

        if (lastGap > 500) {
          item.startTime = item.startTime + lastGap;
        }

        var timeGap = timestamp - item.startTime;

        if (timeGap < allTime) {
          var moveDis = this.moveFn[easeType](timeGap, 0, allDistance, allTime);
          this.context.fillStyle = "rgba(255, 255, 255, ".concat(opacity, ")");

          if (direction === 'horizontal') {
            item.x = allDistance - moveDis - offset;
          } else {
            item.y = allDistance - moveDis - offset;
          }

          this.context.fillText(item.content, item.x, item.y);
          item.lastTime = timestamp;
        } else {
          item.destroy(item);
        }
      }
    }, {
      key: "draw",
      value: function draw(timestamp) {
        var _this3 = this;

        var fontSize = this.opts.fontSize;
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.font = "".concat(fontSize, "px \u5FAE\u8F6F\u96C5\u9ED1");
        this.context.textBaseline = 'top';
        this.itemData.forEach(function (item) {
          _this3.drawItem(item, timestamp);
        });
        this.timer = requestAnimationFrame(this.draw.bind(this));
      }
    }, {
      key: "stopBarrager",
      value: function stopBarrager() {
        cancelAnimationFrame(this.timer);
        this.timer = null;
      }
    }, {
      key: "playBarrager",
      value: function playBarrager() {
        this.timer = requestAnimationFrame(this.draw.bind(this));
      }
    }, {
      key: "endBarrager",
      value: function endBarrager() {
        this.itemData = [];
        this.itemNum = 0;
        this.hasNum = 0;
        this.context.clearRect(0, 0, this.width, this.height);
        cancelAnimationFrame(this.timer);
      }
    }, {
      key: "destroyBarrger",
      value: function destroyBarrger() {
        this.stopBarrager();
        this.canvas.remove();
      }
    }]);

    return BarragerCanvas;
  }();

  var wrapper = document.querySelector('.o2team_ambient_main');

  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'o2team_ambient_main');
    wrapper.setAttribute('id', 'o2team_ambient_main');
    var inner = document.createElement('canvas');
    inner.setAttribute('class', 'canvas_wp');
    inner.setAttribute('id', 'barrager_canvas_wp');
    inner.setAttribute('style', 'display: block; margin: 0 auto;');
    wrapper.insertAdjacentElement('beforeend', inner);
    document.body.insertAdjacentElement('beforeend', wrapper);
  }

  wrapper.addEventListener('click', function () {
    wrapper.style.display = 'none';
  });
  var barrager; // 初始化函数

  function initAmbient() {
    try {
      if (barrager) {
        barrager.endBarrager();
        barrager = null;
      }

      var canvas = document.getElementById('barrager_canvas_wp');
      var opts = window[O2_AMBIENT_CONFIG];
      barrager = new BarragerCanvas(canvas, opts);
      barrager.init();
      window[O2_AMBIENT_MAIN] = barrager;
    } catch (err) {
      console.log(err);
    }
  } // 初始化函数

  window[O2_AMBIENT_INIT] = initAmbient;

  window[O2_AMBIENT_CONFIG] = {
    allNum: 200,
    // 弹幕总数量
    showNum: 40,
    // 一屏最多显示的弹幕数量
    opacity: 1,
    speed: 60,
    direction: 'horizontal',
    easeType: 'linear',
    width: 1960,
    height: 1200,
    fontSize: 14,
    contents: ['京东超市吃货嘉年华', '神券 517 减 300', '5月12日到5月19日持续8天', '食品全品类满 517 减 300', '食品全品类满 517 减 200', '食品全品类满 517 减 100', '食品全品类满 517 减 50', '食品全品类满 517 减 20', '食品全品类满 517 减 5']
  };

  function rollup_index (opts) {
    opts && Object.keys(window[O2_AMBIENT_CONFIG]).forEach(function (key) {
      if (typeof opts[key] === 'undefined') return;
      window[O2_AMBIENT_CONFIG][key] = opts[key];
    });
    initAmbient();
  }

  return rollup_index;

})));
