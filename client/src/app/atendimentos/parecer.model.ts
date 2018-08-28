export class Parecer {

	constructor(
		public data?: Date,
		public usuario?: string,
		public texto?: string) {
			this.data = !data ? new Date() : data;
		}
}
