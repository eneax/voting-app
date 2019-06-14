# React Fundamentals

Building a React app is all about components. 
We can break apart the interface of our app into two classes of components: ProductList (**parent**) and many Products (**children**).

React components are ES6 classes that extend the class React.Component.
With a given set of inputs, the output (how the component looks on the page) will always be the same.

The only required method for a React component is the *render()* method.

The React community prefers using **JSX**, which enables us to write the markup of our component views in HTML-like syntax. Then, the JSX code will compile to vanilla JavaScript.

Ultimately, React components render HTML which is displayed in the browser.
React builds our apps with a fake representation of the Document Object Model (DOM), called the virtual DOM.

Basically, React allows us to describe a component’s HTML representation in JavaScript.
