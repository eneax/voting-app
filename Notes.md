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


## Using state

In our voting-app, we used seed.products as a way to inject some sample data, but it is not intended as a database.
What we want is a place to store and manage data, and that's what **state** is.

While props are immutable and owned by the parent component, *state* is an object (in React components) that is owned by the child component itself and can be updated using **this.setState()**.

Every time the state or props of a component update, it triggers a re-rendering of the component itself. This rendering is **deterministic**.
It means that, given a set of props and state (inputs), a React component will always generate the same output.

Before adding state to a component, we need to define how the initial state should look like and since we want to modify the data for our list of products (number of votes), ProductList will be the owner of this state. The parent component, then, will pass this state down as props to the children.

Considering that *constructor()* is called when initializing a component, it’s the best place to define our initial state which will look like this: 

```
class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  ...
}
```

Once the state has been initialized, we can read it using **this.state**:

```
render() {
  const products = this.state.products.sort((a, b) => {
    b.votes - a.votes
  });
}
```


## Setting state with this.setState()

It’s considered best practice to initialize components with “empty” state and after the component is initialized, we need to seed the state with data.

In React, we have a collection of **lifecycle methods** and one of them, that we use on a daily basis, is **componentDidMount()**.
The component mounts on the page with an empty state (i.e. empty products array) and we populate the state with data thanks to **componentDidMount()** and **this.setState()** (asynchronous). Basically **this.setState()** is the only way to modify state.
After the state changes, the React component will re-render and the products will appear on the page.

```
class ProductList extends React.Component {
  ...

  componentDidMount() {
    this.setState({
      products: Seed.products
    });
  }
}
```


## Updating state and immutability

After setting the initial state, we have to be able to modify it in response to user input. In particular, we want to increment the votes property on a product when the user votes for it.
We could modify the state in many ways, for instance using **push()** and **concat()**. However, it's best practice to treat state as **immutable**.

A better way to modify state is to create a new array (of products in our case). So every time we have to modify the state (one of the product objects inside the products array) we will modify the clone of the object, instead of the original one.

```
class ProductList extends React.Component {
  ...

  handleProductUpVote(productId) {
    const newProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });

    this.setState({
      products: newProducts
    });
  }
}
```

We used **map()** to loop over the products array, since map() returns a new array.
**Object.assign()** is used to avoid mutating the original objects. That's why we create a new object copying over the properties from the original one and set it to increment vote count. Finally, we update the state with **this.setState()**.

One more thing to remember is that **handleProductUpVote()** is a custom component method. We need to *bind()* **this** in **handleProductUpVote()** in order to reference our component.

```
class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }
}
```


## Property initializers

As we discussed earlier, every time we create a custom component method, we need to bind **this** to the component.
That's why we had to perform a manual binding using **constructor()** and **super()**.

Thanks to Babel, developers can use the latest versions of JavaScript without leaving older browsers behind.
Available in the Babel plugin transform-class-properties, we can find *property initializers*; which allow us to write a custom component method (i.e. *handleUpVote*) as an arrow function.

In this way, **this** inside the function is bound to the component and we don't need *constructor* and manual binding anymore.

```
class Product extends React.Component {
  handleUpVote = () => (
    this.props.onVote(this.props.id)
  );

  render() {
  }
}
```
