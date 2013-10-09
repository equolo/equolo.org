document.once('DOMContentLoaded', function () {
  var
    walkThrough = {
      // per each triggered event
      handleEvent: function (e) {
        var
          // shortcut next type
          type = e.type,
          // use temporary var as placeholder
          tmp
        ;
        // if there was a type
        if ('_type' in this) {
          // previsous type termination name
          tmp = this._type + '-terminate';
          // if present
          if (tmp in this) {
            // invoke it
            this[tmp](e);
          }
        }
        // update current _type
        this._type = type;
        // if there is an initialization name
        tmp = type + '-init';
        if (tmp in this) {
          // invoke it
          this[tmp](e);
        }
        // invoke current type
        this[type](e);
      },
      // each step will have its own name
      // for simplicity named ordered
      'step-1': function (e) {
        var
          fieldSet = $('fieldset#' + e.type),
          select = $('select', fieldSet)
        ;
        select.once('change', function(){
          // redirect to the specified language
          location.href = location.href.split(/[\?#]/)[0] +
                          '?lang=' + this.value;
        });
        this.trigger('step-2');
      },
      // email
      'step-2': function (e) {
        var fieldSet = $('fieldset#' + e.type)[0];
        FieldSet.disable(fieldSet);
        setTimeout(function () {
          FieldSet.enable(fieldSet);
          setTimeout(function () {
            FieldSet.disable(fieldSet);
          }, 5000);
        }, 5000);
      }
    },
    commonMouseEvents = [
      'mousedown',
      'mousemove',
      'mouseup',
      'click'
    ],
    FieldSet = {
      disable: function (fieldSet) {
        fieldSet.className = 'disabled';
        commonMouseEvents.forEach(this._addStopEvent, fieldSet);
      },
      enable: function (fieldSet) {
        fieldSet.className = '';
        commonMouseEvents.forEach(this._removeStopEvent, fieldSet);
      },
      _addStopEvent: function (type) {
        this.on(type, stop, true);
      },
      _removeStopEvent: function (type) {
        this.off(type, stop, true);
      }
    }
  ;

  function stop(e) {
    e.preventDefault();
    (e.stopImmediatePropagation || e.stopPropagation).call(e);
  }

  // per each key in the walkThrough object
  Object.keys(walkThrough).forEach(
    function (key) {
      // if it's an event name we expect
      // (all but the one used to handle them)
      if (key !== 'handleEvent') {
        // add walkTrhough as listener of itself
        this.on(key, this);
      }
    },
    // the context
    walkThrough
  );

  // let's start with step 1 :-)
  walkThrough.trigger('step-1');

});