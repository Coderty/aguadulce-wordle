// COMMON

var wordleApiBaseUrl;
var wordleAttempts;
var wordleDebugMode = false;
var shareMessage = '';

(function () {
  wordleDebugMode = getDebugMode();
  wordleApiBaseUrl = getBaseApiUrl();
  wordleAttempts = [];

  var wordleId = getWordleId();

  initShareFunctions();

  if (wordleId) {
    iniGame(wordleId);
  } else {
    initHome();
  }
})();

function initShareFunctions() {
  window.wordleShareLink = function () {
    navigator.clipboard.writeText(window.location);
  };

  window.wordleCopyToClipboard = function () {
    navigator.clipboard.writeText(shareMessage);
  };
}

function apiRequest(method, path, data) {
  return fetch(wordleApiBaseUrl + path, {
    method,
    body: data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}

function getBaseApiUrl() {
  return window.location.origin + '/api/wordle';
}

function getGameUrl(wordleId) {
  return window.location.origin + '/' + wordleId;
}

function getWordleId() {
  return window.location.pathname.substring(1).trim().split('?')[0];
}

function getDebugMode() {
  if (window.location.search) {
    var queries = window.location.search.split('?')[1].split('&');
    return queries.indexOf('debug') != -1;
  }
}

// HOME

function initHome() {
  document
    .querySelector('form#create')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      document.querySelector('div#home-form-error-message').textContent = '';

      var formData = JSON.stringify(
        Object.fromEntries(new FormData(event.target))
      );

      try {
        var data = await apiRequest('POST', '', formData);

        if (!data.ok) {
          throw await data.json();
        } else {
          data = await data.json();
          const wordleId = data.wordleId;
          window.location.href = getGameUrl(wordleId);
        }
      } catch (error) {
        document.querySelector('div#home-form-error-message').innerHTML =
          error.error;
      }
    });

  document.querySelector('section#home').style.display = 'block';
}

// GAME

async function iniGame(wordleId) {
  var wordleApiPath = '/' + wordleId;

  var wordCount = await apiRequest('GET', wordleApiPath)
    .then(async function (data) {
      if (!data.ok) Promise.reject();
      data = await data.json();
      return data.wordCount;
    })
    .catch(() => null);

  document.querySelector('span#word-count').textContent = wordCount;

  document
    .querySelector('form#play')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      document.querySelector('div#game-form-error-message').textContent = '';

      var formData = JSON.stringify(
        Object.fromEntries(new FormData(event.target))
      );

      try {
        var data = await apiRequest('POST', wordleApiPath, formData);

        var pokemon = data.headers.get('x-pokemon');
        if (!data.ok) {
          throw await data.json();
        } else {
          data = await data.json();
          processGameResponse({ ...data, pokemon });
        }
      } catch (error) {
        document.querySelector('div#game-form-error-message').innerHTML =
          error.error;
      }
    });

  document.querySelector('section#game').style.display = 'block';
}

function processGameResponse(response) {
  wordleAttempts.push(response);

  var div = document.createElement('div');

  div.classList.add('attempt');

  div.innerHTML = response.emojis
    .map(
      (emoji) =>
        '<span style=" background-color: ' +
        emoji.color +
        '">' +
        emoji.letter +
        '</span>'
    )
    .join('');

  if (wordleDebugMode) {
    div.innerHTML =
      div.innerHTML + '<div class="pokemon">' + response.pokemon + '</div>';
  }

  document.querySelector('div#attempts').appendChild(div);

  if (response.success) {
    endGame();
  }
}

function endGame() {
  document.querySelector('form#play').style.display = 'none';

  shareMessage =
    'Coderty Wordle # ' +
    wordleAttempts.length +
    '/∞\n\n' +
    wordleAttempts
      .map((attempt) => attempt.emojis.map((emoji) => emoji.emoji).join(''))
      .join('\n') +
    '\n\n' +
    window.location;

  document.querySelector('div#results').style.display = 'block';
}
