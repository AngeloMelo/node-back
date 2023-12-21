import 'reflect-metadata'
import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import './database'
import { router as userRoutes } from './routes/UserRoutes'
import { router as tagRoutes } from './routes/TagRoutes'
import { router as complimentRoutes } from './routes/ComplimentRoutes'

const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(tagRoutes)
app.use(complimentRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{

    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3000, () => console.log('server is running'))
