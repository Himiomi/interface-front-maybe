import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

class elementAccordion {
  get titre(): string {
    return this._titre;
  }
  get content(): string {
    return this._content;
  }
  private _titre: string;

  private _content: string;

  constructor(titre:string, content:string) {
    this._content = content;
    this._titre = titre;
  }
}

@Component({
  selector: 'interface-front-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HelpComponent {
  panelOpenState = false;
  listElements:Array<elementAccordion>=new Array<elementAccordion>();
  constructor() {
    this.listElements.push(
      new elementAccordion("Qu'est ce qu'est Freyr ?","Freyr est un projet développé par un groupe d'étudiant de 5ème année à l'ESIEA permettant de gérer une serre connectée"),
      new elementAccordion("Comment utiliser le site ?","En tant qu'utilisateur, une page vous intéresse vraiment c'est l'accueil, vous pourrez selectionner les capteurs qui vous intéresse et construire un graphique avec eux"),
      new elementAccordion("Quels sont les fonctionnalités du projet ?","Pour l'instant ce projet permet uniquement de visualiser les données issues de capteurs ajoutés au projet")
    )
  }
}
