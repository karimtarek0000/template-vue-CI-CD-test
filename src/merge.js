export const merge = (a, b) => {
	if (Array.isArray(a)) {
		return [...a, ...b]
	}

	const merged = { ...a }
	for (const key of Object.keys(b)) {
		if (typeof merged[key] === 'object' || Array.isArray(merged[key])) {
			merged[key] = merge(merged[key], b[key])
		} else {
			merged[key] = b[key]
		}
	}

	return merged
}
