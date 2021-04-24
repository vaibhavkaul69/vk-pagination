class PaginationByVaibhav {
	constructor(breakPointValue) {
		this.breakPointValue = breakPointValue;
		this.paginateObject = {};
		this.tempArray = [];
		this.breakValue = 10;
		this.pagination = document.getElementById("paginateBtns");
		this.paginationContainer = document.getElementById("showPaginationContent");
	}

	initializePagination() {
		fetch("https://jsonplaceholder.typicode.com/albums")
			.then((res) => res.json())
			.then((res) => {
				this.createPaginateObject(res);
			});
	}
	createPaginateObject(dataArray) {
		for (let i = 0; i <= dataArray.length; i++) {
			this.tempArray.push(dataArray[i]);
			if (i == 0) {
				continue;
			} else if (i % this.breakValue == 0) {
				this.paginateObject[i] = this.tempArray;
				this.tempArray = [];
			}
		}
		this.appendPaginateBtnsToDOM(this.paginateObject);
	}

	appendPaginateBtnsToDOM(paginateObject) {
		for (let i in paginateObject) {
			const button = document.createElement("button");
			button.className = "btns";
			button.innerText = i;
			button.dataset.paginate = i;
			button.addEventListener("click", (e) => {
				const allBtns = document.querySelectorAll(".btns");
				[...allBtns].map((item) => {
					item.classList.remove("active");
				});

				//Now add active class to the button that was clicked
				e.target.classList.add("active");
				this.showPaginationContent(e.target.dataset.paginate);
			});
			this.pagination.appendChild(button);
		}
		//Initialize first 10 items
		this.showPaginationContent(this.breakValue);
	}

	getRandomColor() {
		const red = parseInt(Math.random() * 255);
		const green = parseInt(Math.random() * 255);
		const blue = parseInt(Math.random() * 255);
		return `rgba(${red},${green},${blue},1)`;
	}
	showPaginationContent(number) {
		const activeArray = this.paginateObject[number];

		//Clear the paginationContainer after every button click and add new content
		this.paginationContainer.innerHTML = "";
		for (let i = 0; i < activeArray.length; i++) {
			if (activeArray[i]) {
				this.paginationContainer.innerHTML += `
                    <div class="item" style="border:1px solid ${this.getRandomColor()}">
                        <strong style="background:${this.getRandomColor()}">${
					activeArray[i].id
				}</strong>
                        <h2>${activeArray[i].title}</h2>
                    </div>
        `;
			}
		}
	}
}

const pagination = new PaginationByVaibhav(10);
pagination.initializePagination();
