import { router as authRouter } from "../auth/auth.routes";
import { router as roomRouter } from "../room/room.routes";
import { router as questionRouter } from "../question/question.routes";
import { Route, Routes } from "./routes.types";



export const routes: Routes = [
    new Route("/auth", authRouter),
    new Route("/room", roomRouter),
    new Route("/question", questionRouter)
]