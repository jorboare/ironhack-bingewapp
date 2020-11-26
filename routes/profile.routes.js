const express = require('express')
const router = express.Router()

const User = require('../models/user.model')


// const axios = require('axios')
// const apiHandler = axios.create({
//     baseURL: "https://api.themoviedb.org/3"
// })


const isLogged = (req) => req.isAuthenticated() === true
const isNotLogged = (req) => req.isAuthenticated() === false

const apiData = (yes) => yes

const moviesListEmpty = (req) => (req.user.apilists.watchlist.movies.length === 0 || req.user.apilists.likes.movies.length === 0 || req.user.apilists.seen.movies.length === 0) ? true : null
const seriesListEmpty = (req) => (req.user.apilists.watchlist.series.length === 0 || req.user.apilists.likes.series.length === 0 || req.user.apilists.seen.series.length === 0) ? true : null

const lastIndex = (array) => array.length - 1;


// USER PROFILE PAGE

router.get('/', (req, res, next) => {

    User
        .findById(req.user.id)
        .then(theUser => {

            const lastMovieWL = theUser.apilists.watchlist.movies[lastIndex(theUser.apilists.watchlist.movies)]
            const lastMovieLK = theUser.apilists.likes.movies[lastIndex(theUser.apilists.likes.movies)]
            const lastMovieSN = theUser.apilists.seen.movies[lastIndex(theUser.apilists.seen.movies)]
            const lastSeriesWL = theUser.apilists.watchlist.series[lastIndex(theUser.apilists.watchlist.series)]
            const lastSeriesLK = theUser.apilists.likes.series[lastIndex(theUser.apilists.likes.series)]
            const lastSeriesSN = theUser.apilists.seen.series[lastIndex(theUser.apilists.seen.series)]

            res.render('user/user-profile', { theUser, lastMovieWL, lastMovieLK, lastMovieSN, lastSeriesWL, lastSeriesLK, lastSeriesSN, apiData: apiData(true), isLogged: isLogged(req), moviesListEmpty: moviesListEmpty(req), seriesListEmpty: seriesListEmpty(req) })

            // apiHandler
            //     .get(`/tv/${theUser.apilists.watchlist.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //     .then(response => {
            //         let data = response.data
            //         console.log(data)
            //         res.render('user/user-profile', { theUser, lastSeriesWL: data, apiData: apiData(true), isLogged: isLogged(req), moviesListEmpty: moviesListEmpty(req), seriesListEmpty: seriesListEmpty(req) })
            //     })
            //     .catch(err => next(new Error(err)))



            // let lastMovieWL, lastMovieLK, lastMovieSN, lastSeriesWL, lastSeriesLK, lastSeriesSN;

            // if (theUser.apilists.watchlist.movies.length != 0) {
            //     apiHandler
            //         .get(`/movies/${theUser.apilists.watchlist.movies[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //         .then(response => lastMovieWL = response.data)
            //         .catch(err => next(new Error(err)))
            //     return lastMovieWL
            // }
            // if (theUser.apilists.likes.movies.length != 0) {
            //     apiHandler
            //         .get(`/movies/${theUser.apilists.likes.movies[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //         .then(response => lastMovieLK = response.data)
            //         .catch(err => next(new Error(err)))
            //     return lastMovieLK
            // }
            // if (theUser.apilists.seen.movies.length != 0) {
            //     apiHandler
            //         .get(`/movies/${theUser.apilists.seen.movies[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //         .then(response => lastMovieSN = response.data)
            //         .catch(err => next(new Error(err)))
            //     return lastMovieSN
            // }
            // if (theUser.apilists.watchlist.series.length != 0) {
            //     apiHandler
            //         .get(`/tv/${theUser.apilists.watchlist.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //         .then(response => lastSeriesWL = response.data)
            //         .catch(err => next(new Error(err)))
            //     return lastSeriesWL
            // }
            // if (theUser.apilists.likes.series.length != 0) {
            //     apiHandler
            //         .get(`/tv/${theUser.apilists.likes.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //         .then(response => lastSeriesLK = response.data)
            //         .catch(err => next(new Error(err)))
            //     return lastSeriesLK
            // }
            // if (theUser.apilists.seen.series.length != 0) {
            //     apiHandler
            //         .get(`/tv/${theUser.apilists.seen.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            //         .then(response => lastSeriesSN = response.data)
            //         .catch(err => next(new Error(err)))
            //     return lastSeriesSN
            // }



            // const lastMovieLKprom = apiHandler.get(`/movies/${theUser.apilists.likes.movies[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            // const lastMovieSNprom = apiHandler.get(`/movies/${theUser.apilists.seen.movies[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            // const lastSeriesWLprom = apiHandler.get(`/tv/${theUser.apilists.watchlist.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            // const lastSeriesLKprom = apiHandler.get(`/tv/${theUser.apilists.likes.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)
            // const lastSeriesSNprom = apiHandler.get(`/tv/${theUser.apilists.seen.series[0]}?api_key=95ad659b54a1464fdb415db2270f7402`)

            // Promise.all([lastMovieWLprom, lastMovieLKprom, lastMovieSNprom, lastSeriesWLprom, lastSeriesLKprom, lastSeriesSNprom])
            //     .then(response => res.render('user/user-profile', { theUser, lastMovieWL: response[0].data, lastMovieLK: response[1].data, lastMovieSN: response[2].data, lastSeriesWL: response[3].data, lastSeriesLK: response[4].data, lastSeriesSN: response[5].data, apiData: apiData(true), isLogged: isLogged(req), moviesListEmpty: moviesListEmpty(req), seriesListEmpty: seriesListEmpty(req) }))
            //     .catch(err => next(new Error(err)))

        })
        .catch(err => next(new Error(err)))
})




// EDIT USER PROFILE FORM

router.get('/edit', (req, res, next) => {
    const userId = req.query.id

    User.findById(userId)
        .then(user => res.render('user/edit-profile', { user, isLogged: isLogged(req) }))
        .catch(err => next(new Error(err)))
})

// SEND EDIT USER PROFILE FORM

router.post('/edit', (req, res, next) => {
    const userId = req.query.id
    const { name, email, about, img } = req.body

    User.findByIdAndUpdate(userId, { name, email, about, img })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})




// DELETE USER PAGE

router.get('/delete', (req, res, next) => {
    const userId = req.query.id

    User.findById(userId)
        .then(user => res.render('user/delete-profile', { user, isLogged: isLogged(req) }))
        .catch(err => next(new Error(err)))
})

// CONFIRM DELETE USER

router.post('/delete', (req, res, next) => {
    const userId = req.query.id

    User.findByIdAndDelete(userId)
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))
})




// USER'S WATCHLIST PAGE

router.get('/watchlist', (req, res, next) => {
    User
        .findById(req.query.id)
        .then(theUser => res.render('user/user-watchlist', { theUser, moviesWL: theUser.apilists.watchlist.movies, seriesWL: theUser.apilists.watchlist.series, apiData: apiData(true), isLogged: isLogged(req), moviesListEmpty: moviesListEmpty(req), seriesListEmpty: seriesListEmpty(req) }))
        .catch(err => next(new Error(err)))
})

router.post('/watchlist/remove', (req, res, next) => {
    // const content = req.query.content
    // User
    //     .findById(req.user.id)
    //     .then(theUser => {
    //         if (content == 'series') {
    //             User.find({db_id: req.query.db_id})
    //             //theUser.apilists.watchlist.series.find({db_id: req.query.db_id})
    //             .then(serie => console.log(serie))
    //         } else if (content == 'movies') {
                
    //             //theUser.apilists.watchlist.movies.find({ db_id: req.query.db_id })
    //             .then(movie => console.log(movie)) 
    //         }
    //         //.drop({ db_id: req.query.db_id })
    //     })
    //     .catch(err => next((err)))
})


// USER'S SEEN LIST PAGE

router.get('/seen', (req, res, next) => {
    User
        .findById(req.query.id)
        .then(theUser => res.render('user/user-seen', { theUser, moviesSN: theUser.apilists.seen.movies, seriesSN: theUser.apilists.seen.series, apiData: apiData(true), isLogged: isLogged(req), moviesListEmpty: moviesListEmpty(req), seriesListEmpty: seriesListEmpty(req) }))
        .catch(err => next(new Error(err)))
})


// USER'S LIKES LIST PAGE

router.get('/likes', (req, res, next) => {
    User
        .findById(req.query.id)
        .then(theUser => res.render('user/user-likes', { theUser, moviesLK: theUser.apilists.likes.movies, seriesLK: theUser.apilists.likes.series, apiData: apiData(true), isLogged: isLogged(req), moviesListEmpty: moviesListEmpty(req), seriesListEmpty: seriesListEmpty(req) }))
        .catch(err => next(new Error(err)))
})




module.exports = router