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
            <div>{children}</div>
            <SiteFooter />
        </>
    )
}

export default LayoutPage