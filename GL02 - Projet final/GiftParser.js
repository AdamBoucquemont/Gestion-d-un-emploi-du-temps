// le parser va permettre de parcourir des fichiers et de découpé des questions qu'il va ranger dans un objet de type question (entre autre).

// définition des nouveaux types que l'on a crée
let Question = require("./Question");
let EnsQuestion = require("./EnsQuestion");
const { array } = require("vega");

// GiftParser

var GiftParser = function(sTokenize, sParsedSymb) {
    // liste des symboles agissant comme un séparateur
    this.symb = ["::", "{", "}", "~", "=", "#"];
    this.showTokenize = sTokenize;
    this.showParsedSymbols = sParsedSymb;
    this.errorCount = 0;
};

// Parser procedure

GiftParser.prototype.tokenize = function(data){
	var separator = /(\r\n|::{})/;
	data = data.split(separator);
	console.log(data);
	data = data.filter((val, idx) => !val.match(separator)); 					
	return data;
}

// parse : analyze data by calling the first non terminal rule of the grammar
GiftParser.prototype.parse = function(data){
	var tData = this.tokenize(data);
	if(this.showTokenize){
		console.log(tData);
	}
	this.Collection(tData);
}

// Cette fonction va permettre de créé un objet de type question 
GiftParser.prototype.createQuestion = function(dataNonTraite) {
    // création d'un nouvel ensemble de questions
    let EnsembleQuestion = new EnsQuestion();
    let data = dataNonTraite.split(/\:{2}/);
    // création de variables associées aux questions et aux réponses
    var bonneRep = new Array();
    var rep = new Array();


    let question, titre, quest, type;

    // on parcours les données pas encore traités
    for (let i = 0; i < data.length; i++) {
        if (
            /^\/{2}/gm.test(data[i]) ||
            /\$CATEGORY\:/.test(data[i]) ||
            !data[i].trim()
        )
            continue;
        else {
            titre = data[i];
            quest = data[i + 1];
            quest = /^\/\//gm.test(quest) ? quest.replace(/\/{2}[\s\S].*/gm, "") : quest;
            // créé une nouvelle question avec tout ces paramètres
            question =  new Question(titre, quest, rep, bonneRep, type);

            type = this.trouverTypeQuestion(question);
            reponsetot = this.trouverReponseEtIndiceDeBonneReponse(quest, type);
            question.rep = reponsetot.rep;
            question.bonneRep =reponsetot.bonneRep;
            question.quest = quest.slice(0, quest.indexOf('{')-1) + quest.slice(quest.indexOf('}')+1,quest.indexOf('\r'));
            EnsembleQuestion.Ajoute(question);
            i += 1;
        }
    }

    // permet de redonner l'ensemble de questions
    return EnsembleQuestion;
};

// défintion de l'ensemble de questions
GiftParser.prototype.EnsQuestion = function(input){
	this.Question(input);
	this.expect("\n \n", input);
}

// définition de la question
GiftParser.prototype.Question = function(input){

	if(this.check("::", input)){
		this.expect("::", input);
		var args = this.body(input);
		var p = new Question(args.tit, args.q);
		this.expect("\n::",input);
		this.parsedQuestion.push(p);
		if(input.length > 0){
			this.Question(input);
		}
		return true;
	}else{
		return false;
	}

}

// défintion du corps d'une question
GiftParser.prototype.body = function(input){
	var nm = this.title(input);
	var ltlg = this.q(input);
	return { tit: tit, q:q };
}

// le titre
GiftParser.prototype.titre = function(input){
	var curS = this.next(input);
	if(matched = curS.match(/[\wàéèêîù'\s]+/i)){
		return matched[0];
	}else{
		this.errMsg("Invalid title", input);
	}
}

// la question
GiftParser.prototype.quest = function(input){
	var curS = this.next(input);
	if(matched = curS.match(/[\wàéèêîù'\s]+/i)){
		return matched[0];
	}else{
		this.errMsg("Invalid question", input);
	}
}

// Cette fonction du parser permet de trouver la bonne réponse et ou elle est 
GiftParser.prototype.trouverReponseEtIndiceDeBonneReponse = function(quest, type) {
    var bonneRep = new Array();
    var rep = new Array();

    // permet de voir le type de chaque question
    if (type === "QCM") {
        rep = quest.match(/[\~\=]\=?[a-zA-Z0-9\s]*[^\~\=\}]/gm);
        rep = rep.map((reponse) => reponse.trim());
        let j = 0;
        for (let i = 0; i < rep.length; i++) {
            if (rep[i].includes('=')) {
                bonneRep[j] = i;
                j = j + 1;
            }
            rep[i] = rep[i].slice(1);
        }


    // si c'est vrai faux
    } else if (type === "Vrai/Faux") {
        rep = quest.match(/\{[TF][A-Z]*\}/gm)[0].replace(/[\{\}]/gm, "");
        if (rep.includes('T')){
            rep = new Array();
            rep[0] = "True";
            rep[1] = "False";
            bonneRep[0] = 0;

        }
        else if( rep[0].includes('F')){
            rep = new Array();
            rep[0] = "True";
            rep[1] = "False";
            bonneRep[0] = 1;


        }


        // il se passe la même chose pour les questions courtes

    } else if (type === "courte-response") {
        rep = quest.match(/\==?[a-zA-Z0-9\s]*[^\~\=\}]/gm);
        rep = rep.map((reponse) => reponse.trim());
        let j = 0;
        for (let i = 0; i < rep.length; i++) {
            if (rep[i].includes('=')) {
                bonneRep[j] = i;
                j = j + 1;
            }
        }

        // pour les questions numériques
    } else if (type === "Numerique") {
        rep = quest.match(/\{\#\=?[\s\d\.\:\=\%]*\}/gm)[0].replace(/[\{\}]/gm, "");
        bonneRep[0] = 0;
    } else if (type === "Correspondance") {
        rep = quest.match(/\=[\w\d\s\(\)\[\]\-\>\*\.\#\@\$\%\'\"\^]*/gm);
        rep = rep.map((reponse) => reponse.trim());

        // pour les mots manquants
    } else if (type === "Mot") {
        rep = quest.match(/[\~\=]\=?[a-zA-Z0-9\s]*[^\~\=\}]/gm);
        rep = rep.map((reponse) => reponse.trim());
        let j = 0;
        for (let i = 0; i < rep.length; i++) {
            if (!rep[i].includes('~')) {
                bonneRep[j] = i;
                j = j + 1;
            }
            rep[i] = rep[i].slice(rep[i].indexOf('=')+1);
        }


        // pour les questions ouvertes
    } else if (type === "Ouverte") {
        rep = [true];
    } else rep = null;

    return {
        rep,
        bonneRep
    }

    //  return answers;
};

// permet de voir si c'est bien rentrée
GiftParser.prototype.check = function(s, input){
	if(this.accept(input[0]) == this.accept(s)){
		return true;	
	}
	return false;
}

// permet d'accepter ce qui est rentré
GiftParser.prototype.accept = function(s){
	var idx = this.symb.indexOf(s);
	// index 0 exists
	if(idx === -1){
		this.errMsg("symbol "+s+" unknown", [" "]);
		return false;
	}

	return idx;
}

// permet de dire ce à quoi on s'attend
GiftParser.prototype.expect = function(s, input){
	if(s == this.next(input)){
		//console.log("Reckognized! "+s)
		return true;
	}else{
		this.errMsg("symbol "+s+" doesn't match", input);
	}
	return false;
}


// Parser operand

GiftParser.prototype.errMsg = function(msg, input){
	this.errorCount++;
	console.log("Parsing Error ! on "+input+" -- msg : "+msg);
}

// Read and return a symbol from input
GiftParser.prototype.next = function(input){
	var curS = input.shift();
	if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS
}


// cette fonction permet de trouver le type d'une question
GiftParser.prototype.trouverTypeQuestion = function(question) {
    var separatorQuestionText = question.quest.split(/\{([\s\S]*?)\}/gm);
    separatorQuestionText = separatorQuestionText.filter((e) => {
        e.trim();
        return e != false;
    });

    if (separatorQuestionText.length > 1) {
        if (
            ["T", "F", "TRUE", "FALSE"].find(
                (r) => r == separatorQuestionText[1].trim()
            ) !== undefined
        ) {
            question.type = "Vrai/Faux";
        } else if (/\-\>/gm.test(separatorQuestionText[1])) {
            question.type = "Correspondance";
        } else if (/^\#/.test(separatorQuestionText[1].trim()) || /^\#/.test(separatorQuestionText[0].trim())) {
            question.type = "Numerique";
        } else if (
            /[\~\=]/gm.test(separatorQuestionText[1]) ||
            /[\~\=]/gm.test(separatorQuestionText[0])
        ) {
            if (separatorQuestionText.length == 2) {
                if (
                    /\=/gm.test(separatorQuestionText[1]) &&
                    !/\~/gm.test(separatorQuestionText[1]) &&
                    separatorQuestionText[1].match(/\=/gm).length >= 2
                ) {
                    question.type = "courte-response";
                } else question.type = "QCM";
            } else if (separatorQuestionText.length >= 3) {
                if (separatorQuestionText[2].trim().length > 1) {
                    question.type = "Mot";
                } else {
                    if (
                        /\=/gm.test(separatorQuestionText[1]) &&
                        !/\~/gm.test(separatorQuestionText[1]) &&
                        separatorQuestionText[1].match(/\=/gm).length >= 2
                    ) {
                        question.type = "courte-response";
                    } else if (separatorQuestionText[1].match(/[\~\=]/gm).length >= 2) {
                        question.type = "QCM";
                    } else question.type = "Mot";
                }
            }
        } else {
            question.type = "Ouverte";
        }
    } else {
        var regexOuverte = /.+{}/gm;
        if(question.quest.match(regexOuverte)){
            question.type = "Ouverte";
        } else {
            question.type = "non-determine";
        }
    }

    return question.type;
};
module.exports = GiftParser;