const marks = [20, 30, 40, 50];

const increasedmarks = marks.map((mark, index) => {
  // console.log(mark, index);
  return mark + 5;
});
console.log("incrreasesmark", increasedmarks);

// when we one variable to arrow funcyion, () not needed
// when one expression we can simplyfy like below

const filteredmarks = marks.filter(mark => mark > 25);

console.log(filteredmarks);

const simplefind = marks.find(mark => mark === 20);

console.log(simplefind);

const simpletotal = marks.reduce((acc, mark) => acc + mark, 0);
console.log(simpletotal);

const myhtml = text => `<div>
  <p>
    ${text}
  </p>
</div>`;

const myobject = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5
};

console.log(`template literal ${myhtml("hello world")}`);

//array destructure
//if we want to variable out of array we use array destrucuring.
//spread operator
const { one, two, three } = myobject;

const [mech, civil, diode] = marks;
console.log(mech, civil, diode);

//if key and value shares the same nae we can ignore the value part

console.log({ one, two, three });
