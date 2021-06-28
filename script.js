var jokes = [];
var list_favoris = [];
var count = 0;

// ========== AJAX ========== //

function ajaxGetRequest(callback, url, async) {
  var responseField = document.getElementById("bloc-resultats");
  responseField.innerHTML = "";

  // crée un nouvel élément div
  var p = document.createElement("p");
  // et lui donne un peu de contenu
  p.innerHTML = '<img src="images/attente-ajax.gif" alt="Veuillez patienter" width=30>';
  // ajoute le nœud texte au nouveau div créé
  responseField.append(p);


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
  //{n est un JSON} => {Parse les "joke" pour les mettre dans le tableau jokes}
  joke = JSON.parse(n)

  for (var i = 0; i < 565; i++) {
    jokes[i] = joke.value[i].joke;
  }
  var responseField = document.getElementById("bloc-resultats");
  responseField.innerHTML = "";

  search();
}

// ========== function ========== //

function init() {
  //ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/', true);

  jokes = ["michel", "4", "ever", "2", "night"];

  favoris = localStorage.getItem('favoris');

  for (var i = 0; i < list_favoris.length; i++) {
    createFav(list_favoris[i]);

    list_favoris = list_favoris.push(newFav);
  }

}

// ===== changement de nom via ma deuxième bar ===== //
function changeName() {
  var fullname = document.getElementById("bar-nom").value;
  var splitName = fullname.split(" ");

  jokes = [];

  if (fullname == "") {
    ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/', true);
  }
  else if (splitName[0] != undefined && splitName[1] != undefined){
    ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/' + "?firstName=" + splitName[0] + "&lastName=" + splitName[1], true);
  }
  else {
    ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/' + "?firstName=" + splitName[0] + "&lastName=", true);
  }
}

// ==== rechercher ===== //

// === enter === //
function searchEnter(key) {
  var x = key.which || key.keyCode;
  if (x == 13) {
    search();
  }
}

// === recherche === //
function search() {
  var value = document.getElementById("bar-recherche").value;
  var searchResponse = [];
  for (var i = 0; i < jokes.length; i++) {
    if (jokes[i].search(value) != -1) {
      searchResponse.push(jokes[i]);
    }
  }

  addAutoCompetion(value);

  var responseField = document.getElementById("bloc-resultats");
  responseField.innerHTML = "";

  if (searchResponse.length == 0) {
    // crée un nouvel élément div
    var p = document.createElement("p");
    // et lui donne un peu de contenu
    p.innerHTML = "( &empty; Aucun résultat trouvé pour " + value + " )";
    p.setAttribute('class', 'info-vide');
    // ajoute le nœud texte au nouveau div créé
    responseField.append(p);
  }

  else {
    for (var i = 0; i < searchResponse.length; i++) {
      var p = document.createElement("p");
      // et lui donne un peu de contenu
      p.innerHTML = searchResponse[i];
      p.setAttribute('class', 'res');
      // ajoute le nœud texte au nouveau div créé
      responseField.append(p);
    }
  }

}

// === Favoris === //
// === add favoris === //
function addFavoris() {
  var search = document.getElementById("bar-recherche").value;

  if (search != '') {
    createFav(search);

    list_favoris.push(search);
    //localStorage.setItem('favoris', list_favoris);

    var btn_favoris = document.getElementById('btn-favoris');
    btn_favoris.setAttribute('onclick', 'removeFavoris()')

    var etoile = document.getElementById('eto-favoris');
    etoile.setAttribute('src', 'images/etoile-pleine.svg')
  }
}

// === removeFavoris === //
function removeFavoris(elem) {

  if (elem == undefined) {
    var elem = document.getElementById("bar-recherche").value;
    elem = document.getElementById(elem);
  }

  var index = list_favoris.indexOf(elem);

  list_favoris.splice(index, 1);

  //localStorage.setItem('favoris', list_favoris);

  var btn_favoris = document.getElementById('btn-favoris');
  btn_favoris.setAttribute('onclick', 'addFavoris()')

  var etoile = document.getElementById('eto-favoris');
  etoile.setAttribute('src', 'images/etoile-vide.svg')

  var elem = elem.parentElement;

  //localStorage.removeItem(elem.id);// supression de l'élément dans le localStorage
  elem.remove();
}

function cheakFav() {
  var search = document.getElementById("bar-recherche").value;
  if (list_favoris.includes(search)) {
    var btn_favoris = document.getElementById('btn-favoris');
    btn_favoris.setAttribute('onclick', 'removeFavoris()')

    var etoile = document.getElementById('eto-favoris');
    etoile.setAttribute('src', 'images/etoile-pleine.svg')
  }
  else {
    var btn_favoris = document.getElementById('btn-favoris');
    btn_favoris.setAttribute('onclick', 'addFavoris()')

    var etoile = document.getElementById('eto-favoris');
    etoile.setAttribute('src', 'images/etoile-vide.svg')
  }
}

function useFav(span) {
  document.getElementById("bar-recherche").value = span.innerText;
  search();
}

function createFav(fav) {
  var favoris = document.getElementById('liste-favoris');

  var newLi = document.createElement('li');

  var newSpan = document.createElement('span');
  newSpan.setAttribute('title', 'Cliquer pour relancer la recherche');
  newSpan.setAttribute('onclick', 'useFav(this)')
  newSpan.innerHTML = fav;

  var newImg = document.createElement('img');
  newImg.setAttribute('id', `${fav}`);
  newImg.setAttribute('src', 'images/croix.svg');
  newImg.setAttribute('alt', 'Icone pour supprimer le favori');
  newImg.setAttribute('width', 15);
  newImg.setAttribute('title', 'Cliquer pour supprimer le favori');

  newImg.setAttribute('onclick', `removeFavoris(this)`)

  favoris.append(newLi);
  newLi.append(newSpan);
  newLi.append(" ");
  newLi.append(newImg);
}

// === autocompletion === //

function addAutoCompetion(recherche){
  var datalist = document.getElementById("search-list");

  var double = false;

  for (var i = 0; i < datalist.children.length; i++) {
    if(datalist.children[i].value == recherche) {
      double = true;
    }
  }

  if (!double) {
    var p = document.createElement("option");
    // et lui donne un peu de contenu
    p.textContent = recherche;
    // ajoute le nœud texte au nouveau div créé
    datalist.append(p);
  }

}
