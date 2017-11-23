import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'professorListFilter'
})
export class ProfessorListFilter implements PipeTransform {

	transform(professores, keyword) {
		keyword = keyword.toLowerCase();
		return professores.filter(professor => professor.nome.toLowerCase().includes(keyword));
	}
}