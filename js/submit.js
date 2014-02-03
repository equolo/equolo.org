/**
 * Hello There,
 *  this area is specific for equolo and it's born
 *  from a quick and fast prototype.
 * 
 * We couldn't wait to go out with the possibility
 *  to let you insert your data in a hopefully
 *  very user friendly way but unfortunately
 *  the time to optimize everything or split in files
 *  or implement some external framework a part from
 *  Leaflet so it might look a huge file
 *  but actualy is kinda organized in events sections
 *  plus it's commented almost everywhere.
 * 
 * We hope you'll enjoy or maybe learn something here
 * 
 *  Happy equolo )°(,
 */
document.when('ready', function () {
  var
    RE_EMAIL = /^[^@]+?@[^\1@]+\.([a-zA-Z]{2,})$/,
    RE_VALID_GEO = /^-?\d+(?:\.\d+)?$/, // well, sort of ..
    uid = 0,
    JSONPid = 0,
    JSONPrefix = '_JSONP',
    // used as indicator for automatic searching
    searchStateIcon = $('fieldset#step-4 fieldset.address > legend > i')[0],
    searchState = {
      no: '',
      ok: 'icon-checkmark',
      error: 'icon-close2',
      searching: 'fx-spin icon-spinner'
    },
    // the single user shared across all logic
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
        $('a').forEach(function(a){
          // do not let the user loose focus/content
          // the section is highly interactive
          if (-1 < a.href.indexOf('/categories')) {
            a.target = '_blank';
          }
        });
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
            remove.disabled = activities.options.length < 2;
            next.disabled = add.disabled =
              !(description.value && name.value && (
                // the company is certified
                isInputChecked(certified) ||
                // or at least respect 4 criterias
                3 < checkboxes.filter(isInputChecked).length
              ))
            ;
            if (next.disabled) {
              // all next fieldset should be disabled
              // if already initialized and next is not enabled yet
              if (this.hasOwnProperty('map')) {
                fieldsets.slice(
                  fieldsets.indexOf(fieldSet) + 1
                ).forEach(FieldSet.disable);
              }
            } else {
              // unlock automagically next section
              next.emit('click');
            }
          }.bind(this),
          tmp
        ;
        // clear everything regardless
        counter.innerHTML = 140;
        name.value = description.value =
        activities.innerHTML = languages.innerHTML = '';
        // after change, do everything again from the scratch
        activities.on(
          'change',
          getOrSet(this, 'onActivityChange', function () {
            user.currentActivity = this.value;
            // trigger again the same event
            e.currentTarget.trigger(e);
          })
        );
        // when the current activity changes
        // update the activity object with the new name
        name.on(
          'keyup',
          // TRICK: handler needed to be created only once
          // because the outer closure/scope is needed too
          // all those DOM references won't change later on
          // so let's create a single listener
          // so that it won't be added twice
          getOrSet(this, 'onNameChange', function (e) {
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
          })
        );
        // when the description changes
        // update the counter
        description.on(
          'keyup',
          // same trick
          getOrSet(this, 'onDescriptionChange', function (e) {
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
          })
        );
        // on language change, the description should change too
        lang.on(
          'change',
          // same trick
          getOrSet(this, 'onLanguageDescriptionChange', function (e) {
            var activityDescription = getOrCreateActivity(user).description;
            description.value = activityDescription[lang.value] || '';
            // notify the textarea and let it handle the rest
            description.emit('keyup');
          })
        );
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
          getOrSet(this, 'onAnotherActivity', function (e) {
            var
              options = activities.options,
              onlyOne = !options.length
            ;
            // reset current activity
            user.currentActivity = null;
            // new entry in the main list
            activities.appendChild(
              document.createElement('option')
            ).append(' - ');
            activities.disabled = onlyOne;
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
          })
        );
        // what to do in order to remove an activity
        remove.on(
          'click',
          getOrSet(this, 'onRemoveActivity', function (e) {
            user.currentActivity = null;
            removeGenericObject(
              user.activities,
              activities
            );
          })
        );
        // checkbox should notify buttons that maybe the user can go on
        // we need a single listener for this
        checkboxes.on(
          'change',
          getOrSet(this, 'onCriteriaChange', function () {
            // save current activity status
            checkboxes.forEach(
              updateUserCriteria,
              getOrCreateActivity(user).criteria = []
            );
            // verify
            enableAddRemoveButtons();
          })
        );

        // need to setup criterias too
        // not a criteria concern to create a new user
        // in this case a manual check is better
        tmp = user.currentActivity ?
          getOrCreateActivity(user) :
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
          getOrSet(this, 'enableAddRemoveButtons', function() {
            if (criteria.checked) {
              getOrCreateActivity(user).certification = [];
            }
            enableAddRemoveButtons();
          })
        );
        // while certified should flag
        // the object as certified and
        // still do the check
        certified.on(
          'change',
          getOrSet(this, 'onCertifiedEnabled', function() {
            if (certified.checked) {
              // right now the certification is just a static flag
              getOrCreateActivity(user).certification = [1];
            }
            enableAddRemoveButtons();
          })
        );
        // what to do after ?
        next.on(
          'click',
          // same trick,
          // this time bound to the walkThrough object
          this.boundTo('onNextActivity', function (e) {
            getOrCreateActivity(user).currentPlace = null;
            this.trigger('step-4', user);
          })
        );
        // verify button status (enable or disable them)
        enableAddRemoveButtons();
        // if both disabled
        if (add.disabled && remove.disabled) {
          // simulate adding a first element
          add.emit('click');
        }
      },



// location
///////////////////////////////////////////////////////////////////////
      'step-4': function (e) {
        // NOTE: e.detail/user is the only variable we can trust
        // inside shared methods across all options
        // (except for all DOM nodes, those are the same)
        var
          user = e.detail,
          activity = getOrCreateActivity(user),
          place = activity.currentPlace || !activity.place.length ?
            getOrCreatePlace(activity) : activity.place[0]
          ,
          fieldSet = $('fieldset#' + e.type)[0],
          icon = $('i', fieldSet)[0],
          places = $('select[name=place]', fieldSet)[0],
          add = $('button[name=add]', fieldSet)[0],
          remove = $('button[name=remove]', fieldSet)[0],
          next = $('button.next', fieldSet)[0],
          category = $('select[name=category]', fieldSet)[0],
          findMe = $('div.map > button', fieldSet)[0],
          fields = $('div.fields > input', fieldSet),
          // fields that should trigger the search
          searchRelevantFields = [
            fields[0],
            fields[2],
            fields[3],
            fields[4],
            fields[5],
            fields[6]
          ],
          optionRelevantFields = [
            fields[0],
            fields[2]
          ],
          enabledAddOrRemove = function () {
            // if there's no latitude, longitude
            // or the icon hasn't been set yet
            next.disabled = add.disabled = (
              place.latitude == null && icon.value != 'question'
            );
            remove.disabled = places.options.length < 2;
          }
        ;

        searchStateIcon.className = searchState.no;

        // which is the currentPlace for this session?
        activity.currentPlace = place.id;

        // be sure searches happen
        // if the user came back to edit
        this.hasExplicitPlace = false;

        // this one contains nested fieldSets
        $('fieldset', fieldSet).forEach(FieldSet.enable);

        // setup the map once
        // use this as flag to setup once
        // everything else too
        if (!this.hasOwnProperty('map')) {

          // bear in mind
          // it's forbidden here to refer
          // outer shortcut instead of fields
          // so activity and place must be retrived each time

          L.tileLayer(
            'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
            {
              attribution: 'Map Tiles &copy; Open MapQuest',
              maxZoom: 18
            }
          ).addTo(
            // one map for all places of all activities
            this.map = L.map('map')
          );

          // helper for map position
          this.setMapView = function setMapView(
            coords, zoom  // zoom is optional
          ) {
            this.map.setView(
              [
                coords.latitude || coords.lat,
                coords.longitude || coords.lng
              ],
              zoom || Math.max(
                14, this.map.getZoom()
              )
            );
          };

          // helper for all places
          this.setPlaceView = function setPlaceView(
            place // same as coords
          ) {
            // remove the previous one
            this.dropMarker();
            // create a new marker
            this.marker = L.marker(
              [
                place.latitude || place.lat,
                place.longitude || place.lng
              ],
              {
                icon:L.icon({
                  iconUrl: '/img/map/' + category.value + '.png',
                  iconSize: [36, 36]
                })
              }
            ).addTo(this.map);
            this.setMapView(place);
            enabledAddOrRemove();
          };

          // simple way to clean the current marker
          this.dropMarker = function () {
            if (this.marker) {
              this.map.removeLayer(this.marker);
              this.marker = null;
            }
          };

          // show curent country by default
          this.setMapView(navigator.country.geo, 5);

          // as it is for step-3, after change,
          // do everything again from the scratch
          places.on('change', function () {
            getOrCreateActivity(user).currentPlace = this.value;
            // trigger again the same event
            e.currentTarget.trigger(e);
          });

          // simplified approach to add new place
          add.on('click', function () {
            var
              activity= getOrCreateActivity(user),
              options = places.options,
              place   = (activity.currentPlace = null) ||
                        getOrCreatePlace(activity),
              option  = places.appendChild(
                          document.createElement('option')
                        )
            ;
            option.append(' - ');
            option.value = place.id;
            places.selectedIndex = options.length - 1;
            places.emit('change');
          });

          // same simplification for the remove action
          remove.on('click', function () {
            var activity = getOrCreateActivity(user);
            activity.currentPlace = null;
            removeGenericObject(
              activity.place,
              places
            );
          });

          // the usual procedure to move forward

          // category should update the icon and whatever is on the map
          // plus it should actually update the place icon too
          category.on(
            'change',
            // same trick used in step-3
            this.onCategoryChange || (
            this.onCategoryChange = function (e) {
              icon.className = 'icon-' + category.value;
              getOrCreatePlace(
                getOrCreateActivity(user)
              ).icon = category.value;
              if (this.marker) {
                this.setPlaceView(this.marker.getLatLng());
              }
            }.bind(this)
          ));

          next.on('click', this.boundTo(function () {
            var result = verifyAllUserData(user);
            if (result === true) {
              this.trigger('step-5', user);
            } else {
              notifyProblemsWithData(result);
            }
          }));

          // perform a search if needed
          searchRelevantFields.on(
            'keyup',
            function (e) {
              if (!this.hasExplicitPlace) {
                // this cannot be greedy since it's a request
                // to an external site. 1 second shoul dbe good enough
                clearTimeout(this.findPlaceTimer || 0);
                this.findPlaceTimer = setTimeout(
                  this.boundTo(checkBeforeSearchingPlace),
                  1000,
                  searchRelevantFields
                );
              }
            }.bind(this)
          );

          // and once the search has been completed ..
          this.on('search:place', function (e) {
            // being asynchronous
            // be sure there's no place explicilty set before
            if (!this.hasExplicitPlace) {
              // we can show the place now
              this.setPlaceView(
                // updating it first, of course
                updatePlacePosition(
                  getOrCreatePlace(
                    getOrCreateActivity(user)
                  ),
                  fields,
                  // will be the coordinates
                  e.detail
                )
              );
            }
          });

          // however, a place might be explicitly positioned
          // through the right click of a mouse
          $('#map').on(
            'contextmenu',
            function contextmenu(e) {
              e.preventDefault();
              e.stopPropagation();
              if (this.hasExplicitPlace) {
                search.address = '';
                searchStateIcon.className = searchState.no;
                this.hasExplicitPlace = false;
                // this is needed if the palce
                // was set wrongly or by accident
                // but we'd like to let the user
                // search again through the fields
                this.dropMarker();
              } else if (
                // inform the user that with right click
                // it is possible to position the place directly
                this.askedUserIfPutAPlaceOnMap ||
                confirm(jslang.pinit)
              ) {
                this.hasExplicitPlace =
                this.askedUserIfPutAPlaceOnMap = true;
                e = this.map.containerPointToLatLng(
                  this.map.mouseEventToContainerPoint(e)
                );
                if (!(isNaN(e.lat) || isNaN(e.lng))) {
                  this.setPlaceView(
                    updatePlacePosition(
                      getOrCreatePlace(
                        getOrCreateActivity(user)
                      ),
                      fields,
                      {
                        latitude: e.lat,
                        longitude: e.lng
                      }
                    )
                  );
                  searchStateIcon.className = searchState.ok;
                }
              }
            }.bind(this)
          );

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

          // when the first filed
          // or the post code one change
          optionRelevantFields.on(
            'keyup',
            function () {
              // update the current option name
              var option = places.options[
                places.selectedIndex
              ];
              option.innerHTML = '';
              option.append(
                optionRelevantFields.map(
                  mapTrimmedValue
                ).join(' - ')
              );
            }
          );

        }

        // if there is a Marker displayed
        // it's from another place so ...
        this.dropMarker(); // drop it!


        // clean up all places/locations
        while (places.options.length) {
          places.options[0].remove();
        }
        // and repopulate them
        activity.place.forEach(function(place, i) {
          // only places that have not been removed
          if (/^remove:/.test(place.id)) return;
          var option = places.appendChild(
            document.createElement('option')
          );
          option.value = place.id;
          option.append(place.address + ' - ' + place.postcode);
          if (place.id == activity.currentPlace) {
            option.selected = 'selected';
            places.selectedIndex = i;
          }
        });

        // cleanup all fields
        fields.forEach(function (input) {
          var value = place && place[input.name] || '';
          if (value.length && input.name === 'twitter') {
            value = '@' + value;
          }
          input.value = value;
        });
        // update relative user data when fields change
        fields.on('keyup', updatePlaceData);
        // but be sure only the right place is updated
        updatePlaceData.target = place;

        // if there is already an icon
        // use it otherwise set it with the default
        changePlaceCategory(
          category,
          place.icon ||
          category.options[0].value,
          icon
        );

        enabledAddOrRemove();

        // position the map, if possible
        if (place.latitude != null) {
          this.setPlaceView(place);
        }

        // no place or just one? no need to bother
        places.disabled = places.options.length < 2;

      },



// terms of use
///////////////////////////////////////////////////////////////////////
      'step-5': function (e) {
        var
          user = e.detail,
          fieldSet = $('fieldset#' + e.type)[0],
          termsOfService = $('div', fieldSet)[0],
          agreed = $('input[type=checkbox]', fieldSet)[0],
          submit = $('input[type=submit]', fieldSet)[0]
        ;
        submit.disabled = true;
        agreed.on(
          'change',
          getOrSet(this, 'onAgreement', function () {
            submit.disabled = !this.checked;
          })
        );
        submit.on(
          'click',
          getOrSet(this, 'onSaveAllTheData', function () {
            var
              // double/triple check before sending
              result = verifyAllUserData(user),
              clone,
              xhr
            ;
            if (result === true) {
              submit.disabled = true;
              // quick and dirty way to clone the object
              clone = JSON.parse(JSON.stringify(user));
              // little cleanup
              delete clone.currentActivity;
              // since places should be packed before being sent
              // gaining a relevant gain in bytes via JSONH
              clone.activities.forEach(packPlaces);
              // console.log(JSON.stringify(clone));console.log(clone);
              xhr = new XMLHttpRequest;
              xhr.open("POST", 'cgi/create.php', true);
              xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
              xhr.setRequestHeader("Cache-Control", "no-cache");
              xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
              xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              xhr.on('readystatechange', function () {
                if (xhr.readyState == 4) {
                  $('fieldset').forEach(FieldSet.enable);
                  switch(xhr.responseText) {
                    case 'OK':          // yeah!
                      alert([jslang.everythingOK].concat(
                        user.firstTimeInHere ? jslang.oneStepLeft : []
                      ).join('\n'));
                      return user.firstTimeInHere ? (
                        location.href = 'http://equolo.org/'
                      ) : location.reload();

                    case 'bad-data':    // something went terribly wrong!
                      alert('bad data');
                      break;

                    default:            // probably connection error
                                        // or server busy, or ... 
                      alert(xhr.responseText || 'connection error');
                      break;
                  }
                  submit.disabled = false;
                }
              });
              xhr.send('info=' + encodeURIComponent(JSON.stringify(clone)));
            } else {
              notifyProblemsWithData(result);
            }
          })
        );
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

  function stop(e) {
    e.preventDefault();
    (e.stopImmediatePropagation || e.stopPropagation).call(e);
  }


///////////////////////////////////////////////////////////////////////
////                        <<< EMAIL >>>
///////////////////////////////////////////////////////////////////////

  // used to expand JSONH records once verified
  function unpackPlaces(activity) {
    activity.place = JSONH.unpack(activity.place);
  }

  // used to save and check the user email
  function verifyEmail(controller, input) {
    var
      value = input.value.trim().toLowerCase(),
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
      user.email = value;
    }
  }

  // once the email is OK
  function verifyEmailCompleted(e) {
    var detail = e.detail;
    user.currentActivity = null;
    if (detail == null) {
      user.activities = [];
      user.firstTimeInHere = true;
    } else if(typeof detail == 'object') {
      user.activities = detail;
      if (user.activities.length) {
        // expand via JSONH
        user.activities.forEach(unpackPlaces);
        user.currentActivity = user.activities[0].id;
      }
    } else {
      // user in but not authenticated
      // or never confirmed the email
      // inform the user and
      // ask if a new email should be sent
      // silently failing in the backend
      // if already sent in last 24 hours
      alert(jslang.pleaseConfirmFirst);
      return (location.href = 'http://equolo.org/');
    }
    this.trigger('step-3', user);
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

  // used to drop activities and later on places too
  function removeGenericObject(collection, select) {
    var object = findActivityById(
      collection,
      select.value
    );
    // same logic used for activity
    if (/^new:/.test(object.id)) {
      collection.splice(
        collection.indexOf(object), 1
      );
    } else if(!/^remove:/.test(object.id)) {
      object.id = 'remove:' + object.id;
    }
    select.options[select.selectedIndex--].remove();
    select.emit('change');
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
////                    <<< LOCATION >>>
///////////////////////////////////////////////////////////////////////

  function changePlaceCategory(select, value, icon) {
    for (var options = select.options, i = options.length; i--;) {
      if (options[i].value == value) {
        select.selectedIndex = i;
        options[i].selected = true;
        icon.className = 'icon-' + value;
      } else {
        options[i].selected = false;
      }
    }
  }

  function onSearchResult(result) {
    // if there is actually a result
    if (result && result.length) {
      searchStateIcon.className = searchState.ok;
      // notify the walkThrough object
      this.trigger(
        'search:place',
        {
          latitude: result[0].lat,
          longitude: result[0].lon
        }
      );
    } else if(
      // maybe there was some problem
      // with the way the address was written ?
      /^[0-9][\w-]*|[0-9][\w-]*$/.test(
        search.fields[0]
      )
    ) {
      search.fields[0] = search.fields[0]
        .replace(
          RegExp.lastMatch, ''
        )
        .replace(
          /[,;]/, ''
        ).trim()
      ;
      // give it just another try without that part
      search.call(this, search.fields);
    } else {
      searchStateIcon.className = searchState.error;
    }
  }

  function search(fields, previousClassName) {
    var
      address = fields.join(', '),
      script, i;
    // avoid duplicated searches for the same address
    if (search.address != address) {
      // remember last search to avoid repeating same searches
      search.address = address;
      // also remember fields to change later on
      // if necessary only the first one
      search.fields = fields;
      // if any previous result is still waiting for an answer
      // just make its call pointless
      i = JSONPid++;
      while (i--) window[JSONPrefix + i] = Object;
      // what to do once invoked ?
      window[JSONPrefix + JSONPid] = this.boundTo(onSearchResult);
      // common JSONP operations
      script = document.body.appendChild(
        document.createElement('script')
      );
      // drop the script once laoded
      // or even if an error occurred
      script
        .on('load', script.remove)
        .on('error', script.remove)
      ;
      script.type = 'text/javascript';
      // special thanks to openstreetmap.org !
      script.src =  'http://nominatim.openstreetmap.org/' +
                    'search?format=json&json_callback=' +
                    JSONPrefix + JSONPid +
                    '&q=' + encodeURIComponent(address);
    } else {
      searchStateIcon.className = this.marker ?
        searchState.ok : searchState.error;
    }
  }

  // used to search via JSONP a place
  function checkBeforeSearchingPlace(fields) {
    var values = fields
      .map(mapTrimmedValue)
      .filter(filterTrimmedValue)
    ;

    // JSONP calls are expensive for both client and server
    // so let's try to avoid unnecessary calls. How ?
    // If at least 4 values are not specified
    // there's no reason to trigger any request
    if (3 < values.length) {
      searchStateIcon.className = searchState.searching;
      // otherwise we can bother the remote server
      // hoping these info will be enough
      search.call(
        // `this` is the walkThrough object
        this,
        // the address to search
        values
      );
    }
  }

  // same Activity logic for place
  function getOrCreatePlace(activity) {
    if (!activity.currentPlace) {
      activity.place.push({
        // create a temporary client side only place
        id: (activity.currentPlace = 'new:'.concat(++uid)),
        icon: '',
        latitude: null,
        longitude: null,
        address: '',
        extra: '',
        postcode: '',
        city: '',
        county: '',
        state: '',
        country: '',
        email: '',
        phone: '',
        website: '',
        twitter: '',
        gplus: '',
        facebook: ''
      });
    }
    // still same logic recycled
    return findActivityById(
      activity.place,
      activity.currentPlace
    );
  }

  // avoid empty fields in the search address
  function filterTrimmedValue(value) {
    return 0 < value.length;
  }

  // avoid unnecessary spaces
  function mapTrimmedValue(input) {
    return input.value.trim();
  }

  function notifyProblemsWithData(result) {
    alert([
      'uhm, something does not seem right',
      '----------------------------------',
      result.join('\n'),
      '----------------------------------',
      'it looks like something is wrong with the data',
      'please verify the following:',
      '  1. every activity has at least one place',
      '  2. there are no places without a location',
      '  3. every place has at least 4 address fields',
      '  4. every place has a specific icon'
    ].join('\n'));
  }

  // every time an input is changed
  // the corresponding plce should be updated
  function updatePlaceData(e) {
    var input = e.currentTarget;
    updatePlaceData.target[input.name] = input.value;
  }

  // keeps in sync place position and relative field
  function updatePlacePosition(place, fields, coords) {
    var fLength = fields.length;
    place.latitude = fields[fLength - 2].value = coords.latitude;
    place.longitude = fields[fLength - 1].value = coords.longitude;
    // just convinient
    return place;
  }

  // used to check all user data
  function verifyAllUserData(user) {
    var result = [];
    if (!RE_EMAIL.test(user.email)) {
      return result.push('wrong email address') && result;
    }
    return  user.activities.every(verifyActivity, result) ||
            result.reverse();
  }

  // helper for each activity
  function verifyActivity(activity, i, arr) {
    return (
      // the activity has a name
      activity.name.trim().length &&
      // there is at least one description
      (arr = Object.keys(activity.description)) && arr.length &&
      // it is not empty
      activity.description[arr[0]].trim().length &&
      (
        // the activity is certified
        activity.certification.length ||
        // the amount of criteria is reasonable
        3 < activity.criteria.length
      ) &&
      (
        (
          // there are no palces
          !activity.place.length &&
          // 'cause the activity should be removed
          /^remove:/.test(activity.id)
        )
        || // or .. 
        (
          // there are places
          activity.place.length &&
          // and these are all valid
          activity.place.every(verifyPlace, this)
        )
      ) &&
      // last but not least
      !!activity.id
    ) || !this.push('[activity] ' + (activity.name || '?'));
  }

  // helper for each place
  function verifyPlace(place) {
    /** debugging purpose only
    console.log(
      RE_VALID_GEO.test(place.latitude),
      RE_VALID_GEO.test(place.longitude),
      place.address.trim(),
      place.postcode.trim().length +
      place.city.trim().length +
      place.county.trim().length +
      place.state.trim().length +
      place.country.trim().length,
      place.icon,
      place.id
    );
    //*/
            // there is a palce and it's valid
    return  (
      RE_VALID_GEO.test(place.latitude) &&
      RE_VALID_GEO.test(place.longitude) &&
      // there is an address
      place.address.trim().length &&
      // at least 4 other fields
      3 < (
        place.postcode.trim().length +
        place.city.trim().length +
        place.county.trim().length +
        place.state.trim().length +
        place.country.trim().length
      ) &&
      // there is an icon and it's not the default one
      place.icon && place.icon != 'question' &&
      // last but not least
      !!place.id
    ) || !this.push('  ' +
                    (place.address || '?') +
                    ' - ' +
                    (place.postcode || '?')
                  );

  }

  // @link https://github.com/WebReflection/JSONH
  function packPlaces(activity) {
    activity.place = JSONH.pack(activity.place);
    // some clean up here too ^_^
    delete activity.currentPlace;
  }


///////////////////////////////////////////////////////////////////////
////                        <<< INIT >>>
///////////////////////////////////////////////////////////////////////

  function getOrSet(self, method, callback) {
    return self[method] || (self[method] = callback);
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

  // disable all fields by default
  $('fieldset').forEach(FieldSet.disable);

  // let's start with step 1 :-)
  walkThrough.trigger('step-1');

});