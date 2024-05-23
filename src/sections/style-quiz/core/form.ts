import * as Yup from "yup";

export const QuestionSchema = Yup.object().shape({
    answer: Yup.string().required('Answer required')
});

export interface QuestionForm {
    id: number,
    answer: string
}