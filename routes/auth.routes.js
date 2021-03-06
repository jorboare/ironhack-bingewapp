const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../models/user.model')

const bcrypt = require('bcryptjs')
const bcryptSalt = 10


const isLogged = (req) => req.isAuthenticated() === true
const isNotLogged = (req) => req.isAuthenticated() === false


// CREAR CUENTA

router.get('/signup', (req, res) => res.render('auth/sign-up', { isNotLogged: isNotLogged(req) }))

router.post('/signup', (req, res) => {
    const { username, password, email, name, about, img } = req.body

    if (!username || !password || !name) {
        res.render('auth/sign-up', { errorMsg1: 'Please, fill in all required information' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('auth/sign-up', { errorMsg2: 'That username is already registered' })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            const newUser = {
                username,
                password: hashPass,
                email,
                name,
                about,
                img,
                apilists: { watchlist: { movies: [], series: [] }, seen: { movies: [], series: [] }, likes: { movies: [], series: [] } },
                seedslists: { watchlist: { movies: [], series: [] }, seen: { movies: [], series: [] }, likes: { movies: [], series: [] } }
            }

            User
                .create(newUser)
                .then(() => res.redirect('/'))
                .catch(() => res.render('auth/sign-up', { errorMsg: 'There was an error' }))
        })
        .catch(err => next(new Error(err)))
})



// INICIO DE SESIÓN

router.get('/login', (req, res) => res.render('auth/log-in', { errorMsg: req.flash('error'), isNotLogged: isNotLogged(req) }))

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
}))



// CERRAR SESIÓN

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

module.exports = router
