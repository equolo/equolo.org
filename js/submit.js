document.once('DOMContentLoaded', function () {
  var
    RE_EMAIL = /^[^@]+?@[^\1@]+\.([a-z]{2,})$/,
    uid = 0,
    user = {},
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
        // enable current fieldSet
        FieldSet.enable($('fieldset#' + type)[0]);
        // invoke current type
        this[type](e);
      },

///////////////////////////////////////////////////////////////////////
//        sections: each one a step-N name for simplicity ^_^
///////////////////////////////////////////////////////////////////////


// language
///////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////
      'step-2': function (e) {
        var
          fieldSet = $('fieldset#' + e.type)[0],
          email = $('input', fieldSet)[0]
        ;
        // what hapens once everything has been verified?
        this.on('email:verified', verifyEmailCompleted);
        // what happens each time the user change the input?
        email.on('keyup', this.boundTo(verifyEmailDelayed));
        // in case the value is already filled via cookies
        // check it directly through events
        email.emit('keyup');
      },

// activity
///////////////////////////////////////////////////////////////////////
      'step-3': function (e) {
        var
          user = e.detail,
          fieldSet = $('fieldset#' + e.type),
          activities = $('select[name=activity]', fieldSet)[0],
          add = $('button[name=add]', fieldSet)[0],
          remove = $('button[name=remove]', fieldSet)[0],
          name = $('input[name=name]', fieldSet)[0],
          description = $('textarea[name=description]', fieldSet)[0],
          lang = $('select[name=lang]', fieldSet)[0],
          counter = $('div.lang > p > span', fieldSet)[0],
          languages = $('ul', fieldSet)[0],
          createLanguageIndicator = function (key) {
            var
              li = languages.appendChild(
                document.createElement('li')
              ),
              mark = li.appendChild(
                document.createElement('strong')
              )
            ;
            mark.append('√');
            li.append(mark);
            li.append(' ' + findLanguageByValue(lang, key));
          },
          // if there was something in the textarea and it has a name
          enableAddRemoveButtons = function () {
            add.disabled = !(description.value && name.value);
            remove.disabled = !activities.options.length;
          }
        ;
        // clear everything regardless
        counter.innerHTML = 140;
        name.value = description.value =
        activities.innerHTML = languages.innerHTML = '';
        // after change, do everything again from the scratch
        activities.once('change', function () {
          user.currentActivity = this.value;
          // trigger again the same event
          e.currentTarget.trigger(e);
        });
        // when the current activity changes
        // update the activity object with the new name
        name.on(
          'keyup',
          // TRICK: handler needed to be created only once
          // because the outer closure/scope is needed too
          // all those DOM references won't change later on
          // so let's create a single listener
          // so that it won't be added twice
          this.onNameChange || (
          this.onNameChange = function (e) {
            // the activity name
            var
              activityName = name.value.trim(),
              option = activities.options[activities.selectedIndex]
            ;
            getOrCreateActivity(user).name = activityName;
            if (activityName) {
              // update activities option entry too
              option.value = user.currentActivity;
              option.innerHTML = '';
              option.append(activityName);
              enableAddRemoveButtons();
            }
          }
        ));
        // when the description changes
        // update the counter
        description.on(
          'keyup',
          // same trick
          this.onDescriptionChange || (
          this.onDescriptionChange = function (e) {
            var
              value = description.value.trim(),
              maxChars = parseInt(
                description.getAttribute('maxlength'),
                10
              ),
              numberOfCharsAvailable = (
                maxChars - value.length
              ),
              activityDescription
            ;
            if (numberOfCharsAvailable < 0) {
              numberOfCharsAvailable = 0;
              description.value = value.slice(0, maxChars);
            }
            counter.innerHTML = numberOfCharsAvailable;
            // update the related activity description too
            activityDescription = getOrCreateActivity(user).description;
            if (!(lang.value in activityDescription)) {
              createLanguageIndicator(lang.value);
              enableAddRemoveButtons();
            }
            activityDescription[lang.value] = value;
            // only in case the user removed all text
            if (!value.length) {
              // remove current language from the system
              delete activityDescription[lang.value];
              // clean the list
              languages.innerHTML = '';
              // add all already available langauges
              Object.keys(activityDescription).forEach(createLanguageIndicator);
            }
          }
        ));
        // on language change, the description should change too
        lang.on(
          'change',
          // same trick
          this.onLanguageDescriptionChange || (
          this.onLanguageDescriptionChange = function (e) {
            var activityDescription = getOrCreateActivity(user).description;
            description.value = activityDescription[lang.value] || '';
            // notify the textarea and let it handle the rest
            description.emit('keyup');
          }
        ));
        // populate the field set with all available data
        user.activities.forEach(function (activity, i) {
          // only activity that have not been removed
          if (/^remove:/.test(activity.id)) return;
          // create an entry in the main select
          var
            option = activities.appendChild(document.createElement('option')),
            activityLanguages
          ;
          option.value = activity.id;
          option.append(activity.name);
          // show realted data
          if (
            // if no activity, show the first
            !user.hasOwnProperty('currentActivity') ||
            // otherwise show the selected
            activity.id == user.currentActivity
          ) {
            // be sure this happens only once
            user.currentActivity = activity.id;
            option.selected = 'selected';
            name.value = activity.name;
            activityLanguages = Object.keys(activity.description);
            // set the language as the first one
            activityLanguages.forEach.call(
              lang.options,
              selectOptionByValue,
              activityLanguages[0]
            );
            // add all already available langauges
            activityLanguages.forEach(createLanguageIndicator);
            // show the description
            description.value = activity.description[lang.value] || '';
            // update the counter too
            description.emit('keyup');
          }
        }, this);
        // what is needed to add a new activity
        add.on(
          'click',
          // same usual trick
          this.onAnotherActivity || (
          this.onAnotherActivity = function (e) {
            var
              options = activities.options,
              activityName
            ;
            // reset current activity
            user.currentActivity = null;
            // new entry in the main list
            activities.appendChild(
              document.createElement('option')
            ).append(
              // temporary name to show
              activityName =  name.placeholder ||
                              name.getAttribute('placeholder')
            );
            // clean up name and description
            name.value = description.value = '';
            // let the description handle the rest
            description.emit('keyup');
            // try to simplify user life
            try{name.focus()}catch(o_O){/*OK*/}
            // change the selected index
            activities.selectedIndex = options.length - 1;
          }
        ));
        remove.on(
          'click',
          this.onRemoveActivity || (
          this.onRemoveActivity = function (e) {
            var
              activity = getOrCreateActivity(user),
              id = activity.id,
              i
            ;
            if (/^new:/.test(id)) {
              for(i = 0; i < user.activities.length; i++) {
                if (user.activities[i].id == id) {
                  user.activities.splice(i, 1);
                  break;
                }
              }
            } else if(!/^remove:/.test(id)) {
              activity.id = 'remove:' + id;
            }
            user.currentActivity = null;
            activities.selectedIndex += activities.selectedIndex ? -1 : 1;
            activities.emit('change');
          }
        ));
        enableAddRemoveButtons();
        if (add.disabled && remove.disabled) {
          add.emit('click');
        }
      }
    },

///////////////////////////////////////////////////////////////////////

    // all user events to disable
    commonMouseEvents = [
      'mousedown',
      'mousemove',
      'mouseup',
      'click'
    ],
    // utility for common DOM fieldSet operations
    FieldSet = {
      disable: function (fieldSet) {
        fieldSet.className = 'disabled';
        commonMouseEvents.forEach(FieldSet._addStopEvent, fieldSet);
      },
      enable: function (fieldSet) {
        fieldSet.className = '';
        commonMouseEvents.forEach(FieldSet._removeStopEvent, fieldSet);
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


///////////////////////////////////////////////////////////////////////
////                        <<< EMAIL >>>
///////////////////////////////////////////////////////////////////////

  // used to save and check the user email
  function verifyEmail(controller, input) {
    var
      value = input.value.trim(),
      email = input.data('email'),
      xhr
    ;
    if (RE_EMAIL.test(value) && value !== email) {
      // avoid further pointless checks
      // for the same address
      input.data('email', value);
      controller.xhr = xhr = new XMLHttpRequest;
      xhr.target = controller;
      xhr.open('get', 'cgi/verify.php?email=' + encodeURIComponent(value), true);
      xhr.on('readystatechange', verifyEmailRequest).send(null);
      // save the user.email for further operations
      user.email = email;
    }
  }

  // once the email is OK
  function verifyEmailCompleted(e) {
    var detail = e.detail;
    switch(typeof detail) {
      // user authed with all info received
      case 'object':
        user.activities = detail;
        // show all activities next field
        // TODO: next ...
        break;
      case 'boolean':
        // user in but not authenticated
        // or never confirmed the email
        // inform the user and
        // ask if a new email should be sent
        // silently failing in the backend
        // if already sent in last 24 hours
        if (confirm(jslang.seeYouLater)) {
          // TODO: send the reminder
        }
        // nothing to do here, send the user
        // to the equolo.org site
        location.href = 'http://equolo.org/';
        break;
      default:
        // start from scratch new activities
        user.activities = [];
    }
    if (user.hasOwnProperty('activities')) {
      this.trigger('step-3', user);
    }
  }

  // do not perform this check every keyup event
  function verifyEmailDelayed(e) {
    var input = e.currentTarget;
    // drop the user email regardless what happens after
    user.email = null;
    // kill previous xhr if possible
    try{this.xhr.abort()}catch(itsOK){}
    // clear previous timeout, if any
    clearTimeout(parseInt(input.data('timer') || 0, 10));
    // now, only if it's worth asking to the server ...
    if (RE_EMAIL.test(input.value.trim())) {
      // address the new timer as data-timer attribute
      input.data('timer', setTimeout(verifyEmail, 1000, this, input));
    } else {
      // disable all fields after this one
      while(input = input.parentNode) {
        // once found the fieldSet
        if (input.nodeName === 'FIELDSET') {
          $('fieldset').slice(
            $('fieldset').indexOf(input) + 1
          ).forEach(FieldSet.disable);
          break;
        }
      }
    }
  }

  // only once an email has been verified
  function verifyEmailRequest() {
    // and the network has finished
    if (this.readyState === 4) {
      // emit the event with
      // received details
      this.target.trigger(
        'email:verified',
        JSON.parse(this.responseText)
      );
    }
  }



///////////////////////////////////////////////////////////////////////
////                    <<< ACTIVITY >>>
///////////////////////////////////////////////////////////////////////

  function findActivityById(activities, id) {
    for(var i = 0, length = activities.length, tmp; i < length; i++) {
      tmp = activities[i];
      if (tmp.id == id) return tmp;
    }
  }

  function findLanguageByValue(lang, value) {
    for(var options = lang.options, i = 0; i < options.length; i++) {
      if (options[i].value == value) return options[i].innerHTML;
    }
  }

  function getOrCreateActivity(user) {
    if (!user.currentActivity) {
      user.activities.push({
        // create a temporary client side only activity
        id: (user.currentActivity = 'new:'.concat(++uid)),
        name: '',
        description: {},
        place: []
      });
    }
    return findActivityById(
      user.activities,
      user.currentActivity
    );
  }

  function selectOptionByValue(option) {
    option.selected = option.value == this ? 'selected' : '';
  }


///////////////////////////////////////////////////////////////////////
////                        <<< INIT >>>
///////////////////////////////////////////////////////////////////////

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

  // disable all fields by default
  $('fieldset').forEach(FieldSet.disable);

  // let's start with step 1 :-)
  walkThrough.trigger('step-1');

});