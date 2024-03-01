var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-G22Miv/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-G22Miv/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../../../../.nvm/versions/node/v18.19.0/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../../.nvm/versions/node/v18.19.0/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports2, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
      }
    }
    function normalizeStringPosix(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length)
          code = path.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path.slice(lastSlash + 1, i);
            else
              res = path.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      // path.resolve([from ...], to)
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0)
            path = arguments[i];
          else {
            if (cwd === void 0)
              cwd = process.cwd();
            path = cwd;
          }
          assertPath(path);
          if (path.length === 0) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var isAbsolute = path.charCodeAt(0) === 47;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute)
          path = ".";
        if (path.length > 0 && trailingSeparator)
          path += "/";
        if (isAbsolute)
          return "/" + path;
        return path;
      },
      isAbsolute: function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path) {
        return path;
      },
      dirname: function dirname(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path.slice(0, end);
      },
      basename: function basename(path, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
          if (ext.length === path.length && ext === path)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path.length;
          return path.slice(start, end);
        } else {
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path.slice(start, end);
        }
      },
      extname: function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path) {
        assertPath(path);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
          return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path.slice(1, end);
            else
              ret.base = ret.name = path.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
          } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
          }
          ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module.exports = posix;
  }
});

// .wrangler/tmp/bundle-G22Miv/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-G22Miv/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/index.tsx
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/edge/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/components/Button.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/jsx/jsx-runtime/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/jsx/jsx-dev-runtime/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/helper/html/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var escapeRe = /[&<>'"]/;
var stringBufferToString = async (buffer) => {
  let str = "";
  const callbacks = [];
  for (let i = buffer.length - 1; ; i--) {
    str += buffer[i];
    i--;
    if (i < 0) {
      break;
    }
    let r = await buffer[i];
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    const isEscaped = r.isEscaped;
    r = await (typeof r === "object" ? r.toString() : r);
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    if (r.isEscaped ?? isEscaped) {
      str += r;
    } else {
      const buf = [str];
      escapeToBuffer(r, buf);
      str = buf[0];
    }
  }
  return raw(str, callbacks);
};
var escapeToBuffer = (str, buffer) => {
  const match = str.search(escapeRe);
  if (match === -1) {
    buffer[0] += str;
    return;
  }
  let escape;
  let index;
  let lastIndex = 0;
  for (index = match; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    buffer[0] += str.substring(lastIndex, index) + escape;
    lastIndex = index + 1;
  }
  buffer[0] += str.substring(lastIndex, index);
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/jsx/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/constants.js
init_checked_fetch();
init_modules_watch_stub();
var DOM_RENDERER = Symbol("RENDERER");
var DOM_ERROR_HANDLER = Symbol("ERROR_HANDLER");
var DOM_STASH = Symbol("STASH");

// node_modules/hono/dist/jsx/dom/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/dom/jsx-runtime.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/dom/jsx-dev-runtime.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/utils.js
init_checked_fetch();
init_modules_watch_stub();
var normalizeIntrinsicElementProps = (props) => {
  if (props && "className" in props) {
    props["class"] = props["className"];
    delete props["className"];
  }
};

// node_modules/hono/dist/jsx/dom/jsx-dev-runtime.js
var jsxDEV = (tag, props, key) => {
  if (typeof tag === "string") {
    normalizeIntrinsicElementProps(props);
  }
  let children;
  if (props && "children" in props) {
    children = props.children;
    delete props["children"];
  } else {
    children = [];
  }
  return {
    tag,
    props,
    key,
    children: Array.isArray(children) ? children : [children]
  };
};
var Fragment = (props) => jsxDEV("", props, void 0);

// node_modules/hono/dist/jsx/context.js
var globalContexts = [];

// node_modules/hono/dist/jsx/base.js
var emptyTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var booleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var childrenToStringToBuffer = (children, buffer) => {
  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];
    if (typeof child === "string") {
      escapeToBuffer(child, buffer);
    } else if (typeof child === "boolean" || child === null || child === void 0) {
      continue;
    } else if (child instanceof JSXNode) {
      child.toStringToBuffer(buffer);
    } else if (typeof child === "number" || child.isEscaped) {
      ;
      buffer[0] += child;
    } else if (child instanceof Promise) {
      buffer.unshift("", child);
    } else {
      childrenToStringToBuffer(child, buffer);
    }
  }
};
var JSXNode = class {
  constructor(tag, props, children) {
    this.isEscaped = true;
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  toString() {
    const buffer = [""];
    this.localContexts?.forEach(([context, value]) => {
      context.values.push(value);
    });
    try {
      this.toStringToBuffer(buffer);
    } finally {
      this.localContexts?.forEach(([context]) => {
        context.values.pop();
      });
    }
    return buffer.length === 1 ? buffer[0] : stringBufferToString(buffer);
  }
  toStringToBuffer(buffer) {
    const tag = this.tag;
    const props = this.props;
    let { children } = this;
    buffer[0] += `<${tag}`;
    const propsKeys = Object.keys(props || {});
    for (let i = 0, len = propsKeys.length; i < len; i++) {
      const key = propsKeys[i];
      const v = props[key];
      if (key === "style" && typeof v === "object") {
        const styles = Object.keys(v).map((k) => {
          const property = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
          return `${property}:${v[k]}`;
        }).join(";");
        buffer[0] += ` style="${styles}"`;
      } else if (typeof v === "string") {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v, buffer);
        buffer[0] += '"';
      } else if (v === null || v === void 0) {
      } else if (typeof v === "number" || v.isEscaped) {
        buffer[0] += ` ${key}="${v}"`;
      } else if (typeof v === "boolean" && booleanAttributes.includes(key)) {
        if (v) {
          buffer[0] += ` ${key}=""`;
        }
      } else if (key === "dangerouslySetInnerHTML") {
        if (children.length > 0) {
          throw "Can only set one of `children` or `props.dangerouslySetInnerHTML`.";
        }
        children = [raw(v.__html)];
      } else if (v instanceof Promise) {
        buffer[0] += ` ${key}="`;
        buffer.unshift('"', v);
      } else if (typeof v === "function") {
        if (!key.startsWith("on")) {
          throw `Invalid prop '${key}' of type 'function' supplied to '${tag}'.`;
        }
      } else {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v.toString(), buffer);
        buffer[0] += '"';
      }
    }
    if (emptyTags.includes(tag)) {
      buffer[0] += "/>";
      return;
    }
    buffer[0] += ">";
    childrenToStringToBuffer(children, buffer);
    buffer[0] += `</${tag}>`;
  }
};
var JSXFunctionNode = class extends JSXNode {
  toStringToBuffer(buffer) {
    const { children } = this;
    const res = this.tag.call(null, {
      ...this.props,
      children: children.length <= 1 ? children[0] : children
    });
    if (res instanceof Promise) {
      if (globalContexts.length === 0) {
        buffer.unshift("", res);
      } else {
        const currentContexts = globalContexts.map((c) => [c, c.values.at(-1)]);
        buffer.unshift(
          "",
          res.then((childRes) => {
            if (childRes instanceof JSXNode) {
              childRes.localContexts = currentContexts;
            }
            return childRes;
          })
        );
      }
    } else if (res instanceof JSXNode) {
      res.toStringToBuffer(buffer);
    } else if (typeof res === "number" || res.isEscaped) {
      buffer[0] += res;
    } else {
      escapeToBuffer(res, buffer);
    }
  }
};
var jsx = (tag, props, ...children) => {
  let key;
  if (props) {
    key = props?.key;
    delete props["key"];
  }
  const node = jsxFn(tag, props, children);
  node.key = key;
  return node;
};
var jsxFn = (tag, props, children) => {
  if (typeof tag === "function") {
    return new JSXFunctionNode(tag, props, children);
  } else {
    normalizeIntrinsicElementProps(props);
    return new JSXNode(tag, props, children);
  }
};

// node_modules/hono/dist/jsx/components.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/dom/components.js
init_checked_fetch();
init_modules_watch_stub();
var ErrorBoundary = ({ children, fallback, fallbackRender, onError }) => {
  const res = Fragment({ children });
  res[DOM_ERROR_HANDLER] = (err) => {
    if (err instanceof Promise) {
      throw err;
    }
    onError?.(err);
    return fallbackRender?.(err) || fallback;
  };
  return res;
};
var Suspense = ({
  children,
  fallback
}) => {
  const res = Fragment({ children });
  res[DOM_ERROR_HANDLER] = (err, retry) => {
    if (!(err instanceof Promise)) {
      throw err;
    }
    err.finally(retry);
    return fallback;
  };
  return res;
};

// node_modules/hono/dist/jsx/components.js
var errorBoundaryCounter = 0;
var childrenToString = async (children) => {
  try {
    return children.map((c) => c.toString());
  } catch (e) {
    if (e instanceof Promise) {
      await e;
      return childrenToString(children);
    } else {
      throw e;
    }
  }
};
var ErrorBoundary2 = async ({ children, fallback, fallbackRender, onError }) => {
  if (!children) {
    return raw("");
  }
  if (!Array.isArray(children)) {
    children = [children];
  }
  let fallbackStr;
  const fallbackRes = (error) => {
    onError?.(error);
    return (fallbackStr || fallbackRender?.(error) || "").toString();
  };
  let resArray = [];
  try {
    resArray = children.map((c) => c.toString());
  } catch (e) {
    fallbackStr = await fallback?.toString();
    if (e instanceof Promise) {
      resArray = [
        e.then(() => childrenToString(children)).catch((e2) => fallbackRes(e2))
      ];
    } else {
      resArray = [fallbackRes(e)];
    }
  }
  if (resArray.some((res) => res instanceof Promise)) {
    fallbackStr || (fallbackStr = await fallback?.toString());
    const index = errorBoundaryCounter++;
    const replaceRe = RegExp(`(<template id="E:${index}"></template>.*?)(.*?)(<!--E:${index}-->)`);
    const caught = false;
    const catchCallback = ({ error, buffer }) => {
      if (caught) {
        return "";
      }
      const fallbackResString = fallbackRes(error);
      if (buffer) {
        buffer[0] = buffer[0].replace(replaceRe, fallbackResString);
      }
      return buffer ? "" : `<template data-hono-target="E:${index}">${fallbackResString}</template><script>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${index}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='E:${index}')
d.replaceWith(c.content)
})(document)
<\/script>`;
    };
    return raw(`<template id="E:${index}"></template><!--E:${index}-->`, [
      ({ phase, buffer, context }) => {
        if (phase === HtmlEscapedCallbackPhase.BeforeStream) {
          return;
        }
        return Promise.all(resArray).then(async (htmlArray) => {
          htmlArray = htmlArray.flat();
          const content = htmlArray.join("");
          let html2 = buffer ? "" : `<template data-hono-target="E:${index}">${content}</template><script>
((d,c) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${index}')
if(!d)return
d.parentElement.insertBefore(c.content,d.nextSibling)
})(document)
<\/script>`;
          if (htmlArray.every((html22) => !html22.callbacks?.length)) {
            if (buffer) {
              buffer[0] = buffer[0].replace(replaceRe, content);
            }
            return html2;
          }
          if (buffer) {
            buffer[0] = buffer[0].replace(
              replaceRe,
              (_all, pre, _, post) => `${pre}${content}${post}`
            );
          }
          const callbacks = htmlArray.map((html22) => html22.callbacks || []).flat();
          if (phase === HtmlEscapedCallbackPhase.Stream) {
            html2 = await resolveCallback(
              html2,
              HtmlEscapedCallbackPhase.BeforeStream,
              true,
              context
            );
          }
          let resolvedCount = 0;
          const promises = callbacks.map(
            (c) => (...args) => c(...args)?.then((content2) => {
              resolvedCount++;
              if (buffer) {
                if (resolvedCount === callbacks.length) {
                  buffer[0] = buffer[0].replace(replaceRe, (_all, _pre, content3) => content3);
                }
                buffer[0] += content2;
                return raw("", content2.callbacks);
              }
              return raw(
                content2 + (resolvedCount !== callbacks.length ? "" : `<script>
((d,c,n) => {
d=d.getElementById('E:${index}')
if(!d)return
n=d.nextSibling
while(n.nodeType!=8||n.nodeValue!='E:${index}'){n=n.nextSibling}
n.remove()
d.remove()
})(document)
<\/script>`),
                content2.callbacks
              );
            }).catch((error) => catchCallback({ error, buffer }))
          );
          return raw(html2, promises);
        }).catch((error) => catchCallback({ error, buffer }));
      }
    ]);
  } else {
    return raw(resArray.join(""));
  }
};
ErrorBoundary2[DOM_RENDERER] = ErrorBoundary;

// node_modules/hono/dist/jsx/streaming.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/dom/render.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/hooks/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/jsx/dom/render.js
var buildDataStack = [];

// node_modules/hono/dist/jsx/streaming.js
var suspenseCounter = 0;
var Suspense2 = async ({
  children,
  fallback
}) => {
  if (!children) {
    return fallback.toString();
  }
  if (!Array.isArray(children)) {
    children = [children];
  }
  let resArray = [];
  const stackNode = { [DOM_STASH]: [0, []] };
  const popNodeStack = (value) => {
    buildDataStack.pop();
    return value;
  };
  try {
    stackNode[DOM_STASH][0] = 0;
    buildDataStack.push([[], stackNode]);
    resArray = children.map((c) => c.toString());
  } catch (e) {
    if (e instanceof Promise) {
      resArray = [
        e.then(() => {
          stackNode[DOM_STASH][0] = 0;
          buildDataStack.push([[], stackNode]);
          return childrenToString(children).then(popNodeStack);
        })
      ];
    } else {
      throw e;
    }
  } finally {
    popNodeStack();
  }
  if (resArray.some((res) => res instanceof Promise)) {
    const index = suspenseCounter++;
    const fallbackStr = await fallback.toString();
    return raw(`<template id="H:${index}"></template>${fallbackStr}<!--/$-->`, [
      ...fallbackStr.callbacks || [],
      ({ phase, buffer, context }) => {
        if (phase === HtmlEscapedCallbackPhase.BeforeStream) {
          return;
        }
        return Promise.all(resArray).then(async (htmlArray) => {
          htmlArray = htmlArray.flat();
          const content = htmlArray.join("");
          if (buffer) {
            buffer[0] = buffer[0].replace(
              new RegExp(`<template id="H:${index}"></template>.*?<!--/\\$-->`),
              content
            );
          }
          let html2 = buffer ? "" : `<template data-hono-target="H:${index}">${content}</template><script>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('H:${index}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='/$')
d.replaceWith(c.content)
})(document)
<\/script>`;
          const callbacks = htmlArray.map((html22) => html22.callbacks || []).flat();
          if (!callbacks.length) {
            return html2;
          }
          if (phase === HtmlEscapedCallbackPhase.Stream) {
            html2 = await resolveCallback(html2, HtmlEscapedCallbackPhase.BeforeStream, true, context);
          }
          return raw(html2, callbacks);
        });
      }
    ]);
  } else {
    return raw(resArray.join(""));
  }
};
Suspense2[DOM_RENDERER] = Suspense;
var textEncoder = new TextEncoder();

// node_modules/hono/dist/jsx/types.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/jsx/jsx-dev-runtime/index.js
function jsxDEV2(tag, props, key) {
  let node;
  if (!props || !("children" in props)) {
    node = jsx(tag, props, ...[]);
  } else {
    const children = props.children;
    delete props["children"];
    node = Array.isArray(children) ? jsx(tag, props, ...children) : jsx(tag, props, ...[children]);
  }
  node.key = key;
  return node;
}

// node_modules/frog/_lib/components/Button.js
ButtonRoot.__type = "button";
function ButtonRoot({
  action,
  children,
  // @ts-ignore - private
  index = 1,
  value
}) {
  return [
    jsxDEV2("meta", { property: `fc:frame:button:${index}`, content: children, ...value ? { "data-value": value } : {} }),
    jsxDEV2("meta", { property: `fc:frame:button:${index}:action`, content: "post" }),
    action && jsxDEV2("meta", { property: `fc:frame:button:${index}:target`, content: action })
  ];
}
ButtonLink.__type = "button";
function ButtonLink({
  children,
  // @ts-ignore - private
  index = 1,
  href
}) {
  return [
    jsxDEV2("meta", { property: `fc:frame:button:${index}`, content: children, "data-value": "_l" }),
    jsxDEV2("meta", { property: `fc:frame:button:${index}:action`, content: "link" }),
    jsxDEV2("meta", { property: `fc:frame:button:${index}:target`, content: href })
  ];
}
ButtonMint.__type = "button";
function ButtonMint({
  children,
  // @ts-ignore - private
  index = 1,
  target
}) {
  return [
    jsxDEV2("meta", { property: `fc:frame:button:${index}`, content: children, "data-value": "_m" }),
    jsxDEV2("meta", { property: `fc:frame:button:${index}:action`, content: "mint" }),
    jsxDEV2("meta", { property: `fc:frame:button:${index}:target`, content: target })
  ];
}
ButtonRedirect.__type = "button";
function ButtonRedirect({
  children,
  // @ts-ignore - private
  index = 1,
  location
}) {
  return [
    jsxDEV2("meta", { property: `fc:frame:button:${index}`, content: children, "data-type": "redirect", "data-value": `_r:${location}` }),
    jsxDEV2("meta", { property: `fc:frame:button:${index}:action`, content: "post_redirect" }),
    location && jsxDEV2("meta", { property: `fc:frame:button:${index}:target`, content: location })
  ];
}
ButtonReset.__type = "button";
function ButtonReset({
  children,
  // @ts-ignore - private
  index = 1
}) {
  return jsxDEV2("meta", { property: `fc:frame:button:${index}`, content: children, "data-value": "_c", "data-type": "reset" });
}
var Button = Object.assign(ButtonRoot, {
  Link: ButtonLink,
  Mint: ButtonMint,
  Redirect: ButtonRedirect,
  Reset: ButtonReset
});

// node_modules/frog/_lib/components/TextInput.js
init_checked_fetch();
init_modules_watch_stub();
TextInput.__type = "text-input";
function TextInput({ placeholder }) {
  return jsxDEV2("meta", { property: "fc:frame:input:text", content: placeholder });
}

// node_modules/frog/_lib/frog-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/detect-browser/es/index.js
init_checked_fetch();
init_modules_watch_stub();
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar2; i < l; i++) {
      if (ar2 || !(i in from)) {
        if (!ar2)
          ar2 = Array.prototype.slice.call(from, 0, i);
        ar2[i] = from[i];
      }
    }
  return to.concat(ar2 || Array.prototype.slice.call(from));
};
var BrowserInfo = (
  /** @class */
  function() {
    function BrowserInfo2(name, version2, os2) {
      this.name = name;
      this.version = version2;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  function() {
    function NodeInfo2(version2) {
      this.version = version2;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  function() {
    function SearchBotDeviceInfo2(name, version2, os2, bot) {
      this.name = name;
      this.version = version2;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent("Cloudflare-Workers");
  }
  return getNodeVersion();
}
function matchUserAgent(ua2) {
  return ua2 !== "" && userAgentRules.reduce(function(matched, _a2) {
    var browser = _a2[0], regex = _a2[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua2);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua2) {
  var matchedRule = matchUserAgent(ua2);
  if (!matchedRule) {
    return null;
  }
  var name = matchedRule[0], match = matchedRule[1];
  if (name === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version2 = versionParts.join(".");
  var os2 = detectOS(ua2);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua2);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name, version2, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name, version2, os2);
}
function detectOS(ua2) {
  for (var ii2 = 0, count = operatingSystemRules.length; ii2 < count; ii2++) {
    var _a2 = operatingSystemRules[ii2], os2 = _a2[0], regex = _a2[1];
    var match = regex.exec(ua2);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode = typeof process !== "undefined" && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii2 = 0; ii2 < count; ii2++) {
    output.push("0");
  }
  return output;
}

// node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = (headers, map = {}) => {
  Object.entries(map).forEach(([key, value]) => headers.set(key, value));
  return headers;
};
var _status;
var _executionCtx;
var _headers;
var _preparedHeaders;
var _res;
var _isFresh;
var Context = class {
  constructor(req, options) {
    this.env = {};
    this._var = {};
    this.finalized = false;
    this.error = void 0;
    __privateAdd(this, _status, 200);
    __privateAdd(this, _executionCtx, void 0);
    __privateAdd(this, _headers, void 0);
    __privateAdd(this, _preparedHeaders, void 0);
    __privateAdd(this, _res, void 0);
    __privateAdd(this, _isFresh, true);
    this.layout = void 0;
    this.renderer = (content) => this.html(content);
    this.notFoundHandler = () => new Response();
    this.render = (...args) => this.renderer(...args);
    this.setLayout = (layout) => this.layout = layout;
    this.getLayout = () => this.layout;
    this.setRenderer = (renderer) => {
      this.renderer = renderer;
    };
    this.header = (name, value, options2) => {
      if (value === void 0) {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).delete(name);
        } else if (__privateGet(this, _preparedHeaders)) {
          delete __privateGet(this, _preparedHeaders)[name.toLocaleLowerCase()];
        }
        if (this.finalized) {
          this.res.headers.delete(name);
        }
        return;
      }
      if (options2?.append) {
        if (!__privateGet(this, _headers)) {
          __privateSet(this, _isFresh, false);
          __privateSet(this, _headers, new Headers(__privateGet(this, _preparedHeaders)));
          __privateSet(this, _preparedHeaders, {});
        }
        __privateGet(this, _headers).append(name, value);
      } else {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).set(name, value);
        } else {
          __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
          __privateGet(this, _preparedHeaders)[name.toLowerCase()] = value;
        }
      }
      if (this.finalized) {
        if (options2?.append) {
          this.res.headers.append(name, value);
        } else {
          this.res.headers.set(name, value);
        }
      }
    };
    this.status = (status) => {
      __privateSet(this, _isFresh, false);
      __privateSet(this, _status, status);
    };
    this.set = (key, value) => {
      this._var ?? (this._var = {});
      this._var[key] = value;
    };
    this.get = (key) => {
      return this._var ? this._var[key] : void 0;
    };
    this.newResponse = (data, arg, headers) => {
      if (__privateGet(this, _isFresh) && !headers && !arg && __privateGet(this, _status) === 200) {
        return new Response(data, {
          headers: __privateGet(this, _preparedHeaders)
        });
      }
      if (arg && typeof arg !== "number") {
        const headers2 = setHeaders(new Headers(arg.headers), __privateGet(this, _preparedHeaders));
        return new Response(data, {
          headers: headers2,
          status: arg.status ?? __privateGet(this, _status)
        });
      }
      const status = typeof arg === "number" ? arg : __privateGet(this, _status);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
      setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
      if (__privateGet(this, _res)) {
        __privateGet(this, _res).headers.forEach((v, k) => {
          __privateGet(this, _headers)?.set(k, v);
        });
        setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
      }
      headers ?? (headers = {});
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          __privateGet(this, _headers).set(k, v);
        } else {
          __privateGet(this, _headers).delete(k);
          for (const v2 of v) {
            __privateGet(this, _headers).append(k, v2);
          }
        }
      }
      return new Response(data, {
        status,
        headers: __privateGet(this, _headers)
      });
    };
    this.body = (data, arg, headers) => {
      return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
    };
    this.text = (text, arg, headers) => {
      if (!__privateGet(this, _preparedHeaders)) {
        if (__privateGet(this, _isFresh) && !headers && !arg) {
          return new Response(text);
        }
        __privateSet(this, _preparedHeaders, {});
      }
      __privateGet(this, _preparedHeaders)["content-type"] = TEXT_PLAIN;
      return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
    };
    this.json = (object, arg, headers) => {
      const body = JSON.stringify(object);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "application/json; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
    };
    this.html = (html2, arg, headers) => {
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "text/html; charset=UTF-8";
      if (typeof html2 === "object") {
        if (!(html2 instanceof Promise)) {
          html2 = html2.toString();
        }
        if (html2 instanceof Promise) {
          return html2.then((html22) => resolveCallback(html22, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html22) => {
            return typeof arg === "number" ? this.newResponse(html22, arg, headers) : this.newResponse(html22, arg);
          });
        }
      }
      return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
    };
    this.redirect = (location, status = 302) => {
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
      __privateGet(this, _headers).set("Location", location);
      return this.newResponse(null, status);
    };
    this.notFound = () => {
      return this.notFoundHandler(this);
    };
    this.req = req;
    if (options) {
      __privateSet(this, _executionCtx, options.executionCtx);
      this.env = options.env;
      if (options.notFoundHandler) {
        this.notFoundHandler = options.notFoundHandler;
      }
    }
  }
  get event() {
    if (__privateGet(this, _executionCtx) && "respondWith" in __privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (__privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    __privateSet(this, _isFresh, false);
    return __privateGet(this, _res) || __privateSet(this, _res, new Response("404 Not Found", { status: 404 }));
  }
  set res(_res2) {
    __privateSet(this, _isFresh, false);
    if (__privateGet(this, _res) && _res2) {
      __privateGet(this, _res).headers.delete("content-type");
      for (const [k, v] of __privateGet(this, _res).headers.entries()) {
        if (k === "set-cookie") {
          const cookies = __privateGet(this, _res).headers.getSetCookie();
          _res2.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res2.headers.append("set-cookie", cookie);
          }
        } else {
          _res2.headers.set(k, v);
        }
      }
    }
    __privateSet(this, _res, _res2);
    this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
};
_status = /* @__PURE__ */ new WeakMap();
_executionCtx = /* @__PURE__ */ new WeakMap();
_headers = /* @__PURE__ */ new WeakMap();
_preparedHeaders = /* @__PURE__ */ new WeakMap();
_res = /* @__PURE__ */ new WeakMap();
_isFresh = /* @__PURE__ */ new WeakMap();

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        if (context instanceof Context) {
          context.req.routeIndex = i;
        }
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (!handler) {
        if (context instanceof Context && context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      } else {
        try {
          res = await handler(context, () => {
            return dispatch(i + 1);
          });
        } catch (err) {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_modules_watch_stub();
var HTTPException = class extends Error {
  constructor(status = 500, options) {
    super(options?.message);
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      return this.res;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
var parseBody = async (request, options = { all: false }) => {
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (isFormDataContent(contentType)) {
    return parseFormData(request, options);
  }
  return {};
};
function isFormDataContent(contentType) {
  if (contentType === null) {
    return false;
  }
  return contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded");
}
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = {};
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] && isArrayField(form[key])) {
    appendToExistingArray(form[key], value);
  } else if (form[key]) {
    convertToNewArray(form, key, value);
  } else {
    form[key] = value;
  }
};
function isArrayField(field) {
  return Array.isArray(field);
}
var appendToExistingArray = (arr, value) => {
  arr.push(value);
};
var convertToNewArray = (form, key, value) => {
  form[key] = [form[key], value];
};

// node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_modules_watch_stub();
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    if (!patternCache[label]) {
      if (match[2]) {
        patternCache[label] = [label, match[1], new RegExp("^" + match[2] + "$")];
      } else {
        patternCache[label] = [label, match[1], true];
      }
    }
    return patternCache[label];
  }
  return null;
};
var getPath = (request) => {
  const match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "";
};
var getQueryStrings = (url) => {
  const queryIndex = url.indexOf("?", 8);
  return queryIndex === -1 ? "" : "?" + url.slice(queryIndex + 1);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
};
var mergePath = (...paths) => {
  let p2 = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p2[p2.length - 1] === "/") {
      p2 = p2.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p2 = `${p2}/`;
    } else if (path !== "/") {
      p2 = `${p2}${path}`;
    }
    if (path === "/" && p2 === "") {
      p2 = "/";
    }
  }
  return p2;
};
var checkOptionalParameter = (path) => {
  if (!path.match(/\:.+\?$/)) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return /%/.test(value) ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ?? (encoded = /[%+]/.test(url));
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ?? (results[name] = value);
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _validatedData;
var _matchResult;
var HonoRequest = class {
  constructor(request, path = "/", matchResult = [[]]) {
    __privateAdd2(this, _validatedData, void 0);
    __privateAdd2(this, _matchResult, void 0);
    this.routeIndex = 0;
    this.bodyCache = {};
    this.cachedBody = (key) => {
      const { bodyCache, raw: raw2 } = this;
      const cachedBody = bodyCache[key];
      if (cachedBody) {
        return cachedBody;
      }
      if (bodyCache.arrayBuffer) {
        return (async () => {
          return await new Response(bodyCache.arrayBuffer)[key]();
        })();
      }
      return bodyCache[key] = raw2[key]();
    };
    this.raw = request;
    this.path = path;
    __privateSet2(this, _matchResult, matchResult);
    __privateSet2(this, _validatedData, {});
  }
  param(key) {
    return key ? this.getDecodedParam(key) : this.getAllDecodedParams();
  }
  getDecodedParam(key) {
    const paramKey = __privateGet2(this, _matchResult)[0][this.routeIndex][1][key];
    const param = this.getParamValue(paramKey);
    return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : void 0;
  }
  getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(__privateGet2(this, _matchResult)[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.getParamValue(__privateGet2(this, _matchResult)[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? decodeURIComponent_(value) : value;
      }
    }
    return decoded;
  }
  getParamValue(paramKey) {
    return __privateGet2(this, _matchResult)[1] ? __privateGet2(this, _matchResult)[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name.toLowerCase()) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    if (this.bodyCache.parsedBody) {
      return this.bodyCache.parsedBody;
    }
    const parsedBody = await parseBody(this, options);
    this.bodyCache.parsedBody = parsedBody;
    return parsedBody;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(target, data) {
    __privateGet2(this, _validatedData)[target] = data;
  }
  valid(target) {
    return __privateGet2(this, _validatedData)[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route);
  }
  get routePath() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};
_validatedData = /* @__PURE__ */ new WeakMap();
_matchResult = /* @__PURE__ */ new WeakMap();

// node_modules/hono/dist/router.js
init_checked_fetch();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/hono-base.js
var __accessCheck3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet3 = (obj, member, getter) => {
  __accessCheck3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet3 = (obj, member, value, setter) => {
  __accessCheck3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var COMPOSED_HANDLER = Symbol("composedHandler");
function defineDynamicClass() {
  return class {
  };
}
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var _path;
var _Hono = class extends defineDynamicClass() {
  constructor(options = {}) {
    super();
    this._basePath = "/";
    __privateAdd3(this, _path, "/");
    this.routes = [];
    this.notFoundHandler = notFoundHandler;
    this.errorHandler = errorHandler;
    this.onError = (handler) => {
      this.errorHandler = handler;
      return this;
    };
    this.notFound = (handler) => {
      this.notFoundHandler = handler;
      return this;
    };
    this.fetch = (request, Env, executionCtx) => {
      return this.dispatch(request, executionCtx, Env, request.method);
    };
    this.request = (input, requestInit, Env, executionCtx) => {
      if (input instanceof Request) {
        if (requestInit !== void 0) {
          input = new Request(input, requestInit);
        }
        return this.fetch(input, Env, executionCtx);
      }
      input = input.toString();
      const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
      const req = new Request(path, requestInit);
      return this.fetch(req, Env, executionCtx);
    };
    this.fire = () => {
      addEventListener("fetch", (event) => {
        event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
      });
    };
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.map((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          __privateSet3(this, _path, args1);
        } else {
          this.addRoute(method, __privateGet3(this, _path), args1);
        }
        args.map((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, __privateGet3(this, _path), handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      if (!method) {
        return this;
      }
      for (const p2 of [path].flat()) {
        __privateSet3(this, _path, p2);
        for (const m2 of [method].flat()) {
          handlers.map((handler) => {
            this.addRoute(m2.toUpperCase(), __privateGet3(this, _path), handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        __privateSet3(this, _path, arg1);
      } else {
        __privateSet3(this, _path, "*");
        handlers.unshift(arg1);
      }
      handlers.map((handler) => {
        this.addRoute(METHOD_NAME_ALL, __privateGet3(this, _path), handler);
      });
      return this;
    };
    const strict = options.strict ?? true;
    delete options.strict;
    Object.assign(this, options);
    this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
  }
  clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  route(path, app2) {
    const subApp = this.basePath(path);
    if (!app2) {
      return subApp;
    }
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  mount(path, applicationHandler, optionHandler) {
    const mergedPath = mergePath(this._basePath, path);
    const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
    const handler = async (c, next) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      const options = optionHandler ? optionHandler(c) : [c.env, executionContext];
      const optionsArray = Array.isArray(options) ? options : [options];
      const queryStrings = getQueryStrings(c.req.url);
      const res = await applicationHandler(
        new Request(
          new URL((c.req.path.slice(pathPrefixLength) || "/") + queryStrings, c.req.url),
          c.req.raw
        ),
        ...optionsArray
      );
      if (res) {
        return res;
      }
      await next();
    };
    this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path);
  }
  handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.matchRoute(method, path);
    const c = new Context(new HonoRequest(request, path, matchResult), {
      env,
      executionCtx,
      notFoundHandler: this.notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.notFoundHandler(c);
        });
      } catch (err) {
        return this.handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.notFoundHandler(c))
      ).catch((err) => this.handleError(err, c)) : res;
    }
    const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        }
        return context.res;
      } catch (err) {
        return this.handleError(err, c);
      }
    })();
  }
};
var Hono = _Hono;
_path = /* @__PURE__ */ new WeakMap();

// node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class {
  constructor() {
    this.children = {};
  }
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.children[regexpStr];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[regexpStr] = new Node();
        if (name !== "") {
          node.varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.varIndex]);
      }
    } else {
      node = this.children[token];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.children[k];
      return (typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : k) + c.buildRegExpStr();
    });
    if (typeof this.index === "number") {
      strList.unshift(`#${this.index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_modules_watch_stub();
var Trie = class {
  constructor() {
    this.context = { varIndex: 0 };
    this.root = new Node();
  }
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m2) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m2];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.root.insert(tokens, index, paramAssoc, this.context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (typeof handlerIndex !== "undefined") {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (typeof paramIndex !== "undefined") {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], {}];
var wildcardRegExpCache = {};
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ?? (wildcardRegExpCache[path] = new RegExp(
    path === "*" ? "" : `^${path.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = {};
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = {};
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h2]) => [h2, {}]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h2, paramCount]) => {
      const paramIndexMap = {};
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h2, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  constructor() {
    this.name = "RegExpRouter";
    this.middleware = { [METHOD_NAME_ALL]: {} };
    this.routes = { [METHOD_NAME_ALL]: {} };
  }
  add(method, path, handler) {
    var _a2;
    const { middleware, routes } = this;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = {};
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p2) => {
          handlerMap[method][p2] = [...handlerMap[METHOD_NAME_ALL][p2]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m2) => {
          var _a22;
          (_a22 = middleware[m2])[path] || (_a22[path] = findMiddleware(middleware[m2], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
        });
      } else {
        (_a2 = middleware[method])[path] || (_a2[path] = findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
      }
      Object.keys(middleware).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(middleware[m2]).forEach((p2) => {
            re.test(p2) && middleware[m2][p2].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(routes[m2]).forEach(
            (p2) => re.test(p2) && routes[m2][p2].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m2) => {
        var _a22;
        if (method === METHOD_NAME_ALL || method === m2) {
          (_a22 = routes[m2])[path2] || (_a22[path2] = [
            ...findMiddleware(middleware[m2], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ]);
          routes[m2][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  buildAllMatchers() {
    const matchers = {};
    [...Object.keys(this.routes), ...Object.keys(this.middleware)].forEach((method) => {
      matchers[method] || (matchers[method] = this.buildMatcher(method));
    });
    this.middleware = this.routes = void 0;
    return matchers;
  }
  buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.middleware, this.routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute || (hasOwnRoute = true);
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = class {
  constructor(init) {
    this.name = "SmartRouter";
    this.routers = [];
    this.routes = [];
    Object.assign(this, init);
  }
  add(method, path, handler) {
    if (!this.routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.routes) {
      throw new Error("Fatal error");
    }
    const { routers, routes } = this;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        routes.forEach((args) => {
          router.add(...args);
        });
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.routers = [router];
      this.routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var Node2 = class {
  constructor(method, handler, children) {
    this.order = 0;
    this.params = {};
    this.children = children || {};
    this.methods = [];
    this.name = "";
    if (method && handler) {
      const m2 = {};
      m2[method] = { handler, possibleKeys: [], score: 0, name: this.name };
      this.methods = [m2];
    }
    this.patterns = [];
  }
  insert(method, path, handler) {
    this.name = `${method} ${path}`;
    this.order = ++this.order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    const parentPatterns = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p2 = parts[i];
      if (Object.keys(curNode.children).includes(p2)) {
        parentPatterns.push(...curNode.patterns);
        curNode = curNode.children[p2];
        const pattern2 = getPattern(p2);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.children[p2] = new Node2();
      const pattern = getPattern(p2);
      if (pattern) {
        curNode.patterns.push(pattern);
        parentPatterns.push(...curNode.patterns);
        possibleKeys.push(pattern[1]);
      }
      parentPatterns.push(...curNode.patterns);
      curNode = curNode.children[p2];
    }
    if (!curNode.methods.length) {
      curNode.methods = [];
    }
    const m2 = {};
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      name: this.name,
      score: this.order
    };
    m2[method] = handlerSet;
    curNode.methods.push(m2);
    return curNode;
  }
  gHSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.methods.length; i < len; i++) {
      const m2 = node.methods[i];
      const handlerSet = m2[method] || m2[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = {};
        handlerSet.possibleKeys.forEach((key) => {
          const processed = processedSet[handlerSet.name];
          handlerSet.params[key] = params[key] && !processed ? params[key] : nodeParams[key] ?? params[key];
          processedSet[handlerSet.name] = true;
        });
        handlerSets.push(handlerSet);
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.params = {};
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.children[part];
        if (nextNode) {
          nextNode.params = node.params;
          if (isLast === true) {
            if (nextNode.children["*"]) {
              handlerSets.push(...this.gHSets(nextNode.children["*"], method, node.params, {}));
            }
            handlerSets.push(...this.gHSets(nextNode, method, node.params, {}));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
          const pattern = node.patterns[k];
          const params = { ...node.params };
          if (pattern === "*") {
            const astNode = node.children["*"];
            if (astNode) {
              handlerSets.push(...this.gHSets(astNode, method, node.params, {}));
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name, matcher] = pattern;
          const child = node.children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp && matcher.test(restPathString)) {
            params[name] = restPathString;
            handlerSets.push(...this.gHSets(child, method, node.params, params));
            continue;
          }
          if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
            if (typeof key === "string") {
              params[name] = part;
              if (isLast === true) {
                handlerSets.push(...this.gHSets(child, method, params, node.params));
                if (child.children["*"]) {
                  handlerSets.push(...this.gHSets(child.children["*"], method, params, node.params));
                }
              } else {
                child.params = params;
                tempNodes.push(child);
              }
            }
          }
        }
      }
      curNodes = tempNodes;
    }
    const results = handlerSets.sort((a, b) => {
      return a.score - b.score;
    });
    return [results.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  constructor() {
    this.name = "TrieRouter";
    this.node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (const p2 of results) {
        this.node.insert(method, p2, handler);
      }
      return;
    }
    this.node.insert(method, path, handler);
  }
  match(method, path) {
    return this.node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono-og/lib/worker.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/workers-og/dist/index.js
init_checked_fetch();
init_modules_watch_stub();
import ly from "./ef4866ecae192fd87727067cf2c0c0cf9fb8b020-yoga-ZMNYPE6Z.wasm";
import fy from "./8b09a8aa3d916dc11b1a9d60545210c131c1ae36-resvg-LFIOYO65.wasm";
var Xl = Object.create;
var Ka = Object.defineProperty;
var ql = Object.getOwnPropertyDescriptor;
var Yl = Object.getOwnPropertyNames;
var Zl = Object.getPrototypeOf;
var Jl = Object.prototype.hasOwnProperty;
var et = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Kl = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of Yl(t))
      !Jl.call(e, i) && i !== r && Ka(e, i, { get: () => t[i], enumerable: !(n = ql(t, i)) || n.enumerable });
  return e;
};
var St = (e, t, r) => (r = e != null ? Xl(Zl(e)) : {}, Kl(t || !e || !e.__esModule ? Ka(r, "default", { value: e, enumerable: true }) : r, e));
var lo = et((dy, uo) => {
  var di = 0, ro = -3;
  function Ir() {
    this.table = new Uint16Array(16), this.trans = new Uint16Array(288);
  }
  function Ql(e, t) {
    this.source = e, this.sourceIndex = 0, this.tag = 0, this.bitcount = 0, this.dest = t, this.destLen = 0, this.ltree = new Ir(), this.dtree = new Ir();
  }
  var no = new Ir(), io = new Ir(), vi = new Uint8Array(30), gi = new Uint16Array(30), ao = new Uint8Array(30), oo = new Uint16Array(30), ef = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Qa = new Ir(), Mt = new Uint8Array(320);
  function so(e, t, r, n) {
    var i, a;
    for (i = 0; i < r; ++i)
      e[i] = 0;
    for (i = 0; i < 30 - r; ++i)
      e[i + r] = i / r | 0;
    for (a = n, i = 0; i < 30; ++i)
      t[i] = a, a += 1 << e[i];
  }
  function tf(e, t) {
    var r;
    for (r = 0; r < 7; ++r)
      e.table[r] = 0;
    for (e.table[7] = 24, e.table[8] = 152, e.table[9] = 112, r = 0; r < 24; ++r)
      e.trans[r] = 256 + r;
    for (r = 0; r < 144; ++r)
      e.trans[24 + r] = r;
    for (r = 0; r < 8; ++r)
      e.trans[168 + r] = 280 + r;
    for (r = 0; r < 112; ++r)
      e.trans[176 + r] = 144 + r;
    for (r = 0; r < 5; ++r)
      t.table[r] = 0;
    for (t.table[5] = 32, r = 0; r < 32; ++r)
      t.trans[r] = r;
  }
  var eo = new Uint16Array(16);
  function pi(e, t, r, n) {
    var i, a;
    for (i = 0; i < 16; ++i)
      e.table[i] = 0;
    for (i = 0; i < n; ++i)
      e.table[t[r + i]]++;
    for (e.table[0] = 0, a = 0, i = 0; i < 16; ++i)
      eo[i] = a, a += e.table[i];
    for (i = 0; i < n; ++i)
      t[r + i] && (e.trans[eo[t[r + i]]++] = i);
  }
  function rf(e) {
    e.bitcount-- || (e.tag = e.source[e.sourceIndex++], e.bitcount = 7);
    var t = e.tag & 1;
    return e.tag >>>= 1, t;
  }
  function Gt(e, t, r) {
    if (!t)
      return r;
    for (; e.bitcount < 24; )
      e.tag |= e.source[e.sourceIndex++] << e.bitcount, e.bitcount += 8;
    var n = e.tag & 65535 >>> 16 - t;
    return e.tag >>>= t, e.bitcount -= t, n + r;
  }
  function hi(e, t) {
    for (; e.bitcount < 24; )
      e.tag |= e.source[e.sourceIndex++] << e.bitcount, e.bitcount += 8;
    var r = 0, n = 0, i = 0, a = e.tag;
    do
      n = 2 * n + (a & 1), a >>>= 1, ++i, r += t.table[i], n -= t.table[i];
    while (n >= 0);
    return e.tag = a, e.bitcount -= i, t.trans[r + n];
  }
  function nf(e, t, r) {
    var n, i, a, o, u, s;
    for (n = Gt(e, 5, 257), i = Gt(e, 5, 1), a = Gt(e, 4, 4), o = 0; o < 19; ++o)
      Mt[o] = 0;
    for (o = 0; o < a; ++o) {
      var l = Gt(e, 3, 0);
      Mt[ef[o]] = l;
    }
    for (pi(Qa, Mt, 0, 19), u = 0; u < n + i; ) {
      var f = hi(e, Qa);
      switch (f) {
        case 16:
          var c = Mt[u - 1];
          for (s = Gt(e, 2, 3); s; --s)
            Mt[u++] = c;
          break;
        case 17:
          for (s = Gt(e, 3, 3); s; --s)
            Mt[u++] = 0;
          break;
        case 18:
          for (s = Gt(e, 7, 11); s; --s)
            Mt[u++] = 0;
          break;
        default:
          Mt[u++] = f;
          break;
      }
    }
    pi(t, Mt, 0, n), pi(r, Mt, n, i);
  }
  function to(e, t, r) {
    for (; ; ) {
      var n = hi(e, t);
      if (n === 256)
        return di;
      if (n < 256)
        e.dest[e.destLen++] = n;
      else {
        var i, a, o, u;
        for (n -= 257, i = Gt(e, vi[n], gi[n]), a = hi(e, r), o = e.destLen - Gt(e, ao[a], oo[a]), u = o; u < o + i; ++u)
          e.dest[e.destLen++] = e.dest[u];
      }
    }
  }
  function af(e) {
    for (var t, r, n; e.bitcount > 8; )
      e.sourceIndex--, e.bitcount -= 8;
    if (t = e.source[e.sourceIndex + 1], t = 256 * t + e.source[e.sourceIndex], r = e.source[e.sourceIndex + 3], r = 256 * r + e.source[e.sourceIndex + 2], t !== (~r & 65535))
      return ro;
    for (e.sourceIndex += 4, n = t; n; --n)
      e.dest[e.destLen++] = e.source[e.sourceIndex++];
    return e.bitcount = 0, di;
  }
  function of(e, t) {
    var r = new Ql(e, t), n, i, a;
    do {
      switch (n = rf(r), i = Gt(r, 2, 0), i) {
        case 0:
          a = af(r);
          break;
        case 1:
          a = to(r, no, io);
          break;
        case 2:
          nf(r, r.ltree, r.dtree), a = to(r, r.ltree, r.dtree);
          break;
        default:
          a = ro;
      }
      if (a !== di)
        throw new Error("Data error");
    } while (!n);
    return r.destLen < r.dest.length ? typeof r.dest.slice == "function" ? r.dest.slice(0, r.destLen) : r.dest.subarray(0, r.destLen) : r.dest;
  }
  tf(no, io);
  so(vi, gi, 4, 3);
  so(ao, oo, 2, 1);
  vi[28] = 0;
  gi[28] = 258;
  uo.exports = of;
});
var po = et((vy, co) => {
  var sf = new Uint8Array(new Uint32Array([305419896]).buffer)[0] === 18, fo = (e, t, r) => {
    let n = e[t];
    e[t] = e[r], e[r] = n;
  }, uf = (e) => {
    let t = e.length;
    for (let r = 0; r < t; r += 4)
      fo(e, r, r + 3), fo(e, r + 1, r + 2);
  }, lf = (e) => {
    sf && uf(e);
  };
  co.exports = { swap32LE: lf };
});
var mo = et((gy, go) => {
  var ho = lo(), { swap32LE: ff } = po(), yi = 11, vr = 5, cf = yi - vr, pf = 65536 >> yi, hf = 1 << cf, df = hf - 1, dn = 2, vf = 1 << vr, mi = vf - 1, vo = 65536 >> vr, gf = 1024 >> vr, mf = vo + gf, Df = mf, yf = 32, bf = Df + yf, xf = 1 << dn, Di = class {
    constructor(t) {
      let r = typeof t.readUInt32BE == "function" && typeof t.slice == "function";
      if (r || t instanceof Uint8Array) {
        let n;
        if (r)
          this.highStart = t.readUInt32LE(0), this.errorValue = t.readUInt32LE(4), n = t.readUInt32LE(8), t = t.slice(12);
        else {
          let i = new DataView(t.buffer);
          this.highStart = i.getUint32(0, true), this.errorValue = i.getUint32(4, true), n = i.getUint32(8, true), t = t.subarray(12);
        }
        t = ho(t, new Uint8Array(n)), t = ho(t, new Uint8Array(n)), ff(t), this.data = new Uint32Array(t.buffer);
      } else
        ({ data: this.data, highStart: this.highStart, errorValue: this.errorValue } = t);
    }
    get(t) {
      let r;
      return t < 0 || t > 1114111 ? this.errorValue : t < 55296 || t > 56319 && t <= 65535 ? (r = (this.data[t >> vr] << dn) + (t & mi), this.data[r]) : t <= 65535 ? (r = (this.data[vo + (t - 55296 >> vr)] << dn) + (t & mi), this.data[r]) : t < this.highStart ? (r = this.data[bf - pf + (t >> yi)], r = this.data[r + (t >> vr & df)], r = (r << dn) + (t & mi), this.data[r]) : this.data[this.data.length - xf];
    }
  };
  go.exports = Di;
});
var Do = et((vn) => {
  var wf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  (function(e) {
    "use strict";
    var t = typeof Uint8Array < "u" ? Uint8Array : Array, r = 43, n = 47, i = 48, a = 97, o = 65, u = 45, s = 95;
    function l(p2) {
      var d = p2.charCodeAt(0);
      if (d === r || d === u)
        return 62;
      if (d === n || d === s)
        return 63;
      if (d < i)
        return -1;
      if (d < i + 10)
        return d - i + 26 + 26;
      if (d < o + 26)
        return d - o;
      if (d < a + 26)
        return d - a + 26;
    }
    function f(p2) {
      var d, D, v, g, y, b;
      if (p2.length % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var C = p2.length;
      y = p2.charAt(C - 2) === "=" ? 2 : p2.charAt(C - 1) === "=" ? 1 : 0, b = new t(p2.length * 3 / 4 - y), v = y > 0 ? p2.length - 4 : p2.length;
      var k = 0;
      function S(E) {
        b[k++] = E;
      }
      for (d = 0, D = 0; d < v; d += 4, D += 3)
        g = l(p2.charAt(d)) << 18 | l(p2.charAt(d + 1)) << 12 | l(p2.charAt(d + 2)) << 6 | l(p2.charAt(d + 3)), S((g & 16711680) >> 16), S((g & 65280) >> 8), S(g & 255);
      return y === 2 ? (g = l(p2.charAt(d)) << 2 | l(p2.charAt(d + 1)) >> 4, S(g & 255)) : y === 1 && (g = l(p2.charAt(d)) << 10 | l(p2.charAt(d + 1)) << 4 | l(p2.charAt(d + 2)) >> 2, S(g >> 8 & 255), S(g & 255)), b;
    }
    function c(p2) {
      var d, D = p2.length % 3, v = "", g, y;
      function b(k) {
        return wf.charAt(k);
      }
      function C(k) {
        return b(k >> 18 & 63) + b(k >> 12 & 63) + b(k >> 6 & 63) + b(k & 63);
      }
      for (d = 0, y = p2.length - D; d < y; d += 3)
        g = (p2[d] << 16) + (p2[d + 1] << 8) + p2[d + 2], v += C(g);
      switch (D) {
        case 1:
          g = p2[p2.length - 1], v += b(g >> 2), v += b(g << 4 & 63), v += "==";
          break;
        case 2:
          g = (p2[p2.length - 2] << 8) + p2[p2.length - 1], v += b(g >> 10), v += b(g >> 4 & 63), v += b(g << 2 & 63), v += "=";
          break;
      }
      return v;
    }
    e.toByteArray = f, e.fromByteArray = c;
  })(typeof vn > "u" ? vn.base64js = {} : vn);
});
var _o = et((yy, To) => {
  var Fi = 40, Ci = 41, mn = 39, Si = 34, ki = 92, Cr = 47, Ti = 44, _i = 58, Dn = 42, Uf = 117, Bf = 85, Nf = 43, Mf = /^[a-f0-9?-]+$/i;
  To.exports = function(e) {
    for (var t = [], r = e, n, i, a, o, u, s, l, f, c = 0, p2 = r.charCodeAt(c), d = r.length, D = [{ nodes: t }], v = 0, g, y = "", b = "", C = ""; c < d; )
      if (p2 <= 32) {
        n = c;
        do
          n += 1, p2 = r.charCodeAt(n);
        while (p2 <= 32);
        o = r.slice(c, n), a = t[t.length - 1], p2 === Ci && v ? C = o : a && a.type === "div" ? (a.after = o, a.sourceEndIndex += o.length) : p2 === Ti || p2 === _i || p2 === Cr && r.charCodeAt(n + 1) !== Dn && (!g || g && g.type === "function" && g.value !== "calc") ? b = o : t.push({ type: "space", sourceIndex: c, sourceEndIndex: n, value: o }), c = n;
      } else if (p2 === mn || p2 === Si) {
        n = c, i = p2 === mn ? "'" : '"', o = { type: "string", sourceIndex: c, quote: i };
        do
          if (u = false, n = r.indexOf(i, n + 1), ~n)
            for (s = n; r.charCodeAt(s - 1) === ki; )
              s -= 1, u = !u;
          else
            r += i, n = r.length - 1, o.unclosed = true;
        while (u);
        o.value = r.slice(c + 1, n), o.sourceEndIndex = o.unclosed ? n : n + 1, t.push(o), c = n + 1, p2 = r.charCodeAt(c);
      } else if (p2 === Cr && r.charCodeAt(c + 1) === Dn)
        n = r.indexOf("*/", c), o = { type: "comment", sourceIndex: c, sourceEndIndex: n + 2 }, n === -1 && (o.unclosed = true, n = r.length, o.sourceEndIndex = n), o.value = r.slice(c + 2, n), t.push(o), c = n + 2, p2 = r.charCodeAt(c);
      else if ((p2 === Cr || p2 === Dn) && g && g.type === "function" && g.value === "calc")
        o = r[c], t.push({ type: "word", sourceIndex: c - b.length, sourceEndIndex: c + o.length, value: o }), c += 1, p2 = r.charCodeAt(c);
      else if (p2 === Cr || p2 === Ti || p2 === _i)
        o = r[c], t.push({ type: "div", sourceIndex: c - b.length, sourceEndIndex: c + o.length, value: o, before: b, after: "" }), b = "", c += 1, p2 = r.charCodeAt(c);
      else if (Fi === p2) {
        n = c;
        do
          n += 1, p2 = r.charCodeAt(n);
        while (p2 <= 32);
        if (f = c, o = { type: "function", sourceIndex: c - y.length, value: y, before: r.slice(f + 1, n) }, c = n, y === "url" && p2 !== mn && p2 !== Si) {
          n -= 1;
          do
            if (u = false, n = r.indexOf(")", n + 1), ~n)
              for (s = n; r.charCodeAt(s - 1) === ki; )
                s -= 1, u = !u;
            else
              r += ")", n = r.length - 1, o.unclosed = true;
          while (u);
          l = n;
          do
            l -= 1, p2 = r.charCodeAt(l);
          while (p2 <= 32);
          f < l ? (c !== l + 1 ? o.nodes = [{ type: "word", sourceIndex: c, sourceEndIndex: l + 1, value: r.slice(c, l + 1) }] : o.nodes = [], o.unclosed && l + 1 !== n ? (o.after = "", o.nodes.push({ type: "space", sourceIndex: l + 1, sourceEndIndex: n, value: r.slice(l + 1, n) })) : (o.after = r.slice(l + 1, n), o.sourceEndIndex = n)) : (o.after = "", o.nodes = []), c = n + 1, o.sourceEndIndex = o.unclosed ? n : c, p2 = r.charCodeAt(c), t.push(o);
        } else
          v += 1, o.after = "", o.sourceEndIndex = c + 1, t.push(o), D.push(o), t = o.nodes = [], g = o;
        y = "";
      } else if (Ci === p2 && v)
        c += 1, p2 = r.charCodeAt(c), g.after = C, g.sourceEndIndex += C.length, C = "", v -= 1, D[D.length - 1].sourceEndIndex = c, D.pop(), g = D[v], t = g.nodes;
      else {
        n = c;
        do
          p2 === ki && (n += 1), n += 1, p2 = r.charCodeAt(n);
        while (n < d && !(p2 <= 32 || p2 === mn || p2 === Si || p2 === Ti || p2 === _i || p2 === Cr || p2 === Fi || p2 === Dn && g && g.type === "function" && g.value === "calc" || p2 === Cr && g.type === "function" && g.value === "calc" || p2 === Ci && v));
        o = r.slice(c, n), Fi === p2 ? y = o : (Uf === o.charCodeAt(0) || Bf === o.charCodeAt(0)) && Nf === o.charCodeAt(1) && Mf.test(o.slice(2)) ? t.push({ type: "unicode-range", sourceIndex: c, sourceEndIndex: n, value: o }) : t.push({ type: "word", sourceIndex: c, sourceEndIndex: n, value: o }), c = n;
      }
    for (c = D.length - 1; c; c -= 1)
      D[c].unclosed = true, D[c].sourceEndIndex = r.length;
    return D[0].nodes;
  };
});
var Oo = et((by, Ao) => {
  Ao.exports = function e(t, r, n) {
    var i, a, o, u;
    for (i = 0, a = t.length; i < a; i += 1)
      o = t[i], n || (u = r(o, i, t)), u !== false && o.type === "function" && Array.isArray(o.nodes) && e(o.nodes, r, n), n && r(o, i, t);
  };
});
var Ro = et((xy, Po) => {
  function Lo(e, t) {
    var r = e.type, n = e.value, i, a;
    return t && (a = t(e)) !== void 0 ? a : r === "word" || r === "space" ? n : r === "string" ? (i = e.quote || "", i + n + (e.unclosed ? "" : i)) : r === "comment" ? "/*" + n + (e.unclosed ? "" : "*/") : r === "div" ? (e.before || "") + n + (e.after || "") : Array.isArray(e.nodes) ? (i = Io(e.nodes, t), r !== "function" ? i : n + "(" + (e.before || "") + i + (e.after || "") + (e.unclosed ? "" : ")")) : n;
  }
  function Io(e, t) {
    var r, n;
    if (Array.isArray(e)) {
      for (r = "", n = e.length - 1; ~n; n -= 1)
        r = Lo(e[n], t) + r;
      return r;
    }
    return Lo(e, t);
  }
  Po.exports = Io;
});
var Bo = et((wy, Uo) => {
  var yn = 45, bn = 43, Ai = 46, Gf = 101, Wf = 69;
  function $f(e) {
    var t = e.charCodeAt(0), r;
    if (t === bn || t === yn) {
      if (r = e.charCodeAt(1), r >= 48 && r <= 57)
        return true;
      var n = e.charCodeAt(2);
      return r === Ai && n >= 48 && n <= 57;
    }
    return t === Ai ? (r = e.charCodeAt(1), r >= 48 && r <= 57) : t >= 48 && t <= 57;
  }
  Uo.exports = function(e) {
    var t = 0, r = e.length, n, i, a;
    if (r === 0 || !$f(e))
      return false;
    for (n = e.charCodeAt(t), (n === bn || n === yn) && t++; t < r && (n = e.charCodeAt(t), !(n < 48 || n > 57)); )
      t += 1;
    if (n = e.charCodeAt(t), i = e.charCodeAt(t + 1), n === Ai && i >= 48 && i <= 57)
      for (t += 2; t < r && (n = e.charCodeAt(t), !(n < 48 || n > 57)); )
        t += 1;
    if (n = e.charCodeAt(t), i = e.charCodeAt(t + 1), a = e.charCodeAt(t + 2), (n === Gf || n === Wf) && (i >= 48 && i <= 57 || (i === bn || i === yn) && a >= 48 && a <= 57))
      for (t += i === bn || i === yn ? 3 : 2; t < r && (n = e.charCodeAt(t), !(n < 48 || n > 57)); )
        t += 1;
    return { number: e.slice(0, t), unit: e.slice(t) };
  };
});
var Oi = et((Ey, Go) => {
  var jf = _o(), No = Oo(), Mo = Ro();
  function nr(e) {
    return this instanceof nr ? (this.nodes = jf(e), this) : new nr(e);
  }
  nr.prototype.toString = function() {
    return Array.isArray(this.nodes) ? Mo(this.nodes) : "";
  };
  nr.prototype.walk = function(e, t) {
    return No(this.nodes, e, t), this;
  };
  nr.unit = Bo();
  nr.walk = No;
  nr.stringify = Mo;
  Go.exports = nr;
});
var jo = et((Fy, $o) => {
  "use strict";
  $o.exports = function(e) {
    return typeof e == "string" ? Wo(e) : Li(e);
  };
  function Li(e) {
    return !e || typeof e != "object" || Vf(e) || Hf(e) ? e : zf(e) ? Yf(e, Li) : Zf(qf(e), function(t, r) {
      var n = Wo(r);
      return t[n] = Li(e[r]), t;
    }, {});
  }
  function Wo(e) {
    return e.replace(/[_.-](\w|$)/g, function(t, r) {
      return r.toUpperCase();
    });
  }
  var zf = Array.isArray || function(e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  }, Vf = function(e) {
    return Object.prototype.toString.call(e) === "[object Date]";
  }, Hf = function(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }, Xf = Object.prototype.hasOwnProperty, qf = Object.keys || function(e) {
    var t = [];
    for (var r in e)
      Xf.call(e, r) && t.push(r);
    return t;
  };
  function Yf(e, t) {
    if (e.map)
      return e.map(t);
    for (var r = [], n = 0; n < e.length; n++)
      r.push(t(e[n], n));
    return r;
  }
  function Zf(e, t, r) {
    if (e.reduce)
      return e.reduce(t, r);
    for (var n = 0; n < e.length; n++)
      r = t(r, e[n], n);
    return r;
  }
});
var zo = et((Cy, Jf) => {
  Jf.exports = { black: "#000000", silver: "#c0c0c0", gray: "#808080", white: "#ffffff", maroon: "#800000", red: "#ff0000", purple: "#800080", fuchsia: "#ff00ff", green: "#008000", lime: "#00ff00", olive: "#808000", yellow: "#ffff00", navy: "#000080", blue: "#0000ff", teal: "#008080", aqua: "#00ffff", orange: "#ffa500", aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", blanchedalmond: "#ffebcd", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", greenyellow: "#adff2f", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", limegreen: "#32cd32", linen: "#faf0e6", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", oldlace: "#fdf5e6", olivedrab: "#6b8e23", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", whitesmoke: "#f5f5f5", yellowgreen: "#9acd32", rebeccapurple: "#663399" };
});
var Ho = et((Sy, Vo) => {
  "use strict";
  Vo.exports = zo();
});
var wn = et((Tr) => {
  "use strict";
  Object.defineProperty(Tr, "__esModule", { value: true });
  function Bi(e) {
    return e && typeof e == "object" && "default" in e ? e.default : e;
  }
  var Yo = Oi(), Kf = Bi(Yo), Qf = Bi(jo()), ec = Bi(Ho()), tc = function(t) {
    return t.type !== "string" ? null : t.value.replace(/\\([0-9a-f]{1,6})(?:\s|$)/gi, function(r, n) {
      return String.fromCharCode(parseInt(n, 16));
    }).replace(/\\/g, "");
  }, rc = /^(#(?:[0-9a-f]{3,4}){1,2})$/i, nc = /^(rgba?|hsla?|hwb|lab|lch|gray|color)$/, ic = function(t) {
    return t.type === "word" && (rc.test(t.value) || t.value in ec || t.value === "transparent") ? t.value : t.type === "function" && nc.test(t.value) ? Yo.stringify(t) : null;
  }, ac = /^(none)$/i, oc = /^(auto)$/i, sc = /(^-?[_a-z][_a-z0-9-]*$)/i, uc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)$/i, lc = /^(0$|(?:[+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?=px$))/i, fc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(ch|em|ex|rem|vh|vw|vmin|vmax|cm|mm|in|pc|pt))$/i, cc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(?:deg|rad))$/i, pc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?%)$/i, Ni = function(t) {
    return function(r) {
      return t(r) ? "<token>" : null;
    };
  }, hc = function(t) {
    return function(r) {
      return r.type === t ? r.value : null;
    };
  }, Ve = function(t, r) {
    return r === void 0 && (r = String), function(n) {
      if (n.type !== "word")
        return null;
      var i = n.value.match(t);
      if (i === null)
        return null;
      var a = r(i[1]);
      return a;
    };
  }, Ze = Ni(function(e) {
    return e.type === "space";
  }), Zo = Ni(function(e) {
    return e.type === "div" && e.value === "/";
  }), dc = Ni(function(e) {
    return e.type === "div" && e.value === ",";
  }), vc = hc("word"), Mi = Ve(ac), Ri = Ve(oc), kr = Ve(uc, Number), vt = Ve(lc, Number), Xt = Ve(fc), Jo = Ve(cc, function(e) {
    return e.toLowerCase();
  }), Gi = Ve(pc), xn = Ve(sc), gc = tc, Ur = ic, Ui = Ve(/^(none|underline|line-through)$/i), mc = function(t) {
    var r = t.expect(kr);
    return t.hasTokens() && (t.expect(Zo), r /= t.expect(kr)), { aspectRatio: r };
  }, Dc = Ve(/^(solid|dashed|dotted)$/), yc = 1, bc = "black", xc = "solid", wc = function(t) {
    var r, n, i;
    if (t.matches(Mi))
      return t.expectEmpty(), { borderWidth: 0, borderColor: "black", borderStyle: "solid" };
    for (var a = 0; a < 3 && t.hasTokens(); )
      a !== 0 && t.expect(Ze), r === void 0 && t.matches(vt, Xt) ? r = t.lastValue : n === void 0 && t.matches(Ur) ? n = t.lastValue : i === void 0 && t.matches(Dc) ? i = t.lastValue : t.throw(), a += 1;
    return t.expectEmpty(), r === void 0 && (r = yc), n === void 0 && (n = bc), i === void 0 && (i = xc), { borderWidth: r, borderColor: n, borderStyle: i };
  }, Br = function(t) {
    var r = t.types, n = r === void 0 ? [vt, Xt, Gi] : r, i = t.directions, a = i === void 0 ? ["Top", "Right", "Bottom", "Left"] : i, o = t.prefix, u = o === void 0 ? "" : o, s = t.suffix, l = s === void 0 ? "" : s;
    return function(f) {
      var c, p2 = [];
      for (p2.push(f.expect.apply(f, n)); p2.length < 4 && f.hasTokens(); )
        f.expect(Ze), p2.push(f.expect.apply(f, n));
      f.expectEmpty();
      var d = p2[0], D = p2[1], v = D === void 0 ? d : D, g = p2[2], y = g === void 0 ? d : g, b = p2[3], C = b === void 0 ? v : b, k = function(E) {
        return "" + u + a[E] + l;
      };
      return c = {}, c[k(0)] = d, c[k(1)] = v, c[k(2)] = y, c[k(3)] = C, c;
    };
  }, Ko = function(t) {
    var r = t.expect(vt), n = t.matches(Ze) ? t.expect(vt) : r;
    return t.expectEmpty(), { width: r, height: n };
  }, Qo = function(t) {
    var r, n, i, a;
    if (t.matches(Mi))
      return t.expectEmpty(), { offset: { width: 0, height: 0 }, radius: 0, color: "black" };
    for (var o = false; t.hasTokens(); )
      o && t.expect(Ze), r === void 0 && t.matches(vt, Xt) ? (r = t.lastValue, t.expect(Ze), n = t.expect(vt, Xt), t.saveRewindPoint(), t.matches(Ze) && t.matches(vt, Xt) ? i = t.lastValue : t.rewind()) : a === void 0 && t.matches(Ur) ? a = t.lastValue : t.throw(), o = true;
    return r === void 0 && t.throw(), { offset: { width: r, height: n }, radius: i !== void 0 ? i : 0, color: a !== void 0 ? a : "black" };
  }, Ec = function(t) {
    var r = Qo(t), n = r.offset, i = r.radius, a = r.color;
    return { shadowOffset: n, shadowRadius: i, shadowColor: a, shadowOpacity: 1 };
  }, Fc = 1, Cc = 1, Sc = 0, kc = function(t) {
    var r, n, i;
    if (t.matches(Mi))
      return t.expectEmpty(), { flexGrow: 0, flexShrink: 0, flexBasis: "auto" };
    if (t.saveRewindPoint(), t.matches(Ri) && !t.hasTokens())
      return { flexGrow: 1, flexShrink: 1, flexBasis: "auto" };
    t.rewind();
    for (var a = 0; a < 2 && t.hasTokens(); )
      a !== 0 && t.expect(Ze), r === void 0 && t.matches(kr) ? (r = t.lastValue, t.saveRewindPoint(), t.matches(Ze) && t.matches(kr) ? n = t.lastValue : t.rewind()) : i === void 0 && t.matches(vt, Xt, Gi) ? i = t.lastValue : i === void 0 && t.matches(Ri) ? i = "auto" : t.throw(), a += 1;
    return t.expectEmpty(), r === void 0 && (r = Fc), n === void 0 && (n = Cc), i === void 0 && (i = Sc), { flexGrow: r, flexShrink: n, flexBasis: i };
  }, Tc = Ve(/(nowrap|wrap|wrap-reverse)/), _c = Ve(/(row|row-reverse|column|column-reverse)/), Ac = "nowrap", Oc = "row", Lc = function(t) {
    for (var r, n, i = 0; i < 2 && t.hasTokens(); )
      i !== 0 && t.expect(Ze), r === void 0 && t.matches(Tc) ? r = t.lastValue : n === void 0 && t.matches(_c) ? n = t.lastValue : t.throw(), i += 1;
    return t.expectEmpty(), r === void 0 && (r = Ac), n === void 0 && (n = Oc), { flexWrap: r, flexDirection: n };
  }, es = function(t) {
    var r;
    if (t.matches(gc))
      r = t.lastValue;
    else
      for (r = t.expect(xn); t.hasTokens(); ) {
        t.expect(Ze);
        var n = t.expect(xn);
        r += " " + n;
      }
    return t.expectEmpty(), { fontFamily: r };
  }, Ic = Ve(/^(normal)$/), Pc = Ve(/^(italic)$/), Rc = Ve(/^([1-9]00|bold)$/), Uc = Ve(/^(small-caps)$/), Bc = "normal", Nc = "normal", Mc = [], Gc = function(t) {
    for (var r, n, i, a, o = 0; o < 3 && t.hasTokens(); ) {
      if (!t.matches(Ic))
        if (r === void 0 && t.matches(Pc))
          r = t.lastValue;
        else if (n === void 0 && t.matches(Rc))
          n = t.lastValue;
        else if (i === void 0 && t.matches(Uc))
          i = [t.lastValue];
        else
          break;
      t.expect(Ze), o += 1;
    }
    var u = t.expect(vt, Xt);
    t.matches(Zo) && (a = t.expect(vt, Xt)), t.expect(Ze);
    var s = es(t), l = s.fontFamily;
    r === void 0 && (r = Bc), n === void 0 && (n = Nc), i === void 0 && (i = Mc);
    var f = { fontStyle: r, fontWeight: n, fontVariant: i, fontSize: u, fontFamily: l };
    return a !== void 0 && (f.lineHeight = a), f;
  }, Wc = function(t) {
    for (var r = [t.expect(xn)]; t.hasTokens(); )
      t.expect(Ze), r.push(t.expect(xn));
    return { fontVariant: r };
  }, $c = Ve(/(flex-(?:start|end)|center|stretch|space-(?:between|around))/), jc = Ve(/(flex-(?:start|end)|center|space-(?:between|around|evenly))/), zc = function(t) {
    var r = t.expect($c), n;
    return t.hasTokens() ? (t.expect(Ze), n = t.expect(jc)) : n = "stretch", t.expectEmpty(), { alignContent: r, justifyContent: n };
  }, Vc = Ve(/^(solid|double|dotted|dashed)$/), Hc = "none", Xc = "solid", qc = "black", Yc = function(t) {
    for (var r, n, i, a = false; t.hasTokens(); ) {
      if (a && t.expect(Ze), r === void 0 && t.matches(Ui)) {
        var o = [t.lastValue.toLowerCase()];
        t.saveRewindPoint(), o[0] !== "none" && t.matches(Ze) && t.matches(Ui) ? (o.push(t.lastValue.toLowerCase()), o.sort().reverse()) : t.rewind(), r = o.join(" ");
      } else
        n === void 0 && t.matches(Vc) ? n = t.lastValue : i === void 0 && t.matches(Ur) ? i = t.lastValue : t.throw();
      a = true;
    }
    return { textDecorationLine: r !== void 0 ? r : Hc, textDecorationColor: i !== void 0 ? i : qc, textDecorationStyle: n !== void 0 ? n : Xc };
  }, Zc = function(t) {
    for (var r = [], n = false; t.hasTokens(); )
      n && t.expect(Ze), r.push(t.expect(Ui).toLowerCase()), n = true;
    return r.sort().reverse(), { textDecorationLine: r.join(" ") };
  }, Jc = function(t) {
    var r = Qo(t), n = r.offset, i = r.radius, a = r.color;
    return { textShadowOffset: n, textShadowRadius: i, textShadowColor: a };
  }, Wi = function(t) {
    return function(r) {
      var n = r.expect(t);
      return r.expectEmpty(), n;
    };
  }, Ii = Wi(kr), Xo = Wi(vt), Sr = Wi(Jo), $i = function(t) {
    return function(r, n) {
      return function(i) {
        var a, o, u = i.expect(t), s;
        if (i.hasTokens())
          i.expect(dc), s = i.expect(t);
        else if (n !== void 0)
          s = n;
        else
          return u;
        return i.expectEmpty(), [(a = {}, a[r + "Y"] = s, a), (o = {}, o[r + "X"] = u, o)];
      };
    };
  }, Kc = $i(kr), Qc = $i(vt), ep = $i(Jo), tp = { perspective: Ii, scale: Kc("scale"), scaleX: Ii, scaleY: Ii, translate: Qc("translate", 0), translateX: Xo, translateY: Xo, rotate: Sr, rotateX: Sr, rotateY: Sr, rotateZ: Sr, skewX: Sr, skewY: Sr, skew: ep("skew", "0deg") }, rp = function(t) {
    for (var r = [], n = false; t.hasTokens(); ) {
      n && t.expect(Ze);
      var i = t.expectFunction(), a = i.functionName, o = tp[a](i);
      if (!Array.isArray(o)) {
        var u;
        o = [(u = {}, u[a] = o, u)];
      }
      r = o.concat(r), n = true;
    }
    return { transform: r };
  }, np = function(t) {
    return { backgroundColor: t.expect(Ur) };
  }, ip = Br({ types: [Ur], prefix: "border", suffix: "Color" }), ap = Br({ directions: ["TopLeft", "TopRight", "BottomRight", "BottomLeft"], prefix: "border", suffix: "Radius" }), op = Br({ prefix: "border", suffix: "Width" }), sp = Br({ types: [vt, Xt, Gi, Ri], prefix: "margin" }), up = Br({ prefix: "padding" }), lp = function(t) {
    return { fontWeight: t.expect(vc) };
  }, fp = function(t) {
    return { shadowOffset: Ko(t) };
  }, cp = function(t) {
    return { textShadowOffset: Ko(t) };
  }, ts = { aspectRatio: mc, background: np, border: wc, borderColor: ip, borderRadius: ap, borderWidth: op, boxShadow: Ec, flex: kc, flexFlow: Lc, font: Gc, fontFamily: es, fontVariant: Wc, fontWeight: lp, margin: sp, padding: up, placeContent: zc, shadowOffset: fp, textShadow: Jc, textShadowOffset: cp, textDecoration: Yc, textDecorationLine: Zc, transform: rp }, qo, ky = qo != null ? new RegExp(qo.join("|")) : null, Pi = "SYMBOL_MATCH", pp = function() {
    function e(r, n) {
      this.index = 0, this.nodes = r, this.functionName = n != null ? n.value : null, this.lastValue = null, this.rewindIndex = -1;
    }
    var t = e.prototype;
    return t.hasTokens = function() {
      return this.index <= this.nodes.length - 1;
    }, t[Pi] = function() {
      if (!this.hasTokens())
        return null;
      for (var r = this.nodes[this.index], n = 0; n < arguments.length; n += 1) {
        var i = n < 0 || arguments.length <= n ? void 0 : arguments[n], a = i(r);
        if (a !== null)
          return this.index += 1, this.lastValue = a, a;
      }
      return null;
    }, t.matches = function() {
      return this[Pi].apply(this, arguments) !== null;
    }, t.expect = function() {
      var n = this[Pi].apply(this, arguments);
      return n !== null ? n : this.throw();
    }, t.matchesFunction = function() {
      var n = this.nodes[this.index];
      if (n.type !== "function")
        return null;
      var i = new e(n.nodes, n);
      return this.index += 1, this.lastValue = null, i;
    }, t.expectFunction = function() {
      var n = this.matchesFunction();
      return n !== null ? n : this.throw();
    }, t.expectEmpty = function() {
      this.hasTokens() && this.throw();
    }, t.throw = function() {
      throw new Error("Unexpected token type: " + this.nodes[this.index].type);
    }, t.saveRewindPoint = function() {
      this.rewindIndex = this.index;
    }, t.rewind = function() {
      if (this.rewindIndex === -1)
        throw new Error("Internal error");
      this.index = this.rewindIndex, this.lastValue = null;
    }, e;
  }(), hp = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?:px)?$/i, dp = /^true|false$/i, vp = /^null$/i, gp = /^undefined$/i, rs = function(t, r) {
    if (0)
      var n, i;
    var a = r.match(hp);
    if (a !== null)
      return Number(a[1]);
    var o = r.match(dp);
    if (o !== null)
      return o[0].toLowerCase() === "true";
    var u = r.match(vp);
    if (u !== null)
      return null;
    var s = r.match(gp);
    if (s === null)
      return r;
  }, mp = function(t, r) {
    var n = Kf(r), i = new pp(n.nodes);
    return ts[t](i);
  }, Dp = mp, ns = function(t, r, n) {
    var i, a = n === false || !(t in ts), o = r.trim(), u = a ? (i = {}, i[t] = rs(t, o), i) : Dp(t, o);
    return u;
  }, is2 = function(t) {
    var r = /^--\w+/.test(t);
    return r ? t : Qf(t);
  }, yp = function(t, r) {
    return r === void 0 && (r = []), t.reduce(function(n, i) {
      var a = is2(i[0]), o = i[1], u = r.indexOf(a) === -1;
      return Object.assign(n, ns(a, o, u));
    }, {});
  };
  Tr.default = yp;
  Tr.getPropertyName = is2;
  Tr.getStylesForProperty = ns;
  Tr.transformRawValue = rs;
});
var os = et((as, En) => {
  (function(e) {
    function t(o) {
      if (!(this instanceof t))
        return new t();
      this.backgrounds = o || [];
    }
    t.prototype.toString = function() {
      return this.backgrounds.join(", ");
    };
    function r(o) {
      if (!(this instanceof r))
        return new r(o);
      o = o || {};
      var u = this;
      function s(l, f) {
        u[l] = l in o ? o[l] : f;
      }
      s("color", ""), s("image", "none"), s("attachment", "scroll"), s("clip", "border-box"), s("origin", "padding-box"), s("position", "0% 0%"), s("repeat", "repeat"), s("size", "auto");
    }
    r.prototype.toString = function() {
      var o = [this.image, this.repeat, this.attachment, this.position + " / " + this.size, this.origin, this.clip];
      return this.color && o.unshift(this.color), o.join(" ");
    }, e.BackgroundList = t, e.Background = r;
    function n(o) {
      var u = [], s = /[,\(\)]/, l = 0, f = "";
      if (o == null)
        return u;
      for (; o.length; ) {
        var c = s.exec(o);
        if (!c)
          break;
        var p2 = c[0], d = false;
        switch (p2) {
          case ",":
            l || (u.push(f.trim()), f = "", d = true);
            break;
          case "(":
            l++;
            break;
          case ")":
            l--;
            break;
        }
        var D = c.index + 1;
        f += o.slice(0, d ? D - 1 : D), o = o.slice(D);
      }
      return (f.length || o.length) && u.push((f + o).trim()), u;
    }
    function i(o) {
      return o.trim();
    }
    function a(o) {
      return (o || "").split(",").map(i);
    }
    e.parseElementStyle = function(o) {
      var u = new t();
      if (o == null)
        return u;
      for (var s = n(o.backgroundImage), l = o.backgroundColor, f = a(o.backgroundAttachment), c = a(o.backgroundClip), p2 = a(o.backgroundOrigin), d = a(o.backgroundPosition), D = a(o.backgroundRepeat), v = a(o.backgroundSize), g, y = 0, b = s.length; y < b; y++)
        g = new r({ image: s[y], attachment: f[y % f.length], clip: c[y % c.length], origin: p2[y % p2.length], position: d[y % d.length], repeat: D[y % D.length], size: v[y % v.length] }), y === b - 1 && (g.color = l), u.backgrounds.push(g);
      return u;
    };
  })(function(e) {
    return typeof En < "u" && En.exports !== void 0 ? En.exports : e.cssBgParser = {};
  }(as));
});
var us = et((_y, ss) => {
  var bp = /,(?![^\(]*\))/, xp = /\s(?![^(]*\))/, wp = /^[0-9]+[a-zA-Z%]+?$/, Ep = (e) => {
    let t = e.split(xp), r = t.includes("inset"), n = t.slice(-1)[0], i = Cp(n) ? void 0 : n, a = t.filter((f) => f !== "inset").filter((f) => f !== i).map(Sp), [o, u, s, l] = a;
    return { inset: r, offsetX: o, offsetY: u, blurRadius: s, spreadRadius: l, color: i };
  }, Fp = (e) => {
    let { inset: t, offsetX: r = 0, offsetY: n = 0, blurRadius: i = 0, spreadRadius: a, color: o } = e || {};
    return [t ? "inset" : null, r, n, i, a, o].filter((u) => u != null).map(kp).map((u) => ("" + u).trim()).join(" ");
  }, Cp = (e) => e === "0" || wp.test(e), Sp = (e) => {
    if (!/px$/.test(e) && e !== "0")
      return e;
    let t = parseFloat(e);
    return isNaN(t) ? e : t;
  }, kp = (e) => typeof e == "number" && e !== 0 ? e + "px" : e, Tp = (e) => e.split(bp).map((t) => t.trim()).map(Ep), _p = (e) => e.map(Fp).join(", ");
  ss.exports = { parse: Tp, stringify: _p };
});
var Vi = et((ji, zi) => {
  (function(e, t) {
    typeof ji == "object" && typeof zi < "u" ? zi.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = e || self).parseCssColor = t();
  })(ji, function() {
    "use strict";
    var e = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, t = new RegExp(/^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/, "i"), r = "-?\\d*(?:\\.\\d+)", n = "(" + r + "?)", i = "(" + r + "?%)", a = (`^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*,
    \\s*` + i + `\\s*,
    \\s*` + i + `\\s*
    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), o = new RegExp(a), u = (`^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*
    \\s+` + i + `
    \\s+` + i + `
    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), s = new RegExp(u), l = (`^
  rgba?\\(
    \\s*` + n + `\\s*,
    \\s*` + n + `\\s*,
    \\s*` + n + `\\s*
    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), f = new RegExp(l), c = (`^
  rgba?\\(
    \\s*` + i + `\\s*,
    \\s*` + i + `\\s*,
    \\s*` + i + `\\s*
    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), p2 = new RegExp(c), d = (`^
  rgba?\\(
    \\s*` + n + `
    \\s+` + n + `
    \\s+` + n + `
    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
$
`).replace(/\n|\s/g, ""), D = new RegExp(d), v = (`^
  rgba?\\(
    \\s*` + i + `
    \\s+` + i + `
    \\s+` + i + `
    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
$
`).replace(/\n|\s/g, ""), g = new RegExp(v), y = new RegExp(/^transparent$/, "i"), b = new RegExp("[^#a-f\\d]", "gi"), C = new RegExp("^#?[a-f\\d]{3}[a-f\\d]?$|^#?[a-f\\d]{6}([a-f\\d]{2})?$", "i"), k = function(M, H, q) {
      return Math.min(Math.max(H, M), q);
    }, S = function(M) {
      var H = M;
      return typeof H != "number" && (H = H.endsWith("%") ? 255 * parseFloat(H) / 100 : parseFloat(H)), k(Math.round(H), 0, 255);
    }, E = function(M) {
      return k(parseFloat(M), 0, 100);
    };
    function L(M) {
      var H = M;
      return typeof H != "number" && (H = H.endsWith("%") ? parseFloat(H) / 100 : parseFloat(H)), k(H, 0, 1);
    }
    function T(M) {
      var H = function(q, ee) {
        if (ee === void 0 && (ee = {}), typeof q != "string" || b.test(q) || !C.test(q))
          throw new TypeError("Expected a valid hex string");
        var A = 1;
        (q = q.replace(/^#/, "")).length === 8 && (A = Number.parseInt(q.slice(6, 8), 16) / 255, q = q.slice(0, 6)), q.length === 4 && (A = Number.parseInt(q.slice(3, 4).repeat(2), 16) / 255, q = q.slice(0, 3)), q.length === 3 && (q = q[0] + q[0] + q[1] + q[1] + q[2] + q[2]);
        var R = Number.parseInt(q, 16), O = R >> 16, Y = R >> 8 & 255, Z = 255 & R, te = typeof ee.alpha == "number" ? ee.alpha : A;
        return ee.format === "array" ? [O, Y, Z, te] : ee.format === "css" ? "rgb(" + O + " " + Y + " " + Z + (te === 1 ? "" : " / " + Number((100 * te).toFixed(2)) + "%") + ")" : { red: O, green: Y, blue: Z, alpha: te };
      }(M, { format: "array" });
      return U([null, H[0], H[1], H[2], H[3]]);
    }
    function U(M) {
      var H = M[1], q = M[2], ee = M[3], A = M[4];
      return A === void 0 && (A = 1), { type: "rgb", values: [H, q, ee].map(S), alpha: L(A === null ? 1 : A) };
    }
    return function(M) {
      if (typeof M != "string")
        return null;
      var H = t.exec(M);
      if (H)
        return T(H[0]);
      var q = s.exec(M) || o.exec(M);
      if (q)
        return function(R) {
          var O = R[1], Y = R[2], Z = R[3], te = R[4];
          te === void 0 && (te = 1);
          var ie = O;
          return { type: "hsl", values: [ie = ie.endsWith("turn") ? 360 * parseFloat(ie) / 1 : ie.endsWith("rad") ? Math.round(180 * parseFloat(ie) / Math.PI) : parseFloat(ie), E(Y), E(Z)], alpha: L(te === null ? 1 : te) };
        }(q);
      var ee = D.exec(M) || g.exec(M) || f.exec(M) || p2.exec(M);
      if (ee)
        return U(ee);
      if (y.exec(M))
        return U([null, 0, 0, 0, 0]);
      var A = e[M.toLowerCase()];
      return A ? U([null, A[0], A[1], A[2], 1]) : null;
    };
  });
});
var fs = et((Ay, ls) => {
  "use strict";
  var Ap = /["'&<>]/;
  ls.exports = Op;
  function Op(e) {
    var t = "" + e, r = Ap.exec(t);
    if (!r)
      return t;
    var n, i = "", a = 0, o = 0;
    for (a = r.index; a < t.length; a++) {
      switch (t.charCodeAt(a)) {
        case 34:
          n = "&quot;";
          break;
        case 38:
          n = "&amp;";
          break;
        case 39:
          n = "&#39;";
          break;
        case 60:
          n = "&lt;";
          break;
        case 62:
          n = "&gt;";
          break;
        default:
          continue;
      }
      o !== a && (i += t.substring(o, a)), o = a + 1, i += n;
    }
    return o !== a ? i + t.substring(o, a) : i;
  }
});
var Fo = St(mo(), 1);
var Co = St(Do(), 1);
var Ei = {};
var Ef = 5;
var yo = 12;
var Ff = 13;
var Cf = 16;
var Sf = 17;
var kf = 22;
var bo = 28;
var xo = 31;
var Tf = 33;
var gn = 34;
var _f = 35;
var bi = 36;
var xi = 37;
var So = 38;
var Af = 39;
var Of = 40;
var Pr = 41;
var Lf = 42;
var h = 0;
var m = 1;
var Ee = 2;
var ko = 3;
var F = 4;
var If = [[F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, ko, F, F, F, F, F, F, F, F, F, F, F], [h, F, F, m, m, F, F, F, F, m, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, F, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [F, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ee, F, m, m, m, m, m, m, m, m, m, m], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ee, F, m, m, m, m, m, m, m, m, m, m], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, m, h, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, h, h, m, m, m, m, m, m, m, h, h, F, Ee, F, m, m, m, m, m, h, m, m, m, h], [m, F, F, m, m, m, F, F, F, h, h, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, h, m, F, F, F, h, h, m, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, h, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ee, F, m, m, m, m, m, m, m, m, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, F, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, F, h, h, h, h, h, h, h, h, h, h, h, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ee, F, m, m, m, m, m, m, m, m, m, m], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, m, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, m, m, m, m, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, m, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, m, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, m, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, h, F, F, F, h, h, h, h, h, h, h, h, h, h, h, F, Ee, F, h, h, h, h, h, h, h, h, m, h]];
var Pf = Co.default.toByteArray("AAgOAAAAAAAQ4QAAAQ0P8vDtnQuMXUUZx+eyu7d7797d9m5bHoWltKVUlsjLWE0VJNigQoMVqkStEoNQQUl5GIo1KKmogEgqkKbBRki72lYabZMGKoGAjQRtJJDaCCIRiiigREBQS3z+xzOTnZ3O+3HOhd5NfpkzZx7fN9988zivu2M9hGwB28F94DnwEngd/Asc1EtIs9c/bIPDwCxwLDgezHcodyo4w5C+CCwBS8FnwSXgCnA1uFbI93XwbXAbWAfWgx+CzWAb+An4KfgFeAzsYWWfYuFz4CXwGvgb+Dfo6yNkEEwGh4CZYB44FpwI3g1OY+kfBItZOo2fB84Hy8DF4HJwNbiWpV8PVoO1LH4n2NRXyN+KcAd4kNVP9XsY4aPgcfAbsBfs6SniL4K/sPjfEf6HlanXCRkCw2BGvUh/keWfXS/CY+pFXs7x9XHmM94LTmWIeU2cgbxnS/k/B3kf86jDhU8L9V2E40vAFWAlWFUfb++NOL4F3C7JX4/4GiE+hvgWsF0oS7mXldspnN+F493gyXrh9xTav0cg3EvzgVfBG6wsmVSEkxBOBgdPGpd7JI6PnqRvJ68/xlbHof53gPeA94OzwLngk+ACsAwsByvASrAK3MB0Ws3CtQjvBJvAVrADPMDSHkb4CNijaccTwvnf4fiPEs8Lxy+D18A/QU8/xjgYBjPAbDAKTgYLwOngTHAO+EQ/8wuEF4EvsPiVCFf2+9tsFStzA8LVHuXXBsi6QyqzUYiPMR/7Mc7dAx7oL8bzw/3u/Bw8Bp4Az4AXwCtgHzsmDXP5fiF9iiVvly5d0sHngar16NKlS5cuXbp06fLmYlqHXrcd3ph4P0THUY3iXh49novju4S0tzfs5d+JPKewfAsRntZb3K9ZhOMlrO6lCC8An28U9+OuovcPcPxlVu5rCL/VmHh/iHIrzn3fIPu7SN8Axmg+8AOwEWwCm7tp3bRuWjetm5Y8bSu4B9zbKO6ZVsnORrVU3f4uXTqZ2H3sLoyx3eDXjfDndE9qyj6L838CfwVvgFpzYnof4oNgOhgBc8Fos9DrZIQLmtXPP1MmF6wGj4H+KXoWguvADkXaPil+YpuQy8Am8Ey7ODdtmJDF4HowBp4De6HDTNjhfHAHeBr0DBBy0kDxfPbcgSIusgrcWhtnJ8vL+TPix7UIOQtcBq4C28Cr4KRBnANbwSuDE+s50JgyNNFuXbp06XIgsXjIvPafjvXozKY+fVFz/z0LT1uCtKVSWbrOLWPnztG8e0Xfy7ol8XtZJi7WtG+5od2UFXQ/A12vUeS7jp27yVKHjdsU9lXB869TyNvAzt0lpP2oWbwLdjiO78bx/Sz+EMJHwK9Y/LcIfw+eZ3F67/Hl5vh9xX80J+rwX8SvRDhpgL17iPAQMHNArfPrqHPewLheI+AERV6efwV418B4nOZ/H+IfYHV8GOF5LJ3eAz0fx8sM9S0fUNud39O9CulfGZhY5huI3wzWgNvBelbHZoTbNPVpfYjKQpkHwUNgl0LWblbnk0LbbDxr0OMFpL3iqWdu9nWYPlVAWkXY39LnGdCkDbeqv1YNbfcMQ3t9oe8lzm6NH9N1ZB6Ln4BwfkJZJk7RyFnYKt6b/JDQXx9p5X+eFdqOjzM9P9MB/lUlFzr20aXIdzlY4dmn9F3YqtvoO76/2hp/D/xA5Zue88nNyL8GbFbs075X0tyUig3Qd2MCnf//HjnzpbsR3g9+1kHzzVjdnE71/qVBX9rGPUh/ysNWe1neFzvIDi5zAufV1sT0N0poR22wkFUfTOPfA4N2mbZ5fSrqOHSw+IbkSBbOGSzSRgf91/GTUWYBOB2cIZQ/G8cfBZ8CFwrnL8XxF8FKcA24jqXdiPA7Qr61OF7H4mMItwzuv2/YLth1ISt3Hzu3k4W7EH5JqPdRHD/O4k+z8A8IX5Lq3y7Z4nXE9xn6kX6vQ4bKfy+ok+hH+xf3hq9dnTTHhjKd2GmDuWA242iHMq4cC7A8kJ7i8o1+skSa7Jieo38HCWnoNjKFhdSFBxzpZ7QE6lI8N4S14aASZcryaV/WWHw66f6NHuCoxuQxmvM56GX9QMd8Q4D65ywGP+ZzRJuM+zQvx/MOS2VFeqQ4IXnH26zM9Xe6/E6D+4foAzzuajPZp8Qyw5ayZVDWuH0z0BtYRkeIDqH9KO9VbH1btd/lhNqCzvl8zeLnG0S/hnU6baHfpiuO6yy0rd+DHURo/zYF5H26j03rQsip2ndzz82u1z9N4VjWKWeb68Tedpt95HRVXp7H1R6p+/Wt4FPy/PpWwscOLRJ+PVWF/+W0iVyGzs18TIvXkOJ1Wxm66vSXz+vylenrZcj1ub439W+K8RNCGTJi2p/TJ1K23VaXr35tRpnzmjxequgfcfyk6B/TGBVlyedsNgpdd/h+W1U3P99QyFPNo1X3TwpM/WLTIWYfoBqXrv6iskHZ/RFr79R6hIyHBrH3f1nrUVnjP8SnZZ+rYtzr9Exld5MNbPNErusAPg+77u/eDOPftU9yj39TH7rezxd1LvsZQJlzkWlOirG/79zjMj/mtHUKu7vKy+3/LnXr9okyKedjX5/0He9iP/j63LwOQdarEVlfy8OO/Lqw023j6xcqmwxLiOd6heM2i9cV9LJy8jMJ23yQ+rpbfu7EQ/pXE8KYvUSqvVnb4XzZa6LrHMXHR+zcLvqWbm/Bn0/HzIs6fWPHoat8XfnDKmZGxRxeMbn2UqZ5Q94nmcZRbqqUXbZ8+lcjE+cPX11t814orvvAXNcG8vqj2vvk1MGn3anlj0bIT72v47bvE+Lc98T9b6r7AKn6j+8Duf7D0nnZx/j7Zjn0j9nbpSTndaLr9WNLivP+iN23xF7L+fqv6ZouFyb78jxVXvv5jJ9YUs9/sddO8h7KNg5jrhfaJGztT6G7KF+1d6yCmD5Kdb2fan60rSc552fZr3zeQ9DpnPp+Si5cx5Ktv2QfSzF/mMbWdOm46rFI4XstnU9xeqX4NKb7TKEdcr6pZOK3ID1k/LvFHkVczEuZLEDr499YqvqBym1aEHWgcvoYOtv0M91qQl5TfpO/in6rWx8OVpT1Wedkv3f5xom3T/xeR/6Gx6V86PWAOB4bBpqWdN+yTcVxjIyGRz/FrDGu6w/3d7kPm8StX8RyPu+uuvpNju/vTLJV37GpvoM0oZPnW87VLnL/5pDno1NoW1R6yedU6TyUv3u19a3KFnIbTLYz+ZCLP4T0tU1uivFgso0pnsJ/UtXvarNY28Xq5cvkBDrQP/E5ZaiuQwwfmTlsOiQRU1fMuqrDd/3ISSuwjOwXOfTyGUMpZIXq4GpLn3pUcdfzch2x7XO1u2uZHOPb1G6b3Xg9PH1IIWeEpJlPQtqos2EKW8b0u8rnuP1UeVLoXJb9be0uG9nnbchjU+XTszT5VeNBThPHnc5OKj1U9aj0GTHIVaGy1YhEWT4ixns00DT+XEzWn/7VAsIc63Cov3OdyhwjrnaqQqZvWKXdypRdlq+k8msZ031U+Rm4fA+3TtyeR9hwfW9G9yxDN0fZMN33F+9TE6md4hwoxumfaUzI9fN3PFT3xVV2msrQ3UsnChm6Nulk8TndpS28D3zX9tTIPsF/z7Am5OkTjm1tI1JZW74+4VgsZ0N3L1yXV3WeP5uR7TGHHdvC3JQlxybfpd22tDlk/2eofRK8TzrN/qnar/K/OUTth6I/+jAnEptNbPvFHP2gs40N3+dfMWtwqvVct7/wfd8gtQ7imifial9ZJ9/3IHLYU6eDj3+4PhsNhX+vwvcWLnu6kGfEMe8DuciPfUfGZB8X/7HJy/Gefe5n+VRGFd/wyP2ta7/LO4yh/sbLV/k9lev6kfO9Dt/5U67b1/6u/epqB1U9Me23jfHY9sscAg4tkbLl+e4/U36rJ9ddxfd6sg5vq5ice42Wpk/pb9FOJ36/W9tpv4kbC79nUbZceX8Zu6/qJ+P3WvhvA8v3reh7Jbn2d6rrNC7XNZTLma4Ba0JI9efX2uLzF5scG/w9UNU1ZxW+ymUfzELeTllXlQ1rUuhzjS5fp9c964iFBOqeSz63bU065nZKdU+mDEz3qHIjjifquw0pnb/raRtvrnsYcb46ihT3taoYz6brdNW9l6rWRnE/navdPn1XlR1km7hcz1WlH/elKuSOSvLLuE8U6m8uzwRdfcGl73VyTHuyMvzJ1Sa2cWDTP/Z63Kc94n2B1PYr24dz1JlyHLlcP+S4B6vD1c9EW4q2LWstCvUjeVy63k/LMYdUNd5D1xQfvVTzX1VjkMsUv88N8VH5fReVn/Fjn++/h6X6Q8a6b1/q3g/i/ewi0/Scs8zxXeV6mWIOUPlPzBgdFerW+bZrm2P18dnjuK6HunEp+rHvPMXbr+sHVb/lnL+pTP57jPw9Cvk3PW178JD9qChfzuvTf7Htl38L1QUf/VKu9SFjwWbTWPvFEvu7Uq76y7+31g6QlYPc669pbsm9Xur2LWI9Pu8ypfDXqm3A2z8s1FWGn4ntL9NfQu2oSlftX9uetvTtv7J8Ql4zxfXGZ3zk8PeQ9w59x2uMfqI8/q5eKh/l9cb2rwsu9rSNl06ZP2Pmxtz+rNMx93yno0n2/82rVH7rQ+y9P15H6FyRun9ViH81ATmffI7nJ5r8uXXW6enbP6b/B8/l5OifVHYLnb9S39s2zcc+Ph+rh8+eQgVPS72elzGWY/tUtbbabBpDiI7yN1q6/4th2y+ErAc5+9BVvu/7KamJbWNZeuqI/R4tRf+YyD1HmOZM1bMV3/14Sn10c0Xu+Sj1nOXb5jL73ncdy02uvlXZNde65dOHYl7Vs4KYuS6FzWLn2zJlpZqPXPVPOa5yzKOyn1VhT9lmMfdbfH7D11Wf2PXN5h9y+dD287+qxgSnaYmnIrRtIb8pJe6/Uv9OVer6Whn0zfGO/BEloZI9ojmfAlUflClDd178bTmVHVTpZXOkAlk/lb42UujmI89HH5V+cl7XtowY6vTxLVWok6UrGzoGTHN+bB+6ri05687VNpvfuvRfaP2uMlNQth1D5JjGelm/8yn+9p3p/7qk9gnfeddXZmq/Sm333PJT659Kv1zjNbZ9uv2Oi//67CV8/N1nj1DmviyXDNVeJkaeaX8UsyesYg8cu2+NvdaPfb+lLDu5tvt/");
var Rf = new Fo.default(Pf);
var wo = function(e) {
  switch (e) {
    case Tf:
      return yo;
    case Af:
    case Of:
    case Lf:
      return yo;
    case _f:
      return Ef;
    default:
      return e;
  }
};
var Eo = function(e) {
  switch (e) {
    case xi:
    case So:
      return gn;
    case Pr:
      return kf;
    default:
      return e;
  }
};
var Rr = class {
  constructor(t, r = false) {
    this.position = t, this.required = r;
  }
};
var wi = class {
  nextCodePoint() {
    let t = this.string.charCodeAt(this.pos++), r = this.string.charCodeAt(this.pos);
    return 55296 <= t && t <= 56319 && 56320 <= r && r <= 57343 ? (this.pos++, (t - 55296) * 1024 + (r - 56320) + 65536) : t;
  }
  nextCharClass() {
    return wo(Rf.get(this.nextCodePoint()));
  }
  getSimpleBreak() {
    switch (this.nextClass) {
      case Pr:
        return false;
      case gn:
      case xi:
      case So:
        return this.curClass = gn, false;
      case bi:
        return this.curClass = bi, false;
    }
    return null;
  }
  getPairTableBreak(t) {
    let r = false;
    switch (If[this.curClass][this.nextClass]) {
      case h:
        r = true;
        break;
      case m:
        r = t === Pr;
        break;
      case Ee:
        if (r = t === Pr, !r)
          return r = false, r;
        break;
      case ko:
        if (t !== Pr)
          return r;
        break;
      case F:
        break;
    }
    return this.LB8a && (r = false), this.LB21a && (this.curClass === Cf || this.curClass === Sf) ? (r = false, this.LB21a = false) : this.LB21a = this.curClass === Ff, this.curClass === bo ? (this.LB30a++, this.LB30a == 2 && this.nextClass === bo && (r = true, this.LB30a = 0)) : this.LB30a = 0, this.curClass = this.nextClass, r;
  }
  nextBreak() {
    if (this.curClass == null) {
      let t = this.nextCharClass();
      this.curClass = Eo(t), this.nextClass = t, this.LB8a = t === xo, this.LB30a = 0;
    }
    for (; this.pos < this.string.length; ) {
      this.lastPos = this.pos;
      let t = this.nextClass;
      if (this.nextClass = this.nextCharClass(), this.curClass === gn || this.curClass === bi && this.nextClass !== xi)
        return this.curClass = Eo(wo(this.nextClass)), new Rr(this.lastPos, true);
      let r = this.getSimpleBreak();
      if (r === null && (r = this.getPairTableBreak(t)), this.LB8a = this.nextClass === xo, r)
        return new Rr(this.lastPos);
    }
    return this.lastPos < this.string.length ? (this.lastPos = this.string.length, new Rr(this.string.length)) : null;
  }
  constructor(t) {
    this.string = t, this.pos = 0, this.lastPos = 0, this.curClass = null, this.nextClass = null, this.LB8a = false, this.LB21a = false, this.LB30a = 0;
  }
};
Ei = wi;
var It = St(wn(), 1);
var gl = St(os(), 1);
var ml = St(us(), 1);
var Dl = St(Vi(), 1);
var yl = St(Oi(), 1);
var bl = St(wn(), 1);
var Fa = St(fs(), 1);
var Fl = St(Vi(), 1);
var Ca = St(wn(), 1);
var wt = Uint8Array;
var mr = Uint16Array;
var Ns = Uint32Array;
var Ms = new wt([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var Gs = new wt([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var Lp = new wt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Ws = function(e, t) {
  for (var r = new mr(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var i = new Ns(r[30]), n = 1; n < 30; ++n)
    for (var a = r[n]; a < r[n + 1]; ++a)
      i[a] = a - r[n] << 5 | n;
  return [r, i];
};
var $s = Ws(Ms, 2);
var js = $s[0];
var Ip = $s[1];
js[28] = 258, Ip[258] = 28;
var Pp = Ws(Gs, 0);
var Rp = Pp[0];
var ta = new mr(32768);
for (ke = 0; ke < 32768; ++ke)
  qt = (ke & 43690) >>> 1 | (ke & 21845) << 1, qt = (qt & 52428) >>> 2 | (qt & 13107) << 2, qt = (qt & 61680) >>> 4 | (qt & 3855) << 4, ta[ke] = ((qt & 65280) >>> 8 | (qt & 255) << 8) >>> 1;
var qt;
var ke;
var Mr = function(e, t, r) {
  for (var n = e.length, i = 0, a = new mr(t); i < n; ++i)
    e[i] && ++a[e[i] - 1];
  var o = new mr(t);
  for (i = 0; i < t; ++i)
    o[i] = o[i - 1] + a[i - 1] << 1;
  var u;
  if (r) {
    u = new mr(1 << t);
    var s = 15 - t;
    for (i = 0; i < n; ++i)
      if (e[i])
        for (var l = i << 4 | e[i], f = t - e[i], c = o[e[i] - 1]++ << f, p2 = c | (1 << f) - 1; c <= p2; ++c)
          u[ta[c] >>> s] = l;
  } else
    for (u = new mr(n), i = 0; i < n; ++i)
      e[i] && (u[i] = ta[o[e[i] - 1]++] >>> 15 - e[i]);
  return u;
};
var $r = new wt(288);
for (ke = 0; ke < 144; ++ke)
  $r[ke] = 8;
var ke;
for (ke = 144; ke < 256; ++ke)
  $r[ke] = 9;
var ke;
for (ke = 256; ke < 280; ++ke)
  $r[ke] = 7;
var ke;
for (ke = 280; ke < 288; ++ke)
  $r[ke] = 8;
var ke;
var zs = new wt(32);
for (ke = 0; ke < 32; ++ke)
  zs[ke] = 5;
var ke;
var Up = Mr($r, 9, 1);
var Bp = Mr(zs, 5, 1);
var Hi = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
};
var kt = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
};
var Xi = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
};
var Np = function(e) {
  return (e + 7) / 8 | 0;
};
var Mp = function(e, t, r) {
  (t == null || t < 0) && (t = 0), (r == null || r > e.length) && (r = e.length);
  var n = new (e.BYTES_PER_ELEMENT == 2 ? mr : e.BYTES_PER_ELEMENT == 4 ? Ns : wt)(r - t);
  return n.set(e.subarray(t, r)), n;
};
var Gp = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"];
var or = function(e, t, r) {
  var n = new Error(t || Gp[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, or), !r)
    throw n;
  return n;
};
var Wp = function(e, t, r) {
  var n = e.length;
  if (!n || r && r.f && !r.l)
    return t || new wt(0);
  var i = !t || r, a = !r || r.i;
  r || (r = {}), t || (t = new wt(n * 3));
  var o = function(W) {
    var fe = t.length;
    if (W > fe) {
      var ce = new wt(Math.max(fe * 2, W));
      ce.set(t), t = ce;
    }
  }, u = r.f || 0, s = r.p || 0, l = r.b || 0, f = r.l, c = r.d, p2 = r.m, d = r.n, D = n * 8;
  do {
    if (!f) {
      u = kt(e, s, 1);
      var v = kt(e, s + 1, 3);
      if (s += 3, v)
        if (v == 1)
          f = Up, c = Bp, p2 = 9, d = 5;
        else if (v == 2) {
          var C = kt(e, s, 31) + 257, k = kt(e, s + 10, 15) + 4, S = C + kt(e, s + 5, 31) + 1;
          s += 14;
          for (var E = new wt(S), L = new wt(19), T = 0; T < k; ++T)
            L[Lp[T]] = kt(e, s + T * 3, 7);
          s += k * 3;
          for (var U = Hi(L), M = (1 << U) - 1, H = Mr(L, U, 1), T = 0; T < S; ) {
            var q = H[kt(e, s, M)];
            s += q & 15;
            var g = q >>> 4;
            if (g < 16)
              E[T++] = g;
            else {
              var ee = 0, A = 0;
              for (g == 16 ? (A = 3 + kt(e, s, 3), s += 2, ee = E[T - 1]) : g == 17 ? (A = 3 + kt(e, s, 7), s += 3) : g == 18 && (A = 11 + kt(e, s, 127), s += 7); A--; )
                E[T++] = ee;
            }
          }
          var R = E.subarray(0, C), O = E.subarray(C);
          p2 = Hi(R), d = Hi(O), f = Mr(R, p2, 1), c = Mr(O, d, 1);
        } else
          or(1);
      else {
        var g = Np(s) + 4, y = e[g - 4] | e[g - 3] << 8, b = g + y;
        if (b > n) {
          a && or(0);
          break;
        }
        i && o(l + y), t.set(e.subarray(g, b), l), r.b = l += y, r.p = s = b * 8, r.f = u;
        continue;
      }
      if (s > D) {
        a && or(0);
        break;
      }
    }
    i && o(l + 131072);
    for (var Y = (1 << p2) - 1, Z = (1 << d) - 1, te = s; ; te = s) {
      var ee = f[Xi(e, s) & Y], ie = ee >>> 4;
      if (s += ee & 15, s > D) {
        a && or(0);
        break;
      }
      if (ee || or(2), ie < 256)
        t[l++] = ie;
      else if (ie == 256) {
        te = s, f = null;
        break;
      } else {
        var B = ie - 254;
        if (ie > 264) {
          var T = ie - 257, z = Ms[T];
          B = kt(e, s, (1 << z) - 1) + js[T], s += z;
        }
        var _ = c[Xi(e, s) & Z], N = _ >>> 4;
        _ || or(3), s += _ & 15;
        var O = Rp[N];
        if (N > 3) {
          var z = Gs[N];
          O += Xi(e, s) & (1 << z) - 1, s += z;
        }
        if (s > D) {
          a && or(0);
          break;
        }
        i && o(l + 131072);
        for (var ae = l + B; l < ae; l += 4)
          t[l] = t[l - O], t[l + 1] = t[l + 1 - O], t[l + 2] = t[l + 2 - O], t[l + 3] = t[l + 3 - O];
        l = ae;
      }
    }
    r.l = f, r.p = te, r.b = l, r.f = u, f && (u = 1, r.m = p2, r.d = c, r.n = d);
  } while (!u);
  return l == t.length ? t : Mp(t, 0, l);
};
var $p = new wt(0);
function jp(e, t) {
  return Wp(e, t);
}
var zp = typeof TextDecoder < "u" && new TextDecoder();
var Vp = 0;
try {
  zp.decode($p, { stream: true }), Vp = 1;
} catch {
}
function ot() {
  this.commands = [], this.fill = "black", this.stroke = null, this.strokeWidth = 1;
}
ot.prototype.moveTo = function(e, t) {
  this.commands.push({ type: "M", x: e, y: t });
};
ot.prototype.lineTo = function(e, t) {
  this.commands.push({ type: "L", x: e, y: t });
};
ot.prototype.curveTo = ot.prototype.bezierCurveTo = function(e, t, r, n, i, a) {
  this.commands.push({ type: "C", x1: e, y1: t, x2: r, y2: n, x: i, y: a });
};
ot.prototype.quadTo = ot.prototype.quadraticCurveTo = function(e, t, r, n) {
  this.commands.push({ type: "Q", x1: e, y1: t, x: r, y: n });
};
ot.prototype.close = ot.prototype.closePath = function() {
  this.commands.push({ type: "Z" });
};
ot.prototype.extend = function(e) {
  e.commands && (e = e.commands), Array.prototype.push.apply(this.commands, e);
};
ot.prototype.toPathData = function(e) {
  e = e !== void 0 ? e : 2;
  function t(o) {
    return Math.round(o) === o ? "" + Math.round(o) : o.toFixed(e);
  }
  function r() {
    for (var o = arguments, u = "", s = 0; s < arguments.length; s += 1) {
      var l = o[s];
      l >= 0 && s > 0 && (u += " "), u += t(l);
    }
    return u;
  }
  for (var n = "", i = 0; i < this.commands.length; i += 1) {
    var a = this.commands[i];
    a.type === "M" ? n += "M" + r(a.x, a.y) : a.type === "L" ? n += "L" + r(a.x, a.y) : a.type === "C" ? n += "C" + r(a.x1, a.y1, a.x2, a.y2, a.x, a.y) : a.type === "Q" ? n += "Q" + r(a.x1, a.y1, a.x, a.y) : a.type === "Z" && (n += "Z");
  }
  return n;
};
var Hp = [".notdef", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "endash", "dagger", "daggerdbl", "periodcentered", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "questiondown", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "emdash", "AE", "ordfeminine", "Lslash", "Oslash", "OE", "ordmasculine", "ae", "dotlessi", "lslash", "oslash", "oe", "germandbls", "onesuperior", "logicalnot", "mu", "trademark", "Eth", "onehalf", "plusminus", "Thorn", "onequarter", "divide", "brokenbar", "degree", "thorn", "threequarters", "twosuperior", "registered", "minus", "eth", "multiply", "threesuperior", "copyright", "Aacute", "Acircumflex", "Adieresis", "Agrave", "Aring", "Atilde", "Ccedilla", "Eacute", "Ecircumflex", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Ntilde", "Oacute", "Ocircumflex", "Odieresis", "Ograve", "Otilde", "Scaron", "Uacute", "Ucircumflex", "Udieresis", "Ugrave", "Yacute", "Ydieresis", "Zcaron", "aacute", "acircumflex", "adieresis", "agrave", "aring", "atilde", "ccedilla", "eacute", "ecircumflex", "edieresis", "egrave", "iacute", "icircumflex", "idieresis", "igrave", "ntilde", "oacute", "ocircumflex", "odieresis", "ograve", "otilde", "scaron", "uacute", "ucircumflex", "udieresis", "ugrave", "yacute", "ydieresis", "zcaron", "exclamsmall", "Hungarumlautsmall", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "266 ff", "onedotenleader", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "isuperior", "lsuperior", "msuperior", "nsuperior", "osuperior", "rsuperior", "ssuperior", "tsuperior", "ff", "ffi", "ffl", "parenleftinferior", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "exclamdownsmall", "centoldstyle", "Lslashsmall", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "Dotaccentsmall", "Macronsmall", "figuredash", "hypheninferior", "Ogoneksmall", "Ringsmall", "Cedillasmall", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "zerosuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall", "001.000", "001.001", "001.002", "001.003", "Black", "Bold", "Book", "Light", "Medium", "Regular", "Roman", "Semibold"];
var Xp = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "", "endash", "dagger", "daggerdbl", "periodcentered", "", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "", "questiondown", "", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "", "ring", "cedilla", "", "hungarumlaut", "ogonek", "caron", "emdash", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "AE", "", "ordfeminine", "", "", "", "", "Lslash", "Oslash", "OE", "ordmasculine", "", "", "", "", "", "ae", "", "", "", "dotlessi", "", "", "lslash", "oslash", "oe", "germandbls"];
var qp = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclamsmall", "Hungarumlautsmall", "", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "twodotenleader", "onedotenleader", "comma", "hyphen", "period", "fraction", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "colon", "semicolon", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "", "", "isuperior", "", "", "lsuperior", "msuperior", "nsuperior", "osuperior", "", "", "rsuperior", "ssuperior", "tsuperior", "", "ff", "fi", "fl", "ffi", "ffl", "parenleftinferior", "", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdownsmall", "centoldstyle", "Lslashsmall", "", "", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "", "Dotaccentsmall", "", "", "Macronsmall", "", "", "figuredash", "hypheninferior", "", "", "Ogoneksmall", "Ringsmall", "Cedillasmall", "", "", "", "onequarter", "onehalf", "threequarters", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "", "", "zerosuperior", "onesuperior", "twosuperior", "threesuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall"];
function Vs(e) {
  this.font = e;
}
Vs.prototype.charToGlyphIndex = function(e) {
  var t = e.codePointAt(0), r = this.font.glyphs;
  if (r) {
    for (var n = 0; n < r.length; n += 1)
      for (var i = r.get(n), a = 0; a < i.unicodes.length; a += 1)
        if (i.unicodes[a] === t)
          return n;
  }
  return null;
};
function Hs(e) {
  this.cmap = e;
}
Hs.prototype.charToGlyphIndex = function(e) {
  return this.cmap.glyphIndexMap[e.codePointAt(0)] || 0;
};
function kn(e, t) {
  this.encoding = e, this.charset = t;
}
kn.prototype.charToGlyphIndex = function(e) {
  var t = e.codePointAt(0), r = this.encoding[t];
  return this.charset.indexOf(r);
};
function Yp(e) {
  for (var t, r = e.tables.cmap.glyphIndexMap, n = Object.keys(r), i = 0; i < n.length; i += 1) {
    var a = n[i], o = r[a];
    t = e.glyphs.get(o), t.addUnicode(parseInt(a));
  }
}
function Zp(e) {
  e._IndexToUnicodeMap = {};
  for (var t = e.tables.cmap.glyphIndexMap, r = Object.keys(t), n = 0; n < r.length; n += 1) {
    var i = r[n], a = t[i];
    e._IndexToUnicodeMap[a] === void 0 ? e._IndexToUnicodeMap[a] = { unicodes: [parseInt(i)] } : e._IndexToUnicodeMap[a].unicodes.push(parseInt(i));
  }
}
function Jp(e, t) {
  t.lowMemory ? Zp(e) : Yp(e);
}
function Xs(e) {
  throw new Error(e);
}
function cs(e, t) {
  e || Xs(t);
}
var Te = { fail: Xs, argument: cs, assert: cs };
function Kp(e, t) {
  var r = t || new ot();
  return { configurable: true, get: function() {
    return typeof r == "function" && (r = r()), r;
  }, set: function(n) {
    r = n;
  } };
}
function Jt(e) {
  this.bindConstructorValues(e);
}
Jt.prototype.bindConstructorValues = function(e) {
  this.index = e.index || 0, this.name = e.name || null, this.unicode = e.unicode || void 0, this.unicodes = e.unicodes || e.unicode !== void 0 ? [e.unicode] : [], "xMin" in e && (this.xMin = e.xMin), "yMin" in e && (this.yMin = e.yMin), "xMax" in e && (this.xMax = e.xMax), "yMax" in e && (this.yMax = e.yMax), "advanceWidth" in e && (this.advanceWidth = e.advanceWidth), Object.defineProperty(this, "path", Kp(this, e.path));
};
Jt.prototype.addUnicode = function(e) {
  this.unicodes.length === 0 && (this.unicode = e), this.unicodes.push(e);
};
Jt.prototype.getPath = function(e, t, r, n, i) {
  e = e !== void 0 ? e : 0, t = t !== void 0 ? t : 0, r = r !== void 0 ? r : 72;
  var a, o;
  n || (n = {});
  var u = n.xScale, s = n.yScale;
  if (n.hinting && i && i.hinting && (o = this.path && i.hinting.exec(this, r)), o)
    a = i.hinting.getCommands(o), e = Math.round(e), t = Math.round(t), u = s = 1;
  else {
    a = this.path.commands;
    var l = 1 / (this.path.unitsPerEm || 1e3) * r;
    u === void 0 && (u = l), s === void 0 && (s = l);
  }
  for (var f = new ot(), c = 0; c < a.length; c += 1) {
    var p2 = a[c];
    p2.type === "M" ? f.moveTo(e + p2.x * u, t + -p2.y * s) : p2.type === "L" ? f.lineTo(e + p2.x * u, t + -p2.y * s) : p2.type === "Q" ? f.quadraticCurveTo(e + p2.x1 * u, t + -p2.y1 * s, e + p2.x * u, t + -p2.y * s) : p2.type === "C" ? f.curveTo(e + p2.x1 * u, t + -p2.y1 * s, e + p2.x2 * u, t + -p2.y2 * s, e + p2.x * u, t + -p2.y * s) : p2.type === "Z" && f.closePath();
  }
  return f;
};
Jt.prototype.getContours = function() {
  if (this.points === void 0)
    return [];
  for (var e = [], t = [], r = 0; r < this.points.length; r += 1) {
    var n = this.points[r];
    t.push(n), n.lastPointOfContour && (e.push(t), t = []);
  }
  return Te.argument(t.length === 0, "There are still points left in the current contour."), e;
};
Jt.prototype.getMetrics = function() {
  for (var e = this.path.commands, t = [], r = [], n = 0; n < e.length; n += 1) {
    var i = e[n];
    i.type !== "Z" && (t.push(i.x), r.push(i.y)), (i.type === "Q" || i.type === "C") && (t.push(i.x1), r.push(i.y1)), i.type === "C" && (t.push(i.x2), r.push(i.y2));
  }
  var a = { xMin: Math.min.apply(null, t), yMin: Math.min.apply(null, r), xMax: Math.max.apply(null, t), yMax: Math.max.apply(null, r), leftSideBearing: this.leftSideBearing };
  return isFinite(a.xMin) || (a.xMin = 0), isFinite(a.xMax) || (a.xMax = this.advanceWidth), isFinite(a.yMin) || (a.yMin = 0), isFinite(a.yMax) || (a.yMax = 0), a.rightSideBearing = this.advanceWidth - a.leftSideBearing - (a.xMax - a.xMin), a;
};
function Fn(e, t, r) {
  Object.defineProperty(e, t, { get: function() {
    return e.path, e[r];
  }, set: function(n) {
    e[r] = n;
  }, enumerable: true, configurable: true });
}
function ia(e, t) {
  if (this.font = e, this.glyphs = {}, Array.isArray(t))
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.path.unitsPerEm = e.unitsPerEm, this.glyphs[r] = n;
    }
  this.length = t && t.length || 0;
}
ia.prototype.get = function(e) {
  if (this.glyphs[e] === void 0) {
    this.font._push(e), typeof this.glyphs[e] == "function" && (this.glyphs[e] = this.glyphs[e]());
    var t = this.glyphs[e], r = this.font._IndexToUnicodeMap[e];
    if (r)
      for (var n = 0; n < r.unicodes.length; n++)
        t.addUnicode(r.unicodes[n]);
    this.glyphs[e].advanceWidth = this.font._hmtxTableData[e].advanceWidth, this.glyphs[e].leftSideBearing = this.font._hmtxTableData[e].leftSideBearing;
  } else
    typeof this.glyphs[e] == "function" && (this.glyphs[e] = this.glyphs[e]());
  return this.glyphs[e];
};
ia.prototype.push = function(e, t) {
  this.glyphs[e] = t, this.length++;
};
function Qp(e, t) {
  return new Jt({ index: t, font: e });
}
function eh(e, t, r, n, i, a) {
  return function() {
    var o = new Jt({ index: t, font: e });
    return o.path = function() {
      r(o, n, i);
      var u = a(e.glyphs, o);
      return u.unitsPerEm = e.unitsPerEm, u;
    }, Fn(o, "xMin", "_xMin"), Fn(o, "xMax", "_xMax"), Fn(o, "yMin", "_yMin"), Fn(o, "yMax", "_yMax"), o;
  };
}
function th(e, t, r, n) {
  return function() {
    var i = new Jt({ index: t, font: e });
    return i.path = function() {
      var a = r(e, i, n);
      return a.unitsPerEm = e.unitsPerEm, a;
    }, i;
  };
}
var $t = { GlyphSet: ia, glyphLoader: Qp, ttfGlyphLoader: eh, cffGlyphLoader: th };
function qi(e, t) {
  for (var r = 0, n = e.length - 1; r <= n; ) {
    var i = r + n >>> 1, a = e[i].tag;
    if (a === t)
      return i;
    a < t ? r = i + 1 : n = i - 1;
  }
  return -r - 1;
}
function ps(e, t) {
  for (var r = 0, n = e.length - 1; r <= n; ) {
    var i = r + n >>> 1, a = e[i];
    if (a === t)
      return i;
    a < t ? r = i + 1 : n = i - 1;
  }
  return -r - 1;
}
function hs(e, t) {
  for (var r, n = 0, i = e.length - 1; n <= i; ) {
    var a = n + i >>> 1;
    r = e[a];
    var o = r.start;
    if (o === t)
      return r;
    o < t ? n = a + 1 : i = a - 1;
  }
  if (n > 0)
    return r = e[n - 1], t > r.end ? 0 : r;
}
function jr(e, t) {
  this.font = e, this.tableName = t;
}
jr.prototype = { searchTag: qi, binSearch: ps, getTable: function(e) {
  var t = this.font.tables[this.tableName];
  return !t && e && (t = this.font.tables[this.tableName] = this.createDefaultTable()), t;
}, getDefaultScriptName: function() {
  var e = this.getTable();
  if (e) {
    for (var t = false, r = 0; r < e.scripts.length; r++) {
      var n = e.scripts[r].tag;
      if (n === "DFLT")
        return n;
      n === "latn" && (t = true);
    }
    if (t)
      return "latn";
  }
}, getScriptTable: function(e, t) {
  var r = this.getTable(t);
  if (r) {
    e = e || "DFLT";
    var n = r.scripts, i = qi(r.scripts, e);
    if (i >= 0)
      return n[i].script;
    if (t) {
      var a = { tag: e, script: { defaultLangSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] }, langSysRecords: [] } };
      return n.splice(-1 - i, 0, a), a.script;
    }
  }
}, getLangSysTable: function(e, t, r) {
  var n = this.getScriptTable(e, r);
  if (n) {
    if (!t || t === "dflt" || t === "DFLT")
      return n.defaultLangSys;
    var i = qi(n.langSysRecords, t);
    if (i >= 0)
      return n.langSysRecords[i].langSys;
    if (r) {
      var a = { tag: t, langSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] } };
      return n.langSysRecords.splice(-1 - i, 0, a), a.langSys;
    }
  }
}, getFeatureTable: function(e, t, r, n) {
  var i = this.getLangSysTable(e, t, n);
  if (i) {
    for (var a, o = i.featureIndexes, u = this.font.tables[this.tableName].features, s = 0; s < o.length; s++)
      if (a = u[o[s]], a.tag === r)
        return a.feature;
    if (n) {
      var l = u.length;
      return Te.assert(l === 0 || r >= u[l - 1].tag, "Features must be added in alphabetical order."), a = { tag: r, feature: { params: 0, lookupListIndexes: [] } }, u.push(a), o.push(l), a.feature;
    }
  }
}, getLookupTables: function(e, t, r, n, i) {
  var a = this.getFeatureTable(e, t, r, i), o = [];
  if (a) {
    for (var u, s = a.lookupListIndexes, l = this.font.tables[this.tableName].lookups, f = 0; f < s.length; f++)
      u = l[s[f]], u.lookupType === n && o.push(u);
    if (o.length === 0 && i) {
      u = { lookupType: n, lookupFlag: 0, subtables: [], markFilteringSet: void 0 };
      var c = l.length;
      return l.push(u), s.push(c), [u];
    }
  }
  return o;
}, getGlyphClass: function(e, t) {
  switch (e.format) {
    case 1:
      return e.startGlyph <= t && t < e.startGlyph + e.classes.length ? e.classes[t - e.startGlyph] : 0;
    case 2:
      var r = hs(e.ranges, t);
      return r ? r.classId : 0;
  }
}, getCoverageIndex: function(e, t) {
  switch (e.format) {
    case 1:
      var r = ps(e.glyphs, t);
      return r >= 0 ? r : -1;
    case 2:
      var n = hs(e.ranges, t);
      return n ? n.index + t - n.start : -1;
  }
}, expandCoverage: function(e) {
  if (e.format === 1)
    return e.glyphs;
  for (var t = [], r = e.ranges, n = 0; n < r.length; n++)
    for (var i = r[n], a = i.start, o = i.end, u = a; u <= o; u++)
      t.push(u);
  return t;
} };
function zr(e) {
  jr.call(this, e, "gpos");
}
zr.prototype = jr.prototype;
zr.prototype.init = function() {
  var e = this.getDefaultScriptName();
  this.defaultKerningTables = this.getKerningTables(e);
};
zr.prototype.getKerningValue = function(e, t, r) {
  for (var n = 0; n < e.length; n++)
    for (var i = e[n].subtables, a = 0; a < i.length; a++) {
      var o = i[a], u = this.getCoverageIndex(o.coverage, t);
      if (!(u < 0))
        switch (o.posFormat) {
          case 1:
            for (var s = o.pairSets[u], l = 0; l < s.length; l++) {
              var f = s[l];
              if (f.secondGlyph === r)
                return f.value1 && f.value1.xAdvance || 0;
            }
            break;
          case 2:
            var c = this.getGlyphClass(o.classDef1, t), p2 = this.getGlyphClass(o.classDef2, r), d = o.classRecords[c][p2];
            return d.value1 && d.value1.xAdvance || 0;
        }
    }
  return 0;
};
zr.prototype.getKerningTables = function(e, t) {
  if (this.font.tables.gpos)
    return this.getLookupTables(e, t, "kern", 2);
};
function gt(e) {
  jr.call(this, e, "gsub");
}
function rh(e, t) {
  var r = e.length;
  if (r !== t.length)
    return false;
  for (var n = 0; n < r; n++)
    if (e[n] !== t[n])
      return false;
  return true;
}
function aa(e, t, r) {
  for (var n = e.subtables, i = 0; i < n.length; i++) {
    var a = n[i];
    if (a.substFormat === t)
      return a;
  }
  if (r)
    return n.push(r), r;
}
gt.prototype = jr.prototype;
gt.prototype.createDefaultTable = function() {
  return { version: 1, scripts: [{ tag: "DFLT", script: { defaultLangSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] }, langSysRecords: [] } }], features: [], lookups: [] };
};
gt.prototype.getSingle = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 1), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++) {
      var s = o[u], l = this.expandCoverage(s.coverage), f = void 0;
      if (s.substFormat === 1) {
        var c = s.deltaGlyphId;
        for (f = 0; f < l.length; f++) {
          var p2 = l[f];
          n.push({ sub: p2, by: p2 + c });
        }
      } else {
        var d = s.substitute;
        for (f = 0; f < l.length; f++)
          n.push({ sub: l[f], by: d[f] });
      }
    }
  return n;
};
gt.prototype.getMultiple = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 2), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++) {
      var s = o[u], l = this.expandCoverage(s.coverage), f = void 0;
      for (f = 0; f < l.length; f++) {
        var c = l[f], p2 = s.sequences[f];
        n.push({ sub: c, by: p2 });
      }
    }
  return n;
};
gt.prototype.getAlternates = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 3), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++)
      for (var s = o[u], l = this.expandCoverage(s.coverage), f = s.alternateSets, c = 0; c < l.length; c++)
        n.push({ sub: l[c], by: f[c] });
  return n;
};
gt.prototype.getLigatures = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 4), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++)
      for (var s = o[u], l = this.expandCoverage(s.coverage), f = s.ligatureSets, c = 0; c < l.length; c++)
        for (var p2 = l[c], d = f[c], D = 0; D < d.length; D++) {
          var v = d[D];
          n.push({ sub: [p2].concat(v.components), by: v.ligGlyph });
        }
  return n;
};
gt.prototype.addSingle = function(e, t, r, n) {
  var i = this.getLookupTables(r, n, e, 1, true)[0], a = aa(i, 2, { substFormat: 2, coverage: { format: 1, glyphs: [] }, substitute: [] });
  Te.assert(a.coverage.format === 1, "Single: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub, u = this.binSearch(a.coverage.glyphs, o);
  u < 0 && (u = -1 - u, a.coverage.glyphs.splice(u, 0, o), a.substitute.splice(u, 0, 0)), a.substitute[u] = t.by;
};
gt.prototype.addMultiple = function(e, t, r, n) {
  Te.assert(t.by instanceof Array && t.by.length > 1, 'Multiple: "by" must be an array of two or more ids');
  var i = this.getLookupTables(r, n, e, 2, true)[0], a = aa(i, 1, { substFormat: 1, coverage: { format: 1, glyphs: [] }, sequences: [] });
  Te.assert(a.coverage.format === 1, "Multiple: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub, u = this.binSearch(a.coverage.glyphs, o);
  u < 0 && (u = -1 - u, a.coverage.glyphs.splice(u, 0, o), a.sequences.splice(u, 0, 0)), a.sequences[u] = t.by;
};
gt.prototype.addAlternate = function(e, t, r, n) {
  var i = this.getLookupTables(r, n, e, 3, true)[0], a = aa(i, 1, { substFormat: 1, coverage: { format: 1, glyphs: [] }, alternateSets: [] });
  Te.assert(a.coverage.format === 1, "Alternate: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub, u = this.binSearch(a.coverage.glyphs, o);
  u < 0 && (u = -1 - u, a.coverage.glyphs.splice(u, 0, o), a.alternateSets.splice(u, 0, 0)), a.alternateSets[u] = t.by;
};
gt.prototype.addLigature = function(e, t, r, n) {
  var i = this.getLookupTables(r, n, e, 4, true)[0], a = i.subtables[0];
  a || (a = { substFormat: 1, coverage: { format: 1, glyphs: [] }, ligatureSets: [] }, i.subtables[0] = a), Te.assert(a.coverage.format === 1, "Ligature: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub[0], u = t.sub.slice(1), s = { ligGlyph: t.by, components: u }, l = this.binSearch(a.coverage.glyphs, o);
  if (l >= 0) {
    for (var f = a.ligatureSets[l], c = 0; c < f.length; c++)
      if (rh(f[c].components, u))
        return;
    f.push(s);
  } else
    l = -1 - l, a.coverage.glyphs.splice(l, 0, o), a.ligatureSets.splice(l, 0, [s]);
};
gt.prototype.getFeature = function(e, t, r) {
  if (/ss\d\d/.test(e))
    return this.getSingle(e, t, r);
  switch (e) {
    case "aalt":
    case "salt":
      return this.getSingle(e, t, r).concat(this.getAlternates(e, t, r));
    case "dlig":
    case "liga":
    case "rlig":
      return this.getLigatures(e, t, r);
    case "ccmp":
      return this.getMultiple(e, t, r).concat(this.getLigatures(e, t, r));
    case "stch":
      return this.getMultiple(e, t, r);
  }
};
gt.prototype.add = function(e, t, r, n) {
  if (/ss\d\d/.test(e))
    return this.addSingle(e, t, r, n);
  switch (e) {
    case "aalt":
    case "salt":
      return typeof t.by == "number" ? this.addSingle(e, t, r, n) : this.addAlternate(e, t, r, n);
    case "dlig":
    case "liga":
    case "rlig":
      return this.addLigature(e, t, r, n);
    case "ccmp":
      return t.by instanceof Array ? this.addMultiple(e, t, r, n) : this.addLigature(e, t, r, n);
  }
};
function Nr(e, t) {
  if (!e)
    throw t;
}
function ds(e, t) {
  return e.getUint8(t);
}
function Tn(e, t) {
  return e.getUint16(t, false);
}
function nh(e, t) {
  return e.getInt16(t, false);
}
function oa(e, t) {
  return e.getUint32(t, false);
}
function qs(e, t) {
  var r = e.getInt16(t, false), n = e.getUint16(t + 2, false);
  return r + n / 65535;
}
function ih(e, t) {
  for (var r = "", n = t; n < t + 4; n += 1)
    r += String.fromCharCode(e.getInt8(n));
  return r;
}
function ah(e, t, r) {
  for (var n = 0, i = 0; i < r; i += 1)
    n <<= 8, n += e.getUint8(t + i);
  return n;
}
function oh(e, t, r) {
  for (var n = [], i = t; i < r; i += 1)
    n.push(e.getUint8(i));
  return n;
}
function sh(e) {
  for (var t = "", r = 0; r < e.length; r += 1)
    t += String.fromCharCode(e[r]);
  return t;
}
var uh = { byte: 1, uShort: 2, short: 2, uLong: 4, fixed: 4, longDateTime: 8, tag: 4 };
function $(e, t) {
  this.data = e, this.offset = t, this.relativeOffset = 0;
}
$.prototype.parseByte = function() {
  var e = this.data.getUint8(this.offset + this.relativeOffset);
  return this.relativeOffset += 1, e;
};
$.prototype.parseChar = function() {
  var e = this.data.getInt8(this.offset + this.relativeOffset);
  return this.relativeOffset += 1, e;
};
$.prototype.parseCard8 = $.prototype.parseByte;
$.prototype.parseUShort = function() {
  var e = this.data.getUint16(this.offset + this.relativeOffset);
  return this.relativeOffset += 2, e;
};
$.prototype.parseCard16 = $.prototype.parseUShort;
$.prototype.parseSID = $.prototype.parseUShort;
$.prototype.parseOffset16 = $.prototype.parseUShort;
$.prototype.parseShort = function() {
  var e = this.data.getInt16(this.offset + this.relativeOffset);
  return this.relativeOffset += 2, e;
};
$.prototype.parseF2Dot14 = function() {
  var e = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
  return this.relativeOffset += 2, e;
};
$.prototype.parseULong = function() {
  var e = oa(this.data, this.offset + this.relativeOffset);
  return this.relativeOffset += 4, e;
};
$.prototype.parseOffset32 = $.prototype.parseULong;
$.prototype.parseFixed = function() {
  var e = qs(this.data, this.offset + this.relativeOffset);
  return this.relativeOffset += 4, e;
};
$.prototype.parseString = function(e) {
  var t = this.data, r = this.offset + this.relativeOffset, n = "";
  this.relativeOffset += e;
  for (var i = 0; i < e; i++)
    n += String.fromCharCode(t.getUint8(r + i));
  return n;
};
$.prototype.parseTag = function() {
  return this.parseString(4);
};
$.prototype.parseLongDateTime = function() {
  var e = oa(this.data, this.offset + this.relativeOffset + 4);
  return e -= 2082844800, this.relativeOffset += 8, e;
};
$.prototype.parseVersion = function(e) {
  var t = Tn(this.data, this.offset + this.relativeOffset), r = Tn(this.data, this.offset + this.relativeOffset + 2);
  return this.relativeOffset += 4, e === void 0 && (e = 4096), t + r / e / 10;
};
$.prototype.skip = function(e, t) {
  t === void 0 && (t = 1), this.relativeOffset += uh[e] * t;
};
$.prototype.parseULongList = function(e) {
  e === void 0 && (e = this.parseULong());
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getUint32(n), n += 4;
  return this.relativeOffset += e * 4, t;
};
$.prototype.parseOffset16List = $.prototype.parseUShortList = function(e) {
  e === void 0 && (e = this.parseUShort());
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getUint16(n), n += 2;
  return this.relativeOffset += e * 2, t;
};
$.prototype.parseShortList = function(e) {
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getInt16(n), n += 2;
  return this.relativeOffset += e * 2, t;
};
$.prototype.parseByteList = function(e) {
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getUint8(n++);
  return this.relativeOffset += e, t;
};
$.prototype.parseList = function(e, t) {
  t || (t = e, e = this.parseUShort());
  for (var r = new Array(e), n = 0; n < e; n++)
    r[n] = t.call(this);
  return r;
};
$.prototype.parseList32 = function(e, t) {
  t || (t = e, e = this.parseULong());
  for (var r = new Array(e), n = 0; n < e; n++)
    r[n] = t.call(this);
  return r;
};
$.prototype.parseRecordList = function(e, t) {
  t || (t = e, e = this.parseUShort());
  for (var r = new Array(e), n = Object.keys(t), i = 0; i < e; i++) {
    for (var a = {}, o = 0; o < n.length; o++) {
      var u = n[o], s = t[u];
      a[u] = s.call(this);
    }
    r[i] = a;
  }
  return r;
};
$.prototype.parseRecordList32 = function(e, t) {
  t || (t = e, e = this.parseULong());
  for (var r = new Array(e), n = Object.keys(t), i = 0; i < e; i++) {
    for (var a = {}, o = 0; o < n.length; o++) {
      var u = n[o], s = t[u];
      a[u] = s.call(this);
    }
    r[i] = a;
  }
  return r;
};
$.prototype.parseStruct = function(e) {
  if (typeof e == "function")
    return e.call(this);
  for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
    var i = t[n], a = e[i];
    r[i] = a.call(this);
  }
  return r;
};
$.prototype.parseValueRecord = function(e) {
  if (e === void 0 && (e = this.parseUShort()), e !== 0) {
    var t = {};
    return e & 1 && (t.xPlacement = this.parseShort()), e & 2 && (t.yPlacement = this.parseShort()), e & 4 && (t.xAdvance = this.parseShort()), e & 8 && (t.yAdvance = this.parseShort()), e & 16 && (t.xPlaDevice = void 0, this.parseShort()), e & 32 && (t.yPlaDevice = void 0, this.parseShort()), e & 64 && (t.xAdvDevice = void 0, this.parseShort()), e & 128 && (t.yAdvDevice = void 0, this.parseShort()), t;
  }
};
$.prototype.parseValueRecordList = function() {
  for (var e = this.parseUShort(), t = this.parseUShort(), r = new Array(t), n = 0; n < t; n++)
    r[n] = this.parseValueRecord(e);
  return r;
};
$.prototype.parsePointer = function(e) {
  var t = this.parseOffset16();
  if (t > 0)
    return new $(this.data, this.offset + t).parseStruct(e);
};
$.prototype.parsePointer32 = function(e) {
  var t = this.parseOffset32();
  if (t > 0)
    return new $(this.data, this.offset + t).parseStruct(e);
};
$.prototype.parseListOfLists = function(e) {
  for (var t = this.parseOffset16List(), r = t.length, n = this.relativeOffset, i = new Array(r), a = 0; a < r; a++) {
    var o = t[a];
    if (o === 0) {
      i[a] = void 0;
      continue;
    }
    if (this.relativeOffset = o, e) {
      for (var u = this.parseOffset16List(), s = new Array(u.length), l = 0; l < u.length; l++)
        this.relativeOffset = o + u[l], s[l] = e.call(this);
      i[a] = s;
    } else
      i[a] = this.parseUShortList();
  }
  return this.relativeOffset = n, i;
};
$.prototype.parseCoverage = function() {
  var e = this.offset + this.relativeOffset, t = this.parseUShort(), r = this.parseUShort();
  if (t === 1)
    return { format: 1, glyphs: this.parseUShortList(r) };
  if (t === 2) {
    for (var n = new Array(r), i = 0; i < r; i++)
      n[i] = { start: this.parseUShort(), end: this.parseUShort(), index: this.parseUShort() };
    return { format: 2, ranges: n };
  }
  throw new Error("0x" + e.toString(16) + ": Coverage format must be 1 or 2.");
};
$.prototype.parseClassDef = function() {
  var e = this.offset + this.relativeOffset, t = this.parseUShort();
  if (t === 1)
    return { format: 1, startGlyph: this.parseUShort(), classes: this.parseUShortList() };
  if (t === 2)
    return { format: 2, ranges: this.parseRecordList({ start: $.uShort, end: $.uShort, classId: $.uShort }) };
  throw new Error("0x" + e.toString(16) + ": ClassDef format must be 1 or 2.");
};
$.list = function(e, t) {
  return function() {
    return this.parseList(e, t);
  };
};
$.list32 = function(e, t) {
  return function() {
    return this.parseList32(e, t);
  };
};
$.recordList = function(e, t) {
  return function() {
    return this.parseRecordList(e, t);
  };
};
$.recordList32 = function(e, t) {
  return function() {
    return this.parseRecordList32(e, t);
  };
};
$.pointer = function(e) {
  return function() {
    return this.parsePointer(e);
  };
};
$.pointer32 = function(e) {
  return function() {
    return this.parsePointer32(e);
  };
};
$.tag = $.prototype.parseTag;
$.byte = $.prototype.parseByte;
$.uShort = $.offset16 = $.prototype.parseUShort;
$.uShortList = $.prototype.parseUShortList;
$.uLong = $.offset32 = $.prototype.parseULong;
$.uLongList = $.prototype.parseULongList;
$.struct = $.prototype.parseStruct;
$.coverage = $.prototype.parseCoverage;
$.classDef = $.prototype.parseClassDef;
var vs = { reserved: $.uShort, reqFeatureIndex: $.uShort, featureIndexes: $.uShortList };
$.prototype.parseScriptList = function() {
  return this.parsePointer($.recordList({ tag: $.tag, script: $.pointer({ defaultLangSys: $.pointer(vs), langSysRecords: $.recordList({ tag: $.tag, langSys: $.pointer(vs) }) }) })) || [];
};
$.prototype.parseFeatureList = function() {
  return this.parsePointer($.recordList({ tag: $.tag, feature: $.pointer({ featureParams: $.offset16, lookupListIndexes: $.uShortList }) })) || [];
};
$.prototype.parseLookupList = function(e) {
  return this.parsePointer($.list($.pointer(function() {
    var t = this.parseUShort();
    Te.argument(1 <= t && t <= 9, "GPOS/GSUB lookup type " + t + " unknown.");
    var r = this.parseUShort(), n = r & 16;
    return { lookupType: t, lookupFlag: r, subtables: this.parseList($.pointer(e[t])), markFilteringSet: n ? this.parseUShort() : void 0 };
  }))) || [];
};
$.prototype.parseFeatureVariationsList = function() {
  return this.parsePointer32(function() {
    var e = this.parseUShort(), t = this.parseUShort();
    Te.argument(e === 1 && t < 1, "GPOS/GSUB feature variations table unknown.");
    var r = this.parseRecordList32({ conditionSetOffset: $.offset32, featureTableSubstitutionOffset: $.offset32 });
    return r;
  }) || [];
};
var se = { getByte: ds, getCard8: ds, getUShort: Tn, getCard16: Tn, getShort: nh, getULong: oa, getFixed: qs, getTag: ih, getOffset: ah, getBytes: oh, bytesToString: sh, Parser: $ };
function gs(e, t, r, n, i) {
  var a;
  return (t & n) > 0 ? (a = e.parseByte(), t & i || (a = -a), a = r + a) : (t & i) > 0 ? a = r : a = r + e.parseShort(), a;
}
function Ys(e, t, r) {
  var n = new se.Parser(t, r);
  e.numberOfContours = n.parseShort(), e._xMin = n.parseShort(), e._yMin = n.parseShort(), e._xMax = n.parseShort(), e._yMax = n.parseShort();
  var i, a;
  if (e.numberOfContours > 0) {
    for (var o = e.endPointIndices = [], u = 0; u < e.numberOfContours; u += 1)
      o.push(n.parseUShort());
    e.instructionLength = n.parseUShort(), e.instructions = [];
    for (var s = 0; s < e.instructionLength; s += 1)
      e.instructions.push(n.parseByte());
    var l = o[o.length - 1] + 1;
    i = [];
    for (var f = 0; f < l; f += 1)
      if (a = n.parseByte(), i.push(a), (a & 8) > 0)
        for (var c = n.parseByte(), p2 = 0; p2 < c; p2 += 1)
          i.push(a), f += 1;
    if (Te.argument(i.length === l, "Bad flags."), o.length > 0) {
      var d = [], D;
      if (l > 0) {
        for (var v = 0; v < l; v += 1)
          a = i[v], D = {}, D.onCurve = !!(a & 1), D.lastPointOfContour = o.indexOf(v) >= 0, d.push(D);
        for (var g = 0, y = 0; y < l; y += 1)
          a = i[y], D = d[y], D.x = gs(n, a, g, 2, 16), g = D.x;
        for (var b = 0, C = 0; C < l; C += 1)
          a = i[C], D = d[C], D.y = gs(n, a, b, 4, 32), b = D.y;
      }
      e.points = d;
    } else
      e.points = [];
  } else if (e.numberOfContours === 0)
    e.points = [];
  else {
    e.isComposite = true, e.points = [], e.components = [];
    for (var k = true; k; ) {
      i = n.parseUShort();
      var S = { glyphIndex: n.parseUShort(), xScale: 1, scale01: 0, scale10: 0, yScale: 1, dx: 0, dy: 0 };
      (i & 1) > 0 ? (i & 2) > 0 ? (S.dx = n.parseShort(), S.dy = n.parseShort()) : S.matchedPoints = [n.parseUShort(), n.parseUShort()] : (i & 2) > 0 ? (S.dx = n.parseChar(), S.dy = n.parseChar()) : S.matchedPoints = [n.parseByte(), n.parseByte()], (i & 8) > 0 ? S.xScale = S.yScale = n.parseF2Dot14() : (i & 64) > 0 ? (S.xScale = n.parseF2Dot14(), S.yScale = n.parseF2Dot14()) : (i & 128) > 0 && (S.xScale = n.parseF2Dot14(), S.scale01 = n.parseF2Dot14(), S.scale10 = n.parseF2Dot14(), S.yScale = n.parseF2Dot14()), e.components.push(S), k = !!(i & 32);
    }
    if (i & 256) {
      e.instructionLength = n.parseUShort(), e.instructions = [];
      for (var E = 0; E < e.instructionLength; E += 1)
        e.instructions.push(n.parseByte());
    }
  }
}
function Yi(e, t) {
  for (var r = [], n = 0; n < e.length; n += 1) {
    var i = e[n], a = { x: t.xScale * i.x + t.scale01 * i.y + t.dx, y: t.scale10 * i.x + t.yScale * i.y + t.dy, onCurve: i.onCurve, lastPointOfContour: i.lastPointOfContour };
    r.push(a);
  }
  return r;
}
function lh(e) {
  for (var t = [], r = [], n = 0; n < e.length; n += 1) {
    var i = e[n];
    r.push(i), i.lastPointOfContour && (t.push(r), r = []);
  }
  return Te.argument(r.length === 0, "There are still points left in the current contour."), t;
}
function Zs(e) {
  var t = new ot();
  if (!e)
    return t;
  for (var r = lh(e), n = 0; n < r.length; ++n) {
    var i = r[n], a = null, o = i[i.length - 1], u = i[0];
    if (o.onCurve)
      t.moveTo(o.x, o.y);
    else if (u.onCurve)
      t.moveTo(u.x, u.y);
    else {
      var s = { x: (o.x + u.x) * 0.5, y: (o.y + u.y) * 0.5 };
      t.moveTo(s.x, s.y);
    }
    for (var l = 0; l < i.length; ++l)
      if (a = o, o = u, u = i[(l + 1) % i.length], o.onCurve)
        t.lineTo(o.x, o.y);
      else {
        var f = a, c = u;
        a.onCurve || (f = { x: (o.x + a.x) * 0.5, y: (o.y + a.y) * 0.5 }), u.onCurve || (c = { x: (o.x + u.x) * 0.5, y: (o.y + u.y) * 0.5 }), t.quadraticCurveTo(o.x, o.y, c.x, c.y);
      }
    t.closePath();
  }
  return t;
}
function Js(e, t) {
  if (t.isComposite)
    for (var r = 0; r < t.components.length; r += 1) {
      var n = t.components[r], i = e.get(n.glyphIndex);
      if (i.getPath(), i.points) {
        var a = void 0;
        if (n.matchedPoints === void 0)
          a = Yi(i.points, n);
        else {
          if (n.matchedPoints[0] > t.points.length - 1 || n.matchedPoints[1] > i.points.length - 1)
            throw Error("Matched points out of range in " + t.name);
          var o = t.points[n.matchedPoints[0]], u = i.points[n.matchedPoints[1]], s = { xScale: n.xScale, scale01: n.scale01, scale10: n.scale10, yScale: n.yScale, dx: 0, dy: 0 };
          u = Yi([u], s)[0], s.dx = o.x - u.x, s.dy = o.y - u.y, a = Yi(i.points, s);
        }
        t.points = t.points.concat(a);
      }
    }
  return Zs(t.points);
}
function fh(e, t, r, n) {
  for (var i = new $t.GlyphSet(n), a = 0; a < r.length - 1; a += 1) {
    var o = r[a], u = r[a + 1];
    o !== u ? i.push(a, $t.ttfGlyphLoader(n, a, Ys, e, t + o, Js)) : i.push(a, $t.glyphLoader(n, a));
  }
  return i;
}
function ch(e, t, r, n) {
  var i = new $t.GlyphSet(n);
  return n._push = function(a) {
    var o = r[a], u = r[a + 1];
    o !== u ? i.push(a, $t.ttfGlyphLoader(n, a, Ys, e, t + o, Js)) : i.push(a, $t.glyphLoader(n, a));
  }, i;
}
function ph(e, t, r, n, i) {
  return i.lowMemory ? ch(e, t, r, n) : fh(e, t, r, n);
}
var Ks = { getPath: Zs, parse: ph };
var Qs;
var Dr;
var eu;
var ra;
function tu(e) {
  this.font = e, this.getCommands = function(t) {
    return Ks.getPath(t).commands;
  }, this._fpgmState = this._prepState = void 0, this._errorState = 0;
}
function hh(e) {
  return e;
}
function ru(e) {
  return Math.sign(e) * Math.round(Math.abs(e));
}
function dh(e) {
  return Math.sign(e) * Math.round(Math.abs(e * 2)) / 2;
}
function vh(e) {
  return Math.sign(e) * (Math.round(Math.abs(e) + 0.5) - 0.5);
}
function gh(e) {
  return Math.sign(e) * Math.ceil(Math.abs(e));
}
function mh(e) {
  return Math.sign(e) * Math.floor(Math.abs(e));
}
var nu = function(e) {
  var t = this.srPeriod, r = this.srPhase, n = this.srThreshold, i = 1;
  return e < 0 && (e = -e, i = -1), e += n - r, e = Math.trunc(e / t) * t, e += r, e < 0 ? r * i : e * i;
};
var Wt = { x: 1, y: 0, axis: "x", distance: function(e, t, r, n) {
  return (r ? e.xo : e.x) - (n ? t.xo : t.x);
}, interpolate: function(e, t, r, n) {
  var i, a, o, u, s, l, f;
  if (!n || n === this) {
    if (i = e.xo - t.xo, a = e.xo - r.xo, s = t.x - t.xo, l = r.x - r.xo, o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
      e.x = e.xo + (s + l) / 2;
      return;
    }
    e.x = e.xo + (s * u + l * o) / f;
    return;
  }
  if (i = n.distance(e, t, true, true), a = n.distance(e, r, true, true), s = n.distance(t, t, false, true), l = n.distance(r, r, false, true), o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
    Wt.setRelative(e, e, (s + l) / 2, n, true);
    return;
  }
  Wt.setRelative(e, e, (s * u + l * o) / f, n, true);
}, normalSlope: Number.NEGATIVE_INFINITY, setRelative: function(e, t, r, n, i) {
  if (!n || n === this) {
    e.x = (i ? t.xo : t.x) + r;
    return;
  }
  var a = i ? t.xo : t.x, o = i ? t.yo : t.y, u = a + r * n.x, s = o + r * n.y;
  e.x = u + (e.y - s) / n.normalSlope;
}, slope: 0, touch: function(e) {
  e.xTouched = true;
}, touched: function(e) {
  return e.xTouched;
}, untouch: function(e) {
  e.xTouched = false;
} };
var Yt = { x: 0, y: 1, axis: "y", distance: function(e, t, r, n) {
  return (r ? e.yo : e.y) - (n ? t.yo : t.y);
}, interpolate: function(e, t, r, n) {
  var i, a, o, u, s, l, f;
  if (!n || n === this) {
    if (i = e.yo - t.yo, a = e.yo - r.yo, s = t.y - t.yo, l = r.y - r.yo, o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
      e.y = e.yo + (s + l) / 2;
      return;
    }
    e.y = e.yo + (s * u + l * o) / f;
    return;
  }
  if (i = n.distance(e, t, true, true), a = n.distance(e, r, true, true), s = n.distance(t, t, false, true), l = n.distance(r, r, false, true), o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
    Yt.setRelative(e, e, (s + l) / 2, n, true);
    return;
  }
  Yt.setRelative(e, e, (s * u + l * o) / f, n, true);
}, normalSlope: 0, setRelative: function(e, t, r, n, i) {
  if (!n || n === this) {
    e.y = (i ? t.yo : t.y) + r;
    return;
  }
  var a = i ? t.xo : t.x, o = i ? t.yo : t.y, u = a + r * n.x, s = o + r * n.y;
  e.y = s + n.normalSlope * (e.x - u);
}, slope: Number.POSITIVE_INFINITY, touch: function(e) {
  e.yTouched = true;
}, touched: function(e) {
  return e.yTouched;
}, untouch: function(e) {
  e.yTouched = false;
} };
Object.freeze(Wt);
Object.freeze(Yt);
function Vr(e, t) {
  this.x = e, this.y = t, this.axis = void 0, this.slope = t / e, this.normalSlope = -e / t, Object.freeze(this);
}
Vr.prototype.distance = function(e, t, r, n) {
  return this.x * Wt.distance(e, t, r, n) + this.y * Yt.distance(e, t, r, n);
};
Vr.prototype.interpolate = function(e, t, r, n) {
  var i, a, o, u, s, l, f;
  if (o = n.distance(e, t, true, true), u = n.distance(e, r, true, true), i = n.distance(t, t, false, true), a = n.distance(r, r, false, true), s = Math.abs(o), l = Math.abs(u), f = s + l, f === 0) {
    this.setRelative(e, e, (i + a) / 2, n, true);
    return;
  }
  this.setRelative(e, e, (i * l + a * s) / f, n, true);
};
Vr.prototype.setRelative = function(e, t, r, n, i) {
  n = n || this;
  var a = i ? t.xo : t.x, o = i ? t.yo : t.y, u = a + r * n.x, s = o + r * n.y, l = n.normalSlope, f = this.slope, c = e.x, p2 = e.y;
  e.x = (f * c - l * u + s - p2) / (f - l), e.y = f * (e.x - c) + p2;
};
Vr.prototype.touch = function(e) {
  e.xTouched = true, e.yTouched = true;
};
function Hr(e, t) {
  var r = Math.sqrt(e * e + t * t);
  return e /= r, t /= r, e === 1 && t === 0 ? Wt : e === 0 && t === 1 ? Yt : new Vr(e, t);
}
function Zt(e, t, r, n) {
  this.x = this.xo = Math.round(e * 64) / 64, this.y = this.yo = Math.round(t * 64) / 64, this.lastPointOfContour = r, this.onCurve = n, this.prevPointOnContour = void 0, this.nextPointOnContour = void 0, this.xTouched = false, this.yTouched = false, Object.preventExtensions(this);
}
Zt.prototype.nextTouched = function(e) {
  for (var t = this.nextPointOnContour; !e.touched(t) && t !== this; )
    t = t.nextPointOnContour;
  return t;
};
Zt.prototype.prevTouched = function(e) {
  for (var t = this.prevPointOnContour; !e.touched(t) && t !== this; )
    t = t.prevPointOnContour;
  return t;
};
var Wr = Object.freeze(new Zt(0, 0));
var Dh = { cvCutIn: 17 / 16, deltaBase: 9, deltaShift: 0.125, loop: 1, minDis: 1, autoFlip: true };
function ur(e, t) {
  switch (this.env = e, this.stack = [], this.prog = t, e) {
    case "glyf":
      this.zp0 = this.zp1 = this.zp2 = 1, this.rp0 = this.rp1 = this.rp2 = 0;
    case "prep":
      this.fv = this.pv = this.dpv = Wt, this.round = ru;
  }
}
tu.prototype.exec = function(e, t) {
  if (typeof t != "number")
    throw new Error("Point size is not a number!");
  if (!(this._errorState > 2)) {
    var r = this.font, n = this._prepState;
    if (!n || n.ppem !== t) {
      var i = this._fpgmState;
      if (!i) {
        ur.prototype = Dh, i = this._fpgmState = new ur("fpgm", r.tables.fpgm), i.funcs = [], i.font = r, exports.DEBUG && (console.log("---EXEC FPGM---"), i.step = -1);
        try {
          Dr(i);
        } catch (l) {
          console.log("Hinting error in FPGM:" + l), this._errorState = 3;
          return;
        }
      }
      ur.prototype = i, n = this._prepState = new ur("prep", r.tables.prep), n.ppem = t;
      var a = r.tables.cvt;
      if (a)
        for (var o = n.cvt = new Array(a.length), u = t / r.unitsPerEm, s = 0; s < a.length; s++)
          o[s] = a[s] * u;
      else
        n.cvt = [];
      exports.DEBUG && (console.log("---EXEC PREP---"), n.step = -1);
      try {
        Dr(n);
      } catch (l) {
        this._errorState < 2 && console.log("Hinting error in PREP:" + l), this._errorState = 2;
      }
    }
    if (!(this._errorState > 1))
      try {
        return eu(e, n);
      } catch (l) {
        this._errorState < 1 && (console.log("Hinting error:" + l), console.log("Note: further hinting errors are silenced")), this._errorState = 1;
        return;
      }
  }
};
eu = function(e, t) {
  var r = t.ppem / t.font.unitsPerEm, n = r, i = e.components, a, o, u;
  if (ur.prototype = t, !i)
    u = new ur("glyf", e.instructions), exports.DEBUG && (console.log("---EXEC GLYPH---"), u.step = -1), ra(e, u, r, n), o = u.gZone;
  else {
    var s = t.font;
    o = [], a = [];
    for (var l = 0; l < i.length; l++) {
      var f = i[l], c = s.glyphs.get(f.glyphIndex);
      u = new ur("glyf", c.instructions), exports.DEBUG && (console.log("---EXEC COMP " + l + "---"), u.step = -1), ra(c, u, r, n);
      for (var p2 = Math.round(f.dx * r), d = Math.round(f.dy * n), D = u.gZone, v = u.contours, g = 0; g < D.length; g++) {
        var y = D[g];
        y.xTouched = y.yTouched = false, y.xo = y.x = y.x + p2, y.yo = y.y = y.y + d;
      }
      var b = o.length;
      o.push.apply(o, D);
      for (var C = 0; C < v.length; C++)
        a.push(v[C] + b);
    }
    e.instructions && !u.inhibitGridFit && (u = new ur("glyf", e.instructions), u.gZone = u.z0 = u.z1 = u.z2 = o, u.contours = a, o.push(new Zt(0, 0), new Zt(Math.round(e.advanceWidth * r), 0)), exports.DEBUG && (console.log("---EXEC COMPOSITE---"), u.step = -1), Dr(u), o.length -= 2);
  }
  return o;
};
ra = function(e, t, r, n) {
  for (var i = e.points || [], a = i.length, o = t.gZone = t.z0 = t.z1 = t.z2 = [], u = t.contours = [], s, l = 0; l < a; l++)
    s = i[l], o[l] = new Zt(s.x * r, s.y * n, s.lastPointOfContour, s.onCurve);
  for (var f, c, p2 = 0; p2 < a; p2++)
    s = o[p2], f || (f = s, u.push(p2)), s.lastPointOfContour ? (s.nextPointOnContour = f, f.prevPointOnContour = s, f = void 0) : (c = o[p2 + 1], s.nextPointOnContour = c, c.prevPointOnContour = s);
  if (!t.inhibitGridFit) {
    if (exports.DEBUG) {
      console.log("PROCESSING GLYPH", t.stack);
      for (var d = 0; d < a; d++)
        console.log(d, o[d].x, o[d].y);
    }
    if (o.push(new Zt(0, 0), new Zt(Math.round(e.advanceWidth * r), 0)), Dr(t), o.length -= 2, exports.DEBUG) {
      console.log("FINISHED GLYPH", t.stack);
      for (var D = 0; D < a; D++)
        console.log(D, o[D].x, o[D].y);
    }
  }
};
Dr = function(e) {
  var t = e.prog;
  if (t) {
    var r = t.length, n;
    for (e.ip = 0; e.ip < r; e.ip++) {
      if (exports.DEBUG && e.step++, n = Qs[t[e.ip]], !n)
        throw new Error("unknown instruction: 0x" + Number(t[e.ip]).toString(16));
      n(e);
    }
  }
};
function _n(e) {
  for (var t = e.tZone = new Array(e.gZone.length), r = 0; r < t.length; r++)
    t[r] = new Zt(0, 0);
}
function iu(e, t) {
  var r = e.prog, n = e.ip, i = 1, a;
  do
    if (a = r[++n], a === 88)
      i++;
    else if (a === 89)
      i--;
    else if (a === 64)
      n += r[n + 1] + 1;
    else if (a === 65)
      n += 2 * r[n + 1] + 1;
    else if (a >= 176 && a <= 183)
      n += a - 176 + 1;
    else if (a >= 184 && a <= 191)
      n += (a - 184 + 1) * 2;
    else if (t && i === 1 && a === 27)
      break;
  while (i > 0);
  e.ip = n;
}
function ms(e, t) {
  exports.DEBUG && console.log(t.step, "SVTCA[" + e.axis + "]"), t.fv = t.pv = t.dpv = e;
}
function Ds(e, t) {
  exports.DEBUG && console.log(t.step, "SPVTCA[" + e.axis + "]"), t.pv = t.dpv = e;
}
function ys(e, t) {
  exports.DEBUG && console.log(t.step, "SFVTCA[" + e.axis + "]"), t.fv = e;
}
function bs(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z2[n], o = t.z1[i];
  exports.DEBUG && console.log("SPVTL[" + e + "]", n, i);
  var u, s;
  e ? (u = a.y - o.y, s = o.x - a.x) : (u = o.x - a.x, s = o.y - a.y), t.pv = t.dpv = Hr(u, s);
}
function xs(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z2[n], o = t.z1[i];
  exports.DEBUG && console.log("SFVTL[" + e + "]", n, i);
  var u, s;
  e ? (u = a.y - o.y, s = o.x - a.x) : (u = o.x - a.x, s = o.y - a.y), t.fv = Hr(u, s);
}
function yh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SPVFS[]", r, n), e.pv = e.dpv = Hr(n, r);
}
function bh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SPVFS[]", r, n), e.fv = Hr(n, r);
}
function xh(e) {
  var t = e.stack, r = e.pv;
  exports.DEBUG && console.log(e.step, "GPV[]"), t.push(r.x * 16384), t.push(r.y * 16384);
}
function wh(e) {
  var t = e.stack, r = e.fv;
  exports.DEBUG && console.log(e.step, "GFV[]"), t.push(r.x * 16384), t.push(r.y * 16384);
}
function Eh(e) {
  e.fv = e.pv, exports.DEBUG && console.log(e.step, "SFVTPV[]");
}
function Fh(e) {
  var t = e.stack, r = t.pop(), n = t.pop(), i = t.pop(), a = t.pop(), o = t.pop(), u = e.z0, s = e.z1, l = u[r], f = u[n], c = s[i], p2 = s[a], d = e.z2[o];
  exports.DEBUG && console.log("ISECT[], ", r, n, i, a, o);
  var D = l.x, v = l.y, g = f.x, y = f.y, b = c.x, C = c.y, k = p2.x, S = p2.y, E = (D - g) * (C - S) - (v - y) * (b - k), L = D * y - v * g, T = b * S - C * k;
  d.x = (L * (b - k) - T * (D - g)) / E, d.y = (L * (C - S) - T * (v - y)) / E;
}
function Ch(e) {
  e.rp0 = e.stack.pop(), exports.DEBUG && console.log(e.step, "SRP0[]", e.rp0);
}
function Sh(e) {
  e.rp1 = e.stack.pop(), exports.DEBUG && console.log(e.step, "SRP1[]", e.rp1);
}
function kh(e) {
  e.rp2 = e.stack.pop(), exports.DEBUG && console.log(e.step, "SRP2[]", e.rp2);
}
function Th(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZP0[]", t), e.zp0 = t, t) {
    case 0:
      e.tZone || _n(e), e.z0 = e.tZone;
      break;
    case 1:
      e.z0 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function _h(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZP1[]", t), e.zp1 = t, t) {
    case 0:
      e.tZone || _n(e), e.z1 = e.tZone;
      break;
    case 1:
      e.z1 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function Ah(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZP2[]", t), e.zp2 = t, t) {
    case 0:
      e.tZone || _n(e), e.z2 = e.tZone;
      break;
    case 1:
      e.z2 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function Oh(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZPS[]", t), e.zp0 = e.zp1 = e.zp2 = t, t) {
    case 0:
      e.tZone || _n(e), e.z0 = e.z1 = e.z2 = e.tZone;
      break;
    case 1:
      e.z0 = e.z1 = e.z2 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function Lh(e) {
  e.loop = e.stack.pop(), exports.DEBUG && console.log(e.step, "SLOOP[]", e.loop);
}
function Ih(e) {
  exports.DEBUG && console.log(e.step, "RTG[]"), e.round = ru;
}
function Ph(e) {
  exports.DEBUG && console.log(e.step, "RTHG[]"), e.round = vh;
}
function Rh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SMD[]", t), e.minDis = t / 64;
}
function Uh(e) {
  exports.DEBUG && console.log(e.step, "ELSE[]"), iu(e, false);
}
function Bh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "JMPR[]", t), e.ip += t - 1;
}
function Nh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SCVTCI[]", t), e.cvCutIn = t / 64;
}
function Mh(e) {
  var t = e.stack;
  exports.DEBUG && console.log(e.step, "DUP[]"), t.push(t[t.length - 1]);
}
function Zi(e) {
  exports.DEBUG && console.log(e.step, "POP[]"), e.stack.pop();
}
function Gh(e) {
  exports.DEBUG && console.log(e.step, "CLEAR[]"), e.stack.length = 0;
}
function Wh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SWAP[]"), t.push(r), t.push(n);
}
function $h(e) {
  var t = e.stack;
  exports.DEBUG && console.log(e.step, "DEPTH[]"), t.push(t.length);
}
function jh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "LOOPCALL[]", r, n);
  var i = e.ip, a = e.prog;
  e.prog = e.funcs[r];
  for (var o = 0; o < n; o++)
    Dr(e), exports.DEBUG && console.log(++e.step, o + 1 < n ? "next loopcall" : "done loopcall", o);
  e.ip = i, e.prog = a;
}
function zh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "CALL[]", t);
  var r = e.ip, n = e.prog;
  e.prog = e.funcs[t], Dr(e), e.ip = r, e.prog = n, exports.DEBUG && console.log(++e.step, "returning from", t);
}
function Vh(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "CINDEX[]", r), t.push(t[t.length - r]);
}
function Hh(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "MINDEX[]", r), t.push(t.splice(t.length - r, 1)[0]);
}
function Xh(e) {
  if (e.env !== "fpgm")
    throw new Error("FDEF not allowed here");
  var t = e.stack, r = e.prog, n = e.ip, i = t.pop(), a = n;
  for (exports.DEBUG && console.log(e.step, "FDEF[]", i); r[++n] !== 45; )
    ;
  e.ip = n, e.funcs[i] = r.slice(a + 1, n);
}
function ws(e, t) {
  var r = t.stack.pop(), n = t.z0[r], i = t.fv, a = t.pv;
  exports.DEBUG && console.log(t.step, "MDAP[" + e + "]", r);
  var o = a.distance(n, Wr);
  e && (o = t.round(o)), i.setRelative(n, Wr, o, a), i.touch(n), t.rp0 = t.rp1 = r;
}
function Es(e, t) {
  var r = t.z2, n = r.length - 2, i, a, o;
  exports.DEBUG && console.log(t.step, "IUP[" + e.axis + "]");
  for (var u = 0; u < n; u++)
    i = r[u], !e.touched(i) && (a = i.prevTouched(e), a !== i && (o = i.nextTouched(e), a === o && e.setRelative(i, i, e.distance(a, a, false, true), e, true), e.interpolate(i, a, o, e)));
}
function Fs(e, t) {
  for (var r = t.stack, n = e ? t.rp1 : t.rp2, i = (e ? t.z0 : t.z1)[n], a = t.fv, o = t.pv, u = t.loop, s = t.z2; u--; ) {
    var l = r.pop(), f = s[l], c = o.distance(i, i, false, true);
    a.setRelative(f, f, c, o), a.touch(f), exports.DEBUG && console.log(t.step, (t.loop > 1 ? "loop " + (t.loop - u) + ": " : "") + "SHP[" + (e ? "rp1" : "rp2") + "]", l);
  }
  t.loop = 1;
}
function Cs(e, t) {
  var r = t.stack, n = e ? t.rp1 : t.rp2, i = (e ? t.z0 : t.z1)[n], a = t.fv, o = t.pv, u = r.pop(), s = t.z2[t.contours[u]], l = s;
  exports.DEBUG && console.log(t.step, "SHC[" + e + "]", u);
  var f = o.distance(i, i, false, true);
  do
    l !== i && a.setRelative(l, l, f, o), l = l.nextPointOnContour;
  while (l !== s);
}
function Ss(e, t) {
  var r = t.stack, n = e ? t.rp1 : t.rp2, i = (e ? t.z0 : t.z1)[n], a = t.fv, o = t.pv, u = r.pop();
  exports.DEBUG && console.log(t.step, "SHZ[" + e + "]", u);
  var s;
  switch (u) {
    case 0:
      s = t.tZone;
      break;
    case 1:
      s = t.gZone;
      break;
    default:
      throw new Error("Invalid zone");
  }
  for (var l, f = o.distance(i, i, false, true), c = s.length - 2, p2 = 0; p2 < c; p2++)
    l = s[p2], a.setRelative(l, l, f, o);
}
function qh(e) {
  for (var t = e.stack, r = e.loop, n = e.fv, i = t.pop() / 64, a = e.z2; r--; ) {
    var o = t.pop(), u = a[o];
    exports.DEBUG && console.log(e.step, (e.loop > 1 ? "loop " + (e.loop - r) + ": " : "") + "SHPIX[]", o, i), n.setRelative(u, u, i), n.touch(u);
  }
  e.loop = 1;
}
function Yh(e) {
  for (var t = e.stack, r = e.rp1, n = e.rp2, i = e.loop, a = e.z0[r], o = e.z1[n], u = e.fv, s = e.dpv, l = e.z2; i--; ) {
    var f = t.pop(), c = l[f];
    exports.DEBUG && console.log(e.step, (e.loop > 1 ? "loop " + (e.loop - i) + ": " : "") + "IP[]", f, r, "<->", n), u.interpolate(c, a, o, s), u.touch(c);
  }
  e.loop = 1;
}
function ks(e, t) {
  var r = t.stack, n = r.pop() / 64, i = r.pop(), a = t.z1[i], o = t.z0[t.rp0], u = t.fv, s = t.pv;
  u.setRelative(a, o, n, s), u.touch(a), exports.DEBUG && console.log(t.step, "MSIRP[" + e + "]", n, i), t.rp1 = t.rp0, t.rp2 = i, e && (t.rp0 = i);
}
function Zh(e) {
  for (var t = e.stack, r = e.rp0, n = e.z0[r], i = e.loop, a = e.fv, o = e.pv, u = e.z1; i--; ) {
    var s = t.pop(), l = u[s];
    exports.DEBUG && console.log(e.step, (e.loop > 1 ? "loop " + (e.loop - i) + ": " : "") + "ALIGNRP[]", s), a.setRelative(l, n, 0, o), a.touch(l);
  }
  e.loop = 1;
}
function Jh(e) {
  exports.DEBUG && console.log(e.step, "RTDG[]"), e.round = dh;
}
function Ts(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z0[i], o = t.fv, u = t.pv, s = t.cvt[n];
  exports.DEBUG && console.log(t.step, "MIAP[" + e + "]", n, "(", s, ")", i);
  var l = u.distance(a, Wr);
  e && (Math.abs(l - s) < t.cvCutIn && (l = s), l = t.round(l)), o.setRelative(a, Wr, l, u), t.zp0 === 0 && (a.xo = a.x, a.yo = a.y), o.touch(a), t.rp0 = t.rp1 = i;
}
function Kh(e) {
  var t = e.prog, r = e.ip, n = e.stack, i = t[++r];
  exports.DEBUG && console.log(e.step, "NPUSHB[]", i);
  for (var a = 0; a < i; a++)
    n.push(t[++r]);
  e.ip = r;
}
function Qh(e) {
  var t = e.ip, r = e.prog, n = e.stack, i = r[++t];
  exports.DEBUG && console.log(e.step, "NPUSHW[]", i);
  for (var a = 0; a < i; a++) {
    var o = r[++t] << 8 | r[++t];
    o & 32768 && (o = -((o ^ 65535) + 1)), n.push(o);
  }
  e.ip = t;
}
function ed(e) {
  var t = e.stack, r = e.store;
  r || (r = e.store = []);
  var n = t.pop(), i = t.pop();
  exports.DEBUG && console.log(e.step, "WS", n, i), r[i] = n;
}
function td(e) {
  var t = e.stack, r = e.store, n = t.pop();
  exports.DEBUG && console.log(e.step, "RS", n);
  var i = r && r[n] || 0;
  t.push(i);
}
function rd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "WCVTP", r, n), e.cvt[n] = r / 64;
}
function nd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "RCVT", r), t.push(e.cvt[r] * 64);
}
function _s(e, t) {
  var r = t.stack, n = r.pop(), i = t.z2[n];
  exports.DEBUG && console.log(t.step, "GC[" + e + "]", n), r.push(t.dpv.distance(i, Wr, e, false) * 64);
}
function As(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z1[n], o = t.z0[i], u = t.dpv.distance(o, a, e, e);
  exports.DEBUG && console.log(t.step, "MD[" + e + "]", n, i, "->", u), t.stack.push(Math.round(u * 64));
}
function id(e) {
  exports.DEBUG && console.log(e.step, "MPPEM[]"), e.stack.push(e.ppem);
}
function ad(e) {
  exports.DEBUG && console.log(e.step, "FLIPON[]"), e.autoFlip = true;
}
function od(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "LT[]", r, n), t.push(n < r ? 1 : 0);
}
function sd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "LTEQ[]", r, n), t.push(n <= r ? 1 : 0);
}
function ud(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "GT[]", r, n), t.push(n > r ? 1 : 0);
}
function ld(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "GTEQ[]", r, n), t.push(n >= r ? 1 : 0);
}
function fd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "EQ[]", r, n), t.push(r === n ? 1 : 0);
}
function cd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "NEQ[]", r, n), t.push(r !== n ? 1 : 0);
}
function pd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "ODD[]", r), t.push(Math.trunc(r) % 2 ? 1 : 0);
}
function hd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "EVEN[]", r), t.push(Math.trunc(r) % 2 ? 0 : 1);
}
function dd(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "IF[]", t), t || (iu(e, true), exports.DEBUG && console.log(e.step, "EIF[]"));
}
function vd(e) {
  exports.DEBUG && console.log(e.step, "EIF[]");
}
function gd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "AND[]", r, n), t.push(r && n ? 1 : 0);
}
function md(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "OR[]", r, n), t.push(r || n ? 1 : 0);
}
function Dd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "NOT[]", r), t.push(r ? 0 : 1);
}
function Ji(e, t) {
  var r = t.stack, n = r.pop(), i = t.fv, a = t.pv, o = t.ppem, u = t.deltaBase + (e - 1) * 16, s = t.deltaShift, l = t.z0;
  exports.DEBUG && console.log(t.step, "DELTAP[" + e + "]", n, r);
  for (var f = 0; f < n; f++) {
    var c = r.pop(), p2 = r.pop(), d = u + ((p2 & 240) >> 4);
    if (d === o) {
      var D = (p2 & 15) - 8;
      D >= 0 && D++, exports.DEBUG && console.log(t.step, "DELTAPFIX", c, "by", D * s);
      var v = l[c];
      i.setRelative(v, v, D * s, a);
    }
  }
}
function yd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "SDB[]", r), e.deltaBase = r;
}
function bd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "SDS[]", r), e.deltaShift = Math.pow(0.5, r);
}
function xd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "ADD[]", r, n), t.push(n + r);
}
function wd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SUB[]", r, n), t.push(n - r);
}
function Ed(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "DIV[]", r, n), t.push(n * 64 / r);
}
function Fd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "MUL[]", r, n), t.push(n * r / 64);
}
function Cd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "ABS[]", r), t.push(Math.abs(r));
}
function Sd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "NEG[]", r), t.push(-r);
}
function kd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "FLOOR[]", r), t.push(Math.floor(r / 64) * 64);
}
function Td(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "CEILING[]", r), t.push(Math.ceil(r / 64) * 64);
}
function Cn(e, t) {
  var r = t.stack, n = r.pop();
  exports.DEBUG && console.log(t.step, "ROUND[]"), r.push(t.round(n / 64) * 64);
}
function _d(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "WCVTF[]", r, n), e.cvt[n] = r * e.ppem / e.font.unitsPerEm;
}
function Ki(e, t) {
  var r = t.stack, n = r.pop(), i = t.ppem, a = t.deltaBase + (e - 1) * 16, o = t.deltaShift;
  exports.DEBUG && console.log(t.step, "DELTAC[" + e + "]", n, r);
  for (var u = 0; u < n; u++) {
    var s = r.pop(), l = r.pop(), f = a + ((l & 240) >> 4);
    if (f === i) {
      var c = (l & 15) - 8;
      c >= 0 && c++;
      var p2 = c * o;
      exports.DEBUG && console.log(t.step, "DELTACFIX", s, "by", p2), t.cvt[s] += p2;
    }
  }
}
function Ad(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SROUND[]", t), e.round = nu;
  var r;
  switch (t & 192) {
    case 0:
      r = 0.5;
      break;
    case 64:
      r = 1;
      break;
    case 128:
      r = 2;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  switch (e.srPeriod = r, t & 48) {
    case 0:
      e.srPhase = 0;
      break;
    case 16:
      e.srPhase = 0.25 * r;
      break;
    case 32:
      e.srPhase = 0.5 * r;
      break;
    case 48:
      e.srPhase = 0.75 * r;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  t &= 15, t === 0 ? e.srThreshold = 0 : e.srThreshold = (t / 8 - 0.5) * r;
}
function Od(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "S45ROUND[]", t), e.round = nu;
  var r;
  switch (t & 192) {
    case 0:
      r = Math.sqrt(2) / 2;
      break;
    case 64:
      r = Math.sqrt(2);
      break;
    case 128:
      r = 2 * Math.sqrt(2);
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  switch (e.srPeriod = r, t & 48) {
    case 0:
      e.srPhase = 0;
      break;
    case 16:
      e.srPhase = 0.25 * r;
      break;
    case 32:
      e.srPhase = 0.5 * r;
      break;
    case 48:
      e.srPhase = 0.75 * r;
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  t &= 15, t === 0 ? e.srThreshold = 0 : e.srThreshold = (t / 8 - 0.5) * r;
}
function Ld(e) {
  exports.DEBUG && console.log(e.step, "ROFF[]"), e.round = hh;
}
function Id(e) {
  exports.DEBUG && console.log(e.step, "RUTG[]"), e.round = gh;
}
function Pd(e) {
  exports.DEBUG && console.log(e.step, "RDTG[]"), e.round = mh;
}
function Rd(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SCANCTRL[]", t);
}
function Os(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z2[n], o = t.z1[i];
  exports.DEBUG && console.log(t.step, "SDPVTL[" + e + "]", n, i);
  var u, s;
  e ? (u = a.y - o.y, s = o.x - a.x) : (u = o.x - a.x, s = o.y - a.y), t.dpv = Hr(u, s);
}
function Ud(e) {
  var t = e.stack, r = t.pop(), n = 0;
  exports.DEBUG && console.log(e.step, "GETINFO[]", r), r & 1 && (n = 35), r & 32 && (n |= 4096), t.push(n);
}
function Bd(e) {
  var t = e.stack, r = t.pop(), n = t.pop(), i = t.pop();
  exports.DEBUG && console.log(e.step, "ROLL[]"), t.push(n), t.push(r), t.push(i);
}
function Nd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "MAX[]", r, n), t.push(Math.max(n, r));
}
function Md(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "MIN[]", r, n), t.push(Math.min(n, r));
}
function Gd(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SCANTYPE[]", t);
}
function Wd(e) {
  var t = e.stack.pop(), r = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "INSTCTRL[]", t, r), t) {
    case 1:
      e.inhibitGridFit = !!r;
      return;
    case 2:
      e.ignoreCvt = !!r;
      return;
    default:
      throw new Error("invalid INSTCTRL[] selector");
  }
}
function ir(e, t) {
  var r = t.stack, n = t.prog, i = t.ip;
  exports.DEBUG && console.log(t.step, "PUSHB[" + e + "]");
  for (var a = 0; a < e; a++)
    r.push(n[++i]);
  t.ip = i;
}
function ar(e, t) {
  var r = t.ip, n = t.prog, i = t.stack;
  exports.DEBUG && console.log(t.ip, "PUSHW[" + e + "]");
  for (var a = 0; a < e; a++) {
    var o = n[++r] << 8 | n[++r];
    o & 32768 && (o = -((o ^ 65535) + 1)), i.push(o);
  }
  t.ip = r;
}
function oe(e, t, r, n, i, a) {
  var o = a.stack, u = e && o.pop(), s = o.pop(), l = a.rp0, f = a.z0[l], c = a.z1[s], p2 = a.minDis, d = a.fv, D = a.dpv, v, g, y, b;
  g = v = D.distance(c, f, true, true), y = g >= 0 ? 1 : -1, g = Math.abs(g), e && (b = a.cvt[u], n && Math.abs(g - b) < a.cvCutIn && (g = b)), r && g < p2 && (g = p2), n && (g = a.round(g)), d.setRelative(c, f, y * g, D), d.touch(c), exports.DEBUG && console.log(a.step, (e ? "MIRP[" : "MDRP[") + (t ? "M" : "m") + (r ? ">" : "_") + (n ? "R" : "_") + (i === 0 ? "Gr" : i === 1 ? "Bl" : i === 2 ? "Wh" : "") + "]", e ? u + "(" + a.cvt[u] + "," + b + ")" : "", s, "(d =", v, "->", y * g, ")"), a.rp1 = a.rp0, a.rp2 = s, t && (a.rp0 = s);
}
Qs = [ms.bind(void 0, Yt), ms.bind(void 0, Wt), Ds.bind(void 0, Yt), Ds.bind(void 0, Wt), ys.bind(void 0, Yt), ys.bind(void 0, Wt), bs.bind(void 0, 0), bs.bind(void 0, 1), xs.bind(void 0, 0), xs.bind(void 0, 1), yh, bh, xh, wh, Eh, Fh, Ch, Sh, kh, Th, _h, Ah, Oh, Lh, Ih, Ph, Rh, Uh, Bh, Nh, void 0, void 0, Mh, Zi, Gh, Wh, $h, Vh, Hh, void 0, void 0, void 0, jh, zh, Xh, void 0, ws.bind(void 0, 0), ws.bind(void 0, 1), Es.bind(void 0, Yt), Es.bind(void 0, Wt), Fs.bind(void 0, 0), Fs.bind(void 0, 1), Cs.bind(void 0, 0), Cs.bind(void 0, 1), Ss.bind(void 0, 0), Ss.bind(void 0, 1), qh, Yh, ks.bind(void 0, 0), ks.bind(void 0, 1), Zh, Jh, Ts.bind(void 0, 0), Ts.bind(void 0, 1), Kh, Qh, ed, td, rd, nd, _s.bind(void 0, 0), _s.bind(void 0, 1), void 0, As.bind(void 0, 0), As.bind(void 0, 1), id, void 0, ad, void 0, void 0, od, sd, ud, ld, fd, cd, pd, hd, dd, vd, gd, md, Dd, Ji.bind(void 0, 1), yd, bd, xd, wd, Ed, Fd, Cd, Sd, kd, Td, Cn.bind(void 0, 0), Cn.bind(void 0, 1), Cn.bind(void 0, 2), Cn.bind(void 0, 3), void 0, void 0, void 0, void 0, _d, Ji.bind(void 0, 2), Ji.bind(void 0, 3), Ki.bind(void 0, 1), Ki.bind(void 0, 2), Ki.bind(void 0, 3), Ad, Od, void 0, void 0, Ld, void 0, Id, Pd, Zi, Zi, void 0, void 0, void 0, void 0, void 0, Rd, Os.bind(void 0, 0), Os.bind(void 0, 1), Ud, void 0, Bd, Nd, Md, Gd, Wd, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, ir.bind(void 0, 1), ir.bind(void 0, 2), ir.bind(void 0, 3), ir.bind(void 0, 4), ir.bind(void 0, 5), ir.bind(void 0, 6), ir.bind(void 0, 7), ir.bind(void 0, 8), ar.bind(void 0, 1), ar.bind(void 0, 2), ar.bind(void 0, 3), ar.bind(void 0, 4), ar.bind(void 0, 5), ar.bind(void 0, 6), ar.bind(void 0, 7), ar.bind(void 0, 8), oe.bind(void 0, 0, 0, 0, 0, 0), oe.bind(void 0, 0, 0, 0, 0, 1), oe.bind(void 0, 0, 0, 0, 0, 2), oe.bind(void 0, 0, 0, 0, 0, 3), oe.bind(void 0, 0, 0, 0, 1, 0), oe.bind(void 0, 0, 0, 0, 1, 1), oe.bind(void 0, 0, 0, 0, 1, 2), oe.bind(void 0, 0, 0, 0, 1, 3), oe.bind(void 0, 0, 0, 1, 0, 0), oe.bind(void 0, 0, 0, 1, 0, 1), oe.bind(void 0, 0, 0, 1, 0, 2), oe.bind(void 0, 0, 0, 1, 0, 3), oe.bind(void 0, 0, 0, 1, 1, 0), oe.bind(void 0, 0, 0, 1, 1, 1), oe.bind(void 0, 0, 0, 1, 1, 2), oe.bind(void 0, 0, 0, 1, 1, 3), oe.bind(void 0, 0, 1, 0, 0, 0), oe.bind(void 0, 0, 1, 0, 0, 1), oe.bind(void 0, 0, 1, 0, 0, 2), oe.bind(void 0, 0, 1, 0, 0, 3), oe.bind(void 0, 0, 1, 0, 1, 0), oe.bind(void 0, 0, 1, 0, 1, 1), oe.bind(void 0, 0, 1, 0, 1, 2), oe.bind(void 0, 0, 1, 0, 1, 3), oe.bind(void 0, 0, 1, 1, 0, 0), oe.bind(void 0, 0, 1, 1, 0, 1), oe.bind(void 0, 0, 1, 1, 0, 2), oe.bind(void 0, 0, 1, 1, 0, 3), oe.bind(void 0, 0, 1, 1, 1, 0), oe.bind(void 0, 0, 1, 1, 1, 1), oe.bind(void 0, 0, 1, 1, 1, 2), oe.bind(void 0, 0, 1, 1, 1, 3), oe.bind(void 0, 1, 0, 0, 0, 0), oe.bind(void 0, 1, 0, 0, 0, 1), oe.bind(void 0, 1, 0, 0, 0, 2), oe.bind(void 0, 1, 0, 0, 0, 3), oe.bind(void 0, 1, 0, 0, 1, 0), oe.bind(void 0, 1, 0, 0, 1, 1), oe.bind(void 0, 1, 0, 0, 1, 2), oe.bind(void 0, 1, 0, 0, 1, 3), oe.bind(void 0, 1, 0, 1, 0, 0), oe.bind(void 0, 1, 0, 1, 0, 1), oe.bind(void 0, 1, 0, 1, 0, 2), oe.bind(void 0, 1, 0, 1, 0, 3), oe.bind(void 0, 1, 0, 1, 1, 0), oe.bind(void 0, 1, 0, 1, 1, 1), oe.bind(void 0, 1, 0, 1, 1, 2), oe.bind(void 0, 1, 0, 1, 1, 3), oe.bind(void 0, 1, 1, 0, 0, 0), oe.bind(void 0, 1, 1, 0, 0, 1), oe.bind(void 0, 1, 1, 0, 0, 2), oe.bind(void 0, 1, 1, 0, 0, 3), oe.bind(void 0, 1, 1, 0, 1, 0), oe.bind(void 0, 1, 1, 0, 1, 1), oe.bind(void 0, 1, 1, 0, 1, 2), oe.bind(void 0, 1, 1, 0, 1, 3), oe.bind(void 0, 1, 1, 1, 0, 0), oe.bind(void 0, 1, 1, 1, 0, 1), oe.bind(void 0, 1, 1, 1, 0, 2), oe.bind(void 0, 1, 1, 1, 0, 3), oe.bind(void 0, 1, 1, 1, 1, 0), oe.bind(void 0, 1, 1, 1, 1, 1), oe.bind(void 0, 1, 1, 1, 1, 2), oe.bind(void 0, 1, 1, 1, 1, 3)];
function Ar(e) {
  this.char = e, this.state = {}, this.activeState = null;
}
function sa(e, t, r) {
  this.contextName = r, this.startIndex = e, this.endOffset = t;
}
function $d(e, t, r) {
  this.contextName = e, this.openRange = null, this.ranges = [], this.checkStart = t, this.checkEnd = r;
}
function Tt(e, t) {
  this.context = e, this.index = t, this.length = e.length, this.current = e[t], this.backtrack = e.slice(0, t), this.lookahead = e.slice(t + 1);
}
function An(e) {
  this.eventId = e, this.subscribers = [];
}
function jd(e) {
  var t = this, r = ["start", "end", "next", "newToken", "contextStart", "contextEnd", "insertToken", "removeToken", "removeRange", "replaceToken", "replaceRange", "composeRUD", "updateContextsRanges"];
  r.forEach(function(i) {
    Object.defineProperty(t.events, i, { value: new An(i) });
  }), e && r.forEach(function(i) {
    var a = e[i];
    typeof a == "function" && t.events[i].subscribe(a);
  });
  var n = ["insertToken", "removeToken", "removeRange", "replaceToken", "replaceRange", "composeRUD"];
  n.forEach(function(i) {
    t.events[i].subscribe(t.updateContextsRanges);
  });
}
function Me(e) {
  this.tokens = [], this.registeredContexts = {}, this.contextCheckers = [], this.events = {}, this.registeredModifiers = [], jd.call(this, e);
}
Ar.prototype.setState = function(e, t) {
  return this.state[e] = t, this.activeState = { key: e, value: this.state[e] }, this.activeState;
};
Ar.prototype.getState = function(e) {
  return this.state[e] || null;
};
Me.prototype.inboundIndex = function(e) {
  return e >= 0 && e < this.tokens.length;
};
Me.prototype.composeRUD = function(e) {
  var t = this, r = true, n = e.map(function(a) {
    return t[a[0]].apply(t, a.slice(1).concat(r));
  }), i = function(a) {
    return typeof a == "object" && a.hasOwnProperty("FAIL");
  };
  if (n.every(i))
    return { FAIL: "composeRUD: one or more operations hasn't completed successfully", report: n.filter(i) };
  this.dispatch("composeRUD", [n.filter(function(a) {
    return !i(a);
  })]);
};
Me.prototype.replaceRange = function(e, t, r, n) {
  t = t !== null ? t : this.tokens.length;
  var i = r.every(function(o) {
    return o instanceof Ar;
  });
  if (!isNaN(e) && this.inboundIndex(e) && i) {
    var a = this.tokens.splice.apply(this.tokens, [e, t].concat(r));
    return n || this.dispatch("replaceToken", [e, t, r]), [a, r];
  } else
    return { FAIL: "replaceRange: invalid tokens or startIndex." };
};
Me.prototype.replaceToken = function(e, t, r) {
  if (!isNaN(e) && this.inboundIndex(e) && t instanceof Ar) {
    var n = this.tokens.splice(e, 1, t);
    return r || this.dispatch("replaceToken", [e, t]), [n[0], t];
  } else
    return { FAIL: "replaceToken: invalid token or index." };
};
Me.prototype.removeRange = function(e, t, r) {
  t = isNaN(t) ? this.tokens.length : t;
  var n = this.tokens.splice(e, t);
  return r || this.dispatch("removeRange", [n, e, t]), n;
};
Me.prototype.removeToken = function(e, t) {
  if (!isNaN(e) && this.inboundIndex(e)) {
    var r = this.tokens.splice(e, 1);
    return t || this.dispatch("removeToken", [r, e]), r;
  } else
    return { FAIL: "removeToken: invalid token index." };
};
Me.prototype.insertToken = function(e, t, r) {
  var n = e.every(function(i) {
    return i instanceof Ar;
  });
  return n ? (this.tokens.splice.apply(this.tokens, [t, 0].concat(e)), r || this.dispatch("insertToken", [e, t]), e) : { FAIL: "insertToken: invalid token(s)." };
};
Me.prototype.registerModifier = function(e, t, r) {
  this.events.newToken.subscribe(function(n, i) {
    var a = [n, i], o = t === null || t.apply(this, a) === true, u = [n, i];
    if (o) {
      var s = r.apply(this, u);
      n.setState(e, s);
    }
  }), this.registeredModifiers.push(e);
};
An.prototype.subscribe = function(e) {
  return typeof e == "function" ? this.subscribers.push(e) - 1 : { FAIL: "invalid '" + this.eventId + "' event handler" };
};
An.prototype.unsubscribe = function(e) {
  this.subscribers.splice(e, 1);
};
Tt.prototype.setCurrentIndex = function(e) {
  this.index = e, this.current = this.context[e], this.backtrack = this.context.slice(0, e), this.lookahead = this.context.slice(e + 1);
};
Tt.prototype.get = function(e) {
  switch (true) {
    case e === 0:
      return this.current;
    case (e < 0 && Math.abs(e) <= this.backtrack.length):
      return this.backtrack.slice(e)[0];
    case (e > 0 && e <= this.lookahead.length):
      return this.lookahead[e - 1];
    default:
      return null;
  }
};
Me.prototype.rangeToText = function(e) {
  if (e instanceof sa)
    return this.getRangeTokens(e).map(function(t) {
      return t.char;
    }).join("");
};
Me.prototype.getText = function() {
  return this.tokens.map(function(e) {
    return e.char;
  }).join("");
};
Me.prototype.getContext = function(e) {
  var t = this.registeredContexts[e];
  return t || null;
};
Me.prototype.on = function(e, t) {
  var r = this.events[e];
  return r ? r.subscribe(t) : null;
};
Me.prototype.dispatch = function(e, t) {
  var r = this, n = this.events[e];
  n instanceof An && n.subscribers.forEach(function(i) {
    i.apply(r, t || []);
  });
};
Me.prototype.registerContextChecker = function(e, t, r) {
  if (this.getContext(e))
    return { FAIL: "context name '" + e + "' is already registered." };
  if (typeof t != "function")
    return { FAIL: "missing context start check." };
  if (typeof r != "function")
    return { FAIL: "missing context end check." };
  var n = new $d(e, t, r);
  return this.registeredContexts[e] = n, this.contextCheckers.push(n), n;
};
Me.prototype.getRangeTokens = function(e) {
  var t = e.startIndex + e.endOffset;
  return [].concat(this.tokens.slice(e.startIndex, t));
};
Me.prototype.getContextRanges = function(e) {
  var t = this.getContext(e);
  return t ? t.ranges : { FAIL: "context checker '" + e + "' is not registered." };
};
Me.prototype.resetContextsRanges = function() {
  var e = this.registeredContexts;
  for (var t in e)
    if (e.hasOwnProperty(t)) {
      var r = e[t];
      r.ranges = [];
    }
};
Me.prototype.updateContextsRanges = function() {
  this.resetContextsRanges();
  for (var e = this.tokens.map(function(n) {
    return n.char;
  }), t = 0; t < e.length; t++) {
    var r = new Tt(e, t);
    this.runContextCheck(r);
  }
  this.dispatch("updateContextsRanges", [this.registeredContexts]);
};
Me.prototype.setEndOffset = function(e, t) {
  var r = this.getContext(t).openRange.startIndex, n = new sa(r, e, t), i = this.getContext(t).ranges;
  return n.rangeId = t + "." + i.length, i.push(n), this.getContext(t).openRange = null, n;
};
Me.prototype.runContextCheck = function(e) {
  var t = this, r = e.index;
  this.contextCheckers.forEach(function(n) {
    var i = n.contextName, a = t.getContext(i).openRange;
    if (!a && n.checkStart(e) && (a = new sa(r, null, i), t.getContext(i).openRange = a, t.dispatch("contextStart", [i, r])), a && n.checkEnd(e)) {
      var o = r - a.startIndex + 1, u = t.setEndOffset(o, i);
      t.dispatch("contextEnd", [i, u]);
    }
  });
};
Me.prototype.tokenize = function(e) {
  this.tokens = [], this.resetContextsRanges();
  var t = Array.from(e);
  this.dispatch("start");
  for (var r = 0; r < t.length; r++) {
    var n = t[r], i = new Tt(t, r);
    this.dispatch("next", [i]), this.runContextCheck(i);
    var a = new Ar(n);
    this.tokens.push(a), this.dispatch("newToken", [a, i]);
  }
  return this.dispatch("end", [this.tokens]), this.tokens;
};
function lr(e) {
  return /[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(e);
}
function au(e) {
  return /[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(e);
}
function fr(e) {
  return /[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(e);
}
function Sn(e) {
  return /[A-z]/.test(e);
}
function zd(e) {
  return /\s/.test(e);
}
function mt(e) {
  this.font = e, this.features = {};
}
function gr(e) {
  this.id = e.id, this.tag = e.tag, this.substitution = e.substitution;
}
function Xr(e, t) {
  if (!e)
    return -1;
  switch (t.format) {
    case 1:
      return t.glyphs.indexOf(e);
    case 2:
      for (var r = t.ranges, n = 0; n < r.length; n++) {
        var i = r[n];
        if (e >= i.start && e <= i.end) {
          var a = e - i.start;
          return i.index + a;
        }
      }
      break;
    default:
      return -1;
  }
  return -1;
}
function Vd(e, t) {
  var r = Xr(e, t.coverage);
  return r === -1 ? null : e + t.deltaGlyphId;
}
function Hd(e, t) {
  var r = Xr(e, t.coverage);
  return r === -1 ? null : t.substitute[r];
}
function Qi(e, t) {
  for (var r = [], n = 0; n < e.length; n++) {
    var i = e[n], a = t.current;
    a = Array.isArray(a) ? a[0] : a;
    var o = Xr(a, i);
    o !== -1 && r.push(o);
  }
  return r.length !== e.length ? -1 : r;
}
function Xd(e, t) {
  var r = t.inputCoverage.length + t.lookaheadCoverage.length + t.backtrackCoverage.length;
  if (e.context.length < r)
    return [];
  var n = Qi(t.inputCoverage, e);
  if (n === -1)
    return [];
  var i = t.inputCoverage.length - 1;
  if (e.lookahead.length < t.lookaheadCoverage.length)
    return [];
  for (var a = e.lookahead.slice(i); a.length && fr(a[0].char); )
    a.shift();
  var o = new Tt(a, 0), u = Qi(t.lookaheadCoverage, o), s = [].concat(e.backtrack);
  for (s.reverse(); s.length && fr(s[0].char); )
    s.shift();
  if (s.length < t.backtrackCoverage.length)
    return [];
  var l = new Tt(s, 0), f = Qi(t.backtrackCoverage, l), c = n.length === t.inputCoverage.length && u.length === t.lookaheadCoverage.length && f.length === t.backtrackCoverage.length, p2 = [];
  if (c)
    for (var d = 0; d < t.lookupRecords.length; d++)
      for (var D = t.lookupRecords[d], v = D.lookupListIndex, g = this.getLookupByIndex(v), y = 0; y < g.subtables.length; y++) {
        var b = g.subtables[y], C = this.getLookupMethod(g, b), k = this.getSubstitutionType(g, b);
        if (k === "12")
          for (var S = 0; S < n.length; S++) {
            var E = e.get(S), L = C(E);
            L && p2.push(L);
          }
      }
  return p2;
}
function qd(e, t) {
  var r = e.current, n = Xr(r, t.coverage);
  if (n === -1)
    return null;
  for (var i, a = t.ligatureSets[n], o = 0; o < a.length; o++) {
    i = a[o];
    for (var u = 0; u < i.components.length; u++) {
      var s = e.lookahead[u], l = i.components[u];
      if (s !== l)
        break;
      if (u === i.components.length - 1)
        return i;
    }
  }
  return null;
}
function Yd(e, t) {
  var r = Xr(e, t.coverage);
  return r === -1 ? null : t.sequences[r];
}
mt.prototype.getDefaultScriptFeaturesIndexes = function() {
  for (var e = this.font.tables.gsub.scripts, t = 0; t < e.length; t++) {
    var r = e[t];
    if (r.tag === "DFLT")
      return r.script.defaultLangSys.featureIndexes;
  }
  return [];
};
mt.prototype.getScriptFeaturesIndexes = function(e) {
  var t = this.font.tables;
  if (!t.gsub)
    return [];
  if (!e)
    return this.getDefaultScriptFeaturesIndexes();
  for (var r = this.font.tables.gsub.scripts, n = 0; n < r.length; n++) {
    var i = r[n];
    if (i.tag === e && i.script.defaultLangSys)
      return i.script.defaultLangSys.featureIndexes;
    var a = i.langSysRecords;
    if (a)
      for (var o = 0; o < a.length; o++) {
        var u = a[o];
        if (u.tag === e) {
          var s = u.langSys;
          return s.featureIndexes;
        }
      }
  }
  return this.getDefaultScriptFeaturesIndexes();
};
mt.prototype.mapTagsToFeatures = function(e, t) {
  for (var r = {}, n = 0; n < e.length; n++) {
    var i = e[n].tag, a = e[n].feature;
    r[i] = a;
  }
  this.features[t].tags = r;
};
mt.prototype.getScriptFeatures = function(e) {
  var t = this.features[e];
  if (this.features.hasOwnProperty(e))
    return t;
  var r = this.getScriptFeaturesIndexes(e);
  if (!r)
    return null;
  var n = this.font.tables.gsub;
  return t = r.map(function(i) {
    return n.features[i];
  }), this.features[e] = t, this.mapTagsToFeatures(t, e), t;
};
mt.prototype.getSubstitutionType = function(e, t) {
  var r = e.lookupType.toString(), n = t.substFormat.toString();
  return r + n;
};
mt.prototype.getLookupMethod = function(e, t) {
  var r = this, n = this.getSubstitutionType(e, t);
  switch (n) {
    case "11":
      return function(i) {
        return Vd.apply(r, [i, t]);
      };
    case "12":
      return function(i) {
        return Hd.apply(r, [i, t]);
      };
    case "63":
      return function(i) {
        return Xd.apply(r, [i, t]);
      };
    case "41":
      return function(i) {
        return qd.apply(r, [i, t]);
      };
    case "21":
      return function(i) {
        return Yd.apply(r, [i, t]);
      };
    default:
      throw new Error("lookupType: " + e.lookupType + " - substFormat: " + t.substFormat + " is not yet supported");
  }
};
mt.prototype.lookupFeature = function(e) {
  var t = e.contextParams, r = t.index, n = this.getFeature({ tag: e.tag, script: e.script });
  if (!n)
    return new Error("font '" + this.font.names.fullName.en + "' doesn't support feature '" + e.tag + "' for script '" + e.script + "'.");
  for (var i = this.getFeatureLookups(n), a = [].concat(t.context), o = 0; o < i.length; o++)
    for (var u = i[o], s = this.getLookupSubtables(u), l = 0; l < s.length; l++) {
      var f = s[l], c = this.getSubstitutionType(u, f), p2 = this.getLookupMethod(u, f), d = void 0;
      switch (c) {
        case "11":
          d = p2(t.current), d && a.splice(r, 1, new gr({ id: 11, tag: e.tag, substitution: d }));
          break;
        case "12":
          d = p2(t.current), d && a.splice(r, 1, new gr({ id: 12, tag: e.tag, substitution: d }));
          break;
        case "63":
          d = p2(t), Array.isArray(d) && d.length && a.splice(r, 1, new gr({ id: 63, tag: e.tag, substitution: d }));
          break;
        case "41":
          d = p2(t), d && a.splice(r, 1, new gr({ id: 41, tag: e.tag, substitution: d }));
          break;
        case "21":
          d = p2(t.current), d && a.splice(r, 1, new gr({ id: 21, tag: e.tag, substitution: d }));
          break;
      }
      t = new Tt(a, r), !(Array.isArray(d) && !d.length) && (d = null);
    }
  return a.length ? a : null;
};
mt.prototype.supports = function(e) {
  if (!e.script)
    return false;
  this.getScriptFeatures(e.script);
  var t = this.features.hasOwnProperty(e.script);
  if (!e.tag)
    return t;
  var r = this.features[e.script].some(function(n) {
    return n.tag === e.tag;
  });
  return t && r;
};
mt.prototype.getLookupSubtables = function(e) {
  return e.subtables || null;
};
mt.prototype.getLookupByIndex = function(e) {
  var t = this.font.tables.gsub.lookups;
  return t[e] || null;
};
mt.prototype.getFeatureLookups = function(e) {
  return e.lookupListIndexes.map(this.getLookupByIndex.bind(this));
};
mt.prototype.getFeature = function(t) {
  if (!this.font)
    return { FAIL: "No font was found" };
  this.features.hasOwnProperty(t.script) || this.getScriptFeatures(t.script);
  var r = this.features[t.script];
  return r ? r.tags[t.tag] ? this.features[t.script].tags[t.tag] : null : { FAIL: "No feature for script " + t.script };
};
function Zd(e) {
  var t = e.current, r = e.get(-1);
  return r === null && lr(t) || !lr(r) && lr(t);
}
function Jd(e) {
  var t = e.get(1);
  return t === null || !lr(t);
}
var Kd = { startCheck: Zd, endCheck: Jd };
function Qd(e) {
  var t = e.current, r = e.get(-1);
  return (lr(t) || fr(t)) && !lr(r);
}
function e0(e) {
  var t = e.get(1);
  switch (true) {
    case t === null:
      return true;
    case (!lr(t) && !fr(t)):
      var r = zd(t);
      if (!r)
        return true;
      if (r) {
        var n = false;
        if (n = e.lookahead.some(function(i) {
          return lr(i) || fr(i);
        }), !n)
          return true;
      }
      break;
    default:
      return false;
  }
}
var t0 = { startCheck: Qd, endCheck: e0 };
function r0(e, t, r) {
  t[r].setState(e.tag, e.substitution);
}
function n0(e, t, r) {
  t[r].setState(e.tag, e.substitution);
}
function i0(e, t, r) {
  e.substitution.forEach(function(n, i) {
    var a = t[r + i];
    a.setState(e.tag, n);
  });
}
function a0(e, t, r) {
  var n = t[r];
  n.setState(e.tag, e.substitution.ligGlyph);
  for (var i = e.substitution.components.length, a = 0; a < i; a++)
    n = t[r + a + 1], n.setState("deleted", true);
}
var Ls = { 11: r0, 12: n0, 63: i0, 41: a0 };
function ua(e, t, r) {
  e instanceof gr && Ls[e.id] && Ls[e.id](e, t, r);
}
function o0(e) {
  for (var t = [].concat(e.backtrack), r = t.length - 1; r >= 0; r--) {
    var n = t[r], i = au(n), a = fr(n);
    if (!i && !a)
      return true;
    if (i)
      return false;
  }
  return false;
}
function s0(e) {
  if (au(e.current))
    return false;
  for (var t = 0; t < e.lookahead.length; t++) {
    var r = e.lookahead[t], n = fr(r);
    if (!n)
      return true;
  }
  return false;
}
function u0(e) {
  var t = this, r = "arab", n = this.featuresTags[r], i = this.tokenizer.getRangeTokens(e);
  if (i.length !== 1) {
    var a = new Tt(i.map(function(u) {
      return u.getState("glyphIndex");
    }), 0), o = new Tt(i.map(function(u) {
      return u.char;
    }), 0);
    i.forEach(function(u, s) {
      if (!fr(u.char)) {
        a.setCurrentIndex(s), o.setCurrentIndex(s);
        var l = 0;
        o0(o) && (l |= 1), s0(o) && (l |= 2);
        var f;
        switch (l) {
          case 1:
            f = "fina";
            break;
          case 2:
            f = "init";
            break;
          case 3:
            f = "medi";
            break;
        }
        if (n.indexOf(f) !== -1) {
          var c = t.query.lookupFeature({ tag: f, script: r, contextParams: a });
          if (c instanceof Error)
            return console.info(c.message);
          c.forEach(function(p2, d) {
            p2 instanceof gr && (ua(p2, i, d), a.context[d] = p2.substitution);
          });
        }
      }
    });
  }
}
function Is(e, t) {
  var r = e.map(function(n) {
    return n.activeState.value;
  });
  return new Tt(r, t || 0);
}
function l0(e) {
  var t = this, r = "arab", n = this.tokenizer.getRangeTokens(e), i = Is(n);
  i.context.forEach(function(a, o) {
    i.setCurrentIndex(o);
    var u = t.query.lookupFeature({ tag: "rlig", script: r, contextParams: i });
    u.length && (u.forEach(function(s) {
      return ua(s, n, o);
    }), i = Is(n));
  });
}
function f0(e) {
  var t = e.current, r = e.get(-1);
  return r === null && Sn(t) || !Sn(r) && Sn(t);
}
function c0(e) {
  var t = e.get(1);
  return t === null || !Sn(t);
}
var p0 = { startCheck: f0, endCheck: c0 };
function Ps(e, t) {
  var r = e.map(function(n) {
    return n.activeState.value;
  });
  return new Tt(r, t || 0);
}
function h0(e) {
  var t = this, r = "latn", n = this.tokenizer.getRangeTokens(e), i = Ps(n);
  i.context.forEach(function(a, o) {
    i.setCurrentIndex(o);
    var u = t.query.lookupFeature({ tag: "liga", script: r, contextParams: i });
    u.length && (u.forEach(function(s) {
      return ua(s, n, o);
    }), i = Ps(n));
  });
}
function Ot(e) {
  this.baseDir = e || "ltr", this.tokenizer = new Me(), this.featuresTags = {};
}
Ot.prototype.setText = function(e) {
  this.text = e;
};
Ot.prototype.contextChecks = { latinWordCheck: p0, arabicWordCheck: Kd, arabicSentenceCheck: t0 };
function ea(e) {
  var t = this.contextChecks[e + "Check"];
  return this.tokenizer.registerContextChecker(e, t.startCheck, t.endCheck);
}
function d0() {
  return ea.call(this, "latinWord"), ea.call(this, "arabicWord"), ea.call(this, "arabicSentence"), this.tokenizer.tokenize(this.text);
}
function v0() {
  var e = this, t = this.tokenizer.getContextRanges("arabicSentence");
  t.forEach(function(r) {
    var n = e.tokenizer.getRangeTokens(r);
    e.tokenizer.replaceRange(r.startIndex, r.endOffset, n.reverse());
  });
}
Ot.prototype.registerFeatures = function(e, t) {
  var r = this, n = t.filter(function(i) {
    return r.query.supports({ script: e, tag: i });
  });
  this.featuresTags.hasOwnProperty(e) ? this.featuresTags[e] = this.featuresTags[e].concat(n) : this.featuresTags[e] = n;
};
Ot.prototype.applyFeatures = function(e, t) {
  if (!e)
    throw new Error("No valid font was provided to apply features");
  this.query || (this.query = new mt(e));
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    this.query.supports({ script: n.script }) && this.registerFeatures(n.script, n.tags);
  }
};
Ot.prototype.registerModifier = function(e, t, r) {
  this.tokenizer.registerModifier(e, t, r);
};
function la() {
  if (this.tokenizer.registeredModifiers.indexOf("glyphIndex") === -1)
    throw new Error("glyphIndex modifier is required to apply arabic presentation features.");
}
function g0() {
  var e = this, t = "arab";
  if (this.featuresTags.hasOwnProperty(t)) {
    la.call(this);
    var r = this.tokenizer.getContextRanges("arabicWord");
    r.forEach(function(n) {
      u0.call(e, n);
    });
  }
}
function m0() {
  var e = this, t = "arab";
  if (this.featuresTags.hasOwnProperty(t)) {
    var r = this.featuresTags[t];
    if (r.indexOf("rlig") !== -1) {
      la.call(this);
      var n = this.tokenizer.getContextRanges("arabicWord");
      n.forEach(function(i) {
        l0.call(e, i);
      });
    }
  }
}
function D0() {
  var e = this, t = "latn";
  if (this.featuresTags.hasOwnProperty(t)) {
    var r = this.featuresTags[t];
    if (r.indexOf("liga") !== -1) {
      la.call(this);
      var n = this.tokenizer.getContextRanges("latinWord");
      n.forEach(function(i) {
        h0.call(e, i);
      });
    }
  }
}
Ot.prototype.checkContextReady = function(e) {
  return !!this.tokenizer.getContext(e);
};
Ot.prototype.applyFeaturesToContexts = function() {
  this.checkContextReady("arabicWord") && (g0.call(this), m0.call(this)), this.checkContextReady("latinWord") && D0.call(this), this.checkContextReady("arabicSentence") && v0.call(this);
};
Ot.prototype.processText = function(e) {
  (!this.text || this.text !== e) && (this.setText(e), d0.call(this), this.applyFeaturesToContexts());
};
Ot.prototype.getBidiText = function(e) {
  return this.processText(e), this.tokenizer.getText();
};
Ot.prototype.getTextGlyphs = function(e) {
  this.processText(e);
  for (var t = [], r = 0; r < this.tokenizer.tokens.length; r++) {
    var n = this.tokenizer.tokens[r];
    if (!n.state.deleted) {
      var i = n.activeState.value;
      t.push(Array.isArray(i) ? i[0] : i);
    }
  }
  return t;
};
function st(e) {
  e = e || {}, e.tables = e.tables || {}, e.empty || (Nr(e.familyName, "When creating a new Font object, familyName is required."), Nr(e.styleName, "When creating a new Font object, styleName is required."), Nr(e.unitsPerEm, "When creating a new Font object, unitsPerEm is required."), Nr(e.ascender, "When creating a new Font object, ascender is required."), Nr(e.descender <= 0, "When creating a new Font object, negative descender value is required."), this.unitsPerEm = e.unitsPerEm || 1e3, this.ascender = e.ascender, this.descender = e.descender, this.createdTimestamp = e.createdTimestamp, this.tables = Object.assign(e.tables, { os2: Object.assign({ usWeightClass: e.weightClass || this.usWeightClasses.MEDIUM, usWidthClass: e.widthClass || this.usWidthClasses.MEDIUM, fsSelection: e.fsSelection || this.fsSelectionValues.REGULAR }, e.tables.os2) })), this.supported = true, this.glyphs = new $t.GlyphSet(this, e.glyphs || []), this.encoding = new Vs(this), this.position = new zr(this), this.substitution = new gt(this), this.tables = this.tables || {}, this._push = null, this._hmtxTableData = {}, Object.defineProperty(this, "hinting", { get: function() {
    if (this._hinting)
      return this._hinting;
    if (this.outlinesFormat === "truetype")
      return this._hinting = new tu(this);
  } });
}
st.prototype.hasChar = function(e) {
  return this.encoding.charToGlyphIndex(e) !== null;
};
st.prototype.charToGlyphIndex = function(e) {
  return this.encoding.charToGlyphIndex(e);
};
st.prototype.charToGlyph = function(e) {
  var t = this.charToGlyphIndex(e), r = this.glyphs.get(t);
  return r || (r = this.glyphs.get(0)), r;
};
st.prototype.updateFeatures = function(e) {
  return this.defaultRenderOptions.features.map(function(t) {
    return t.script === "latn" ? { script: "latn", tags: t.tags.filter(function(r) {
      return e[r];
    }) } : t;
  });
};
st.prototype.stringToGlyphs = function(e, t) {
  var r = this, n = new Ot(), i = function(c) {
    return r.charToGlyphIndex(c.char);
  };
  n.registerModifier("glyphIndex", null, i);
  var a = t ? this.updateFeatures(t.features) : this.defaultRenderOptions.features;
  n.applyFeatures(this, a);
  for (var o = n.getTextGlyphs(e), u = o.length, s = new Array(u), l = this.glyphs.get(0), f = 0; f < u; f += 1)
    s[f] = this.glyphs.get(o[f]) || l;
  return s;
};
st.prototype.getKerningValue = function(e, t) {
  e = e.index || e, t = t.index || t;
  var r = this.position.defaultKerningTables;
  return r ? this.position.getKerningValue(r, e, t) : this.kerningPairs[e + "," + t] || 0;
};
st.prototype.defaultRenderOptions = { kerning: true, features: [{ script: "arab", tags: ["init", "medi", "fina", "rlig"] }, { script: "latn", tags: ["liga", "rlig"] }] };
st.prototype.forEachGlyph = function(e, t, r, n, i, a) {
  t = t !== void 0 ? t : 0, r = r !== void 0 ? r : 0, n = n !== void 0 ? n : 72, i = Object.assign({}, this.defaultRenderOptions, i);
  var o = 1 / this.unitsPerEm * n, u = this.stringToGlyphs(e, i), s;
  if (i.kerning) {
    var l = i.script || this.position.getDefaultScriptName();
    s = this.position.getKerningTables(l, i.language);
  }
  for (var f = 0; f < u.length; f += 1) {
    var c = u[f];
    if (a.call(this, c, t, r, n, i), c.advanceWidth && (t += c.advanceWidth * o), i.kerning && f < u.length - 1) {
      var p2 = s ? this.position.getKerningValue(s, c.index, u[f + 1].index) : this.getKerningValue(c, u[f + 1]);
      t += p2 * o;
    }
    i.letterSpacing ? t += i.letterSpacing * n : i.tracking && (t += i.tracking / 1e3 * n);
  }
  return t;
};
st.prototype.getPath = function(e, t, r, n, i) {
  var a = new ot();
  return this.forEachGlyph(e, t, r, n, i, function(o, u, s, l) {
    var f = o.getPath(u, s, l, i, this);
    a.extend(f);
  }), a;
};
st.prototype.getPaths = function(e, t, r, n, i) {
  var a = [];
  return this.forEachGlyph(e, t, r, n, i, function(o, u, s, l) {
    var f = o.getPath(u, s, l, i, this);
    a.push(f);
  }), a;
};
st.prototype.getAdvanceWidth = function(e, t, r) {
  return this.forEachGlyph(e, 0, 0, t, r, function() {
  });
};
st.prototype.fsSelectionValues = { ITALIC: 1, UNDERSCORE: 2, NEGATIVE: 4, OUTLINED: 8, STRIKEOUT: 16, BOLD: 32, REGULAR: 64, USER_TYPO_METRICS: 128, WWS: 256, OBLIQUE: 512 };
st.prototype.usWidthClasses = { ULTRA_CONDENSED: 1, EXTRA_CONDENSED: 2, CONDENSED: 3, SEMI_CONDENSED: 4, MEDIUM: 5, SEMI_EXPANDED: 6, EXPANDED: 7, EXTRA_EXPANDED: 8, ULTRA_EXPANDED: 9 };
st.prototype.usWeightClasses = { THIN: 100, EXTRA_LIGHT: 200, LIGHT: 300, NORMAL: 400, MEDIUM: 500, SEMI_BOLD: 600, BOLD: 700, EXTRA_BOLD: 800, BLACK: 900 };
function y0(e, t) {
  t.parseUShort(), e.length = t.parseULong(), e.language = t.parseULong();
  var r;
  e.groupCount = r = t.parseULong(), e.glyphIndexMap = {};
  for (var n = 0; n < r; n += 1)
    for (var i = t.parseULong(), a = t.parseULong(), o = t.parseULong(), u = i; u <= a; u += 1)
      e.glyphIndexMap[u] = o, o++;
}
function b0(e, t, r, n, i) {
  e.length = t.parseUShort(), e.language = t.parseUShort();
  var a;
  e.segCount = a = t.parseUShort() >> 1, t.skip("uShort", 3), e.glyphIndexMap = {};
  for (var o = new se.Parser(r, n + i + 14), u = new se.Parser(r, n + i + 16 + a * 2), s = new se.Parser(r, n + i + 16 + a * 4), l = new se.Parser(r, n + i + 16 + a * 6), f = n + i + 16 + a * 8, c = 0; c < a - 1; c += 1)
    for (var p2 = void 0, d = o.parseUShort(), D = u.parseUShort(), v = s.parseShort(), g = l.parseUShort(), y = D; y <= d; y += 1)
      g !== 0 ? (f = l.offset + l.relativeOffset - 2, f += g, f += (y - D) * 2, p2 = se.getUShort(r, f), p2 !== 0 && (p2 = p2 + v & 65535)) : p2 = y + v & 65535, e.glyphIndexMap[y] = p2;
}
function x0(e, t) {
  var r = {};
  r.version = se.getUShort(e, t), Te.argument(r.version === 0, "cmap table version should be 0."), r.numTables = se.getUShort(e, t + 2);
  for (var n = -1, i = r.numTables - 1; i >= 0; i -= 1) {
    var a = se.getUShort(e, t + 4 + i * 8), o = se.getUShort(e, t + 4 + i * 8 + 2);
    if (a === 3 && (o === 0 || o === 1 || o === 10) || a === 0 && (o === 0 || o === 1 || o === 2 || o === 3 || o === 4)) {
      n = se.getULong(e, t + 4 + i * 8 + 4);
      break;
    }
  }
  if (n === -1)
    throw new Error("No valid cmap sub-tables found.");
  var u = new se.Parser(e, t + n);
  if (r.format = u.parseUShort(), r.format === 12)
    y0(r, u);
  else if (r.format === 4)
    b0(r, u, e, t, n);
  else
    throw new Error("Only format 4 and 12 cmap tables are supported (found format " + r.format + ").");
  return r;
}
var w0 = { parse: x0 };
function na(e) {
  var t;
  return e.length < 1240 ? t = 107 : e.length < 33900 ? t = 1131 : t = 32768, t;
}
function sr(e, t, r) {
  var n = [], i = [], a = se.getCard16(e, t), o, u;
  if (a !== 0) {
    var s = se.getByte(e, t + 2);
    o = t + (a + 1) * s + 2;
    for (var l = t + 3, f = 0; f < a + 1; f += 1)
      n.push(se.getOffset(e, l, s)), l += s;
    u = o + n[a];
  } else
    u = t + 2;
  for (var c = 0; c < n.length - 1; c += 1) {
    var p2 = se.getBytes(e, o + n[c], o + n[c + 1]);
    r && (p2 = r(p2)), i.push(p2);
  }
  return { objects: i, startOffset: t, endOffset: u };
}
function E0(e, t) {
  var r = [], n = se.getCard16(e, t), i, a;
  if (n !== 0) {
    var o = se.getByte(e, t + 2);
    i = t + (n + 1) * o + 2;
    for (var u = t + 3, s = 0; s < n + 1; s += 1)
      r.push(se.getOffset(e, u, o)), u += o;
    a = i + r[n];
  } else
    a = t + 2;
  return { offsets: r, startOffset: t, endOffset: a };
}
function F0(e, t, r, n, i) {
  var a = se.getCard16(r, n), o = 0;
  if (a !== 0) {
    var u = se.getByte(r, n + 2);
    o = n + (a + 1) * u + 2;
  }
  var s = se.getBytes(r, o + t[e], o + t[e + 1]);
  return i && (s = i(s)), s;
}
function C0(e) {
  for (var t = "", r = 15, n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"]; ; ) {
    var i = e.parseByte(), a = i >> 4, o = i & 15;
    if (a === r || (t += n[a], o === r))
      break;
    t += n[o];
  }
  return parseFloat(t);
}
function S0(e, t) {
  var r, n, i, a;
  if (t === 28)
    return r = e.parseByte(), n = e.parseByte(), r << 8 | n;
  if (t === 29)
    return r = e.parseByte(), n = e.parseByte(), i = e.parseByte(), a = e.parseByte(), r << 24 | n << 16 | i << 8 | a;
  if (t === 30)
    return C0(e);
  if (t >= 32 && t <= 246)
    return t - 139;
  if (t >= 247 && t <= 250)
    return r = e.parseByte(), (t - 247) * 256 + r + 108;
  if (t >= 251 && t <= 254)
    return r = e.parseByte(), -(t - 251) * 256 - r - 108;
  throw new Error("Invalid b0 " + t);
}
function k0(e) {
  for (var t = {}, r = 0; r < e.length; r += 1) {
    var n = e[r][0], i = e[r][1], a = void 0;
    if (i.length === 1 ? a = i[0] : a = i, t.hasOwnProperty(n) && !isNaN(t[n]))
      throw new Error("Object " + t + " already has key " + n);
    t[n] = a;
  }
  return t;
}
function ou(e, t, r) {
  t = t !== void 0 ? t : 0;
  var n = new se.Parser(e, t), i = [], a = [];
  for (r = r !== void 0 ? r : e.length; n.relativeOffset < r; ) {
    var o = n.parseByte();
    o <= 21 ? (o === 12 && (o = 1200 + n.parseByte()), i.push([o, a]), a = []) : a.push(S0(n, o));
  }
  return k0(i);
}
function Gr(e, t) {
  return t <= 390 ? t = Hp[t] : t = e[t - 391], t;
}
function su(e, t, r) {
  for (var n = {}, i, a = 0; a < t.length; a += 1) {
    var o = t[a];
    if (Array.isArray(o.type)) {
      var u = [];
      u.length = o.type.length;
      for (var s = 0; s < o.type.length; s++)
        i = e[o.op] !== void 0 ? e[o.op][s] : void 0, i === void 0 && (i = o.value !== void 0 && o.value[s] !== void 0 ? o.value[s] : null), o.type[s] === "SID" && (i = Gr(r, i)), u[s] = i;
      n[o.name] = u;
    } else
      i = e[o.op], i === void 0 && (i = o.value !== void 0 ? o.value : null), o.type === "SID" && (i = Gr(r, i)), n[o.name] = i;
  }
  return n;
}
function T0(e, t) {
  var r = {};
  return r.formatMajor = se.getCard8(e, t), r.formatMinor = se.getCard8(e, t + 1), r.size = se.getCard8(e, t + 2), r.offsetSize = se.getCard8(e, t + 3), r.startOffset = t, r.endOffset = t + 4, r;
}
var _0 = [{ name: "version", op: 0, type: "SID" }, { name: "notice", op: 1, type: "SID" }, { name: "copyright", op: 1200, type: "SID" }, { name: "fullName", op: 2, type: "SID" }, { name: "familyName", op: 3, type: "SID" }, { name: "weight", op: 4, type: "SID" }, { name: "isFixedPitch", op: 1201, type: "number", value: 0 }, { name: "italicAngle", op: 1202, type: "number", value: 0 }, { name: "underlinePosition", op: 1203, type: "number", value: -100 }, { name: "underlineThickness", op: 1204, type: "number", value: 50 }, { name: "paintType", op: 1205, type: "number", value: 0 }, { name: "charstringType", op: 1206, type: "number", value: 2 }, { name: "fontMatrix", op: 1207, type: ["real", "real", "real", "real", "real", "real"], value: [1e-3, 0, 0, 1e-3, 0, 0] }, { name: "uniqueId", op: 13, type: "number" }, { name: "fontBBox", op: 5, type: ["number", "number", "number", "number"], value: [0, 0, 0, 0] }, { name: "strokeWidth", op: 1208, type: "number", value: 0 }, { name: "xuid", op: 14, type: [], value: null }, { name: "charset", op: 15, type: "offset", value: 0 }, { name: "encoding", op: 16, type: "offset", value: 0 }, { name: "charStrings", op: 17, type: "offset", value: 0 }, { name: "private", op: 18, type: ["number", "offset"], value: [0, 0] }, { name: "ros", op: 1230, type: ["SID", "SID", "number"] }, { name: "cidFontVersion", op: 1231, type: "number", value: 0 }, { name: "cidFontRevision", op: 1232, type: "number", value: 0 }, { name: "cidFontType", op: 1233, type: "number", value: 0 }, { name: "cidCount", op: 1234, type: "number", value: 8720 }, { name: "uidBase", op: 1235, type: "number" }, { name: "fdArray", op: 1236, type: "offset" }, { name: "fdSelect", op: 1237, type: "offset" }, { name: "fontName", op: 1238, type: "SID" }];
var A0 = [{ name: "subrs", op: 19, type: "offset", value: 0 }, { name: "defaultWidthX", op: 20, type: "number", value: 0 }, { name: "nominalWidthX", op: 21, type: "number", value: 0 }];
function O0(e, t) {
  var r = ou(e, 0, e.byteLength);
  return su(r, _0, t);
}
function uu(e, t, r, n) {
  var i = ou(e, t, r);
  return su(i, A0, n);
}
function Rs(e, t, r, n) {
  for (var i = [], a = 0; a < r.length; a += 1) {
    var o = new DataView(new Uint8Array(r[a]).buffer), u = O0(o, n);
    u._subrs = [], u._subrsBias = 0, u._defaultWidthX = 0, u._nominalWidthX = 0;
    var s = u.private[0], l = u.private[1];
    if (s !== 0 && l !== 0) {
      var f = uu(e, l + t, s, n);
      if (u._defaultWidthX = f.defaultWidthX, u._nominalWidthX = f.nominalWidthX, f.subrs !== 0) {
        var c = l + f.subrs, p2 = sr(e, c + t);
        u._subrs = p2.objects, u._subrsBias = na(u._subrs);
      }
      u._privateDict = f;
    }
    i.push(u);
  }
  return i;
}
function L0(e, t, r, n) {
  var i, a, o = new se.Parser(e, t);
  r -= 1;
  var u = [".notdef"], s = o.parseCard8();
  if (s === 0)
    for (var l = 0; l < r; l += 1)
      i = o.parseSID(), u.push(Gr(n, i));
  else if (s === 1)
    for (; u.length <= r; ) {
      i = o.parseSID(), a = o.parseCard8();
      for (var f = 0; f <= a; f += 1)
        u.push(Gr(n, i)), i += 1;
    }
  else if (s === 2)
    for (; u.length <= r; ) {
      i = o.parseSID(), a = o.parseCard16();
      for (var c = 0; c <= a; c += 1)
        u.push(Gr(n, i)), i += 1;
    }
  else
    throw new Error("Unknown charset format " + s);
  return u;
}
function I0(e, t, r) {
  var n, i = {}, a = new se.Parser(e, t), o = a.parseCard8();
  if (o === 0)
    for (var u = a.parseCard8(), s = 0; s < u; s += 1)
      n = a.parseCard8(), i[n] = s;
  else if (o === 1) {
    var l = a.parseCard8();
    n = 1;
    for (var f = 0; f < l; f += 1)
      for (var c = a.parseCard8(), p2 = a.parseCard8(), d = c; d <= c + p2; d += 1)
        i[d] = n, n += 1;
  } else
    throw new Error("Unknown encoding format " + o);
  return new kn(i, r);
}
function Us(e, t, r) {
  var n, i, a, o, u = new ot(), s = [], l = 0, f = false, c = false, p2 = 0, d = 0, D, v, g, y;
  if (e.isCIDFont) {
    var b = e.tables.cff.topDict._fdSelect[t.index], C = e.tables.cff.topDict._fdArray[b];
    D = C._subrs, v = C._subrsBias, g = C._defaultWidthX, y = C._nominalWidthX;
  } else
    D = e.tables.cff.topDict._subrs, v = e.tables.cff.topDict._subrsBias, g = e.tables.cff.topDict._defaultWidthX, y = e.tables.cff.topDict._nominalWidthX;
  var k = g;
  function S(T, U) {
    c && u.closePath(), u.moveTo(T, U), c = true;
  }
  function E() {
    var T;
    T = s.length % 2 !== 0, T && !f && (k = s.shift() + y), l += s.length >> 1, s.length = 0, f = true;
  }
  function L(T) {
    for (var U, M, H, q, ee, A, R, O, Y, Z, te, ie, B = 0; B < T.length; ) {
      var z = T[B];
      switch (B += 1, z) {
        case 1:
          E();
          break;
        case 3:
          E();
          break;
        case 4:
          s.length > 1 && !f && (k = s.shift() + y, f = true), d += s.pop(), S(p2, d);
          break;
        case 5:
          for (; s.length > 0; )
            p2 += s.shift(), d += s.shift(), u.lineTo(p2, d);
          break;
        case 6:
          for (; s.length > 0 && (p2 += s.shift(), u.lineTo(p2, d), s.length !== 0); )
            d += s.shift(), u.lineTo(p2, d);
          break;
        case 7:
          for (; s.length > 0 && (d += s.shift(), u.lineTo(p2, d), s.length !== 0); )
            p2 += s.shift(), u.lineTo(p2, d);
          break;
        case 8:
          for (; s.length > 0; )
            n = p2 + s.shift(), i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), p2 = a + s.shift(), d = o + s.shift(), u.curveTo(n, i, a, o, p2, d);
          break;
        case 10:
          ee = s.pop() + v, A = D[ee], A && L(A);
          break;
        case 11:
          return;
        case 12:
          switch (z = T[B], B += 1, z) {
            case 35:
              n = p2 + s.shift(), i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o + s.shift(), Y = R + s.shift(), Z = O + s.shift(), te = Y + s.shift(), ie = Z + s.shift(), p2 = te + s.shift(), d = ie + s.shift(), s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(Y, Z, te, ie, p2, d);
              break;
            case 34:
              n = p2 + s.shift(), i = d, a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o, Y = R + s.shift(), Z = o, te = Y + s.shift(), ie = d, p2 = te + s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(Y, Z, te, ie, p2, d);
              break;
            case 36:
              n = p2 + s.shift(), i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o, Y = R + s.shift(), Z = o, te = Y + s.shift(), ie = Z + s.shift(), p2 = te + s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(Y, Z, te, ie, p2, d);
              break;
            case 37:
              n = p2 + s.shift(), i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o + s.shift(), Y = R + s.shift(), Z = O + s.shift(), te = Y + s.shift(), ie = Z + s.shift(), Math.abs(te - p2) > Math.abs(ie - d) ? p2 = te + s.shift() : d = ie + s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(Y, Z, te, ie, p2, d);
              break;
            default:
              console.log("Glyph " + t.index + ": unknown operator 1200" + z), s.length = 0;
          }
          break;
        case 14:
          s.length > 0 && !f && (k = s.shift() + y, f = true), c && (u.closePath(), c = false);
          break;
        case 18:
          E();
          break;
        case 19:
        case 20:
          E(), B += l + 7 >> 3;
          break;
        case 21:
          s.length > 2 && !f && (k = s.shift() + y, f = true), d += s.pop(), p2 += s.pop(), S(p2, d);
          break;
        case 22:
          s.length > 1 && !f && (k = s.shift() + y, f = true), p2 += s.pop(), S(p2, d);
          break;
        case 23:
          E();
          break;
        case 24:
          for (; s.length > 2; )
            n = p2 + s.shift(), i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), p2 = a + s.shift(), d = o + s.shift(), u.curveTo(n, i, a, o, p2, d);
          p2 += s.shift(), d += s.shift(), u.lineTo(p2, d);
          break;
        case 25:
          for (; s.length > 6; )
            p2 += s.shift(), d += s.shift(), u.lineTo(p2, d);
          n = p2 + s.shift(), i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), p2 = a + s.shift(), d = o + s.shift(), u.curveTo(n, i, a, o, p2, d);
          break;
        case 26:
          for (s.length % 2 && (p2 += s.shift()); s.length > 0; )
            n = p2, i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), p2 = a, d = o + s.shift(), u.curveTo(n, i, a, o, p2, d);
          break;
        case 27:
          for (s.length % 2 && (d += s.shift()); s.length > 0; )
            n = p2 + s.shift(), i = d, a = n + s.shift(), o = i + s.shift(), p2 = a + s.shift(), d = o, u.curveTo(n, i, a, o, p2, d);
          break;
        case 28:
          U = T[B], M = T[B + 1], s.push((U << 24 | M << 16) >> 16), B += 2;
          break;
        case 29:
          ee = s.pop() + e.gsubrsBias, A = e.gsubrs[ee], A && L(A);
          break;
        case 30:
          for (; s.length > 0 && (n = p2, i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), p2 = a + s.shift(), d = o + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p2, d), s.length !== 0); )
            n = p2 + s.shift(), i = d, a = n + s.shift(), o = i + s.shift(), d = o + s.shift(), p2 = a + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p2, d);
          break;
        case 31:
          for (; s.length > 0 && (n = p2 + s.shift(), i = d, a = n + s.shift(), o = i + s.shift(), d = o + s.shift(), p2 = a + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p2, d), s.length !== 0); )
            n = p2, i = d + s.shift(), a = n + s.shift(), o = i + s.shift(), p2 = a + s.shift(), d = o + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p2, d);
          break;
        default:
          z < 32 ? console.log("Glyph " + t.index + ": unknown operator " + z) : z < 247 ? s.push(z - 139) : z < 251 ? (U = T[B], B += 1, s.push((z - 247) * 256 + U + 108)) : z < 255 ? (U = T[B], B += 1, s.push(-(z - 251) * 256 - U - 108)) : (U = T[B], M = T[B + 1], H = T[B + 2], q = T[B + 3], B += 4, s.push((U << 24 | M << 16 | H << 8 | q) / 65536));
      }
    }
  }
  return L(r), t.advanceWidth = k, u;
}
function P0(e, t, r, n) {
  var i = [], a, o = new se.Parser(e, t), u = o.parseCard8();
  if (u === 0)
    for (var s = 0; s < r; s++) {
      if (a = o.parseCard8(), a >= n)
        throw new Error("CFF table CID Font FDSelect has bad FD index value " + a + " (FD count " + n + ")");
      i.push(a);
    }
  else if (u === 3) {
    var l = o.parseCard16(), f = o.parseCard16();
    if (f !== 0)
      throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID " + f);
    for (var c, p2 = 0; p2 < l; p2++) {
      if (a = o.parseCard8(), c = o.parseCard16(), a >= n)
        throw new Error("CFF table CID Font FDSelect has bad FD index value " + a + " (FD count " + n + ")");
      if (c > r)
        throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID " + c);
      for (; f < c; f++)
        i.push(a);
      f = c;
    }
    if (c !== r)
      throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID " + c);
  } else
    throw new Error("CFF Table CID Font FDSelect table has unsupported format " + u);
  return i;
}
function R0(e, t, r, n) {
  r.tables.cff = {};
  var i = T0(e, t), a = sr(e, i.endOffset, se.bytesToString), o = sr(e, a.endOffset), u = sr(e, o.endOffset, se.bytesToString), s = sr(e, u.endOffset);
  r.gsubrs = s.objects, r.gsubrsBias = na(r.gsubrs);
  var l = Rs(e, t, o.objects, u.objects);
  if (l.length !== 1)
    throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " + l.length);
  var f = l[0];
  if (r.tables.cff.topDict = f, f._privateDict && (r.defaultWidthX = f._privateDict.defaultWidthX, r.nominalWidthX = f._privateDict.nominalWidthX), f.ros[0] !== void 0 && f.ros[1] !== void 0 && (r.isCIDFont = true), r.isCIDFont) {
    var c = f.fdArray, p2 = f.fdSelect;
    if (c === 0 || p2 === 0)
      throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");
    c += t;
    var d = sr(e, c), D = Rs(e, t, d.objects, u.objects);
    f._fdArray = D, p2 += t, f._fdSelect = P0(e, p2, r.numGlyphs, D.length);
  }
  var v = t + f.private[1], g = uu(e, v, f.private[0], u.objects);
  if (r.defaultWidthX = g.defaultWidthX, r.nominalWidthX = g.nominalWidthX, g.subrs !== 0) {
    var y = v + g.subrs, b = sr(e, y);
    r.subrs = b.objects, r.subrsBias = na(r.subrs);
  } else
    r.subrs = [], r.subrsBias = 0;
  var C;
  n.lowMemory ? (C = E0(e, t + f.charStrings), r.nGlyphs = C.offsets.length) : (C = sr(e, t + f.charStrings), r.nGlyphs = C.objects.length);
  var k = L0(e, t + f.charset, r.nGlyphs, u.objects);
  if (f.encoding === 0 ? r.cffEncoding = new kn(Xp, k) : f.encoding === 1 ? r.cffEncoding = new kn(qp, k) : r.cffEncoding = I0(e, t + f.encoding, k), r.encoding = r.encoding || r.cffEncoding, r.glyphs = new $t.GlyphSet(r), n.lowMemory)
    r._push = function(L) {
      var T = F0(L, C.offsets, e, t + f.charStrings);
      r.glyphs.push(L, $t.cffGlyphLoader(r, L, Us, T));
    };
  else
    for (var S = 0; S < r.nGlyphs; S += 1) {
      var E = C.objects[S];
      r.glyphs.push(S, $t.cffGlyphLoader(r, S, Us, E));
    }
}
var U0 = { parse: R0 };
function B0(e, t, r) {
  var n = {}, i = new se.Parser(e, t);
  return n.tag = i.parseTag(), n.minValue = i.parseFixed(), n.defaultValue = i.parseFixed(), n.maxValue = i.parseFixed(), i.skip("uShort", 1), n.name = r[i.parseUShort()] || {}, n;
}
function N0(e, t, r, n) {
  var i = {}, a = new se.Parser(e, t);
  i.name = n[a.parseUShort()] || {}, a.skip("uShort", 1), i.coordinates = {};
  for (var o = 0; o < r.length; ++o)
    i.coordinates[r[o].tag] = a.parseFixed();
  return i;
}
function M0(e, t, r) {
  var n = new se.Parser(e, t), i = n.parseULong();
  Te.argument(i === 65536, "Unsupported fvar table version.");
  var a = n.parseOffset16();
  n.skip("uShort", 1);
  for (var o = n.parseUShort(), u = n.parseUShort(), s = n.parseUShort(), l = n.parseUShort(), f = [], c = 0; c < o; c++)
    f.push(B0(e, t + a + c * u, r));
  for (var p2 = [], d = t + a + o * u, D = 0; D < s; D++)
    p2.push(N0(e, d + D * l, f, r));
  return { axes: f, instances: p2 };
}
var G0 = { parse: M0 };
var W0 = function() {
  return { coverage: this.parsePointer($.coverage), attachPoints: this.parseList($.pointer($.uShortList)) };
};
var $0 = function() {
  var e = this.parseUShort();
  if (Te.argument(e === 1 || e === 2 || e === 3, "Unsupported CaretValue table version."), e === 1)
    return { coordinate: this.parseShort() };
  if (e === 2)
    return { pointindex: this.parseShort() };
  if (e === 3)
    return { coordinate: this.parseShort() };
};
var j0 = function() {
  return this.parseList($.pointer($0));
};
var z0 = function() {
  return { coverage: this.parsePointer($.coverage), ligGlyphs: this.parseList($.pointer(j0)) };
};
var V0 = function() {
  return this.parseUShort(), this.parseList($.pointer($.coverage));
};
function H0(e, t) {
  t = t || 0;
  var r = new $(e, t), n = r.parseVersion(1);
  Te.argument(n === 1 || n === 1.2 || n === 1.3, "Unsupported GDEF table version.");
  var i = { version: n, classDef: r.parsePointer($.classDef), attachList: r.parsePointer(W0), ligCaretList: r.parsePointer(z0), markAttachClassDef: r.parsePointer($.classDef) };
  return n >= 1.2 && (i.markGlyphSets = r.parsePointer(V0)), i;
}
var X0 = { parse: H0 };
var _t = new Array(10);
_t[1] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { posFormat: 1, coverage: this.parsePointer($.coverage), value: this.parseValueRecord() };
  if (r === 2)
    return { posFormat: 2, coverage: this.parsePointer($.coverage), values: this.parseValueRecordList() };
  Te.assert(false, "0x" + t.toString(16) + ": GPOS lookup type 1 format must be 1 or 2.");
};
_t[2] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  Te.assert(r === 1 || r === 2, "0x" + t.toString(16) + ": GPOS lookup type 2 format must be 1 or 2.");
  var n = this.parsePointer($.coverage), i = this.parseUShort(), a = this.parseUShort();
  if (r === 1)
    return { posFormat: r, coverage: n, valueFormat1: i, valueFormat2: a, pairSets: this.parseList($.pointer($.list(function() {
      return { secondGlyph: this.parseUShort(), value1: this.parseValueRecord(i), value2: this.parseValueRecord(a) };
    }))) };
  if (r === 2) {
    var o = this.parsePointer($.classDef), u = this.parsePointer($.classDef), s = this.parseUShort(), l = this.parseUShort();
    return { posFormat: r, coverage: n, valueFormat1: i, valueFormat2: a, classDef1: o, classDef2: u, class1Count: s, class2Count: l, classRecords: this.parseList(s, $.list(l, function() {
      return { value1: this.parseValueRecord(i), value2: this.parseValueRecord(a) };
    })) };
  }
};
_t[3] = function() {
  return { error: "GPOS Lookup 3 not supported" };
};
_t[4] = function() {
  return { error: "GPOS Lookup 4 not supported" };
};
_t[5] = function() {
  return { error: "GPOS Lookup 5 not supported" };
};
_t[6] = function() {
  return { error: "GPOS Lookup 6 not supported" };
};
_t[7] = function() {
  return { error: "GPOS Lookup 7 not supported" };
};
_t[8] = function() {
  return { error: "GPOS Lookup 8 not supported" };
};
_t[9] = function() {
  return { error: "GPOS Lookup 9 not supported" };
};
function q0(e, t) {
  t = t || 0;
  var r = new $(e, t), n = r.parseVersion(1);
  return Te.argument(n === 1 || n === 1.1, "Unsupported GPOS table version " + n), n === 1 ? { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(_t) } : { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(_t), variations: r.parseFeatureVariationsList() };
}
var Y0 = { parse: q0 };
var At = new Array(9);
At[1] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { substFormat: 1, coverage: this.parsePointer($.coverage), deltaGlyphId: this.parseUShort() };
  if (r === 2)
    return { substFormat: 2, coverage: this.parsePointer($.coverage), substitute: this.parseOffset16List() };
  Te.assert(false, "0x" + t.toString(16) + ": lookup type 1 format must be 1 or 2.");
};
At[2] = function() {
  var t = this.parseUShort();
  return Te.argument(t === 1, "GSUB Multiple Substitution Subtable identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer($.coverage), sequences: this.parseListOfLists() };
};
At[3] = function() {
  var t = this.parseUShort();
  return Te.argument(t === 1, "GSUB Alternate Substitution Subtable identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer($.coverage), alternateSets: this.parseListOfLists() };
};
At[4] = function() {
  var t = this.parseUShort();
  return Te.argument(t === 1, "GSUB ligature table identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer($.coverage), ligatureSets: this.parseListOfLists(function() {
    return { ligGlyph: this.parseUShort(), components: this.parseUShortList(this.parseUShort() - 1) };
  }) };
};
var _r = { sequenceIndex: $.uShort, lookupListIndex: $.uShort };
At[5] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { substFormat: r, coverage: this.parsePointer($.coverage), ruleSets: this.parseListOfLists(function() {
      var a = this.parseUShort(), o = this.parseUShort();
      return { input: this.parseUShortList(a - 1), lookupRecords: this.parseRecordList(o, _r) };
    }) };
  if (r === 2)
    return { substFormat: r, coverage: this.parsePointer($.coverage), classDef: this.parsePointer($.classDef), classSets: this.parseListOfLists(function() {
      var a = this.parseUShort(), o = this.parseUShort();
      return { classes: this.parseUShortList(a - 1), lookupRecords: this.parseRecordList(o, _r) };
    }) };
  if (r === 3) {
    var n = this.parseUShort(), i = this.parseUShort();
    return { substFormat: r, coverages: this.parseList(n, $.pointer($.coverage)), lookupRecords: this.parseRecordList(i, _r) };
  }
  Te.assert(false, "0x" + t.toString(16) + ": lookup type 5 format must be 1, 2 or 3.");
};
At[6] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { substFormat: 1, coverage: this.parsePointer($.coverage), chainRuleSets: this.parseListOfLists(function() {
      return { backtrack: this.parseUShortList(), input: this.parseUShortList(this.parseShort() - 1), lookahead: this.parseUShortList(), lookupRecords: this.parseRecordList(_r) };
    }) };
  if (r === 2)
    return { substFormat: 2, coverage: this.parsePointer($.coverage), backtrackClassDef: this.parsePointer($.classDef), inputClassDef: this.parsePointer($.classDef), lookaheadClassDef: this.parsePointer($.classDef), chainClassSet: this.parseListOfLists(function() {
      return { backtrack: this.parseUShortList(), input: this.parseUShortList(this.parseShort() - 1), lookahead: this.parseUShortList(), lookupRecords: this.parseRecordList(_r) };
    }) };
  if (r === 3)
    return { substFormat: 3, backtrackCoverage: this.parseList($.pointer($.coverage)), inputCoverage: this.parseList($.pointer($.coverage)), lookaheadCoverage: this.parseList($.pointer($.coverage)), lookupRecords: this.parseRecordList(_r) };
  Te.assert(false, "0x" + t.toString(16) + ": lookup type 6 format must be 1, 2 or 3.");
};
At[7] = function() {
  var t = this.parseUShort();
  Te.argument(t === 1, "GSUB Extension Substitution subtable identifier-format must be 1");
  var r = this.parseUShort(), n = new $(this.data, this.offset + this.parseULong());
  return { substFormat: 1, lookupType: r, extension: At[r].call(n) };
};
At[8] = function() {
  var t = this.parseUShort();
  return Te.argument(t === 1, "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer($.coverage), backtrackCoverage: this.parseList($.pointer($.coverage)), lookaheadCoverage: this.parseList($.pointer($.coverage)), substitutes: this.parseUShortList() };
};
function Z0(e, t) {
  t = t || 0;
  var r = new $(e, t), n = r.parseVersion(1);
  return Te.argument(n === 1 || n === 1.1, "Unsupported GSUB table version."), n === 1 ? { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(At) } : { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(At), variations: r.parseFeatureVariationsList() };
}
var J0 = { parse: Z0 };
function K0(e, t) {
  var r = {}, n = new se.Parser(e, t);
  return r.version = n.parseVersion(), r.fontRevision = Math.round(n.parseFixed() * 1e3) / 1e3, r.checkSumAdjustment = n.parseULong(), r.magicNumber = n.parseULong(), Te.argument(r.magicNumber === 1594834165, "Font header has wrong magic number."), r.flags = n.parseUShort(), r.unitsPerEm = n.parseUShort(), r.created = n.parseLongDateTime(), r.modified = n.parseLongDateTime(), r.xMin = n.parseShort(), r.yMin = n.parseShort(), r.xMax = n.parseShort(), r.yMax = n.parseShort(), r.macStyle = n.parseUShort(), r.lowestRecPPEM = n.parseUShort(), r.fontDirectionHint = n.parseShort(), r.indexToLocFormat = n.parseShort(), r.glyphDataFormat = n.parseShort(), r;
}
var Q0 = { parse: K0 };
function ev(e, t) {
  var r = {}, n = new se.Parser(e, t);
  return r.version = n.parseVersion(), r.ascender = n.parseShort(), r.descender = n.parseShort(), r.lineGap = n.parseShort(), r.advanceWidthMax = n.parseUShort(), r.minLeftSideBearing = n.parseShort(), r.minRightSideBearing = n.parseShort(), r.xMaxExtent = n.parseShort(), r.caretSlopeRise = n.parseShort(), r.caretSlopeRun = n.parseShort(), r.caretOffset = n.parseShort(), n.relativeOffset += 8, r.metricDataFormat = n.parseShort(), r.numberOfHMetrics = n.parseUShort(), r;
}
var tv = { parse: ev };
function rv(e, t, r, n, i) {
  for (var a, o, u = new se.Parser(e, t), s = 0; s < n; s += 1) {
    s < r && (a = u.parseUShort(), o = u.parseShort());
    var l = i.get(s);
    l.advanceWidth = a, l.leftSideBearing = o;
  }
}
function nv(e, t, r, n, i) {
  e._hmtxTableData = {};
  for (var a, o, u = new se.Parser(t, r), s = 0; s < i; s += 1)
    s < n && (a = u.parseUShort(), o = u.parseShort()), e._hmtxTableData[s] = { advanceWidth: a, leftSideBearing: o };
}
function iv(e, t, r, n, i, a, o) {
  o.lowMemory ? nv(e, t, r, n, i) : rv(t, r, n, i, a);
}
var av = { parse: iv };
function ov(e) {
  var t = {};
  e.skip("uShort");
  var r = e.parseUShort();
  Te.argument(r === 0, "Unsupported kern sub-table version."), e.skip("uShort", 2);
  var n = e.parseUShort();
  e.skip("uShort", 3);
  for (var i = 0; i < n; i += 1) {
    var a = e.parseUShort(), o = e.parseUShort(), u = e.parseShort();
    t[a + "," + o] = u;
  }
  return t;
}
function sv(e) {
  var t = {};
  e.skip("uShort");
  var r = e.parseULong();
  r > 1 && console.warn("Only the first kern subtable is supported."), e.skip("uLong");
  var n = e.parseUShort(), i = n & 255;
  if (e.skip("uShort"), i === 0) {
    var a = e.parseUShort();
    e.skip("uShort", 3);
    for (var o = 0; o < a; o += 1) {
      var u = e.parseUShort(), s = e.parseUShort(), l = e.parseShort();
      t[u + "," + s] = l;
    }
  }
  return t;
}
function uv(e, t) {
  var r = new se.Parser(e, t), n = r.parseUShort();
  if (n === 0)
    return ov(r);
  if (n === 1)
    return sv(r);
  throw new Error("Unsupported kern table version (" + n + ").");
}
var lv = { parse: uv };
function fv(e, t) {
  var r = new se.Parser(e, t), n = r.parseULong();
  Te.argument(n === 1, "Unsupported ltag table version."), r.skip("uLong", 1);
  for (var i = r.parseULong(), a = [], o = 0; o < i; o++) {
    for (var u = "", s = t + r.parseUShort(), l = r.parseUShort(), f = s; f < s + l; ++f)
      u += String.fromCharCode(e.getInt8(f));
    a.push(u);
  }
  return a;
}
var cv = { parse: fv };
function pv(e, t, r, n) {
  for (var i = new se.Parser(e, t), a = n ? i.parseUShort : i.parseULong, o = [], u = 0; u < r + 1; u += 1) {
    var s = a.call(i);
    n && (s *= 2), o.push(s);
  }
  return o;
}
var hv = { parse: pv };
function dv(e, t) {
  var r = {}, n = new se.Parser(e, t);
  return r.version = n.parseVersion(), r.numGlyphs = n.parseUShort(), r.version === 1 && (r.maxPoints = n.parseUShort(), r.maxContours = n.parseUShort(), r.maxCompositePoints = n.parseUShort(), r.maxCompositeContours = n.parseUShort(), r.maxZones = n.parseUShort(), r.maxTwilightPoints = n.parseUShort(), r.maxStorage = n.parseUShort(), r.maxFunctionDefs = n.parseUShort(), r.maxInstructionDefs = n.parseUShort(), r.maxStackElements = n.parseUShort(), r.maxSizeOfInstructions = n.parseUShort(), r.maxComponentElements = n.parseUShort(), r.maxComponentDepth = n.parseUShort()), r;
}
var vv = { parse: dv };
function gv(e, t) {
  var r = {}, n = new se.Parser(e, t);
  r.version = n.parseUShort(), r.xAvgCharWidth = n.parseShort(), r.usWeightClass = n.parseUShort(), r.usWidthClass = n.parseUShort(), r.fsType = n.parseUShort(), r.ySubscriptXSize = n.parseShort(), r.ySubscriptYSize = n.parseShort(), r.ySubscriptXOffset = n.parseShort(), r.ySubscriptYOffset = n.parseShort(), r.ySuperscriptXSize = n.parseShort(), r.ySuperscriptYSize = n.parseShort(), r.ySuperscriptXOffset = n.parseShort(), r.ySuperscriptYOffset = n.parseShort(), r.yStrikeoutSize = n.parseShort(), r.yStrikeoutPosition = n.parseShort(), r.sFamilyClass = n.parseShort(), r.panose = [];
  for (var i = 0; i < 10; i++)
    r.panose[i] = n.parseByte();
  return r.ulUnicodeRange1 = n.parseULong(), r.ulUnicodeRange2 = n.parseULong(), r.ulUnicodeRange3 = n.parseULong(), r.ulUnicodeRange4 = n.parseULong(), r.achVendID = String.fromCharCode(n.parseByte(), n.parseByte(), n.parseByte(), n.parseByte()), r.fsSelection = n.parseUShort(), r.usFirstCharIndex = n.parseUShort(), r.usLastCharIndex = n.parseUShort(), r.sTypoAscender = n.parseShort(), r.sTypoDescender = n.parseShort(), r.sTypoLineGap = n.parseShort(), r.usWinAscent = n.parseUShort(), r.usWinDescent = n.parseUShort(), r.version >= 1 && (r.ulCodePageRange1 = n.parseULong(), r.ulCodePageRange2 = n.parseULong()), r.version >= 2 && (r.sxHeight = n.parseShort(), r.sCapHeight = n.parseShort(), r.usDefaultChar = n.parseUShort(), r.usBreakChar = n.parseUShort(), r.usMaxContent = n.parseUShort()), r;
}
var mv = { parse: gv };
function Dv(e, t) {
  var r = {}, n = new se.Parser(e, t);
  switch (r.version = n.parseVersion(), r.italicAngle = n.parseFixed(), r.underlinePosition = n.parseShort(), r.underlineThickness = n.parseShort(), r.isFixedPitch = n.parseULong(), r.minMemType42 = n.parseULong(), r.maxMemType42 = n.parseULong(), r.minMemType1 = n.parseULong(), r.maxMemType1 = n.parseULong(), r.names = [], r.version) {
    case 1:
      break;
    case 2:
      r.numberOfGlyphs = n.parseUShort(), r.glyphNameIndex = new Array(r.numberOfGlyphs);
      for (var i = 0; i < r.numberOfGlyphs; i++)
        r.glyphNameIndex[i] = n.parseUShort();
      break;
    case 2.5:
      r.numberOfGlyphs = n.parseUShort(), r.offset = new Array(r.numberOfGlyphs);
      for (var a = 0; a < r.numberOfGlyphs; a++)
        r.offset[a] = n.parseChar();
      break;
  }
  return r;
}
var yv = { parse: Dv };
var On = {};
On.UTF8 = function(e, t, r) {
  for (var n = [], i = r, a = 0; a < i; a++, t += 1)
    n[a] = e.getUint8(t);
  return String.fromCharCode.apply(null, n);
};
On.UTF16 = function(e, t, r) {
  for (var n = [], i = r / 2, a = 0; a < i; a++, t += 2)
    n[a] = e.getUint16(t);
  return String.fromCharCode.apply(null, n);
};
var bv = { "x-mac-croatian": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\u0160\u2122\xB4\xA8\u2260\u017D\xD8\u221E\xB1\u2264\u2265\u2206\xB5\u2202\u2211\u220F\u0161\u222B\xAA\xBA\u03A9\u017E\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u0106\xAB\u010C\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u0110\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\uF8FF\xA9\u2044\u20AC\u2039\u203A\xC6\xBB\u2013\xB7\u201A\u201E\u2030\xC2\u0107\xC1\u010D\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u0111\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u03C0\xCB\u02DA\xB8\xCA\xE6\u02C7", "x-mac-cyrillic": "\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042A\u042B\u042C\u042D\u042E\u042F\u2020\xB0\u0490\xA3\xA7\u2022\xB6\u0406\xAE\xA9\u2122\u0402\u0452\u2260\u0403\u0453\u221E\xB1\u2264\u2265\u0456\xB5\u0491\u0408\u0404\u0454\u0407\u0457\u0409\u0459\u040A\u045A\u0458\u0405\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\u040B\u045B\u040C\u045C\u0455\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u201E\u040E\u045E\u040F\u045F\u2116\u0401\u0451\u044F\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E", "x-mac-gaelic": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u1E02\xB1\u2264\u2265\u1E03\u010A\u010B\u1E0A\u1E0B\u1E1E\u1E1F\u0120\u0121\u1E40\xE6\xF8\u1E41\u1E56\u1E57\u027C\u0192\u017F\u1E60\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\u1E61\u1E9B\xFF\u0178\u1E6A\u20AC\u2039\u203A\u0176\u0177\u1E6B\xB7\u1EF2\u1EF3\u204A\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u2663\xD2\xDA\xDB\xD9\u0131\xDD\xFD\u0174\u0175\u1E84\u1E85\u1E80\u1E81\u1E82\u1E83", "x-mac-greek": "\xC4\xB9\xB2\xC9\xB3\xD6\xDC\u0385\xE0\xE2\xE4\u0384\xA8\xE7\xE9\xE8\xEA\xEB\xA3\u2122\xEE\xEF\u2022\xBD\u2030\xF4\xF6\xA6\u20AC\xF9\xFB\xFC\u2020\u0393\u0394\u0398\u039B\u039E\u03A0\xDF\xAE\xA9\u03A3\u03AA\xA7\u2260\xB0\xB7\u0391\xB1\u2264\u2265\xA5\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u03A6\u03AB\u03A8\u03A9\u03AC\u039D\xAC\u039F\u03A1\u2248\u03A4\xAB\xBB\u2026\xA0\u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xF7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xAD", "x-mac-icelandic": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\xDD\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\xD0\xF0\xDE\xFE\xFD\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7", "x-mac-inuit": "\u1403\u1404\u1405\u1406\u140A\u140B\u1431\u1432\u1433\u1434\u1438\u1439\u1449\u144E\u144F\u1450\u1451\u1455\u1456\u1466\u146D\u146E\u146F\u1470\u1472\u1473\u1483\u148B\u148C\u148D\u148E\u1490\u1491\xB0\u14A1\u14A5\u14A6\u2022\xB6\u14A7\xAE\xA9\u2122\u14A8\u14AA\u14AB\u14BB\u14C2\u14C3\u14C4\u14C5\u14C7\u14C8\u14D0\u14EF\u14F0\u14F1\u14F2\u14F4\u14F5\u1505\u14D5\u14D6\u14D7\u14D8\u14DA\u14DB\u14EA\u1528\u1529\u152A\u152B\u152D\u2026\xA0\u152E\u153E\u1555\u1556\u1557\u2013\u2014\u201C\u201D\u2018\u2019\u1558\u1559\u155A\u155D\u1546\u1547\u1548\u1549\u154B\u154C\u1550\u157F\u1580\u1581\u1582\u1583\u1584\u1585\u158F\u1590\u1591\u1592\u1593\u1594\u1595\u1671\u1672\u1673\u1674\u1675\u1676\u1596\u15A0\u15A1\u15A2\u15A3\u15A4\u15A5\u15A6\u157C\u0141\u0142", "x-mac-ce": "\xC4\u0100\u0101\xC9\u0104\xD6\xDC\xE1\u0105\u010C\xE4\u010D\u0106\u0107\xE9\u0179\u017A\u010E\xED\u010F\u0112\u0113\u0116\xF3\u0117\xF4\xF6\xF5\xFA\u011A\u011B\xFC\u2020\xB0\u0118\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\u0119\xA8\u2260\u0123\u012E\u012F\u012A\u2264\u2265\u012B\u0136\u2202\u2211\u0142\u013B\u013C\u013D\u013E\u0139\u013A\u0145\u0146\u0143\xAC\u221A\u0144\u0147\u2206\xAB\xBB\u2026\xA0\u0148\u0150\xD5\u0151\u014C\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\u014D\u0154\u0155\u0158\u2039\u203A\u0159\u0156\u0157\u0160\u201A\u201E\u0161\u015A\u015B\xC1\u0164\u0165\xCD\u017D\u017E\u016A\xD3\xD4\u016B\u016E\xDA\u016F\u0170\u0171\u0172\u0173\xDD\xFD\u0137\u017B\u0141\u017C\u0122\u02C7", macintosh: "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\uFB01\uFB02\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7", "x-mac-romanian": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\u0102\u0218\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\u0103\u0219\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\u021A\u021B\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7", "x-mac-turkish": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u011E\u011F\u0130\u0131\u015E\u015F\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\uF8A0\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7" };
On.MACSTRING = function(e, t, r, n) {
  var i = bv[n];
  if (i !== void 0) {
    for (var a = "", o = 0; o < r; o++) {
      var u = e.getUint8(t + o);
      u <= 127 ? a += String.fromCharCode(u) : a += i[u & 127];
    }
    return a;
  }
};
function xv(e, t) {
  var r = new se.Parser(e, t), n = r.parseULong();
  Te.argument(n === 1, "Unsupported META table version."), r.parseULong(), r.parseULong();
  for (var i = r.parseULong(), a = {}, o = 0; o < i; o++) {
    var u = r.parseTag(), s = r.parseULong(), l = r.parseULong(), f = On.UTF8(e, t + s, l);
    a[u] = f;
  }
  return a;
}
var wv = { parse: xv };
function Bs(e, t) {
  for (var r = [], n = 12, i = 0; i < t; i += 1) {
    var a = se.getTag(e, n), o = se.getULong(e, n + 4), u = se.getULong(e, n + 8), s = se.getULong(e, n + 12);
    r.push({ tag: a, checksum: o, offset: u, length: s, compression: false }), n += 16;
  }
  return r;
}
function Ev(e, t) {
  for (var r = [], n = 44, i = 0; i < t; i += 1) {
    var a = se.getTag(e, n), o = se.getULong(e, n + 4), u = se.getULong(e, n + 8), s = se.getULong(e, n + 12), l = void 0;
    u < s ? l = "WOFF" : l = false, r.push({ tag: a, offset: o, compression: l, compressedLength: u, length: s }), n += 20;
  }
  return r;
}
function je(e, t) {
  if (t.compression === "WOFF") {
    var r = new Uint8Array(e.buffer, t.offset + 2, t.compressedLength - 2), n = new Uint8Array(t.length);
    if (jp(r, n), n.byteLength !== t.length)
      throw new Error("Decompression error: " + t.tag + " decompressed length doesn't match recorded length");
    var i = new DataView(n.buffer, 0);
    return { data: i, offset: 0 };
  } else
    return { data: e, offset: t.offset };
}
function Fv(e, t) {
  t = t ?? {};
  var r, n = new st({ empty: true }), i = new DataView(e, 0), a, o = [], u = se.getTag(i, 0);
  if (u === "\0\0\0" || u === "true" || u === "typ1")
    n.outlinesFormat = "truetype", a = se.getUShort(i, 4), o = Bs(i, a);
  else if (u === "OTTO")
    n.outlinesFormat = "cff", a = se.getUShort(i, 4), o = Bs(i, a);
  else if (u === "wOFF") {
    var s = se.getTag(i, 4);
    if (s === "\0\0\0")
      n.outlinesFormat = "truetype";
    else if (s === "OTTO")
      n.outlinesFormat = "cff";
    else
      throw new Error("Unsupported OpenType flavor " + u);
    a = se.getUShort(i, 12), o = Ev(i, a);
  } else
    throw new Error("Unsupported OpenType signature " + u);
  for (var l, f, c, p2, d, D, v, g, y, b, C, k = 0; k < a; k += 1) {
    var S = o[k], E = void 0;
    switch (S.tag) {
      case "cmap":
        E = je(i, S), n.tables.cmap = w0.parse(E.data, E.offset), n.encoding = new Hs(n.tables.cmap);
        break;
      case "cvt ":
        E = je(i, S), C = new se.Parser(E.data, E.offset), n.tables.cvt = C.parseShortList(S.length / 2);
        break;
      case "fvar":
        f = S;
        break;
      case "fpgm":
        E = je(i, S), C = new se.Parser(E.data, E.offset), n.tables.fpgm = C.parseByteList(S.length);
        break;
      case "head":
        E = je(i, S), n.tables.head = Q0.parse(E.data, E.offset), n.unitsPerEm = n.tables.head.unitsPerEm, r = n.tables.head.indexToLocFormat;
        break;
      case "hhea":
        E = je(i, S), n.tables.hhea = tv.parse(E.data, E.offset), n.ascender = n.tables.hhea.ascender, n.descender = n.tables.hhea.descender, n.numberOfHMetrics = n.tables.hhea.numberOfHMetrics;
        break;
      case "hmtx":
        v = S;
        break;
      case "ltag":
        E = je(i, S), ltagTable = cv.parse(E.data, E.offset);
        break;
      case "maxp":
        E = je(i, S), n.tables.maxp = vv.parse(E.data, E.offset), n.numGlyphs = n.tables.maxp.numGlyphs;
        break;
      case "OS/2":
        E = je(i, S), n.tables.os2 = mv.parse(E.data, E.offset);
        break;
      case "post":
        E = je(i, S), n.tables.post = yv.parse(E.data, E.offset);
        break;
      case "prep":
        E = je(i, S), C = new se.Parser(E.data, E.offset), n.tables.prep = C.parseByteList(S.length);
        break;
      case "glyf":
        c = S;
        break;
      case "loca":
        y = S;
        break;
      case "CFF ":
        l = S;
        break;
      case "kern":
        g = S;
        break;
      case "GDEF":
        p2 = S;
        break;
      case "GPOS":
        d = S;
        break;
      case "GSUB":
        D = S;
        break;
      case "meta":
        b = S;
        break;
    }
  }
  if (c && y) {
    var L = r === 0, T = je(i, y), U = hv.parse(T.data, T.offset, n.numGlyphs, L), M = je(i, c);
    n.glyphs = Ks.parse(M.data, M.offset, U, n, t);
  } else if (l) {
    var H = je(i, l);
    U0.parse(H.data, H.offset, n, t);
  } else
    throw new Error("Font doesn't contain TrueType or CFF outlines.");
  var q = je(i, v);
  if (av.parse(n, q.data, q.offset, n.numberOfHMetrics, n.numGlyphs, n.glyphs, t), Jp(n, t), g) {
    var ee = je(i, g);
    n.kerningPairs = lv.parse(ee.data, ee.offset);
  } else
    n.kerningPairs = {};
  if (p2) {
    var A = je(i, p2);
    n.tables.gdef = X0.parse(A.data, A.offset);
  }
  if (d) {
    var R = je(i, d);
    n.tables.gpos = Y0.parse(R.data, R.offset), n.position.init();
  }
  if (D) {
    var O = je(i, D);
    n.tables.gsub = J0.parse(O.data, O.offset);
  }
  if (f) {
    var Y = je(i, f);
    n.tables.fvar = G0.parse(Y.data, Y.offset, n.names);
  }
  if (b) {
    var Z = je(i, b);
    n.tables.meta = wv.parse(Z.data, Z.offset), n.metas = n.tables.meta;
  }
  return n;
}
function Cv() {
}
function Sv() {
}
var kv = Object.freeze({ __proto__: null, Font: st, Glyph: Jt, Path: ot, _parse: se, parse: Fv, load: Cv, loadSync: Sv });
var Ln = kv;
var Tv = Object.create;
var Yn = Object.defineProperty;
var _v = Object.getOwnPropertyDescriptor;
var Av = Object.getOwnPropertyNames;
var Ov = Object.getPrototypeOf;
var Lv = Object.prototype.hasOwnProperty;
var _a = (e, t) => () => (e && (t = e(e = 0)), t);
var le = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Aa = (e, t) => {
  for (var r in t)
    Yn(e, r, { get: t[r], enumerable: true });
};
var Bu = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of Av(t))
      !Lv.call(e, i) && i !== r && Yn(e, i, { get: () => t[i], enumerable: !(n = _v(t, i)) || n.enumerable });
  return e;
};
var Iv = (e, t, r) => (r = e != null ? Tv(Ov(e)) : {}, Bu(t || !e || !e.__esModule ? Yn(r, "default", { value: e, enumerable: true }) : r, e));
var Xn = (e) => Bu(Yn({}, "__esModule", { value: true }), e);
var Nu = {};
Aa(Nu, { getYogaModule: () => Pv });
async function Pv() {
  return {};
}
var Rv = _a(() => {
});
var Mu = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    if (r = `${r}`, r === "0")
      return "0";
    if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(r))
      return r.replace(/^[+-]?/, (n) => n === "-" ? "" : "-");
    if (r.includes("var(") || r.includes("calc("))
      return `calc(${r} * -1)`;
  }
});
var Uv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  var t = ["preflight", "container", "accessibility", "pointerEvents", "visibility", "position", "inset", "isolation", "zIndex", "order", "gridColumn", "gridColumnStart", "gridColumnEnd", "gridRow", "gridRowStart", "gridRowEnd", "float", "clear", "margin", "boxSizing", "display", "aspectRatio", "height", "maxHeight", "minHeight", "width", "minWidth", "maxWidth", "flex", "flexShrink", "flexGrow", "flexBasis", "tableLayout", "borderCollapse", "borderSpacing", "transformOrigin", "translate", "rotate", "skew", "scale", "transform", "animation", "cursor", "touchAction", "userSelect", "resize", "scrollSnapType", "scrollSnapAlign", "scrollSnapStop", "scrollMargin", "scrollPadding", "listStylePosition", "listStyleType", "appearance", "columns", "breakBefore", "breakInside", "breakAfter", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateColumns", "gridTemplateRows", "flexDirection", "flexWrap", "placeContent", "placeItems", "alignContent", "alignItems", "justifyContent", "justifyItems", "gap", "space", "divideWidth", "divideStyle", "divideColor", "divideOpacity", "placeSelf", "alignSelf", "justifySelf", "overflow", "overscrollBehavior", "scrollBehavior", "textOverflow", "whitespace", "wordBreak", "borderRadius", "borderWidth", "borderStyle", "borderColor", "borderOpacity", "backgroundColor", "backgroundOpacity", "backgroundImage", "gradientColorStops", "boxDecorationBreak", "backgroundSize", "backgroundAttachment", "backgroundClip", "backgroundPosition", "backgroundRepeat", "backgroundOrigin", "fill", "stroke", "strokeWidth", "objectFit", "objectPosition", "padding", "textAlign", "textIndent", "verticalAlign", "fontFamily", "fontSize", "fontWeight", "textTransform", "fontStyle", "fontVariantNumeric", "lineHeight", "letterSpacing", "textColor", "textOpacity", "textDecoration", "textDecorationColor", "textDecorationStyle", "textDecorationThickness", "textUnderlineOffset", "fontSmoothing", "placeholderColor", "placeholderOpacity", "caretColor", "accentColor", "opacity", "backgroundBlendMode", "mixBlendMode", "boxShadow", "boxShadowColor", "outlineStyle", "outlineWidth", "outlineOffset", "outlineColor", "ringWidth", "ringColor", "ringOpacity", "ringOffsetWidth", "ringOffsetColor", "blur", "brightness", "contrast", "dropShadow", "grayscale", "hueRotate", "invert", "saturate", "sepia", "filter", "backdropBlur", "backdropBrightness", "backdropContrast", "backdropGrayscale", "backdropHueRotate", "backdropInvert", "backdropOpacity", "backdropSaturate", "backdropSepia", "backdropFilter", "transitionProperty", "transitionDelay", "transitionDuration", "transitionTimingFunction", "willChange", "content"];
});
var Bv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r, n) {
    return r === void 0 ? n : Array.isArray(r) ? r : [...new Set(n.filter((i) => r !== false && r[i] !== false).concat(Object.keys(r).filter((i) => r[i] !== false)))];
  }
});
var Gu = le((e, t) => {
  t.exports = { content: [], presets: [], darkMode: "media", theme: { screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" }, colors: ({ colors: r }) => ({ inherit: r.inherit, current: r.current, transparent: r.transparent, black: r.black, white: r.white, slate: r.slate, gray: r.gray, zinc: r.zinc, neutral: r.neutral, stone: r.stone, red: r.red, orange: r.orange, amber: r.amber, yellow: r.yellow, lime: r.lime, green: r.green, emerald: r.emerald, teal: r.teal, cyan: r.cyan, sky: r.sky, blue: r.blue, indigo: r.indigo, violet: r.violet, purple: r.purple, fuchsia: r.fuchsia, pink: r.pink, rose: r.rose }), columns: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", "3xs": "16rem", "2xs": "18rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem" }, spacing: { px: "1px", 0: "0px", 0.5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem", 2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem", 44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem", 64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem" }, animation: { none: "none", spin: "spin 1s linear infinite", ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", bounce: "bounce 1s infinite" }, aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9" }, backdropBlur: ({ theme: r }) => r("blur"), backdropBrightness: ({ theme: r }) => r("brightness"), backdropContrast: ({ theme: r }) => r("contrast"), backdropGrayscale: ({ theme: r }) => r("grayscale"), backdropHueRotate: ({ theme: r }) => r("hueRotate"), backdropInvert: ({ theme: r }) => r("invert"), backdropOpacity: ({ theme: r }) => r("opacity"), backdropSaturate: ({ theme: r }) => r("saturate"), backdropSepia: ({ theme: r }) => r("sepia"), backgroundColor: ({ theme: r }) => r("colors"), backgroundImage: { none: "none", "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))", "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))", "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))", "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))", "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))", "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))", "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))", "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))" }, backgroundOpacity: ({ theme: r }) => r("opacity"), backgroundPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, backgroundSize: { auto: "auto", cover: "cover", contain: "contain" }, blur: { 0: "0", none: "0", sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" }, brightness: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", 200: "2" }, borderColor: ({ theme: r }) => ({ ...r("colors"), DEFAULT: r("colors.gray.200", "currentColor") }), borderOpacity: ({ theme: r }) => r("opacity"), borderRadius: { none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px" }, borderSpacing: ({ theme: r }) => ({ ...r("spacing") }), borderWidth: { DEFAULT: "1px", 0: "0px", 2: "2px", 4: "4px", 8: "8px" }, boxShadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)", inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)", none: "none" }, boxShadowColor: ({ theme: r }) => r("colors"), caretColor: ({ theme: r }) => r("colors"), accentColor: ({ theme: r }) => ({ ...r("colors"), auto: "auto" }), contrast: { 0: "0", 50: ".5", 75: ".75", 100: "1", 125: "1.25", 150: "1.5", 200: "2" }, container: {}, content: { none: "none" }, cursor: { auto: "auto", default: "default", pointer: "pointer", wait: "wait", text: "text", move: "move", help: "help", "not-allowed": "not-allowed", none: "none", "context-menu": "context-menu", progress: "progress", cell: "cell", crosshair: "crosshair", "vertical-text": "vertical-text", alias: "alias", copy: "copy", "no-drop": "no-drop", grab: "grab", grabbing: "grabbing", "all-scroll": "all-scroll", "col-resize": "col-resize", "row-resize": "row-resize", "n-resize": "n-resize", "e-resize": "e-resize", "s-resize": "s-resize", "w-resize": "w-resize", "ne-resize": "ne-resize", "nw-resize": "nw-resize", "se-resize": "se-resize", "sw-resize": "sw-resize", "ew-resize": "ew-resize", "ns-resize": "ns-resize", "nesw-resize": "nesw-resize", "nwse-resize": "nwse-resize", "zoom-in": "zoom-in", "zoom-out": "zoom-out" }, divideColor: ({ theme: r }) => r("borderColor"), divideOpacity: ({ theme: r }) => r("borderOpacity"), divideWidth: ({ theme: r }) => r("borderWidth"), dropShadow: { sm: "0 1px 1px rgb(0 0 0 / 0.05)", DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"], md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"], lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"], xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"], "2xl": "0 25px 25px rgb(0 0 0 / 0.15)", none: "0 0 #0000" }, fill: ({ theme: r }) => r("colors"), grayscale: { 0: "0", DEFAULT: "100%" }, hueRotate: { 0: "0deg", 15: "15deg", 30: "30deg", 60: "60deg", 90: "90deg", 180: "180deg" }, invert: { 0: "0", DEFAULT: "100%" }, flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" }, flexBasis: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%" }), flexGrow: { 0: "0", DEFAULT: "1" }, flexShrink: { 0: "0", DEFAULT: "1" }, fontFamily: { sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"], mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"] }, fontSize: { xs: ["0.75rem", { lineHeight: "1rem" }], sm: ["0.875rem", { lineHeight: "1.25rem" }], base: ["1rem", { lineHeight: "1.5rem" }], lg: ["1.125rem", { lineHeight: "1.75rem" }], xl: ["1.25rem", { lineHeight: "1.75rem" }], "2xl": ["1.5rem", { lineHeight: "2rem" }], "3xl": ["1.875rem", { lineHeight: "2.25rem" }], "4xl": ["2.25rem", { lineHeight: "2.5rem" }], "5xl": ["3rem", { lineHeight: "1" }], "6xl": ["3.75rem", { lineHeight: "1" }], "7xl": ["4.5rem", { lineHeight: "1" }], "8xl": ["6rem", { lineHeight: "1" }], "9xl": ["8rem", { lineHeight: "1" }] }, fontWeight: { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900" }, gap: ({ theme: r }) => r("spacing"), gradientColorStops: ({ theme: r }) => r("colors"), gridAutoColumns: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridAutoRows: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridColumn: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridColumnEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13" }, gridColumnStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13" }, gridRow: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-full": "1 / -1" }, gridRowStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7" }, gridRowEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7" }, gridTemplateColumns: { none: "none", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))" }, gridTemplateRows: { none: "none", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))" }, height: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }), inset: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%" }), keyframes: { spin: { to: { transform: "rotate(360deg)" } }, ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } }, pulse: { "50%": { opacity: ".5" } }, bounce: { "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" }, "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" } } }, letterSpacing: { tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" }, lineHeight: { none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2", 3: ".75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem" }, listStyleType: { none: "none", disc: "disc", decimal: "decimal" }, margin: ({ theme: r }) => ({ auto: "auto", ...r("spacing") }), maxHeight: ({ theme: r }) => ({ ...r("spacing"), full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }), maxWidth: ({ theme: r, breakpoints: n }) => ({ none: "none", 0: "0rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", prose: "65ch", ...n(r("screens")) }), minHeight: { 0: "0px", full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }, minWidth: { 0: "0px", full: "100%", min: "min-content", max: "max-content", fit: "fit-content" }, objectPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, opacity: { 0: "0", 5: "0.05", 10: "0.1", 20: "0.2", 25: "0.25", 30: "0.3", 40: "0.4", 50: "0.5", 60: "0.6", 70: "0.7", 75: "0.75", 80: "0.8", 90: "0.9", 95: "0.95", 100: "1" }, order: { first: "-9999", last: "9999", none: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12" }, padding: ({ theme: r }) => r("spacing"), placeholderColor: ({ theme: r }) => r("colors"), placeholderOpacity: ({ theme: r }) => r("opacity"), outlineColor: ({ theme: r }) => r("colors"), outlineOffset: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, ringColor: ({ theme: r }) => ({ DEFAULT: r("colors.blue.500", "#3b82f6"), ...r("colors") }), ringOffsetColor: ({ theme: r }) => r("colors"), ringOffsetWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, ringOpacity: ({ theme: r }) => ({ DEFAULT: "0.5", ...r("opacity") }), ringWidth: { DEFAULT: "3px", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, rotate: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", 45: "45deg", 90: "90deg", 180: "180deg" }, saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2" }, scale: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5" }, scrollMargin: ({ theme: r }) => ({ ...r("spacing") }), scrollPadding: ({ theme: r }) => r("spacing"), sepia: { 0: "0", DEFAULT: "100%" }, skew: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg" }, space: ({ theme: r }) => ({ ...r("spacing") }), stroke: ({ theme: r }) => r("colors"), strokeWidth: { 0: "0", 1: "1", 2: "2" }, textColor: ({ theme: r }) => r("colors"), textDecorationColor: ({ theme: r }) => r("colors"), textDecorationThickness: { auto: "auto", "from-font": "from-font", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, textUnderlineOffset: { auto: "auto", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, textIndent: ({ theme: r }) => ({ ...r("spacing") }), textOpacity: ({ theme: r }) => r("opacity"), transformOrigin: { center: "center", top: "top", "top-right": "top right", right: "right", "bottom-right": "bottom right", bottom: "bottom", "bottom-left": "bottom left", left: "left", "top-left": "top left" }, transitionDelay: { 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, transitionDuration: { DEFAULT: "150ms", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, transitionProperty: { none: "none", all: "all", DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", colors: "color, background-color, border-color, text-decoration-color, fill, stroke", opacity: "opacity", shadow: "box-shadow", transform: "transform" }, transitionTimingFunction: { DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)", linear: "linear", in: "cubic-bezier(0.4, 0, 1, 1)", out: "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)" }, translate: ({ theme: r }) => ({ ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%" }), width: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", screen: "100vw", min: "min-content", max: "max-content", fit: "fit-content" }), willChange: { auto: "auto", scroll: "scroll-position", contents: "contents", transform: "transform" }, zIndex: { auto: "auto", 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" } }, variantOrder: ["first", "last", "odd", "even", "visited", "checked", "empty", "read-only", "group-hover", "group-focus", "focus-within", "hover", "focus", "focus-visible", "active", "disabled"], plugins: [] };
});
var Zn = {};
Aa(Zn, { default: () => Wu });
var Wu;
var Oa = _a(() => {
  Wu = { info(e, t) {
    console.info(...Array.isArray(e) ? [e] : [t, e]);
  }, warn(e, t) {
    console.warn(...Array.isArray(e) ? [e] : [t, e]);
  }, risk(e, t) {
    console.error(...Array.isArray(e) ? [e] : [t, e]);
  } };
});
var Nv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => i });
  var t = r((Oa(), Xn(Zn)));
  function r(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function n({ version: a, from: o, to: u }) {
    t.default.warn(`${o}-color-renamed`, [`As of Tailwind CSS ${a}, \`${o}\` has been renamed to \`${u}\`.`, "Update your configuration file to silence this warning."]);
  }
  var i = { inherit: "inherit", current: "currentColor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337" }, get lightBlue() {
    return n({ version: "v2.2", from: "lightBlue", to: "sky" }), this.sky;
  }, get warmGray() {
    return n({ version: "v3.0", from: "warmGray", to: "stone" }), this.stone;
  }, get trueGray() {
    return n({ version: "v3.0", from: "trueGray", to: "neutral" }), this.neutral;
  }, get coolGray() {
    return n({ version: "v3.0", from: "coolGray", to: "gray" }), this.gray;
  }, get blueGray() {
    return n({ version: "v3.0", from: "blueGray", to: "slate" }), this.slate;
  } };
});
var Mv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "defaults", { enumerable: true, get: () => t });
  function t(r, ...n) {
    for (let o of n) {
      for (let u in o) {
        var i;
        !(r == null || (i = r.hasOwnProperty) === null || i === void 0) && i.call(r, u) || (r[u] = o[u]);
      }
      for (let u of Object.getOwnPropertySymbols(o)) {
        var a;
        !(r == null || (a = r.hasOwnProperty) === null || a === void 0) && a.call(r, u) || (r[u] = o[u]);
      }
    }
    return r;
  }
});
var Gv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "toPath", { enumerable: true, get: () => t });
  function t(r) {
    if (Array.isArray(r))
      return r;
    let n = r.split("[").length - 1, i = r.split("]").length - 1;
    if (n !== i)
      throw new Error(`Path is invalid. Has unbalanced brackets: ${r}`);
    return r.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
  }
});
var Wv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "normalizeConfig", { enumerable: true, get: () => i });
  var t = n((Oa(), Xn(Zn)));
  function r(a) {
    if (typeof WeakMap != "function")
      return null;
    var o = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
    return (r = function(s) {
      return s ? u : o;
    })(a);
  }
  function n(a, o) {
    if (!o && a && a.__esModule)
      return a;
    if (a === null || typeof a != "object" && typeof a != "function")
      return { default: a };
    var u = r(o);
    if (u && u.has(a))
      return u.get(a);
    var s = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a)
      if (f !== "default" && Object.prototype.hasOwnProperty.call(a, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(a, f) : null;
        c && (c.get || c.set) ? Object.defineProperty(s, f, c) : s[f] = a[f];
      }
    return s.default = a, u && u.set(a, s), s;
  }
  function i(a) {
    if ((() => {
      if (a.purge || !a.content || !Array.isArray(a.content) && !(typeof a.content == "object" && a.content !== null))
        return false;
      if (Array.isArray(a.content))
        return a.content.every((u) => typeof u == "string" ? true : !(typeof u?.raw != "string" || u != null && u.extension && typeof u?.extension != "string"));
      if (typeof a.content == "object" && a.content !== null) {
        if (Object.keys(a.content).some((u) => !["files", "extract", "transform"].includes(u)))
          return false;
        if (Array.isArray(a.content.files)) {
          if (!a.content.files.every((u) => typeof u == "string" ? true : !(typeof u?.raw != "string" || u != null && u.extension && typeof u?.extension != "string")))
            return false;
          if (typeof a.content.extract == "object") {
            for (let u of Object.values(a.content.extract))
              if (typeof u != "function")
                return false;
          } else if (!(a.content.extract === void 0 || typeof a.content.extract == "function"))
            return false;
          if (typeof a.content.transform == "object") {
            for (let u of Object.values(a.content.transform))
              if (typeof u != "function")
                return false;
          } else if (!(a.content.transform === void 0 || typeof a.content.transform == "function"))
            return false;
        }
        return true;
      }
      return false;
    })() || t.default.warn("purge-deprecation", ["The `purge`/`content` options have changed in Tailwind CSS v3.0.", "Update your configuration file to eliminate this warning.", "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"]), a.safelist = (() => {
      var u;
      let { content: s, purge: l, safelist: f } = a;
      return Array.isArray(f) ? f : Array.isArray(s?.safelist) ? s.safelist : Array.isArray(l?.safelist) ? l.safelist : Array.isArray(l == null || (u = l.options) === null || u === void 0 ? void 0 : u.safelist) ? l.options.safelist : [];
    })(), typeof a.prefix == "function")
      t.default.warn("prefix-function", ["As of Tailwind CSS v3.0, `prefix` cannot be a function.", "Update `prefix` in your configuration to be a string to eliminate this warning.", "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"]), a.prefix = "";
    else {
      var o;
      a.prefix = (o = a.prefix) !== null && o !== void 0 ? o : "";
    }
    a.content = { files: (() => {
      let { content: u, purge: s } = a;
      return Array.isArray(s) ? s : Array.isArray(s?.content) ? s.content : Array.isArray(u) ? u : Array.isArray(u?.content) ? u.content : Array.isArray(u?.files) ? u.files : [];
    })(), extract: (() => {
      let u = (() => {
        var f, c, p2, d, D, v, g, y, b, C;
        return !((f = a.purge) === null || f === void 0) && f.extract ? a.purge.extract : !((c = a.content) === null || c === void 0) && c.extract ? a.content.extract : !((p2 = a.purge) === null || p2 === void 0 || (d = p2.extract) === null || d === void 0) && d.DEFAULT ? a.purge.extract.DEFAULT : !((D = a.content) === null || D === void 0 || (v = D.extract) === null || v === void 0) && v.DEFAULT ? a.content.extract.DEFAULT : !((g = a.purge) === null || g === void 0 || (y = g.options) === null || y === void 0) && y.extractors ? a.purge.options.extractors : !((b = a.content) === null || b === void 0 || (C = b.options) === null || C === void 0) && C.extractors ? a.content.options.extractors : {};
      })(), s = {}, l = (() => {
        var f, c, p2, d;
        if (!((f = a.purge) === null || f === void 0 || (c = f.options) === null || c === void 0) && c.defaultExtractor)
          return a.purge.options.defaultExtractor;
        if (!((p2 = a.content) === null || p2 === void 0 || (d = p2.options) === null || d === void 0) && d.defaultExtractor)
          return a.content.options.defaultExtractor;
      })();
      if (l !== void 0 && (s.DEFAULT = l), typeof u == "function")
        s.DEFAULT = u;
      else if (Array.isArray(u))
        for (let { extensions: f, extractor: c } of u ?? [])
          for (let p2 of f)
            s[p2] = c;
      else
        typeof u == "object" && u !== null && Object.assign(s, u);
      return s;
    })(), transform: (() => {
      let u = (() => {
        var l, f, c, p2, d, D;
        return !((l = a.purge) === null || l === void 0) && l.transform ? a.purge.transform : !((f = a.content) === null || f === void 0) && f.transform ? a.content.transform : !((c = a.purge) === null || c === void 0 || (p2 = c.transform) === null || p2 === void 0) && p2.DEFAULT ? a.purge.transform.DEFAULT : !((d = a.content) === null || d === void 0 || (D = d.transform) === null || D === void 0) && D.DEFAULT ? a.content.transform.DEFAULT : {};
      })(), s = {};
      return typeof u == "function" && (s.DEFAULT = u), typeof u == "object" && u !== null && Object.assign(s, u), s;
    })() };
    for (let u of a.content.files)
      if (typeof u == "string" && /{([^,]*?)}/g.test(u)) {
        t.default.warn("invalid-glob-braces", [`The glob pattern ${(0, t.dim)(u)} in your Tailwind CSS configuration is invalid.`, `Update it to ${(0, t.dim)(u.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`]);
        break;
      }
    return a;
  }
});
var $v = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    if (Object.prototype.toString.call(r) !== "[object Object]")
      return false;
    let n = Object.getPrototypeOf(r);
    return n === null || n === Object.prototype;
  }
});
var jv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "cloneDeep", { enumerable: true, get: () => t });
  function t(r) {
    return Array.isArray(r) ? r.map((n) => t(n)) : typeof r == "object" && r !== null ? Object.fromEntries(Object.entries(r).map(([n, i]) => [n, t(i)])) : r;
  }
});
var $u = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = i;
  function r(a) {
    for (var o = a.toLowerCase(), u = "", s = false, l = 0; l < 6 && o[l] !== void 0; l++) {
      var f = o.charCodeAt(l), c = f >= 97 && f <= 102 || f >= 48 && f <= 57;
      if (s = f === 32, !c)
        break;
      u += o[l];
    }
    if (u.length !== 0) {
      var p2 = parseInt(u, 16), d = p2 >= 55296 && p2 <= 57343;
      return d || p2 === 0 || p2 > 1114111 ? ["\uFFFD", u.length + (s ? 1 : 0)] : [String.fromCodePoint(p2), u.length + (s ? 1 : 0)];
    }
  }
  var n = /\\/;
  function i(a) {
    var o = n.test(a);
    if (!o)
      return a;
    for (var u = "", s = 0; s < a.length; s++) {
      if (a[s] === "\\") {
        var l = r(a.slice(s + 1, s + 7));
        if (l !== void 0) {
          u += l[0], s += l[1];
          continue;
        }
        if (a[s + 1] === "\\") {
          u += "\\", s++;
          continue;
        }
        a.length === s + 1 && (u += a[s]);
        continue;
      }
      u += a[s];
    }
    return u;
  }
  t.exports = e.default;
});
var zv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      a[o - 1] = arguments[o];
    for (; a.length > 0; ) {
      var u = a.shift();
      if (!n[u])
        return;
      n = n[u];
    }
    return n;
  }
  t.exports = e.default;
});
var Vv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      a[o - 1] = arguments[o];
    for (; a.length > 0; ) {
      var u = a.shift();
      n[u] || (n[u] = {}), n = n[u];
    }
  }
  t.exports = e.default;
});
var Hv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    for (var i = "", a = n.indexOf("/*"), o = 0; a >= 0; ) {
      i = i + n.slice(o, a);
      var u = n.indexOf("*/", a + 2);
      if (u < 0)
        return i;
      o = u + 2, a = n.indexOf("/*", o);
    }
    return i = i + n.slice(o), i;
  }
  t.exports = e.default;
});
var Jn = le((e) => {
  "use strict";
  e.__esModule = true, e.stripComments = e.ensureObject = e.getProp = e.unesc = void 0;
  var t = a($u());
  e.unesc = t.default;
  var r = a(zv());
  e.getProp = r.default;
  var n = a(Vv());
  e.ensureObject = n.default;
  var i = a(Hv());
  e.stripComments = i.default;
  function a(o) {
    return o && o.__esModule ? o : { default: o };
  }
});
var pr = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = Jn();
  function n(u, s) {
    for (var l = 0; l < s.length; l++) {
      var f = s[l];
      f.enumerable = f.enumerable || false, f.configurable = true, "value" in f && (f.writable = true), Object.defineProperty(u, f.key, f);
    }
  }
  function i(u, s, l) {
    return s && n(u.prototype, s), l && n(u, l), u;
  }
  var a = function u(s, l) {
    if (typeof s != "object" || s === null)
      return s;
    var f = new s.constructor();
    for (var c in s)
      if (s.hasOwnProperty(c)) {
        var p2 = s[c], d = typeof p2;
        c === "parent" && d === "object" ? l && (f[c] = l) : p2 instanceof Array ? f[c] = p2.map(function(D) {
          return u(D, f);
        }) : f[c] = u(p2, f);
      }
    return f;
  }, o = function() {
    function u(l) {
      l === void 0 && (l = {}), Object.assign(this, l), this.spaces = this.spaces || {}, this.spaces.before = this.spaces.before || "", this.spaces.after = this.spaces.after || "";
    }
    var s = u.prototype;
    return s.remove = function() {
      return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
    }, s.replaceWith = function() {
      if (this.parent) {
        for (var l in arguments)
          this.parent.insertBefore(this, arguments[l]);
        this.remove();
      }
      return this;
    }, s.next = function() {
      return this.parent.at(this.parent.index(this) + 1);
    }, s.prev = function() {
      return this.parent.at(this.parent.index(this) - 1);
    }, s.clone = function(l) {
      l === void 0 && (l = {});
      var f = a(this);
      for (var c in l)
        f[c] = l[c];
      return f;
    }, s.appendToPropertyAndEscape = function(l, f, c) {
      this.raws || (this.raws = {});
      var p2 = this[l], d = this.raws[l];
      this[l] = p2 + f, d || c !== f ? this.raws[l] = (d || p2) + c : delete this.raws[l];
    }, s.setPropertyAndEscape = function(l, f, c) {
      this.raws || (this.raws = {}), this[l] = f, this.raws[l] = c;
    }, s.setPropertyWithoutEscape = function(l, f) {
      this[l] = f, this.raws && delete this.raws[l];
    }, s.isAtPosition = function(l, f) {
      if (this.source && this.source.start && this.source.end)
        return !(this.source.start.line > l || this.source.end.line < l || this.source.start.line === l && this.source.start.column > f || this.source.end.line === l && this.source.end.column < f);
    }, s.stringifyProperty = function(l) {
      return this.raws && this.raws[l] || this[l];
    }, s.valueToString = function() {
      return String(this.stringifyProperty("value"));
    }, s.toString = function() {
      return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
    }, i(u, [{ key: "rawSpaceBefore", get: function() {
      var l = this.raws && this.raws.spaces && this.raws.spaces.before;
      return l === void 0 && (l = this.spaces && this.spaces.before), l || "";
    }, set: function(l) {
      (0, r.ensureObject)(this, "raws", "spaces"), this.raws.spaces.before = l;
    } }, { key: "rawSpaceAfter", get: function() {
      var l = this.raws && this.raws.spaces && this.raws.spaces.after;
      return l === void 0 && (l = this.spaces.after), l || "";
    }, set: function(l) {
      (0, r.ensureObject)(this, "raws", "spaces"), this.raws.spaces.after = l;
    } }]), u;
  }();
  e.default = o, t.exports = e.default;
});
var ut = le((e) => {
  "use strict";
  e.__esModule = true, e.UNIVERSAL = e.ATTRIBUTE = e.CLASS = e.COMBINATOR = e.COMMENT = e.ID = e.NESTING = e.PSEUDO = e.ROOT = e.SELECTOR = e.STRING = e.TAG = void 0;
  var t = "tag";
  e.TAG = t;
  var r = "string";
  e.STRING = r;
  var n = "selector";
  e.SELECTOR = n;
  var i = "root";
  e.ROOT = i;
  var a = "pseudo";
  e.PSEUDO = a;
  var o = "nesting";
  e.NESTING = o;
  var u = "id";
  e.ID = u;
  var s = "comment";
  e.COMMENT = s;
  var l = "combinator";
  e.COMBINATOR = l;
  var f = "class";
  e.CLASS = f;
  var c = "attribute";
  e.ATTRIBUTE = c;
  var p2 = "universal";
  e.UNIVERSAL = p2;
});
var La = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = o(pr()), n = a(ut());
  function i() {
    if (typeof WeakMap != "function")
      return null;
    var v = /* @__PURE__ */ new WeakMap();
    return i = function() {
      return v;
    }, v;
  }
  function a(v) {
    if (v && v.__esModule)
      return v;
    if (v === null || typeof v != "object" && typeof v != "function")
      return { default: v };
    var g = i();
    if (g && g.has(v))
      return g.get(v);
    var y = {}, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var C in v)
      if (Object.prototype.hasOwnProperty.call(v, C)) {
        var k = b ? Object.getOwnPropertyDescriptor(v, C) : null;
        k && (k.get || k.set) ? Object.defineProperty(y, C, k) : y[C] = v[C];
      }
    return y.default = v, g && g.set(v, y), y;
  }
  function o(v) {
    return v && v.__esModule ? v : { default: v };
  }
  function u(v, g) {
    var y;
    if (typeof Symbol > "u" || v[Symbol.iterator] == null) {
      if (Array.isArray(v) || (y = s(v)) || g && v && typeof v.length == "number") {
        y && (v = y);
        var b = 0;
        return function() {
          return b >= v.length ? { done: true } : { done: false, value: v[b++] };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    return y = v[Symbol.iterator](), y.next.bind(y);
  }
  function s(v, g) {
    if (v) {
      if (typeof v == "string")
        return l(v, g);
      var y = Object.prototype.toString.call(v).slice(8, -1);
      if (y === "Object" && v.constructor && (y = v.constructor.name), y === "Map" || y === "Set")
        return Array.from(v);
      if (y === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(y))
        return l(v, g);
    }
  }
  function l(v, g) {
    (g == null || g > v.length) && (g = v.length);
    for (var y = 0, b = new Array(g); y < g; y++)
      b[y] = v[y];
    return b;
  }
  function f(v, g) {
    for (var y = 0; y < g.length; y++) {
      var b = g[y];
      b.enumerable = b.enumerable || false, b.configurable = true, "value" in b && (b.writable = true), Object.defineProperty(v, b.key, b);
    }
  }
  function c(v, g, y) {
    return g && f(v.prototype, g), y && f(v, y), v;
  }
  function p2(v, g) {
    v.prototype = Object.create(g.prototype), v.prototype.constructor = v, d(v, g);
  }
  function d(v, g) {
    return d = Object.setPrototypeOf || function(y, b) {
      return y.__proto__ = b, y;
    }, d(v, g);
  }
  var D = function(v) {
    p2(g, v);
    function g(b) {
      var C;
      return C = v.call(this, b) || this, C.nodes || (C.nodes = []), C;
    }
    var y = g.prototype;
    return y.append = function(b) {
      return b.parent = this, this.nodes.push(b), this;
    }, y.prepend = function(b) {
      return b.parent = this, this.nodes.unshift(b), this;
    }, y.at = function(b) {
      return this.nodes[b];
    }, y.index = function(b) {
      return typeof b == "number" ? b : this.nodes.indexOf(b);
    }, y.removeChild = function(b) {
      b = this.index(b), this.at(b).parent = void 0, this.nodes.splice(b, 1);
      var C;
      for (var k in this.indexes)
        C = this.indexes[k], C >= b && (this.indexes[k] = C - 1);
      return this;
    }, y.removeAll = function() {
      for (var b = u(this.nodes), C; !(C = b()).done; ) {
        var k = C.value;
        k.parent = void 0;
      }
      return this.nodes = [], this;
    }, y.empty = function() {
      return this.removeAll();
    }, y.insertAfter = function(b, C) {
      C.parent = this;
      var k = this.index(b);
      this.nodes.splice(k + 1, 0, C), C.parent = this;
      var S;
      for (var E in this.indexes)
        S = this.indexes[E], k <= S && (this.indexes[E] = S + 1);
      return this;
    }, y.insertBefore = function(b, C) {
      C.parent = this;
      var k = this.index(b);
      this.nodes.splice(k, 0, C), C.parent = this;
      var S;
      for (var E in this.indexes)
        S = this.indexes[E], S <= k && (this.indexes[E] = S + 1);
      return this;
    }, y._findChildAtPosition = function(b, C) {
      var k = void 0;
      return this.each(function(S) {
        if (S.atPosition) {
          var E = S.atPosition(b, C);
          if (E)
            return k = E, false;
        } else if (S.isAtPosition(b, C))
          return k = S, false;
      }), k;
    }, y.atPosition = function(b, C) {
      if (this.isAtPosition(b, C))
        return this._findChildAtPosition(b, C) || this;
    }, y._inferEndPosition = function() {
      this.last && this.last.source && this.last.source.end && (this.source = this.source || {}, this.source.end = this.source.end || {}, Object.assign(this.source.end, this.last.source.end));
    }, y.each = function(b) {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach++;
      var C = this.lastEach;
      if (this.indexes[C] = 0, !!this.length) {
        for (var k, S; this.indexes[C] < this.length && (k = this.indexes[C], S = b(this.at(k), k), S !== false); )
          this.indexes[C] += 1;
        if (delete this.indexes[C], S === false)
          return false;
      }
    }, y.walk = function(b) {
      return this.each(function(C, k) {
        var S = b(C, k);
        if (S !== false && C.length && (S = C.walk(b)), S === false)
          return false;
      });
    }, y.walkAttributes = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.ATTRIBUTE)
          return b.call(C, k);
      });
    }, y.walkClasses = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.CLASS)
          return b.call(C, k);
      });
    }, y.walkCombinators = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.COMBINATOR)
          return b.call(C, k);
      });
    }, y.walkComments = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.COMMENT)
          return b.call(C, k);
      });
    }, y.walkIds = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.ID)
          return b.call(C, k);
      });
    }, y.walkNesting = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.NESTING)
          return b.call(C, k);
      });
    }, y.walkPseudos = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.PSEUDO)
          return b.call(C, k);
      });
    }, y.walkTags = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.TAG)
          return b.call(C, k);
      });
    }, y.walkUniversals = function(b) {
      var C = this;
      return this.walk(function(k) {
        if (k.type === n.UNIVERSAL)
          return b.call(C, k);
      });
    }, y.split = function(b) {
      var C = this, k = [];
      return this.reduce(function(S, E, L) {
        var T = b.call(C, E);
        return k.push(E), T ? (S.push(k), k = []) : L === C.length - 1 && S.push(k), S;
      }, []);
    }, y.map = function(b) {
      return this.nodes.map(b);
    }, y.reduce = function(b, C) {
      return this.nodes.reduce(b, C);
    }, y.every = function(b) {
      return this.nodes.every(b);
    }, y.some = function(b) {
      return this.nodes.some(b);
    }, y.filter = function(b) {
      return this.nodes.filter(b);
    }, y.sort = function(b) {
      return this.nodes.sort(b);
    }, y.toString = function() {
      return this.map(String).join("");
    }, c(g, [{ key: "first", get: function() {
      return this.at(0);
    } }, { key: "last", get: function() {
      return this.at(this.length - 1);
    } }, { key: "length", get: function() {
      return this.nodes.length;
    } }]), g;
  }(r.default);
  e.default = D, t.exports = e.default;
});
var ju = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(La()), n = ut();
  function i(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function a(f, c) {
    for (var p2 = 0; p2 < c.length; p2++) {
      var d = c[p2];
      d.enumerable = d.enumerable || false, d.configurable = true, "value" in d && (d.writable = true), Object.defineProperty(f, d.key, d);
    }
  }
  function o(f, c, p2) {
    return c && a(f.prototype, c), p2 && a(f, p2), f;
  }
  function u(f, c) {
    f.prototype = Object.create(c.prototype), f.prototype.constructor = f, s(f, c);
  }
  function s(f, c) {
    return s = Object.setPrototypeOf || function(p2, d) {
      return p2.__proto__ = d, p2;
    }, s(f, c);
  }
  var l = function(f) {
    u(c, f);
    function c(d) {
      var D;
      return D = f.call(this, d) || this, D.type = n.ROOT, D;
    }
    var p2 = c.prototype;
    return p2.toString = function() {
      var d = this.reduce(function(D, v) {
        return D.push(String(v)), D;
      }, []).join(",");
      return this.trailingComma ? d + "," : d;
    }, p2.error = function(d, D) {
      return this._error ? this._error(d, D) : new Error(d);
    }, o(c, [{ key: "errorGenerator", set: function(d) {
      this._error = d;
    } }]), c;
  }(r.default);
  e.default = l, t.exports = e.default;
});
var zu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(La()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.SELECTOR, c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Ia = le((e, t) => {
  "use strict";
  var r = {}, n = r.hasOwnProperty, i = function(l, f) {
    if (!l)
      return f;
    var c = {};
    for (var p2 in f)
      c[p2] = n.call(l, p2) ? l[p2] : f[p2];
    return c;
  }, a = /[ -,\.\/:-@\[-\^`\{-~]/, o = /[ -,\.\/:-@\[\]\^`\{-~]/, u = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, s = function l(f, c) {
    c = i(c, l.options), c.quotes != "single" && c.quotes != "double" && (c.quotes = "single");
    for (var p2 = c.quotes == "double" ? '"' : "'", d = c.isIdentifier, D = f.charAt(0), v = "", g = 0, y = f.length; g < y; ) {
      var b = f.charAt(g++), C = b.charCodeAt(), k = void 0;
      if (C < 32 || C > 126) {
        if (C >= 55296 && C <= 56319 && g < y) {
          var S = f.charCodeAt(g++);
          (S & 64512) == 56320 ? C = ((C & 1023) << 10) + (S & 1023) + 65536 : g--;
        }
        k = "\\" + C.toString(16).toUpperCase() + " ";
      } else
        c.escapeEverything ? a.test(b) ? k = "\\" + b : k = "\\" + C.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(b) ? k = "\\" + C.toString(16).toUpperCase() + " " : b == "\\" || !d && (b == '"' && p2 == b || b == "'" && p2 == b) || d && o.test(b) ? k = "\\" + b : k = b;
      v += k;
    }
    return d && (/^-[-\d]/.test(v) ? v = "\\-" + v.slice(1) : /\d/.test(D) && (v = "\\3" + D + " " + v.slice(1))), v = v.replace(u, function(E, L, T) {
      return L && L.length % 2 ? E : (L || "") + T;
    }), !d && c.wrap ? p2 + v + p2 : v;
  };
  s.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false }, s.version = "3.0.0", t.exports = s;
});
var Vu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = o(Ia()), n = Jn(), i = o(pr()), a = ut();
  function o(p2) {
    return p2 && p2.__esModule ? p2 : { default: p2 };
  }
  function u(p2, d) {
    for (var D = 0; D < d.length; D++) {
      var v = d[D];
      v.enumerable = v.enumerable || false, v.configurable = true, "value" in v && (v.writable = true), Object.defineProperty(p2, v.key, v);
    }
  }
  function s(p2, d, D) {
    return d && u(p2.prototype, d), D && u(p2, D), p2;
  }
  function l(p2, d) {
    p2.prototype = Object.create(d.prototype), p2.prototype.constructor = p2, f(p2, d);
  }
  function f(p2, d) {
    return f = Object.setPrototypeOf || function(D, v) {
      return D.__proto__ = v, D;
    }, f(p2, d);
  }
  var c = function(p2) {
    l(d, p2);
    function d(v) {
      var g;
      return g = p2.call(this, v) || this, g.type = a.CLASS, g._constructed = true, g;
    }
    var D = d.prototype;
    return D.valueToString = function() {
      return "." + p2.prototype.valueToString.call(this);
    }, s(d, [{ key: "value", get: function() {
      return this._value;
    }, set: function(v) {
      if (this._constructed) {
        var g = (0, r.default)(v, { isIdentifier: true });
        g !== v ? ((0, n.ensureObject)(this, "raws"), this.raws.value = g) : this.raws && delete this.raws.value;
      }
      this._value = v;
    } }]), d;
  }(i.default);
  e.default = c, t.exports = e.default;
});
var Hu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(pr()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.COMMENT, c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Xu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(pr()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(c) {
      var p2;
      return p2 = s.call(this, c) || this, p2.type = n.ID, p2;
    }
    var f = l.prototype;
    return f.valueToString = function() {
      return "#" + s.prototype.valueToString.call(this);
    }, l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Pa = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = a(Ia()), n = Jn(), i = a(pr());
  function a(c) {
    return c && c.__esModule ? c : { default: c };
  }
  function o(c, p2) {
    for (var d = 0; d < p2.length; d++) {
      var D = p2[d];
      D.enumerable = D.enumerable || false, D.configurable = true, "value" in D && (D.writable = true), Object.defineProperty(c, D.key, D);
    }
  }
  function u(c, p2, d) {
    return p2 && o(c.prototype, p2), d && o(c, d), c;
  }
  function s(c, p2) {
    c.prototype = Object.create(p2.prototype), c.prototype.constructor = c, l(c, p2);
  }
  function l(c, p2) {
    return l = Object.setPrototypeOf || function(d, D) {
      return d.__proto__ = D, d;
    }, l(c, p2);
  }
  var f = function(c) {
    s(p2, c);
    function p2() {
      return c.apply(this, arguments) || this;
    }
    var d = p2.prototype;
    return d.qualifiedName = function(D) {
      return this.namespace ? this.namespaceString + "|" + D : D;
    }, d.valueToString = function() {
      return this.qualifiedName(c.prototype.valueToString.call(this));
    }, u(p2, [{ key: "namespace", get: function() {
      return this._namespace;
    }, set: function(D) {
      if (D === true || D === "*" || D === "&") {
        this._namespace = D, this.raws && delete this.raws.namespace;
        return;
      }
      var v = (0, r.default)(D, { isIdentifier: true });
      this._namespace = D, v !== D ? ((0, n.ensureObject)(this, "raws"), this.raws.namespace = v) : this.raws && delete this.raws.namespace;
    } }, { key: "ns", get: function() {
      return this._namespace;
    }, set: function(D) {
      this.namespace = D;
    } }, { key: "namespaceString", get: function() {
      if (this.namespace) {
        var D = this.stringifyProperty("namespace");
        return D === true ? "" : D;
      } else
        return "";
    } }]), p2;
  }(i.default);
  e.default = f, t.exports = e.default;
});
var qu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Pa()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.TAG, c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Yu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(pr()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.STRING, c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Zu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(La()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(c) {
      var p2;
      return p2 = s.call(this, c) || this, p2.type = n.PSEUDO, p2;
    }
    var f = l.prototype;
    return f.toString = function() {
      var c = this.length ? "(" + this.map(String).join(",") + ")" : "";
      return [this.rawSpaceBefore, this.stringifyProperty("value"), c, this.rawSpaceAfter].join("");
    }, l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Xv = le((e, t) => {
  t.exports = function(r, n) {
    return function(...i) {
      return console.warn(n), r(...i);
    };
  };
});
var Ju = le((e) => {
  "use strict";
  e.__esModule = true, e.unescapeValue = g, e.default = void 0;
  var t = o(Ia()), r = o($u()), n = o(Pa()), i = ut(), a;
  function o(S) {
    return S && S.__esModule ? S : { default: S };
  }
  function u(S, E) {
    for (var L = 0; L < E.length; L++) {
      var T = E[L];
      T.enumerable = T.enumerable || false, T.configurable = true, "value" in T && (T.writable = true), Object.defineProperty(S, T.key, T);
    }
  }
  function s(S, E, L) {
    return E && u(S.prototype, E), L && u(S, L), S;
  }
  function l(S, E) {
    S.prototype = Object.create(E.prototype), S.prototype.constructor = S, f(S, E);
  }
  function f(S, E) {
    return f = Object.setPrototypeOf || function(L, T) {
      return L.__proto__ = T, L;
    }, f(S, E);
  }
  var c = Xv(), p2 = /^('|")([^]*)\1$/, d = c(function() {
  }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."), D = c(function() {
  }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."), v = c(function() {
  }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
  function g(S) {
    var E = false, L = null, T = S, U = T.match(p2);
    return U && (L = U[1], T = U[2]), T = (0, r.default)(T), T !== S && (E = true), { deprecatedUsage: E, unescaped: T, quoteMark: L };
  }
  function y(S) {
    if (S.quoteMark !== void 0 || S.value === void 0)
      return S;
    v();
    var E = g(S.value), L = E.quoteMark, T = E.unescaped;
    return S.raws || (S.raws = {}), S.raws.value === void 0 && (S.raws.value = S.value), S.value = T, S.quoteMark = L, S;
  }
  var b = function(S) {
    l(E, S);
    function E(T) {
      var U;
      return T === void 0 && (T = {}), U = S.call(this, y(T)) || this, U.type = i.ATTRIBUTE, U.raws = U.raws || {}, Object.defineProperty(U.raws, "unquoted", { get: c(function() {
        return U.value;
      }, "attr.raws.unquoted is deprecated. Call attr.value instead."), set: c(function() {
        return U.value;
      }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.") }), U._constructed = true, U;
    }
    var L = E.prototype;
    return L.getQuotedValue = function(T) {
      T === void 0 && (T = {});
      var U = this._determineQuoteMark(T), M = C[U], H = (0, t.default)(this._value, M);
      return H;
    }, L._determineQuoteMark = function(T) {
      return T.smart ? this.smartQuoteMark(T) : this.preferredQuoteMark(T);
    }, L.setValue = function(T, U) {
      U === void 0 && (U = {}), this._value = T, this._quoteMark = this._determineQuoteMark(U), this._syncRawValue();
    }, L.smartQuoteMark = function(T) {
      var U = this.value, M = U.replace(/[^']/g, "").length, H = U.replace(/[^"]/g, "").length;
      if (M + H === 0) {
        var q = (0, t.default)(U, { isIdentifier: true });
        if (q === U)
          return E.NO_QUOTE;
        var ee = this.preferredQuoteMark(T);
        if (ee === E.NO_QUOTE) {
          var A = this.quoteMark || T.quoteMark || E.DOUBLE_QUOTE, R = C[A], O = (0, t.default)(U, R);
          if (O.length < q.length)
            return A;
        }
        return ee;
      } else
        return H === M ? this.preferredQuoteMark(T) : H < M ? E.DOUBLE_QUOTE : E.SINGLE_QUOTE;
    }, L.preferredQuoteMark = function(T) {
      var U = T.preferCurrentQuoteMark ? this.quoteMark : T.quoteMark;
      return U === void 0 && (U = T.preferCurrentQuoteMark ? T.quoteMark : this.quoteMark), U === void 0 && (U = E.DOUBLE_QUOTE), U;
    }, L._syncRawValue = function() {
      var T = (0, t.default)(this._value, C[this.quoteMark]);
      T === this._value ? this.raws && delete this.raws.value : this.raws.value = T;
    }, L._handleEscapes = function(T, U) {
      if (this._constructed) {
        var M = (0, t.default)(U, { isIdentifier: true });
        M !== U ? this.raws[T] = M : delete this.raws[T];
      }
    }, L._spacesFor = function(T) {
      var U = { before: "", after: "" }, M = this.spaces[T] || {}, H = this.raws.spaces && this.raws.spaces[T] || {};
      return Object.assign(U, M, H);
    }, L._stringFor = function(T, U, M) {
      U === void 0 && (U = T), M === void 0 && (M = k);
      var H = this._spacesFor(U);
      return M(this.stringifyProperty(T), H);
    }, L.offsetOf = function(T) {
      var U = 1, M = this._spacesFor("attribute");
      if (U += M.before.length, T === "namespace" || T === "ns")
        return this.namespace ? U : -1;
      if (T === "attributeNS" || (U += this.namespaceString.length, this.namespace && (U += 1), T === "attribute"))
        return U;
      U += this.stringifyProperty("attribute").length, U += M.after.length;
      var H = this._spacesFor("operator");
      U += H.before.length;
      var q = this.stringifyProperty("operator");
      if (T === "operator")
        return q ? U : -1;
      U += q.length, U += H.after.length;
      var ee = this._spacesFor("value");
      U += ee.before.length;
      var A = this.stringifyProperty("value");
      if (T === "value")
        return A ? U : -1;
      U += A.length, U += ee.after.length;
      var R = this._spacesFor("insensitive");
      return U += R.before.length, T === "insensitive" && this.insensitive ? U : -1;
    }, L.toString = function() {
      var T = this, U = [this.rawSpaceBefore, "["];
      return U.push(this._stringFor("qualifiedAttribute", "attribute")), this.operator && (this.value || this.value === "") && (U.push(this._stringFor("operator")), U.push(this._stringFor("value")), U.push(this._stringFor("insensitiveFlag", "insensitive", function(M, H) {
        return M.length > 0 && !T.quoted && H.before.length === 0 && !(T.spaces.value && T.spaces.value.after) && (H.before = " "), k(M, H);
      }))), U.push("]"), U.push(this.rawSpaceAfter), U.join("");
    }, s(E, [{ key: "quoted", get: function() {
      var T = this.quoteMark;
      return T === "'" || T === '"';
    }, set: function(T) {
      D();
    } }, { key: "quoteMark", get: function() {
      return this._quoteMark;
    }, set: function(T) {
      if (!this._constructed) {
        this._quoteMark = T;
        return;
      }
      this._quoteMark !== T && (this._quoteMark = T, this._syncRawValue());
    } }, { key: "qualifiedAttribute", get: function() {
      return this.qualifiedName(this.raws.attribute || this.attribute);
    } }, { key: "insensitiveFlag", get: function() {
      return this.insensitive ? "i" : "";
    } }, { key: "value", get: function() {
      return this._value;
    }, set: function(T) {
      if (this._constructed) {
        var U = g(T), M = U.deprecatedUsage, H = U.unescaped, q = U.quoteMark;
        if (M && d(), H === this._value && q === this._quoteMark)
          return;
        this._value = H, this._quoteMark = q, this._syncRawValue();
      } else
        this._value = T;
    } }, { key: "attribute", get: function() {
      return this._attribute;
    }, set: function(T) {
      this._handleEscapes("attribute", T), this._attribute = T;
    } }]), E;
  }(n.default);
  e.default = b, b.NO_QUOTE = null, b.SINGLE_QUOTE = "'", b.DOUBLE_QUOTE = '"';
  var C = (a = { "'": { quotes: "single", wrap: true }, '"': { quotes: "double", wrap: true } }, a[null] = { isIdentifier: true }, a);
  function k(S, E) {
    return "" + E.before + S + E.after;
  }
});
var Ku = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Pa()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.UNIVERSAL, c.value = "*", c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Qu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(pr()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.COMBINATOR, c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var el = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(pr()), n = ut();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.NESTING, c.value = "&", c;
    }
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var qv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    return n.sort(function(i, a) {
      return i - a;
    });
  }
  t.exports = e.default;
});
var tl = le((e) => {
  "use strict";
  e.__esModule = true, e.combinator = e.word = e.comment = e.str = e.tab = e.newline = e.feed = e.cr = e.backslash = e.bang = e.slash = e.doubleQuote = e.singleQuote = e.space = e.greaterThan = e.pipe = e.equals = e.plus = e.caret = e.tilde = e.dollar = e.closeSquare = e.openSquare = e.closeParenthesis = e.openParenthesis = e.semicolon = e.colon = e.comma = e.at = e.asterisk = e.ampersand = void 0;
  var t = 38;
  e.ampersand = t;
  var r = 42;
  e.asterisk = r;
  var n = 64;
  e.at = n;
  var i = 44;
  e.comma = i;
  var a = 58;
  e.colon = a;
  var o = 59;
  e.semicolon = o;
  var u = 40;
  e.openParenthesis = u;
  var s = 41;
  e.closeParenthesis = s;
  var l = 91;
  e.openSquare = l;
  var f = 93;
  e.closeSquare = f;
  var c = 36;
  e.dollar = c;
  var p2 = 126;
  e.tilde = p2;
  var d = 94;
  e.caret = d;
  var D = 43;
  e.plus = D;
  var v = 61;
  e.equals = v;
  var g = 124;
  e.pipe = g;
  var y = 62;
  e.greaterThan = y;
  var b = 32;
  e.space = b;
  var C = 39;
  e.singleQuote = C;
  var k = 34;
  e.doubleQuote = k;
  var S = 47;
  e.slash = S;
  var E = 33;
  e.bang = E;
  var L = 92;
  e.backslash = L;
  var T = 13;
  e.cr = T;
  var U = 12;
  e.feed = U;
  var M = 10;
  e.newline = M;
  var H = 9;
  e.tab = H;
  var q = C;
  e.str = q;
  var ee = -1;
  e.comment = ee;
  var A = -2;
  e.word = A;
  var R = -3;
  e.combinator = R;
});
var Yv = le((e) => {
  "use strict";
  e.__esModule = true, e.default = D, e.FIELDS = void 0;
  var t = a(tl()), r, n;
  function i() {
    if (typeof WeakMap != "function")
      return null;
    var v = /* @__PURE__ */ new WeakMap();
    return i = function() {
      return v;
    }, v;
  }
  function a(v) {
    if (v && v.__esModule)
      return v;
    if (v === null || typeof v != "object" && typeof v != "function")
      return { default: v };
    var g = i();
    if (g && g.has(v))
      return g.get(v);
    var y = {}, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var C in v)
      if (Object.prototype.hasOwnProperty.call(v, C)) {
        var k = b ? Object.getOwnPropertyDescriptor(v, C) : null;
        k && (k.get || k.set) ? Object.defineProperty(y, C, k) : y[C] = v[C];
      }
    return y.default = v, g && g.set(v, y), y;
  }
  var o = (r = {}, r[t.tab] = true, r[t.newline] = true, r[t.cr] = true, r[t.feed] = true, r), u = (n = {}, n[t.space] = true, n[t.tab] = true, n[t.newline] = true, n[t.cr] = true, n[t.feed] = true, n[t.ampersand] = true, n[t.asterisk] = true, n[t.bang] = true, n[t.comma] = true, n[t.colon] = true, n[t.semicolon] = true, n[t.openParenthesis] = true, n[t.closeParenthesis] = true, n[t.openSquare] = true, n[t.closeSquare] = true, n[t.singleQuote] = true, n[t.doubleQuote] = true, n[t.plus] = true, n[t.pipe] = true, n[t.tilde] = true, n[t.greaterThan] = true, n[t.equals] = true, n[t.dollar] = true, n[t.caret] = true, n[t.slash] = true, n), s = {}, l = "0123456789abcdefABCDEF";
  for (f = 0; f < l.length; f++)
    s[l.charCodeAt(f)] = true;
  var f;
  function c(v, g) {
    var y = g, b;
    do {
      if (b = v.charCodeAt(y), u[b])
        return y - 1;
      b === t.backslash ? y = p2(v, y) + 1 : y++;
    } while (y < v.length);
    return y - 1;
  }
  function p2(v, g) {
    var y = g, b = v.charCodeAt(y + 1);
    if (!o[b])
      if (s[b]) {
        var C = 0;
        do
          y++, C++, b = v.charCodeAt(y + 1);
        while (s[b] && C < 6);
        C < 6 && b === t.space && y++;
      } else
        y++;
    return y;
  }
  var d = { TYPE: 0, START_LINE: 1, START_COL: 2, END_LINE: 3, END_COL: 4, START_POS: 5, END_POS: 6 };
  e.FIELDS = d;
  function D(v) {
    var g = [], y = v.css.valueOf(), b = y, C = b.length, k = -1, S = 1, E = 0, L = 0, T, U, M, H, q, ee, A, R, O, Y, Z, te, ie;
    function B(z, _) {
      if (v.safe)
        y += _, O = y.length - 1;
      else
        throw v.error("Unclosed " + z, S, E - k, E);
    }
    for (; E < C; ) {
      switch (T = y.charCodeAt(E), T === t.newline && (k = E, S += 1), T) {
        case t.space:
        case t.tab:
        case t.newline:
        case t.cr:
        case t.feed:
          O = E;
          do
            O += 1, T = y.charCodeAt(O), T === t.newline && (k = O, S += 1);
          while (T === t.space || T === t.newline || T === t.tab || T === t.cr || T === t.feed);
          ie = t.space, H = S, M = O - k - 1, L = O;
          break;
        case t.plus:
        case t.greaterThan:
        case t.tilde:
        case t.pipe:
          O = E;
          do
            O += 1, T = y.charCodeAt(O);
          while (T === t.plus || T === t.greaterThan || T === t.tilde || T === t.pipe);
          ie = t.combinator, H = S, M = E - k, L = O;
          break;
        case t.asterisk:
        case t.ampersand:
        case t.bang:
        case t.comma:
        case t.equals:
        case t.dollar:
        case t.caret:
        case t.openSquare:
        case t.closeSquare:
        case t.colon:
        case t.semicolon:
        case t.openParenthesis:
        case t.closeParenthesis:
          O = E, ie = T, H = S, M = E - k, L = O + 1;
          break;
        case t.singleQuote:
        case t.doubleQuote:
          te = T === t.singleQuote ? "'" : '"', O = E;
          do
            for (q = false, O = y.indexOf(te, O + 1), O === -1 && B("quote", te), ee = O; y.charCodeAt(ee - 1) === t.backslash; )
              ee -= 1, q = !q;
          while (q);
          ie = t.str, H = S, M = E - k, L = O + 1;
          break;
        default:
          T === t.slash && y.charCodeAt(E + 1) === t.asterisk ? (O = y.indexOf("*/", E + 2) + 1, O === 0 && B("comment", "*/"), U = y.slice(E, O + 1), R = U.split(`
`), A = R.length - 1, A > 0 ? (Y = S + A, Z = O - R[A].length) : (Y = S, Z = k), ie = t.comment, S = Y, H = Y, M = O - Z) : T === t.slash ? (O = E, ie = T, H = S, M = E - k, L = O + 1) : (O = c(y, E), ie = t.word, H = S, M = O - k), L = O + 1;
          break;
      }
      g.push([ie, S, E - k, H, M, E, L]), Z && (k = Z, Z = null), E = L;
    }
    return g;
  }
});
var Zv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = L(ju()), n = L(zu()), i = L(Vu()), a = L(Hu()), o = L(Xu()), u = L(qu()), s = L(Yu()), l = L(Zu()), f = E(Ju()), c = L(Ku()), p2 = L(Qu()), d = L(el()), D = L(qv()), v = E(Yv()), g = E(tl()), y = E(ut()), b = Jn(), C, k;
  function S() {
    if (typeof WeakMap != "function")
      return null;
    var B = /* @__PURE__ */ new WeakMap();
    return S = function() {
      return B;
    }, B;
  }
  function E(B) {
    if (B && B.__esModule)
      return B;
    if (B === null || typeof B != "object" && typeof B != "function")
      return { default: B };
    var z = S();
    if (z && z.has(B))
      return z.get(B);
    var _ = {}, N = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var ae in B)
      if (Object.prototype.hasOwnProperty.call(B, ae)) {
        var W = N ? Object.getOwnPropertyDescriptor(B, ae) : null;
        W && (W.get || W.set) ? Object.defineProperty(_, ae, W) : _[ae] = B[ae];
      }
    return _.default = B, z && z.set(B, _), _;
  }
  function L(B) {
    return B && B.__esModule ? B : { default: B };
  }
  function T(B, z) {
    for (var _ = 0; _ < z.length; _++) {
      var N = z[_];
      N.enumerable = N.enumerable || false, N.configurable = true, "value" in N && (N.writable = true), Object.defineProperty(B, N.key, N);
    }
  }
  function U(B, z, _) {
    return z && T(B.prototype, z), _ && T(B, _), B;
  }
  var M = (C = {}, C[g.space] = true, C[g.cr] = true, C[g.feed] = true, C[g.newline] = true, C[g.tab] = true, C), H = Object.assign({}, M, (k = {}, k[g.comment] = true, k));
  function q(B) {
    return { line: B[v.FIELDS.START_LINE], column: B[v.FIELDS.START_COL] };
  }
  function ee(B) {
    return { line: B[v.FIELDS.END_LINE], column: B[v.FIELDS.END_COL] };
  }
  function A(B, z, _, N) {
    return { start: { line: B, column: z }, end: { line: _, column: N } };
  }
  function R(B) {
    return A(B[v.FIELDS.START_LINE], B[v.FIELDS.START_COL], B[v.FIELDS.END_LINE], B[v.FIELDS.END_COL]);
  }
  function O(B, z) {
    if (B)
      return A(B[v.FIELDS.START_LINE], B[v.FIELDS.START_COL], z[v.FIELDS.END_LINE], z[v.FIELDS.END_COL]);
  }
  function Y(B, z) {
    var _ = B[z];
    if (typeof _ == "string")
      return _.indexOf("\\") !== -1 && ((0, b.ensureObject)(B, "raws"), B[z] = (0, b.unesc)(_), B.raws[z] === void 0 && (B.raws[z] = _)), B;
  }
  function Z(B, z) {
    for (var _ = -1, N = []; (_ = B.indexOf(z, _ + 1)) !== -1; )
      N.push(_);
    return N;
  }
  function te() {
    var B = Array.prototype.concat.apply([], arguments);
    return B.filter(function(z, _) {
      return _ === B.indexOf(z);
    });
  }
  var ie = function() {
    function B(_, N) {
      N === void 0 && (N = {}), this.rule = _, this.options = Object.assign({ lossy: false, safe: false }, N), this.position = 0, this.css = typeof this.rule == "string" ? this.rule : this.rule.selector, this.tokens = (0, v.default)({ css: this.css, error: this._errorGenerator(), safe: this.options.safe });
      var ae = O(this.tokens[0], this.tokens[this.tokens.length - 1]);
      this.root = new r.default({ source: ae }), this.root.errorGenerator = this._errorGenerator();
      var W = new n.default({ source: { start: { line: 1, column: 1 } } });
      this.root.append(W), this.current = W, this.loop();
    }
    var z = B.prototype;
    return z._errorGenerator = function() {
      var _ = this;
      return function(N, ae) {
        return typeof _.rule == "string" ? new Error(N) : _.rule.error(N, ae);
      };
    }, z.attribute = function() {
      var _ = [], N = this.currToken;
      for (this.position++; this.position < this.tokens.length && this.currToken[v.FIELDS.TYPE] !== g.closeSquare; )
        _.push(this.currToken), this.position++;
      if (this.currToken[v.FIELDS.TYPE] !== g.closeSquare)
        return this.expected("closing square bracket", this.currToken[v.FIELDS.START_POS]);
      var ae = _.length, W = { source: A(N[1], N[2], this.currToken[3], this.currToken[4]), sourceIndex: N[v.FIELDS.START_POS] };
      if (ae === 1 && !~[g.word].indexOf(_[0][v.FIELDS.TYPE]))
        return this.expected("attribute", _[0][v.FIELDS.START_POS]);
      for (var fe = 0, ce = "", ge = "", pe = null, xe = false; fe < ae; ) {
        var _e = _[fe], he = this.content(_e), ye = _[fe + 1];
        switch (_e[v.FIELDS.TYPE]) {
          case g.space:
            if (xe = true, this.options.lossy)
              break;
            if (pe) {
              (0, b.ensureObject)(W, "spaces", pe);
              var Ge = W.spaces[pe].after || "";
              W.spaces[pe].after = Ge + he;
              var tt = (0, b.getProp)(W, "raws", "spaces", pe, "after") || null;
              tt && (W.raws.spaces[pe].after = tt + he);
            } else
              ce = ce + he, ge = ge + he;
            break;
          case g.asterisk:
            if (ye[v.FIELDS.TYPE] === g.equals)
              W.operator = he, pe = "operator";
            else if ((!W.namespace || pe === "namespace" && !xe) && ye) {
              ce && ((0, b.ensureObject)(W, "spaces", "attribute"), W.spaces.attribute.before = ce, ce = ""), ge && ((0, b.ensureObject)(W, "raws", "spaces", "attribute"), W.raws.spaces.attribute.before = ce, ge = ""), W.namespace = (W.namespace || "") + he;
              var We = (0, b.getProp)(W, "raws", "namespace") || null;
              We && (W.raws.namespace += he), pe = "namespace";
            }
            xe = false;
            break;
          case g.dollar:
            if (pe === "value") {
              var Be = (0, b.getProp)(W, "raws", "value");
              W.value += "$", Be && (W.raws.value = Be + "$");
              break;
            }
          case g.caret:
            ye[v.FIELDS.TYPE] === g.equals && (W.operator = he, pe = "operator"), xe = false;
            break;
          case g.combinator:
            if (he === "~" && ye[v.FIELDS.TYPE] === g.equals && (W.operator = he, pe = "operator"), he !== "|") {
              xe = false;
              break;
            }
            ye[v.FIELDS.TYPE] === g.equals ? (W.operator = he, pe = "operator") : !W.namespace && !W.attribute && (W.namespace = true), xe = false;
            break;
          case g.word:
            if (ye && this.content(ye) === "|" && _[fe + 2] && _[fe + 2][v.FIELDS.TYPE] !== g.equals && !W.operator && !W.namespace)
              W.namespace = he, pe = "namespace";
            else if (!W.attribute || pe === "attribute" && !xe) {
              ce && ((0, b.ensureObject)(W, "spaces", "attribute"), W.spaces.attribute.before = ce, ce = ""), ge && ((0, b.ensureObject)(W, "raws", "spaces", "attribute"), W.raws.spaces.attribute.before = ge, ge = ""), W.attribute = (W.attribute || "") + he;
              var He = (0, b.getProp)(W, "raws", "attribute") || null;
              He && (W.raws.attribute += he), pe = "attribute";
            } else if (!W.value && W.value !== "" || pe === "value" && !xe) {
              var rt = (0, b.unesc)(he), nt = (0, b.getProp)(W, "raws", "value") || "", it = W.value || "";
              W.value = it + rt, W.quoteMark = null, (rt !== he || nt) && ((0, b.ensureObject)(W, "raws"), W.raws.value = (nt || it) + he), pe = "value";
            } else {
              var at = he === "i" || he === "I";
              (W.value || W.value === "") && (W.quoteMark || xe) ? (W.insensitive = at, (!at || he === "I") && ((0, b.ensureObject)(W, "raws"), W.raws.insensitiveFlag = he), pe = "insensitive", ce && ((0, b.ensureObject)(W, "spaces", "insensitive"), W.spaces.insensitive.before = ce, ce = ""), ge && ((0, b.ensureObject)(W, "raws", "spaces", "insensitive"), W.raws.spaces.insensitive.before = ge, ge = "")) : (W.value || W.value === "") && (pe = "value", W.value += he, W.raws.value && (W.raws.value += he));
            }
            xe = false;
            break;
          case g.str:
            if (!W.attribute || !W.operator)
              return this.error("Expected an attribute followed by an operator preceding the string.", { index: _e[v.FIELDS.START_POS] });
            var Xe = (0, f.unescapeValue)(he), Ct = Xe.unescaped, Dt = Xe.quoteMark;
            W.value = Ct, W.quoteMark = Dt, pe = "value", (0, b.ensureObject)(W, "raws"), W.raws.value = he, xe = false;
            break;
          case g.equals:
            if (!W.attribute)
              return this.expected("attribute", _e[v.FIELDS.START_POS], he);
            if (W.value)
              return this.error('Unexpected "=" found; an operator was already defined.', { index: _e[v.FIELDS.START_POS] });
            W.operator = W.operator ? W.operator + he : he, pe = "operator", xe = false;
            break;
          case g.comment:
            if (pe)
              if (xe || ye && ye[v.FIELDS.TYPE] === g.space || pe === "insensitive") {
                var ft = (0, b.getProp)(W, "spaces", pe, "after") || "", ct = (0, b.getProp)(W, "raws", "spaces", pe, "after") || ft;
                (0, b.ensureObject)(W, "raws", "spaces", pe), W.raws.spaces[pe].after = ct + he;
              } else {
                var zt = W[pe] || "", lt = (0, b.getProp)(W, "raws", pe) || zt;
                (0, b.ensureObject)(W, "raws"), W.raws[pe] = lt + he;
              }
            else
              ge = ge + he;
            break;
          default:
            return this.error('Unexpected "' + he + '" found.', { index: _e[v.FIELDS.START_POS] });
        }
        fe++;
      }
      Y(W, "attribute"), Y(W, "namespace"), this.newNode(new f.default(W)), this.position++;
    }, z.parseWhitespaceEquivalentTokens = function(_) {
      _ < 0 && (_ = this.tokens.length);
      var N = this.position, ae = [], W = "", fe = void 0;
      do
        if (M[this.currToken[v.FIELDS.TYPE]])
          this.options.lossy || (W += this.content());
        else if (this.currToken[v.FIELDS.TYPE] === g.comment) {
          var ce = {};
          W && (ce.before = W, W = ""), fe = new a.default({ value: this.content(), source: R(this.currToken), sourceIndex: this.currToken[v.FIELDS.START_POS], spaces: ce }), ae.push(fe);
        }
      while (++this.position < _);
      if (W) {
        if (fe)
          fe.spaces.after = W;
        else if (!this.options.lossy) {
          var ge = this.tokens[N], pe = this.tokens[this.position - 1];
          ae.push(new s.default({ value: "", source: A(ge[v.FIELDS.START_LINE], ge[v.FIELDS.START_COL], pe[v.FIELDS.END_LINE], pe[v.FIELDS.END_COL]), sourceIndex: ge[v.FIELDS.START_POS], spaces: { before: W, after: "" } }));
        }
      }
      return ae;
    }, z.convertWhitespaceNodesToSpace = function(_, N) {
      var ae = this;
      N === void 0 && (N = false);
      var W = "", fe = "";
      _.forEach(function(ge) {
        var pe = ae.lossySpace(ge.spaces.before, N), xe = ae.lossySpace(ge.rawSpaceBefore, N);
        W += pe + ae.lossySpace(ge.spaces.after, N && pe.length === 0), fe += pe + ge.value + ae.lossySpace(ge.rawSpaceAfter, N && xe.length === 0);
      }), fe === W && (fe = void 0);
      var ce = { space: W, rawSpace: fe };
      return ce;
    }, z.isNamedCombinator = function(_) {
      return _ === void 0 && (_ = this.position), this.tokens[_ + 0] && this.tokens[_ + 0][v.FIELDS.TYPE] === g.slash && this.tokens[_ + 1] && this.tokens[_ + 1][v.FIELDS.TYPE] === g.word && this.tokens[_ + 2] && this.tokens[_ + 2][v.FIELDS.TYPE] === g.slash;
    }, z.namedCombinator = function() {
      if (this.isNamedCombinator()) {
        var _ = this.content(this.tokens[this.position + 1]), N = (0, b.unesc)(_).toLowerCase(), ae = {};
        N !== _ && (ae.value = "/" + _ + "/");
        var W = new p2.default({ value: "/" + N + "/", source: A(this.currToken[v.FIELDS.START_LINE], this.currToken[v.FIELDS.START_COL], this.tokens[this.position + 2][v.FIELDS.END_LINE], this.tokens[this.position + 2][v.FIELDS.END_COL]), sourceIndex: this.currToken[v.FIELDS.START_POS], raws: ae });
        return this.position = this.position + 3, W;
      } else
        this.unexpected();
    }, z.combinator = function() {
      var _ = this;
      if (this.content() === "|")
        return this.namespace();
      var N = this.locateNextMeaningfulToken(this.position);
      if (N < 0 || this.tokens[N][v.FIELDS.TYPE] === g.comma) {
        var ae = this.parseWhitespaceEquivalentTokens(N);
        if (ae.length > 0) {
          var W = this.current.last;
          if (W) {
            var fe = this.convertWhitespaceNodesToSpace(ae), ce = fe.space, ge = fe.rawSpace;
            ge !== void 0 && (W.rawSpaceAfter += ge), W.spaces.after += ce;
          } else
            ae.forEach(function(nt) {
              return _.newNode(nt);
            });
        }
        return;
      }
      var pe = this.currToken, xe = void 0;
      N > this.position && (xe = this.parseWhitespaceEquivalentTokens(N));
      var _e;
      if (this.isNamedCombinator() ? _e = this.namedCombinator() : this.currToken[v.FIELDS.TYPE] === g.combinator ? (_e = new p2.default({ value: this.content(), source: R(this.currToken), sourceIndex: this.currToken[v.FIELDS.START_POS] }), this.position++) : M[this.currToken[v.FIELDS.TYPE]] || xe || this.unexpected(), _e) {
        if (xe) {
          var he = this.convertWhitespaceNodesToSpace(xe), ye = he.space, Ge = he.rawSpace;
          _e.spaces.before = ye, _e.rawSpaceBefore = Ge;
        }
      } else {
        var tt = this.convertWhitespaceNodesToSpace(xe, true), We = tt.space, Be = tt.rawSpace;
        Be || (Be = We);
        var He = {}, rt = { spaces: {} };
        We.endsWith(" ") && Be.endsWith(" ") ? (He.before = We.slice(0, We.length - 1), rt.spaces.before = Be.slice(0, Be.length - 1)) : We.startsWith(" ") && Be.startsWith(" ") ? (He.after = We.slice(1), rt.spaces.after = Be.slice(1)) : rt.value = Be, _e = new p2.default({ value: " ", source: O(pe, this.tokens[this.position - 1]), sourceIndex: pe[v.FIELDS.START_POS], spaces: He, raws: rt });
      }
      return this.currToken && this.currToken[v.FIELDS.TYPE] === g.space && (_e.spaces.after = this.optionalSpace(this.content()), this.position++), this.newNode(_e);
    }, z.comma = function() {
      if (this.position === this.tokens.length - 1) {
        this.root.trailingComma = true, this.position++;
        return;
      }
      this.current._inferEndPosition();
      var _ = new n.default({ source: { start: q(this.tokens[this.position + 1]) } });
      this.current.parent.append(_), this.current = _, this.position++;
    }, z.comment = function() {
      var _ = this.currToken;
      this.newNode(new a.default({ value: this.content(), source: R(_), sourceIndex: _[v.FIELDS.START_POS] })), this.position++;
    }, z.error = function(_, N) {
      throw this.root.error(_, N);
    }, z.missingBackslash = function() {
      return this.error("Expected a backslash preceding the semicolon.", { index: this.currToken[v.FIELDS.START_POS] });
    }, z.missingParenthesis = function() {
      return this.expected("opening parenthesis", this.currToken[v.FIELDS.START_POS]);
    }, z.missingSquareBracket = function() {
      return this.expected("opening square bracket", this.currToken[v.FIELDS.START_POS]);
    }, z.unexpected = function() {
      return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[v.FIELDS.START_POS]);
    }, z.namespace = function() {
      var _ = this.prevToken && this.content(this.prevToken) || true;
      if (this.nextToken[v.FIELDS.TYPE] === g.word)
        return this.position++, this.word(_);
      if (this.nextToken[v.FIELDS.TYPE] === g.asterisk)
        return this.position++, this.universal(_);
    }, z.nesting = function() {
      if (this.nextToken) {
        var _ = this.content(this.nextToken);
        if (_ === "|") {
          this.position++;
          return;
        }
      }
      var N = this.currToken;
      this.newNode(new d.default({ value: this.content(), source: R(N), sourceIndex: N[v.FIELDS.START_POS] })), this.position++;
    }, z.parentheses = function() {
      var _ = this.current.last, N = 1;
      if (this.position++, _ && _.type === y.PSEUDO) {
        var ae = new n.default({ source: { start: q(this.tokens[this.position - 1]) } }), W = this.current;
        for (_.append(ae), this.current = ae; this.position < this.tokens.length && N; )
          this.currToken[v.FIELDS.TYPE] === g.openParenthesis && N++, this.currToken[v.FIELDS.TYPE] === g.closeParenthesis && N--, N ? this.parse() : (this.current.source.end = ee(this.currToken), this.current.parent.source.end = ee(this.currToken), this.position++);
        this.current = W;
      } else {
        for (var fe = this.currToken, ce = "(", ge; this.position < this.tokens.length && N; )
          this.currToken[v.FIELDS.TYPE] === g.openParenthesis && N++, this.currToken[v.FIELDS.TYPE] === g.closeParenthesis && N--, ge = this.currToken, ce += this.parseParenthesisToken(this.currToken), this.position++;
        _ ? _.appendToPropertyAndEscape("value", ce, ce) : this.newNode(new s.default({ value: ce, source: A(fe[v.FIELDS.START_LINE], fe[v.FIELDS.START_COL], ge[v.FIELDS.END_LINE], ge[v.FIELDS.END_COL]), sourceIndex: fe[v.FIELDS.START_POS] }));
      }
      if (N)
        return this.expected("closing parenthesis", this.currToken[v.FIELDS.START_POS]);
    }, z.pseudo = function() {
      for (var _ = this, N = "", ae = this.currToken; this.currToken && this.currToken[v.FIELDS.TYPE] === g.colon; )
        N += this.content(), this.position++;
      if (!this.currToken)
        return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
      if (this.currToken[v.FIELDS.TYPE] === g.word)
        this.splitWord(false, function(W, fe) {
          N += W, _.newNode(new l.default({ value: N, source: O(ae, _.currToken), sourceIndex: ae[v.FIELDS.START_POS] })), fe > 1 && _.nextToken && _.nextToken[v.FIELDS.TYPE] === g.openParenthesis && _.error("Misplaced parenthesis.", { index: _.nextToken[v.FIELDS.START_POS] });
        });
      else
        return this.expected(["pseudo-class", "pseudo-element"], this.currToken[v.FIELDS.START_POS]);
    }, z.space = function() {
      var _ = this.content();
      this.position === 0 || this.prevToken[v.FIELDS.TYPE] === g.comma || this.prevToken[v.FIELDS.TYPE] === g.openParenthesis || this.current.nodes.every(function(N) {
        return N.type === "comment";
      }) ? (this.spaces = this.optionalSpace(_), this.position++) : this.position === this.tokens.length - 1 || this.nextToken[v.FIELDS.TYPE] === g.comma || this.nextToken[v.FIELDS.TYPE] === g.closeParenthesis ? (this.current.last.spaces.after = this.optionalSpace(_), this.position++) : this.combinator();
    }, z.string = function() {
      var _ = this.currToken;
      this.newNode(new s.default({ value: this.content(), source: R(_), sourceIndex: _[v.FIELDS.START_POS] })), this.position++;
    }, z.universal = function(_) {
      var N = this.nextToken;
      if (N && this.content(N) === "|")
        return this.position++, this.namespace();
      var ae = this.currToken;
      this.newNode(new c.default({ value: this.content(), source: R(ae), sourceIndex: ae[v.FIELDS.START_POS] }), _), this.position++;
    }, z.splitWord = function(_, N) {
      for (var ae = this, W = this.nextToken, fe = this.content(); W && ~[g.dollar, g.caret, g.equals, g.word].indexOf(W[v.FIELDS.TYPE]); ) {
        this.position++;
        var ce = this.content();
        if (fe += ce, ce.lastIndexOf("\\") === ce.length - 1) {
          var ge = this.nextToken;
          ge && ge[v.FIELDS.TYPE] === g.space && (fe += this.requiredSpace(this.content(ge)), this.position++);
        }
        W = this.nextToken;
      }
      var pe = Z(fe, ".").filter(function(ye) {
        var Ge = fe[ye - 1] === "\\", tt = /^\d+\.\d+%$/.test(fe);
        return !Ge && !tt;
      }), xe = Z(fe, "#").filter(function(ye) {
        return fe[ye - 1] !== "\\";
      }), _e = Z(fe, "#{");
      _e.length && (xe = xe.filter(function(ye) {
        return !~_e.indexOf(ye);
      }));
      var he = (0, D.default)(te([0].concat(pe, xe)));
      he.forEach(function(ye, Ge) {
        var tt = he[Ge + 1] || fe.length, We = fe.slice(ye, tt);
        if (Ge === 0 && N)
          return N.call(ae, We, he.length);
        var Be, He = ae.currToken, rt = He[v.FIELDS.START_POS] + he[Ge], nt = A(He[1], He[2] + ye, He[3], He[2] + (tt - 1));
        if (~pe.indexOf(ye)) {
          var it = { value: We.slice(1), source: nt, sourceIndex: rt };
          Be = new i.default(Y(it, "value"));
        } else if (~xe.indexOf(ye)) {
          var at = { value: We.slice(1), source: nt, sourceIndex: rt };
          Be = new o.default(Y(at, "value"));
        } else {
          var Xe = { value: We, source: nt, sourceIndex: rt };
          Y(Xe, "value"), Be = new u.default(Xe);
        }
        ae.newNode(Be, _), _ = null;
      }), this.position++;
    }, z.word = function(_) {
      var N = this.nextToken;
      return N && this.content(N) === "|" ? (this.position++, this.namespace()) : this.splitWord(_);
    }, z.loop = function() {
      for (; this.position < this.tokens.length; )
        this.parse(true);
      return this.current._inferEndPosition(), this.root;
    }, z.parse = function(_) {
      switch (this.currToken[v.FIELDS.TYPE]) {
        case g.space:
          this.space();
          break;
        case g.comment:
          this.comment();
          break;
        case g.openParenthesis:
          this.parentheses();
          break;
        case g.closeParenthesis:
          _ && this.missingParenthesis();
          break;
        case g.openSquare:
          this.attribute();
          break;
        case g.dollar:
        case g.caret:
        case g.equals:
        case g.word:
          this.word();
          break;
        case g.colon:
          this.pseudo();
          break;
        case g.comma:
          this.comma();
          break;
        case g.asterisk:
          this.universal();
          break;
        case g.ampersand:
          this.nesting();
          break;
        case g.slash:
        case g.combinator:
          this.combinator();
          break;
        case g.str:
          this.string();
          break;
        case g.closeSquare:
          this.missingSquareBracket();
        case g.semicolon:
          this.missingBackslash();
        default:
          this.unexpected();
      }
    }, z.expected = function(_, N, ae) {
      if (Array.isArray(_)) {
        var W = _.pop();
        _ = _.join(", ") + " or " + W;
      }
      var fe = /^[aeiou]/.test(_[0]) ? "an" : "a";
      return ae ? this.error("Expected " + fe + " " + _ + ', found "' + ae + '" instead.', { index: N }) : this.error("Expected " + fe + " " + _ + ".", { index: N });
    }, z.requiredSpace = function(_) {
      return this.options.lossy ? " " : _;
    }, z.optionalSpace = function(_) {
      return this.options.lossy ? "" : _;
    }, z.lossySpace = function(_, N) {
      return this.options.lossy ? N ? " " : "" : _;
    }, z.parseParenthesisToken = function(_) {
      var N = this.content(_);
      return _[v.FIELDS.TYPE] === g.space ? this.requiredSpace(N) : N;
    }, z.newNode = function(_, N) {
      return N && (/^ +$/.test(N) && (this.options.lossy || (this.spaces = (this.spaces || "") + N), N = true), _.namespace = N, Y(_, "namespace")), this.spaces && (_.spaces.before = this.spaces, this.spaces = ""), this.current.append(_);
    }, z.content = function(_) {
      return _ === void 0 && (_ = this.currToken), this.css.slice(_[v.FIELDS.START_POS], _[v.FIELDS.END_POS]);
    }, z.locateNextMeaningfulToken = function(_) {
      _ === void 0 && (_ = this.position + 1);
      for (var N = _; N < this.tokens.length; )
        if (H[this.tokens[N][v.FIELDS.TYPE]]) {
          N++;
          continue;
        } else
          return N;
      return -1;
    }, U(B, [{ key: "currToken", get: function() {
      return this.tokens[this.position];
    } }, { key: "nextToken", get: function() {
      return this.tokens[this.position + 1];
    } }, { key: "prevToken", get: function() {
      return this.tokens[this.position - 1];
    } }]), B;
  }();
  e.default = ie, t.exports = e.default;
});
var Jv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = n(Zv());
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var i = function() {
    function a(u, s) {
      this.func = u || function() {
      }, this.funcRes = null, this.options = s;
    }
    var o = a.prototype;
    return o._shouldUpdateSelector = function(u, s) {
      s === void 0 && (s = {});
      var l = Object.assign({}, this.options, s);
      return l.updateSelector === false ? false : typeof u != "string";
    }, o._isLossy = function(u) {
      u === void 0 && (u = {});
      var s = Object.assign({}, this.options, u);
      return s.lossless === false;
    }, o._root = function(u, s) {
      s === void 0 && (s = {});
      var l = new r.default(u, this._parseOptions(s));
      return l.root;
    }, o._parseOptions = function(u) {
      return { lossy: this._isLossy(u) };
    }, o._run = function(u, s) {
      var l = this;
      return s === void 0 && (s = {}), new Promise(function(f, c) {
        try {
          var p2 = l._root(u, s);
          Promise.resolve(l.func(p2)).then(function(d) {
            var D = void 0;
            return l._shouldUpdateSelector(u, s) && (D = p2.toString(), u.selector = D), { transform: d, root: p2, string: D };
          }).then(f, c);
        } catch (d) {
          c(d);
          return;
        }
      });
    }, o._runSync = function(u, s) {
      s === void 0 && (s = {});
      var l = this._root(u, s), f = this.func(l);
      if (f && typeof f.then == "function")
        throw new Error("Selector processor returned a promise to a synchronous call.");
      var c = void 0;
      return s.updateSelector && typeof u != "string" && (c = l.toString(), u.selector = c), { transform: f, root: l, string: c };
    }, o.ast = function(u, s) {
      return this._run(u, s).then(function(l) {
        return l.root;
      });
    }, o.astSync = function(u, s) {
      return this._runSync(u, s).root;
    }, o.transform = function(u, s) {
      return this._run(u, s).then(function(l) {
        return l.transform;
      });
    }, o.transformSync = function(u, s) {
      return this._runSync(u, s).transform;
    }, o.process = function(u, s) {
      return this._run(u, s).then(function(l) {
        return l.string || l.root.toString();
      });
    }, o.processSync = function(u, s) {
      var l = this._runSync(u, s);
      return l.string || l.root.toString();
    }, a;
  }();
  e.default = i, t.exports = e.default;
});
var Kv = le((e) => {
  "use strict";
  e.__esModule = true, e.universal = e.tag = e.string = e.selector = e.root = e.pseudo = e.nesting = e.id = e.comment = e.combinator = e.className = e.attribute = void 0;
  var t = d(Ju()), r = d(Vu()), n = d(Qu()), i = d(Hu()), a = d(Xu()), o = d(el()), u = d(Zu()), s = d(ju()), l = d(zu()), f = d(Yu()), c = d(qu()), p2 = d(Ku());
  function d(M) {
    return M && M.__esModule ? M : { default: M };
  }
  var D = function(M) {
    return new t.default(M);
  };
  e.attribute = D;
  var v = function(M) {
    return new r.default(M);
  };
  e.className = v;
  var g = function(M) {
    return new n.default(M);
  };
  e.combinator = g;
  var y = function(M) {
    return new i.default(M);
  };
  e.comment = y;
  var b = function(M) {
    return new a.default(M);
  };
  e.id = b;
  var C = function(M) {
    return new o.default(M);
  };
  e.nesting = C;
  var k = function(M) {
    return new u.default(M);
  };
  e.pseudo = k;
  var S = function(M) {
    return new s.default(M);
  };
  e.root = S;
  var E = function(M) {
    return new l.default(M);
  };
  e.selector = E;
  var L = function(M) {
    return new f.default(M);
  };
  e.string = L;
  var T = function(M) {
    return new c.default(M);
  };
  e.tag = T;
  var U = function(M) {
    return new p2.default(M);
  };
  e.universal = U;
});
var Qv = le((e) => {
  "use strict";
  e.__esModule = true, e.isNode = i, e.isPseudoElement = b, e.isPseudoClass = C, e.isContainer = k, e.isNamespace = S, e.isUniversal = e.isTag = e.isString = e.isSelector = e.isRoot = e.isPseudo = e.isNesting = e.isIdentifier = e.isComment = e.isCombinator = e.isClassName = e.isAttribute = void 0;
  var t = ut(), r, n = (r = {}, r[t.ATTRIBUTE] = true, r[t.CLASS] = true, r[t.COMBINATOR] = true, r[t.COMMENT] = true, r[t.ID] = true, r[t.NESTING] = true, r[t.PSEUDO] = true, r[t.ROOT] = true, r[t.SELECTOR] = true, r[t.STRING] = true, r[t.TAG] = true, r[t.UNIVERSAL] = true, r);
  function i(E) {
    return typeof E == "object" && n[E.type];
  }
  function a(E, L) {
    return i(L) && L.type === E;
  }
  var o = a.bind(null, t.ATTRIBUTE);
  e.isAttribute = o;
  var u = a.bind(null, t.CLASS);
  e.isClassName = u;
  var s = a.bind(null, t.COMBINATOR);
  e.isCombinator = s;
  var l = a.bind(null, t.COMMENT);
  e.isComment = l;
  var f = a.bind(null, t.ID);
  e.isIdentifier = f;
  var c = a.bind(null, t.NESTING);
  e.isNesting = c;
  var p2 = a.bind(null, t.PSEUDO);
  e.isPseudo = p2;
  var d = a.bind(null, t.ROOT);
  e.isRoot = d;
  var D = a.bind(null, t.SELECTOR);
  e.isSelector = D;
  var v = a.bind(null, t.STRING);
  e.isString = v;
  var g = a.bind(null, t.TAG);
  e.isTag = g;
  var y = a.bind(null, t.UNIVERSAL);
  e.isUniversal = y;
  function b(E) {
    return p2(E) && E.value && (E.value.startsWith("::") || E.value.toLowerCase() === ":before" || E.value.toLowerCase() === ":after" || E.value.toLowerCase() === ":first-letter" || E.value.toLowerCase() === ":first-line");
  }
  function C(E) {
    return p2(E) && !b(E);
  }
  function k(E) {
    return !!(i(E) && E.walk);
  }
  function S(E) {
    return o(E) || g(E);
  }
});
var eg = le((e) => {
  "use strict";
  e.__esModule = true;
  var t = ut();
  Object.keys(t).forEach(function(i) {
    i === "default" || i === "__esModule" || i in e && e[i] === t[i] || (e[i] = t[i]);
  });
  var r = Kv();
  Object.keys(r).forEach(function(i) {
    i === "default" || i === "__esModule" || i in e && e[i] === r[i] || (e[i] = r[i]);
  });
  var n = Qv();
  Object.keys(n).forEach(function(i) {
    i === "default" || i === "__esModule" || i in e && e[i] === n[i] || (e[i] = n[i]);
  });
});
var tg = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = o(Jv()), n = a(eg());
  function i() {
    if (typeof WeakMap != "function")
      return null;
    var l = /* @__PURE__ */ new WeakMap();
    return i = function() {
      return l;
    }, l;
  }
  function a(l) {
    if (l && l.__esModule)
      return l;
    if (l === null || typeof l != "object" && typeof l != "function")
      return { default: l };
    var f = i();
    if (f && f.has(l))
      return f.get(l);
    var c = {}, p2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var d in l)
      if (Object.prototype.hasOwnProperty.call(l, d)) {
        var D = p2 ? Object.getOwnPropertyDescriptor(l, d) : null;
        D && (D.get || D.set) ? Object.defineProperty(c, d, D) : c[d] = l[d];
      }
    return c.default = l, f && f.set(l, c), c;
  }
  function o(l) {
    return l && l.__esModule ? l : { default: l };
  }
  var u = function(l) {
    return new r.default(l);
  };
  Object.assign(u, n), delete u.__esModule;
  var s = u;
  e.default = s, t.exports = e.default;
});
var rg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    return r.replace(/\\,/g, "\\2c ");
  }
});
var ng = le((e, t) => {
  "use strict";
  t.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
});
var rl = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(D, v) {
    for (var g in v)
      Object.defineProperty(D, g, { enumerable: true, get: v[g] });
  }
  t(e, { parseColor: () => p2, formatColor: () => d });
  var r = n(ng());
  function n(D) {
    return D && D.__esModule ? D : { default: D };
  }
  var i = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, a = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, o = /(?:\d+|\d*\.\d+)%?/, u = /(?:\s*,\s*|\s+)/, s = /\s*[,/]\s*/, l = /var\(--(?:[^ )]*?)\)/, f = new RegExp(`^(rgb)a?\\(\\s*(${o.source}|${l.source})(?:${u.source}(${o.source}|${l.source}))?(?:${u.source}(${o.source}|${l.source}))?(?:${s.source}(${o.source}|${l.source}))?\\s*\\)$`), c = new RegExp(`^(hsl)a?\\(\\s*((?:${o.source})(?:deg|rad|grad|turn)?|${l.source})(?:${u.source}(${o.source}|${l.source}))?(?:${u.source}(${o.source}|${l.source}))?(?:${s.source}(${o.source}|${l.source}))?\\s*\\)$`);
  function p2(D, { loose: v = false } = {}) {
    var g, y;
    if (typeof D != "string")
      return null;
    if (D = D.trim(), D === "transparent")
      return { mode: "rgb", color: ["0", "0", "0"], alpha: "0" };
    if (D in r.default)
      return { mode: "rgb", color: r.default[D].map((E) => E.toString()) };
    let b = D.replace(a, (E, L, T, U, M) => ["#", L, L, T, T, U, U, M ? M + M : ""].join("")).match(i);
    if (b !== null)
      return { mode: "rgb", color: [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)].map((E) => E.toString()), alpha: b[4] ? (parseInt(b[4], 16) / 255).toString() : void 0 };
    var C;
    let k = (C = D.match(f)) !== null && C !== void 0 ? C : D.match(c);
    if (k === null)
      return null;
    let S = [k[2], k[3], k[4]].filter(Boolean).map((E) => E.toString());
    return !v && S.length !== 3 || S.length < 3 && !S.some((E) => /^var\(.*?\)$/.test(E)) ? null : { mode: k[1], color: S, alpha: (g = k[5]) === null || g === void 0 || (y = g.toString) === null || y === void 0 ? void 0 : y.call(g) };
  }
  function d({ mode: D, color: v, alpha: g }) {
    let y = g !== void 0;
    return `${D}(${v.join(" ")}${y ? ` / ${g}` : ""})`;
  }
});
var nl = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(a, o) {
    for (var u in o)
      Object.defineProperty(a, u, { enumerable: true, get: o[u] });
  }
  t(e, { withAlphaValue: () => n, default: () => i });
  var r = rl();
  function n(a, o, u) {
    if (typeof a == "function")
      return a({ opacityValue: o });
    let s = (0, r.parseColor)(a, { loose: true });
    return s === null ? u : (0, r.formatColor)({ ...s, alpha: o });
  }
  function i({ color: a, property: o, variable: u }) {
    let s = [].concat(o);
    if (typeof a == "function")
      return { [u]: "1", ...Object.fromEntries(s.map((f) => [f, a({ opacityVariable: u, opacityValue: `var(${u})` })])) };
    let l = (0, r.parseColor)(a);
    return l === null ? Object.fromEntries(s.map((f) => [f, a])) : l.alpha !== void 0 ? Object.fromEntries(s.map((f) => [f, a])) : { [u]: "1", ...Object.fromEntries(s.map((f) => [f, (0, r.formatColor)({ ...l, alpha: `var(${u})` })])) };
  }
});
var ig = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(p2, d) {
    for (var D in d)
      Object.defineProperty(p2, D, { enumerable: true, get: d[D] });
  }
  t(e, { pattern: () => a, withoutCapturing: () => o, any: () => u, optional: () => s, zeroOrMore: () => l, nestedBrackets: () => f, escape: () => c });
  var r = /[\\^$.*+?()[\]{}|]/g, n = RegExp(r.source);
  function i(p2) {
    return p2 = Array.isArray(p2) ? p2 : [p2], p2 = p2.map((d) => d instanceof RegExp ? d.source : d), p2.join("");
  }
  function a(p2) {
    return new RegExp(i(p2), "g");
  }
  function o(p2) {
    return new RegExp(`(?:${i(p2)})`, "g");
  }
  function u(p2) {
    return `(?:${p2.map(i).join("|")})`;
  }
  function s(p2) {
    return `(?:${i(p2)})?`;
  }
  function l(p2) {
    return `(?:${i(p2)})*`;
  }
  function f(p2, d, D = 1) {
    return o([c(p2), /[^\s]*/, D === 1 ? `[^${c(p2)}${c(d)}s]*` : u([`[^${c(p2)}${c(d)}s]*`, f(p2, d, D - 1)]), /[^\s]*/, c(d)]);
  }
  function c(p2) {
    return p2 && n.test(p2) ? p2.replace(r, "\\$&") : p2 || "";
  }
});
var ag = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "splitAtTopLevelOnly", { enumerable: true, get: () => i });
  var t = n(ig());
  function r(a) {
    if (typeof WeakMap != "function")
      return null;
    var o = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
    return (r = function(s) {
      return s ? u : o;
    })(a);
  }
  function n(a, o) {
    if (!o && a && a.__esModule)
      return a;
    if (a === null || typeof a != "object" && typeof a != "function")
      return { default: a };
    var u = r(o);
    if (u && u.has(a))
      return u.get(a);
    var s = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a)
      if (f !== "default" && Object.prototype.hasOwnProperty.call(a, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(a, f) : null;
        c && (c.get || c.set) ? Object.defineProperty(s, f, c) : s[f] = a[f];
      }
    return s.default = a, u && u.set(a, s), s;
  }
  function* i(a, o) {
    let u = new RegExp(`[(){}\\[\\]${t.escape(o)}]`, "g"), s = 0, l = 0, f = false, c = 0, p2 = 0, d = o.length;
    for (let D of a.matchAll(u)) {
      let v = D[0] === o[c], g = c === d - 1, y = v && g;
      D[0] === "(" && s++, D[0] === ")" && s--, D[0] === "[" && s++, D[0] === "]" && s--, D[0] === "{" && s++, D[0] === "}" && s--, v && s === 0 && (p2 === 0 && (p2 = D.index), c++), y && s === 0 && (f = true, yield a.substring(l, p2), l = p2 + d), c === d && (c = 0, p2 = 0);
    }
    f ? yield a.substring(l) : yield a;
  }
});
var og = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(s, l) {
    for (var f in l)
      Object.defineProperty(s, f, { enumerable: true, get: l[f] });
  }
  t(e, { parseBoxShadowValue: () => o, formatBoxShadowValue: () => u });
  var r = ag(), n = /* @__PURE__ */ new Set(["inset", "inherit", "initial", "revert", "unset"]), i = /\ +(?![^(]*\))/g, a = /^-?(\d+|\.\d+)(.*?)$/g;
  function o(s) {
    return Array.from((0, r.splitAtTopLevelOnly)(s, ",")).map((l) => {
      let f = l.trim(), c = { raw: f }, p2 = f.split(i), d = /* @__PURE__ */ new Set();
      for (let D of p2)
        a.lastIndex = 0, !d.has("KEYWORD") && n.has(D) ? (c.keyword = D, d.add("KEYWORD")) : a.test(D) ? d.has("X") ? d.has("Y") ? d.has("BLUR") ? d.has("SPREAD") || (c.spread = D, d.add("SPREAD")) : (c.blur = D, d.add("BLUR")) : (c.y = D, d.add("Y")) : (c.x = D, d.add("X")) : c.color ? (c.unknown || (c.unknown = []), c.unknown.push(D)) : c.color = D;
      return c.valid = c.x !== void 0 && c.y !== void 0, c;
    });
  }
  function u(s) {
    return s.map((l) => l.valid ? [l.keyword, l.x, l.y, l.blur, l.spread, l.color].filter(Boolean).join(" ") : l.raw).join(", ");
  }
});
var sg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(A, R) {
    for (var O in R)
      Object.defineProperty(A, O, { enumerable: true, get: R[O] });
  }
  t(e, { normalize: () => u, url: () => s, number: () => l, percentage: () => f, length: () => d, lineWidth: () => v, shadow: () => g, color: () => y, image: () => b, gradient: () => k, position: () => E, familyName: () => L, genericName: () => U, absoluteSize: () => H, relativeSize: () => ee });
  var r = rl(), n = og(), i = ["min", "max", "clamp", "calc"], a = /,(?![^(]*\))/g, o = /_(?![^(]*\))/g;
  function u(A, R = true) {
    return A.includes("url(") ? A.split(/(url\(.*?\))/g).filter(Boolean).map((O) => /^url\(.*?\)$/.test(O) ? O : u(O, false)).join("") : (A = A.replace(/([^\\])_+/g, (O, Y) => Y + " ".repeat(O.length - 1)).replace(/^_/g, " ").replace(/\\_/g, "_"), R && (A = A.trim()), A = A.replace(/(calc|min|max|clamp)\(.+\)/g, (O) => O.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ")), A);
  }
  function s(A) {
    return A.startsWith("url(");
  }
  function l(A) {
    return !isNaN(Number(A)) || i.some((R) => new RegExp(`^${R}\\(.+?`).test(A));
  }
  function f(A) {
    return A.split(o).every((R) => /%$/g.test(R) || i.some((O) => new RegExp(`^${O}\\(.+?%`).test(R)));
  }
  var c = ["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "vw", "vh", "vmin", "vmax"], p2 = `(?:${c.join("|")})`;
  function d(A) {
    return A.split(o).every((R) => R === "0" || new RegExp(`${p2}$`).test(R) || i.some((O) => new RegExp(`^${O}\\(.+?${p2}`).test(R)));
  }
  var D = /* @__PURE__ */ new Set(["thin", "medium", "thick"]);
  function v(A) {
    return D.has(A);
  }
  function g(A) {
    let R = (0, n.parseBoxShadowValue)(u(A));
    for (let O of R)
      if (!O.valid)
        return false;
    return true;
  }
  function y(A) {
    let R = 0;
    return A.split(o).every((O) => (O = u(O), O.startsWith("var(") ? true : (0, r.parseColor)(O, { loose: true }) !== null ? (R++, true) : false)) ? R > 0 : false;
  }
  function b(A) {
    let R = 0;
    return A.split(a).every((O) => (O = u(O), O.startsWith("var(") ? true : s(O) || k(O) || ["element(", "image(", "cross-fade(", "image-set("].some((Y) => O.startsWith(Y)) ? (R++, true) : false)) ? R > 0 : false;
  }
  var C = /* @__PURE__ */ new Set(["linear-gradient", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "conic-gradient"]);
  function k(A) {
    A = u(A);
    for (let R of C)
      if (A.startsWith(`${R}(`))
        return true;
    return false;
  }
  var S = /* @__PURE__ */ new Set(["center", "top", "right", "bottom", "left"]);
  function E(A) {
    let R = 0;
    return A.split(o).every((O) => (O = u(O), O.startsWith("var(") ? true : S.has(O) || d(O) || f(O) ? (R++, true) : false)) ? R > 0 : false;
  }
  function L(A) {
    let R = 0;
    return A.split(a).every((O) => (O = u(O), O.startsWith("var(") ? true : O.includes(" ") && !/(['"])([^"']+)\1/g.test(O) || /^\d/g.test(O) ? false : (R++, true))) ? R > 0 : false;
  }
  var T = /* @__PURE__ */ new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]);
  function U(A) {
    return T.has(A);
  }
  var M = /* @__PURE__ */ new Set(["xx-small", "x-small", "small", "medium", "large", "x-large", "x-large", "xxx-large"]);
  function H(A) {
    return M.has(A);
  }
  var q = /* @__PURE__ */ new Set(["larger", "smaller"]);
  function ee(A) {
    return q.has(A);
  }
});
var ug = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(E, L) {
    for (var T in L)
      Object.defineProperty(E, T, { enumerable: true, get: L[T] });
  }
  t(e, { updateAllClasses: () => s, asValue: () => c, parseColorFormat: () => D, asColor: () => v, asLookupValue: () => g, coerceValue: () => S });
  var r = u(tg()), n = u(rg()), i = nl(), a = sg(), o = u(Mu());
  function u(E) {
    return E && E.__esModule ? E : { default: E };
  }
  function s(E, L) {
    return (0, r.default)((T) => {
      T.walkClasses((U) => {
        let M = L(U.value);
        U.value = M, U.raws && U.raws.value && (U.raws.value = (0, n.default)(U.raws.value));
      });
    }).processSync(E);
  }
  function l(E, L) {
    if (!p2(E))
      return;
    let T = E.slice(1, -1);
    if (L(T))
      return (0, a.normalize)(T);
  }
  function f(E, L = {}, T) {
    let U = L[E];
    if (U !== void 0)
      return (0, o.default)(U);
    if (p2(E)) {
      let M = l(E, T);
      return M === void 0 ? void 0 : (0, o.default)(M);
    }
  }
  function c(E, L = {}, { validate: T = () => true } = {}) {
    var U;
    let M = (U = L.values) === null || U === void 0 ? void 0 : U[E];
    return M !== void 0 ? M : L.supportsNegativeValues && E.startsWith("-") ? f(E.slice(1), L.values, T) : l(E, T);
  }
  function p2(E) {
    return E.startsWith("[") && E.endsWith("]");
  }
  function d(E) {
    let L = E.lastIndexOf("/");
    return L === -1 || L === E.length - 1 ? [E] : [E.slice(0, L), E.slice(L + 1)];
  }
  function D(E) {
    if (typeof E == "string" && E.includes("<alpha-value>")) {
      let L = E;
      return ({ opacityValue: T = 1 }) => L.replace("<alpha-value>", T);
    }
    return E;
  }
  function v(E, L = {}, { tailwindConfig: T = {} } = {}) {
    var U;
    if (((U = L.values) === null || U === void 0 ? void 0 : U[E]) !== void 0) {
      var M;
      return D((M = L.values) === null || M === void 0 ? void 0 : M[E]);
    }
    let [H, q] = d(E);
    if (q !== void 0) {
      var ee, A, R, O;
      let Y = (O = (ee = L.values) === null || ee === void 0 ? void 0 : ee[H]) !== null && O !== void 0 ? O : p2(H) ? H.slice(1, -1) : void 0;
      return Y === void 0 ? void 0 : (Y = D(Y), p2(q) ? (0, i.withAlphaValue)(Y, q.slice(1, -1)) : ((A = T.theme) === null || A === void 0 || (R = A.opacity) === null || R === void 0 ? void 0 : R[q]) === void 0 ? void 0 : (0, i.withAlphaValue)(Y, T.theme.opacity[q]));
    }
    return c(E, L, { validate: a.color });
  }
  function g(E, L = {}) {
    var T;
    return (T = L.values) === null || T === void 0 ? void 0 : T[E];
  }
  function y(E) {
    return (L, T) => c(L, T, { validate: E });
  }
  var b = { any: c, color: v, url: y(a.url), image: y(a.image), length: y(a.length), percentage: y(a.percentage), position: y(a.position), lookup: g, "generic-name": y(a.genericName), "family-name": y(a.familyName), number: y(a.number), "line-width": y(a.lineWidth), "absolute-size": y(a.absoluteSize), "relative-size": y(a.relativeSize), shadow: y(a.shadow) }, C = Object.keys(b);
  function k(E, L) {
    let T = E.indexOf(L);
    return T === -1 ? [void 0, E] : [E.slice(0, T), E.slice(T + 1)];
  }
  function S(E, L, T, U) {
    if (p2(L)) {
      let M = L.slice(1, -1), [H, q] = k(M, ":");
      if (!/^[\w-_]+$/g.test(H))
        q = M;
      else if (H !== void 0 && !C.includes(H))
        return [];
      if (q.length > 0 && C.includes(H))
        return [c(`[${q}]`, T), H];
    }
    for (let M of [].concat(E)) {
      let H = b[M](L, T, { tailwindConfig: U });
      if (H !== void 0)
        return [H, M];
    }
    return [];
  }
});
var lg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    return typeof r == "function" ? r({}) : r;
  }
});
var fg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => ee });
  var t = D(Mu()), r = D(Uv()), n = D(Bv()), i = D(Gu()), a = D(Nv()), o = Mv(), u = Gv(), s = Wv(), l = D($v()), f = jv(), c = ug(), p2 = nl(), d = D(lg());
  function D(A) {
    return A && A.__esModule ? A : { default: A };
  }
  function v(A) {
    return typeof A == "function";
  }
  function g(A) {
    return typeof A == "object" && A !== null;
  }
  function y(A, ...R) {
    let O = R.pop();
    for (let Y of R)
      for (let Z in Y) {
        let te = O(A[Z], Y[Z]);
        te === void 0 ? g(A[Z]) && g(Y[Z]) ? A[Z] = y(A[Z], Y[Z], O) : A[Z] = Y[Z] : A[Z] = te;
      }
    return A;
  }
  var b = { colors: a.default, negative(A) {
    return Object.keys(A).filter((R) => A[R] !== "0").reduce((R, O) => {
      let Y = (0, t.default)(A[O]);
      return Y !== void 0 && (R[`-${O}`] = Y), R;
    }, {});
  }, breakpoints(A) {
    return Object.keys(A).filter((R) => typeof A[R] == "string").reduce((R, O) => ({ ...R, [`screen-${O}`]: A[O] }), {});
  } };
  function C(A, ...R) {
    return v(A) ? A(...R) : A;
  }
  function k(A) {
    return A.reduce((R, { extend: O }) => y(R, O, (Y, Z) => Y === void 0 ? [Z] : Array.isArray(Y) ? [Z, ...Y] : [Z, Y]), {});
  }
  function S(A) {
    return { ...A.reduce((R, O) => (0, o.defaults)(R, O), {}), extend: k(A) };
  }
  function E(A, R) {
    if (Array.isArray(A) && g(A[0]))
      return A.concat(R);
    if (Array.isArray(R) && g(R[0]) && g(A))
      return [A, ...R];
    if (Array.isArray(R))
      return R;
  }
  function L({ extend: A, ...R }) {
    return y(R, A, (O, Y) => !v(O) && !Y.some(v) ? y({}, O, ...Y, E) : (Z, te) => y({}, ...[O, ...Y].map((ie) => C(ie, Z, te)), E));
  }
  function* T(A) {
    let R = (0, u.toPath)(A);
    if (R.length === 0 || (yield R, Array.isArray(A)))
      return;
    let O = /^(.*?)\s*\/\s*([^/]+)$/, Y = A.match(O);
    if (Y !== null) {
      let [, Z, te] = Y, ie = (0, u.toPath)(Z);
      ie.alpha = te, yield ie;
    }
  }
  function U(A) {
    let R = (O, Y) => {
      for (let Z of T(O)) {
        let te = 0, ie = A;
        for (; ie != null && te < Z.length; )
          ie = ie[Z[te++]], ie = v(ie) && (Z.alpha === void 0 || te <= Z.length - 1) ? ie(R, b) : ie;
        if (ie !== void 0) {
          if (Z.alpha !== void 0) {
            let B = (0, c.parseColorFormat)(ie);
            return (0, p2.withAlphaValue)(B, Z.alpha, (0, d.default)(B));
          }
          return (0, l.default)(ie) ? (0, f.cloneDeep)(ie) : ie;
        }
      }
      return Y;
    };
    return Object.assign(R, { theme: R, ...b }), Object.keys(A).reduce((O, Y) => (O[Y] = v(A[Y]) ? A[Y](R, b) : A[Y], O), {});
  }
  function M(A) {
    let R = [];
    return A.forEach((O) => {
      R = [...R, O];
      var Y;
      let Z = (Y = O?.plugins) !== null && Y !== void 0 ? Y : [];
      Z.length !== 0 && Z.forEach((te) => {
        te.__isOptionsFunction && (te = te());
        var ie;
        R = [...R, ...M([(ie = te?.config) !== null && ie !== void 0 ? ie : {}])];
      });
    }), R;
  }
  function H(A) {
    return [...A].reduceRight((R, O) => v(O) ? O({ corePlugins: R }) : (0, n.default)(O, R), r.default);
  }
  function q(A) {
    return [...A].reduceRight((R, O) => [...R, ...O], []);
  }
  function ee(A) {
    let R = [...M(A), { prefix: "", important: false, separator: ":", variantOrder: i.default.variantOrder }];
    var O, Y;
    return (0, s.normalizeConfig)((0, o.defaults)({ theme: U(L(S(R.map((Z) => (O = Z?.theme) !== null && O !== void 0 ? O : {})))), corePlugins: H(R.map((Z) => Z.corePlugins)), plugins: q(A.map((Z) => (Y = Z?.plugins) !== null && Y !== void 0 ? Y : [])) }, ...R));
  }
});
var il = {};
Aa(il, { default: () => al });
var al;
var cg = _a(() => {
  al = { yellow: (e) => e };
});
var pg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(c, p2) {
    for (var d in p2)
      Object.defineProperty(c, d, { enumerable: true, get: p2[d] });
  }
  t(e, { flagEnabled: () => u, issueFlagNotices: () => l, default: () => f });
  var r = i((cg(), Xn(il))), n = i((Oa(), Xn(Zn)));
  function i(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var a = { optimizeUniversalDefaults: false }, o = { future: ["hoverOnlyWhenSupported", "respectDefaultRingColorOpacity"], experimental: ["optimizeUniversalDefaults", "matchVariant"] };
  function u(c, p2) {
    if (o.future.includes(p2)) {
      var d, D, v;
      return c.future === "all" || ((v = (D = c == null || (d = c.future) === null || d === void 0 ? void 0 : d[p2]) !== null && D !== void 0 ? D : a[p2]) !== null && v !== void 0 ? v : false);
    }
    if (o.experimental.includes(p2)) {
      var g, y, b;
      return c.experimental === "all" || ((b = (y = c == null || (g = c.experimental) === null || g === void 0 ? void 0 : g[p2]) !== null && y !== void 0 ? y : a[p2]) !== null && b !== void 0 ? b : false);
    }
    return false;
  }
  function s(c) {
    if (c.experimental === "all")
      return o.experimental;
    var p2;
    return Object.keys((p2 = c?.experimental) !== null && p2 !== void 0 ? p2 : {}).filter((d) => o.experimental.includes(d) && c.experimental[d]);
  }
  function l(c) {
    if (process.env.JEST_WORKER_ID === void 0 && s(c).length > 0) {
      let p2 = s(c).map((d) => r.default.yellow(d)).join(", ");
      n.default.warn("experimental-flags-enabled", [`You have enabled experimental features: ${p2}`, "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."]);
    }
  }
  var f = o;
});
var hg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => i });
  var t = n(Gu()), r = pg();
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function i(a) {
    var o;
    let u = ((o = a?.presets) !== null && o !== void 0 ? o : [t.default]).slice().reverse().flatMap((f) => i(typeof f == "function" ? f() : f)), s = { respectDefaultRingColorOpacity: { theme: { ringColor: { DEFAULT: "#3b82f67f" } } } }, l = Object.keys(s).filter((f) => (0, r.flagEnabled)(a, f)).map((f) => s[f]);
    return [a, ...l, ...u];
  }
});
var dg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => i });
  var t = n(fg()), r = n(hg());
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function i(...a) {
    let [, ...o] = (0, r.default)(a[0]);
    return (0, t.default)([...a, ...o]);
  }
});
var vg = le((e, t) => {
  var r = dg();
  t.exports = (r.__esModule ? r : { default: r }).default;
});
var Qr;
function ol(e) {
  Qr = e;
}
var qr = null;
async function Kn() {
  return Qr || (qr ? (await qr, Qr) : (qr = Promise.resolve().then(() => (Rv(), Nu)).then((e) => e.getYogaModule()).then((e) => Qr = e), await qr, qr = null, Qr));
}
var nn = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var gg = nn((e, t) => {
  t.exports = ["em", "ex", "ch", "rem", "vh", "vw", "vmin", "vmax", "px", "mm", "cm", "in", "pt", "pc", "mozmm"];
});
var mg = nn((e, t) => {
  t.exports = ["deg", "grad", "rad", "turn"];
});
var Dg = nn((e, t) => {
  t.exports = ["dpi", "dpcm", "dppx"];
});
var yg = nn((e, t) => {
  t.exports = ["Hz", "kHz"];
});
var bg = nn((e, t) => {
  t.exports = ["s", "ms"];
});
var xg = gg();
var sl = mg();
var ul = Dg();
var ll = yg();
var fl = bg();
function Ra(e) {
  if (/\.\D?$/.test(e))
    throw new Error("The dot should be followed by a number");
  if (/^[+-]{2}/.test(e))
    throw new Error("Only one leading +/- is allowed");
  if (wg(e) > 1)
    throw new Error("Only one dot is allowed");
  if (/%$/.test(e)) {
    this.type = "percentage", this.value = fa(e), this.unit = "%";
    return;
  }
  var t = Fg(e);
  if (!t) {
    this.type = "number", this.value = fa(e);
    return;
  }
  this.type = Sg(t), this.value = fa(e.substr(0, e.length - t.length)), this.unit = t;
}
Ra.prototype.valueOf = function() {
  return this.value;
};
Ra.prototype.toString = function() {
  return this.value + (this.unit || "");
};
function Qn(e) {
  return new Ra(e);
}
function wg(e) {
  var t = e.match(/\./g);
  return t ? t.length : 0;
}
function fa(e) {
  var t = parseFloat(e);
  if (isNaN(t))
    throw new Error("Invalid number: " + e);
  return t;
}
var Eg = [].concat(sl, ll, xg, ul, fl);
function Fg(e) {
  var t = e.match(/\D+$/), r = t && t[0];
  if (r && Eg.indexOf(r) === -1)
    throw new Error("Invalid unit: " + r);
  return r;
}
var Cg = Object.assign(In(sl, "angle"), In(ll, "frequency"), In(ul, "resolution"), In(fl, "time"));
function In(e, t) {
  return Object.fromEntries(e.map((r) => [r, t]));
}
function Sg(e) {
  return Cg[e] || "length";
}
function jn(e) {
  let t = typeof e;
  return !(t === "number" || t === "bigint" || t === "string" || t === "boolean");
}
function kg(e) {
  return /^class\s/.test(e.toString());
}
function Tg(e) {
  return "dangerouslySetInnerHTML" in e;
}
function _g(e) {
  let t = typeof e > "u" ? [] : [].concat(e).flat(1 / 0), r = [];
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    typeof i > "u" || typeof i == "boolean" || i === null || (typeof i == "number" && (i = String(i)), typeof i == "string" && r.length && typeof r[r.length - 1] == "string" ? r[r.length - 1] += i : r.push(i));
  }
  return r;
}
function Ie(e, t, r, n, i = false) {
  if (typeof e == "number")
    return e;
  try {
    if (e = e.trim(), /[ /\(,]/.test(e))
      return;
    if (e === String(+e))
      return +e;
    let a = new Qn(e);
    if (a.type === "length")
      switch (a.unit) {
        case "em":
          return a.value * t;
        case "rem":
          return a.value * 16;
        case "vw":
          return ~~(a.value * n._viewportWidth / 100);
        case "vh":
          return ~~(a.value * n._viewportHeight / 100);
        default:
          return a.value;
      }
    else if (a.type === "angle")
      switch (a.unit) {
        case "deg":
          return a.value;
        case "rad":
          return a.value * 180 / Math.PI;
        default:
          return a.value;
      }
    else if (a.type === "percentage" && i)
      return a.value / 100 * r;
  } catch {
  }
}
function zn(e, t) {
  return [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]];
}
function Lt(e, t, r, n) {
  let i = t[e];
  if (typeof i > "u") {
    if (n && typeof e < "u")
      throw new Error(`Invalid value for CSS property "${n}". Allowed values: ${Object.keys(t).map((a) => `"${a}"`).join(" | ")}. Received: "${e}".`);
    i = r;
  }
  return i;
}
var ca;
var pa;
var Ag = [32, 160, 4961, 65792, 65793, 4153, 4241, 10].map((e) => String.fromCodePoint(e));
function Pt(e, t, r) {
  if (!ca || !pa) {
    if (!(typeof Intl < "u" && "Segmenter" in Intl))
      throw new Error("Intl.Segmenter does not exist, please use import a polyfill.");
    ca = new Intl.Segmenter(r, { granularity: "word" }), pa = new Intl.Segmenter(r, { granularity: "grapheme" });
  }
  if (t === "grapheme")
    return [...pa.segment(e)].map((n) => n.segment);
  {
    let n = [...ca.segment(e)].map((o) => o.segment), i = [], a = 0;
    for (; a < n.length; ) {
      let o = n[a];
      if (o == "\xA0") {
        let u = a === 0 ? "" : i.pop(), s = a === n.length - 1 ? "" : n[a + 1];
        i.push(u + "\xA0" + s), a += 2;
      } else
        i.push(o), a++;
    }
    return i;
  }
}
function ue(e, t, r) {
  let n = "";
  for (let [i, a] of Object.entries(t))
    typeof a < "u" && (n += ` ${i}="${a}"`);
  return r ? `<${e}${n}>${r}</${e}>` : `<${e}${n}/>`;
}
function Og(e = 20) {
  let t = /* @__PURE__ */ new Map();
  function r(a, o) {
    if (t.size >= e) {
      let u = t.keys().next().value;
      t.delete(u);
    }
    t.set(a, o);
  }
  function n(a) {
    if (!t.has(a))
      return;
    let o = t.get(a);
    return t.delete(a), t.set(a, o), o;
  }
  function i() {
    t.clear();
  }
  return { set: r, get: n, clear: i };
}
function Ua(e) {
  return e ? e.split(/[, ]/).filter(Boolean).map(Number) : null;
}
function Lg(e) {
  return Object.prototype.toString.call(e);
}
function cl(e) {
  return typeof e == "string";
}
function Ig(e) {
  return typeof e == "number";
}
function Pg(e) {
  return Lg(e) === "[object Undefined]";
}
function Rg(e, t) {
  if (t === "break-all")
    return { words: Pt(e, "grapheme"), requiredBreaks: [] };
  if (t === "keep-all")
    return { words: Pt(e, "word"), requiredBreaks: [] };
  let r = new Ei(e), n = 0, i = r.nextBreak(), a = [], o = [false];
  for (; i; ) {
    let u = e.slice(n, i.position);
    a.push(u), i.required ? o.push(true) : o.push(false), n = i.position, i = r.nextBreak();
  }
  return { words: a, requiredBreaks: o };
}
var Ug = (e) => e.replaceAll(/([A-Z])/g, (t, r) => `-${r.toLowerCase()}`);
function pl(e, t = ",") {
  let r = [], n = 0, i = 0;
  t = new RegExp(t);
  for (let a = 0; a < e.length; a++)
    e[a] === "(" ? i++ : e[a] === ")" && i--, i === 0 && t.test(e[a]) && (r.push(e.slice(n, a).trim()), n = a + 1);
  return r.push(e.slice(n).trim()), r;
}
var Bg = "image/avif";
var Ng = "image/webp";
var ei = "image/apng";
var ti = "image/png";
var ri = "image/jpeg";
var ni = "image/gif";
var Ba = "image/svg+xml";
function hl(e) {
  let t = new DataView(e), r = 4, n = t.byteLength;
  for (; r < n; ) {
    let i = t.getUint16(r, false);
    if (i > n)
      throw new TypeError("Invalid JPEG");
    let a = t.getUint8(i + 1 + r);
    if (a === 192 || a === 193 || a === 194)
      return [t.getUint16(i + 7 + r, false), t.getUint16(i + 5 + r, false)];
    r += i + 2;
  }
  throw new TypeError("Invalid JPEG");
}
function dl(e) {
  let t = new Uint8Array(e.slice(6, 10));
  return [t[0] | t[1] << 8, t[2] | t[3] << 8];
}
function vl(e) {
  let t = new DataView(e);
  return [t.getUint16(18, false), t.getUint16(22, false)];
}
var cr = Og(100);
var ha = /* @__PURE__ */ new Map();
var Mg = [ti, ei, ri, ni, Ba];
function Gg(e) {
  let t = "", r = new Uint8Array(e);
  for (let n = 0; n < r.byteLength; n++)
    t += String.fromCharCode(r[n]);
  return btoa(t);
}
function Wg(e) {
  let t = atob(e), r = t.length, n = new Uint8Array(r);
  for (let i = 0; i < r; i++)
    n[i] = t.charCodeAt(i);
  return n.buffer;
}
function lu(e, t) {
  let r = t.match(/<svg[^>]*>/)[0], n = r.match(/viewBox=['"](.+)['"]/), i = n ? Ua(n[1]) : null, a = r.match(/width=['"](\d*\.\d+|\d+)['"]/), o = r.match(/height=['"](\d*\.\d+|\d+)['"]/);
  if (!i && (!a || !o))
    throw new Error(`Failed to parse SVG from ${e}: missing "viewBox"`);
  let u = i ? [i[2], i[3]] : [+a[1], +o[1]], s = u[0] / u[1];
  return a && o ? [+a[1], +o[1]] : a ? [+a[1], +a[1] / s] : o ? [+o[1] * s, +o[1]] : [u[0], u[1]];
}
function fu(e) {
  let t, r = $g(new Uint8Array(e));
  switch (r) {
    case ti:
    case ei:
      t = vl(e);
      break;
    case ni:
      t = dl(e);
      break;
    case ri:
      t = hl(e);
      break;
  }
  if (!Mg.includes(r))
    throw new Error(`Unsupported image type: ${r || "unknown"}`);
  return [`data:${r};base64,${Gg(e)}`, t];
}
async function Na(e) {
  if (!e)
    throw new Error("Image source is not provided.");
  if (typeof e == "object") {
    let [i, a] = fu(e);
    return [i, ...a];
  }
  if ((e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'")) && (e = e.slice(1, -1)), typeof window > "u" && !e.startsWith("http") && !e.startsWith("data:"))
    throw new Error(`Image source must be an absolute URL: ${e}`);
  if (e.startsWith("data:")) {
    let i;
    try {
      i = /data:(?<imageType>[a-z/+]+)(;(charset=)?(?<encodingType>.*))?,(?<dataString>.*)/g.exec(e).groups;
    } catch {
      return console.warn("Image data URI resolved without size:" + e), [e];
    }
    let { imageType: a, encodingType: o, dataString: u } = i;
    if (a === Ba) {
      let s = o === "base64" ? atob(u) : decodeURIComponent(u.replace(/ /g, "%20")), l = o === "base64" ? e : `data:image/svg+xml;base64,${btoa(s)}`, f = lu(e, s);
      return cr.set(e, [l, ...f]), [l, ...f];
    } else if (o === "base64") {
      let s, l = Wg(u);
      switch (a) {
        case ti:
        case ei:
          s = vl(l);
          break;
        case ni:
          s = dl(l);
          break;
        case ri:
          s = hl(l);
          break;
      }
      return cr.set(e, [e, ...s]), [e, ...s];
    } else
      return console.warn("Image data URI resolved without size:" + e), cr.set(e, [e]), [e];
  }
  if (!globalThis.fetch)
    throw new Error("`fetch` is required to be polyfilled to load images.");
  if (ha.has(e))
    return ha.get(e);
  let t = cr.get(e);
  if (t)
    return t;
  let r = e, n = fetch(r).then((i) => {
    let a = i.headers.get("content-type");
    return a === "image/svg+xml" || a === "application/svg+xml" ? i.text() : i.arrayBuffer();
  }).then((i) => {
    if (typeof i == "string")
      try {
        let u = `data:image/svg+xml;base64,${btoa(i)}`, s = lu(r, i);
        return [u, ...s];
      } catch (u) {
        throw new Error(`Failed to parse SVG image: ${u.message}`);
      }
    let [a, o] = fu(i);
    return [a, ...o];
  }).then((i) => (cr.set(r, i), i)).catch((i) => (console.error(`Can't load image ${r}: ` + i.message), cr.set(r, []), []));
  return ha.set(r, n), n;
}
function $g(e) {
  return [255, 216, 255].every((t, r) => e[r] === t) ? ri : [137, 80, 78, 71, 13, 10, 26, 10].every((t, r) => e[r] === t) ? jg(e) ? ei : ti : [71, 73, 70, 56].every((t, r) => e[r] === t) ? ni : [82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80].every((t, r) => !t || e[r] === t) ? Ng : [60, 63, 120, 109, 108].every((t, r) => e[r] === t) ? Ba : [0, 0, 0, 0, 102, 116, 121, 112, 97, 118, 105, 102].every((t, r) => !t || e[r] === t) ? Bg : null;
}
function jg(e) {
  let t = new DataView(e.buffer), r, n, i = 8, a = false;
  for (; !a && r !== "IEND" && i < e.length; ) {
    n = t.getUint32(i);
    let o = e.subarray(i + 4, i + 8);
    r = String.fromCharCode(...o), a = r === "acTL", i += 12 + n;
  }
  return a;
}
var wa = { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", href: "href", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDasharray: "stroke-dasharray", strokeDashoffset: "stroke-dashoffset", strokeLinecap: "stroke-linecap", strokeLinejoin: "stroke-linejoin", strokeMiterlimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", xlinkActuate: "xlink:actuate", xlinkArcrole: "xlink:arcrole", xlinkHref: "xlink:href", xlinkRole: "xlink:role", xlinkShow: "xlink:show", xlinkTitle: "xlink:title", xlinkType: "xlink:type", xmlBase: "xml:base", xmlLang: "xml:lang", xmlSpace: "xml:space", xmlnsXlink: "xmlns:xlink" };
var zg = /[\r\n%#()<>?[\\\]^`{|}"']/g;
function Ea(e, t) {
  if (!e)
    return "";
  if (Array.isArray(e))
    return e.map((l) => Ea(l, t)).join("");
  if (typeof e != "object")
    return String(e);
  let r = e.type;
  if (r === "text")
    throw new Error("<text> nodes are not currently supported, please convert them to <path>");
  let { children: n, style: i, ...a } = e.props || {}, o = i?.color || t, u = `${Object.entries(a).map(([l, f]) => (typeof f == "string" && f.toLowerCase() === "currentcolor" && (f = o), l === "href" && r === "image" ? ` ${wa[l] || l}="${cr.get(f)[0]}"` : ` ${wa[l] || l}="${f}"`)).join("")}`, s = i ? ` style="${Object.entries(i).map(([l, f]) => `${Ug(l)}:${f}`).join(";")}"` : "";
  return `<${r}${u}${s}>${Ea(n, o)}</${r}>`;
}
async function Vg(e) {
  let t = /* @__PURE__ */ new Set(), r = (n) => {
    if (n && jn(n)) {
      if (Array.isArray(n)) {
        n.forEach((i) => r(i));
        return;
      } else
        typeof n == "object" && (n.type === "image" ? t.has(n.props.href) || t.add(n.props.href) : n.type === "img" && (t.has(n.props.src) || t.add(n.props.src)));
      Array.isArray(n.props.children) ? n.props.children.map((i) => r(i)) : r(n.props.children);
    }
  };
  return r(e), Promise.all(Array.from(t).map((n) => Na(n)));
}
async function Hg(e, t) {
  let { viewBox: r, viewbox: n, width: i, height: a, className: o, style: u, children: s, ...l } = e.props || {};
  r ||= n, l.xmlns = "http://www.w3.org/2000/svg";
  let f = u?.color || t, c = Ua(r), p2 = c ? c[3] / c[2] : null;
  return i = i || p2 && a ? a / p2 : null, a = a || p2 && i ? i * p2 : null, l.width = i, l.height = a, r && (l.viewBox = r), `data:image/svg+xml;utf8,${`<svg ${Object.entries(l).map(([d, D]) => (typeof D == "string" && D.toLowerCase() === "currentcolor" && (D = f), ` ${wa[d] || d}="${D}"`)).join("")}>${Ea(s, f)}</svg>`.replace(zg, encodeURIComponent)}`;
}
var Et = "flex";
var Xg = { p: { display: Et, marginTop: "1em", marginBottom: "1em" }, div: { display: Et }, blockquote: { display: Et, marginTop: "1em", marginBottom: "1em", marginLeft: 40, marginRight: 40 }, center: { display: Et, textAlign: "center" }, hr: { display: Et, marginTop: "0.5em", marginBottom: "0.5em", marginLeft: "auto", marginRight: "auto", borderWidth: 1, borderStyle: "solid" }, h1: { display: Et, fontSize: "2em", marginTop: "0.67em", marginBottom: "0.67em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h2: { display: Et, fontSize: "1.5em", marginTop: "0.83em", marginBottom: "0.83em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h3: { display: Et, fontSize: "1.17em", marginTop: "1em", marginBottom: "1em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h4: { display: Et, marginTop: "1.33em", marginBottom: "1.33em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h5: { display: Et, fontSize: "0.83em", marginTop: "1.67em", marginBottom: "1.67em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h6: { display: Et, fontSize: "0.67em", marginTop: "2.33em", marginBottom: "2.33em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, u: { textDecoration: "underline" }, strong: { fontWeight: "bold" }, b: { fontWeight: "bold" }, i: { fontStyle: "italic" }, em: { fontStyle: "italic" }, code: { fontFamily: "monospace" }, kbd: { fontFamily: "monospace" }, pre: { display: Et, fontFamily: "monospace", whiteSpace: "pre", marginTop: "1em", marginBottom: "1em" }, mark: { backgroundColor: "yellow", color: "black" }, big: { fontSize: "larger" }, small: { fontSize: "smaller" }, s: { textDecoration: "line-through" } };
var qg = /* @__PURE__ */ new Set(["color", "font", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "textAlign", "textTransform", "textShadowOffset", "textShadowColor", "textShadowRadius", "textDecorationLine", "textDecorationStyle", "textDecorationColor", "whiteSpace", "transform", "wordBreak", "tabSize", "opacity", "filter", "_viewportWidth", "_viewportHeight", "_inheritedClipPathId", "_inheritedMaskId", "_inheritedBackgroundClipTextPath"]);
function Yg(e) {
  let t = {};
  for (let r in e)
    qg.has(r) && (t[r] = e[r]);
  return t;
}
function Zg(e, t) {
  try {
    let r = new Qn(e);
    switch (r.unit) {
      case "px":
        return { absolute: r.value };
      case "em":
        return { absolute: r.value * t };
      case "rem":
        return { absolute: r.value * 16 };
      case "%":
        return { relative: r.value };
      default:
        return {};
    }
  } catch {
    return {};
  }
}
function da(e, t, r) {
  switch (e) {
    case "top":
      return { yRelative: 0 };
    case "left":
      return { xRelative: 0 };
    case "right":
      return { xRelative: 100 };
    case "bottom":
      return { yRelative: 100 };
    case "center":
      return {};
    default: {
      let n = Zg(e, t);
      return n.absolute ? { [r ? "xAbsolute" : "yAbsolute"]: n.absolute } : n.relative ? { [r ? "xRelative" : "yRelative"]: n.relative } : {};
    }
  }
}
function Jg(e, t) {
  if (typeof e == "number")
    return { xAbsolute: e };
  let r;
  try {
    r = (0, yl.default)(e).nodes.filter((n) => n.type === "word").map((n) => n.value);
  } catch {
    return {};
  }
  return r.length === 1 ? da(r[0], t, true) : r.length === 2 ? ((r[0] === "top" || r[0] === "bottom" || r[1] === "left" || r[1] === "right") && r.reverse(), { ...da(r[0], t, true), ...da(r[1], t, false) }) : {};
}
function Yr(e, t) {
  let r = (0, bl.getPropertyName)(`mask-${t}`);
  return e[r] || e[`WebkitM${r.substring(1)}`];
}
function Kg(e) {
  let t = e.maskImage || e.WebkitMaskImage, r = { position: Yr(e, "position") || "0% 0%", size: Yr(e, "size") || "100% 100%", repeat: Yr(e, "repeat") || "repeat", origin: Yr(e, "origin") || "border-box", clip: Yr(e, "origin") || "border-box" };
  return pl(t).filter((n) => n && n !== "none").reverse().map((n) => ({ image: n, ...r }));
}
var Qg = /* @__PURE__ */ new Set(["flex", "flexGrow", "flexShrink", "flexBasis", "fontWeight", "lineHeight", "opacity", "scale", "scaleX", "scaleY"]);
var e1 = /* @__PURE__ */ new Set(["lineHeight"]);
function t1(e, t, r, n) {
  return e === "textDecoration" && !r.includes(t.textDecorationColor) && (t.textDecorationColor = n), t;
}
function en(e, t) {
  let r = Number(t);
  return isNaN(r) ? t : Qg.has(e) ? e1.has(e) ? r : String(t) : r + "px";
}
function r1(e, t, r) {
  if (e === "lineHeight")
    return { lineHeight: en(e, t) };
  if (e === "fontFamily")
    return { fontFamily: t.split(",").map((n) => n.trim().replace(/(^['"])|(['"]$)/g, "").toLocaleLowerCase()) };
  if (e === "borderRadius") {
    if (typeof t != "string" || !t.includes("/"))
      return;
    let [n, i] = t.split("/"), a = (0, It.getStylesForProperty)(e, n, true), o = (0, It.getStylesForProperty)(e, i, true);
    for (let u in a)
      o[u] = en(e, a[u]) + " " + en(e, o[u]);
    return o;
  }
  if (/^border(Top|Right|Bottom|Left)?$/.test(e)) {
    let n = (0, It.getStylesForProperty)("border", t, true);
    n.borderWidth === 1 && !String(t).includes("1px") && (n.borderWidth = 3), n.borderColor === "black" && !String(t).includes("black") && (n.borderColor = r);
    let i = { Width: en(e + "Width", n.borderWidth), Style: Lt(n.borderStyle, { solid: "solid", dashed: "dashed" }, "solid", e + "Style"), Color: n.borderColor }, a = {};
    for (let o of e === "border" ? ["Top", "Right", "Bottom", "Left"] : [e.slice(6)])
      for (let u in i)
        a["border" + o + u] = i[u];
    return a;
  }
  if (e === "boxShadow") {
    if (!t)
      throw new Error('Invalid `boxShadow` value: "' + t + '".');
    return { [e]: typeof t == "string" ? (0, ml.parse)(t) : t };
  }
  if (e === "transform") {
    if (typeof t != "string")
      throw new Error("Invalid `transform` value.");
    let n = {}, i = t.replace(/(-?[\d.]+%)/g, (o, u) => {
      let s = ~~(Math.random() * 1e9);
      return n[s] = u, s + "px";
    }), a = (0, It.getStylesForProperty)("transform", i, true);
    for (let o of a.transform)
      for (let u in o)
        n[o[u]] && (o[u] = n[o[u]]);
    return a;
  }
  if (e === "background")
    return t = t.toString().trim(), /^(linear-gradient|radial-gradient|url)\(/.test(t) ? (0, It.getStylesForProperty)("backgroundImage", t, true) : (0, It.getStylesForProperty)("background", t, true);
  if (e === "textShadow") {
    t = t.toString().trim();
    let n = {}, i = pl(t);
    for (let a of i) {
      let o = (0, It.getStylesForProperty)("textShadow", a, true);
      for (let u in o)
        n[u] ? n[u].push(o[u]) : n[u] = [o[u]];
    }
    return n;
  }
}
function cu(e) {
  return e === "transform" ? " Only absolute lengths such as `10px` are supported." : "";
}
var pu = /rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\.\d]+)\)/;
function xl(e) {
  if (typeof e == "string" && pu.test(e.trim()))
    return e.trim().replace(pu, (t, r, n, i, a) => `rgba(${r}, ${n}, ${i}, ${a})`);
  if (typeof e == "object" && e !== null) {
    for (let t in e)
      e[t] = xl(e[t]);
    return e;
  }
  return e;
}
function hu(e, t) {
  let r = {};
  if (e) {
    let i = i1(e.color, t.color);
    r.color = i;
    for (let a in e) {
      if (a.startsWith("_")) {
        r[a] = e[a];
        continue;
      }
      if (a === "color")
        continue;
      let o = (0, It.getPropertyName)(a), u = o1(e[a], i);
      try {
        let s = r1(o, u, i) || t1(o, (0, It.getStylesForProperty)(o, en(o, u), true), u, i);
        Object.assign(r, s);
      } catch (s) {
        throw new Error(s.message + (s.message.includes(u) ? `
  ` + cu(o) : `
  in CSS rule \`${o}: ${u}\`.${cu(o)}`));
      }
    }
  }
  if (r.backgroundImage) {
    let { backgrounds: i } = (0, gl.parseElementStyle)(r);
    r.backgroundImage = i;
  }
  (r.maskImage || r.WebkitMaskImage) && (r.maskImage = Kg(r));
  let n = n1(r.fontSize, t.fontSize);
  typeof r.fontSize < "u" && (r.fontSize = n), r.transformOrigin && (r.transformOrigin = Jg(r.transformOrigin, n));
  for (let i in r) {
    let a = r[i];
    if (i === "lineHeight")
      typeof a == "string" && (a = r[i] = Ie(a, n, n, t, true) / n);
    else {
      if (typeof a == "string") {
        let o = Ie(a, n, n, t);
        typeof o < "u" && (r[i] = o), a = r[i];
      }
      if (typeof a == "string" || typeof a == "object") {
        let o = xl(a);
        o && (r[i] = o), a = r[i];
      }
    }
    if (i === "opacity" && typeof a == "number" && (r.opacity = a * t.opacity), i === "transform") {
      let o = a;
      for (let u of o) {
        let s = Object.keys(u)[0], l = u[s], f = typeof l == "string" ? Ie(l, n, n, t) ?? l : l;
        u[s] = f;
      }
    }
    if (i === "textShadowRadius") {
      let o = a;
      r.textShadowRadius = o.map((u) => Ie(u, n, 0, t, false));
    }
    if (i === "textShadowOffset") {
      let o = a;
      r.textShadowOffset = o.map(({ height: u, width: s }) => ({ height: Ie(u, n, 0, t, false), width: Ie(s, n, 0, t, false) }));
    }
  }
  return r;
}
function n1(e, t) {
  if (typeof e == "number")
    return e;
  try {
    let r = new Qn(e);
    switch (r.unit) {
      case "em":
        return r.value * t;
      case "rem":
        return r.value * 16;
    }
  } catch {
    return t;
  }
}
function du(e) {
  if (e.startsWith("hsl")) {
    let t = (0, Dl.default)(e), [r, n, i] = t.values;
    return `hsl(${[r, `${n}%`, `${i}%`].concat(t.alpha === 1 ? [] : [t.alpha]).join(",")})`;
  }
  return e;
}
function i1(e, t) {
  return e && e.toLowerCase() !== "currentcolor" ? du(e) : du(t);
}
function a1(e, t) {
  return e.replace(/currentcolor/gi, t);
}
function o1(e, t) {
  return cl(e) && (e = a1(e, t)), e;
}
async function s1(e, t, r, n, i) {
  let a = await Kn(), o = { ...r, ...hu(Xg[t], r), ...hu(n, r) };
  if (t === "img") {
    let [u, s, l] = await Na(i.src);
    if (s === void 0 && l === void 0) {
      if (i.width === void 0 || i.height === void 0)
        throw new Error("Image size cannot be determined. Please provide the width and height of the image.");
      s = parseInt(i.width), l = parseInt(i.height);
    }
    let f = l / s, c = (o.borderLeftWidth || 0) + (o.borderRightWidth || 0) + (o.paddingLeft || 0) + (o.paddingRight || 0), p2 = (o.borderTopWidth || 0) + (o.borderBottomWidth || 0) + (o.paddingTop || 0) + (o.paddingBottom || 0), d = o.width || i.width, D = o.height || i.height, v = typeof d == "number" && typeof D == "number";
    v && (d -= c, D -= p2), d === void 0 && D === void 0 ? (d = "100%", e.setAspectRatio(1 / f)) : d === void 0 ? typeof D == "number" ? d = D / f : e.setAspectRatio(1 / f) : D === void 0 && (typeof d == "number" ? D = d * f : e.setAspectRatio(1 / f)), o.width = v ? d + c : d, o.height = v ? D + p2 : D, o.__src = u;
  }
  if (t === "svg") {
    let u = i.viewBox || i.viewbox, s = Ua(u), l = s ? s[3] / s[2] : null, { width: f, height: c } = i;
    typeof f > "u" && c ? l == null ? f = 0 : typeof c == "string" && c.endsWith("%") ? f = parseInt(c) / l + "%" : (c = Ie(c, r.fontSize, 1, r), f = c / l) : typeof c > "u" && f ? l == null ? f = 0 : typeof f == "string" && f.endsWith("%") ? c = parseInt(f) * l + "%" : (f = Ie(f, r.fontSize, 1, r), c = f * l) : (typeof f < "u" && (f = Ie(f, r.fontSize, 1, r) || f), typeof c < "u" && (c = Ie(c, r.fontSize, 1, r) || c), f ||= s?.[2], c ||= s?.[3]), !o.width && f && (o.width = f), !o.height && c && (o.height = c);
  }
  return e.setDisplay(Lt(o.display, { flex: a.DISPLAY_FLEX, block: a.DISPLAY_FLEX, none: a.DISPLAY_NONE, "-webkit-box": a.DISPLAY_FLEX }, a.DISPLAY_FLEX, "display")), e.setAlignContent(Lt(o.alignContent, { stretch: a.ALIGN_STRETCH, center: a.ALIGN_CENTER, "flex-start": a.ALIGN_FLEX_START, "flex-end": a.ALIGN_FLEX_END, "space-between": a.ALIGN_SPACE_BETWEEN, "space-around": a.ALIGN_SPACE_AROUND, baseline: a.ALIGN_BASELINE, normal: a.ALIGN_AUTO }, a.ALIGN_AUTO, "alignContent")), e.setAlignItems(Lt(o.alignItems, { stretch: a.ALIGN_STRETCH, center: a.ALIGN_CENTER, "flex-start": a.ALIGN_FLEX_START, "flex-end": a.ALIGN_FLEX_END, baseline: a.ALIGN_BASELINE, normal: a.ALIGN_AUTO }, a.ALIGN_STRETCH, "alignItems")), e.setAlignSelf(Lt(o.alignSelf, { stretch: a.ALIGN_STRETCH, center: a.ALIGN_CENTER, "flex-start": a.ALIGN_FLEX_START, "flex-end": a.ALIGN_FLEX_END, baseline: a.ALIGN_BASELINE, normal: a.ALIGN_AUTO }, a.ALIGN_AUTO, "alignSelf")), e.setJustifyContent(Lt(o.justifyContent, { center: a.JUSTIFY_CENTER, "flex-start": a.JUSTIFY_FLEX_START, "flex-end": a.JUSTIFY_FLEX_END, "space-between": a.JUSTIFY_SPACE_BETWEEN, "space-around": a.JUSTIFY_SPACE_AROUND }, a.JUSTIFY_FLEX_START, "justifyContent")), e.setFlexDirection(Lt(o.flexDirection, { row: a.FLEX_DIRECTION_ROW, column: a.FLEX_DIRECTION_COLUMN, "row-reverse": a.FLEX_DIRECTION_ROW_REVERSE, "column-reverse": a.FLEX_DIRECTION_COLUMN_REVERSE }, a.FLEX_DIRECTION_ROW, "flexDirection")), e.setFlexWrap(Lt(o.flexWrap, { wrap: a.WRAP_WRAP, nowrap: a.WRAP_NO_WRAP, "wrap-reverse": a.WRAP_WRAP_REVERSE }, a.WRAP_NO_WRAP, "flexWrap")), typeof o.gap < "u" && e.setGap(a.GUTTER_ALL, o.gap), typeof o.rowGap < "u" && e.setGap(a.GUTTER_ROW, o.rowGap), typeof o.columnGap < "u" && e.setGap(a.GUTTER_COLUMN, o.columnGap), typeof o.flexBasis < "u" && e.setFlexBasis(o.flexBasis), e.setFlexGrow(typeof o.flexGrow > "u" ? 0 : o.flexGrow), e.setFlexShrink(typeof o.flexShrink > "u" ? 0 : o.flexShrink), typeof o.maxHeight < "u" && e.setMaxHeight(o.maxHeight), typeof o.maxWidth < "u" && e.setMaxWidth(o.maxWidth), typeof o.minHeight < "u" && e.setMinHeight(o.minHeight), typeof o.minWidth < "u" && e.setMinWidth(o.minWidth), e.setOverflow(Lt(o.overflow, { visible: a.OVERFLOW_VISIBLE, hidden: a.OVERFLOW_HIDDEN }, a.OVERFLOW_VISIBLE, "overflow")), e.setMargin(a.EDGE_TOP, o.marginTop || 0), e.setMargin(a.EDGE_BOTTOM, o.marginBottom || 0), e.setMargin(a.EDGE_LEFT, o.marginLeft || 0), e.setMargin(a.EDGE_RIGHT, o.marginRight || 0), e.setBorder(a.EDGE_TOP, o.borderTopWidth || 0), e.setBorder(a.EDGE_BOTTOM, o.borderBottomWidth || 0), e.setBorder(a.EDGE_LEFT, o.borderLeftWidth || 0), e.setBorder(a.EDGE_RIGHT, o.borderRightWidth || 0), e.setPadding(a.EDGE_TOP, o.paddingTop || 0), e.setPadding(a.EDGE_BOTTOM, o.paddingBottom || 0), e.setPadding(a.EDGE_LEFT, o.paddingLeft || 0), e.setPadding(a.EDGE_RIGHT, o.paddingRight || 0), e.setPositionType(Lt(o.position, { absolute: a.POSITION_TYPE_ABSOLUTE, relative: a.POSITION_TYPE_RELATIVE }, a.POSITION_TYPE_RELATIVE, "position")), typeof o.top < "u" && e.setPosition(a.EDGE_TOP, o.top), typeof o.bottom < "u" && e.setPosition(a.EDGE_BOTTOM, o.bottom), typeof o.left < "u" && e.setPosition(a.EDGE_LEFT, o.left), typeof o.right < "u" && e.setPosition(a.EDGE_RIGHT, o.right), typeof o.height < "u" ? e.setHeight(o.height) : e.setHeightAuto(), typeof o.width < "u" ? e.setWidth(o.width) : e.setWidthAuto(), [o, Yg(o)];
}
var vu = [1, 0, 0, 1, 0, 0];
function u1(e, t, r) {
  let n = [...vu];
  for (let i of e) {
    let a = Object.keys(i)[0], o = i[a];
    if (typeof o == "string")
      if (a === "translateX")
        o = parseFloat(o) / 100 * t, i[a] = o;
      else if (a === "translateY")
        o = parseFloat(o) / 100 * r, i[a] = o;
      else
        throw new Error(`Invalid transform: "${a}: ${o}".`);
    let u = o, s = [...vu];
    switch (a) {
      case "translateX":
        s[4] = u;
        break;
      case "translateY":
        s[5] = u;
        break;
      case "scale":
        s[0] = u, s[3] = u;
        break;
      case "scaleX":
        s[0] = u;
        break;
      case "scaleY":
        s[3] = u;
        break;
      case "rotate": {
        let l = u * Math.PI / 180, f = Math.cos(l), c = Math.sin(l);
        s[0] = f, s[1] = c, s[2] = -c, s[3] = f;
        break;
      }
      case "skewX":
        s[2] = Math.tan(u * Math.PI / 180);
        break;
      case "skewY":
        s[1] = Math.tan(u * Math.PI / 180);
        break;
    }
    n = zn(s, n);
  }
  e.splice(0, e.length), e.push(...n), e.__resolved = true;
}
function wl({ left: e, top: t, width: r, height: n }, i, a, o) {
  let u;
  i.__resolved || u1(i, r, n);
  let s = i;
  if (a)
    u = s;
  else {
    let l = o?.xAbsolute ?? (o?.xRelative ?? 50) * r / 100, f = o?.yAbsolute ?? (o?.yRelative ?? 50) * n / 100, c = e + l, p2 = t + f;
    u = zn([1, 0, 0, 1, c, p2], zn(s, [1, 0, 0, 1, -c, -p2])), s.__parent && (u = zn(s.__parent, u)), s.splice(0, 6, ...u);
  }
  return `matrix(${u.map((l) => l.toFixed(2)).join(",")})`;
}
function l1({ left: e, top: t, width: r, height: n, isInheritingTransform: i }, a) {
  let o = "", u = 1;
  return a.transform && (o = wl({ left: e, top: t, width: r, height: n }, a.transform, i, a.transformOrigin)), a.opacity !== void 0 && (u = +a.opacity), { matrix: o, opacity: u };
}
function f1({ id: e, content: t, filter: r, left: n, top: i, width: a, height: o, matrix: u, opacity: s, image: l, clipPathId: f, debug: c, shape: p2, decorationShape: d }, D) {
  let v = "";
  if (c && (v = ue("rect", { x: n, y: i - o, width: a, height: o, fill: "transparent", stroke: "#575eff", "stroke-width": 1, transform: u || void 0, "clip-path": f ? `url(#${f})` : void 0 })), l) {
    let y = { href: l, x: n, y: i, width: a, height: o, transform: u || void 0, "clip-path": f ? `url(#${f})` : void 0, style: D.filter ? `filter:${D.filter}` : void 0 };
    return [(r ? `${r}<g filter="url(#satori_s-${e})">` : "") + ue("image", { ...y, opacity: s !== 1 ? s : void 0 }) + (d || "") + (r ? "</g>" : "") + v, ""];
  }
  let g = { x: n, y: i, width: a, height: o, "font-weight": D.fontWeight, "font-style": D.fontStyle, "font-size": D.fontSize, "font-family": D.fontFamily, "letter-spacing": D.letterSpacing || void 0, transform: u || void 0, "clip-path": f ? `url(#${f})` : void 0, style: D.filter ? `filter:${D.filter}` : void 0 };
  return [(r ? `${r}<g filter="url(#satori_s-${e})">` : "") + ue("text", { ...g, fill: D.color, opacity: s !== 1 ? s : void 0 }, (0, Fa.default)(t)) + (d || "") + (r ? "</g>" : "") + v, p2 ? ue("text", g, (0, Fa.default)(t)) : ""];
}
function c1(e, t, r) {
  return e.replace(/([MA])([0-9.-]+),([0-9.-]+)/g, function(n, i, a, o) {
    return i + (parseFloat(a) + t) + "," + (parseFloat(o) + r);
  });
}
var Pn = 1.1;
function p1({ id: e, width: t, height: r }, n) {
  if (!n.shadowColor || !n.shadowOffset || typeof n.shadowRadius > "u")
    return "";
  let i = n.shadowColor.length, a = "", o = "", u = 0, s = t, l = 0, f = r;
  for (let c = 0; c < i; c++) {
    let p2 = n.shadowRadius[c] * n.shadowRadius[c] / 4;
    u = Math.min(n.shadowOffset[c].width - p2, u), s = Math.max(n.shadowOffset[c].width + p2 + t, s), l = Math.min(n.shadowOffset[c].height - p2, l), f = Math.max(n.shadowOffset[c].height + p2 + r, f), a += ue("feDropShadow", { dx: n.shadowOffset[c].width, dy: n.shadowOffset[c].height, stdDeviation: n.shadowRadius[c] / 2, "flood-color": n.shadowColor[c], "flood-opacity": 1, ...i > 1 ? { in: "SourceGraphic", result: `satori_s-${e}-result-${c}` } : {} }), i > 1 && (o = ue("feMergeNode", { in: `satori_s-${e}-result-${c}` }) + o);
  }
  return ue("filter", { id: `satori_s-${e}`, x: (u / t * 100 * Pn).toFixed(2) + "%", y: (l / r * 100 * Pn).toFixed(2) + "%", width: ((s - u) / t * 100 * Pn).toFixed(2) + "%", height: ((f - l) / r * 100 * Pn).toFixed(2) + "%" }, a + (o ? ue("feMerge", {}, o) : ""));
}
function h1({ width: e, height: t, shape: r, opacity: n, id: i }, a) {
  if (!a.boxShadow)
    return null;
  let o = "", u = "";
  for (let s = a.boxShadow.length - 1; s >= 0; s--) {
    let l = "", f = a.boxShadow[s];
    f.spreadRadius && f.inset && (f.spreadRadius = -f.spreadRadius);
    let c = f.blurRadius * f.blurRadius / 4 + (f.spreadRadius || 0), p2 = Math.min(-c - (f.inset ? f.offsetX : 0), 0), d = Math.max(c + e - (f.inset ? f.offsetX : 0), e), D = Math.min(-c - (f.inset ? f.offsetY : 0), 0), v = Math.max(c + t - (f.inset ? f.offsetY : 0), t), g = `satori_s-${i}-${s}`, y = `satori_ms-${i}-${s}`, b = f.spreadRadius ? r.replace('stroke-width="0"', `stroke-width="${f.spreadRadius * 2}"`) : r;
    l += ue("mask", { id: y, maskUnits: "userSpaceOnUse" }, ue("rect", { x: 0, y: 0, width: a._viewportWidth || "100%", height: a._viewportHeight || "100%", fill: f.inset ? "#000" : "#fff" }) + b.replace('fill="#fff"', f.inset ? 'fill="#fff"' : 'fill="#000"').replace('stroke="#fff"', ""));
    let C = b.replace(/d="([^"]+)"/, (k, S) => 'd="' + c1(S, f.offsetX, f.offsetY) + '"').replace(/x="([^"]+)"/, (k, S) => 'x="' + (parseFloat(S) + f.offsetX) + '"').replace(/y="([^"]+)"/, (k, S) => 'y="' + (parseFloat(S) + f.offsetY) + '"');
    f.spreadRadius && f.spreadRadius < 0 && (l += ue("mask", { id: y + "-neg", maskUnits: "userSpaceOnUse" }, C.replace('stroke="#fff"', 'stroke="#000"').replace(/stroke-width="[^"]+"/, `stroke-width="${-f.spreadRadius * 2}"`))), f.spreadRadius && f.spreadRadius < 0 && (C = ue("g", { mask: `url(#${y}-neg)` }, C)), l += ue("defs", {}, ue("filter", { id: g, x: `${p2 / e * 100}%`, y: `${D / t * 100}%`, width: `${(d - p2) / e * 100}%`, height: `${(v - D) / t * 100}%` }, ue("feGaussianBlur", { stdDeviation: f.blurRadius / 2, result: "b" }) + ue("feFlood", { "flood-color": f.color, in: "SourceGraphic", result: "f" }) + ue("feComposite", { in: "f", in2: "b", operator: f.inset ? "out" : "in" }))) + ue("g", { mask: `url(#${y})`, filter: `url(#${g})`, opacity: n }, C), f.inset ? u += l : o += l;
  }
  return [o, u];
}
function d1({ width: e, left: t, top: r, ascender: n, clipPathId: i }, a) {
  let { textDecorationColor: o, textDecorationStyle: u, textDecorationLine: s, fontSize: l, color: f } = a;
  if (!s || s === "none")
    return "";
  let c = Math.max(1, l * 0.1), p2 = s === "line-through" ? r + n * 0.7 : s === "underline" ? r + n * 1.1 : r, d = u === "dashed" ? `${c * 1.2} ${c * 2}` : u === "dotted" ? `0 ${c * 2}` : void 0;
  return ue("line", { x1: t, y1: p2, x2: t + e, y2: p2, stroke: o || f, "stroke-width": c, "stroke-dasharray": d, "stroke-linecap": u === "dotted" ? "round" : "square", "clip-path": i ? `url(#${i})` : void 0 });
}
function Ma(e) {
  return e = e.replace("U+", "0x"), String.fromCodePoint(Number(e));
}
var rn = Ma("U+0020");
var El = Ma("U+0009");
var Vn = Ma("U+2026");
function v1(e, t, r) {
  let { fontSize: n, letterSpacing: i } = r, a = /* @__PURE__ */ new Map();
  function o(l) {
    if (a.has(l))
      return a.get(l);
    let f = e.measure(l, { fontSize: n, letterSpacing: i });
    return a.set(l, f), f;
  }
  function u(l) {
    let f = 0;
    for (let c of l)
      t(c) ? f += n : f += o(c);
    return f;
  }
  function s(l) {
    return u(Pt(l, "grapheme"));
  }
  return { measureGrapheme: o, measureGraphemeArray: u, measureText: s };
}
function g1(e, t, r) {
  let { textTransform: n, whiteSpace: i, wordBreak: a } = t;
  e = m1(e, n, r);
  let { content: o, shouldCollapseTabsAndSpaces: u, allowSoftWrap: s } = b1(e, i), { words: l, requiredBreaks: f, allowBreakWord: c } = y1(o, a), [p2, d] = D1(t, s);
  return { words: l, requiredBreaks: f, allowSoftWrap: s, allowBreakWord: c, processedContent: o, shouldCollapseTabsAndSpaces: u, lineLimit: p2, blockEllipsis: d };
}
function m1(e, t, r) {
  return t === "uppercase" ? e = e.toLocaleUpperCase(r) : t === "lowercase" ? e = e.toLocaleLowerCase(r) : t === "capitalize" && (e = Pt(e, "word", r).map((n) => Pt(n, "grapheme", r).map((i, a) => a === 0 ? i.toLocaleUpperCase(r) : i).join("")).join("")), e;
}
function D1(e, t) {
  let { textOverflow: r, lineClamp: n, WebkitLineClamp: i, WebkitBoxOrient: a, overflow: o, display: u } = e;
  if (u === "block" && n) {
    let [s, l = Vn] = x1(n);
    if (s)
      return [s, l];
  }
  return r === "ellipsis" && u === "-webkit-box" && a === "vertical" && Ig(i) && i > 0 ? [i, Vn] : r === "ellipsis" && o === "hidden" && !t ? [1, Vn] : [1 / 0];
}
function y1(e, t) {
  let r = ["break-all", "break-word"].includes(t), { words: n, requiredBreaks: i } = Rg(e, t);
  return { words: n, requiredBreaks: i, allowBreakWord: r };
}
function b1(e, t) {
  let r = ["pre", "pre-wrap", "pre-line"].includes(t), n = ["normal", "nowrap", "pre-line"].includes(t), i = !["pre", "nowrap"].includes(t);
  return r || (e = e.replace(/\n/g, rn)), n && (e = e.replace(/([ ]|\t)+/g, rn).replace(/^[ ]|[ ]$/g, "")), { content: e, shouldCollapseTabsAndSpaces: n, allowSoftWrap: i };
}
function x1(e) {
  if (typeof e == "number")
    return [e];
  let t = /^(\d+)\s*"(.*)"$/, r = /^(\d+)\s*'(.*)'$/, n = t.exec(e), i = r.exec(e);
  if (n) {
    let a = +n[1], o = n[2];
    return [a, o];
  } else if (i) {
    let a = +i[1], o = i[2];
    return [a, o];
  }
  return [];
}
var w1 = /* @__PURE__ */ new Set([El]);
function E1(e) {
  return w1.has(e);
}
async function* F1(e, t) {
  let r = await Kn(), { parentStyle: n, inheritedStyle: i, parent: a, font: o, id: u, isInheritingTransform: s, debug: l, embedFont: f, graphemeImages: c, locale: p2, canLoadAdditionalAssets: d } = t, { textAlign: D, lineHeight: v, textWrap: g, fontSize: y, filter: b, tabSize: C = 8, letterSpacing: k, _inheritedBackgroundClipTextPath: S, flexShrink: E } = n, { words: L, requiredBreaks: T, allowSoftWrap: U, allowBreakWord: M, processedContent: H, shouldCollapseTabsAndSpaces: q, lineLimit: ee, blockEllipsis: A } = g1(e, n, p2), R = C1(r, D);
  a.insertChild(R, a.getChildCount()), Pg(E) && a.setFlexShrink(1);
  let O = o.getEngine(y, v, n, p2), Y = d ? Pt(H, "grapheme").filter((ve) => !E1(ve) && !O.has(ve)) : [];
  yield Y.map((ve) => ({ word: ve, locale: p2 })), Y.length && (O = o.getEngine(y, v, n, p2));
  function Z(ve) {
    return !!(c && c[ve]);
  }
  let { measureGrapheme: te, measureGraphemeArray: ie, measureText: B } = v1(O, Z, { fontSize: y, letterSpacing: k }), z = cl(C) ? Ie(C, y, 1, n) : te(rn) * C, _ = (ve, Le) => {
    if (ve.length === 0)
      return { originWidth: 0, endingSpacesWidth: 0, text: ve };
    let { index: Ue, tabCount: we } = S1(ve), Ne = 0;
    if (we > 0) {
      let $e = ve.slice(0, Ue), Fe = ve.slice(Ue + we), Ce = B($e), pt = Ce + Le;
      Ne = (z === 0 ? Ce : (Math.floor(pt / z) + we) * z) + B(Fe);
    } else
      Ne = B(ve);
    let Ae = ve.trimEnd() === ve ? Ne : B(ve.trimEnd());
    return { originWidth: Ne, endingSpacesWidth: Ne - Ae, text: ve };
  }, N = [], ae = [], W = [], fe = [], ce = [];
  function ge(ve) {
    let Le = 0, Ue = 0, we = -1, Ne = 0, Ae = 0, $e = 0, Fe = 0;
    N = [], W = [0], fe = [], ce = [];
    let Ce = 0, pt = 0;
    for (; Ce < L.length && Le < ee; ) {
      let me = L[Ce], Bt = T[Ce], Ke = 0, { originWidth: yt, endingSpacesWidth: rr, text: bt } = _(me, Ae);
      me = bt, Ke = yt;
      let Pe = rr;
      Bt && $e === 0 && ($e = O.height(me));
      let Ye = ",.!?:-@)>]}%#".indexOf(me[0]) < 0, ht = !Ae, wr = Ce && Ye && Ae + Ke > ve + Pe && U;
      if (M && Ke > ve && (!Ae || wr || Bt)) {
        let Qe = Pt(me, "grapheme");
        L.splice(Ce, 1, ...Qe), Ae > 0 && (N.push(Ae - pt), ae.push(Fe), Le++, Ne += $e, Ae = 0, $e = 0, Fe = 0, W.push(1), we = -1), pt = Pe;
        continue;
      }
      if (Bt || wr)
        q && me === rn && (Ke = 0), N.push(Ae - pt), ae.push(Fe), Le++, Ne += $e, Ae = Ke, $e = Ke ? O.height(me) : 0, Fe = Ke ? O.baseline(me) : 0, W.push(1), we = -1, Bt || (Ue = Math.max(Ue, ve));
      else {
        Ae += Ke;
        let Qe = O.height(me);
        Qe > $e && ($e = Qe, Fe = O.baseline(me)), ht && W[W.length - 1]++;
      }
      ht && we++, Ue = Math.max(Ue, Ae);
      let hr = Ae - Ke;
      if (Ke === 0)
        ce.push({ y: Ne, x: hr, width: 0, line: Le, lineIndex: we, isImage: false });
      else {
        let Qe = Pt(me, "word");
        for (let dt = 0; dt < Qe.length; dt++) {
          let Vt = Qe[dt], xt = 0, Nt = false;
          Z(Vt) ? (xt = y, Nt = true) : xt = te(Vt), fe.push(Vt), ce.push({ y: Ne, x: hr, width: xt, line: Le, lineIndex: we, isImage: Nt }), hr += xt;
        }
      }
      Ce++, pt = Pe;
    }
    return Ae && (Le < ee && (Ne += $e), Le++, N.push(Ae), ae.push(Fe)), { width: Ue, height: Ne };
  }
  let pe = { width: 0, height: 0 };
  R.setMeasureFunc((ve) => {
    let { width: Le, height: Ue } = ge(ve);
    if (g === "balance") {
      let Ne = Le / 2, Ae = Le, $e = Le;
      for (; Ne + 1 < Ae; ) {
        $e = (Ne + Ae) / 2;
        let { height: Ce } = ge($e);
        Ce > Ue ? Ne = $e : Ae = $e;
      }
      ge(Ae);
      let Fe = Math.ceil(Ae);
      return pe = { width: Fe, height: Ue }, { width: Fe, height: Ue };
    }
    let we = Math.ceil(Le);
    return pe = { width: we, height: Ue }, { width: we, height: Ue };
  });
  let [xe, _e] = yield, he = "", ye = "", Ge = i._inheritedClipPathId, tt = i._inheritedMaskId, { left: We, top: Be, width: He, height: rt } = R.getComputedLayout(), nt = a.getComputedWidth() - a.getComputedPadding(r.EDGE_LEFT) - a.getComputedPadding(r.EDGE_RIGHT) - a.getComputedBorder(r.EDGE_LEFT) - a.getComputedBorder(r.EDGE_RIGHT), it = xe + We, at = _e + Be, { matrix: Xe, opacity: Ct } = l1({ left: We, top: Be, width: He, height: rt, isInheritingTransform: s }, n), Dt = "";
  if (n.textShadowOffset) {
    let { textShadowColor: ve, textShadowOffset: Le, textShadowRadius: Ue } = n;
    Dt = p1({ width: pe.width, height: pe.height, id: u }, { shadowColor: ve, shadowOffset: Le, shadowRadius: Ue }), Dt = ue("defs", {}, Dt);
  }
  let ft = "", ct = "", zt = "", lt = -1, Ut = {}, qe = null, xr = 0;
  for (let ve = 0; ve < fe.length; ve++) {
    let Le = ce[ve], Ue = ce[ve + 1];
    if (!Le)
      continue;
    let we = fe[ve], Ne = null, Ae = false, $e = c ? c[we] : null, Fe = Le.y, Ce = Le.x, pt = Le.width, me = Le.line;
    if (me === lt)
      continue;
    let Bt = false;
    if (N.length > 1) {
      let Pe = He - N[me];
      if (D === "right" || D === "end")
        Ce += Pe;
      else if (D === "center")
        Ce += Pe / 2;
      else if (D === "justify" && me < N.length - 1) {
        let Ye = W[me], ht = Ye > 1 ? Pe / (Ye - 1) : 0;
        Ce += ht * Le.lineIndex, Bt = true;
      }
    }
    let Ke = ae[me], yt = O.baseline(we), rr = O.height(we), bt = Ke - yt;
    if (Ut[me] || (Ut[me] = [Ce, at + Fe + bt, yt, Bt ? He : N[me]]), ee !== 1 / 0) {
      let Pe = function(Qe, dt) {
        let Vt = Pt(dt, "grapheme", p2), xt = "", Nt = 0;
        for (let Or of Vt) {
          let pn = Qe + ie([xt + Or]);
          if (xt && pn + ht > nt)
            break;
          xt += Or, Nt = pn;
        }
        return { subset: xt, resolvedWidth: Nt };
      }, Ye = A, ht = te(A);
      ht > nt && (Ye = Vn, ht = te(Ye));
      let wr = te(rn), hr = me < N.length - 1;
      if (me + 1 === ee && (hr || N[me] > nt)) {
        if (Ce + pt + ht + wr > nt) {
          let { subset: Qe, resolvedWidth: dt } = Pe(Ce, we);
          we = Qe + Ye, lt = me, Ut[me][2] = dt, Ae = true;
        } else if (Ue && Ue.line !== me)
          if (D === "center") {
            let { subset: Qe, resolvedWidth: dt } = Pe(Ce, we);
            we = Qe + Ye, lt = me, Ut[me][2] = dt, Ae = true;
          } else {
            let Qe = fe[ve + 1], { subset: dt, resolvedWidth: Vt } = Pe(pt + Ce, Qe);
            we = we + dt + Ye, lt = me, Ut[me][2] = Vt, Ae = true;
          }
      }
    }
    if ($e)
      Fe += 0;
    else if (f) {
      if (!we.includes(El) && !Ag.includes(we) && fe[ve + 1] && Ue && !Ue.isImage && Fe === Ue.y && !Ae) {
        qe === null && (xr = Ce), qe = qe === null ? we : qe + we;
        continue;
      }
      let Pe = qe === null ? we : qe + we, Ye = qe === null ? Ce : xr, ht = Le.width + Ce - Ye;
      Ne = O.getSVG(Pe.replace(/(\t)+/g, ""), { fontSize: y, left: it + Ye, top: at + Fe + yt + bt, letterSpacing: k }), qe = null, l && (zt += ue("rect", { x: it + Ye, y: at + Fe + bt, width: ht, height: rr, fill: "transparent", stroke: "#575eff", "stroke-width": 1, transform: Xe || void 0, "clip-path": Ge ? `url(#${Ge})` : void 0 }) + ue("line", { x1: it + Ce, x2: it + Ce + Le.width, y1: at + Fe + bt + yt, y2: at + Fe + bt + yt, stroke: "#14c000", "stroke-width": 1, transform: Xe || void 0, "clip-path": Ge ? `url(#${Ge})` : void 0 }));
    } else
      Fe += yt + bt;
    if (n.textDecorationLine) {
      let Pe = Ut[me];
      Pe && !Pe[4] && (ft += d1({ left: it + Pe[0], top: Pe[1], width: Pe[3], ascender: Pe[2], clipPathId: Ge }, n), Pe[4] = 1);
    }
    if (Ne !== null)
      ct += Ne + " ";
    else {
      let [Pe, Ye] = f1({ content: we, filter: Dt, id: u, left: it + Ce, top: at + Fe, width: pt, height: rr, matrix: Xe, opacity: Ct, image: $e, clipPathId: Ge, debug: l, shape: !!S, decorationShape: ft }, n);
      he += Pe, ye += Ye, ft = "";
    }
    if (Ae)
      break;
  }
  if (ct) {
    let ve = n.color !== "transparent" && Ct !== 0 ? ue("path", { fill: n.color, d: ct, transform: Xe || void 0, opacity: Ct !== 1 ? Ct : void 0, "clip-path": Ge ? `url(#${Ge})` : void 0, mask: tt ? `url(#${tt})` : void 0, style: b ? `filter:${b}` : void 0 }) : "";
    S && (ye = ue("path", { d: ct, transform: Xe || void 0 })), he += (Dt ? Dt + ue("g", { filter: `url(#satori_s-${u})` }, ve + ft) : ve + ft) + zt;
  }
  return ye && (n._inheritedBackgroundClipTextPath.value += ye), he;
}
function C1(e, t) {
  let r = e.Node.create();
  return r.setAlignItems(e.ALIGN_BASELINE), r.setJustifyContent(Lt(t, { left: e.JUSTIFY_FLEX_START, right: e.JUSTIFY_FLEX_END, center: e.JUSTIFY_CENTER, justify: e.JUSTIFY_SPACE_BETWEEN, start: e.JUSTIFY_FLEX_START, end: e.JUSTIFY_FLEX_END }, e.JUSTIFY_FLEX_START, "textAlign")), r;
}
function S1(e) {
  let t = /(\t)+/.exec(e);
  return t ? { index: t.index, tabCount: t[0].length } : { index: null, tabCount: 0 };
}
var Ga = Ga || {};
var gu = { type: "directional", value: "bottom" };
Ga.parse = function() {
  var e = { linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i, repeatingLinearGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i, radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i, repeatingRadialGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i, sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i, extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/, positionKeywords: /^(left|center|right|top|bottom)/i, pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/, percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/, emLikeValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))(r?em|vw|vh)/, angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/, zeroValue: /[0]/, startCall: /^\(/, endCall: /^\)/, comma: /^,/, hexColor: /^\#([0-9a-fA-F]+)/, literalColor: /^([a-zA-Z]+)/, rgbColor: /^rgb/i, rgbaColor: /^rgba/i, number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/ }, t = "";
  function r(B) {
    var z = new Error(t + ": " + B);
    throw z.source = t, z;
  }
  function n() {
    var B = i();
    return t.length > 0 && r("Invalid input not EOF"), B;
  }
  function i() {
    return E(a);
  }
  function a() {
    return u("linear-gradient", e.linearGradient, l, gu) || u("repeating-linear-gradient", e.repeatingLinearGradient, l, gu) || u("radial-gradient", e.radialGradient, d) || u("repeating-radial-gradient", e.repeatingRadialGradient, d);
  }
  function o(B = {}) {
    var z, _, N, ae;
    let W = { ...B };
    return Object.assign(W, { style: (W.style || []).length > 0 ? W.style : [{ type: "extent-keyword", value: "farthest-corner" }], at: { type: "position", value: { x: { type: "position-keyword", value: "center", ...((_ = (z = W.at) == null ? void 0 : z.value) == null ? void 0 : _.x) || {} }, y: { type: "position-keyword", value: "center", ...((ae = (N = W.at) == null ? void 0 : N.value) == null ? void 0 : ae.y) || {} } } } }), B.value || Object.assign(W, { type: "shape", value: W.style.some((fe) => ["%", "extent-keyword"].includes(fe.type)) ? "ellipse" : "circle" }), W;
  }
  function u(B, z, _, N) {
    return s(z, function(ae) {
      var W = _();
      return W ? te(e.comma) || r("Missing comma before color stops") : W = N, { type: B, orientation: B.endsWith("radial-gradient") ? W?.map((fe) => o(fe)) ?? [o()] : W, colorStops: E(L) };
    });
  }
  function s(B, z) {
    var _ = te(B);
    if (_) {
      te(e.startCall) || r("Missing (");
      var N = z(_);
      return te(e.endCall) || r("Missing )"), N;
    }
  }
  function l() {
    return f() || c() || p2();
  }
  function f() {
    return Z("directional", e.sideOrCorner, 1);
  }
  function c() {
    return Z("angular", e.angleValue, 1);
  }
  function p2() {
    return Z("directional", e.zeroValue, 0);
  }
  function d() {
    var B, z = D(), _;
    return z && (B = [], B.push(z), _ = t, te(e.comma) && (z = D(), z ? B.push(z) : t = _)), B;
  }
  function D() {
    let B = v(), z = C();
    if (!(!B && !z))
      return { ...B, at: z };
  }
  function v() {
    let B = g() || y(), z = b() || O() || A(), _ = Z("%", e.percentageValue, 1);
    if (B)
      return { ...B, style: [z, _].filter((N) => N) };
    if (z)
      return { style: [z, _].filter((N) => N), ...g() || y() };
  }
  function g() {
    return Z("shape", /^(circle)/i, 0);
  }
  function y() {
    return Z("shape", /^(ellipse)/i, 0);
  }
  function b() {
    return Z("extent-keyword", e.extentKeywords, 1);
  }
  function C() {
    if (Z("position", /^at/, 0)) {
      var B = k();
      return B || r("Missing positioning value"), B;
    }
  }
  function k() {
    var B = S();
    if (B.x || B.y)
      return { type: "position", value: B };
  }
  function S() {
    return { x: A(), y: A() };
  }
  function E(B) {
    var z = B(), _ = [];
    if (z)
      for (_.push(z); te(e.comma); )
        z = B(), z ? _.push(z) : r("One extra comma");
    return _;
  }
  function L() {
    var B = T();
    return B || r("Expected color definition"), B.length = A(), B;
  }
  function T() {
    return M() || q() || H() || U();
  }
  function U() {
    return Z("literal", e.literalColor, 0);
  }
  function M() {
    return Z("hex", e.hexColor, 1);
  }
  function H() {
    return s(e.rgbColor, function() {
      return { type: "rgb", value: E(ee) };
    });
  }
  function q() {
    return s(e.rgbaColor, function() {
      return { type: "rgba", value: E(ee) };
    });
  }
  function ee() {
    return te(e.number)[1];
  }
  function A() {
    return Z("%", e.percentageValue, 1) || R() || O();
  }
  function R() {
    return Z("position-keyword", e.positionKeywords, 1);
  }
  function O() {
    return Z("px", e.pixelValue, 1) || Y(e.emLikeValue, 1);
  }
  function Y(B, z) {
    var _ = te(B);
    if (_)
      return { type: _[5], value: _[z] };
  }
  function Z(B, z, _) {
    var N = te(z);
    if (N)
      return { type: B, value: N[_] };
  }
  function te(B) {
    var z, _;
    return _ = /^[\n\r\t\s]+/.exec(t), _ && ie(_[0].length), z = B.exec(t), z && ie(z[0].length), z;
  }
  function ie(B) {
    t = t.substr(B);
  }
  return function(B) {
    return t = B.toString(), n();
  };
}();
var mu = Ga;
function k1(e) {
  return e.type === "literal" ? e.value : e.type === "hex" ? `#${e.value}` : e.type === "rgb" ? `rgb(${e.value.join(",")})` : e.type === "rgba" ? `rgba(${e.value.join(",")})` : "transparent";
}
function T1(e) {
  let t = 0, r = 0, n = 0, i = 0;
  return e.includes("top") ? r = 1 : e.includes("bottom") && (i = 1), e.includes("left") ? t = 1 : e.includes("right") && (n = 1), !t && !n && !r && !i && (r = 1), [t, r, n, i];
}
function _1(e, t) {
  return typeof e == "string" && e.endsWith("%") ? t * parseFloat(e) / 100 : +e;
}
function va(e, { x: t, y: r, defaultX: n, defaultY: i }) {
  return (e ? e.split(" ").map((a) => {
    try {
      let o = new Qn(a);
      return o.type === "length" || o.type === "number" ? o.value : o.value + o.unit;
    } catch {
      return null;
    }
  }).filter((a) => a !== null) : [n, i]).map((a, o) => _1(a, [t, r][o]));
}
function Du(e, t, r) {
  let n = [];
  for (let u of t) {
    let s = k1(u);
    if (!n.length && (n.push({ offset: 0, color: s }), typeof u.length > "u" || u.length.value === "0"))
      continue;
    let l = typeof u.length > "u" ? void 0 : u.length.type === "%" ? u.length.value / 100 : u.length.value / e;
    n.push({ offset: l, color: s });
  }
  n.length || n.push({ offset: 0, color: "transparent" });
  let i = n[n.length - 1];
  i.offset !== 1 && (typeof i.offset > "u" ? i.offset = 1 : n.push({ offset: 1, color: i.color }));
  let a = 0, o = 1;
  for (let u = 0; u < n.length; u++)
    if (typeof n[u].offset > "u") {
      for (o < u && (o = u); typeof n[o].offset > "u"; )
        o++;
      n[u].offset = (n[o].offset - n[a].offset) / (o - a) * (u - a) + n[a].offset;
    } else
      a = u;
  return r === "mask" ? n.map((u) => {
    let s = (0, Fl.default)(u.color);
    return s.alpha === 0 ? { ...u, color: "rgba(0, 0, 0, 1)" } : { ...u, color: `rgba(255, 255, 255, ${s.alpha})` };
  }) : n;
}
async function Cl({ id: e, width: t, height: r, left: n, top: i }, { image: a, size: o, position: u, repeat: s }, l, f) {
  s = s || "repeat", f = f || "background";
  let c = s === "repeat-x" || s === "repeat", p2 = s === "repeat-y" || s === "repeat", d = va(o, { x: t, y: r, defaultX: t, defaultY: r }), D = va(u, { x: t, y: r, defaultX: 0, defaultY: 0 });
  if (a.startsWith("linear-gradient(")) {
    let v = mu.parse(a)[0], [g, y] = d, b, C, k, S, E;
    if (v.orientation.type === "directional")
      [b, C, k, S] = T1(v.orientation.value), E = Math.sqrt(Math.pow((k - b) * g, 2) + Math.pow((S - C) * y, 2));
    else if (v.orientation.type === "angular") {
      let H = function(ee) {
        if (ee = (ee % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2), Math.abs(ee - Math.PI / 2) < 1e-6) {
          b = 0, C = 0, k = 1, S = 0, E = g;
          return;
        } else if (Math.abs(ee) < 1e-6) {
          b = 0, C = 1, k = 0, S = 0, E = y;
          return;
        }
        if (ee >= Math.PI / 2 && ee < Math.PI) {
          H(Math.PI - ee), C = 1 - C, S = 1 - S;
          return;
        } else if (ee >= Math.PI) {
          H(ee - Math.PI);
          let B = b;
          b = k, k = B, B = C, C = S, S = B;
          return;
        }
        let A = Math.tan(ee), R = A * q, O = Math.atan(R), Y = Math.sqrt(2) * Math.cos(Math.PI / 4 - O);
        b = 0, C = 1, k = Math.sin(O) * Y, S = 1 - Math.cos(O) * Y;
        let Z = 1, te = 1 / A, ie = Math.abs((Z * q + te) / Math.sqrt(Z * Z + te * te) / Math.sqrt(q * q + 1));
        E = Math.sqrt(g * g + y * y) * ie;
      }, q = g / y;
      H(+v.orientation.value / 180 * Math.PI);
    }
    let L = Du(E, v.colorStops, f), T = `satori_bi${e}`, U = `satori_pattern_${e}`, M = ue("pattern", { id: U, x: D[0] / t, y: D[1] / r, width: c ? g / t : "1", height: p2 ? y / r : "1", patternUnits: "objectBoundingBox" }, ue("linearGradient", { id: T, x1: b, y1: C, x2: k, y2: S }, L.map((H) => ue("stop", { offset: H.offset * 100 + "%", "stop-color": H.color })).join("")) + ue("rect", { x: 0, y: 0, width: g, height: y, fill: `url(#${T})` }));
    return [U, M];
  }
  if (a.startsWith("radial-gradient(")) {
    let v = mu.parse(a)[0], g = v.orientation[0], [y, b] = d, C = "circle", k = y / 2, S = b / 2;
    if (g.type === "shape") {
      if (C = g.value, g.at)
        if (g.at.type === "position") {
          let q = A1(g.at.value.x, g.at.value.y, y, b, l.fontSize, l);
          k = q.x, S = q.y;
        } else
          throw new Error("orientation.at.type not implemented: " + g.at.type);
    } else
      throw new Error("orientation.type not implemented: " + g.type);
    let E = Du(t, v.colorStops, f), L = `satori_radial_${e}`, T = `satori_pattern_${e}`, U = `satori_mask_${e}`, M = O1(C, g.style, l.fontSize, { x: k, y: S }, [y, b], l), H = ue("pattern", { id: T, x: D[0] / t, y: D[1] / r, width: c ? y / t : "1", height: p2 ? b / r : "1", patternUnits: "objectBoundingBox" }, ue("radialGradient", { id: L }, E.map((q) => ue("stop", { offset: q.offset, "stop-color": q.color })).join("")) + ue("mask", { id: U }, ue("rect", { x: 0, y: 0, width: y, height: b, fill: "#fff" })) + ue("rect", { x: 0, y: 0, width: y, height: b, fill: E.at(-1).color }) + ue(C, { cx: k, cy: S, width: y, height: b, ...M, fill: `url(#${L})`, mask: `url(#${U})` }));
    return [T, H];
  }
  if (a.startsWith("url(")) {
    let v = va(o, { x: t, y: r, defaultX: 0, defaultY: 0 }), [g, y, b] = await Na(a.slice(4, -1)), C = f === "mask" ? y || v[0] : v[0] || y, k = f === "mask" ? b || v[1] : v[1] || b;
    return [`satori_bi${e}`, ue("pattern", { id: `satori_bi${e}`, patternContentUnits: "userSpaceOnUse", patternUnits: "userSpaceOnUse", x: D[0] + n, y: D[1] + i, width: c ? C : "100%", height: p2 ? k : "100%" }, ue("image", { x: 0, y: 0, width: C, height: k, preserveAspectRatio: "none", href: g }))];
  }
  throw new Error(`Invalid background image: "${a}"`);
}
function A1(e, t, r, n, i, a) {
  let o = { x: r / 2, y: n / 2 };
  return e.type === "position-keyword" ? Object.assign(o, yu(e.value, r, n, "x")) : o.x = Ie(`${e.value}${e.type}`, i, r, a, true), t.type === "position-keyword" ? Object.assign(o, yu(t.value, r, n, "y")) : o.y = Ie(`${t.value}${t.type}`, i, n, a, true), o;
}
function yu(e, t, r, n) {
  switch (e) {
    case "center":
      return { [n]: n === "x" ? t / 2 : r / 2 };
    case "left":
      return { x: 0 };
    case "top":
      return { y: 0 };
    case "right":
      return { x: t };
    case "bottom":
      return { y: r };
  }
}
function O1(e, t, r, n, i, a) {
  let [o, u] = i, { x: s, y: l } = n, f = {}, c = 0, p2 = 0;
  if (!t.some((d) => d.type === "extent-keyword")) {
    if (t.some((d) => d.value.startsWith("-")))
      throw new Error("disallow setting negative values to the size of the shape. Check https://w3c.github.io/csswg-drafts/css-images/#valdef-rg-size-length-0");
    return e === "circle" ? { r: Ie(`${t[0].value}${t[0].type}`, r, o, a, true) } : { rx: Ie(`${t[0].value}${t[0].type}`, r, o, a, true), ry: Ie(`${t[1].value}${t[1].type}`, r, u, a, true) };
  }
  switch (t[0].value) {
    case "farthest-corner":
      c = Math.max(Math.abs(o - s), Math.abs(s)), p2 = Math.max(Math.abs(u - l), Math.abs(l));
      break;
    case "closest-corner":
      c = Math.min(Math.abs(o - s), Math.abs(s)), p2 = Math.min(Math.abs(u - l), Math.abs(l));
      break;
    case "farthest-side":
      return e === "circle" ? f.r = Math.max(Math.abs(o - s), Math.abs(s), Math.abs(u - l), Math.abs(l)) : (f.rx = Math.max(Math.abs(o - s), Math.abs(s)), f.ry = Math.max(Math.abs(u - l), Math.abs(l))), f;
    case "closest-side":
      return e === "circle" ? f.r = Math.min(Math.abs(o - s), Math.abs(s), Math.abs(u - l), Math.abs(l)) : (f.rx = Math.min(Math.abs(o - s), Math.abs(s)), f.ry = Math.min(Math.abs(u - l), Math.abs(l))), f;
  }
  if (e === "circle")
    f.r = Math.sqrt(c * c + p2 * p2);
  else {
    let d = p2 !== 0 ? c / p2 : 1;
    c === 0 ? (f.rx = 0, f.ry = 0) : (f.ry = Math.sqrt(c * c + p2 * p2 * d * d) / d, f.rx = f.ry * d);
  }
  return f;
}
function L1([e, t]) {
  return Math.round(e * 1e3) === 0 && Math.round(t * 1e3) === 0 ? 0 : Math.round(e * t / Math.sqrt(e * e + t * t) * 1e3) / 1e3;
}
function Rn(e, t, r) {
  return r < e + t && (r / 2 < e && r / 2 < t ? e = t = r / 2 : r / 2 < e ? e = r - t : r / 2 < t && (t = r - e)), [e, t];
}
function Un(e) {
  e[0] = e[1] = Math.min(e[0], e[1]);
}
function Bn(e, t, r, n, i) {
  if (typeof e == "string") {
    let a = e.split(" ").map((u) => u.trim()), o = !a[1] && !a[0].endsWith("%");
    return a[1] = a[1] || a[0], [o, [Math.min(Ie(a[0], n, t, i, true), t), Math.min(Ie(a[1], n, r, i, true), r)]];
  }
  return typeof e == "number" ? [true, [Math.min(e, t), Math.min(e, r)]] : [true, void 0];
}
var Nn = (e) => e && e[0] !== 0 && e[1] !== 0;
function qn({ left: e, top: t, width: r, height: n }, i, a) {
  let { borderTopLeftRadius: o, borderTopRightRadius: u, borderBottomLeftRadius: s, borderBottomRightRadius: l, fontSize: f } = i, c, p2, d, D;
  if ([c, o] = Bn(o, r, n, f, i), [p2, u] = Bn(u, r, n, f, i), [d, s] = Bn(s, r, n, f, i), [D, l] = Bn(l, r, n, f, i), !a && !Nn(o) && !Nn(u) && !Nn(s) && !Nn(l))
    return "";
  o ||= [0, 0], u ||= [0, 0], s ||= [0, 0], l ||= [0, 0], [o[0], u[0]] = Rn(o[0], u[0], r), [s[0], l[0]] = Rn(s[0], l[0], r), [o[1], s[1]] = Rn(o[1], s[1], n), [u[1], l[1]] = Rn(u[1], l[1], n), c && Un(o), p2 && Un(u), d && Un(s), D && Un(l);
  let v = [];
  v[0] = [u, u], v[1] = [l, [-l[0], l[1]]], v[2] = [s, [-s[0], -s[1]]], v[3] = [o, [o[0], -o[1]]];
  let g = `h${r - o[0] - u[0]} a${v[0][0]} 0 0 1 ${v[0][1]}`, y = `v${n - u[1] - l[1]} a${v[1][0]} 0 0 1 ${v[1][1]}`, b = `h${l[0] + s[0] - r} a${v[2][0]} 0 0 1 ${v[2][1]}`, C = `v${s[1] + o[1] - n} a${v[3][0]} 0 0 1 ${v[3][1]}`;
  if (a) {
    let k = function(q) {
      let ee = L1([o, u, l, s][q]);
      return q === 0 ? [[e + o[0] - ee, t + o[1] - ee], [e + o[0], t]] : q === 1 ? [[e + r - u[0] + ee, t + u[1] - ee], [e + r, t + u[1]]] : q === 2 ? [[e + r - l[0] + ee, t + n - l[1] + ee], [e + r - l[0], t + n]] : [[e + s[0] - ee, t + n - s[1] + ee], [e, t + n - s[1]]];
    }, S = a.indexOf(false);
    if (!a.includes(true))
      throw new Error("Invalid `partialSides`.");
    if (S === -1)
      S = 0;
    else
      for (; !a[S]; )
        S = (S + 1) % 4;
    let E = "", L = k(S), T = `M${L[0]} A${v[(S + 3) % 4][0]} 0 0 1 ${L[1]}`, U = 0;
    for (; U < 4 && a[(S + U) % 4]; U++)
      E += T + " ", T = [g, y, b, C][(S + U) % 4];
    let M = (S + U) % 4;
    E += T.split(" ")[0];
    let H = k(M);
    return E += ` A${v[(M + 3) % 4][0]} 0 0 1 ${H[0]}`, E;
  }
  return `M${e + o[0]},${t} ${g} ${y} ${b} ${C}`;
}
function bu(e, t, r) {
  return r[e + "Width"] === r[t + "Width"] && r[e + "Style"] === r[t + "Style"] && r[e + "Color"] === r[t + "Color"];
}
function I1({ id: e, currentClipPathId: t, borderPath: r, borderType: n, left: i, top: a, width: o, height: u }, s) {
  if (!(s.borderTopWidth || s.borderRightWidth || s.borderBottomWidth || s.borderLeftWidth))
    return null;
  let l = `satori_bc-${e}`;
  return [ue("clipPath", { id: l, "clip-path": t ? `url(#${t})` : void 0 }, ue(n, { x: i, y: a, width: o, height: u, d: r || void 0 })), l];
}
function Sl({ left: e, top: t, width: r, height: n, props: i, asContentMask: a, maskBorderOnly: o }, u) {
  let s = ["borderTop", "borderRight", "borderBottom", "borderLeft"];
  if (!a && !s.some((d) => u[d + "Width"]))
    return "";
  let l = "", f = 0;
  for (; f > 0 && bu(s[f], s[(f + 3) % 4], u); )
    f = (f + 3) % 4;
  let c = [false, false, false, false], p2 = [];
  for (let d = 0; d < 4; d++) {
    let D = (f + d) % 4, v = (f + d + 1) % 4, g = s[D], y = s[v];
    if (c[D] = true, p2 = [u[g + "Width"], u[g + "Style"], u[g + "Color"], g], !bu(g, y, u)) {
      let b = (p2[0] || 0) + (a && !o && u[g.replace("border", "padding")] || 0);
      b && (l += ue("path", { width: r, height: n, ...i, fill: "none", stroke: a ? "#000" : p2[2], "stroke-width": b * 2, "stroke-dasharray": !a && p2[1] === "dashed" ? b * 2 + " " + b : void 0, d: qn({ left: e, top: t, width: r, height: n }, u, c) })), c = [false, false, false, false];
    }
  }
  if (c.some(Boolean)) {
    let d = (p2[0] || 0) + (a && !o && u[p2[3].replace("border", "padding")] || 0);
    d && (l += ue("path", { width: r, height: n, ...i, fill: "none", stroke: a ? "#000" : p2[2], "stroke-width": d * 2, "stroke-dasharray": !a && p2[1] === "dashed" ? d * 2 + " " + d : void 0, d: qn({ left: e, top: t, width: r, height: n }, u, c) }));
  }
  return l;
}
function P1({ id: e, left: t, top: r, width: n, height: i, matrix: a, borderOnly: o }, u) {
  let s = (u.borderLeftWidth || 0) + (o ? 0 : u.paddingLeft || 0), l = (u.borderTopWidth || 0) + (o ? 0 : u.paddingTop || 0), f = (u.borderRightWidth || 0) + (o ? 0 : u.paddingRight || 0), c = (u.borderBottomWidth || 0) + (o ? 0 : u.paddingBottom || 0), p2 = { x: t + s, y: r + l, width: n - s - f, height: i - l - c };
  return ue("mask", { id: e }, ue("rect", { ...p2, fill: "#fff", mask: u._inheritedMaskId ? `url(#${u._inheritedMaskId})` : void 0 }) + Sl({ left: t, top: r, width: n, height: i, props: { transform: a || void 0 }, asContentMask: true, maskBorderOnly: o }, u));
}
var Zr = { circle: /circle\((.+)\)/, ellipse: /ellipse\((.+)\)/, path: /path\((.+)\)/, polygon: /polygon\((.+)\)/, inset: /inset\((.+)\)/ };
function R1({ width: e, height: t }, r, n) {
  function i(l) {
    let f = l.match(Zr.circle);
    if (!f)
      return null;
    let [, c] = f, [p2, d = ""] = c.split("at").map((g) => g.trim()), { x: D, y: v } = wu(d, e, t);
    return { type: "circle", r: Ie(p2, n.fontSize, Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / Math.sqrt(2), n, true), cx: Ie(D, n.fontSize, e, n, true), cy: Ie(v, n.fontSize, t, n, true) };
  }
  function a(l) {
    let f = l.match(Zr.ellipse);
    if (!f)
      return null;
    let [, c] = f, [p2, d = ""] = c.split("at").map((b) => b.trim()), [D, v] = p2.split(" "), { x: g, y } = wu(d, e, t);
    return { type: "ellipse", rx: Ie(D || "50%", n.fontSize, e, n, true), ry: Ie(v || "50%", n.fontSize, t, n, true), cx: Ie(g, n.fontSize, e, n, true), cy: Ie(y, n.fontSize, t, n, true) };
  }
  function o(l) {
    let f = l.match(Zr.path);
    if (!f)
      return null;
    let [c, p2] = xu(f[1]);
    return { type: "path", d: p2, "fill-rule": c };
  }
  function u(l) {
    let f = l.match(Zr.polygon);
    if (!f)
      return null;
    let [c, p2] = xu(f[1]);
    return { type: "polygon", "fill-rule": c, points: p2.split(",").map((d) => d.split(" ").map((D, v) => Ie(D, n.fontSize, v === 0 ? e : t, n, true)).join(" ")).join(",") };
  }
  function s(l) {
    let f = l.match(Zr.inset);
    if (!f)
      return null;
    let [c, p2] = (f[1].includes("round") ? f[1] : `${f[1].trim()} round 0`).split("round"), d = (0, Ca.getStylesForProperty)("borderRadius", p2, true), D = Object.values(d).map((k) => String(k)).map((k, S) => Ie(k, n.fontSize, S === 0 || S === 2 ? t : e, n, true) || 0), v = Object.values((0, Ca.getStylesForProperty)("margin", c, true)).map((k) => String(k)).map((k, S) => Ie(k, n.fontSize, S === 0 || S === 2 ? t : e, n, true) || 0), g = v[3], y = v[0], b = e - (v[1] + v[3]), C = t - (v[0] + v[2]);
    return D.some((k) => k > 0) ? { type: "path", d: qn({ left: g, top: y, width: b, height: C }, { ...r, ...d }) } : { type: "rect", x: g, y, width: b, height: C };
  }
  return { parseCircle: i, parseEllipse: a, parsePath: o, parsePolygon: u, parseInset: s };
}
function xu(e) {
  let [, t = "nonzero", r] = e.replace(/('|")/g, "").match(/^(nonzero|evenodd)?,?(.+)/) || [];
  return [t, r];
}
function wu(e, t, r) {
  let n = e.split(" "), i = { x: n[0] || "50%", y: n[1] || "50%" };
  return n.forEach((a) => {
    a === "top" ? i.y = 0 : a === "bottom" ? i.y = r : a === "left" ? i.x = 0 : a === "right" ? i.x = t : a === "center" && (i.x = t / 2, i.y = r / 2);
  }), i;
}
function Wa(e) {
  return `satori_cp-${e}`;
}
function U1(e) {
  return `url(#${Wa(e)})`;
}
function B1(e, t, r) {
  if (t.clipPath === "none")
    return "";
  let n = R1(e, t, r), i = t.clipPath, a = { type: "" };
  for (let o of Object.keys(n))
    if (a = n[o](i), a)
      break;
  if (a) {
    let { type: o, ...u } = a;
    return ue("clipPath", { id: Wa(e.id), "clip-path": e.currentClipPath, transform: `translate(${e.left}, ${e.top})` }, ue(o, u));
  }
  return "";
}
function N1({ left: e, top: t, width: r, height: n, path: i, matrix: a, id: o, currentClipPath: u, src: s }, l, f) {
  let c = "", p2 = l.clipPath && l.clipPath !== "none" ? B1({ left: e, top: t, width: r, height: n, path: i, id: o, matrix: a, currentClipPath: u, src: s }, l, f) : "";
  if (l.overflow !== "hidden" && !s)
    c = "";
  else {
    let D = p2 ? `satori_ocp-${o}` : Wa(o);
    c = ue("clipPath", { id: D, "clip-path": u }, ue(i ? "path" : "rect", { x: e, y: t, width: r, height: n, d: i || void 0 }));
  }
  let d = P1({ id: `satori_om-${o}`, left: e, top: t, width: r, height: n, matrix: a, borderOnly: !s }, l);
  return p2 + c + d;
}
var M1 = (e) => `satori_mi-${e}`;
async function G1(e, t, r) {
  if (!t.maskImage)
    return ["", ""];
  let { left: n, top: i, width: a, height: o, id: u } = e, s = t.maskImage, l = s.length;
  if (!l)
    return ["", ""];
  let f = M1(u), c = "";
  for (let p2 = 0; p2 < l; p2++) {
    let d = s[p2], [D, v] = await Cl({ id: `${f}-${p2}`, left: n, top: i, width: a, height: o }, d, r, "mask");
    c += v + ue("rect", { x: 0, y: 0, width: a, height: o, fill: `url(#${D})` });
  }
  return c = ue("mask", { id: f }, c), [f, c];
}
async function ga({ id: e, left: t, top: r, width: n, height: i, isInheritingTransform: a, src: o, debug: u }, s, l) {
  if (s.display === "none")
    return "";
  let f = !!o, c = "rect", p2 = "", d = "", D = [], v = 1, g = "";
  s.backgroundColor && D.push(s.backgroundColor), s.opacity !== void 0 && (v = +s.opacity), s.transform && (p2 = wl({ left: t, top: r, width: n, height: i }, s.transform, a, s.transformOrigin));
  let y = "";
  if (s.backgroundImage) {
    let A = [];
    for (let R = 0; R < s.backgroundImage.length; R++) {
      let O = s.backgroundImage[R], Y = await Cl({ id: e + "_" + R, width: n, height: i, left: t, top: r }, O, l);
      Y && A.unshift(Y);
    }
    for (let R of A)
      D.push(`url(#${R[0]})`), d += R[1], R[2] && (y += R[2]);
  }
  let [b, C] = await G1({ id: e, left: t, top: r, width: n, height: i }, s, l);
  d += C;
  let k = b ? `url(#${b})` : s._inheritedMaskId ? `url(#${s._inheritedMaskId})` : void 0, S = qn({ left: t, top: r, width: n, height: i }, s);
  S && (c = "path");
  let E = s._inheritedClipPathId;
  u && (g = ue("rect", { x: t, y: r, width: n, height: i, fill: "transparent", stroke: "#ff5757", "stroke-width": 1, transform: p2 || void 0, "clip-path": E ? `url(#${E})` : void 0 }));
  let { backgroundClip: L, filter: T } = s, U = L === "text" ? `url(#satori_bct-${e})` : E ? `url(#${E})` : s.clipPath ? U1(e) : void 0, M = N1({ left: t, top: r, width: n, height: i, path: S, id: e, matrix: p2, currentClipPath: U, src: o }, s, l), H = D.map((A) => ue(c, { x: t, y: r, width: n, height: i, fill: A, d: S || void 0, transform: p2 || void 0, "clip-path": U, style: T ? `filter:${T}` : void 0, mask: k })).join(""), q = I1({ id: e, left: t, top: r, width: n, height: i, currentClipPathId: E, borderPath: S, borderType: c }, s);
  if (f) {
    let A = (s.borderLeftWidth || 0) + (s.paddingLeft || 0), R = (s.borderTopWidth || 0) + (s.paddingTop || 0), O = (s.borderRightWidth || 0) + (s.paddingRight || 0), Y = (s.borderBottomWidth || 0) + (s.paddingBottom || 0), Z = s.objectFit === "contain" ? "xMidYMid" : s.objectFit === "cover" ? "xMidYMid slice" : "none";
    H += ue("image", { x: t + A, y: r + R, width: n - A - O, height: i - R - Y, href: o, preserveAspectRatio: Z, transform: p2 || void 0, style: T ? `filter:${T}` : void 0, "clip-path": `url(#satori_cp-${e})`, mask: b ? `url(#${b})` : `url(#satori_om-${e})` });
  }
  if (q) {
    d += q[0];
    let A = q[1];
    H += Sl({ left: t, top: r, width: n, height: i, props: { transform: p2 || void 0, "clip-path": `url(#${A})` } }, s);
  }
  let ee = h1({ width: n, height: i, id: e, opacity: v, shape: ue(c, { x: t, y: r, width: n, height: i, fill: "#fff", stroke: "#fff", "stroke-width": 0, d: S || void 0, transform: p2 || void 0, "clip-path": U, mask: k }) }, s);
  return (d ? ue("defs", {}, d) : "") + (ee ? ee[0] : "") + M + (v !== 1 ? `<g opacity="${v}">` : "") + (y || H) + (v !== 1 ? "</g>" : "") + (ee ? ee[1] : "") + g;
}
var W1 = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var $1 = new RegExp(W1(), "");
var Sa = { emoji: $1, symbol: /\p{Symbol}/u, math: /\p{Math}/u };
var ka = { "ja-JP": /\p{scx=Hira}|\p{scx=Kana}|\p{scx=Han}|[\u3000]|[\uFF00-\uFFEF]/u, "ko-KR": /\p{scx=Hangul}/u, "zh-CN": /\p{scx=Han}/u, "zh-TW": /\p{scx=Han}/u, "zh-HK": /\p{scx=Han}/u, "th-TH": /\p{scx=Thai}/u, "bn-IN": /\p{scx=Bengali}/u, "ar-AR": /\p{scx=Arabic}/u, "ta-IN": /\p{scx=Tamil}/u, "ml-IN": /\p{scx=Malayalam}/u, "he-IL": /\p{scx=Hebrew}/u, "te-IN": /\p{scx=Telugu}/u, devanagari: /\p{scx=Devanagari}/u, kannada: /\p{scx=Kannada}/u };
var $a = Object.keys({ ...ka, ...Sa });
function j1(e) {
  return $a.includes(e);
}
function z1(e, t) {
  for (let n of Object.keys(Sa))
    if (Sa[n].test(e))
      return [n];
  let r = Object.keys(ka).filter((n) => ka[n].test(e));
  if (r.length === 0)
    return ["unknown"];
  if (t) {
    let n = r.findIndex((i) => i === t);
    n !== -1 && (r.splice(n, 1), r.unshift(t));
  }
  return r;
}
function V1(e) {
  if (e)
    return $a.find((t) => t.toLowerCase().startsWith(e.toLowerCase()));
}
async function* Ta(e, t) {
  var r;
  let n = await Kn(), { id: i, inheritedStyle: a, parent: o, font: u, debug: s, locale: l, embedFont: f = true, graphemeImages: c, canLoadAdditionalAssets: p2, getTwStyles: d } = t;
  if (e === null || typeof e > "u")
    return yield, yield, "";
  if (!jn(e) || typeof e.type == "function") {
    let N;
    if (!jn(e))
      N = F1(String(e), t), yield (await N.next()).value;
    else {
      if (kg(e.type))
        throw new Error("Class component is not supported.");
      N = Ta(e.type(e.props), t), yield (await N.next()).value;
    }
    await N.next();
    let ae = yield;
    return (await N.next(ae)).value;
  }
  let { type: D, props: v } = e;
  if (v && Tg(v))
    throw new Error("dangerouslySetInnerHTML property is not supported. See documentation for more information https://github.com/vercel/satori#jsx.");
  let { style: g, children: y, tw: b, lang: C = l } = v || {}, k = V1(C);
  if (b) {
    let N = d(b, g);
    g = Object.assign(N, g);
  }
  let S = n.Node.create();
  o.insertChild(S, o.getChildCount());
  let [E, L] = await s1(S, D, a, g, v), T = E.transform === a.transform;
  if (T || (E.transform.__parent = a.transform), (E.overflow === "hidden" || E.clipPath && E.clipPath !== "none") && (L._inheritedClipPathId = `satori_cp-${i}`, L._inheritedMaskId = `satori_om-${i}`), E.maskImage && (L._inheritedMaskId = `satori_mi-${i}`), E.backgroundClip === "text") {
    let N = { value: "" };
    L._inheritedBackgroundClipTextPath = N, E._inheritedBackgroundClipTextPath = N;
  }
  let U = _g(y), M = [], H = 0, q = [];
  for (let N of U) {
    let ae = Ta(N, { id: i + "-" + H++, parentStyle: E, inheritedStyle: L, isInheritingTransform: true, parent: S, font: u, embedFont: f, debug: s, graphemeImages: c, canLoadAdditionalAssets: p2, locale: k, getTwStyles: d, onNodeDetected: t.onNodeDetected });
    p2 ? q.push(...(await ae.next()).value || []) : await ae.next(), M.push(ae);
  }
  yield q;
  for (let N of M)
    await N.next();
  let [ee, A] = yield, { left: R, top: O, width: Y, height: Z } = S.getComputedLayout();
  R += ee, O += A;
  let te = "", ie = "", B = "", { children: z, ..._ } = v;
  if ((r = t.onNodeDetected) == null || r.call(t, { left: R, top: O, width: Y, height: Z, type: D, props: _, key: e.key, textContent: jn(z) ? void 0 : z }), D === "img") {
    let N = E.__src;
    ie = await ga({ id: i, left: R, top: O, width: Y, height: Z, src: N, isInheritingTransform: T, debug: s }, E, L);
  } else if (D === "svg") {
    let N = E.color, ae = await Hg(e, N);
    ie = await ga({ id: i, left: R, top: O, width: Y, height: Z, src: ae, isInheritingTransform: T, debug: s }, E, L);
  } else {
    let N = g?.display;
    if (D === "div" && y && typeof y != "string" && N !== "flex" && N !== "none")
      throw new Error('Expected <div> to have explicit "display: flex" or "display: none" if it has more than one child node.');
    ie = await ga({ id: i, left: R, top: O, width: Y, height: Z, isInheritingTransform: T, debug: s }, E, L);
  }
  for (let N of M)
    te += (await N.next([R, O])).value;
  return E._inheritedBackgroundClipTextPath && (B += ue("clipPath", { id: `satori_bct-${i}`, "clip-path": E._inheritedClipPathId ? `url(#${E._inheritedClipPathId})` : void 0 }, E._inheritedBackgroundClipTextPath.value)), B + ie + te;
}
var kl = "unknown";
function H1(e, t, [r, n], [i, a]) {
  if (r !== i)
    return r ? !i || r === e ? -1 : i === e ? 1 : e === 400 && r === 500 || e === 500 && r === 400 ? -1 : e === 400 && i === 500 || e === 500 && i === 400 ? 1 : e < 400 ? r < e && i < e ? i - r : r < e ? -1 : i < e ? 1 : r - i : e < r && e < i ? r - i : e < r ? -1 : e < i ? 1 : i - r : 1;
  if (n !== a) {
    if (n === t)
      return -1;
    if (a === t)
      return 1;
  }
  return -1;
}
var X1 = class {
  defaultFont;
  fonts = /* @__PURE__ */ new Map();
  constructor(e) {
    this.addFonts(e);
  }
  get({ name: e, weight: t, style: r }) {
    if (!this.fonts.has(e))
      return null;
    t === "normal" && (t = 400), t === "bold" && (t = 700), typeof t == "string" && (t = Number.parseInt(t, 10));
    let n = [...this.fonts.get(e)], i = n[0];
    for (let a = 1; a < n.length; a++) {
      let [, o, u] = i, [, s, l] = n[a];
      H1(t, r, [o, u], [s, l]) > 0 && (i = n[a]);
    }
    return i[0];
  }
  addFonts(e) {
    for (let t of e) {
      let { name: r, data: n, lang: i } = t;
      if (i && !j1(i))
        throw new Error(`Invalid value for props \`lang\`: "${i}". The value must be one of the following: ${$a.join(", ")}.`);
      let a = i ?? kl, o = Ln.parse("buffer" in n ? n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength) : n, { lowMemory: true }), u = o.charToGlyphIndex;
      o.charToGlyphIndex = (l) => {
        let f = u.call(o, l);
        return f === 0 && o._trackBrokenChars && o._trackBrokenChars.push(l), f;
      }, this.defaultFont || (this.defaultFont = o);
      let s = `${r.toLowerCase()}_${a}`;
      this.fonts.has(s) || this.fonts.set(s, []), this.fonts.get(s).push([o, t.weight, t.style]);
    }
  }
  getEngine(e = 16, t = 1.2, { fontFamily: r = "sans-serif", fontWeight: n = 400, fontStyle: i = "normal" }, a) {
    if (!this.fonts.size)
      throw new Error("No fonts are loaded. At least one font is required to calculate the layout.");
    r = (Array.isArray(r) ? r : [r]).map((y) => y.toLowerCase());
    let o = [];
    r.forEach((y) => {
      let b = this.get({ name: y, weight: n, style: i });
      if (b) {
        o.push(b);
        return;
      }
      let C = this.get({ name: y + "_unknown", weight: n, style: i });
      if (C) {
        o.push(C);
        return;
      }
    });
    let u = Array.from(this.fonts.keys()), s = [], l = [], f = [];
    for (let y of u)
      if (!r.includes(y))
        if (a) {
          let b = q1(y);
          b ? b === a ? s.push(this.get({ name: y, weight: n, style: i })) : l.push(this.get({ name: y, weight: n, style: i })) : f.push(this.get({ name: y, weight: n, style: i }));
        } else
          f.push(this.get({ name: y, weight: n, style: i }));
    let c = /* @__PURE__ */ new Map(), p2 = (y, b = true) => {
      let C = [...o, ...f, ...s, ...b ? l : []];
      if (typeof y > "u")
        return b ? C[C.length - 1] : void 0;
      let k = y.charCodeAt(0);
      if (c.has(k))
        return c.get(k);
      let S = C.find((E, L) => !!E.charToGlyphIndex(y) || b && L === C.length - 1);
      return S && c.set(k, S), S;
    }, d = (y, b = false) => {
      var C, k;
      return ((b ? (k = (C = y.tables) == null ? void 0 : C.os2) == null ? void 0 : k.sTypoAscender : 0) || y.ascender) / y.unitsPerEm * e;
    }, D = (y, b = false) => {
      var C, k;
      return ((b ? (k = (C = y.tables) == null ? void 0 : C.os2) == null ? void 0 : k.sTypoDescender : 0) || y.descender) / y.unitsPerEm * e;
    }, v = (y) => p2(y, false), g = { has: (y) => {
      if (y === `
`)
        return true;
      let b = v(y);
      return b ? (b._trackBrokenChars = [], b.stringToGlyphs(y), b._trackBrokenChars.length ? (b._trackBrokenChars = void 0, false) : true) : false;
    }, baseline: (y, b = typeof y > "u" ? o[0] : p2(y)) => {
      let C = d(b, true), k = D(b, true), S = g.height(y, b), { yMax: E, yMin: L } = b.tables.head, T = C - k, U = (E / (E - L) - 1) * T;
      return S * ((1.2 / t + 1) / 2) + U;
    }, height: (y, b = typeof y > "u" ? o[0] : p2(y)) => (d(b) - D(b)) * (t / 1.2), measure: (y, b) => this.measure(p2, y, b), getSVG: (y, b) => this.getSVG(p2, y, b) };
    return g;
  }
  patchFontFallbackResolver(e, t) {
    let r = [];
    e._trackBrokenChars = r;
    let n = e.stringToGlyphs;
    return e.stringToGlyphs = (i, ...a) => {
      let o = n.call(e, i, ...a);
      for (let u = 0; u < o.length; u++)
        if (o[u].unicode === void 0) {
          let s = r.shift(), l = t(s);
          if (l !== e) {
            let f = l.charToGlyph(s), c = e.unitsPerEm / l.unitsPerEm, p2 = new Ln.Path();
            p2.unitsPerEm = e.unitsPerEm, p2.commands = f.path.commands.map((D) => {
              let v = { ...D };
              for (let g in v)
                typeof v[g] == "number" && (v[g] *= c);
              return v;
            });
            let d = new Ln.Glyph({ ...f, advanceWidth: f.advanceWidth * c, xMin: f.xMin * c, xMax: f.xMax * c, yMin: f.yMin * c, yMax: f.yMax * c, path: p2 });
            o[u] = d;
          }
        }
      return o;
    }, () => {
      e.stringToGlyphs = n, e._trackBrokenChars = void 0;
    };
  }
  measure(e, t, { fontSize: r, letterSpacing: n = 0 }) {
    let i = e(t), a = this.patchFontFallbackResolver(i, e);
    try {
      return i.getAdvanceWidth(t, r, { letterSpacing: n / r });
    } finally {
      a();
    }
  }
  getSVG(e, t, { fontSize: r, top: n, left: i, letterSpacing: a = 0 }) {
    let o = e(t), u = this.patchFontFallbackResolver(o, e);
    try {
      return r === 0 ? "" : o.getPath(t.replace(/\n/g, ""), i, n, r, { letterSpacing: a / r }).toPathData(1);
    } finally {
      u();
    }
  }
};
function q1(e) {
  let t = e.split("_"), r = t[t.length - 1];
  return r === kl ? void 0 : r;
}
function Y1({ width: e, height: t, content: r }) {
  return ue("svg", { width: e, height: t, viewBox: `0 0 ${e} ${t}`, xmlns: "http://www.w3.org/2000/svg" }, r);
}
var Z1 = Iv(vg());
var J1 = ["ios", "android", "windows", "macos", "web"];
function K1(e) {
  return J1.includes(e);
}
var Q1 = ["portrait", "landscape"];
function em(e) {
  return Q1.includes(e);
}
var Eu;
(function(e) {
  e.fontSize = "fontSize", e.lineHeight = "lineHeight";
})(Eu || (Eu = {}));
var Re;
(function(e) {
  e.rem = "rem", e.em = "em", e.px = "px", e.percent = "%", e.vw = "vw", e.vh = "vh", e.none = "<no-css-unit>";
})(Re || (Re = {}));
function Fu(e) {
  return typeof e == "string";
}
function Cu(e) {
  return typeof e == "object";
}
var ma;
function V(e) {
  return { kind: "complete", style: e };
}
function Ft(e, t = {}) {
  let { fractions: r } = t;
  if (r && e.includes("/")) {
    let [a = "", o = ""] = e.split("/", 2), u = Ft(a), s = Ft(o);
    return !u || !s ? null : [u[0] / s[0], s[1]];
  }
  let n = parseFloat(e);
  if (Number.isNaN(n))
    return null;
  let i = e.match(/(([a-z]{2,}|%))$/);
  if (!i)
    return [n, Re.none];
  switch (i?.[1]) {
    case "rem":
      return [n, Re.rem];
    case "px":
      return [n, Re.px];
    case "em":
      return [n, Re.em];
    case "%":
      return [n, Re.percent];
    case "vw":
      return [n, Re.vw];
    case "vh":
      return [n, Re.vh];
    default:
      return null;
  }
}
function an(e, t, r = {}) {
  let n = yr(t, r);
  return n === null ? null : V({ [e]: n });
}
function Da(e, t, r) {
  let n = yr(t);
  return n !== null && (r[e] = n), r;
}
function tm(e, t) {
  let r = yr(t);
  return r === null ? null : { [e]: r };
}
function yr(e, t = {}) {
  if (e === void 0)
    return null;
  let r = Ft(String(e), t);
  return r ? on(...r, t) : null;
}
function on(e, t, r = {}) {
  let { isNegative: n, device: i } = r;
  switch (t) {
    case Re.rem:
      return e * 16 * (n ? -1 : 1);
    case Re.px:
      return e * (n ? -1 : 1);
    case Re.percent:
      return `${n ? "-" : ""}${e}%`;
    case Re.none:
      return e * (n ? -1 : 1);
    case Re.vw:
      return i != null && i.windowDimensions ? i.windowDimensions.width * (e / 100) : (Kt("`vw` CSS unit requires configuration with `useDeviceContext()`"), null);
    case Re.vh:
      return i != null && i.windowDimensions ? i.windowDimensions.height * (e / 100) : (Kt("`vh` CSS unit requires configuration with `useDeviceContext()`"), null);
    default:
      return null;
  }
}
function Su(e) {
  let t = Ft(e);
  if (!t)
    return null;
  let [r, n] = t;
  switch (n) {
    case Re.rem:
      return r * 16;
    case Re.px:
      return r;
    default:
      return null;
  }
}
var rm = { t: "Top", tr: "TopRight", tl: "TopLeft", b: "Bottom", br: "BottomRight", bl: "BottomLeft", l: "Left", r: "Right", x: "Horizontal", y: "Vertical" };
function Tl(e) {
  return rm[e ?? ""] || "All";
}
function _l(e) {
  let t = "All";
  return [e.replace(/^-(t|b|r|l|tr|tl|br|bl)(-|$)/, (r, n) => (t = Tl(n), "")), t];
}
function ii(e, t = {}) {
  if (e.includes("/")) {
    let r = ku(e, { ...t, fractions: true });
    if (r)
      return r;
  }
  return e[0] === "[" && (e = e.slice(1, -1)), ku(e, t);
}
function br(e, t, r = {}) {
  let n = ii(t, r);
  return n === null ? null : V({ [e]: n });
}
function ku(e, t = {}) {
  if (e === "px")
    return 1;
  let r = Ft(e, t);
  if (!r)
    return null;
  let [n, i] = r;
  return t.fractions && (i = Re.percent, n *= 100), i === Re.none && (n = n / 4, i = Re.rem), on(n, i, t);
}
function nm(...e) {
  console.warn(...e);
}
function im(...e) {
}
var Kt = typeof process > "u" || ((ma = process == null ? void 0 : process.env) === null || ma === void 0 ? void 0 : ma.JEST_WORKER_ID) === void 0 ? nm : im;
var am = [["aspect-square", V({ aspectRatio: 1 })], ["aspect-video", V({ aspectRatio: 16 / 9 })], ["items-center", V({ alignItems: "center" })], ["items-start", V({ alignItems: "flex-start" })], ["items-end", V({ alignItems: "flex-end" })], ["items-baseline", V({ alignItems: "baseline" })], ["items-stretch", V({ alignItems: "stretch" })], ["justify-start", V({ justifyContent: "flex-start" })], ["justify-end", V({ justifyContent: "flex-end" })], ["justify-center", V({ justifyContent: "center" })], ["justify-between", V({ justifyContent: "space-between" })], ["justify-around", V({ justifyContent: "space-around" })], ["justify-evenly", V({ justifyContent: "space-evenly" })], ["content-start", V({ alignContent: "flex-start" })], ["content-end", V({ alignContent: "flex-end" })], ["content-between", V({ alignContent: "space-between" })], ["content-around", V({ alignContent: "space-around" })], ["content-stretch", V({ alignContent: "stretch" })], ["content-center", V({ alignContent: "center" })], ["self-auto", V({ alignSelf: "auto" })], ["self-start", V({ alignSelf: "flex-start" })], ["self-end", V({ alignSelf: "flex-end" })], ["self-center", V({ alignSelf: "center" })], ["self-stretch", V({ alignSelf: "stretch" })], ["self-baseline", V({ alignSelf: "baseline" })], ["direction-inherit", V({ direction: "inherit" })], ["direction-ltr", V({ direction: "ltr" })], ["direction-rtl", V({ direction: "rtl" })], ["hidden", V({ display: "none" })], ["flex", V({ display: "flex" })], ["flex-row", V({ flexDirection: "row" })], ["flex-row-reverse", V({ flexDirection: "row-reverse" })], ["flex-col", V({ flexDirection: "column" })], ["flex-col-reverse", V({ flexDirection: "column-reverse" })], ["flex-wrap", V({ flexWrap: "wrap" })], ["flex-wrap-reverse", V({ flexWrap: "wrap-reverse" })], ["flex-nowrap", V({ flexWrap: "nowrap" })], ["flex-auto", V({ flexGrow: 1, flexShrink: 1, flexBasis: "auto" })], ["flex-initial", V({ flexGrow: 0, flexShrink: 1, flexBasis: "auto" })], ["flex-none", V({ flexGrow: 0, flexShrink: 0, flexBasis: "auto" })], ["overflow-hidden", V({ overflow: "hidden" })], ["overflow-visible", V({ overflow: "visible" })], ["overflow-scroll", V({ overflow: "scroll" })], ["absolute", V({ position: "absolute" })], ["relative", V({ position: "relative" })], ["italic", V({ fontStyle: "italic" })], ["not-italic", V({ fontStyle: "normal" })], ["oldstyle-nums", Jr("oldstyle-nums")], ["small-caps", Jr("small-caps")], ["lining-nums", Jr("lining-nums")], ["tabular-nums", Jr("tabular-nums")], ["proportional-nums", Jr("proportional-nums")], ["font-thin", V({ fontWeight: "100" })], ["font-100", V({ fontWeight: "100" })], ["font-extralight", V({ fontWeight: "200" })], ["font-200", V({ fontWeight: "200" })], ["font-light", V({ fontWeight: "300" })], ["font-300", V({ fontWeight: "300" })], ["font-normal", V({ fontWeight: "normal" })], ["font-400", V({ fontWeight: "400" })], ["font-medium", V({ fontWeight: "500" })], ["font-500", V({ fontWeight: "500" })], ["font-semibold", V({ fontWeight: "600" })], ["font-600", V({ fontWeight: "600" })], ["font-bold", V({ fontWeight: "bold" })], ["font-700", V({ fontWeight: "700" })], ["font-extrabold", V({ fontWeight: "800" })], ["font-800", V({ fontWeight: "800" })], ["font-black", V({ fontWeight: "900" })], ["font-900", V({ fontWeight: "900" })], ["include-font-padding", V({ includeFontPadding: true })], ["remove-font-padding", V({ includeFontPadding: false })], ["max-w-none", V({ maxWidth: "99999%" })], ["text-left", V({ textAlign: "left" })], ["text-center", V({ textAlign: "center" })], ["text-right", V({ textAlign: "right" })], ["text-justify", V({ textAlign: "justify" })], ["text-auto", V({ textAlign: "auto" })], ["underline", V({ textDecorationLine: "underline" })], ["line-through", V({ textDecorationLine: "line-through" })], ["no-underline", V({ textDecorationLine: "none" })], ["uppercase", V({ textTransform: "uppercase" })], ["lowercase", V({ textTransform: "lowercase" })], ["capitalize", V({ textTransform: "capitalize" })], ["normal-case", V({ textTransform: "none" })], ["w-auto", V({ width: "auto" })], ["h-auto", V({ height: "auto" })], ["shadow-sm", V({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 1, shadowOpacity: 0.025, elevation: 1 })], ["shadow", V({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 1, shadowOpacity: 0.075, elevation: 2 })], ["shadow-md", V({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 3, shadowOpacity: 0.125, elevation: 3 })], ["shadow-lg", V({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 8 })], ["shadow-xl", V({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.19, shadowRadius: 20, elevation: 12 })], ["shadow-2xl", V({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 30, elevation: 16 })], ["shadow-none", V({ shadowOffset: { width: 0, height: 0 }, shadowColor: "#000", shadowRadius: 0, shadowOpacity: 0, elevation: 0 })]];
var Tu = am;
function Jr(e) {
  return { kind: "dependent", complete(t) {
    (!t.fontVariant || !Array.isArray(t.fontVariant)) && (t.fontVariant = []), t.fontVariant.push(e);
  } };
}
var om = class {
  constructor(e) {
    this.ir = new Map(Tu), this.styles = /* @__PURE__ */ new Map(), this.prefixes = /* @__PURE__ */ new Map(), this.ir = new Map([...Tu, ...e ?? []]);
  }
  getStyle(e) {
    return this.styles.get(e);
  }
  setStyle(e, t) {
    this.styles.set(e, t);
  }
  getIr(e) {
    return this.ir.get(e);
  }
  setIr(e, t) {
    this.ir.set(e, t);
  }
  getPrefixMatch(e) {
    return this.prefixes.get(e);
  }
  setPrefixMatch(e, t) {
    this.prefixes.set(e, t);
  }
};
function sm(e, t, r = {}) {
  let n = t?.[e];
  if (!n)
    return br("fontSize", e, r);
  if (typeof n == "string")
    return an("fontSize", n);
  let i = {}, [a, o] = n, u = tm("fontSize", a);
  if (u && (i = u), typeof o == "string")
    return V(Da("lineHeight", _u(o, i), i));
  let { lineHeight: s, letterSpacing: l } = o;
  return s && Da("lineHeight", _u(s, i), i), l && Da("letterSpacing", l, i), V(i);
}
function _u(e, t) {
  let r = Ft(e);
  if (r) {
    let [n, i] = r;
    if ((i === Re.none || i === Re.em) && typeof t.fontSize == "number")
      return t.fontSize * n;
  }
  return e;
}
function um(e, t) {
  var r;
  let n = (r = t?.[e]) !== null && r !== void 0 ? r : e.startsWith("[") ? e.slice(1, -1) : e, i = Ft(n);
  if (!i)
    return null;
  let [a, o] = i;
  if (o === Re.none)
    return { kind: "dependent", complete(s) {
      if (typeof s.fontSize != "number")
        return "relative line-height utilities require that font-size be set";
      s.lineHeight = s.fontSize * a;
    } };
  let u = on(a, o);
  return u !== null ? V({ lineHeight: u }) : null;
}
function lm(e, t, r, n, i) {
  let a = "";
  if (n[0] === "[")
    a = n.slice(1, -1);
  else {
    let l = i?.[n];
    if (l)
      a = l;
    else {
      let f = ii(n);
      return f && typeof f == "number" ? Au(f, Re.px, t, e) : null;
    }
  }
  if (a === "auto")
    return Al(t, e, "auto");
  let o = Ft(a);
  if (!o)
    return null;
  let [u, s] = o;
  return r && (u = -u), Au(u, s, t, e);
}
function Au(e, t, r, n) {
  let i = on(e, t);
  return i === null ? null : Al(r, n, i);
}
function Al(e, t, r) {
  switch (e) {
    case "All":
      return { kind: "complete", style: { [`${t}Top`]: r, [`${t}Right`]: r, [`${t}Bottom`]: r, [`${t}Left`]: r } };
    case "Bottom":
    case "Top":
    case "Left":
    case "Right":
      return { kind: "complete", style: { [`${t}${e}`]: r } };
    case "Vertical":
      return { kind: "complete", style: { [`${t}Top`]: r, [`${t}Bottom`]: r } };
    case "Horizontal":
      return { kind: "complete", style: { [`${t}Left`]: r, [`${t}Right`]: r } };
    default:
      return null;
  }
}
function fm(e) {
  if (!e)
    return {};
  let t = Object.entries(e).reduce((i, [a, o]) => {
    let u = [0, 1 / 0, 0], s = typeof o == "string" ? { min: o } : o, l = s.min ? Su(s.min) : 0;
    l === null ? Kt(`invalid screen config value: ${a}->min: ${s.min}`) : u[0] = l;
    let f = s.max ? Su(s.max) : 1 / 0;
    return f === null ? Kt(`invalid screen config value: ${a}->max: ${s.max}`) : u[1] = f, i[a] = u, i;
  }, {}), r = Object.values(t);
  r.sort((i, a) => {
    let [o, u] = i, [s, l] = a;
    return u === 1 / 0 || l === 1 / 0 ? o - s : u - l;
  });
  let n = 0;
  return r.forEach((i) => i[2] = n++), t;
}
function cm(e, t) {
  let r = t?.[e];
  if (!r)
    return null;
  if (typeof r == "string")
    return V({ fontFamily: r });
  let n = r[0];
  return n ? V({ fontFamily: n }) : null;
}
function tn(e, t, r) {
  if (!r)
    return null;
  let n;
  t.includes("/") && ([t = "", n] = t.split("/", 2));
  let i = "";
  if (t.startsWith("[#") || t.startsWith("[rgb") ? i = t.slice(1, -1) : i = Ol(t, r), !i)
    return null;
  if (n) {
    let a = Number(n);
    if (!Number.isNaN(a))
      return i = Ou(i, a / 100), V({ [Hn[e].color]: i });
  }
  return { kind: "dependent", complete(a) {
    let o = Hn[e].opacity, u = a[o];
    typeof u == "number" && (i = Ou(i, u)), a[Hn[e].color] = i;
  } };
}
function Mn(e, t) {
  let r = parseInt(t, 10);
  if (Number.isNaN(r))
    return null;
  let n = r / 100;
  return { kind: "complete", style: { [Hn[e].opacity]: n } };
}
function Ou(e, t) {
  return e.startsWith("#") ? e = hm(e) : e.startsWith("rgb(") && (e = e.replace(/^rgb\(/, "rgba(").replace(/\)$/, ", 1)")), e.replace(/, ?\d*\.?(\d+)\)$/, `, ${t})`);
}
function pm(e) {
  for (let t in e)
    t.startsWith("__opacity_") && delete e[t];
}
var Hn = { bg: { opacity: "__opacity_bg", color: "backgroundColor" }, text: { opacity: "__opacity_text", color: "color" }, border: { opacity: "__opacity_border", color: "borderColor" }, borderTop: { opacity: "__opacity_border", color: "borderTopColor" }, borderBottom: { opacity: "__opacity_border", color: "borderBottomColor" }, borderLeft: { opacity: "__opacity_border", color: "borderLeftColor" }, borderRight: { opacity: "__opacity_border", color: "borderRightColor" }, shadow: { opacity: "__opacity_shadow", color: "shadowColor" }, tint: { opacity: "__opacity_tint", color: "tintColor" } };
function hm(e) {
  let t = e;
  e = e.replace(dm, (o, u, s, l) => u + u + s + s + l + l);
  let r = vm.exec(e);
  if (!r)
    return Kt(`invalid config hex color value: ${t}`), "rgba(0, 0, 0, 1)";
  let n = parseInt(r[1], 16), i = parseInt(r[2], 16), a = parseInt(r[3], 16);
  return `rgba(${n}, ${i}, ${a}, 1)`;
}
function Ol(e, t) {
  let r = t[e];
  if (Fu(r))
    return r;
  if (Cu(r) && Fu(r.DEFAULT))
    return r.DEFAULT;
  let [n = "", ...i] = e.split("-");
  for (; n !== e; ) {
    let a = t[n];
    if (Cu(a))
      return Ol(i.join("-"), a);
    if (i.length === 0)
      return "";
    n = `${n}-${i.shift()}`;
  }
  return "";
}
var dm = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
var vm = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function gm(e, t) {
  let [r, n] = _l(e);
  if (r.match(/^(-?(\d)+)?$/))
    return mm(r, n, t?.borderWidth);
  if (r = r.replace(/^-/, ""), ["dashed", "solid", "dotted"].includes(r))
    return V({ borderStyle: r });
  let i = "border";
  switch (n) {
    case "Bottom":
      i = "borderBottom";
      break;
    case "Top":
      i = "borderTop";
      break;
    case "Left":
      i = "borderLeft";
      break;
    case "Right":
      i = "borderRight";
      break;
  }
  let a = tn(i, r, t?.borderColor);
  if (a)
    return a;
  let o = `border${n === "All" ? "" : n}Width`;
  r = r.replace(/^-/, "");
  let u = r.slice(1, -1), s = br(o, u);
  return typeof s?.style[o] != "number" ? null : s;
}
function mm(e, t, r) {
  if (!r)
    return null;
  e = e.replace(/^-/, "");
  let n = r[e === "" ? "DEFAULT" : e];
  if (n === void 0)
    return null;
  let i = `border${t === "All" ? "" : t}Width`;
  return an(i, n);
}
function Dm(e, t) {
  if (!t)
    return null;
  let [r, n] = _l(e);
  r = r.replace(/^-/, ""), r === "" && (r = "DEFAULT");
  let i = `border${n === "All" ? "" : n}Radius`, a = t[r];
  if (a)
    return Lu(an(i, a));
  let o = br(i, r);
  return typeof o?.style[i] != "number" ? null : Lu(o);
}
function Lu(e) {
  if (e?.kind !== "complete")
    return e;
  let t = e.style.borderTopRadius;
  t !== void 0 && (e.style.borderTopLeftRadius = t, e.style.borderTopRightRadius = t, delete e.style.borderTopRadius);
  let r = e.style.borderBottomRadius;
  r !== void 0 && (e.style.borderBottomLeftRadius = r, e.style.borderBottomRightRadius = r, delete e.style.borderBottomRadius);
  let n = e.style.borderLeftRadius;
  n !== void 0 && (e.style.borderBottomLeftRadius = n, e.style.borderTopLeftRadius = n, delete e.style.borderLeftRadius);
  let i = e.style.borderRightRadius;
  return i !== void 0 && (e.style.borderBottomRightRadius = i, e.style.borderTopRightRadius = i, delete e.style.borderRightRadius), e;
}
function Kr(e, t, r, n) {
  let i = null;
  e === "inset" && (t = t.replace(/^(x|y)-/, (u, s) => (i = s === "x" ? "x" : "y", "")));
  let a = n?.[t];
  if (a) {
    let u = yr(a, { isNegative: r });
    if (u !== null)
      return Iu(e, i, u);
  }
  let o = ii(t, { isNegative: r });
  return o !== null ? Iu(e, i, o) : null;
}
function Iu(e, t, r) {
  if (e !== "inset")
    return V({ [e]: r });
  switch (t) {
    case null:
      return V({ top: r, left: r, right: r, bottom: r });
    case "y":
      return V({ top: r, bottom: r });
    case "x":
      return V({ left: r, right: r });
  }
}
function Gn(e, t, r) {
  var n;
  t = t.replace(/^-/, "");
  let i = t === "" ? "DEFAULT" : t, a = Number((n = r?.[i]) !== null && n !== void 0 ? n : t);
  return Number.isNaN(a) ? null : V({ [`flex${e}`]: a });
}
function ym(e, t) {
  var r, n;
  if (e = t?.[e] || e, ["min-content", "revert", "unset"].includes(e))
    return null;
  if (e.match(/^\d+(\.\d+)?$/))
    return V({ flexGrow: Number(e), flexBasis: "0%" });
  let i = e.match(/^(\d+)\s+(\d+)$/);
  if (i)
    return V({ flexGrow: Number(i[1]), flexShrink: Number(i[2]) });
  if (i = e.match(/^(\d+)\s+([^ ]+)$/), i) {
    let a = yr((r = i[2]) !== null && r !== void 0 ? r : "");
    return a ? V({ flexGrow: Number(i[1]), flexBasis: a }) : null;
  }
  if (i = e.match(/^(\d+)\s+(\d+)\s+(.+)$/), i) {
    let a = yr((n = i[3]) !== null && n !== void 0 ? n : "");
    return a ? V({ flexGrow: Number(i[1]), flexShrink: Number(i[2]), flexBasis: a }) : null;
  }
  return null;
}
function Pu(e, t, r = {}, n) {
  let i = n?.[t];
  return i !== void 0 ? an(e, i, r) : br(e, t, r);
}
function Wn(e, t, r = {}, n) {
  let i = yr(n?.[t], r);
  return i ? V({ [e]: i }) : (t === "screen" && (t = e.includes("Width") ? "100vw" : "100vh"), br(e, t, r));
}
function bm(e, t, r) {
  let n = r?.[e];
  if (n) {
    let i = Ft(n, { isNegative: t });
    if (!i)
      return null;
    let [a, o] = i;
    if (o === Re.em)
      return xm(a);
    if (o === Re.percent)
      return Kt("percentage-based letter-spacing configuration currently unsupported, switch to `em`s, or open an issue if you'd like to see support added."), null;
    let u = on(a, o, { isNegative: t });
    return u !== null ? V({ letterSpacing: u }) : null;
  }
  return br("letterSpacing", e, { isNegative: t });
}
function xm(e) {
  return { kind: "dependent", complete(t) {
    let r = t.fontSize;
    if (typeof r != "number" || Number.isNaN(r))
      return "tracking-X relative letter spacing classes require font-size to be set";
    t.letterSpacing = Math.round((e * r + Number.EPSILON) * 100) / 100;
  } };
}
function wm(e, t) {
  let r = t?.[e];
  if (r) {
    let i = Ft(String(r));
    if (i)
      return V({ opacity: i[0] });
  }
  let n = Ft(e);
  return n ? V({ opacity: n[0] / 100 }) : null;
}
function Em(e) {
  let t = parseInt(e, 10);
  return Number.isNaN(t) ? null : { kind: "complete", style: { shadowOpacity: t / 100 } };
}
function Fm(e) {
  if (e.includes("/")) {
    let [r = "", n = ""] = e.split("/", 2), i = ya(r), a = ya(n);
    return i === null || a === null ? null : { kind: "complete", style: { shadowOffset: { width: i, height: a } } };
  }
  let t = ya(e);
  return t === null ? null : { kind: "complete", style: { shadowOffset: { width: t, height: t } } };
}
function ya(e) {
  let t = ii(e);
  return typeof t == "number" ? t : null;
}
var Ru = class {
  constructor(e, t = {}, r, n, i) {
    var a, o, u, s, l, f;
    this.config = t, this.cache = r, this.position = 0, this.isNull = false, this.isNegative = false, this.context = {}, this.context.device = n;
    let c = e.trim().split(":"), p2 = [];
    c.length === 1 ? this.string = e : (this.string = (a = c.pop()) !== null && a !== void 0 ? a : "", p2 = c), this.char = this.string[0];
    let d = fm((o = this.config.theme) === null || o === void 0 ? void 0 : o.screens);
    for (let D of p2)
      if (d[D]) {
        let v = (u = d[D]) === null || u === void 0 ? void 0 : u[2];
        v !== void 0 && (this.order = ((s = this.order) !== null && s !== void 0 ? s : 0) + v);
        let g = (l = n.windowDimensions) === null || l === void 0 ? void 0 : l.width;
        if (g) {
          let [y, b] = (f = d[D]) !== null && f !== void 0 ? f : [0, 0];
          (g <= y || g > b) && (this.isNull = true);
        } else
          this.isNull = true;
      } else
        K1(D) ? this.isNull = D !== i : em(D) ? n.windowDimensions ? (n.windowDimensions.width > n.windowDimensions.height ? "landscape" : "portrait") !== D ? this.isNull = true : this.incrementOrder() : this.isNull = true : D === "retina" ? n.pixelDensity === 2 ? this.incrementOrder() : this.isNull = true : D === "dark" ? n.colorScheme !== "dark" ? this.isNull = true : this.incrementOrder() : this.handlePossibleArbitraryBreakpointPrefix(D) || (this.isNull = true);
  }
  parse() {
    if (this.isNull)
      return { kind: "null" };
    let e = this.cache.getIr(this.rest);
    if (e)
      return e;
    this.parseIsNegative();
    let t = this.parseUtility();
    return t ? this.order !== void 0 ? { kind: "ordered", order: this.order, styleIr: t } : t : { kind: "null" };
  }
  parseUtility() {
    var e, t, r, n, i;
    let a = this.config.theme, o = null;
    switch (this.char) {
      case "m":
      case "p": {
        let u = this.peekSlice(1, 3).match(/^(t|b|r|l|x|y)?-/);
        if (u) {
          let s = this.char === "m" ? "margin" : "padding";
          this.advance(((t = (e = u[0]) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0) + 1);
          let l = Tl(u[1]), f = lm(s, l, this.isNegative, this.rest, (r = this.config.theme) === null || r === void 0 ? void 0 : r[s]);
          if (f)
            return f;
        }
      }
    }
    if (this.consumePeeked("h-") && (o = Pu("height", this.rest, this.context, a?.height), o) || this.consumePeeked("w-") && (o = Pu("width", this.rest, this.context, a?.width), o) || this.consumePeeked("min-w-") && (o = Wn("minWidth", this.rest, this.context, a?.minWidth), o) || this.consumePeeked("min-h-") && (o = Wn("minHeight", this.rest, this.context, a?.minHeight), o) || this.consumePeeked("max-w-") && (o = Wn("maxWidth", this.rest, this.context, a?.maxWidth), o) || this.consumePeeked("max-h-") && (o = Wn("maxHeight", this.rest, this.context, a?.maxHeight), o) || this.consumePeeked("leading-") && (o = um(this.rest, a?.lineHeight), o) || this.consumePeeked("text-") && (o = sm(this.rest, a?.fontSize, this.context), o || (o = tn("text", this.rest, a?.textColor), o) || this.consumePeeked("opacity-") && (o = Mn("text", this.rest), o)) || this.consumePeeked("font-") && (o = cm(this.rest, a?.fontFamily), o) || this.consumePeeked("aspect-") && (this.consumePeeked("ratio-") && Kt("`aspect-ratio-{ratio}` is deprecated, use `aspect-{ratio}` instead"), o = an("aspectRatio", this.rest, { fractions: true }), o) || this.consumePeeked("tint-") && (o = tn("tint", this.rest, a?.colors), o) || this.consumePeeked("bg-") && (o = tn("bg", this.rest, a?.backgroundColor), o || this.consumePeeked("opacity-") && (o = Mn("bg", this.rest), o)) || this.consumePeeked("border") && (o = gm(this.rest, a), o || this.consumePeeked("-opacity-") && (o = Mn("border", this.rest), o)) || this.consumePeeked("rounded") && (o = Dm(this.rest, a?.borderRadius), o) || this.consumePeeked("bottom-") && (o = Kr("bottom", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("top-") && (o = Kr("top", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("left-") && (o = Kr("left", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("right-") && (o = Kr("right", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("inset-") && (o = Kr("inset", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("flex-") && (this.consumePeeked("grow") ? o = Gn("Grow", this.rest, a?.flexGrow) : this.consumePeeked("shrink") ? o = Gn("Shrink", this.rest, a?.flexShrink) : o = ym(this.rest, a?.flex), o) || this.consumePeeked("grow") && (o = Gn("Grow", this.rest, a?.flexGrow), o) || this.consumePeeked("shrink") && (o = Gn("Shrink", this.rest, a?.flexShrink), o) || this.consumePeeked("shadow-color-opacity-") && (o = Mn("shadow", this.rest), o) || this.consumePeeked("shadow-opacity-") && (o = Em(this.rest), o) || this.consumePeeked("shadow-offset-") && (o = Fm(this.rest), o) || this.consumePeeked("shadow-radius-") && (o = br("shadowRadius", this.rest), o) || this.consumePeeked("shadow-") && (o = tn("shadow", this.rest, a?.colors), o))
      return o;
    if (this.consumePeeked("elevation-")) {
      let u = parseInt(this.rest, 10);
      if (!Number.isNaN(u))
        return V({ elevation: u });
    }
    if (this.consumePeeked("opacity-") && (o = wm(this.rest, a?.opacity), o) || this.consumePeeked("tracking-") && (o = bm(this.rest, this.isNegative, a?.letterSpacing), o))
      return o;
    if (this.consumePeeked("z-")) {
      let u = Number((i = (n = a?.zIndex) === null || n === void 0 ? void 0 : n[this.rest]) !== null && i !== void 0 ? i : this.rest);
      if (!Number.isNaN(u))
        return V({ zIndex: u });
    }
    return Kt(`\`${this.rest}\` unknown or invalid utility`), null;
  }
  handlePossibleArbitraryBreakpointPrefix(e) {
    var t;
    if (e[0] !== "m")
      return false;
    let r = e.match(/^(min|max)-(w|h)-\[([^\]]+)\]$/);
    if (!r)
      return false;
    if (!(!((t = this.context.device) === null || t === void 0) && t.windowDimensions))
      return this.isNull = true, true;
    let n = this.context.device.windowDimensions, [, i = "", a = "", o = ""] = r, u = a === "w" ? n.width : n.height, s = Ft(o, this.context);
    if (s === null)
      return this.isNull = true, true;
    let [l, f] = s;
    return f !== "px" && (this.isNull = true), (i === "min" ? u >= l : u <= l) ? this.incrementOrder() : this.isNull = true, true;
  }
  advance(e = 1) {
    this.position += e, this.char = this.string[this.position];
  }
  get rest() {
    return this.peekSlice(0, this.string.length);
  }
  peekSlice(e, t) {
    return this.string.slice(this.position + e, this.position + t);
  }
  consumePeeked(e) {
    return this.peekSlice(0, e.length) === e ? (this.advance(e.length), true) : false;
  }
  parseIsNegative() {
    this.char === "-" && (this.advance(), this.isNegative = true, this.context.isNegative = true);
  }
  incrementOrder() {
    var e;
    this.order = ((e = this.order) !== null && e !== void 0 ? e : 0) + 1;
  }
};
function Cm(e) {
  let t = [], r = null;
  return e.forEach((n) => {
    if (typeof n == "string")
      t = [...t, ...ba(n)];
    else if (Array.isArray(n))
      t = [...t, ...n.flatMap(ba)];
    else if (typeof n == "object" && n !== null)
      for (let [i, a] of Object.entries(n))
        typeof a == "boolean" ? t = [...t, ...a ? ba(i) : []] : r ? r[i] = a : r = { [i]: a };
  }), [t.filter(Boolean).filter(Sm), r];
}
function ba(e) {
  return e.trim().split(/\s+/);
}
function Sm(e, t, r) {
  return r.indexOf(e) === t;
}
function km(e) {
  var t;
  return (t = e?.reduce((r, n) => ({ ...r, ...Tm(n.handler) }), {})) !== null && t !== void 0 ? t : {};
}
function Tm(e) {
  let t = {};
  return e({ addUtilities: (r) => {
    t = r;
  }, ..._m }), t;
}
function jt(e) {
  throw new Error(`tailwindcss plugin function argument object prop "${e}" not implemented`);
}
var _m = { addComponents: jt, addBase: jt, addVariant: jt, e: jt, prefix: jt, theme: jt, variants: jt, config: jt, corePlugins: jt, matchUtilities: jt, postcss: null };
function Am(e, t) {
  let r = (0, Z1.default)(Om(e)), n = {}, i = km(r.plugins), a = {}, o = Object.entries(i).map(([D, v]) => typeof v == "string" ? (a[D] = v, [D, { kind: "null" }]) : [D, V(v)]).filter(([, D]) => D.kind !== "null");
  function u() {
    return [n.windowDimensions ? `w${n.windowDimensions.width}` : false, n.windowDimensions ? `h${n.windowDimensions.height}` : false, n.fontScale ? `fs${n.fontScale}` : false, n.colorScheme === "dark" ? "dark" : false, n.pixelDensity === 2 ? "retina" : false].filter(Boolean).join("--") || "default";
  }
  let s = u(), l = {};
  function f() {
    let D = l[s];
    if (D)
      return D;
    let v = new om(o);
    return l[s] = v, v;
  }
  function c(...D) {
    let v = f(), g = {}, y = [], b = [], [C, k] = Cm(D), S = C.join(" "), E = v.getStyle(S);
    if (E)
      return { ...E, ...k || {} };
    for (let L of C) {
      let T = v.getIr(L);
      if (!T && L in a) {
        let U = c(a[L]);
        v.setIr(L, V(U)), g = { ...g, ...U };
        continue;
      }
      switch (T = new Ru(L, r, v, n, t).parse(), T.kind) {
        case "complete":
          g = { ...g, ...T.style }, v.setIr(L, T);
          break;
        case "dependent":
          y.push(T);
          break;
        case "ordered":
          b.push(T);
          break;
        case "null":
          v.setIr(L, T);
          break;
      }
    }
    if (b.length > 0) {
      b.sort((L, T) => L.order - T.order);
      for (let L of b)
        switch (L.styleIr.kind) {
          case "complete":
            g = { ...g, ...L.styleIr.style };
            break;
          case "dependent":
            y.push(L.styleIr);
            break;
        }
    }
    if (y.length > 0) {
      for (let L of y) {
        let T = L.complete(g);
        T && Kt(T);
      }
      pm(g);
    }
    return S !== "" && v.setStyle(S, g), k && (g = { ...g, ...k }), g;
  }
  function p2(D) {
    let v = c(D.split(/\s+/g).map((g) => g.replace(/^(bg|text|border)-/, "")).map((g) => `bg-${g}`).join(" "));
    return typeof v.backgroundColor == "string" ? v.backgroundColor : void 0;
  }
  let d = (D, ...v) => {
    let g = "";
    return D.forEach((y, b) => {
      var C;
      g += y + ((C = v[b]) !== null && C !== void 0 ? C : "");
    }), c(g);
  };
  return d.style = c, d.color = p2, d.prefixMatch = (...D) => {
    let v = D.sort().join(":"), g = f(), y = g.getPrefixMatch(v);
    if (y !== void 0)
      return y;
    let b = new Ru(`${v}:flex`, r, g, n, t).parse().kind !== "null";
    return g.setPrefixMatch(v, b), b;
  }, d.setWindowDimensions = (D) => {
    n.windowDimensions = D, s = u();
  }, d.setFontScale = (D) => {
    n.fontScale = D, s = u();
  }, d.setPixelDensity = (D) => {
    n.pixelDensity = D, s = u();
  }, d.setColorScheme = (D) => {
    n.colorScheme = D, s = u();
  }, d;
}
function Om(e) {
  return { ...e, content: ["_no_warnings_please"] };
}
var Lm = { handler: ({ addUtilities: e }) => {
  e({ "shadow-sm": { boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }, shadow: { boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }, "shadow-md": { boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }, "shadow-lg": { boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }, "shadow-xl": { boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }, "shadow-2xl": { boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }, "shadow-inner": { boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }, "shadow-none": { boxShadow: "0 0 #0000" } });
} };
function Im(e) {
  return Am({ ...e, plugins: [...e?.plugins ?? [], Lm] }, "web");
}
var $n;
function Pm({ width: e, height: t, config: r }) {
  return $n || ($n = Im(r)), $n.setWindowDimensions({ width: +e, height: +t }), $n;
}
var xa = /* @__PURE__ */ new WeakMap();
async function Ll(e, t) {
  let r = await Kn();
  if (!r || !r.Node)
    throw new Error("Satori is not initialized: expect `yoga` to be loaded, got " + r);
  t.fonts = t.fonts || [];
  let n;
  xa.has(t.fonts) ? n = xa.get(t.fonts) : xa.set(t.fonts, n = new X1(t.fonts));
  let i = "width" in t ? t.width : void 0, a = "height" in t ? t.height : void 0, o = r.Node.create();
  i && o.setWidth(i), a && o.setHeight(a), o.setFlexDirection(r.FLEX_DIRECTION_ROW), o.setFlexWrap(r.WRAP_WRAP), o.setAlignContent(r.ALIGN_AUTO), o.setAlignItems(r.ALIGN_FLEX_START), o.setJustifyContent(r.JUSTIFY_FLEX_START), o.setOverflow(r.OVERFLOW_HIDDEN);
  let u = { ...t.graphemeImages }, s = /* @__PURE__ */ new Set();
  cr.clear(), await Vg(e);
  let l = Ta(e, { id: "id", parentStyle: {}, inheritedStyle: { fontSize: 16, fontWeight: "normal", fontFamily: "serif", fontStyle: "normal", lineHeight: 1.2, color: "black", opacity: 1, whiteSpace: "normal", _viewportWidth: i, _viewportHeight: a }, parent: o, font: n, embedFont: t.embedFont, debug: t.debug, graphemeImages: u, canLoadAdditionalAssets: !!t.loadAdditionalAsset, onNodeDetected: t.onNodeDetected, getTwStyles: (D, v) => {
    let g = { ...Pm({ width: i, height: a, config: t.tailwindConfig })([D]) };
    return typeof g.lineHeight == "number" && (g.lineHeight = g.lineHeight / (+g.fontSize || v.fontSize || 16)), g.shadowColor && g.boxShadow && (g.boxShadow = g.boxShadow.replace(/rgba?\([^)]+\)/, g.shadowColor)), g;
  } }), f = (await l.next()).value;
  if (t.loadAdditionalAsset && f.length) {
    let D = Rm(f), v = [], g = {};
    await Promise.all(Object.entries(D).flatMap(([y, b]) => b.map((C) => {
      let k = `${y}_${C}`;
      return s.has(k) ? null : (s.add(k), t.loadAdditionalAsset(y, C).then((S) => {
        typeof S == "string" ? g[C] = S : S && (Array.isArray(S) ? v.push(...S) : v.push(S));
      }));
    }))), n.addFonts(v), Object.assign(u, g);
  }
  await l.next(), o.calculateLayout(i, a, r.DIRECTION_LTR);
  let c = (await l.next([0, 0])).value, p2 = o.getComputedWidth(), d = o.getComputedHeight();
  return o.freeRecursive(), Y1({ width: p2, height: d, content: c });
}
function Rm(e) {
  let t = {}, r = {};
  for (let { word: n, locale: i } of e) {
    let a = z1(n, i).join("|");
    r[a] = r[a] || "", r[a] += n;
  }
  return Object.keys(r).forEach((n) => {
    t[n] = t[n] || [], n === "emoji" ? t[n].push(...Uu(Pt(r[n], "grapheme"))) : (t[n][0] = t[n][0] || "", t[n][0] += Uu(Pt(r[n], "grapheme", n === "unknown" ? void 0 : n)).join(""));
  }), t;
}
function Uu(e) {
  return Array.from(new Set(e));
}
var ne = {};
var Um = ne.ALIGN_AUTO = 0;
var Bm = ne.ALIGN_FLEX_START = 1;
var Nm = ne.ALIGN_CENTER = 2;
var Mm = ne.ALIGN_FLEX_END = 3;
var Gm = ne.ALIGN_STRETCH = 4;
var Wm = ne.ALIGN_BASELINE = 5;
var $m = ne.ALIGN_SPACE_BETWEEN = 6;
var jm = ne.ALIGN_SPACE_AROUND = 7;
var zm = ne.DIMENSION_WIDTH = 0;
var Vm = ne.DIMENSION_HEIGHT = 1;
var Hm = ne.DIRECTION_INHERIT = 0;
var Xm = ne.DIRECTION_LTR = 1;
var qm = ne.DIRECTION_RTL = 2;
var Ym = ne.DISPLAY_FLEX = 0;
var Zm = ne.DISPLAY_NONE = 1;
var Jm = ne.EDGE_LEFT = 0;
var Km = ne.EDGE_TOP = 1;
var Qm = ne.EDGE_RIGHT = 2;
var eD = ne.EDGE_BOTTOM = 3;
var tD = ne.EDGE_START = 4;
var rD = ne.EDGE_END = 5;
var nD = ne.EDGE_HORIZONTAL = 6;
var iD = ne.EDGE_VERTICAL = 7;
var aD = ne.EDGE_ALL = 8;
var oD = ne.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = 0;
var sD = ne.EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = 1;
var uD = ne.EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = 2;
var lD = ne.FLEX_DIRECTION_COLUMN = 0;
var fD = ne.FLEX_DIRECTION_COLUMN_REVERSE = 1;
var cD = ne.FLEX_DIRECTION_ROW = 2;
var pD = ne.FLEX_DIRECTION_ROW_REVERSE = 3;
var hD = ne.GUTTER_COLUMN = 0;
var dD = ne.GUTTER_ROW = 1;
var vD = ne.GUTTER_ALL = 2;
var gD = ne.JUSTIFY_FLEX_START = 0;
var mD = ne.JUSTIFY_CENTER = 1;
var DD = ne.JUSTIFY_FLEX_END = 2;
var yD = ne.JUSTIFY_SPACE_BETWEEN = 3;
var bD = ne.JUSTIFY_SPACE_AROUND = 4;
var xD = ne.JUSTIFY_SPACE_EVENLY = 5;
var wD = ne.LOG_LEVEL_ERROR = 0;
var ED = ne.LOG_LEVEL_WARN = 1;
var FD = ne.LOG_LEVEL_INFO = 2;
var CD = ne.LOG_LEVEL_DEBUG = 3;
var SD = ne.LOG_LEVEL_VERBOSE = 4;
var kD = ne.LOG_LEVEL_FATAL = 5;
var TD = ne.MEASURE_MODE_UNDEFINED = 0;
var _D = ne.MEASURE_MODE_EXACTLY = 1;
var AD = ne.MEASURE_MODE_AT_MOST = 2;
var OD = ne.NODE_TYPE_DEFAULT = 0;
var LD = ne.NODE_TYPE_TEXT = 1;
var ID = ne.OVERFLOW_VISIBLE = 0;
var PD = ne.OVERFLOW_HIDDEN = 1;
var RD = ne.OVERFLOW_SCROLL = 2;
var UD = ne.POSITION_TYPE_STATIC = 0;
var BD = ne.POSITION_TYPE_RELATIVE = 1;
var ND = ne.POSITION_TYPE_ABSOLUTE = 2;
var MD = ne.PRINT_OPTIONS_LAYOUT = 1;
var GD = ne.PRINT_OPTIONS_STYLE = 2;
var WD = ne.PRINT_OPTIONS_CHILDREN = 4;
var $D = ne.UNIT_UNDEFINED = 0;
var jD = ne.UNIT_POINT = 1;
var zD = ne.UNIT_PERCENT = 2;
var VD = ne.UNIT_AUTO = 3;
var HD = ne.WRAP_NO_WRAP = 0;
var XD = ne.WRAP_WRAP = 1;
var qD = ne.WRAP_WRAP_REVERSE = 2;
var Il = (e) => {
  function t(i, a, o) {
    let u = i[a];
    i[a] = function(...s) {
      return o.call(this, u, ...s);
    };
  }
  for (let i of ["setPosition", "setMargin", "setFlexBasis", "setWidth", "setHeight", "setMinWidth", "setMinHeight", "setMaxWidth", "setMaxHeight", "setPadding"]) {
    let a = { [ne.UNIT_POINT]: e.Node.prototype[i], [ne.UNIT_PERCENT]: e.Node.prototype[`${i}Percent`], [ne.UNIT_AUTO]: e.Node.prototype[`${i}Auto`] };
    t(e.Node.prototype, i, function(o, ...u) {
      let s, l, f = u.pop();
      if (f === "auto")
        s = ne.UNIT_AUTO, l = void 0;
      else if (typeof f == "object")
        s = f.unit, l = f.valueOf();
      else if (s = typeof f == "string" && f.endsWith("%") ? ne.UNIT_PERCENT : ne.UNIT_POINT, l = parseFloat(f), !Number.isNaN(f) && Number.isNaN(l))
        throw Error(`Invalid value ${f} for ${i}`);
      if (!a[s])
        throw Error(`Failed to execute "${i}": Unsupported unit '${f}'`);
      return l !== void 0 ? a[s].call(this, ...u, l) : a[s].call(this, ...u);
    });
  }
  function r(i) {
    return e.MeasureCallback.implement({ measure: (...a) => {
      let { width: o, height: u } = i(...a);
      return { width: o ?? NaN, height: u ?? NaN };
    } });
  }
  function n(i) {
    return e.DirtiedCallback.implement({ dirtied: i });
  }
  return t(e.Node.prototype, "setMeasureFunc", function(i, a) {
    return a ? i.call(this, r(a)) : this.unsetMeasureFunc();
  }), t(e.Node.prototype, "setDirtiedFunc", function(i, a) {
    i.call(this, n(a));
  }), t(e.Config.prototype, "free", function() {
    e.Config.destroy(this);
  }), t(e.Node, "create", (i, a) => a ? e.Node.createWithConfig(a) : e.Node.createDefault()), t(e.Node.prototype, "free", function() {
    e.Node.destroy(this);
  }), t(e.Node.prototype, "freeRecursive", function() {
    for (let i = 0, a = this.getChildCount(); i < a; ++i)
      this.getChild(0).freeRecursive();
    this.free();
  }), t(e.Node.prototype, "calculateLayout", function(i, a = NaN, o = NaN, u = ne.DIRECTION_LTR) {
    return i.call(this, a, o, u);
  }), { Config: e.Config, Node: e.Node, ...ne };
};
var YD = (() => {
  var e = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
  return function(t = {}) {
    s || (s = t !== void 0 ? t : {}), s.ready = new Promise(function(w, x) {
      l = w, f = x;
    });
    var r, n, i = Object.assign({}, s), a = "";
    typeof document < "u" && document.currentScript && (a = document.currentScript.src), e && (a = e), a = a.indexOf("blob:") !== 0 ? a.substr(0, a.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
    var o = console.log.bind(console), u = console.warn.bind(console);
    Object.assign(s, i), i = null, typeof WebAssembly != "object" && ee("no native wasm support detected");
    var s, l, f, c, p2 = false;
    function d(w, x, I) {
      I = x + I;
      for (var G = ""; !(x >= I); ) {
        var P = w[x++];
        if (!P)
          break;
        if (128 & P) {
          var j = 63 & w[x++];
          if ((224 & P) == 192)
            G += String.fromCharCode((31 & P) << 6 | j);
          else {
            var K = 63 & w[x++];
            65536 > (P = (240 & P) == 224 ? (15 & P) << 12 | j << 6 | K : (7 & P) << 18 | j << 12 | K << 6 | 63 & w[x++]) ? G += String.fromCharCode(P) : (P -= 65536, G += String.fromCharCode(55296 | P >> 10, 56320 | 1023 & P));
          }
        } else
          G += String.fromCharCode(P);
      }
      return G;
    }
    function D() {
      var w = c.buffer;
      s.HEAP8 = v = new Int8Array(w), s.HEAP16 = y = new Int16Array(w), s.HEAP32 = C = new Int32Array(w), s.HEAPU8 = g = new Uint8Array(w), s.HEAPU16 = b = new Uint16Array(w), s.HEAPU32 = k = new Uint32Array(w), s.HEAPF32 = S = new Float32Array(w), s.HEAPF64 = E = new Float64Array(w);
    }
    var v, g, y, b, C, k, S, E, L, T = [], U = [], M = [], H = 0, q = null;
    function ee(w) {
      throw u(w = "Aborted(" + w + ")"), p2 = true, f(w = new WebAssembly.RuntimeError(w + ". Build with -sASSERTIONS for more info.")), w;
    }
    function A() {
      return r.startsWith("data:application/octet-stream;base64,");
    }
    function R() {
      try {
        throw "both async and sync fetching of the wasm failed";
      } catch (w) {
        ee(w);
      }
    }
    function O(w) {
      for (; 0 < w.length; )
        w.shift()(s);
    }
    function Y(w) {
      if (w === void 0)
        return "_unknown";
      var x = (w = w.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
      return 48 <= x && 57 >= x ? "_" + w : w;
    }
    function Z(w, x) {
      return w = Y(w), function() {
        return x.apply(this, arguments);
      };
    }
    r = "yoga.wasm", A() || (r = a + r);
    var te = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }], ie = [];
    function B(w) {
      var x = Error, I = Z(w, function(G) {
        this.name = w, this.message = G, (G = Error(G).stack) !== void 0 && (this.stack = this.toString() + `
` + G.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      return I.prototype = Object.create(x.prototype), I.prototype.constructor = I, I.prototype.toString = function() {
        return this.message === void 0 ? this.name : this.name + ": " + this.message;
      }, I;
    }
    var z = void 0;
    function _(w) {
      throw new z(w);
    }
    var N = (w) => (w || _("Cannot use deleted val. handle = " + w), te[w].value), ae = (w) => {
      switch (w) {
        case void 0:
          return 1;
        case null:
          return 2;
        case true:
          return 3;
        case false:
          return 4;
        default:
          var x = ie.length ? ie.pop() : te.length;
          return te[x] = { fa: 1, value: w }, x;
      }
    }, W = void 0, fe = void 0;
    function ce(w) {
      for (var x = ""; g[w]; )
        x += fe[g[w++]];
      return x;
    }
    var ge = [];
    function pe() {
      for (; ge.length; ) {
        var w = ge.pop();
        w.L.Z = false, w.delete();
      }
    }
    var xe = void 0, _e = {};
    function he(w, x) {
      for (x === void 0 && _("ptr should not be undefined"); w.P; )
        x = w.aa(x), w = w.P;
      return x;
    }
    var ye = {};
    function Ge(w) {
      var x = ce(w = qa(w));
      return Ht(w), x;
    }
    function tt(w, x) {
      var I = ye[w];
      return I === void 0 && _(x + " has unknown type " + Ge(w)), I;
    }
    function We() {
    }
    var Be = false;
    function He(w) {
      --w.count.value, w.count.value === 0 && (w.S ? w.T.V(w.S) : w.O.M.V(w.N));
    }
    var rt = {}, nt = void 0;
    function it(w) {
      throw new nt(w);
    }
    function at(w, x) {
      return x.O && x.N || it("makeClassHandle requires ptr and ptrType"), !!x.T != !!x.S && it("Both smartPtrType and smartPtr must be specified"), x.count = { value: 1 }, Xe(Object.create(w, { L: { value: x } }));
    }
    function Xe(w) {
      return typeof FinalizationRegistry > "u" ? (Xe = (x) => x, w) : (Be = new FinalizationRegistry((x) => {
        He(x.L);
      }), Xe = (x) => {
        var I = x.L;
        return I.S && Be.register(x, { L: I }, x), x;
      }, We = (x) => {
        Be.unregister(x);
      }, Xe(w));
    }
    var Ct = {};
    function Dt(w) {
      for (; w.length; ) {
        var x = w.pop();
        w.pop()(x);
      }
    }
    function ft(w) {
      return this.fromWireType(C[w >> 2]);
    }
    var ct = {}, zt = {};
    function lt(w, x, I) {
      function G(X) {
        (X = I(X)).length !== w.length && it("Mismatched type converter count");
        for (var Q = 0; Q < w.length; ++Q)
          qe(w[Q], X[Q]);
      }
      w.forEach(function(X) {
        zt[X] = x;
      });
      var P = Array(x.length), j = [], K = 0;
      x.forEach((X, Q) => {
        ye.hasOwnProperty(X) ? P[Q] = ye[X] : (j.push(X), ct.hasOwnProperty(X) || (ct[X] = []), ct[X].push(() => {
          P[Q] = ye[X], ++K === j.length && G(P);
        }));
      }), j.length === 0 && G(P);
    }
    function Ut(w) {
      switch (w) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw TypeError("Unknown type size: " + w);
      }
    }
    function qe(w, x, I = {}) {
      if (!("argPackAdvance" in x))
        throw TypeError("registerType registeredInstance requires argPackAdvance");
      var G = x.name;
      if (w || _('type "' + G + '" must have a positive integer typeid pointer'), ye.hasOwnProperty(w)) {
        if (I.ta)
          return;
        _("Cannot register type '" + G + "' twice");
      }
      ye[w] = x, delete zt[w], ct.hasOwnProperty(w) && (x = ct[w], delete ct[w], x.forEach((P) => P()));
    }
    function xr(w) {
      _(w.L.O.M.name + " instance already deleted");
    }
    function ve() {
    }
    function Le(w, x, I) {
      if (w[x].R === void 0) {
        var G = w[x];
        w[x] = function() {
          return w[x].R.hasOwnProperty(arguments.length) || _("Function '" + I + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + w[x].R + ")!"), w[x].R[arguments.length].apply(this, arguments);
        }, w[x].R = [], w[x].R[G.Y] = G;
      }
    }
    function Ue(w, x, I, G, P, j, K, X) {
      this.name = w, this.constructor = x, this.W = I, this.V = G, this.P = P, this.oa = j, this.aa = K, this.ma = X, this.ia = [];
    }
    function we(w, x, I) {
      for (; x !== I; )
        x.aa || _("Expected null or instance of " + I.name + ", got an instance of " + x.name), w = x.aa(w), x = x.P;
      return w;
    }
    function Ne(w, x) {
      return x === null ? (this.da && _("null is not a valid " + this.name), 0) : (x.L || _('Cannot pass "' + Pe(x) + '" as a ' + this.name), x.L.N || _("Cannot pass deleted object as a pointer of type " + this.name), we(x.L.N, x.L.O.M, this.M));
    }
    function Ae(w, x) {
      if (x === null) {
        if (this.da && _("null is not a valid " + this.name), this.ca) {
          var I = this.ea();
          return w !== null && w.push(this.V, I), I;
        }
        return 0;
      }
      if (x.L || _('Cannot pass "' + Pe(x) + '" as a ' + this.name), x.L.N || _("Cannot pass deleted object as a pointer of type " + this.name), !this.ba && x.L.O.ba && _("Cannot convert argument of type " + (x.L.T ? x.L.T.name : x.L.O.name) + " to parameter type " + this.name), I = we(x.L.N, x.L.O.M, this.M), this.ca)
        switch (x.L.S === void 0 && _("Passing raw pointer to smart pointer is illegal"), this.Aa) {
          case 0:
            x.L.T === this ? I = x.L.S : _("Cannot convert argument of type " + (x.L.T ? x.L.T.name : x.L.O.name) + " to parameter type " + this.name);
            break;
          case 1:
            I = x.L.S;
            break;
          case 2:
            if (x.L.T === this)
              I = x.L.S;
            else {
              var G = x.clone();
              I = this.wa(I, ae(function() {
                G.delete();
              })), w !== null && w.push(this.V, I);
            }
            break;
          default:
            _("Unsupporting sharing policy");
        }
      return I;
    }
    function $e(w, x) {
      return x === null ? (this.da && _("null is not a valid " + this.name), 0) : (x.L || _('Cannot pass "' + Pe(x) + '" as a ' + this.name), x.L.N || _("Cannot pass deleted object as a pointer of type " + this.name), x.L.O.ba && _("Cannot convert argument of type " + x.L.O.name + " to parameter type " + this.name), we(x.L.N, x.L.O.M, this.M));
    }
    function Fe(w, x, I, G) {
      this.name = w, this.M = x, this.da = I, this.ba = G, this.ca = false, this.V = this.wa = this.ea = this.ja = this.Aa = this.va = void 0, x.P !== void 0 ? this.toWireType = Ae : (this.toWireType = G ? Ne : $e, this.U = null);
    }
    var Ce = [];
    function pt(w) {
      var x = Ce[w];
      return x || (w >= Ce.length && (Ce.length = w + 1), Ce[w] = x = L.get(w)), x;
    }
    function me(w, x) {
      var I, G, P = (w = ce(w)).includes("j") ? (I = w, G = [], function() {
        if (G.length = 0, Object.assign(G, arguments), I.includes("j")) {
          var j = s["dynCall_" + I];
          j = G && G.length ? j.apply(null, [x].concat(G)) : j.call(null, x);
        } else
          j = pt(x).apply(null, G);
        return j;
      }) : pt(x);
      return typeof P != "function" && _("unknown function pointer with signature " + w + ": " + x), P;
    }
    var Bt = void 0;
    function Ke(w, x) {
      var I = [], G = {};
      throw x.forEach(function P(j) {
        G[j] || ye[j] || (zt[j] ? zt[j].forEach(P) : (I.push(j), G[j] = true));
      }), new Bt(w + ": " + I.map(Ge).join([", "]));
    }
    function yt(w, x, I, G, P) {
      var j = x.length;
      2 > j && _("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var K = x[1] !== null && I !== null, X = false;
      for (I = 1; I < x.length; ++I)
        if (x[I] !== null && x[I].U === void 0) {
          X = true;
          break;
        }
      var Q = x[0].name !== "void", J = j - 2, re = Array(J), De = [], be = [];
      return function() {
        if (arguments.length !== J && _("function " + w + " called with " + arguments.length + " arguments, expected " + J + " args!"), be.length = 0, De.length = K ? 2 : 1, De[0] = P, K) {
          var Oe = x[1].toWireType(be, this);
          De[1] = Oe;
        }
        for (var Se = 0; Se < J; ++Se)
          re[Se] = x[Se + 2].toWireType(be, arguments[Se]), De.push(re[Se]);
        if (Se = G.apply(null, De), X)
          Dt(be);
        else
          for (var ze = K ? 1 : 2; ze < x.length; ze++) {
            var Er = ze === 1 ? Oe : re[ze - 2];
            x[ze].U !== null && x[ze].U(Er);
          }
        return Q ? x[0].fromWireType(Se) : void 0;
      };
    }
    function rr(w, x) {
      for (var I = [], G = 0; G < w; G++)
        I.push(k[x + 4 * G >> 2]);
      return I;
    }
    function bt(w) {
      4 < w && --te[w].fa == 0 && (te[w] = void 0, ie.push(w));
    }
    function Pe(w) {
      if (w === null)
        return "null";
      var x = typeof w;
      return x === "object" || x === "array" || x === "function" ? w.toString() : "" + w;
    }
    function Ye(w, x) {
      for (var I = "", G = 0; !(G >= x / 2); ++G) {
        var P = y[w + 2 * G >> 1];
        if (P == 0)
          break;
        I += String.fromCharCode(P);
      }
      return I;
    }
    function ht(w, x, I) {
      if (I === void 0 && (I = 2147483647), 2 > I)
        return 0;
      I -= 2;
      var G = x;
      I = I < 2 * w.length ? I / 2 : w.length;
      for (var P = 0; P < I; ++P)
        y[x >> 1] = w.charCodeAt(P), x += 2;
      return y[x >> 1] = 0, x - G;
    }
    function wr(w) {
      return 2 * w.length;
    }
    function hr(w, x) {
      for (var I = 0, G = ""; !(I >= x / 4); ) {
        var P = C[w + 4 * I >> 2];
        if (P == 0)
          break;
        ++I, 65536 <= P ? (P -= 65536, G += String.fromCharCode(55296 | P >> 10, 56320 | 1023 & P)) : G += String.fromCharCode(P);
      }
      return G;
    }
    function Qe(w, x, I) {
      if (I === void 0 && (I = 2147483647), 4 > I)
        return 0;
      var G = x;
      I = G + I - 4;
      for (var P = 0; P < w.length; ++P) {
        var j = w.charCodeAt(P);
        if (55296 <= j && 57343 >= j && (j = 65536 + ((1023 & j) << 10) | 1023 & w.charCodeAt(++P)), C[x >> 2] = j, (x += 4) + 4 > I)
          break;
      }
      return C[x >> 2] = 0, x - G;
    }
    function dt(w) {
      for (var x = 0, I = 0; I < w.length; ++I) {
        var G = w.charCodeAt(I);
        55296 <= G && 57343 >= G && ++I, x += 4;
      }
      return x;
    }
    var Vt = {};
    function xt(w) {
      var x = Vt[w];
      return x === void 0 ? ce(w) : x;
    }
    var Nt = [], Or = [], pn = [null, [], []];
    z = s.BindingError = B("BindingError"), s.count_emval_handles = function() {
      for (var w = 0, x = 5; x < te.length; ++x)
        te[x] !== void 0 && ++w;
      return w;
    }, s.get_first_emval = function() {
      for (var w = 5; w < te.length; ++w)
        if (te[w] !== void 0)
          return te[w];
      return null;
    }, W = s.PureVirtualError = B("PureVirtualError");
    for (var Xa = Array(256), hn = 0; 256 > hn; ++hn)
      Xa[hn] = String.fromCharCode(hn);
    fe = Xa, s.getInheritedInstanceCount = function() {
      return Object.keys(_e).length;
    }, s.getLiveInheritedInstances = function() {
      var w, x = [];
      for (w in _e)
        _e.hasOwnProperty(w) && x.push(_e[w]);
      return x;
    }, s.flushPendingDeletes = pe, s.setDelayFunction = function(w) {
      xe = w, ge.length && xe && xe(pe);
    }, nt = s.InternalError = B("InternalError"), ve.prototype.isAliasOf = function(w) {
      if (!(this instanceof ve && w instanceof ve))
        return false;
      var x = this.L.O.M, I = this.L.N, G = w.L.O.M;
      for (w = w.L.N; x.P; )
        I = x.aa(I), x = x.P;
      for (; G.P; )
        w = G.aa(w), G = G.P;
      return x === G && I === w;
    }, ve.prototype.clone = function() {
      if (this.L.N || xr(this), this.L.$)
        return this.L.count.value += 1, this;
      var w = Xe, x = Object, I = x.create, G = Object.getPrototypeOf(this), P = this.L;
      return w = w(I.call(x, G, { L: { value: { count: P.count, Z: P.Z, $: P.$, N: P.N, O: P.O, S: P.S, T: P.T } } })), w.L.count.value += 1, w.L.Z = false, w;
    }, ve.prototype.delete = function() {
      this.L.N || xr(this), this.L.Z && !this.L.$ && _("Object already scheduled for deletion"), We(this), He(this.L), this.L.$ || (this.L.S = void 0, this.L.N = void 0);
    }, ve.prototype.isDeleted = function() {
      return !this.L.N;
    }, ve.prototype.deleteLater = function() {
      return this.L.N || xr(this), this.L.Z && !this.L.$ && _("Object already scheduled for deletion"), ge.push(this), ge.length === 1 && xe && xe(pe), this.L.Z = true, this;
    }, Fe.prototype.pa = function(w) {
      return this.ja && (w = this.ja(w)), w;
    }, Fe.prototype.ga = function(w) {
      this.V && this.V(w);
    }, Fe.prototype.argPackAdvance = 8, Fe.prototype.readValueFromPointer = ft, Fe.prototype.deleteObject = function(w) {
      w !== null && w.delete();
    }, Fe.prototype.fromWireType = function(w) {
      function x() {
        return this.ca ? at(this.M.W, { O: this.va, N: G, T: this, S: w }) : at(this.M.W, { O: this, N: w });
      }
      var I, G = this.pa(w);
      if (!G)
        return this.ga(w), null;
      var P = _e[he(this.M, G)];
      if (P !== void 0)
        return P.L.count.value === 0 ? (P.L.N = G, P.L.S = w, P.clone()) : (P = P.clone(), this.ga(w), P);
      if (!(P = rt[P = this.M.oa(G)]))
        return x.call(this);
      P = this.ba ? P.ka : P.pointerType;
      var j = function K(X, Q, J) {
        return Q === J ? X : J.P === void 0 || (X = K(X, Q, J.P)) === null ? null : J.ma(X);
      }(G, this.M, P.M);
      return j === null ? x.call(this) : this.ca ? at(P.M.W, { O: P, N: j, T: this, S: w }) : at(P.M.W, { O: P, N: j });
    }, Bt = s.UnboundTypeError = B("UnboundTypeError");
    var Hl = { q: function(w, x, I) {
      w = ce(w), x = tt(x, "wrapper"), I = N(I);
      var G = [].slice, P = x.M, j = P.W, K = P.P.W, X = P.P.constructor;
      for (var Q in w = Z(w, function() {
        P.P.ia.forEach(function(J) {
          if (this[J] === K[J])
            throw new W("Pure virtual function " + J + " must be implemented in JavaScript");
        }.bind(this)), Object.defineProperty(this, "__parent", { value: j }), this.__construct.apply(this, G.call(arguments));
      }), j.__construct = function() {
        this === j && _("Pass correct 'this' to __construct");
        var J = X.implement.apply(void 0, [this].concat(G.call(arguments)));
        We(J);
        var re = J.L;
        J.notifyOnDestruction(), re.$ = true, Object.defineProperties(this, { L: { value: re } }), Xe(this), J = he(P, J = re.N), _e.hasOwnProperty(J) ? _("Tried to register registered instance: " + J) : _e[J] = this;
      }, j.__destruct = function() {
        this === j && _("Pass correct 'this' to __destruct"), We(this);
        var J = this.L.N;
        J = he(P, J), _e.hasOwnProperty(J) ? delete _e[J] : _("Tried to unregister unregistered instance: " + J);
      }, w.prototype = Object.create(j), I)
        w.prototype[Q] = I[Q];
      return ae(w);
    }, l: function(w) {
      var x = Ct[w];
      delete Ct[w];
      var I = x.ea, G = x.V, P = x.ha;
      lt([w], P.map((j) => j.sa).concat(P.map((j) => j.ya)), (j) => {
        var K = {};
        return P.forEach((X, Q) => {
          var J = j[Q], re = X.qa, De = X.ra, be = j[Q + P.length], Oe = X.xa, Se = X.za;
          K[X.na] = { read: (ze) => J.fromWireType(re(De, ze)), write: (ze, Er) => {
            var dr = [];
            Oe(Se, ze, be.toWireType(dr, Er)), Dt(dr);
          } };
        }), [{ name: x.name, fromWireType: function(X) {
          var Q, J = {};
          for (Q in K)
            J[Q] = K[Q].read(X);
          return G(X), J;
        }, toWireType: function(X, Q) {
          for (var J in K)
            if (!(J in Q))
              throw TypeError('Missing field:  "' + J + '"');
          var re = I();
          for (J in K)
            K[J].write(re, Q[J]);
          return X !== null && X.push(G, re), re;
        }, argPackAdvance: 8, readValueFromPointer: ft, U: G }];
      });
    }, v: function() {
    }, B: function(w, x, I, G, P) {
      var j = Ut(I);
      qe(w, { name: x = ce(x), fromWireType: function(K) {
        return !!K;
      }, toWireType: function(K, X) {
        return X ? G : P;
      }, argPackAdvance: 8, readValueFromPointer: function(K) {
        if (I === 1)
          var X = v;
        else if (I === 2)
          X = y;
        else if (I === 4)
          X = C;
        else
          throw TypeError("Unknown boolean type size: " + x);
        return this.fromWireType(X[K >> j]);
      }, U: null });
    }, h: function(w, x, I, G, P, j, K, X, Q, J, re, De, be) {
      re = ce(re), j = me(P, j), X && (X = me(K, X)), J && (J = me(Q, J)), be = me(De, be);
      var Oe, Se = Y(re);
      Oe = function() {
        Ke("Cannot construct " + re + " due to unbound types", [G]);
      }, s.hasOwnProperty(Se) ? (_("Cannot register public name '" + Se + "' twice"), Le(s, Se, Se), s.hasOwnProperty(void 0) && _("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), s[Se].R[void 0] = Oe) : s[Se] = Oe, lt([w, x, I], G ? [G] : [], function(ze) {
        if (ze = ze[0], G)
          var Er, dr = ze.M, Lr = dr.W;
        else
          Lr = ve.prototype;
        ze = Z(Se, function() {
          if (Object.getPrototypeOf(this) !== ci)
            throw new z("Use 'new' to construct " + re);
          if (Fr.X === void 0)
            throw new z(re + " has no accessible constructor");
          var Ja = Fr.X[arguments.length];
          if (Ja === void 0)
            throw new z("Tried to invoke ctor of " + re + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(Fr.X).toString() + ") parameters instead!");
          return Ja.apply(this, arguments);
        });
        var ci = Object.create(Lr, { constructor: { value: ze } });
        ze.prototype = ci;
        var Fr = new Ue(re, ze, ci, be, dr, j, X, J);
        dr = new Fe(re, Fr, true, false), Lr = new Fe(re + "*", Fr, false, false);
        var Za = new Fe(re + " const*", Fr, false, true);
        return rt[w] = { pointerType: Lr, ka: Za }, Er = ze, s.hasOwnProperty(Se) || it("Replacing nonexistant public symbol"), s[Se] = Er, s[Se].Y = void 0, [dr, Lr, Za];
      });
    }, d: function(w, x, I, G, P, j, K) {
      var X = rr(I, G);
      x = ce(x), j = me(P, j), lt([], [w], function(Q) {
        function J() {
          Ke("Cannot call " + re + " due to unbound types", X);
        }
        var re = (Q = Q[0]).name + "." + x;
        x.startsWith("@@") && (x = Symbol[x.substring(2)]);
        var De = Q.M.constructor;
        return De[x] === void 0 ? (J.Y = I - 1, De[x] = J) : (Le(De, x, re), De[x].R[I - 1] = J), lt([], X, function(be) {
          return be = yt(re, [be[0], null].concat(be.slice(1)), null, j, K), De[x].R === void 0 ? (be.Y = I - 1, De[x] = be) : De[x].R[I - 1] = be, [];
        }), [];
      });
    }, p: function(w, x, I, G, P, j) {
      0 < x || ee();
      var K = rr(x, I);
      P = me(G, P), lt([], [w], function(X) {
        var Q = "constructor " + (X = X[0]).name;
        if (X.M.X === void 0 && (X.M.X = []), X.M.X[x - 1] !== void 0)
          throw new z("Cannot register multiple constructors with identical number of parameters (" + (x - 1) + ") for class '" + X.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
        return X.M.X[x - 1] = () => {
          Ke("Cannot construct " + X.name + " due to unbound types", K);
        }, lt([], K, function(J) {
          return J.splice(1, 0, null), X.M.X[x - 1] = yt(Q, J, null, P, j), [];
        }), [];
      });
    }, a: function(w, x, I, G, P, j, K, X) {
      var Q = rr(I, G);
      x = ce(x), j = me(P, j), lt([], [w], function(J) {
        function re() {
          Ke("Cannot call " + De + " due to unbound types", Q);
        }
        var De = (J = J[0]).name + "." + x;
        x.startsWith("@@") && (x = Symbol[x.substring(2)]), X && J.M.ia.push(x);
        var be = J.M.W, Oe = be[x];
        return Oe === void 0 || Oe.R === void 0 && Oe.className !== J.name && Oe.Y === I - 2 ? (re.Y = I - 2, re.className = J.name, be[x] = re) : (Le(be, x, De), be[x].R[I - 2] = re), lt([], Q, function(Se) {
          return Se = yt(De, Se, J, j, K), be[x].R === void 0 ? (Se.Y = I - 2, be[x] = Se) : be[x].R[I - 2] = Se, [];
        }), [];
      });
    }, A: function(w, x) {
      qe(w, { name: x = ce(x), fromWireType: function(I) {
        var G = N(I);
        return bt(I), G;
      }, toWireType: function(I, G) {
        return ae(G);
      }, argPackAdvance: 8, readValueFromPointer: ft, U: null });
    }, n: function(w, x, I) {
      I = Ut(I), qe(w, { name: x = ce(x), fromWireType: function(G) {
        return G;
      }, toWireType: function(G, P) {
        return P;
      }, argPackAdvance: 8, readValueFromPointer: function(G, P) {
        switch (P) {
          case 2:
            return function(j) {
              return this.fromWireType(S[j >> 2]);
            };
          case 3:
            return function(j) {
              return this.fromWireType(E[j >> 3]);
            };
          default:
            throw TypeError("Unknown float type: " + G);
        }
      }(x, I), U: null });
    }, e: function(w, x, I, G, P) {
      x = ce(x), P === -1 && (P = 4294967295), P = Ut(I);
      var j = (X) => X;
      if (G === 0) {
        var K = 32 - 8 * I;
        j = (X) => X << K >>> K;
      }
      I = x.includes("unsigned") ? function(X, Q) {
        return Q >>> 0;
      } : function(X, Q) {
        return Q;
      }, qe(w, { name: x, fromWireType: j, toWireType: I, argPackAdvance: 8, readValueFromPointer: function(X, Q, J) {
        switch (Q) {
          case 0:
            return J ? function(re) {
              return v[re];
            } : function(re) {
              return g[re];
            };
          case 1:
            return J ? function(re) {
              return y[re >> 1];
            } : function(re) {
              return b[re >> 1];
            };
          case 2:
            return J ? function(re) {
              return C[re >> 2];
            } : function(re) {
              return k[re >> 2];
            };
          default:
            throw TypeError("Unknown integer type: " + X);
        }
      }(x, P, G !== 0), U: null });
    }, b: function(w, x, I) {
      function G(j) {
        j >>= 2;
        var K = k;
        return new P(K.buffer, K[j + 1], K[j]);
      }
      var P = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][x];
      qe(w, { name: I = ce(I), fromWireType: G, argPackAdvance: 8, readValueFromPointer: G }, { ta: true });
    }, o: function(w, x) {
      var I = (x = ce(x)) === "std::string";
      qe(w, { name: x, fromWireType: function(G) {
        var P = k[G >> 2], j = G + 4;
        if (I)
          for (var K = j, X = 0; X <= P; ++X) {
            var Q = j + X;
            if (X == P || g[Q] == 0) {
              if (K = K ? d(g, K, Q - K) : "", J === void 0)
                var J = K;
              else
                J += "\0" + K;
              K = Q + 1;
            }
          }
        else {
          for (X = 0, J = Array(P); X < P; ++X)
            J[X] = String.fromCharCode(g[j + X]);
          J = J.join("");
        }
        return Ht(G), J;
      }, toWireType: function(G, P) {
        P instanceof ArrayBuffer && (P = new Uint8Array(P));
        var j, K = typeof P == "string";
        if (K || P instanceof Uint8Array || P instanceof Uint8ClampedArray || P instanceof Int8Array || _("Cannot pass non-string to std::string"), I && K) {
          var X = 0;
          for (j = 0; j < P.length; ++j) {
            var Q = P.charCodeAt(j);
            127 >= Q ? X++ : 2047 >= Q ? X += 2 : 55296 <= Q && 57343 >= Q ? (X += 4, ++j) : X += 3;
          }
          j = X;
        } else
          j = P.length;
        if (Q = (X = fi(4 + j + 1)) + 4, k[X >> 2] = j, I && K) {
          if (K = Q, Q = j + 1, j = g, 0 < Q) {
            Q = K + Q - 1;
            for (var J = 0; J < P.length; ++J) {
              var re = P.charCodeAt(J);
              if (55296 <= re && 57343 >= re && (re = 65536 + ((1023 & re) << 10) | 1023 & P.charCodeAt(++J)), 127 >= re) {
                if (K >= Q)
                  break;
                j[K++] = re;
              } else {
                if (2047 >= re) {
                  if (K + 1 >= Q)
                    break;
                  j[K++] = 192 | re >> 6;
                } else {
                  if (65535 >= re) {
                    if (K + 2 >= Q)
                      break;
                    j[K++] = 224 | re >> 12;
                  } else {
                    if (K + 3 >= Q)
                      break;
                    j[K++] = 240 | re >> 18, j[K++] = 128 | re >> 12 & 63;
                  }
                  j[K++] = 128 | re >> 6 & 63;
                }
                j[K++] = 128 | 63 & re;
              }
            }
            j[K] = 0;
          }
        } else if (K)
          for (K = 0; K < j; ++K)
            255 < (J = P.charCodeAt(K)) && (Ht(Q), _("String has UTF-16 code units that do not fit in 8 bits")), g[Q + K] = J;
        else
          for (K = 0; K < j; ++K)
            g[Q + K] = P[K];
        return G !== null && G.push(Ht, X), X;
      }, argPackAdvance: 8, readValueFromPointer: ft, U: function(G) {
        Ht(G);
      } });
    }, k: function(w, x, I) {
      if (I = ce(I), x === 2)
        var G = Ye, P = ht, j = wr, K = () => b, X = 1;
      else
        x === 4 && (G = hr, P = Qe, j = dt, K = () => k, X = 2);
      qe(w, { name: I, fromWireType: function(Q) {
        for (var J, re = k[Q >> 2], De = K(), be = Q + 4, Oe = 0; Oe <= re; ++Oe) {
          var Se = Q + 4 + Oe * x;
          (Oe == re || De[Se >> X] == 0) && (be = G(be, Se - be), J === void 0 ? J = be : J += "\0" + be, be = Se + x);
        }
        return Ht(Q), J;
      }, toWireType: function(Q, J) {
        typeof J != "string" && _("Cannot pass non-string to C++ string type " + I);
        var re = j(J), De = fi(4 + re + x);
        return k[De >> 2] = re >> X, P(J, De + 4, re + x), Q !== null && Q.push(Ht, De), De;
      }, argPackAdvance: 8, readValueFromPointer: ft, U: function(Q) {
        Ht(Q);
      } });
    }, m: function(w, x, I, G, P, j) {
      Ct[w] = { name: ce(x), ea: me(I, G), V: me(P, j), ha: [] };
    }, c: function(w, x, I, G, P, j, K, X, Q, J) {
      Ct[w].ha.push({ na: ce(x), sa: I, qa: me(G, P), ra: j, ya: K, xa: me(X, Q), za: J });
    }, C: function(w, x) {
      qe(w, { ua: true, name: x = ce(x), argPackAdvance: 0, fromWireType: function() {
      }, toWireType: function() {
      } });
    }, t: function(w, x, I, G, P) {
      w = Nt[w], x = N(x), I = xt(I);
      var j = [];
      return k[G >> 2] = ae(j), w(x, I, j, P);
    }, j: function(w, x, I, G) {
      w = Nt[w], w(x = N(x), I = xt(I), null, G);
    }, f: bt, g: function(w, x) {
      var I, G, P = function(Q, J) {
        for (var re = Array(Q), De = 0; De < Q; ++De)
          re[De] = tt(k[J + 4 * De >> 2], "parameter " + De);
        return re;
      }(w, x), j = P[0], K = Or[x = j.name + "_$" + P.slice(1).map(function(Q) {
        return Q.name;
      }).join("_") + "$"];
      if (K !== void 0)
        return K;
      var X = Array(w - 1);
      return I = (Q, J, re, De) => {
        for (var be = 0, Oe = 0; Oe < w - 1; ++Oe)
          X[Oe] = P[Oe + 1].readValueFromPointer(De + be), be += P[Oe + 1].argPackAdvance;
        for (Oe = 0, Q = Q[J].apply(Q, X); Oe < w - 1; ++Oe)
          P[Oe + 1].la && P[Oe + 1].la(X[Oe]);
        if (!j.ua)
          return j.toWireType(re, Q);
      }, G = Nt.length, Nt.push(I), K = G, Or[x] = K;
    }, r: function(w) {
      4 < w && (te[w].fa += 1);
    }, s: function(w) {
      Dt(N(w)), bt(w);
    }, i: function() {
      ee("");
    }, x: function(w, x, I) {
      g.copyWithin(w, x, x + I);
    }, w: function(w) {
      var x = g.length;
      if (2147483648 < (w >>>= 0))
        return false;
      for (var I = 1; 4 >= I; I *= 2) {
        var G = x * (1 + 0.2 / I);
        G = Math.min(G, w + 100663296);
        var P = Math, j = P.min;
        G = Math.max(w, G), G += (65536 - G % 65536) % 65536;
        e: {
          var K = c.buffer;
          try {
            c.grow(j.call(P, 2147483648, G) - K.byteLength + 65535 >>> 16), D();
            var X = 1;
            break e;
          } catch {
          }
          X = void 0;
        }
        if (X)
          return true;
      }
      return false;
    }, z: function() {
      return 52;
    }, u: function() {
      return 70;
    }, y: function(w, x, I, G) {
      for (var P = 0, j = 0; j < I; j++) {
        var K = k[x >> 2], X = k[x + 4 >> 2];
        x += 8;
        for (var Q = 0; Q < X; Q++) {
          var J = g[K + Q], re = pn[w];
          J === 0 || J === 10 ? ((w === 1 ? o : u)(d(re, 0)), re.length = 0) : re.push(J);
        }
        P += X;
      }
      return k[G >> 2] = P, 0;
    } };
    (function() {
      function w(P) {
        s.asm = P.exports, c = s.asm.D, D(), L = s.asm.I, U.unshift(s.asm.E), --H == 0 && q && (P = q, q = null, P());
      }
      function x(P) {
        w(P.instance);
      }
      function I(P) {
        return (typeof fetch == "function" ? fetch(r, { credentials: "same-origin" }).then(function(j) {
          if (!j.ok)
            throw "failed to load wasm binary file at '" + r + "'";
          return j.arrayBuffer();
        }).catch(function() {
          return R();
        }) : Promise.resolve().then(function() {
          return R();
        })).then(function(j) {
          return WebAssembly.instantiate(j, G);
        }).then(function(j) {
          return j;
        }).then(P, function(j) {
          u("failed to asynchronously prepare wasm: " + j), ee(j);
        });
      }
      var G = { a: Hl };
      if (H++, s.instantiateWasm)
        try {
          return s.instantiateWasm(G, w);
        } catch (P) {
          u("Module.instantiateWasm callback failed with error: " + P), f(P);
        }
      (typeof WebAssembly.instantiateStreaming != "function" || A() || typeof fetch != "function" ? I(x) : fetch(r, { credentials: "same-origin" }).then(function(P) {
        return WebAssembly.instantiateStreaming(P, G).then(x, function(j) {
          return u("wasm streaming compile failed: " + j), u("falling back to ArrayBuffer instantiation"), I(x);
        });
      })).catch(f);
    })();
    var qa = s.___getTypeName = function() {
      return (qa = s.___getTypeName = s.asm.F).apply(null, arguments);
    };
    function fi() {
      return (fi = s.asm.H).apply(null, arguments);
    }
    function Ht() {
      return (Ht = s.asm.J).apply(null, arguments);
    }
    function Ya() {
      0 < H || (O(T), 0 < H || n || (n = true, s.calledRun = true, p2 || (O(U), l(s), O(M))));
    }
    return s.__embind_initialize_bindings = function() {
      return (s.__embind_initialize_bindings = s.asm.G).apply(null, arguments);
    }, s.dynCall_jiji = function() {
      return (s.dynCall_jiji = s.asm.K).apply(null, arguments);
    }, q = function w() {
      n || Ya(), n || (q = w);
    }, Ya(), t.ready;
  };
})();
async function Pl(e) {
  let t = await YD({ instantiateWasm(r, n) {
    WebAssembly.instantiate(e, r).then((i) => {
      i instanceof WebAssembly.Instance ? n(i) : n(i.instance);
    });
  } });
  return Il(t);
}
var de;
var er = new Array(128).fill(void 0);
er.push(void 0, null, true, false);
var ln = er.length;
function Qt(e) {
  ln === er.length && er.push(er.length + 1);
  let t = ln;
  return ln = er[t], er[t] = e, t;
}
function Rt(e) {
  return er[e];
}
function ZD(e) {
  e < 132 || (er[e] = ln, ln = e);
}
function tr(e) {
  let t = Rt(e);
  return ZD(e), t;
}
var fn = 0;
var sn = null;
function ai() {
  return (sn === null || sn.byteLength === 0) && (sn = new Uint8Array(de.memory.buffer)), sn;
}
var oi = new TextEncoder("utf-8");
var JD = typeof oi.encodeInto == "function" ? function(e, t) {
  return oi.encodeInto(e, t);
} : function(e, t) {
  let r = oi.encode(e);
  return t.set(r), { read: e.length, written: r.length };
};
function ja(e, t, r) {
  if (r === void 0) {
    let u = oi.encode(e), s = t(u.length);
    return ai().subarray(s, s + u.length).set(u), fn = u.length, s;
  }
  let n = e.length, i = t(n), a = ai(), o = 0;
  for (; o < n; o++) {
    let u = e.charCodeAt(o);
    if (u > 127)
      break;
    a[i + o] = u;
  }
  if (o !== n) {
    o !== 0 && (e = e.slice(o)), i = r(i, n, n = o + e.length * 3);
    let u = ai().subarray(i + o, i + n), s = JD(e, u);
    o += s.written;
  }
  return fn = o, i;
}
function Rl(e) {
  return e == null;
}
var un = null;
function Je() {
  return (un === null || un.byteLength === 0) && (un = new Int32Array(de.memory.buffer)), un;
}
var Ul = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
Ul.decode();
function si(e, t) {
  return Ul.decode(ai().subarray(e, e + t));
}
function KD(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
var ui = class {
  static __wrap(e) {
    let t = Object.create(ui.prototype);
    return t.ptr = e, t;
  }
  __destroy_into_raw() {
    let e = this.ptr;
    return this.ptr = 0, e;
  }
  free() {
    let e = this.__destroy_into_raw();
    de.__wbg_bbox_free(e);
  }
  get x() {
    return de.__wbg_get_bbox_x(this.ptr);
  }
  set x(e) {
    de.__wbg_set_bbox_x(this.ptr, e);
  }
  get y() {
    return de.__wbg_get_bbox_y(this.ptr);
  }
  set y(e) {
    de.__wbg_set_bbox_y(this.ptr, e);
  }
  get width() {
    return de.__wbg_get_bbox_width(this.ptr);
  }
  set width(e) {
    de.__wbg_set_bbox_width(this.ptr, e);
  }
  get height() {
    return de.__wbg_get_bbox_height(this.ptr);
  }
  set height(e) {
    de.__wbg_set_bbox_height(this.ptr, e);
  }
};
var Bl = class {
  static __wrap(e) {
    let t = Object.create(Bl.prototype);
    return t.ptr = e, t;
  }
  __destroy_into_raw() {
    let e = this.ptr;
    return this.ptr = 0, e;
  }
  free() {
    let e = this.__destroy_into_raw();
    de.__wbg_renderedimage_free(e);
  }
  get width() {
    return de.renderedimage_width(this.ptr) >>> 0;
  }
  get height() {
    return de.renderedimage_height(this.ptr) >>> 0;
  }
  asPng() {
    try {
      let n = de.__wbindgen_add_to_stack_pointer(-16);
      de.renderedimage_asPng(n, this.ptr);
      var e = Je()[n / 4 + 0], t = Je()[n / 4 + 1], r = Je()[n / 4 + 2];
      if (r)
        throw tr(t);
      return tr(e);
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get pixels() {
    let e = de.renderedimage_pixels(this.ptr);
    return tr(e);
  }
};
var za = class {
  static __wrap(e) {
    let t = Object.create(za.prototype);
    return t.ptr = e, t;
  }
  __destroy_into_raw() {
    let e = this.ptr;
    return this.ptr = 0, e;
  }
  free() {
    let e = this.__destroy_into_raw();
    de.__wbg_resvg_free(e);
  }
  constructor(e, t) {
    try {
      let u = de.__wbindgen_add_to_stack_pointer(-16);
      var r = Rl(t) ? 0 : ja(t, de.__wbindgen_malloc, de.__wbindgen_realloc), n = fn;
      de.resvg_new(u, Qt(e), r, n);
      var i = Je()[u / 4 + 0], a = Je()[u / 4 + 1], o = Je()[u / 4 + 2];
      if (o)
        throw tr(a);
      return za.__wrap(i);
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get width() {
    return de.resvg_width(this.ptr);
  }
  get height() {
    return de.resvg_height(this.ptr);
  }
  render() {
    try {
      let n = de.__wbindgen_add_to_stack_pointer(-16);
      de.resvg_render(n, this.ptr);
      var e = Je()[n / 4 + 0], t = Je()[n / 4 + 1], r = Je()[n / 4 + 2];
      if (r)
        throw tr(t);
      return Bl.__wrap(e);
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
  toString() {
    try {
      let r = de.__wbindgen_add_to_stack_pointer(-16);
      de.resvg_toString(r, this.ptr);
      var e = Je()[r / 4 + 0], t = Je()[r / 4 + 1];
      return si(e, t);
    } finally {
      de.__wbindgen_add_to_stack_pointer(16), de.__wbindgen_free(e, t);
    }
  }
  innerBBox() {
    let e = de.resvg_innerBBox(this.ptr);
    return e === 0 ? void 0 : ui.__wrap(e);
  }
  getBBox() {
    let e = de.resvg_getBBox(this.ptr);
    return e === 0 ? void 0 : ui.__wrap(e);
  }
  cropByBBox(e) {
    KD(e, ui), de.resvg_cropByBBox(this.ptr, e.ptr);
  }
  imagesToResolve() {
    try {
      let n = de.__wbindgen_add_to_stack_pointer(-16);
      de.resvg_imagesToResolve(n, this.ptr);
      var e = Je()[n / 4 + 0], t = Je()[n / 4 + 1], r = Je()[n / 4 + 2];
      if (r)
        throw tr(t);
      return tr(e);
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
  resolveImage(e, t) {
    try {
      let i = de.__wbindgen_add_to_stack_pointer(-16), a = ja(e, de.__wbindgen_malloc, de.__wbindgen_realloc), o = fn;
      de.resvg_resolveImage(i, this.ptr, a, o, Qt(t));
      var r = Je()[i / 4 + 0], n = Je()[i / 4 + 1];
      if (n)
        throw tr(r);
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
async function QD(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (n) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    let r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    let r = await WebAssembly.instantiate(e, t);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
}
function ey() {
  let e = {};
  return e.wbg = {}, e.wbg.__wbg_new_15d3966e9981a196 = function(t, r) {
    let n = new Error(si(t, r));
    return Qt(n);
  }, e.wbg.__wbindgen_memory = function() {
    let t = de.memory;
    return Qt(t);
  }, e.wbg.__wbg_buffer_cf65c07de34b9a08 = function(t) {
    let r = Rt(t).buffer;
    return Qt(r);
  }, e.wbg.__wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5 = function(t, r, n) {
    let i = new Uint8Array(Rt(t), r >>> 0, n >>> 0);
    return Qt(i);
  }, e.wbg.__wbindgen_object_drop_ref = function(t) {
    tr(t);
  }, e.wbg.__wbg_new_537b7341ce90bb31 = function(t) {
    let r = new Uint8Array(Rt(t));
    return Qt(r);
  }, e.wbg.__wbg_instanceof_Uint8Array_01cebe79ca606cca = function(t) {
    let r;
    try {
      r = Rt(t) instanceof Uint8Array;
    } catch {
      r = false;
    }
    return r;
  }, e.wbg.__wbindgen_string_get = function(t, r) {
    let n = Rt(r), i = typeof n == "string" ? n : void 0;
    var a = Rl(i) ? 0 : ja(i, de.__wbindgen_malloc, de.__wbindgen_realloc), o = fn;
    Je()[t / 4 + 1] = o, Je()[t / 4 + 0] = a;
  }, e.wbg.__wbg_new_b525de17f44a8943 = function() {
    let t = new Array();
    return Qt(t);
  }, e.wbg.__wbindgen_string_new = function(t, r) {
    let n = si(t, r);
    return Qt(n);
  }, e.wbg.__wbg_push_49c286f04dd3bf59 = function(t, r) {
    return Rt(t).push(Rt(r));
  }, e.wbg.__wbg_length_27a2afe8ab42b09f = function(t) {
    return Rt(t).length;
  }, e.wbg.__wbg_set_17499e8aa4003ebd = function(t, r, n) {
    Rt(t).set(Rt(r), n >>> 0);
  }, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(si(t, r));
  }, e;
}
function ty(e, t) {
  return de = e.exports, Nl.__wbindgen_wasm_module = t, un = null, sn = null, de;
}
async function Nl(e) {
  typeof e > "u" && (e = new URL("index_bg.wasm", void 0));
  let t = ey();
  (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
  let { instance: r, module: n } = await QD(await e, t);
  return ty(r, n);
}
var ry = Nl;
var Va = false;
var Ml = async (e) => {
  if (Va)
    throw new Error("Already initialized. The `initWasm()` function can be used only once.");
  await ry(await e), Va = true;
};
var Gl = class extends za {
  constructor(e, t) {
    if (!Va)
      throw new Error("Wasm has not been initialized. Call `initWasm()` function.");
    super(e, JSON.stringify(t));
  }
};
var Wl = sy;
var ny = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var iy = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
var ay = /([A-Z\u00C0-\u00DC]{4,})/g;
var oy = /^[A-Z\u00C0-\u00DC]+$/;
function sy(e) {
  for (var t = e.split(ny), r = t.length, n = new Array(r), i = 0; i < r; i++) {
    var a = t[i];
    if (a !== "") {
      var o = iy.test(a) && !oy.test(a);
      o && (a = a.replace(ay, function(s, l, f) {
        return uy(s, a.length - f - s.length == 0);
      }));
      var u = a[0];
      u = i > 0 ? u.toUpperCase() : u.toLowerCase(), n[i] = u + (o ? a.slice(1) : a.slice(1).toLowerCase());
    }
  }
  return n.join("");
}
function uy(e, t) {
  var r = e.split(""), n = r.shift().toUpperCase(), i = t ? r.pop().toLowerCase() : r.pop();
  return n + r.join("").toLowerCase() + i;
}
var cn = (e) => e.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f").replace(/"/g, '\\"');
var $l = (e) => {
  let t = "", r = e.getAttribute("style");
  if (r) {
    let a = r.replace(/\n/g, "").replace(/\s\s+/g, " ").split(/;(?![^(]*\))/).reduce((o, u) => {
      let [s, l] = u.split(/:(.+)/);
      return s && l && (o += `"${Wl(s.trim())}": "${cn(l.trim())}",`), o;
    }, "");
    a.endsWith(",") && (a = a.slice(0, -1)), a && (t += `"style":{${a}},`);
  }
  let n = e.getAttribute("src");
  if (n) {
    let i = e.getAttribute("width"), a = e.getAttribute("height");
    i && a ? t += `"src":"${cn(n)}", "width":"${i}", "height":"${a}",` : (console.warn("Image missing width or height attribute as required by Satori"), t += `"src":"${cn(n)}",`);
  }
  return t;
};
var li = (e) => e.endsWith(",") ? e.slice(0, -1) : e;
async function jl(e) {
  let t = "";
  await new HTMLRewriter().on("*", { element(n) {
    let i = $l(n);
    t += `{"type":"${n.tagName}", "props":{${i}"children": [`;
    try {
      n.onEndTag(() => {
        t = li(t), t += "]}},";
      });
    } catch {
      t = li(t), t += "]}},";
    }
  }, text(n) {
    if (n.text) {
      let i = cn(n.text);
      i && (t += `"${i}",`);
    }
  } }).transform(new Response(`<div style="display: flex; flex-direction: column;">${e}</div>`)).text(), t = li(t);
  try {
    return JSON.parse(t);
  } catch (n) {
    return console.error(n), null;
  }
}
async function zl({ family: e, weight: t, text: r }) {
  let n = { family: `${encodeURIComponent(e)}${t ? `:wght@${t}` : ""}` };
  r ? n.text = r : n.subset = "latin";
  let i = `https://fonts.googleapis.com/css2?${Object.keys(n).map((f) => `${f}=${n[f]}`).join("&")}`, a = caches.default, o = i, u = await a.match(o);
  u || (u = await fetch(`${i}`, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" } }), u = new Response(u.body, u), u.headers.append("Cache-Control", "s-maxage=3600"), await a.put(o, u.clone()));
  let l = (await u.text()).match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!l)
    throw new Error("Could not find font URL");
  return fetch(l).then((f) => f.arrayBuffer());
}
var cy = async () => {
  try {
    await Ml(fy);
  } catch (e) {
    if (e instanceof Error && e.message.includes("Already initialized"))
      return;
    throw e;
  }
};
var py = async () => {
  try {
    let e = await Pl(ly);
    await ol(e);
  } catch (e) {
    throw e;
  }
};
var Vl = async ({ element: e, options: t }) => {
  await Promise.allSettled([cy(), py()]);
  let r = typeof e == "string" ? await jl(e) : e, n = t?.width || 1200, i = t?.height || 630, a = await Ll(r, { width: n, height: i, fonts: t?.fonts?.length ? t.fonts : [{ name: "Bitter", data: await zl({ family: "Bitter", weight: 600 }), weight: 500, style: "normal" }] });
  return (t?.format || "png") === "svg" ? a : new Gl(a, { fitTo: { mode: "width", value: n } }).render().asPng();
};
var Ha = class extends Response {
  constructor(t, r = {}) {
    if (super(), r.format === "svg")
      return (async () => {
        let n = await Vl({ element: t, options: r });
        return new Response(n, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": r.debug ? "no-cache, no-store" : "public, immutable, no-transform, max-age=31536000", ...r.headers }, status: r.status || 200, statusText: r.statusText });
      })();
    {
      let n = new ReadableStream({ async start(i) {
        let a = await Vl({ element: t, options: r });
        i.enqueue(a), i.close();
      } });
      return new Response(n, { headers: { "Content-Type": "image/png", "Cache-Control": r.debug ? "no-cache, no-store" : "public, immutable, no-transform, max-age=31536000", ...r.headers }, status: r.status || 200, statusText: r.statusText });
    }
  }
};

// node_modules/hono-og/lib/utils.js
init_checked_fetch();
init_modules_watch_stub();
function toReactNode(jsx_) {
  const jsx2 = jsx_;
  if (Array.isArray(jsx2))
    return jsx2.map((child) => toReactNode(child));
  if (typeof jsx2 === "string")
    return jsx2;
  if (typeof jsx2 === "number")
    return jsx2;
  if (typeof jsx2.tag === "function") {
    const node = jsx2.tag({ ...jsx2.props, children: jsx2.children });
    if (!node.tag)
      return toReactNode(jsx2.children);
    return toReactNode(node);
  }
  const { tag, props } = jsx2;
  const children = jsx2.children?.map((child) => toReactNode(child));
  return {
    type: tag,
    key: null,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children
    }
  };
}

// node_modules/hono-og/lib/worker.js
var ImageResponse = class extends Ha {
  constructor(element, options) {
    super(toReactNode(element), options);
  }
};

// node_modules/hono/dist/types.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/frog-base.js
var import_path_browserify = __toESM(require_path_browserify(), 1);

// node_modules/frog/_lib/utils/fromQuery.js
init_checked_fetch();
init_modules_watch_stub();
function fromQuery(query) {
  const obj = {};
  for (const [key, value] of Object.entries(query)) {
    let decoded = decodeURIComponent(value);
    if (decoded.startsWith("#A_"))
      decoded = decoded.replace("#A_", "").split(",");
    else if (decoded.startsWith("#O_"))
      decoded = JSON.parse(decoded.replace("#O_", ""));
    obj[key.replace(/^amp;/, "")] = decoded;
  }
  return obj;
}

// node_modules/frog/_lib/utils/getButtonValues.js
init_checked_fetch();
init_modules_watch_stub();
function getButtonValues(intents) {
  if (!intents)
    return [];
  const buttonValues = [];
  for (const intent of intents) {
    if (!intent)
      continue;
    const { property } = intent.props;
    if (!property.match(/^fc:frame:button:(1|2|3|4)$/))
      continue;
    buttonValues.push(intent.props["data-value"]);
  }
  return buttonValues;
}

// node_modules/frog/_lib/utils/getFrameContext.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/immer/dist/immer.mjs
init_checked_fetch();
init_modules_watch_stub();
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
var errors = true ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function die(error, ...args) {
  if (true) {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0) {
    Object.entries(obj).forEach(([key, value]) => {
      iter(key, value, obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  if (!strict && isPlainObject(base)) {
    if (!getPrototypeOf(base)) {
      const obj = /* @__PURE__ */ Object.create(null);
      return Object.assign(obj, base);
    }
    return { ...base };
  }
  const descriptors = Object.getOwnPropertyDescriptors(base);
  delete descriptors[DRAFT_STATE];
  let keys = Reflect.ownKeys(descriptors);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const desc = descriptors[key];
    if (desc.writable === false) {
      desc.writable = true;
      desc.configurable = true;
    }
    if (desc.get || desc.set)
      descriptors[key] = {
        configurable: true,
        writable: true,
        // could live with !!desc.set as well here...
        enumerable: desc.enumerable,
        value: base[key]
      };
  }
  return Object.create(getPrototypeOf(base), descriptors);
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    each(obj, (_key, value) => freeze(value, true), true);
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
      true
      // See #590, don't recurse into non-enumerable of non drafted objects
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if (!parentState || !parentState.scope_.parent_)
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn2) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn2.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if (isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self2 = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self2.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p2 = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p2, ip);
          patchListener(p2, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p2, ip) => {
        patches = p2;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = immer.produceWithPatches.bind(
  immer
);
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);
var applyPatches = immer.applyPatches.bind(immer);
var createDraft = immer.createDraft.bind(immer);
var finishDraft = immer.finishDraft.bind(immer);

// node_modules/frog/_lib/utils/getIntentState.js
init_checked_fetch();
init_modules_watch_stub();
function getIntentState({ buttonValues, frameData }) {
  const { buttonIndex, inputText } = frameData || {};
  const state = {
    buttonValue: void 0,
    inputText,
    redirect: false,
    reset: false
  };
  if (!buttonValues)
    return state;
  if (buttonIndex) {
    const buttonIntents = buttonValues;
    const intent = buttonIntents[buttonIndex - 1];
    if (!intent)
      return state;
    if (intent.startsWith("_c"))
      state.reset = true;
    else if (intent.startsWith("_r")) {
      state.redirect = true;
      state.buttonValue = intent.slice(3);
    } else
      state.buttonValue = intent;
  }
  return state;
}

// node_modules/frog/_lib/utils/parsePath.js
init_checked_fetch();
init_modules_watch_stub();
function parsePath(path_) {
  let path = path_.split("?")[0];
  if (path.endsWith("/"))
    path = path.slice(0, -1);
  return path;
}

// node_modules/frog/_lib/utils/getFrameContext.js
async function getFrameContext(options) {
  const { context, req } = options;
  const { frameData, initialPath, previousButtonValues, verified } = context || {};
  const { buttonValue, inputText, redirect, reset } = getIntentState({
    buttonValues: previousButtonValues || [],
    frameData
  });
  const status = (() => {
    if (redirect)
      return "redirect";
    if (reset)
      return "initial";
    return context.status || "initial";
  })();
  const url = (reset ? `${new URL(req.url).origin}${initialPath}` : void 0) || parsePath(context.url);
  let previousState = (() => {
    if (context.status === "initial")
      return options.initialState;
    return context?.previousState || options.initialState;
  })();
  function deriveState(derive) {
    if (status === "response" && derive)
      previousState = produce(previousState, derive);
    return previousState;
  }
  return {
    buttonIndex: frameData?.buttonIndex,
    buttonValue,
    frameData,
    initialPath,
    inputText,
    deriveState,
    previousButtonValues,
    previousState,
    req,
    res: (data) => data,
    status,
    url,
    verified
  };
}

// node_modules/frog/_lib/utils/jws.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwe/compact/decrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwe/flattened/decrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/base64url.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/buffer_utils.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/digest.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/webcrypto.js
init_checked_fetch();
init_modules_watch_stub();
var webcrypto_default = crypto;
var isCryptoKey = (key) => key instanceof CryptoKey;

// node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}

// node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = (input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
};
var encode = (input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var decodeBase64 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};
var decode = (input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};

// node_modules/jose/dist/browser/runtime/decrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/check_iv_length.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/util/errors.js
init_checked_fetch();
init_modules_watch_stub();
var JOSEError = class extends Error {
  static get code() {
    return "ERR_JOSE_GENERIC";
  }
  constructor(message2) {
    super(message2);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
  static get code() {
    return "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
  static get code() {
    return "ERR_JOSE_NOT_SUPPORTED";
  }
};
var JWSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
  static get code() {
    return "ERR_JWS_INVALID";
  }
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    this.message = "signature verification failed";
  }
  static get code() {
    return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};

// node_modules/jose/dist/browser/lib/iv.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/random.js
init_checked_fetch();
init_modules_watch_stub();
var random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);

// node_modules/jose/dist/browser/runtime/check_cek_length.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/timing_safe_equal.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/crypto_key.js
init_checked_fetch();
init_modules_watch_stub();
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}

// node_modules/jose/dist/browser/lib/invalid_key_input.js
init_checked_fetch();
init_modules_watch_stub();
function message(msg, actual, ...types2) {
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
};
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}

// node_modules/jose/dist/browser/runtime/is_key_like.js
init_checked_fetch();
init_modules_watch_stub();
var is_key_like_default = (key) => {
  return isCryptoKey(key);
};
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/lib/is_disjoint.js
init_checked_fetch();
init_modules_watch_stub();
var isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
var is_disjoint_default = isDisjoint;

// node_modules/jose/dist/browser/lib/is_object.js
init_checked_fetch();
init_modules_watch_stub();
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}

// node_modules/jose/dist/browser/lib/decrypt_key_management.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/aeskw.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/bogus.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/ecdhes.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/pbes2kw.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/check_p2s.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/rsaes.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/subtle_rsaes.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/check_key_length.js
init_checked_fetch();
init_modules_watch_stub();
var check_key_length_default = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};

// node_modules/jose/dist/browser/lib/cek.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/key/import.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/asn1.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/format_pem.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/jwk_to_key.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/check_key_type.js
init_checked_fetch();
init_modules_watch_stub();
var symmetricTypeCheck = (alg, key) => {
  if (key instanceof Uint8Array)
    return;
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${types.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
  }
};
var asymmetricTypeCheck = (alg, key, usage) => {
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types));
  }
  if (key.type === "secret") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
var checkKeyType = (alg, key, usage) => {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key);
  } else {
    asymmetricTypeCheck(alg, key, usage);
  }
};
var check_key_type_default = checkKeyType;

// node_modules/jose/dist/browser/lib/aesgcmkw.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/encrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/validate_crit.js
init_checked_fetch();
init_modules_watch_stub();
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
var validate_crit_default = validateCrit;

// node_modules/jose/dist/browser/lib/validate_algorithms.js
init_checked_fetch();
init_modules_watch_stub();
var validateAlgorithms = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};
var validate_algorithms_default = validateAlgorithms;

// node_modules/jose/dist/browser/jwe/general/decrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwe/general/encrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwe/flattened/encrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/encrypt_key_management.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/key/export.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/key_to_jwk.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var unprotected = Symbol();

// node_modules/jose/dist/browser/jws/compact/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jws/flattened/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
init_checked_fetch();
init_modules_watch_stub();
function subtleDsa(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
init_checked_fetch();
init_modules_watch_stub();
function getCryptoKey(alg, key, usage) {
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
}

// node_modules/jose/dist/browser/runtime/verify.js
var verify = async (alg, key, signature, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "verify");
  check_key_length_default(alg, cryptoKey);
  const algorithm = subtleDsa(alg, cryptoKey.algorithm);
  try {
    return await webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
};
var verify_default = verify;

// node_modules/jose/dist/browser/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
  }
  check_key_type_default(alg, key, "verify");
  const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  let signature;
  try {
    signature = decode(jws.signature);
  } catch {
    throw new JWSInvalid("Failed to base64url decode the signature");
  }
  const verified = await verify_default(alg, key, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    try {
      payload = decode(jws.payload);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the payload");
    }
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key };
  }
  return result;
}

// node_modules/jose/dist/browser/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}

// node_modules/jose/dist/browser/jws/general/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwt/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/epoch.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/secs.js
init_checked_fetch();
init_modules_watch_stub();
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;

// node_modules/jose/dist/browser/jwt/decrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwe/compact/encrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jws/compact/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jws/flattened/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/sign.js
init_checked_fetch();
init_modules_watch_stub();
var sign = async (alg, key, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "sign");
  check_key_length_default(alg, cryptoKey);
  const signature = await webcrypto_default.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
  return new Uint8Array(signature);
};
var sign_default = sign;

// node_modules/jose/dist/browser/jws/flattened/sign.js
var FlattenedSign = class {
  constructor(payload) {
    if (!(payload instanceof Uint8Array)) {
      throw new TypeError("payload must be an instance of Uint8Array");
    }
    this._payload = payload;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  async sign(key, options) {
    if (!this._protectedHeader && !this._unprotectedHeader) {
      throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    }
    if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...this._protectedHeader,
      ...this._unprotectedHeader
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this._protectedHeader, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = this._protectedHeader.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    check_key_type_default(alg, key, "sign");
    let payload = this._payload;
    if (b64) {
      payload = encoder.encode(encode(payload));
    }
    let protectedHeader;
    if (this._protectedHeader) {
      protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
    } else {
      protectedHeader = encoder.encode("");
    }
    const data = concat(protectedHeader, encoder.encode("."), payload);
    const signature = await sign_default(alg, key, data);
    const jws = {
      signature: encode(signature),
      payload: ""
    };
    if (b64) {
      jws.payload = decoder.decode(payload);
    }
    if (this._unprotectedHeader) {
      jws.header = this._unprotectedHeader;
    }
    if (this._protectedHeader) {
      jws.protected = decoder.decode(protectedHeader);
    }
    return jws;
  }
};

// node_modules/jose/dist/browser/jws/compact/sign.js
var CompactSign = class {
  constructor(payload) {
    this._flattened = new FlattenedSign(payload);
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  async sign(key, options) {
    const jws = await this._flattened.sign(key, options);
    if (jws.payload === void 0) {
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    }
    return `${jws.protected}.${jws.payload}.${jws.signature}`;
  }
};

// node_modules/jose/dist/browser/jws/general/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwt/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwt/produce.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwt/encrypt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwk/thumbprint.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwk/embedded.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwks/local.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwks/remote.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/fetch_jwks.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwks/remote.js
var USER_AGENT;
if (typeof navigator === "undefined" || !"Cloudflare-Workers"?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "jose";
  const VERSION = "v5.2.2";
  USER_AGENT = `${NAME}/${VERSION}`;
}

// node_modules/jose/dist/browser/jwt/unsecured.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/util/decode_protected_header.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/util/base64url.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/util/decode_jwt.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/key/generate_key_pair.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/generate.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/key/generate_secret.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/util/runtime.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/runtime.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/utils/jws.js
var decoder2 = new TextDecoder();
var encoder2 = new TextEncoder();
async function verify2(signature, secret) {
  const { payload } = await compactVerify(signature, encoder2.encode(secret));
  return decoder2.decode(payload);
}
async function sign2(message2, secret) {
  return new CompactSign(encoder2.encode(message2)).setProtectedHeader({ alg: "HS256" }).sign(encoder2.encode(secret));
}

// node_modules/frog/_lib/utils/parseBrowserLocation.js
init_checked_fetch();
init_modules_watch_stub();
function parseBrowserLocation(c, location_, path) {
  let location = location_ || "";
  if (location?.includes(":path") && !path.includes(":path"))
    location = location.replace(":path", path.replace(/(^\/)|(\/$)/, ""));
  else if (location?.includes(":"))
    for (const [key, value] of Object.entries(c.req.param()))
      location = location.replace(`:${key}`, value);
  location = location.replace(/^\/\//, "/");
  return location;
}

// node_modules/frog/_lib/utils/parseIntents.js
init_checked_fetch();
init_modules_watch_stub();
function parseIntents(intents_, options = {}, counter = { button: 1 }) {
  if (!intents_)
    return [];
  const nodes = intents_;
  const intents = (() => {
    if (Array.isArray(nodes))
      return nodes.map((e) => parseIntent(e, options, counter));
    if (typeof nodes.children[0] === "object")
      return Object.assign(nodes, {
        children: nodes.children.map((e) => parseIntent(e, options, counter))
      });
    return parseIntent(nodes, options, counter);
  })();
  return (Array.isArray(intents) ? intents : [intents]).flat();
}
function parseIntent(node_, options, counter) {
  const node = !node_ ? { children: [], props: {}, tag() {
  } } : node_;
  const props = (() => {
    if (node.tag.__type === "button")
      return {
        ...node.props,
        action: node.props.action ? parsePath(options.baseUrl + node.props.action) + (options.search ? `?${options.search}` : "") : void 0,
        children: node.children,
        index: counter.button++
      };
    if (node.tag.__type === "text-input")
      return { ...node.props, children: node.children };
    return {};
  })();
  const intent = typeof node.tag === "function" ? node.tag(props) : node;
  if (intent?.tag === "" && Object.keys(intent.props).length === 0)
    throw new InvalidIntentComponentError();
  if (typeof intent?.tag === "function" && typeof node.tag === "function") {
    if (intent.children.length > 1)
      throw new InvalidIntentComponentError();
    return parseIntent(node.tag(node.props), options, counter);
  }
  return intent;
}
var InvalidIntentComponentError = class extends Error {
  constructor() {
    super([
      "Intent components must return a single intent element.",
      "",
      "Example:",
      "",
      "```",
      "import { Button } from 'frog'",
      "",
      "function CustomIntent() {",
      "  return <Button>Foo</Button>",
      "}",
      "```"
    ].join("\n"));
  }
};

// node_modules/frog/_lib/utils/requestToContext.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/frog/_lib/utils/deserializeJson.js
init_checked_fetch();
init_modules_watch_stub();
function deserializeJson(data = "{}") {
  if (data === "undefined")
    return {};
  return JSON.parse(decodeURIComponent(data));
}

// node_modules/frog/_lib/utils/verifyFrame.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@noble/curves/esm/abstract/utils.js
init_checked_fetch();
init_modules_watch_stub();
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
  if (char >= asciis._0 && char <= asciis._9)
    return char - asciis._0;
  if (char >= asciis._A && char <= asciis._F)
    return char - (asciis._A - 10);
  if (char >= asciis._a && char <= asciis._f)
    return char - (asciis._a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl2 = hex.length;
  const al2 = hl2 / 2;
  if (hl2 % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + hl2);
  const array = new Uint8Array(al2);
  for (let ai2 = 0, hi = 0; ai2 < al2; ai2++, hi += 2) {
    const n12 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n12 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai2] = n12 * 16 + n2;
  }
  return array;
}

// node_modules/frog/_lib/utils/verifyFrame.js
async function verifyFrame({ fetchOptions, frameUrl, hubApiUrl, trustedData, url }) {
  const body = hexToBytes(trustedData.messageBytes);
  const response = await fetch(`${hubApiUrl}/v1/validateMessage`, {
    ...fetchOptions,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      ...fetchOptions?.headers
    },
    body
  }).then((res) => res.json());
  if (!response.valid)
    throw new Error(`message is invalid. ${response.details}`);
  if (!parsePath(frameUrl)?.startsWith(parsePath(url)))
    throw new Error(`Invalid frame url: ${frameUrl}. Expected: ${url}.`);
}

// node_modules/frog/_lib/utils/requestToContext.js
async function requestToContext(req, { hubApiUrl, secret, verify: verify3 = true }) {
  const { trustedData, untrustedData } = await req.json().catch(() => {
  }) || {};
  const { initialPath, previousState, previousButtonValues } = await (async () => {
    if (untrustedData?.state) {
      const state = deserializeJson(untrustedData.state);
      if (secret && state.previousState)
        state.previousState = JSON.parse(await verify2(state.previousState, secret));
      return state;
    }
    if (req.query())
      return fromQuery(req.query());
    return {};
  })();
  const verified = await (async () => {
    if (verify3 === false)
      return false;
    if (!trustedData)
      return false;
    if (!hubApiUrl)
      return false;
    try {
      await verifyFrame({
        hubApiUrl,
        frameUrl: untrustedData.url,
        trustedData,
        url: req.url
      });
      return true;
    } catch (err) {
      if (verify3 === "silent")
        return false;
      throw err;
    }
  })();
  return {
    initialPath: initialPath ? initialPath : new URL(req.url).pathname,
    previousState,
    previousButtonValues,
    frameData: untrustedData,
    status: req.method === "POST" ? "response" : "initial",
    url: req.url,
    verified
  };
}

// node_modules/frog/_lib/utils/serializeJson.js
init_checked_fetch();
init_modules_watch_stub();
function serializeJson(data = {}) {
  return encodeURIComponent(JSON.stringify(data));
}

// node_modules/frog/_lib/utils/toSearchParams.js
init_checked_fetch();
init_modules_watch_stub();
function toSearchParams(object) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(object)) {
    const encoded = (() => {
      if (typeof value === "string")
        return encodeURIComponent(value);
      if (typeof value === "number")
        return value.toString();
      if (typeof value === "boolean")
        return value.toString();
      if (typeof value === "object" && value !== null) {
        return encodeURIComponent(Array.isArray(value) ? `#A_${value.join(",")}` : `#O_${JSON.stringify(value)}`);
      }
      return void 0;
    })();
    if (encoded)
      params.set(key, encoded);
  }
  return params;
}

// node_modules/frog/_lib/version.js
init_checked_fetch();
init_modules_watch_stub();
var version = "0.2.2";

// node_modules/frog/_lib/frog-base.js
var FrogBase = class {
  constructor({ assetsPath, basePath, browserLocation, dev, headers, honoOptions, hubApiUrl, imageOptions, initialState, secret, verify: verify3 } = {}) {
    Object.defineProperty(this, "_imageOptions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_initialState", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "assetsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "basePath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "browserLocation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "dev", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "hono", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "hubApiUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "fetch", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "get", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "post", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "use", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "secret", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "verify", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    this.hono = new Hono2(honoOptions);
    if (basePath)
      this.hono = this.hono.basePath(basePath);
    if (browserLocation)
      this.browserLocation = browserLocation;
    if (headers)
      this.headers = headers;
    if (dev)
      this.dev = { enabled: true, ...dev ?? {} };
    if (hubApiUrl)
      this.hubApiUrl = hubApiUrl;
    if (imageOptions)
      this._imageOptions = imageOptions;
    if (secret)
      this.secret = secret;
    if (typeof verify3 !== "undefined")
      this.verify = verify3;
    this.basePath = basePath ?? "/";
    this.assetsPath = assetsPath ?? this.basePath;
    this.fetch = this.hono.fetch.bind(this.hono);
    this.get = this.hono.get.bind(this.hono);
    this.post = this.hono.post.bind(this.hono);
    this.use = this.hono.use.bind(this.hono);
    if (initialState)
      this._initialState = initialState;
  }
  frame(path, handler, options = {}) {
    const { verify: verify3 = this.verify } = options;
    this.hono.use(parsePath(path), async (c) => {
      const url = new URL(c.req.url);
      const assetsUrl = url.origin + parsePath(this.assetsPath);
      const baseUrl = url.origin + parsePath(this.basePath);
      const context = await getFrameContext({
        context: await requestToContext(c.req, {
          hubApiUrl: this.hubApiUrl,
          secret: this.secret,
          verify: verify3
        }),
        initialState: this._initialState,
        req: c.req
      });
      if (context.status === "redirect") {
        const location = context.buttonValue;
        if (!location)
          throw new Error("location required to redirect");
        return c.redirect(location, 302);
      }
      if (context.url !== parsePath(c.req.url))
        return c.redirect(context.url);
      const { action, browserLocation = this.browserLocation, headers = this.headers, imageAspectRatio, image, intents, title = "Frog Frame" } = await handler(context);
      const buttonValues = getButtonValues(parseIntents(intents));
      const browser = detect(c.req.header("user-agent"));
      const browserLocation_ = parseBrowserLocation(c, browserLocation, path);
      if (browser?.name && browserLocation_)
        return c.redirect(browserLocation_.startsWith("http") ? browserLocation_ : `${url.origin + import_path_browserify.default.resolve(this.basePath, browserLocation_)}`, 302);
      const baseContext = {
        ...context,
        // We can't serialize `request` (aka `c.req`), so we'll just set it to undefined.
        request: void 0
      };
      const frameImageParams = toSearchParams(baseContext);
      const previousState = await (async () => {
        const state = context.deriveState();
        if (!this.secret)
          return state;
        if (!state)
          return state;
        return sign2(JSON.stringify(state), this.secret);
      })();
      const nextFrameStateSearch = toSearchParams({
        initialPath: context.initialPath,
        previousButtonValues: buttonValues
      });
      const nextFrameStateMeta = serializeJson({
        initialPath: context.initialPath,
        previousButtonValues: buttonValues,
        previousState
      });
      const imageUrl = (() => {
        if (typeof image !== "string")
          return `${parsePath(context.url)}/image?${frameImageParams.toString()}`;
        if (image.startsWith("http"))
          return image;
        return `${assetsUrl + parsePath(image)}`;
      })();
      const postUrl = (() => {
        if (!action)
          return context.url;
        if (action.startsWith("http"))
          return action;
        return baseUrl + parsePath(action);
      })();
      const parsedIntents = parseIntents(intents, {
        baseUrl,
        search: context.status === "initial" ? nextFrameStateSearch.toString() : void 0
      });
      for (const [key, value] of Object.entries(headers ?? {}))
        c.header(key, value);
      const isDevEnabled = (
        // check if devtools are enabled on constructor.
        (this.dev?.enabled ?? true) && // check if route has `/dev` path.
        this.hono.routes.some((r) => {
          if (!r.path.startsWith(this.basePath + parsePath(path)))
            return false;
          if (!r.path.includes("/dev"))
            return false;
          return true;
        })
      );
      const body = isDevEnabled ? jsxDEV2("body", { style: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        overflow: "hidden"
      }, children: jsxDEV2("a", { style: { textDecoration: "none" }, href: `${context.url}/dev`, children: "open \u{1D487}\u{1D493}\u{1D482}\u{1D48E}\u{1D486} devtools" }) }) : jsxDEV2("body", {});
      return c.render(jsxDEV2("html", { lang: "en", children: [jsxDEV2("head", { children: [jsxDEV2("meta", { property: "fc:frame", content: "vNext" }), jsxDEV2("meta", { property: "fc:frame:image:aspect_ratio", content: imageAspectRatio ?? "1.91:1" }), jsxDEV2("meta", { property: "fc:frame:image", content: imageUrl }), jsxDEV2("meta", { property: "og:image", content: imageUrl }), jsxDEV2("meta", { property: "og:title", content: title }), jsxDEV2("meta", { property: "fc:frame:post_url", content: context.status === "initial" ? `${postUrl}?${nextFrameStateSearch.toString()}` : postUrl }), context.status !== "initial" && jsxDEV2("meta", { property: "fc:frame:state", content: nextFrameStateMeta }), parsedIntents, isDevEnabled && jsxDEV2("meta", { property: "frog:context", content: serializeJson(baseContext) }), jsxDEV2("meta", { property: "frog:version", content: version })] }), body] }));
    });
    this.hono.get(`${parsePath(path)}/image`, async (c) => {
      const query = c.req.query();
      const context = await getFrameContext({
        context: fromQuery(query),
        initialState: this._initialState,
        req: c.req
      });
      const { image, headers = this.headers, imageOptions = this._imageOptions } = await handler(context);
      if (typeof image === "string")
        return c.redirect(image, 302);
      return new ImageResponse(image, {
        ...imageOptions,
        headers: imageOptions?.headers ?? headers
      });
    });
  }
  route(path, frog) {
    return this.hono.route(path, frog.hono);
  }
};

// src/index.tsx
var app = new FrogBase({
  // Supply a Hub API URL to enable frame verification.
  hubApiUrl: "https://api.hub.wevm.dev"
});
app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    image: /* @__PURE__ */ jsxDEV2(
      "div",
      {
        style: {
          alignItems: "center",
          background: status === "response" ? "linear-gradient(to right, #432889, #17101F)" : "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%"
        },
        children: /* @__PURE__ */ jsxDEV2(
          "div",
          {
            style: {
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              padding: "0 120px",
              whiteSpace: "pre-wrap"
            },
            children: status === "response" ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ""}` : "Welcome!"
          }
        )
      }
    ),
    intents: [
      /* @__PURE__ */ jsxDEV2(TextInput, { placeholder: "Enter custom fruit..." }),
      /* @__PURE__ */ jsxDEV2(Button, { value: "apples", children: "Apples" }),
      /* @__PURE__ */ jsxDEV2(Button, { value: "oranges", children: "Oranges" }),
      /* @__PURE__ */ jsxDEV2(Button, { value: "bananas", children: "Bananas" }),
      status === "response" && /* @__PURE__ */ jsxDEV2(Button.Reset, { children: "Reset" })
    ]
  });
});
var src_default = app;

// ../../../../.nvm/versions/node/v18.19.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../.nvm/versions/node/v18.19.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap3 = void 0;

// .wrangler/tmp/bundle-G22Miv/middleware-insertion-facade.js
var envWrappers = [void 0, wrap3].filter(Boolean);
var facade = {
  ...src_default,
  envWrappers,
  middleware: [
    middleware_ensure_req_body_drained_default,
    middleware_miniflare3_json_error_default,
    ...src_default.middleware ? src_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// ../../../../.nvm/versions/node/v18.19.0/lib/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-G22Miv/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  app,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

workers-og/dist/index.js:
  (*! Bundled license information:
  
  css-background-parser/index.js:
    (*!
     * https://github.com/gilmoreorless/css-background-parser
     * Copyright © 2015 Gilmore Davidson under the MIT license: http://gilmoreorless.mit-license.org/
     *)
  
  parse-css-color/dist/index.umd.js:
    (**
    	 * parse-css-color
    	 * @version v0.2.1
    	 * @link http://github.com/noeldelgado/parse-css-color/
    	 * @license MIT
    	 *)
  
  escape-html/index.js:
    (*!
     * escape-html
     * Copyright(c) 2012-2013 TJ Holowaychuk
     * Copyright(c) 2015 Andreas Lubbe
     * Copyright(c) 2015 Tiancheng "Timothy" Gu
     * MIT Licensed
     *)
  *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.js.map
