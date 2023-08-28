import { Component, getAssetPath, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  styleUrl: 'navbar.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class NavBar {
  logoImage = 'project-logo.jpeg';
  cartImage = 'cart.png';
  menuImage = 'menu.png';
  @Prop({ mutable: true }) name: string;
  @State() APIData: string;

  render() {
    const logoImageSrc = getAssetPath(`../assets/${this.logoImage}`);
    const cartImageSrc = getAssetPath(`../assets/${this.cartImage}`);
    const menuImageSrc = getAssetPath(`../assets/${this.menuImage}`);
    // const imgSrc = '../../../src/components/assets/app-store.png';
    const imgAlt = 'Image Alt Text';

    const logoImgElement = <img src={logoImageSrc} alt={imgAlt} class="logoStencil" />;
    const cartImageElement = <img src={cartImageSrc} alt={imgAlt} class="cartStencil" />;
    const menuImageElement = <img src={menuImageSrc} alt={imgAlt} class="menu-icon" />;

    let mainContent = (
      <div class="header">
        <div class="container">
          <div class="navbar">
            <div class="logo">{logoImgElement}</div>
            <nav>
              <ul id="menu-items">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/product">Products</a>
                </li>
                <li>About</li>
                <li>Contact Us</li>
                <li>
                  <a href="/login">Account</a>
                </li>
                <li>
                  <a href="/cart">{cartImageElement}</a>
                </li>
              </ul>
            </nav>
            {menuImageElement}
          </div>
        </div>
      </div>
    );
    return mainContent;
  }
}
