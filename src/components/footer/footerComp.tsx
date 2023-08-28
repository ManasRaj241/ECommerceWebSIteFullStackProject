import { Component, getAssetPath, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'footer-component',
  styleUrl: 'footerComp.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class Footer {
  playStoreImage = 'play-store.png';
  AppStoreImage = 'app-store.png';
  LogoImage = 'project-logo.jpeg';
  @Prop({ mutable: true }) name: string;
  @State() APIData: string;

  render() {
    const playStoreImageSrc = getAssetPath(`../assets/${this.playStoreImage}`);
    const appStoreImageSrc = getAssetPath(`../assets/${this.AppStoreImage}`);
    const logoImageSrc = getAssetPath(`../assets/${this.LogoImage}`);
    // const imgSrc = '../../../src/components/assets/app-store.png';
    const imgAlt = 'Image Alt Text';

    const logoImgElement = <img src={logoImageSrc} alt={imgAlt} />;
    const playStoreImageElement = <img src={playStoreImageSrc} alt={imgAlt} />;
    const appStoreImageElement = <img src={appStoreImageSrc} alt={imgAlt} />;

    let mainContent = (
      <div class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col-1">
              <h3>Download Our App</h3>
              <p>Download App for Android and ios mobile phone.</p>
              <div class="app-logo">
                {playStoreImageElement}
                {appStoreImageElement}
              </div>
            </div>
            <div class="footer-col-2">
              {logoImgElement}
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, maiores exercitationem fugit nemo placeat</p>
            </div>
            <div class="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li>Coupons</li>
                <li>Blog Post</li>
                <li>Return Policy</li>
                <li>Join Affiliate</li>
              </ul>
            </div>
            <div class="footer-col-4">
              <h3>Follow Us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>
          <hr />
          <p class="copyright">Copyright 2023 - Manas Ranjan Satapathy</p>
        </div>
      </div>
    );
    return mainContent;
  }
}

{
  /* <div class="footer">
        <div class="container">
            <div class="row">
                <div class="footer-col-1">
                    <h3>Download Our App</h3>
                    <p>Download App for Android and ios mobile phone.</p>
                    <div class="app-logo">
                        <img src="images/play-store.png" alt="Play Store">
                        <img src="images/app-store.png" alt="App Store">
                    </div>
                </div>
                <div class="footer-col-2">
                    <img src="images/project-logo.jpeg" alt="Image">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, maiores exercitationem fugit nemo placeat</p>
                </div>
                <div class="footer-col-3">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>Coupons</li>
                        <li>Blog Post</li>
                        <li>Return Policy</li>
                        <li>Join Affiliate</li>
                    </ul>
                </div>
                <div class="footer-col-4">
                    <h3>Follow Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>Youtube</li>
                    </ul>
                </div>
            </div>
            <hr>
            <p class="copyright">Copyright 2023 - Manas Ranjan Satapathy</p>
        </div>
    </div> */
}
