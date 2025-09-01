import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';


describe('Products', () => {   //Test case №6

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('Sorting products by Price (low to high)', async () => {        
    
        await InventoryPage.sortDropdown.click(); // Click on the sorting dropdown to open it
        await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi'); //selecting the sorting option for price low to high 'lohi'


        const prices = await InventoryPage.getAllItemPrices(); // get all current product prices after sorting, getAllItemPrices() returns an array of numbers (prices)
        const sortedPrices = [...prices].sort((a, b) => a - b); // creating a sorted copy([...prices]) of the prices array for comparison
                                                                // sort((a, b) => a - b) sorts numbers in ascending order
        await expect(prices).toEqual(sortedPrices);  // cheking if actual prices match the expected sorted prices         
    });

    it('Sorting productsy Price (high to low)', async () => {      

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');// selecting the sorting option for price hight to low 'hilo'

        const prices = await InventoryPage.getAllItemPrices();
        const sortedPrices = [...prices].sort((a, b) => b- a); // sort((a, b) => b - a) sorts numbers in descending order
        
        await expect(prices).toEqual(sortedPrices); 

    });

    it('Sorting products by Name (A to Z)', async () => {    

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'az'); // selecting the sorting option for names A to Z in alphabet order 'az'
        
        const names = await InventoryPage.getAllItemNames();
        const sortedNames = [...names].sort(); // sort() sorts names in alphabet order 
        
        await expect(names).toEqual(sortedNames);
    });
    
    it('Sorting products by Name (Z to A) ', async () => {       

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'za'); // selecting the sorting option for names A to Z in reversed alphabet order 'za'
        
        const names = await InventoryPage.getAllItemNames();
        const sortedNames = [...names].sort().reverse(); // sort().reverse() sorts names in reversed alphabet order 
        
        await expect(names).toEqual(sortedNames);
    });
});
