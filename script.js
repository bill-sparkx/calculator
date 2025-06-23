let selectedTipPercentage = 0

// Get DOM elements
const billAmountInput = document.getElementById("billAmount")
const customTipInput = document.getElementById("customTip")
const numPeopleInput = document.getElementById("numPeople")
const tipButtons = document.querySelectorAll(".tip-btn")
const tipAmountDisplay = document.getElementById("tipAmount")
const totalBillDisplay = document.getElementById("totalBill")
const perPersonDisplay = document.getElementById("perPerson")

// Add event listeners
billAmountInput.addEventListener("input", calculateTip)
customTipInput.addEventListener("input", calculateTip)
numPeopleInput.addEventListener("input", calculateTip)

// Handle tip button clicks
tipButtons.forEach((button) => {
	button.addEventListener("click", function () {
		// Remove active class from all buttons
		tipButtons.forEach((btn) => btn.classList.remove("active"))

		// Add active class to clicked button
		this.classList.add("active")

		if (this.dataset.tip === "custom") {
			customTipInput.disabled = false
			customTipInput.focus()
			selectedTipPercentage = parseFloat(customTipInput.value) || 0
		} else {
			customTipInput.disabled = true
			selectedTipPercentage = parseFloat(this.dataset.tip)
		}

		calculateTip()
	})
})

// Handle custom tip input
customTipInput.addEventListener("input", function () {
	if (!this.disabled) {
		selectedTipPercentage = parseFloat(this.value) || 0
		calculateTip()
	}
})

// Main calculation function
function calculateTip() {
	const billAmount = parseFloat(billAmountInput.value) || 0
	const numPeople = parseInt(numPeopleInput.value) || 1

	const tipAmount = (billAmount * selectedTipPercentage) / 100
	const totalBill = billAmount + tipAmount
	const perPerson = totalBill / numPeople

	// Update display
	tipAmountDisplay.textContent = `₵ ${tipAmount.toFixed(2)}`
	totalBillDisplay.textContent = `₵ ${totalBill.toFixed(2)}`
	perPersonDisplay.textContent = `₵ ${perPerson.toFixed(2)}`
}

// Initialize with default values
calculateTip()
