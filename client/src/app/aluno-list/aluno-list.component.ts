import { Component } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Component({
    selector: 'app-alunolist',
    templateUrl: './aluno-list.component.html',
    styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent {
    alunos: Aluno[] = [
        { id: 1, nome: 'Adão' },
        { id: 2, nome: 'Rosângela' },
        { id: 3, nome: 'Allan' },
        { id: 4, nome: 'Yuri' },
        { id: 5, nome: 'Thiagus' },
        { id: 6, nome: 'Vikthor' },
        { id: 7, nome: 'Isaac' },
        { id: 8, nome: 'Ícaro' }
    ];

    testOpen(a:any) {
        console.log('open');
        console.log(a);
        // console.log(a.context.children[1].id);
        a.context.children[0].checked = true;
        // var doc1: any = document;
        // doc1.getElementById(a.context.children[1].id).checked = true;
    }

    testClose(a:any) {
        console.log('close');
        console.log(a);
        // console.log(a.context.children[1].id);
        a.context.children[0].checked = false;

        // var doc1: any = document;
        // doc1.getElementById(a.context.children[1].id).checked = false;
    }

    onClick($event: any, aluno: Aluno) {
        // console.log($event);
        // console.log($event.srcElement);
        // console.log(aluno);
        // var doc1: any = document;
        // doc1.getElementById(aluno.id.toString()).value = $event.srcElement.classList.contains('active') >= 0;
        // console.log($event.srcElement.className.toString());
    }
}

export class Aluno {
    id: number;
    nome: string;
}