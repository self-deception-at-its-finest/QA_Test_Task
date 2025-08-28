class InventoryPage {
    get items()  { return $('[data-test="inventory-list"]'); }
    get cartIcon()  { return $('[data-test="shopping-cart-link"]'); }
    //async getItemsCount() {
      //  return (await this.items).length;
  //  }
}

module.exports = new InventoryPage();