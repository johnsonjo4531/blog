Array.from(document.querySelectorAll("blockquote > p")).forEach(el => {
	if (el.innerHTML.startsWith('!')) {
		el.innerHTML = el.innerHTML.replace(/^!/, '');
		el.parentElement.classList.add("spoiler");
		el.parentElement.addEventListener('click', (e) => {
			return e.target instanceof HTMLElement && e.target.classList.contains('spoiler') && e.target.classList.remove("spoiler");
		})
	}
})
