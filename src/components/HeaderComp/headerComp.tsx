import { Component, getAssetPath, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'header-component',
  styleUrl: 'headerComp.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class HeaderComp {
  mainImage = 'image1.png';
  @Prop({ mutable: true }) name: string;
  @State() APIData: string;

  render() {
    const mainImageSrc = getAssetPath(`../assets/${this.mainImage}`);
    const imgAlt = 'Image Alt Text';

    const mainImageElement = <img src={mainImageSrc} alt={imgAlt} />;
    let mainContent = (
      <div class="header">
        <div class="container">
          <div class="row">
            <div class="col-2">
              <h1>
                Give your workout
                <br />A new style!
              </h1>
              <p>
                Success is not always about greatness.... It is about consistency.
                <br />
                consistent hard work gains success. greatness Will come
              </p>
              <a href="/login" class="btn">
                <pre>Explore Now &#8594;</pre>
              </a>
            </div>
            <div class="col-2">{mainImageElement};</div>
          </div>
        </div>
      </div>
    );
    return mainContent;
  }
}
