export default class FilterButtonsList {
  constructor(container, [...labels], dataFilters) {
    this.container = container;
    this.labels = labels;
    this.dataFilters = dataFilters;
  }

  buttonsToHTML() {
    return this.labels.map(
      (label, index) =>
        `<button type="button" data-filter=${this.dataFilters[index]} class="btn btn-primary">${label}</button>`
    );
  }

  render() {
    this.container.innerHTML = this.buttonsToHTML();
  }
}
