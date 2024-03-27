import {LivButton} from "./components/buttons/LivButton.tsx";

export const Test = () => {
    return (
        <div className='absolute bg-green w-full h-full p-10'>
            <div className='w-80'>
                <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-black'} fullWidth={true} textIcon={'assets/google-logo.png'} arrowIconDirection={'down'}/>
                <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-black'} arrowIcon={false} rounded={true} fullWidth={true}/>
                <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-white'} bgColor={'bg-white'} fullWidth={true}/>
                <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-white'} bgColor={'bg-transparent'} fullWidth={true}/>
                <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-white'} fullWidth={true}/>
                <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-white'} fullWidth={true}/>
                <LivButton as={'a'} url={'https://google.com'} text={'Login'} borderColor={'border-black'} bgColor={'bg-white'} fullWidth={true}/>
            </div>
        </div>
    )
}