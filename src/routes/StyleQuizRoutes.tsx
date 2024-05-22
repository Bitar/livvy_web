import {Route, Routes} from "react-router-dom";
import {TakeQuiz} from "../sections/style-quiz/pages/AB/TakeQuiz.tsx";

import {Quiz} from "../sections/style-quiz/pages/AB/Quiz.tsx";

export const StyleQuizRoutes = () => {
    return (
        <Routes>
            <Route index element={<TakeQuiz/>}/>

            <Route path={'/quiz'} element={<Quiz/>}/>
        </Routes>
    )
}