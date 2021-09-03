const express = require('express')
const fs = require('fs')
const ytdl = require('ytdl-core')
const app = express()
const path = require('path')
const { response } = require('express')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (request,response, next) => {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/videoInfo', async (req,res,next) => {
    const videoUrl = req.query.videoURL
    const info = await ytdl.getInfo(videoUrl)
    res.status(200).json(info)
    
    response.status(200)

})

app.get('/download',(req,res,next) => {
    let videoURL = req.query.videoURL
    let itag = req.query.itag
    
    res.header('Content-disposition','attachment;\ filename="video.mp4"')
    
    ytdl(videoURL, {
        filter: format => format.itag == itag
    }).pipe(res)
})

var port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log('http://localhost:'+ port)
})