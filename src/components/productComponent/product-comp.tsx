import { Component, getAssetPath, h, Element, State, Listen } from '@stencil/core';
import { ProductService } from './product-service';
import { Product } from './product-service';

@Component({
  tag: 'product-component',
  styleUrl: 'product-comp.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ProductComponent {
  @State() products = [];

  async componentWillRender() {
    const productService = ProductService.getInstance();
    await productService.fetchProducts();
    this.products = this.productService.getProducts();
  }

  @Listen('productAdded') // Listen for the 'productAdded' event
  handleProductAdded(event: CustomEvent<Product>) {
    const newProduct = event.detail;
    this.products = [...this.products, newProduct];
  }

  private productService = ProductService.getInstance();
  arr = this.productService.getProducts();

  @Element() hostElement: HTMLElement;

  addThings(num: number) {
    const elem = document.createElement('div');
    elem.className = 'row';
    elem.id = 'allRows';
    this.hostElement.shadowRoot.getElementById('all').appendChild(elem);
    this.add(num);
  }

  add(num: number) {
    const allRows = this.hostElement.shadowRoot.getElementById('allRows');

    this.arr.forEach((item, index) => {
      if (index % num !== 0) return;

      const c = document.createElement('div');
      c.className = 'col-4';
      c.id = `product-${index}`;
      console.log(`Assigned ID: product-${index}`);
      allRows.appendChild(c);

      const el = document.createElement('img');
      el.src = getAssetPath(`../assets/${item.imagePath}`);
      c.appendChild(el);

      const name = document.createElement('h4');
      name.appendChild(document.createTextNode(item.productName));
      c.appendChild(name);

      const price = document.createElement('p');
      price.appendChild(document.createTextNode(item.price));
      c.appendChild(price);

      c.addEventListener('click', () => this.navigateToProductDetails());
    });
  }

  navigateToProductDetails() {
    console.log('Clicked');
    window.location.href = '/product-details';
  }

  onInput(e: InputEvent) {
    const clear = this.hostElement.shadowRoot.getElementById('foundItemsAfterSearch');
    clear.innerHTML = '';
    const enteredValue = (e.target as HTMLInputElement).value.toLowerCase();
    if (enteredValue == '') {
      clear.innerHTML = '';
    } else {
      this.arr = this.productService.getProducts();
      const arr2 = [];
      for (let ele of this.arr) {
        let x = ele.productName.toLowerCase();
        if (x.search(enteredValue) != -1) {
          arr2.push(ele);
        }
      }
      if (arr2.length != 0) {
        const head = document.createElement('h2');
        head.style.fontSize = '40px';
        head.appendChild(document.createTextNode('Found The Following Items: '));
        const br = document.createElement('br');
        head.appendChild(br);
        clear.appendChild(head);
        this.addSearchedItem(arr2);
      }
    }
  }

  addSearchedItem(arr2: any[]) {
    const foundElem = document.createElement('div');
    foundElem.className = 'row';
    foundElem.id = 'foundRows';
    foundElem.style.marginTop = '20px';
    this.hostElement.shadowRoot.getElementById('foundItemsAfterSearch').appendChild(foundElem);
    this.addSearchedThings(arr2);
  }

  addSearchedThings(arr2: any[]) {
    let SI = 0;
    let numRows = Math.ceil(arr2.length / 4);
    for (let i = 0; i < numRows; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      this.hostElement.shadowRoot.getElementById('foundRows').appendChild(row);
      for (let j = 0; j < 4; j++) {
        const index = SI + j;
        if (index < arr2.length) {
          const item = arr2[index];
          const c = document.createElement('div');
          c.className = 'col-4';
          c.id = `${index}`;
          row.appendChild(c);
          const el = document.createElement('img');
          el.src = getAssetPath(`../assets/${item.imagePath}`);
          c.appendChild(el);
          const name = document.createElement('h4');
          name.appendChild(document.createTextNode(item.productName));
          c.appendChild(name);
          const price = document.createElement('p');
          price.appendChild(document.createTextNode(item.price));
          c.appendChild(price);
        }
      }
      SI += 4;
    }
  }

  onFocus() {
    const itemInput = this.hostElement.shadowRoot.getElementById('search');
    itemInput.style.outlineStyle = 'solid';
    itemInput.style.outlineWidth = '1px';
    itemInput.style.outlineColor = `orange`;
  }

  onBlur() {
    const itemInput = this.hostElement.shadowRoot.getElementById('search');
    itemInput.style.outlineStyle = 'none';
  }

  render() {
    const imgAlt = 'Image Alt Text';
    let allRows = [];
    let currentArray = this.products;

    for (let i = 0; i < currentArray.length; i += 4) {
      const rowItems = [];
      for (let j = 0; j < 4 && i + j < currentArray.length; j++) {
        const index = i + j;
        const item = currentArray[index];
        const imageSrc = getAssetPath(`../assets/${item.imagePath}`);
        const imageElement = <img src={imageSrc} alt={imgAlt} class="smallImage" />;
        rowItems.push(
          <div class="col-4">
            {imageElement}
            <h4>{item.productName}</h4>
            <p>{item.price}</p>
          </div>,
        );
      }
      allRows.push(<div class="row">{rowItems}</div>);
    }

    let mainContent = (
      <div>
        <div class="small-container">
          <div class="search-wrapper" id="search-item">
            <label>Search Product</label>
            <input type="search" id="search" onInput={(event: InputEvent) => this.onInput(event)} onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} />
            <div class="foundItemsAfter" id="foundItemsAfterSearch"></div>
          </div>
          <div class="row  row-2">
            <h2>All Products</h2>
            <select>
              <option>Default Sorting</option>
              <option>Sort by Price</option>
              <option>Sort by popularity</option>
              <option>sort by Sale</option>
            </select>
          </div>
          {allRows}
          <div class="page-btn">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>&#8594;</span>
          </div>
        </div>
      </div>
    );
    return mainContent;
  }
}
