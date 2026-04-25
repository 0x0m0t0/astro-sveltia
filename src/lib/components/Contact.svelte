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
	class="bg-mauve dark:bg-dark z-10 {marginY} max-w-80 cursor-pointer rounded border p-2 text-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] {className}"
	onclick={openModal}
>
	Get in touch
</button>

<dialog bind:this={dialog} class="bg-dark dark:bg-mauve rounded-md border text-green-500">
	<form onsubmit={handleSubmit}>
		<h2 class="my-10 text-center">Get in touch or just say hello</h2>
		<div class="form-group">
			<label for="name">( name )</label>
			<input class="border" type="text" id="name" name="name" bind:value={name} required />
		</div>
		<div class="form-group">
			<label for="email">( email )</label>
			<input class="border" type="email" id="email" name="email" bind:value={email} required />
		</div>
		<div class="form-group">
			<label for="message">( message )</label>
			<textarea class="border" id="message" name="message" rows={4} bind:value={message} required
			></textarea>
		</div>
		<div class="form-actions">
			<button type="button" class="btn-secondary border" onclick={closeModal}>Cancel</button>
			<button
				type="submit"
				class="btn-primary border bg-green-500/40 dark:bg-green-500/40"
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
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 0;
		transition: opacity 0.3s ease;
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
		transition: border-color 0.2s;
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
	#open-modal:hover::before {
		content: '(';
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
	#open-modal:hover::after {
		content: ')';
		display: inline-block;
		width: 1em;
		margin-right: -1em;
	}
</style>
