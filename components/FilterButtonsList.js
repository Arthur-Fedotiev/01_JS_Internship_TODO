export default class FilterButtonsList {
  constructor(container, [...labels], dataFilters) {
    this.container = container;
    this.labels = labels;
    this.dataFilters = dataFilters;
  }

  buttonsToHTML() {
    return this.labels.map(
      (l, idx) =>
        `<button type="button" data-filter=${this.dataFilters[idx]} class="btn btn-primary">${l}</button>`
    );
  }

  render() {
    this.container.innerHTML = this.buttonsToHTML();
  }
}
