import {LivTag} from "../../../components/tags/LivTag.tsx";

export const ProductTags = ({className}: { className?: string }) => {
    return (
        <div className={`justify-end tag-list gap-1 ${className}`}>
            <LivTag backgroundColor='bg-white' text="Coffee Table"/>
            <LivTag backgroundColor='bg-white' text="Industrial"/>
        </div>
    )
}