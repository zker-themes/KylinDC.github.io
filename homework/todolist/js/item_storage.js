class ItemStorage {
  constructor() {
    this.storage = localStorage;
  }

  addItem(todoItem) {
    this.storage[todoItem.content] = JSON.stringify(todoItem);
  }

  getAllItem() {
    let itemArr = [];
    for (let i = 0; i < this.storage.length; i++) {
      let item = this.storage.getItem(this.storage.key(i));
      if (item.startsWith("{") && item.endsWith("}")) {
        if (JSON.parse(item).content) {
          let itemObject = JSON.parse(item);
          let todoItem = new TodoItem(
            itemObject.content,
            itemObject.isCompleted,
            itemObject.isDeleted
          );
          itemArr.push(todoItem);
        }
      }
    }
    return itemArr;
  }

  removeDeletedItem() {
    let allItems = this.getAllItem();
    let deletedItems = allItems.filter(e => e.isDeleted);
    deletedItems.forEach(e => this.storage.removeItem(e.content));
  }

  removeDoneItem() {
    let allItems = this.getAllItem();
    let completedItems = allItems.filter(e => e.isCompleted);
    completedItems.forEach(e => this.storage.removeItem(e.content));
  }

  getLeftCount() {
    let items = this.getAllItem();
    let leftCount = 0;
    for (let i of items) {
      if (!i.isCompleted) {
        leftCount++;
      }
    }
    return leftCount;
  }

  getItemByContent(content) {
    let allItems = this.getAllItem();
    return allItems.find(e => e.content === content);
  }

  generateAllItemsHTML() {
    let itemsHTML = "";
    let items = this.getAllItem();
    items.forEach(e => (itemsHTML += e.generateItemHTML()));
    return itemsHTML;
  }

  generateActiveItemsHTML() {
    let itemsHTML = "";
    let allItems = this.getAllItem();
    let activeItems = allItems.filter(e => !e.isCompleted);
    activeItems.forEach(e => (itemsHTML += e.generateItemHTML()));
    return itemsHTML;
  }

  generateCompletedItemsHTML() {
    let itemsHTML = "";
    let allItems = this.getAllItem();
    let completedItems = allItems.filter(e => e.isCompleted);
    completedItems.forEach(e => (itemsHTML += e.generateItemHTML()));
    return itemsHTML;
  }
}
