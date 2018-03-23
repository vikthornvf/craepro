export class Parecer {

	constructor(
		public texto?: string,
		public data?: Date) {
			this.data = !data ? new Date() : data;
		}
}
