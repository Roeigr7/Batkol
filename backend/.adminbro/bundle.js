(function (React, adminBro, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _extends() {
    _extends = Object.assign || function (target) {
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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Edit = function Edit(_ref) {
    var property = _ref.property,
        record = _ref.record,
        onChange = _ref.onChange;
    var params = record.params;
    var _ref2 = property,
        custom = _ref2.custom;
    var path = adminBro.flat.get(params, custom.filePathProperty);
    var key = adminBro.flat.get(params, custom.keyProperty);
    var file = adminBro.flat.get(params, custom.fileProperty);

    var _useState = React.useState(key),
        _useState2 = _slicedToArray(_useState, 2),
        originalKey = _useState2[0],
        setOriginalKey = _useState2[1];

    var _useState3 = React.useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        filesToUpload = _useState4[0],
        setFilesToUpload = _useState4[1];

    React.useEffect(function () {
      // it means means that someone hit save and new file has been uploaded
      // in this case fliesToUpload should be cleared.
      // This happens when user turns off redirect after new/edit
      if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
        setOriginalKey(key);
        setFilesToUpload([]);
      }
    }, [key, originalKey]);

    var onUpload = function onUpload(files) {
      setFilesToUpload(files);
      onChange(custom.fileProperty, files);
    };

    var handleRemove = function handleRemove() {
      onChange(custom.fileProperty, null);
    };

    var handleMultiRemove = function handleMultiRemove(singleKey) {
      var index = (adminBro.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
      var filesToDelete = adminBro.flat.get(record.params, custom.filesToDeleteProperty) || [];

      if (path && path.length > 0) {
        var newPath = path.map(function (currentPath, i) {
          return i !== index ? currentPath : null;
        });
        var newParams = adminBro.flat.set(record.params, custom.filesToDeleteProperty, [].concat(_toConsumableArray(filesToDelete), [index]));
        newParams = adminBro.flat.set(newParams, custom.filePathProperty, newPath);
        onChange(_objectSpread2(_objectSpread2({}, record), {}, {
          params: newParams
        }));
      } else {
        // eslint-disable-next-line no-console
        console.log('You cannot remove file when there are no uploaded files yet');
      }
    };

    return /*#__PURE__*/React__default['default'].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default['default'].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default['default'].createElement(designSystem.DropZone, {
      onChange: onUpload,
      multiple: custom.multiple,
      validate: {
        mimeTypes: custom.mimeTypes,
        maxSize: custom.maxSize
      },
      files: filesToUpload
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && /*#__PURE__*/React__default['default'].createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    }), custom.multiple && key && key.length && path ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, key.map(function (singleKey, index) {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      var currentPath = path[index];
      return currentPath ? /*#__PURE__*/React__default['default'].createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: function onRemove() {
          return handleMultiRemove(singleKey);
        }
      }) : '';
    })) : '');
  };

  var AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
  var ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

  var SingleFile = function SingleFile(props) {
    var name = props.name,
        path = props.path,
        mimeType = props.mimeType,
        width = props.width;

    if (path && path.length) {
      if (mimeType && ImageMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default['default'].createElement("img", {
          src: path,
          style: {
            maxHeight: width,
            maxWidth: width
          },
          alt: name
        });
      }

      if (mimeType && AudioMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default['default'].createElement("audio", {
          controls: true,
          src: path
        }, "Your browser does not support the", /*#__PURE__*/React__default['default'].createElement("code", null, "audio"), /*#__PURE__*/React__default['default'].createElement("track", {
          kind: "captions"
        }));
      }
    }

    return /*#__PURE__*/React__default['default'].createElement(designSystem.Box, null, /*#__PURE__*/React__default['default'].createElement(designSystem.Button, {
      as: "a",
      href: path,
      ml: "default",
      size: "sm",
      rounded: true,
      target: "_blank"
    }, /*#__PURE__*/React__default['default'].createElement(designSystem.Icon, {
      icon: "DocumentDownload",
      color: "white",
      mr: "default"
    }), name));
  };

  var File = function File(_ref) {
    var width = _ref.width,
        record = _ref.record,
        property = _ref.property;
    var _ref2 = property,
        custom = _ref2.custom;
    var path = adminBro.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.filePathProperty);

    if (!path) {
      return null;
    }

    var name = adminBro.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
    var mimeType = custom.mimeTypeProperty && adminBro.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.mimeTypeProperty);

    if (!property.custom.multiple) {
      return /*#__PURE__*/React__default['default'].createElement(SingleFile, {
        path: path,
        name: name,
        width: width,
        mimeType: mimeType
      });
    }

    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, path.map(function (singlePath, index) {
      return /*#__PURE__*/React__default['default'].createElement(SingleFile, {
        key: singlePath,
        path: singlePath,
        name: name[index],
        width: width,
        mimeType: mimeType[index]
      });
    }));
  };

  var List = function List(props) {
    return /*#__PURE__*/React__default['default'].createElement(File, _extends({
      width: 100
    }, props));
  };

  var Show = function Show(props) {
    var property = props.property;
    return /*#__PURE__*/React__default['default'].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default['default'].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default['default'].createElement(File, _extends({
      width: "100%"
    }, props)));
  };

  AdminBro.UserComponents = {};
  AdminBro.UserComponents.Component1 = Edit;
  AdminBro.UserComponents.Component2 = List;
  AdminBro.UserComponents.Component3 = Show;

}(React, AdminBro, AdminBroDesignSystem));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluLWJyby91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluLWJyby91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL3R5cGVzL21pbWUtdHlwZXMudHlwZS50cyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW4tYnJvL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW4tYnJvL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9saXN0LnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW4tYnJvL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9zaG93LnRzeCIsIi5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVkaXRQcm9wZXJ0eVByb3BzLCBmbGF0IH0gZnJvbSAnYWRtaW4tYnJvJ1xuaW1wb3J0IHsgRHJvcFpvbmUsIEZvcm1Hcm91cCwgTGFiZWwsIERyb3Bab25lSXRlbSB9IGZyb20gJ0BhZG1pbi1icm8vZGVzaWduLXN5c3RlbSdcbmltcG9ydCBQcm9wZXJ0eUN1c3RvbSBmcm9tICcuLi90eXBlcy9wcm9wZXJ0eS1jdXN0b20udHlwZSdcblxuY29uc3QgRWRpdDogRkM8RWRpdFByb3BlcnR5UHJvcHM+ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkXG4gIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eSBhcyB1bmtub3duIGFzIHsgY3VzdG9tOiBQcm9wZXJ0eUN1c3RvbSB9XG5cbiAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpXG4gIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KVxuICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KVxuXG4gIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KVxuICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZTxBcnJheTxGaWxlPj4oW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBpdCBtZWFucyBtZWFucyB0aGF0IHNvbWVvbmUgaGl0IHNhdmUgYW5kIG5ldyBmaWxlIGhhcyBiZWVuIHVwbG9hZGVkXG4gICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICBpZiAoXG4gICAgICAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHNldE9yaWdpbmFsS2V5KGtleSlcbiAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pXG4gICAgfVxuICB9LCBba2V5LCBvcmlnaW5hbEtleV0pXG5cbiAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXM6IEFycmF5PEZpbGU+KTogdm9pZCA9PiB7XG4gICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcylcbiAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBmaWxlcylcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlTXVsdGlSZW1vdmUgPSAoc2luZ2xlS2V5KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpXG4gICAgY29uc3QgZmlsZXNUb0RlbGV0ZSA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHkpIHx8IFtdXG4gICAgaWYgKFxuICAgICAgcGF0aCAmJiBwYXRoLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBwYXRoLm1hcCgoY3VycmVudFBhdGgsIGkpID0+IChpICE9PSBpbmRleCA/IGN1cnJlbnRQYXRoIDogbnVsbCkpXG4gICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQoXG4gICAgICAgIHJlY29yZC5wYXJhbXMsXG4gICAgICAgIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHksXG4gICAgICAgIFsuLi5maWxlc1RvRGVsZXRlLCBpbmRleF0sXG4gICAgICApXG4gICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKVxuXG4gICAgICBvbkNoYW5nZSh7XG4gICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coJ1lvdSBjYW5ub3QgcmVtb3ZlIGZpbGUgd2hlbiB0aGVyZSBhcmUgbm8gdXBsb2FkZWQgZmlsZXMgeWV0JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8RHJvcFpvbmVcbiAgICAgICAgb25DaGFuZ2U9e29uVXBsb2FkfVxuICAgICAgICBtdWx0aXBsZT17Y3VzdG9tLm11bHRpcGxlfVxuICAgICAgICB2YWxpZGF0ZT17e1xuICAgICAgICAgIG1pbWVUeXBlczogY3VzdG9tLm1pbWVUeXBlcyBhcyBBcnJheTxzdHJpbmc+LFxuICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICB9fVxuICAgICAgICBmaWxlcz17ZmlsZXNUb1VwbG9hZH1cbiAgICAgIC8+XG4gICAgICB7IWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxEcm9wWm9uZUl0ZW0gZmlsZW5hbWU9e2tleX0gc3JjPXtwYXRofSBvblJlbW92ZT17aGFuZGxlUmVtb3ZlfSAvPlxuICAgICAgKX1cbiAgICAgIHtjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIGtleS5sZW5ndGggJiYgcGF0aCA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICB7a2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXRoID8gKFxuICAgICAgICAgICAgICA8RHJvcFpvbmVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtzaW5nbGVLZXl9XG4gICAgICAgICAgICAgICAgZmlsZW5hbWU9e3NpbmdsZUtleX1cbiAgICAgICAgICAgICAgICBzcmM9e3BhdGhbaW5kZXhdfVxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6ICcnXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvPlxuICAgICAgKSA6ICcnfVxuICAgIDwvRm9ybUdyb3VwPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRcbiIsImV4cG9ydCBjb25zdCBBdWRpb01pbWVUeXBlcyA9IFtcbiAgJ2F1ZGlvL2FhYycsXG4gICdhdWRpby9taWRpJyxcbiAgJ2F1ZGlvL3gtbWlkaScsXG4gICdhdWRpby9tcGVnJyxcbiAgJ2F1ZGlvL29nZycsXG4gICdhcHBsaWNhdGlvbi9vZ2cnLFxuICAnYXVkaW8vb3B1cycsXG4gICdhdWRpby93YXYnLFxuICAnYXVkaW8vd2VibScsXG4gICdhdWRpby8zZ3BwMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgJ3ZpZGVvL3gtbXN2aWRlbycsXG4gICd2aWRlby9tcGVnJyxcbiAgJ3ZpZGVvL29nZycsXG4gICd2aWRlby9tcDJ0JyxcbiAgJ3ZpZGVvL3dlYm0nLFxuICAndmlkZW8vM2dwcCcsXG4gICd2aWRlby8zZ3BwMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgJ2ltYWdlL2JtcCcsXG4gICdpbWFnZS9naWYnLFxuICAnaW1hZ2UvanBlZycsXG4gICdpbWFnZS9wbmcnLFxuICAnaW1hZ2Uvc3ZnK3htbCcsXG4gICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAnaW1hZ2UvdGlmZicsXG4gICdpbWFnZS93ZWJwJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAnYXBwbGljYXRpb24veC1iemlwMicsXG4gICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICdhcHBsaWNhdGlvbi94LXRhcicsXG4gICdhcHBsaWNhdGlvbi96aXAnLFxuICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IERvY3VtZW50TWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICdhcHBsaWNhdGlvbi92bmQuYW1hem9uLmVib29rJyxcbiAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdCcsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dCcsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5yYXInLFxuICAnYXBwbGljYXRpb24vcnRmJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAndGV4dC9jc3MnLFxuICAndGV4dC9jc3YnLFxuICAndGV4dC9odG1sJyxcbiAgJ3RleHQvY2FsZW5kYXInLFxuICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICd0ZXh0L2phdmFzY3JpcHQnLFxuICAndGV4dC9wbGFpbicsXG4gICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAnYXBwbGljYXRpb24veG1sJyxcbiAgJ3RleHQveG1sJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi9lcHViK3ppcCcsXG4gICdhcHBsaWNhdGlvbi9wZGYnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgJ2ZvbnQvb3RmJyxcbiAgJ2ZvbnQvdHRmJyxcbiAgJ2ZvbnQvd29mZicsXG4gICdmb250L3dvZmYyJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgJ2FwcGxpY2F0aW9uL3gtY3NoJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtc2gnLFxuICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAndm5kLnZpc2lvJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tb3ppbGxhLnh1bCt4bWwnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgLi4uVmlkZW9NaW1lVHlwZXMsXG4gIC4uLkltYWdlTWltZVR5cGVzLFxuICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAuLi5Eb2N1bWVudE1pbWVUeXBlcyxcbiAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgLi4uT3RoZXJNaW1lVHlwZXMsXG4gIC4uLkZvbnRNaW1lVHlwZXMsXG4gIC4uLk90aGVyTWltZVR5cGVzLFxuXVxuXG50eXBlIFBvcHVsYXJNaW1lVHlwZXMgPSB0eXBlb2YgTWltZVR5cGVzW251bWJlcl1cblxuZXhwb3J0IHR5cGUgTWltZVR5cGUgPSBQb3B1bGFyTWltZVR5cGVzIHwge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgSWNvbiwgQnV0dG9uLCBCb3ggfSBmcm9tICdAYWRtaW4tYnJvL2Rlc2lnbi1zeXN0ZW0nXG5cbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzLCBmbGF0IH0gZnJvbSAnYWRtaW4tYnJvJ1xuaW1wb3J0IHsgSW1hZ2VNaW1lVHlwZXMsIEF1ZGlvTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlJ1xuaW1wb3J0IFByb3BlcnR5Q3VzdG9tIGZyb20gJy4uL3R5cGVzL3Byb3BlcnR5LWN1c3RvbS50eXBlJ1xuXG50eXBlIFByb3BzID0gU2hvd1Byb3BlcnR5UHJvcHMgJiB7XG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufTtcblxudHlwZSBTaW5nbGVGaWxlUHJvcHMgPSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgcGF0aD86IHN0cmluZyxcbiAgbWltZVR5cGU/OiBzdHJpbmcsXG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufVxuXG5jb25zdCBTaW5nbGVGaWxlOiBGQzxTaW5nbGVGaWxlUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wc1xuICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgIGlmIChtaW1lVHlwZSAmJiBJbWFnZU1pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gPGltZyBzcmM9e3BhdGh9IHN0eWxlPXt7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9fSBhbHQ9e25hbWV9IC8+XG4gICAgfVxuICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YXVkaW9cbiAgICAgICAgICBjb250cm9sc1xuICAgICAgICAgIHNyYz17cGF0aH1cbiAgICAgICAgPlxuICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVxuICAgICAgICAgIDxjb2RlPmF1ZGlvPC9jb2RlPlxuICAgICAgICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8QnV0dG9uIGFzPVwiYVwiIGhyZWY9e3BhdGh9IG1sPVwiZGVmYXVsdFwiIHNpemU9XCJzbVwiIHJvdW5kZWQgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgIDxJY29uIGljb249XCJEb2N1bWVudERvd25sb2FkXCIgY29sb3I9XCJ3aGl0ZVwiIG1yPVwiZGVmYXVsdFwiIC8+XG4gICAgICAgIHtuYW1lfVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Cb3g+XG4gIClcbn1cblxuY29uc3QgRmlsZTogRkM8UHJvcHM+ID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGNvbnN0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpXG5cbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBmbGF0LmdldChcbiAgICByZWNvcmQ/LnBhcmFtcyxcbiAgICBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5LFxuICApXG4gIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHkgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KVxuXG4gIGlmICghcHJvcGVydHkuY3VzdG9tLm11bHRpcGxlKSB7XG4gICAgcmV0dXJuIDxTaW5nbGVGaWxlIHBhdGg9e3BhdGh9IG5hbWU9e25hbWV9IHdpZHRoPXt3aWR0aH0gbWltZVR5cGU9e21pbWVUeXBlfSAvPlxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3BhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFxuICAgICAgICA8U2luZ2xlRmlsZVxuICAgICAgICAgIGtleT17c2luZ2xlUGF0aH1cbiAgICAgICAgICBwYXRoPXtzaW5nbGVQYXRofVxuICAgICAgICAgIG5hbWU9e25hbWVbaW5kZXhdfVxuICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICBtaW1lVHlwZT17bWltZVR5cGVbaW5kZXhdfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsZVxuIiwiaW1wb3J0IFJlYWN0LCB7IEZDIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluLWJybydcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuXG5jb25zdCBMaXN0OiBGQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+ICg8RmlsZSB3aWR0aD17MTAwfSB7Li4ucHJvcHN9IC8+KVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0XG4iLCJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW4tYnJvJ1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbi1icm8vZGVzaWduLXN5c3RlbSdcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuXG5jb25zdCBTaG93OiBGQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcm9wZXJ0eSB9ID0gcHJvcHNcblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8RmlsZSB3aWR0aD1cIjEwMCVcIiB7Li4ucHJvcHN9IC8+XG4gICAgPC9Gb3JtR3JvdXA+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvd1xuIiwiQWRtaW5Ccm8uVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IENvbXBvbmVudDEgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbi1icm8vdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQnXG5BZG1pbkJyby5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxID0gQ29tcG9uZW50MVxuaW1wb3J0IENvbXBvbmVudDIgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbi1icm8vdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2xpc3QnXG5BZG1pbkJyby5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQyID0gQ29tcG9uZW50MlxuaW1wb3J0IENvbXBvbmVudDMgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbi1icm8vdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cnXG5BZG1pbkJyby5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQzID0gQ29tcG9uZW50MyJdLCJuYW1lcyI6WyJFZGl0IiwicHJvcGVydHkiLCJyZWNvcmQiLCJvbkNoYW5nZSIsInBhcmFtcyIsImN1c3RvbSIsInBhdGgiLCJmbGF0IiwiZ2V0IiwiZmlsZVBhdGhQcm9wZXJ0eSIsImtleSIsImtleVByb3BlcnR5IiwiZmlsZSIsImZpbGVQcm9wZXJ0eSIsInVzZVN0YXRlIiwib3JpZ2luYWxLZXkiLCJzZXRPcmlnaW5hbEtleSIsImZpbGVzVG9VcGxvYWQiLCJzZXRGaWxlc1RvVXBsb2FkIiwidXNlRWZmZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwib25VcGxvYWQiLCJmaWxlcyIsImhhbmRsZVJlbW92ZSIsImhhbmRsZU11bHRpUmVtb3ZlIiwic2luZ2xlS2V5IiwiaW5kZXgiLCJpbmRleE9mIiwiZmlsZXNUb0RlbGV0ZSIsImZpbGVzVG9EZWxldGVQcm9wZXJ0eSIsIm5ld1BhdGgiLCJtYXAiLCJjdXJyZW50UGF0aCIsImkiLCJuZXdQYXJhbXMiLCJzZXQiLCJjb25zb2xlIiwibG9nIiwiUmVhY3QiLCJGb3JtR3JvdXAiLCJMYWJlbCIsImxhYmVsIiwiRHJvcFpvbmUiLCJtdWx0aXBsZSIsIm1pbWVUeXBlcyIsIm1heFNpemUiLCJEcm9wWm9uZUl0ZW0iLCJBdWRpb01pbWVUeXBlcyIsIkltYWdlTWltZVR5cGVzIiwiU2luZ2xlRmlsZSIsInByb3BzIiwibmFtZSIsIm1pbWVUeXBlIiwid2lkdGgiLCJpbmNsdWRlcyIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwiQm94IiwiQnV0dG9uIiwiSWNvbiIsIkZpbGUiLCJmaWxlTmFtZVByb3BlcnR5IiwibWltZVR5cGVQcm9wZXJ0eSIsInNpbmdsZVBhdGgiLCJMaXN0IiwiU2hvdyIsIkFkbWluQnJvIiwiVXNlckNvbXBvbmVudHMiLCJDb21wb25lbnQxIiwiQ29tcG9uZW50MiIsIkNvbXBvbmVudDMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBS0EsSUFBTUEsSUFBMkIsR0FBRyxTQUE5QkEsSUFBOEIsT0FBb0M7RUFBQSxNQUFqQ0MsUUFBaUMsUUFBakNBLFFBQWlDO0VBQUEsTUFBdkJDLE1BQXVCLFFBQXZCQSxNQUF1QjtFQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTtFQUFBLE1BQzlEQyxNQUQ4RCxHQUNuREYsTUFEbUQsQ0FDOURFLE1BRDhEO0VBQUEsY0FFbkRILFFBRm1EO0VBQUEsTUFFOURJLE1BRjhELFNBRTlEQSxNQUY4RDtFQUl0RSxNQUFNQyxJQUFJLEdBQUdDLGFBQUksQ0FBQ0MsR0FBTCxDQUFTSixNQUFULEVBQWlCQyxNQUFNLENBQUNJLGdCQUF4QixDQUFiO0VBQ0EsTUFBTUMsR0FBRyxHQUFHSCxhQUFJLENBQUNDLEdBQUwsQ0FBU0osTUFBVCxFQUFpQkMsTUFBTSxDQUFDTSxXQUF4QixDQUFaO0VBQ0EsTUFBTUMsSUFBSSxHQUFHTCxhQUFJLENBQUNDLEdBQUwsQ0FBU0osTUFBVCxFQUFpQkMsTUFBTSxDQUFDUSxZQUF4QixDQUFiOztFQU5zRSxrQkFRaENDLGNBQVEsQ0FBQ0osR0FBRCxDQVJ3QjtFQUFBO0VBQUEsTUFRL0RLLFdBUitEO0VBQUEsTUFRbERDLGNBUmtEOztFQUFBLG1CQVM1QkYsY0FBUSxDQUFjLEVBQWQsQ0FUb0I7RUFBQTtFQUFBLE1BUy9ERyxhQVQrRDtFQUFBLE1BU2hEQyxnQkFUZ0Q7O0VBV3RFQyxFQUFBQSxlQUFTLENBQUMsWUFBTTtFQUNkO0VBQ0E7RUFDQTtFQUNBLFFBQ0csT0FBT1QsR0FBUCxLQUFlLFFBQWYsSUFBMkJBLEdBQUcsS0FBS0ssV0FBcEMsSUFDSSxPQUFPTCxHQUFQLEtBQWUsUUFBZixJQUEyQixDQUFDSyxXQURoQyxJQUVJLE9BQU9MLEdBQVAsS0FBZSxRQUFmLElBQTJCVSxLQUFLLENBQUNDLE9BQU4sQ0FBY1gsR0FBZCxDQUEzQixJQUFpREEsR0FBRyxDQUFDWSxNQUFKLEtBQWVQLFdBQVcsQ0FBQ08sTUFIbEYsRUFJRTtFQUNBTixNQUFBQSxjQUFjLENBQUNOLEdBQUQsQ0FBZDtFQUNBUSxNQUFBQSxnQkFBZ0IsQ0FBQyxFQUFELENBQWhCO0VBQ0Q7RUFDRixHQVpRLEVBWU4sQ0FBQ1IsR0FBRCxFQUFNSyxXQUFOLENBWk0sQ0FBVDs7RUFjQSxNQUFNUSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxLQUFELEVBQThCO0VBQzdDTixJQUFBQSxnQkFBZ0IsQ0FBQ00sS0FBRCxDQUFoQjtFQUNBckIsSUFBQUEsUUFBUSxDQUFDRSxNQUFNLENBQUNRLFlBQVIsRUFBc0JXLEtBQXRCLENBQVI7RUFDRCxHQUhEOztFQUtBLE1BQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07RUFDekJ0QixJQUFBQSxRQUFRLENBQUNFLE1BQU0sQ0FBQ1EsWUFBUixFQUFzQixJQUF0QixDQUFSO0VBQ0QsR0FGRDs7RUFJQSxNQUFNYSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLFNBQUQsRUFBZTtFQUN2QyxRQUFNQyxLQUFLLEdBQUcsQ0FBQ3JCLGFBQUksQ0FBQ0MsR0FBTCxDQUFTTixNQUFNLENBQUNFLE1BQWhCLEVBQXdCQyxNQUFNLENBQUNNLFdBQS9CLEtBQStDLEVBQWhELEVBQW9Ea0IsT0FBcEQsQ0FBNERGLFNBQTVELENBQWQ7RUFDQSxRQUFNRyxhQUFhLEdBQUd2QixhQUFJLENBQUNDLEdBQUwsQ0FBU04sTUFBTSxDQUFDRSxNQUFoQixFQUF3QkMsTUFBTSxDQUFDMEIscUJBQS9CLEtBQXlELEVBQS9FOztFQUNBLFFBQ0V6QixJQUFJLElBQUlBLElBQUksQ0FBQ2dCLE1BQUwsR0FBYyxDQUR4QixFQUVFO0VBQ0EsVUFBTVUsT0FBTyxHQUFHMUIsSUFBSSxDQUFDMkIsR0FBTCxDQUFTLFVBQUNDLFdBQUQsRUFBY0MsQ0FBZDtFQUFBLGVBQXFCQSxDQUFDLEtBQUtQLEtBQU4sR0FBY00sV0FBZCxHQUE0QixJQUFqRDtFQUFBLE9BQVQsQ0FBaEI7RUFDQSxVQUFJRSxTQUFTLEdBQUc3QixhQUFJLENBQUM4QixHQUFMLENBQ2RuQyxNQUFNLENBQUNFLE1BRE8sRUFFZEMsTUFBTSxDQUFDMEIscUJBRk8sK0JBR1ZELGFBSFUsSUFHS0YsS0FITCxHQUFoQjtFQUtBUSxNQUFBQSxTQUFTLEdBQUc3QixhQUFJLENBQUM4QixHQUFMLENBQVNELFNBQVQsRUFBb0IvQixNQUFNLENBQUNJLGdCQUEzQixFQUE2Q3VCLE9BQTdDLENBQVo7RUFFQTdCLE1BQUFBLFFBQVEsbUNBQ0hELE1BREc7RUFFTkUsUUFBQUEsTUFBTSxFQUFFZ0M7RUFGRixTQUFSO0VBSUQsS0FmRCxNQWVPO0VBQ0w7RUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNkRBQVo7RUFDRDtFQUNGLEdBdEJEOztFQXdCQSxzQkFDRUMsd0NBQUNDLHNCQUFELHFCQUNFRCx3Q0FBQ0Usa0JBQUQsUUFBUXpDLFFBQVEsQ0FBQzBDLEtBQWpCLENBREYsZUFFRUgsd0NBQUNJLHFCQUFEO0VBQ0UsSUFBQSxRQUFRLEVBQUVyQixRQURaO0VBRUUsSUFBQSxRQUFRLEVBQUVsQixNQUFNLENBQUN3QyxRQUZuQjtFQUdFLElBQUEsUUFBUSxFQUFFO0VBQ1JDLE1BQUFBLFNBQVMsRUFBRXpDLE1BQU0sQ0FBQ3lDLFNBRFY7RUFFUkMsTUFBQUEsT0FBTyxFQUFFMUMsTUFBTSxDQUFDMEM7RUFGUixLQUhaO0VBT0UsSUFBQSxLQUFLLEVBQUU5QjtFQVBULElBRkYsRUFXRyxDQUFDWixNQUFNLENBQUN3QyxRQUFSLElBQW9CbkMsR0FBcEIsSUFBMkJKLElBQTNCLElBQW1DLENBQUNXLGFBQWEsQ0FBQ0ssTUFBbEQsSUFBNERWLElBQUksS0FBSyxJQUFyRSxpQkFDQzRCLHdDQUFDUSx5QkFBRDtFQUFjLElBQUEsUUFBUSxFQUFFdEMsR0FBeEI7RUFBNkIsSUFBQSxHQUFHLEVBQUVKLElBQWxDO0VBQXdDLElBQUEsUUFBUSxFQUFFbUI7RUFBbEQsSUFaSixFQWNHcEIsTUFBTSxDQUFDd0MsUUFBUCxJQUFtQm5DLEdBQW5CLElBQTBCQSxHQUFHLENBQUNZLE1BQTlCLElBQXdDaEIsSUFBeEMsZ0JBQ0NrQyxrRkFDRzlCLEdBQUcsQ0FBQ3VCLEdBQUosQ0FBUSxVQUFDTixTQUFELEVBQVlDLEtBQVosRUFBc0I7RUFDN0I7RUFDQTtFQUNBO0VBQ0E7RUFDQSxRQUFNTSxXQUFXLEdBQUc1QixJQUFJLENBQUNzQixLQUFELENBQXhCO0VBQ0EsV0FBT00sV0FBVyxnQkFDaEJNLHdDQUFDUSx5QkFBRDtFQUNFLE1BQUEsR0FBRyxFQUFFckIsU0FEUDtFQUVFLE1BQUEsUUFBUSxFQUFFQSxTQUZaO0VBR0UsTUFBQSxHQUFHLEVBQUVyQixJQUFJLENBQUNzQixLQUFELENBSFg7RUFJRSxNQUFBLFFBQVEsRUFBRTtFQUFBLGVBQU1GLGlCQUFpQixDQUFDQyxTQUFELENBQXZCO0VBQUE7RUFKWixNQURnQixHQU9kLEVBUEo7RUFRRCxHQWRBLENBREgsQ0FERCxHQWtCRyxFQWhDTixDQURGO0VBb0NELENBOUZEOztFQ0xPLElBQU1zQixjQUFjLEdBQUcsQ0FDNUIsV0FENEIsRUFFNUIsWUFGNEIsRUFHNUIsY0FINEIsRUFJNUIsWUFKNEIsRUFLNUIsV0FMNEIsRUFNNUIsaUJBTjRCLEVBTzVCLFlBUDRCLEVBUTVCLFdBUjRCLEVBUzVCLFlBVDRCLEVBVTVCLGFBVjRCLENBQXZCO0VBdUJBLElBQU1DLGNBQWMsR0FBRyxDQUM1QixXQUQ0QixFQUU1QixXQUY0QixFQUc1QixZQUg0QixFQUk1QixXQUo0QixFQUs1QixlQUw0QixFQU01QiwwQkFONEIsRUFPNUIsWUFQNEIsRUFRNUIsWUFSNEIsQ0FBdkI7O0VDSlAsSUFBTUMsVUFBK0IsR0FBRyxTQUFsQ0EsVUFBa0MsQ0FBQ0MsS0FBRCxFQUFXO0VBQUEsTUFDekNDLElBRHlDLEdBQ1RELEtBRFMsQ0FDekNDLElBRHlDO0VBQUEsTUFDbkMvQyxJQURtQyxHQUNUOEMsS0FEUyxDQUNuQzlDLElBRG1DO0VBQUEsTUFDN0JnRCxRQUQ2QixHQUNURixLQURTLENBQzdCRSxRQUQ2QjtFQUFBLE1BQ25CQyxLQURtQixHQUNUSCxLQURTLENBQ25CRyxLQURtQjs7RUFFakQsTUFBSWpELElBQUksSUFBSUEsSUFBSSxDQUFDZ0IsTUFBakIsRUFBeUI7RUFDdkIsUUFBSWdDLFFBQVEsSUFBSUosY0FBYyxDQUFDTSxRQUFmLENBQXdCRixRQUF4QixDQUFoQixFQUEwRDtFQUN4RCwwQkFBT2Q7RUFBSyxRQUFBLEdBQUcsRUFBRWxDLElBQVY7RUFBZ0IsUUFBQSxLQUFLLEVBQUU7RUFBRW1ELFVBQUFBLFNBQVMsRUFBRUYsS0FBYjtFQUFvQkcsVUFBQUEsUUFBUSxFQUFFSDtFQUE5QixTQUF2QjtFQUE4RCxRQUFBLEdBQUcsRUFBRUY7RUFBbkUsUUFBUDtFQUNEOztFQUNELFFBQUlDLFFBQVEsSUFBSUwsY0FBYyxDQUFDTyxRQUFmLENBQXdCRixRQUF4QixDQUFoQixFQUEwRDtFQUN4RCwwQkFDRWQ7RUFDRSxRQUFBLFFBQVEsTUFEVjtFQUVFLFFBQUEsR0FBRyxFQUFFbEM7RUFGUCwyREFLRWtDLDhEQUxGLGVBTUVBO0VBQU8sUUFBQSxJQUFJLEVBQUM7RUFBWixRQU5GLENBREY7RUFVRDtFQUNGOztFQUNELHNCQUNFQSx3Q0FBQ21CLGdCQUFELHFCQUNFbkIsd0NBQUNvQixtQkFBRDtFQUFRLElBQUEsRUFBRSxFQUFDLEdBQVg7RUFBZSxJQUFBLElBQUksRUFBRXRELElBQXJCO0VBQTJCLElBQUEsRUFBRSxFQUFDLFNBQTlCO0VBQXdDLElBQUEsSUFBSSxFQUFDLElBQTdDO0VBQWtELElBQUEsT0FBTyxNQUF6RDtFQUEwRCxJQUFBLE1BQU0sRUFBQztFQUFqRSxrQkFDRWtDLHdDQUFDcUIsaUJBQUQ7RUFBTSxJQUFBLElBQUksRUFBQyxrQkFBWDtFQUE4QixJQUFBLEtBQUssRUFBQyxPQUFwQztFQUE0QyxJQUFBLEVBQUUsRUFBQztFQUEvQyxJQURGLEVBRUdSLElBRkgsQ0FERixDQURGO0VBUUQsQ0EzQkQ7O0VBNkJBLElBQU1TLElBQWUsR0FBRyxTQUFsQkEsSUFBa0IsT0FBaUM7RUFBQSxNQUE5QlAsS0FBOEIsUUFBOUJBLEtBQThCO0VBQUEsTUFBdkJyRCxNQUF1QixRQUF2QkEsTUFBdUI7RUFBQSxNQUFmRCxRQUFlLFFBQWZBLFFBQWU7RUFBQSxjQUNwQ0EsUUFEb0M7RUFBQSxNQUMvQ0ksTUFEK0MsU0FDL0NBLE1BRCtDO0VBR3ZELE1BQU1DLElBQUksR0FBR0MsYUFBSSxDQUFDQyxHQUFMLENBQVNOLE1BQVQsYUFBU0EsTUFBVCx1QkFBU0EsTUFBTSxDQUFFRSxNQUFqQixFQUF5QkMsTUFBTSxDQUFDSSxnQkFBaEMsQ0FBYjs7RUFFQSxNQUFJLENBQUNILElBQUwsRUFBVztFQUNULFdBQU8sSUFBUDtFQUNEOztFQUVELE1BQU0rQyxJQUFJLEdBQUc5QyxhQUFJLENBQUNDLEdBQUwsQ0FDWE4sTUFEVyxhQUNYQSxNQURXLHVCQUNYQSxNQUFNLENBQUVFLE1BREcsRUFFWEMsTUFBTSxDQUFDMEQsZ0JBQVAsR0FBMEIxRCxNQUFNLENBQUMwRCxnQkFBakMsR0FBb0QxRCxNQUFNLENBQUNNLFdBRmhELENBQWI7RUFJQSxNQUFNMkMsUUFBUSxHQUFHakQsTUFBTSxDQUFDMkQsZ0JBQVAsSUFBMkJ6RCxhQUFJLENBQUNDLEdBQUwsQ0FBU04sTUFBVCxhQUFTQSxNQUFULHVCQUFTQSxNQUFNLENBQUVFLE1BQWpCLEVBQXlCQyxNQUFNLENBQUMyRCxnQkFBaEMsQ0FBNUM7O0VBRUEsTUFBSSxDQUFDL0QsUUFBUSxDQUFDSSxNQUFULENBQWdCd0MsUUFBckIsRUFBK0I7RUFDN0Isd0JBQU9MLHdDQUFDLFVBQUQ7RUFBWSxNQUFBLElBQUksRUFBRWxDLElBQWxCO0VBQXdCLE1BQUEsSUFBSSxFQUFFK0MsSUFBOUI7RUFBb0MsTUFBQSxLQUFLLEVBQUVFLEtBQTNDO0VBQWtELE1BQUEsUUFBUSxFQUFFRDtFQUE1RCxNQUFQO0VBQ0Q7O0VBRUQsc0JBQ0VkLGtGQUNHbEMsSUFBSSxDQUFDMkIsR0FBTCxDQUFTLFVBQUNnQyxVQUFELEVBQWFyQyxLQUFiO0VBQUEsd0JBQ1JZLHdDQUFDLFVBQUQ7RUFDRSxNQUFBLEdBQUcsRUFBRXlCLFVBRFA7RUFFRSxNQUFBLElBQUksRUFBRUEsVUFGUjtFQUdFLE1BQUEsSUFBSSxFQUFFWixJQUFJLENBQUN6QixLQUFELENBSFo7RUFJRSxNQUFBLEtBQUssRUFBRTJCLEtBSlQ7RUFLRSxNQUFBLFFBQVEsRUFBRUQsUUFBUSxDQUFDMUIsS0FBRDtFQUxwQixNQURRO0VBQUEsR0FBVCxDQURILENBREY7RUFhRCxDQWhDRDs7RUMzQ0EsSUFBTXNDLElBQTJCLEdBQUcsU0FBOUJBLElBQThCLENBQUNkLEtBQUQ7RUFBQSxzQkFBWVosd0NBQUMsSUFBRDtFQUFNLElBQUEsS0FBSyxFQUFFO0VBQWIsS0FBc0JZLEtBQXRCLEVBQVo7RUFBQSxDQUFwQzs7RUNDQSxJQUFNZSxJQUEyQixHQUFHLFNBQTlCQSxJQUE4QixDQUFDZixLQUFELEVBQVc7RUFBQSxNQUNyQ25ELFFBRHFDLEdBQ3hCbUQsS0FEd0IsQ0FDckNuRCxRQURxQztFQUc3QyxzQkFDRXVDLHdDQUFDQyxzQkFBRCxxQkFDRUQsd0NBQUNFLGtCQUFELFFBQVF6QyxRQUFRLENBQUMwQyxLQUFqQixDQURGLGVBRUVILHdDQUFDLElBQUQ7RUFBTSxJQUFBLEtBQUssRUFBQztFQUFaLEtBQXVCWSxLQUF2QixFQUZGLENBREY7RUFNRCxDQVREOztFQ05BZ0IsUUFBUSxDQUFDQyxjQUFULEdBQTBCLEVBQTFCO0VBRUFELFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkMsVUFBeEIsR0FBcUNBLElBQXJDO0VBRUFGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkUsVUFBeEIsR0FBcUNBLElBQXJDO0VBRUFILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkcsVUFBeEIsR0FBcUNBLElBQXJDOzs7Ozs7In0=
