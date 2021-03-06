class ProductList extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.setState({
      products: Seed.products
    });
  }

  handleProductUpVote = (productId) => {
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

  handleProductDownVote = (productId) => {
    const newProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes - 1,
        });
      } else {
        return product;
      }
    });

    this.setState({
      products: newProducts
    });
  }

  render() {
    const products = this.state.products.sort((a, b) => ( // sort() mutates the original array it was called on
      b.votes - a.votes
    ));

    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        upVote={this.handleProductUpVote}
        downVote={this.handleProductDownVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}


class Product extends React.Component {
  handleUpVote = () => (
    this.props.upVote(this.props.id)
  );

  handleDownVote = () => (
    this.props.downVote(this.props.id)
  );

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ProductList/>,
  document.getElementById('content')
);
