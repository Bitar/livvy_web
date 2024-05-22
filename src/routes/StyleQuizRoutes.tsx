import {Route, Routes} from "react-router-dom";
import {TakeQuiz} from "../sections/style-quiz/pages/TakeQuiz.tsx";

import {Quiz} from "../sections/style-quiz/pages/Quiz.tsx";

export const StyleQuizRoutes = () => {
    return (
        <Routes>
            <Route index element={<TakeQuiz/>}/>

            <Route path={'/question'} element={<Quiz/>}/>
        </Routes>
    )
}