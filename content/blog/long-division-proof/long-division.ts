const getNextMaybeDivisibleChunk = (dividend, numDigitsDivisor) => () => ({ 
	next: () => parseInt(dividend.splice(0,numDigitsDivisor), 10), 
	[Symbol.iterator] () {
		return this;
	} 
});

/** longDivision algorithm.
 * 
 * @param dividend the number that is being divided.
 * @param divisor the number that divides the other number.
 */
function* longDivisionTempMults(dividend, divisor) {
	const numDigitsDivisor = divisor.length;
	divisor = parseInt(divisor, 10);
	const getChunk = getNextMaybeDivisibleChunk(dividend, numDigitsDivisor);
  for(const chunk of getChunk()) {
		while(Math.floor(chunk / divisor) <= 0) {
			if(dividend.length <= numDigitsDivisor) {
				return 
			}
		}
		let temp = Math.floor(chunk / divisor);
			yield temp;
	}
	const remainder = 0;
	return remainder;
}

function* longDivisionTempMults(dividend, divisor) {
  for(const chunk of getNextMaybeDivisibleChunk()) {
		if(chunk / divisor > 0) {
			let temp = Math.floor(chunk / divisor);
			yield temp;
		}
	}
}


longDivision("123456789123123434233535145154154514351515", "12")

console.log(1234567891231234342335351451541545147382947382947839274839274839274894351515n / 14n) 
