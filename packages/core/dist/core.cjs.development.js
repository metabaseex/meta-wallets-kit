'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('@meta-wallets-kit/types');
var rxjs = require('rxjs');
var Web3ProvidersWs = require('web3-providers-ws');
var Web3ProvidersHttp = require('web3-providers-http');

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var WebsocketProvider = Web3ProvidersWs;
var HttpProvider = Web3ProvidersHttp;
var Web3WalletsManager = /*#__PURE__*/function () {
  function Web3WalletsManager(options) {
    this.txWeb3 = new rxjs.BehaviorSubject(null);
    this.account = new rxjs.BehaviorSubject(null);
    this.chainId = new rxjs.BehaviorSubject(null);
    this.status = new rxjs.BehaviorSubject('disconnected');
    this.activeConnector = null;
    this.accountSubscription = null;
    this.chainIdSubscription = null;
    this.disconnectSubscription = null;
    this.options = _extends({}, options, {
      defaultProvider: _extends({
        network: 'mainnet'
      }, options.defaultProvider)
    });
    this.checkOptions();
    this.web3 = options.makeWeb3(this.getDefaultProvider());
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleChainIdChange = this.handleChainIdChange.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }
  var _proto = Web3WalletsManager.prototype;
  _proto.connect = /*#__PURE__*/function () {
    var _connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connector) {
      var makeWeb3, _yield$connector$conn, provider, web3, account, chainId;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.disconnect();
          case 2:
            this.activeConnector = connector;
            makeWeb3 = this.options.makeWeb3;
            _context.prev = 4;
            this.status.next('pending');
            _context.next = 8;
            return connector.connect();
          case 8:
            _yield$connector$conn = _context.sent;
            provider = _yield$connector$conn.provider;
            web3 = makeWeb3(provider);
            this.txWeb3.next(web3);
            _context.next = 14;
            return getAccount(connector);
          case 14:
            account = _context.sent;
            this.account.next(account);
            _context.next = 18;
            return getChainId(connector);
          case 18:
            chainId = _context.sent;
            this.chainId.next(chainId);
            this.accountSubscription = connector.subscribeConnectAccount(this.handleAccountChange);
            this.chainIdSubscription = connector.subscribeChainId(this.handleChainIdChange);
            this.disconnectSubscription = connector.subscribeDisconnect(this.handleDisconnect);
            this.status.next('connected');
            return _context.abrupt("return", {
              provider: provider,
              account: account,
              chainId: chainId
            });
          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](4);
            this.disconnect();
            throw _context.t0;
          case 31:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[4, 27]]);
    }));
    function connect(_x) {
      return _connect.apply(this, arguments);
    }
    return connect;
  }();
  _proto.disconnect = /*#__PURE__*/function () {
    var _disconnect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            this.accountSubscription && this.accountSubscription.unsubscribe();
            this.chainIdSubscription && this.chainIdSubscription.unsubscribe();
            this.disconnectSubscription && this.disconnectSubscription.unsubscribe();
            _context2.t0 = this.activeConnector;
            if (!_context2.t0) {
              _context2.next = 8;
              break;
            }
            _context2.next = 8;
            return this.activeConnector.disconnect();
          case 8:
            _context2.prev = 8;
            this.resetState();
            return _context2.finish(8);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0,, 8, 11]]);
    }));
    function disconnect() {
      return _disconnect.apply(this, arguments);
    }
    return disconnect;
  }();
  _proto.resetState = function resetState() {
    this.activeConnector = null;
    this.accountSubscription = null;
    this.chainIdSubscription = null;
    this.disconnectSubscription = null;
    this.txWeb3.next(null);
    this.account.next(null);
    this.chainId.next(null);
    this.status.next('disconnected');
  };
  _proto.checkOptions = function checkOptions() {
    if (!('httpRpcUrl' in this.options.defaultProvider) && !('wsRpcUrl' in this.options.defaultProvider) && !('infuraAccessToken' in this.options.defaultProvider)) {
      console.error('You need to configure one of these parameters: "httpRpcUrl", "wsRpcUrl" or "infuraAccessToken".');
    }
  };
  _proto.getDefaultProvider = function getDefaultProvider() {
    if ('httpRpcUrl' in this.options.defaultProvider) {
      var _this$options$default = this.options.defaultProvider,
        httpRpcUrl = _this$options$default.httpRpcUrl,
        options = _this$options$default.options;
      return new HttpProvider(httpRpcUrl, options);
    }
    var defaultReconnectOptions = {
      auto: true,
      delay: 5000
    };
    if ('wsRpcUrl' in this.options.defaultProvider) {
      var _this$options$default2 = this.options.defaultProvider,
        wsRpcUrl = _this$options$default2.wsRpcUrl,
        _options = _this$options$default2.options;
      return new WebsocketProvider(wsRpcUrl, _extends({}, _options, {
        reconnect: _extends({}, defaultReconnectOptions, _options == null ? void 0 : _options.reconnect)
      }));
    }
    if ('infuraAccessToken' in this.options.defaultProvider) {
      var _this$options$default3 = this.options.defaultProvider,
        infuraAccessToken = _this$options$default3.infuraAccessToken,
        _this$options$default4 = _this$options$default3.network,
        network = _this$options$default4 === void 0 ? 'mainnet' : _this$options$default4,
        _options2 = _this$options$default3.options;
      return new WebsocketProvider("wss://" + network + ".infura.io/ws/v3/" + infuraAccessToken, _extends({}, _options2, {
        reconnect: _extends({}, defaultReconnectOptions, _options2 == null ? void 0 : _options2.reconnect)
      }));
    }
    return assertNever(this.options.defaultProvider);
  };
  _proto.handleAccountChange = function handleAccountChange(account) {
    this.account.next(account);
  };
  _proto.handleChainIdChange = function handleChainIdChange(chainId) {
    this.chainId.next(chainId);
  };
  _proto.handleDisconnect = function handleDisconnect() {
    this.disconnect();
  };
  return Web3WalletsManager;
}();
function assertNever(value) {
  throw new Error("Unexpected value: " + value);
}
function getAccount(_x2) {
  return _getAccount.apply(this, arguments);
}
function _getAccount() {
  _getAccount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(connector) {
    var account;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return connector.getAccount();
        case 2:
          account = _context3.sent;
          if (account) {
            _context3.next = 5;
            break;
          }
          throw new Error('No Ethereum accounts found, you need to create an account in your wallet');
        case 5:
          return _context3.abrupt("return", account);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getAccount.apply(this, arguments);
}
function getChainId(_x3) {
  return _getChainId.apply(this, arguments);
}
function _getChainId() {
  _getChainId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(connector) {
    var chainId;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return connector.getChainId();
        case 2:
          chainId = _context4.sent;
          if (chainId) {
            _context4.next = 5;
            break;
          }
          throw new Error('ChainID is not found, you need to choose a network in your wallet');
        case 5:
          return _context4.abrupt("return", chainId);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getChainId.apply(this, arguments);
}

Object.keys(types).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return types[k];
    }
  });
});
exports.Web3WalletsManager = Web3WalletsManager;
exports.assertNever = assertNever;
//# sourceMappingURL=core.cjs.development.js.map
