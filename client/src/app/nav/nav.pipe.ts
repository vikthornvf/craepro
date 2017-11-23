import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'navFilter'
})
export class NavFilter implements PipeTransform {
	transform(list, keyword, prop) {
		keyword = keyword.toLowerCase();
		return list.filter(entity => entity[prop].toLowerCase().includes(keyword));
	}
}