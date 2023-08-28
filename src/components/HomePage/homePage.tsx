import { Component, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';

const Router = createRouter();

@Component({
  tag: 'home-page',
  styleUrl: 'homePage.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class HomePage {
  render() {
    return (
      <div>
        <Router.Switch>
          <Route path="/">
            <nav-bar></nav-bar>
            <header-component></header-component>
            <footer-component></footer-component>
          </Route>
          <Route path="/login">
            <nav-bar></nav-bar>
            <login-comp></login-comp>
            <footer-component></footer-component>
          </Route>
          <Route path="/cart">
            <nav-bar></nav-bar>
            <cart-component></cart-component>
            <footer-component></footer-component>
          </Route>
          <Route path="/product-details">
            <nav-bar></nav-bar>
            <product-details-component></product-details-component>
            <footer-component></footer-component>
          </Route>
          <Route path="/product">
            <nav-bar></nav-bar>
            <product-component></product-component>
            <footer-component></footer-component>
          </Route>
          <Route path="/admin-product">
            <nav-bar></nav-bar>
            <admin-product></admin-product>
            <footer-component></footer-component>
          </Route>
        </Router.Switch>
      </div>
    );
  }
}
