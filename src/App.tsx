import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

const App = () => {

    const GamePage = lazy(() => import("./components/Game/Game"));
    const HomePage = lazy(() => import("./components/Home/Home"));

    return (<div style={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/play" component={GamePage} />
        </Suspense>
    </div>)
}

export default App;
