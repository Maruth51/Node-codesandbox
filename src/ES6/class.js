class Human {
  //tatic count = 0;
  static count() {
    console.log(`this is a static function`);
  }
  constructor(first, last) {
    this._firstname = first;
    this._lastname = last;
  }
  speak(word) {
    console.log(`He tells ${word}`);
  }
  get name() {
    return this._firstname + " " + this._lastname;
  }
  set name(humanname) {
    const [firstname = "", lastname = ""] = humanname.split(" ");
    this._lastname = lastname;
    this._firstname = firstname;
  }
}

const tony = new Human("tony", "stark");
f;
console.log(tony);

const myname = tony.name;
tony.name = "Thor ragnorak";

console.log(myname + "this is tony" + tony.name);
