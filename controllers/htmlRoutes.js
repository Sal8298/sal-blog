const router = require('express').Router();
const { Comment, Post, User } = require('../models');


//Login
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    } else {
        res.render("login");
    }
});

//SignUp redirect
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Homepage
router.get('/', async (req, res) => {
    try {
        const blogPost = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
            ],
        });
        const blogPosts = blogPost.map((Post) =>
            Post.get({ plain: true })
        );
        res.render('homepage', {
            blogPosts,
            // loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    // if (!req.session.loggedIn) {
    //     res.redirect('/login');
    // } else 
    {
        try {
            const blogPost = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password']
                        }
                    },
                ],
                where: {
                    post_user_id: req.session.user_id,
                },
            });
            const blogPosts = blogPost.map((Post) =>
                Post.get({ plain: true })
            );
            res.render('dashboard', {
                blogPosts,
                // loggedIn: req.session.loggedIn,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});
