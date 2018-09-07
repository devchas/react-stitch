import React, { Component } from 'react';

// Initialize the App Client
const client = stitch.Stitch.initializeDefaultAppClient("blogtutorial-lvjyx");
// Get a MongoDB Service Client
const mongodb = client.getServiceClient(
  stitch.RemoteMongoClient.factory,
  "mongodb-atlas"
);
// Get a reference to the blog database
const db = mongodb.db("blog");

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			commentField: ''
		}
	}

	componentDidMount() {
    client.auth
      .loginWithCredential(new stitch.AnonymousCredential())
      .then(this.retreiveComments())
      .catch(console.error);
	}

	render() {
		const { comments, commentField } = this.state;

		return (
	    <div>
	    	<h3>This is a great blog post</h3>
		    <div id="content">
		      I like to write about technology because I want to get on the
		      front page of hacker news.
		    </div>
	    	<hr />
	    	<div id="comments">
					{comments.map(({ comment, _id }) => {
						return <div key={_id}>{comment}</div>
					})}
	    	</div>
	    	<hr />
	    	Add comment:
	    	<input value={commentField} onChange={e => this.setState({ commentField: e.target.value })} />
				<button	action="submit" onClick={e => this.handleClick(e)}>Submit</button>
	    </div>
		)
	}

	retreiveComments() {
	  db.collection("comments")
	    .find({}, {limit: 1000})
	    .asArray()
	    .then(comments => this.setState({ comments }))
	}

	handleClick(e) {
		e.preventDefault();

		const comment = this.state.commentField;
    console.log("add comment", client.auth.user.id)
    db.collection("comments")
      .insertOne({ owner_id : client.auth.user.id, comment })
      .then(() => this.retreiveComments());
    this.setState({ commentField: '' });
	} 	
}

export default Blog;