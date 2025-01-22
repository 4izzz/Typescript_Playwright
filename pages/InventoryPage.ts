import { BasePage } from './BasePage';
import { globalState } from '../utils/globalState';

const { baseURL } = globalState;

export class InventoryPage extends BasePage {
  public inventoryListLocator: string = '[data-test="inventory-list"]';
  public inventoryItemLocator: string = '[data-test="inventory-item"]';
  public addToCartButtonLocator: string = 'button:has-text("Add to cart")';
  public removeButtonLocator: string = 'button:has-text("Remove")'
  public rootUrl: string = `${baseURL}inventory.html`
}