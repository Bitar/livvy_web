import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import {useEffect} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";

export const Membership = () => {
    const {setBackgroundType, setBackgroundColor} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
    }, []);

    return (
        <div className="container liv-container">
            <div className="flex justify-between items-center sm:mb-20 mb-8">
                <h1 className={'text-4xl md:text-5xl lg:text-7xl uppercase'}>select your <br/> <span style={{fontFamily: "PP Editorial New"}}
                                                                             className="font-thin italic capitalize">membership</span>
                </h1>

                <div className="bg-black rounded-full w-44 h-44 lg:w-48 lg:h-48 relative hidden sm:inline-block">
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs text-center w-3/5">
                        Hiring an interior designer for a single room typically costs <span className="font-bold">$1,500
                        to $12,000</span>. <br/> At LIVVY we make designing your dream space accessible.
                    </p>
                </div>
            </div>

            <div className="grid xl:grid-cols-3 xl:gap-28 lg:gap-14 md:grid-cols-2 md:gap-12">
                <Plan name={'gold plan'} perMonth={'$15'} perYear={'$120'} perks={['Design up to 5 rooms a month', 'Unlimited Photo Uploads', 'Pinterest connect']}/>
                <Plan name={'platinum plan'} perMonth={'$17'} perYear={'$160'} perks={['All features of Gold plus unlimited room designs', 'Unlimited Furniture Uploads', 'Share designs with others & sell designs on marketplace']}/>
                <Plan name={'diamond plan'} perMonth={'$20'} perYear={'$180'} perks={['All features of Platinum', 'Celebrity Designs', 'Exclusive discounts & early access to seasonal items']}/>
            </div>
        </div>

    )
}

const Plan = ({name, perMonth, perYear, perks} : {name: string, perMonth: string, perYear: string, perks: string[]}) => {
    return (
        <div className="md:flex md:flex-col md:justify-between mb-10 sm:mb-16">
            <h3 className="uppercase text-xl pb-2.5 sm:pb-5 border-b border-b-black">{name}</h3>

            <div className="py-2.5 sm:py-5 lg:py-7 border-b border-b-black">
                <h4 className="text-4xl lg:text-6xl mb-2.5">{perMonth}/mo</h4>
                <p className="uppercase text-lg">or {perYear} yearly</p>
            </div>

            <ul className="list-image-[url(/assets/check.svg)] list-inside py-5 sm:py-7 lg:mb-20 md:mb-16">
                {
                    perks.map((perk, index) => <li className="marker:me-1 capitalize" key={index}>{perk}</li>)
                }
            </ul>

            <div>
                <LivButton as="button" text={'select'} borderColor={'border-black'} bgColor={'bg-black'} onClickHandler={() => console.log('chose membership')} textColor={'text-white'} fullWidth={true}/>
            </div>
        </div>
    )
}