var jokes = []

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


function search() {
  var value = document.getElementById("bar-recherche").value;
  var searchResponse = [];
  for (var i = 0; i < jokes.length; i++) {
    if (jokes[i].search(value) != -1) {
      searchResponse.push(jokes[i]);
    }
  }


  var responseField = document.getElementById("bloc-resultats");

  if (searchResponse.length == 0) {
    // crée un nouvel élément div
    var p = document.createElement("p");
    // et lui donne un peu de contenu
    p.textContent = "( &empty; Aucun résultat trouvé )";
    p.setAttribute('class', 'info-vide');
    // ajoute le nœud texte au nouveau div créé
    console.log(p);
    responseField.append(p);
  }
  else {
    for (var i = 0; i < searchResponse.length; i++) {
      console.log(searchResponse[i]);
      var p = document.createElement("p");
      // et lui donne un peu de contenu
      p.textContent = searchResponse[i];
      p.setAttribute('class', 'res');
      // ajoute le nœud texte au nouveau div créé
      console.log(p);
      responseField.append(p);
    }
  }

}

function favoris(){
  var fav=document.getElementById("bar-recherche").value;
  var favoris = document.getElementById("liste-favoris");
  var cree=true;
  if (fav !=0 && favoris.firstChild !=0 ){
    var i=0;
    do{
      console.log(favoris.childNodes[i]);
      if (favoris.childNodes[i].firstElementChild.innerText==fav) {
        cree=false;
      }
      i++;
    }
    while (favoris.childNodes[i]!=favoris.lastChild);
    if(cree){
      let newLi = document.createElement('li');
      let newSpan = document.createElement('span');
      let newImg = document.createElement('img');
      var doc= document.getElementById('liste-favoris');
      let newEto = document.createElement('img');
      newSpan.title="Cliquer pour relancer la recherche"
      newSpan.textContent=fav;
      newImg.src="images/croix.svg";
      newImg.alt="Icone pour supprimer le favori"
      newImg.width=15;
      newImg.title="Cliquer pour supprimer le favori";
      newLi.append(newSpan);
      newLi.append(" ");
      newLi.append(newImg);
      doc.append(newLi);
      var etoile=document.getElementById("eto-favoris");
      etoile.src="images/etoile-pleine.svg";
      etoile.alt="Etoile pleine";
      etoile.width="22";
      }
  }
}
