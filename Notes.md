# React Fundamentals

Building a React app is all about components. 
We can break apart the interface of our app into two classes of components: ProductList (**parent**) and many Products (**children**).

React components are ES6 classes that extend the class React.Component.
With a given set of inputs, the output (how the component looks on the page) will always be the same.

The only required method for a React component is the *render()* method.

 In React, native HTML elements always start with a lowercase letter whereas React component names always start with an uppercase letter.


## JSX

The React community prefers using **JSX**, which enables us to write the markup of our component views in HTML-like syntax. Then, the JSX code will compile to vanilla JavaScript.

Ultimately, React components render HTML which is displayed in the browser.
React builds our apps with a fake representation of the Document Object Model (DOM), called the "virtual DOM".
Basically, React allows us to describe a component’s HTML representation in JavaScript.

In JSX, braces are a delimiter, signaling to JSX that what resides in-between the braces is a JavaScript expression.
JSX attribute values must be delimited by either braces or quotes (in case of strings).

```
id={product.id}
```

or

```
id='1'
```


## Babel

Babel is a JavaScript transpiler. It takes ES6 code and converts it into ES5 code (*transpiling*).
It allows developers to use the latest features of JavaScript, while making sure that the code will run also in browsers that only support ES5.

A great feature of Babel is that it understands JSX. We need to instruct the browser that we want to use Babel to compile and run our Javascript code and Babel will compile our JSX into vanilla ES5 that our browser can interpret and execute.


## ReactDOM.render()

Once we've defined a component, we have to tell React to render it inside a specific DOM node.

```
ReactDOM.render(
  <ProductList/>,
  document.getElementById('content')
);
```

ReactDOM comes from react-dom library. We pass in it two arguments. The first argument is **what** we’d like to render and the second argument is **where** to render it: ReactDOM.render([what], [where]);


## Make a component data-driven

It allows us to dynamically render a component based upon the data that we give it.
In React, data flows from the parent component to the child through props.


```
class ProductList extends React.Component {
  render() {
    const product = Data.products[0];
    return (
      <div className='...'>
        <Product
          id={product.id}
          title={product.title}
          description={product.description}
        />
      </div>
    );
  } 
}
```

ProductList component (parent) is passing data down to the Product component (child), which can access all its props through the object `this.props`.

```
class Product extends React.Component {
  render() {
    return (
      <div>
        <a>{this.props.title}</a>
        <p>{this.props.description}</p>
      </div>
    )
  }
}
```


## Rendering multiple products

To render multiple products, we need the ProductList component (parent) to generate an array of Product components (children).

```
class ProductList extends React.Component {
  render() {
    const productComponents = Seed.products.map((product) => (
      <Product 
        key={'product- ' + product.id}
        id={product.id}
        title={product.title}
      />
    ))

    return (
      <div>
        {productComponents}
      </div>
    )
  }
}
```

Each time we render multiple products, we need to use the `key` prop.
The React framework uses this special property to create unique bindings for each instance of the Product component.


We `map` over Seed.products (array of objects) in order to create an array of Product components.
The final result is a single parent component, ProductList that contains four child Product components,one for each product object in the Seed.products array in seed.js file:

```
[
  <Product id={1} ... />,
  <Product id={2} ... />,
  <Product id={3} ... />,
  <Product id={4} ... />
]
```


## Interaction and Event Propagation

React was built with the idea of **one-way data flow**, which means that data changes come from the **top** of the app and are propagated **downwards** through its various components.

Basically, a parent component owns the props, while a child component can read the props without modifying them (**this.props is immutable**).

Thus, we need the child component to let the parent know when an event occurs. 
The way in which children communicate events with parents is through **functions** that are passed as props. The parent component gives each child a function to call when an event occurs, for instance a button is clicked.

Then, the parent component (owner of the data) will update the vote count for that product and finally, the updated data will flow downward from the parent to the children.

To have a better idea of the whole process, let's see an example.
First of all, we need to create a function *handleProductUpVote* in ProductList that will accept a single argument, *productId*.

```
class ProductList extends React.Component {
  handleProductUpVote(productId) {
    console.log(productId + ' was upvoted.');
  }

  render() {
  }
}
```

Next, we have to pass the function down as a prop to the child component.
Inside the parent component:

```
const productComponents = products.map((product) => (
  <Product
    key={product.id}
    id={product.id}
    title={product.title}
    onVote={this.handleProductUpVote}
  />
))
```

Now, we can access this function inside Product (child component) while invoking the prop-function *this.props.onVote* with the id of the product.

```
class Product extends React.Component {
  handleUpVote() {
    this.props.onVote(this.props.id)
  }

  render() {
  }
}
```

Then, we just need to call this function every time the user clicks the button.
To handle mouse click events, we use the React special attribute **onClick**.

```
class Product extends React.Component {
  render() {
    <div className='header'>
      <a onClick={this.handleUpVote}>
        Click Me!
      </a>
    </div>
  }
}
```

In other words, when the user clicks the button, React invokes Product component’s *handleUpVote*; which will invoke its prop *onVote*. 
Finally, *onVote* is a function that lives inside the parent component and will log a message to the console.


## Binding custom component methods

In JavaScript, the **this** variable has a different binding depending on the context.
In React, we have to distinguish two separate cases: 
- when *this* is inside the *render()* method
- when *this* is inside a custom component method like *handleUpVote()*

In the first case, inside *render()*, **this** is always bound to the component; it references the component. 
React binds **this** to the component for us, since it specifies a default set of special API methods. 

However, inside handleUpVote(), **this** is *null* and we have to manually bind **this** to the component ourselves.

In our case, we want *this* inside handleUpVote() to reference the component, in the same way it does inside render() and in other special React methods like *componentDidMount()*. That's why we need **constructor()**:

```
class MyReactComponent extends React.Component { 
  constructor(props) {
    super(props); // always call this first
    
    // custom method bindings here
    this.someFunction = this.someFunction.bind(this); 
  }
}
```

**constructor()** is a special function in a JavaScript class that is invoked whenever an object is created via a class.
React invokes **constructor()** with a component’s props when initializing that particular component.

The first thing that a constructor does is calling **super(props)**. 
super() allows us to invoke that constructor() function first and then, call bind() on our custom component method.
