<script lang="ts">
	let { class: className = '', marginY = 'my-10' } = $props()

	let dialog: HTMLDialogElement | undefined = $state()
	let name = $state('')
	let email = $state('')
	let message = $state('')
	let submitting = $state(false)

	function openModal() {
		dialog?.showModal()
	}

	function closeModal() {
		dialog?.close()
	}

	/**
	 * Backdrop clicks land on the <dialog> itself, so `e.target` identifies them
	 * — but so do clicks on the dialog's own 2rem padding, which shouldn't close
	 * it. Comparing the pointer against the dialog's box separates the two.
	 * Requiring `e.target === dialog` also filters out keyboard-triggered clicks
	 * from inner buttons, which bubble up here reporting coordinates of (0, 0).
	 */
	function onDialogClick(e: MouseEvent) {
		if (!dialog || e.target !== dialog) return
		const { top, left, width, height } = dialog.getBoundingClientRect()
		const inside =
			e.clientX >= left && e.clientX <= left + width && e.clientY >= top && e.clientY <= top + height
		if (!inside) closeModal()
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		submitting = true
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			})
			if (res.ok) {
				closeModal()
				name = ''
				email = ''
				message = ''
			} else {
				const data = await res.json().catch(() => ({}))
				alert('Error: ' + (data.error || 'Failed to send message'))
			}
		} catch (err) {
			console.error(err)
			alert('Error sending message. Please try again.')
		} finally {
			submitting = false
		}
	}
</script>

<button
	id="open-modal"
	data-track="Contact Form Open"
	class="bg-mauve dark:bg-dark hover-soft has-parens z-10 {marginY} max-w-80 cursor-pointer rounded border p-2 text-center {className}"
	onclick={openModal}
>
	Get in touch
</button>

<dialog
	bind:this={dialog}
	onclick={onDialogClick}
	class="bg-mauve text-darkSand dark:bg-dark dark:text-darkText rounded-md border"
>
	<form onsubmit={handleSubmit}>
		<h2 class="my-10 text-center">Get in touch or just say hello</h2>
		<div class="form-group">
			<label for="name">( name )</label>
			<input
				class="bg-dark/5 dark:bg-white/10 border"
				type="text"
				id="name"
				name="name"
				bind:value={name}
				required
			/>
		</div>
		<div class="form-group">
			<label for="email">( email )</label>
			<input
				class="bg-dark/5 dark:bg-white/10 border"
				type="email"
				id="email"
				name="email"
				bind:value={email}
				required
			/>
		</div>
		<div class="form-group">
			<label for="message">( message )</label>
			<textarea
				class="bg-dark/5 dark:bg-white/10 border"
				id="message"
				name="message"
				rows={4}
				bind:value={message}
				required
			></textarea>
		</div>
		<div class="form-actions">
			<button
				type="button"
				class="btn-secondary hover-soft border"
				onclick={closeModal}>Cancel</button
			>
			<button
				type="submit"
				class="btn-primary border bg-green-500/20 hover:bg-green-500/35 dark:bg-green-500/25 dark:hover:bg-green-500/40"
				disabled={submitting}>{submitting ? 'Sending…' : 'Send Message'}</button
			>
		</div>
	</form>
</dialog>

<style>
	dialog {
		position: fixed;
		z-index: 200;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.9);
		margin: 0;
		padding: 2rem;
		max-width: 500px;
		width: calc(100% - 2rem);
		opacity: 0;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	dialog::backdrop {
		/* Lighter scrim in light mode, deeper one in dark mode */
		background-color: rgba(33, 32, 28, 0.35);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	:global(html.dark) dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.6);
	}
	dialog[open] {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
	dialog[open]::backdrop {
		opacity: 1;
	}
	.form-group {
		margin-bottom: 1.5rem;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		text-align: center;
	}
	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border-radius: 0.375rem;
		color: inherit;
		transition:
			border-color 0.2s,
			background-color 0.2s;
	}
	input::placeholder,
	textarea::placeholder {
		color: inherit;
		opacity: 0.5;
	}
	input:focus-visible,
	textarea:focus-visible,
	.btn-primary:focus-visible,
	.btn-secondary:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 2rem;
	}
	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 1.5rem;
		cursor: pointer;
		border-radius: 0.25rem;
	}
	/* Parens come from the global `.has-parens` rule in app.css */
</style>
