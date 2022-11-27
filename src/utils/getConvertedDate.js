export function getConvertedDate(date) {
	return new Date(date).toISOString().slice(0, 10);
}
