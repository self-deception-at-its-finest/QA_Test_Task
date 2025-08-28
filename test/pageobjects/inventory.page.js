class InventoryPage {
    get items()  { return $('[data-test="inventory-list"]'); }
    get cartIcon()  { return $('[data-test="shopping-cart-link"]'); }
    get btnBurger() { return $('#react-burger-menu-btn'); }
    get menuList() { return $('.bm-menu-wrap'); }
    get menuItems() { return $$('.bm-item.menu-item'); }
    get logoutSidebarBtn() { return $('[data-test="logout-sidebar-link"]'); }
    //async getItemsCount() {
      //  return (await this.items).length;
  //  }
}

module.exports = new InventoryPage();