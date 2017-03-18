import {Audio} from './audio';

class Greeter {
  constructor(private name: string) {        
  }

  greet() {
    console.log(`Cześć ${this.name}`);
  }
}

new Greeter('Matt').greet();
