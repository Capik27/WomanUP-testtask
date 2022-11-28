/**
 * Конвертирует длинную датастроку в короткую - нужную для дефолтного инпута
 * @param {string} date дата в строковом формате toString()
 * @returns {string} короткая дата формата YYYY-MM-DD
 */
export function getConvertedDate(date) {
	return new Date(date).toISOString().slice(0, 10);
}
