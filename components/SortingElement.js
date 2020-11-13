export default class SortingElement {
  constructor(container) {
    this.container = container;
    this.render();
  }

  toggleSortingBlock(showSortingBlock) {
    this.container.style.display = showSortingBlock ? "block" : "none";
  }

  render() {
    this.container.innerHTML = `
    <div class="card text-center mb-5">
  <div class="card-header">
  <h5 class="card-title"> Sort and filter your todo list</h5>
  </div>
  <div class="card-body" id="sortingBlock">
    
    <label for="filterTasks" class="sr-only"></label>
    <input
      type="text"
      class="form-control"
      id="filterTasks"
      placeholder="Filter tasks"
    />
      <input
        type="date"
        id="dateFilter"
        class="form-control"
        name="dateFilter"
        value=""
        autocomplete="off"
      />
      
    <label for="dateFilter"></label><br />
    <a data-sorting="creationDate" class="btn btn-lg btn-primary">Date</a>
    <a data-sorting="content" class="btn btn-lg btn-primary">Text</a>
  </div>
  </div>`;
  }
}
