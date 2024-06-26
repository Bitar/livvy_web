import {useMasterLayout} from "../MasterLayoutContext.loader.ts";

const MenuList = [
    {text: 'Captures'},
    {text: 'Your Library'},
    {text: 'Account'},
    {text: 'About'},
    {text: 'Faq'},
    {text: 'Contact'},
]

export const MenuPanel = () => {

    const {showMenu, setShowMenu} = useMasterLayout()

    return (
        <div id="menu-panel"
             className={`z-[39] fixed top-0 left-0 flex flex-col justify-between w-screen h-screen overflow-auto bg-liv-tan pt-28 sm:pt-36 px-6 md:px-10 transform transition-transform duration-500 ease-in-out ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>

            <div className='absolute top-20 sm:top-26 right-4 lg:right-10'>
                <button onClick={() => setShowMenu(false)}>
                    <img src="/assets/close.svg" alt="close icon" className="w-5 h-5"/>
                </button>
            </div>

            <span className='uppercase'>Menu</span>

            <div className="flex flex-col sm:ml-16 mt-2.5 justify-between h-full">
                <div className="menu-list flex flex-col text-4xl sm:text-7xl gap-2.5">
                    {MenuList.map((menuItem) =>
                        <a href="#" className="menu-link">
                            <div className='uppercase'>{menuItem.text}</div>
                            <div className="italic font-extralight font-['PP_Editorial_New']">{menuItem.text}</div>
                        </a>
                    )}
                </div>
                <div className="menu-footer uppercase pb-11 sm:pb-16">
                    <p className='mb-9'>Connect With Us</p>
                    <div className='flex gap-10 underline underline-offset-4'>
                        <div className="flex flex-col gap-1">
                            <a href="">Email</a>
                            <a href="">Instagram</a>
                            <a href="">Tiktok</a>
                        </div>
                        <div className="flex flex-col gap-1 underline underline-offset-4">
                            <a href="">Pinterest</a>
                            <a href="">Linkedin</a>
                            <a href="">Youtube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}