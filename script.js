jokes = []

// ========== AJAX ========== //

function ajaxGetRequest(callback, url, async) {
  var xhr = new XMLHttpRequest(); // Création de l'objet
  // Définition de la fonction à exécuter à chaque changement d'état
  xhr.onreadystatechange = function() {
    if (callback && xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // Si le serveur a fini son travail (XMLHttpRequest.DONE = 4)
      // et que le code d'état indique que tout s'est bien passé
      // => On appelle la fonction callback en lui passant la réponse
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, async); // Initialisation de l'objet
  xhr.send(); // Envoi de la requête
}

function jokesPush(n) {
  joke = JSON.parse(n)
  if (joke.type == "success") {
    jokes.push(joke.value.joke);
  }
}

// ========== function ========== //

function init() {
  for (var i = 1; i < 566; i++) {
    ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/' + i, true);
  }
}
