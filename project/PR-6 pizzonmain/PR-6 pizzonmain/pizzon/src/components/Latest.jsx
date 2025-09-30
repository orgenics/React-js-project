import React from "react";
import "./Latest.css"; // External CSS file

// ✅ Local images (optional if you want to use your own)
// import blog1 from '../assets/image/blog-3.jpg';
// import blog2 from '../assets/image/blog-4.jpg';
// import author from '../assets/image/blog-author.png';

const BlogSection = () => {
    return (
        <section className="blog-section py-5">
            <div className="container">
                {/* Section Header */}
                <div className="section-header mb-4">
                    <p className="sub-heading">From Our Blog</p>
                    <h2 className="main-heading">Our Latest News</h2>
                </div>

                {/* Blog Grid */}
                <div className="d-flex flex-wrap gap-4 blog-grid">
                    {/* Main Blog */}
                    <div className="main-blog">
                        <img
                            src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-1.jpg"
                            alt="Main Blog"
                            className="blog-img"
                        />

                        <div className="blog-content">
                            <p className="date">07 Mar 2022</p>
                            <h3 className="blog-title">
                                How to keep fear from ruining your art business with confident
                            </h3>

                            <div className="author">
                                <img
                                    src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-author.png"
                                    alt="Author"
                                    className="author-img"
                                />
                                <div>
                                    <p className="author-name">David Milar</p>
                                    <p className="author-location">London, United Kingdom</p>
                                </div>
                            </div>

                            <a href="#" className="read-more">
                                Read More <span>&rarr;</span>
                            </a>
                        </div>
                    </div>

                    {/* Side Blogs */}
                    <div className="side-blogs">
                        {[2, 3, 4].map((num) => (
                            <div className="side-blog" key={num}>
                                <img
                                    src={`https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-${num}.jpg`}
                                    alt={`Blog ${num}`}
                                />
                                <div className="side-content">
                                    <p className="date">07 Mar 2022</p>
                                    <h4 className="side-title">
                                        How to keep fear from ruining your art business with
                                        confident
                                    </h4>
                                    <a href="#" className="read-more">
                                        Read More <span>&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
