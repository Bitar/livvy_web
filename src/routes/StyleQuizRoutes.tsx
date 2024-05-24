import {Route, Routes} from "react-router-dom";

import {TakeQuiz} from "../sections/style-quiz/pages/TakeQuiz.tsx";
import {Quiz} from "../sections/style-quiz/pages/Quiz.tsx";
import {Results} from "../sections/style-quiz/pages/Results.tsx";

export const StyleQuizRoutes = () => {
    return (
        <Routes>
            <Route index element={<TakeQuiz/>}/>

            <Route path={'/quiz'} element={<Quiz/>}/>

            <Route path={'/results'} element={<Results/>}/>
        </Routes>
    )
}