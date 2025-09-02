import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { CREDENTIALS } from '../constants/creds.constants.js';

describe('Products', () => {   //Test case №6

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID.STANDARD_USER.username, CREDENTIALS.VALID.STANDARD_USER.password);
    });

    it('Sorting products by Price (low to high)', async () => {        
    
        await inventoryPage.sortDropdown.click(); // Click on the sorting dropdown to open it
        await inventoryPage.sortDropdown.selectByAttribute('value', 'lohi'); //selecting the sorting option for price low to high 'lohi'


        const prices = await inventoryPage.getAllItemPrices(); // get all current product prices after sorting, getAllItemPrices() returns an array of numbers (prices)
        const sortedPrices = [...prices].sort((a, b) => a - b); // creating a sorted copy([...prices]) of the prices array for comparison
                                                                // sort((a, b) => a - b) sorts numbers in ascending order
        await expect(prices).toEqual(sortedPrices);  // cheking if actual prices match the expected sorted prices         
    });

    it('Sorting productsy Price (high to low)', async () => {      

        await inventoryPage.sortDropdown.click();
        await inventoryPage.sortDropdown.selectByAttribute('value', 'hilo');// selecting the sorting option for price hight to low 'hilo'

        const prices = await inventoryPage.getAllItemPrices();
        const sortedPrices = [...prices].sort((a, b) => b- a); // sort((a, b) => b - a) sorts numbers in descending order
        
        await expect(prices).toEqual(sortedPrices); 

    });

    it('Sorting products by Name (A to Z)', async () => {    

        await inventoryPage.sortDropdown.click();
        await inventoryPage.sortDropdown.selectByAttribute('value', 'az'); // selecting the sorting option for names A to Z in alphabet order 'az'
        
        const names = await inventoryPage.getAllItemNames();
        const sortedNames = [...names].sort(); // sort() sorts names in alphabet order 
        
        await expect(names).toEqual(sortedNames);
    });
    
    it('Sorting products by Name (Z to A) ', async () => {       

        await inventoryPage.sortDropdown.click();
        await inventoryPage.sortDropdown.selectByAttribute('value', 'za'); // selecting the sorting option for names A to Z in reversed alphabet order 'za'
        
        const names = await inventoryPage.getAllItemNames();
        const sortedNames = [...names].sort().reverse(); // sort().reverse() sorts names in reversed alphabet order 
        
        await expect(names).toEqual(sortedNames);
    });
});
