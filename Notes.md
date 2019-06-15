# React Fundamentals

Building a React app is all about components. 
We can break apart the interface of our app into two classes of components: ProductList (**parent**) and many Products (**children**).

React components are ES6 classes that extend the class React.Component.
With a given set of inputs, the output (how the component looks on the page) will always be the same.

The only required method for a React component is the *render()* method.


## JSX

The React community prefers using **JSX**, which enables us to write the markup of our component views in HTML-like syntax. Then, the JSX code will compile to vanilla JavaScript.

Ultimately, React components render HTML which is displayed in the browser.
React builds our apps with a fake representation of the Document Object Model (DOM), called the "virtual DOM".
Basically, React allows us to describe a component’s HTML representation in JavaScript.


## Babel

Babel is a JavaScript transpiler. It takes ES6 code and converts it into ES5 code (*transpiling*).
It allows developers to use the latest features of JavaScript, while making sure that the code will run also in browsers that only support ES5.

A great feature of Babel is that it understands JSX. We need to instruct the browser that we want to use Babel to compile and run our Javascript code and Babel will compile our JSX into vanilla ES5 that our browser can interpret and execute.