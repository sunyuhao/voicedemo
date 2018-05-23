// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
const querystring = require('querystring');
const http = require('http');
const app = require('actions-on-google').dialogflow({debug: true});
const {
  welcomeResponse,
  fallBackResponse,
  speach,
} = require('./responses');
const {ssml, validReservation} = require('./utils');
const {
  Suggestions,
 } = require('actions-on-google');
/**
 *
 * Sanitize template literal inputs by escaping characters into XML entities
 * to use in SSML
 * Also normalize the extra spacing for better text rendering in SSML
 * A tag function used by ES6 tagged template literals
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
 *    /Template_literals#Tagged_template_literals
 *
 */
const postCode = () => {
  // Build the post string from an object
  let postData = querystring.stringify({ });

  // An object of options to indicate where to post to
  let postOptions = {
      host: 'http://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-61504645-1&cid=1&dh=voice.centerparcs.fr&dp=%2Ftestyuhao1&dt=Test%20Yuhao%201',
      port: '80',
      path: '',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
      },
  };


  let postReq = http.request(postOptions, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
          console.log('Response: ' + chunk);
      });
  });
  // post the data
  postReq.write(postData);
  postReq.end();
};

app.intent('ask_for_permissions_detailed', (conv) => {
  // Choose one or more supported permissions to request:
  // NAME, DEVICE_PRECISE_LOCATION, DEVICE_COARSE_LOCATION
  const options = {
    context: 'To address you by name and know your location',
    // Ask for more than one permission. User can authorize all or none.
    permissions: ['NAME', 'DEVICE_PRECISE_LOCATION'],
  };
  conv.ask(new Permission(options));
});

const welcome = (conv) => {
  postCode();
  conv.ask(welcomeResponse.welcome,
    speach['greatings']
  );
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    return;
  }

  conv.ask( new Suggestions([
    'Oui',
    'Non',
  ]) );
};

const askReservationNumber = (conv) => {
  conv.ask(
    speach['askNumber']
  );
};


const fallbackNumber = (conv) => {
  conv.ask(fallBackResponse.didNotUnderstand);
};

const inputReservation = (conv, params) => {
  let reservationNumber = params.reservationNumber;
  reservationNumber = reservationNumber.replace(/ /g, '');
  if (!reservationNumber) return fallbackNumber(conv);
  let speachNumber = {
    'number': ssml`
    <speak>
      <seq>
        <media>
          <speak>
            OK! Votre numéro de réservation c\'est: 
          </speak>
        </media>
        <media>
          <speak>
            <say-as interpret-as="characters">` + reservationNumber + `</say-as>
          </speak>
        </media>
        <media>
          <speak>
            C'est ça?
          </speak>
        </media>
      </seq>
    </speak>
    `,
  };
  if (validReservation(reservationNumber)) {
    conv.ask(speachNumber['number'] );
  } else {
    conv.ask('Votre numéro de réservation n\'est pas valide ');
  }

  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    return;
  }

  conv.ask( new Suggestions([
    'Oui',
    'Non',
  ]) );
};

const chooseAction = (conv) => {
  conv.ask(
    speach['chooseAction']
  );
if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    return;
  }

  conv.ask( new Suggestions([
    'Réserver des activités',
    'Ajouter des options',
    'Recevoir des informations',
    'Faire la liste des choses',
  ]) );
};

const chooseActivies = (conv) => {
  conv.ask(
    speach['chooseActivites']
  );
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
      return;
    }

    conv.ask( new Suggestions([
      'Mini golf',
      'Paint ball',
      'Bowling',
      'Tennis',
    ]) );
  };

  const tennisActivies = (conv) => {
    conv.ask(
      speach['tennisActivites']
    );
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
        return;
      }

      conv.ask( new Suggestions([
        '15h',
        '17h',
        '19h',
      ]) );
    };

app.intent('Welcome Intent', welcome);
app.intent('Yes Ask Number', askReservationNumber);
app.intent('input-reservation', inputReservation);
app.intent('input-reservation-yes', chooseAction);
app.intent('Reserver Activites', chooseActivies);
app.intent('Tennis Activites', tennisActivies);
module.exports = app;
