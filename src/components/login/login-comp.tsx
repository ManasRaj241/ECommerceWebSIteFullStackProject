import { Component, getAssetPath, h, Element } from '@stencil/core';

@Component({
  tag: 'login-comp',
  styleUrl: 'login-comp.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class LoginComp {
  @Element() hostElement: HTMLElement;
  value3: string = '';
  value2: string = '';
  value4: string = '';
  value1: string = '';
  singleImage = 'image1.png';
  i: Number;
  regupwd: string;
  reguName: string;
  logupwd: string;
  loguName: string;

  userPassKeys = [
    {
      username: 'Manas',
      password: 'Manas',
    },
    {
      username: 'Manas Ranjan Satapathy',
      password: 'Manas123',
    },
  ];

  LoginForm: HTMLElement;
  RegForm: HTMLElement;
  Indicator: HTMLElement;

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.regSubmit = this.regSubmit.bind(this);
    this.logSubmit = this.logSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
  }

  handleChange(event: Event) {
    this.value1 = (event.target as HTMLInputElement).value;
  }

  handleChange1(event: Event) {
    this.value2 = (event.target as HTMLInputElement).value;
  }
  handleChange3(event: Event) {
    this.value3 = (event.target as HTMLInputElement).value;
  }

  handleChange4(event: Event) {
    this.value4 = (event.target as HTMLInputElement).value;
  }

  render() {
    const singleImageSrc = getAssetPath(`../assets/${this.singleImage}`);
    const imgAlt = 'Image Alt Text';
    const singleImgElement = <img src={singleImageSrc} alt={imgAlt} class="logoStencil" />;

    let mainContent = (
      <div>
        <div class="account-page">
          <div class="container">
            <div class="row">
              <div class="col-2">{singleImgElement}</div>
              <div class="col-2">
                <div class="form-container">
                  <div class="form-btn">
                    <span onClick={this.login}>Login</span>
                    <span onClick={this.register}>Register</span>
                    <hr id="Indicator" />
                  </div>
                  <form id="LoginForm" onSubmit={this.logSubmit}>
                    <input type="text" placeholder="Username" id="logName" value={this.value1} onInput={this.handleChange3} required />
                    <input type="password" placeholder="Password" id="logpwd" value={this.value2} onInput={this.handleChange4} required />
                    <button type="submit" class="btn" id="logSub">
                      Login
                    </button>
                    <a href="">Forgot password</a>
                  </form>
                  <form id="RegForm" onSubmit={this.regSubmit}>
                    <input type="text" placeholder="Username" id="regName" value={this.value3} onInput={this.handleChange} required />
                    <input type="password" placeholder="Password" id="regpwd" value={this.value4} onInput={this.handleChange1} required />
                    <button type="submit" class="btn" id="regSub">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return mainContent;
  }

  regSubmit(e: Event) {
    e.preventDefault();
    this.RegForm = this.hostElement.shadowRoot.getElementById('RegForm');
    console.log('regsubmit function called');
    this.reguName = this.value1;
    this.regupwd = this.value2;

    const flag = this.userPassKeys.some(user => user.username === this.reguName && user.password === this.regupwd);

    if (flag) {
      alert('You have already Registered');
    } else {
      this.userPassKeys.push({ username: this.reguName, password: this.regupwd });
      alert('Successfully Registered. Please Login Now');
    }
    this.clearFormInputs();
  }

  clearFormInputs() {
    const allInputs = this.RegForm.querySelectorAll('input');
    allInputs.forEach(singleInput => (singleInput.value = ''));
  }

  logSubmit(e: Event) {
    e.preventDefault();
    this.LoginForm = this.hostElement.shadowRoot.getElementById('LoginForm');
    this.loguName = this.value3;
    this.logupwd = this.value4;
    if (this.loguName == 'Manas' && this.logupwd == 'Manas') {
      location.href = 'http://localhost:3333/admin-product';
      return;
    }
    const flag = this.userPassKeys.some(user => user.username === this.loguName && user.password === this.logupwd);
    if (flag) {
      location.href = 'http://localhost:3333/product';
    } else {
      alert('Please register yourself first.');
    }
    this.clearLoginForm();
  }

  clearLoginForm() {
    const allInputs = this.LoginForm.querySelectorAll('input');
    allInputs.forEach(singleInput => (singleInput.value = ''));
  }

  login() {
    this.LoginForm = this.hostElement.shadowRoot.getElementById('LoginForm');
    this.RegForm = this.hostElement.shadowRoot.getElementById('RegForm');
    this.Indicator = this.hostElement.shadowRoot.getElementById('Indicator');
    this.RegForm.style.transform = 'translateX(300px)';
    this.LoginForm.style.transform = 'translateX(300px)';
    this.Indicator.style.transform = 'translateX(0px)';
  }
  register() {
    this.LoginForm = this.hostElement.shadowRoot.getElementById('LoginForm');
    this.RegForm = this.hostElement.shadowRoot.getElementById('RegForm');
    this.Indicator = this.hostElement.shadowRoot.getElementById('Indicator');
    this.RegForm.style.transform = 'translateX(0px)';
    this.LoginForm.style.transform = 'translateX(0px)';
    this.Indicator.style.transform = 'translateX(100px)';
  }
}
