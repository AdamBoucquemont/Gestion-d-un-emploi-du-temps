// définition de l'objet de type question

// constructeur de cette objet avec 5 attirbuts.
var Question = function(titre, quest, rep, bonneRep, type){
    // représente le titre de la question
	this.titre = titre;
    // c'est le contenu de la question
    this.quest = quest;
    // le tableau contenant les réponses
	this.rep = [].concat(rep);
    // un tableau contenant les bonnes réponses
    this.bonneRep = [].concat(bonneRep);
    // le type de la question
    this.type = type;
}

// Cette fonction permet de voir si deux questions sont identiques
Question.prototype.ComparerQuestions = function (q2) {
  return (
    // on compare chaque élément 2 à 2
    comparerChaines(this.titre, q2.titre) &&
    comparerChaines(this.type, q2.type) &&
    comparerChaines(this.quest, q2.quest) &&
    comparerrep(this, q2)
  );
};

// permet de comparer juste un élément de la question pour le renvoyer dans la fonction d'avant
function comparerChaines(s1, s2) {
  return s1 == s2;
}

// permet de comparer deux réponses
function comparerrep(q1, q2){
    if(q1.rep.length != q2.rep.length){return false;}
    for(var index=0; index<q1.rep.length; index++){
        if(q1.rep[index] != q2.rep[index]){return false;}
    }
    if(q1.bonneRep.length != q2.bonneRep.length){return false;}
    for(var index=0; index<q1.bonneRep.length; index++){
        if(q1.bonneRep[index] != q2.bonneRep[index]){return false;}
    }
    return true;
}

// donne le type d'uen question
Question.prototype.type = function(){
	return this.type;
};

// compare le type de deux questions
Question.prototype.compare = function(Question2){
	if (this.type == Question2.type) {
        return true;
    }
    else {
        return false;
    }
};

// regarde si deux questions sont équivalentes
Question.prototype.equivalent = function(Question2){
	if (this == Question2) {
        return true;
    }
    else {
        return false;
    }
};

// la méthode toString permet d'écrire tous les éléments utiles quand on veut afficher une question
Question.prototype.toString = function(){
    return("Titre : " + this.titre +
            "\nQuestion : " + this.quest + 
            "\nType de question : " + this.type+
            "\nRéponses : " + this.rep+
            "\nBonne réponse : " + this.rep[this.bonneRep[0]]);
}

module.exports = Question;
