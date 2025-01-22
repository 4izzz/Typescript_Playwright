import { BasePage } from './BasePage';
import { globalState } from '../utils/globalState';

const { baseURL } = globalState;

export class InventoryPage extends BasePage {
  public readonly inventoryListLocator: string = '[data-test="inventory-list"]';
  public readonly inventoryItemLocator: string = '[data-test="inventory-item"]';
  public readonly addToCartButtonLocator: string = 'button:has-text("Add to cart")';
  public readonly removeButtonLocator: string = 'button:has-text("Remove")'
  public readonly rootUrl: string = `${baseURL}inventory.html`
}