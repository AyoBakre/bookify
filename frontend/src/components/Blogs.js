// Blogs.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlogs, deleteBlogs } from "../actions/blogs";
import EditBlogs from "./EditBlogs";
import NewPage from "./NewPage";
import "../styles.css"; // Import the CSS file for styling

export class Blogs extends Component {
  state = {
    cloneId: 0,
    cloneTitle: "",
    cloneDescription: "",
    editing: false,
    hideBlogsDuringUpdate: false,
    openNewPage: false,
    MAX_LENGTH: 250, // per blog
    currentPage: 1,
    blogsPerPage: 5, // Number of blogs to display per page
    searchQuery: "", // Search query state
  };

  newPage = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneDescription: blog.description,
      openNewPage: true,
    });
  };

  toggleHideOnUpdate = () => {
    this.setState({
      hideBlogsDuringUpdate: !this.state.hideBlogsDuringUpdate,
    });
  };

  componentDidMount() {
    console.log("fetching blogs from api...");
    this.props.getBlogs();
  }

  handleEdits = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneDescription: blog.description,
      editing: !this.state.editing,
    });
    console.log("edit button contains", blog);
  };

  toggleEditing = () => {
    this.setState({
      editing: false,
    });
  };

  toggleOpenNewPage = () => {
    this.setState({
      openNewPage: false,
    });
  };

  // Function to change the current page
  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  // Event handler for search input change
  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { blogs, deleteBlogs } = this.props;
    const { currentPage, blogsPerPage, searchQuery, openNewPage } = this.state;

    // Check if searchQuery is empty, if so, display all books
    const filteredBlogs = searchQuery
      ? blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : blogs;

    // Get the index of the last blog to be displayed
    const indexOfLastBlog = currentPage * blogsPerPage;
    // Get the index of the first blog to be displayed
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    // Get the current blogs to display on the current page
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
      <div className="container">
        {this.state.editing ? (
          <EditBlogs
            cloneId={this.state.cloneId}
            cloneTitle={this.state.cloneTitle}
            cloneDescription={this.state.cloneDescription}
            toggleEditing={this.toggleEditing}
            toggleHideOnUpdate={this.toggleHideOnUpdate}
            toggleOpenNewPage={this.toggleOpenNewPage}
          />
        ) : (
          ""
        )}

        {/* Render the search bar and pagination only if not on the individual blog page */}
        {!openNewPage && (
          <>
            {/* Search Input (at the top) */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for a book..."
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
            </div>

            {/* Pagination buttons */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, index) => (
                <button key={index} onClick={() => this.paginate(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
            <br />
            <hr/>
          </>
        )}

        {this.state.hideBlogsDuringUpdate || this.props.hideAllBlogs ? (
          ""
        ) : (
          <div>
            {this.state.openNewPage ? (
              <NewPage
                cloneId={this.state.cloneId}
                cloneTitle={this.state.cloneTitle}
                cloneDescription={this.state.cloneDescription}
                handleEdits={this.handleEdits}
                toggleHideOnUpdate={this.toggleHideOnUpdate}
              />
            ) : (
              <div>
                <h3>All Books</h3>
                {currentBlogs.map((blog) => (
                  <div className="card body card-spacing text-white bg-dark" key={blog.id}>
                    <h4>Author: {user.username}</h4>
                    <hr className="new1"></hr>

                    <h4>Title: {blog.title}</h4>
                    <hr className="new1"></hr>

                    {blog.description.length > this.state.MAX_LENGTH ? (
                      <div>
                        {`${blog.description.substring(0, this.state.MAX_LENGTH)}...`}
                        <span onClick={this.toggleBlogLength}></span>
                      </div>
                    ) : (
                      <p className="justify-description-css">
                        {blog.description}
                      </p>
                    )}

                    {/* Edit Blog */}
                    <span
                      className="span-button"
                      onClick={() => {
                        this.handleEdits(blog);
                        this.toggleHideOnUpdate();
                      }}
                    >
                      <i className="edit-button far fa-edit fa-2x button-css" />
                    </span>

                    {/* full blog */}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.newPage(blog);
                      }}
                    >
                      view book
                    </button>

                    {/* Delete Blog */}
                    <span
                      className="span-button"
                      onClick={this.props.deleteBlogs.bind(this, blog.id)}
                    >
                      <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBlogs, deleteBlogs })(Blogs);
