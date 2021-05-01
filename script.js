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
  //Normalement initialisation des Favoris depuis le localStorage
}

function changeName() {
  var fullname = document.getElementById("bar-nom").value;
  var splitName = fullname.split(" ");

  jokes = [];

  if (fullname == "") {
    for (var i = 1; i < 566; i++) {
      ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/' + i, true);
    }
  }
  else if (splitName[0] != undefined && splitName[1] != undefined){
    for (var i = 1; i < 566; i++) {
      ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/' + i + "?firstName=" + splitName[0] + "&lastName=" + splitName[1], true);
    }
  }
  else {
    for (var i = 1; i < 566; i++) {
      ajaxGetRequest(jokesPush, 'http://api.icndb.com/jokes/' + i + "?firstName=" + splitName[0] + "&lastName=", true);
    }  }

}

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
    p.innerHTML = "( &empty; Aucun résultat trouvé )";
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
function favoris(){
  var fav=document.getElementById("bar-recherche").value;
  var favoris = document.getElementById("liste-favoris");
  var cree=true;
  if (fav !=0 && favoris.firstChild !=0 ){
    var i=0;
    do{
      var compar = favoris.childNodes[i];
      compar = compar.innerText;
      fav=fav.trim();
      if(compar===undefined){
      }
      else{
        compar.trim();
      }
      console.log("==================");
      console.log(compar);
      console.log(fav);
      console.log("==================");
      if (compar == fav) {
        cree=false;
      }
      i++;
    }
    while (favoris.childNodes[i]!=favoris.lastChild && cree);
    if(cree){
      let newLi = document.createElement('li');
      let newSpan = document.createElement('span');
      let newImg = document.createElement('img');
      var doc= document.getElementById('liste-favoris');
      let newEto = document.createElement('img');
      newSpan.title="Cliquer pour relancer la recherche"
      newSpan.textContent=fav;
      newSpan.onclick=useFavoris;
      newImg.src="images/croix.svg";
      newImg.alt="Icone pour supprimer le favori"
      newImg.width=15;
      newImg.title="Cliquer pour supprimer le favori";
      newImg.onclick=suprFav;
      doc.append(newLi);
      newLi.append(newSpan);
      newLi.append(" ");
      newLi.append(newImg);
      var etoile=document.getElementById("eto-favoris");
      etoile.src="images/etoile-pleine.svg";
      etoile.alt="Etoile pleine";
      etoile.width="22";
      // Ici se trouve normalement le stockage dans localStorage
      //avec un ID allant de 0 à n, n étant le nombre de favoris
      }
  }
}


// === utiliser les favoris === //
function useFavoris(){
  console.log(this.textContent);
  var contenu=this.textContent;
  var barRecherche=document.getElementById("bar-recherche");
  barRecherche.value=contenu;
}
// === Suprimer un favoris === //
function suprFav(){
  var elem=this.parentElement;
  //localStorage.removeItem(elem.id);// supression de l'élément dans le localStorage
  elem.remove();
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
