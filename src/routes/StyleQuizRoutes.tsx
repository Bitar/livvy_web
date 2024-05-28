import {Route, Routes} from "react-router-dom";

import {TakeQuiz} from "../sections/style-quiz/pages/TakeQuiz.tsx";
import {Quiz} from "../sections/style-quiz/pages/Quiz.tsx";
import {Results} from "../sections/style-quiz/pages/Results.tsx";
import {VisualQuiz} from "../sections/style-quiz/pages/VisualQuiz.tsx";

export const StyleQuizRoutes = () => {
    return (
        <Routes>
            <Route index element={<TakeQuiz/>}/>

            <Route path={'/quiz'} element={<Quiz/>}/>

            <Route path={'/confirm-style'} element={<VisualQuiz/>}/>

            <Route path={'/results'} element={<Results/>}/>
        </Routes>
    )
}