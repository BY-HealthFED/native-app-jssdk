/**
 * String privacy
 * 隐私字符串隐藏 ex:131****3456
 * @export
 * @data {String|Number} request
 * @start {Number}
 * @end {Number}
 */
export function FStringPrivacy(data, start, end) {
	const S = parseInt(start, 0) || 1;
	const E = parseInt(end, 0) || 0;

	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;
	if (!Str) {
		return;
	}
	let N;
	let HideSTR = '';
	let result;
	if (Str.length > (S + E)) {
		N = Str.length - (S + E);
		for (let i = 0; i < N; i++) {
			HideSTR = HideSTR + '*';
		}
		result = `${Str.slice(0, S)}${HideSTR}${Str.slice((Str.length - E), Str.length)}`;
	} else {
		N = Str.length - S;
		for (let i = 0; i < N; i++) {
			HideSTR = HideSTR + '*';
		}
		result = `${Str.slice(0, S)}${HideSTR}`;
	}
	return result;
}

/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */

function zerofill(val) {
	return val >= 10 ? val : '0' + val;
}

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型
 * @return {String}
 */
export function FTimeStamp(time, type, Zh) {
	let text = Zh || '';
	let date = new Date(parseInt(time, 0));
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let second = date.getSeconds();

	switch (type) {
		case 'MM-dd': // 01-05 (zh: 01月05日)
			return text === 'Zh'
                ? `${zerofill(month)}月${zerofill(day)}日`
                : `${zerofill(month)}-${zerofill(day)}`;
		case 'HH:mm': // 11:12 (zh: 11时12分)
			return text === 'Zh'
                ? `${zerofill(hours)}时${zerofill(minutes)}分`
                : `${zerofill(hours)}-${zerofill(minutes)}`;
		case 'yyyy-MM-dd': // 2015-01-05 (zh: 2015年01月05日)
			return text === 'Zh'
                ? `${year}年${zerofill(month)}月${zerofill(day)}日`
                : `${year}-${zerofill(month)}-${zerofill(day)}`;
		case 'yyyy-MM-dd HH:mm': // 2015-01-05 11:12 (zh: 2015年01月05日 11时12分)
			return text === 'Zh'
                ? `${year}年${zerofill(month)}月${zerofill(day)}日  ${zerofill(hours)}时${zerofill(minutes)}分`
                : `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`;
		default: // 2015-01-05 11:12:13 (zh: 2015年01月05日 11时12分13秒)
            // default yyyy-MM-dd HH:mm:ss
			return text === 'Zh'
                ? `${year}年${zerofill(month)}月${zerofill(day)}日  ${zerofill(hours)}时${zerofill(minutes)}分${zerofill(second)}秒`
                : `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`;
	}
}
