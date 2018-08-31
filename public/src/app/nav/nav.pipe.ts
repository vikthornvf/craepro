import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'navFilter'
})
export class NavFilter implements PipeTransform {

	accentMap = {
		'à': 'a',
		'á': 'a',
		'â': 'a',
		'ã': 'a',
		'ç': 'c',
		'é': 'e',
		'è': 'e',
		'ê': 'e',
		'í': 'i',
		'ì': 'i',
		'î': 'i',
		'ñ': 'n',
		'ó': 'o',
		'ò': 'o',
		'ô': 'o',
		'õ': 'o',
		'ú': 'u',
		'ù': 'u',
		'û': 'u'
	};

	chars = /[aceinou]/g;

	transform(list, keyword, property) {
		keyword = this.standardizeChars(keyword.toLowerCase());
		return list.filter(entity => this.standardizeChars(entity[property]).includes(keyword));
	}

	standardizeChars(input: string): string {
		if (!input) {
			return '';
		}
		input = input.toLowerCase();
		let output = '';
		for (let i = 0; i < input.length; i++) {
			output += this.accentMap[input.charAt(i)] || input.charAt(i);
		}
		return output;
	}
}
