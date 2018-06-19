import { Usuario } from '../usuarios/usuario.model';

export class Parecer {

	constructor(
		public texto?: string,
		public data?: Date,
		public usuario?: string) {
			this.data = !data ? new Date() : data;
		}
}
