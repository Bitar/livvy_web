import {Route, Routes} from "react-router-dom";
import {TakeQuiz} from "../sections/style-quiz/pages/TakeQuiz.tsx";

import {QuizQuestion} from "../sections/style-quiz/pages/QuizQuestion.tsx";

export const StyleQuizRoutes = () => {
    return (
        <Routes>
            <Route index element={<TakeQuiz/>}/>

            <Route path={'/question'} element={<QuizQuestion/>}/>
        </Routes>
    )
}