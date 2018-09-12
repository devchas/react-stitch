import React, { Component } from 'react';

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = { commentField: '' }
	}

	render() {
		const { commentField } = this.state;

		return (
	    <div>
	    	<h3>This is a great blog post!</h3>
		    <div id="content">Here is my amazing blog post.</div>
	    	<hr />
	    	{this.renderComments()}
	    	<hr />
	    	Add comment:
	    	<input value={commentField} onChange={e => this.setState({ commentField: e.target.value })} />
				<button	action="submit" onClick={e => this.handleClick(e)}>Submit</button>
	    </div>
		)
	}

	renderComments() {
	  const { comments } = this.props;

	  return (  	
    	<div id="comments">
				{comments.map(({ comment, _id }) => {
					return (
						<div key={_id}>
							{comment}
							<button onClick={() => this.props.deleteComment(_id)}>delete</button>
						</div>
					);
				})}
    	</div>
	  );
	}

	handleClick(e) {
		e.preventDefault();
		this.props.addComment(this.state.commentField);
    this.setState({ commentField: '' });
	} 	
}

export default Blog;