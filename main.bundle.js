webpackJsonp([0,3],{

/***/ 1033:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Web3 = __webpack_require__(1035);

function API() {
  var self = this;
  self.initted = false;
  self.web3;
  self.status=0;
}

API.init = function(callback) {
  var self = this;

  if (!self.initted) {
    //initialize Web3
    if(typeof web3 !== 'undefined') { //metamask situation
      self.web3 = new Web3(web3.currentProvider);
      self.status=1;
      console.log(self.status);
    } else if (window.location.protocol != "https:") { //mist/geth/parity situation
      try {
        self.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); //mist/geth/parity situation
        self.web3.eth.coinbase;
        console.log(self.status);
        self.status=2;
      } catch (err) {
        // self.web3 = new Web3(new Web3.providers.HttpProvider('YOUR_INFURA_API_URL_IF_YOU_HAVE_ONE')); //Infura situation
        self.status=3
        console.log(self.status);
      }
    } else { //Infura situation
      // self.web3 = new Web3(new Web3.providers.HttpProvider('YOUR_INFURA_API_URL_IF_YOU_HAVE_ONE'));
      self.status=3
      console.log(self.status);
    }

  //   function contractAt(abi, address) {
  //    var contract = self.web3.eth.contract(abi);
  //    contract = contract.at(address);
  //    return contract;
  //  }
   // now you can use contractAt to generate a web3 contract that will have all the abi functions attached to it




}
  callback(null, true);
}

if (__webpack_require__.c[__webpack_require__.s] === module) {
  console.log('This is a test.');
  API.init(function(err, result){
    console.log(API.web3.accounts);
  })
}

module.exports = API;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451)(module)))

/***/ },

/***/ 1067:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(453);


/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return EthereumService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var api = __webpack_require__(1033);
var EthereumService = (function () {
    function EthereumService() {
        var _this = this;
        this.abi = __WEBPACK_IMPORTED_MODULE_1__data__["a" /* ERC20abi */];
        this.ninja = __WEBPACK_IMPORTED_MODULE_1__data__["b" /* NinjaAbi */];
        this.selectToken = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](__WEBPACK_IMPORTED_MODULE_1__data__["c" /* tokenData */][0]);
        console.log('Service working...');
        this.init();
        this.selectToken.subscribe(function (x) {
            _this.currentToken = x;
        });
    }
    EthereumService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve) {
            api.init(function (err, result) {
                if (!err) {
                    if (!api.web3.eth.defaultAccount) {
                        api.web3.eth.defaultAccount = api.web3.eth.coinbase;
                        _this.account = api.web3.eth.coinbase;
                    }
                    resolve(true);
                }
                else {
                    console.log('init failed');
                }
            });
        });
    };
    EthereumService.prototype.select = function (x) {
        this.selectToken.next(x);
    };
    EthereumService.prototype.balanceOf = function (address) {
        var _this = this;
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.abi).at(_this.currentToken.address).balanceOf(address, function (err, balance) {
                if (!err) {
                    console.log(balance);
                    resolve(balance.toNumber() / Math.pow(10, _this.currentToken.digit));
                }
            });
        });
    };
    // public allowance():Promise<any>{
    //   // creation of contract object
    //   let MyContract = api.web3.eth.contract(this.abi);
    //   // initiate contract for an address
    //   let myContractInstance = MyContract.at('0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7');
    //   let onwer='0xb18626E852Ab67e854Fd6cC6f4d782A2f893a4c0';
    //   let spender='0xf82a5e7563e5c76363fff2bf83d2ee472ee38380';
    //   return new Promise(resolve=>{
    //     myContractInstance.allowance(onwer,spender,
    //       (err,result)=>{
    //       if(!err){
    //         console.log(result)
    //         resolve(result.toNumber())
    //       } else {
    //         console.log(err)
    //       }
    //     });
    //   })
    // }
    // return new Promise(resolve=>{
    //   api.web3.eth.contract(this.abi).at(this.currentToken.address).allowance.call(x,this.account,{to:this.currentToken.address},(err,allowed)=>{
    //       if(!err){
    //         console.log(`owner: ${x} spender: ${this.account} at ${this.currentToken.address}`)
    //         console.log("allowanceService: ",allowed);
    //         resolve(allowed.toNumber()/Math.pow(10,this.currentToken.digit));
    //       }
    //     }
    //   )
    // })
    // }
    // public allowance(x):Promise<any>{
    //   return new Promise(resolve=>{
    //     api.web3.eth.contract(this.abi).at(this.currentToken.address).allowance.call(x,this.account,{to:this.currentToken.address},(err,allowed)=>{
    //         if(!err){
    //           console.log(`owner: ${x} spender: ${this.account} at ${this.currentToken.address}`)
    //           console.log("allowanceService: ",allowed);
    //           resolve(allowed.toNumber()/Math.pow(10,this.currentToken.digit));
    //         }
    //       }
    //     )
    //   })
    // }
    EthereumService.prototype.transfer = function (to, amount) {
        var _this = this;
        var x = amount * Math.pow(10, this.currentToken.digit);
        console.log('amount: ', x);
        console.log("outter: " + to + " for " + amount);
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.abi).at(_this.currentToken.address).transfer.sendTransaction(to, x, { gas: 301234 }, function (err, result) {
                console.log("inner: " + to + " for " + amount);
                if (!err) {
                    console.log(result);
                    resolve(result);
                }
                else {
                    console.log(err);
                }
            });
        });
    };
    EthereumService.prototype.transferFrom = function (from, to, amount) {
        var _this = this;
        var x = amount * Math.pow(10, this.currentToken.digit);
        console.log('amount: ', x);
        console.log("outter: " + to + " for " + amount);
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.abi).at(_this.currentToken.address).transferFrom.sendTransaction(from, to, x, { gas: 301234 }, function (err, result) {
                console.log("inner: " + to + " for " + amount);
                if (!err) {
                    resolve(result);
                }
            });
        });
    };
    EthereumService.prototype.approve = function (to, amount) {
        var _this = this;
        var x = amount * Math.pow(10, this.currentToken.digit);
        console.log('amount: ', x);
        console.log("outter: " + to + " for " + amount);
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.abi).at(_this.currentToken.address).approve.sendTransaction(to, x, { gas: 301234 }, function (err, result) {
                console.log("inner: " + to + " for " + amount);
                if (!err) {
                    console.log(result);
                    resolve(result);
                }
                else {
                    console.log(err);
                }
            });
        });
    };
    EthereumService.prototype.sendTransaction = function (to, amount) {
        console.log('service fired...');
        return new Promise(function (resolve) {
            api.web3.eth.sendTransaction({ to: to, value: api.web3.toWei(amount, "ether"), gas: 301234 }, function (err, result) {
                if (!err) {
                    // console.log('web3 fired..')
                    console.log(result);
                    resolve(result);
                }
                else {
                    console.log(err);
                }
            });
        });
    };
    EthereumService.prototype.donate = function (commit, amount) {
        var _this = this;
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.ninja).at('0x45D147C800d401350B24fc1cd5Fbc98040B177C8')
                .buy.sendTransaction(commit.toString(), { to: '0x45D147C800d401350B24fc1cd5Fbc98040B177C8', value: api.web3.toWei(amount, "ether"), gas: 301234 }, function (err, result) {
                if (!err) {
                    console.log("recpient: ", result);
                    resolve(result);
                }
            });
        });
    };
    EthereumService.prototype.watch = function () {
        var _this = this;
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.ninja).at('0x45D147C800d401350B24fc1cd5Fbc98040B177C8')
                .Buy({}, { fromBlock: 3026764, toBlock: 'latest' }).watch(function (err, result) {
                console.log(result.args.buyer);
                resolve(result.args.buyer);
            });
        });
    };
    EthereumService.prototype.commitOf = function (address) {
        var _this = this;
        return new Promise(function (resolve) {
            api.web3.eth.contract(_this.ninja).at('0x45D147C800d401350B24fc1cd5Fbc98040B177C8').commit('0xb18626e852ab67e854fd6cc6f4d782a2f893a4c0', function (err, commit) {
                if (!err) {
                    resolve(commit);
                }
            });
        });
    };
    EthereumService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], EthereumService);
    return EthereumService;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/ethereum.service.js.map

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-about',
            template: __webpack_require__(763),
            styles: [__webpack_require__(758)]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/about.component.js.map

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return tokenData; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ERC20abi; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NinjaAbi; });
var tokenData = [
    { name: "1ST", address: "0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7", digit: 18,
        description: "FirstBlood.io (“FirstBlood”) is a decentralized Esports gaming platform that is powered by the blockchain" },
    { name: "MKR", address: "0xc66ea802717bfb9833400264dd12c2bceaa34a6d", digit: 18,
        description: "Maker is a Decentralized Autonomous Organization that creates and insures the dai stablecoin on the Ethereum blockchain" },
    { name: "Pluton", address: "0xd8912c10681d8b21fd3742244f44658dba12264e", digit: 18,
        description: "With Plutus Tap & Pay, you can pay at any NFC-enabled merchant." },
    { name: "SNGLS", address: "0xaec2e87e0a235266d9c5adc9deb4b2e29b54d009", digit: 0,
        description: "A Blockchain Entertainment Studio, Smart Contract Rights Management Platform and Video On-Demand Portal" },
    { name: "REP", address: "0x48c80f1f4d53d5951e5d5438b54cba84f29f32a5", digit: 18,
        description: "Augur combines the magic of prediction markets with the power of a decentralized network to create a stunningly accurate forecasting tool" },
    { name: "GDG", address: "0xe0b7927c4af23765cb51314a0e0521a9645f0e2a", digit: 9,
        description: "Every asset represents a unique bullion bar sitting in designated securitised custodial vaults." },
    { name: "NinjaToken", address: "0x45D147C800d401350B24fc1cd5Fbc98040B177C8", digit: 18,
        description: "Evolving" },
];
var ERC20abi = JSON.parse('[{"constant":true,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"uint256"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_onwer","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');
var NinjaAbi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_founder","type":"address"},{"name":"_admin","type":"address"}],"name":"changeFunder","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"blockDuration","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"commit","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_commit","type":"string"}],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"},{"name":"_transferLock","type":"bool"}],"name":"setPrice","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"transferLock","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingExchangeRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_fundinglock","type":"bool"},{"name":"_fundingAccount","type":"address"}],"name":"setFundingLock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_startBlock","type":"uint256"},{"name":"_blockDuration","type":"uint256"},{"name":"_fundingExchangeRate","type":"uint256"}],"name":"setFundingEnv","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"funding","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_onwer","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"allowance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"uint256"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingLock","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_founder","type":"address"},{"name":"_admin","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Funding","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_onwer","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/data.js.map

/***/ },

/***/ 380:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ethereum_service__ = __webpack_require__(259);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PageComponent = (function () {
    function PageComponent(ethereumService) {
        this.ethereumService = ethereumService;
        this.tokens = __WEBPACK_IMPORTED_MODULE_1__data__["c" /* tokenData */];
        this.view = 'show';
    }
    PageComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.view = 'hide';
        }, 10000);
    };
    PageComponent.prototype.select = function (x) {
        this.ethereumService.select(x);
        return false;
    };
    PageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-page',
            template: __webpack_require__(767),
            styles: [__webpack_require__(762)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__ethereum_service__["a" /* EthereumService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ethereum_service__["a" /* EthereumService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ethereum_service__["a" /* EthereumService */]) === 'function' && _a) || Object])
    ], PageComponent);
    return PageComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/page.component.js.map

/***/ },

/***/ 452:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 452;


/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(573);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/main.js.map

/***/ },

/***/ 572:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(764),
            styles: [__webpack_require__(759)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/app.component.js.map

/***/ },

/***/ 573:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_router__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_page_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__form_form_component__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__about_about_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__billboard_billboard_component__ = __webpack_require__(575);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__page_page_component__["a" /* PageComponent */],
                __WEBPACK_IMPORTED_MODULE_7__form_form_component__["a" /* FormComponent */],
                __WEBPACK_IMPORTED_MODULE_8__about_about_component__["a" /* AboutComponent */],
                // ResumeComponent,
                __WEBPACK_IMPORTED_MODULE_9__billboard_billboard_component__["a" /* BillboardComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_router__["a" /* routes */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/app.module.js.map

/***/ },

/***/ 574:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_page_component__ = __webpack_require__(380);
/* unused harmony export router */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routes; });



// import { ResumeComponent } from './resume/resume.component'
var router = [
    { path: '', redirectTo: 'page', pathMatch: 'full' },
    { path: 'page', component: __WEBPACK_IMPORTED_MODULE_2__page_page_component__["a" /* PageComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_1__about_about_component__["a" /* AboutComponent */] },
];
var routes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(router);
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/app.router.js.map

/***/ },

/***/ 575:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ethereum_service__ = __webpack_require__(259);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BillboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BillboardComponent = (function () {
    function BillboardComponent(ethereumService) {
        this.ethereumService = ethereumService;
        this.view = 'show';
    }
    BillboardComponent.prototype.ngOnInit = function () {
        this.show();
    };
    BillboardComponent.prototype.shoutout = function (_amount, _comment) {
        var comment = _comment.value;
        var amount = _amount.value;
        console.log("comment: " + comment);
        console.log("amount: " + amount);
        this.ethereumService.donate(comment, amount).then(function (result) {
            console.log('shoutout result: ', result);
        });
    };
    BillboardComponent.prototype.show = function () {
        var _this = this;
        this.ethereumService.watch().then(function (x) {
            console.log("latest comment: ", x);
            _this.ethereumService.commitOf(x).then(function (x) {
                _this.billboard = x;
                console.log('billboard: ', _this.billboard);
            });
        });
    };
    BillboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-billboard',
            template: __webpack_require__(765),
            styles: [__webpack_require__(760)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ethereum_service__["a" /* EthereumService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ethereum_service__["a" /* EthereumService */]) === 'function' && _a) || Object])
    ], BillboardComponent);
    return BillboardComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/billboard.component.js.map

/***/ },

/***/ 576:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ethereum_service__ = __webpack_require__(259);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormComponent = (function () {
    function FormComponent(ethereumService) {
        this.ethereumService = ethereumService;
        this.view = 'transfer';
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ethereumService.init().then(function () {
            _this.defaultAccount = _this.ethereumService.account;
            console.log('form defaultAccount ouput:', _this.defaultAccount);
        });
        this.ethereumService.selectToken.subscribe(function (token) {
            _this.token = token;
            console.log('form ouput currentToken: ', _this.ethereumService.currentToken);
            // this.ethereumService.balance(token);
            _this.ethereumService.balanceOf(_this.defaultAccount).then(function (x) {
                _this.balance = x;
                // this.allow=null
            });
        });
    };
    FormComponent.prototype.test = function (x) {
        console.log(x.value);
    };
    // allowance(){
    //   let from=_from.value.toString();
    //   console.log('checking from: ',typeof(from));
    //   this.ethereumService.allowance()
    //     .then(x=>{
    //       console.log('allowance: ',x);
    //       this.allow=x;
    //     }).catch(err=>console.log(err))
    // }
    FormComponent.prototype.transfer = function (_to, _amount) {
        var to = _to.value;
        var amount = _amount.value;
        console.log(to + " for " + amount);
        this.ethereumService.transfer(to, amount)
            .then(function (x) { return console.log('form transfer output: ', x); })
            .catch(function (err) { return console.log('form transfer error output: ', err); });
        return false;
    };
    FormComponent.prototype.transferFrom = function (_from, _to, _amount) {
        var from = _from.value;
        var to = _to.value;
        var amount = _amount.value;
        console.log(to + " for " + amount);
        this.ethereumService.transferFrom(from, to, amount)
            .then(function (x) { return console.log('form transfer output: ', x); })
            .catch(function (err) { return console.log('form transfer error output: ', err); });
    };
    FormComponent.prototype.approve = function (_to, _amount) {
        var to = _to.value;
        var amount = _amount.value;
        console.log(to + " for " + amount);
        this.ethereumService.approve(to, amount)
            .then(function (x) { return console.log('form transfer output: ', x); })
            .catch(function (err) { return console.log('form transfer error output: ', err); });
    };
    FormComponent.prototype.sendTransaction = function (_to, _amount) {
        var to = _to.value;
        var amount = _amount.value;
        console.log(to + " for " + amount);
        this.ethereumService.sendTransaction(to, amount)
            .then(function (x) { return console.log(x); })
            .catch(function (err) { return console.log(err); });
    };
    FormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-form',
            template: __webpack_require__(766),
            styles: [__webpack_require__(761)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ethereum_service__["a" /* EthereumService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ethereum_service__["a" /* EthereumService */]) === 'function' && _a) || Object])
    ], FormComponent);
    return FormComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/form.component.js.map

/***/ },

/***/ 577:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/environment.js.map

/***/ },

/***/ 578:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(1066);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/Owner/Desktop/TokenNinja_2/src/polyfills.js.map

/***/ },

/***/ 758:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 759:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 760:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 761:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 762:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 763:
/***/ function(module, exports) {

module.exports = "<h1>\r\n  新功能开发中！ 敬请期待...\r\n</h1>\r\n<h3>\r\n  New features are on the way...\r\n</h3>\r\n<p>\r\n  Ps: The developer of this website is a International student who graduate from Boston University major in Actuarial Science and <br>\r\n  know all kinds of crazy financial derivative pricing stuff and NEED a JOB in the US,<br>\r\n  location prefer Eastcoast: NYC,Boston  Or Westcoast: SF LA.<br>\r\n  Interested in blockchain Company<br>\r\n  VISA sponsorship prefered<br>\r\n  Current status:F1 student Visa<br>\r\n  Salary:above minimum wage, but the higher the better...<br>\r\n  Self-taught Angular2 developer and still learning!!!<br>\r\n  Have general knowledge about Solidity, the EVM, Node and blockchain<br>\r\n  Intern at Etherboost.com for 6 months. Go checkout our Awesome Dapp:\r\n  <a target=\"_blank\" href=\"http://etherdelta.github.io\">etherdelta.github.io</a><br>\r\n  Bug report, recruitment please contact:\r\n  <a target=\"_blank\" href=\"mailto:tokenninja.com@gmail.com\">tokenninja.com@gmail.com</a>\r\n</p>\r\n"

/***/ },

/***/ 764:
/***/ function(module, exports) {

module.exports = "<!-- Navigation -->\r\n<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\r\n    <div class=\"container\">\r\n        <!-- Brand and toggle get grouped for better mobile display -->\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" routerLink=\"/\">Token Niaja</a>\r\n        </div>\r\n        <!-- Collect the nav links, forms, and other content for toggling -->\r\n        <div class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav\">\r\n              <li><a routerLink=\"../about/\">About</a></li>\r\n              <!-- <li><a routerLink=\"../resume20170118/\">resume</a></li> -->\r\n            </ul>\r\n        </div>\r\n        <!-- /.navbar-collapse -->\r\n    </div>\r\n    <!-- /.container -->\r\n</nav>\r\n\r\n<!-- Page Content -->\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n  <!-- <app-page></app-page> -->\r\n\r\n  <hr>\r\n  <!-- Footer -->\r\n  <footer>\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n            <p>Copyright &copy; TokenNinja.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact:<a>TokenNinja.com@gmail.com</a></p>\r\n        </div>\r\n    </div>\r\n  </footer>\r\n</div>\r\n"

/***/ },

/***/ 765:
/***/ function(module, exports) {

module.exports = "<div class=\"thumbnail\">\r\n  <!-- <img src=\"http://placehold.it/{{billboard}}\" alt=\"\"> -->\r\n  <!-- <img src=\"https://assets.imgix.net/~text?fm=png&txtsize=36&w=600&txtfont=Avenir+Next+Condensed,Bold&txt={{billboard}}&txtpad=30&bg=3D4C5F&txtclr=fff\" alt=\"\"> -->\r\n  <div class=\"jumbotron\">\r\n    <h3>{{billboard}}</h3>\r\n  </div>\r\n  <div class=\"caption\">\r\n    <h3>BillBoard</h3>\r\n    <h4>Shout out! and Get Ninja Tokens</h4>\r\n    <p><small>and yes, it's gonna stay on BlockChain forever</small></p>\r\n    <p>\r\n      <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#shoutout\">\r\n        shout out\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"#about\">\r\n        More Info\r\n      </button>\r\n      <button class=\"btn btn-default btn-sm\" (click)=\"show()\"><span class=\"glyphicon glyphicon-refresh\"></span></button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade bs-example-modal-sm\" id=\"shoutout\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\">\r\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Donate Us and Get NinjaToken</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n\r\n        <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"view=='show'\">\r\n          Less than 0 ETH donation and message too long may cause transaction failure.\r\n          <button type=\"button\" class=\"close\" (click)=\"view='hide'\"><span aria-hidden=\"true\">&times;</span></button>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"comment\">Comment:</label>\r\n          <textarea class=\"form-control\" rows=\"3\" id=\"comment\" #comment></textarea>\r\n          <label for=\"amount\">Amount:</label>\r\n          <input type=\"text\" class=\"form-control\" id=\"amount\" #donate><br>\r\n          <button class=\"btn btn-primary center-block\" type=\"button\" (click)=\"shoutout(donate,comment)\">Donate</button>\r\n        </div>\r\n        <hr>\r\n        <p>All messages will stay on blockchain. But only the latest message will be broadcast on the Webpage,\r\n          So be nice...!!! All the ETH Donation will be converted to NinjaToken and credit back to donor's address.\r\n        </p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"modal fade bs-example-modal-sm\" id=\"about\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\">\r\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n        <h3 class=\"modal-title\" id=\"myModalLabel\">About NinjaToken</h3>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <h4>ERC20 standard Token</h4>\r\n        <p>This Token Contract is also under developmet, with each iteration, we will deliver a much secure contract</p>\r\n        <p>Some new features of this webpage can be purchased using NinjaToken</p>\r\n        <p>Maybe we will get into AI service someday...who knows</p>\r\n        <p>Check out source code:</p>\r\n        <code><a target=\"_blank\" href=\"https://etherscan.io/address/0x45d147c800d401350b24fc1cd5fbc98040b177c8#code\">Source Code</a></code><br><br>\r\n        <p>Thanks</p>\r\n        <div class=\"modal-footer\">\r\n          <p>Bug report: <a>TokenNinja.com@gmail.com</a></p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 766:
/***/ function(module, exports) {

module.exports = "<div class=\"caption\">\r\n  <h4 class=\"pull-right\">Balance: {{balance}}</h4>\r\n  <!-- <h4 class=\"pull-right\" *ngIf=\"view!='transferFrom'\">Balance: {{balance}}</h4>\r\n  <h4 class=\"pull-right\" *ngIf=\"view=='transferFrom'\">Allowance: {{allow}}</h4> -->\r\n  <h2><a target=\"_black\" href=\"https://etherscan.io/address/{{token.address}}\">{{token.name}}</a></h2>\r\n  <p>{{token.description}}</p>\r\n</div>\r\n<div class=\"ratings\">\r\n  <p class=\"pull-right\">ERC20 token</p>\r\n  <p>\r\n    <span class=\"glyphicon glyphicon-star\"></span>\r\n    <span class=\"glyphicon glyphicon-star\"></span>\r\n    <span class=\"glyphicon glyphicon-star\"></span>\r\n    <span class=\"glyphicon glyphicon-star\"></span>\r\n    <span class=\"glyphicon glyphicon-star\"></span>\r\n  </p>\r\n</div>\r\n\r\n<ul class=\"nav nav-tabs\">\r\n  <li role=\"presentation\" [class.active]=\"view=='transfer'\" (click)=\"view='transfer'\"><a>Transfer</a></li>\r\n  <li role=\"presentation\" [class.active]=\"view=='transferFrom'\" (click)=\"view='transferFrom'\"><a>TransferFrom</a></li>\r\n  <li role=\"presentation\" [class.active]=\"view=='allowance'\" (click)=\"view='allowance'\"><a>Allowance</a></li>\r\n</ul>\r\n\r\n<div class=\"form\"  [ngSwitch]=\"view\">\r\n  <form *ngSwitchCase=\"'transfer'\" >\r\n    <br>\r\n    <label for=\"toAddress\" class=\"sr-only\">To address</label>\r\n    <input type=\"text\" id=\"toAddress\" class=\"form-control\" placeholder=\"To address\" autofocus required #tTo>\r\n    <label for=\"inputPassword\" class=\"sr-only\">Amount</label>\r\n    <input type=\"text\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Amount\" #tAmount required>\r\n    <hr>\r\n    <button class=\"btn btn-primary center-block\" (click)=\"transfer(tTo,tAmount)\">Send</button>\r\n  </form>\r\n  <form *ngSwitchCase=\"'transferFrom'\">\r\n    <br>\r\n    <label for=\"fromAddress\" class=\"sr-only\">from address</label>\r\n    <input type=\"text\" id=\"fromAddress\" class=\"form-control\" placeholder=\"from address\" required #tfFrom>\r\n\r\n    <!-- <div class=\"input-group\">\r\n      <input type=\"text\" id=\"fromAddress\" class=\"form-control\" placeholder=\"from address\" required #tfFrom>\r\n      <span class=\"input-group-btn\">\r\n        <a class=\"btn btn-default\" (click)=\"allowance(tfFrom)\">check</a>\r\n      </span>\r\n    </div> -->\r\n\r\n    <label for=\"toAddress\" class=\"sr-only\">To address</label>\r\n    <input type=\"text\" id=\"toAddress\" class=\"form-control\" placeholder=\"To address\" #tfTo required>\r\n    <label for=\"inputPassword\" class=\"sr-only\">Amount</label>\r\n    <input type=\"text\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Amount\" #tfAmount required>\r\n    <hr>\r\n    <button class=\"btn btn-primary center-block\" (click)=\"transferFrom(tfFrom,tfTo,tfAmount)\">Send</button>\r\n  </form>\r\n  <form *ngSwitchCase=\"'allowance'\">\r\n    <br>\r\n    <label for=\"inputEmail\" class=\"sr-only\">To address</label>\r\n    <input type=\"text\" id=\"inputEmail\" class=\"form-control\" placeholder=\"To address\" autofocus required #aTo>\r\n    <label for=\"inputPassword\" class=\"sr-only\">Amount</label>\r\n    <input type=\"text\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Amount\" required #aAmount>\r\n    <hr>\r\n    <button class=\"btn btn-primary center-block\" (click)=\"approve(aTo,aAmount)\">Send</button>\r\n  </form>\r\n</div>\r\n"

/***/ },

/***/ 767:
/***/ function(module, exports) {

module.exports = "\r\n    <!-- Title -->\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12\">\r\n        <div class=\"alert alert-warning\" role=\"alert\" *ngIf=\"view=='show'\">\r\n          Website is still under development Refresh Can help a lot :D  Please report bugs to TokenNinja.com@gmail.com...  New feature Coming SOON...\r\n          <button type=\"button\" class=\"close\" (click)=\"view='hide'\"><span aria-hidden=\"true\">&times;</span></button>\r\n        </div>\r\n        <h3>Your Portfolio</h3>\r\n      </div>\r\n    </div>\r\n    <!-- /.row -->\r\n\r\n    <!-- Page Features -->\r\n    <div class=\"row\">\r\n\r\n      <div class=\"col-md-9 col-xs-12 hero-feature\">\r\n        <div class=\"panel panel-default\">\r\n          <div style=\"height: 50px\" class=\"panel-heading\">\r\n            <h1 style=\"margin-top:5px\" class=\"panel-title\">Tokens</h1>\r\n          </div>\r\n          <div class=\"panel-body\">\r\n            <div class=\"col-sm-6 col-xs-12\">\r\n              <div class=\"list-group\">\r\n                <a href=\"#\" class=\"list-group-item\" *ngFor=\"let token of tokens\" (click)=\"select(token)\">\r\n                  <h4 class=\"list-group-item-heading\">{{token.name}}</h4>\r\n                  <p style=\"overflow-x: hidden\" class=\"list-group-item-text\">{{token.address}}</p>\r\n                </a>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-sm-6 col-xs-12\">\r\n              <app-form></app-form>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n      <div class=\"col-md-3 col-xs-12 hero-feature\">\r\n        <app-billboard></app-billboard>\r\n      </div>\r\n\r\n    </div>\r\n    <!-- /.row -->\r\n"

/***/ }

},[1067]);
//# sourceMappingURL=main.bundle.map