export function hexToRgb(hex, normalize = false) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: normalize ? parseInt(result[1], 16) / 255 : parseInt(result[1], 16),
				g: normalize ? parseInt(result[2], 16) / 255 : parseInt(result[2], 16),
				b: normalize ? parseInt(result[3], 16) / 255 : parseInt(result[3], 16),
		  }
		: null;
}
