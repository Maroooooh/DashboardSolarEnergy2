import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../partials/Sidebar'
import Banner from '../partials/Banner'
import Header from '../partials/Header'

export default function DefaultLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="grow">
                        <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-4 w-full max-w-9xl mx-auto">
                            <div className="mb-8">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
