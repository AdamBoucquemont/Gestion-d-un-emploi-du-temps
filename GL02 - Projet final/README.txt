README - General Import Format Template (GIFT) Parser - Projet GL02 Sujet B

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description :
Le but du projet est de pouvoir créer un questionnaire composé d'entre 15 et 20 questions.
Les fichiers gift doivent respecter la grammaire suivante :

FileName = [“EM -“] [Unit] “-“ [Page] Name “.gift” 
FileContent  = [Comment] ["$CATEGORY:$course/top/Gold B2, Unit “ DIGIT [1*(WSP  /  VCHAR)]] 
1*exercise 
Exercise = *[(Comment CRLF / CRLF)] [Statement] 1*[(Comment CRLF / CRLF / Question CRLF)]  
Statement = Title [SpecialSyntax] Text 
Title = “::” [“EM” WSP] Unit WSP Page WSP Name WSP “::” 
Unit = “U” 1*(DIGIT) 
 Page = “p” 1*(DIGIT) [“_“1*(DIGIT)] 
Name = 1*(WSP / VCHAR) 
Comment = “//” 1*(WSP / VCHAR) 
Question = Title [SpecialSyntax] (Qcm/Trueorfalse/Open/Gap/Numerical/Correspondence) 
SpecialSyntax = ("[hltm]"/"[markdown]") 
Trueorfalse = Text CRLF (“~”/”=”)”True” [FeedBack]  CRLF (“~"/”=”)”False” [FeedBack] 
; Il doit y avoir exactement 1 "=" utilisé 
Qcm = Text WSP “{“ 2*( CRLF ( "~" / “~=” / "=" ) Text [FeedBack] ) [CRLF]  [ “}” ] 
; Il doit y avoir exactement 1 "=" utilisé 
QcmMultichoice = Text WSP “{“ 2*( CRLF "~%" [ "-" ] 1*3DIGIT "%~" Text [FeedBack]  ) [CRLF]  “}” 
Gap = (GapChoice/GapOpen) 
GapChoice = Text 1*( [“{1:MC:=”] 1*( CRLF ( "~" / “~=” / "=" ) Text [FeedBack]) ”}”  Text) 
GapOpen = Text 1*([“{1:SA:=”] Text [FeedBack] ) ”}”  Text) 
Correspondence = "{" CRLF 2*("=" Text "->" Text CRLF) "}" 
Open = Text 
Text = 1*(WSP / VCHAR) 
FeedBack = "#" Text

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Le projet pourra aussi permettre de créer un fichier Vcard. Ils devrons respecter la syntaxe suivante : 

Vcard = “BEGIN:VCARD” CRLF Version CRLF  Name CRLF  Gender CRLF  Organisation CRLF  1*(Mail 
CRLF)  *(Telephone CRLF ) “END:VCARD” 
Version = “VERSION” 1*DIGIT “.” 1*DIGIT 
Name = “N:” 1*CHAR *(“;”1*CHAR) “;;” 1*CHAR *(“;”1*CHAR) “;” 
Gender = “GENDER:” (“F”/”M”/”O”/”N”/”U”) 
Organisation = “ORG:” 1*CHAR *(“;”1*( WSP / VCHAR ))  
Mail = “EMAIL:” 1*CHAR ”@” 1*CHAR ”.” 1*CHAR 
Telephone = “TEL;TYPE=”1*CHAR “(+” 1*DIGIT “) 1*DIGIT 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Installation : 

$ npm install 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Utilsation : 

$ node caporalCli.js <command> fileToParse [-hts]

<command> :
- check <file> : permet de regarder si un fichier est du type Gift.
- create <file> : permet de créer un fichier de type Gift.
- select <file> : permet de sélectionner et ouvrir un fichier Gift.
- open <file> : permet de sélectionner et ouvrir un fichier Gift.
- add <file-arrive> <file-depart> <numéro question: permet de sélectionner une question d'une banque de donnée et de l'ajouter à notre examen
- delete <file> <numéro question> : permet de sélectionner une question dans un fichier pour le supprimer de l'examen
- modify <file> <placeQuestion> <newPlaceQuestion> : permet de déplacer une question à une autre place
- enseignant : permet de créer un fichier vCard d'un enseignant
- verify <file> : permet de voir si un fichier est conforme
- simulate <file> : simule le fait de passer un examen
- evaluate <file> : permet de voir les types de question d'un fichier
- compare <file1> <file2> : permet de comparer deux fichiers
- readme

-h or --help 	:	 display the program help
-t or --showTokenize :	 display the tokenization result 
-s or --showSymbols :	 display each step of the analysis

Les paramètres optionnels seront placés avant le nom du fichier.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Voici la liste des Spécification fonctionelles : 


SPEC 1 : Création ou sélection d’un fichier GIFT. 

SPEC 2 : Modifier les questions du test à partir du jeu de données des questions de référence.  

	SPEC 2.1 : Visualiser les questions.  

	SPEC 2.2 : Sélectionner une question pour l’ajouter à un test. 

	SPEC 2.3 : Supprimer des questions d’un test. 

	SPEC 2.4 : Définir l’ordre des questions au sein du test. 

SPEC 3 : Pouvoir évaluer la qualité d’un test préparé par le compositeur 

SPEC 4 : Générer un fichier d’identification et de contact de la personne ayant composé le test au 
format VCard. 

SPEC 5 : Permettre de simuler le passage du test composé et d’afficher un bilan comportant les 
résultats des réponses données. 

SPEC 6 : Générer un profil d’un examen GIFT ou d’une banque de questions qui permettra de visualiser 
les différents types de questions choisies sous forme statistique.
 
SPEC 7 : Permettre de comparer le profil de l’examen avec le profil moyen d’un ou plusieurs fichiers 
de la banque de questions fournies par le SYREM.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Voici la liste des Spécification fonctionelles : 


SPEC_NF_1 : L’utilitaire sera en invite de commande. 

SPEC_NF_2 :  La simulation du test (SPEC 5) sera sous forme uniquement textuelle. 

SPEC_NF_3 :  Les réponses à la simulation du test (SPEC 5) devront s’adapter au type de question (choix 
multiples, vrai-faux, correspondance, mot manquant, numérique, question ouverte). 

SPEC_NF_4 : Les indications d’utilisation de chaque fonction seront accessibles dans l’invite de 
commande. 

SPEC_NF_5 : Pour chaque examen créé, un unique fichier GIFT sera généré.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Liste des contributeurs : 
Kyoma Grandjean (kyoma.grandjan@utt.fr)
Zixiao Li (zixiao.li@utt.fr)
Adam Boucquemont (adam.boucquemont@utt.fr)
