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
        .test('fileFormat',
            'Each file must be an image of type .jpg .jpeg or .png)',
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