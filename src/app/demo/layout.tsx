import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const LayoutPage = ({ children }: Props) => {
    return (
        <>
            <SiteHeader />
            <div className="container-wrapper 3xl:fixed:px-0 px-6 ">

                <div className='3xl:fixed:container max-w-8xl mx-auto '>{children}</div>


            </div>

            <SiteFooter />
        </>
    )
}

export default LayoutPage