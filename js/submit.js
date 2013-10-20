/**
 * Hello Friends,
 *  this area is specific for equolo and it's born
 *  from a quick and fast prototype.
 * We couldn't wait to go out with the possibility
 *  to let you insert your data in a hopefully
 *  very user friendly way but unfortunately
 *  the time to optimize everything or split in files
 *  or implement some external framework a part from
 *  Leaflet so it might look a huge file
 *  but actualy is well organized in events sections
 *  plus it's commented almost everywhere.
 * We hope you'll enjoy or learn something here
 * Happy equolo )°(,
 */
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
          fieldSet = $('fieldset#' + e.type)[0],
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
          fieldsets = $('fieldset'),
          fieldSet = $('fieldset#' + e.type)[0],
          activities = $('select[name=activity]', fieldSet)[0],
          add = $('button[name=add]', fieldSet)[0],
          remove = $('button[name=remove]', fieldSet)[0],
          next = $('button.next', fieldSet)[0],
          name = $('input[name=name]', fieldSet)[0],
          description = $('textarea[name=description]', fieldSet)[0],
          lang = $('select[name=lang]', fieldSet)[0],
          counter = $('div.lang > p > span', fieldSet)[0],
          languages = $('ul', fieldSet)[0],
          checkboxes = $('div.criteria input', fieldSet),
          certified = checkboxes.shift(),
          criteria = checkboxes.shift(),
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
            remove.disabled = !activities.options.length;
            next.disabled = add.disabled =
              !(description.value && name.value && (
                // the company is certified
                isInputChecked(certified) ||
                // or at least respect 4 criterias
                3 < checkboxes.filter(isInputChecked).length
              ))
            ;
            // accordingly with next status, all next fieldset should be enabled
            // or disabled and eventually cleaned but only if already initialized
            if (this.hasOwnProperty('map')) {
              fieldsets.slice(
                fieldsets.indexOf(fieldSet) + 1
              ).forEach(FieldSet[
                next.disabled ? 'disable' : 'enable'
              ]);
            }
          }.bind(this),
          tmp
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
            }
            enableAddRemoveButtons();
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
            enableAddRemoveButtons();
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
            // clean up all checks
            checkboxes.concat(criteria, certified).forEach(
              function(input){
                input.checked = false;
              }
            );
            // change the selected index
            activities.selectedIndex = options.length - 1;
          }
        ));
        // what to do in order to remove an activity
        remove.on(
          'click',
          this.onRemoveActivity || (
          this.onRemoveActivity = function (e) {
            var
              activity = getOrCreateActivity(user),
              id = activity.id,
              i
            ;
            // those that were new already, no need to bother the database
            if (/^new:/.test(id)) {
              for(i = 0; i < user.activities.length; i++) {
                // update the list
                if (user.activities[i].id == id) {
                  // removing the current activity
                  user.activities.splice(i, 1);
                  break;
                }
              }
            } else if(!/^remove:/.test(id)) {
              // somehow tell the server this activity should be removed
              // the prefix is good enough to ignore it here and inform
              // the backend about what to do
              activity.id = 'remove:' + id;
            }
            // no activity selected
            user.currentActivity = null;
            // if there is an activity before go for it
            // otherwise the next one is fine
            activities.selectedIndex += activities.selectedIndex ? -1 : 1;
            activities.emit('change');
          }
        ));
        // checkbox should notify buttons that maybe the user can go on
        // we need a single listener for this
        checkboxes.on(
          'change',
          this.onCriteriaChange || (
          this.onCriteriaChange = function () {
            // save current activity status
            checkboxes.forEach(
              updateUserCriteria,
              getOrCreateActivity(user).criteria = []
            );
            // verify
            enableAddRemoveButtons();
          }
        ));
        // need to setup criterias too
        // not a criteria concern to create a new user
        // in this case a manual check is better
        tmp = user.currentActivity ?
          findActivityById(user.activities, user.currentActivity) :
          {criteria: [], certification: []}
        ;
        // so per each criteria
        checkboxes.forEach(function(checkbox) {
          // set it up for current activity criteria
          checkbox.checked = -1 < this.criteria.indexOf(checkbox.value);
          // and make the outer li a better helper
          checkbox.parentNode.on('click', onCriteriaLIClick);
        }, tmp);
        // clean certified and criteria too
        criteria.checked = 0 < tmp.criteria.length;
        // the order isimportant to ensure only one checked
        // certified has priority so it's checked later
        certified.checked = 0 < tmp.certification.length;
        // criteria, when selected without checks
        // should invoke the activity "next" check
        criteria.on(
          'change',
          this.enableAddRemoveButtons || (
          this.enableAddRemoveButtons = enableAddRemoveButtons
        ));
        // while certified should flag
        // the object as certified and
        // still do the check
        certified.on(
          'change',
          this.onCertifiedEnabled || (
          this.onCertifiedEnabled = function() {
            getOrCreateActivity(user).certification = [true];
            enableAddRemoveButtons();
          }
        ));
        // verify button status (enable or disable them)
        enableAddRemoveButtons();
        // if both disabled
        if (add.disabled && remove.disabled) {
          // simulate adding a first element
          add.emit('click');
        }
        // what to do after ?
        next.on(
          'click',
          // same trick,
          // this time bound to the walkThrough object
          this.onNextActivity || (
          this.onNextActivity = function (e) {
            this.trigger('step-4', user);
          }.bind(this)
        ));
        // now, if there is already valid data
        // and buttons are all OK
        if (!next.disabled) {
          // just invoke the next step
          // clean up and show data
          next.emit('click');
        }
      },

// location
///////////////////////////////////////////////////////////////////////
      'step-4': function (e) {
        var
          user = e.detail,
          fieldSet = $('fieldset#' + e.type)[0],
          icon = $('i', fieldSet)[0],
          category = $('select[name=category]', fieldSet)[0],
          findMe = $('div.map > button', fieldSet)[0]
        ;

        // this one contains nested fieldSets
        $('fieldset', fieldSet).forEach(FieldSet.enable);

        // setup the map once
        // use this as flag to setup once
        // everything else too
        if (!this.hasOwnProperty('map')) {
          this.map = L.map('map');
          L.tileLayer(
            'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
            {
              attribution: 'Map Tiles &copy; Open MapQuest',
              maxZoom: 18
            }
          ).addTo(this.map);

          // show curent country
          this.map.setView([
            navigator.country.geo.latitude,
            navigator.country.geo.longitude
          ], 5);

          // if asked, find the position
          findMe.on(
            'click',
            // need to access the map later on
            function () {
              // do not allow multiple clicks
              // until the first operation is completed
              findMe.disabled = true;
              try {
                navigator.geolocation.getCurrentPosition(
                  function success(position) {
                    this.setView([
                      position.coords.latitude,
                      position.coords.longitude
                    ],
                    // show this closer
                    // but not further
                    Math.max(
                      14, this.getZoom()
                    ));
                    findMe.disabled = false;
                  }.bind(this),
                  function error() {
                    // shall we retry later on ?
                    findMe.disabled = false;
                  },
                  // as option, we just wait
                  // until the position has been found
                  {maximumAge: 600000}
                );
              } catch(o_O) {
                // something went wrong
                // probably there's no support
                // for this functionality at all
                // we can leave the button disabled
                // since it worth nothing trying again
              }
            }.bind(this.map)
          );

          // category should update the icon and whatever is on the map
          category.on(
            'change',
            // same trick used in step-3
            this.onCategoryChange || (
            this.onCategoryChange = function (e) {
              icon.className = 'icon-' + category.value;
            }
          ));
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
        fieldSet.classList.add('disabled');
        commonMouseEvents.forEach(FieldSet._addStopEvent, fieldSet);
      },
      enable: function (fieldSet) {
        fieldSet.classList.remove('disabled');
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

  /*function stop(e) {
    e.preventDefault();
    (e.stopImmediatePropagation || e.stopPropagation).call(e);
  }*/


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
        criteria: [],
        certification: [],
        place: []
      });
    }
    return findActivityById(
      user.activities,
      user.currentActivity
    );
  }

  function isInputChecked(checkbox) {
    return checkbox.checked;
  }

  function onCriteriaLIClick(e) {
    // if the target was the checkbox, don't double check it
    if (e.target == this) {
      this.firstChild.checked = !this.firstChild.checked;
      // trigger the change so tep-4 can go on
      this.firstChild.emit('change');
    }
  }

  function selectOptionByValue(option) {
    option.selected = option.value == this ? 'selected' : '';
  }

  function updateUserCriteria(input) {
    if (input.checked) {
      this.push(input.value);
    }
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