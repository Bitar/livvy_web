import * as Yup from "yup";

const SUPPORTED_IMAGE_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/png'
];

export const UploadInspirationSchema = Yup.object().shape({
    files: Yup.mixed()
        .test("required",
            "Please upload at least one file",
            (files: File[]) => files?.length > 0)
        .test("maxLength",
            "You can upload up to 4 images",
            (files: File[]) => files?.length <= 4)
        .test('fileFormat',
            'Each file must be an image of type .jpg .jpeg or .png',
            (files: File[]) => {
                let isValid = true;

                files.forEach((file) => {
                    isValid = isValid && SUPPORTED_IMAGE_FORMATS.includes(file.type)
                })

                return isValid
            })
});

export interface UploadInspirationFormFields {
    files: File[]
}

export const defaultUploadInspirationFields: UploadInspirationFormFields = {
    files: []
}

export const InspirationPreferenceSchema = Yup.object().shape({
    preference1: Yup.number().required("This field is required"),
    preference2: Yup.number().when("totalInspirations", ([totalInspirations], schema) => {
        if(totalInspirations >= 2)
            return schema.required("This field is required")
        return schema
    }),
    preference3: Yup.number().when("totalInspirations", ([totalInspirations], schema) => {
        if(totalInspirations >= 3)
            return schema.required("This field is required")
        return schema
    }),
    preference4: Yup.number().when("totalInspirations", ([totalInspirations], schema) => {
        if(totalInspirations == 4)
            return schema.required("This field is required")
        return schema
    })
})

export interface InspirationPreferenceFormFields {
    preference1: number|string,
    preference2?: number|string,
    preference3?: number|string,
    preference4?: number|string,
    totalInspirations: number
}

export const defaultInspirationPreferenceFields: InspirationPreferenceFormFields = {
    preference1: '',
    totalInspirations: 0
}