const username = "Давід Марко"
console.log(username)

function setup() {
	const cardAll = document.querySelectorAll(".card")
	const cardArr = Array.from(cardAll)
	// console.log(cardArr)
	cardArr.map((cardEl) => initCard(cardEl))
}
setup()

function initCard(card) {
	const cardContent = card.querySelector(".card__content");
	// console.log(card)
	card.addEventListener("mousemove", function(e) {
		const clientX = e.clientX
		const clientY = e.clientY
		// console.log("working")
		// console.log(clientX)
		// console.log(clientY)
		const cardRect = card.getBoundingClientRect()
		// console.log(cardRect)
		const halfWidth = cardRect.width / 2
		const halfHeight = cardRect.height / 2

		const cardCenterX = cardRect.left + halfWidth
		const cardCenterY = cardRect.top + halfHeight

		const deltaX = clientX - cardCenterX
		const deltaY = clientY - cardCenterY

		const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
		const maxDistance = Math.max(halfWidth, halfHeight)
		
		const degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 20)

		const rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1)
		const ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1)
		cardContent.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`;
	})
	card.addEventListener("mouseleave", () => {
		cardContent.style = null;
	})
}

function mapNumberRange(n, a, b, c, d) {
	return (n - a) * (d - c) / (b - a) + c
}