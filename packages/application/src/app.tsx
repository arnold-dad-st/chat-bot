import { StrictMode, Fragment, FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import './design-system.css';
import './app.css';
import { Chat } from './components/page';
import 'react-chat-widget/lib/styles.css';
import Widget from './components/audience-widget/widget';

export const App: FC = () => (
    <StrictMode>
        <BrowserRouter>
            <Frame>
                <Page
                    sidebar={
                        <Sidebar localStorageKey="sidebar-application">
                            <Sidebar.Section padding="y">
                                <SideNav title="Application">
                                    <SideNavLinkItem pathname="/" exact>
                                        Main page
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/second-page">
                                        Second page
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    maxWidth="wide"
                >
                    <Switch>
                        <Route path="/" exact component={() => <Chat />} />
                        <Route
                            path="/second-page"
                            component={() => <Widget />}
                        />
                    </Switch>
                </Page>
            </Frame>
        </BrowserRouter>
    </StrictMode>
);
