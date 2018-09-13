import React, { Component } from 'react';
import { 
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import Blog from '../components/Blog';

// Initialize the App Client
const client = Stitch.initializeDefaultAppClient("<your-app-id>");
// Get a MongoDB Service Client
const mongodb = client.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
// Get a reference to the blog database
const db = mongodb.db("blog");

class BlogContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { comments: [] }
	}

	componentDidMount() {
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.retrieveComments())
      .catch(console.error);
	}

	render() {
		const props = {
			comments: this.state.comments,
			addComment: comment => this.addComment(comment),
			deleteComment: _id => this.deleteComment(_id)
		}

		return <Blog {...props} />
	}

	retrieveComments() {
	  db.collection("comments")
	    .find({}, {limit: 1000})
	    .asArray()
	    .then(comments => this.setState({ comments }))
	}

	addComment(comment) {
    db.collection("comments")
      .insertOne({ owner_id : client.auth.user.id, comment })
      .then(() => this.retrieveComments())
	}

	deleteComment(_id) {
		db.collection("comments")
			.deleteOne({ _id })
			.then(() => this.retrieveComments())
	}	
}

export default BlogContainer;