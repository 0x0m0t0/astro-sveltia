interface ScrollAwayOptions {
	/** Fraction of the element's height that must pass the top before it activates */
	enter?: number
	/** Fraction it must come back within before it deactivates */
	exit?: number
}

/**
 * Calls `onChange` when `node` scrolls past the top of the viewport, and again
 * when it comes back. `enter` and `exit` differ so the state doesn't flicker
 * while hovering around a single threshold.
 *
 * IMPORTANT: `node` must not itself be transformed. `getBoundingClientRect()`
 * reports the transformed box, so scaling the measured element feeds its own
 * measurement back in and the state oscillates. Put the transform on a child.
 */
export function observeScrollAway(
	node: HTMLElement,
	onChange: (isPast: boolean) => void,
	{ enter = 0.3, exit = 0.15 }: ScrollAwayOptions = {}
) {
	// Plain variable, not state — the observer reads it to apply hysteresis and
	// that read shouldn't be tracked by any effect this runs inside.
	let isPast = false

	const update = () => {
		const rect = node.getBoundingClientRect()
		const next = rect.top < -(rect.height * (isPast ? exit : enter))
		if (next === isPast) return
		isPast = next
		onChange(next)
	}

	// observe() fires an initial callback, so there's no need to seed the state
	const observer = new IntersectionObserver(update, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})
	observer.observe(node)

	return () => observer.disconnect()
}
