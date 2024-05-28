import Header from '@/components/Header';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const HomeLayout = ({children}: Props) => {
  return (
    <div>
      
        <Header />
        {children}
    </div>
  )
}

export default HomeLayout