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
        <media>
          <audio clipBegin="30s" clipEnd="40s" repeatCount="1" soundLevel="+5dB"  src="https://actions.google.com/sounds/v1/ambiences/crickets_with_distant_traffic.ogg"></audio>
        </media>
        <media  xml:id="welcome">
          <speak>
            Je peux vous aider dans votre réservation, mais également vous faire découvrir l’univers Center Parcs.
          </speak>
        </media>
        <media begin="welcome.end+0s">
        <speak>
          Avez-vous déjà réservé un séjour ?
        </speak>
       </media>
      </par>
    </speak>
  `,
  'askNumber': ssml`
    <speak>
    <seq>
        <media>
          <speak>
          Très bien, pouvez-vous m’indiquer votre numéro de réservation s'il vous plaît?
          </speak>
        </media>
        <media>
          <speak>
            Pour rappel, le numéro est présent sur chacun de vos emails Center Parcs mais également sur le site CenterParcs.fr, espace mon compte.
          </speak>
        </media>
      </seq>
    </speak>
  `,
  'chooseAction': ssml`
    <speak>
      <seq>
        <media xml:id="choose">
          <speak>
          C’est parti Lester, vous désirez:\n\n
          </speak>
        </media>
        <media xml:id="action1" begin="choose.end+0.5s">
          <speak>
            Réserver des activités.
          </speak>
        </media>
        <media  xml:id="action2" begin="action1.end+0.5s">
          <speak>
            Ajouter des options à votre réservation.
          </speak>
        </media>
        <media xml:id="action3" begin="action2.end+0.5s">
          <speak>
            Recevoir des informations sur le parc Le Lac d'Ailette.
          </speak>
        </media>
        <media xml:id="action4" begin="action3.end+0.5s">
          <speak>
          Ou alors, faire la liste des choses à ne pas oublier?
          </speak>
        </media>
      </seq>
    </speak>
  `,
  'chooseActivites': ssml`
    <speak>
      <seq>
        <media xml:id="choose">
          <speak>
          Ok ! pour quelle activité :
          </speak>
        </media>
        <media xml:id="action1" begin="choose.end+0.5s">
          <speak>
          Mini golf, 
          </speak>
        </media>
        <media  xml:id="action2" begin="action1.end+0.5s">
          <speak>
          Paint ball, 
          </speak>
        </media>
        <media xml:id="action3" begin="action2.end+0.5s">
          <speak>
          Bowling, 
          </speak>
        </media>
        <media xml:id="action4" begin="action3.end+0.5s">
          <speak>
         ou Tennis?
          </speak>
        </media>
      </seq>
    </speak>
  `,
  'tennisActivites': ssml`
    <speak>
      <seq>
        <media>
          <speak>
          Ok, c’est noté !
          </speak>
        </media>
        <media xml:id="choose">
          <speak>
          Les horaires disponibles sont :
          </speak>
        </media>
        <media xml:id="action1" begin="choose.end+0s">
          <speak>
          <say-as interpret-as="time" format="hms24">15h</say-as>,
          </speak>
        </media>
        <media  xml:id="action2" begin="action1.end+0s">
          <speak>
          <say-as interpret-as="time" format="hms24">17h</say-as>, 
          </speak>
        </media>
        <media xml:id="action3" begin="action2.end+0s">
          <speak>
          et <say-as interpret-as="time" format="hms24">19h</say-as>.
          </speak>
        </media>
        <media begin="action3.end+0.2s">
        <speak>
          Quel horaire vous conviendrait ?
        </speak>
      </media>
      </seq>
    </speak>
  `,
};

const fallBackResponse = {
  didNotUnderstand: `Désolé, je ne vous ai pas compris. Pouvez-vous répéter s'il vous plait?`,
};

const welcomeResponse = {
  welcome: `Bonjour, bienvenue sur Center Parcs Assistant.`,
};

module.exports = {welcomeResponse, fallBackResponse, speach};
