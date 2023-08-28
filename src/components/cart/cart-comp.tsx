import { Component, h, Element, State } from '@stencil/core';
import { CartService } from './cart-service';
// import { Cart } from './cart-service';

@Component({
  tag: 'cart-component',
  styleUrl: 'cart-comp.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class CartComp {
  flag = false;
  cpnflag = false;
  subTotal: Number;
  @State() cart: { id: number; imagePath: string; name: string; price: string }[] = [];
  @Element() hostElement: HTMLElement;

  @State() cartItem = [];

  async componentWillRender() {
    const cartService = CartService.getInstance();
    await cartService.fetchCartProducts();
    this.cartItem = this.cartService.getCartProducts();
  }

  private cartService = CartService.getInstance();

  addProduct() {
    this.cart = this.cartItem;
    const table1 = document.createElement('table');
    const tr1 = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.appendChild(document.createTextNode('Product'));
    tr1.appendChild(th1);
    const th2 = document.createElement('th');
    th2.appendChild(document.createTextNode('Quantity'));
    tr1.appendChild(th2);
    const th3 = document.createElement('th');
    th3.appendChild(document.createTextNode('Sub Total'));
    tr1.appendChild(th3);
    table1.appendChild(tr1);
    for (let i = 0; i < this.cartItem.length; i++) {
      const tr2 = document.createElement('tr');
      const td1 = document.createElement('td');
      const div1 = document.createElement('div');
      div1.className = 'cart-info';
      const image1 = document.createElement('img');
      image1.src = this.cartItem[i].imagePath;
      const div2 = document.createElement('div');
      const para = document.createElement('p');
      para.appendChild(document.createTextNode(`${this.cartItem[i].productname}`));
      const small1 = document.createElement('small');
      small1.appendChild(document.createTextNode(`price: ${this.cartItem[i].price}`));
      const link = document.createElement('a');
      link.href = '';
      div2.appendChild(para);
      div2.appendChild(small1);
      div2.appendChild(link);
      div1.appendChild(image1);
      div1.appendChild(div2);
      td1.appendChild(div1);
      tr2.appendChild(td1);

      const td2 = document.createElement('td');
      const input1 = document.createElement('input');
      input1.type = 'number';
      input1.value = `${this.cartItem[i].quantity}`;
      td2.appendChild(input1);
      tr2.appendChild(td2);

      const td3 = document.createElement('td');
      let vlue = +Number(this.cartItem[i].price).toFixed(2) * +this.cartItem[i].quantity;
      td3.appendChild(document.createTextNode(vlue.toString()));
      tr2.appendChild(td3);
      table1.appendChild(tr2);
      if (i == this.cart.length - 1) {
        this.flag = true;
      }
    }

    this.hostElement.shadowRoot.getElementById('CartTable').appendChild(table1);
    if (this.flag) {
      const table2 = document.createElement('table');
      const trf1 = document.createElement('tr');
      const tdtrf1 = document.createElement('td');
      tdtrf1.appendChild(document.createTextNode('Sub Total'));
      trf1.appendChild(tdtrf1);
      const td2trf1 = document.createElement('td');
      let sum = 0;
      for (let i = 0; i < this.cartItem.length; i++) {
        sum += Number(this.cartItem[i].price);
      }
      td2trf1.appendChild(document.createTextNode(`${sum}`));
      trf1.appendChild(td2trf1);
      table2.appendChild(trf1);
      const trf2 = document.createElement('tr');
      const tdtrf2 = document.createElement('td');
      tdtrf2.appendChild(document.createTextNode('TAX'));
      trf2.appendChild(tdtrf2);
      const td2trf2 = document.createElement('td');
      let tax = 0;
      for (let i = 0; i < this.cartItem.length; i++) {
        tax += Number(this.cartItem[i].price) / 10;
      }
      td2trf2.appendChild(document.createTextNode(`${tax}`));
      trf2.appendChild(td2trf2);
      table2.appendChild(trf2);
      const trf3 = document.createElement('tr');
      const tdtrf3 = document.createElement('td');
      tdtrf3.appendChild(document.createTextNode('Total'));
      trf3.appendChild(tdtrf3);
      const td2trf3 = document.createElement('td');
      let netSum = sum + tax;
      td2trf3.appendChild(document.createTextNode(`${netSum}`));
      trf3.appendChild(td2trf3);
      table2.appendChild(trf3);
      if (this.cpnflag) {
        const trf4 = document.createElement('tr');
        const tdtrf4 = document.createElement('td');
        tdtrf4.appendChild(document.createTextNode('Final Price'));
        trf4.appendChild(tdtrf4);
        const td2trf4 = document.createElement('td');
        const rndInt = this.randomIntFromInterval(1, 20);
        let netSumAfterCpn = (netSum * rndInt) / 100;
        td2trf4.appendChild(document.createTextNode(`${netSum - netSumAfterCpn}`));
        trf4.appendChild(td2trf4);
        table2.appendChild(trf4);
        const trf5 = document.createElement('tr');
        const td2trf5 = document.createElement('td');
        td2trf5.appendChild(document.createTextNode(`Got Rs. ${netSumAfterCpn} Discount`));
        trf5.appendChild(td2trf5);
        table2.appendChild(trf5);
      }
      this.hostElement.shadowRoot.getElementById('cart-footer').appendChild(table2);
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    const cartTableRows = this.cartItem.map(item => (
      <tr>
        <td>
          <div class="cart-info">
            <img src={item.imagePath} alt={item.name} />
            <div>
              <p>{item.productName}</p>
              <small>price: {item.price}</small>
              <a href="#"> Remove</a>
            </div>
          </div>
        </td>
        <td>
          <input type="number" value={item.quantity} />
        </td>
        <td>{parseInt(item.price.replace(/,/g, '')) * +item.quantity}</td>
      </tr>
    ));

    let cartFooter = null;
    if (this.cartItem.length > 0) {
      let sumOf = 0;
      this.cartItem.map(item => {
        sumOf += parseInt(item.price.replace(/,/g, '')) * +item.quantity;
      });
      console.log(sumOf);
      this.subTotal = sumOf;
      const sum = this.subTotal;
      const tax = Number(+sum * 0.1);
      const netSum = Number(+sum + tax);

      cartFooter = (
        <div class="total-price">
          <table>
            <tr>
              <td>Sub Total</td>
              <td>{sum}</td>
            </tr>
            <tr>
              <td>TAX</td>
              <td>{tax}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{netSum}</td>
            </tr>
            {this.cpnflag && (
              <tr>
                <td>Final Price</td>
                <td>{123}</td>
              </tr>
            )}
          </table>
        </div>
      );
    }

    return (
      <div class="small-container cart-page">
        <div id="cartCoupons">
          <h2>Have Coupons?</h2>
          <div class="input-group">
            <form id="cpnForm">
              <input id="txtCpn" type="text" class="form-control coupon couponStencil" placeholder="Coupon code" />
              <span class="input-group-append">
                <input class="btn" type="submit" id="cpnSubmit" value="Apply" />
              </span>
            </form>
          </div>
        </div>
        <div class="small-container cart-page" id="CartTable">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>{cartTableRows}</tbody>
          </table>
        </div>
        {cartFooter}
      </div>
    );
  }
}
