import { createContext, useState, useContext} from 'react';

const PageTitleContext = createContext();

export function usePageTitle(){
    return useContext(PageTitleContext);
}

export function PageTitleProvider({children}){
    const [pageTitle, setPageTitle] = useState('dummy page');

    return (
        <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
            {children}
        </PageTitleContext.Provider>
    )
}

