import {FC} from "react";
import {WithChildren} from "../helpers/WithChildren.ts";

export const StickyContainer: FC<WithChildren> = ({children}) => {
    return (
        <div className="relative md:sticky md:self-start md:pb-6 md:top-0 md:left-0">
            {children}
        </div>
    )
}