import React from 'react'


const page = () => {
    return (
        <>
            <div className='flex flex-col px-24 mt-16'>
                <h1 className='text-4xl text-center py-5 font-bold'>About Get Me A Coffee</h1>
                <p>Welcome to Get Me a Coffee, the ultimate platform for creators to connect with their fans and receive support through donations. Whether you're a content creator, artist, writer, musician, or any kind of creative professional, Get Me a Coffee provides you with a simple and effective way to fund your passion and continue producing the work your fans love.</p>
                <h2 className='text-center text-3xl pt-10 font-bold'>Our Mission</h2>
                <p className='py-3'>At Get Me a Coffee, our mission is to empower creators by providing them with a platform that facilitates direct support from their audience. We believe that every creator deserves the opportunity to pursue their passion without financial constraints. By bridging the gap between creators and their supporters, we help sustain creative endeavors and foster a community of appreciation and generosity.</p>
                <h2 className='text-center text-3xl pt-10 font-bold'>How It Works</h2>
                <h3 className='text-xl pt-5 font-bold'>For Creators</h3>
                <ol className='list-decimal px-8 py-2'>
                    <li className='py-1'>Create Your Profile: Set up your profile, showcase your work, and let your fans know what you do.</li>
                    <li className='py-1'>Share Your Link: Promote your unique Get Me a Coffee link across your social media, website, and other platforms to reach your audience.</li>
                    <li className='py-1'>Receive Support: Fans can easily donate to your profile with a few clicks, helping you to fund your creative projects and goals.</li>
                </ol>
                <h3 className='text-xl pt-5 font-bold'>For Fans</h3>
                <ol className='list-decimal px-8 py-2'>
                    <li className='py-1'>Discover Creators: Browse and discover your favorite creators on our platform.</li>
                    <li className='py-1'>Donate: Show your appreciation by donating to the creators you love. Every donation, big or small, makes a difference.</li>
                    <li className='py-1'>Stay Connected: Follow your favorite creators to stay updated on their latest projects and achievements.</li>
                </ol>
                <h2 className='text-center text-3xl pt-10 font-bold'>Why Choose Get Me a Coffee?</h2>
                <ul>
                    <li className='py-1'>
                        <div>
                            <h3 className='text-xl pt-5 font-bold'>Simple and Intuitive</h3>
                            <p className='py-2'>Our platform is designed to be user-friendly for both creators and supporters. Setting up a profile and making donations is quick and straightforward, ensuring a seamless experience.</p>
                        </div>
                    </li>
                    <li className='py-1'>
                        <div>
                            <h3 className='text-xl pt-5 font-bold'>Secure and Transparent</h3>
                            <p className='py-2'>We prioritize security and transparency in all transactions. Our platform ensures that your donations are securely processed and that creators receive their funds promptly.</p>
                        </div>
                    </li>
                    <li className='py-1'>
                        <div>
                            <h3 className='text-xl pt-5 font-bold'>Community-Oriented</h3>
                            <p className='py-2'>Get Me a Coffee is more than just a fundraising app; it's a community of like-minded individuals who believe in the power of creativity and the importance of supporting one another. Join us and be part of a movement that values and uplifts creators.</p>
                        </div>
                    </li>
                    <li className='py-1'>
                        <div>
                            <h3 className='text-xl pt-5 font-bold'>Versatile Support</h3>
                            <p className='py-2'>Creators can use the funds received for various purposes, whether it's upgrading equipment, funding a new project, or simply covering daily expenses. Your support helps them continue to create and share their work with the world.</p>
                        </div>
                    </li>
                </ul>
                <h2 className='text-center text-3xl pt-10 font-bold'>Join Us Today</h2>
                <p className='py-3'>If you're a creator looking for a way to fund your passion, or a fan wanting to support your favorite artists, Get Me a Coffee is the perfect platform for you. Sign up today and be a part of a vibrant community dedicated to creativity and support.</p>
                <p className='text-lg py-10 text-center'>Thank you for being a part of Get Me a Coffee. Together, we can fuel creativity and bring more amazing work into the world.</p>
            </div>
        </>
    )
}

export default page

export const metadata = {
    title: "About - GetMeACoffee",
  };