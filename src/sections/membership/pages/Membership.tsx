import {LivButton} from "../../../components/buttons/LivButton.tsx";
import { useMasterLayout } from "../../../layout/MasterLayoutContext.loader.ts";
import {useEffect} from "react";

export const Membership = () => {
    const {setBackgroundType, setBackgroundColor} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
    }, []);

    return (
        <div className="container liv-container">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:mb-20 mb-8">
                <h1 className={'text-4xl md:text-5xl lg:text-7xl uppercase'}>select your <br/> <span style={{fontFamily: "PP Editorial New"}}
                                                                                                     className="font-thin italic capitalize">membership</span>
                </h1>

                <div className="mt-2.5 sm:mt-0 sm:bg-black sm:rounded-full sm:w-44 sm:h-44 lg:w-48 lg:h-48 relative sm:inline-block">
                    <p className="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-white text-xs sm:text-center sm:w-3/5">
                        Hiring an interior designer for a single room typically costs <span className="font-bold">$1,500
                        to $12,000</span>. <br/> At LIVVY we make designing your dream space accessible.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 xl:gap-28 lg:gap-14 sm:grid-cols-2 sm:gap-12">
                <Plan name={'gold plan'} perMonth={'$15'} perYear={'$120'} perks={['Design up to 5 rooms a month', 'Unlimited Photo Uploads', 'Pinterest connect']}/>
                <Plan name={'platinum plan'} perMonth={'$17'} perYear={'$160'} perks={['All features of Gold plus unlimited room designs', 'Unlimited Furniture Uploads', 'Share designs with others & sell designs on marketplace']}/>
                <Plan name={'diamond plan'} perMonth={'$20'} perYear={'$180'} perks={['All features of Platinum', 'Celebrity Designs', 'Exclusive discounts & early access to seasonal items']}/>
            </div>
        </div>
    )
}

const Plan = ({name, perMonth, perYear, perks}: { name: string, perMonth: string, perYear: string, perks: string[] }) => {
    return (
        <div>
            <h3 className="uppercase text-xl pb-2.5 sm:pb-5 border-b border-b-black">{name}</h3>

            <div className="py-2.5 sm:py-5 lg:py-7">
                <h4 className="text-4xl lg:text-6xl mb-2.5">{perMonth}/mo</h4>
                <p className="uppercase text-lg">or {perYear} yearly</p>
            </div>

            <div>
                <LivButton as="button" text={'get started'} borderColor={'border-black'} bgColor={'bg-black'} onClickHandler={() => console.log('chose membership')} textColor={'text-white'} fullWidth={true} onWhiteBg={true}/>
            </div>

            <ul className="py-5 sm:py-7">
                {
                    perks.map((perk, index) => <li className="flex justify-start items-start capitalize mb-6" key={index}>
                        <img src={`/assets/check.svg`} className="me-2 w-[20px] h-[20px]" alt={"checkmark"}/>
                        <span>{perk}</span>
                    </li>)
                }
            </ul>
        </div>
    )
}