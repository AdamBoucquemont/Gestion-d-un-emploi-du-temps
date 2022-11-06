// ce document montre comment est construit l'objet d'un ensemble de question :

// nous avons tout d'abord besoin de l'objet : question
const Question = require('./Question');

// constructeur de cet objet (c'est un tableau de questions)
var EnsQuestion = function(){
    this.questions = []; 
}

// permet d'ajouter une question
EnsQuestion.prototype.Ajoute = function(question){
    this.questions.push(question);
};

// permet de voir le nombre de questions dans un ensemble de questions
EnsQuestion.prototype.Card = function(){
	return this.questions.length;
};

// permet de supprimer une question
EnsQuestion.prototype.Supprime = function(question){
	var position = this.questions.indexOf(question);
    this.questions.splice(position, 1);
};

// permet de voir si l'ensemble est vide 
EnsQuestion.prototype.EstVide = function(){
	if (this.nombreQuestion == 0 ) {
		return true;
	}
	else {
		return false;
	}
};

// permet de voir si une fonction appartient à un ensemble
EnsQuestion.prototype.Appartient = function(Question){
	var appartient;
	appartient = false;
	for (var i = 0; i<this.length;i++){
		if(this.Question[i].fichier === Question.fichier && this.Question[i].numQ === Question.numQ){
			appartient = true;
		}
	}
	return appartient;
};

// permet de voir le nombre de question dans chaque types
EnsQuestion.prototype.CardType = function(){
    var nombreQuestionQCM;
    var nombreQuestionVF;
    var nombreQuestionMM;
    var nombreQuestionC;
    var nombreQuestionN;
    var nombreQuestionQO;
	return this.nombreQuestionQCM, this.nombreQuestionVF, this.nombreQuestionMM, this.nombreQuestionC, this.nombreQuestionN, this.nombreQuestionQO;
};


module.exports = EnsQuestion;