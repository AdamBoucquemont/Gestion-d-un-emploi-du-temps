// ce sont tous les paramètres que nous avons besoins
const fs = require('fs');
const cli = require("@caporal/core").default;
const Question = require('./Question.js');
const EnsqUESTION = require('./EnsQuestion.js');
const readline = require("readline");
const GiftParser = require("./GiftParser");
const open = require("open");
const rs = require("readline-sync");
const ChartJSImage = require("chart.js-image");

const regexText = /[a-zA-Z ]+/gm;
const regexDigit = /[0-9]+/gm;

cli


	.version('Gift-parser-cli')
	.version('0.07')

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// check Gift
	.command('check', 'Check if <file> is a valid Gift file')
	.argument('<file>', 'The file to check with Gift parser')
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator: cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({ args, options, logger }) => {

		fs.readFile(args.file, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}

			var analyzer = new GiftParser(options.showTokenize, options.showSymbols);
			analyzer.parse(data);

			if (analyzer.errorCount === 0) {
				logger.info("The .Gift file is a valid Gift file".green);
			} else {
				logger.info("The .Gift file contains error".red);
			}

			logger.debug(analyzer.parsedQuestion);

		});

	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// La commande readme permet de lire le fichier README.txt dans le quel tout est expliqué

	.command('readme', 'affiche le readme')
	.action(() => {
		fs.readFile("./README.txt", "utf-8", function (err, data) {
			if (err) { return console.log("erreur dans la lecture du readme !"); }
			console.log(data);
		});
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//permet d'afficher toutes les questions d'une banque de question
	.command('home', "affiche toutes les questions de la banque de questions")
	.argument('<file>', 'The Gift file to search')
	.default()
	.action(({ args, options, logger }) => {
		logger.info();
		if (args.file) {

		} else {
			fs.readdir("./SujetB_data", function (err, files) {
				files.forEach(file => {
					logger.info(file);
				});
			});
		}
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Spec 1
	// permet de créer un fichier
	.command('create', 'Créer le <file>')
	// il faut qu'il soit déja en .gift
	.argument('<file>', 'Le fichier GIFT à créer')
	.action(({ args, options, logger }) => {
		const path = "./"+ args;
		if (!fs.existsSync(path)){
            fs.writeFile(args.file + ".gift", 'utf8', function (err, data) {
                if (err) {
                    return logger.warn(err);
                }
            });
        } else {
            logger.info('Le fichier que vous voulez créer existe deja');
        }


	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// permet de séléctionner et d'ouvrir un fichier
	.command('select', "Selectionne un <file> et l'affiche")
	.argument('<file>', 'Le fichier GIFT à afficher')
	.action(({ args, options, logger }) => {
		fs.readFile(args.file, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}
			/*	data.split('\n::').forEach((element) => {
					Array<String> question;

					question = element.split('::');
					element.
				});
				logger.info(data);

				gifDecoder(data);*/
			logger.info(data);
		});

	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Spec 2
	//Permet de séléctionner et d'ouvrir un fichier, c'est la même fonction que select
	.command('open', "Selectionne un <file> et l'affiche")
	.argument('<file>', 'Le fichier GIFT à afficher')
	.action(({ args, options, logger }) => {
		fs.readFile(args.file, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}
			/*	data.split('\n::').forEach((element) => {
					Array<String> question;

					question = element.split('::');
					element.
				});
				logger.info(data);

				gifDecoder(data);*/
			logger.info(data);
		});

	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// permet d'ajouter une question à un document gift
	.command('add', "ajoute une question au fichier 'destination'")
	.argument('<destination>', 'Le fichier de destination')
	.argument('<source>', 'Le fichier source')
	.argument('<question>', 'numero de la question')
	.action(({ args, options, logger }) => {
		fs.readFile(args.source, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}
			const reg = /\/\/.*/
			data = data.split('\n::');
			let dataIndex;
			for (const datum of data) {
				if (datum.match(reg)){
					dataIndex = data.indexOf(datum);
					data.splice(dataIndex, 1);
				}
			}

			if (data.length !== 0 ){
				if (args.question < 1 || args.question > data.length){
					console.log("Vous desirez ajouter une question qui n'existe pas, " +
						"veuillez saisir le bon index de la question compris entre 1 et " + data.length + " pour ce fichier");
				} else {
					fs.appendFileSync(args.destination, '\n::' + data[args.question - 1]);
					console.log("La question a été ajouté:\n\t" + data[args.question -1]);
				}
			} else {
				console.log("Le fichier que vous avez saisi ne contient aucune question");
			}
		});
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Permet de supprimer une question dans un document gift
	.command('remove', "supprime une question au fichier 'destination'")
	.argument('<source>', 'Le fichier source')
	.argument('<question>', 'numero de la question')
	.action(({ args, options, logger }) => {

		// on commence par lire tout le fichier
		fs.readFile(args.source, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}
			let i = 0;
			let file = "";
			data.split('\n::').forEach((x) => {

				if (i == 0) {
					x = "\n" + x;
					file += x;
				}

				// on recommence à totu réécrire depuis le début tant que l'on est pas sur la question que l'on veut supprimer
				if ((i != parseInt(args.question)) && (i != 0)) {
					x = "\n::" + x;
					file += x;
				}
				// puis on augmente le i jusqu'a ce que ça soit la question qui doit être suppriém
				i++;
			});
			console.log("La question a été supprimé");
			fs.writeFile(args.source, file,
				{
					encoding: "utf8",
					flag: "w",
					mode: 0o666
				},
				(err) => {
				});
		});
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Modify
	.command('modify', 'Modifie l\'ordre des questions dans une GIFT <file>')
	.argument('<file>', 'Le <file> GIFT qui contient les questions à déplacer')
	.argument('<placeQuestion>', 'numéro de la question à changer')
	.argument('<newPlaceQuestion>', 'numéro où mettre la question')
	.action(({ args, options, logger }) => {
		fs.readFile(args.file, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}
			// le modify doit supprimer une question et la rajouter à la toute fin
			let doc="";
			let questionToChange="";
			let i = 0;
			data.split('\n::').forEach((x) => {

				if (i == parseInt(args.placeQuestion)) {
					questionToChange=x;
				}
				i++;
			})

			i = 0;
			data.split('\n::').forEach((x) => {

				if (i == parseInt(args.newPlaceQuestion)){
					doc += "::"+questionToChange;
				}

				if (i != parseInt(args.placeQuestion)) {
					doc+="::"+x;
				}

				i++;
			})

			fs.writeFile(args.file, doc, function (err, data) {
				if (err) {
					return logger.warn(err);
				}
			});

			/*
			let j = 0;
			let file = "";
			data.split('\n::').forEach((x) => {

				if (j != parseInt(args.question)) {
					x = "\n::" + x;
					file += x;
				}
				j++;
			});
			fs.writeFile(args.file, file,
				{
					encoding: "utf8",
					flag: "w",
					mode: 0o666
				},
				(err) => {
				});*/
			console.log("La question a changé de place");
		});
	})



	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// SPEC3 : Vérifie que le test au format GIFT ne contient pas deux fois la même question et comprend entre 15 et 20 questions.
	.command('verify', 'Evaluation de la qualité d’un test')
	.argument('<file>', 'Le fichier GIFT à vérifier')
	.action(({ args, options, logger }) => {
		fs.readFile(args.file, 'utf8', function (err, data) {
			if (err) {
				return logger.warn(err);
			}
			
			let analyzer = new GiftParser();
			//utilisation de tokenize car le parser entier n'est pas fonctionnel
			let stringTab = analyzer.tokenize(data);
			let isNbOk = false;
			let nbQuestions = 0;
			let questions = [];
			for(const str of stringTab){
				//Comme le parser n'est pas bon et qu'il n'est pas question de le refaire on utilise ":"" pour identifier les questions
				//il faudrait normalement utiliser le résultat du parser pour trouver nbQuestions
				if(str.substring(0, 1) === ":"){
					nbQuestions++;
					questions.push(str);
				}
			}
			if(nbQuestions<15){
				console.log("Le test comporte moins de 15 questions.\nIl n'est pas conforme.");
			} else if (nbQuestions>20){
				console.log("Le test comporte plus de 20 questions.\nIl n'est pas conforme.");
			} else {
				console.log("Le test comporte entre 15 et 20 questions.");
				isNbOk = true;
			}

			let isNoSame = true;
			for(let i = 0; i < questions.length; i++){
				for(let j = i+1; j < questions.length; j++){
					if(questions[i] === questions[j]){
						isNoSame = false;
					}
				}
			}
			if(isNoSame){
				console.log("Le test ne comporte pas de questions en double.");
			} else if (isNoSame && isNbOk){
				console.log("Le test ne comporte pas de questions en double.\nIl est conforme.");
			} else {
				console.log("Le test comporte une ou plusieurs questions en double.\nIl n'est pas conforme.");
			}

		});
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// SPEC4 Génération d’un fichier vCard d’identification de l’enseignant
	.command('enseignant', 'Génération d’un fichier vCard d’identification de l’enseignant')
	.action(({ args, options, logger }) => {

		var name = rs.question('Entrer le nom et le prenom separes d\'un espace\n');
		if (!name.includes(" ")){
			return logger.warn("Non valide, veuillez entrer un nom et un prenom separes d\'un espace");
		}

		var organisation = rs.question('Entrer le nom de l\'organisation\n');

		var mail = rs.question('Entrer votre adresse mail\n');
		if (!(mail.includes("@") && mail.includes("."))){
			return logger.warn("l\'adresse mail n'est pas valide");
		}

		var telephone = rs.question('Entrer le numero de telephone\n');

		if (telephone.match(/^[0-9]+$/) == null || telephone.length!=10){
			return logger.warn("Le numero de télephone n'est pas valide");
		}

		telephone="(+33)"+telephone.substring(1)

		var generer = rs.question('Vous voulez generer un fichier vcard?(oui/non)\n');
		if (generer === 'oui') {
			// si nous répondons oui, nous obtenons un fichier avec tous les éléments qe nous avons demandé
			fs.writeFile(`./${name}.vcf`,
				"BEGIN:VCARD\nVERSION:4.0\n" +
				`N:${name}\n` +
				`ORG:${organisation}\n` +
				`EMAIL:${mail}\n` +
				`TEL;TYPE=cell:${telephone}\n` +
				"END:VCARD",
				function (err) {
					if (err) {
						throw err;
					}
				},
				console.log('Le Fichier est généré.')
			)
		}
	})


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Spec 5
	//Simulate
	.command("simulate", "Permet de simuler si un élève passait le test.")
	.argument('<file>', 'le fichier à utiliser')
	.action(({ args, options, logger }) => {
		var data = fs.readFileSync(args.file, 'utf8');
		var parser = new GiftParser();
		var examen = parser.createQuestion(data);

		// au début, la note est de 0 et va augmenter à chaque bonne réponse
		var note = 0;
		//nous créons aussi des variables pour le nombre de question de types ouverte (car elle ne vont pas compter dans les points)
		var nbOuvertes = 0;
		// le numéro de question
		var numéros = 0;
		// et un tableau de réponses
		var tableaurep = [];

		const rlInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		var choixUtilisateur = "";
		voirDetail();

		// création d'une nouvelle fonction
		function voirDetail() {
			switch (examen.questions[numéros].type) {
				// permet de mettre une message personnalisé pour chaque types de questions
				case "QCM":
					console.log("\nLes choix possibles sont les suivants : " + examen.questions[numéros].rep);
					break;
				case "Vrai/Faux":
					console.log("\nVrai ou Faux.");
					break;
				case "Mot":
					console.log("\nTrouverz le mot qu'il manque grâce aux propositions : " + examen.questions[numéros].rep);
					break;
				case "Ouverte":
					console.log("\nrépondez ce que vous voulez.");
					break;
			}
			// quand on écrit STOP en majuscule le test s'arrete et le résultat n'apparait pas
			rlInterface.question(examen.questions[numéros].quest + "\nEcrivez STOP pour vous arreter\n", function (input) {
				choixUtilisateur = input;
				console.log(input);
				if (choixUtilisateur == 'STOP') { rlInterface.close(); }
				else {
					if (choixUtilisateur == "Vrai" && examen.questions[numéros].type == "Vrai/Faux") {
						tableaurep.push("Vrai");
						choixUtilisateur = "";
						passerAuSuivant();
						voirDetail();
					}
					else if (choixUtilisateur == "Faux" && examen.questions[numéros].type == "Vrai/Faux") {
						tableaurep.push("Faux");
						choixUtilisateur = "";
						passerAuSuivant();
						voirDetail();
					}
					else if (examen.questions[numéros].type != "Vrai/Faux") {
						tableaurep.push(choixUtilisateur);
						choixUtilisateur = "";
						passerAuSuivant();
						voirDetail();
					}
					else {
						choixUtilisateur = "";
						voirDetail();
					}
				}
			});
			rlInterface.on("close", function () {
				process.exit(0);
			});

			function passerAuSuivant() {
				if (numéros + 1 < examen.questions.length) {
					numéros++;
				}
				else {
					AfficherNote();
					rlInterface.close();
				}
			}
			// cette fonction permet d'afficher la note
			// chaque question vaut un point sur le nombre de questions totales
			function AfficherNote() {
				var index = 0;
				examen.questions.forEach(elt => {
					if (elt.type == "Vrai/Faux" && ((tableaurep[index] == "Vrai" && elt.bonneRep == 0) || (tableaurep[index] == "Faux" && elt.bonneRep == 1))) {
						note++;
					}
					else if (elt.type == "QCM" && elt.rep[elt.bonneRep] == tableaurep[index]) {
						note++;
					}
					else if (elt.type == "Ouverte") {
						nbOuvertes++;
					}
					else if (elt.type == "Mot" && elt.rep[elt.bonneRep] == tableaurep[index]) {
						note++;
					}
					index++
				})
				console.log("Votre note pour ce test est : " + note + ", sur " + (numéros + 1 - nbOuvertes) + " questions.");
			}
		}
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Spec 6
	.command("evaluate", "regarder la proportion des différents types!")
	.argument('<file>', 'le fichier à ouvrir')
	.action(({ args, options, logger }) => {

		var data = fs.readFileSync(args.file, 'utf8');
		var parser = new GiftParser();
		var examen = parser.createQuestion(data);

		// variable pour cahque types de questions (initialisé à 0)
		let nombreQCM = 0;
		let nombreVF = 0;
		let nombreMotManquant = 0;
		// variable pour le nombre de questions totales
		let nombreQuestions = 0;

		//Pour chaque élément, on va incrémenter un compteur portant le nom du type de la question.
		examen.questions.forEach((elt) => {
			if (elt.type == "QCM") {
				nombreQCM++;
			} else if (elt.type == "Vrai/Faux") {
				nombreVF++;
			} else if (elt.type == "Mot") {
				nombreMotManquant++;
			}
		});

		// cela nous permet de calculer le nombre de questions totales
		nombreQuestions =
			nombreQCM +
			nombreVF +
			nombreMotManquant;

		// et de faire un tableau contenant les 3 types de questions
		let dataTest = [
			nombreQCM,
			nombreVF,
			nombreMotManquant
		];

		//Ici, on crée le diagramme avant de l'enregistrer dans le fichier Histogramme.jpg puis de l'ouvrir.
		const bar_chart = ChartJSImage()
			.chart({
				type: "bar",
				data: {
					labels: [
						// ce sont les 3 catégories en abscisses
						"QCM",
						"Vrai-Faux",
						"Mot manquant",
					],
					datasets: [
						{
							// ce qui est écrit en ordonnée
							label: "nombre de questions",
							data: dataTest,
						},
					],
				},
				options: {
					title: {
						display: true,
						text: "combien de question",
					},
					scales: {
						xAxes: [
							{
								scaleLabel: {
									display: true,
									labelString: "Les différents types de questions",
								},
							},
						],
						yAxes: [
							{
								stacked: true,
								scaleLabel: {
									display: true,
									labelString: "Unité",
								},
							},
						],
					},
				},
			}) // Bar chart
			.backgroundColor("white")
			.width(600)
			.height(400);

		bar_chart.toFile("Proportion.jpg");
		open("Proportion.jpg", { wait: true });


	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Spec 7
	.command("compare", "pour comparer 2 examens!")
	.argument('<file>', 'le fichier 1')
	.argument('<file2>', 'le fichier 2')

	.action(({ args, options, logger }) => {
		// cette fonction réagit exactement pareille que la fonction précédente mais avec les données de 2 fichiers
		var data = fs.readFileSync(args.file, 'utf8');
		var parser = new GiftParser();
		var exam = parser.createQuestion(data);

		var data = fs.readFileSync(args.file2, 'utf8');
		var exam2 = parser.createQuestion(data);

		// déclaration et initialisation des variables en double
		let nombreQCM = 0;
		let nombreVF = 0;
		let nombreMotManquant = 0;
		let nombreQuestions = 0;

		let nombreQCM2 = 0;
		let nombreVF2 = 0;
		let nombreMotManquant2 = 0;
		let nombreQuestions2 = 0;

		// regarde le type de chaque question pour chaque examen
		exam.questions.forEach((elt) => {
			if (elt.type == "QCM") {
				nombreQCM++;
			} else if (elt.type == "Vrai/Faux") {
				nombreVF++;
			} else if (elt.type == "Mot") {
				nombreMotManquant++;
			}
		});
		// examen 2 maintenant
		exam2.questions.forEach((elt) => {
			if (elt.type == "QCM") {
				nombreQCM2++;
			} else if (elt.type == "Vrai/Faux") {
				nombreVF2++;
			} else if (elt.type == "Mot") {
				nombreMotManquant2++;
			}
		});

		// on incrémente le nombre de questions de l'exam 1
		nombreQuestions =
			nombreQCM +
			nombreVF +
			nombreMotManquant;

		// on incrémente le nombre de questions de l'exam 2
		nombreQuestions2 =
			nombreQCM2 +
			nombreVF2 +
			nombreMotManquant2;

		// on créé un jeu de données
		let dataTest = [
			nombreQCM,
			nombreQCM2,
			nombreVF,
			nombreVF2,
			nombreMotManquant,
			nombreMotManquant2
		];

		// la on va comparer chaque résultat des deux examens
		// cela permet de voir quel examen est le plus rempli de chaque types de questions
		if (nombreQCM > nombreQCM2) {
			console.log("Le premier test contient plus de QCM");
		}
		else if (nombreQCM == nombreQCM2) {
			console.log("Les deux tests ont autant de QCM.");
		}
		else {
			console.log("Le deuxième test contient plus de QCM");
		}

		// on fait la même chose pour les vrai/faux
		if (nombreVF > nombreVF2) {
			console.log("Le premier test contient plus de V/F");
		}
		else if (nombreVF == nombreVF2) {
			console.log("Les deux tests ont autant de V/F");
		}
		else {
			console.log("Le deuxième test contient plus de V/F");
		}

		// maintenant les mots manquants
		if (nombreMotManquant > nombreMotManquant2) {
			console.log("Le premier test contient plus de MM");
		}
		else if (nombreMotManquant == nombreMotManquant2) {
			console.log("Les deux tests ont autant de MM.");
		}
		else {
			console.log("Le deuxième test contient plus de MM");
		}

		// on va maintenant créé l'image du graphique
		const bar_chart = ChartJSImage()
			.chart({
				type: "bar",
				data: {
					labels: [
						// les différentes bars qui vont se crées
						"QCM test1",
						"QCM test2",
						"Vrai-Faux test1",
						"Vrai-Faux test2",
						"Mot manquant test1",
						"Mot manquant test2",
					],
					datasets: [
						{
							label: "nombre question par type",
							data: dataTest,
						},
					],
				},
				options: {
					title: {
						display: true,
						text: "combien de questions",
					},
					scales: {

						xAxes: [
							{
								scaleLabel: {
									display: true,
									labelString: "Les différents types de question",
								},
							},
						],
						yAxes: [
							{
								stacked: true,
								scaleLabel: {
									display: true,
									labelString: "unité",
								},

							},
						],
					},
				},
			}) // Bar chart
			.backgroundColor("white")
			.width(600)
			.height(400);

		bar_chart.toFile("Statistique.jpg");
		open("Statistique.jpg", { wait: true });
	})

cli.run(process.argv.slice(2));
