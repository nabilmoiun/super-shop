class Paginate {
  constructor(rootElementId, nextButtonId, previousButtonId, pageId, perPage) {
    this.rootElement = document.getElementById(rootElementId);
    this.children = this.rootElement.querySelectorAll("tr");
    this.length = this.children.length;
    this.nextButton = document.getElementById(nextButtonId);
    this.previousButton = document.getElementById(previousButtonId);
    this.start = 0;
    this.perPage = perPage;
    this.page = document.getElementById(pageId);
    this.state = {
      start: this.start,
      end: this.start + this.perPage,
    };
  }

  showData(from, to) {
    this.controlNextButton();
    this.controlPreviousButton();
    this.rootElement.innerHTML = "";
    for (let i = from; i < to; i++) {
      this.rootElement.appendChild(this.children[i]);
    }
  }

  gotoNextPage() {
    this.state.start += this.perPage;
    this.state.end += this.perPage;
    if (this.state.end >= this.length) {
      this.state.end = this.length;
    }
    this.showData(this.state.start, this.state.end);
  }

  controlNextButton() {
    if (this.state.end >= this.length) {
      this.nextButton.setAttribute("disabled", "true");
    } else {
      this.nextButton.removeAttribute("disabled");
    }
  }

  gotoPreviousPage() {
    this.state.start -= this.perPage;
    this.state.end = this.state.start + this.perPage;
    if (this.state.start <= 0) {
      this.state.start = 0;
      this.state.end = this.perPage;
    }
    this.showData(this.state.start, this.state.end);
  }

  controlPreviousButton() {
    if (this.state.start <= 0) {
      this.previousButton.setAttribute("disabled", "true");
    } else {
      this.previousButton.removeAttribute("disabled");
    }
  }

  changeNumberofElementToShow() {
    if (this.length > 0 && parseInt(this.page.value) <= this.length) {
      this.perPage = parseInt(this.page.value);
      this.state.start = 0;
      this.state.end = this.start + this.perPage;
      this.showData(this.state.start, this.state.end);
    }
    if (this.length > 0 && parseInt(this.page.value) > this.length) {
      this.perPage = this.length;
      this.state.start = 0;
      this.state.end = this.start + this.perPage;
      this.showData(this.state.start, this.state.end);
    }
  }

  run() {
    document.addEventListener("DOMContentLoaded", () => {
      if (this.state.end > this.length) {
        this.state.end = this.length;
      }
      this.showData(this.state.start, this.state.end);
      this.nextButton.addEventListener("click", () => this.gotoNextPage());
      this.previousButton.addEventListener("click", () =>
        this.gotoPreviousPage()
      );
      this.page.onchange = () => this.changeNumberofElementToShow();
    });
  }
}

