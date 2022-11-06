# GL02_Les_bannis

## AUTHORS 

### Développeurs
- Kyoma GRANDJEAN (kyoma.grandjan@utt.fr)
- Zixiao LI (zixiao.li@utt.fr)
- Adam BOUCQUEMONT (adam.boucquemont@utt.fr)

### Révisions
- Dorian BOUCHER (dorian.boucher@utt.fr)
- Tristan COLDEFY (tristan.coldefy@utt.fr)
- Thibault PAVEE (thibault.pavee@utt.fr)

## Description générale

La réalisation de ce projet s'est fait dans le cadre de l'UE GL02 de l'UTT pendant le semestre A21.

Le but du projet est de pouvoir créer un questionnaire composé entre 15 et 20 questions à partir d'une banque de question donnée par le SYREM. Toutes les données des question sont au format `.gift`. 

Le projet pourra aussi permettre de créer un fichier Vcard permettant d'identifier la personne ayant généré un examen.

Ce projet se trouve dans sa deuxième version.


## Installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ npm install 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Utilisation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ node caporalCli.js <command> fileToParse [-hts]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Commandes

1. `check <file>` : permet de regarder si un fichier est du type Gift.     
1. `create <file>` : permet de créer un fichier de type Gift.
1. `select <file>` : permet de sélectionner et ouvrir un fichier Gift.
1. `open <file>` : permet de sélectionner et ouvrir un fichier Gift.
1. `add <file-arrive> <file-depart> <numéro question>` : permet de sélectionner une question d'une banque de donnée et de l'ajouter à notre examen
1. `delete <file> <numéro question>` : permet de sélectionner une question dans un fichier pour le supprimer de l'examen
1. `modify <file> <placeQuestion> <newPlaceQuestion>` : permet de déplacer une question à une autre place
1. `enseignant` : permet de créer un fichier vCard d'un enseignant
1. `verify <file>` : permet de voir si un fichier est conforme
1. `simulate <file>` : simule le fait de passer un examen
1. `evaluate <file>` : permet de voir les types de question d'un fichier
1. `compare <file1> <file2>` : permet de comparer deux fichiers
1. `readme` : affiche le fichier readme
1. `help`	:	 affiche l'aide du programme

Les paramètres optionnels seront placés avant le nom du fichier.


## MIT License

Copyright (c) 2022 Equipe_A 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


