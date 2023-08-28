import { Component, getAssetPath, h, Element, State, Event, EventEmitter } from '@stencil/core';
import { ProductService } from './product-service';
import { Product } from './product-service';

@Component({
  tag: 'admin-product',
  styleUrl: 'admin-product.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class AdminProduct {
  @Event() productAdded: EventEmitter<Product>;
  private productService = ProductService.getInstance();
  async componentDidRender() {
    const productService = ProductService.getInstance();
    await productService.fetchProducts();
    this.arr = this.productService.getProducts();
    this.addOptions();
  }

  priceForEdit: HTMLInputElement;
  pNameForEdit: HTMLInputElement;
  gotId: number;
  all: HTMLElement;
  dltElem: HTMLElement;
  opt: HTMLElement;
  dltId: number;
  submitEle: HTMLElement;
  updateFlag: boolean = true;
  dltFlag: boolean = true;
  @State() arr = [];

  @Element() hostElement: HTMLElement;

  async addThings(num: number) {
    const elem = document.createElement('div');
    elem.className = 'row';
    elem.id = 'allRows';
    this.hostElement.shadowRoot.getElementById('all').appendChild(elem);
    await this.add(num); // Use await here
  }

  async add(num: number) {
    let i = 0;
    while (i == 0 || i + ((i * num) % 4) != 0) {
      const currentArray = await this.productService.getProducts();
      const z = i + i * num;
      if (z >= currentArray.length) break;

      const imPath = currentArray.find(nm => nm.id === z + 1);
      if (!imPath) {
        i++;
        continue;
      }
      const x = currentArray.find(nm => nm.id === z + 1);
      if (!x) {
        i++;
        continue;
      }
      const r = currentArray.find(nm => nm.id === z + 1);
      if (!r) {
        i++;
        continue;
      }
      const c = document.createElement('div');
      c.className = 'col-4';
      c.id = `${z}`;
      const linkTo = document.createElement('a');
      linkTo.href = 'http://localhost:3333/product-details';
      this.hostElement.shadowRoot.getElementById('allRows').appendChild(c);
      if (z == 0) {
        const linkTag = document.createElement('a');
        linkTag.href = 'http://localhost:3333/product-details';
        const el = document.createElement('img');
        el.src = getAssetPath(`../assets/${imPath.imagePath}`);
        // this.hostElement.shadowRoot.getElementById(`${z}`).appendChild(el);
        linkTag.appendChild(el);
        const name = document.createElement('h4');
        name.appendChild(document.createTextNode(x.productName));
        // this.hostElement.shadowRoot.getElementById(`${z}`).appendChild(name);
        linkTag.appendChild(name);
        const price = document.createElement('p');
        price.appendChild(document.createTextNode(r.price));
        // this.hostElement.shadowRoot.getElementById(`${z}`).appendChild(price);
        linkTag.appendChild(price);
        linkTo.appendChild(linkTag);
      } else {
        const el = document.createElement('img');
        el.src = getAssetPath(`../assets/${imPath.imagePath}`);
        this.hostElement.shadowRoot.getElementById(`${z}`).appendChild(el);
        const name = document.createElement('h4');
        name.appendChild(document.createTextNode(x.productName));
        this.hostElement.shadowRoot.getElementById(`${z}`).appendChild(name);
        const price = document.createElement('p');
        price.appendChild(document.createTextNode(r.price));
        this.hostElement.shadowRoot.getElementById(`${z}`).appendChild(price);
      }
      i++;
      c.appendChild(linkTo);
    }
  }

  onInput(e: InputEvent) {
    const clear = this.hostElement.shadowRoot.getElementById('foundItemsAfterSearch');
    clear.innerHTML = '';
    const enteredValue = (e.target as HTMLInputElement).value.toLowerCase();
    if (enteredValue == '') {
      clear.innerHTML = '';
    } else {
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

  onBlur() {
    const itemInput = this.hostElement.shadowRoot.getElementById('search');
    itemInput.style.outlineStyle = 'none';
  }

  closeForm() {
    const closeNormal = this.hostElement.shadowRoot.getElementById('myForm');
    closeNormal.style.display = 'none';
  }
  closeDLTForm() {
    const closeDlt = this.hostElement.shadowRoot.getElementById('myDLTForm');
    closeDlt.style.display = 'none';
  }
  openForm() {
    const formPopup = this.hostElement.shadowRoot.getElementById('myForm');
    formPopup.style.display = 'block';
  }

  openDLTForm() {
    const dltFormPopup = this.hostElement.shadowRoot.getElementById('myDLTForm');
    dltFormPopup.style.display = 'block';
  }

  onFocus() {
    const itemInput = this.hostElement.shadowRoot.getElementById('search');
    itemInput.style.outlineStyle = 'solid';
    itemInput.style.outlineWidth = '1px';
    itemInput.style.outlineColor = `orange`;
  }

  addOptions() {
    if (this.dltFlag || this.updateFlag) {
      this.opt = this.hostElement.shadowRoot.getElementById('multiOptId');
      var defOpt = document.createElement('option');
      defOpt.appendChild(document.createTextNode('Select Product Id'));
      this.opt.appendChild(defOpt);
      for (let i = -1; i < this.arr.length && this.updateFlag; i++) {
        if (i == -1) {
          var newOpt = document.createElement('option');
          newOpt.appendChild(document.createTextNode('Select Product Id'));
          this.opt.appendChild(newOpt);
        } else {
          var newOpt = document.createElement('option');
          newOpt.appendChild(document.createTextNode(`${i + 1}`));
          this.opt.appendChild(newOpt);
          if (i == this.arr.length - 1) {
            this.updateFlag = false;
          }
        }
      }
      this.dltElem = this.hostElement.shadowRoot.getElementById('multiDLTId');
      this.dltElem.appendChild(defOpt);
      for (let i = 0; i < this.arr.length && this.dltFlag; i++) {
        var newOpt = document.createElement('option');
        newOpt.appendChild(document.createTextNode(`${i + 1}`));
        this.dltElem.appendChild(newOpt);
        if (i == this.arr.length - 1) {
          this.dltFlag = false;
        }
      }
    }
  }

  updateForm(e: Event) {
    this.gotId = +(e.target as HTMLSelectElement).value;
    const x: number = +this.gotId - 1;
    (this.pNameForEdit as HTMLElement) = this.hostElement.shadowRoot.getElementById('pNameEdit');
    this.pNameForEdit.value = this.arr[+x].productName;
    (this.priceForEdit as HTMLElement) = this.hostElement.shadowRoot.getElementById('pPriceEdit');
    this.priceForEdit.value = this.arr[+x].price;
  }

  async updateArray(e: Event) {
    e.preventDefault();
    const arnum = this.gotId;
    const NewName = this.pNameForEdit.value;
    const newPrice = this.priceForEdit.value;
    this.arr[arnum - 1].productName = NewName;
    this.arr[arnum - 1].price = newPrice;
    const updatedProduct = {
      id: arnum,
      imagePath: `../assets/product-${arnum}.jpg`,
      productName: NewName,
      price: newPrice,
    };
    const response = await fetch(`http://localhost:8080/products/${arnum}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      console.log('Product updated successfully');
    } else {
      console.error('Failed to update product');
    }
    (this.all as HTMLElement) = this.hostElement.shadowRoot.getElementById('all');
    this.all.innerHTML = '';
    this.addThings(0);
    alert('Selected Product Has been Updated');
    window.location.reload();
  }

  async deleteElementFromArray(e: Event) {
    e.preventDefault();
    const toDlt = this.dltId;
    this.arr.splice(toDlt - 1, 1);
    const response = await fetch(`http://localhost:8080/products/${toDlt}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Product deleted successfully');
    } else {
      console.error('Failed to delete product');
    }
    (this.all as HTMLElement) = this.hostElement.shadowRoot.getElementById('all');
    this.all.innerHTML = '';
    this.addThings(0);
    alert('Selected Product Has been Deleted');
    this.dltElem.innerHTML = '';
    this.opt.innerHTML = '';
    this.addOptions();
    window.location.reload();
  }

  selectDeleteId(e: Event) {
    this.dltId = +(e.target as HTMLSelectElement).value;
  }

  async addElemToArr(e: Event) {
    e.preventDefault();
    let count = this.arr.length;
    let idvalue = ++count;
    const inputPathForImage = (this.hostElement.shadowRoot.getElementById('input1') as HTMLInputElement).value;
    const productName = (this.hostElement.shadowRoot.getElementById('input2') as HTMLInputElement).value;
    const priceval = (this.hostElement.shadowRoot.getElementById('input3') as HTMLInputElement).value;
    const newProduct = {
      id: idvalue,
      imagePath: inputPathForImage,
      productName: productName,
      price: priceval,
    };
    await this.productService.addProduct(newProduct);
    this.arr.push(newProduct);
    this.productAdded.emit(newProduct);
    (this.all as HTMLElement) = this.hostElement.shadowRoot.getElementById('all');
    this.all.innerHTML = '';
    this.addThings(0);
    this.dltElem.innerHTML = '';
    this.opt.innerHTML = '';
    this.addOptions();
    window.location.reload();
  }

  constructor() {
    this.addOptions = this.addOptions.bind(this);
  }

  render() {
    const imgAlt = 'Image Alt Text';
    const allRows = [];
    const currentArray = this.arr;

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
            <h1>
              <label>Search Product</label>
            </h1>
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
            <div>
              <form id="newElemAdd" onSubmit={(e: Event) => this.addElemToArr(e)}>
                <label>Enter The Image Path : </label>
                <input type="text" id="input1" />
                <label>Enter Name Of The Product: </label>
                <input type="text" id="input2" />
                <label>Enter Price of The Product :</label>
                <input type="text" id="input3" />
                <input type="submit" id="submitElement" value="Add Element" />
              </form>
            </div>
          </div>
          <div id="all">{allRows}</div>
          <div class="row">
            <div class="col-2">
              <button class="open-button" onClick={() => this.openForm()}>
                Click Here To Edit Product Details
              </button>
            </div>
            <div class="col-2">
              <button class="open-button" onClick={() => this.openDLTForm()}>
                Click Here To Delete any Product
              </button>
            </div>
          </div>

          <div class="form-popup" id="myForm">
            <form class="form-container" id="EditForm" onSubmit={(e: Event) => this.updateArray(e)}>
              <h1>Edit Product details</h1>
              <br />
              <select id="multiOptId" onChange={(e: Event) => this.updateForm(e)}>
                {this.addOptions}
              </select>
              <br />
              <br />

              <label>
                <b>Product Name</b>
              </label>
              <input type="text" placeholder="Enter Product Name" id="pNameEdit" required />

              <label>
                <b>New Price</b>
              </label>
              <input type="text" placeholder="Enter Price" id="pPriceEdit" required />

              <button type="submit" class="btn">
                Update
              </button>
              <button type="button" class="btn cancel" onClick={() => this.closeForm()}>
                Close
              </button>
            </form>
          </div>

          <div class="form-popup" id="myDLTForm" onSubmit={(e: Event) => this.deleteElementFromArray(e)}>
            <form class="form-container" id="EditForm">
              <h1>Delete Product</h1>
              <br />

              <select id="multiDLTId" onChange={(e: Event) => this.selectDeleteId(e)}></select>
              <br />
              <br />
              {/* red */}
              <button type="submit" class="btn">
                Delete
              </button>
              {/* blue */}
              <button type="button" class="btn cancel" onClick={() => this.closeDLTForm()}>
                Close
              </button>
            </form>
          </div>
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
