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
const {welcomeResponse, fallBackResponse, speach} = require('./responses');
const {ssml, validReservation} = require('./utils');

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


// const fallback = (conv) => {
//   conv.ask(completeResponses.didNotUnderstand);
//   conv.ask(completeResponses.examplesList);
// };

// const chooseExample = (conv, params) => {
//   const element = params.element;
//   if (!element) return fallback(conv);
//   conv.ask(completeResponses.leadToExample(element));
//   conv.ask(examples[element]);
// };

const welcome = (conv) => {
  postCode();
  conv.ask(welcomeResponse.welcome);
  conv.ask(speach['greatings']);
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
    <say-as interpret-as="characters">` + reservationNumber + `</say-as>
    C'est ça?
    </speak>
    `,
  };
  if (validReservation(reservationNumber)) {
  conv.ask('OK! Votre numéro de réservation c\'est: ');
  conv.ask(speachNumber['number'] );
  } else {
    conv.ask('Votre numéro de réservation n\'est pas valide ');
  }
};


app.intent('Default Welcome Intent', welcome);
app.intent('input-reservation', inputReservation);


module.exports = app;
