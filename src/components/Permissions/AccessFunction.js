/**
 *
 * @param condition {Boolean}
 * @param success_callback {Function}
 * @param failure_callback {Function}
 * @returns {*}
 * @constructor
 */
export default function AccessFunction({
	condition = false,
	success_callback = () => {},
	failure_callback = () => {},
}) {
	if (condition) {
		return success_callback();
	} else {
		return failure_callback();
	}
}
