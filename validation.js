// les écouteurs d'évènement ne doivent être chargés que lorsque l'arbre DOM est prêt
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("le document est chargé, on peut ajouter des écouteurs");

    // le bouton "submit" provoque l'envoi des données au serveur
    // on va l'en empêcher pour pouvoir vérifier tranquillement le contenu
    document.querySelector("#envoi").addEventListener("click", async function (event) {
        // on bloque l'envoi du formulaire vers le serveur..
        event.preventDefault();
        if (!validerFormulaire()) {
            alert("des erreurs ont été trouvées");
        } else {
            alert("Le formulaire est correct, on envoie au serveur !");
            document.querySelector("#formulaire").submit();
        }

    }, false);
});

// fonction globale de validation du formulaire
function validerFormulaire() {
    if (!validerNom()) {
        return false;
    }

    if (!validerMessage()){
        return false;
    }

    // vous pouvez insérer d'autres éléments de validation ici
    if (!validerTelephone()) {
        return false;
    }

    // si aucune erreur n'a été trouvée, on arrive ici
    return true;
}

// fonction de validation du nom
function validerNom() {
    var nom = document.querySelector("#name").value;
    var taille_mini_nom=3
    if (!verifierTaille(nom, taille_mini_nom)){
        alert(`le nom doit contenir au moins ${taille_mini_nom} caractères`);
        return false;
    } else if (!verifierCaracteresInterdits(nom)) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits
        alert(`le nom ne peut pas contenir de caractères interdits`);
        return false;
    } else {
        return true;
    }
}
// fonction de validation du numéro de téléphone
function validerTelephone() {
    var telephone = document.querySelector("#phone").value;
    var taille_mini_tel=10
    var taille_max_tel=10
    if (!verifierTaille(telephone, taille_mini_tel, taille_max_tel)){
        alert(`Le numéro doit contenir ${taille_mini_tel} caractères`);
        return false;
    } else if (!verifierNumeroTelephone(telephone)) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits
        alert(`Le numéro ne doit contenir que des chiffres`);
        return false;
    } else {
        return true;
    }
}

// fonction de validation du message
function validerMessage(){
    var message = document.querySelector("#msg").value; 
    if (!verifierCaracteresInterdits(message)) {
        alert(`Le message ne peut pas contenir de caractères interdits`);
        return false;
    } else {
        return true;
    }
}

// la chaine doivent avoir une taille d'au moins la taille fournie
function verifierTaille(chaine, taille_mini_chaine) {
    if (chaine.length < taille_mini_chaine) {
        return false;
    }else{
        return true;
    }
}

// les chaines ne peuvent contenir que 
// des lettres 
// des chiffres
// des espaces
// des apostrophes
function verifierCaracteresInterdits(chaine){
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    if(/^[a-zA-Z0-9 ']*$/.test(chaine) == false){
        return false;
    }
    return true;
};

// validation du numéro de téléphone
function verifierNumeroTelephone(chaine){
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    if(/^[0-9 ']*$/.test(chaine) == false){
        return false;
    }
    return true;
};