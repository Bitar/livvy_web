import {Background} from "../../../modules/background/Background.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Helmet} from "react-helmet";

export const BetaLanding = () => {
    return (
        <div>
            <Helmet>
                <title>Welcome | Livvy | Alpha</title>
                <meta name="title" property="og:title" content="Welcome | Livvy | Alpha"/>
                <meta name="type" property="og:type" content="website"/>
                <meta name="image" property="og:image" content="https://storage.googleapis.com/livvy-app/assets/livvy-thumb.gif"/>
                <meta name="url" property="og:url" content="https://app.livvy.com/alpha/"/>
                <meta name="description" property="og:description" content="Welcome to our alpha testing site! Here, we invite you to be among the first to experience our product and share your valuable feedback."/>
            </Helmet>

            <Background type={'image'} url={'/assets/beta/beta-bg.jpeg'}/>

            <div
                className='fixed w-11/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>

                <img src={'/assets/livvy-logo-white.png'} alt="Livvy Logo White"
                     className='h-auto mb-7 inline-block w-56 md:w-80'/>

                <p className="text-white md:max-w-lg w-full m-auto mb-7 font-light">Welcome to our alpha testing site! Here, we
                    invite you to be among the first to experience our product and share your valuable feedback.</p>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <LivButton as={'a'} url={'/alpha/auth/register'} text={'sign up'} bgColor={'bg-white'}
                               borderColor={'border-white'} style={'thin'}
                               className={'md:me-4 me-0 mb-4 md:mb-0'} rounded={true}/>

                    <LivButton as={'a'} url={'/alpha/auth/login'} text={'login'} bgColor={'bg-transparent'}
                               borderColor={'border-white'} style={'thin'} rounded={true} textColor={'text-white'}/>
                </div>
            </div>
        </div>
    )
}