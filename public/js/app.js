class ProductList extends React.Component {
  render() {
    return (
      <div className="ui unstackable items">
        Hello, friend! I am a basic React component.
      </div>
    )
  }
}







/* 
* NOTES
- Building a React app is all about components.
- We can break apart the interface of our app into two classes of components: ProductList (parent) and many Products (children)
- With a given set of inputs, the output (how the component looks on the page) will always be the same.
- React components are ES6 classes that extend the class React.Component
- render() is the only required method for a React component
- We are going to use JSX, which enables us to write the markup of our component views in HTML-like syntax.
- This JSX code will compile to vanilla JavaScript.
- React components ultimately render HTML which is displayed in the browser.
- the render() method of a component needs to describe how the view should be represented as HTML. 
- React builds our apps with a fake representation of the Document Object Model (DOM). React calls this the virtual DOM
- Basically, React allows us to describe a component’s HTML representation in JavaScript.
*/