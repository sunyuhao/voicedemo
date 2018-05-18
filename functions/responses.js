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

/* eslint max-len: 0 */

'use strict';

const {ssml} = require('./utils');

const speach = {
  'greatings': ssml`
    <speak>
      <par>
        <media begin="0.5s">
          <speak>Je peux gérer votre réservation.</speak>
        </media>
        <media xml:id="question" begin="4s">
          <speak>Avez-vous une réservation?</speak>
        </media>
        <media begin="0.5s">
          <audio clipBegin="30s" clipEnd="40s" repeatCount="1" soundLevel="+10dB"  src="https://actions.google.com/sounds/v1/ambiences/crickets_with_distant_traffic.ogg"></audio>
        </media>
      </par>
    </speak>
  `,
};

// const baseResponses = {
//   askExample: 'C\'est center parcs assistant.',
// };

// const elements = Object.keys(speach);

// const completeResponses = {
//   speachList: `You can ask me about ${elements.slice(0, elements.length - 1).join(', ')}` +
//     `, and ${elements[elements.length - 1]}.`,
//   didNotUnderstand: `Sorry, I didn't understand you. ${baseResponses.askExample}.`,
//   welcome: `Bienvenu! ${baseResponses.askExample} ` +
//     `Avez-vous une réservation?`,
//   /**
//    * @param {string} element
//    * @return {string}
//    */
//   leadToExample: (element) => `Ok, here's an SSML example of ${element}.`,
// };

const fallBackResponse = {
  didNotUnderstand: `Désolé, je ne vous ai pas compris. Pouvez-vous répéter s'il vous plait?`,
};

const welcomeResponse = {
  welcome: `Bienvenu! C'est center parcs assistant.`,
};

module.exports = {welcomeResponse, fallBackResponse, speach};
