import { Component, getAssetPath, h, Element, State } from '@stencil/core';

@Component({
  tag: 'product-details-component',
  styleUrl: 'product-details.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ProductDetails {
  @State() cart: { id: number; imagePath: string; name: string; price: string }[] = [];

  @Element() hostElement: HTMLElement;
  smallImage1 = 'gallery-1.jpg';
  smallImage2 = 'gallery-2.jpg';
  smallImage3 = 'gallery-3.jpg';
  smallImage4 = 'gallery-4.jpg';
  relatedImage1 = 'product-1.jpg';
  relatedImage2 = 'product-2.jpg';
  relatedImage3 = 'product-3.jpg';
  relatedImage4 = 'product-4.jpg';

  imagetag: HTMLElement;
  smallImg4Element: HTMLElement;
  smallImg3Element: HTMLElement;
  smallImg2Element: HTMLElement;
  smallImg1Element: HTMLElement;
  changeContentTag: HTMLElement;
  h1tagElem = HTMLElement;
  h4tagElem = HTMLElement;
  quantity = Number;
  qchange = HTMLElement;

  constructor() {
    this.changePic1 = this.changePic1.bind(this);
    this.changePic2 = this.changePic2.bind(this);
    this.changePic3 = this.changePic3.bind(this);
    this.changePic4 = this.changePic4.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeContent(e: Event) {
    e.preventDefault();
    this.changeContentTag = this.hostElement.shadowRoot.getElementById('AddToCart');
    this.changeContentTag.innerHTML = 'Added';
  }

  changePic1() {
    this.imagetag = this.hostElement.shadowRoot.getElementById('productImg');
    const smallImage1Src = getAssetPath(`../assets/${this.smallImage1}`);
    (this.imagetag as HTMLImageElement).src = smallImage1Src;
  }

  changePic2() {
    this.imagetag = this.hostElement.shadowRoot.getElementById('productImg');
    const smallImage2Src = getAssetPath(`../assets/${this.smallImage2}`);
    (this.imagetag as HTMLImageElement).src = smallImage2Src;
  }

  changePic3() {
    this.imagetag = this.hostElement.shadowRoot.getElementById('productImg');
    const smallImage3Src = getAssetPath(`../assets/${this.smallImage3}`);
    (this.imagetag as HTMLImageElement).src = smallImage3Src;
  }

  changePic4() {
    this.imagetag = this.hostElement.shadowRoot.getElementById('productImg');
    const smallImage4Src = getAssetPath(`../assets/${this.smallImage4}`);
    (this.imagetag as HTMLImageElement).src = smallImage4Src;
  }

  async cartClick() {
    this.imagetag = this.hostElement.shadowRoot.getElementById('productImg');
    const h1Tag = this.hostElement.shadowRoot.getElementById('details').querySelector('h1');
    const h4Tag = this.hostElement.shadowRoot.getElementById('details').querySelector('h4');
    const cartItem = {
      id: 0,
      imagePath: (this.imagetag as HTMLImageElement).src,
      name: h1Tag.textContent,
      price: h4Tag.textContent,
    };

    const newItemCart = {
      id: cartItem.id,
      imagePath: cartItem.imagePath,
      productName: cartItem.name,
      price: cartItem.price,
      quantity: this.quantity,
    };

    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItemCart),
    });
    if (response.ok) {
      console.log('Product updated successfully');
    } else {
      console.error('Failed to update product');
    }
    this.cart.push(cartItem);
    console.log(this.cart);
  }

  changeQuantity(e) {
    this.quantity = e.target.value;
  }

  render() {
    const imgAlt = 'Image Alt Text';
    const smallImage1Src = getAssetPath(`../assets/${this.smallImage1}`);
    this.smallImg1Element = <img src={smallImage1Src} alt={imgAlt} class="smallImage" />;
    const smallImage2Src = getAssetPath(`../assets/${this.smallImage2}`);
    this.smallImg2Element = <img src={smallImage2Src} alt={imgAlt} class="smallImage" />;
    const smallImage3Src = getAssetPath(`../assets/${this.smallImage3}`);
    this.smallImg3Element = <img src={smallImage3Src} alt={imgAlt} class="smallImage" />;
    const smallImage4Src = getAssetPath(`../assets/${this.smallImage4}`);
    this.smallImg4Element = <img src={smallImage4Src} alt={imgAlt} class="smallImage" />;

    const relatedImage1Src = getAssetPath(`../assets/${this.relatedImage1}`);
    const relatedImage1Element = <img src={relatedImage1Src} alt={imgAlt} />;
    const relatedImage2Src = getAssetPath(`../assets/${this.relatedImage2}`);
    const relatedImage2Element = <img src={relatedImage2Src} alt={imgAlt} />;
    const relatedImage3Src = getAssetPath(`../assets/${this.relatedImage3}`);
    const relatedImage3Element = <img src={relatedImage3Src} alt={imgAlt} />;
    const relatedImage4Src = getAssetPath(`../assets/${this.relatedImage4}`);
    const relatedImage4Element = <img src={relatedImage4Src} alt={imgAlt} />;

    const mainImageSrc = getAssetPath(`../assets/${this.smallImage1}`);
    const MainImageElement = <img src={mainImageSrc} alt={imgAlt} id="productImg" class="smallImage" />;

    let mainContent = (
      <div>
        <div class="small-container single-product">
          <div class="row">
            <div class="col-2">
              {MainImageElement}
              <div class="small-img-row">
                <div class="small-img-col" onClick={this.changePic1}>
                  {this.smallImg1Element}
                </div>
                <div class="small-img-col" onClick={this.changePic2}>
                  {this.smallImg2Element}
                </div>
                <div class="small-img-col" onClick={this.changePic3}>
                  {this.smallImg3Element}
                </div>
                <div class="small-img-col" onClick={this.changePic4}>
                  {this.smallImg4Element}
                </div>
              </div>
            </div>
            <div class="col-2" id="details">
              <p>Home / T-Shirt</p>
              <h1 id="nameOfProduct">Red Printed T-Shirt by HRX</h1>
              <h4 id="priceOfProduct">2,500.00</h4>
              <select>
                <option>Select Size</option>
                <option>XXL</option>
                <option>XL</option>
                <option>Large</option>
                <option>Medium</option>
                <option>Small</option>
              </select>
              <br />
              <input type="number" value="1" id="quantityChange" onChange={(e: Event) => this.changeQuantity(e)} />
              <a
                href=""
                class="btn"
                id="AddToCart"
                onClick={(e: Event) => {
                  this.changeContent(e);
                  this.cartClick();
                }}
              >
                Add To Cart
              </a>
              <h3>Product Details</h3>
              <br />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas voluptates alias voluptatem unde dolores tempora quisquam, excepturi rerum commodi vitae ratione,
                suscipit, nemo sunt quasi natus assumenda distinctio eligendi dignissimos?
              </p>
            </div>
          </div>
        </div>

        <div class="small-container">
          <div class="row row-2">
            <h2>Related Products</h2>
            <p>View More</p>
          </div>
        </div>

        <div class="small-container">
          <div class="row">
            <div class="col-4">
              {relatedImage1Element}
              <h4>Red Printed T-Shirt</h4>
              <p>2,500.00</p>
            </div>
            <div class="col-4">
              {relatedImage2Element}
              <h4>Casual Shirt</h4>
              <p>2,500.00</p>
            </div>
            <div class="col-4">
              {relatedImage3Element}
              <h4>Casual Shoes</h4>
              <p>2,500.00</p>
            </div>
            <div class="col-4">
              {relatedImage4Element}
              <h4>Track Pant</h4>
              <p>2,500.00</p>
            </div>
          </div>
        </div>
      </div>
    );
    return mainContent;
  }
}
